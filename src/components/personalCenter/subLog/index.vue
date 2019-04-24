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
        <div class="mainListTable">
          <el-table
            :data="tableData"
            highlight-current-row
            header-row-class-name="tableHeader"
            :row-style="{height:'115px'}"
            class="subLogTable"
            >
            <el-table-column
              v-for="(item,index) in Object.keys(showData)" :key="index"
              v-if="index<2"
              align="center"
              :prop="item"
              :label="showData[item]"
              width="98px">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in Object.keys(showData)" :key="index"
              v-if="index>=2"
              align="center"
              :prop="item"
              :label="showData[item]"
              class="tableCell">
              <template slot-scope="scope">
                <el-popover placement="bottom" trigger="click">
                    <div>
                      {{userName}}{{logTime}}
                    </div>
                    <div class="dayLog">
                      今日完成工作
                      <h1>{{dayLog.complete_work}}</h1>
                      未完成工作
                      <h1>{{dayLog.uncompleted_work}}</h1>
                      需协调工作
                      <h1>{{dayLog.coordinate_work}}</h1>
                      备注
                      <h1>{{dayLog.ps}}</h1>
                      全部已读
                    </div>
                  <div slot="reference" style="cursor: pointer"><div @click="showCardDetail(scope.row,showData[item])">{{scope.row[item]}}</div></div>
                </el-popover>
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
        currentPage: 1,
        pageSize: 5,
        total: 0,
        tableData: [],
        showData: {
          name: '姓名',
          department: '部门',
          dateFirst: '2019-04-13',
          dateSecond: '2019-04-12',
          dateThird: '2019-04-11',
          dateForth: '2019-04-10',
          dateFifth: '2019-04-09'
        },
        userName: '',
        logTime: '',
        dayLog: {},
        weekLog: {},
        monthLog: {},
        achievement_daily: {}
      }
    },
    mounted() {
      this.initData();
    },
    watch: {
      currentPage() {
        this.initData();
      }
    },
    methods: {
      showCardDetail(row,time) {
        this.userName = row.name
        this.logTime = time
        let param = {
          time: new Date(time),
          user_id: row.id
        }
        this.$http.post(`${this.url}/staff/log/dayLog`,param).then(res => {
          if(res.code === "20000") {
            let id = []
            for(var i = 0; i < res.data.length; i++){
              switch (res.data[i].type) {
                case 'day':
                  this.dayLog = res.data[i].log_info
                  break;
                case 'week':
                  this.weekLog = res.data[i].log_info
                  break;
                case 'month':
                  this.monthLog = res.data[i].log_info
                  break;
                case 'achievement_daily':
                  this.achievement_daily = res.data[i].log_info
                  break;
              }
              id.push(res.data[i].id)
            }
            let params = {
              id: id
            }
            this.$http.post(`${this.url}/staff/log/read`,params).then(res => {
            })
          }
        })
      },
      initData() {
        this.showData.dateFirst = this.getDay(-1)
        this.showData.dateSecond = this.getDay(-2)
        this.showData.dateThird = this.getDay(-3)
        this.showData.dateForth = this.getDay(-4)
        this.showData.dateFifth = this.getDay(-5)
        let param = {
          page: this.currentPage,
          limit: 5
        }
        this.tableData = []
        this.$http.post(`${this.url}/staff/log/downLog`,param).then(res => {
          if(res.code === "20000") {
            this.total = res.data.data.length
            for (let i = 0; i < res.data.data.length; i++) {
              // 遍历获取此用户所在部门
              let department = ''
              for(let j = 0; j < res.data.data[i].org.length; j++){
                department = department + res.data.data[i].org[j].name + '-'
              }
              let obj = {
                id: res.data.data[i].id,
                name: res.data.data[i].name,
                department: department.substring(0,department.length-1),
                dateFirst: res.data.data[i].user_log[0].length == 0 ? '' : res.data.data[i].user_log[0].log_info.complete_work,
                dateSecond: res.data.data[i].user_log[1].length == 0 ? '' : res.data.data[i].user_log[1].log_info.complete_work,
                dateThird: res.data.data[i].user_log[2].length == 0 ? '' : res.data.data[i].user_log[2].log_info.complete_work,
                dateForth: res.data.data[i].user_log[3].length == 0 ? '' : res.data.data[i].user_log[3].log_info.complete_work,
                dateFifth: res.data.data[i].user_log[4].length == 0 ? '' : res.data.data[i].user_log[4].log_info.complete_work,
              };
              this.tableData.push(obj);
            }
          }
        })
      },
      //获取最近五天的日期并处理格式
      getDay(day){
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        today.setTime(targetday_milliseconds);
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      },
      doHandleMonth(month){
        var m = month;
        if(month.toString().length == 1){
        m = "0" + month;
        }
        return m;
      }
    }
  }
</script>
<style lang="scss">
.el-popover{
  background-color: transparent!important; 
  padding: 0px!important;
  color: black!important;
}
</style>

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
