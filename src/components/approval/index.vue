<template>
  <div id="theme_name" class='theme1'>
    <div id='approval' :class="{'approval':message_visible}">
      <!-- <div class="header_btns">
        <p :class='{"activeTag":chosenTag == item.value}' v-for='item in shenHe_type' :key='item.value'>
          <i :class='["icons",item.icons]'></i>
          <span>{{item.tit}}</span>
        </p>
      </div> -->

      <div class="header">
        <!--全部 我审批的 暂不处理 抄送我的-->
        <div class='header_methods'>
          <div :class='["methods_box",item.value == status_type ?"methods_box_active":""]' v-for='item in status_types'
            :key='item.value' @click='status_type = item.value'>{{item.tit}}</div>
        </div>

        <div class='header_right'>
          <p class='ele_p gua' @click='change_receive_type'>
            <i :class='["icons",isreceive ? "receive_icons":"gua_icons"]'></i>
            {{isreceive ? "挂起":"接收"}}
          </p>
          <div class="margin">
            <p :class='["ele_p",receive_check_name.length >0?"receive_span":""]' @click.stop='setReceiveType'>
              {{ receive_check_name.length == 0 ? "接收类型" : receive_check_name.join('-') }}</p>

            <div class='receive_box' v-if='isreceive_visible'>
              <el-checkbox-group v-model="receive_check">
                <el-checkbox v-for='type in Object.keys(receive_type)' :key='type' :label="type">
                  {{receive_type[type]}}
                </el-checkbox>
              </el-checkbox-group>
              <div class="dialog_footer">
                <el-button type="danger" size="small" @click='handleChangeReceive'>确定</el-button>
                <el-button type="info" size="small" @click='handleCancelReceive'>取消</el-button>
              </div>
            </div>
          </div>
          <!-- 组长显示 -->
          <i class='icons icons_main' v-if='isCaputer' @click='handleSeeMain'></i>
          <i class='icons icons_search' @click='highSearch'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': this.mainListHeight(30) + 'px'}">
        <el-table :data="tableData['data' + status_type ]" :height="this.mainListHeight(180) + 'px'"
          highlight-current-row @row-dblclick="handleDbClick" header-row-class-name="tableHeader" style="width: 100%">

          <el-table-column align="center" v-for='item in Object.keys(tableShow)' :key='item' :prop='item' :label="tableShow[item]"></el-table-column>

          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span class='status status3' v-if='scope.row.status == "已通过" 
              || scope.row.status == "已读"'>{{scope.row.status}}</span>
              <span class='status status1' v-else-if='scope.row.status == "已拒绝"'>{{scope.row.status}}</span>
              <span class='status status2' v-else>{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>

        <footer class="flex-center bottomPage" v-if="!controlPanel_visible">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination @current-change="handleCurrentChange" :current-page="params['param'+ status_type].page"
              :page-size="10" :total="total['total'+ status_type]" layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </footer>
      </div>

      <!-- 搜索 -->
      <SearchHigh :module="showSearch" :showData="searchHigh" @close="hiddenModule" />
      <!-- 控制面板 -->
      <ControlPanel :visible='controlPanel_visible' @close='hiddenControlPanel' :receive_type='receive_type' />
      <!-- 详情 -->
      <ContractDetail :visible='contract_detail_visible' :moduleData='current_row' :status_type='status_type' @close='hiddenContractDetail'
        @changeData='handleChange' />
      <!-- 拓展新盘详情 -->
      <DevelopNewDish :visible='develop_visible' :moduleData='current_row' @close='hiddenDevelopNew' />
    </div>
  </div>
</template>

<script>
import SearchHigh from '../common/searchHigh.vue'
import ControlPanel from './commponents/controlPanel'
import ContractDetail from './commponents/contract_detail'
import DevelopNewDish from './commponents/developNewDish'
import { receive_type } from '../../assets/js/approval/receive_type.js'
export default {
  components: {
    SearchHigh, //高级搜索
    ControlPanel, // 控制面板
    ContractDetail, //详情
    DevelopNewDish,//新盘详情
  },
  data () {
    return {
      receive_type, // 接收类型设置
      show_form_visible: false,
      chosenTag: 1,
      isCaputer: true, // 当前登录人：组员 或者 组长
      shenHe_type: [
        {
          tit: '报备审核',
          value: 1,
          icons: 'icons_app'
        }
        // {
        //   tit: '办公审核',
        //   value: 2,
        //   icons: 'icons_ban'
        // }
      ],
      tableShow: {  // 表格数据显示
        startTime: '发起时间',
        bulletin_name: '报备类型',
        bulletin_staff_name: '报备人',
        house_address: '房屋地址',
        endTime: '完成时间',
      },
      status_type: 1, // 当前显示表格类型
      status_types: [
        {
          tit: '全部',
          value: 1
        },
        // {
        //   tit: '我发起的',
        //   value: 5
        // },
        {
          tit: '我审批的',
          value: 2
        },
        {
          tit: '暂不处理',
          value: 3
        },
        {
          tit: '抄送我的',
          value: 4
        }
      ],
      urlApi: '', // 数据请求
      tableData: {
        data1: [],
        data2: [],
        data3: [],
        data4: []
      },
      total: {
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0
      },
      params: {
        param1: {
          page: 1,
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param2: {
          page: 1,
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param3: {
          page: 1,
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param4: {
          page: 1,
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        }
      },
      isreceive: false, //是否接收
      isreceive_visible: false,  // 接收类型设置 显示隐藏
      receive_check: [], // 接收类型 选择
      receive_check_name: [],
      controlPanel_visible: false, // 控制面板 显示隐藏
      showSearch: false, // 高级搜索 显示隐藏
      searchHigh: {}, // 高级搜索 参数

      contract_detail_visible: false, //详情
      develop_visible: false, //新盘
      current_row: null,
      taskType: [
        'task_id',
        'bulletin_staff_id',  // 报备人id
        'bulletin_staff_name', // 报备人name
        'bulletin_name', // 报备类型
        'bulletin_type',
        'house_address',  // 房屋地址
        'bm_detail_request_url', // 报备详情
        'outcome'
      ],
      approval_sever: globalConfig.approval_sever
    }
  },
  mounted () {

  },
  computed: {
    message_visible () {
      return this.$store.state.approval.approval_message_visible
    },
  },
  watch: {
    status_type (val) { //类型切换
      this.getApprovalsList(val)
    },
    message_visible (val) {
      if (val) {
        this.getApprovalsList(1)
      }
      this.isreceive_visible = false
      this.showSearch = false
      this.controlPanel_visible = false
      this.contract_detail_visible = false
      this.develop_visible = false
    }
  },
  methods: {
    // 页面数据请求
    getApprovalsList (val) {
      this.paramsHandle(val)  // 配置
      this.getApproval(this.urlApi, this.params['param' + val], val)     // 接口请求
    },
    // 配置
    paramsHandle (val) {
      switch (val) {
        case 1:
          this.urlApi = 'history/process-instances'
          break;
        case 2:
          this.urlApi = 'history/tasks?category=approval&processDefinitionKey=MG-BulletinApproval'
          break;
        case 3:
          this.urlApi = 'runtime/process-instances'
          break;
        case 4:
          this.urlApi = 'history/tasks?category=cc'
          break;
        case 5:
          this.urlApi = 'history/process-instances?processDefinitionKey=MC-Bulletin&taskOwner'
          break;
        default: break;
      }
      this.params['param' + val] = {
        page: 1,
        size: 10,
        title: '',
        startTimeBefore: '',
        startTimeAfter: '',
        endTimeBefore: '',
        endTimeAfter: '',
        orgId: ''
      }
    },
    // 接口请求
    getApproval (url, params, val) {  // page分页
      //this.showLoading(true);
      this.$http.get(`${this.approval_sever}${url}`, params).then(res => {
        //this.showLoading(false);
        debugger
        this.tableData['data' + val] = res.size > 0 ? this.setFormatApproval(res.data) : []
        this.total['total' + val] = res.total
      })
    },
    setFormatApproval (data) {
      let arr = []
      for (let item of data) {
        let obj = {};
        obj.startTime = item.startTime || item.createTime
        obj.name = item.name
        obj.endTime = item.endTime
        obj.id = item.id
        for (let key of item.variables) {
          if (this.taskType.includes(key.name)) {
            obj[key.name] = key.value
          }
        }

        obj.isfinish = false

        if (this.status_type == 2 || this.status_type == 4) {
          if (item.endTime) {
            obj.isfinish = true
            if (this.status_type == 2) {
              let title = JSON.parse(obj.outcome).variableName
              for (let key of item.variables) {
                if (key.name == title) {
                  obj.status = key.value ? "已通过" : "已拒绝"
                }
              }
            } else {
              obj.status = '已读'
            }
          } else {
            obj.status = this.status_type == 2 ? item.name : '未读'
          }
          obj.suspended = item.suspended
          obj.rootProcessInstanceId = item.processInstanceId
        } else {
          if (item.status.includes('已通过')) {
            obj.isfinish = true
          }
          obj.status = item.status.join(',')
        }
        arr.push(obj)
      }
      return arr
    },
    // table 分页
    handleCurrentChange (page) {
      let val = this.status_type
      this.params['param' + val].page = page
      this.getApproval(this.urlApi, this.params['param' + val], val)
    },
    // 高级搜索 显示
    highSearch () {
      this.searchHigh = {
        status: 'approval_leader',
        placeholder: '',
        keywords: 'search',
        data: [
          {
            keyType: 'dateRange',
            title: '开始时间',
            placeholder: '请选择日期',
            keyName: 'start_time',
            dataType: []
          },
          {
            keyType: 'dateRange',
            title: '结束时间',
            placeholder: '请选择日期',
            keyName: 'end_time',
            dataType: []
          },
          {
            keyType: 'radio',
            title: '审批类型',
            keyName: 'type',
            dataType: '',
            value: receive_type
          },
          {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'org_id',
            dataType: [],
            value: {
              num: 1,
              arr: ''
            }
          },
        ]
      }
      this.showSearch = true
    },
    // 高级搜索 确定
    hiddenModule (val) {
      this.showSearch = false
      if (val != 'close') {
        this.params['param' + this.status_type] = val
        this.handleCurrentChange(1)
      }
    },
    // 接收 挂起
    change_receive_type () {
      this.isreceive = !this.isreceive
      this.handleCheckType()
    },
    setReceiveType () {
      if (this.isreceive) {
        this.isreceive_visible = !this.isreceive_visible
      } else {
        this.$LjNotify('warning', {
          title: '提示',
          message: '挂起状态禁止设置接收类型'
        });
      }
    },
    handleCheckType () {
      let params = {
        "receiveTypeList": this.receive_check,
        "suspend": !this.isreceive
      }
      this.$http.post(`${this.approval_sever}monitor/process-instances/${this.$storage.get('user_info').id}`, params).then(res => {
        console.log(res)
      })
    },
    // 选择 接收类型
    handleChangeReceive () {
      this.isreceive_visible = false
      this.receive_check_name = []
      this.receive_check.forEach(ele => {
        this.receive_check_name.push(this.receive_type[ele])
      });
      this.handleCheckType()
    },
    // 取消 接收类型
    handleCancelReceive () {
      this.isreceive_visible = false
      this.receive_check = []
    },
    // 组长 控制面板
    handleSeeMain () {
      this.controlPanel_visible = true
    },
    hiddenControlPanel () {
      this.controlPanel_visible = false
    },
    // 详情
    handleDbClick (row) {
      let url = row.bm_detail_request_url;
      if(!url) {
        this.$LjMessage('warning',{title:'警告',msg:'无详情地址'});
        return;
      }
     // row.bm_detail_request_url = '';
      this.current_row = row;

      // if (row.type == 2) { // 拓展新盘
      //   this.develop_visible = true
      // } else {
      this.contract_detail_visible = true

      // 抄送我的 + 未读 已读状态

      // }
    },
    handleChange () {
      let val = this.status_type
      this.getApproval(this.urlApi, this.params['param' + val], val)
    },
    hiddenContractDetail () {
      this.contract_detail_visible = false
    },
    hiddenDevelopNew () {
      this.develop_visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/approval/index.scss";

#theme_name {
  #approval {
    footer.bottomPage {
      background: #ffffff;
      width: auto;
      margin: 0 30px;
    }
  }
}
</style>
<style lang="scss">
#approval {
  .searchModule,
  .searchContent {
    top: 0 !important;
  }
}
</style>


