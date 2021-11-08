import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import act from './modules/actInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    act
  },
  getters
})

export default store
