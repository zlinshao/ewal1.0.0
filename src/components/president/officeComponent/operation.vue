<template>
  <div id="operation">
    <!--左边部分-->
    <div class="operation_left ">
      <!--时间和地点-->
      <div class="date_location">
        <DatePicker @confirmDate="comfirm"></DatePicker>
        <div class="location">
          <span>{{cityName || '--'}}</span>
          <img src="../../../assets/image/president/common/didian.png" alt="">
        </div>
      </div>
      <div class="left_charts">
        <!--电话-->
        <div class="phone border_bg">
          <p class="title">{{'400'}}电话</p>
          <div class="phone_num">
            <p class="label_num"><span class="label">今日呼入量</span><span class="num">{{callerDetail.query_day_callin_num == undefined? '--':callerDetail.query_day_callin_num}}</span></p>
            <p class="label_num"><span class="label">今日接起量</span><span class="num">{{callerDetail.query_day_answered_num == undefined? '--':callerDetail.query_day_answered_num}}</span></p>
          </div>
          <div class="phone_echarts">
            <div id="asnswerRateEcharts" ></div>
            <div id="satisfaDegreeEcharts" ></div>
            <div id="oneSoluteEcharts" ></div>
          </div>
        </div>
        <!--在线满意度-->
        <div class="satisfaction border_bg">
          <p class="title">在线满意度</p>
          <div class="echarts_num">
            <div id="onlineSatisfaEcharts"></div>
            <span class="line"></span>
            <div class="num_info">
              <p class="label_num"><span class="label">72小时重复来电(次)</span><span class="num">{{inlineDetail.repetition_nums_72h == undefined? '--':inlineDetail.repetition_nums_72h}}</span></p>
              <p class="label_num"><span class="label">首次响应时长</span><span class="num">{{inlineDetail.first_answered_seconds== undefined? '--':inlineDetail.first_answered_seconds}}</span></p>
              <p class="label_num"><span class="label">平均接单量</span><span class="num">{{inlineDetail.avg_recv_order_nums== undefined? '--':inlineDetail.avg_recv_order_nums}}</span></p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--中间部分-->
    <div class="operation_middle">
      <ChooseCity :citylist="cityArr" @selectedCity="chooseCityFun"></ChooseCity>
    </div>
    <!--右边部分-->
    <div class="operation_right">
      <!--资料审核-->
      <div class="material_audit border_bg">
        <p class="title">资料审核</p>
        <div class="num_charts">
          <p class="label_num"><span class="label">总上传单数</span><span class="num">{{dataCheckDetail.total_upload_num== undefined? '--':dataCheckDetail.total_upload_num}}</span></p>
          <p class="label_num"><span class="label">通过单数</span><span class="num">{{dataCheckDetail.pass_num== undefined? '--':dataCheckDetail.pass_num}}</span></p>
          <div id="auditPassEcharts"></div>
        </div>
      </div>
      <!--资料回访-->
      <div class="material_return border_bg">
        <p class="title">资料回访</p>
        <div class="return_total_call">
          <!-- 总回访-->
          <div class="return_total">
            <div class="num_charts">
              <p class="label_num"><span class="label">总回访数</span><span class="num">{{dataCallbackDetail.total_second_visit_num== undefined? '--':dataCallbackDetail.total_second_visit_num}}</span></p>
              <p class="label_num"><span class="label">回访通过数</span><span class="num">{{dataCallbackDetail.total_second_visit_pass_num== undefined? '--':dataCallbackDetail.total_second_visit_pass_num}}</span></p>
              <div id="totalPassEcharts"></div>
            </div>
            <div id="returnTotalEcharts"></div>
          </div>
          <div class="return_total">
            <div class="num_charts">
              <p class="label_num"><span class="label">拨打次数</span><span class="num">{{dataCallbackDetail.total_call_num== undefined? '--':dataCallbackDetail.total_call_num}}</span></p>
              <p class="label_num"><span class="label">接通数</span><span class="num">{{dataCallbackDetail.total_call_pass_num== undefined? '--':dataCallbackDetail.total_call_pass_num}}</span></p>
              <div id="callPassEcharts"></div>
            </div>
            <div id="returnCallEcharts"></div>
          </div>
        </div>
      </div>
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
    name: "operation",
    data() {
      return {
        start:'',    //开始时间
        end:'',      //结束时间
        cityName:'',          //选中的城市名
         //环形图
        optionAasnswerRate:{},     //接听率
        optionSatisfaDegree:{},    //满意度
        optionOneSolute:{},       //问题一次解决率
        optionOnLineSatisfa:{},    // 在线满意度
        optionAuditPass:{},        //资料审核:通过率
        optionTotalPass:{},        //资料回访:通过率
        optionCallPass:{},         //资料回访:拨通率
        //折线图
        optionReturnTotal:{},        //资料回访:总回访数
        optionReturnCall:{},        //资料回访:通过率
         //获取调接口的数据
        cityArr:[],                    //城市
        callerDetail:{},              //400电话详情
        inlineDetail:{},              // 在线信息详情
        dataCheckDetail:{},            //资料审核
        dataCallbackDetail:{},         //资料回访
      };
    },
    mounted() {

    },
    activated() {
      this.getOperationCitys();
    },
    watch: {},
    computed: {},
    methods: {
      //获取城市(非通用城市接口)
      getOperationCitys(){
        this.$http.post(globalConfig.president_sever + "/v1.0/service/data_citys ").then(res => {
          if(res) {
            this.cityArr = res;
          }
        })
      },
      //选择时间
      comfirm(val){
        this.start = val.start_date;
        this.end = val.end_date;
        //调接口
        this.getCallerDetail();       //400电话详情
        this.getInlineImDetail();     //在线信息详情
        if(this.cityName !== ''){
          this.getDataCheckDetail();    //资料审核
          this.getDataCallbackDetail();    //资料回访
        };


      },
      //选择城市
      chooseCityFun(val){
        this.cityName = val;
        this.getDataCheckDetail();    //资料审核
        this.getDataCallbackDetail();    //资料回访
      },

      //一.获取:400电话详情
      getCallerDetail(){
        let param={
          end:this.end
        }
        this.$http.post(globalConfig.president_sever + "/v1.0/service/caller_400_detail",param).then(res => {
          if(res) {
            this.callerDetail = res.data;
            this.drawEchartsCaller();   //接听率,满意度,问题一次解决率
          }
        })
      },


      //二.获取:在线信息详情
      getInlineImDetail(){
        let param={
          start: this.start,
          end: this.end
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/service/inline_im_detail",param).then(res => {
          if(res.code === 200) {
            this.inlineDetail=res.data;
            this.drawEchartsInline();  //在线满意度
          }
        })
      },

      //三.获取:资料审核
      getDataCheckDetail(){
        let param={
          start: this.start,
          end: this.end,
          city:this.cityName
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/service/data_check",param).then(res => {
          if(res.code === 200) {
            this.dataCheckDetail=res.data;
            this.drawEchartsDataCheck();      //资料审核:通过率
          }
        })
      },

      //四.获取:资料回访
      getDataCallbackDetail(){
        let param={
          start: this.start,
          end: this.end,
          city:this.cityName
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/service/data_callback",param).then(res => {
          if(res.code === 200) {
            this.dataCallbackDetail=res.data;
            this.drawEchartsDataCallback();      //资料回访:通过率,总回访数,接通率,拨打次数
          }
        })
      },

      drawEchartsCaller(){
        //1.接听率(电话)
        let param1 = {
          type:'ring',
          name:'接听率',
          color:['#76FFF6','#9ECD68'],
          data:this.callerDetail.query_day_callin_answered_rate
        };
        this.optionAasnswerRate = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionAasnswerRate, param1 ,'asnswerRateEcharts');

        //2.满意度
        let param2 = {
          type:'ring',
          name:'满意度',
          color:['#76FFF6','#298AC1'],
          data:this.callerDetail.query_day_appraise_ratio
        };
        this.optionSatisfaDegree = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionSatisfaDegree, param2 ,'satisfaDegreeEcharts');

        //3.问题一次解决率
        let param3 = {
          type:'ring',
          name:'问题一次解决率',
          color:['#FD6F58','#FE5785'],
          data:this.callerDetail.query_day_once_dialog_customer_rate_24h
        };
        this.optionOneSolute = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionOneSolute, param3 ,'oneSoluteEcharts');
      },

      drawEchartsInline(){
        //4.在线满意度
        let param4 = {
          type:'ring',
          name:'满意度',
          color:['#FFDD1E','#FF8A30'],
          data:this.inlineDetail.appraise_ratio
        };
        this.optionOnLineSatisfa = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionOnLineSatisfa, param4 ,'onlineSatisfaEcharts');
      },

      drawEchartsDataCheck(){
        //5.资料审核:通过率
        let param5 = {
          type:'ring',
          name:'通过率',
          color:['#FF9E1D','#FFDE80'],
          data:this.dataCheckDetail.pass_ratio
        };
        this.optionAuditPass = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionAuditPass, param5 ,'auditPassEcharts');
      },


      drawEchartsDataCallback(){
        //6.资料回访:总回访数的通过率
        let param6 = {
          type:'ring',
          name:'通过率',
          color:['#663AD8','#C451E4'],
          data:this.dataCallbackDetail.second_visit_pass_ratio
        };
        this.optionTotalPass = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionTotalPass, param6 ,'totalPassEcharts');


        //7.接通率
        let param7 = {
          type:'ring',
          name:'接通率',
          color:['#FD6F58','#FE5785'],
          data:this.dataCallbackDetail.call_pass_ratio
        };
        this.optionCallPass = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionCallPass, param7 ,'callPassEcharts');


        //8.回访总数
        let param8 = {
          type:'linearea',
          color1:'#FF9874',
          color2:'#FE5785',
          xData:this.dataCallbackDetail.x,
          yData:this.dataCallbackDetail.second_visit_num,
        };
        this.optionReturnTotal = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionReturnTotal, param8 ,'returnTotalEcharts');

        //9.拨打次数
        let param9 = {
          type:'linearea',
          color1:'#E5FF7D',
          color2:'#30D5A9',
          xData:this.dataCallbackDetail.x,
          yData:this.dataCallbackDetail.call_num,
        };
        this.optionReturnCall = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionReturnCall, param9 ,'returnCallEcharts');

      },


      //设置图表的属性
      setOptionsFun(optionCurrent, param, id) {
        //回访总数,拨打次数
        if(param.type === 'linearea'){
          optionCurrent.series[0].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color:param.color1
          }, {
            offset: 1,
            color:param.color2
          }]);
          optionCurrent.xAxis[0].data = param.xData;
          optionCurrent.series[0].data =param.yData;
          optionCurrent.grid.bottom = 20;
        }
        // 环形图
        if(param.type === 'ring'){
          optionCurrent.series[0].data[0].value = param.data;
          optionCurrent.series[0].data[1].value = 100-param.data;
          optionCurrent.series[0].data[0].name = param.name;
          optionCurrent.series[0].label.normal.color = param.color[0];  //字体颜色
          optionCurrent.series[0].color[0].colorStops[0].color = param.color[0];  //渐变色1
          optionCurrent.series[0].color[0].colorStops[1].color = param.color[1];   //渐变色2
        }

        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
      },
    },

  };
</script>


<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/operation/operation.scss";
</style>
