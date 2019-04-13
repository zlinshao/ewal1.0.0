<template>
  <div id="sub_log">
    <div class="log-container">
      <div class="log-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-left-static">下属日志</span>
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位/时间" v-model="searchValue"></search-bar>
        </div>
      </div>
      <div class="log-table">
        <div class="log-table-list">
          <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
            <el-table
              :data="tableSettingData.subLog.tableData"
              highlight-current-row
              :height="this.mainListHeight(30) + 'px'"
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick($event,'subLog')"
              header-row-class-name="tableHeader"
              :row-style="{height:'70px'}"
              style="width: 100%">
              <el-table-column
                v-for="(item,index) in Object.keys(tableSettingData.subLog.showData)" :key="item"
                v-if="index<2"
                align="center"
                :prop="item"
                :label="tableSettingData.subLog.showData[item]">
              </el-table-column>
              <el-table-column
                v-for="(item,index) in Object.keys(tableSettingData.subLog.showData)" :key="item"
                v-if="index>=2"
                align="center"
                :prop="item"
                :label="tableSettingData.subLog.showData[item]">
                <template slot-scope="scope">
                  <span @click="showCardDetail(scope.row,item)" style="cursor: pointer">{{scope.row[item]}}</span>
                </template>
              </el-table-column>

            </el-table>

          </div>

          <!--<div :key="index" v-for="index of 7" class="log-table-item">
            <div class="item-upper">
              <div class="item-upper-photo">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
              </div>
              <div class="item-upper-content">
                <div title="文章标题文章标题文章标题">文章标题文章标题文章标题文章标题文章标题文章标题</div>
              </div>
              <div class="item-upper-operate">
                <div class="item-response">
                  <i class="icon-response"></i>
                  <span>90</span>
                </div>
                <div class="item-view">
                  <i class="icon-view"></i>
                  <span>587</span>
                </div>
                <div class="item-like">
                  <i class="icon-like"></i>
                  <span>12</span>
                </div>
              </div>
            </div>
            <div class="item-lower">
              <div class="item-lower-left">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                <span>张三</span>
              </div>
              <div class="item-lower-right">
                2019-04-13
              </div>
            </div>
          </div>-->
        </div>
        <div class="log-table-pagination flex-center common-page">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="tableSettingData.subLog.params.page"
              :page-size="tableSettingData.subLog.params.limit"
              :total="tableSettingData.subLog.counts"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '@/components/common/lightweightComponents/SearchBar';

  export default {
    name: "subLog",
    components: {
      SearchBar,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        searchValue: '',
        logList: [],
        currentTable: 'subLog',
        tableSettingData: {
          subLog: {
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
              'date1': '2019-04-13',
              'date2': '2019-04-12',
              'date3': '2019-04-11',
              'date4': '2019-04-10',
              'date5': '2019-04-09',
            },
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      showCardDetail() {

      },

      initData() {
        for (let i = 0; i < 5; i++) {
          let obj = {
            name: '张三',
            department: '研发部',
            'date1': '2019-04-13',
            'date2': '2019-04-12',
            'date3': '2019-04-11',
            'date4': '2019-04-10',
            'date5': '2019-04-09',
          };
          this.tableSettingData.subLog.tableData.push(obj);
        }
        this.tableSettingData.subLog.counts = 10;
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
  @import "../../../assets/scss/personalCenter/subLog/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #sub_log {

    }
  }

  #theme_name.theme2 {
    #sub_log {

    }
  }

  #theme_name.theme3 {
    #sub_log {

    }
  }

  #theme_name.theme4 {
    #sub_log {

    }
  }


</style>
