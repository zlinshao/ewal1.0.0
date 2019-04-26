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
              prop="2019-04-21"
              :label="item.date"
              class="tableCell">
              <template slot-scope="scope">
                <el-popover placement="bottom" trigger="click" v-if="index !== 4">
                    <div class="popoverHeader">
                      {{userName}}{{logTime}}
                    </div>
                    <div class="popoverComplete_work">
                      今日完成工作
                      <h6>{{dayLog.complete_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      未完成工作
                      <h6>{{dayLog.uncompleted_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      需协调工作
                      <h6>{{dayLog.coordinate_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      备注
                      <h6>{{dayLog.ps}}</h6>
                    </div>
                    <div class="popoverAlreadyRead">
                      <h6>全部已读</h6>
                      <img :src="item" v-for="(item, index) in readAvatar" :key="index"/>
                    </div>
                  <div slot="reference" style="cursor: pointer"><div @click="showCardDetail(scope.row,showData[index].date)">{{scope.row[item.date]}}</div></div>
                </el-popover>
                <el-popover placement="bottom" trigger="click" offset="0" v-if="index == 4">
                    <div class="popoverHeader">
                      {{userName}}{{logTime}}
                    </div>
                    <div class="popoverComplete_work">
                      今日完成工作
                      <h6>{{dayLog.complete_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      未完成工作
                      <h6>{{dayLog.uncompleted_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      需协调工作
                      <h6>{{dayLog.coordinate_work}}</h6>
                    </div>
                    <div class="popoverComplete_work">
                      备注
                      <h6>{{dayLog.ps}}</h6>
                    </div>
                    <div class="popoverAlreadyRead">
                      <h6>全部已读</h6>
                      <img :src="item" v-for="(item, index) in readAvatar" :key="index"/>
                    </div>
                  <div slot="reference" style="cursor: pointer"><div @click="showCardDetail(scope.row,showData[index].date)">{{scope.row[item.date]}}</div></div>
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
        showData: [
          {date:""},
          {date:""},
          {date:""},
          {date:""},
          {date:""},
        ],
        userName: '',
        logTime: '',
        dayLog: {},
        weekLog: {},
        monthLog: {},
        achievement_daily: {},
        readAvatar:[]
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
        this.readAvatar = []
        this.$http.post(`${this.url}/staff/log/dayLog`,param).then(res => {
          if(res.code === "20000") {
            let id = []
            for(var i = 0; i < res.data.length; i++){
              switch (res.data[i].type) {
                case 'day':
                  this.dayLog = res.data[i].log_info
                  if(res.data[i].read_data.length > 0){
                    for(let j = 0; j < res.data[i].read_data.length; j++){
                      this.readAvatar.push(res.data[i].read_data[j].avatar)
                    }
                  }
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
        //获取表头时间
        for(let i = 0; i < this.showData.length; i++){
          this.showData[i].date = this.getDay(-1-i)
        }
        let param = {
          page: this.currentPage,
          limit: 5
        }
        this.$http.post(`${this.url}/staff/log/downLog`,param).then(res => {
          if(res.code === "20000") {
            this.tableData = []
            this.total = res.data.data.length
            for (let i = 0; i < res.data.data.length; i++) {
              // 获取用户部门
              let department = ''
              for(let j = 0; j < res.data.data[i].org.length; j++){
                department = department + res.data.data[i].org[j].name + '-'
              }
              let obj = {
                id: res.data.data[i].id,
                name: res.data.data[i].name,
                department: department.substring(0,department.length-1),
              };
              obj[this.showData[0].date] = res.data.data[i].user_log[0].length == 0 ? '' : res.data.data[i].user_log[0].log_info.complete_work
              obj[this.showData[1].date] = res.data.data[i].user_log[1].length == 0 ? '' : res.data.data[i].user_log[1].log_info.complete_work
              obj[this.showData[2].date] = res.data.data[i].user_log[2].length == 0 ? '' : res.data.data[i].user_log[2].log_info.complete_work
              obj[this.showData[3].date] = res.data.data[i].user_log[3].length == 0 ? '' : res.data.data[i].user_log[3].log_info.complete_work
              obj[this.showData[4].date] = res.data.data[i].user_log[4].length == 0 ? '' : res.data.data[i].user_log[4].log_info.complete_work
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
  padding: 0px 0px 0px 36px!important;
  color: black!important;
  // width: 315px!important;
  .popoverHeader{
    height:20px;
    // width: 315px;
    margin-bottom: 3px;
    font-size:15px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(104,104,116,1);
    line-height:20px;
    letter-spacing:1px;
  }
  .popoverComplete_work{
    padding-top: 10px;
    font-size:15px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(104,104,116,1);
    line-height:20px;
    letter-spacing:1px;
  }
  .popoverunCompleted_work{
    
  }
  .popoverCoordinate_work{
    
  }
  .popoverPs{
    
  }
  .popoverAlreadyRead{
    height: 40px;
    display: flex;
    justify-content: flex-start;
    h6{
      display: flex;
      align-items: center;
      width:52px;
      height:40px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(104,104,116,1);
      line-height:26px;
    }
    >img{
      width: 40px;
      margin-left: 10px;
      border-radius: 20px;
    }
  }
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
