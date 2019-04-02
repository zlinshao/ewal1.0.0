import Vue from 'vue'
import Router from 'vue-router'

const HomePage = () => import  ('@/components/index.vue');//首页
const Login = () => import  ('@/components/login.vue');//登录
const President = () => import  ('@/components/president/index.vue');//总裁办
const Jurisdiction = () => import('@/components/jurisdiction.vue'); //无权限
const NetWork_error = () => import('@/components/network_error.vue'); //网络已断开

// 客服
const CustomService = () => import('@/components/customService/index.vue');
const WorkOrder = () => import('@/components/customService/workOrder/index.vue'); //工单

// 市场
const MarketCentre = () => import('@/components/marketCentre/index.vue');
const HouseManagement = () => import('@/components/marketCentre/houseManagement/index.vue');//房源管理
const ContractManagement = () => import('@/components/marketCentre/contractManagement/index.vue'); //合同管理

// 人力资源中心
const HumanResource = () => import('@/components/humanResource/index.vue');
const Departments = () => import('@/components/humanResource/departments/index.vue');//三省六部
const Recruitment = () => import('@/components/humanResource/recruitment/index.vue');//招兵买马
const StaffRoster = () => import('@/components/humanResource/departments/staffRoster/index.vue');//员工名册
const MilitaryOrganization = () => import('@/components/humanResource/militaryOrganization/index.vue'); //排班布阵
const Reward = () => import('@/components/humanResource/reward/index.vue'); //赏罚分明
const Repository = () => import('@/components/humanResource/repository/index.vue'); //内务库房
const DiscussPolitics = () => import('@/components/humanResource/discussPolitics/index.vue'); //奏事议政


// 财务中心
const Finance = () => import('@/components/finance/index.vue');
const AccountManage = () => import('@/components/finance/accountManage/index.vue');//帐户
const Subject = () => import('@/components/finance/subject/index.vue');//科目
const BudgetStream = () => import('@/components/finance/budgetStream/index.vue');//收支流水
const Gathering = () => import('@/components/finance/gathering/index.vue'); //收款
const Customer = () => import('@/components/finance/customer/index.vue'); //客户
const Payment = () => import('@/components/finance/payment/index.vue'); //付款

//新媒体前台
const Club = () => import('@/components/newMedia/front/club/index.vue');//俱乐部
const HotNews = () => import('@/components/newMedia/front/hotNews/index.vue');//企业头条
const Humanity = () => import('@/components/newMedia/front/humanity/index.vue');//公司人文
const Profile = () => import('@/components/newMedia/front/profile/index.vue');//资料

//前台资料
const Video = () => import('@/components/newMedia/components/video.vue');
const Document = () => import('@/components/newMedia/components/video.vue');

//前台乐伽人文
const LeJiaStars = () => import('@/components/newMedia/front/humanity/components/common.vue');
const Birthday = () => import('@/components/newMedia/front/humanity/components/common.vue');
const ExcellentStaff = () => import('@/components/newMedia/front/humanity/components/common.vue');

//前台企业头条
const News = () => import('@/components/newMedia/front/hotNews/components/common.vue');
const LeJiaNews = () => import('@/components/newMedia/front/hotNews/components/common.vue');
const Notice = () => import('@/components/newMedia/front/hotNews/components/common.vue');

//热门导读详情
const NewsDetail = () => import('@/components/newMedia/front/hotNews/components/detail.vue');
//优秀员工详情
const StaffDetail = () => import('@/components/newMedia/components/staffDetail.vue');

//新媒体后台
const MediaCenter = () => import('@/components/newMedia/index.vue');
const BackVideo = () => import('@/components/newMedia/back/profile/common.vue');
const BackDocument = () => import('@/components/newMedia/back/profile/common.vue');
const ProfileHome = () => import('@/components/newMedia/back/profile/index.vue');
const BackNews = () => import('@/components/newMedia/back/news/index.vue');
const LeJiaHumanity = () => import('@/components/newMedia/back/lejiaHumanity/index.vue');
const BackClub = () => import('@/components/newMedia/back/club/index.vue');

//乐伽大学
const LeJiaCollege = ()=>import('@/components/leJiaCollege/index.vue');
const ExamArrangement = ()=>import('@/components/leJiaCollege/components/common.vue');//考试安排
const Faculty = ()=>import('@/components/leJiaCollege/components/common.vue');//师资力量
const IndustryDynamic = ()=>import('@/components/leJiaCollege/components/common.vue');//行业动态
const JobTraining = ()=>import('@/components/leJiaCollege/components/common.vue');//工作培训
const PostPlanning = ()=>import('@/components/leJiaCollege/components/common.vue');//岗位规划
const PracticalProblems = ()=>import('@/components/leJiaCollege/components/common.vue');//实践问题
const VideoLearning = ()=>import('@/components/leJiaCollege/components/common.vue');//视频学习

// 岗位规划
const Partner = ()=> import('@/components/leJiaCollege/components/common.vue');//合伙人
const GeneralManager = ()=> import('@/components/leJiaCollege/components/common.vue');//城市总
const ViceManager = ()=> import('@/components/leJiaCollege/components/common.vue');//城市副总
const DistrictManager = ()=> import('@/components/leJiaCollege/components/common.vue');//区域经理
const ReserveDistrictManager = ()=> import('@/components/leJiaCollege/components/common.vue');//储备区域经理
const AreaManager = ()=> import('@/components/leJiaCollege/components/common.vue');//片区经理
const ReserveAreaManager = ()=> import('@/components/leJiaCollege/components/common.vue');//储备片区经理
const Sales = ()=> import('@/components/leJiaCollege/components/common.vue');//市场专员
const NewTrainning = ()=> import('@/components/leJiaCollege/components/common.vue');//新人训
const ReserveTrainning = ()=> import('@/components/leJiaCollege/components/common.vue');//储备培训

//待办
// const TodoList = () => import('@/components/todoList/index.vue');

Vue.use(Router);

export default new Router({

    mode: 'history',
    routes: [
        {
          path:'/' ,
          name:'首页',
          component:HomePage
        },

        {
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
            path: '/examArrangement',
            name: '考试安排',
            component: ExamArrangement
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
            path:'/newTraining',
            name:'新人训',
            component:NewTrainning
        },
        {
            path:'/reserveTraining',
            name:'储备培训',
            component:ReserveTrainning
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
        },



        {
            path: '/leJiaCollege',
            name: '乐伽大学',
            component: LeJiaCollege
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
            path: '/notice',
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
            component: CustomService,
        },
        {
            path: '/workOrder',
            name: '工单',
            component: WorkOrder,
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
            path: '/reward',
            name: '赏罚分明',
            component: Reward
        },
        {
            path: '/repository',
            name: '内务库房',
            component: Repository
        },
        {
          path: '/discussPolitics',
          name:'奏事议政',
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
        // {
        //     path: '/offerDetail',
        //     name: '录用通知书',
        //     component: OfferDetail
        // }
    ]

})
