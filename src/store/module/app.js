const app = {
  state: {
    personal: {},
    routeAnimation: false,
    themeName: '1',
  },
  // 计算属性
  getter: {},
  // 函数声明
  mutations: {
    // 页面切换动画状态
    ROUTE_ANIMATION(state, view) {
      state.routeAnimation = false;
      setTimeout(function () {
        state.routeAnimation = true;
      }, 100);
    },
    // 主题
    THEME_NAME(state, view) {
      state.themeName = view;
    },
    // 获取个人信息
    GET_PERSONAL(state, view) {
      state.personal = view;
    }
  },
  // 执行函数
  actions: {
    // 页面切换动画状态
    route_animation({commit}, view) {
      commit('ROUTE_ANIMATION', view);
    },
    // 主题
    theme_name({commit}, view) {
      commit('THEME_NAME', view);
    },
    // 获取个人信息
    get_personal({commit}, view) {
      commit('GET_PERSONAL', view);
    }
  }
};

export default app
