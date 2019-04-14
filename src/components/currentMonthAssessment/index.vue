<template>
  <div id="currentMonthAssessment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <h2>本月考核</h2>
      </div>
      <div class="items-center listTopRight">
        <div class="daochu"></div>
        <div class="icons search"></div>
      </div>
    </div>
    <div class="currentMonthAssessmentContainer">
      <div class="containerTop">
        <button>KPI确认</button>
        <div></div>
        <h2>全选</h2>
      </div>
      <el-table highlight-current-row header-row-class-name="tableHeader">
          <el-table-column align="right">
            <template slot-scope="scope">
              <div></div>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center"></el-table-column>
          <el-table-column label="部门" align="center"></el-table-column>
          <el-table-column v-for="(item,index) in days" :key="index" :label="item.toString()" align="center" width="40px"></el-table-column>
          <el-table-column label="发送状态" align="center">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="确认状态" align="center">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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

      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      days: function(){
        var day =  []
        var year = new Date().getFullYear()
        var month = new Date().getMonth()
        for(var i =0; i< new Date(year,month+1,0).getDate();i++){
          day[i] = i+1
        }
        return day
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/currentMonthAssessment/index.scss";

  @mixin currentMonthAssessmentImg($m, $n) {
    $url: '../../assets/image/currentMonthAssessment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #currentMonthAssessment {
      .listTopRight{
        .daochu{
          @include currentMonthAssessmentImg('daochu.png','theme1')
        }
      }
    }
  }

  #theme_name.theme2 {
    #currentMonthAssessment {

    }
  }

  #theme_name.theme3 {
    #currentMonthAssessment {

    }
  }

  #theme_name.theme4 {
    #currentMonthAssessment {

    }
  }
</style>
