<template>
  <div id="workOrder">
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
        <div class="icons add"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData['workOrder'].tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @cell-click="tableClickRow" header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p>{{tableSettingData.workOrder.status[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="item in Object.keys(tableSettingData.workOrder.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.workOrder.showData[item]">
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.workOrder.params.page"
            :page-size="tableSettingData.workOrder.params.limit" :total="tableSettingData.workOrder.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import { workOrderSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';

export default {
  name: "index",
  components: { SearchHigh, MenuList },
  data () {
    return {
      workOrderSearch,
      customService,
      visibleStatus: false,
      chooseTab: 1,
      selects: [
        {
          id: 1,
          title: '待处理',
        },
        {
          id: 2,
          title: '跟进中',
        },
        {
          id: 3,
          title: '已完成',
        }
      ],


      currentTable: 'workOrder',
      tableSettingData: {
        workOrder: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            createTime: '创建时间',
            workOrderId: '工单编号',
            type: '类型',
            address: '地址',
            content: '内容',
            endTime: '截至时间',
            handler: '处理人',
            createUser: '创建人',
            department: '部门',
          },
          tableData: [],
          status: {
            1: '特急',
            2: '紧急',
            3: '重要',
            4: '一般',
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

      showSearch: false,
      searchData: {
        status: 'workOrder',
        data: [],
      },
    }
  },
  mounted () {
    this.initData();
  },
  activated () {
  },
  watch: {},
  computed: {},
  methods: {

    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          status: '1',
          createTime: '2019-03-28',
          workOrderId: '10086',
          type: '维修',
          address: '地址',
          content: '内容',
          endTime: '2019-04-25',
          handler: '处理人',
          createUser: '创建人',
          department: '部门',
        };
        this.tableSettingData[this.currentTable].tableData.push(obj);
      }
    },



    /*// tab切换
    changeTabs(id) {
      this.chooseTab = id;
    },
    // 当前点击
    tableClickRow(row) {
      let ids = this.chooseRowIds;
      ids.push(row.id);
      this.chooseRowIds = this.myUtils.arrayWeight(ids);
    },
    // 点击过
    tableChooseRow({row, rowIndex}) {
      return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },*/
    // 当前点击
    tableClickRow (row) {
      this.tableSettingData[this.currentTable].currentSelection = row;
      let ids = this.tableSettingData[this.currentTable].chooseRowIds;
      ids.push(row.id);
      this.ids = this.myUtils.arrayWeight(ids);
    },

    //表格某一行双击
    tableDblClick (row) {
      console.log(row);
      //this.in_workOrder_table_visible = true;
    },
    //table多选时触发的事件
    handleSelectionChange (val) {
      switch (this.currentTable) {
        case 'workOrder':
          console.log('re' + val);
          break;
        case 'goods':
          this.tableSettingData[this.currentTable].multiSelection = val;
          break;
        default:
          break;
      }
      console.log(val);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
    handleSizeChange (val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {

      this.tableSettingData[this.currentTable].params.page = val;
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







    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = workOrderSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
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
