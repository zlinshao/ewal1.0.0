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
import fun from './utils/fun.prototype'
import router from './router'
import Axios from './utils/httpService'
import echarts from 'echarts'
import 'echarts/theme/macarons.js'
import './assets/scss/rest.css'
import './assets/scss/element.css'
import './assets/scss/currency.css'
import './assets/scss/partical.css'
import './assets/magnify/jquery.magnify.css'
import './assets/magnify/jquery.magnify.js'
import Confirm from '@/components/common/lightweightComponents/confirm/index.js'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

import './assets/js/approval/dictionary.js'
import './assets/js/approval/approval.js'


Vue.prototype.$echarts = echarts
Vue.use(Boss)
Vue.use(Vuex)
Vue.use(fun)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.myUtils = myUtils

Vue.config.productionTip = false
Vue.prototype.$http = Axios

Vue.prototype.$LjConfirm = Confirm.install

Vue.prototype.$video = Video

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
