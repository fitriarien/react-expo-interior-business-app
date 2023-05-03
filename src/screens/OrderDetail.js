import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const OrderDetail = ({route, navigation}) => {
  const { orderId } = route.params;
  const [ details, setDetails ] = useState({});
  const [orderDetList, setOrderDetList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isFullPaid, setIsFullPaid] = useState(false);
  // const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(orderDetList.forEach(orderDet => {
  //   return orderDet.subtotal
  // })), code: "IDR" })

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

      // paymentList.forEach(payment => {
      //   console.log(payment.payment_amount);
      //   return setTotalPayment(totalPayment+payment.payment_amount);
      // })

      // console.log(totalPayment);

      // if ((data.order_amount-totalPayment) == 0) {
      //   setIsFullPaid(true);
      // } else if (data.order_amount == totalPayment || ((data.order_amount-totalPayment) > 0)) {
      //   setIsFullPaid(false);
      // } 

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
    paymentList.forEach(payment => {
      total += payment.payment_amount;
      setTotalPayment(total); 
    })

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
          <View style={styles.card}>
            <View style={styles.coverArea}>
              <Image source={{uri: orderDet.productDAO.imageDAO.image}} style={styles.cover}/> 
            </View>
            <View style={styles.productInfo}>
              <Text style={[styles.info, styles.productName]}>{orderDet.productDAO.product_name}</Text>
              <Text style={[styles.info, styles.productDet]}>Model: {orderDet.productDAO.product_model}</Text>
              <Text style={[styles.info, styles.productDet]}>Theme: {orderDet.product_theme}</Text>
              <Text style={[styles.info, styles.productDet]}>Size: {orderDet.product_size} m2</Text>
              <Text style={[styles.info, styles.productDet]}>Subtotal: {orderDet.subtotal}</Text>
              <Text style={[styles.info, styles.productCost]}>Total: {details.order_amount}</Text>
            </View>
          </View>
        </View>
      ))}
      <Text style={[styles.info, styles.paymentTitle]}>Payment</Text>
      {paymentList.map(payment => (
        <View key={payment.payment_id}>
          <View style={styles.paymentInfo}>
            <Text style={[styles.info, styles.productDet]}>Payment ID: {payment.payment_id}</Text>
            <Text style={[styles.info, styles.productDet]}>Date: {payment.payment_date}</Text>
            <Text style={[styles.info, styles.productDet]}>Method: {payment.payment_method}</Text>
            <Text style={[styles.info, styles.productCost]}>Total: {payment.payment_amount}</Text>
            <Text style={[styles.info, styles.productDet]}>Notes: {payment.payment_detail}</Text>
          </View>
        </View>
      ))}
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
  coverArea: {
    alignItems: 'center',
    padding: 10,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  productInfo: {
    marginHorizontal: 8,
    paddingVertical: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  info: {
    color: 'black',
    padding: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productDet: {
    fontSize: 15
  },
  productCost: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  paymentInfo: {
    marginHorizontal: 10,
    paddingBottom: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  paymentTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  payButton: {
    paddingVertical: 6,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    // backgroundColor: '#faf5ef',
  },
  payText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  }
})

export default OrderDetail;
