import React from 'react'
import { View } from 'react-native'
import Item from '../components/Item'

const Detail = ({ route, navigation }) => {
  return <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
    <Item route={route} navigation={navigation} />
  </View>
}

export default Detail