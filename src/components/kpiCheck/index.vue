<template>
  <div id="kpiCheck">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <img :src="imgUrl"/>
        <div>
          <h3 class="personName">张艺兴</h3>
          <h3 class="timeInfo">{{month}}月KPI考核</h3>
        </div>
      </div>
    </div>
    <div class="kpiCheckContainer">
      <el-table highlight-current-row header-row-class-name="tableHeader" :data="kpiList">
          <el-table-column label="考勤天数" align="center" prop="notStandardDay"></el-table-column>
          <!-- <el-table-column label="不达标天数" align="center"></el-table-column> -->
          <el-table-column v-for="(item,index) in days" :key="index" :label="item.toString()" :prop="item.toString()" align="center" width="50px">
            <template slot-scope="scope">
              <div @click="showKpiDetail(scope.row,item)">{{scope.row[item.toString()]}}</div>
            </template>
          </el-table-column>
      </el-table>
      <div class="assessmentDetail" v-if="showKpi">
        <el-table highlight-current-row header-row-class-name="tableHeader" :data="kpiDetail" height="600">
          <el-table-column label="考核项" align="left" prop="standardName"></el-table-column>
          <el-table-column label="指标值" align="center" prop="full_mark"></el-table-column>
          <el-table-column label="得分" align="right" prop="actual_score"></el-table-column>
          <el-table-column  align="center" prop="status">
            <template slot-scope="scope">
                <el-button v-if="scope.row.is_appeal == 1" @click="appeal(scope.row)">已申诉</el-button>
                <div v-else>
                  <el-button v-if="!scope.row.status" @click="appeal(scope.row)">申诉</el-button>
                </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="5"></el-pagination>
        </div>
        <el-button class="footButton" @click="confirm()">确定</el-button>
      </div>
    </div>
    <lj-dialog :visible="dialogVisible" :size="{width: 700 + 'px',height: 600 + 'px'}" @close="dialogVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>申诉</h3>
        </div>
        <div class="dialog_main">
          <el-table highlight-current-row header-row-class-name="tableHeader" :data="examinationDetail">
            <el-table-column label="考核项" align="center" prop="standardName"></el-table-column>
            <el-table-column label="指标值" align="center" prop="full_mark"></el-table-column>
            <el-table-column label="得分" align="center" prop="actual_score"></el-table-column>
          </el-table>
          <div class="textArea">
            <el-input type="textarea" v-model="feedBack" rows='4'></el-input>
          </div>
          <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <img :src="imgUrl"/>
                <div>
                  <h3 class="personNameTime">张艺兴<span>{{dialogDay}}</span></h3>
                  <h3 class="info">有异议，当天休息，无法进行审批处理<span>评论</span></h3>
                </div>
              </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="appealOk()">确定</el-button>
          <el-button size="small" type="info" @click="dialogVisible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
   
  </div>
</template>

<script>
  import ljDialog from '../common/lj-dialog';
  export default {
    name: "index",
    components: {
      ljDialog,
    },
    data() {
      return {
        url: globalConfig.kpi,
        imgUrl: require('../../assets/image/todoList/components/humanResource/theme1/rili.png'),
        month: 0,
        dialogMonth: '',
        dialogDay: '',
        total: 0,
        kpiList: [],
        showKpi: false,
        dialogVisible: false,
        feedBack: '反馈：',
        kpiDetail: [],
        examinationDetail:[],
        examinationId: 0,
        row: {},
        day: 0,
      }
    },
    mounted() {
      this.getKpiList()
    },
    activated() {
    },
    watch: {},
    computed: {
      days: function getPreMonthDate() {
        let times = new Date();
        let Y = times.getFullYear();
        let M = times.getMonth();
        let dateArr = [];
        if (M == 0 || M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12) {
          for (let i = 1; i <= 31; i++) {
            dateArr[i-1] = i;
          }
        } 
        else if (M == 4 || M == 6 || M == 9 || M == 11) {
          for (let i = 1; i <= 30; i++) {
            dateArr[i-1] = i;
          }
        }
        else {
          if (((Y % 4) == 0) && ((Y % 100) != 0) || ((Y % 400) == 0)) {
            for (let i = 1; i <= 29; i++) {
              dateArr[i-1] = i;
            }
          } else {
            for (let i = 1; i <= 28; i++) {
              dateArr[i-1] = i;
            }
          }
        }
        return dateArr
      }
    },
    methods: {
      getKpiList(){
        this.$http.get(`${this.url}/kpi/last_kpi?month=2019-03`).then(res => {
          if(res.status == 200){
            let obj = {
            id: res.data.id,
            staff_id: res.data.staff_id,
            notStandardDay: res.data.assessment_days
          }
          this.month = res.data.month.substring(5,7)
          this.dialogMonth = res.data.month.substring(0,7)
          this.handleKpi(obj,res.data.kpi)
          this.kpiList.push(obj)
          }
        })
      },
      handleKpi: function(obj,kpi) {
        for(var i = 0; i < kpi.length; i ++){
          let time = kpi[i].checked_at.toString()
          let strTime = time.substring(time.length-2)
          if(strTime.substring(0,1) == '0'){
            strTime = strTime.substring(1)
          }
          let intTime = parseInt(strTime)
          for(var j = 0; j < this.days.length; j++){
            if(intTime == this.days[j]){
              obj[strTime] = kpi[i].staff_score
            }
          }
        }
      },
      showKpiDetail: function(row,day) {
        this.showKpi = true;
        this.row = row
        this.day = day
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        if (month == 0){
          month = 12;
          year = (year-1).toString()
        }else{
          year = year.toString()
        }
        if(month.toString().length == 1){
          month = "0" + month.toString();
        }else {
          month = month.toString()
        }
        if(day.toString().length == 1){
          day = "0" + day.toString();
        }else{
          day = day.toString();
        }
        let param = {
          staff_id: row.staff_id,
          checked_at: new Date(`${year}-${month}-${day}`),
          month_day_id: row.id
        }
        this.$http.get(`${this.url}/kpi`,param).then(res => {
          this.kpiDetail = []
          this.total = res.data.length
          if(res.status == 200){
            for(var i = 0; i < res.data.length; i++){
              let obj = {
                id: res.data[i].id,
                standardName: res.data[i].standard.name,
                full_mark: res.data[i].standard.full_mark,
                actual_score: res.data[i].actual_score,
                status: res.data[i].standard.full_mark == res.data[i].actual_score ? true : false,
                is_appeal: res.data[i].is_appeal
              }
              this.kpiDetail.push(obj)
            }
          }
        })
      },
      appeal: function(row) {
        if(this.day < 10) {
          this.dialogDay = this.dialogMonth + '-0' +this.day
        }else{
        this.dialogDay = this.dialogMonth + '-' +this.day
        }
        this.examinationDetail = []
        let obj = {
          id: row.id,
          standardName: row.standardName,
          full_mark: row.full_mark,
          actual_score: row.actual_score
        }
        this.examinationDetail.push(obj)
        this.dialogVisible = true
      },
      appealOk: function() {
        let param = {
            result:2,
            kpi_id: this.examinationDetail[0].id,
            comment: this.feedBack
        }
        this.$http.put(`${this.url}/kpi/confirm_kpi/${this.kpiList[0].id}`,param).then(res => {
          if(res.status == 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: '申诉成功',
            });
            this.dialogVisible = false
            this.showKpiDetail(this.row,this.day)
          }
        })
      },
      confirm: function(){
        this.showKpi = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/kpiCheck/index.scss";

</style>
