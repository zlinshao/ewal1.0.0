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
                <div class="area"></div>
            </section>
        </div>
        <div class="right">
            <div class="top" style="margin:50px 0 0 50px">
                <img src="../../assets/image/president/back.png" alt="" @click="back">
                <ul class="tableBar">
                    <li>
                        <img src="../../assets/image/president/shichang_10.png" alt="">
                    </li>
                    <div>
                        <li>
                            <span>.</span>
                            <router-link :to="{path: 'humanbing'}">
                                <img src="../../assets/image/president/renshi_00.png" alt="" >
                            </router-link>
                        </li>
                        <li>
                            <span>.</span>
                            <router-link :to="{path: 'fincene'}">
                                <img src="../../assets/image/president/caiwu_00.png" alt="">
                            </router-link>
                        </li>
                        <li>
                            <span>.</span>
                            <router-link :to="{path: 'network'}">
                                <img src="../../assets/image/president/wangluo_00.png" alt="">
                            </router-link>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="bottom">
                <div class="statistics">
                    <section class="renting">
                        <section>
                            <div style="height: 40%;width: 100%;position:relative">
                            <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日收房量&nbsp;<span style="font-size: 4px">(套)</span></p>
                            </div>
                            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
                            <h1>11100</h1>
                            </div>
                        </section>
                        <section>
                            <div id="statistics"></div>
                        </section>
                    </section>
                    <section class="renting">
                        <section>
                            <div style="height: 40%;width: 100%;position:relative">
                            <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日收房量&nbsp;<span style="font-size: 4px">(套)</span></p>
                            </div>
                            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
                            <h1>11100</h1>
                            </div>
                        </section>
                        <section>
                            <div id="statistics1"></div>
                        </section>
                    </section>
                    <section class="rentingPrice1"></section>
                    <section class="rentingPrice2"></section>
                </div>
                <div class="statistics">
                    <section class="rent">
                        <div style="width:90%;margin:0 auto">
                            <section>
                                <!-- <el-progress type="circle" :percentage="25"></el-progress> -->
                                <div style="width:100%;height:100%" id="quitRate"></div>
                            </section>
                            <section>
                                <div style="width:100%;height:100%" id="lossRate"></div>
                            </section>
                        </div>
                    </section>
                    <section class="rent">
                        <section id="entryRate"></section>
                    </section>
                    <section class="total1"></section>
                    <section class="total2"></section>
                </div>
                <div class="statistics">
                    <section class="empty"></section>
                    <section class="empty"></section>
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
      tabPages: [
        {name: '市场', url: 'markting',imgUrl:require('../../assets/image/president/shichang_0.png')},
        {name: '人事', url: 'humanbing',imgUrl:require('../../assets/image/president/renshi_1.png')},
        {name: '财务', url: 'fincene',imgUrl:require('../../assets/image/president/caiwu_0.png')},
        {name: '网络', url: 'network',imgUrl:require('../../assets/image/president/wangluo_0.png')}
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
        let myChart = this.$echarts.init(document.getElementById('statistics'))
        let myChart1 = this.$echarts.init(document.getElementById('statistics1'))
        let myChart2 = this.$echarts.init(document.getElementById('entryRate'))
        let myChart3 = this.$echarts.init(document.getElementById('quitRate'))
        let myChart4 = this.$echarts.init(document.getElementById('lossRate'))
        // 绘制图表
        myChart.setOption({
        // tooltip : {
        //     trigger: 'axis'
        // },
        grid: {
            top: 0,
            bottom: 20
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                // data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
              show: false
            },
            {
              splitLine: {
                show: false
              }
            },
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'预购',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[30, 40, 430, 401, 390, 30, 10]
            }
        ]
      });
        myChart1.setOption({
        // tooltip : {
        //     trigger: 'axis'
        // },
        grid: {
            top: 0,
            bottom: 20
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                // data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
              show: false
            },
            {
              splitLine: {
                show: false
              }
            },
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'预购',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[30, 40, 430, 401, 390, 30, 10]
            }
        ]
      });
        myChart2.setOption( {
            // tooltip : {
            //     trigger: 'axis'
            // },
            grid: {
                top: 0,
                bottom: 0
            },
            legend: {
                data:['出租率','房屋周转率']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'出租率',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'房屋周转率',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                }
            ]
        });
      myChart3.setOption({
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '10',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:135, name:'25%入职占比',itemStyle:{color: '#57C7AC'}},
                      {value:1548, name:'75%入职占比',itemStyle:{color: '#42507B'}}
                  ]
              }
          ]
      })
      myChart4.setOption({
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '10',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:135, name:'25%入职占比',itemStyle:{color: '#FD6F58'}},
                      {value:1548, name:'75%入职占比',itemStyle:{color: '#42507B'}}
                  ]
              }
          ]
      })
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
  background: url('../../assets/image/president/di.png') no-repeat;
  background-size: 100% 100%;
  
}
#main-container .el-input__inner {
    background-color: #131541;
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
    margin: 64px 0px 0px 50px;
}
.top>img{
    width: 30px;
    height: 30px;
}
.tableBar {
    position: relative;
    margin-left: 44px;
    width: 90%;
    height: 100%;
    li {
        display: inline-block;
    }
    div {
        display: inline-block;
    }
    span {
        color: #6B7298;
        font-size: 58px;
        position: relative;
    }
}
.tableBar>div {
    position: absolute;
    top: -35px;
}
.tableBar>div>li:nth-of-type(1){
    margin-left: 20px;
    img {
        width: 178px;
        height: 18.86px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>div>li:nth-of-type(2){
    margin-left: 20px;
    img {
        width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>div>li:nth-of-type(3){
    margin-left: 20px;
    img {
        width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.bottom {
    margin: 15px 0px 0px 42px;
    width: 95%;
    height: 85%;
}
#line {
    width: 100%;
    height: 2px;
    border-top: 1px #00FFFF solid;
}
.time {
  display: flex;
  margin: 39px 0 0 53px;
  .clock {
    width: 100px;
    height: 100px;
  }
}
.choose {
    width: 100%;
    height: 80%;
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
    right: -10px;
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
.statistics{
    display: flex;
}
.statistics:nth-of-type(1) {
    width: 100%;
    height: 15%;
}
.renting, .rent{
    width: 33%;
    height: 100%;
    display: flex;
}
.renting {
    background: url('../../assets/image/border/k_5.png') no-repeat ;
    background-size: 100% 100%
}
.rent {
    background: url('../../assets/image/border/k_6.png') no-repeat ;
    background-size: 100% 100%
}
.empty {
    background: url('../../assets/image/border/k_7.png') no-repeat ;
    background-size: 100% 100%
}
.renting>section:nth-of-type(1){
    width: 45%;
    height: 100%;
}
#statistics,#statistics1,#statistics3,#statistics4 {
  height: 100%;
  width: 100%
}
.renting>section:nth-of-type(2){
    width: 55%;
    height: 100%;
}
.rent>div>section{
    width: 49%;
    height: 100%;
    display: inline-block
}
.rent>section{
    width: 100%;
    height: 100%;
}
.rentingPrice1, .rentingPrice2,.total1, .total2 {
    width: 15%;
    height: 100%;
}
.empty {
    width: 48%;
    height: 100%;
}
.statistics:nth-of-type(2) {
    width: 100%;
    height: 30%;
    margin-top: 15px;
}
.statistics:nth-of-type(3) {
    width: 100%;
    height: 45%;
    margin-top: 15px;
}
.rentingPrice1, .rentingPrice2,.total1,.total2 {
  height: 100%;
  width: 14%;
  border-radius: 3px;
  display: inline-block;
  margin-left: 12px;
}
.rentingPrice1 {
    background: linear-gradient(to right,#FD6F58,#FE5785);
}
.rentingPrice2 {
    background: linear-gradient(to right,#FF9E1D,#FFDE80);
}
.total1 {
    background: linear-gradient(to right,#8FBD5B,#119A8B);
}
.total2 {
    background: linear-gradient(to right,#76FFF6,#298AC1);
}
.total {
  height: 100%;
  width: 14%;
  border-radius: 3px;
  display: inline-block;
  margin-left: 12px;
}
</style>
