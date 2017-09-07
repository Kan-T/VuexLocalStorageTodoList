import Local from './Local'
const localToday = new Local(localToday)

const state = localToday.get() || {
    date:'',
    items: []
}

// getters
const getters = {
}

// actions
const actions = {
  saveToday (context) {
    context.commit('saveToday')
  }
}

// mutations
const mutations = {
  addToday(state, item){
    state.items.push(item)
    localToday.set(state)
  },
  saveToday(state, items){
    state.items = items
    localToday.set(state)
  },
  deleteToday(state,index){
    state.items.splice(index, 1)
    localToday.set(state)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}