import React, { useState, useEffect, useCallback } from 'react';
import {View, StyleSheet, Text, ScrollView, Image, ScrollViewComponent} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const { data, status } = await serverApi.get('api/product/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(status);
      // console.log(data);

      const filteredProducts = data.filter(product => (product.product_status !== 0));
      setProducts(filteredProducts);
      
      
    } catch (error) {
      console.error(error);
      if (error === "Request failed with status code 401") {
        await AsyncStorage.clear();
        navigation.navigate('Login');
      }
    }
  }

  useEffect(() => {
    setProducts([]);
    fetchProducts();
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  )

  return (
    <SafeAreaView style={{paddingBottom: 10}}>
      <ScrollView style={{paddingVertical: 10, backgroundColor: '#det534'}}>
        <View style={{alignItems: 'center', paddingTop: 5}}>
          <Text style={styles.title}>Upgrade Your Home,</Text>
          <Text style={styles.title}>Improve Your Comfort!</Text>
        </View>
        {products.map(product => (
          <ProductCard key={product.product_id} product={product}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  }
})

export default Products;
