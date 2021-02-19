import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import Products from '../components/Products'
import axios from 'axios'

const Main = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [loading, setloading] = useState(true)
  const [term, setTerm] = useState('')
  const [searchList, setSearchList] = useState([])

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
        setSearchList(array)
      }, 100)
      return () => clearTimeout(timer);
    }
  }, [term])

  useEffect(() => {
    const fetchData = async () => {
      if (products.length < 1) {
        axios.get('https://ac7j0yqyw7.execute-api.us-east-2.amazonaws.com/dev/products')
          .then((response) => {
            setProducts(response.data)
            setloading(false)
          });
      }
    }
    fetchData()
  }, []);

  const listItem = searchList.map((item, index) =>
    <View key={index}>
      <Text>
        {item.name}
      </Text>
    </View>
  )

  return <View>
    <Header style={styles.header} term={term} setTerm={setTerm} />
    {searchList && searchList.length > 0 ? <View style={styles.search}>{listItem}</View> : <View></View>}
    <Products loading={loading} products={products} navigation={navigation} />
  </View>
}

const styles = StyleSheet.create({
  header: { position: 'relative' },
  search: { position: 'absolute', zIndex: 2, top: 100, width: '100%', height: 300, backgroundColor: 'white' }
})

export default Main