<template>
  <div id="budgetStream">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>收支流水</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons bank" @click="handleOpenBankRun"></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          align="center"
          label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p>{{status[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="100"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <lj-dialog
      :visible="bank_run_visible"
      :size="bank_run_size"
      @close="bank_run_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>银行流水</h3>
          <div>
            <div class="icons"><b>+</b></div>
            <div class="icons search"></div>
          </div>
        </div>
        <div class="dialog_main">
          <el-table
            :data="bank_run_data"
          >
            <el-table-column prop="time" label="导入时间" align="center"></el-table-column>
            <el-table-column prop="ci" label="流水导入批次" align="center"></el-table-column>
            <el-table-column prop="num" label="包含账户数量" align="center"></el-table-column>
            <el-table-column prop="run_num" label="流水数量" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
            <el-table-column prop="" label="操作" align="center" min-width="120px">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" plain>补充/移除</el-button>
                <el-button size="mini" type="danger" plain>归档</el-button>
                <el-button size="mini" type="primary" plain>详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue'
  import FinMenuList from '../components/finMenuList.vue'
  import LjDialog from '../../common/lj-dialog';

  export default {
    name: "index",
    components: {SearchHigh, FinMenuList,LjDialog},
    data() {
      return {
        bank_run_visible: false,
        bank_run_size: '',
        bank_run_data: [
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
          {time: '2019-01-01 15:12',ci: '4627894612847682746',num: 122,run_num: 1212,operator: '冯宝宝'},
        ],
        showFinMenuList: false,
        chooseTab: 1,
        selects: [
          {
            id: 1,
            title: '流水',
          },
          {
            id: 2,
            title: '回滚',
          },
          {
            id: 3,
            title: '归档',
          }
        ],

        tableData: [
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 1,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 23,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 33,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 1,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 1,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 23,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 33,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 1,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 2,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ],
        status: {
          1: '收入',
          2: '支出',
        },
        showData: {
          date: '日期',
          name: '姓名',
          address: '地址',
        },
        chooseRowIds: [],

        showSearch: false,
        searchData: {
          status: 'budgetStream',
          data: [],
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleOpenBankRun() {
        this.bank_run_size = 'large';
        this.bank_run_visible = true;
      },
      // tab切换
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
      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData.data = [
          {
            keyType: 'date',
            title: '出生日期',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: '',
          },
          {
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '特级',
              },
              {
                id: 13,
                title: '紧急',
              },
              {
                id: 14,
                title: '重要',
              },
              {
                id: 15,
                title: '一般',
              }
            ],
          },
          {
            keyType: 'check',
            title: '状态',
            keyName: 'check',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
        ];
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/budgetStream/index.scss";

  @mixin budgetStreamImg($m, $n) {
    $url: '../../../assets/image/finance/budgetStream/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #budgetStream {
      .mainListTable {
        .status {
          color: $colorFFF;
        }
        .status1 {
          p {
            @include budgetStreamImg('shouru.png', 'theme1');
          }
        }
        .status2 {
          p {
            @include budgetStreamImg('zhichu.png', 'theme1');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #budgetStream {

    }
  }

  #theme_name.theme3 {
    #budgetStream {

    }
  }

  #theme_name.theme4 {
    #budgetStream {

    }
  }
</style>
