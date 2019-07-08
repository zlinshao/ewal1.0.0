<template>
  <div id="datePicker">
    <div class="rili">
      <span>{{start_date}}</span>
      <span>至</span>
      <span class="picker_end_date">
        <el-date-picker v-model="end_date" type="date"   @change="changeDate"  :picker-options="pickerOptions"></el-date-picker>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DatePicker",
    props:[],
    data(){
      return{
        start_date:'',
        end_date:'',
        //禁止未来时间
        pickerOptions:{
          disabledDate:(time) => {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    mounted() {
      //默认是今天时间
      this.end_date = new Date();
      this.changeDate(this.end_date);
    },
    activated(){
    },
    watch:{
    },
    methods:{
      //时间范围为一周
      changeDate(val){
        let date=val.getTime() - 3600 * 1000 * 24 * 6;
        this.start_date=this.dateToString(date);
        this.end_date=this.dateToString(val);
        let param={
          start_date:this.start_date,
          end_date:this.end_date
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
  #datePicker {
      .el-input__inner{
        background:url("../../../assets/image/president/rili.png") no-repeat;
        background-position: right;
        background-size:21px;
        border: none;
        color: #FFF;
        padding: 0px;
        font-size: 14px;
      }
    //隐藏左边日历图标和删除图标
    .el-input__icon {
      display: none;
    }
  }
</style>

<style scoped lang="scss">
  #datePicker{
    color: #fff;
    font-size: 14px;
    .picker_end_date{
      width: 110px;
      display: inline-block;
    }
  }
</style>
