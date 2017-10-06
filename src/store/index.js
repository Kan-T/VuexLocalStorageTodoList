import Vue from 'vue'
import Vuex from 'vuex'

import List from './modules/List'
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
    List: List,
    SideBar: SideBar,
    Pop: Pop
  }
})
