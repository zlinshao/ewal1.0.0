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
                        <p>入职/离职趋势</p>
                        <section id="entryRate"></section>
                        <section id="levetRate"></section>
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
                                    <img src="../../assets/image/president/renshi_11.png" alt="" >
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
                                    <img src="../../assets/image/president/wangluo_00.png" alt="">
                                </router-link>
                            </div>
                        </li>
                    
                </ul>
            </div>
            <div class="bottom">
                <div id="chooseArea"></div>
                <div id="entry">
                    <section  class="pie">
                        <div>
                            <div style="width:60%;height:100%;" id="showEntry"></div>
                            <div style="width:35%;height:100%;display: flex;justify-content:center;align-items:Center;">
                                <div>
                                    <p><span>入职</span><span style="font-size: 4px">(人)</span></p>
                                    <p style="font-size:30px;color:#ffffff">123</p>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;justify-content:center;align-items:Center;">
                             <div>
                                    <p><span>在职</span><span style="font-size: 4px">(人)</span></p>
                                    <p style="font-size:30px;color:#ffffff">1403</p>
                            </div>
                        </div>
                    </section>
                    <section  class="pie">
                       <div>
                            <div style="width:60%;height:100%;" id="showLeave"></div>
                            <div style="width:35%;height:100%;display: flex;justify-content:center;align-items:Center;">
                                <div>
                                    <p><span>入职</span><span style="font-size: 4px">(人)</span></p>
                                    <p style="font-size:30px;color:#ffffff">123</p>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;justify-content:center;align-items:Center;">
                             <div>
                                    <p><span>在职</span><span style="font-size: 4px">(人)</span></p>
                                    <p style="font-size:30px;color:#ffffff">1403</p>
                            </div>
                        </div>
                    </section>
                    <section  class="pieWeek">
                        <div class="pieWeekHalf">
                            <div>
                                <div style="width:60%;height:100%;">
                                    <div style="margin:58px auto;">
                                        <div class="progress">
                                            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                                        </div>
                                        <div class="progress">
                                            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                                        </div>
                                    </div>
                                </div>
                                <div style="width:35%;height:100%;display: flex;justify-content:center;align-items:Center;">
                                    <div>
                                        <p><span>本周入职</span><span style="font-size: 4px">(人)</span></p>
                                        <p style="font-size:30px;color:#ffffff;margin-top:10px;">123</p>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;justify-content:center;align-items:Center;">
                                <div>
                                        <p><span>本月入职</span><span style="font-size: 4px">(人)</span></p>
                                        <p style="font-size:30px;color:#ffffff;margin-top:10px;">1403</p>
                                </div>
                            </div>
                        </div>
                        <div class="pieWeekHalf">
                            <div>
                                <div style="width:60%;height:100%;">
                                    <div style="margin:58px auto;">
                                        <div class="progress">
                                            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                                        </div>
                                        <div class="progress">
                                            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                                        </div>
                                    </div>
                                </div>
                                <div style="width:35%;height:100%;display: flex;justify-content:center;align-items:Center;">
                                    <div>
                                        <p><span>本周入职</span><span style="font-size: 4px">(人)</span></p>
                                        <p style="font-size:30px;color:#ffffff;margin-top:10px;">123</p>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;justify-content:center;align-items:Center;">
                                <div>
                                        <p><span>本月入职</span><span style="font-size: 4px">(人)</span></p>
                                        <p style="font-size:30px;color:#ffffff;margin-top:10px;">1403</p>
                                </div>
                            </div>
                        </div>
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
        // let myChart = this.$echarts.init(document.getElementById('statistics'))
        let myChart1 = this.$echarts.init(document.getElementById('levetRate'))
        let myChart = this.$echarts.init(document.getElementById('entryRate'))
        let myChart2 = this.$echarts.init(document.getElementById('showEntry'))
        let myChart3 = this.$echarts.init(document.getElementById('showLeave'))
        // 绘制图表
        myChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
         legend: {
            data:['入职','离职']
        },
        grid: {
            top: 0,
            bottom: 20
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
        tooltip : {
            trigger: 'axis'
        },
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
                data:[-30, -40, -430, -401, -390, -30, -10]
            }
        ]
      });
      myChart2.setOption({
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
                      {value:135, name:'25%入职占比'},
                      {value:1548, name:'75%入职占比'}
                  ]
              }
          ]
      })
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
                      {value:135, name:'25%入职占比'},
                      {value:1548, name:'75%入职占比'}
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
  background: url('../../assets/image/president/di1.png') no-repeat;
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
    margin: 64px 0px 0px 0px;
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
    margin-left: 20px;
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
        // width: 178px;
        // height: 18.86px;
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
    margin-left: 20px;
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
}
.pie {
    width:100%;
    height:22%;
    display: flex;
    margin-top: 20px;
    background: url('../../assets/image/border/k_9.png') no-repeat;
    background-size: 100% 100%;
}
.pie>div:nth-of-type(1) {
    display: flex;
    width: 66%;
    height: 100%;
}
.pie>div:nth-of-type(2) {
    width: 33%;
    height: 100%;
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
    height:44%;
    margin-top: 20px;
    background: url('../../assets/image/border/k_10.png') no-repeat;
    background-size: 100% 100%;
}
#area {
    width: 100%;
    height: 72%;
    margin-top:35px;
    div {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        left: 10px;
        background: url('../../assets/image/border/k_8.png') no-repeat ;
        background-size: 100% 100%
    }
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
#entryRate, #levetRate {
    width: 100%;
    height: 45%;
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
