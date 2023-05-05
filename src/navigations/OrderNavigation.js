import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from '../screens/OrderList';
import OrderDetail from '../screens/OrderDetail';
import Payment from '../screens/Payment';

const Stack = createNativeStackNavigator();

const OrderNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{unmountOnBlur: true}}>
      <Stack.Screen name='Order List' component={OrderList} />
      <Stack.Screen name='Order Detail' component={OrderDetail} options={{unmountOnBlur: true}}/>
      <Stack.Screen name='Payment' component={Payment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})

export default OrderNavigation;
