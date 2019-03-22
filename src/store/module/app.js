const app = {
  state: {
    personal: {},
    routeAnimation: false,
    themeName: '1',
    loading: false,
    globalNotify: {
      visible: false,
      type: '',
      title: '',
      message: '',
      subMessage: '',
      showBtn: false
    },
    globalMessage: {
      visible: false,
      type: '',
      title: '',
      msg: ''
    },
    todo_list_visible: false,//待办事项显示/隐藏
    todo_list_toolbar: [
      {
        id:1,
        content:'全部',
        tipCount:'13',
      },
      {
        id:2,
        content:'面试',
        tipCount:'',
      },
      {
        id:3,
        content:'入职资料',
        tipCount:'3',
      },
      {
        id:4,
        content:'考勤核对',
        tipCount:'',
      },
      {
        id:5,
        content:'培训考试',
        tipCount:'',
      },
      {
        id:6,
        content:'缴纳罚款',
        tipCount:'3',
      },
      {
        id:7,
        content:'物品领取',
        tipCount:'13',
      },
      {
        id:8,
        content:'会议任务',
        tipCount:'',
      },
      {
        id:9,
        content:'其他',
        tipCount:'',
      },
    ]
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
    },
    SHOW_LOADING(state,status) {
      state.loading = status;
    },
    CLOSE_NOTIFY(state,status) {
      console.log(status);
      state.globalNotify.visible = status;
    },
    OPEN_NOTIFY(state,status) {
      state.globalNotify.visible = true;
      state.globalNotify.showBtn = status.showBtn;
      state.globalNotify.message = status.message;
      state.globalNotify.subMessage = status.subMessage;
      state.globalNotify.title = status.title;
      state.globalNotify.type = status.type;
    },
    AUTO_CLOSE_NOTIFY(state,during) {
      setTimeout(() => {
        state.globalNotify.visible = false;
      },during)
    },
    OPEN_MESSAGE(state,status) {
      state.globalMessage.visible = true;
      state.globalMessage.msg = status.msg;
      state.globalMessage.title = status.title;
      state.globalMessage.type = status.type;
    },
    AUTO_CLOSE_MESSAGE(state,during) {
      setTimeout(() => {
        state.globalMessage.visible = false;
      },during);
    },
    //切换待办事项显示隐藏
    CHANGE_TODO_LIST_VISIBLE(state) {
      state.todo_list_visible = !state.todo_list_visible;
    },
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
    },
    //显示/隐藏loading
    switch_loading({commit},status) {
      commit('SHOW_LOADING',status);
    },
    //关闭提示框
    close_notify({commit},status) {
      commit('CLOSE_NOTIFY',status);
    },
    //打开消息提示
    open_notify({commit},status) {
      commit('OPEN_NOTIFY', status);
    },
    //固定时间关闭
    auto_close_notify({commit},status) {
      commit('AUTO_CLOSE_NOTIFY',status)
    },
    //打开消息
    open_message({commit},status) {
      commit('OPEN_MESSAGE',status);
    },
    auto_close_message({commit},status) {
      commit('AUTO_CLOSE_MESSAGE',status);
    },
    //改变待办事项显示隐藏
    change_todo_list_visible({commit},status) {
      commit('CHANGE_TODO_LIST_VISIBLE',status);
    }
  }
};

export default app
