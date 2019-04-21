<template>
  <div id="workOrder">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click='createOrder_visible = true'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableDblClick"
        header-row-class-name="tableHeader" style="width: 100%" :key='"orderTable"+chooseTab'>
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['emergency' + scope.row.emergency]">
              <p>{{scope.row.emergency_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop='create_time'></el-table-column>
        <el-table-column align="center" label="工单编号" prop='num'></el-table-column>
        <el-table-column align="center" label="类型" prop='type_name'></el-table-column>
        <el-table-column align="center" label="地址" prop='house_name'></el-table-column>
        <el-table-column align="center" label="内容" prop='content'></el-table-column>
        <el-table-column align="center" label="截止时间" prop='finish_time'></el-table-column>
        <el-table-column align="center" label="处理人" prop='operate_user_name'></el-table-column>
        <el-table-column align="center" label="创建人" prop='create_name'></el-table-column>
        <el-table-column align="center" label="部门" prop='org_name'></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button type="warning" plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
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
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <MenuList :list="customService" :module="visibleStatus" :backdrop=true @close="visibleStatus = false"></MenuList>

    <!--新增跟进记录-->
    <LjDialog :visible="followRecord_visible" :size="{width: 720 + 'px',height: 480 + 'px'}" @close="handleCloseAddNewRecord">
      <div class="dialog_container followRecord">
        <div class="dialog_header">
          <h3>新增跟进记录</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='80px'>
            <el-row :gutter="10" width='100%'>
              <el-col :span="12">
                <el-form-item label="工单状态">
                  <el-radio v-model="followRecord.type" label="1">跟进中</el-radio>
                  <el-radio v-model="followRecord.type" label="2">已完成</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if='chooseTab !== 338 && followRecord.type == 2'>
                <el-form-item label="投诉有效性">
                  <el-radio v-model="followRecord.emergency" label="1">有效</el-radio>
                  <el-radio v-model="followRecord.emergency" label="2">无效</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord.type == 1'>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select v-model="followRecord.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='chooseTab !==338 && followRecord.type == 2' v-for='(com,index) in followRecord.pay_method'
              :key='"comp"+index'>
              <el-col :span="8">
                <el-form-item label="认责人">
                  <el-select placeholder="请选择" v-model='com.type'>
                    <el-option v-for='label in complainedType' :key='label.label' :value='label.value' :label="label.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="handlerOrgan('add_record_renze',index)" readonly v-model="com.name" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="认责金额" class='record_money'>
                  <el-input placeholder="请填写" v-model='com.money'></el-input>
                  <i class='icons icon_add' v-if='index == 0' @click='addComplaintsType'></i>
                  <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="跟进记录">
                  <el-input placeholder="请填写" type='textarea' v-model="followRecord.note"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="上传图片">
                  <Ljupload size='40' v-model='followRecord.album'></Ljupload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleAddNewRecord">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseAddNewRecord">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--工单详情-->
    <OrderDetail :visible="detail_visible" @close="handleCloseDetail" :moduleData='detail_info' />
    <!--新建工单-->
    <CreateOrder :visible='createOrder_visible' @close="handleCloseOrder" />
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan" />
    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart" />

    <!-- 催办 -->
    <UrgedDealDialog :visible="urgedDeal_visible" @close="handleCloseUrgedDeal" :moduleData='urgedDeal_info' />
    <!-- 转交 -->
    <TransferDialog :visible='transfer_visible' :data="currentRow" @close='handleCloseTranfer' />
    <!--确定结束-->
    <SureEndDialog :visible="sureEnding_visible" @close="handleCloseSure" :moduleData='sureEnd_info' />
    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete' />
    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd' />
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import { workOrderSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import DeleteDialog from '../components/delete-dialog';
import AddDialog from '../components/add-dialog';

import TransferDialog from '../components/transfer-dialog';
import SureEndDialog from '../components/sureEnd-dialog';
import UrgedDealDialog from '../components/urgedDeal-dialog';
import OrderDetail from './components/order-detail';
import CreateOrder from './components/createOrder'
import LjDialog from '../../common/lj-dialog.vue';

import StaffOrgan from '../../common/staffOrgan.vue'
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'

export default {
  name: "index",
  components: {
    SearchHigh,
    MenuList,
    DeleteDialog,
    AddDialog,
    LjDialog,
    StaffOrgan,
    DepartOrgan,
    Ljupload,
    TransferDialog,
    SureEndDialog,
    UrgedDealDialog,
    OrderDetail,
    CreateOrder
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      showSearch: false, // 显示高级搜索
      searchData: { // 高级搜索参数
        status: 'workOrder',
        data: []
      },
      searchParams: {  //高级搜索
        create_time: [],
        department: [],
        emergency: '',
        end_time: [],
        search: '',
        staff: [],
        type: ''
      },
      currentPage: 1,//当前页
      chooseTab: 336, //待处理 跟进中 已完成
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
      market_server: globalConfig.market_server,

      //tableList
      tableData: [],
      tableDateCount: 0,
      currentRow: null,
      orderTypeObj: {
        1: '报销',
        2: '核实信息',
        3: '催缴',
        4: '续租',
        5: '调房',
        6: '退租',
        697: '报修',
        698: '转租',
        699: '投诉',
        700: '其他'
      },
      //删除row
      delete_visible: false,
      // 增加
      add_visible: false,
      //催办
      urgedDeal_visible: false,
      urgedDeal_info: {
        work_order_id: '',
        default_Person: ''
      },
      //创建新工单
      createOrder_visible: false,

      departModule: false, //部门选择
      departData: {
        dataType: '',
        num: 1,
      },
      staffModule: false, // 选择人员
      organData: {
        num: 1
      },
      currentStaff: '',//当前选择人员的对象
      currentOrg: '',//当前选择部门的对象

      complaintsType: [
        {
          label: 'A类原则性投诉',
          value: 1
        },
        {
          label: 'B类重大投诉',
          value: 2
        },
        {
          label: 'C类一般性投诉(被动)',
          value: 3
        },
        {
          label: 'D类一般性投诉(主动)',
          value: 4
        },
      ],
      complaintsChannels: [
        {
          label: '400客服',
          value: 1
        },
        {
          label: '回访',
          value: 2
        },
        {
          label: '微信',
          value: 3
        },
        {
          label: '微博',
          value: 4
        },
        {
          label: '贴吧',
          value: 5
        }
      ],
      sureEnd_info: {
        payer: '',
        payer_org_name: ''
      },

      // ================
      // 工单详情
      detail_visible: false,
      detail_info: {
        currentId: null,
        chosenTag: null
      },
      detail_form: null,
      //新增跟进记录
      followRecord_visible: false,
      followRecord: {
        type: '',
        emergency: '',
        note: '',
        pay_method: [
          {
            id: '',
            type: '',
            name: '',
            money: ''
          }
        ],
        album: []
      },
      complainedType: [
        {
          label: '业务员',
          value: 0
        },
        {
          label: '片区经理',
          value: 1
        },
        {
          label: '房东',
          value: 2
        },
        {
          label: '现租客',
          value: 3
        },
        {
          label: '公司',
          value: 4
        },
        {
          label: '前租客',
          value: 5
        }
      ],
      currentMethod: null, // 记录当前操作

      transfer_visible: false,  // 转交
      sureEnding_visible: false, // 确定结束
      currentIndex: null
    }
  },
  mounted () {
    this.getDataList();
  },
  watch: {
    createOrder: {
      handler (newVal) {
        if (newVal.type == 699 || newVal.type == 1) {
          this.createOrder_span = 6
        } else {
          this.createOrder_span = 8
        }
      },
      deep: true
    },
  },
  computed: {},
  methods: {
    getDataList () {
      this.showLoading(true);
      let params = {
        type: this.searchParams.type || 0,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.searchParams.search,
        create_time: this.searchParams.create_time,
        finish_time: this.searchParams.end_time,
        operate_user_id: this.searchParams.staff,
        operate_org_id: this.searchParams.department,
        emergency: this.searchParams.emergency,
      }

      this.$http.get(this.market_server + `v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDateCount = res.data.all_count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = workOrderSearch
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1;
        this.searchParams = val
        this.getDataList()
      }
    },
    // 切换 待处理 跟进中 已完成
    changeTabs (id) {
      if (this.chooseTab != id) {
        this.chooseTab = id;
        this.getDataList()
      }
    },
    // 关闭 添加工单
    handleCloseOrder (params) {
      let { visible, method } = params
      this.createOrder_visible = false
      if (method != 'cancle') {
        this.getDataList()
      }
    },
    // 催办
    handleCuiBan (row) {
      this.urgedDeal_info = {
        work_order_id: row.id,
        default_Person: row.create_name || row.operate_user_name
      }
      this.urgedDeal_visible = true
      this.currentRow = row
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      this.urgedDeal_visible = false
      this.currentRow = null
      this.detail_form = null
      this.urgedDeal_info = {
        work_order_id: '',
        default_Person: ''
      }
    },
    // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      if (val) { //确定删除
        this.$http.delete(`${this.market_server}v1.0/csd/work_order/delete/${this.currentRow.id}`).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.delete_visible = false
            this.getDataList()
          }
        })
      } else {
        this.currentRow = null
        this.delete_visible = false
      }

    },
    handlerOrgan (params, index) {
      this.staffModule = true
      this.currentStaff = params
      this.currentIndex = index || 0
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentStaff == 'add_record_renze') {
          this.followRecord.pay_method[this.currentIndex].name = names
          this.followRecord.pay_method[this.currentIndex].id = ids
        } else {
          this.createOrder[this.currentStaff] = {
            name: names,
            id: ids
          }
        }
        this.currentIndex = 0
        this.currentStaff = ''
      }
    },
    handlerDepart (params) {
      this.departModule = true
      this.currentOrg = params
    },
    // 关闭 选择部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        this.createOrder[this.currentOrg] = {
          name: str,
          id: ids
        }
        this.currentOrg = ''
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDataList()
    },
    // 双击 详情
    tableDblClick (row) {
      //判断工单类型
      this.currentRow = row
      this.detail_info = {
        currentId: row.id,
        chosenTag: this.chooseTab,
        currentRow: this.currentRow
      },
        this.detail_visible = true;
    },
    handleCloseDetail (params) {
      let { type, close } = params
      this.detail_visible = false;
      if (type == '转交') {
        this.transfer_visible = true
      }
      if (type == '通知') {
        this.handleCuiBan(this.currentRow)
      }
      if (type == '结束') {
        this.detail_form = params.detail
        this.handleEnd()
      }
    },
    // 转交
    handleCloseTranfer (transfer) {
      this.transfer_visible = false
      this.currentRow = null
      this.detail_form = null
    },
    // 通知
    handleNotice () {
      this.detail_visible = false
      this.handleCuiBan(this.currentRow)
    },
    //结束
    handleEnd () {
      console.log(this.detail_form)
      this.sureEnd_info = {
        payer: this.detail_form.payer,
        payer_org_name: this.detail_form.payer
      }
      this.sureEnding_visible = true
    },
    handleCloseSure (params) {
      let { isSure, isCreated } = params
      if (isSure) {

        // 跟进工单中的结束
        if (this.currentMethod == 'addRecord') {
          this.addRecordFun(isSure)
          return
        }

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
            this.sureEnding_visible = false
            this.currentRow = null
            this.detail_form = null
            this.getDataList()
          }
        })

      } else {
        this.sureEnding_visible = false
        this.currentRow = null
        this.detail_form = null
      }
    },
    handleAddRecord () {
      this.followRecord_visible = true
      this.detail_visible = false
    },

    // 新增记录
    handleAddNewRecord () {
      this.followRecord_visible = false
      this.currentMethod = 'addRecord'
      if (this.followRecord.folow_status == 337) {
        this.add_visible = true
      } else {
        this.sureEnding_visible = true
      }
    },
    addRecordFun (par) {
      let { isSure, isCreate } = params
      if (isSure) {
        let params = this.followRecord,
          pay_method = [];
        if (params.type == 2) {
          params.pay_method.forEach(el => {
            pay_method.push([el.type || '', el.name || '', el.money || ''])
          });
        }
        params.pay_method = pay_method
        params.work_order_id = this.currentRow.id

        this.$http.post(`${this.market_server}v1.0/csd/work_order/follow`, params).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });

          this.add_visible = false
        })
      } else {
        this.add_visible = false
      }

      this.followRecord = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        pay_method: [
          {            type: '',
            name: '',
            money: ''          }
        ]
      }
    },
    //确认添加
    handleCloseAdd (params) {
      if (this.currentMethod == 'addRecord') {
        this.addRecordFun(params)
      }
      this.currentMethod = null
    },
    handleCloseAddNewRecord () {
      this.followRecord_visible = false
      this.detail_form = null
      this.followRecord = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        ablum: [],// 上传图片
        pay_method: [
          {            type: '',
            name: '',
            money: ''          }
        ]
      }
    },
    addComplaintsType () {
      this.followRecord.pay_method.push({
        id: '',
        type: '',
        name: '',
        money: ''
      })
    },
    delComplaintsType (index) {
      this.followRecord.pay_method.splice(index, 1)
    },

    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    }
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/workOrder/index.scss";

@mixin workOrderImg($m, $n) {
  $url: "../../../assets/image/customService/workOrder/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #workOrder {
    .mainListTable {
      .status1 {
        p {
          color: $colorFFF;
          @include workOrderImg("teji.png", "theme1");
        }
      }
      .status2 {
        p {
          color: #ffad0d;
          @include workOrderImg("jinji.png", "theme1");
        }
      }
      .status3 {
        p {
          color: #0c66ff;
          @include workOrderImg("zhongyao.png", "theme1");
        }
      }
    }
  }
}

#theme_name.theme2 {
  #workOrder {
  }
}

#theme_name.theme3 {
  #workOrder {
  }
}

#theme_name.theme4 {
  #workOrder {
  }
}
</style>
