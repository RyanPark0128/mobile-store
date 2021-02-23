import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Summary = ({ subtotal, tax, total, shipping }) => {
  return <View style={styles.summary}>
    <View style={styles.row}>
      <Text style={styles.first}>
        Subtotal
  </Text>
      <Text style={styles.second}>
        ${subtotal.toFixed(2)}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.first}>
        Tax
  </Text>
      <Text style={styles.second}>
        ${tax.toFixed(2)}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.first}>
        Shipping
  </Text>
      <Text style={styles.second}>
        ${shipping.toFixed(2)}
      </Text>
    </View>
    <View style={styles.line}>
    </View>
    <View style={styles.row}>
      <Text style={styles.first}>
        Total
  </Text>
      <Text style={styles.second}>
        ${total.toFixed(2)}
      </Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.pay}>
        Pay
    </Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  summary: { height: '30%', alignItems: 'center', paddingTop: 10, borderTopColor: '#F5F5F5', borderTopWidth: 1 },
  row: { flexDirection: 'row', width: '90%', marginTop: 10 },
  first: { fontSize: 20 },
  second: { marginLeft: 'auto', fontSize: 20 },
  button: { backgroundColor: '#f4511e', width: '90%', marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  pay: { fontSize: 20 },
})

export default Summary