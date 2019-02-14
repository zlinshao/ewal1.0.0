import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () => import  ('@/components/index.vue');//首页
const Login = () => import  ('@/components/login.vue');//登录
const President = () => import  ('@/components/president/index.vue');//总裁办

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
    }
  ]
})
