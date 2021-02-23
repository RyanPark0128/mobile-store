import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Summary from '../components/Summary'
import Cart from '../components/Cart'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation }) => {
  const [cart, setCart] = useState([])
  const [subtotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [total, setTotal] = useState(0)

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
  useEffect(() => {
    const focus = navigation.addListener('focus', fetchItems);
    return focus
  }, [navigation])

  useEffect(() => {
    if (cart && cart.length > 0) {
      setShipping(9.99)
      let sum = 0
      for (let i = 0; i < cart.length; i++) {
        sum = sum + (cart[i].price * cart[i].quantity)
      }
      setSubTotal(sum)
      setTax(sum * 0.07)
      setTotal(sum * 1.07 + 9.99)
    } else {
      setShipping(0)
      setSubTotal(0)
      setTax(0)
      setTotal(0)
    }
  }, [cart])

  return <View style={{ backgroundColor: 'white' }}>
    <Cart cart={cart} fetchItems={fetchItems} />
    <Summary subtotal={subtotal} tax={tax} total={total} shipping={shipping} />
  </View>
}

export default Checkout