import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import { obtenerFechaHoraActual, obtenerHoraActual, showToast } from '../../Components/funciones';
import * as Location from "expo-location";
import { guardarRecorridoDelChofer, obtenerCoordenadaDeLaRuta } from '../../Services/AuthService';
import TrazarRuta from '../../Components/Chofer/Mapa/TrazarRuta';




const Mapa = ({ route, navigation }) => {
  const { id_ruta, dataRuta } = route.params;
  const { origen, destino } = dataRuta;

  const [CoordRuta, setCoordRuta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coordenadasAcumuladas, setCoordenadasAcumuladas] = useState([]);
  const [horaInicio, setHoraInicio] = useState(obtenerHoraActual);
  const [datosDeLaRuta, setdatosDeLaRuta] = useState(dataRuta);
  const [coordOrigen, setCoordOrigen] = useState(null)
  const [CoorDestino, setCoorDestino] = useState(null)




  //TODO: OBTENER COORDENADA Y TRAZAR
  useEffect(() => {
    obtenerCoordenadasApi();

  }, []);
  // console.log("origen ", JSON.parse(origen))

  const obtenerCoordenadasApi = async () => {
    try {
      const obtenerCoord = await obtenerCoordenadaDeLaRuta(id_ruta);
      // console.log("resp COORD FRONT", obtenerCoord);

      const coordenadas = JSON.parse(obtenerCoord[0].coordenadas)


      const convertirCoord = coordenadas.map(coordenada => ({
        latitude: coordenada.lat,
        longitude: coordenada.lng,

      }));

      setCoordRuta(convertirCoord);


      //TODO: CARGANDO ORIGEN Y DESTINO  DEL MAPA Y DE LA RUTA
      let coordOrigen = JSON.parse(origen);
      let coordDestino = JSON.parse(destino);
      console.log("**GET **", coordOrigen.lat)

      setCoordOrigen({
        latitude: coordOrigen.lat,
        longitude: coordOrigen.lng,
        latitudeDelta: 0.9995,
        longitudeDelta: 0.9995,
      })

      setCoorDestino({
        latitude: coordDestino.lat,
        longitude: coordDestino.lng,

      })


      setIsLoading(true)


    } catch (error) {
      console.log(error);
    }

  };



  //TODO: OBTENER UBICACION 
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Se requieren permisos de ubicación');
        return;
      }
    })()
  }, [])


  useEffect(() => {
    const obtenerUbicacion = async () => {
      try {

        const { coords } = await Location.getCurrentPositionAsync();
        const nuevaCoordenada = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        setCoordenadasAcumuladas(prevCoordenadas => [...prevCoordenadas, nuevaCoordenada]);


      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(obtenerUbicacion, 15000);
    console.log("enviando Coord ", coordenadasAcumuladas)
    return () => {
      clearInterval(interval);
    };
  }, []);



  async function terminarRecorrdoYEnviar() {


    try {
      let data = {
        fechaHora: obtenerFechaHoraActual(),
        horaIni: horaInicio,
        horaFin: obtenerHoraActual(),
        coordenadas: coordenadasAcumuladas,
        id_ruta: id_ruta
      }
      const resp = await guardarRecorridoDelChofer(data);
      const { status } = resp;
      console.log("front ", resp)
      if (status === "Success") {
        navigation.navigate('Inicio', { empleado: [], camion: [] });
        showToast("Se registró correctamente", "#2ecc71");
        console.log("ENVIA ", status)
      }
    } catch (error) {
      console.log(error)
    }
  }



  // console.log("enviarPosicion ", coordenadasAcumuladas)
  /*   const [Origen, setOrigen] = useState({
      latitude: -17.785399961739536,
      longitude: -63.20994043349565,
      latitudeDelta: 0.9995,
      longitudeDelta: 0.9995,
    }); */
  const mapRef = useRef();



  return (



    <View style={styles.container} >
      {
        isLoading ? (<>
          <MapView
            ref={mapRef}
            provider={"google"}
            userLocationPriority="high"
            zoomEnabled={true}
            zoomTapEnabled={true}
            loadingEnabled={true}
            /*   zoomControlEnabled={true} */
            style={StyleSheet.absoluteFill}
            initialRegion={coordOrigen}
            showsUserLocation={true}
            toolbarEnabled={false}
            showsMyLocationButton={true}
            userLocationFastestInterval={3000}
            maxZoomLevel={20}
            minZoomLevel={15}
            mapPadding={{ top: 405 }}>
            {isLoading ?
              <>
                <TrazarRuta coord={CoordRuta} />

                <Marker
                  title='Origen'
                  coordinate={coordOrigen}
                  image={require('../../Assets/image/markerOrigen.png')}
                />

                <Marker
                  title='Destino'
                  coordinate={CoorDestino}
                  image={require('../../Assets/image/markerDestino.png')}
                />

              </>

              : null}



          </MapView>

          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <View style={styles.cardField}>
                <Text style={styles.fieldText}>Ruta: </Text>
              </View>
              <View style={styles.cardField}>
                <Text style={styles.fieldText}>{datosDeLaRuta.nombreRuta} </Text>
              </View>

            </View>
            <View style={styles.cardRow}>
              <View style={styles.cardField}>
                <Text style={styles.fieldText}>Horario:</Text>
              </View>
              <View style={styles.cardField}>
                <Text style={styles.fieldText}>{datosDeLaRuta.hora_inicio} - {datosDeLaRuta.hora_fin}</Text>
              </View>


            </View>
          </View>



          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => terminarRecorrdoYEnviar()}>
              <Text style={styles.buttonText}>Terminar</Text>
            </TouchableOpacity>
          </View>
        </>
        ) : null}
    </View >




  )
}

export default Mapa

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    top: 52,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(255, 255, 255,1.0)',
    borderRadius: 13,
    padding: 16,
    elevation: 4,
    zIndex: 999, // Ajustar el valor según sea necesario
  },

  cardRow: {
    flexDirection: 'column',
  },
  cardField: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
})