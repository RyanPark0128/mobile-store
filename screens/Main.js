import React from 'react'
import { Text, View } from 'react-native';
import Header from '../components/Header'
import Products from '../components/Products'

const Main = ({ navigation }) => {
  return <View>
    <Header />
    <Products navigation={navigation} />
  </View>
}

export default Main