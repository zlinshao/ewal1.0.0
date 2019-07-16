// 员工名册
export const staffBookSearch = {
        status: 'staffBookSearch',
        placeholder: '姓名/联系方式',
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
    // 部门管理
export const OrgSearch = {
    status: 'OrgSearch',
    placeholder: '部门名称',
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


export const companySearch = {
    status: 'companySearch',
    placeholder: '公司名称',
    keywords: 'search',
}
    // 热门导读管理
    export const HotSearch = {
        status: 'HotSearch',
        placeholder: '标题',
        keywords: 'search',
        limit: 7,
        page: 1,
        data: [{
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },{
            keyType: 'radio',
            title: '热门导读类型',
            keyName: 'type_id',
            dataType: '',
            value: [{
                    id: 1,
                    title: '研发类'
                },
                {
                    id: 2,
                    title: '财务类'
                },
                {
                    id: 3,
                    title: '人力资源类'
                }
            ]
        },{
            keyType: 'radio',
            title: '是否发布',
            keyName: 'is_open',
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
        },{
            keyType: 'radio',
            title: '是否置顶',
            keyName: 'is_top',
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
        },{
            keyType: 'radio',
            title: '是否加精',
            keyName: 'is_great',
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
        },{
            keyType: 'dateRange',
            title: '发布时间',
            keyName: 'open_time',
            placeholder: '请选择日期',
            dataType: []
        }]
    }
     // 新闻、公告管理
     export const NewsSearch = {
        status: 'NewsSearch',
        placeholder: '标题',
        keywords: 'search',
        limit: 7,
        page: 1,
        data: [{
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },{
            keyType: 'radio',
            title: '是否发布',
            keyName: 'is_open',
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
        },{
            keyType: 'radio',
            title: '是否置顶',
            keyName: 'is_top',
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
        },{
            keyType: 'radio',
            title: '是否加精',
            keyName: 'is_great',
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
        },{
            keyType: 'dateRange',
            title: '发布时间',
            keyName: 'open_time',
            placeholder: '请选择日期',
            dataType: []
        }]
    }

// 离职管理
export const LeaveJobSearch = {
    status: 'LeaveJobSearch',
    placeholder: '姓名/联系方式',
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
            title: '到期时间',
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
        keyType: 'radio',
        title: '是否已读',
        keyName: 'is_read',
        dataType: [],
        value: [
          {
            id: 0,
            title: '不限'
          },
          {
            id: 1,
            title: '已读'
          },
          {
            id: 2,
            title: '未读'
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
// 接线记录
export const onlineRecordSearch = {
          status: 'village',
          placeholder: '请输入搜索内容',
          keywords: 'search',
          data: [
            {
              keyType: 'dateRange',
              title: '来电时间',
              placeholder: '请选择日期',
              keyName: 'date',
              dataType: []
            },
            {
              keyType: 'check',
              title: '类型',
              keyName: 'advisory_type',
              dataType: [],
              value: [
                {
                  id: 1,
                  title: '投诉'
                },
                {
                  id: 2,
                  title: '其他'
                },
                {
                  id: 3,
                  title: '报修(公司)'
                },
                {
                  id: 4,
                  title: '报修(房东)'
                },
                {
                  id: 5,
                  title: '报修(超报修期)'
                },
                {
                  id: 6,
                  title: '报修(无信息)'
                },
                {
                  id: 7,
                  title: '报销'
                },
                {
                  id: 8,
                  title: '催缴'
                },
                {
                  id: 9,
                  title: '退租(违约金)'
                },
                {
                  id: 10,
                  title: '退租(到期退)'
                },
                {
                  id: 11,
                  title: '求租托管'
                },
                {
                  id: 12,
                  title: '续租'
                },
                {
                  id: 13,
                  title: '退押金'
                },
                {
                  id: 14,
                  title: '业主催房租'
                },
                {
                  id: 15,
                  title: '租客缴纳房租'
                },
                {
                  id: 16,
                  title: '业主收房(违约)'
                },{
                  id: 17,
                  title: '业主收房(到期)'
                },{
                  id: 18,
                  title: '催维修'
                },
                {
                  id: 19,
                  title: '转租'
                },

              ]
            },
          ]
        };
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
        placeholder: '岗位职责/部门/岗位',
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
        placeholder: '姓名/来源/岗位',
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
        placeholder: '姓名/来源/岗位',
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
        placeholder: '姓名/来源/岗位',
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
        },{
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_ids',
            dataType: [],
            value: {
                num: '',
                arr: []
            }
        },{
            keyType: 'subject',
            title: '科目',
            placeholder: '请选择科目',
            keyName: 'subject_id',
            lebleName: "subject_name",
            value: ''
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
    data: [
      {
        keyType: 'dateRange',
        title: '应付时间',
        placeholder: '请选择日期',
        keyName: 'gatherDate',
        dataType: []
      },
      {
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
        },{
            keyType: 'subject',
            title: '科目',
            placeholder: '请选择科目',
            keyName: 'subject_id',
            lebleName: "subject_name",
            value: ''
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
    data: [
        // {
        //     keyType: 'radio',
        //     title: '出租类型',
        //     keyName: 'achv_type',
        //     dataType: '',
        //     value: [{
        //             id: 1,
        //             title: '新收新租'
        //         },
        //         {
        //             id: 2,
        //             title: '二次出租'
        //         }
        //     ]
        // },
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

// 资产管理/办公室高级搜索
export const officeHightSearch={
    status: 'officeHightSearch',
    keywords: 'keyWord',
    placeholder: '请输入搜索内容',
    data: [{
            keyType: 'staff',
            title: '片区经理',
            placeholder: '请选择片区经理',
            keyName: 'leader_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'depart_id',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        },
        {
            keyType: 'radio',
            title: '办公室类型',
            keyName: 'office_type',
            dataType: '',
            value: [
                { id: 1, title: '临时' },
                { id: 2, title: '正式' },
            ]
        },
        {
            keyType: 'dateRange',
            title: '日期',
            placeholder: '选择时间',
            keyName: 'start_at',
            dataType: "",
        },
        {
            keyType: 'input',
            title: '人均价格',
            placeholder: '最低价格',
            keyName: 'price_min',
            dataType: '',
        },
        {
            keyType: 'input',
            title: '',
            placeholder: '最高价格',
            keyName: 'price_max',
            dataType: '',
        },
    ]
}

// 宿舍管理的search
export const dormitoryHightSearch={
    status: 'dormitoryHightSearch',
    keywords: 'keyWord',
    placeholder: '请输入搜索内容',
    data: [{
            keyType: 'staff',
            title: '负责人',
            placeholder: '请选择负责人',
            keyName: 'leader_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'depart_id',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        },
        {
            keyType: 'staff',
            title: '住宿人员姓名',
            placeholder: '请选择住宿人员姓名',
            keyName: 'live_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'input',
            title: '剩余床位数',
            placeholder: '请输入床位数',
            keyName: 'last_bed',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'dateRange',
            title: '日期',
            placeholder: '选择时间',
            keyName: 'start_at',
            dataType: "",
        },
        {
            keyType: 'input',
            title: '人均价格',
            placeholder: '最低价格',
            keyName: 'price_min',
            dataType: '',
        },
        {
            keyType: 'input',
            title: '',
            placeholder: '最高价格',
            keyName: 'price_max',
            dataType: '',
        },
    ]
}

// 片区异动交接单的高级搜索
export const areaChangeOrderHighSearch={
    status: 'areaChangeOrderHighSearch',
    keywords: 'search',
    placeholder: '搜索人员',
    data: [
        {
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
            keyType: 'date',
            title: '日期',
            placeholder: '请选择上传时间',
            keyName: 'date',
            dataType: "",
        },
        {
            keyType: 'radio',
            title: '资料类型',
            keyName: 'type',
            dataType: '',
            value: [
                { id: 1, title: '个人异动',type:'personal_change'},
                { id: 2, title: '离职',type:'dimission' },
                // { id: 3, title: '合同交接单' },
                // { id: 4, title: '片区固定资产盘点表' },
                // { id: 5, title: '采购合同' },
            ]
        },
    ]
}

// 合同编号的高级搜索
export const contractNumberHighSearch={
    status: 'contractNumberHighSearch',
    keywords: 'search',
    placeholder: '请输入搜索内容',
    data: [
        {
            keyType: 'staff',
            title: '员工',
            placeholder: '请选择员工',
            keyName: 'staff_id',
            dataType: "",
            value: {
                num: 1
            }
        },
        {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department_id',
            dataType: "",
            value: {
                num: 1,
            }
        },
        {
            keyType: 'dateRange',
            title: '选择时间范围',
            placeholder: '请选择日期',
            keyName: 'start',
            dataType: [],
        },
    ]
}

// 合同编号管理的高级搜索
export const contractNumberEditHighSearch={
    status: 'contractNumberEditHighSearch',
    keywords: 'keyWord',
    placeholder: '请输入搜索内容',
    data: [
        {
            keyType: 'staff',
            title: '操作对象',
            placeholder: '请选择人员',
            keyName: 'follow_id',
            dataType: [],
            value: {
                num: 1
            }
        },
        {
            keyType: 'depart',
            title: '操作对象部门',
            placeholder: '请选择部门',
            keyName: 'depart_id',
            dataType: [],
            value: {
                num: 1,
                arr: []
            }
        },
        {
            keyType: 'input',
            title: '领取上限范围',
            placeholder: '最小值',
            keyName: 'from',
            dataType: '',
        },
        {
            keyType: 'input',
            title: '',
            placeholder: '最大值',
            keyName: 'to',
            dataType: '',
        },
    ]
}

// 办公审批 高级搜索

export const officeApprovalHighSearch = {
  status: 'approval_office',
  placeholder: '',
  keywords: 'title',
  data: [
    {
      keyType: 'radio',
      title: '流程分类',
      keyName: 'process_category',
      dataType: '',
      value: [
        {
          id: 'personnel_options',
          title: '人事'
        },
        {
          id: 'personnel_special_options',
          title: '人事专用'
        },
        {
          id: 'notice_options',
          title: '公告'
        },
        {
          id: 'administration_options',
          title: '行政'
        },
        {
          id: 'other_options',
          title: '其他'
        }
      ]
    },
    {
      keyType: 'select',
      title: '流程名称',
      placeholder: '请选择名称',
      keyName: 'processDefinitionKey',
      dataType: '',
      no_option_text: '请 选 择 流 程 分 类，加 载 流 程 名 称',
      options: [] // 动态匹配
    },
    {
      keyType: 'radio',
      title: '紧急程度',
      keyName: 'priority',
      dataType: '',
      value: [
        {
          id: '50',
          title: '正常'
        },
        {
          id: '60',
          title: '重要'
        },
        {
          id: '70',
          title: '紧急'
        }
      ]
    },
    {
      keyType: 'radio',
      title: '流程标志',
      keyName: 'processMark',
      dataType: '',
      value: [
        {
          id: 'unread',
          title: '未读'
        },
        {
          id: 'read',
          title: '已读'
        }
      ]
    },
    {
      keyType: 'dateRange',
      title: '创建日期',
      placeholder: '请选择日期',
      keyName: 'start_time',
      dataType: []
    },
    {
      keyType: 'dateRange',
      title: '接收日期',
      placeholder: '请选择日期',
      keyName: 'end_time',
      dataType: []
    },
    {
      keyType: 'staff',
      title: '抄送人',
      placeholder: '请选择人员',
      keyName: 'cc',
      dataType: '',
      value: {
        num: '1'
      }
    },
    {
      keyType: 'staff',
      title: '创建人',
      placeholder: '请选择人员',
      keyName: 'founder',
      dataType: '',
      value: {
        num: '1'
      }
    },
    {
      keyType: 'depart',
      title: '创建人部门',
      placeholder: '请选择部门',
      keyName: 'creator_depart',
      dataType: '',
      value: {
        num: '1'
      }
    }
  ]
}
