const todo = {
  state: {
    todo_list_visible: false,//待办事项显示/隐藏
    todo_list_toolbar: [
      {
        id: 1,
        content: '全部',
        tipCount: '13',
      },
      {
        id: 2,
        content: '面试',
        tipCount: '',
      },
      {
        id: 3,
        content: '入职资料',
        tipCount: '3',
      },
      {
        id: 4,
        content: '考勤核对',
        tipCount: '',
      },
      {
        id: 5,
        content: '培训考试',
        tipCount: '',
      },
      {
        id: 6,
        content: '缴纳罚款',
        tipCount: '3',
      },
      {
        id: 7,
        content: '物品领取',
        tipCount: '13',
      },
      {
        id: 8,
        content: '会议任务',
        tipCount: '',
      },
      {
        id: 9,
        content: '其他',
        tipCount: '',
      },
    ],
    todo_list_container: [
      {
        id: 1,
        title: '资料补齐',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议',
        onClick:'humanResource_interview',//click事件控制lj-dialog显示隐藏
      },
      {
        id: 2,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        location: '艺术家工厂',
        onClick:'humanResource_interview_evaluate',//click事件控制lj-dialog显示隐藏
      },
      {
        id: 3,
        title: '资料补齐',
        user: '张无忌',
        money: '扣款200元',
        project: '研发中心会议',
      },
      {
        id: 4,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        project: '研发中心会议',
      }, {
        id: 5,
        title: '资料补齐',
        date: '2019-03-22',
        tip: '距离考试20分钟',
        money: '扣款200元',
      },
      {
        id: 6,
        title: '资料补齐',
        user: '张无忌',
        date: '2019-03-22',
        location: '艺术家工厂',
      },
      {
        id: 7,
        title: '资料补齐',
        user: '张无忌',
        money: '扣款200元',
        project: '研发中心会议',
      },
      {
        id: 8,
        title: '资料补齐',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议',
      },
      {
        id: 9,
        title: '文职入职考试',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议',
      },
      {
        id: 10,
        title: '文职入职培训',
        user: '张无忌',
        location: '艺术家工厂',
        tip: '距离考试20分钟',
        money: '扣款200元',
        project: '研发中心会议',
      },

    ],

    /*
    * dialog 控制
    * */

    //人力资源中心 待办模块
    humanResource_interview_visible: false,//面试界面显示隐藏
    humanResource_interview_evaluate_visible: false,//面试评价界面显示隐藏
    humanResource_repository_visible: false,//内务库房


  },
  // 计算属性
  getter: {},
  // 函数声明
  mutations: {
    //切换待办事项显示隐藏
    CHANGE_TODO_LIST_VISIBLE(state) {
      state.todo_list_visible = !state.todo_list_visible;
    },

    /*人力资源中心 待办模块*/
    //切换面试待办事项
    CHANGE_HUMANRESOURCE_INTERVIEW_VISIBLE(state) {
      state.humanResource_interview_visible = !state.humanResource_interview_visible;
    },
    //切换面试评价
    CHANGE_HUMANRESOURCE_INTERVIEW_EVALUATE_VISIBLE(state) {
      state.humanResource_interview_evaluate_visible = !state.humanResource_interview_evaluate_visible;
    },
  },
  // 执行函数
  actions: {
    //改变待办事项显示隐藏
    change_todo_list_visible({commit}, status) {
      commit('CHANGE_TODO_LIST_VISIBLE', status);
    },
    /*人力资源中心 待办模块*/
    //改变面试待办事项显示隐藏
    change_humanResource_interview_visible({commit},status) {
      commit('CHANGE_HUMANRESOURCE_INTERVIEW_VISIBLE',status);
    },
    //改变面试评价事项显示隐藏
    change_humanResource_interview_evaluate_visible({commit},status) {
      commit('CHANGE_HUMANRESOURCE_INTERVIEW_EVALUATE_VISIBLE',status);
    },
  }
};

export default todo
