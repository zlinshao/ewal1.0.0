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
import _ from 'lodash';


/*Axios.post('signToken', {
  "NickName": "xxxx",
  "Password": "xxxx",
  "RequestSign": "B858C5EEE7FD4D37C635FB55841ACA59"
}).then(res => {
  axios.defaults.headers.common['Authorization'] = res.headers.authorization
})*/


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

/*加载权限*/
router.beforeResolve(async (to, from, next) => {
  async function getPermission() {
    let params = {
      user_id: 'self',
      type: 'all',
    };

    /*let params = {
      user_id:'289',
      system_id:22,
      type:'all',
    };*/
    let result = await Axios.get(`${globalConfig.humanResource_server}organization/permission/all`, params);
    if (result.code.endsWith('0')) {
      Vue.prototype.VALIDATE_PERMISSION = {};
      _(result.data).forEach((o, index) => {
        Vue.prototype.VALIDATE_PERMISSION[o] = true;
      });
      //console.log(Vue.prototype.VALIDATE_PERMISSION);
    }
  }

  //await getPermission();
  //setInterval(getPermission,1000*30);
  Vue.prototype.VALIDATE_PERMISSION = {
    "Assessment-Export": true,
    "Assessment-Management-Index": true,
    "Assessment-Score-Update": true,
    "Attendance-Confirmation-Form-Add": true,
    "Attendance-Confirmation-Sent": true,
    "Bulletin-Add": true,
    "Bulletin-Select": true,
    "Bulletin-Update": true,
    "Con-Num-Allot": true,
    "Con-Num-Export": true,
    "Con-Num-Select": true,
    "Con-Num-Setting": true,
    "Delivery-Receipt-Read": true,
    "Delivery-Recept-Read": true,//查看离职交接单
    "Dimission-Certificate-Read": true,//查看离职证明
    "Dimission-Certificate-Send": true,//发送离职证明
    "Dimission-Index": true,
    "Dimission-Message-Send": true,//发送离职短信
    "Dimission-News-Send": true,//发送离职群消息
    "Dorm-Manage-Add": true,
    "Dorm-Manage-Delete": true,
    "Dorm-Manage-Edit": true,
    "Dorm-Manage-Enter": true,
    "Dorm-Manage-Lodging": true,
    "Dorm-Manage-Select": true,
    "Dorm-Manage-Update": true,
    "Duty-Delete": true,//删除岗位
    "Duty-Save": true,//添加岗位
    "Duty-Update": true,//编辑岗位
    "EAM-Category-Delete": true,
    "EAM-Category-Save": true,
    "EAM-Category-Update": true,
    "Employee-File-Add": true,
    "Employee-File-Select": true,//查看员工档案
    "Employee-File-Update": true,//修改员工档案
    "Employee-Self-Update": true,
    "Exam-Bank-Delete": true,
    "Exam-Bank-Index": true,
    "Exam-Bank-Read": true,
    "Exam-Bank-Save": true,
    "Exam-Bank-Update": true,
    "Exam-Question-Delete": true,
    "Exam-Question-Index": true,
    "Exam-Question-Read": true,
    "Exam-Question-Save": true,
    "Exam-Question-Update": true,
    "Exam-Schedule-Delete": true,
    "Exam-Schedule-Index": true,
    "Exam-Schedule-Read": true,
    "Exam-Schedule-Save": true,
    "Exam-Schedule-Update": true,
    "Examination-Reconfirmation-Sent": true,
    "Finished-Audition-Edit": true,//修改面试结果
    "Finished-Audition-Select": true,
    "Goods-Records": true,
    "Handin-Record-Add": true,
    "Handin-Record-Update": true,
    "Invali-Record-Add": true,
    "Invali-Record-Update": true,
    "Inventory-Index": true,
    "Inventory-Read": true,
    "Invited-Audition-Edit": true,
    "Invited-Audition-Select": true,//查看已约面试
    "Loan-Record-Index": true,
    "Loan-Record-Read": true,
    "Loan-Record-Update": true,
    "Lost-Record-Add": true,
    "Lost-Record-Update": true,
    "Media-Manager": true,
    "Meeting-Category-Delete": true,
    "Meeting-Category-Index": true,
    "Meeting-Category-Save": true,
    "Meeting-Category-Update": true,
    "Meeting-Delete": true,
    "Meeting-Index": true,
    "Meeting-Minutes-Index": true,
    "Meeting-Read": true,
    "Meeting-Save": true,
    "Meeting-Update": true,
    "Month-Summary": true,
    "Month-Summary-Import": true,
    "Office-Manage-Add": true,
    "Office-Manage-Delete": true,
    "Office-Manage-Edit": true,
    "Office-Manage-Select": true,
    "Office-Manage-Update": true,
    "Operation-Record-Index": true,//查看成长轨迹详情
    "Organization-Add": true,//新增部门
    "Organization-Delete": true,//删除部门
    "Organization-Index": true,//查看部门列表
    "Organization-Read": true,//查看部门详情
    "Organization-Structure": true,//查看组织结构图
    "Organization-Update": true,//编辑部门
    "Permission-Delete": true,
    "Permission-Index": true,//查看权限
    "Permission-Read": true,
    "Permission-Save": true,//新增权限
    "Permission-Set": true,
    "Permission-Update": true,//编辑权限
    "Position-Delete": true,//删除职位
    "Position-Save": true,//新增职位
    "Position-Update": true,//编辑职位
    "Preparing-Audition-Edit": true,//编辑预约面试
    "Preparing-Audition-Select": true,//查看预约面试列表
    "Preparing-Entry-Edit": true,//编辑待入职
    "Preparing-Entry-Select": true,//查看待入职
    "Procurement-Contract-Delete": true,
    "Procurement-Contract-Index": true,
    "Procurement-Contract-Read": true,
    "Procurement-Contract-Save": true,
    "Procurement-Contract-Update": true,
    "Qtn-Add": true,
    "Qtn-Result-Select": true,
    "Qtn-Select": true,
    "Rece-Record-Add": true,
    "Rece-Record-Delete": true,
    "Rece-Record-Update": true,
    "Recruit-Position-Edit": true,//编辑人员需求
    "Recruit-Position-Finish": true,//结束招聘岗位
    "Recruit-Position-Select": true,//获取人员需求列表
    "Roster-Export": true,
    "Roster-Set": true,
    "Storage-Delete": true,
    "Storage-Delete-Number": true,
    "Storage-Index": true,
    "Storage-Read": true,
    "Storage-Read-Qrcode": true,
    "Storage-Save": true,
    "Storage-Update": true,
    "System-Delete": true,//权限 删除系统模块
    "System-Index": true,//权限-查看系统模块列表
    "System-Save": true,//权限-新增系统模块
    "System-Update": true,////权限 编辑系统模块
    "Training-Delete": true,
    "Training-Index": true,
    "Training-Read": true,
    "Training-Save": true,
    "Training-Type-Update": true,
    "User-Add": true,//新增员工
    "User-Delete": true,//删除员工
    "User-Dimission": true,//离职员工
    "User-Enable": true,//禁用账号
    "User-Index": true,//查看员工列表
    "User-Precint": true,//添加员工管辖范围
    "User-Read": true,//查看员工详情
    "User-Second_Entry": true,//二次入职员工
    "User-Update": true,//修改员工
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
