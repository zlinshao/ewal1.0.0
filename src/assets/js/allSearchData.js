// 员工名册
export const staffBookSearch = {
  status: 'staffBookSearch',
  data: [
    {
      keyType: 'date',
      title: '出生日期',
      placeholder: '请选择日期',
      keyName: 'date3',
      dataType: '',
    },
    {
      keyType: 'dateRange',
      title: '创建时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: [],
    },
    {
      keyType: 'dateRange',
      title: '跟进时间',
      placeholder: '请选择日期',
      keyName: 'date2',
      dataType: [],
    },
    {
      keyType: 'radio',
      title: '紧急程度',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 12,
          title: '特级',
        },
        {
          id: 13,
          title: '紧急',
        },
        {
          id: 14,
          title: '重要',
        },
        {
          id: 15,
          title: '一般',
        }
      ],
    },
    {
      keyType: 'check',
      title: '状态',
      keyName: 'check',
      dataType: [],
      value: [
        {
          id: 22,
          title: '已完成',
        },
        {
          id: 23,
          title: '未完成',
        },
      ],
    },
    {
      keyType: 'staff',
      title: '员工',
      placeholder: '请选择员工',
      keyName: 'staff',
      dataType: [],
      value: {
        num: '',
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
    },
    {
      keyType: 'position',
      title: '岗位',
      placeholder: '请选择岗位',
      keyName: 'position',
      dataType: [],
      value: {
        num: '',
      }
    },
  ],
};

// 离职管理
export const LeaveJobSearch = {
  status: 'LeaveJobSearch',
  data: [
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    },
    {
      keyType: 'dateRange',
      title: '离职日期',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: [],
    },
  ],
};

// 工单
export const workOrderSearch = {
  status: 'workOrder',
  data: [
    {
      keyType: 'date',
      title: '出生日期',
      placeholder: '请选择日期',
      keyName: 'date3',
      dataType: '',
    },
    {
      keyType: 'dateRange',
      title: '创建时间',
      placeholder: '请选择日期',
      keyName: 'date1',
      dataType: [],
    },
    {
      keyType: 'dateRange',
      title: '跟进时间',
      placeholder: '请选择日期',
      keyName: 'date2',
      dataType: [],
    },
    {
      keyType: 'radio',
      title: '紧急程度',
      keyName: 'radio',
      dataType: '',
      value: [
        {
          id: 12,
          title: '特级',
        },
        {
          id: 13,
          title: '紧急',
        },
        {
          id: 14,
          title: '重要',
        },
        {
          id: 15,
          title: '一般',
        }
      ],
    },
    {
      keyType: 'check',
      title: '状态',
      keyName: 'check',
      dataType: [],
      value: [
        {
          id: 22,
          title: '已完成',
        },
        {
          id: 23,
          title: '未完成',
        },
      ],
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    },
    {
      keyType: 'organ',
      title: '部门',
      placeholder: '请选择部门',
      keyName: 'organ',
      dataType: '',
    }
  ],
};

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
        {id: 1, title: '收入'},
        {id: 2, title: '支出'},
        {id: 3, title: '混合'}
      ]
    },
  ]
};
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
        {id: 1, title: '房东'},
        {id: 2, title: '租客'},
        {id: 3, title: '其他'}
      ]
    },
  ]
};

//收支流水
export const accountRunSearch = {
  status: 'budgetStream',
  keywords: 'search',
  data: [
    {
      keyType: 'date',
      title: '开始日期',
      placeholder: '请选择开始日期',
      keyName: 'start_date',
      dataType: '',
    },
    {
      keyType: 'date',
      title: '结束日期',
      placeholder: '请选择结束日期',
      keyName: 'end_date',
      dataType: '',
    },
    {
      keyType: 'radio',
      title: '类别',
      placeholder: '请选择类别',
      keyName: 'cate',
      dataType: '',
      value: [
        {id: 1, title: '收入'},
        {id: 2, title: '支出'},
      ]
    },
    {
      keyType: 'date',
      title: '操作开始日期',
      placeholder: '请选择操作开始日期',
      keyName: 'operate_start_date',
      dataType: '',
    },
    {
      keyType: 'date',
      title: '操作结束日期',
      placeholder: '请选择操作结束日期',
      keyName: 'operate_end_date',
      dataType: '',
    },
  ]
};
