import React from 'react';
import Main from './Main'
import Detail from './Detail'
import { createStackNavigator } from '@react-navigation/stack';

const Home = () => {
  const Stack = createStackNavigator();
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
    <Stack.Screen options={({ route }) => ({
      title: route.params.name, headerStyle: {
        backgroundColor: '#f4511e',
      },
    })} name="Detail" component={Detail} />
  </Stack.Navigator>
}

export default Home