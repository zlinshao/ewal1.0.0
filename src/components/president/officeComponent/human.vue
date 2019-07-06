<template>
  <div id="human">
    <!--左边部分-->
    <div class="human_left">
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
        <div class="entry_leave_ring">
          <p>入职/离职趋势</p>
          <ul>
            <li class="onjob">
              <span>
                 <span><span>在职</span><span class="uint">(人)</span></span>
                 <span class="job_num">{{onJobNum}}</span>
              </span>
            </li>
            <li id="entryRingEcharts"></li>
            <li id="leaveRingEcharts"></li>
          </ul>
        </div>
        <div class="entry_leave_line">
          <span class="title_legend">
            <span class="legend_icon legend_icon1"></span><span class="legend_name">入职</span>
            <span class="legend_icon legend_icon2"></span><span class="legend_name">离职</span>
          </span>
          <div id="entryLeaveEcharts"></div>
        </div>

      </div>
    </div>
    <!--中间部分-->
    <div class="human_middle">
      <ChooseCity :citylist="cityDepatment" @selectedCity="chooseCityFun"></ChooseCity>
    </div>
   <!--右边部分-->
    <div class="human_right ">
      <!-- 7天留存率-->
      <div class="retention_rates border_bg">
         <span class="label">7天留存率</span>
        <div class="echarts">
          <div id="civilianEcharts" v-if="this.remainDetail[0] !== -1"></div>
          <span class="line" v-if="this.remainDetail[0] !== -1 && this.remainDetail[1] !== -1"></span>
          <div id="marketingEcharts" v-if="this.remainDetail[1] !== -1"></div>
        </div>
      </div>
     <!-- 学历统计,年龄结构,工作年限,性别比例-->
      <div class="degree_year_agesex border_bg">
       <!--学历统计        -->
        <div class="degree" id="degreeEcharts"></div>
       <!--年龄结构-->
        <div class="year">
          <p class="label">年龄结构(人)</p>
          <ul class="info">
            <li v-for="(item,index) in ageLevelList">
              <span>{{item.name}}</span>
              <span class="year_value">{{item.value}}</span>
            </li>
          </ul>
        </div>
       <!--工作年限,性别比例-->
        <div class="age_sex">
          <div class="age">
            <ul class="warning_legend">
              <li v-for="(item,index) in ageList"><span  :class="'square_iocn'+(index+1)"></span><span>{{item.name}}</span></li>
            </ul>
            <div id="workLimitEcharts"></div>
          </div>
          <div class="sex">
            <ul class="warning_legend">
              <li v-for="(item,index) in sexList"><span  :class="'square_iocn'+(index+1)"></span><span>{{item.name}}</span></li>
            </ul>
            <div id="sexEcharts" ></div>
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
    name: "human",
    data() {
      return {
        ageLevelList:[  //年龄结构
          { name:'20岁以下',key:'less_than_20',value:''},
          { name:'20-30岁',key:'less_than_30',value:''},
          { name:'30-40岁以下',key:'less_than_40',value:''},
          { name:'40岁以上',key:'greater_than_40',value:''},
        ],
        ageList:[   //工作年限
          {name:'一年一下',key:'less_than_1_year',value:''},
          {name:'1-2年',key:'less_than_2_year',value:''},
          {name:'2-3年',key:'less_than_3_year',value:''},
          {name:'3年以上',key:'greater_than_3_year',value:''},
        ],
        sexList:[  //性别
          { name:'男',key:'man',value:''},
          { name:'女',key:'woman',value:''},
        ],
        educationObj:{   //学历统计
          legendData:[],
          data:[]
        },
        start:'',    //开始时间
        end:'',      //结束时间
        optionRingEntry:{},        //入职
        optionRingLeave:{},        //离职
        optionLineEntryLeave:{},       //入职离职
        optionCivilian:{},     //文职
        optionMarketing:{},    //市场
        optionDegree:{},       //学历统计
        optionWorkLimit:{},     //工作年限
        optionSex:{},           //性别
       //详情
        staffDetail:{},            //返回有城市的接口(学历分部统计、年龄结构统计、性别分布、工作年限分布)
        EntryExitDetail:{},        //在职人数、入职人数、离职人数、（市场、文职）7天留存率
        onJobNum:'--',            //在职员工数目
        remainDetail:['',''],       //文职,市场,数值为-1不展示
        ageLevel:{},
        education:{},
        genderLevel:{},
        workYearLevel:{},
        cityDepatment:[],           //城市
        cityName:'',                //选中的城市名
      };
    },
    mounted() {

    },
    activated() {
      this.$nextTick(()=>{
        // this.drawEchartsWarn();
      })

    },
    watch: {},
    computed: {},
    methods: {
      //选择时间
      comfirm(val){
        this.start = val.start_date;
        this.end = val.end_date;
        this.getStaffDetail();
        if(this.cityName !== ''){
          this.getEntryExitDetail();
        }
      },
      //选择城市
      chooseCityFun(val){
        this.cityName = val;
        this.dealStaffData();
        this.getEntryExitDetail();
      },

      //一.获取详情:学历分部统计、年龄结构统计、性别分布、工作年限分布
      getStaffDetail(){
        let param={
          start:this.start,
          end:this.end,
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/hr/staff_details", param).then(res => {
          if(res.code === 200){
            this.staffDetail = res.data;
            this.cityDepatment = Object.keys(this.staffDetail.education);   //获取所有的城市
            this.cityName = this.cityDepatment[0];      //默认选择第一个城市
            this.getEntryExitDetail();
            this.dealStaffData();
          }
        })
      },

      //从对应城市中截取数据
      dealStaffData(){
        //获取对应城市的数据
        this.ageLevel = this.staffDetail.age_level[this.cityName];       //年龄结构统计
        this.education = this.staffDetail.education[this.cityName];          //学历统计
        this.genderLevel = this.staffDetail.gender_level[this.cityName];        //性别分布
        this.workYearLevel = this.staffDetail.work_year_level[this.cityName];     //工作年限分布
        this.assignEducation();
        this.assignmentData(this.ageLevelList,this.ageLevel);
        this.assignmentData(this.sexList,this.genderLevel);
        this.assignmentData(this.ageList,this.workYearLevel);
        //绘制图表
        this.drawEchartsStaff();
      },

      //二.获取在职人数、入职人数、离职人数、（市场、文职）7天留存率
      getEntryExitDetail(){
        let param={
          start:this.start,
          end:this.end,
          key:this.cityName
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/hr/entry_exit_staff_details", param).then(res => {
          if(res.code === 200){
            this.EntryExitDetail = res.data;
            this.onJobNum = this.EntryExitDetail.entry_exit_detail.query_staff_num;    //员工在职数目
            this.remainDetail = this.EntryExitDetail.remain_detail;   //7天留存率:文职,市场
            //绘制图表
            this.drawEchartsEntryExit();
          }
        })
      },

      //绘制图表:在职人数、入职人数、离职人数、（市场、文职）7天留存率
      drawEchartsEntryExit(){
        //1.入职占比
        let param1 = {
          type:'ring',
          name:'入职占比',
          color:['#30C0F2','#57C7AC'],
          data:this.EntryExitDetail.entry_exit_detail.entry_staff_ratio,
        };
        this.optionRingEntry = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionRingEntry, param1 ,'entryRingEcharts');


        //2.离职占比
        let param2 = {
          type:'ring',
          name:'离职占比',
          color:['#FD6F58','#FE5785'],
          data:this.EntryExitDetail.entry_exit_detail.quit_staff_ratio,
        };
        this.optionRingLeave = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionRingLeave, param2 ,'leaveRingEcharts');

        //3.入职,离职
        let param3 = {
          type:'twoline',
          color1:['#FFEC7F','#FF8A30'],
          color2:['#76FFF6','#298AC1'],
          xData1: this.EntryExitDetail.entry_exit_detail.x,
          xData2: this.EntryExitDetail.entry_exit_detail.x,
          yData1: this.EntryExitDetail.entry_exit_detail.entry_staff_num,
          yData2: this.EntryExitDetail.entry_exit_detail.quit_staff_num,
        };
        this.optionLineEntryLeave = JSON.parse(JSON.stringify(optionEntryLeave));
        this.setOptionsFun(this.optionLineEntryLeave, param3 ,'entryLeaveEcharts');


        //4.文职
        let param4 = {
          type:'ring',
          name:'文职',
          color:['#FF9E1D','#FFDE80'],
          data:this.remainDetail[0]
        };
        this.optionCivilian = JSON.parse(JSON.stringify(optionRing));
        if(this.remainDetail[0] !== -1){  //值为-1不展示
          this.setOptionsFun(this.optionCivilian, param4 ,'civilianEcharts');
        }

        //5.市场
        let param5 = {
          type:'ring',
          name:'市场',
          color:['#663AD8','#C451E4'],
          data:this.remainDetail[1]
        };
        this.optionMarketing = JSON.parse(JSON.stringify(optionRing));
        if(this.remainDetail[1] !== -1){   //值为-1不展示
          this.setOptionsFun(this.optionMarketing, param5 ,'marketingEcharts');
        }
      },

      //绘制图表:获取学历分部统计、年龄结构统计、性别分布、工作年限分布
      drawEchartsStaff(){
        //6.学历统计
        let param6 = {
          type:'pierose',
          text:'学历统计',
          name:'学历统计',
          color: ['#F64C7E','#FFCC4D','#9ECD68','#56CDFD','#477DDB','#0757B6','#6545AA'],
          legendData:this.educationObj.legendData,
          yData1:this.educationObj.data,
        };
        this.optionDegree = JSON.parse(JSON.stringify(optionRose));
        this.setOptionsFun(this.optionDegree, param6 ,'degreeEcharts');

        //7.工作年限
        let param7 = {
          type:'pie',
          title:'工作年限',
          name:'占比',
          formatter: "工龄:{b} <br/>人数:{c}<br/>{a}:{d}%",
          yData1:this.ageList
        };
        this.optionWorkLimit = JSON.parse(JSON.stringify(optionPies));
        this.setOptionsFun(this.optionWorkLimit, param7 ,'workLimitEcharts');


        //8.性别
        let param8 = {
          type:'solidpie',
          color:['#6224FF','#008EFF'],
          formatter: "{b}<br/>人数:{c}",
          yData1:this.sexList
        };
        this.optionSex = JSON.parse(JSON.stringify(optionSolidPie));
        this.setOptionsFun(this.optionSex, param8 ,'sexEcharts');

      },


      //设置图表的属性
      setOptionsFun(optionCurrent, param, id) {
        // 环形图
        if(param.type === 'ring'){
          optionCurrent.series[0].data[0].value = param.data;
          optionCurrent.series[0].data[1].value = 100-param.data;
          optionCurrent.series[0].data[0].name = param.name;
          optionCurrent.series[0].label.normal.color = param.color[0];  //字体颜色
          optionCurrent.series[0].color[0].colorStops[0].color = param.color[0];  //渐变色1
          optionCurrent.series[0].color[0].colorStops[1].color = param.color[1];   //渐变色2
        }

        //入职,离职
        if(param.type === 'twoline'){
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
          optionCurrent.xAxis[0].data = param.xData1;
          optionCurrent.xAxis[1].data = param.xData2;
          optionCurrent.series[0].data =param.yData1;
          optionCurrent.series[1].data =param.yData2;
        }

        //玫瑰饼图
        if(param.type === 'pierose'){
          optionCurrent.title.text = param.text;
          optionCurrent.series[0].name = param.name;
          optionCurrent.color = param.color;
          optionCurrent.legend.textStyle.color = param.color;
          optionCurrent.legend.data = param.legendData;
          optionCurrent.series[0].data = param.yData1;
        }

        //工作年限
        if(param.type === 'pie'){
          optionCurrent.title.text = param.title;
          optionCurrent.series[0].name = param.name;
          optionCurrent.tooltip.formatter = param.formatter;
          optionCurrent.series[0].data = param.yData1;
        }

        //性别:实心饼图
        if(param.type === 'solidpie'){
          optionCurrent.color = param.color;
          optionCurrent.tooltip.formatter = param.formatter;
          optionCurrent.series[0].data = param.yData1;
        }

        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
      },


      //赋值:根据key给对应的vlaue赋值
      assignmentData(arr,obj){
        arr.forEach((item,index)=>{
          item.value = obj[item.key];
        })
      },
      //赋值:学历统计(将key作为图例legend数据,value,key作为数据对象的value,name)
      assignEducation(){
        this.educationObj.legendData=[];
        this.educationObj.data=[];
        this.educationObj.legendData = Object.keys(this.education);
        for(let item in this.education){
          let obj={name:'',value:''};
          obj.name=item;
          obj.value=this.education[item];
          this.educationObj.data.push(obj);
        }
      },


    },

  };
</script>


<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/human/human.scss";

</style>
