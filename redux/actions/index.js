import firebase from 'firebase'
import { 
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE
} from './../constants/index'

export function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log('does not exists')
        }
      })
  })
}

export function fetchUserPosts() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data}
        })
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
      })
  })
}

export function fetchUserFollowing() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map(doc => {
          const id = doc.id;
          return id
        })
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following })
        for(let i = 0; i<following.length; i++) {
          dispatch(fecthUsersData(following[i]))
        }
      })
  })
}

export function fecthUsersData(uid) {
  return((dispatch, getState) => {
    const found = getState().usersState.users.some(el => el.uid === uid)
    if(!found) {
      firebase.firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user })
          dispatch(fetchUsersFollowingPosts(user.id))
        } else {
          console.log('does not exists')
        }
      })
    }
  })
}

export function fetchUsersFollowingPosts(uid) {
  return ((dispatch, getState) => {
    firebase.firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        console.log(snapshot.query.EP)
        const uid = snapshot.query.EP.path.segments[1]
        console.log({snapshot, uid})
        const user = getState().usersState.users.find(el => el.uid === uid)
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data, user}
        })
        console.log(posts)
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
        console.log(getState())
      })
  })
}