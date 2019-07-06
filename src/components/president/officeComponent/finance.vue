<template>
  <div id="finance">
    <!--左边部分-->
    <div class="finance_left">
      <!--时间和地点-->
      <div class="date_location">
        <DatePicker @confirmDate="comfirm"></DatePicker>
        <div class="location">
          <span>{{cityName || '--'}}</span>
          <img src="../../../assets/image/president/common/didian.png" alt="">
        </div>
      </div>
      <!-- 入职,离职-->
      <div class="entry_leave_trend border_bg">

      </div>
    </div>
    <!--中间部分-->
    <div class="finance_middle">
      <ChooseCity :citylist="cityArr" @selectedCity="chooseCityFun"></ChooseCity>
    </div>
    <!--右边部分-->
    <div class="finance_right border_bg">


    </div>
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  import ChooseCity from  '../../common/president-component/choosecity.vue';   //城市
  import echarts from 'echarts';
  import './js/marketing.js';       //引入js

  export default {
    components: { DatePicker, ChooseCity },
    name: "finance",
    data() {
      return {
        educationObj:{   //玫瑰图
          legendData:[],
          data:[]
        },
        start:'',    //开始时间
        end:'',      //结束时间
        //详情
        cityArr:[],           //城市
        cityName:'',                //选中的城市名
      };
    },
    mounted() {

    },
    activated() {
      this.getCommonCitys();

    },
    watch: {},
    computed: {},
    methods: {
      //选择时间
      comfirm(val){
        this.start = val.start_date;
        this.end = val.end_date;
        if(this.cityName !== ''){
          console.log(this.cityName);
        }
      },
      //选择城市
      chooseCityFun(val){
        this.cityName = val;

      },
      //获取城市
      getCommonCitys(){
        this.$http.post(globalConfig.president_sever + "/v1.0/common/get_citys").then(res => {
          if(res) {
            this.cityArr = res;
          }
        })
      }

    },

  };
</script>


<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/finance/finance.scss";

  #finance{

  }
</style>
