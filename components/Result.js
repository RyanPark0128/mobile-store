import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const Result = ({ navigation, searchList }) => {
  const listItem = searchList.map((item, index) =>
    <TouchableOpacity style={styles.searchContainer} key={index} onPress={() => navigation.navigate('Detail', {
      itemId: item.id,
      name: item.name,
      price: item.price,
      brand: item.brand,
      image: item.image
    })}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
  return <View style={styles.search}>
    {listItem}
  </View>
}

const styles = StyleSheet.create({
  search: { position: 'absolute', zIndex: 2, top: 100, width: '100%', backgroundColor: 'white' },
  image: { marginLeft: 30, width: 50, height: 50 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  title: { marginLeft: 25, fontSize: 18 }
})

export default Result