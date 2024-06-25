import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { showToast } from '../../Components/funciones';
import { getItemAsync } from 'expo-secure-store';
import { USER_KEY } from '../../Providers/AuthProviders';
import { Base_URL } from '../../Util/Api';
import errorHandler from '../../Util/AxiosErrorHandler';

const Reclamos = ({navigation}) => {
    const [descripcion, setDescripcion] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [foto, setFoto] = useState(null);
    const [coordenada, setCoordenada] = useState(null);
    const [idCliente, setIdCliente] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se requieren permisos para acceder a la galería de imágenes.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
             console.log("IMAGEN ", result.assets[0])
            setFoto(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        try {
            let id_user = await getItemAsync(USER_KEY);
            let usuarioID = JSON.parse(id_user).id
            const formData = new FormData();
            formData.append('descripcion', descripcion);

            if (foto) {
                formData.append('foto', {
                    uri: foto,
                    name: foto.split('/').pop(), // Obtiene el nombre del archivo de la URL
                    type: 'image/*',
                });
            }
            if (coordenada) {
                formData.append('coordenada', JSON.stringify(coordenada));
            }
            formData.append('id_cliente', usuarioID);
            console.log("FORM DATA  ", formData)
            const response = await fetch(`${Base_URL}/cliente/guardar-reclamo`, {
                method: 'POST',
                body: formData,
                headers: {
                    // "Content-Type": "application/json",
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': 'Bearer ' + yourAuthToken,
                }
            });

            if (response.ok) {
                const resp = await response.json();
                console.log('Respuesta:', resp);
               
                navigation.pop();
                showToast("Reclamo registrado","#2ecc71");

            } else {

                console.error('Error en la petición: ELSE', JSON.stringify(response));

            }
        } catch (error) {
            console.error('Error en la petición:', error);

            throw errorHandler(error);

        }
    };

    const handleMapPress = (e) => {
        setCoordenada(e.nativeEvent.coordinate);

        setModalVisible(false);
        showToast("Ubicacion seleccionada", "#2ecc71")
    };

    const openMapModal = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }
        setModalVisible(true);
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);


    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Descripción</Text>
            <Input
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                leftIcon={{ type: 'font-awesome', name: 'pencil' }}
            />



            <Text style={styles.label}>Ubicacion</Text>
            <TouchableOpacity style={styles.mapButton} onPress={() => openMapModal()}>
                <Icon name="map-marker" type="font-awesome" color="#fff" />
                <Text style={styles.mapButtonText}>Seleccionar Ubicación</Text>
            </TouchableOpacity>
            {/*  {coordenada && (
        <Text>Lat: {coordenada.latitude}, Lng: {coordenada.longitude}</Text>
      )} */}


            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            {foto && (
                <Image source={{ uri: foto }} style={styles.image} />
            )}

            <Button title="Enviar" onPress={handleSubmit} buttonStyle={styles.button} />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -17.785399961739536,
                            longitude: -63.20994043349565,
                            latitudeDelta: 0.9995,
                            longitudeDelta: 0.9995,
                        }}
                        zoomControlEnabled={true}
                        minZoomLevel={10}
                        showsUserLocation={true}
                        onPress={handleMapPress}
                    >
                        {coordenada && <Marker coordinate={coordenada} />}
                    </MapView>
                    <Button
                        title="Cerrar"
                        onPress={() => setModalVisible(false)}
                        buttonStyle={styles.closeButton}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    mapButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    imagePicker: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 15,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#007bff',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
    closeButton: {
        backgroundColor: '#007bff',
    },
});

export default Reclamos;
