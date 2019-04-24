const market_service = {
  state: {
    see_house_visible: false
  },
  mutations: {
    //显示隐藏收租房带看弹框
    SWITCH_SEE_HOUSE_VISIBLE(state,status) {
      state.see_house_visible = status;
    }
  },
  actions: {
    switch_see_house({commit},status) {
      commit('SWITCH_SEE_HOUSE_VISIBLE',status);
    }
  }
};

export default market_service;
