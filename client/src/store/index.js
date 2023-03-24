import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
