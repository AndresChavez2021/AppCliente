import { View, StyleSheet, alert, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-elements";
import Toast from "react-native-root-toast";

import { ActivityLoader, ErrorText } from "../../Components/Shared";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput, TextInput } from "../../Components/Inputs";


/* importando metodo de Autenticacion para el registro de usuario */
import { signup1 } from "../../Services/AuthService";
import { obtenerBarrios } from "../../Services/ClientService";
import CustomSelect from "../../Components/Cliente/CustomSelect";
import { Barrios } from "../../Components/DATA/InfoEstatica";


const Signup = ({ navigation }) => {


  const [Error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [selectedBarrio, setSelectedBarrio] = useState(null);
  // proteccion de contraseña
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
  /* Errores de formulario */
  const { control, handleSubmit, formState: { errors } } = useForm();
  

   console.log("BARIO SELECCIONADO ",selectedBarrio)
  //TODO: REGISTRAR USUARIO
  const _Signup = async (data) => {

    try {

      setloading(true);
      data.id_barrio=selectedBarrio.id
      const message = await signup1(data);

      await navigation.navigate("Login");
      Toast.show(message, {});

    } catch (e) {

      setError(e.message);

    } finally {

      setloading(false);
    }
    console.log("Enviando datos");
  };

  /* proteccion de contrasenia */
  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };


  const handleBarrioSelect = (barrio) => {
    setSelectedBarrio(barrio);
  };
  

  return (
    <View style={styles.container}>
    

        
        <Text h2>Registrate</Text>

        <ErrorText error={Error} />

        <TextInput
          placeholder="Nombre de usuario"
          name="name"
          minLength={2}
          maxLength={20}
          iconName="person-outline"
          control={control}
          errors={errors}
          errValiStyle={styles.errorValidacion}
          inputStyle={styles.input}
        />


        <EmailInput
          placeholder="Ingrese su correo"
          name="email"
          control={control}
          errors={errors}
          errValiStyle={styles.errorValidacion}
          inputStyle={styles.input}
        />
        <View style={{width:"50%"}}>
        <CustomSelect data={Barrios} onSelect={handleBarrioSelect} title={"Selecciona un barrio"}/>

        </View>


        <PasswordInput
          placeholder="Contraseña"
          name="password"
          control={control}
          errors={errors}
          errValiStyle={styles.errorValidacion}
          inputStyle={styles.input}
          secureEntry={secureEntry}
          toggleSecureEntry={toggleSecureEntry}
        />



        <Button title="Registar" type="outline" onPress={handleSubmit(_Signup)} titleStyle={{ color: "#70a1ff" }} />
        <View style={{ marginBottom: 5 }} />
        <Text onPress={() => navigation.navigate('Login')}>Ya tienes una cuenta?</Text>
       



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#2570e3",
    // fontFamily:'$400Regular',
    fontWeight: "600",
    fontSize: 24,
  },
  errorValidacion: {
    color: "#dd3333",
    fontSize: 12,
  },
  input: {
    color: "#000000",
  },
 

});

export default Signup;
