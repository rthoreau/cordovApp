import Vue from 'vue'
import Vuex from 'vuex'
import manageStore from './manageStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    manageStore
  }
})

export default store
