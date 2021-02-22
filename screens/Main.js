import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header'
import Products from '../components/Products'
import axios from 'axios'

const Main = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [loading, setloading] = useState(true)
  const [term, setTerm] = useState('')
  const [searchList, setSearchList] = useState([])
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (!term || term.length < 3) {
      setSearchList([])
    } else {
      const timer = setTimeout(function() {
        let array = []
        for (let i = 0; i < products.length; i++) {
          if (products[i].name.toLowerCase().includes(term.toLowerCase()) || products[i].brand.toLowerCase().includes(term.toLowerCase())) {
            array.push(products[i])
          }
        }
        array.splice(5)
        setSearchList(array)
      }, 100)
      return () => clearTimeout(timer);
    }
  }, [term])

  useEffect(() => {
    const fetchData = async () => {
      if (products.length < 1) {
        await axios.get('https://ac7j0yqyw7.execute-api.us-east-2.amazonaws.com/dev/products')
          .then((response) => {
            setProducts(response.data)
            setloading(false)
          });
      }
    }
    fetchData()
  }, []);

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

  return <View>
    <Header style={styles.header} setFocus={setFocus} term={term} setTerm={setTerm} />
    {searchList && searchList.length > 0 && focus ? <View style={styles.search}>{listItem}</View> : <View></View>}
    <Products loading={loading} products={products} navigation={navigation} />
  </View>
}

const styles = StyleSheet.create({
  header: { position: 'relative' },
  search: { position: 'absolute', zIndex: 2, top: 100, width: '100%', backgroundColor: 'white' },
  image: { marginLeft: 30, width: 50, height: 50 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  title: { marginLeft: 25, fontSize: 18 }
})

export default Main