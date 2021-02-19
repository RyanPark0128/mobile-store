import React from 'react'
import { ActivityIndicator, StyleSheet, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'

const Products = ({ navigation, products, loading }) => {

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
  return loading ? <View style={styles.loading}>
    <ActivityIndicator size="large" />
  </View>
    :
    <ScrollView style={{ height: '89%', backgroundColor: 'white' }} contentContainerStyle={{ alignItems: 'center' }}>
      {listItems}
    </ScrollView>
}

const styles = StyleSheet.create({
  container: { margin: 'auto', marginTop: 50, paddingBottom: 50, width: '80%', backgroundColor: 'white' },
  image: { width: 300, height: 300, },
  title: { marginTop: 10, fontSize: 20 },
  card: { flexDirection: 'row', marginTop: 10 },
  brand: { fontSize: 16 },
  price: { marginLeft: 'auto', fontSize: 16 },
  loading: { height: '80%', justifyContent: 'center', alignItems: 'center' }
})

export default Products