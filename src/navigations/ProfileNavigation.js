import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import UpdateProfile from '../screens/UpdateProfile';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  const navigation = useNavigation();

  const goToEditScreen = () => {
    navigation.navigate('Update Profile');
  }

  return (
    <Stack.Navigator >
      <Stack.Screen 
        name='Profile' 
        component={Profile} 
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={goToEditScreen}>
              <Feather name="edit" size={24} color="black" style={{marginHorizontal: 10}} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen 
        name='Update Profile' 
        component={UpdateProfile} 
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})

export default ProfileNavigation;
