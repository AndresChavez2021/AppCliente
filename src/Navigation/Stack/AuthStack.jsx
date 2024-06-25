
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../Screen/Auth/Login';
import Signup from '../../Screen/Auth/Signup';
import TerminosYCondiones from '../../Screen/Auth/Terminos';

const AuthStacks=createNativeStackNavigator();

export default function AuthStack() {
  return (
    <AuthStacks.Navigator screenOptions={{headerShown:false}}>
        <AuthStacks.Screen name='Terminos' component={TerminosYCondiones}/>
       
        <AuthStacks.Screen name='Login' component={Login}/>
        <AuthStacks.Screen name='Signup' component={Signup}/>
    
    </AuthStacks.Navigator>
   
  )
}