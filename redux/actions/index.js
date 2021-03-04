import firebase from 'firebase'
import * as constants from './../constants/index'

export function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          dispatch({ type: constants.USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log('does not exists')
        }
      })
  })
}