import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/index.vue'
import Login from '@/components/login.vue'

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
    }
  ]
})
