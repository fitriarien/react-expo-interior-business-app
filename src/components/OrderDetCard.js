import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const OrderDetCard = ({orderDet}) => {
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(orderDet.subtotal), code: "IDR" });

  return (
    <View style={styles.card}>
      <View style={styles.coverArea}>
        <Image source={{uri: orderDet.productDAO.imageDAO.image}} style={styles.cover}/> 
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.info, styles.productName]}>{orderDet.productDAO.product_name}</Text>
        <Text style={[styles.info, styles.productDet]}>Model: {orderDet.productDAO.product_model}</Text>
        <Text style={[styles.info, styles.productDet]}>Theme: {orderDet.product_theme}</Text>
        <Text style={[styles.info, styles.productDet]}>Size: {orderDet.product_size} m2</Text>
        <Text style={[styles.info, styles.productCost]}>Subtotal: {valueFormattedWithoutSymbol}</Text>
      </View>
    </View>
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
})

export default OrderDetCard;
