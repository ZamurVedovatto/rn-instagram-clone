import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing } from './../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return(null)
}

// TODO change this to function comp
export class Main extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }

  render() {
    // const { currentUser } = this.props

    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
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
          name="Search"
          component={SearchScreen} 
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="AddContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Add")
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} 
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
            }
          })}
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

const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing
}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center'
//   }
// })