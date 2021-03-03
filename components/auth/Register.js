import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export default function Register() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSignUp = () => {
    console.log(name, email, password)
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        onChange={(name) => setName(name)}
      />
      <TextInput
        placeholder="email"
        onChange={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChange={(password) => setPassword(password)}
      />
      <Button title="Sign up" onPress={() => onSignUp()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


// import React, { Component } from 'react'
// import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
// import firebase from 'firebase'

// // TODO change to function component
// export class Register extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       email: '',
//       password: '',
//       name: ''
//     }
//     this.onSignUp = this.onSignUp.bind(this);
//   }

//   onSignUp() {
//     const { email, password, name } = this.state
//     console.log(email, password)
//     // firebase.auth().createUserWithEmailAndPassword(email, password)
//     //   .then((result) => {
//     //     console.log(result)
//     //   })
//     //   .catch(err => console.log(err))
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           placeholder="name"
//           onChange={(name) => this.setState({ name })}
//         />
//         <TextInput
//           placeholder="email"
//           onChange={(email) => this.setState({ email })}
//         />
//         <TextInput
//           placeholder="password"
//           secureTextEntry={true}
//           onChange={(password) => this.setState({ password })}
//         />
//         <Button title="Sign up" onPress={() => this.onSignUp()} />
//       </View>
//     )
//   }
// }

