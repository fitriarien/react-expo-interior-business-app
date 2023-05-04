import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import OrderDetCard from '../components/OrderDetCard';
import PaymentDetCard from '../components/PaymentDetCard';
import TotalPayment from '../components/TotalPayment';

const OrderDetail = ({route, navigation}) => {
  const { orderId } = route.params;
  const [ details, setDetails ] = useState({});
  const [orderDetList, setOrderDetList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isFullPaid, setIsFullPaid] = useState(false);
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(details.order_amount), code: "IDR" });

  const fetchDetails = async () => {
    try {
      // console.log(orderId);
      const userId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");

      const { data, status } = await serverApi.get(`api/order/${orderId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.log(status);
      // console.log(data);
      // console.log(JSON.stringify(data));

      setDetails(data);
      setOrderDetList(data.orderDetDAOList);
      setPaymentList(data.paymentDAOList);

    } catch (error) {
      throw new Error('Something error while fetching!');
    }
  }

  useEffect(() => {
    fetchDetails(); 
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, [])
  )

  const handlePayButton = async () => {
    let total = 0;
    // console.log(JSON.stringify(orderDetList));
    paymentList.forEach(payment => {
      total += payment.payment_amount;
      setTotalPayment(total);
    });

    if (total === details.order_amount && total !== 0) {
      setIsFullPaid(true);
      Alert.alert("Your payment is all set!");
    } else if (total < details.order_amount || total === 0) {
      setIsFullPaid(false);
      navigation.navigate('Payment', {orderId: orderId});
    } else {
      Alert.alert("Something error with the payment!")
    }

    total = 0;
  }

  return (
    <ScrollView key={orderId} style={styles.card}>
      {orderDetList.map(orderDet => (
        <View key={orderDet.order_det_id}>
          <OrderDetCard orderDet={orderDet}/>
        </View>
      ))}
      <Text style={[styles.info, styles.totalCost]}>Total Cost: {valueFormattedWithSymbol}</Text>
      <Text style={[styles.info, styles.paymentTitle]}>Payment</Text>
      {paymentList.map(payment => (
        <View key={payment.payment_id}>
          <PaymentDetCard payment={payment} />
        </View>
      ))}
      <TotalPayment paymentList={paymentList} />
      <TouchableOpacity style={styles.payButton} onPress={handlePayButton}>
        <Text style={styles.payText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  info: {
    color: 'black',
    padding: 2,
  },
  totalCost: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'right',
    marginHorizontal: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  paymentTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    
  },
  payButton: {
    paddingVertical: 6,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'black',
  },
  payText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  }
})

export default OrderDetail;
