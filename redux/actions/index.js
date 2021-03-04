import firebase from 'firebase'
import * as constants from './../constants/index'

export function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot)
        if (snapshot.exists) {
          console.log(snapshot.data)
          dispatch({ type: constants.USER_STATE_CHANGE, currentUser: snapshot.data })
        } else {
          console.log('does not exists')
        }
      })
  })
}