import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const Checkout = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const value = await AsyncStorage.getItem('@carts')
        if (value === null) {
          setCart(null)
        } else {
          setCart(JSON.parse(value))
        }
      } catch (e) {
        // saving error
      }
    }
    fetchItems()
  }, [])

  const listCart = cart && cart.map((item, index) =>
    <View key={index} style={{ flexDirection: 'row', width: '90%', marginBottom: 15 }}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.desc}>
        <Text style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.brand}>
          {item.brand}
        </Text>
        <Text style={styles.price}>
          {item.price}
        </Text>
        <Text style={styles.quantity}>
          Qty : {item.quantity}
        </Text>
      </View>
      <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
        <AntDesign name="closecircleo" size={30} color="black" />
      </View>
    </View>
  )

  return <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
    {cart ? listCart : <Text> no items in cart </Text>}
  </ScrollView>
}

const styles = StyleSheet.create({
  container: { marginTop: 50 },
  image: { width: 75, height: 75, borderRadius: 10 },
  desc: {
    marginLeft: 30
  },
  title: { fontSize: 18 },
  brand: { fontSize: 15, color: 'grey' },
  price: { fontSize: 15 },
  quantity: { fontSize: 15 }
})
export default Checkout