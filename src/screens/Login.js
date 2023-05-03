import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);

  const login = async () => {
    try {
      const {status, data} = await serverApi.post('login', {username: username, password: password});
      
      if (status === 200) {
        await AsyncStorage.setItem('id', data.id.toString());
        await AsyncStorage.setItem('token', data.token);
        
        dispatch({type: 'SET_LOGIN'});

        navigation.navigate('Main Tab Menu');
        setUsername("");
        setPassword("");
      } else {
        console.log(data.errorMessage);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const navigateToRegister = async () => {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView>
      <ImageBackground style={styles.background} source={require('../assets/login-bg.jpg')}>
        <View style={styles.header}>
          <View style={styles.welcomeArea}>
            <Text style={styles.welcomeText}>WELCOME!</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.inputArea}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Username" 
              value={username} 
              onChangeText={setUsername}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Password" 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.buttonLogin} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have any account yet?
          </Text>
          <TouchableOpacity style={styles.buttonSignup} onPress={navigateToRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity> 
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeArea: {
    alignItems: 'center',
    marginVertical: 100,
    padding: 2
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 28,
    fontStyle: 'italic',
    color: 'black'
  },
  body: {
    justifyContent: 'center',
    marginBottom: 20
  },
  inputArea: {
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    padding: 9,
    borderRadius: 25,
    width: '80%',
    marginVertical: 10,
  },
  buttonArea: {
      marginBottom: 50
  },
  buttonLogin: {
      backgroundColor: '#6e3f25',
      marginBottom: 10,
      padding: 9,
      borderRadius: 25,
      width: '80%',
      height: 50,
      alignSelf: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white'
  },
  footer: {
    justifyContent: 'flex-end',
    marginVertical: 30
  },
  footerText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonSignup: {
    backgroundColor: '#6e3f25',
    margin: 10,
    padding: 9,
    borderRadius: 25,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center'
  },
})

export default Login;
