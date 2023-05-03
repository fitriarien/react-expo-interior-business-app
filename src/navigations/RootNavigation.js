import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainTabMenu from './MainTabMenu';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Stack.Screen name='Loading' component={Loading}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Signup}/>
      <Stack.Screen name='Main Tab Menu' component={MainTabMenu}/>
    </Stack.Navigator>
  );
}

export default RootNavigation;
