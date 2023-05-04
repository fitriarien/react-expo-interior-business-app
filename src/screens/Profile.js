import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import serverApi from '../util/server-api';
import { FontAwesome } from '@expo/vector-icons';
import Logout from '../components/Logout';

const Profile = () => {
  const [ userProfile, setUserProfile ] = useState({});
  const [ isActive, setIsActive ] = useState(true);

  const fetchProfile = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');

    try {
      let {status, data} = await serverApi.get(`api/user/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(status);
      // console.log(data);
      setUserProfile(data);
      
      if (data.status === 1) {
        // dispatch({ type: 'SET_ACTIVE'});
        setIsActive(true);
      } else {
        // dispatch({ type: 'SET_DEACT'});
        setIsActive(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [isActive]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const handleDeactive = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: deactiveAccount
        }
      ],
      { cancelable: false }
    );
  };

  const deactiveAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      await serverApi.put(`api/user/delete/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIsActive(false);
      Alert.alert("Your account has been deactivated!");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.userProfile} name="user-circle" size={80} color="gray" />
      <Text style={styles.name}>{userProfile.name}</Text>
      <View style={styles.detail}>
        <Text style={styles.field}>Username</Text>
        <Text style={styles.dataField}>{userProfile.username}</Text>
        <Text style={styles.field}>Email</Text>
        <Text style={styles.dataField}>{userProfile.email}</Text>
        <Text style={styles.field}>Phone Number</Text>
        <Text style={styles.dataField}>{userProfile.contact}</Text>
        <Text style={styles.field}>Address</Text>
        <Text style={styles.dataField}>{userProfile.address}</Text>
        <Text style={styles.field}>Status</Text>
        {userProfile.status === 1
        ? 
          <Text style={styles.dataField}>Active</Text>
        :
          <Text style={styles.dataField}>Inactive</Text>
        }
      </View>
      <Logout />
      { isActive && 
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeactive}>
          <Text style={styles.deleteText}>Deactive Account</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userProfile: {
    paddingBottom: 10,
    alignSelf: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
    alignSelf: 'center'
  },
  detail: {
    borderTopColor: '#ccc',
    borderTopWidth: 2,
    paddingVertical: 10
  },
  field: {
    fontSize: 17,
    fontWeight: '600',
    padding: 5
  },
  dataField: {
    fontSize: 17,
    fontWeight: '500',
    padding: 5,
  },
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
  deleteButton: {
    paddingVertical: 6,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'red',
  },
  deleteText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  }
})

export default Profile;
