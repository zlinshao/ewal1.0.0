// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Boss from './boss.config.js'
import Vuex from 'vuex'
import store from './store'
import myUtils from './utils/myUtils'
import fun from './utils/fun.config'
import router from './router'
import Axios from './utils/httpService'
import echarts from 'echarts'
import 'echarts/theme/macarons.js'
import './assets/scss/rest.scss'
import './assets/scss/index/index.scss'

Vue.use(Boss);
Vue.use(Vuex);
Vue.use(fun);
Vue.prototype.$echarts = echarts;
Vue.prototype.myUtils = myUtils;

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
