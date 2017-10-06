import Local from '../../Local'
let tipLocal = new Local("enableTip")

const state = {
  editList: false,
  enableTip: tipLocal.get()=="false" ? false:true,
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
    shutEditList:(state) => { state.editList = false },
    toggleEditList:(state) => { state.editList = !state.editList },
    toggleTip:(state) => {
      state.enableTip = !state.enableTip
      let flag = state.enableTip ? "true":"false"
      tipLocal.set(flag)
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}