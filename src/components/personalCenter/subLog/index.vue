<template>
  <div id="sub_log">
    <div class="log-container">
      <div class="log-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-left-static">下属日志</span>
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位" v-model="searchValue"></search-bar>
        </div>
      </div>


      <div class="log-table">
        <div class="mainListTable">
          <el-table
            :data="tableData"
            highlight-current-row
            header-row-class-name="tableHeader"
            :row-style="{height:'115px'}"
            class="subLogTable"
          >
            <el-table-column
              align="center"
              prop="name"
              label="姓名"
              width="98px">
            </el-table-column>
            <el-table-column
              align="center"
              prop="department"
              label="部门"
              width="98px">
            </el-table-column>
            <el-table-column
              v-for="(item, index) in showData" :key="index"
              align="center"
              :label="item.date"
              class="tableCell">
              <template slot-scope="scope">

                <div style="cursor:pointer;" :style="{'color':scope.row[showData[index].date].is_read?'#CCCCCC':'#686874'}" :title="scope.row[showData[index].date].complete_work" class="hide-text-elli"
                     v-if="scope.row[showData[index].date].complete_work" @click="showCardDetail(scope.row,showData[index].date)">
                  今日完成工作:<br>
                  {{scope.row[showData[index].date].complete_work}}
                </div>
                <div v-else>--</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>


      <div class="log-table-pagination flex-center common-page">
        <div class="page">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </div>

    <lj-white-dialog :visible.sync="sub_visible">
      <div class="sub-log-dialog-container scroll_bar">
        <div class="sub-log-top">
          <div class="sub-log-bold">{{userName}}</div>
          <div class="sub-log-bold">{{logTime}}</div>
        </div>
        <div class="sub-log-finished">
          <div class="sub-log-bold">今日完成工作:</div>
          <div>{{dayLog.complete_work}}</div>
        </div>
        <div class="sub-log-continue">
          <div class="sub-log-bold">今日未完成工作:</div>
          <div>{{dayLog.uncompleted_work}}</div>
        </div>
        <div class="sub-log-coordinate">
          <div class="sub-log-bold">需协调工作:</div>
          <div>{{dayLog.coordinate_work}}</div>
        </div>
        <div class="sub-log-remark">
          <div class="sub-log-bold">备注:</div>
          <div>{{dayLog.ps}}</div>
        </div>
      </div>
    </lj-white-dialog>
  </div>
</template>

<script>
  import LjWhiteDialog from '@/components/common/lightweightComponents/LjWhiteDialog';
  import SearchBar from '@/components/common/lightweightComponents/SearchBar';

  export default {
    name: "subLog",
    components: {
      SearchBar,
      LjWhiteDialog,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,

        sub_visible: false,//下属日志打开框
        searchValue: '',
        currentPage: 1,
        pageSize: 5,
        total: 0,
        tableData: [],
        showData: [
          {date: ""},
          {date: ""},
          {date: ""},
          {date: ""},
          {date: ""},
        ],
        userName: '',
        logTime: '',
        dayLog: {},
        weekLog: {},
        monthLog: {},
        achievement_daily: {},
        readAvatar: []
      }
    },
    mounted() {
      this.initData();
    },
    watch: {
      currentPage() {
        this.initData();
      },
      sub_visible: {
        handler(val) {
          if(val) {
            this.initData();
          }
        },
      },
    },
    methods: {
      showCardDetail(row, time) {
        this.userName = row.name;
        this.logTime = time;
        let param = {
          time: new Date(time),
          user_id: row.id,
        };
        this.readAvatar = [];
        this.showLoading2(true);
        this.$http.post(`${this.url}staff/log/dayLog`, param).then(res => {
          this.sub_visible = true;
          this.showLoading2(false);
          if (res.code === "20000") {
            let id = [];
            for (let i = 0; i < res.data.length; i++) {
              switch (res.data[i].type) {
                case 'day':
                  this.dayLog = res.data[i].log_info;
                  if (res.data[i].read_data.length > 0) {
                    for (let j = 0; j < res.data[i].read_data.length; j++) {
                      this.readAvatar.push(res.data[i].read_data[j].avatar)
                    }
                  }
                  break;
                case 'week':
                  this.weekLog = res.data[i].log_info;
                  break;
                case 'month':
                  this.monthLog = res.data[i].log_info;
                  break;
                case 'achievement_daily':
                  this.achievement_daily = res.data[i].log_info;
                  break;
              }
              id.push(res.data[i].id)
            }
            let params = {
              id: id
            };
            this.$http.post(`${this.url}staff/log/read`, params).then(res => {
            })
          }
        })
      },
      initData() {
        //获取表头时间
        for (let i = 0; i < this.showData.length; i++) {
          this.showData[i].date = this.getDay(-1 - i)
        }
        let param = {
          page: this.currentPage,
          limit: 5
        };
        this.$http.post(`${this.url}staff/log/downLog`, param).then(res => {
          if (res.code === "20000") {
            this.tableData = [];
            this.total = res.data.data.length;
            for (let i = 0; i < res.data.data.length; i++) {
              let item = res.data.data[i];
              // 获取用户部门
              let department = '';
              for (let j = 0; j < item.org.length; j++) {
                department = department + item.org[j].name + '-'
              }
              let obj = {
                id: item.id,
                name: item.name,
                department: department.substring(0, department.length - 1),
              };
              for (let j = 0; j < 5; j++) {
                obj[this.showData[j].date] = {
                  complete_work: item.user_log[j].length == 0 ? '' : item.user_log[j].log_info?.complete_work,
                  is_read:_.includes(item.user_log[j].read_ids,this.$storage.get('user_info').id),//已读
                };
              }
              this.tableData.push(obj);
            }
          }
        })
      },
      //获取最近五天的日期并处理格式
      getDay(day) {
        let today = new Date();
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds);
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      doHandleMonth(month) {
        let m = month;
        if (month.toString().length == 1) {
          m = "0" + month;
        }
        return m;
      }
    }
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
