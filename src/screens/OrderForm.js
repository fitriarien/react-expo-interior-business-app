import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native';
import serverApi from '../util/server-api';
import { useNavigation } from '@react-navigation/native';

const OrderForm = () => {
  const [ profile, setProfile ] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ visitDetail, setVisitDetail ] = useState({
    visitDate: "",
    visitTime: ""
  });
  const navigation = useNavigation();

  // fetch data dari profile
  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      const {data, status} = await serverApi.get(`api/user/view/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // console.log(status);
      // console.log(data);
      setProfile(data);

    } catch (error) {
      throw new Error("Something error while fetching!")
    }
  }

  useEffect(() => {
    fetchProfile();
    if (day && month && year && hour && minute) {
      setVisitDetail({
        visitDate: year+'-'+month+'-'+day,
        visitTime: hour+':'+minute
      });
    }
  }, [day, month, year, hour, minute]);

  const submitOrder = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      
      const {data, status} = await serverApi.post(`api/order/${userId}`, {
        visit_date: visitDetail.visitDate,
        visit_time: visitDetail.visitTime,
        visit_address: profile.address
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (status === 200 || status === 201) {
        console.log(status);
        Alert.alert("Order successfully created!");
        setVisitDetail({
          visitDate: "",
          visitTime: ""
        });
        navigation.navigate('Order List');
      } 
    } catch (error) {
      throw new Error("Something error while fetching!");
    }
  }

  return (
    <View>
      <ScrollView style={{paddingVertical: 10, backgroundColor: '#det534', marginBottom: 5}}>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Text style={styles.title}>Schedule your consultation with our professional designers now!</Text>
        </View>
        <View style={{padding: 10}}>
          <View style={{paddingBottom: 15}}>
            <Text style={styles.titleForm}>Contact Information</Text>
            {profile.status === 0 && <Text style={{color: 'red'}}>Your account is inactive, you cannot order the project.</Text>}
            <Text style={styles.columnName}>Name: </Text>
            <Text style={styles.textContact}>{profile.name}</Text>
            <Text style={styles.columnName}>Email: </Text>
            <Text style={styles.textContact}>{profile.email}</Text>
            <Text style={styles.columnName}>Phone Number: </Text>
            <Text style={styles.textContact}>{profile.contact}</Text>
          </View>
          <View style={{paddingBottom: 15}}>
            <Text style={styles.titleForm}>Visit Place & Time</Text>
            <Text style={styles.columnName}>Address: </Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Address" 
              value={profile.address} 
              onChangeText={value => setProfile(curr => { return { ...curr, address: value} } )}
            />
            <View >
              <Text style={styles.columnName}>Visit Date: </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TextInput 
                style={styles.dateInput} 
                placeholder="DD" 
                value={day} 
                onChangeText={setDay}
              />
              <Text style={styles.separator}>-</Text>
              <TextInput 
                style={styles.dateInput} 
                placeholder="MM" 
                value={month} 
                onChangeText={setMonth}
              />
              <Text style={styles.separator}>-</Text>
              <TextInput 
                style={styles.yearInput} 
                placeholder="YYYY" 
                value={year} 
                onChangeText={setYear}
              />
            </View>
            <Text style={styles.columnName}>Visit Time: </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TextInput 
                style={styles.dateInput} 
                placeholder="HH" 
                value={hour} 
                onChangeText={setHour}
              />
              <Text style={styles.separator}> : </Text>
              <TextInput 
                style={styles.dateInput} 
                placeholder="MM" 
                value={minute} 
                onChangeText={setMinute}
              />
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.submitButton, (visitDetail.visitDate === '' || visitDetail.visitTime === '' || profile.status === 0) && styles.disabledButton]} 
            disabled={visitDetail.visitDate === '' || visitDetail.visitTime === ''}
            onPress={submitOrder}
          >
            <Text style={styles.submitText}>Submit Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    marginVertical: 5,
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

export default OrderForm;
