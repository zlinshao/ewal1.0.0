// 员工名册
export const staffBookSearch = {
  status: 'staffBookSearch',
  placeholder: '请输入搜索内容',
  keywords: 'search',
  data: [
    {
      keyType: 'radio',
      title: '离职',
      keyName: 'is_on_job',
      dataType: '',
      value: [
        {
          id: 0,
          title: '否'
        },
        {
          id: 1,
          title: '是'
        }
      ]
    },
    {
      keyType: 'radio',
      title: '禁用',
      keyName: 'is_enable',
      dataType: '',
      value: [
        {
          id: 0,
          title: '否'
        },
        {
          id: 1,
          title: '是'
        }
      ]
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'org_id',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    },
    {
      keyType: 'position',
      title: '岗位',
      placeholder: '请选择岗位',
      keyName: 'position_id',
      dataType: [],
      value: {
        num: ''
      }
    }
  ]
}

// 离职管理
export const LeaveJobSearch = {
  status: 'LeaveJobSearch',
  keywords: 'search',
  data: [
    {
      keyType: 'radio',
      title: '禁用',
      keyName: 'is_enable',
      dataType: '',
      value: [
        {
          id: 0,
          title: '否'
        },
        {
          id: 1,
          title: '是'
        }
      ]
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'org_id',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    },
    {
      keyType: 'position',
      title: '岗位',
      placeholder: '请选择岗位',
      keyName: 'position_id',
      dataType: [],
      value: {
        num: ''
      }
    }
  ]
}

// 工单
export const workOrderSearch = {
  status: 'workOrder',
  data: [
    {
      keyType: 'date',
      title: '出生日期',
      placeholder: '请选择日期',
      keyName: 'date3',
      dataType: ''
    },
    {
      keyType: 'dateRange',
      title: '创建时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    },
    {
      keyType: 'dateRange',
      title: '跟进时间',
      placeholder: '请选择日期',
      keyName: 'date2',
      dataType: []
    },
    {
      keyType: 'radio',
      title: '紧急程度',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 12,
          title: '特级'
        },
        {
          id: 13,
          title: '紧急'
        },
        {
          id: 14,
          title: '重要'
        },
        {
          id: 15,
          title: '一般'
        }
      ]
    },
    {
      keyType: 'check',
      title: '状态',
      keyName: 'check',
      dataType: [],
      value: [
        {
          id: 22,
          title: '已完成'
        },
        {
          id: 23,
          title: '未完成'
        }
      ]
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    }
  ]
}

// 回访记录
export const visitToRecordSearch = {
  status: 'visitToRecord',
  placeholder: '地址/合同编号/工单编号/内容',
  keywords: 'search',
  data: [
    {
      keyType: 'dateRange',
      title: '签约时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    },
    {
      keyType: 'staff',
      title: '开单人',
      placeholder: '请选择员工',
      keyName: 'staff',
      dataType: [],
      value: {
        num: 1
      }
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'department',
      dataType: [],
      value: {
        num: 1,
        arr: ''
      }
    }
  ]
}

// 房屋到期
export const housingDueSearch = {
  status: 'housingDue',
  data: [
    {
      keyType: 'dateRange',
      title: '签约时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    },
    {
      keyType: 'staff',
      title: '开单人',
      placeholder: '请选择员工',
      keyName: 'openPer',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'staff',
      title: '负责人',
      placeholder: '请选择员工',
      keyName: 'handler',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'department',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    }
  ]
}

// 资料审核
export const dataAuditSearch = {
  status: 'housingDue',
  data: [
    {
      keyType: 'dateRange',
      title: '签约时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    },
    {
      keyType: 'radio',
      title: '合同性质',
      keyName: 'nature',
      dataType: [],
      value: [
        {
          id: 22,
          title: '新收'
        },
        {
          id: 23,
          title: '新收'
        }
      ]
    },
    {
      keyType: 'staff',
      title: '开单人',
      placeholder: '请选择员工',
      keyName: 'openPer',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'staff',
      title: '负责人',
      placeholder: '请选择员工',
      keyName: 'handler',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'department',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    }
  ]
}

//科目
export const subjectSearch = {
  status: 'subject',
  data: [
    {
      keyType: 'radio',
      title: '科目类别',
      placeholder: '请选择科目类别',
      keyName: 'er_type',
      dataType: '',
      value: [
        { id: 1, title: '收入' },
        { id: 2, title: '支出' },
        { id: 3, title: '混合' }
      ]
    }
  ]
}
//客户搜索
export const customerSearch = {
  status: 'subject',
  data: [
    {
      keyType: 'radio',
      title: '客户类别',
      placeholder: '请选择客户类别',
      keyName: 'er_type',
      dataType: '',
      value: [
        { id: 1, title: '房东' },
        { id: 2, title: '租客' },
        { id: 3, title: '其他' }
      ]
    }
  ]
}

//收支流水
export const accountRunSearch = {
  status: 'budgetStream',
  keywords: 'search',
  data: [
    {
      keyType: 'date',
      title: '交易日期',
      placeholder: '请选择开始日期',
      keyName: 'start_date',
      dataType: ''
    },
    // {
    //     keyType: 'date',
    //     title: '结束日期',
    //     placeholder: '请选择结束日期',
    //     keyName: 'end_date',
    //     dataType: '',
    // },
    {
      keyType: 'radio',
      title: '类别',
      placeholder: '请选择类别',
      keyName: 'cate',
      dataType: '',
      value: [{ id: 1, title: '收入' }, { id: 2, title: '支出' }]
    }
    // {
    //     keyType: 'date',
    //     title: '操作开始日期',
    //     placeholder: '请选择操作开始日期',
    //     keyName: 'operate_start_date',
    //     dataType: '',
    // },
    // {
    //     keyType: 'date',
    //     title: '操作结束日期',
    //     placeholder: '请选择操作结束日期',
    //     keyName: 'operate_end_date',
    //     dataType: '',
    // },
  ]
}

/*赏罚分明*/
//赏善令
export const rewardUpSearch = {
  status: 'rewardUpSearch'
}
//惩恶令
export const rewardDownSearch = {
  status: 'rewardDownSearch'
}
/*内务库房*/

//库房总览
export const overViewSearch = {
  status: 'overViewSearch'
}

//借用领用
export const borrowReceiveSearch = {
  status: 'borrowReceiveSearch',
  data: [
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: ''
    },
    {
      keyType: 'radio',
      title: '申请类型',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 1,
          title: '领用'
        },
        {
          id: 2,
          title: '借用'
        }
      ]
    },

    {
      keyType: 'radio',
      title: '申领状态',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 3,
          title: '待通知'
        },
        {
          id: 4,
          title: '待领取'
        },
        {
          id: 5,
          title: '部分领取'
        },
        {
          id: 6,
          title: '已领取'
        },
        {
          id: 7,
          title: '已归还'
        },
        {
          id: 8,
          title: '待归还'
        },
        {
          id: 9,
          title: '部分归还'
        },
        {
          id: 10,
          title: '放弃领取'
        }
      ]
    },

    {
      keyType: 'dateRange',
      title: '申领日期',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    },

    {
      keyType: 'radio',
      title: '物品状态',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 11,
          title: '待维修'
        },
        {
          id: 12,
          title: '维修中'
        },
        {
          id: 13,
          title: '已维修'
        },
        {
          id: 14,
          title: '维修报废'
        },
        {
          id: 15,
          title: '直接报废'
        },
        {
          id: 16,
          title: '部分维修'
        },
        {
          id: 17,
          title: '部分报废'
        },
        {
          id: 18,
          title: '完好'
        },
        {
          id: 19,
          title: '无'
        }
      ]
    }
  ]
}

//招兵买马
export const recruitmentSearchList = {
  1: {
    status: 'recruitmentSearchList',
    keywords: 'search',
    data: [
      {
        keyType: 'depart',
        title: '部门',
        placeholder: '请选择部门',
        keyName: 'org_id',
        dataType: [],
        value: {
          num: '',
          arr: []
        }
      },
      {
        keyType: 'position',
        title: '岗位',
        placeholder: '请选择岗位',
        keyName: 'position_id',
        dataType: [],
        value: {
          num: ''
        }
      }
    ]
  },
  2: {
    status: 'recruitmentSearchList',
    keywords: 'search',
    data: [
      {
        keyType: 'depart',
        title: '部门',
        placeholder: '请选择部门',
        keyName: 'org_id',
        dataType: [],
        value: {
          num: '',
          arr: []
        }
      },
      {
        keyType: 'position',
        title: '岗位',
        placeholder: '请选择岗位',
        keyName: 'position_id',
        dataType: [],
        value: {
          num: ''
        }
      }
    ]
  },
  3: {
    status: 'recruitmentSearchList',
    keywords: 'search',
    data: [
      {
        keyType: 'depart',
        title: '部门',
        placeholder: '请选择部门',
        keyName: 'org_id',
        dataType: [],
        value: {
          num: '',
          arr: []
        }
      },
      {
        keyType: 'position',
        title: '岗位',
        placeholder: '请选择岗位',
        keyName: 'position_id',
        dataType: [],
        value: {
          num: ''
        }
      }
    ]
  },
  4: {
    status: 'recruitmentSearchList',
    keywords: 'search',
    data: [
      {
        keyType: 'depart',
        title: '部门',
        placeholder: '请选择部门',
        keyName: 'org_id',
        dataType: [],
        value: {
          num: '',
          arr: []
        }
      },
      {
        keyType: 'position',
        title: '岗位',
        placeholder: '请选择岗位',
        keyName: 'position_id',
        dataType: [],
        value: {
          num: ''
        }
      }
    ]
  }
}

//待处理项
export const pendingSearchList = {
  status: 'pendingSearchList',
  keywords: 'search',
  data: [
    {
      keyType: 'dateRange',
      title: '创建时间',
      placeholder: '请选择日期',
      keyName: 'createTime',
      dataType: []
    },
    {
      keyType: 'radio',
      title: '事件类型',
      keyName: 'event_type',
      dataType: [],
      value: [
        { id: 1, title: '违约' },
        { id: 2, title: '转租' },
        { id: 3, title: '调租' },
        { id: 4, title: '退租' },
        { id: 5, title: '收房炸单' },
        { id: 6, title: '租房炸单' }
      ]
    },
    {
      keyType: 'radio',
      title: '收租类型',
      keyName: 'collect_rent',
      dataType: [],
      value: [{ id: 1, title: '收房' }, { id: 2, title: '租房' }]
    }
  ]
}
//房东租客
export const lordRenterSearchList = {
  status: 'lordRenterSearchList',
  keywords: 'search',
  data: [
    {
      keyType: 'dateRange',
      title: '创建时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: []
    }
  ]
}

//应收款
export const gatheringSearchList = {
  status: 'gatheringSearchList',
  keywords: 'search',
  data: [
    {
      keyType: 'dateRange',
      title: '应收时间',
      placeholder: '请选择日期',
      keyName: 'gatherDate',
      dataType: []
    },
    {
      keyType: 'dateRange',
      title: '催缴时间',
      placeholder: '请选择日期',
      keyName: 'tagDate',
      dataType: []
    },
    {
      keyType: 'radio',
      title: '入账状态',
      keyName: 'status',
      dataType: [],
      value: [
        { id: 1, title: '待入账' },
        { id: 2, title: '待结清' },
        { id: 3, title: '已结清' },
        { id: 4, title: '已超额' }
      ]
    },
    {
      keyType: 'radio',
      title: '催缴状态',
      keyName: 'tag_status',
      dataType: [],
      value: [
        { id: 1, title: '违约' },
        { id: 2, title: '延期' },
        { id: 3, title: '贴条' },
        { id: 4, title: '换锁' },
        { id: 5, title: '维修' },
        { id: 6, title: '资金' },
        { id: 7, title: '炸单' },
        { id: 8, title: '调房' },
        { id: 9, title: '特殊情况' }
      ]
    },
    {
      keyType: 'staff',
      title: '员工',
      placeholder: '请选择员工',
      keyName: 'staff',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'department',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    }
  ]
}

//账户
export const accountSearchList = {
  status: 'accountSearchList',
  keywords: 'search',
  data: [
    {
      keyType: 'radio',
      title: '账户范围',
      keyName: 'scope',
      dataType: '',
      value: [
        {
          id: 3,
          title: '收'
        },
        {
          id: 5,
          title: '付'
        }
      ]
    },
    {
      keyType: 'radio',
      title: '账户类型',
      keyName: 'cate',
      dataType: '',
      value: [
        {
          id: 1,
          title: '银行卡'
        },
        {
          id: 2,
          title: '支付宝'
        },
        {
          id: 3,
          title: '微信'
        }
      ]
    }
  ]
}

//付款
export const paySearchList = {
  status: 'paySearchList',
  keywords: 'search',
  data: [
    {
      keyType: 'radio',
      title: '入账状态',
      keyName: 'status',
      dataType: [],
      value: [
        { id: 1, title: '待入账' },
        { id: 2, title: '待结清' },
        { id: 3, title: '已结清' },
        { id: 4, title: '已超额' }
      ]
    },

    {
      keyType: 'staff',
      title: '员工',
      placeholder: '请选择员工',
      keyName: 'staff',
      dataType: [],
      value: {
        num: ''
      }
    },
    {
      keyType: 'depart',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'department',
      dataType: [],
      value: {
        num: '',
        arr: []
      }
    }
  ]
}
