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
    }
  },
  // 执行函数
  actions: {
    change_message_visible({ commit }, status) {
      commit('CHANGE_MESSAGE_VISIBLE', status)
    }
  }
}
export default approval
