const todo = {
  state: {
    todo_list_visible: false, //待办事项显示/隐藏
    // todo_list_toolbar: {
    //   customerService: [
    //     {
    //       id: 0,
    //       content: '全部',
    //       tipCount: ''
    //     },
    //     {
    //       id: 1,
    //       content: '维修保洁',
    //       tipCount: ''
    //     },
    //     {
    //       id: 2,
    //       content: '工单管理',
    //       tipCount: ''
    //     },
    //     {
    //       id: 3,
    //       content: '房屋到期',
    //       tipCount: ''
    //     },
    //     {
    //       id: 4,
    //       content: '资料审核',
    //       tipCount: ''
    //     },
    //     {
    //       id: 5,
    //       content: '回访记录',
    //       tipCount: ''
    //     }
    //   ]
    // },
    todo_list_toolbar: [
      /*{
        id: 1,
        content: '全部',
        tipCount: '13',
      },*/
      {
        id: 2,
        content: '面试',
        tipCount: ''
      },
      {
        id: 3,
        content: '入职资料',
        tipCount: '12'
      },
      {
        id: 4,
        content: '考勤核对',
        tipCount: ''
      },
      {
        id: 5,
        content: '培训考试',
        tipCount: ''
      },
      {
        id: 6,
        content: '缴纳罚款',
        tipCount: '3'
      },
      {
        id: 7,
        content: '物品领取',
        tipCount: '3'
      },
      {
        id: 8,
        content: '会议任务',
        tipCount: ''
      },
      {
        id: 9,
        content: '其他',
        tipCount: ''
      }
    ],
    todo_list_container: [
      {
        id: 1,
        title: '维修工单',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议',
        onClick: 'humanResource_interview' //click事件控制lj-dialog显示隐藏
      },
      {
        id: 2,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        location: '艺术家工厂',
        onClick: 'humanResource_interview_evaluate' //click事件控制lj-dialog显示隐藏
      },
      {
        id: 3,
        title: '资料补齐',
        user: '张无忌',
        money: '扣款200元',
        project: '研发中心会议',
        onClick: 'humanResource_attence'
      },
      {
        id: 4,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        project: '研发中心会议',
        onClick: 'humanResource_finespayment'
      },
      {
        id: 5,
        title: '资料补齐',
        date: '2019-03-22',
        tip: '距离考试20分钟',
        money: '扣款200元'
      },
      {
        id: 6,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        location: '艺术家工厂'
      },
      {
        id: 7,
        title: '资料补齐',
        user: '张无忌',
        money: '扣款200元',
        project: '研发中心会议'
      },
      {
        id: 8,
        title: '资料补齐',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议'
      },
      {
        id: 9,
        title: '文职入职考试',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议'
      },
      {
        id: 10,
        title: '领取通知',
        date: '2019-03-22',
        user: '张无忌',
        location: '财务部领取',
        project: '借用审批编号10086',
        onClick: 'humanResource_repository' //click事件控制lj-dialog显示隐藏
      }
    ],

    todo_list_current_selection: {},

    /*
     * dialog 控制
     * */

    //人力资源中心 待办模块
    humanResource_interview_visible: false, //面试界面显示隐藏
    humanResource_interview_evaluate_visible: false, //面试评价界面显示隐藏
    humanResource_repository_visible: false, //内务库房页面显示隐藏
    humanResource_attence_visible: false, //考勤界面显示隐藏
    humanResource_finespayment_visible: false, //罚款缴纳显示隐藏

    // 客服 待办模块
    customerService_createdTodo_visible: false, //客服创建待办
    customerService_order_visible: false, // 客服工单详情

    currentTodoModule: 'customerService' // 待办模块
  },
  // 计算属性
  getter: {},
  // 函数声明
  mutations: {
    //切换待办事项显示隐藏
    CHANGE_TODO_LIST_VISIBLE(state) {
      state.todo_list_visible = !state.todo_list_visible
    },

    //保存待办事项当前选择项
    SAVE_TODO_LIST_CURRENT_SELECTION(state, status) {
      state.todo_list_current_selection = status
    },

    /*人力资源中心 待办模块*/
    //切换面试待办事项
    CHANGE_HUMANRESOURCE_INTERVIEW_VISIBLE(state) {
      state.humanResource_interview_visible = !state.humanResource_interview_visible
    },
    //切换面试评价
    CHANGE_HUMANRESOURCE_INTERVIEW_EVALUATE_VISIBLE(state) {
      state.humanResource_interview_evaluate_visible = !state.humanResource_interview_evaluate_visible
    },
    //切换内务库房待办
    CHANGE_HUMANRESOURCE_REPOSITORY_VISIBLE(state) {
      state.humanResource_repository_visible = !state.humanResource_repository_visible
    },
    //切换考勤待办
    CHANGE_HUMANRESOURCE_ATTENCE_VISIBLE(state) {
      state.humanResource_attence_visible = !state.humanResource_attence_visible
    },
    //罚款缴纳待办
    CHANGE_HUMANRESOURCE_FINESPAYMENT_VISIBLE(state) {
      state.humanResource_finespayment_visible = !state.humanResource_finespayment_visible
    }
  },
  // 执行函数
  actions: {
    //改变待办事项显示隐藏
    change_todo_list_visible({ commit }, status) {
      commit('CHANGE_TODO_LIST_VISIBLE', status)
    },

    //保存待办事项当前选择项
    save_todo_list_current_selection({ commit }, status) {
      commit('SAVE_TODO_LIST_CURRENT_SELECTION', status)
    },

    /*人力资源中心 待办模块*/
    //改变面试待办事项显示隐藏
    change_humanResource_interview_visible({ commit }, status) {
      commit('CHANGE_HUMANRESOURCE_INTERVIEW_VISIBLE', status)
    },
    //改变面试评价事项显示隐藏
    change_humanResource_interview_evaluate_visible({ commit }, status) {
      commit('CHANGE_HUMANRESOURCE_INTERVIEW_EVALUATE_VISIBLE', status)
    },
    //改变内务库房待办显示隐藏
    change_humanResource_repository_visible({ commit }, status) {
      commit('CHANGE_HUMANRESOURCE_REPOSITORY_VISIBLE', status)
    },
    //改变考勤待办显示隐藏
    change_humanResource_attence_visible({ commit }, status) {
      commit('CHANGE_HUMANRESOURCE_ATTENCE_VISIBLE', status)
    },
    //改变罚款缴纳显示隐藏
    change_humanResource_finespayment_visible({ commit }, status) {
      commit('CHANGE_HUMANRESOURCE_FINESPAYMENT_VISIBLE', status)
    }
  }
}

export default todo
