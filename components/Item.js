import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ route }) => {
  const [quantity, setQuantity] = useState(1)
  const { itemId, name, price, brand, image } = route.params

  const handleItem = async () => {
    const cartItem = {
      itemId,
      name,
      price,
      brand,
      image,
      quantity
    }
    try {
      const value = await AsyncStorage.getItem('@carts')
      if (value === null) {
        let list = [cartItem]
        AsyncStorage.setItem('@carts', JSON.stringify(list))
      } else {
        let newValue = JSON.parse(value)
        newValue.push(cartItem)
        AsyncStorage.setItem('@carts', JSON.stringify(newValue))
      }
    } catch (e) {
      // saving error
    }
  }

  return <View style={styles.container}>
    <Image style={styles.image} source={{ uri: image }} />
    <Text style={styles.title}>
      {name}
    </Text>
    <Text style={styles.brand}>
      {brand}
    </Text>
    <Text style={styles.price}>
      {price}
    </Text>
    <View style={styles.subContainer}>
      <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.operator}>
        <AntDesign name="pluscircleo" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.quantity}>
        {quantity}
      </Text>
      <TouchableOpacity onPress={quantity > 1 ? () => setQuantity(quantity - 1) : () => setQuantity(quantity)} style={styles.operator}>
        <AntDesign name="minuscircleo" size={30} color="black" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={() => handleItem()} style={styles.button}>
      <AntDesign style={styles.icon} name="shoppingcart" size={24} color="black" />
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container: { width: '80%', height: '100%', marginTop: 50 },
  image: {
    width: 300, height: 300,
  },
  title: {
    fontSize: 25, marginTop: 10
  },
  brand: { fontSize: 18, color: 'grey', marginTop: 5 },
  price: { fontSize: 18, marginTop: 5 },
  button: { position: 'absolute', bottom: '20%', width: '100%', backgroundColor: '#DCDCDC', height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  subContainer: { flexDirection: 'row', marginTop: 30, width: '100%', alignItems: 'center', justifyContent: 'center' },
  quantity: { fontSize: 30, margin: 30 },
  operator: { padding: '5%' }

})

export default Item