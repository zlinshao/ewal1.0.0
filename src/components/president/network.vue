<template>
  <div id="main-container">
    <div id="line"></div>
    <div id="main">
        <div class="left">
            <section class="time">
                <section class="timeLeft">
                    <clock></clock>
                </section>
                <section class="timeRight">
                    <strong>{{this.time1}}</strong>
                    <p>{{this.time}}</p>
                </section>
            </section>
            <section class="choose">
                <div>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </section>
            <div id="area">
                <div style="width:80%;height:52%">
                    <div style="width:95%;height:100%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">基本信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_11.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:46%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>所在可用区</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>名称</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>描述</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>地域</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>实例规格</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>镜像ID</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>密钥对名称</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>RAM角色</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>集群ID</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>标签</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <div style="width:80%;height:20%;margin-top:10px;">
                    <div style="width:95%;height:30%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">配置信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_22.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:46%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>付费方式</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>停止模式</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>到期时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动续费(续费周期)</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>创建时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动释放时间</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <div style="width:100%;height:26%;margin-top:10px;">
                    <div style="width:95%;height:100%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">付费信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_33.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:46%;height:100%" class="info">
                                 <li>
                                     <span>CPU</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>内存</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>实例类型</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>操作系统</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>弹性网卡</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>公网IP</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>私有IP</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                             <ul style="width:46%;height:100%;margin-left:15px" class="info">
                                 <li>
                                     <span>带宽计费方式</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>当前使用带宽</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>专有网络</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>虚拟交换机</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <div style="width:100%;height:20%;margin-top:10px;">
                    <div style="width:95%;height:100%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">配置信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_22.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:46%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>付费方式</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>停止模式</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>到期时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动续费(续费周期)</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                             <ul style="width:46%;height:100%;margin-left:15px" class="info">
                                 <li>
                                     <span>创建时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动释放时间</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <img src="../../assets/image/president/back.png" alt="" @click="back">
                <ul class="tableBar">
                    <li>
                        <router-link :to="{path: 'markting'}">
                            <img src="../../assets/image/president/shichang_00.png" alt="">
                        </router-link>
                    </li>
                    
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:20px;">
                                <router-link :to="{path: 'humanbing'}">
                                    <img src="../../assets/image/president/renshi_00.png" alt="" >
                                </router-link>
                            </div>
                        </li>
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:15px;">
                                <router-link :to="{path: 'fincene'}">
                                    <img src="../../assets/image/president/caiwu_00.png" alt="">
                                </router-link>
                            </div>
                        </li>
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:15px;">
                                <router-link :to="{path: 'network'}">
                                    <img src="../../assets/image/president/wangluo_11.png" alt="">
                                </router-link>
                            </div>
                        </li>
                </ul>
            </div>
            <div class="bottom">
                <div style="width:100%;height:20%;display:flex">
                    <div id="chooseArea">
                        <img src="../../assets/image/president/yunxing.png" alt="">
                    </div>
                    <div id="entry">
                        <section>
                            <div>
                                <div>
                                    <p>云盾状态</p>
                                    <img src="../../assets/image/president/yundun.png" alt="">
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>有异常</p>
                                    <img src="../../assets/image/president/yichang.png" alt="">
                                </div>
                            </div>
                        </section>
                        <section>
                            <div>
                                <div>
                                    <p>系统事件</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>潜在风险安全组</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div style="width:100%;height:76%" class="inner">
                    <div>
                        <div>监控信息</div>
                        <div>
                            <div>
                                <img src="../../assets/image/president/chakan.png" alt="" >
                                查看内存等更多指标
                            </div>
                            <div>
                                <img src="../../assets/image/president/shezhi.png" alt="" >
                                设置报警规则
                            </div>
                            <div>
                                <el-date-picker
                                v-model="value6"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Clock from "vue-clock2";
export default {
  components: { Clock },
  name: "index",
  data() {
    return {
      value6: '',
      value: '',
      options: [{
            value: '选项1',
            label: '黄金糕'
        }, {
            value: '选项2',
            label: '双皮奶'
        }, {
            value: '选项3',
            label: '蚵仔煎'
        }, {
            value: '选项4',
            label: '龙须面'
        }, {
            value: '选项5',
            label: '北京烤鸭'
        }],
      url: '../../assets/image/president/renshi_0.png',
      time: "",
      time1: "",
      date: "",
      cityData: [{city: '南京', sale: 112, num: 'NO.1'}, {city: '西安', sale: 112, num: 'NO.2'}, {city: '杭州', sale: 112, num: 'NO.3'}]
    };
  },
  mounted() {
    this.getLangDate()
    this.drawLine();
  },
  activated() {},
  watch: {},
  computed: {},
  methods: {
    back() {
        this.$router.push({
            path: '/president'
        })
    },
    toPath(item) {
      console.log(item)
      this.$router.push({ 
        path: item.url
      })
    },
    drawLine(){
        // let myChart = this.$echarts.init(document.getElementById('statistics'))
        // let myChart1 = this.$echarts.init(document.getElementById('levetRate'))
        let myChart = this.$echarts.init(document.getElementById('entryRate'))
        let myChart1 = this.$echarts.init(document.getElementById('cunstomPie'))
        let myChart2 = this.$echarts.init(document.getElementById('lossRatio'))
        // let myChart3 = this.$echarts.init(document.getElementById('showLeave'))
        // 绘制图表
        myChart.setOption({
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                top: 0,
                // bottom: 0
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        });
        myChart1.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        });
    },
    getLangDate() {
      function dateFilter(date){ //值小于10时，在前面补0
         if(date < 10){
             return "0"+date;
         }
         return date;
     }
      var dateObj = new Date(); //表示当前系统时间的Date对象
      var year = dateObj.getFullYear(); //当前系统时间的完整年份值
      var month = dateObj.getMonth() + 1; //当前系统时间的月份值
      var date = dateObj.getDate(); //当前系统时间的月份中的日
      var day = dateObj.getDay(); //当前系统时间中的星期值
      var hour = dateObj.getHours(); //当前系统时间的小时值
      var minute = dateObj.getMinutes(); //当前系统时间的分钟值
      var second = dateObj.getSeconds(); //当前系统时间的秒钟值
      this.time = dateFilter(year) +
        "年" +
        dateFilter(month) +
        "月" +
        dateFilter(date) +
        "日"
      this.time1 =
        dateFilter(hour) +
        ":" +
        dateFilter(minute) +
        ":" +
        dateFilter(second);
        setTimeout(() => {
          this.getLangDate()
        }, 1000)
    }
  }
};
</script>

<style lang="scss" scoped>
#main-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  background: url('../../assets/image/president/di112.png') no-repeat;
  background-size: 100% 100%;
  
}
#main-container .el-input__inner {
    background-color: #102761;
}
#main {
    display: flex;
    width: 100%;
    height: 100%;
}
.left {
    width:30%;
    height: 100%;
    
}
.right {
    width:70%;
    height: 100%;
}
.top {
    width: 100%;
    height: 8%;
    display: flex;
    margin: 36px 0px 0px 0px;
}
.top>img{
    width: 30px;
    height: 30px;
}
.tableBar {
    position: relative;
    top: -39px;
    margin-left: 44px;
    width: 90%;
    height: 100%;
    li {
        display: inline-block;
    }
    // div {
    //     display: inline-block;
    // }
    span {
        color: #6B7298;
        font-size: 58px;
        position: relative;
    }
}
// .tableBar>div {
//     position: absolute;
//     top: -35px;
// }
.tableBar>li:nth-of-type(1){
    img {
        width: 178px;
        height: 18.86px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(2){
    margin-left: 42px;
    img {
        width: 178px;
        height: 18.86px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(3){
    margin-left: 20px;
    img {
        width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(4){
    margin-left: 25px;
    img {
        // width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.bottom {
    margin: 15px 0px 0px 70px;
    width: 95%;
    height: 85%;
}
#chooseArea {
    width: 60%;
    height: 100%;
    position: relative;
    background: url('../../assets/image/border/k_16.png') no-repeat;
    background-size: 100% 100%; 
    img {
        position: absolute;
        top: -56px;
        right: 35px;
        width: 122px;
        height: 122px;
    }
}
.pieOne {
    width:100%;
    height:27%;
    display: flex;
    background: url('../../assets/image/border/k_11.png') no-repeat;
    background-size: 100% 100%;
}
.pieTwo {
    width:100%;
    height:36%;
    // display: flex;
    margin-top: 10px;
    background: url('../../assets/image/border/k_12.png') no-repeat;
    background-size: 100% 100%;
    >div:nth-child(1) {
        width:100%;
        height:40%;
        display: flex;
        >div{
            width:50%;
            height:100%;
        }
    }
    >div:nth-child(2) {
        width:100%;
        height:60%;
    }
}
.pieOne>div {
    width: 50%;
    height: 100%;
    display: flex;
    ul{
        padding: 40px 0 0 15px;
        width: 50%;
        height: 100%;
    }
}
#cunstomList {
    margin-top: 5px;
}
#cunstomListTwo {
    margin: 25px 0 0 15px;
    display: inline-block;
    vertical-align: middle;
    >span:nth-child(2) {
        position: relative;
        top: -3px;
    }
}
#cunstomList>span:nth-of-type(1) {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
#cunstomListTwo>span:nth-of-type(1) {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
.pieWeekHalf>div:nth-of-type(1) {
    display: flex;
    width: 66%;
    height: 100%;
}
.pieWeekHalf>div:nth-of-type(2) {
    width: 33%;
    height: 100%;
}
.pieWeek {
    width:100%;
    height:31%;
    margin-top: 10px;
    background: url('../../assets/image/border/k_13.png') no-repeat;
    background-size: 100% 100%;
    >div:nth-child(1) {
        width:100%;
        height:30%;
        display: flex;
        >div{
            width:50%;
            height:100%;
        }
    }
    >div:nth-child(2) {
        width:100%;
        height:60%;
    }
}
#area {
    margin-left: 39px;
    width: 100%;
    // height: 80%;
}
#area>div {
    width: 90%;
    height: 100%;
    position: relative;
    left: 10px;
    background: url('../../assets/image/border/k_8.png') no-repeat ;
    background-size: 100% 100%
}
#entry {
    width: 36%;
    margin-left: 18px;
    height: 100%;
    color: #ffffff;
    >section:nth-child(1) {
        width: 100%;
        height: 48%;
        display: flex;
        >div:nth-child(1) {
            width: 48%;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(to right,#FD6F58,#FE5785);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
                img {
                    width: 40px;
                    height: 40px;
                    position: relative;
                    left: 100px;
                }
            }
        }
        >div:nth-child(2) {
            width: 48%;
            height: 100%;
            margin-left: 15px;
            border-radius: 3px;
            background: linear-gradient(to right,#FF9E1D,#FFDE80);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
                img {
                    width: 40px;
                    height: 40px;
                    position: relative;
                    left: 100px;
                }
            }
        }
    }
    >section:nth-child(2) {
        width: 100%;
        height: 48%;
        margin-top: 7px;
        display: flex;
        >div:nth-child(1) {
            width: 48%;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(to right,#8FBD5B,#119A8B);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
            }
        }
        >div:nth-child(2) {
            width: 48%;
            height: 100%;
            margin-left: 15px;
            border-radius: 3px;
            background: linear-gradient(to right,#76FFF6,#298AC1);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
            }
        }
    }
}
#line {
    width: 100%;
    height: 2px;
    border-top: 1px #00FFFF solid;
}
.time {
  display: flex;
  margin: 19px 0 0 53px;
  .clock {
    width: 100px;
    height: 100px;
  }
}
.choose {
    width: 100%;
    height: 7%;
    position: relative;
    div {
        width: 50%;
        margin: 0 auto;
        position: relative;
        left: -47px;
        top: 5px;
    }
    .el-input__inner {
        height: 28px;
    }
}
.date {
    width: 74%;
    position: absolute;
    top: 30px;
    left: 38px;
    margin: 0 auto
}
.location {
    position: absolute;
    top: 37px;
    right: 25px;
    img {
        width: 13px;
        height: 13px;
    }
}
.timeRight {
  margin: 21px;
  strong {
    font-size: 30px;
  }
}
#entryRate {
    width: 100%;
    height: 46%;
}
#allData {
    width: 100%;
    height: 40%;
    padding-top: 1rem;
}
.pieWeekHalf {
    display: flex;
    width: 100%;
    height: 50%;;
}
.progress {
    margin:15px 0 0 15px;
    width: 80%;
}
.info>li{
    display: flex;
    justify-content: space-between;
    >span:nth-child(1) {
        color: #33C8FF;
    }
}
.inner {
    margin-top: 10px;
}
.inner>div:nth-of-type(1){
    width: 97%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    >div:nth-child(1) {
        width: 6%;
        height: 100%;
    }
    >div:nth-child(2) {
        width: 68%;
        height: 100%;
        display: flex;
        >div{
            height: 100%;
            img {
                width: 23px;
                height: 14px;
            }
        }
        >div:nth-child(1){
            width: 25%;
        }
        >div:nth-child(2){
            width: 25%;
        }
        >div:nth-child(3){
            width: 50%;
        }
    }
}
.inner>div:nth-of-type(2){
    width: 97%;
    height: 31%;
    margin-top: 12px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
.inner>div:nth-of-type(3){
    width: 97%;
    height: 31%;
    margin-top: 12px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
.inner>div:nth-of-type(4){
    width: 97%;
    height: 31%;
    margin-top: 12px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
</style>
