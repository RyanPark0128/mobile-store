import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const Cart = ({ cart, fetchItems }) => {
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
          <TouchableOpacity onPress={() => handleQuantity(false, index)} style={styles.operator}>
            <AntDesign name="minuscircleo" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>
            {item.quantity}
          </Text>
          <TouchableOpacity onPress={() => handleQuantity(true, index)} style={styles.operator}>
            <AntDesign name="pluscircleo" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(index)} style={{ justifyContent: 'center', marginLeft: 'auto' }}>
        <AntDesign name="closecircleo" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
  return <View>
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
  none: { fontSize: 20 },
  noneWrap: { height: '100%', justifyContent: 'center', alignItems: 'center' }
})

export default Cart