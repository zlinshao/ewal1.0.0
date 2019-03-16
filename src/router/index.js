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

// 人力资源中心
const HumanResource = () => import('@/components/humanResource/index.vue');
const Departments = () => import('@/components/humanResource/departments/index.vue');//三省六部
const Recruitment = () => import('@/components/humanResource/recruitment/index.vue');//招兵买马
const StaffRoster = () => import('@/components/humanResource/departments/staffRoster/index.vue');//员工名册
const MilitaryOrganization = () => import('@/components/humanResource/militaryOrganization/index.vue'); //排班布阵
const Reward = () => import('@/components/humanResource/reward/index.vue') //赏罚分明

// 财务中心
const Finance = () => import('@/components/finance/index.vue');
const AccountManage = () => import('@/components/finance/accountManage/index.vue');//帐户
const Subject = () => import('@/components/finance/subject/index.vue');//科目
const BudgetStream = () => import('@/components/finance/budgetStream/index.vue');//收支流水
const Gathering = () => import('@/components/finance/gathering/index.vue'); //收款
const Customer = () => import('@/components/finance/customer/index.vue'); //客户
const Payment = () => import('@/components/finance/payment/index.vue'); //付款

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomePage
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

  ]
})
