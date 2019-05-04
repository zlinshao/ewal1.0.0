<template>
  <div id="miantenance">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>维修保洁</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button id='active-warning' @click='chosenTag_status(7)' :class="[tag_status ==7?'el-button-active':'']">维修</el-button>
        <el-button id='active-primary' @click='chosenTag_status(8)' :class="[tag_status==8?'el-button-active':'']">保洁</el-button>
        <div class="icons add" @click='addOrder'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableDblClick"
        header-row-class-name="tableHeader" style="width: 100%" :key='"orderTable"+chooseTab'>
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="emergency" :class="['emergency' + scope.row.emergency]">
              {{scope.row.emergency_name}}
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" v-for='item in Object.keys(showTableData)' :key='item' :prop='item' :label="showTableData[item]"></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button id='active-primary' size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button id='active-danger' size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDateCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule" />
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false" />
    <!-- 催办 -->
    <UrgedDealDialog :visible='urgedDeal_visible' :moduleData='uergedDeal_info' @close="handleCloseUrgedDeal" />
    <!-- 转交 -->
    <TransferDialog :visible='transfer_visible' :data='currentRow' @close="handleCloseTranfer" />
    <!--确定结束-->
    <SureEndDialog :visible="sureEnding_visible" @close="handleCloseSure" :moduleData='sureEnd_info' />
    <!--维修详情-->
    <OrderDetail :visible="detail_visible" :moduleData='detail_info' :change='detail_Record_change' @close="handleCloseDetail"
      @changDetail="handleChangeDetail" />
    <!--新增跟进记录-->
    <AddRecord :visible='followRecord_visible' :moduleData='followRecord_info' @close='handleCloseRecord' />
    <!--新建工单-->
    <CreateOrder :visible="addOrder_visible" moduleOrder='78' @close="handleCloseOrder" />
    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete' />
    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd' />
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import { maintenanceSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import LjDialog from '../../common/lj-dialog.vue';
import DeleteDialog from '../components/delete-dialog';
import SureEndDialog from '../components/sureEnd-dialog';
import AddDialog from '../components/add-dialog';
import UrgedDealDialog from '../components/urgedDeal-dialog'
import TransferDialog from '../components/transfer-dialog'
import OrderDetail from '../components/order-detail'
import AddRecord from '../components/addRecord'
import CreateOrder from '../components/createOrder'

export default {
  name: "index",
  components: {
    SearchHigh,
    MenuList,
    LjDialog,
    DeleteDialog,
    AddDialog,
    UrgedDealDialog,
    TransferDialog,
    OrderDetail,
    SureEndDialog,
    AddRecord,
    CreateOrder
  },
  data () {
    return {
      maintenanceSearch,
      customService,
      visibleStatus: false,
      showTableData: {
        create_time: '创建时间',
        num: '工单编号',
        type_name: '类型',
        house_name: '地址',
        content: '内容',
        finish_time: '截止时间',
        operate_user_name: '处理人',
        create_name: '创建人',
        org_name: '部门'
      },
      tableData: [], // 工单列表
      tableDateCount: 0, // 工单列表count
      currentRow: null, // 当前查看的row
      currentPage: 1, //分页
      urgedDeal_visible: false, //催办
      uergedDeal_info: { //催办
        default_Person: null,
        id: null
      },
      transfer_visible: false, // 转交
      transfer: { // 转交
        note: '',
        person: [],
        personName: ''
      },
      //删除row
      delete_visible: false,
      // 增加
      add_visible: false,
      showSearch: false,
      searchData: {},
      addOrder_visible: false, // 新建工单
      currentStaff_method: '',
      // 工单详情
      detail_visible: false,
      detail_Record_change: false,
      detail_form: null, // 工单详情
      staffModule: false,//显示人员选择
      organData: {
        num: 1
      },

      detail_info: {
        currentId: null,
        chosenTag: null
      },
      sureEnding_visible: false,  // 确定结束
      sureEnd_info: {
        payer: '',
        payer_org_name: ''
      },
      tag_status: 7, // 7是维修 8是保洁
      chooseTab: 336, // 336待处理 337处理中 338已完成
      selects: [
        {
          id: 336,
          title: '待处理',
        },
        {
          id: 337,
          title: '跟进中',
        },
        {
          id: 338,
          title: '已完成',
        }
      ],
      // 工单列表高级搜索
      params: {
        search: '',
        create_time: [],
        finish_time: [],
        operate_user_id: '',
        operate_org_id: '',
        emergency: '',
      },
      // 跟进
      followRecord_visible: false,
      followRecord_info: {
        work_id: null,
        chooseTab: null,
        type: null
      },
      market_server: globalConfig.market_server,
    }
  },
  mounted () {
    this.getDateList();
  },
  methods: {
    addRecordFun (par) {
      let params = this.followRecord,
        pay_method = [];
      if (params.folow_status == 338) {
        params.pay_method.forEach(el => {
          pay_method.push([el.type || 0, el.name || '', el.money || ''])
        });
        params.flag = par.isCreated ? 1 : 0
      }
      params.pay_method = pay_method
      params.work_order_id = this.currentRow.id

      this.$http.post(`${this.market_server}v1.0/csd/work_order/follow`, params).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });
        this.detail_Record_change = true
      })
    },
    //工单表格数据初始化
    getDateList () {
      this.showLoading(true);
      let params = {
        type: this.tag_status,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.params.search,
        create_time: this.params.create_time,
        finish_time: this.params.finish_time,
        operate_user_id: this.params.operate_user_id,
        operate_org_id: this.params.operate_org_id,
        emergency: this.params.emergency
      }
      this.$http.get(`${this.market_server}v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          let data = res.data.data
          if (data.length == 0 && this.currentPage != 1) {
            this.currentPage--
            this.getDateList()
          } else {
            this.tableData = data;
            this.tableDateCount = res.data.all_count;
            this.showLoading(false);
          }
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
          this.showLoading(false);
        }
      })
    },
    // 催办
    handleCuiBan (row) {
      this.uergedDeal_info = {
        default_Person: row.operate_user_name,
        id: row.id
      }
      this.urgedDeal_visible = true
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      this.urgedDeal_visible = false
      this.uergedDeal_info = {
        default_Person: null,
        id: null
      }
    },
    // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      this.delete_visible = false
      if (val) { //确定删除
        this.$http.delete(`${this.market_server}v1.0/csd/work_order/delete/${this.currentRow.id}`).then(res => {
          this.currentRow = null
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.getDateList()
          }
        })
      }

    },
    //确认添加
    handleCloseAdd (params) {
      this.add_visible = false
      this.currentMethod != 'created' && this.addRecordFun(params)
      this.currentMethod = null
    },
    // tab切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id;
        this.getDateList()
      }
    },
    chosenTag_status (id) {
      if (this.tag_status != id) {
        this.tag_status = id
        this.getDateList()
      }
    },
    // add 工单
    addOrder () {
      this.addOrder_visible = true
    },
    handleCloseOrder (params) {
      let { visible, method } = params
      this.addOrder_visible = false
      if (method != 'cancle') {
        this.getDateList()
      }
    },
    //新增跟进记录
    handleAddRecord () {
      this.detail_visible = false
      this.followRecord_visible = true
    },
    handleCloseSure (params) {
      let { isSure, isCreated } = params
      this.sureEnding_visible = false
      if (isSure) {
        this.currentMethod == 'addRecord' && this.addRecordFun(params)
        this.currentMethod == 'ending' && this.handleSure(isCreated)
      }
    },
    handleSure (isCreated) {
      let option = {
        work_order_id: this.currentRow.id,
        payer_all_money: this.currentRow.payer_all_money || 0,
        flag: isCreated ? 1 : 0
      }

      this.$http.post(`${this.market_server}v1.0/csd/work_order/finish`, option).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });

        if (res.code === 200) {
          this.getDateList()
          this.detail_Record_change = true
        }
      })
    },
    handleCloseRecord (params) {
      let { isCreated, createdType, content } = params
      this.followRecord_visible = false
      this.followRecord = content
      if (createdType == 'doing') {
        this.add_visible = true
      }
      if (createdType == 'finish') {
        this.sureEnd_info = {
          payer: content.payer,
          payer_org_name: content.payer_org_name
        }
        this.currentMethod = 'addRecord'
        this.sureEnding_visible = true
      }

    },
    // 查看详情
    tableDblClick (row) {
      this.currentRow = row
      this.detail_info = {
        currentId: row.id,
        chosenTag: this.chooseTab, // 338 已完成
        currentRow: this.currentRow
      }
      this.detail_visible = true;
    },
    handleChangeDetail () {
      this.detail_Record_change = false
    },
    // 关闭详情
    handleCloseDetail (params) {
      let { type, close, detail } = params
      if (detail) this.detail_form = detail;


      if (type == '转交') {
        this.transfer_visible = true
      }
      if (type == '通知') {
        this.handleCuiBan(this.currentRow)
      }
      if (type == '结束') {
        this.handleEnd()
      }
      if (type == '新增跟进') {
        this.followRecord_info = {
          chooseTab: this.chooseTab,
          type_name: this.detail_form.type_name
        }
        this.followRecord_visible = true
      }
      if (type == 'close') {
        this.detail_visible = false;
        this.currentRow = null
        this.detail_form = null
      }
    },
    // 转交
    handleCloseTranfer () {
      this.transfer_visible = false
    },
    //结束
    handleEnd () {
      this.sureEnd_info = {
        payer: this.detail_form.payer,
        payer_org_name: this.detail_form.payer_org_name
      }
      this.currentMethod = 'ending'
      this.sureEnding_visible = true
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.getDateList()
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = maintenanceSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1
        this.params = val
        this.getDateList()
      }
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/maintenance/index.scss";
</style>
