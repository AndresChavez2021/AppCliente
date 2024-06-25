import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import CustomSelect from '../../Components/Cliente/CustomSelect';
import { Basura } from '../../Components/DATA/InfoEstatica';
import { calculoReciclaje } from '../../Services/ClientService';
import { showToast } from '../../Components/funciones';


const Quote = ({route ,navigation}) => {
  const [Error, setError] = useState(null);
    const [cantKilos, setCantKilos] = useState('');
    const [basura, setBasura] = useState("");
    const [Precio, setPrecio] = useState(0);
    const [Total, setTotal] = useState(0);

    const handleBarrioSelect = (basura) => {
      console.log("basura ",basura)
      setBasura(basura);
      setPrecio(basura.precio_venta);
    };
  
    const CalcularPrecio = () => {
      let total=Precio*cantKilos;
      setTotal(total);
    };

   async function RegistrarCalculo () {
      try {
        let data={
          peso:cantKilos,
          id_categoria:basura.id
        }
        const response = await calculoReciclaje(data);
       
        showToast(response.message,"#2ecc71");
        navigation.pop()

      } catch (e) {
        setError(e.message);
       
      }
    };
  
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../../Assets/image/fondo.jpg") } style={styles.backgroundImage}>
          <View style={styles.logoContainer}>
           <Text style={{fontSize:25,fontWeight:"700",color:"white"}}>Calculo de reciclaje</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={[styles.card]}>
            <CustomSelect data={Basura} onSelect={handleBarrioSelect} title={"Seleccione un tipo de basura"}/>
            </View>
            <View style={styles.card}>
              <TextInput
                placeholder="Cantidad en kilos"
                keyboardType='numeric'
                style={styles.input}
                value={cantKilos}
                onChangeText={text=>setCantKilos(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={CalcularPrecio}>
              <Text style={styles.loginButtonText}>Cotizar</Text>
            </TouchableOpacity>
          </View>
        <View style={{alignSelf:"center"}}>
          <Text>PRECIO DE COTIZACION: {Total} Bs</Text>
           </View>

           <TouchableOpacity style={styles.loginButton} onPress={RegistrarCalculo}>
              <Text style={styles.loginButtonText}>Guardar</Text>
            </TouchableOpacity>
        </ImageBackground>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 100,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius:60,
    },
    formContainer: {
      marginHorizontal: 20,
      marginTop: 50,
      padding:20,
      borderRadius:10,
      backgroundColor:'rgba(255, 255, 255, 0.3)'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 20,
      padding:10,
    },
    input: {
      height: 40,
      paddingHorizontal: 10,
      borderBottomWidth:1,
      borderBottomColor:'#B0C4DE'
    },
    loginButton: {
      backgroundColor: '#7B68EE',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
export default Quote