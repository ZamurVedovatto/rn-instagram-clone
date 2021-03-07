import React, { Component } from 'react'
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
}
firebase.initializeApp(firebaseConfig)
// firebase.analytics()
// TODO set this conditional
// if(firebase?.apps?.length === 0) {
//   firebase.initializeApp(firebaseConfig)
//   firebase.analytics()
// }

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import MainScreen from './components/Main'
const StackNavigator = createStackNavigator()

// TODO change it to function comp and use hooks
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state
    if (!loaded) {
      return (
        <View style={styles.container}>
          {/* Put a spinner here */}
          <Text>Loading..</Text> 
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <StackNavigator.Navigator initialRouteName="Landing" >
            <StackNavigator.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
            <StackNavigator.Screen name="Login" component={LoginScreen} options={{headerShown: true}} />
          </StackNavigator.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator.Navigator initialRouteName="Main" >
            <StackNavigator.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <StackNavigator.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <StackNavigator.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
          </StackNavigator.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})