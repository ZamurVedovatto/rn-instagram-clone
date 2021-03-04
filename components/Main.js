import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './../redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import AddScreen from './main/Add'

const Tab = createBottomTabNavigator()

// TODO change this to function comp
export class Main extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // const { currentUser } = this.props

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={FeedScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            )
          }}
        />

      </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})