const state = {
    showSide:false,
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  toggleSide(){
    state.showSide = !state.showSide
  },
  closeSide(){
    state.showSide = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}