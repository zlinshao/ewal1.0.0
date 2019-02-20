<template>
  <div id="workOrder">
    <div class="orderTop items-bet">
      <div class="items-center orderTopLeft">
        <p class="flex-center" @click="customModule">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center orderTopRight">
        <p class="flex-center"><b>+</b></p>
        <p @click="highSearch"></p>
      </div>
    </div>
    <div class="orderList">
      <el-table
        :data="tableData"
        height="100%"
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
              <p>{{statuss[scope.row.status]}}</p>
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
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <menu-list :menu-visible="showList" @close="showList = false"></menu-list>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue'
  import MenuList from '../components/menu-list';

  export default {
    name: "index",
    components: {SearchHigh, MenuList},
    data() {
      return {
        showList: false,
        chooseTab: 1,
        showSearch: false,
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
        statuss: {
          1: '特急',
          2: '紧急',
          3: '重要',
          4: '一般',
        },
        showData: {
          date: '日期',
          name: '姓名',
          address: '地址',
        },
        chooseRowIds: [],
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
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 23,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 33,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ],
        searchData: {
          status: 'workOrder',
          keywords: 'keywords',
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
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
      },
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
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
        ];
      },
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
      // 客服入口
      customModule() {
        this.showList = true;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/customService/workOrder/index.scss";

  @mixin workOrderImg($m, $n) {
    $url: '../../../assets/image/customService/workOrder/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #workOrder {
      .orderTop {
        .orderTopRight {
          p:last-of-type {
            @include bgImage('../../../assets/image/customService/theme1/search.png');
          }
        }
      }
      .orderList {
        .status1 {
          p {
            color: $colorFFF;
            @include workOrderImg('teji.png', 'theme1');
          }
        }
        .status2 {
          p {
            color: #FFAD0D;
            @include workOrderImg('jinji.png', 'theme1');
          }
        }
        .status3 {
          p {
            color: #0C66FF;
            @include workOrderImg('zhongyao.png', 'theme1');
          }
        }
        .status4 {
          p {
            color: $color874;
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
