const DROPDOWN_CONSTANT = {//下拉列表常量
  ASSETS_MANAGEMENT: {//资产管理
    ADD_GOODS: {
      CATEGORY: [{id:1,name:'分类'},{id:2,name:'物品'},{id:3,name:'品牌'},{id:4,name:'单位'},{id:5,name:'采购源'}],
      PARENT_CLASSIFY:[{id:1,name:'办公设备'},{id:2,name:'办公家具'},{id:3,name:'电器设备'},{id:4,name:'通讯设备'}],
    },//添加物品
    GOODS_DETAIL: {
      GOODS_STATUS:[{id:0,name:'无'}, {id:1,name:'待维修'}, {id:2,name:'维修中'}, {id:3,name:'已维修'}, {id:4,name:'报废'}],//物品状态
      RECEIVE_RETURN_STATUS:[{id:0,name:'待通知'}, {id:1,name:'待领取'}, {id:2,name:'已领取'}, {id:3,name:'放弃领取'}, {id:4,name:'待归还'}, {id:5,name:'已归还'}],//领还状态
      RESPONSIBLE:[{id:1,name:'个人'},{id:2,name:'部门'},{id:3,name:'公司'}],//任责类型
      PAYMENT: [{id:1,name:'工资扣款'},{id:2,name:'付现'}],//付款方式
    },//物品详情
    RECEIVE_TODO: {

    },//领取待办
  },
  TRAINING: {//培训考核
    NEWQUESTION: {//新建题库
      QUESTIONTYPE: [{id:1,name:'面试考核'},{id:2,name:'技能考核'},{id:3,name:'入职培训考核'}],//题库类型
    },
    EXAM: {//考试
      /*考试类型*/
      EXAMTYPE:[{id:1,name:'入职'},{id:2,name:'培训'}],
      ITEMTYPE:[{id:1,name:'单选'},{id:2,name:'判断'},{id:3,name:'简答'}],
    }
  },
  NOTICEQUESTIONNAIRE: {//公告问卷
    PUBLISHNOTICE:{//发公告
      TYPE:[{id:1,name:'奖赏'},{id:2,name:'处罚'}],
    },
  },
  //缴纳状态
  PAYMENT_STATUS: [{id:1,name:'未缴纳'},{id:2,name:'已缴纳'}],
  PAYMENT_WAY:[{id:1,name:'工资扣款'},{id:2,name:'电子支付'}],
  //调查状态
  INSPECT_STATUS:[{id:0,name:'未开始'},{id:1,name:'已开始'},{id:2,name:'已结束'}],
  INTERVIEW_RESULT:[{id:1,name:'通过'},{id:2,name:'未通过'}],
};

const GLOBAL_CONSTANT = {
  TRAINING:{//培训考核
    /*考试状态*/
    EXAM_STATUS:[{id:0,name:'未开始'},{id:1,name:'进行中'},{id:2,name:'已结束'}]
  }
};

export{ DROPDOWN_CONSTANT,GLOBAL_CONSTANT };
