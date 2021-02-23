import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header'
import Products from '../components/Products'
import Result from '../components/Result'
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

  return <View>
    <Header style={styles.header} setFocus={setFocus} term={term} setTerm={setTerm} />
    {searchList && searchList.length > 0 && focus ? <Result navigation={navigation} searchList={searchList} /> : <View></View>}
    <Products loading={loading} products={products} navigation={navigation} />
  </View>
}

const styles = StyleSheet.create({
  header: { position: 'relative' },
})

export default Main