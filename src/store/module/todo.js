const todo = {
  state: {
    todo_list_visible: false, //待办事项显示/隐藏
    refresh_todo_list:false,//刷新todolist
    todo_list_badge_count:0,//待办 标记个数

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
    humanResource_answer_test_paper_visible:false,//问卷/考试页面显示隐藏
    humanResource_meeting_question_visible:false,//遗留问题页面显示隐藏

    // 客服 待办模块
    customerService_createdTodo_visible: false, //客服创建待办
    customerService_order_visible: false, // 客服工单详情
    customerService_agency_check_visible: false,//中介费(稽查中心审批)

    currentTodoModule: 'customerService' // 待办模块
  },
  // 计算属性
  getters: {
    //refresh_todo_list_getter: state => state.refresh_todo_list
    refresh_todo_list: state => {
      return state.refresh_todo_list;
    },
    todo_list_current_selection: state =>  {//当前选中数据
      return state.todo_list_current_selection;
    },
    humanResource_attence_visible: state => {//考勤代办
      return state.humanResource_attence_visible;
    },
    humanResource_meeting_question_visible: state => {//会议遗留问题
      return state.humanResource_meeting_question_visible;
    }
  },
  // 函数声明
  mutations: {
    //切换待办事项显示隐藏
    CHANGE_TODO_LIST_VISIBLE(state) {
      state.todo_list_visible = !state.todo_list_visible
    },
    //刷新todolist
    CHANGE_REFRESH_TODO_LIST(state) {
      state.refresh_todo_list = !state.refresh_todo_list
    },
    CHANGE_TODO_LIST_BADGE_COUNT(state,count) {
      state.todo_list_badge_count = count;
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
    },
    //问卷/考试页面显示隐藏
    CHANGE_HUMANRESOURCE_ANSWER_TEST_PAPER_VISIBLE(state) {
      state.humanResource_answer_test_paper_visible = !state.humanResource_answer_test_paper_visible
    },

    //会议遗留问题页面显示隐藏
    CHANGE_HUMANRESOURCE_MEETING_QUESTION_VISIBLE(state) {
      state.humanResource_meeting_question_visible = !state.humanResource_meeting_question_visible
    },

    //稽查中心审核页面显示隐藏
    CHANGE_CUSTOMERSERVICE_AGENCY_CHECK_VISIBLE(state) {
      state.customerService_agency_check_visible = !state.customerService_agency_check_visible
    },
  },
  // 执行函数
  actions: {
    //改变待办事项显示隐藏
    change_todo_list_visible({ commit }, status) {
      commit('CHANGE_TODO_LIST_VISIBLE', status)
    },
    //刷新代办
    change_refresh_todo_list({commit},status) {
      commit('CHANGE_REFRESH_TODO_LIST', status);
    },

    change_todo_list_badge_count({ commit }, status) {
      commit('CHANGE_TODO_LIST_BADGE_COUNT', status)
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
    },
    //改变调查问卷/考试页面显示隐藏
    change_humanResource_answer_test_paper_visible({commit}, status) {
      commit('CHANGE_HUMANRESOURCE_ANSWER_TEST_PAPER_VISIBLE',status);
    },
    //改变稽查中心审核页面显示隐藏
    change_customerService_agency_check_visible({commit}, status) {
      commit('CHANGE_CUSTOMERSERVICE_AGENCY_CHECK_VISIBLE',status);
    },
    //改变会议遗留问题页面显示隐藏
    change_humanResource_meeting_question_visible({commit}, status) {
      commit('CHANGE_HUMANRESOURCE_MEETING_QUESTION_VISIBLE',status);
    },
  },
}

export default todo
