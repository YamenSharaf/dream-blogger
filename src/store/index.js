import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db'
import auth from '../db/auth'

Vue.use(Vuex)
// const nameDocRef = db.collection('nameData').doc('names')
const blogPostsRef = db.collection('blogPosts').doc('posts')

const store = new Vuex.Store({
  state: {
    userStatus: {
      loggedIn: false,
      uid: '',
      email: ''
    },
    name: ``,
    serverName: ``
  },
  getters: {
    getUserStatus (state) {
      return state.userStatus
    },
    getUserUid (state) {
      return state.userStatus.uid
    },
    getName (state) {
      return state.name
    },
    getServerName (state) {
      return state.serverName
    }
  },
  actions: {
    assignName ({commit, state}, payload) {
      console.log(payload.name)
      return db.collection(`users/${state.userStatus.uid}/nameData`).doc('names').set({
        name: payload.name
      })
    },
    fetchNameData ({commit, state}) {
      db.collection(`users/${state.userStatus.uid}/nameData`).doc('names').onSnapshot((doc) => {
        if (doc && doc.exists) {
          commit('setServerName', {
            name: doc.data().name
          })
        }
      })
    },
    registerUser ({commit}, payload) {
      return auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password)
    },
    logUserIn ({commit}, payload) {
      console.log('will do')
      return auth.signInWithEmailAndPassword(
        payload.email,
        payload.password)
    },
    logUserOut () {
      return auth.signOut()
    },
    monitorUserStatus ({commit}) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User signed in
          commit('setUserStatus', {loggedIn: true, uid: user.uid, email: user.email})
        } else {
          // User signed out
          commit('setUserStatus', { loggedIn: false, uid: '', email: '' })
        }
      })
    },
    async postNewBlog ({commit}, payload) {
      const currentPosts = await blogPostsRef.get()
      let posts = currentPosts.data().posts
      return blogPostsRef.set({posts: [...posts, payload]})
    }
  },
  mutations: {
    setUserStatus (state, payload) {
      state.userStatus = {...state.userStatus, ...payload}
    },
    setName (state, name) {
      state.name = name
    },
    setServerName (state, payload) {
      state.serverName = payload.name
    }
  }
})

export default store
