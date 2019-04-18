const DROPDOWN_CONSTANT = {//下拉列表常量
  ASSETS_MANAGEMENT: {//资产管理
    ADD_GOODS: {
      CATEGORY: [{id:1,name:'分类'},{id:2,name:'物品'},{id:3,name:'品牌'},{id:4,name:'单位'},{id:5,name:'采购源'}],
      PARENT_CLASSIFY:[{id:1,name:'办公设备'},{id:2,name:'办公家具'},{id:3,name:'电器设备'},{id:4,name:'通讯设备'}],
    },//添加物品
    GOODS_DETAIL: {
      GOODS_STATUS:[{id:1,name:'无'}, {id:2,name:'待维修'}, {id:3,name:'维修中'}, {id:4,name:'已维修'}, {id:5,name:'报废'}],//物品状态
      RECEIVE_RETURN_STATUS:[{id:1,name:'待通知'}, {id:2,name:'待领取'}, {id:3,name:'部分已领取'}, {id:4,name:'已领取'}, {id:5,name:'放弃领取'}, {id:6,name:'待归还'}, {id:7,name:'部分已归还'}, {id:8,name:'已归还'}],//领还状态
      RESPONSIBLE:[{id:1,name:'个人'},{id:2,name:'部门'},{id:3,name:'公司'}],//任责类型
      PAYMENT: [{id:1,name:'工资扣款'},{id:2,name:'付现'}],//付款方式


      /*GOODS_STATUS:['无', '待维修', '维修中', '已维修', '报废'],//物品状态
      RECEIVE_RETURN_STATUS:['待通知', '待领取', '部分已领取', '已领取', '放弃领取', '待归还', '部分已归还', '已归还'],//领还状态
      RESPONSIBLE:[,'个人','部门','公司'],//任责类型
      PAYMENT: ['工资扣款','付现'],//付款方式*/
    },//物品详情
    RECEIVE_TODO: {

    },//领取待办
  },
  TRAINING: {//培训开发
    NEWQUESTION: {//新建题库
      QUESTIONTYPE: [{id:1,name:'面试考核'},{id:2,name:'技能考核'},{id:3,name:'入职培训考核'}],//题库类型
    },
  },
  NOTICEQUESTIONNAIRE: {//公告问卷
    PUBLISHNOTICE:{//发公告
      TYPE:[{id:1,name:'奖赏'},{id:2,name:'处罚'}],
    }
  }
};

export{ DROPDOWN_CONSTANT };
