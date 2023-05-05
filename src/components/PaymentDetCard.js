import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const PaymentDetCard = ({payment}) => {
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(payment.payment_amount), code: "IDR" });
  const formattedDate = payment.payment_date.toLocalDateString();

  return (
    <View style={styles.paymentInfo}>
      <Text style={[styles.info, styles.productDet]}>Payment ID: {payment.payment_id}</Text>
      <Text style={[styles.info, styles.productDet]}>Date: {formattedDate}</Text>
      <Text style={[styles.info, styles.productDet]}>Method: {payment.payment_method}</Text>
      <Text style={[styles.info, styles.productCost]}>Amount: {valueFormattedWithoutSymbol}</Text>
      <Text style={[styles.info, styles.productDet]}>Notes: {payment.payment_detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
})

export default PaymentDetCard;
