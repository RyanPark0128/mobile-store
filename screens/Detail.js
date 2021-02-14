import React from 'react'
import { View, Text } from 'react-native'

const Detail = ({ route, navigation }) => {
  const { itemId } = route.params;
  return <View>
    <Text>
      {itemId}
    </Text>
  </View>
}

export default Detail