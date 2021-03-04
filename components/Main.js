import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './../redux/actions/index'

// TODO change this to function comp
export class Main extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Put a spinner here */}
        <Text>User is logged</Text> 
      </View>
    )
  }
}

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)
export default connect(null, mapDispatchProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})