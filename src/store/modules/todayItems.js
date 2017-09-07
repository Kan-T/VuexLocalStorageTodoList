const state = {
  items: [
    {
      content:"学习",
      fixed:false,
    },
    {
      content:"游泳",
      fixed:false,
    },
    {
      content:"跑步",
      fixed:false,
    }
  ]
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
  },
  saveToday(state, items){
    state.items = items
  },
  deleteToday(state,index){
    state.items.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}