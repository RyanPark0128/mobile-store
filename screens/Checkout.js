import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  })

  const listCart = cart && cart.map((item, index) =>
    <View key={index} style={{ flexDirection: 'row' }}>
      <Text>
        {item.name}
      </Text>
      <Text>
        {item.brand}
      </Text>
      <Text>
        {item.price}
      </Text>
      <Text>
        {item.quantity}
      </Text>
    </View>
  )

  return <View style={styles.container}>
    {cart ? listCart : <Text> no items in cart </Text>}
  </View>
}

const styles = StyleSheet.create({
  container: { marginTop: 50 }
})
export default Checkout