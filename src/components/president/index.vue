<template>
  <div id="chairman">
    <!-- 顶部部分-->
    <div class="chairman_top">
      <img src="../../assets/image/president/home/lejia_data.png" alt="">
      <div class="clock_router">
        <ClockTime></ClockTime>
        <TabsRouter :isShow="1"></TabsRouter>
      </div>
    </div>
    <!--图表内容-->
    <div class="chairman_info">
      <div class="chairman_left">
        <div class="achieve">
          <p class="achieve_title">
            <span>业绩排名</span>
            <span @click="goMoreInfo()" class="more_info"> 更多 </span>
          </p>
          <div class="achieve_list"  v-if="moreFalg">
            <ul class="">
              <li v-for="(item,index) in achievementList" :class="'achieve_li'+index">
                <p class="label_num"><span>{{item[2]}}&nbsp; {{item[0]}}</span><span>{{item[1]}}</span></p>
                <p class="progress">
                  <span class="progress_bar_active" :class="'progress_bar_active' + index" :style="{width: numTotal == 0? 0: item[1]/numTotal*100+'%'}"></span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!--业绩排名 -->
        <div class="order_list ">
          <div v-for="(item,index) in topThreeList" :class="['order_num','order_num'+index]">
            <div class="order_icon" v-if="index===0">
              <img src="../../assets/image/president/home/diyi.png">
            </div>
            <ul>
              <li class="label_order">{{item[2]}}</li>
              <li class="label_city">{{item[0]}}</li>
              <li class="label_num">{{item[1]}}</li>
              <li class="label_progress">
                <span class="progress"><span class="progress_bar" :style="{width: numTotal == 0? 0: item[1]/numTotal*100+'%'}"></span></span>
              </li>
            </ul>
          </div>
        </div>
        <!--  收房量 -->
        <div class="collote_today border_bg">
          <div class="today_left">
            <p class="num_label"><span>今日收房量</span><span class="unit_blue">(套)</span></p>
            <span class="num_val">{{recvTotal}}</span>
          </div>
          <div id="colletNumEcharts" class="num_echarts"></div>
        </div>
        <!--  租房量 -->
        <div class="rent_today border_bg">
          <div class="today_left">
            <p class="num_label"><span>今日租房量</span><span class="unit_blue">(套)</span></p>
            <span class="num_val">{{rentTotal}}</span>
          </div>
          <div id="rentNumEcharts" class="num_echarts"></div>
        </div>
       <!-- 网络监控-->
        <div class="net_work border_bg">
          <p class="net_work_label">网络监控</p>
          <div class="net_work_info">
            <p><span>实例ID</span><span>状态</span></p>
            <ul>
              <li v-for=" (item,index) in instancelist">
                <span class="instance">{{item.InstanceId}}</span>
                <span  class="status" >
                  <!--状态为 Running，Starting时为波浪线， Stopping，Stopped为直线 -->
                  <img class="running"  v-if="item.Status == 'Running'"  src="../../assets/image/president/home/running.png" alt="">
                  <img  class="running" v-if="item.Status == 'Starting'"  src="../../assets/image/president/home/starting.png" alt="">
                  <img  class="stopping" v-if="item.Status == 'Stopping'" src="../../assets/image/president/home/stopping.png" alt="">
                  <img  class="stopping" v-if="item.Status == 'Stopped'" src="../../assets/image/president/home/stopped.png" alt="">
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <!-- 中间-->
      <div class="chairman_middle">
        <TotalNum  :numTotal="numTotal"></TotalNum>
        <Earth></Earth>
      </div>
     <!-- 右s边-->
      <div class="chairman_right">
        <div class="entry_today border_bg">
          <div id="entryRingEcharts"></div>
          <div class="label_num">
            <p><span>今日入职</span><span class="uint">(人)</span></p>
            <p><span class="num">{{entryNum}}</span><span>/{{onJobNum}}</span></p>
          </div>
          <marquee scrollamount="3" direction="up" class="staff_info">
            <li v-for="(item,index) in entryDetail">{{item.name}}-{{item.description}}</li>
          </marquee>
        </div>
        <div class="leave_today border_bg">
          <div id="leaveRingEcharts"></div>
          <div class="label_num">
            <p><span>今日离职</span><span class="uint">(人)</span></p>
            <p><span class="num">{{quitNum}}</span><span>/{{onJobNum}}</span></p>
          </div>
          <marquee scrollamount="3" direction="up" class="staff_info">
            <li v-for="(item,index) in exitDetail ">{{item.name}}-{{item.description}}</li>
          </marquee>
        </div>
        <div class="loss_today border_bg">
          <p class="label_num"><span class="label">今日亏损额度</span><span class="num">{{queryLastLosses}}</span></p>
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
    </div>


  </div>
</template>

<script>
  import ClockTime from '../common/president-component/clock.vue';   //左边的时钟和时间
  import TabsRouter from '../common/president-component/tabsRouter.vue';   //路由跳转
  import TotalNum from '../common/president-component/totalNum.vue';       //总额
  import Earth from '../common/president-component/earth';                  //地球
  import echarts from 'echarts';
  import './officeComponent/js/marketing.js';       //引入js
  import './officeComponent/js/finance.js';       //引入js

  export default {
    components: {ClockTime, TabsRouter,TotalNum,Earth},
    name: "index",
    data() {
      return {
        moreFalg: false,     //更多
        progressList: [                //进度条
          {key:'vacancy_fee',name:'超置空房源',color: '#BA25DC', value: 0},
          {key:'liquidated',name:'公司违约',color: '#8047CC', value: 0},
          {key:'responsibility_fee',name:'公司认责费用',color: '#3262EC', value: 0},
          {key:'recv_rent_gap',name:'收租差价',color: '#FF564F', value: 0},
          {key:'agency_fee',name:'中介费',color: '#53C13B', value: 0}
        ],
        //传参
        start:'',
        end:'',
        city:'',
        //option
        optionCollet:{},        //收房量
        optionRent:{},         //租房量
        optionRingEntry:{},     //入职占比
        optionRingLeave:{},     //离职占比
        optionAmountloss:{},    //亏损量
        //详情
        numTotal:'0',           //业绩总额
        topThreeList:[],       //实际业绩前三
        achievementList:[],    //当日实际业绩
        recvTotal: '--',       //收房量总套数
        rentTotal: '--',       //租房量总套数
        recvRentDetail:{},     //收租房量详情
        instancelist:[],       //网络监控
        EntryExitDetail:{},       //入职、离职详情
        entryDetail:{},          //入职详情
        exitDetail:{},           //离职详情
        entryNum:'--',           //入职员工数
        quitNum:'--',           //离职员工数
        onJobNum:'--',             //在职总人数
        lossDetail:{},            //亏损量详情
        queryLastLosses:'--',       //今日亏损额度
      };
    },
    mounted() {
      setInterval(()=>{
        // this.changeDate(); //获取当前的一周时间
        //调接口
        this.getAchievementDetail();     //当日实际业绩
        this.getRecvRentDetail();        //收租房量
        this.getInstanceList();          //网络监控
        this.getEntryExitDetail();       //入职，离职
        this.getLossDetail();           //亏损额度
      },60000)

    },
    activated() {
      this.changeDate(); //获取当前的一周时间
      //调接口
      this.getAchievementDetail();     //当日实际业绩
      this.getRecvRentDetail();        //收租房量
      this.getInstanceList();          //网络监控
      this.getEntryExitDetail();       //入职，离职
      this.getLossDetail();           //亏损额度

    },
    watch: {},
    computed: {},
    methods: {
      //时间范围为一周
      changeDate(){
        let val=new Date();
        let date=val.getTime() - 3600 * 1000 * 24 * 6;
        this.start=this.dateToString(date);
        this.end=this.dateToString(val);
      },

      //更多点击事件
      goMoreInfo() {
        this.moreFalg = !this.moreFalg;
      },


      //一.获取：当日实际业绩（市场）
      getAchievementDetail(){
        this.$http.post(globalConfig.president_sever + "/v1.0/market/achievement_detail ").then(res => {
          if(res.code === 200){
            let arr = res.data;
            let newArr = JSON.parse(JSON.stringify(arr)).reverse();    //正序排列
            this.numTotal =  newArr[0][1]+'';                        //业绩总额
            this.topThreeList = newArr.slice(1,4);                   //实际业绩前三
            this.achievementList = newArr.slice(1,newArr.length);    //当日实际业绩
          }
        })
      },
      //二.获取：收房量、租房量（市场）
      getRecvRentDetail(){
        let param={
          start:this.start,
          end:this.end,
          city:'总公司'
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/market/recv_rent_detail", param).then(res => {
          if(res.code === 200){
            this.recvRentDetail = res.data;
            this.recvTotal = this.recvRentDetail.recv_total;           // 收房总数
            this.rentTotal = this.recvRentDetail.rent_total;           //租房总数
            this.drawEchartsRecvRent();
          }
        })
      },

      //三、网络状态：获取实例列表（网络）
      getInstanceList(){
        let params = {
          page:1,
          limit:50
        };
        this.$http.post(globalConfig.network_sever + "instance-list", params).then(res => {
          if(res){
            this.instancelist = res.data.InstanceStatuses.InstanceStatus;
          }
        })
      },

      //四.获取在职人数、入职人数、离职人数
      getEntryExitDetail(){
        let param={
          start:this.start,
          end:this.end,
          key:'总公司'
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/hr/entry_exit_staff_details", param).then(res => {
          if(res.code === 200){
            let detail = res.data;
            this.entryDetail = detail.entry_detail;                      //入职详情
            this.exitDetail = detail.exit_detail;                       //离职详情
            this.EntryExitDetail = detail.entry_exit_detail;           //入职，离职占比
            this.entryNum = this.EntryExitDetail.query_day_entry_num;    //入职员工数
            this.quitNum = this.EntryExitDetail.query_day_quit_num;      //离职员工数
            this.onJobNum = this.EntryExitDetail.query_staff_num;       //员工在职总数目
            this.drawEchartsEntryExit();            //绘制图表
          }
        })
      },

      //五.获取:亏损额度（财务）
      getLossDetail(){
        let param={
          start:this.start,
          end:this.end,
          city:'总公司'
        };
        this.$http.post(globalConfig.president_sever + "/v1.0/finance/income_and_disburse_detail  ",param).then(res => {
          if(res) {
            this.lossDetail = res.data;
            this.queryLastLosses =  this.lossDetail.disbursement.query_last_losses;    //今日亏损额度
            this.drawEchartsLossAmount();                                             //绘制亏损额度折现图
            this.progressList.forEach((item,index)=>{                                //进度条数据处理
              item.value=this.lossDetail.disbursement[item.key];
            })
          }
        })
      },


      //1.绘制图表:收房量、租房量
      drawEchartsRecvRent(){
        //1.收房量
        let param1 = {
          type:'linearea',
          color1:'#E5FF7D',
          color2:'#30D5A9',
          xData:this.recvRentDetail.x,
          yData:this.recvRentDetail.recv,
        };
        this.optionCollet = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionCollet, param1 ,'colletNumEcharts');

        //2.租房量
        let param2 = {
          type:'linearea',
          color1:'#FF9874',
          color2:'#FE5785',
          xData: this.recvRentDetail.x,
          yData:this.recvRentDetail.rent,
        };
        this.optionRent = JSON.parse(JSON.stringify(optionColletRent));
        this.setOptionsFun(this.optionRent, param2 ,'rentNumEcharts');
      },


      //2.绘制图表:在职人数、入职人数、离职人数
      drawEchartsEntryExit(){
        //3.入职占比
        let param3 = {
          type:'ring',
          name:'入职占比',
          color:['#30C0F2','#57C7AC'],
          data:this.EntryExitDetail.entry_staff_ratio,
        };
        this.optionRingEntry = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionRingEntry, param3 ,'entryRingEcharts');


        //4.离职占比
        let param4 = {
          type:'ring',
          name:'离职占比',
          color:['#FD6F58','#FE5785'],
          data:this.EntryExitDetail.quit_staff_ratio,
        };
        this.optionRingLeave = JSON.parse(JSON.stringify(optionRing));
        this.setOptionsFun(this.optionRingLeave, param4 ,'leaveRingEcharts');
      },


      //3.绘制图表:亏损量
      drawEchartsLossAmount(){
        //5.亏损量
        let param5 = {
          type:'folder',
          name:'亏损量',
          color1:'rgba(0,255,255,0.5)',
          color2:'rgba(0,255,255,0.1)',
          top:'10',
          bottom:'40',
          xData:this.lossDetail.disbursement.x,
          yData:this.lossDetail.disbursement.losses_sum,
        };
        this.optionAmountloss = JSON.parse(JSON.stringify(optionFolder));
        this.setOptionsFun(this.optionAmountloss, param5 ,'amountlossEcharts');
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
        };

        // 环形图
        if(param.type === 'ring'){
          optionCurrent.series[0].data[0].value = param.data;
          optionCurrent.series[0].data[1].value = 100-param.data;
          optionCurrent.series[0].data[0].name = param.name;
          optionCurrent.series[0].label.normal.color = param.color[0];  //字体颜色
          optionCurrent.series[0].color[0].colorStops[0].color = param.color[0];  //渐变色1
          optionCurrent.series[0].color[0].colorStops[1].color = param.color[1];   //渐变色2
        };

        //亏损量
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
          optionCurrent.grid.top =param.top;
          optionCurrent.grid.bottom =param.bottom;
        };

        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
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
      },

    },

  };
</script>


<style lang="scss" scoped>
  @import "../../assets/scss/president/common.scss";
  @import "../../assets/scss/president/index.scss";
  #chairman {
    @include bgImage("../../assets/image/president/home/di.png");
  }
</style>
