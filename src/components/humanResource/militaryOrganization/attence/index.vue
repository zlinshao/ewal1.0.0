<template>
  <div id="attence" class="attence">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <!--<div class="icons add" @click="new_train_visible = true"><b>+</b></div>-->
        <div style="display: inline-block;width:230px;margin-right: 0">
          <month-choose v-model="monthValue"></month-choose>
        </div>
      </div>

    </div>
    <div class="main-nav">

      <div class="nav-left">
        <span
          v-for="item in chooseTabs"
          :key="item.id"
          :class="{'isActive': item.id === chooseTab}"
          @click="chooseTab = item.id"
        >{{ item.val }}</span>
      </div>
      <div v-if="chooseTab==1" class="nav-right">
        <span>选择</span>
        <span class="user-leave"><i></i><span>离职员工</span></span>
        <!--<span>部门/人员</span>-->
        <user-choose width="140" title="请选择人员"></user-choose>
        <span class="colorE33">全部发送</span>
      </div>
      <div v-if="chooseTab==2" class="nav-right">
        <user-choose width="140" title="请选择人员"></user-choose>
      </div>
    </div>
    <div v-if="chooseTab==1" class="attence-container">
      <div class="attence-table">
        <div class="mainListTable changeChoose" :style="{'height': '100%'}">
          <el-table
            :data="tableSettingData.attence.tableData"
            height="100%"
            :border="true"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            @row-dblclick="tableDblClick($event,'attence')"
            header-row-class-name="tableHeader"
            :row-style="{height:'60px'}"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="50" align="center">
            </el-table-column>
            <el-table-column
              key="name"
              align="center"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              key="department"
              align="center"
              width="160"
              prop="department"
              label="部门">
            </el-table-column>
            <el-table-column
              key="post"
              align="center"
              prop="post"
              label="岗位">
            </el-table-column>
            <el-table-column
              key="attRest"
              align="center"
              width="120"
              prop="attRest"
              label="出勤/休息天数">
              <template slot-scope="scope">
                <span style="cursor: pointer" @click="showAttRest(scope.row)"
                      class="colorE33">{{scope.row.attRest}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="出勤班次">
              <el-table-column
                key="network"
                align="center"
                prop="network"
                width="100"
                label="网络">
              </el-table-column>
              <el-table-column
                key="civil"
                align="center"
                prop="civil"
                width="100"
                label="文职">
              </el-table-column>
              <el-table-column
                key="early"
                align="center"
                prop="early"
                width="100"
                label="早班">
              </el-table-column>
              <el-table-column
                key="last"
                align="center"
                prop="last"
                width="100"
                label="晚班">
              </el-table-column>

            </el-table-column>
            <el-table-column
              key="lack"
              align="center"
              prop="lack"
              width="110"
              label="迟到缺卡次数">
            </el-table-column>
            <el-table-column
              key="kuanggong"
              align="center"
              prop="kuanggong"
              label="矿工天数">
            </el-table-column>
            <el-table-column
              key="chuchai"
              align="center"
              prop="chuchai"
              label="出差天数">
            </el-table-column>
            <el-table-column
              key="gongchu"
              align="center"
              prop="gongchu"
              label="公出时长">
            </el-table-column>
            <el-table-column
              key="qingjia"
              align="center"
              prop="qingjia"
              label="请假时长">
            </el-table-column>
            <el-table-column
              key="jiaban"
              align="center"
              prop="jiaban"
              label="加班统计">
            </el-table-column>
            <el-table-column
              key="status"
              align="center"
              prop="status"
              width="110"
              label="考勤确认结果">
              <template slot-scope="scope">
                <div @click="sendResult(scope.row)" class="table-operate"
                     :class="[scope.row.status==1?'no-send':'send']">
                  {{scope.row.status===1?'发送':scope.row.status===2?'已发送':'已确认'}}
                </div>
              </template>
            </el-table-column>
            <!--<el-table-column
              v-for="(item,index) in Object.keys(tableSettingData.attence.showData)" :key="item"
              v-if="index<2"
              align="center"
              :prop="item"
              :label="tableSettingData.attence.showData[item]">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in Object.keys(tableSettingData.attence.showData)" :key="item"
              v-if="index>=2"
              align="center"
              :prop="item"
              :label="tableSettingData.attence.showData[item]">
              <template slot-scope="scope">
                <span style="cursor: pointer">{{scope.row[item]}}</span>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
      </div>
      <div class="attence-pagination flex-center">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableSettingData.attence.params.page"
            :page-size="tableSettingData.attence.params.limit"
            :total="tableSettingData.attence.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="chooseTab==2" class="confirm-container">
      <div class="confirm-table">
        <div class="mainListTable changeChoose" :style="{'height': '100%'}">
          <el-table
            :data="tableSettingData.confirm.tableData"
            height="100%"
            :border="true"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            @row-dblclick="tableDblClick($event,'confirm')"
            header-row-class-name="tableHeader"
            :row-style="{height:'60px'}"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="50" align="center">
            </el-table-column>
            <el-table-column
              key="name"
              align="center"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              key="department"
              align="center"
              width="160"
              prop="department"
              label="部门">
            </el-table-column>
            <el-table-column
              key="post"
              align="center"
              prop="post"
              label="岗位">
            </el-table-column>
            <el-table-column
              key="attRest"
              align="center"
              width="120"
              prop="attRest"
              label="出勤/休息天数">
              <template slot-scope="scope">
                <span style="cursor: pointer" @click="showAttRest(scope.row)"
                      class="colorE33">{{scope.row.attRest}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="出勤班次">
              <el-table-column
                key="network"
                align="center"
                prop="network"
                width="100"
                label="网络">
              </el-table-column>
              <el-table-column
                key="civil"
                align="center"
                prop="civil"
                width="100"
                label="文职">
              </el-table-column>
              <el-table-column
                key="early"
                align="center"
                prop="early"
                width="100"
                label="早班">
              </el-table-column>
              <el-table-column
                key="last"
                align="center"
                prop="last"
                width="100"
                label="晚班">
              </el-table-column>
            </el-table-column>
            <el-table-column
              key="lack"
              align="center"
              prop="lack"
              width="110"
              label="迟到缺卡次数">
            </el-table-column>
            <el-table-column
              key="kuanggong"
              align="center"
              prop="kuanggong"
              label="矿工天数">
            </el-table-column>
            <el-table-column
              key="chuchai"
              align="center"
              prop="chuchai"
              label="出差天数">
            </el-table-column>
            <el-table-column
              key="gongchu"
              align="center"
              prop="gongchu"
              label="公出时长">
            </el-table-column>
            <el-table-column
              key="qingjia"
              align="center"
              prop="qingjia"
              label="请假时长">
            </el-table-column>
            <el-table-column
              key="jiaban"
              align="center"
              prop="jiaban"
              label="加班统计">
            </el-table-column>
            <el-table-column
              key="status"
              align="center"
              prop="status"
              width="110"
              label="考勤确认结果">
              <template slot-scope="scope">
                <div @click="sendResult(scope.row)" class="table-operate"
                     :class="[scope.row.status==1?'no-send':'send']">
                  {{scope.row.status===1?'发送':scope.row.status===2?'已发送':'已确认'}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="confirm-pagination flex-center">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableSettingData.confirm.params.page"
            :page-size="tableSettingData.confirm.params.limit"
            :total="tableSettingData.confirm.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </div>

    <lj-dialog
      :size="{width:'70%',height:'95%'}"
      :visible.sync="tableSettingData.attence.table_dialog_visible">
      <div class="att-rest-container">
        <div class="container-top">详情</div>
        <div class="container-middle">
          <div class="middle-item bg-default"
               @click="tableSettingData.attence.table_dialog_choose_tab=item.id"
               :class="{checked:tableSettingData.attence.table_dialog_choose_tab==item.id}"
               v-for="item in tableSettingData.attence.table_dialog_tabs">
            <span>{{item.name}}</span>
          </div>
          <!--<div class="middle-item bg-default"><span>出勤/休息天数</span></div>
          <div class="middle-item bg-default"><span>迟到/缺卡次数</span></div>
          <div class="middle-item bg-default"><span>加班统计</span></div>-->
        </div>
        <div class="container-bottom">
          <div v-if="tableSettingData.attence.table_dialog_choose_tab==1" class="container-bottom-tab1">
            <div class="bottom-tip">2019-04 出勤天数：21，休息天数：3</div>
            <div class="bottom-calendar">
              <calendar lang="en"></calendar>
            </div>
          </div>
          <div v-if="tableSettingData.attence.table_dialog_choose_tab==2" class="container-bottom-tab2">
            <div class="bottom-tip">2019-04 迟到/缺卡次数：3</div>
            <div class="bottom-container">

              <div class="check-record-container">

                <div v-for="item in attendanceList" class="check-record-item">
                  <div class="check-record-item-top">
                    <span>{{item.tip}}</span></div>
                  <div class="check-record-item-bottom">
                    <span>{{item.value}}</span></div>
                </div>
              </div>

            </div>
          </div>

          <div v-if="tableSettingData.attence.table_dialog_choose_tab==3" class="container-bottom-tab3">
            <div class="bottom-tip">2019-04 加班统计：16h</div>
            <div class="bottom-container">

              <div class="check-record-container">

                <div  class="check-record-item">
                  <div class="check-record-item-top">
                    <span style="font-weight: 700">加班-审批单统计</span></div>
                  <div class="check-record-item-bottom">
                    <span>2</span></div>
                </div>
                <div  class="check-record-item">
                  <div class="check-record-item-top">
                    <div class="th-top" style="font-weight: 700">加班时长-按加班规则计算</div>
                    <div class="th-bottom">
                      <div>工作日加班</div>
                      <div>节假日加班</div>
                    </div>
                  </div>
                  <div class="check-record-item-bottom">
                    <div>8h</div>
                    <div>8h</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  import _ from 'lodash';
  import Calendar from '../../../common/lightweightComponents/Calendar/index';
  import MonthChoose from '../../../common/lightweightComponents/Calendar/MonthChoose/index';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import LjDialog from '../../../common/lj-dialog';

  export default {
    name: "attence",
    components: {
      MonthChoose,
      UserChoose,
      LjDialog,
      Calendar,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,


        attendanceList: [
          {
            id: 1,
            tip: '迟到次数',
            value: '2次',
          },
          {
            id: 2,
            tip: '严重迟到次数',
            value: '2次',
          },
          {
            id: 3,
            tip: '上班缺卡次数',
            value: '0次',
          },
          {
            id: 4,
            tip: '下班缺卡次数',
            value: '0次',
          },
        ],

        currentTable: 'attence',
        tableSettingData: {
          attence: {
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
            table_dialog_choose_tab: 1,
            table_dialog_tabs: [
              {
                id: 1,
                name: '出勤/休息天数',
              },
              {
                id: 2,
                name: '迟到/缺卡次数',
              },
              {
                id: 3,
                name: '加班统计',
              }
            ],
            tableData: [],//表格数据
            /*showData: {
              name: '姓名',
              department: '部门',
              post: '岗位',
              attRest: '出勤/休息天数',
              wednesday: '出勤班次',
              thursday: '迟到缺卡次数',
              friday: '矿工天数',
              saturday: '出差天数',
              weekday: '公出时长',
              leave: '请假时长',
              workOvertime: '加班统计',
              operate: '考勤确认结果',

            },*/
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
          confirm: {
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
            table_dialog_choose_tab: 1,
            table_dialog_tabs: [
              {
                id: 1,
                name: '出勤/休息天数',
              },
              {
                id: 2,
                name: '迟到/缺卡次数',
              },
              {
                id: 3,
                name: '加班统计',
              }
            ],
            tableData: [],//表格数据
            /*showData: {
              name: '姓名',
              department: '部门',
              post: '岗位',
              attRest: '出勤/休息天数',
              wednesday: '出勤班次',
              thursday: '迟到缺卡次数',
              friday: '矿工天数',
              saturday: '出差天数',
              weekday: '公出时长',
              leave: '请假时长',
              workOvertime: '加班统计',
              operate: '考勤确认结果',

            },*/
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },

        chooseTab: 1,
        chooseTabs: [
          {id: 1, val: '月度汇总'},
          {id: 2, val: '考勤确认表'},
        ],
        monthValue: new Date(),
      }
    },
    methods: {

      showAttRest() {
        this.tableSettingData.attence.table_dialog_visible = true;
      },

      //发送通知
      sendResult(row) {
        if (row.status === 1) {
          this.$LjConfirm({content: '月度统计表将发送至对应员工待办中'}).then(() => {
            alert('发送成功');
          });
        }
      },

      initData() {
        for (let i = 0; i < 6; i++) {
          let obj = {
            name: '张三',
            department: '研发部',
            post: '前端',
            attRest: '25/6',
            network: '3',
            civil: '4',
            early: '5',
            last: '6',
            lack: '3',
            kuanggong: '3',
            chuchai: '1',
            gongchu: '3',
            qingjia: '3',
            jiaban: '9',
            status: _.random(1, 3),
          };
          console.log(obj.status);
          this.tableSettingData.attence.tableData.push(obj);
        }
        this.tableSettingData.attence.counts = 10;
      },


      handleSizeChange() {
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
            case 'attence':
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
    mounted() {
      this.initData();
    },
  }
</script>


<style lang="scss">
  #attence {
    .attence-container {
      .el-table__header th {
        padding: 0;
        height: 40px;
      }
      .el-table--border {
        //border: none !important;
        //border-left: ;
        border: none;
        border-top: 1px solid #EBEEF5;
        /*border-left: none;
        border-bottom: none;
        border-right: none;*/
      }
      .el-table-column--selection {
        border-left: 1px solid #EBEEF5;
      }
      .el-table--border::after, .el-table--group::after {
        height: 0%;
      }

      /*.el-table__header {
        .el-table-column--selection {
          visibility: hidden !important;
        }
      }*/
      .el-table__header {
        .cell {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .el-table__header, .el-table__body {
        .el-checkbox {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      }
    }

    /*.el-checkbox {
      display: flex!important;
      justify-content: center!important;
      align-items: center!important;
    }*/
  }
</style>


<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/attence/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #attence {
      .main-nav {
        .isActive {
          @include militaryImg('teji.png', 'theme1');
          color: white;
        }
      }

      #lj_dialog {
        .att-rest-container {
          .bg-default {
            @include militaryImg('q.png', 'theme1');
            &.checked {
              @include militaryImg('p.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #attence {

    }
  }

  #theme_name.theme3 {
    #attence {

    }
  }

  #theme_name.theme4 {
    #attence {

    }
  }

</style>
