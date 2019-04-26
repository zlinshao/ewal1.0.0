<template>
  <div id="theme_name" class='theme1'>
    <div id='approval' :class="{'approval':message_visible}">
      <div class="header_btns">
        <p :class='{"activeTag":chosenTag == item.value}' v-for='item in shenHe_type' :key='item.value' @click='changeShenTag(item.value)'>
          <i :class='["icons",item.icons]'></i>
          <span>{{item.tit}}</span>
        </p>
      </div>

      <div class="header">
        <!--全部 我审批的 暂不处理 抄送我的-->
        <div class='header_methods'>
          <div :class='["methods_box",item.value == current_status_type ?"methods_box_active":""]' v-for='item in methods_type'
            :key='item.value' @click='change_status_type(item.value)'>{{item.tit}}</div>
        </div>

        <div class='header_right'>
          <p class='ele_p gua' @click='change_revice_type'>
            <i :class='["icons",isRevice ? "revice_icons":"gua_icons"]'></i>
            {{isRevice ? "接收":"挂起"}}
          </p>
          <div class="margin">
            <p :class='["ele_p",revice_check_type.length >0?"revice_span":""]' @click='isRevice_visible = true'>{{revice_check_type.length
              == 0 ?
              "接收类型" :
              revice_check_type.join('-')}}</p>
            <div class='revice_box' v-if='isRevice_visible' @mouseleave.stop="isRevice_visible =false">
              <el-checkbox-group v-model="revice_check_type">
                <el-checkbox v-for='type in revice_type' :key='type.tit' :label="type.tit"></el-checkbox>
              </el-checkbox-group>

              <div class="dialog_footer">
                <el-button type="danger" size="small" @click='handleChangeRevice'>确定</el-button>
                <el-button type="info" size="small" @click='handleCancleRevice'>取消</el-button>
              </div>
            </div>
          </div>
          <i class='icons icons_main' v-if='current_type == 1' @click='handleSeeMain'></i>
          <i class='icons icons_search' @click='highSearch'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': this.mainListHeight(30) + 'px'}">
        <el-table :data="tableData" :height="this.mainListHeight(180) + 'px'" highlight-current-row @row-dblclick="handlerDbclick"
          header-row-class-name="tableHeader" style="width: 100%">

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
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableCount"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </footer>
      </div>

      <!-- 搜索 -->
      <SearchHigh :module="showSearch" :showData="searchHigh" @close="hiddenModule"></SearchHigh>
      <!-- 控制面板 -->
      <ControlPanel :visible='controlPanel_visible' @close='hiddenControlPanel' />
      <!-- 详情 -->
      <ContractDetail :visible='contract_detail_visible' @close='hiddenContractDetail' />
      <!-- 拓展新盘详情 -->
      <DevelopNewDish :visible='develop_visible' @close='hiddenDevelopNew' />

      <FormDetail :visible='show_form_visible' />
    </div>
  </div>
</template>

<script>
import SearchHigh from '../common/searchHigh.vue'
import ControlPanel from './commponents/controlPanel'
import ContractDetail from './commponents/contract_detail'
import DevelopNewDish from './commponents/developNewDish'
import FormDetail from './commponents/form_detail'
export default {
  components: {
    SearchHigh, //高级搜索
    ControlPanel, // 控制面板
    ContractDetail, //详情
    DevelopNewDish,//新盘详情
    FormDetail
  },
  data () {
    return {
      show_form_visible:false,
      chosenTag: 1,
      shenHe_type: [
        {
          tit: '报备审核',
          value: 1,
          icons: 'icons_app'
        },
        {
          tit: '办公审核',
          value: 2,
          icons: 'icons_ban'
        }
      ],
      methods_type: [
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
      current_status_type: 1,
      current_type: 1, // 组员 或者 组长
      tableShow: {
        startTime: '发起时间',
        type: '报备类型',
        person: '报备人',
        house_name: '房屋地址',
        finish_tinme: '完成时间',
      },
      tableData: {
        data1: [],
        data2: [],
        data3: [],
        data4: []
      },
      params: {
        param1: {
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param2: {
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param3: {
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
        param4: {
          search: '',
          start_time: [],
          finish_time: [],
          type: null,
          department: ''
        },
      },
      tableData: [],
      tableCount: 8,
      currentPage: 1,
      // 高级搜索参数
      table_params: {
        search: '',
        start_time: [],
        finish_time: [],
        type: null,
        department: ''
      },
      //高级搜索
      searchHigh: {
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
            value: [
              {
                id: 1,
                title: '收房'
              },
              {
                id: 2,
                title: '租房'
              },
              {
                id: 3,
                title: '续收'
              },
              {
                id: 4,
                title: '续租'
              },
              {
                id: 5,
                title: '收房补充协议'
              },
              {
                id: 6,
                title: '转租'
              },
              {
                id: 9,
                title: '调房'
              },
              {
                id: 10,
                title: '退租'
              },
              {
                id: 11,
                title: '拓展新盘'
              },
              {
                id: 12,
                title: '租房补充协议'
              },
              {
                id: 13,
                title: '取消预订'
              },
              {
                id: 14,
                title: '家具补齐'
              },

            ]
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
      },
      searchData: {},
      showSearch: false,
      isRevice: false, //是否接收
      // 接收类型
      revice_type: [
        {
          tit: '取消预定',
          value: 1
        },
        {
          tit: '家居补齐',
          value: 2
        },
        {
          tit: '收房报备',
          value: 3
        },
        {
          tit: '租房报备',
          value: 4
        },
        {
          tit: '续收报备',
          value: 5
        },
        {
          tit: '续租报备',
          value: 6
        }, {
          tit: '转租报备',
          value: 7
        },
        {
          tit: '调房报备',
          value: 8
        },
        {
          tit: '退租报备',
          value: 9
        },
        {
          tit: '拓展新盘',
          value: 10
        },
        {
          tit: '收房补充协议',
          value: 11
        },
        {
          tit: '租房补充协议',
          value: 12
        }
      ],
      revice_check_type: [],
      isRevice_visible: false,
      // 控制面板
      controlPanel_visible: false,
      contract_detail_visible: false, //详情
      develop_visible: false, //新盘
      current_row: null,
      approval_sever: globalConfig.approval_sever
    }
  },
  mounted () {
    this.show_form_visible = true
   // this.getTableData_all()
  },
  computed: {
    message_visible () {
      return this.$store.state.approval.approval_message_visible
    },
  },
  methods: {
    // 获取 url 地址
    getHttpUrl (type) {
      let url = '';
      switch (type) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        default: break;
      }
      return url
    },
    getTableData (type) {
      type == 1 && this.getTableData_all() //全部
      type == 2 && this.getTableData_shen() // 我审批的
      type == 3 && this.getTableData_buff() // 暂不处理
      type == 4 && this.getTableData_chao() // 抄送我的
    },
    getTableData_all () {
      // let type = this.current_status_type
      // this.$http.get(`${this.approval_sever}${this.getHttpUrl(type)}?includeTaskLocalVariables=true`, this.params['param' + type]).then(res => {
      //   this.tableData['data' + type] = res.data
      // })
    },

    getTableData_shen () {
      this.$http.get(`${this.approval_sever}runtime/tasks/1/variables/outcome`).then(res => {
        console.log(res)
      })
    },
    getTableData_buff () { },
    getTableData_chao () { },
    change_status_type (val) {
      if (this.current_status_type !== val) {
        this.current_status_type = val;
        this.currentPage = 1;
        this.getTableData(val)
      }
    },
    hiddenModule (val) {
      this.showSearch = false
      if (val != 'close') {
        this.getTableData(val)
      }
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true
    },
    changeShenTag (value) {
      if (this.chosenTag != value) {
        this.chosenTag = value
      }
    },
    // 接收 挂起
    change_revice_type () {
      this.isRevice = !this.isRevice
    },
    // 选择 接收类型
    handleChangeRevice () {
      console.log(this.revice_check_type)
      this.isRevice_visible = false
    },
    // 取消 接收类型
    handleCancleRevice () {
      this.isRevice_visible = false
      this.revice_check_type = []
    },
    // 组长 控制面板
    handleSeeMain () {
      this.controlPanel_visible = true
    },
    hiddenControlPanel () {
      this.controlPanel_visible = false
    },
    // table 分页
    handleCurrentChange (val) {
      this.currentPage = val
      // 获取数据
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


