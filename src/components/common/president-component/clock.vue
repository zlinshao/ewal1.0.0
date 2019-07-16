<template>
  <div id="clockTime">
      <Clock></Clock>
      <div class="date_time">
        <span class="time">{{time}}</span>
        <span class="date">{{date}}</span>
      </div>
  </div>
</template>

<script>
  import Clock from "vue-clock2";
  export default {
    name: "ClockTime",    //时钟
    components:{Clock},
    data(){
      return{
        time:'',
        date:''
      }
    },
    mounted() {
      this.date=this.getDate();
      this.getTime();
    },
    activated(){
    },
    watch:{
    },
   methods:{
     //获取当前的年月日
     getDate(){
       let date = new Date();
       let y = date.getFullYear();
       let m = date.getMonth() + 1;
       let d = date.getDate();
       m = m < 10 ? '0' + m : m;
       d = d < 10 ? '0' + d : d;
       return y + '年' + m+ '月' + d + '日';
     },
      //获取当前的时分秒
      getTime(){
        let time = new Date();
        let H = time.getHours();
        let M = time.getMinutes();
        let S =time.getSeconds();
         // H = H < 10 ? '0' + H: H;
         M = M < 10 ? '0' + M : M;
         S = S < 10 ? '0' + S : S;
        this.time= H+ ':' + M+ ':' +  S;
        setTimeout(() => {
          this.getTime();
        }, 1000);
      },
    }

  }
</script>

<style lang="scss">
  #clockTime{
    .clock{
      width: 100px;
      height: 100px;
      margin:auto 28px auto 0;
      .clock-circle{
        width: 5px;
        height: 5px;
        background-color:#00FFFF;
        border: 2px solid #00FFFF;
      }
      .clock-circle:before{
        width: 2px;
        height: 2px;
        background-color:#00FFFF;
      }
      .clock-hour, .clock-minute, .clock-second{
        background-color:#00FFFF;
      }
    }
  }
</style>

<style scoped lang="scss">
  @import "../../../assets/scss/president/common.scss";
  #clockTime{
    display: flex;
    justify-content: flex-start;
    .date_time{
      color:#00FFFF;
      margin: auto 0;
      span{
        display: block;
      }
      .time{
        font-size:30px;
        font-weight: bold;
      }
      .date{
        font-size:16px;
      }
    }
  }
</style>
