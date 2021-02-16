import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import axios from 'axios'

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (products.length < 1) {
        axios.get('https://ac7j0yqyw7.execute-api.us-east-2.amazonaws.com/dev/products')
          .then((response) => {
            setProducts(response.data)
            console.log(response.data)
          });
      }
    }
    fetchData()
  }, []);

  const listItems = products.map((item, index) =>
    <TouchableOpacity
      key={index} style={styles.container} onPress={() => navigation.navigate('Detail', {
        itemId: item.id,
        name: item.name,
        price: item.price,
        brand: item.brand,
        image: item.image
      })}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.card}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  )
  return <ScrollView style={{ height: '89%' }} contentContainerStyle={{ alignItems: 'center' }}>
    {listItems}
  </ScrollView>
}

const styles = StyleSheet.create({
  container: { margin: 'auto', marginTop: 50, paddingBottom: 50, width: '80%' },
  image: { width: 300, height: 300, },
  title: { marginTop: 10, fontSize: 20 },
  card: { flexDirection: 'row', marginTop: 10 },
  brand: { fontSize: 16 },
  price: { marginLeft: 'auto', fontSize: 16 }
})

export default Products