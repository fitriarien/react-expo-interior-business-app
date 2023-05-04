import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';

const Signup = ({navigation}) => {
  const [dataRegist, setDataRegist] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const signUp = async () => {
    // console.log(dataRegist);
    try {
      const {status, data} = await serverApi.post('register', {
        username: dataRegist.username,
        password: dataRegist.password,
        name: dataRegist.name,
        email: dataRegist.email,
        contact: dataRegist.contact,
        address: dataRegist.address,
        role: "customer"
      });

      if (status === 200) {
        navigation.navigate('Login');

        setDataRegist({
          username: "",
          password: "",
          name: "",
          email: "",
          contact: "",
          address: "",
        });
      } else {
        console.log(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToLogin = async () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView>
      <ImageBackground style={styles.background} source={require('../assets/login-bg.jpg')}>
        <View style={styles.header}>
          <View style={styles.welcomeArea}>
            <Text style={styles.welcomeText}>Fill in this form to register!</Text>
            <View style={styles.loginNav}>
              <Text style={styles.loginNavText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.buttonTextLogin}>Login</Text>
              </TouchableOpacity> 
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.inputArea}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Username" 
              value={dataRegist.username}
              onChangeText={value => setDataRegist(curr => { return { ...curr, username: value } })}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Email" 
              value={dataRegist.email}
              onChangeText={value => setDataRegist(curr => { return { ...curr, email: value } })}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Password" 
              value={dataRegist.password}
              onChangeText={value => setDataRegist(curr => { return { ...curr, password: value } })} 
              secureTextEntry={true}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Name" 
              value={dataRegist.name}
              onChangeText={value => setDataRegist(curr => { return { ...curr, name: value } })}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Phone Number" 
              value={dataRegist.contact}
              keyboardType="numeric"
              onChangeText={value => setDataRegist(curr => { return { ...curr, contact: value } })}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Address" 
              value={dataRegist.address}
              onChangeText={value => setDataRegist(curr => { return { ...curr, address: value } })}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.buttonRegist} onPress={signUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    marginVertical: 40,
    padding: 2
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 25,
    fontStyle: 'italic',
    color: 'black'
  },
  body: {
    justifyContent: 'center',
    marginBottom: 20
  },
  inputArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    margin: 5,
    borderRadius: 0,
    width: '80%',
    paddingHorizontal: 18,
  },
  buttonArea: {
      marginBottom: 50
  },
  buttonRegist: {
      backgroundColor: '#6e3f25',
      marginVertical: 10,
      padding: 9,
      borderRadius: 0,
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
  loginNav: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  loginNavText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonTextLogin: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline'
  },
})

export default Signup;
