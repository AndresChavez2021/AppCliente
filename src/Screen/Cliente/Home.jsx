import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({navigation}) => {
  const [pressedButton, setPressedButton] = useState(null);

  const handleButtonPressIn = (buttonName) => {
    setPressedButton(buttonName);
  };

  const handleButtonPressOut = (screen) => {
    navigation.navigate(screen);
  };

  const isPressed = (buttonName) => {
    return buttonName === pressedButton;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.infoButton,
          isPressed('info') && styles.buttonPressed,
        ]}
        onPressIn={() => handleButtonPressIn('info')}
        onPressOut={()=>handleButtonPressOut("Inicio")}
      >
        <Text style={styles.buttonText}>Basurero cercano</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.dangerButton,
          isPressed('danger') && styles.buttonPressed,
        ]}
        onPressIn={() => handleButtonPressIn('danger')}
        onPressOut={()=>handleButtonPressOut("ScreenQuote")}
      >
        <Text style={styles.buttonText}>Calculo de reciclaje</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.warningButton,
          isPressed('warning') && styles.buttonPressed,
        ]}
        onPressIn={() => handleButtonPressIn('warning')}
        onPressOut={()=>handleButtonPressOut("Reclamos")}
      >
        <Text style={styles.buttonText}>Reclamos</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.button,
          styles.successButton,
          isPressed('success') && styles.buttonPressed,
        ]}
        onPressIn={() => handleButtonPressIn('success')}
        onPressOut={handleButtonPressOut}
      >
        <Text style={styles.buttonText}>Venta de articulos</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    top:40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.2,
    borderColor:'#eee',
    borderBottomWidth: 8,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  infoButton: {
    backgroundColor: '#2196f3',
    borderColor:'#0e3860',
    shadowColor:'#1c5da6',
  },
  dangerButton: {
    backgroundColor: '#f44336',
    borderColor:'#c4211d',
    shadowColor:'#1c5da6',
  },
  warningButton: {
    backgroundColor: '#ff9800',
    borderColor:'#b87208',
    shadowColor:'#1c5da6',
  },
  successButton: {
    backgroundColor: '#4caf50',
    borderColor:'#2c6e3c',
    shadowColor:'#3aa245',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 0,
  },
});

export default Home;