<template>
  <div id='HousingDue'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>房屋到期</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain>收房</el-button>
        <el-button type="primary" plain>租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData.housingDue.tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @cell-click="tableClickRow" header-row-class-name="tableHeader"
        style="width: 100%">

        <el-table-column align="center" label="标记" v-if='chooseTab == 2'>
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p v-if='scope.row.status'>{{tableSettingData.housingDue.status[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-for="item in Object.keys(tableSettingData.housingDue.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.housingDue.showData[item]">
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='chooseTab == 1 || chooseTab ==2' width='300'>
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click.stop="handleAddRecord(scope.row)" v-if='chooseTab == 1'>添加标记</el-button>
            <el-button type="warning" plain size="mini" @click.stop="handleAddRecord(scope.row)" v-if='chooseTab == 2'>查看标记</el-button>
            <el-button type="primary" plain size="mini" @click.stop="handleAddRecord(scope.row)" v-if='chooseTab == 2'>修改标记</el-button>
            <el-button type="success" plain size="mini" @click.stop="handleAddRecord(scope.row)" v-if='chooseTab == 2'>发送代办</el-button>
          </template>
        </el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.housingDue.params.page"
            :page-size="tableSettingData.housingDue.params.limit" :total="tableSettingData.housingDue.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue';
import MenuList from '../../common/menuList.vue';
import { housingDueSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
export default {
  name: 'index',
  components: {
    SearchHigh,
    MenuList
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      selects: [
        {
          id: 1,
          title: '待标记'
        },
        {
          id: 2,
          title: '已标记'
        },
        {
          id: 3,
          title: '已完成'
        },
        {
          id: 4,
          title: '超期'
        }
      ],
      chooseTab: 1,
      showSearch: false,
      searchData: {
        status: 'housingDue',
        data: [],
      },
      tableSettingData: {
        housingDue: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            endTime: '到期时间',
            ContractNo: '合同编号',
            address: '地址',
            name: '房东姓名',
            contact: '联系方式',
            price: '收房价格',
            payType: '付款方式',
            openPer: '开单人',
            handler: '负责人',
            department: '部门',
          },
          tableData: [],
          status: {
            1: '退租',
            2: '续租',
          },
          chooseRowIds: [],
          currentSelection: {}//当前选择行
        },
        goods: {
          counts: 0,
          params: {
            search: '',
            page: 1,
            limit: 8,
          },
          chooseRowIds: [],
          currentSelection: {},//当前选择行,
          multiSelection: [],//多选行
          isShowMulti: false,//是否显示多选
        },
      },
      chooseRowIds: [],
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          endTime: '2019-03-28',
          ContractNo: '10086',
          address: '地址',
          name: '房东姓名',
          contact: '联系方式',
          price: '收房价格',
          payType: '付款方式',
          openPer: '开单人',
          handler: '负责人',
          department: '部门',
          status: 2
        };
        this.tableSettingData.housingDue.tableData.push(obj);
      }
    },
    //切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
      }
    },
    //高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = housingDueSearch;
    },
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    // 当前点击
    tableClickRow (row) {
      this.tableSettingData[this.currentTable].currentSelection = row;
      let ids = this.tableSettingData[this.currentTable].chooseRowIds;
      ids.push(row.id);
      this.ids = this.myUtils.arrayWeight(ids);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
    //表格某一行双击
    tableDblClick (row) {
      console.log(row);
      //this.in_workOrder_table_visible = true;
    },
    //footer
    handleSizeChange (val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.tableSettingData.visitToRecord.params.page = val;
      switch (this.currentTable) {
        case 'workOrder':
          this.getRepositoryList();
          break;
        case 'goods':
          this.getGoodsList();
          break;
        default:
          break;
      }
      //this.getRepositoryList();
      //console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/housingDue/index.scss";
</style>


