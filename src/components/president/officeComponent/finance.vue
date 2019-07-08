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
      <!-- 左边图表-->
      <div class="left_charts border_bg">
        <p class="label_num"><span class="label">{{end}}亏损额度</span><span class="num">{{queryLastLosses}}</span></p>
        <div id="amountlossEcharts"></div>
        <div class="progress">
          <p class="progress_list" v-for="(item,index) in progressList">
            <span class="progress_label" :style="{color:item.color}">{{item.name}}</span>
            <span class="progress_bar">
              <span class="progress_bar_active" :class="'progress_bar_active' + index" :style="{width:item.value+'%'}"></span>
            </span>
            <span class="progress_value">{{item.value+'%'}}</span>
          </p>
        </div>
      </div>
    </div>
    <!--中间部分-->
    <div class="finance_middle">
      <ChooseCity :citylist="cityArr" @selectedCity="chooseCityFun"></ChooseCity>
    </div>
    <!--右边部分-->
    <div class="finance_right">
      <!--玫瑰图 -->
      <div class="rose_echats border_bg" id="incomeRoseEcharts"></div>
     <!--盈亏比 -->
      <div class="profit_loss border_bg">
        <div class="profit_loss_title">
          <p class="label_num"><span class="label">盈亏比</span><span class="num">{{profitLossRatio}}</span></p>
          <span class="title_legend">
            <span class="legend_icon legend_icon1"></span><span class="legend_name">收入金额</span>
            <span class="legend_icon legend_icon2"></span><span class="legend_name">支出金额</span>
          </span>
        </div>
        <div id="profitLossEcharts"></div>
      </div>
      <!--风险系数 -->
      <div class="risk_factor border_bg">
        <p class="label">风险系数</p>
        <div class="risk_factor_echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  import ChooseCity from  '../../common/president-component/choosecity.vue';   //城市
  import echarts from 'echarts';
  import './js/marketing.js';       //引入js
  import './js/finance.js';         //引入js

  export default {
    components: { DatePicker, ChooseCity },
    name: "finance",
    data() {
      return {
        start:'',                  //开始时间
        end:'',                   //结束时间
        cityName:'',                //选中的城市名
        incomeRoseObj:{            //玫瑰图
          legendData:[],
          data:[
            {value:0, name:'房租',key:'rent'},
            {value:0, name:'定金',key:'bargain'},
            {value:0, name:'尾款',key:'retainage'},
            {value:0, name:'滞纳金',key:'overdue'},
            {value:0, name:'违约金',key:'liquidated'},
            {value:0, name:'定金不退',key:'deposit'},
          ]
        },
        progressList: [                //进度条
          {key:'vacancy_fee',name:'朝置空房源',color: '#BA25DC', value: 0},
          {key:'liquidated',name:'公司违约',color: '#8047CC', value: 0},
          {key:'responsibility_fee',name:'公司认责费用',color: '#3262EC', value: 0},
          {key:'recv_rent_gap',name:'收租差价',color: '#FF564F', value: 0},
          {key:'agency_fee',name:'中介费',color: '#53C13B', value: 0}
        ],
        optionAmountloss:{},     //亏损量
        optionIncomeRose:{},     //玫瑰图
        optionProfitLoss:{},     //盈亏比
        //详情
        cityArr:[],               //城市
        lossDetail:{},            //亏损量
        queryLastLosses:'--',       //亏损额度
        profitLossDetail:{},     //盈亏比
        profitLossRatio:'--',      //盈亏比数值
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
      //获取城市
      getCommonCitys(){
        this.$http.post(globalConfig.president_sever + "/v1.0/common/get_citys").then(res => {
          if(res) {
            this.cityArr = res;
          }
        })
      },
      //选择时间
      comfirm(val){
        this.start = val.start_date;
        this.end = val.end_date;
        if(this.cityName !== ''){
          this.getLossDetail();    //亏损量
          this.getIncomeDisburseDetail();    // 盈亏比
        };

      },
      //选择城市
      chooseCityFun(val){
        this.cityName = val;
        this.getLossDetail();    //亏损量
        this.getIncomeDisburseDetail();    // 盈亏比
      },

      //一.获取:亏损详情
      getLossDetail(){
        let param={
          start:this.start,
          end:this.end,
          city:this.cityName
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/finance/income_and_disburse_detail  ",param).then(res => {
          if(res) {
            this.lossDetail = res.data;
            this.queryLastLosses =  this.lossDetail.disbursement.query_last_losses;  //亏损额度
            this.dealRoseFun('rose');   //玫瑰图数据处理
            this.dealRoseFun('progress');   //进度条数据处理
            this.drawEchartsLossAmount();   //亏损量,进度条,玫瑰图
          }
        })
      },


      //二.获取:收入、支出
      getIncomeDisburseDetail(){
        let param={
          start:this.start,
          end:this.end,
          city:this.cityName
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/finance/income_and_disburse ",param).then(res => {
          if(res) {
            this.profitLossDetail = res.data;
            this.profitLossRatio = this.profitLossDetail.profit_and_loss_ratio;  //盈亏比
            this.drawEchartsProfitLoss();   //盈亏比
          }
        })
      },


      drawEchartsLossAmount(){
        //1.亏损量
        let param1 = {
          type:'folder',
          name:'亏损量',
          color1:'rgba(0,255,255,0.5)',
          color2:'rgba(0,255,255,0.1)',
          xData:this.lossDetail.disbursement.x,
          yData:this.lossDetail.disbursement.losses_sum,
        };
        this.optionAmountloss = JSON.parse(JSON.stringify(optionFolder));
        this.setOptionsFun(this.optionAmountloss, param1 ,'amountlossEcharts');


        //2.玫瑰图
        let param2 = {
          type:'pierose',
          color: ['#F64C7E','#FFCC4D','#9ECD68','#56CDFD','#477DDB','#0757B6','#6545AA'],
          legendData:this.incomeRoseObj.legendData,
          yData1: this.incomeRoseObj.data,
          formatter: "{b}: {c} <br/> 占比: {d}%",
        };
        this.optionIncomeRose = JSON.parse(JSON.stringify(optionRose));
        this.setOptionsFun(this.optionIncomeRose, param2 ,'incomeRoseEcharts');


      },

      drawEchartsProfitLoss(){
        //3.盈亏比
        let param3 = {
          type:'lineareacross',
          color1:['rgba(50,197,255,1)','rgba(32,224,84,1)'],
          color2:['rgba(182,32,224,1)','rgba(247,181,0,1)'],
          xData:this.profitLossDetail.x,
          yData1:this.profitLossDetail.income,
          yData2:this.profitLossDetail.disburse,
        };
        this.optionProfitLoss = JSON.parse(JSON.stringify(optionIncomeSpend));
        this.setOptionsFun(this.optionProfitLoss, param3 ,'profitLossEcharts');
      },



      //设置图表的属性
      setOptionsFun(optionCurrent, param, id) {
        //1.亏损量
        if(param.type === 'folder'){
          optionCurrent.series[0].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color:param.color1
          }, {
            offset: 1,
            color:param.color2
          }]);
          optionCurrent.xAxis[0].data = param.xData;
          optionCurrent.series[0].data =param.yData;
        }

        //2.玫瑰饼图
        if(param.type === 'pierose'){
          optionCurrent.color = param.color;
          optionCurrent.legend.textStyle.color = param.color;
          optionCurrent.legend.data = param.legendData;
          optionCurrent.series[0].data = param.yData1;
          optionCurrent.tooltip.formatter = param.formatter;
        }

        // 3.盈亏比
        if(param.type === 'lineareacross'){
          optionCurrent.series[0].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color:param.color1[0]
          }, {
            offset: 1,
            color:param.color1[1]
          }]);
          optionCurrent.series[1].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color:param.color2[0]
          }, {
            offset: 1,
            color:param.color2[1]
          }]);
          optionCurrent.xAxis[0].data = param.xData;
          optionCurrent.series[0].data= param.yData1;
          optionCurrent.series[1].data= param.yData2;
        }

        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
      },

      //数据处理
      dealRoseFun(falg){
        if(falg === 'rose'){   //玫瑰图
          this.incomeRoseObj.legendData=[];
          this.incomeRoseObj.data.forEach((item,index)=>{
            this.incomeRoseObj.legendData.push(item.name);
            item.value=this.lossDetail.income[item.key];
          })
        }else if(falg === 'progress'){   //进度条
          this.progressList.forEach((item,index)=>{
            item.value=this.lossDetail.disbursement[item.key];
          })
        }

      },


    },

  };
</script>


<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/finance/finance.scss";

  #finance{
    .risk_factor_echarts{
      background:url('../../../assets/image/president/finance/wushuju.png') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
