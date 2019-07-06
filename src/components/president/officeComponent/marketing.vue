<template>
  <div id="marketing">
    <div class="marketing_left border_bg">
      <div class="date_location">
        <DatePicker @confirmDate="comfirm"></DatePicker>
         <div class="location">
           <span>{{"南京"}}</span>
           <img src="../../../assets/image/president/common/didian.png" alt="">
         </div>
      </div>
    </div>
    <div class="marketing_right">
     <!-- 上面部分     -->
      <div class="colletrent_card">
          <div class="collet_num border_bg">
            <div class="num_left">
              <p class="num_label"><span>收房量</span><span class="unit_blue">(套)</span></p>
              <span class="num_val">{{recvTotal}}</span>
            </div>
            <div id="colletNumEcharts" class="num_echarts"></div>
          </div>
          <div class="rent_num border_bg">
            <div class="num_left">
              <p class="num_label"><span>租房量</span><span class="unit_blue">(套)</span></p>
              <span class="num_val">{{rentTotal}}</span>
            </div>
            <div id="rentNumEcharts" class="num_echarts"></div>
          </div>
          <div class="lowquality_card  red_card">
            <li>
              <p class="card_label"><span>低质量房源</span><span class="unit_white">(套)</span></p>
              <span class="card_val">{{lowQual}}</span>
            </li>
          </div>
          <div class="aveprice_card yellow_card">
            <li>
              <p class="card_label"><span>平均差价</span><span class="unit_white">(元)</span></p>
              <span class="card_val">{{recvPrice-rentPrice}}</span>
            </li>
          </div>
      </div>
      <!--中间部分-->
      <div class="ring_discount_card">
        <!--预警,房屋状态-->
        <div class="ring border_bg">
          <div class="warning">
            <ul class="warning_legend">
              <li v-for="item in warningList"><span  :class="'square_iocn'+item.id"></span><span>{{item.name}}</span></li>
            </ul>
            <div id="warnEcharts"></div>
          </div>
          <div class="house_status">
              <div id="notRentEcharts" ></div>
              <div id="haveRentEcharts"></div>
              <div id="bookEcharts"></div>
              <div id="hasDoneEcharts"></div>
          </div>
        </div>
        <!--出租率,房屋周转率-->
        <div class="discount border_bg">
          <span class="title_legend">
            <span class="legend_icon legend_icon1"></span><span class="legend_name">出租率</span>
            <span class="legend_icon legend_icon2"></span><span class="legend_name">房屋周转率</span>
          </span>
          <div id="rentChangeEcharts" class="scatter_echarts"></div>
        </div>
        <div class="collet_card green_card">
          <li>
            <p class="card_label"><span>平均收房价</span><span class="unit_white">(元)</span></p>
            <span class="card_val">{{recvPrice}}</span>
          </li>
        </div>
        <div class="rent_card blue_card">
         <li>
           <p class="card_label"><span>平均租房价</span><span class="unit_white">(元)</span></p>
           <span class="card_val">{{rentPrice}}</span>
         </li>
        </div>
      </div>
      <!--  底部们分:空置房源,实际业绩-->
      <div class="scatter_info">
        <div class="vacancy_house border_bg">
          <div class="num">
            <p class="num_label"><span>空置房源</span><span class="unit_blue">(套)</span></p>
            <span class="num_val">{{vacancyTotal}}</span>
          </div>
          <div id="vacancyHouseEcharts" class="scatter_echarts"></div>
        </div>
        <div class="actual_perform border_bg">
          <div class="num">
            <p class="num_label"><span>实际业绩</span><span class="unit_blue">(元)</span></p>
            <span class="num_val">{{achieveTotal}}</span>
          </div>
          <div id="actualPerformEcharts" class="scatter_echarts"></div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  import echarts from 'echarts';
  import './js/marketing.js';       //引入js

  export default {
    components: { DatePicker },
    name: "marketing",
    data() {
      return {
        params:{
          city: "南京市",
          start: '',
          end: ''
        },
        warningList:[
          {name:'1-7天',id:1},
          {name:'8-14天',id:2},
          {name:'14-21天',id:3},
          {name:'21天以上',id:4},
        ],
        optionCollet:{},      //收房量
        optionRent:{},       //租房量
        optionWarn:{},        //预警状态
        optionNotRent:{},       //未出租
        optionhaveRent:{},       //已出租
        optionBook:{},          //已预定
        optionhasDone:{},       //待入住
        optionPercent:{},     //出租率,周转率
        optionHouse:{},       //空置房源
        optionAchieve:{},      //实际业绩
        //详情
        recvRentDetail:{},     //收租房
        warningDetail:{},      //预警状态
        achievementDetails:{},   //实际业绩
        //卡片数据
        lowQual:'--',     //低质量房源
        recvPrice:'--',    //平均收房价
        rentPrice:'--',    //平均租房价
        // 总数
        recvTotal:'--',       // 收房总数
        rentTotal:'--',       //租房总数
        vacancyTotal:'--',   //空置房源总数
        achieveTotal:'--',     //实际业绩总数
      };
    },
    mounted() {

    },
    activated() {
      this.$nextTick(() => {
        // this.drawEcharts();
        // this.drawEchartsWarn();
      })
    },
    watch: {},
    computed: {},
    methods: {
      //选择时间
      comfirm(val) {
        this.params.start = val.start_date;
        this.params.end = val.end_date;
        //调后台接口获取详情
        this.getRecvRentDetail();
        this.getWarningDetail();
        this.getAchievementDetail();
      },

      //一.获取收房量、租房量、收房均价、租房均价
      getRecvRentDetail(){
        this.$http.post(globalConfig.president_sever + "/v1.0/market/recv_rent_detail", this.params).then(res => {
          if(res.code === 200){
            this.recvRentDetail = res.data;
            this.recvTotal = this.recvRentDetail.recv_total;           // 收房总数
            this.rentTotal = this.recvRentDetail.rent_total;           //租房总数
            this.recvPrice = this.recvRentDetail.recv_price;         //平均收房价
            this.rentPrice = this.recvRentDetail.rent_price;         //平均租房价
            this.drawEchartsRecvRent();
           console.log(res);
          }
        })
      },

      //绘制图表:收房量、租房量、收房均价、租房均价
      drawEchartsRecvRent(){
        //1.收房量
        let param1 = {
          type:'linearea',
          color1:'#E5FF7D',
          color2:'#30D5A9',
          xData:this.recvRentDetail.date,
          yData:this.recvRentDetail.recv,
        };
        this.optionCollet = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionCollet, param1 ,'colletNumEcharts');

        //2.租房量
        let param2 = {
          type:'linearea',
          color1:'#FF9874',
          color2:'#FE5785',
          xData: this.recvRentDetail.date,
          yData:this.recvRentDetail.rent,
        };
        this.optionRent = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionRent, param2 ,'rentNumEcharts');
      },


      //二.获取预警状态、出租状态、空置房源数、低质量房源数目、出租率、日周转率
      getWarningDetail(){
        this.$http.post(globalConfig.president_sever + "/v1.0/market/warning_detail", this.params).then(res => {
          if(res.code === 200){
            this.warningDetail = res.data;
            this.lowQual = this.warningDetail.house_qual_ratio.high_qual;    //低质量房源
            this.vacancyTotal = this.warningDetail.info.total;        //空置总房源的总数
            this.drawEchartsWarn();
          }
        })
      },

      //绘制图表:预警状态、出租状态、空置房源数、低质量房源数目、出租率、日周转率
      drawEchartsWarn(){
        //3.预警状态
        let objInfo = this.warningDetail.warning_status_ratio;
        let arr=this.warningStatus(objInfo);
        let param3 = {
          type:'pie',
          title:'预警状态',
          name:'预警占比',
          yData1:arr
        };
        this.optionWarn = JSON.parse(JSON.stringify(optionPies));
        this.setOptionsFun(this.optionWarn, param3 ,'warnEcharts');

        //4.未出租
        let param4 = {
          type:'ring',
          name:'未出租',
          color:['#FD6F58','#FE5785'],
          data:this.warningDetail.rent_status_ratio.not_rent
        };
        this.optionNotRent = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionNotRent, param4 ,'notRentEcharts');

        //5.已出租
        let param5 = {
          type:'ring',
          name:'已出租',
          color:['#76FFF6','#298AC1'],
          data:this.warningDetail.rent_status_ratio.have_rent
        };
        this.optionhaveRent = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionhaveRent, param5 ,'haveRentEcharts');

        //6.已预定
        let param6 = {
          type:'ring',
          name:'已预定',
          color:['#663AD8','#C451E4'],
          data:this.warningDetail.rent_status_ratio.book
        };
        this.optionBook = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionBook, param6 ,'bookEcharts');

        //7.待入住
        let param7 = {
          type:'ring',
          name:'待入住',
          color:['#FF9E1D','#FFDE80'],
          data:this.warningDetail.rent_status_ratio.has_done
        };
        this.optionhasDone = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionhasDone, param7 ,'hasDoneEcharts');

        //8.出租率,房屋周转率
        let param8 = {
          type:'linesmooth',
          xData:this.warningDetail.info.x,
          yData1:this.warningDetail.info.rent_ratio,  //出租率
          yData2:this.warningDetail.info.revolve_ratio,  //周转率
        };
        this.optionPercent = JSON.parse(JSON.stringify(optionRentChangee));
        this.setOptionsFun(this.optionPercent, param8 ,'rentChangeEcharts');

        //9.空置房源
        let param9 = {
          type:'scatter',
          color:'#6DF1F0',
          name:'空置房源',
          xData:this.warningDetail.info.x,
          yData:this.warningDetail.info.vacancy_nums,
        };
        this.optionHouse = JSON.parse(JSON.stringify(optionHouseAchieve));
        this.setOptionsFun(this.optionHouse,param9,'vacancyHouseEcharts');
      },

      // 三.获取实际业绩
      getAchievementDetail(){
        this.$http.post(globalConfig.president_sever + "/v1.0/market/achievement_details", this.params).then(res => {
          if(res.code === 200){
            this.achievementDetails = res.data;
            this.achieveTotal =  this.achievementDetails.total_achievement ;   //实际业绩总数
            this.drawEchartstAchievement();
          }
        })
      },

      //绘制图表
      drawEchartstAchievement() {
        //10.实际业绩
        let param10 = {
          type:'scatter',
          color:'#E291D1',
          name:'实际业绩',
          xData:this.achievementDetails.x,
          yData:this.achievementDetails.achievement,
        };
        this.optionAchieve = JSON.parse(JSON.stringify(optionHouseAchieve));
        this.setOptionsFun(this.optionAchieve,param10,'actualPerformEcharts')
      },

       //设置图表的属性
      setOptionsFun(optionCurrent, param, id) {
        //收房量,租房量
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
        }
        //预警状态
        if(param.type === 'pie'){
          optionCurrent.title.text = param.title;
          optionCurrent.series[0].name = param.name;
          optionCurrent.series[0].data = param.yData1;
        }
        // 出租状态
        if(param.type === 'ring'){
          optionCurrent.series[0].data[0].value = param.data;
          optionCurrent.series[0].data[1].value = 100-param.data;
          optionCurrent.series[0].data[0].name = param.name;
          optionCurrent.series[0].label.normal.color = param.color[0];  //字体颜色
          optionCurrent.series[0].color[0].colorStops[0].color = param.color[0];  //渐变色1
          optionCurrent.series[0].color[0].colorStops[1].color = param.color[1];   //渐变色2
        }
        //出租率,周转率
        if(param.type === 'linesmooth'){
          optionCurrent.xAxis.data = param.xData;
          optionCurrent.series[0].data = param.yData1;
          optionCurrent.series[1].data = param.yData2;
        }
        //空置房源,实际业绩
        if(param.type === 'scatter'){
          optionCurrent.xAxis.data = param.xData;
          optionCurrent.series[0].data = param.yData;
          optionCurrent.series[0].itemStyle.normal.color =param['color'];
          optionCurrent.series[0].name =param.name;
        }
        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
      },

      //预警状态数据处理
      warningStatus(objInfo){
        let warndata = [];
        for(let type in objInfo){
          let obj = {value:'',name:''};
          switch (type) {
            case 'green':
              obj.name='1-7天';
              obj.value=objInfo[type];
              break;
            case 'orange':
              obj.name='8-14天';
              obj.value=objInfo[type];
              break;
            case 'yellow':
              obj.name='14-21天';
              obj.value=objInfo[type];
              break;
            case 'red':
              obj.name='21天以上';
              obj.value=objInfo[type];
              break;
          }
          warndata.push(obj);
        }
        return warndata;
      },
    }

  };
</script>


<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/marketing/marketing.scss";

</style>
