import React from 'react';
import Main from './screens/Main'
import Detail from './screens/Detail'
import Checkout from './screens/Checkout'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              return focused ? <AntDesign name="home" size={24} color="tomato" />
                : <AntDesign name="home" size={24} color="black" />
            } else if (route.name === 'Cart') {
              return focused ? <AntDesign name="shoppingcart" size={24} color="tomato" /> :
                <AntDesign name="shoppingcart" size={24} color="black" />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Checkout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Home = () => {
  const Stack = createStackNavigator();
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
    <Stack.Screen options={({ route }) => ({ title: route.params.name })} name="Detail" component={Detail} />
  </Stack.Navigator>
}