import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const OrderCard = ({order, goToDetails}) => {
  
  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 17, padding: 5, fontWeight: 'bold'}}>Order Code: {order.order_code}</Text>
          <Text style={{fontSize: 15, paddingHorizontal: 5}}>Visit Schedule: </Text>
          <View style={styles.scheduleInfo}>
            <MaterialIcons name="date-range" size={24} color="black" />
            <Text style={[styles.info, styles.schedule]}>{order.visit_date}</Text>
            <Text style={[styles.info, styles.schedule]}>{order.visit_time}</Text>
          </View>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={() => goToDetails(order.order_id)}>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
})

export default OrderCard;
