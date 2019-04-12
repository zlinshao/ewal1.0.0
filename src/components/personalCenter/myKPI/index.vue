<template>
  <div id="my_KPI">
    <div class="my-kpi-container">
      <div class="my-kpi-toolbar">
        <div v-for="item in toolbarList" @click="switchToolbar(item.id)" :class="{checked:toolbarChoosed==item.id}"
             class="my-kpi-toolbar-item">{{item.name}}
        </div>
      </div>
      <div class="my-kpi-table-container">
        <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
          <el-table
            :data="tableSettingData.weekly.tableData"
            highlight-current-row
            :height="this.mainListHeight(30) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            @row-dblclick="tableDblClick($event,'borrowReceive')"
            header-row-class-name="tableHeader"
            :row-style="{height:'70px'}"
            style="width: 100%">
            <!--<el-table-column-->
            <!--v-for="item in Object.keys(showData)" :key="item"-->
            <!--align="center"-->
            <!--:prop="item"-->
            <!--:label="showData[item]">-->
            <!--</el-table-column>-->

            <el-table-column
              key="approvalId"
              align="center"
              prop="approvalId"
              label="审批编号">
            </el-table-column>


            <el-table-column
              key="counts"
              align="center"
              prop="counts"
              label="领/借数量">
            </el-table-column>

            <el-table-column
              key="applyType"
              align="center"
              prop="applyType"
              label="申请类型">
            </el-table-column>

            <el-table-column
              key="applyPerson"
              align="center"
              prop="applyPerson"
              label="申请人">
            </el-table-column>

            <el-table-column
              key="department"
              align="center"
              prop="department"
              label="部门">
            </el-table-column>

            <el-table-column
              key="applyTime"
              align="center"
              prop="applyTime"
              label="申请日期">
            </el-table-column>


            <el-table-column
              key="goodsStatus"
              align="center"
              prop="goodsStatus"
              label="物品状态">

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
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "myKPI",
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




        currentTable: '',
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
            formData: {},//详情表格数据
            tableShowData: {},
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
            tableShowData: {
              name: '物品名称',//物品名称
              count_num: '申领数量',//申领数量
              unclaimed_num: '待领数量',//待领数量
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
            tableShowData: {},
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
            tableShowData: {},
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
            tableShowData: {},
            searchParams: '',// dialog中的模糊搜索

          },
        },
      }
    },
    methods: {
      switchToolbar(index) {
        this.toolbarChoosed = index;
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
