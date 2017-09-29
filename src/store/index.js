import Vue from 'vue'
import Vuex from 'vuex'

import SideBar from './modules/SideBar'
import Pop from './modules/Pop'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    SideBar: SideBar,
    Pop: Pop
  }
})
