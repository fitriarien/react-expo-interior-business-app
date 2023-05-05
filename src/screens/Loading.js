import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Text, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Loading = ({navigation}) => {
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.navigate('Main Tab Menu');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground style={{height: '100%', resizeMode: 'cover'}} source={require('../assets/login-bg.jpg')}>
        <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center'}}>Loading...</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})

export default Loading;
