const state = {
  items: [
    {
      content:"学习",
      done:false
    },
    {
      content:"游泳",
      done:false
    },
    {
      content:"跑步",
      done:true
    }
  ]
}

// getters
const getters = {
  todayTodo:(state => state.items.filter( item => !item.done )),
  todayDone:(state => state.items.filter( item => item.done )),
}

// actions
const actions = {

}

// mutations
const mutations = {
  addToday (state, payload){
    state.items.push(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}