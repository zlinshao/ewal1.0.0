<template>
  <div id="my_KPI">
    <coming-soon></coming-soon>
    <div class="my-kpi-container">
      <div class="my-kpi-toolbar">
        <div v-for="(item,index) in period" @click="choosePeriod(index)" :class="{checked:choosedPeriod==index}" :key="index"
            class="my-kpi-toolbar-item">{{item.title}}
        </div>
      </div>

      <div class="my-kpi-table-container">
        <el-table :data="weekData" v-if="choosedPeriod===0" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" align="left" prop="name"></el-table-column>
          <el-table-column label="部门"  align="center" prop="department"></el-table-column>
          <el-table-column v-for="(item, index) in week" :key="index" :label="item"  align="center" :prop="item">
            <template slot-scope="scope">
              <div @click="showKpiDetail(scope.row,item,scope.row[item])">{{scope.row[item]}}</div>
            </template>
          </el-table-column>
        </el-table >
        <el-table :data="monthData" v-if="choosedPeriod===1" highlight-current-row header-row-class-name="tableHeader" key="tableDataInstall">
          <el-table-column label="姓名" prop="name" align="left"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column v-for="(item,index) in month" :key="index" :label="item"  align="center" :prop="item"></el-table-column>
          <el-table-column label="年平均" align="center" prop="yearAverageScore"></el-table-column>
        </el-table>
        <el-table  :data="seasonData" v-if="choosedPeriod===2" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="left"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="第一季度" prop="first" align="right"></el-table-column>
          <el-table-column label="第二季度" prop="second" align="right"></el-table-column>
          <el-table-column label="第三季度" prop="third" align="right"></el-table-column>
          <el-table-column label="第四季度" prop="forth" align="right"></el-table-column>
        </el-table>
        <el-table  :data="halfyearData" v-if="choosedPeriod===3" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="left" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="上半年" prop="first" align="center" width="400px"></el-table-column>
          <el-table-column label="下半年" prop="second" align="center" width="400px"></el-table-column>
        </el-table>
        <el-table  :data="yearData" v-if="choosedPeriod===4" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="left" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="年度考核成绩" prop="yearScore" align="center" width="700px"></el-table-column>
        </el-table>
      </div>
    </div>

    <lj-dialog
      :size="{width:'40%',height:'80%'}"
      :visible.sync="table_dialog_visible">
      <div class="dialog_container dialog-weekly-form">
        <div class="dialog-header">
          <div class="dialog-header-user">
            <div class="header-user-photo">
              <img :src="imgUrl"/>
            </div>
            <div class="header-user-info">
              <div class="header-user-info-name">{{showStaffName}}</div>
              <div class="header-user-info-address">{{showStaffOrg}}</div>
            </div>
          </div>
          <div class="dialog-header-score">
            <div class="dialog-header-score-detail">
              <span>KPI总得分</span><span class="dialog-header-score-number colorE33">{{showStaffScore}}</span><span class="colorE33">分</span>
            </div>
            <div class="dialog-header-score-date">{{showStaffTime}}</div>
          </div>
        </div>
        <div class="dialog_main">
          <el-table highlight-current-row header-row-class-name="tableHeader" :row-style="{height:'70px'}" style="width: 100%" :data="kpiDetail">
            <el-table-column label="考核项" align="center" prop="name">
            </el-table-column>
            <el-table-column label="指标值" align="center" prop="full_mark">
            </el-table-column>
            <el-table-column label="得分" align="center" prop="actual_score">
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="table_dialog_visible=false">确定</el-button>
          <el-button size="small" type="info" @click="table_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
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
        url: globalConfig.kpi,
        table_dialog_visible: false,
        choosedPeriod: 0,
        period:[
          {id: 0, title: '周度考核'},
          {id: 1, title: '月度考核'},
          {id: 2, title: '季度考核'},
          {id: 3, title: '半年度考核'},
          {id: 4, title: '年度考核'}
        ],
        week: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        weekData:[],
        monthData: [],
        seasonData: [],
        halfyearData: [],
        yearData: [],
        kpiDetail: [],
        showStaffName: '',
        showStaffOrg: '',
        showStaffTime: '',
        showStaffScore: 0,
        imgUrl:'',
      }
    },
    mounted() {
      this.getWeekData()
    },
    methods: {
      choosePeriod: function(index) {
        this.choosedPeriod = index
        switch (index) {
          case 0:
            this.getWeekData();
            break
          case 1:
            this.getMonthData();
            break
          case 2:
            this.getSeasonData();
            break
          case 3:
            this.getHalfyearData();
            break
          case 4:
            this.getYearData();
            break
        }
      },
      getWeekData: function() {
        let param = {
          search: 'myself'
        }
        this.weekData = []
        this.$http.get(`${this.url}kpi/week`,param).then(res => {
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].staff_name,
                department: res.data[i].org_name,
              }
              if(res.data[i].kpi.length > 0){
                obj.staff_id = res.data[i].kpi[0].staff_id
                for( let k = 0; k < res.data[i].kpi.length; k++){
                  switch (res.data[i].kpi[k].week) {
                    case '1':
                      obj['星期一'] = res.data[i].kpi[k].staff_score
                      obj['一'] = res.data[i].kpi[k].checked_at
                      break;
                    case '2':
                      obj['星期二'] = res.data[i].kpi[k].staff_score
                      obj['二'] = res.data[i].kpi[k].checked_at
                      break;
                    case '3':
                      obj['星期三'] = res.data[i].kpi[k].staff_score
                      obj['三'] = res.data[i].kpi[k].checked_at
                      break;
                    case '4':
                      obj['星期四'] = res.data[i].kpi[k].staff_score
                      obj['四'] = res.data[i].kpi[k].checked_at
                      break;
                    case '5':
                      obj['星期五'] = res.data[i].kpi[k].staff_score
                      obj['五'] = res.data[i].kpi[k].checked_at
                      break;
                    case '6':
                      obj['星期六'] = res.data[i].kpi[k].staff_score
                      obj['六'] = res.data[i].kpi[k].checked_at
                      break;
                    case '0':
                      obj['星期日'] = res.data[i].kpi[k].staff_score
                      obj['日'] = res.data[i].kpi[k].checked_at
                      break;
                  }
                }
              }
              this.weekData.push(obj)
            }
          }
        })
      },
      getMonthData: function() {
        let year = new Date();
        let param = {
          year: year.getFullYear(),
          search: 'myself'
        }
        this.monthData = []
        this.$http.get(`${this.url}kpi/month_year`,param).then(res => {
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].staff_info.name,
                department: res.data[i].org_info.name,
              }
              this.handleMonthKpi(obj,res.data[i].value);
              this.monthData.push(obj)
            }
          }
        })
      },
      getSeasonData: function() {
        let year = new Date()
        let param = {
          year: year.getFullYear(),
          search: 'myself'
        }
        this.seasonData = []
        this.$http.get(`${this.url}kpi/quarter_year`,param).then(res => {
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].staff_info.name,
                department: res.data[i].org_info.name,
              }
              for(let j = 0; j < res.data[i].value.length; j++){
                switch (res.data[i].value[j].quarter){
                  case 1:
                    obj.first = res.data[i].value[j].score
                    break;
                  case 2:
                    obj.second = res.data[i].value[j].score
                    break;
                  case 3:
                    obj.third = res.data[i].value[j].score
                    break;
                  case 4:
                    obj.forth = res.data[i].value[j].score
                    break;
                }
              }
              this.seasonData.push(obj)
            }
          }
        })
      },
      getHalfyearData: function() {
        let year = new Date()
        let param = {
          year: year.getFullYear(),
          search: 'myself'
        }
        this.halfyearData = []
        this.$http.get(`${this.url}kpi/half_year`,param).then(res => {
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].staff_info.name,
                department: res.data[i].org_info.name,
              }
              for(let j = 0; j < res.data[i].value.length; j++){
                if(res.data[i].value[j].half == '上半年'){
                  obj.first = res.data[i].value[j].score
                }
                if(res.data[i].value[j].half == '下半年'){
                  obj.second = res.data[i].value[j].score
                }
              }
              this.halfyearData.push(obj)
            }
          }
        })
      },
      getYearData: function() {
        let year = new Date()
        let param = {
          year: year.getFullYear(),
          search: 'myself'
        }
        this.yearData = []
        this.$http.get(`${this.url}kpi/year`,param).then(res => {
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].staff_name.name,
                department: res.data[i].org_name.name,
                yearScore: res.data[i].year_score ? res.data[i].year_score : '-'
              }
              this.yearData.push(obj)
            }
          }
        })
      },
      handleMonthKpi: function(obj,data) {
        let score = 0;
        for(let i = 0; i < data.length; i++){
          let strMonth = data[i].month;
          let numMonth = Number(strMonth.substring(strMonth.length-2))
          score += data[i].sum_score
          for(let j = 0; j < this.month.length; j++){
            let stringMonth = this.month[j]
            let numberMonth = Number(stringMonth.substring(0,stringMonth.length-1))
            if(numMonth == numberMonth) {
              obj[this.month[j]] = data[i].sum_score
            }
          }
          if(i == data.length-1) {
            obj.yearAverageScore = parseInt(score/12)
          }
        }
      },
      showKpiDetail: function (row,item,score) {
        this.showStaffName = row.name
        this. showStaffOrg = row.department
        this.showStaffTime = row[item.substring(item.length-1)]
        this.showStaffScore = score
        let param = {
          staff_id: row.staff_id,
          checked_at: new Date(this.showStaffTime),
          month_day_id: 0
        }
        this.kpiDetail= []
        this.$http.get(`${this.url}kpi`,param).then(res => {
          if (res.status === 200) {
            this.imgUrl = res.extend.avatar
            for(let i = 0; i < res.data.length; i++){
              let obj = {
                name: res.data[i].standard.name,
                full_mark: res.data[i].standard.full_mark,
                actual_score: res.data[i].actual_score
              }
              this.kpiDetail.push(obj)
            }
            this.table_dialog_visible = true
          }
        })
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
