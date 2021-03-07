import React, { Component, useState } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onSignUp = this.onSignUp.bind(this)
  }

  state = {
    name: "",
    email: "",
    password: ""
  }

  onSignUp = () => {
    const {name, email, password} = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign up" onPress={() => this.onSignUp()} />
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
