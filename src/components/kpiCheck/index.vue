<template>
  <div id="kpiCheck">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <img :src="imgUrl"/>
        <div>
          <h3 class="personName">张艺兴</h3>
          <h3 class="timeInfo">1月KPI考核</h3>
        </div>
      </div>
    </div>
    <div class="kpiCheckContainer">
      <el-table highlight-current-row header-row-class-name="tableHeader">
          <el-table-column label="考勤天数" align="center"></el-table-column>
          <el-table-column label="不达标天数" align="center"></el-table-column>
          <el-table-column v-for="(item,index) in days" :key="index" :label="item.toString()" align="center" width="50px"></el-table-column>
      </el-table>
      <div class="assessmentDetail">
        <el-table highlight-current-row header-row-class-name="tableHeader" >
          <el-table-column label="考核项" align="left"></el-table-column>
          <el-table-column label="指标值" align="center"></el-table-column>
          <el-table-column label="得分" align="right"></el-table-column>
          <el-table-column  align="center"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination :total="25" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="5"></el-pagination>
        </div>
        <el-button class="footButton" @click="confirm()">确定</el-button>
      </div>
    </div>
    <lj-dialog :visible="dialogVisible" :size="{width: 700 + 'px',height: 600 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>申诉</h3>
        </div>
        <div class="dialog_main">
          <el-table highlight-current-row header-row-class-name="tableHeader" >
            <el-table-column label="考核项" align="center"></el-table-column>
            <el-table-column label="指标值" align="center"></el-table-column>
            <el-table-column label="得分" align="center"></el-table-column>
          </el-table>
          <div class="textArea">
            <el-input type="textarea" v-model="feedBack" rows='4'></el-input>
          </div>
          <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <img :src="imgUrl"/>
                <div>
                  <h3 class="personNameTime">张艺兴<span>2019-02-23</span></h3>
                  <h3 class="info">有异议，当天休息，无法进行审批处理<span>评论</span></h3>
                </div>
              </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info">取消</el-button>
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
        imgUrl: require('../../assets/image/todoList/components/humanResource/theme1/rili.png'),
        dialogVisible: false,
        feedBack: '反馈：',
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
    methods: {
      confirm: function(){
        this.dialogVisible = !this.dialogVisible
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/kpiCheck/index.scss";

</style>
