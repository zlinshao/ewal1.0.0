<template>
  <div id="totalNum">
    <div class="totalNum_info">
      <div class="nums_order">
        <span class="num_img" v-for="(item,index) in num1">{{item}}</span>
        <img  src="../../../assets/image/president/home/pause_symbol.png" alt="">
        <span class="num_img" v-for="(item,index) in num2">{{item}}</span>
        <img  src="../../../assets/image/president/home/pause_symbol.png" alt="">
        <span class="num_img" v-for="(item,index) in num3">{{item}}</span>
        <img  src="../../../assets/image/president/home/comma_symbol.png" alt="">
        <span class="num_img" v-for="(item,index) in decimal">{{item}}</span>
      </div>
      <img  src="../../../assets/image/president/home/yeji_total.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "TotalNum",
    props:['numTotal'],
    data(){
      return{
        newNum:'',
        num1:[],
        num2:[],
        num3:[],
        decimal:[],
      }
    },
    mounted() {
    },
    activated(){
      this.getData();
    },
    watch:{
      numTotal(val,oldVal) {
          this.getData();
      },
    },
    methods:{
     //处理数据
      getData(){
        let index = this.numTotal.indexOf('.');
        let newNumTotal = '';
        //判断是否有小数点，没有就补充两位小数0
        if(index === -1){
          let str = '.00';
          newNumTotal = this.numTotal+str;
          index = newNumTotal.indexOf('.');
        }else{
         newNumTotal = this.numTotal;
        }

        //整数位一共8位，少于8位时，高位上就用0代替
        if(index < 8){
          let str='0';
          str = str.repeat(8-index);
          this.newNum = str+newNumTotal;
        }else{
          this.newNum = newNumTotal;
        }

        let newIndex = this.newNum.indexOf('.');
        console.log(this.newNum);
        //substring不包含最后一位
        this.decimal = this.newNum.substring(newIndex+1,newIndex+3);       //截取小数点后的两位数
        this.num3 = this.newNum.substring(newIndex-3,newIndex);           //截取个，十，百位的数字
        this.num2 = this.newNum.substring(newIndex-6,newIndex-3);         //截取千，万，十万位的数字
        this.num1 = this.newNum.substring(newIndex-8,newIndex-6);         //截取百万，千万的数字
      },

    }

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/president/common.scss";
  #totalNum{
    width: 100%;
    height: 150px;
    margin-top: -70px;
    display: flex;
    justify-content: center;
    .totalNum_info{
      width: 95%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .nums_order{
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: auto;
        .num_img{
          display: inline-block;
          width: 45px;
          height: 92px;
          background: url("../../../assets/image/president/home/shuzi.png") no-repeat;
          background-size: 100% 100%;
          font-size:50px;
          color: #00FFFF;
          font-weight: bold;
          text-align: center;
          line-height: 92px;
        }
        .nums_order:last-child{
          margin-right: 0px;
        }
        img{
          width: 10px;
          height: 10px;
        }
      }
      img{
        width: 100%;
        height: 60px;
        margin-top: -10px;
      }
    }

  }
</style>
