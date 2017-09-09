import Vue from 'vue'
import Vuex from 'vuex'

import Today from './modules/Today'
import Done from './modules/Done'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
  },
  actions: {
  },
  modules: {
    Today: Today,
    Done: Done,
  }
})

