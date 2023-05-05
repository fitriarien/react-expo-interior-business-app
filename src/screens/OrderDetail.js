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
import RemainingPayment from '../components/RemainingPayment';

const OrderDetail = ({route, navigation}) => {
  const { orderId } = route.params;
  const [isFound, setIsFound] = useState(false);
  const [details, setDetails] = useState({});
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

      if (status === 200) {
        setIsFound(true);
        setDetails(data);
        setOrderDetList(data.orderDetDAOList);
        setPaymentList(data.paymentDAOList);
      }

      if (data.order_amount === 0) {
        setIsFound(false);
      }
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
  }

  return (
    <ScrollView key={orderId} style={styles.card}>
      { isFound 
      ? 
        <View>
          {orderDetList.map(orderDet => (
            <View key={orderDet.order_det_id}>
              <OrderDetCard orderDet={orderDet}/>
            </View>
          ))}
          <View style={styles.contentTotal}>
            <Text style={[styles.info, styles.totalCost]}>Total Cost</Text>
            <Text style={[styles.info, styles.totalCost]}>{valueFormattedWithSymbol}</Text>
          </View>
          <Text style={[styles.info, styles.paymentTitle]}>Payment</Text>
          {paymentList.map(payment => (
            <View key={payment.payment_id}>
              <PaymentDetCard payment={payment} />
            </View>
          ))}
          <TotalPayment paymentList={paymentList} />
          <RemainingPayment paymentList={paymentList} orderAmount={details.order_amount} />
          <TouchableOpacity style={[styles.payButton, isFullPaid && styles.disabledButton]} onPress={handlePayButton}>
            <Text style={styles.payText}>Pay</Text>
          </TouchableOpacity>
        </View>
      :
        <View>
          <View style={{alignItems: 'center', padding: 25}}>
            <Text style={styles.title}>There are no recent updates.</Text>
          </View>
        </View>
      }
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
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'right',
  },
  contentTotal: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderBottomColor: 'gray', 
    borderBottomWidth: 2,
    marginHorizontal: 8
  },
  paymentTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    
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
  },
  disabledButton: {
    opacity: 0.5
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
  },
})

export default OrderDetail;
