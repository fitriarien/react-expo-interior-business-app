import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverApi from '../util/server-api';

const UpdateProfile = ({navigation}) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [data, setData] = useState({});

  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      const {status, data} = await serverApi.get(`api/user/view/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(status);
      // console.log(data);
      setData(data);
      setUpdatedData(data);

    } catch (error) {
      console.error(error);
    }
  }

  const updateProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      const {data, status} = await serverApi.put(`api/user/update/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.log(status);
      // console.log(data);

      if (status === 200 || status === 201) {
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ScrollView style={{padding: 10, backgroundColor: '#det534', marginBottom: 5}}>
      <View style={{paddingBottom: 15}}>
        <Text style={styles.columnName}>Name: </Text>
        <TextInput 
          style={styles.textInput}
          value={updatedData.name}
          onChangeText={value => {
            if (value === '') {
              setUpdatedData(curr => { return { ...curr, name: data.name } })
            } else {
              setUpdatedData(curr => { return { ...curr, name: value } })
            }
          }}
          onSubmitEditing={(event) => {
            event.preventDefault();
          }}
        />
        <Text style={styles.columnName}>Email: </Text>
        <TextInput 
          style={styles.textInput}
          value={updatedData.email}
          onChangeText={value => {
            if (value === '') {
              setUpdatedData(curr => { return { ...curr, email: data.email} } )
            } else {
              setUpdatedData(curr => { return { ...curr, email: value} } )
            }
          }}
        />
        <Text style={styles.columnName}>Phone Number: </Text>
        <TextInput 
          style={styles.textInput}
          value={updatedData.contact} 
          onChangeText={value => {
            if (value === '') {
              setUpdatedData(curr => { return { ...curr, contact: data.contact} } )
            } else {
              setUpdatedData(curr => { return { ...curr, contact: value} } )
            }
          }}
        />
        <Text style={styles.columnName}>Address: </Text>
        <TextInput 
          style={styles.textInput}
          value={updatedData.address}
          onChangeText={value => {
            if (value === '') {
              setUpdatedData(curr => { return { ...curr, address: data.address} } )
            } else {
              setUpdatedData(curr => { return { ...curr, address: value} } )
            }
          }}
        />
        <TouchableOpacity style={[styles.submitButton, (updatedData.name === "" || updatedData.email === "" || updatedData.contact === "" || updatedData.address === "") && styles.disabledButton]} onPress={updateProfile}>
          <Text style={styles.submitText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleForm: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingVertical: 5
  },
  productInfo: {
    fontSize: 16,
    paddingVertical: 2,
  },
  columnName: {
    fontSize: 16,
    paddingVertical: 5,
  },
  separator: {
    fontSize: 18,
    paddingHorizontal: 5,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    marginRight: 5,
    borderRadius: 3,
    width: '100%',
  },
  dateInput: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    marginHorizontal: 5,
    borderRadius: 3,
    width: '13%',
  },
  yearInput: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    marginHorizontal: 5,
    borderRadius: 3,
    width: '17%',
  },
  textContact: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    marginRight: 5,
    borderRadius: 3,
    width: '100%',
    color: 'gray'
  },
  submitButton: {
    paddingVertical: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: 'black',
  },
  submitText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.8,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  }
})

export default UpdateProfile;
