import Vue from 'vue'
import Router from 'vue-router'

const HomePage = () => import('@/components/index.vue') //首页
const Login = () => import('@/components/login.vue') //登录

//总裁办
const President = () => import('@/components/president/index.vue')
const Office = () => import('@/components/president/office.vue')

// const Markting = () => import('@/components/president/markting.vue') //市场
// const Humanbing = () => import('@/components/president/humanbing.vue') //人事
// const Fincene = () => import('@/components/president/fincene.vue') //财务
// const Network = () => import('@/components/president/network.vue') //网络

const Jurisdiction = () => import('@/components/jurisdiction.vue') //无权限
const NetWork_error = () => import('@/components/network_error.vue') //网络已断开

// 客服
const CustomService = () => import('@/components/customService/index.vue')
const WorkOrder = () => import('@/components/customService/workOrder/index.vue') //工单
const VisitToRecord = () =>
  import('@/components/customService/visitToRecord/index.vue') //工单

const HousingDue = () =>
  import('@/components/customService/housingDue/index.vue') //房屋到期
const DataAudit = () => import('@/components/customService/dataAudit/index.vue') //资料审核
const Village = () => import('@/components/customService/village/index.vue') //小区
const Maintenance = () =>
  import('@/components/customService/maintenance/index.vue')
const ServiceOnline = () => import('@/components/customService/serviceOnline/index.vue'); //客服接线
const ServiceCustomerManagement = () => import('@/components/customService/customerManagement/index.vue'); //客服客户管理
const ServiceHouseManagement = () => import('@/components/customService/houseManagement/index.vue'); // 客服房源管理
const ServiceContractManagement = () => import('@/components/customService/contractManagement/index.vue'); //客服合同管理

// 市场
const MarketCentre = () => import('@/components/marketCentre/index.vue')
const HouseManagement = () =>
  import('@/components/marketCentre/houseManagement/index.vue') //房源管理
const ContractManagement = () =>
  import('@/components/marketCentre/contractManagement/index.vue') //合同管理
const CustomerManagement = () =>
  import('@/components/marketCentre/customerManagement/index.vue') //客户管理
const Performance = () => import('@/components/marketCentre/performanceManagement/index.vue'); //业绩工资

// 人力资源中心
const HumanResource = () => import('@/components/humanResource/index.vue')
const Departments = () =>
  import('@/components/humanResource/departments/index.vue') //三省六部
const Recruitment = () =>
  import('@/components/humanResource/recruitment/index.vue') //招兵买马
const StaffRoster = () =>
  import('@/components/humanResource/departments/staffRoster/index.vue') //员工名册
const MilitaryOrganization = () =>
  import('@/components/humanResource/militaryOrganization/index.vue') //排班布阵
const Reward = () => import('@/components/humanResource/reward/index.vue') //赏罚分明
const NoticeQuestionnaire = () => import('@/components/humanResource/noticeQuestionnaire/index.vue') //公告问卷
const Repository = () =>
  import('@/components/humanResource/repository/index.vue') //内务库房
const DiscussPolitics = () =>
  import('@/components/humanResource/discussPolitics/index.vue') //奏事议政
const Demo = () => import('@/components/humanResource/demo/index.vue') //测试
const CurrentMonthAssessment = () => import('@/components/currentMonthAssessment/index.vue') //当月考核

//财务中心
const Finance = () => import('@/components/finance/index.vue')
const AccountManage = () => import('@/components/finance/accountManage/index.vue') //帐户
const Subject = () => import('@/components/finance/subject/index.vue') //科目
const BudgetStream = () => import('@/components/finance/budgetStream/index.vue') //收支流水
const Gathering = () => import('@/components/finance/gathering/index.vue') //收款
const Customer = () => import('@/components/finance/customer/index.vue') //客户
const Payment = () => import('@/components/finance/payment/index.vue') //付款
const Pending = () => import('@/components/finance/pending/index.vue') //待处理
const Balance = () => import('@/components/finance/balance/index.vue') //结算

//新媒体前台
const Club = () => import('@/components/newMedia/front/club/index.vue') //俱乐部
const HotNews = () => import('@/components/newMedia/front/hotNews/index.vue') //企业头条
const Humanity = () => import('@/components/newMedia/front/humanity/index.vue') //公司人文
const Profile = () => import('@/components/newMedia/front/profile/index.vue') //资料

//前台资料
const Video = () => import('@/components/newMedia/front/profile/components/common.vue')
const Document = () => import('@/components/newMedia/front/profile/components/common.vue')

//前台乐伽人文
const LeJiaStars = () =>
  import('@/components/newMedia/front/humanity/components/common.vue')
const Birthday = () =>
  import('@/components/newMedia/front/humanity/components/common.vue')
const ExcellentStaff = () =>
  import('@/components/newMedia/front/humanity/components/common.vue')

//前台企业头条
const News = () => import('@/components/newMedia/front/hotNews/components/common.vue')
const LeJiaNews = () => import('@/components/newMedia/front/hotNews/components/common.vue')
const Notice = () => import('@/components/newMedia/front/hotNews/components/common.vue')

//热门导读详情
const NewsDetail = () => import('@/components/newMedia/front/hotNews/components/detail.vue')
//优秀员工详情
const StaffDetail = () => import('@/components/newMedia/components/staffDetail.vue')
//乐加之星详情

//新媒体后台
const MediaCenter = () => import('@/components/newMedia/index.vue')
const BackVideo = () => import('@/components/newMedia/back/profile/common.vue')
const BackDocument = () => import('@/components/newMedia/back/profile/common.vue')
const ProfileHome = () => import('@/components/newMedia/back/profile/index.vue')
const BackNews = () => import('@/components/newMedia/back/news/index.vue')
const LeJiaHumanity = () => import('@/components/newMedia/back/lejiaHumanity/index.vue')
const BackClub = () => import('@/components/newMedia/back/club/index.vue')

//乐伽大学
/*const LeJiaCollege = () => import('@/components/leJiaCollege/index.vue')
const Train = () => import('@/components/leJiaCollege/components/common.vue') //考试安排
const Faculty = () => import('@/components/leJiaCollege/components/common.vue') //师资力量
const IndustryDynamic = () => import('@/components/leJiaCollege/components/common.vue') //行业动态
const JobTraining = () => import('@/components/leJiaCollege/components/common.vue') //工作培训
const PostPlanning = () => import('@/components/leJiaCollege/components/common.vue') //岗位规划
const PracticalProblems = () => import('@/components/leJiaCollege/components/common.vue') //实践问题
const VideoLearning = () => import('@/components/leJiaCollege/components/common.vue') //视频学习*/

const LeJiaCollege = () => import('@/components/leJiaCollege/index.vue')
const Train = () => import('@/components/leJiaCollege/train/index.vue') //考试安排
const Faculty = () => import('@/components/leJiaCollege/faculty/index.vue') //师资力量
const IndustryDynamic = () => import('@/components/leJiaCollege/industryDynamic/index.vue') //行业动态
//const JobTraining = () => import('@/components/leJiaCollege/jobTraining/index.vue') //工作培训
const PostPlanning = () => import('@/components/leJiaCollege/postPlanning/index.vue') //岗位规划
const PracticalProblems = () => import('@/components/leJiaCollege/practicalProblems/index.vue') //实践问题
const VideoLearning = () => import('@/components/leJiaCollege/videoLearning/index.vue') //视频学习

// 岗位规划
const Partner = () => import('@/components/leJiaCollege/components/common.vue') //合伙人
const GeneralManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //城市总
const ViceManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //城市副总
const DistrictManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //区域经理
const ReserveDistrictManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //储备区域经理
const AreaManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //片区经理
const ReserveAreaManager = () =>
  import('@/components/leJiaCollege/components/common.vue') //储备片区经理
const Sales = () => import('@/components/leJiaCollege/components/common.vue') //市场专员
const NewTrainning = () =>
  import('@/components/leJiaCollege/components/common.vue') //新人训
const ReserveTrainning = () =>
  import('@/components/leJiaCollege/components/common.vue') //储备培训

//待办
// const TodoList = () => import('@/components/todoList/index.vue');
const KpiCheck = () => import('@/components/kpiCheck/index.vue')

//个人中心
const PersonalCenter = () => import('@/components/personalCenter/index.vue')

//知识产权保护
const IntellectualPropertyProtection = () =>
  import('@/components/intellectualPropertyProtection/index.vue')
const Patent = () =>
  import('@/components/intellectualPropertyProtection/patent/index.vue')
const Brand = () =>
  import('@/components/intellectualPropertyProtection/brand/index.vue')
const Copyright = () =>
  import('@/components/intellectualPropertyProtection/copyright/index.vue')
const EnterpriseCertificate = () =>
  import('@/components/intellectualPropertyProtection/enterpriseCertificate/index.vue')

//风险控制
const RiskManagement = () => import('@/components/riskManagement/index.vue')
const GroupCoreIndicators = () => import('@/components/riskManagement/GroupCoreIndicators/index.vue') //集团核心指标2级列表
const ComprehensiveEarlyWarning = () => import('@/components/riskManagement/ComprehensiveEarlyWarning/index.vue') //企业综合预警2级列表
const MajorStrategicMonitoring = () => import('@/components/riskManagement/MajorStrategicMonitoring/index.vue') //重大战略监测2级列表

const RiskManagementCommon = () => import('@/components/riskManagement/common/index.vue');//三级列表
// const GroupCoreIndicatorsMenuLists = () => import('@/components/riskManagement/GroupCoreIndicators/common/documentLists.vue') //制度列表

const RiskManagementMenu = () => import('@/components/riskManagement/common/index.vue') //三级列表

const RiskManagementDetail = () => import('@/components/riskManagement/common/details.vue') //风控文件列表
// const DocumentLists = () => import('@/components/riskManagement/GroupCoreIndicators/common/documentLists.vue');//集团指标文件列表
// const InternalRegulations = () => import('@/components/riskManagement/GroupCoreIndicators/complianceRisk/InternalRegulations.vue') //公司内部规定

const MessageCenter = () => import('@/components/messageCenter/index.vue') //消息中心

const loginCompanySelect = () => import('@/components/login_company_select.vue') //消息中心


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/reward',
      name:'reward',
      component:Reward
    },
    {
      path: '/',
      name: '首页',
      component: HomePage
    },

    /*{
      path: '/faculty',
      name: '师资力量',
      component: Faculty
    },
    {
      path: '/industryDynamic',
      name: '行业动态',
      component: IndustryDynamic
    },
    {
      path: '/jobTraining',
      name: '工作培训',
      component: JobTraining
    },
    {
      path: '/postPlanning',
      name: '岗位规划',
      component: PostPlanning
    },
    {
      path: '/train',
      name: '考试安排',
      component: Train
    },
    {
      path: '/practicalProblems',
      name: '实践问题',
      component: PracticalProblems
    },
    {
      path: '/videoLearning',
      name: '视频学习',
      component: VideoLearning
    },
    {
      path: '/newTraining',
      name: '新人训',
      component: NewTrainning
    },
    {
      path: '/reserveTraining',
      name: '储备培训',
      component: ReserveTrainning
    },

    {
      path: '/partner',
      name: '合伙人',
      component: Partner
    },
    {
      path: '/generalManager',
      name: '城市总',
      component: GeneralManager
    },
    {
      path: '/viceManager',
      name: '城市副总',
      component: ViceManager
    },
    {
      path: '/districtManager',
      name: '区域经理',
      component: DistrictManager
    },
    {
      path: '/reserveDistrictManager',
      name: '储备区域经理',
      component: ReserveDistrictManager
    },
    {
      path: '/areaManager',
      name: '片区经理',
      component: AreaManager
    },
    {
      path: '/reserveAreaManager',
      name: '储备片区经理',
      component: ReserveAreaManager
    },
    {
      path: '/sales',
      name: '市场专员',
      component: Sales
    },*/

    {
      path: '/leJiaCollege',
      name: '乐伽大学',
      component: LeJiaCollege,
      children: [
        {
          path: '/leJiaCollege/faculty',
          name: '师资力量',
          component: Faculty,
        },
        {
          path: '/leJiaCollege/train',
          name: '考试安排',
          component: Train,
        },
        {
          path: '/leJiaCollege/industryDynamic',
          name: '行业动态',
          component: IndustryDynamic,
        },
        {
          path: '/leJiaCollege/postPlanning',
          name: '岗位规划',
          component: PostPlanning,
        },
        {
          path: '/leJiaCollege/practicalProblems',
          name: '实践问题',
          component: PracticalProblems,
        },
        {
          path: '/leJiaCollege/videoLearning',
          name: '视频学习',
          component: VideoLearning,
        },
      ],
    },
    {
      path: '/staffDetail',
      name: '员工详情',
      component: StaffDetail
    },
    {
      path: '/backClub',
      name: '俱乐部后台',
      component: BackClub
    },

    {
      path: '/leJiaHumanity',
      name: '乐伽人文',
      component: LeJiaHumanity
    },
    {
      path: '/profileHome',
      name: '文档首页',
      component: ProfileHome
    },
    {
      path: '/headLines',
      name: '热门头条',
      component: BackNews
    },
    {
      path: '/backVideo',
      name: '后台视频',
      component: BackVideo
    },
    {
      path: '/backDocument',
      name: '后台文档',
      component: BackDocument
    },
    {
      path: '/mediaCenter',
      name: '新媒体中心',
      component: MediaCenter
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/president',
      name: '总裁办',
      component: President
    },
    {
      path: '/president/office',
      name: '总裁办部门',
      component: Office
    },

    // {
    //   path: '/president/markting',
    //   name: '市场',
    //   component: Markting,
    // },
    // {
    //   path: '/president/humanbing',
    //   name: '人事',
    //   component: Humanbing
    // },
    // {
    //   path: '/president/fincene',
    //   name: '财务',
    //   component: Fincene
    // },
    // {
    //   path: '/president/network',
    //   name: '网络',
    //   component: Network
    // },
    {
      path: '/riskManagement',
      name: '风险控制',
      component: RiskManagement
    },
    {
      path: '/groupCoreIndicators',
      name: '集团核心指标',
      component: GroupCoreIndicators
    },
    {
      path: '/comprehensiveEarlyWarning',
      name: '企业综合预警',
      component: ComprehensiveEarlyWarning
    },
    {
      path: '/majorStrategicMonitoring',
      name: '重大战略监测',
      component: MajorStrategicMonitoring
    },

        {
          path: '/marketHouseRisk',
          name: '市场风险',
          component: RiskManagementCommon
        },
      {
          path: '/businessRisk',
          name: '运营风险',
          component: RiskManagementCommon
      },
      {
          path: '/flowRisk',
          name: '流动性风险',
          component: RiskManagementCommon
      },
      {
          path: '/complianceRisk',
          name: '合规风险',
          component: RiskManagementCommon
      },
      {
          path: '/riskManagementMenu',
          name: '三级列表页',
          component: RiskManagementMenu,

      },

    {
      path: '/riskManagementDetail',
      name: '市场风险监测制度',
      component: RiskManagementDetail,
        beforeRouteLeave (to, from, next) {
            if(to.path ==='/riskManagementMenu'&& from.path ==='/riskManagementDetail'){
                next()
            }
        },

    },

    // {
    //   path: '/interiorStipulate',
    //   name: '公司内部规定',
    //   component: InternalRegulations
    // },
    {
      path: '/video',
      name: '视频',
      component: Video
    },
    {
      path: '/document',
      name: '文档',
      component: Document
    },

    {
      path: '/hot',
      name: '热门导读',
      component: News
    },
    {
      path: '/newsDetail',
      name: '热门导读详情',
      component: NewsDetail
    },
    {
      path: '/lejiaNews',
      name: '乐伽新闻',
      component: LeJiaNews
    },
    {
      path: '/announcement',
      name: '公告',
      component: Notice
    },

    {
      path: '/lejiaStars',
      name: '乐伽之星',
      component: LeJiaStars
    },
    {
      path: '/excellentStaff',
      name: '优秀员工',
      component: ExcellentStaff
    },
    {
      path: '/birthday',
      name: '寿星墙',
      component: Birthday
    },
    {
      path: '/club',
      name: '俱乐部',
      component: Club
    },
    {
      path: '/hotNews',
      name: '企业头条',
      component: HotNews
    },
    {
      path: '/humanity',
      name: '人文关怀',
      component: Humanity
    },
    {
      path: '/profile',
      name: '公司资料',
      component: Profile
    },
    {
      path: '/jurisdiction',
      name: '无权限',
      component: Jurisdiction
    },
    {
      path: '/network_error',
      name: '网络断开',
      component: NetWork_error
    },
    {
      path: '/customService',
      name: '客服',
      component: CustomService
    },
    {
      path: '/workOrder',
      name: '工单',
      component: WorkOrder
    },
    {
      path: '/marketCentre',
      name: '市场',
      component: MarketCentre
    },
    {
      path: '/houseManagement',
      name: '房源管理',
      component: HouseManagement
    },
    {
      path: '/contractManagement',
      name: '合同管理',
      component: ContractManagement
    },
    {
      path: '/humanResource',
      name: '人力资源中心',
      component: HumanResource
    },
    {
      path: '/departments',
      name: '三省六部',
      component: Departments
    },
    {
      path: '/recruitment',
      name: '招兵买马',
      component: Recruitment
    },
    {
      path: '/noticeQuestionnaire',
      name: '公告问卷',
      component: NoticeQuestionnaire,
      //redirect: '/noticeQuestionnaire/notice',
      children: [
        {
          path: '/noticeQuestionnaire/notice',
          name: '人资公告',
          component: () => import('@/components/humanResource/noticeQuestionnaire/notice/index.vue') //公告
        },
        {
          path: '/noticeQuestionnaire/questionnaire',
          name: '人资问卷',
          component: () => import('@/components/humanResource/noticeQuestionnaire/questionnaire/index.vue') //问卷
        },
      ]
    },
    {
      path: '/repository',
      name: '内务库房',
      component: Repository
    },
    {
      path: '/discussPolitics',
      name: '奏事议政',
      component: DiscussPolitics
    },
    {
      path: '/staffRoster',
      name: '员工名册',
      component: StaffRoster
    },
    {
      path: '/militaryOrganization',
      name: '排兵布阵',
      component: MilitaryOrganization
    },
    {
      path: '/currentMonthAssessment',
      name: '当月考核',
      component: CurrentMonthAssessment
    },
    {
      path: '/finance',
      name: '财务账本',
      component: Finance
    },
    {
      path: '/accountManage',
      name: '帐户',
      component: AccountManage
    },
    {
      path: '/subject',
      name: '科目',
      component: Subject
    },
    {
      path: '/budgetStream',
      name: '收支流水',
      component: BudgetStream
    },
    {
      path: '/gathering',
      name: '收款',
      component: Gathering
    },
    {
      path: '/customer',
      name: '客户',
      component: Customer
    },
    {
      path: '/payment',
      name: '付款',
      component: Payment
    },
    {
      path: '/intellectualPropertyProtection',
      name: '知识产权保护',
      component: IntellectualPropertyProtection
    },
    {
      path: '/visitToRecord',
      name: '回访记录',
      component: VisitToRecord
    },
    {
      path: '/dataAudit',
      name: '资料审核',
      component: DataAudit
    },
    {
      path: '/housingDue',
      name: '房屋到期',
      component: HousingDue
    },
    {
      path: '/maintenance',
      name: '维修保洁',
      component: Maintenance
    },
    {
      path: '/village',
      name: '小区',
      component: Village
    },
    {
      path: '/serviceOnline',
      name: '客服接线',
      component: ServiceOnline
    },
    {
      path: '/serviceCustomerManagement',
      name: '客服客户管理',
      component: ServiceCustomerManagement
    },
    {
      path: '/serviceHouseManagement',
      name: '客服房源管理',
      component: ServiceHouseManagement
    },
    {
      path: '/serviceContractManagement',
      name: '客服合同管理',
      component: ServiceContractManagement
    },
    {
      path: '/pending',
      name: '待处理项',
      component: Pending
    },
    {
      path: '/balance',
      name: '结算',
      component: Balance
    },
    {
      path: '/patent',
      name: '专利',
      component: Patent
    },
    {
      path: '/brand',
      name: '商标',
      component: Brand
    },
    {
      path: '/copyright',
      name: '著作权',
      component: Copyright
    },
    {
      path: '/enterpriseCertificate',
      name: '企业证书',
      component: EnterpriseCertificate
    },
    {
      path: '/customerManagement',
      name: '客户管理',
      component: CustomerManagement
    },
    {
      path: '/performance',
      name: '业绩工资',
      component: Performance
    },
    {
      path: '/demo',
      name: '测试',
      component: Demo
    },
    {
      path: '/personalCenter',
      name: '个人中心',
      redirect: '/personalCenter/myAttendance',
      component: PersonalCenter,
      children: [
        {
          path: '/personalCenter/myAttendance',
          name: 'myAttendance',
          component: () =>
            import('@/components/personalCenter/myAttendance/index.vue')
        },
        {
          path: '/personalCenter/growthProcess',
          name: 'growProcess',
          component: () =>
            import('@/components/personalCenter/growthProcess/index.vue')
        },
        {
          path: '/personalCenter/workLog',
          name: 'workLog',
          component: () =>
            import('@/components/personalCenter/workLog/index.vue')
        },
        {
          path: '/personalCenter/myKPI',
          name: 'myKPI',
          component: () => import('@/components/personalCenter/myKPI/index.vue')
        },
        {
          path: '/personalCenter/myFavorite',
          name: '我的收藏',
          component: () =>
            import('@/components/personalCenter/myFavorite/index.vue')
        },
        {
          path: '/personalCenter/myResponse',
          name: '我的回复',
          component: () =>
            import('@/components/personalCenter/myResponse/index.vue')
        },
        {
          path: '/personalCenter/subLog',
          name: '下属日志',
          component: () =>
            import('@/components/personalCenter/subLog/index.vue')
        }
      ]
    },
    {
        path: '/kpiCheck',
        name: 'kpi核对',
        component: KpiCheck
    },
      {
          path: '/messageCenter',
          name: '消息中心',
          component: MessageCenter
      },
    // {
    //     path: '/offerDetail',
    //     name: '录用通知书',
    //     component: OfferDetail
    // },
    {
      path: '/_login_president',
      name: '超级后台',
      component: loginCompanySelect
    }
  ]
})
