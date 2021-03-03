import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>

      <Button title="Register" onPress={() => navigation.navigate("Register")} />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />

      <Text></Text>
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