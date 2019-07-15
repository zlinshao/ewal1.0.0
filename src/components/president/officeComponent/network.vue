<template>
  <div id="network">
    <!-- 左半部分   -->
    <div class="left">
      <div class="select">
        <el-select v-model="selectValue" placeholder="请选择" @change="changeInstance">
          <el-option
            v-for="item in instancelist"
            :key="item.InstanceId"
            :label="item.InstanceId"
            :value="item.InstanceId" >
          </el-option>
        </el-select>
      </div>
      <div class="base_info border_bg">
        <ul>
          <li class="label_li"><span>基本信息</span><img src="../../../assets/image/president/network/pic_1.png" alt="">
          </li>
          <li v-for="item in baseInfoList" class="info_li">
            <span>{{item.name}}</span>
            <span>{{item.val || '--'}}</span>
          </li>
        </ul>
      </div>
      <div class="base_info border_bg">
        <ul>
          <li class="label_li"><span>付费信息</span><img src="../../../assets/image/president/network/pic_2.png" alt="">
          </li>
          <li v-for="item in payInfoList" class="info_li">
            <span>{{item.name}}</span>
            <span>{{item.val || '--'}}</span>
          </li>
        </ul>
      </div>
      <div class="base_info border_bg">
        <ul>
          <li class="label_li"><span>配置信息</span><img src="../../../assets/image/president/network/pic_3.png" alt="">
          </li>
          <li v-for="item in configInfoList" class="info_li">
            <span>{{item.name}}</span>
            <span>{{item.val || '--'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右半部分-->
    <div class="right">
      <!-- 右：状态和卡片-->
      <div class="status_card">
        <!-- 状态-->
        <div class="status border_bg">
          <div class="status_computer">
            <span v-for="item in InstanceStatus" v-if="item.key === instanceDetail.Status">{{item.name}}</span>
          </div>
          <ul class="status_left">
            <li>
              <img src="../../../assets/image/president/network/status_0.png" alt="">
              <span class="span1">磁盘</span>
              <span class="span2">{{instanceDetail.TotalDisks}}</span>
            </li>
            <li>
              <img src="../../../assets/image/president/network/status_1.png" alt="">
              <span class="span1">快照</span>
              <span class="span2">{{instanceDetail.TotalSnapshots}}</span>
            </li>
            <li>
              <img src="../../../assets/image/president/network/status_2.png" alt="">
              <span class="span1">弹性公网IP</span>
              <span class="span2">{{instanceDetail.ElasticPublicIp}}</span>
            </li>
            <li>
              <img src="../../../assets/image/president/network/status_3.png" alt="">
              <span class="span1">弹性网卡</span>
              <span class="span2">{{instanceDetail.NetworkInterfaceId}}</span>
            </li>
          </ul>
          <ul class="status_right">
            <li v-for="item in statuslist">
              <span class="span1">{{item.name}}</span>
              <span>{{item.val || '--'}}</span>
            </li>
          </ul>
        </div>
        <!-- 卡片-->
        <div class="card">
          <ul>
            <li class="card_li1 red_card">
              <p>云盾状态</p>
              <img src="../../../assets/image/president/network/yundun.png" alt="">
            </li>
            <li class="card_li2 yellow_card">
              <p>
                <span>{{instanceDetail.HasException ? "有异常":"无异常"}}</span>
                <img v-if="instanceDetail.HasException"  src="../../../assets/image/president/network/jinggao.png" alt="">
              </p>
              <img src="../../../assets/image/president/network/yichang.png" alt="">
            </li>
            <li class="card_li3 green_card">
              <p>系统事件</p>
              <span>{{instanceDetail.SystemEvent}}</span>
            </li>
            <li class="card_li4 blue_card">
              <p>潜在风险安全组</p>
              <span>{{instanceDetail.RiskGroup}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右图表 -->
      <div class="monitor_info">
        <div class="monitor_label">
          <span class="monitor_label_left">监控信息</span>
          <div class="monitor_label_right">
            <span class="look"><img src="../../../assets/image/president/network/chakan.png" alt=""><span>查看内存等更多指标</span></span>
            <span class="setting"><img src="../../../assets/image/president/network/shezhi.png" alt=""><span>设置报警规则</span></span>
            <DateRange  @confirmDate="comfirm"></DateRange>
          </div>
        </div>
        <div class="echarts">
          <!--CPU-->
          <div class="mychart border_bg">
            <p class="mychart_title">
              <span class="title_name">cpu</span>
              <span class="title_legend">
               <span class="legend_icon"></span><span class="legend_name">CPU使用率（%）</span>
              </span>
            </p>
            <div id="cpuEcharts" style="width: 100%;height: 100%"></div>
          </div>
          <!--网络（外网）-->
          <div class="mychart border_bg">
            <p class="mychart_title">
              <span class="title_name">网络（外网）</span>
              <span class="title_legend">
                <span class="legend_icon legend_icon1"></span><span class="legend_name">出网bps</span>
                <span class="legend_icon legend_icon2"></span><span class="legend_name">入网bps</span>
              </span>
            </p>
            <div id="outcharts" style="width: 100%;height: 100%"></div>
          </div>
          <!--网络（内网）-->
          <div class="mychart border_bg">
            <p class="mychart_title">
              <span class="title_name">网络（内网）</span>
              <span class="title_legend">
                <span class="legend_icon legend_icon1"></span><span class="legend_name">出网bps</span>
                <span class="legend_icon legend_icon2"></span><span class="legend_name">入网bps</span>
              </span>
            </p>
            <div id="innercharts" style="width: 100%;height: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DateRange  from '../../common/president-component/dateRange.vue'
  import echarts from 'echarts';
  import './js/network.js';       //引入js

  export default {
    components: {DateRange},
    name: "network",
    data() {
      return {
        selectValue:'',           //当前选中的实例ID
        StartTime:'',            //开始时间
        EndTime:'',              //结束时间
        instancelist: [],        //实例列表
        instanceDetail: {},      // 实例详情
        baseInfoList: [],        //基本信息
        payInfoList: [],         //付费信息
        configInfoList: [],     //配置信息
        statuslist: [],          //状态右边
        InstanceStatus:[           //状态类型
          {key:'Running',name:'运行中'},
          {key:'Starting',name:'启动中'},
          {key:'Stopping',name:'停止中'},
          {key:'Stopped',name:'已停止'},
        ],
        optionCPU:{},         //cpu图表
        optionInternet:{},    //外网图表
        optionIntranet:{},     //内网图表
      };
    },

    mounted() {
    },
    activated() {
      this.baseInfoList = baseInfo;   //基本信息
      this.payInfoList = payInfo;      //付费信息
      this.configInfoList = configInfo;      //配置信息
      this.statuslist = statusRight;          //状态右边
      this.getInstanceList();      //获取实例列表
    },
    watch: {},
    computed: {},
    created() {
    },
    methods: {
      //获取实例列表
      getInstanceList(){
        let params = {
          page:1,
          limit:50
        };
        this.$http.post(globalConfig.network_sever + "instance-list", params).then(res => {
          if(res){
             this.instancelist = res.data.InstanceStatuses.InstanceStatus;
             this.selectValue = this.instancelist[0].InstanceId;  //下拉框默认选择第一条
             this.getInstanceDetail();    //获取实例详情
             this.getMonitorDetail();     //获取实例监控状态
          }
        })
      },
      //日期选择
      comfirm(val) {
        this.StartTime = val.start;
        this.EndTime = val.end;
        //实例监控状态
        if(this.selectValue !== ''){
          this.getMonitorDetail();
        }
      },

      //下拉框选择
      changeInstance(){
        this.getInstanceDetail();    //获取实例详情
        this.getMonitorDetail();    //获取实例监控状态
      },

      //获取实例详情
      getInstanceDetail(){
        let params = {
          InstanceId: this.selectValue
        };
        this.$http.post(globalConfig.network_sever + "instance", params).then(res => {
          if(res){
            this.instanceDetail = res.data;
            //详情特殊字段的处理
            if(this.instanceDetail.PublicIpAddress && this.instanceDetail.PublicIpAddress.IpAddress){
              this.instanceDetail.IpAddress=this.instanceDetail.PublicIpAddress.IpAddress;   //公网Ip(字段有多个需单独赋值)
            }
            this.toFirstlevel(this.instanceDetail);
            this.getVal( this.baseInfoList, this.instanceDetail);
            this.getVal( this.payInfoList, this.instanceDetail);
            this.getVal( this.configInfoList, this.instanceDetail);
            this.getVal( this.statuslist, this.instanceDetail);
          }
        })
      },

      // 获取实例监控状态信息
      // optionCpu  optionInter
      getMonitorDetail(){
        let params = {
          InstanceId: this.selectValue,
          StartTime:this.StartTime,
          EndTime:this.EndTime,
          Period:3600,
          is_prc:true
        };
        this.$http.post(globalConfig.network_sever + "monitor", params).then(res => {
          if(res){
            let monitorData=res.data.MonitorData.InstanceMonitorData;
            let X=[];
            let CPU=[];           //cpu的Y轴
            let InternetRX=[];    //外网的入的Y轴
            let InternetTX=[];   //外网的出的Y轴
            let IntranetRX=[];   //内网的入的Y轴
            let IntranetTX=[];  //内网的出的Y轴
            monitorData.forEach((item,index)=>{
              X.push(item.TimeStamp);
              CPU.push(item.CPU);
              InternetRX.push(item.InternetRX);
              InternetTX.push(item.InternetTX);
              IntranetRX.push(item.IntranetRX);
              IntranetTX.push(item.IntranetTX);
            });
            let objParam={
              X:X,
              CPU:CPU,
              InternetRX:InternetRX,
              InternetTX:InternetTX,
              IntranetRX:IntranetRX,
              IntranetTX:IntranetTX,
            };
            this.drawEchartsMonitor(objParam)
          }
        })
      },

      //绘制图表
      drawEchartsMonitor(objParam) {
        //1.cpu
        let param1 = {
          type: 'linecpu',
          color: ['#76FFC1','#2997C1'],
          xData: objParam.X,
          yData: objParam.CPU,
        };
        this.optionCPU = JSON.parse(JSON.stringify(optionCpu));
        this.setOptionsFun(this.optionCPU, param1, 'cpuEcharts');

        //2.内网
        let param2 = {
          type: 'lineInter',
          color1: ['#FDA158','#FE5757'],
          color2: ['#FFC359','#FFFF80'],
          xData: objParam.X,
          yData1: objParam.InternetRX,
          yData2: objParam.InternetTX,
        };
        this.optionInternet = JSON.parse(JSON.stringify(optionInter));
        this.setOptionsFun(this.optionInternet, param2, 'outcharts');

        //3.外网
        let param3 = {
          type: 'lineInter',
          color1: ['#FDA158','#FE5757'],
          color2: ['#FFC359','#FFFF80'],
          xData: objParam.X,
          yData1: objParam.IntranetRX,
          yData2: objParam.IntranetTX,
        };
        this.optionIntranet = JSON.parse(JSON.stringify(optionInter));
        this.setOptionsFun(this.optionIntranet, param3, 'innercharts');
      },

      //设置图表的属性
      setOptionsFun(optionCurrent, param, id) {
        //获取图表的dom元素
        let myCharts = this.$echarts.init(document.getElementById(id));
        //cpu
        if (param.type === 'linecpu') {
          optionCurrent.series[0].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: param.color[0]
          }, {
            offset: 1,
            color: param.color[1]
          }]);
          optionCurrent.xAxis[0].data = param.xData;
          optionCurrent.series[0].data = param.yData;
        }

        //外网,内网
        if (param.type === 'lineInter') {
          optionCurrent.series[0].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: param.color1[0]
          }, {
            offset: 1,
            color: param.color1[1]
          }]);
          optionCurrent.series[1].color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: param.color2[0]
          }, {
            offset: 1,
            color: param.color2[1]
          }]);
          optionCurrent.xAxis[0].data = param.xData;
          optionCurrent.series[0].data = param.yData1;
          optionCurrent.series[1].data = param.yData2;
        }
        myCharts.setOption(optionCurrent);
        window.addEventListener("resize", () => {
          myCharts.resize();
        });
      },

        //遍历数据赋值
      getVal(arr,obj){
        let keyArr= Object.keys(obj);
        arr.forEach((item,index)=>{
          keyArr.forEach((tmp)=>{
            if(item.key === tmp){
              item['val'] = obj[tmp];
            }
          })
        });
      },
      //将需要的字段提到一级对象里
      toFirstlevel(obj){
        let keyArr= Object.keys(obj);
        let aa=['PrimaryIpAddress','NetworkInterfaceId','VSwitchId','VpcId'];
        aa.forEach((item)=>{
          keyArr.forEach((tmp)=>{
            if(typeof(obj[tmp]) === "object"){
              this.toFirstlevel(obj[tmp]);
            }else if(obj[tmp].constructor === Array){
              if(obj[tmp].length>0){
                let newObj=obj[tmp][0]
                this.toFirstlevel(newObj);
              }
            }else{
              if(item === tmp){
                this.instanceDetail[tmp] = obj[tmp];
              }
            }
          })
        })
      }
    },

  };
</script>

<style lang="scss" >
  #network {
    //下拉框样式
    .el-input{
      width: 70%;
    }
    //下拉框input的框的样式
    .el-input__inner {
      background: rgba(51, 123, 255, 0.15);
      border: 1px solid #00FFFF;
      color: #82DDFF;
    }
    .el-select .el-input .el-select__caret {
      color: #00FFFF;
    }
    /*.el-select-dropdown{*/
    /*  background-color: rgba(51, 123, 255, 0.15) !important;*/
    /*}*/
    /*.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {*/
    /*  background-color: blue;*/
    /*}*/
    /*.popper__arrow{*/
    /*  border-bottom-color:rgba(51, 123, 255, 0.15) !important;*/
    /*}*/
  }
  /*.el-select-dropdown__wrap .el-scrollbar__wrap{*/
  /*  background: red !important;*/
  /*}*/
  /*.el-select-dropdown{*/
  /*  background-color:rgba(51, 123, 255, 1) !important;*/
  /*}*/
  /*.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {*/
  /*  background-color: blue;*/
  /*}*/
  /*.popper__arrow{*/
  /*  border-bottom-color: rgba(51, 123, 255, 1) !important;*/
  /*}*/
</style>

<style lang="scss" scoped>
  @import "../../../assets/scss/president/common.scss";
  @import "../../../assets/scss/president/network/network.scss";

  #network {
    .status_computer{
      width:122px;
      height:122px;
      position: absolute;
      right: 64px;
      top:-61px;
      background-image: url("../../../assets/image/president/network/yunxing.png");
    }
  }

</style>
