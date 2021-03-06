import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Header = ({ term, setTerm, setFocus }) => {

  return <View style={styles.container}>
    <FontAwesome5 style={styles.icon} name="search" size={24} color="black" />
    <TextInput onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChangeText={text => setTerm(text)} value={term} placeholder="Search" style={styles.input} />
  </View>

}
const styles = StyleSheet.create({
  container: { height: 100, backgroundColor: '#f4511e', flexDirection: 'row', paddingTop: 40, justifyContent: 'center', alignItems: 'center' },
  input: { backgroundColor: 'white', height: 35, width: "80%", borderRadius: 10, paddingLeft: 15 },
  icon: { margin: 10 },
})

export default Header