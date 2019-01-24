const app = {
  state: {
    personal: {},
    themeName: '',
  },
  // 计算属性
  getter: {},
  // 函数声明
  mutations: {
    // 主题
    THEME_NAME(state, view) {
      console.log(view);
      state.themeName = view;
    },
    // 获取个人信息
    GET_PERSONAL(state, view) {
      state.personal = view;
    }
  },
  // 执行函数
  actions: {
    // 主题
    theme_name({commit}, view) {
      console.log(view);
      commit('THEME_NAME', view);
    },
    // 获取个人信息
    get_personal({commit}, view) {
      commit('GET_PERSONAL', view);
    }
  }
};

export default app
