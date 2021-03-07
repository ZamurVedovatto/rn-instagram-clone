import React, { Component, useState } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this)
  }

  state = {
    email: "",
    password: ""
  }

  onSignIn = () => {
    const {name, email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign in" onPress={() => this.onSignIn()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
