<template>
  <div id="dateRange">
   <el-date-picker
     v-model="date"
     type="daterange"
     @change="changeDate"
     align="right"
     unlink-panels
     range-separator="至"
     start-placeholder="开始日期"
     end-placeholder="结束日期"
     >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "dateRange",   //网络页面的时间组件
    props:[],
    data(){
      return{
        date:[],
      }
    },
    mounted() {
      //默认展示一周的时间
      let start_date = new Date();
      let end_date = new Date();
      start_date.setTime(start_date.getTime() - 3600 * 1000 * 24 * 7);
      this.date=[ start_date,end_date]
      this.changeDate(this.date);
    },
    activated(){

    },
    watch:{
    },
    methods:{
      //选择时间
      changeDate(val){
        let start=this.dateToString(val[0]);
        let end=this.dateToString(val[1]);
        let param={
          start:start,
          end:end
        };
        this.$emit('confirmDate',param);
      },

      //转换时间格式
      dateToString(date){
        let week = new Date(date);
        let y = week.getFullYear();
        let m = week.getMonth() + 1;
        let d = week.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m+ '-' + d ;
      }
    }
  }
</script>

<style lang="scss">
  #dateRange {
    text-align: right;
    cursor: pointer;
    .el-input__inner{
      background:url("../../../assets/image/president/rili.png") no-repeat;
      background-position: right;
      background-size:21px;
      border: none;
      color: #FFF;
      padding: 0px;
      font-size: 14px;
      cursor: pointer;
    }
    .el-range-editor {
      display: inline;
      .el-range-input , .el-range-separator{
        color: #FFF;
        padding: 0px;
        font-size: 14px;
      }
    }

    //隐藏左边日历图标和删除图标
    .el-input__icon {
      display: none;
    }
  }
</style>

<style scoped lang="scss">
  #dateRange{

  }
</style>
