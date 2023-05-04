import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const TotalPayment = ({paymentList}) => {
  let totalPayment = 0;
  const subPayment = paymentList.map(sub => {
    return totalPayment += sub.payment_amount;
  })
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(totalPayment), code: "IDR" });

  return (
    <View>
      <Text style={[styles.info, styles.totalCost]}>Total Payment: {valueFormattedWithSymbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    color: 'black',
    padding: 2,
  },
  totalCost: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'right',
    marginHorizontal: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
})

export default TotalPayment;
