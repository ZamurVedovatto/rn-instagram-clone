import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing';

const StackNavigator = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName="Landing" >
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      </StackNavigator.Navigator>
    </NavigationContainer>

  )
}