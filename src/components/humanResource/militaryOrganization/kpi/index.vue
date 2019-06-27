<template>
  <div id="kpi">
    <div class="bar"></div>
    <div class="kpiTable">
      <div class="table">
        <el-table :data="weekData" v-if="choosedPeriod===0" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="部门" align="center" prop="department"></el-table-column>
          <el-table-column v-for="(item, index) in week" :key="index" :label="item" align="center" :prop="item"></el-table-column>
        </el-table>
        <el-table :data="monthData" v-if="choosedPeriod===1" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column v-for="(item, index) in month" :key="index" :label="item" align="center" :prop="item"></el-table-column>
          <el-table-column label="年平均" align="center" prop="yearAverageScore"></el-table-column>
        </el-table>
        <el-table :data="seasonData" v-if="choosedPeriod===2" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="第一季度" prop="first" align="right"></el-table-column>
          <el-table-column label="第二季度" prop="second" align="right"></el-table-column>
          <el-table-column label="第三季度" prop="third" align="right"></el-table-column>
          <el-table-column label="第四季度" prop="forth" align="right"></el-table-column>
        </el-table>
        <el-table :data="halfyearData" v-if="choosedPeriod===3" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="上半年" prop="first" align="center"></el-table-column>
          <el-table-column label="下半年" prop="second" align="center"></el-table-column>
        </el-table>
        <el-table :data="yearData" v-if="choosedPeriod===4" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="年度考核成绩" prop="yearScore" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="periodButton">
        <el-button v-for="(item, index) in period" :key="index" @click="choosePeriod(index)" :class="choosedPeriod==index ? 'chooseButton' : 'changeButton'">{{item.title}}</el-button>
      </div>
    </div>
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="10"></el-pagination>
      </div>
    </footer>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
  </div>
</template>

<script>
import SearchHigh from '../../../common/searchHigh.vue';
import { kpiSearch } from "../../../../assets/js/allSearchData.js"
export default {
  name: "index",
  components: {
    SearchHigh
  },
  props: ["showSearch"],
  data () {
    return {
      url: globalConfig.kpi,
      currentPage: 1,
      kpiSearch,
      searchData: {},
      total: 0,
      period: [
        { id: 0, title: '周度' },
        { id: 1, title: '月度' },
        { id: 2, title: '季度' },
        { id: 3, title: '半年度' },
        { id: 4, title: '年度' }
      ],
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      choosedPeriod: 0,
      weekData: [],
      monthData: [],
      seasonData: [],
      halfyearData: [],
      yearData: [],
    }
  },
  mounted () {
    this.getWeekData()
    this.searchData = this.kpiSearch
  },
  watch: {
    currentPage () {
      switch (this.choosedPeriod) {
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
  },

  methods: {
    getWeekData: function () {
      let param = {
        page: this.currentPage,
        limit: 9
      }
      this.weekData = []
      this.$http.get(`${this.url}kpi/week`, param).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              name: res.data[i].staff_name,
              department: res.data[i].org_name,
            }
            for (let k = 0; k < res.data[i].kpi.length; k++) {
              switch (res.data[i].kpi[k].week) {
                case '1':
                  obj['星期一'] = res.data[i].kpi[k].staff_score
                  break;
                case '2':
                  obj['星期二'] = res.data[i].kpi[k].staff_score
                  break;
                case '3':
                  obj['星期三'] = res.data[i].kpi[k].staff_score
                  break;
                case '4':
                  obj['星期四'] = res.data[i].kpi[k].staff_score
                  break;
                case '5':
                  obj['星期五'] = res.data[i].kpi[k].staff_score
                  break;
                case '6':
                  obj['星期六'] = res.data[i].kpi[k].staff_score
                  break;
                case '0':
                  obj['星期日'] = res.data[i].kpi[k].staff_score
                  break;
              }
            }
            this.weekData.push(obj)
          }
        }
      })
    },
    getMonthData: function () {
      let year = new Date()
      let param = {
        year: year.getFullYear(),
        page: this.currentPage,
        limit: 9
      }
      this.monthData = []
      this.$http.get(`${this.url}kpi/month_year`, param).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              name: res.data[i].staff_info?.name,
              department: res.data[i].org_info.name,
            }
            this.handleMonthKpi(obj, res.data[i].value);
            this.monthData.push(obj)
          }
        }
      })
    },
    getSeasonData: function () {
      let year = new Date()
      let param = {
        year: year.getFullYear(),
        page: this.currentPage,
        limit: 9
      }
      this.seasonData = []
      this.$http.get(`${this.url}kpi/quarter_year`, param).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              name: res.data[i].staff_info?.name,
              department: res.data[i].org_info.name,
            }
            for (let j = 0; j < res.data[i].value.length; j++) {
              switch (res.data[i].value[j].quarter) {
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
    getHalfyearData: function () {
      let year = new Date()
      let param = {
        year: year.getFullYear(),
        page: this.currentPage,
        limit: 9
      }
      this.halfyearData = []
      this.$http.get(`${this.url}kpi/half_year`, param).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              name: res.data[i].staff_info?.name,
              department: res.data[i].org_info.name,
            }
            for (let j = 0; j < res.data[i].value.length; j++) {
              if (res.data[i].value[j].half == '上半年') {
                obj.first = res.data[i].value[j].score
              }
              if (res.data[i].value[j].half == '下半年') {
                obj.second = res.data[i].value[j].score
              }
            }
            this.halfyearData.push(obj)
          }
        }
      })
    },
    getYearData: function () {
      let year = new Date()
      let param = {
        year: year.getFullYear(),
        page: this.currentPage,
        limit: 9
      }
      this.yearData = []
      this.$http.get(`${this.url}kpi/year`, param).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
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
    handleMonthKpi: function (obj, data) {
      let score = 0;
      for (let i = 0; i < data.length; i++) {
        let strMonth = data[i].month;
        let numMonth = Number(strMonth.substring(strMonth.length - 2))
        score += data[i].sum_score
        for (let j = 0; j < this.month.length; j++) {
          let stringMonth = this.month[j]
          let numberMonth = Number(stringMonth.substring(0, stringMonth.length - 1))
          if (numMonth == numberMonth) {
            obj[this.month[j]] = data[i].sum_score
          }
        }
        if (i == data.length - 1) {
          obj.yearAverageScore = parseInt(score / 12)
        }
      }
    },
    choosePeriod (index) {
      this.choosedPeriod = index
      switch (this.choosedPeriod) {
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
    hiddenModule(val){
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/humanResource/militaryOrganization/kpi/index.scss";

@mixin militaryImg($m, $n) {
  $url: "../../../../assets/image/humanResource/militaryOrganization/" + $n +
    "/" + $m;
  @include bgImage($url);
}

@mixin kpiImg($m, $n) {
  $url: "../../../../assets/image/humanResource/militaryOrganization/kpi/" + $n +
    "/" + $m;
  @include bgImage($url);
}
</style>
