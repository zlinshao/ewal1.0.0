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
const Recruitment = () => import('@/components/humanResource/recruitment/index.vue');//招聘中心
const StaffRoster = () => import('@/components/humanResource/staffRoster/index.vue');//员工名册

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
      path: '/recruitment',
      name: '招聘中心',
      component: Recruitment
    },
    {
      path: '/staffRoster',
      name: '员工名册',
      component: StaffRoster
    },
  ]
})
