import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({product}) => {
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(product.estimated_cost), code: "IDR" })
  const navigation = useNavigation();

  // const goToVisitOrder = async () => {
  //   navigation.navigate('Visit Order', {productId: product.product_id})
  // }

  return (
    <View style={styles.card}>
      <View style={styles.coverArea}>
        {product.imageDAO?.image !== null
        ?
          <Image source={{uri: product.imageDAO?.image}} style={styles.cover}/>
        :
          <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}} style={styles.cover}/>
        }
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.info, styles.productName]}>{product.product_name}</Text>
        <Text style={[styles.info, styles.productModel]}>{product.product_model}</Text>
        <Text style={[styles.info, styles.productCost]}>{'\u00B1'} {valueFormattedWithSymbol}</Text>
      </View>
      {/* <TouchableOpacity style={styles.logoutButton} onPress={goToVisitOrder}>
        <Text style={styles.logoutText}>Order Project</Text>
      </TouchableOpacity> */}
    </View>
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
  coverArea: {
    alignItems: 'center'
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    resizeMode: 'cover'
  },
  productInfo: {
    padding: 5
  },
  info: {
    color: 'black',
    padding: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productModel: {
    fontSize: 15
  },
  productCost: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  logoutButton: {
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    width: '35%',
    alignSelf: 'flex-end',
  },
  logoutText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  }
})

export default ProductCard;
