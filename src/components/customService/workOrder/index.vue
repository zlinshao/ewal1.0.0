<template>
  <div id="workOrder">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>工单管理</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
            <b v-if='item.id == 337 && isDoing_count > 0'>{{isDoing_count}}</b>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div v-if="$storage.get('VALIDATE_PERMISSION')['Order-Operate']" class="icons add" @click='createOrder_visible = true'><b>+</b></div>
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
         <el-table-column show-overflow-tooltip label="创建时间" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.create_time || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="工单编号" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.num || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-for='item in Object.keys(tableShowData)' :key='item' :prop='item' :label="tableShowData[item]"></el-table-column>
<el-table-column show-overflow-tooltip label="地址" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.house_name || '--'}}</span>
          </template>
        </el-table-column>
         <el-table-column show-overflow-tooltip label="内容" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.content || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="截止时间" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.expected_finish_time || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="处理人" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.operate_user_name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="创建人" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.create_name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="部门" align="center">
          <template slot-scope="scope">
            <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.operate_org_name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="$storage.get('VALIDATE_PERMISSION')['Order-Operate']" width="180" align="center" label="操作">
          <template slot-scope="scope">
            <el-button id='active-primary' size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button id='active-danger' plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
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
    <!-- 高级搜索 -->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule" />
    <!-- 新建工单 -->
    <CreateOrder :visible='createOrder_visible' @close="handleCloseOrder" />
    <!-- 工单详情 -->
    <OrderDetail :visible="detail_visible" @close="handleCloseDetail" :chooseTab='chooseTab' :moduleData='detail_info' :change='detail_Record_change'
      @changDetail="handleChangeDetail" />
    <!--新增跟进记录-->
    <AddRecord :visible='followRecord_visible' :moduleData='followRecord_info' @close='handleCloseRecord' />
    <!-- 催办 -->
    <UrgedDealDialog :visible="urgedDeal_visible" @close="handleCloseUrgedDeal" :moduleData='urgedDeal_info' />
    <!-- 转交 -->
    <TransferDialog :visible='transfer_visible' :data="currentRow" @close='handleCloseTranfer' />
    <!-- 确定结束 -->
    <SureEndDialog :visible="sureEnding_visible" @close="handleCloseSure" :moduleData='sureEnd_info' />
    <!-- 确定删除 -->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete' />
    <!-- 确定增加 -->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd' />
    <!-- 导航 -->
    <MenuList :list="customService" :module="visibleStatus" :backdrop=true @close="visibleStatus = false" />
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import LjDialog from '../../common/lj-dialog.vue';
import DeleteDialog from '../components/delete-dialog';
import AddDialog from '../components/add-dialog';
import TransferDialog from '../components/transfer-dialog';
import SureEndDialog from '../components/sureEnd-dialog';
import UrgedDealDialog from '../components/urgedDeal-dialog';
import OrderDetail from '../components/order-detail';
import CreateOrder from '../components/createOrder'
import AddRecord from '../components/addRecord'
import { workOrderSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';

export default {
  name: "index",
  components: {
    SearchHigh,
    MenuList,
    LjDialog,
    DeleteDialog,
    AddDialog,
    AddRecord,
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
      tableData: [],
      tableShowData: {
        // create_time: '创建时间',
        // num: '工单编号',
        type_name: '类型',
        // house_name: '地址',
        // content: '内容',
        // finish_time: '截止时间',
        // operate_user_name: '处理人',
        // create_name: '创建人',
        // org_name: '部门'
      },
      tableDateCount: 0,
      currentRow: null,
      delete_visible: false, //删除row
      add_visible: false,  // 增加
      urgedDeal_visible: false,// 催办
      urgedDeal_info: {
        work_order_id: '',
        default_Person: '',
        uid: ''
      },
      createOrder_visible: false, //创建新工单 
      sureEnding_visible: false, // 确定结束
      sureEnd_info: {
        payer: '',
        payer_org_name: ''
      },
      // 工单详情
      detail_visible: false,
      detail_Record_change: false,
      detail_info: {
        currentId: null,
        chosenTag: null
      },
      detail_form: null,
      //新增跟进记录
      followRecord_visible: false,
      followRecord: null,
      followRecord_info: {
        work_id: null,
        chooseTab: null
      },
      currentMethod: null, // 记录当前操作
      transfer_visible: false,  // 转交
      isDoing_count: 0,
    }
  },
  mounted () {
    this.getDoingCount()
    this.getDataList();
  },
  methods: {
    getDoingCount () {
      this.$http.get(this.market_server + `v1.0/csd/work_order/readFollowNum?type=${this.searchParams.type || 0}`).then(res => {
        if (res.code == 200) {
          this.isDoing_count = res.data.join(',')
        }
      })
    },
    //获取工单管理列表
    getDataList () {
      if(!this.validatePermission('Order-Read')) return;
      this.showLoading(true);
      let params = {
        type: this.searchParams.type || 0,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.searchParams.search,
        create_time: this.searchParams.create_time,
        follow_time: this.searchParams.end_time,
        operate_user_id: this.searchParams.staff,
        operate_org_id: this.searchParams.department,
        emergency: this.searchParams.emergency,
      }

      this.$http.get(this.market_server + `v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          let data = res.data.data;
          if (data.length == 0 && this.currentPage != 1) {
            this.currentPage--;
            this.getDataList()
          } else {
            this.tableData = res.data.data;
            this.tableDateCount = res.data.all_count;
            this.showLoading(false)
          }
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
          this.showLoading(false)
        }
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
        this.getDoingCount()
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
      let { visible, method } = params;
      // console.log('3333333333333333333333', visible, method)
      this.createOrder_visible = false;
      if (method != 'cancle') {
        this.getDataList()
      }
    },
    // 催办
    handleCuiBan (row) {
      this.urgedDeal_info = {
        work_order_id: row.id,
        default_Person: row.create_name || row.operate_user_name,
        uid: row.creator_id ||row.operate_user_id
      }
      this.urgedDeal_visible = true
      this.currentRow = row
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      this.urgedDeal_visible = false
      this.urgedDeal_info = {
        work_order_id: '',
        default_Person: '',
        uid: ''
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
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDataList()
    },
    // 双击 详情
    tableDblClick (row) {
      this.currentRow = row
      this.detail_info = {
        currentId: row.id,
        chosenTag: this.chooseTab,
        currentRow: this.currentRow
      }
      this.detail_visible = true;
      // console.log(' this.detail_visible',  this.detail_visible);
      if (this.chooseTab == 337) {
        this.getDoingCount()
      }
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
      console.log('type------', type)
      if (type == "close") {
        this.currentRow = null
        this.detail_form = null
        this.detail_info={
          currentId: '',
        chosenTag: {},
        currentRow: {}
        };
        this.detail_visible = false
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
        if (res.code === 200) {
          this.getDataList()
          this.detail_visible=false
          this.detail_Record_change = true
           this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });
        }else {
           this.$LjNotify('warning', {
          title: '提示',
          message: res.message
        });

        }
      })
    },
    handleChangeDetail () {
      this.detail_Record_change = false
    },
    // 新增记录
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
    //确认添加
    handleCloseAdd (params) {
      this.add_visible = false
      params.isSure && this.addRecordFun(params)
      this.currentMethod = null
    },
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
