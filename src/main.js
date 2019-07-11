// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Boss from './boss.config.js'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import myUtils from './utils/myUtils'
import _ from 'lodash';
import fun from './utils/fun.prototype'
import storage from './utils/storage';
import router from './router'
import axios from 'axios';
import Axios from './utils/httpService'
import echarts from 'echarts'
import 'echarts-gl'
import 'echarts/theme/macarons.js'
import './assets/scss/rest.scss'
import './assets/scss/element.scss'
import './assets/scss/currency.scss'
import './assets/scss/partical.scss'
//import './assets/magnify/jquery.magnify.css'
//import './assets/magnify/jquery.magnify.js'
import Confirm from '@/components/common/lightweightComponents/confirm/index.js'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

import './assets/js/approval/dictionary.js'
import './assets/js/approval/approval.js'

import JsonForm from './components/common/universalForm/index.js'

Vue.prototype.$echarts = echarts
Vue.use(Boss)
Vue.use(_);
Vue.use(Vuex)
Vue.use(fun)
Vue.use(ElementUI)
Vue.use(JsonForm)
Vue.prototype.$echarts = echarts
Vue.prototype.myUtils = myUtils
Vue.prototype.$storage = storage;

Vue.config.productionTip = false
Vue.prototype.$http = Axios

Vue.prototype.$LjConfirm = Confirm.install

Vue.prototype.$video = Video
import getPermission from './utils/permission';


axios.defaults.headers.common['Authorization'] = storage.get('Authorization');//设置请求头Authorization


getPermission();//进入系统后首先同步获取权限 然后再每隔30秒异步获取权限

router.beforeEach((to, from, next) => {
  if (to.path == '/_login_president') {
    next();
    return;
  }
  if (!storage.get('Authorization') && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
