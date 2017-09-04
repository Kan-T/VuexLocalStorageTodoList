export default {
  state: {
    todayItems: {
      createDate: null,
      items: [
          {
            content:"跑步",
          },
          {
            content:"俯卧撑",
          },
        ]
    },
    doneItems: [
      {
        content:"游泳",
      },
      {
        content:"学习",
      }
    ]
  },
  mutations: {
    exchange (state, payload) {
      let arr = state.todayItems.items
      arr[payload.idxEnd] = arr.splice(payload.idxStart,1,arr[payload.idxEnd])[0]
      state.todayItems.items = arr
      console.log(state.todayItems.items)
    }
  }
}