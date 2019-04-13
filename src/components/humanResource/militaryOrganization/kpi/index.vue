<template>
  <div id="kpi">
    <div class="kpiTable">
      <div class="table">
        <el-table :data="weekData" v-if="choosePeriod===0" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="星期一" prop="monday" align="center"></el-table-column>
          <el-table-column label="星期二" prop="tuesday" align="center"></el-table-column>
          <el-table-column label="星期三" prop="wednesday" align="center"></el-table-column>
          <el-table-column label="星期四" prop="thursday" align="center"></el-table-column>
          <el-table-column label="星期五" prop="friday" align="center"></el-table-column>
          <el-table-column label="星期六" prop="saturday" align="center"></el-table-column>
          <el-table-column label="星期日" prop="sunday" align="center"></el-table-column>
        </el-table >
        <el-table :data="monthData" v-if="choosePeriod===1" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="1月"  align="center"></el-table-column>
          <el-table-column label="2月"  align="center"></el-table-column>
          <el-table-column label="3月"  align="center"></el-table-column>
          <el-table-column label="4月"  align="center"></el-table-column>
          <el-table-column label="5月"  align="center"></el-table-column>
          <el-table-column label="6月"  align="center"></el-table-column>
          <el-table-column label="7月"  align="center"></el-table-column>
          <el-table-column label="8月"  align="center"></el-table-column>
          <el-table-column label="9月"  align="center"></el-table-column>
          <el-table-column label="10月" align="center"></el-table-column>
          <el-table-column label="11月" align="center"></el-table-column>
          <el-table-column label="12月" align="center"></el-table-column>
          <el-table-column label="年平均" align="center"></el-table-column>
        </el-table>
        <el-table  :data="seasonData" v-if="choosePeriod===2" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="第一季度" align="right"></el-table-column>
          <el-table-column label="第二季度" align="right"></el-table-column>
          <el-table-column label="第三季度" align="right"></el-table-column>
          <el-table-column label="第四季度" align="right"></el-table-column>
        </el-table>
        <el-table  :data="halfyearData" v-if="choosePeriod===3" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="上半年"  align="center" width="400px"></el-table-column>
          <el-table-column label="下半年"  align="center" width="400px"></el-table-column>
        </el-table>
        <el-table  :data="yearData" v-if="choosePeriod===4" highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="姓名" prop="name" align="center" width="200px"></el-table-column>
          <el-table-column label="部门" prop="department" align="center" width="200px"></el-table-column>
          <el-table-column label="年度考核成绩" align="center" width="700px"></el-table-column>
        </el-table>
      </div>
      <div class="periodButton">
        <el-button v-for="(item, index) in period"  :key="index" @click="handleTable(index)" :class="choosePeriod==index ? 'chooseButton' : 'changeButton'">{{item.title}}</el-button>
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
        choosePeriod: 0,
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
      handleTable: function(index) {
        this.choosePeriod = index
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
    #kpi {
      background-color: white;
      height: 100%;
        .kpiTable{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .table{
            width: 100%;
            margin-right: 148px;
          }
          .periodButton{
            height: 165px;
            margin-top: 67px;
            display: flex;  
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            .changeButton{
              width: 65px;
              height:25px;
              padding-top: 5px;
              display: flex;
              justify-content: center;
              background:rgba(223,223,223,1);
              font-family: MicrosoftYaHei;
              font-size:9px;
              line-height:12px;
              border-radius: 5px 0px 0px 5px;
              &:hover{
                background-color: rgba(207,46,51,1);
                color:white;
              }
            }
            .chooseButton{
              width: 65px;
              height:25px;
              padding-top: 5px;
              display: flex;
              justify-content: center;
              background-color: rgba(207,46,51,1);
              color:white;
              font-family: MicrosoftYaHei;
              font-size:9px;
              line-height:12px;
              border-radius: 5px 0px 0px 5px;
            }
          }
        }
    }
</style>
