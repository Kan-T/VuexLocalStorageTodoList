import Local from './Local'
const localDone = new Local("doneHistory")

const state = localDone.get() || {
    items: []
}

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
  deleteDone(state){
    state.items.splice(index, 1)
    localToday.set(state)
  },
  clearDone(state){
    state.items = []
    localToday.clear()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}