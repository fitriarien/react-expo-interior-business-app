import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../screens/Products';
import VisitOrder from '../screens/VisitOrder';

const Stack = createNativeStackNavigator();

const ProductNavigation = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name='Products' 
        component={Products} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='Visit Order' 
        component={VisitOrder} 
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})

export default ProductNavigation;
