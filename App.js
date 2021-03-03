import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase'
// TODO put on environmental variables
const firebaseConfig = {
  apiKey: "AIzaSyCWk7JHJ-KhueNlhM29_5FL0X-gc7Jyvyg",
  authDomain: "instagram-demo-73db1.firebaseapp.com",
  projectId: "instagram-demo-73db1",
  storageBucket: "instagram-demo-73db1.appspot.com",
  messagingSenderId: "748361405432",
  appId: "1:748361405432:web:a611a1af9a7a8848907c0d",
  measurementId: "G-LDGGYTJTB7"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// if(firebase?.apps?.length === 0) {
//   firebase.initializeApp(firebaseConfig)
//   firebase.analytics();
// }

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing';
import Register from './components/auth/Register';

const StackNavigator = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName="Landing" >
        <StackNavigator.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <StackNavigator.Screen name="Register" component={Register} options={{ headerShown: true }} />
      </StackNavigator.Navigator>
    </NavigationContainer>

  )
}