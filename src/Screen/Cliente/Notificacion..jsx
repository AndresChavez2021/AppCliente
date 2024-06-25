import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

const Notificacion = () => {
    const route = useRoute();
 
    const { barrio, cliente } = route.params ? route.params : {};
    if (!route.params) {
        return (
          <View style={styles.container}>
             <View style={styles.content}>
            <Text style={[styles.title, { justifyContent: "center", alignSelf: "center" }]}> No hay {"\n"} notificaciones </Text>
             </View>
          </View>
    
        )
      }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Notificaciones</Text>
                <Image source={require("../../Assets/image/camion.png")} style={styles.image} />
                <Text style={styles.desc}>{ `${cliente} hay un camion \n  en tu barrio ${barrio}` }</Text>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#8A2BE2',
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 39,
    },
    desc: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        color: '#808080'
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'space-around'
    },
    button: {
        width: '48%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    facebook: {
        backgroundColor: '#4267B2'
    },
    google: {
        backgroundColor: '#DB4437'
    }
});
export default Notificacion