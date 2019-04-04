const DROPDOWN_CONSTANT = {//下拉列表常量
  ASSETS_MANAGEMENT: {//资产管理
    ADD_GOODS: {},//添加物品
    GOODS_DETAIL: {
      GOODS_STATUS:['无', '待维修', '维修中', '已维修', '报废'],//物品状态
      RECEIVE_RETURN_STATUS:['待通知', '待领取', '部分已领取', '已领取', '放弃领取', '待归还', '部分已归还', '已归还'],//领还状态
      RESPONSIBLE:[,'个人','部门','公司'],//任责类型
      PAYMENT: ['工资扣款','付现'],//付款方式
    },//物品详情
    RECEIVE_TODO: {

    },//领取待办
  }
};

export{ DROPDOWN_CONSTANT };
