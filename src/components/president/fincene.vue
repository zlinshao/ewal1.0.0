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
                <div class="date">
                    <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="location">
                    <span>南京</span>
                    <img src="../../assets/image/president/didian.png" alt="">
                </div>
            </section>
            <div id="area">
                <div>
                    <section style="width: 90%;height:97%;margin:0 auto;padding-top:12px">
                        <p>今日亏损率</p>
                        <p style="font-size:42px;color:#ffffff">8%</p>
                        <section id="entryRate"></section>
                        <section id="allData">
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#BA25DC">超置空房源</section>
                                <section style="width:68%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                                </section>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#8047CC">公司违约</section>
                                <section style="width:68%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                                </section>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#3262EC">公司任责费用</section>
                                <section style="width:68%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                                </section>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#FF564F">收租差价</section>
                                <section style="width:68%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                                </section>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#53C13B">中介费</section>
                                <section style="width:68%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                                </section>
                            </section>
                        </section>
                    </section>
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
                                    <img src="../../assets/image/president/caiwu_11.png" alt="">
                                </router-link>
                            </div>
                        </li>
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:15px;">
                                <router-link :to="{path: 'network'}">
                                    <img src="../../assets/image/president/wangluo_00.png" alt="">
                                </router-link>
                            </div>
                        </li>
                    
                </ul>
            </div>
            <div class="bottom">
                <div id="chooseArea">
                    <div class="branch" v-for="(item, index) in citys" :key="index">
                        <span>{{item.name}}</span>   
                    </div>
                    <div class="center">
                        <span>总公司</span>
                    </div>
                </div>
                <div id="entry">
                    <section  class="pieOne">
                        <div id="cunstomPie"></div>
                        <div>
                            <ul>
                                <li v-for="(item, index) in tabBar" :key="index" id="cunstomList">
                                    <span :style="{'background-color':item.color}"></span>
                                    <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                </li>
                            </ul>
                            <ul>
                                <li v-for="(item, index) in tabBarTwo" :key="index" id="cunstomList">
                                    <span :style="{'background-color':item.color}"></span>
                                    <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section  class="pieTwo">
                        <div>
                            <div>
                                <section style="width:70%;height:100%;margin:10px auto">
                                    <p>盈亏比</p>
                                    <p style="color:#ffffff;font-size:45px">1.23</p>
                                </section>
                            </div>
                            <div>
                                <ul>
                                    <li v-for="(item, index) in tabBarThree" :key="index" id="cunstomListTwo">
                                        <span :style="{'background-color':item.color}"></span>
                                        <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="lossRatio"></div>
                    </section>
                    <section  class="pieWeek">
                        <div>
                            <div>
                                <section style="width:70%;height:100%;margin:10px auto">
                                    <p>风险系数</p>
                                    <p style="color:#ffffff;font-size:40px">1.23</p>
                                </section>
                            </div>
                            <div>
                                <ul>
                                    <li v-for="(item, index) in tabBarThree" :key="index" id="cunstomListTwo">
                                        <span :style="{'background-color':item.color}"></span>
                                        <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div></div>
                    </section>
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
      citys: [{name: '成都'}, {name: '西安'}, {name: '重庆'}, {name: '合肥'}, {name: '上海'}, {name: '杭州'}, {name: '南京'}, {name: '苏州'}, ],
      tabBar: [
        {name: '房租', color: '#F64C7E'},
        {name: '定金', color: '#FFCC4D'},
        {name: '尾款', color: '#9ECD68'},
        {name: '滞纳金', color: '#56CDFD'}
      ],
      tabBarTwo: [
        {name: '违约金', color: '#477DDB'},
        {name: '定金不退', color: '#0757B6'},
        {name: '罚款', color: '#6545AA'},
      ],
      tabBarThree: [
        {name: '收入金额', color: '#20E054'},
        {name: '支出金额', color: '#F7B500'},
      ],
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
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url('../../assets/image/president/di11.png') no-repeat;
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
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(4){
    margin-left: 45px;
    img {
        width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.bottom {
    margin: 15px 0px 0px 42px;
    display: flex;
    width: 95%;
    height: 85%;
}
#chooseArea {
    width: 56%;
    height: 100%;
    position: relative;
    .center {
        width:165px;
        height:165px;
        background: url("../../assets/image/president/chengshi_11.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        position: absolute;
        top: 225px;
        left: 250px;
        span {
            position: relative;
            color: #20296A;
            top: 60px;
            left: 40px;
            font-size: 30px;
        }
    }
    .branch {
        transition: all 0.5s linear;
        position: absolute;
        left: 282px;
        top: 258px;
        width:100px;
        height:100px;
        background: url("../../assets/image/president/chengshi_00.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: relative;
            color: #20296A;
            top: 39px;
            left: 34px;
        }
    }
    .branch:hover {
        transform: scale(1.2)
    }
    .branch:nth-of-type(1) {
        animation-name:myfirst;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(2) {
        animation-name:myfirst1;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(3) {
        animation-name:myfirst2;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(4) {
        animation-name:myfirst3;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(5) {
        animation-name:myfirst4;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(6) {
        animation-name:myfirst5;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(7) {
        animation-name:myfirst6;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
    .branch:nth-of-type(8) {
        animation-name:myfirst7;
        animation-duration:0.5s;
        animation-timing-function:linear;
        animation-delay:0s;
        animation-iteration-count:1;
        animation-direction:normal;
        animation-play-state:running;
        animation-fill-mode:forwards
    }
}
@keyframes myfirst
{
	0%   { left:280px; top:200px;}
	100%  { left:280px; top:50px;}


}
@keyframes myfirst1
{
	0%   {left:250px; top:200px;}
	100%  {left:120px; top:120px;}


}
@keyframes myfirst2
{
	0%   {left:250px; top:200px;}
	100%  {left:50px; top:270px;}
}
@keyframes myfirst3
{
	0%   {left:250px; top:200px;}
	100%  {left:120px; top:400px;}
}
@keyframes myfirst4
{
	0%   {left:280px; top:200px;}
	100%  {left:280px; top:500px;}
}
@keyframes myfirst5
{
	0%   {left:250px; top:200px;}
	100%  {left:450px; top:400px;}
}
@keyframes myfirst6
{
	0%   {left:250px; top:200px;}
	100%  {left:500px; top:270;}
}
@keyframes myfirst7
{
	0%   {left:250px; top:200px;}
	100%  {left:450px; top:126px;}
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
    width: 100%;
    height: 72%;
    margin-top:35px;
}
#area>div {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    left: 10px;
    background: url('../../assets/image/border/k_8.png') no-repeat ;
    background-size: 100% 100%
}
#entry {
    width: 38%;
    height: 100%;
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
    height: 9%;
    position: relative;
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
</style>
