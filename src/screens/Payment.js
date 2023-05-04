import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import serverApi from '../util/server-api';
import {SelectList} from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

const Payment = ({ route }) => {
  const { orderId } = route.params;
  const navigation = useNavigation();
  const [payment, setPayment] = useState({
    method: "",
    accountNumber: "",
    amount: 0,
    detail: ""
  });
  const [method, setMethod] = useState([
    {key: "Cash", value: "Cash"},
    {key: "Bank Transfer", value: "Bank Transfer"}
  ]);
  const [detail, setDetail] = useState([
    {key: "Down Payment", value: "Down Payment"},
    {key: "Pelunasan", value: "Pelunasan"},
  ]);

  const handlePayment = () => {
    Alert.alert(
      'Payment',
      'Are you sure your data is correct?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: submitPayment
        },
      ],
      { cancelable: false }
    )
  }

  const submitPayment = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      const {data, status} = await serverApi.post(`api/payment/${orderId}/${userId}`, {
        payment_method: payment.method,
        tf_acc_number: payment.accountNumber,
        payment_amount: payment.amount,
        payment_detail: payment.detail
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.log(status);
      // console.log(data);

      if (status === 200 || status === 201) {
        navigation.goBack();
        setPayment({
          method: "",
          accountNumber: "",
          amount: 0,
          detail: ""
        });
        Alert.alert("Payment successfully submitted!")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView style={{padding: 10, backgroundColor: '#det534', marginBottom: 5}}>
      <View style={{paddingBottom: 15}}>
        <Text style={styles.titleForm}>Fill in the payment form!</Text>
        <Text style={styles.columnName}>Method: </Text>
        <SelectList
          data={method}
          setSelected={value => setPayment(curr => { return { ...curr, method: value } })}
          maxHeight={100}
          boxStyles={{backgroundColor: 'white', width: '100%', borderRadius: 0, borderColor: 'white'}}
          placeholder='Select Method'
          dropdownStyles={{backgroundColor: 'white', borderRadius: 0, borderColor: 'white'}} 
          dropdownTextStyles={{fontSize: 15}}
        />
        { payment.method === 'Bank Transfer' && 
          <View>
            <Text style={styles.columnName}>Account Bank Number: </Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="0123456789" 
              value={payment.accountNumber.toString()} 
              onChangeText={value => setPayment(curr => { return { ...curr, accountNumber: value} } )}
            />
          </View>
        }
        <Text style={styles.columnName}>Amount: </Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="0" 
          value={payment.amount}
          keyboardType="numeric" 
          onChangeText={value => setPayment(curr => { return { ...curr, amount: parseInt(value)} } )}
        />
        <Text style={styles.columnName}>Detail: </Text>
        <SelectList
          data={detail}
          setSelected={value => setPayment(curr => { return { ...curr, detail: value } })}
          maxHeight={100}
          boxStyles={{backgroundColor: 'white', width: '100%', borderRadius: 0, borderColor: 'white'}}
          placeholder='Select Payment Detail'
          dropdownStyles={{backgroundColor: 'white', borderRadius: 0, borderColor: 'white'}} 
          dropdownTextStyles={{fontSize: 15}}
        />
        <TouchableOpacity 
          style={[styles.submitButton, (payment.method === '' || payment.amount === 0 || payment.detail === '') && styles.disabledButton]} 
          disabled={payment.method === '' || payment.amount === 0 || payment.detail === ''}
          onPress={handlePayment}
        >
          <Text style={styles.submitText}>Submit Payment</Text>
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

export default Payment;
