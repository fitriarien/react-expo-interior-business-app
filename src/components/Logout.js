import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import serverApi from '../util/server-api';

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: logout
        },
      ],
      { cancelable: false }
    )
  }

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await serverApi.post('api/logout/', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await AsyncStorage.clear();
      dispatch({ type: 'SET_LOGOUT'});
      navigation.navigate('Login');

    } catch(err) {
      Alert.alert(err)
    }
  }

  return (
    <View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    paddingVertical: 6,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    // backgroundColor: '#faf5ef',
  },
  logoutText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default Logout;
