<template>
  <div id="kpi">
    <div class="kpiTable">
      <div class="table">
        <el-table :data="weekData" v-if="choosedPeriod===0" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" align="center"></el-table-column>
          <el-table-column label="部门"  align="center"></el-table-column>
          <el-table-column v-for="(item, index) in week" :key="index" :label="item"  align="center"></el-table-column>
        </el-table >
        <el-table :data="monthData" v-if="choosedPeriod===1" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column v-for="(item, index) in month" :key="index" :label="item"  align="center"></el-table-column>
          <el-table-column label="年平均" align="center"></el-table-column>
        </el-table>
        <el-table  :data="seasonData" v-if="choosedPeriod===2" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column v-for="(item, index) in season" :key="index" :label="item"  align="right"></el-table-column>
        </el-table>
        <el-table  :data="halfyearData" v-if="choosedPeriod===3" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="上半年"  align="center" width="400px"></el-table-column>
          <el-table-column label="下半年"  align="center" width="400px"></el-table-column>
        </el-table>
        <el-table  :data="yearData" v-if="choosedPeriod===4" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="年度考核成绩" align="center" width="700px"></el-table-column>
        </el-table>
      </div>
      <div class="periodButton">
        <el-button v-for="(item, index) in period"  :key="index" @click="choosePeriod(index)" :class="choosedPeriod==index ? 'chooseButton' : 'changeButton'">{{item.title}}</el-button>
      </div>
    </div>
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        period:[
          {id: 0, title: '周度'},
          {id: 1, title: '月度'},
          {id: 2, title: '季度'},
          {id: 3, title: '半年度'},
          {id: 4, title: '年度'}
        ],
        week: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        season: ['第一季度','第二季度','第三季度','第四季度'],
        choosedPeriod: 0,
        weekData:[
          {
            name:"张艺兴",
            department: "苏州吴江组",
            monday: "8",
            tuesday: "7",
            wednesday: "6.5",
            thursday: "4.3",
            friday: "7",
            saturday: "6",
            sunday: "8"
          },
          {
            name:"张艺兴",
            department: "苏州吴江组",
            monday: "8",
            tuesday: "7",
            wednesday: "6.5",
            thursday: "4.3",
            friday: "7",
            saturday: "6",
            sunday: "8"
          },
          {
            name:"张艺兴",
            department: "苏州吴江组",
            monday: "8",
            tuesday: "7",
            wednesday: "6.5",
            thursday: "4.3",
            friday: "7",
            saturday: "6",
            sunday: "8"
          }
        ],
        monthData: [
          {
            name:"张艺兴",
            department: "苏州吴江组",
          },
        ],
        seasonData: [

        ],
        halfyearData: [

        ],
        yearData: [

        ]
      }
    },
    methods:{
      choosePeriod: function(index) {
        this.choosedPeriod = index
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/kpi/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin kpiImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/kpi/' + $n + '/' + $m;
    @include bgImage($url);
  }
</style>
