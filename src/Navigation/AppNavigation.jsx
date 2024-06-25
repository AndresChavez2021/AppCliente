import React,{useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './Stack/AuthStack';
import ChoferStack from './Stack/ChoferStack';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export default function Wrapper({userToken}){
  return (
    <NavigationContainer>
      <AppNavigation userToken={userToken}/>
    </NavigationContainer>
  );
}

const AppNavigation = ({userToken}) => {
  const navigation = useNavigation();
  useEffect(() => {
    const subscripcion = Notifications.addNotificationResponseReceivedListener(
      Response => {
        const data = Response.notification.request.content.data;

        navigation.navigate('Notificacion', data);
        console.log("Paso por la suscripcion",data)
      }
    );
    return () => subscripcion.remove();
  }, []);
  return (
    <>
       {userToken==null ?  <AuthStack/> : <ChoferStack/>}
    </>
  )
}


