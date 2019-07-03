const approval = {
  state: {
    approval_message_visible: false // 审批显示隐藏
  },
  //计算属性
  getter: {},
  // 函数声明
  mutations: {
    // 切换审批显示隐藏
    CHANGE_MESSAGE_VISIBLE(state) {
      state.approval_message_visible = !state.approval_message_visible
    },
    CHANGE_MESSAGE_VISIBLE_VALUE(state, payload) {
      state.approval_message_visible = payload
    }
  },
  // 执行函数
  actions: {
    change_message_visible({commit}, status) {
      commit('CHANGE_MESSAGE_VISIBLE', status)
    },
    change_message_visible_value({commit}, value) {
      commit('CHANGE_MESSAGE_VISIBLE_VALUE', value)
    }
  }
}
export default approval
