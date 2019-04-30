<template>
  <div id="theme_name" class='theme1'>
    <div id='approval' :class="{'approval':message_visible}" @click.stop='isRevice_visible = false'>
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
          <p class='ele_p gua' @click='change_revice_type'>
            <i :class='["icons",isRevice ? "revice_icons":"gua_icons"]'></i>
            {{isRevice ? "接收":"挂起"}}
          </p>
          <div class="margin">
            <p :class='["ele_p",revice_type.length >0?"revice_span":""]' @click.stop='isRevice_visible = true'>
              {{ revice_check.length == 0 ? "接收类型" : revice_check.join('-') }}</p>

            <div class='revice_box' v-if='isRevice_visible' @mouseleave.stop="isRevice_visible =false">
              <el-checkbox-group v-model="revice_check">
                <el-checkbox v-for='type in revice_type' :key='type.title' :label="type.title" :value='type.id' />
              </el-checkbox-group>
              <div class="dialog_footer">
                <el-button type="danger" size="small" @click='handleChangeRevice'>确定</el-button>
                <el-button type="info" size="small" @click='handleCancleRevice'>取消</el-button>
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
          highlight-current-row @row-dblclick="handlerDbclick" header-row-class-name="tableHeader" style="width: 100%">

          <el-table-column align="center" v-for='item in Object.keys(tableShow)' :key='item' :prop='item' :label="tableShow[item]"></el-table-column>

          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span :class='["status","status"+ scope.row.status]'>{{scope.row.status == 1 ? "产品管控审核中" :
                ( scope.row.status == 2 ? "已撤销":"已通过" ) }}</span>
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
      <ControlPanel :visible='controlPanel_visible' @close='hiddenControlPanel' :revice_type='revice_type' />
      <!-- 详情 -->
      <ContractDetail :visible='contract_detail_visible' :moduleData='current_row' @close='hiddenContractDetail' />
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
import { revice_type } from '../../assets/js/approval/revice_type.js'
export default {
  components: {
    SearchHigh, //高级搜索
    ControlPanel, // 控制面板
    ContractDetail, //详情
    DevelopNewDish,//新盘详情
  },
  data () {
    return {
      revice_type, // 接收类型设置
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
        type: '报备类型',
        person: '报备人',
        house_name: '房屋地址',
        finish_tinme: '完成时间',
      },
      status_type: 1, // 当前显示表格类型
      status_types: [
        {
          tit: '全部',
          value: 1
        },
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
        data1: [
          {
            startTime: '2019-12-28',
            type: '1',
            person: '11',
            house_name: '111',
            finish_tinme: '111',
          },
          {
            startTime: '2019-12-28',
            type: '2',
            person: '11',
            house_name: '111',
            finish_tinme: '111',
          }
        ],
        data2: [],
        data3: [],
        data4: []
      },
      total: {
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
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
        },
      },
      isRevice: false, //是否接收
      isRevice_visible: false,  // 接收类型设置 显示隐藏
      revice_check: [], // 接收类型 选择
      controlPanel_visible: false, // 控制面板 显示隐藏
      showSearch: false, // 高级搜索 显示隐藏
      searchHigh: {}, // 高级搜索 参数

      contract_detail_visible: false, //详情
      develop_visible: false, //新盘
      current_row: null,

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
          this.urlApi = ''
          break;
        case 2:
          this.urlApi = 'runtime/tasks/1/variables/outcome'
          break;
        case 3:
          this.urlApi = 'runtime/tasks'
          break;
        case 4:
          this.urlApi = 'runtime/process-instances'
          break;
        default: break;
      }
      this.params['param' + val] = {
        search: '',
        start_time: [],
        finish_time: [],
        type: null,
        department: ''
      }
    },
    // 接口请求
    getApproval (url, params, val) {  // page分页
      this.showLoading(true);
      this.$http.get(`${this.approval_sever}${url}`, params).then(res => {
        this.showLoading(false);
        if (res.code === 200) {
          this.tableData['data' + val] = res.data.data
          this.total['total' + val] = res.data.count
        } else {
          this.tableData['data' + val] = []
          this.total['total' + val] = 0
        }
      })
    },
    // table 分页
    handleCurrentChange (page) {
      let val = this.status_type
      this.params['param' + val].page = page
      this.getApprovalsList(this.urlApi, this.params['param' + val], val)
    },
    // 高级搜索 显示
    highSearch () {
      this.searchHigh = {
        status: 'approval_leader',
        placeholder: '',
        keywords: 'sarch',
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
            keyName: 'finish_time',
            dataType: []
          },
          {
            keyType: 'radio',
            title: '工单类型',
            keyName: 'type',
            dataType: '',
            value: revice_type
          },
          {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department',
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
    change_revice_type () {
      this.isRevice = !this.isRevice
      // this.$http.get(`${this.approval_sever}${url}`, params).then(res => {
      //   let warn = this.isRevice ? "接收" : "挂起",
      //     type = 'success'
      //   if (res.code === 200) {
      //     warn += '设置成功'
      //     // 重新刷新数据
      //     this.handleCurrentChange(1)
      //   } else {
      //     warn += '设置失败'
      //     type = 'warning'
      //   }
      //   this.$LjNotify(type, {
      //     title: '提示',
      //     message: warn
      //   });
      // })
    },
    // 选择 接收类型
    handleChangeRevice () {
      this.isRevice_visible = false
    },
    // 取消 接收类型
    handleCancleRevice () {
      this.isRevice_visible = false
      this.revice_type = []
    },
    // 组长 控制面板
    handleSeeMain () {
      this.controlPanel_visible = true
    },
    hiddenControlPanel () {
      this.controlPanel_visible = false
    },
    // 详情
    handlerDbclick (row) {
      this.current_row = row
      if (row.type == 2) { // 拓展新盘
        this.develop_visible = true
      } else {
        this.contract_detail_visible = true
      }
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


