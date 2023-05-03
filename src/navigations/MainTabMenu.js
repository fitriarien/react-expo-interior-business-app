import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductNavigation from './ProductNavigation';
import OrderNavigation from './OrderNavigation';
import { MaterialCommunityIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ProfileNavigation from './ProfileNavigation';
import OrderForm from '../screens/OrderForm';

const Tab = createBottomTabNavigator();

const MainTabMenu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Products Nav'
        component={ProductNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="sofa-single-outline" size={24} color="black" />,
          tabBarLabel: 'Products',
          unmountOnBlur: false
        }}
      />
      <Tab.Screen
        name='Order Form'
        component={OrderForm}
        options={{
          headerShown: true,
          tabBarIcon: () => <Ionicons name="build-outline" size={24} color="black" />,
          tabBarLabel: 'Order Project',
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name='Order Nav'
        component={OrderNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome5 name="list-alt" size={24} color="black" />,
          tabBarLabel: 'Order List',
          unmountOnBlur: false
        }}
      />
      <Tab.Screen
        name='Profile Nav'
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user-o" size={24} color="black" />,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}


export default MainTabMenu;
