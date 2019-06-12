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
import storage from './utils/storage';
import router from './router'
import axios from 'axios';
import Axios from './utils/httpService'
import echarts from 'echarts'
import 'echarts-gl'
import 'echarts/theme/macarons.js'
import './assets/scss/rest.css'
import './assets/scss/element.css'
import './assets/scss/currency.css'
import './assets/scss/partical.css'
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
import getPermission from './utils/permission';
import _ from 'lodash';

axios.defaults.headers.common['Authorization'] = storage.get('Authorization');//设置请求头Authorization



Vue.prototype.$echarts = echarts;
Vue.use(Boss);
Vue.use(_);
Vue.use(Vuex);
Vue.use(fun);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.myUtils = myUtils;
Vue.prototype.$storage = storage;

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

Vue.prototype.$LjConfirm = Confirm.install;

Vue.prototype.$video = Video;


getPermission();//进入系统后首先同步获取权限 然后再每隔30秒异步获取权限

router.beforeEach((to, from, next) => {
  /*Vue.prototype.VALIDATE_PERMISSION = {
    "Account-List":true,//获取账户列表
    "Account-Allocation-List":true,//账户分配列表
    "Account-Change-Log":true,//账户操作记录
    "Account-Edit":true,//编辑账户
    "Account-Recharge":true,//充值账户
    "Account-Archive":true,//归零账户
    "Account-Delete":true,//删除账户
    "Account-Save":true,//新增账户
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
    "Lord-List":true,//房东列表
    "Lord-Edit":true,//房东编辑
    "Lord-Pending":true,//房东转待处理项
    "Lord-Is-Ignore":true,//房东是否忽略
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
    "Payable-List":true,//应付款项列表
    "Payable-Complete-Date":true,//修改应付款项补齐时间
    "Payable-Edit-Subject":true,//修改应付款项科目
    "Payable-Amount":true,//修改应付款项金额
    "Payable-Pay-Date":true,//修改应付款项付款时间
    "Payable-Transfer":true,//应付款项入账
    "Payable-Revert":true,//应付款项回滚
    "Payable-Delete":true,//应付款项删除
    "Payable-Save":true,//新增应付款项
    "Batch-Payable-List":true,//应付批量入账列表
    "Batch-Payable-Export":true,//应付批量入账导出
    "Batch-Payable-Import":true,//应付批量入账导入
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
    "Renter-List":true,//租客列表
    "Renter-Edit":true,//租客编辑
    "Renter-Pending":true,//租客转待处理项
    "Renter-Is-Ignore":true,//租客是否忽略重复
    "Receivable-List":true,//查看应收款项列表
    "Receivable-Complete-Date":true,//修改补齐时间
    "Receivable-Revert":true,//应收款项回滚
    "Receivable-Receipt-Name":true,//修改收款电子收据姓名
    "Receivable-Edit-Amount":true,//应收款项金额编辑
    "Receivable-Delete":true,//应收款项删除
    "Receivable-Receive":true,//应收款项入账
    "Receivable-Forfeit":true,//应收款项滞纳金
    "Receivable-Receipt-Send":true,//发送电子收据给客户
    "Receivable-Notify":true,//应收款项发送短信
    "Receivable-Urgetag":true,//应收款项生成催缴备注
    "Receivable-Tag":true,//应收款项添加备注
    "Batch-Receivable-Export":true,//应收批量入账导出
    "Batch-Receivable-Import":true,//应收批量入账导入
    "Receivable-Save":true,//新增应收款项
    "Receivable-Liquid":true,//生成应收款项违约金
    "Receivable-Receipt":true,//应收款项开电子收据
    "Roster-Export": true,
    "Roster-Set": true,
    "Running-List":true,//查看收支流水列表
    "Batch-Receivable-List":true,//批量应收入账列表
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
    "Subject-List":true,//查看科目列表
    "Subject-Edit":true,//编辑科目
    "Subject-Enable":true,//禁用科目
    "Subject-Migrate":true,//迁移科目
    "Subject-Delete":true,//删除科目
    "Subject-Save":true,//新增科目
    "Service-Clean-Read":true,//维修保洁管理只读权限
    "Service-Clean-Operate":true,//维修保洁操作权限
    "Order-Operate":true,//工单管理操作权限
    "Order-Read":true,//工单管理只读权限
    "Data-Audit-Read":true,//资料审核只读权限
    "Data-Audit-Operate":true,//资料审核操作权限
    "Revisit-Read":true,//回访管理只读权限
    "Revisit-Operate":true,//回访管理操作权限
    "House-Due-Operate":true,//房屋到期操作权限
    "House-Due-Read":true,//房屋到期只读权限
    "Community-Operate":true,//小区管理操作权限
    "Community-Read":true,//小区管理只读权限
    "House-Center-Operate":true,//房源中心操作权限
    "House-Center-Read":true,//房源中心只读权限
    "Contract-Operate":true,//合同管理操作权限
    "Contract-Read":true,//合同管理只读权限
    "Customer-Operate":true,//客户管理操作权限
    "Customer-Read":true,//客户管理只读权限
    "Service-Online-Operate":true,//接线记录操作权限
    "Service-Online-Read":true,//界限记录只读权限
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
  };*/
  if (!storage.get('Authorization') && to.path != '/login') {
    next({path: '/login'})
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
