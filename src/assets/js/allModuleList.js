// 人力资源中心
export const humanResource = {
  type: 'humanResource',
  data: [
    {
      url: '/departments',
      title: '人资规划'
    },
    {
      url: '/recruitment',
      title: '招聘管理'
    },
    {
      url: '/militaryOrganization',
      title: '培训考核'
    },
    {
      url: '/noticeQuestionnaire',
      title: '公告问卷'
    },
    {
      url: '/repository',
      title: '资产管理'
    },
    {
      url: '/discussPolitics',
      title: '会议管理'
    }
  ]
}

// 人力资源中心三省六部
export const resourceDepart = {
  type: 'resourceDepart',
  data: [
    {
      url: '',
      title: '乐伽大学'
    },
    {
      url: '',
      title: '财务中心'
    },
    {
      url: '',
      title: '人力资源中心'
    },
    {
      url: '',
      title: '研发中心'
    },
    {
      url: '',
      title: '运维中心'
    },
    {
      url: '',
      title: '新媒体运营中心'
    },
    {
      url: '',
      title: '事业部'
    }
  ]
}

// 客服体验中心
export const customService = {
  type: 'customService',
  data: [
    {
      title: '维修保洁',
      url: '/maintenance'
    },
    {
      title: '工单管理',
      url: '/workOrder'
    },
    {
      title: '资料审核',
      url: '/dataAudit'
    },
    {
      title: '回访管理',
      url: '/visitToRecord'
    },
    {
      title: '房屋到期',
      url: '/housingDue'
    },
    {
      title: '小区管理',
      url: '/village'
    },
    {
      title: '房源中心',
      url: '/serviceHouseManagement'
    },
    {
      title: '合同管理',
      url: '/serviceContractManagement'
    },
    {
      title: '客户管理',
      url: '/serviceCustomerManagement'
    },
    {
      title: '接线记录',
      url: '/serviceOnline'
    }
  ]
}

// 财务账本
export const finance = {
  type: 'finance',
  data: [
    {
      url: 'customer',
      title: '客户'
    },
    {
      url: 'payment',
      title: '付款'
    },
    {
      url: 'gathering',
      title: '收款'
    },
    {
      url: 'accountManage',
      title: '帐户'
    },
    {
      url: 'subject',
      title: '科目'
    },
    {
      url: 'budgetStream',
      title: '流水'
    },

    {
      url: 'balance',
      title: '结算'
    },
    {
      url: 'pending',
      title: '待处理'
    }
  ]
}

//新媒体
export const newMedia = {
  type: 'newMedia',
  data: [
    {
      url: 'backClub',
      title: '俱乐部'
    },
    {
      url: 'headLines',
      title: '企业头条'
    },
    {
      url: 'leJiaHumanity',
      title: '乐伽人文'
    },
    {
      url: '/profileHome',
      title: '公司资料'
    }
  ]
}
//资料类型
export const profileType = {
  type: 'profileType',
  data: [
    {
      url: 'video',
      title: '视频'
    },
    {
      url: 'document',
      title: '文档'
    }
  ]
}
//资料类型
export const humanity = {
  type: 'humanity',
  data: [
    {
      url: 'lejiaStars',
      title: '乐伽之星',
      letter: 'Lejia Star'
    },
    {
      url: 'excellentStaff',
      title: '优秀员工',
      letter: 'Excellent Employee'
    },
    {
      url: 'birthday',
      title: '寿星墙  ',
      letter: 'Birthday'
    }
  ]
}
//企业头条
export const headLines = {
  type: 'headLines',
  data: [
    {
      url: '',
      title: '热门导读',
      letter: 'Hot News'
    },
    {
      url: '',
      title: '乐伽新闻',
      letter: 'Excellent Employee'
    },
    {
      url: '',
      title: '公告  ',
      letter: 'Birthday'
    }
  ]
}

//乐伽大学
export const leJiaCollegeMenu = {
  type: 'leJiaCollegeMenu',
  data: [
    { id: 1, title: '视频学习', url: 'videoLearning' },
    { id: 2, title: '岗位规划', url: 'postPlanning' },
    { id: 3, title: '师资力量', url: 'faculty' },
    { id: 4, title: '行业动态', url: 'industryDynamic' },
    { id: 5, title: '实践问题', url: 'practicalProblems' },
    { id: 6, title: '培训考试', url: 'train' }
  ]
}

//知识产权保护
export const intellectualPropertyProtection = {
  type: 'intellectualPropertyProtection',
  data: [
    {
      url: 'enterpriseCertificate',
      title: '企业证书'
    },
    {
      url: 'patent',
      title: '专利'
    },
    {
      url: 'copyright',
      title: '著作权'
    },
    {
      url: 'brand',
      title: '商标'
    }
  ]
}

//风险控制
export const riskManagement = {
  type: 'riskManagement',
  data: [
    {
      name: '集团核心指标',
      id: 1,
      url: 'groupCoreIndicators'
    },
    {
      name: '企业综合预警',
      id: 2,
      url: 'comprehensiveEarlyWarning'
    },
    {
      name: '重大战略监测',
      id: 3,
      url: 'majorStrategicMonitoring'
    }
  ],
  childrenData: [
    {
      name: '市场风险',
      id: 1,
      url: 'riskManagementCommon'
    },
    {
      name: '运营风险',
      id: 2,
      url: 'riskManagementCommon'
    },
    {
      name: '流动性风险',
      id: 3,
      url: 'riskManagementCommon'
    },
    {
      name: '合规风险',
      id: 4,
      url: 'riskManagementCommon'
    }
  ],
  childrenData2: [
    {
      name: '资产获利能力',
      id: 1,
      url: 'riskManagementCommon'
    },
    {
      name: '偿债能力',
      id: 2,
      url: 'riskManagementCommon'
    },
    {
      name: '经济效率',
      id: 3,
      url: 'riskManagementCommon'
    },
    {
      name: '企业发展管理发展潜力',
      id: 4,
      url: 'riskManagementCommon'
    },
    {
      name: '财务弹性',
      id: 5,
      url: 'riskManagementCommon'
    },
    {
      name: '举债经营的财务风险',
      id: 6,
      url: 'riskManagementCommon'
    }
  ],
  childrenData3: [
    {
      name: '市场经济环境预判',
      id: 1,
      url: 'riskManagementCommon'
    },
    {
      name: '项目规划及前景',
      id: 2,
      url: 'riskManagementCommon'
    },
    {
      name: '跟踪迭代',
      id: 3,
      url: 'riskManagementCommon'
    },
    {
      name: '财务核算',
      id: 4,
      url: 'riskManagementCommon'
    }
  ]
}
