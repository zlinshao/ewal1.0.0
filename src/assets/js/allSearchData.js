// 员工名册
export const staffBookSearch = {
        status: 'staffBookSearch',
        placeholder: '请输入搜索内容',
        keywords: 'search',
        limit: 12,
        data: [{
                keyType: 'radio',
                title: '离职',
                keyName: 'is_on_job',
                dataType: '',
                value: [{
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
                value: [{
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
                    num: '1',
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
                    num: '1',
                    arr: []
                }
            }
        ]
    }
    // 离职管理
export const OrgSearch = {
    status: 'OrgSearch',
    keywords: 'search',
    limit: 7,
    page: 1,
    data: [{
        keyType: 'depart',
        title: '部门',
        placeholder: '请选择部门',
        keyName: 'org_id',
        dataType: [],
        value: {
            num: '',
            arr: []
        }
    }]
}

// 离职管理
export const LeaveJobSearch = {
    status: 'LeaveJobSearch',
    keywords: 'search',
    data: [{
            keyType: 'radio',
            title: '禁用',
            keyName: 'is_enable',
            dataType: '',
            value: [{
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
        },
        {
            keyType: 'dateRange',
            title: '离职时间',
            placeholder: '请选择日期',
            keyName: 'dismiss_time',
            dataType: []
        }
    ]
}

// 工单
export const workOrderSearch = {
    status: 'workOrder',
    placeholder: '地址/合同编号/工单编号/内容',
    keywords: 'search',
    data: [{
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'create_time',
            dataType: []
        },
        {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'end_time',
            dataType: []
        },
        {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'emergency',
            dataType: '',
            value: [{
                    id: 3,
                    title: '特急'
                },
                {
                    id: 2,
                    title: '紧急'
                },
                {
                    id: 1,
                    title: '一般'
                },
                {
                    id: 4,
                    title: '重要'
                }
            ]
        },
        {
            keyType: 'radio',
            title: '工单类型',
            keyName: 'type',
            dataType: '',
            value: [{
                    id: 1,
                    title: '报销'
                },
                {
                    id: 2,
                    title: '核实信息'
                },
                {
                    id: 3,
                    title: '催缴'
                },
                {
                    id: 4,
                    title: '续租'
                },
                {
                    id: 5,
                    title: '调房'
                },
                {
                    id: 6,
                    title: '退租'
                },
                {
                    id: 7,
                    title: '维修'
                },
                {
                    id: 8,
                    title: '保洁'
                },
                {
                    id: 9,
                    title: '转租'
                },
                {
                    id: 10,
                    title: '求租'
                },
                {
                    id: 11,
                    title: '投诉'
                },
                {
                    id: 12,
                    title: '托管'
                },
                {
                    id: 13,
                    title: '其他'
                }
            ]
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
        },
        {
            keyType: 'staff',
            title: '处理人',
            placeholder: '请选择员工',
            keyName: 'staff',
            dataType: [],
            value: {
                num: 1
            }
        }
    ]
}

// 回访记录
export const visitToRecordSearch = {
    status: 'visitToRecord',
    placeholder: '地址/合同编号/内容',
    keywords: 'search',
    data: [{
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
    placeholder: '地址/合同编号/姓名/电话',
    keywords: 'search',
    data: [{
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
                num: 1
            }
        },
        {
            keyType: 'staff',
            title: '负责人',
            placeholder: '请选择员工',
            keyName: 'handler',
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
                num: 1
            }
        },
        {
            keyType: 'check',
            title: '状态',
            keyName: 'tag_status',
            dataType: [],
            value: [{
                    id: 1,
                    title: '续租'
                },
                {
                    id: 2,
                    title: '退租'
                }
            ]
        }
    ]
}

// 资料审核
export const dataAuditSearch = {
    status: 'dataAudit',
    placeholder: '地址/合同编号',
    keywords: 'search',
    data: [{
            keyType: 'dateRange',
            title: '签约时间',
            placeholder: '请选择日期',
            keyName: 'dateTime',
            dataType: []
        },
        {
            keyType: 'radio',
            title: '合同性质',
            keyName: 'type',
            dataType: [],
            value: [{
                    id: 1,
                    title: '新收'
                },
                {
                    id: 2,
                    title: '续收'
                }
            ]
        },
        {
            keyType: 'staff',
            title: '开单人',
            placeholder: '请选择员工',
            keyName: 'signer',
            dataType: '',
            value: {
                num: 1
            }
        },
        /*{
          keyType: 'staff',
          title: '负责人',
          placeholder: '请选择员工',
          keyName: 'handler',
          dataType: '',
          value: {
            num: 1
          }
        },*/
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        }
    ]
}

// 维修保洁
export const maintenanceSearch = {
    status: 'workOrder',
    placeholder: '地址/合同编号/工单编号/内容',
    keywords: 'search',
    data: [{
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'create_time',
            dataType: []
        },
        {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'finish_time',
            dataType: []
        },
        {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'emergency',
            dataType: '',
            value: [{
                    id: 3,
                    title: '特急'
                },
                {
                    id: 2,
                    title: '紧急'
                },
                {
                    id: 4,
                    title: '重要'
                },
                {
                    id: 1,
                    title: '一般'
                }
            ]
        },
        {
            keyType: 'staff',
            title: '处理人',
            placeholder: '请选择员工',
            keyName: 'operate_user_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'operate_org_id',
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
    keywords: 'search',
    data: [{
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
    }]
}

//收支流水
export const accountRunSearch = {
    status: 'budgetStream',
    keywords: 'search',
    data: [{
            keyType: 'date',
            title: '开始日期',
            placeholder: '请选择开始日期',
            keyName: 'start_date',
            dataType: ''
        },
        {
            keyType: 'date',
            title: '结束日期',
            placeholder: '请选择结束日期',
            keyName: 'end_date',
            dataType: ''
        },
        {
            keyType: 'radio',
            title: '类别',
            placeholder: '请选择类别',
            keyName: 'cate',
            dataType: '',
            value: [{ id: 1, title: '收入' }, { id: 2, title: '支出' }]
        },
        {
            keyType: 'date',
            title: '操作开始日期',
            placeholder: '请选择操作开始日期',
            keyName: 'operate_start_date',
            dataType: ''
        },
        {
            keyType: 'date',
            title: '操作结束日期',
            placeholder: '请选择操作结束日期',
            keyName: 'operate_end_date',
            dataType: ''
        }
    ]
}

/*赏罚分明*/
//赏善令
export const rewardUpSearch = {
        status: 'rewardUpSearch',
        data: []
    }
    //惩恶令
export const rewardDownSearch = {
    status: 'rewardDownSearch',
    data: []
}

/*公告问卷*/
//公告
export const noticeSearch = {
        status: 'noticeSearch',
        placeholder: '请输入公告名称',
        keywords: 'search',
        data: []
    }
    //问卷调查
export const questionnaireSearch = {
    status: 'questionnaireSearch',
    placeholder: '请输入问卷调查名称',
    keywords: 'search',
    data: []
}

/*内务库房*/

//库房总览
export const overViewSearch = {
    status: 'overViewSearch',
    placeholder: '请输入物品名称',
    keywords: 'search',
    data: [],
}

//借用领用
export const borrowReceiveSearch = {
    status: 'borrowReceiveSearch',
    placeholder: '请输入搜索内容',
    keywords: 'search',
    data: [{
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org_id',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        },
        {
            keyType: 'radio',
            title: '申请类型',
            keyName: 'type',
            dataType: '',
            value: [{
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
            keyName: 'apply_status',
            dataType: '',
            value: [{
                    id: 0,
                    title: '待通知'
                },
                {
                    id: 1,
                    title: '待领取'
                },
                {
                    id: 2,
                    title: '已领取'
                },
                {
                    id: 3,
                    title: '放弃领取'
                },
                {
                    id: 4,
                    title: '待归还'
                },
                {
                    id: 5,
                    title: '已归还'
                }
            ]
        },

        {
            keyType: 'dateRange',
            title: '申领日期',
            placeholder: '请选择日期',
            keyName: 'apply_time',
            dataType: []
        },

        {
            keyType: 'radio',
            title: '物品状态',
            keyName: 'goods_status',
            dataType: '',
            value: [{
                    id: 0,
                    title: '无'
                },
                {
                    id: 1,
                    title: '待维修'
                },
                {
                    id: 2,
                    title: '维修中'
                },
                {
                    id: 3,
                    title: '已维修'
                },
                {
                    id: 4,
                    title: '报废'
                }
            ]
        }
    ]
}

//招聘管理
export const recruitmentSearchList = {
    1: {
        status: 'recruitmentSearchList',
        keywords: 'search',
        data: [{
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
                    num: '',
                    arr: []
                }
            }
        ]
    },
    2: {
        status: 'recruitmentSearchList',
        keywords: 'search',
        data: [
            /*{
              keyType: 'depart',
              title: '部门',
              placeholder: '请选择部门',
              keyName: 'org_id',
              dataType: [],
              value: {
                num: '',
                arr: []
              }
            },*/

            {
                keyType: 'position',
                title: '岗位',
                placeholder: '请选择岗位',
                keyName: 'position_id',
                dataType: [],
                value: {
                    num: '',
                    arr: []
                }
            },
            {
                keyType: 'radio',
                title: '来源',
                keyName: 'platform',
                dataType: [],
                value: [
                    { id: 0, title: '智联招聘' },
                    { id: 1, title: '前程无忧' },
                    { id: 2, title: '58同城' },
                    { id: 3, title: 'BOSS直聘' },
                    { id: 4, title: '猎聘网' },
                    { id: 5, title: '首席信才' },
                    { id: 6, title: '德胜人才' },
                    { id: 7, title: '校园招聘会' },
                    { id: 8, title: '社会招聘会' },
                    { id: 9, title: '推荐' },
                    { id: 10, title: '其他' },
                ]
            },
        ]
    },
    3: {
        status: 'recruitmentSearchList',
        keywords: 'search',
        data: [
            /*{
              keyType: 'depart',
              title: '部门',
              placeholder: '请选择部门',
              keyName: 'org_id',
              dataType: [],
              value: {
                num: '',
                arr: []
              }
            },*/

            {
                keyType: 'position',
                title: '岗位',
                placeholder: '请选择岗位',
                keyName: 'position_id',
                dataType: [],
                value: {
                    num: '',
                    arr: []
                }
            },
            {
                keyType: 'radio',
                title: '来源',
                keyName: 'platform',
                dataType: [],
                value: [
                    { id: 0, title: '智联招聘' },
                    { id: 1, title: '前程无忧' },
                    { id: 2, title: '58同城' },
                    { id: 3, title: 'BOSS直聘' },
                    { id: 4, title: '猎聘网' },
                    { id: 5, title: '首席信才' },
                    { id: 6, title: '德胜人才' },
                    { id: 7, title: '校园招聘会' },
                    { id: 8, title: '社会招聘会' },
                    { id: 9, title: '推荐' },
                    { id: 10, title: '其他' },
                ]
            },
        ]
    },
    4: { //预约入职
        status: 'recruitmentSearchList',
        keywords: 'search',
        data: [
            /*{
              keyType: 'depart',
              title: '部门',
              placeholder: '请选择部门',
              keyName: 'org_id',
              dataType: [],
              value: {
                num: '',
                arr: []
              }
            },*/
            {
                keyType: 'position',
                title: '岗位',
                placeholder: '请选择岗位',
                keyName: 'position_id',
                dataType: [],
                value: {
                    num: '',
                    arr: []
                }
            },
            {
                keyType: 'radio',
                title: '来源',
                keyName: 'platform',
                dataType: [],
                value: [
                    { id: 0, title: '智联招聘' },
                    { id: 1, title: '前程无忧' },
                    { id: 2, title: '58同城' },
                    { id: 3, title: 'BOSS直聘' },
                    { id: 4, title: '猎聘网' },
                    { id: 5, title: '首席信才' },
                    { id: 6, title: '德胜人才' },
                    { id: 7, title: '校园招聘会' },
                    { id: 8, title: '社会招聘会' },
                    { id: 9, title: '推荐' },
                    { id: 10, title: '其他' },
                ]
            },
        ]
    }
}

//待处理项
export const pendingSearchList = {
    status: 'pendingSearchList',
    keywords: 'search',
    data: [{
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

//房东
export const lordSearchList = {
    status: 'lordSearchList',
    keywords: 'search',
    data: [
        {
            keyType: 'dateRange',
            title: '生成时间',
            placeholder: '请选择日期',
            keyName: 'gatherDate',
            dataType: []
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },
        {
            keyType: 'radio',
            title: '报备类型',
            keyName: 'type',
            dataType: [],
            value: [
                { id: 1, title: '新收' },
                { id: 2, title: '续收' },
            ]
        },
    ]
}
// 租客
export const RenterSearchList = {
    status: 'RenterSearchList',
    keywords: 'search',
    data: [
        {
            keyType: 'dateRange',
            title: '生成时间',
            placeholder: '请选择日期',
            keyName: 'gatherDate',
            dataType: []
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },
        {
            keyType: 'radio',
            title: '报备类型',
            keyName: 'rent_type',
            dataType: [],
            value: [
                { id: 1, title: '新租' },
                { id: 2, title: '转租' },
                { id: 3, title: '续租' },
                { id: 5, title: '调租' },
            ]
        },
    ]
}
// 租房预定
export const RenterOrderSearchList = {
    status: 'RenterOrderSearchList',
    keywords: 'search',
    data: [
        {
            keyType: 'dateRange',
            title: '生成时间',
            placeholder: '请选择日期',
            keyName: 'gatherDate',
            dataType: []
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },
         {
            keyType: 'radio',
            title: '报备类型',
            keyName: 'bulletin_type',
            dataType: [],
            value: [
                { id: 1, title: '未收先租' },
                { id: 2, title: '租房预定' },
            ]
        },
    ]
}

//结算单
export const balanceSearch = {
    status: 'balanceSearch',
    keywords: 'search',
    data: [{
            keyType: 'date',
            title: '开始日期',
            placeholder: '请选择开始日期',
            keyName: 'start_date',
            dataType: ''
        },
        {
            keyType: 'date',
            title: '结束日期',
            placeholder: '请选择结束日期',
            keyName: 'end_date',
            dataType: ''
        },
        {
            keyType: 'date',
            title: '操作开始日期',
            placeholder: '请选择操作开始日期',
            keyName: 'operate_start_date',
            dataType: ''
        },
        {
            keyType: 'date',
            title: '操作结束日期',
            placeholder: '请选择操作结束日期',
            keyName: 'operate_end_date',
            dataType: ''
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        }
    ]
}

//应收款
export const gatheringSearchList = {
    status: 'gatheringSearchList',
    keywords: 'search',
    data: [{
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
            keyName: 'staff_ids',
            dataType: [],
            value: {
                num: ''
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
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
    data: [{
            keyType: 'radio',
            title: '账户范围',
            keyName: 'scope',
            dataType: '',
            value: [{
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
            value: [{
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
    data: [{
            keyType: 'radio',
            title: '入账状态',
            keyName: 'status',
            dataType: '',
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
export const currentMonthAssessmentSearch = {
    status: 'currentMonthAssessmentSearch',
    keywords: 'search',
    data: [{
            keyType: 'radio',
            title: '发送状态',
            keyName: 'sendStatus',
            dataType: [],
            value: [
                { id: 0, title: '未发送' },
                { id: 1, title: '已发送' },
                { id: 2, title: '发送失败' }
            ]
        },
        {
            keyType: 'radio',
            title: '确认状态',
            keyName: 'confirmStatus',
            dataType: [],
            value: [
                { id: 0, title: '未确认' },
                { id: 1, title: '已确认' },
                { id: 2, title: '有异议' }
            ]
        }
    ]
}

//房源管理   市场
export const houseManagementSearch = {
    status: 'houseManagement',
    keywords: 'search',
    data: [{
            keyType: 'check',
            title: '房屋状态',
            keyName: 'status',
            dataType: [],
            value: [{
                    id: 1,
                    title: '未出租'
                },
                /*{
                  id: 2,
                  title: '预订'
                },*/
                {
                    id: 4,
                    title: '已出租'
                },
                {
                    id: 2,
                    title: '已预定'
                }
            ]
        },
        {
            keyType: 'check',
            title: '户型',
            keyName: 'room',
            dataType: [],
            value: [{
                    id: 1,
                    title: '一室'
                },
                {
                    id: 2,
                    title: '两室'
                },
                {
                    id: 3,
                    title: '三室'
                },
                {
                    id: 4,
                    title: '四室'
                },
                {
                    id: 5,
                    title: '以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '预警状态',
            keyName: 'warning_status',
            dataType: [],
            value: [{
                    id: 1,
                    title: '正常'
                },
                {
                    id: 2,
                    title: '黄色预警'
                },
                {
                    id: 3,
                    title: '橙色预警'
                },
                {
                    id: 4,
                    title: '红色预警'
                }
            ]
        },
        {
            keyType: 'check',
            title: '建议价格',
            keyName: 'suggest_price',
            dataType: [],
            value: [{
                    id: 1,
                    title: '2000以下'
                },
                {
                    id: 2,
                    title: '2000~3000'
                },
                {
                    id: 3,
                    title: '3000~4000'
                },
                {
                    id: 4,
                    title: '4000以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '装修',
            keyName: 'decoration',
            dataType: [],
            value: [
                //     {
                //     id: 3,
                //     title: '精装'
                // },
                // {
                //     id: 2,
                //     title: '简装'
                // },
                // {
                //     id: 4,
                //     title: '豪装'
                // },
                // {
                //     id: 1,
                //     title: '毛坯'
                // },
                {
                    id: 407,
                    title: '精装'
                },
                {
                    id: 406,
                    title: '简装'
                },
                {
                    id: 408,
                    title: '豪装'
                },
                {
                    id: 405,
                    title: '毛坯'
                },
            ]
        },
        {
            keyType: 'radio',
            title: '质量',
            keyName: 'quality',
            dataType: [],
            value: [{
                    id: 1,
                    title: '低质量',
                },
                {
                    id: 0,
                    title: '正常',
                },
            ],
        },
        {
            keyType: 'check',
            title: '面积',
            keyName: 'area',
            dataType: [],
            value: [{
                    id: 1,
                    title: '100以下'
                },
                {
                    id: 2,
                    title: '100~150'
                },
                {
                    id: 3,
                    title: '150以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '房屋类型',
            keyName: 'house_identity',
            dataType: [],
            value: [{
                    id: 419,
                    title: '住宅'
                },
                {
                    id: 420,
                    title: '公寓'
                },
                {
                    id: 421,
                    title: '商用两住'
                },
                {
                    id: 422,
                    title: '别墅'
                },
                {
                    id: 423,
                    title: '平房'
                },
                {
                    id: 424,
                    title: '其他'
                }
            ]
        }
    ]
}

//房源管理     运维中心customService
export const customHouseManagementSearch = {
    status: 'houseManagement',
    keywords: 'search',
    data: [{
            keyType: 'check',
            title: '房屋状态',
            keyName: 'status',
            dataType: [],
            value: [{
                    id: 1,
                    title: '未出租'
                },
                /*{
                  id: 2,
                  title: '预订'
                },*/
                {
                    id: 4,
                    title: '已出租'
                },
                {
                    id: 2,
                    title: '已预定'
                },
                {
                    id: 3,
                    title: '待入住'
                },
                {
                    id: 5,
                    title: '已完成'
                }
            ]
        },
        {
            keyType: 'check',
            title: '户型',
            keyName: 'room',
            dataType: [],
            value: [{
                    id: 1,
                    title: '一室'
                },
                {
                    id: 2,
                    title: '两室'
                },
                {
                    id: 3,
                    title: '三室'
                },
                {
                    id: 4,
                    title: '四室'
                },
                {
                    id: 5,
                    title: '以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '预警状态',
            keyName: 'warning_status',
            dataType: [],
            value: [{
                    id: 1,
                    title: '正常'
                },
                {
                    id: 2,
                    title: '黄色预警'
                },
                {
                    id: 3,
                    title: '橙色预警'
                },
                {
                    id: 4,
                    title: '红色预警'
                }
            ]
        },
        {
            keyType: 'check',
            title: '建议价格',
            keyName: 'suggest_price',
            dataType: [],
            value: [{
                    id: 1,
                    title: '2000以下'
                },
                {
                    id: 2,
                    title: '2000~3000'
                },
                {
                    id: 3,
                    title: '3000~4000'
                },
                {
                    id: 4,
                    title: '4000以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '装修',
            keyName: 'decoration',
            dataType: [],
            value: [{
                    id: 3,
                    title: '精装'
                },
                {
                    id: 2,
                    title: '简装'
                },
                {
                    id: 4,
                    title: '豪装'
                },
                {
                    id: 1,
                    title: '毛坯'
                },
                // {
                //   id: 407,
                //   title: '精装'
                // },
                // {
                //   id: 406,
                //   title: '简装'
                // },
                // {
                //   id: 408,
                //   title: '豪装'
                // },
                // {
                //   id: 405,
                //   title: '毛坯'
                // },
            ]
        },
        {
            keyType: 'radio',
            title: '质量',
            keyName: 'quality',
            dataType: [],
            value: [{
                    id: 1,
                    title: '低质量',
                },
                {
                    id: 0,
                    title: '正常',
                },
            ],
        },
        {
            keyType: 'check',
            title: '面积',
            keyName: 'area',
            dataType: [],
            value: [{
                    id: 1,
                    title: '100以下'
                },
                {
                    id: 2,
                    title: '100~150'
                },
                {
                    id: 3,
                    title: '150以上'
                }
            ]
        },
        {
            keyType: 'check',
            title: '房屋类型',
            keyName: 'house_identity',
            dataType: [],
            value: [{
                    id: 419,
                    title: '住宅'
                },
                {
                    id: 420,
                    title: '公寓'
                },
                {
                    id: 421,
                    title: '商用两住'
                },
                {
                    id: 422,
                    title: '别墅'
                },
                {
                    id: 423,
                    title: '平房'
                },
                {
                    id: 424,
                    title: '其他'
                }
            ]
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org_user_id',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },
        {
            keyType: 'input',
            title: '当前空置时长',
            placeholder: '请输入空置时长',
            keyName: 'kong',
            dataType: '',
        },
        // {
        //     keyType: 'check',
        //     title: '其他',
        //     keyName: 'house_identitycc',
        //     dataType: [],
        //     value: [{
        //             id: 419,
        //             title: '保洁'
        //         },
        //         {
        //             id: 420,
        //             title: '需维修'
        //         },
        //         {
        //             id: 421,
        //             title: '物品待补齐'
        //         },
        //     ]
        // }
    ]
}

//人资kpi考核
export const kpiSearch = {
    status: 'kpiSearch',
    keywords: 'search',
    data: [
        // {
        //   keyType: 'check',
        //   title: '职级',
        //   keyName: 'position',
        //   dataType: [],
        //   value: [
        //     { id: 1, title: 'P1' },
        //     { id: 2, title: 'P2' },
        //     { id: 3, title: 'P3' },
        //     { id: 4, title: 'P4' },
        //     { id: 5, title: 'P5' },
        //     { id: 6, title: 'P6' },
        //     { id: 7, title: 'P7' },
        //   ]
        // },
        {
            keyType: 'radio',
            title: '确认状态',
            keyName: 'period',
            dataType: '',
            value: [
                { id: 0, title: '周度' },
                { id: 1, title: '月度' },
                { id: 2, title: '季度' },
                { id: 3, title: '半年度' },
                { id: 4, title: '年度' }
            ]
        }
    ]
}

// 业绩工资
export const performanceSearch = {
    status: 'performanceSearch',
    keywords: 'search',
    limit: 5,
    data: [{
            keyType: 'radio',
            title: '出租类型',
            keyName: 'achv_type',
            dataType: '',
            value: [{
                    id: 1,
                    title: '新收新租'
                },
                {
                    id: 2,
                    title: '二次出租'
                }
            ]
        },
        {
            keyType: 'depart',
            title: '租房片区',
            placeholder: '请选择片区',
            keyName: 'rent_org_id',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        },
        {
            keyType: 'staff',
            title: '租房人',
            placeholder: '请选择员工',
            keyName: 'rent_staff_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'dateRange',
            title: '报备时间',
            placeholder: '请选择日期',
            keyName: 'rent_bulletindate',
            dataType: []
        }
    ]
}


// 合同管理
export const contractManagementSearch = {
    status: 'contractManagement',
    keywords: 'search',
    placeholder: '地址/合同编号',
    data: [{
            keyType: 'dateRange',
            title: '签约时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
        },
        {
            keyType: 'radio',
            title: '合同性质',
            keyName: 'type',
            dataType: '',
            value: [
                { id: 1, title: '新租' },
                { id: 2, title: '转租' },
                { id: 3, title: '续租' },
                /*{ id: 4, title: '未收先租' },*/
                { id: 5, title: '调租' },
            ]
        },
        {
            keyType: 'dateRange',
            title: '合同开始时间周期',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
        },
        {
            keyType: 'dateRange',
            title: '合同结束时间周期',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: [],
        },
        {
            keyType: 'staff',
            title: '开单人',
            placeholder: '请选择开单人',
            keyName: 'signer',
            dataType: '',
            value: {
                num: 1,
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        }
    ]
}