<template>
  <div id="visitToRecord">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center">
          <b>...</b>
        </p>
        <h1>回访记录</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain>待回访</el-button>
        <el-button type="primary" plain>二次回访</el-button>
        <el-button type="primary" plain>多次回访</el-button>
        <el-button type="danger" plain>已完成</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>

    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData.visitToRecord.tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @cell-click="tableClickRow" header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column v-for="item in Object.keys(tableSettingData.visitToRecord.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.visitToRecord.showData[item]">
        </el-table-column>
      </el-table>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import { visitToRecordSearch } from '../../../assets/js/allSearchData.js';
export default {
  name: "index",
  components: {
    SearchHigh
  },
  data () {
    return {
      chooseTab: 1,
      selects: [
        {
          id: 1,
          title: '收房',
        },
        {
          id: 2,
          title: '租房',
        }
      ],
      showSearch: false,
      searchData: {
        status: 'visitToRecord',
        data: [],
      },
      tableSettingData: {
        visitToRecord: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            signTime: '签约时间',
            ContractNo: '合同编号',
            address: '地址',
            contractTime: '合约时长',
            openPer: '开单人',
            handler: '负责人',
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
    }
  },
  methods: {
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
      }
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = visitToRecordSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    //table
    // 当前点击
    tableClickRow (row) {
      let ids = this.chooseRowIds;
      ids.push(row.id);
      this.chooseRowIds = this.myUtils.arrayWeight(ids);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/visitToRecord/index.scss";
</style>
