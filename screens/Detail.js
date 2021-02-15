import React from 'react'
import { View, Text } from 'react-native'
import Item from '../components/Item'

const Detail = ({ route, navigation }) => {
  // const { itemId } = route.params;
  return <View style={{ alignItems: 'center' }}>
    <Item route={route} navigation={navigation} />
  </View>
}

export default Detail