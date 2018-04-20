import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import manageStore from './manageStore.js'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage
});

const store = new Vuex.Store({
  modules: {
    manageStore
  },
  plugins: [vuexLocalStorage.plugin]
})

export default store
