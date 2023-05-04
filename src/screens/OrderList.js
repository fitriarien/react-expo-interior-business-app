import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import {View, ScrollView, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import serverApi from '../util/server-api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import OrderCard from '../components/OrderCard';

const OrderList = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [isFound, setIsFound] = useState(false);

  const fetchOrders = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");

      const { data, status } = await serverApi.get(`api/order/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.log(status);
      // console.log(JSON.stringify(data));
      if (status === 200) {
        setIsFound(true);
        setOrders(data);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    setOrders([]);
    fetchOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  )

  const goToDetails = async (orderId) => {
    orders.forEach(order => {
      if (orderId === order.order_id) {
        navigation.navigate('Order Detail', { orderId: order.order_id });
      }
    });
  };
  

  return (
    <ScrollView style={{}}>
      {isFound 
      ? 
        orders.map(order => (
          <View key={order.order_id} style={styles.card}>
            <OrderCard order={order} goToDetails={goToDetails}/>
          </View>
        ))
      :
        <View>
          <View style={{alignItems: 'center', padding: 25}}>
            <Text style={styles.title}>Belum ada proyek yang dipesan.</Text>
            <Text style={styles.subtitle}>Lihat produk dan jadwalkan kunjungan dengan Desainer Profesional kami sekarang!</Text>
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
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white'
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    resizeMode: 'contain'
  },
  scheduleInfo: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  info: {
    color: 'black',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  schedule: {
    fontSize: 15,
    paddingLeft: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonArea: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default OrderList;
