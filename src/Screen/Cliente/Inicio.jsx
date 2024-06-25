import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import { obtenerFechaHoraActual, obtenerHoraActual, showToast } from '../../Components/funciones';
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getItemAsync } from 'expo-secure-store';
import { USER_KEY } from '../../Providers/AuthProviders';
import { Base_URL } from '../../Util/Api';
import io from "socket.io-client";



const Inicio = ({ route, navigation }) => {
  const socket = io('https://socket-smart-trunck-5vimgyhx4a-uc.a.run.app/');
  const [IsCarActive, setIsCarActive] = useState(null);
  const [CoordChofer, setCoordChofer] = useState({ latitude: 0, longitude: 0 });
  const [locations, setLocation] = useState(null);
  const [Scan, setScan] = useState(false)
  useEffect(() => {
    registerPushNotificacion()
      .then(async token => {
        console.log('Push token', token)
        await AsyncStorage.setItem('@pushToken', token);
        navigation.navigate('Inicio');
      })
      .catch(err => {
        console.log(err);
        navigation.navigate('Inicio');
      });
  }, []);

  socket.on("isActive", (state) => {
    setIsCarActive(state)
  });
  console.log('IsCarActive ', IsCarActive)

  useEffect(() => {
    socket.on("Chofer", (data) => {

      setCoordChofer({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      console.log('Chofer ', data)
    });


  }, [IsCarActive])



  async function registerPushNotificacion() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log("push ", finalStatus);
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Error al obtener un token');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7c',
        });
      }

      const user_id = await getItemAsync(USER_KEY);
      let idUsers = JSON.parse(user_id)
      console.log("TOKEN ", token, JSON.stringify(idUsers.id))

      /* enviando token */
      let formData = new FormData();
      formData.append('expo_token', token);
      formData.append('user_id', JSON.stringify(idUsers.id));
      console.log('FormData', JSON.stringify(formData));
      await fetch(`${Base_URL}/register-notification`, {
        method: 'POST',
        body: formData,
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // "Content-Type": "application/x-amz-json-1.1",
        },
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error.message))
        .then(response => { });

      return token;
    }
  }





  // console.log("origen ", JSON.parse(origen))



  //TODO: OBTENER UBICACION 
  useEffect(() => {
    (async () => {
      const { status, } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Se requieren permisos de ubicación');
        return;
      }



    })()
  }, [])
  
  useEffect(() => {
    (async () => {
      setScan(true)
      let location = await Location.getCurrentPositionAsync({});

      socket.emit("cliente", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      console.log("enviando COOR CLIENTE")
      setScan(false)
    })()
  }, [CoordChofer])

  console.log("LOCATION USER CLIENTE ", locations)




  // console.log("enviarPosicion ", coordenadasAcumuladas)
  const [Origen, setOrigen] = useState({
    latitude: -17.785399961739536,
    longitude: -63.20994043349565,
    latitudeDelta: 0.9995,
    longitudeDelta: 0.9995,
  });
  const mapRef = useRef();



  return (

    <View style={styles.container} >


      <MapView
        ref={mapRef}
        provider={"google"}
        userLocationPriority="high"
        zoomEnabled={true}
        zoomTapEnabled={true}
        loadingEnabled={true}
        /*   zoomControlEnabled={true} */
        style={StyleSheet.absoluteFill}
        initialRegion={Origen}
        showsUserLocation={true}
        toolbarEnabled={false}
        showsMyLocationButton={true}
        userLocationFastestInterval={3000}
        maxZoomLevel={20}
        minZoomLevel={15}
        mapPadding={{ top: 405 }}>

        {CoordChofer && CoordChofer ? (
          <Marker

            title='Camion'
            coordinate={CoordChofer}
            image={require('../../Assets/image/shipped.png')}

          //  style={{width:50,height:50}}
          />

        ) : null}




      </MapView>




    {/*   <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ScreenQuote")}>
          <Text style={styles.buttonText}>Cotizar</Text>
        </TouchableOpacity>
      </View> */}


    </View >




  )
}

export default Inicio

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
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
})