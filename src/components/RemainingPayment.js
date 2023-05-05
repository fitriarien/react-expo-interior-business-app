import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const RemainingPayment = ({paymentList, orderAmount}) => {
  let totalPayment = 0;
  const subPayment = paymentList.map(sub => {
    return totalPayment += sub.payment_amount;
  })
  let remainingPayment = orderAmount-totalPayment;
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(remainingPayment), code: "IDR" });

  return (
    <View style={styles.contentTotal}>
      <Text style={[styles.info, styles.totalCost]}>Remaining Payment</Text>
      <Text style={[styles.info, styles.remainingCost, (remainingPayment === 0) && styles.zero]}>{valueFormattedWithSymbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTotal: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderBottomColor: 'gray', 
    borderBottomWidth: 2,
    marginHorizontal: 8
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
  remainingCost: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'right',
    color: 'red'
  },
  zero: {
    color: 'black'
  }
})

export default RemainingPayment;
