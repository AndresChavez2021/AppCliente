import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const TerminosYCondiones = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.photo}
                    source={require("../../Assets/image/camion.png")}
                />
                <Text style={styles.name}>Smart-Truck</Text>

            </View>
            <View style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Terminos y Condiciones</Text>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionItem}>
                            Estos Términos y Condiciones ("Términos") son un acuerdo legal entre usted
                            ("Usuario" o "usted") y SOFTFORGE INNOVATIONS ("la Empresa", "nosotros" o "nuestro") que rige el uso
                            de la aplicación Smart-trucks("la Aplicación"). Al utilizar la Aplicación, usted acepta
                            regirse por estos Términos. Si no está de acuerdo con alguno de los términos aquí
                            establecidos, no utilice la Aplicación.
                        </Text>

                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cuentas de Usuario</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionItemTitle}>
                                Registro
                            </Text>
                            <Text style={styles.sectionItemDesc}>
                                Para utilizar la Aplicación, debe crear una cuenta de usuario proporcionando
                                información precisa y completa durante el proceso de registro. Usted es responsable
                                de mantener la confidencialidad de su información de inicio de sesión y es
                                responsable de todas las actividades que ocurran en su cuenta.
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={styles.section}>

                    <Text style={styles.sectionTitle}>Política y Privacidad</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionItem}>

                            <Text style={styles.sectionItemDesc}>
                                Política de privacidad de Smart-trucks En Guadasoft solutions, desarrolladores de la
                                aplicación, nos comprometemos a proteger la privacidad de nuestros usuarios. Esta
                                Política de Privacidad describe cómo recopilamos, utilizamos, divulgamos y
                                protegemos la información personal que obtenemos a través de la aplicación.
                                Al utilizar nuestra aplicación, usted acepta los términos y condiciones de esta Política
                                de Privacidad.
                                Recopilación de información personal
                                Cuando usted utiliza la aplicación Guadasoft, podemos recopilar la siguiente
                                información personal:
                                1. Información de cuenta: Para utilizar nuestra aplicación, puede que necesitemos
                                recopilar ciertos datos de identificación personal, como su nombre, dirección
                                188
                                de correo electrónico, número de teléfono y contraseña. Esta información se utiliza para
                                crear y gestionar su cuenta de usuario.
                            </Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionItemTitle}>
                                Información de ubicación:
                            </Text>
                            <Text style={styles.sectionItemDesc}>
                                Si usted nos da su consentimiento, podemos recopilar información de ubicación precisa
                                de su dispositivo móvil cuando utilice la aplicación smarttrucks para ofrecerle servicios
                                basados en la ubicación, como la búsqueda de comerciantes cercanos.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
            <Button
					title="Acepto"
					type="outline"
					onPress={()=>navigation.navigate("Login")}
					titleStyle={{ color: "#00b894" }}
				/>
            </View>
            <View style={{marginBottom:75}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 40,
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        color: 'gray',
    },
    body: {},
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    sectionContent: {
        marginTop: 8,
    },
    sectionItem: {
        marginVertical: 4,
    },
    sectionItemTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    sectionItemDesc: {
        fontSize: 14,
        color: 'gray',
    },
});

export default TerminosYCondiones;
