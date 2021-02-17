import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

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


  const removeItem = async (index) => {
    let array = cart
    array.splice(index, 1)
    await AsyncStorage.setItem('@carts', JSON.stringify(array))
    fetchItems()
  }

  const handleQuantity = async (oper, index) => {
    let array = cart
    if (oper) {
      array[index].quantity = array[index].quantity + 1
      await AsyncStorage.setItem('@carts', JSON.stringify(array))
    } else {
      if (array[index].quantity > 1) {
        array[index].quantity = array[index].quantity - 1
        await AsyncStorage.setItem('@carts', JSON.stringify(array))
      } else {
        return
      }
    }

    fetchItems()
  }

  const listCart = cart && cart.map((item, index) =>
    <View key={index} style={{ flexDirection: 'row', width: '90%', marginBottom: 15 }}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.desc}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.brand}>
          {item.brand}
        </Text>
        <Text style={styles.price}>
          {item.price}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.quantity}>
            Qty :
          </Text>
          <TouchableOpacity onPress={() => handleQuantity(true, index)} style={styles.operator}>
            <AntDesign name="pluscircleo" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>
            {item.quantity}
          </Text>
          <TouchableOpacity onPress={() => handleQuantity(false, index)} style={styles.operator}>
            <AntDesign name="minuscircleo" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(index)} style={{ justifyContent: 'center', marginLeft: 'auto' }}>
        <AntDesign name="closecircleo" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )

  return <View style={{ backgroundColor: 'white' }}>
    <Text style={styles.header}>
      Cart
    </Text>
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      {cart.length > 0 ? listCart
        :
        <View style={styles.noneWrap}>
          <Text style={styles.none}> no items in cart </Text>
        </View>}
    </ScrollView>
    <View style={styles.summary}>
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
  </View>
}

const styles = StyleSheet.create({
  header: { fontSize: 30, textAlign: 'center', width: '100%', marginTop: 50 },
  container: { marginTop: 30, height: '55%' },
  image: { width: 100, height: 100, borderRadius: 10 },
  desc: {
    marginLeft: 30,
    width: '50%'
  },
  title: { fontSize: 22 },
  brand: { fontSize: 19, color: 'grey' },
  price: { fontSize: 19 },
  quantity: { fontSize: 19 },
  operator: { paddingLeft: 10, paddingRight: 10 },
  summary: { height: '30%', alignItems: 'center', paddingTop: 10, borderTopColor: '#F5F5F5', borderTopWidth: 1 },
  row: { flexDirection: 'row', width: '90%', marginTop: 10 },
  first: { fontSize: 20 },
  second: { marginLeft: 'auto', fontSize: 20 },
  button: { backgroundColor: '#f4511e', width: '90%', marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  pay: { fontSize: 20 },
  none: { fontSize: 20 },
  noneWrap: { height: '100%', justifyContent: 'center', alignItems: 'center' }
})
export default Checkout