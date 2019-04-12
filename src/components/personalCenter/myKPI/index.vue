<template>
  <div id="my_KPI">
    <div class="my-kpi-container">
      <div class="my-kpi-toolbar">
        <div v-for="item in toolbarList" @click="switchToolbar(item.id)" :class="{checked:toolbarChoosed==item.id}"
             class="my-kpi-toolbar-item">{{item.name}}
        </div>
      </div>
      <!--<span @click="tableSettingData.weekly.table_dialog_visible = true">测试</span>-->
      <div class="my-kpi-table-container">
        <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
          <div v-show="toolbarChoosed==1" class="table-weekly">
            <el-table
              :data="tableSettingData.weekly.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'weekly')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="item in Object.keys(tableSettingData.weekly.showData)" :key="item"
                align="center"
                :prop="item"
                :label="tableSettingData.weekly.showData[item]">
              </el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
              <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="tableSettingData.weekly.params.page"
                  :page-size="tableSettingData.weekly.params.limit"
                  :total="tableSettingData.weekly.counts"
                  layout="total,jumper,prev,pager,next">
                </el-pagination>
              </div>
            </footer>
          </div>

          <div v-show="toolbarChoosed==2" class="table-monthly">
            <el-table
              :data="tableSettingData.monthly.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'monthly')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="item in Object.keys(tableSettingData.monthly.showData)" :key="item"
                align="center"
                :prop="item"
                :label="tableSettingData.monthly.showData[item]">
              </el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
              <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="tableSettingData.monthly.params.page"
                  :page-size="tableSettingData.monthly.params.limit"
                  :total="tableSettingData.monthly.counts"
                  layout="total,jumper,prev,pager,next">
                </el-pagination>
              </div>
            </footer>
          </div>


          <div v-show="toolbarChoosed==3" class="table-quarter">
            <el-table
              :data="tableSettingData.quarter.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'quarter')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="item in Object.keys(tableSettingData.quarter.showData)" :key="item"
                align="center"
                :prop="item"
                :label="tableSettingData.quarter.showData[item]">
              </el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
              <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="tableSettingData.quarter.params.page"
                  :page-size="tableSettingData.quarter.params.limit"
                  :total="tableSettingData.quarter.counts"
                  layout="total,jumper,prev,pager,next">
                </el-pagination>
              </div>
            </footer>
          </div>

          <div v-show="toolbarChoosed==4" class="table-halfyear">
            <el-table
              :data="tableSettingData.halfYear.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'halfYear')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="item in Object.keys(tableSettingData.halfYear.showData)" :key="item"
                align="center"
                :prop="item"
                :label="tableSettingData.halfYear.showData[item]">
              </el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
              <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="tableSettingData.halfYear.params.page"
                  :page-size="tableSettingData.halfYear.params.limit"
                  :total="tableSettingData.halfYear.counts"
                  layout="total,jumper,prev,pager,next">
                </el-pagination>
              </div>
            </footer>
          </div>

          <div v-show="toolbarChoosed==5" class="table-year">
            <el-table
              :data="tableSettingData.year.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'year')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="item in Object.keys(tableSettingData.year.showData)" :key="item"
                align="center"
                :prop="item"
                :label="tableSettingData.year.showData[item]">
              </el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
              <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="tableSettingData.year.params.page"
                  :page-size="tableSettingData.year.params.limit"
                  :total="tableSettingData.year.counts"
                  layout="total,jumper,prev,pager,next">
                </el-pagination>
              </div>
            </footer>
          </div>
        </div>
      </div>

    </div>



    <lj-dialog
      :size="{width:'70%',height:'80%'}"
      :visible="tableSettingData.weekly.table_dialog_visible"></lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '@/components/common/lj-dialog.vue';


  export default {
    name: "myKPI",
    components: {
      LjDialog
    },
    data() {
      return {
        url: globalConfig.humanResource_server,

        toolbarChoosed: 1,
        toolbarList: [
          {
            id: 1,
            name: '周度考核'
          },
          {
            id: 2,
            name: '月度考核'
          },
          {
            id: 3,
            name: '季度考核'
          },
          {
            id: 4,
            name: '半年度考核'
          },
          {
            id: 5,
            name: '年度考核'
          },
        ],

        currentTable: 'weekly',
        tableSettingData: {
          weekly: {
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            showData: {
              name: '姓名',
              department: '部门',
              monday: '星期一',
              tuesday: '星期二',
              wednesday: '星期三',
              thursday: '星期四',
              friday: '星期五',
              saturday: '星期六',
              weekday: '星期日'
            },
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
          monthly: {
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            showData: {
              name: '姓名',
              department: '部门',
              january: '1月',
              february: '2月',
              march: '3月',
              april: '4月',
              may: '5月',
              june: '6月',
              july: '7月',
              august: '8月',
              september: '9月',
              october: '10月',
              november: '11月',
              december: '12月',
              average: '年平均',
            },
            searchParams: '',// dialog中的模糊搜索

            //photo_table_dialog_visible: false,
            is_show_photo_detail_dialog: false,
            photo_detail_arr: [21321, 213, 4224740],//要显示的图片数组
          },
          quarter: {//季度
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//table表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            showData: {
              name: '姓名',
              department: '部门',
              one: '第一季度',
              two: '第二季度',
              three: '第三季度',
              four: '第四季度',
            },
            searchParams: '',// dialog中的模糊搜索

          },
          halfYear: {//半年
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//table表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            showData: {
              name: '姓名',
              department: '部门',
              up: '上半年',
              down: '下半年',
            },
            searchParams: '',// dialog中的模糊搜索

          },
          year: {//年度
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//table表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            showData: {
              name: '姓名',
              department: '部门',
              grade: '年度考核成绩',
            },
            searchParams: '',// dialog中的模糊搜索

          },
        },
      }
    },
    methods: {
      initData(index) {
        switch (index) {
          case 1:
            this.getWeeklyList();
        }
      },

      getWeeklyList() {
        for(let i=0;i<10;i++) {
          let obj = {
            name: '张三',
            department: '研发部',
            monday: '7',
            tuesday: '6',
            wednesday: '8',
            thursday: '4',
            friday: '6',
            saturday: '9',
            weekday: '7.4'
          };
          this.tableSettingData[this.currentTable].tableData.push(obj);
        }
        this.tableSettingData[this.currentTable].counts = 10;
      },

      switchToolbar(index) {
        this.toolbarChoosed = index;
        switch (index) {
          case 1:
            this.currentTable = 'weekly';
            break;
          case 2:
            this.currentTable = 'monthly';
            break;
          case 3:
            this.currentTable = 'quarter';
            break;
          case 4:
            this.currentTable = 'halfYear';
            break;
          case 5:
            this.currentTable = 'year';
            break;
        }
        this.initData(index);
      },


      handleSelectionChange(row) {
        //this.tableSettingData.goods.multipleSelection = row;
      },


      // 当前点击
      tableClickRow(row) {
        /*this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);*/
      },
      //表格某一行双击
      tableDblClick(row, currentTable) {
        /*if (currentTable) {
          switch (currentTable) {
            case 'borrowReceive':
              this.tableSettingData[currentTable].table_dialog_visible = true;
              this.tableSettingData[currentTable].formData = row;
              this.tableSettingData[currentTable].currentSelection = row;
              this.getItemsDetailList();
              break;
          }
        }*/
      },

      // 点击过
      tableChooseRow({row, rowIndex}) {
        //return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val, currentTable) {
        /* switch (currentTable) {
           case 'borrowReceive':
             this.params.page = val;
             this.getBorrowReceiveList();
             break;
           case 'goods':
             this.tableSettingData[currentTable].params.page = val;
             this.getGoodsDetailList();
             break;
           default :
             break;
         }*/
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myKPI/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #my_KPI {
      .my-kpi-container {
        .my-kpi-toolbar {
          .my-kpi-toolbar-item {
            @include personalCenterImg('toolbar_gray.png', 'theme1');
            &.checked {
              @include personalCenterImg('toolbar_red.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #my_KPI {

    }
  }

  #theme_name.theme3 {
    #my_KPI {

    }
  }

  #theme_name.theme4 {
    #my_KPI {

    }
  }
</style>
