import Vue from 'vue'
import Vuex from 'vuex'

import todayItems from './modules/todayItems'
import doneHistory from './modules/doneHistory'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    loadStore (state) {
      let str=localStorage.getItem("dailyPlan");
      if(str){
        state = JSON.parse(str);
      }
      console.log("In loadStore proc: " + JSON.stringify(state.todayItems))
    },
    saveStore (state) {
      let str = JSON.stringify(state)
      localStorage.setItem("dailyPlan",str)
    },
  },
  actions: {
    saveStore (context) {
      context.commit('saveStore')
    }
  },
  modules: {
    todayItems: todayItems,
    doneHistory: doneHistory,
  }
})

