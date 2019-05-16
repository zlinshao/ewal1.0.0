<template>
  <div id="president">
    <!-- <div></div> -->
    <p id="logo"></p>
    <section class="time">
      <section class="timeLeft">
        <clock></clock>
      </section>
      <section class="timeRight">
        <strong>{{this.time1}}</strong>
        <p>{{this.time}}</p>
      </section>
    </section>
        <section class="tab">
          <section class="tabPage" v-for="(item, index) in tabPages" :key="index" @click="toPath(item)">
            <img :src= item.imgUrl alt="">
            <span >{{item.name}}</span>
          </section>
        </section>
    <div class="main">
      <div class="start">
        <div class="ranking" >
          <section class="top">
            <span>业绩排名</span>
            <span id="more">更多></span>
          </section>
          <!-- <section style="clear: both"></section> -->
          <div  class="box" style="display:flex">
            <section class="bottom" v-for="(item, index) in cityData" :key="index" >
              <p style="height: 19px;text-align: right;position:relative;right:10px;top:5px" v-show="index === 0"><img src="../../assets/image/crown.png" alt="" style="width:17px;height:17px"></p>
              <p style="height: 19px;text-align: right;position:relative;right:10px;top:5px" v-show="index !== 0"></p>
              <div style="padding-left: 10px">
                <p>{{item.num}}</p>
                <p>{{item.city}}</p>
              </div>
              <div style="padding: 10px 0 0 10px">
                <p>{{item.sale}}</p>
                <el-progress :percentage="70"></el-progress>
              </div>
            </section>
          </div>
        </div>
        <div class="ranking">
          <section>
            <div style="height: 40%;width: 100%;position:relative">
              <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日收房量&nbsp;<span style="font-size: 4px">(套)</span></p>
            </div>
            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
              <h1>11100</h1>
            </div>
          </section>
          <section>
            <div id="ratio" style="display:flex;padding-top:10px">
              <div style="width:50%;">
                <p>日环比<img src="../../assets/image/down.png" alt="" style="width:21px;height:21px;position:relative;top:5px"></p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
              <div style="width:50%;">
                <p>周环比<img src="../../assets/image/up.png" alt="" style="width:21px;height:21px;position:relative;top:5px"></p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
            </div>
            <div id="statistics"></div>
          </section>
        </div>
        <div class="ranking">
          <section>
            <div style="height: 40%;width: 100%;position:relative">
              <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日收房量&nbsp;<span style="font-size: 4px">(套)</span></p>
            </div>
            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
              <h1>11100</h1>
            </div>
          </section>
          <section>
            <div id="ratio" style="display:flex;padding-top:10px">
              <div style="width:50%;">
                <p>日环比<img src="../../assets/image/down.png" alt="" style="width:21px;height:21px;position:relative;top:5px"></p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
              <div style="width:50%;">
                <p>周环比<img src="../../assets/image/up.png" alt="" style="width:21px;height:21px;position:relative;top:5px"></p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
            </div>
            <div id="statistics1"></div>
          </section>
        </div>
        <div class="ranking">
          <section style="color:#33C8FF;padding:14px 0 0 38px;height:15%">网络监控</section>
          <section style="height:85%;width:100%;display:flex;justify-content: flex-start">
            <div style="width:50%;height:100%">
              <p style="text-align:center">实例ID</p>
            </div>
            <div style="width:50%;height:100%">
              <p style="text-align:center">状态</p>
            </div>
          </section>
        </div>
      </div>
      <div class="middle">
        <div id="topSale">
          <div class="number" v-for="(n, index) in 10" :key="index">0</div>
          <!-- <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div>
          <div class="number"></div> -->
        </div>
        <div id="earth"></div>
      </div>
      <div class="end">
        <div id="entry" style="display:flex">
          <section style="width:70%;height:100%;display:flex">
            <div style="width:50%;height:100%" id="entryRate"></div>
            <div style="width:50%;height:100%">
              <div style="width:100%;height:40%;position:relative">
                <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日入职&nbsp;<span style="font-size: 4px">(人)</span></p>
              </div>
              <div style="width:100%;height:60%;padding:15px 0 0 30px">
                <span style="font-size: 35px;color: #FFFFFF">37</span>
                <span>/1,420</span>
              </div>
            </div>
          </section>
          <section style="width:30%;height:100%"></section>
        </div>
        <div id="quit" style="display:flex">
          <section style="width:70%;height:100%;display:flex">
            <div style="width:50%;height:100%" id="quitRate"></div>
            <div style="width:50%;height:100%">
              <div style="width:100%;height:40%;position:relative">
                <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">今日入职&nbsp;<span style="font-size: 4px">(人)</span></p>
              </div>
              <div style="width:100%;height:60%;padding:15px 0 0 30px">
                <span style="font-size: 35px;color: #FFFFFF">37</span>
                <span>/1,420</span>
              </div>
            </div>
          </section>
          <section style="width:30%;height:100%"></section>
        </div>
        <!-- <div id="quit"></div> -->
        <div id="loss">
          <div style="width:100%;">
            <div style="padding: 20px 20px;">
              <h4>今日亏损率</h4>
              <p style="font-size: 3rem;color:#FFFFFF">8.0%</p>
            </div>
          </div>
          <div style="width:100%;height:30%" id="lossRate"></div>
          <div style="width:100%;height:30%">
            <!-- <div style="width:30%;height:30%">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            </div> -->
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
  // beforeRouteLeave (to, from, next) {
  //   console.log(to, from, next)
  //   // if (to.fullPath === '/markting') {
  //   //   this.$store.dispatch('change_path', '/markting')
  //   // }
  // },
  watch: {},
  computed: {},
  methods: {
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
      myChart4.setOption({
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          grid:{
              x:10,
              y:0,
              x2:10,
              y2:0,
              borderWidth:1
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
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
@import "../../assets/scss/index/index.scss";
#president1 {
  div {
    position: relative;
    height: 300px;
    padding: 0 100px;
    justify-content: space-around;
    p {
      background-color: #cf2e33;
      height: 100%;
      color: #ffffff;
      padding: 30px 20px;
      opacity: 0;
      transform: translateX(-1920px);
      transition: all 0.3s;
    }
  }
  .hhhhhhhh {
    p {
      opacity: 1;
      transform: translateX(0);
    }
    .p9 {
      transition-delay: 0.1s;
    }
    .p8 {
      transition-delay: 0.2s;
    }
    .p7 {
      transition-delay: 0.3s;
    }
    .p6 {
      transition-delay: 0.4s;
    }
    .p5 {
      transition-delay: 0.5s;
    }
    .p4 {
      transition-delay: 0.6s;
    }
    .p3 {
      transition-delay: 0.7s;
    }
    .p2 {
      transition-delay: 0.8s;
    }
    .p1 {
      transition-delay: 0.9s;
    }
  }
}
#logo {
  height: 115px;
  background: url("../../assets/image/president/lejia_data.png") no-repeat;
}
#president {
  position: relative;
  width: 100%;
  height: 100%;
  // background: url("../../assets/image/president/di.png") no-repeat 100% 100%;
}
.time {
  display: flex;
  position: absolute;
  top: 39px;
  left: 53px;
  .clock {
    width: 100px;
    height: 100px;
  }
}
.timeRight {
  margin: 21px;
  strong {
    font-size: 30px;
  }
}
.tab {
  // width: 120px;
  // height: 120px;
  color: black;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  // top: px;
  right: 116px;
  top: 90px;
  section {
    border-radius: 100%;
    width: 75px;
    height: 75px;
    // background: red;
    img {
      width: 100%;
      height: 100%;
    }
  }
  section:nth-of-type(1) {
    position: relative;
    width: 75px;
    height: 75px;
    span {
      position: absolute;
      z-index:2;
      top: 24px;
      left: 20px;
    }
  }
  section:nth-of-type(2) {
    position: relative;
    top: -45px;
    left: 18px;
    width: 90px;
    height: 90px;
    span {
      position: absolute;
      z-index:2;
      top: 32px;
      left: 26px;
    }
  }
  section:nth-of-type(3) {
    position: relative;
    left: 27px;
    width: 75px;
    height: 75px;
    span {
      position: absolute;
      z-index:2;
      top: 24px;
      left: 20px;
    }
  }
  section:nth-of-type(4) {
    position: relative;
    width: 75px;
    height: 75px;
    top: -38px;
    left: 36px;
    span {
      position: absolute;
      z-index:2;
      top: 24px;
      left: 20px;
    }
  }
}
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 115px);
}
.main>div:nth-of-type(1){
    // width: 30%;
    height: 100%;
  }
.main>div:nth-of-type(2){
    width: 46%;
    height: 100%;
    margin-left: 36px;
  }
.main>div:nth-of-type(3){
    width: 30%;
    height: 100%;
    padding-top: 3%;
    position: relative;
    right: 35px;
}
.ranking :first-of-type{
  // width: 100%;
  // height: 23%
}
.start>div:nth-of-type(2){
  width: 100%;
  height: 17%;
  margin-top: 3px;
}
.start>div:nth-of-type(3){
  width: 100%;
  height: 17%;
  margin-top: 3px;
}
.start>div:last-of-type{
  width: 100%;
  height: 42%;
  margin-top: 3px;
}
.start {
  height: 100%;
  color: white;
  padding-top: 3%;
  margin-left: 45px;
  width: 24%;
}
// .middle {
//   width: 46%;
// }
// .end {
//   width: 30%;
// }
.ranking:nth-of-type(2) {
  display: flex;
  background: url('../../assets/image/border/k_1.png') no-repeat ;
  background-size: 100% 100%;
}
.ranking:nth-of-type(2)>section:nth-of-type(1) {
  display: inline-block;
  width: 40%;
  height: 100%;
}
.ranking:nth-of-type(2)>section:nth-of-type(2) {
  display: inline-block;
  width: 60%;
  height: 100%;
}
.ranking:nth-of-type(3) {
  display: flex;
  background: url('../../assets/image/border/k_1.png') no-repeat ;
  background-size: 100% 100%;
}
.ranking:nth-of-type(3)>section:nth-of-type(1) {
  display: inline-block;
  width: 40%;
  height: 100%;
}
.ranking:nth-of-type(3)>section:nth-of-type(2) {
  display: inline-block;
  width: 60%;
  height: 100%;
}
.start>div:nth-of-type(3) {
  background: url('../../assets/image/border/k_1.png') no-repeat ;
  background-size: 100% 100%
}
.start>div:last-of-type {
  background: url('../../assets/image/border/k_2.png') no-repeat ;
  background-size: 100% 100%
}
.bottom {
  height: 120px;
  width: 156px!important;
  border-radius: 3px;
  display: inline-block;
}
.box {
  width: 100%;
  justify-content: space-around;
}
.box>section:nth-of-type(1) {
  background: linear-gradient(to right,#FD6F58,#FE5785);
  margin-right: 11px; 
}
.box>section:nth-of-type(2) {
  background: linear-gradient(to right,#FF9E1D,#FFDE80);
  margin-right:11px; 
}
.box>section:nth-of-type(3) {
  background: linear-gradient(to left,#65E6DD,#298AC1)
}
.top {
  color: #00fdff!important;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
#more {
  display: inline-block;
  font-size: 5px;
  width: 40px;
}
#topSale {
  width: 100%;
  height: 21%;
  display: flex;
  // margin-top: 14px;
  background: url('../../assets/image/president/yeji.png') no-repeat;
}
#entry {
  width: 100%;
  height: 23%;
  margin-top: 14px;
  background: url('../../assets/image/border/k_3.png') no-repeat;
  background-size: 100% 100%;
}
#quit {
  width: 100%;
  height: 23%;
  margin-top: 14px;
  background: url('../../assets/image/border/k_3.png') no-repeat;
  background-size: 100% 100%;
}
#loss {
  width: 100%;
  height: 47%;
  margin-top: 14px;
  background: url('../../assets/image/border/k_4.png') no-repeat;
  background-size: 100% 100%;
}
.number {
  display: inline-block;
  padding-left: 7px;
  font-size: 70px;
  width: 52px;
  height: 91px;
}
.number:first-of-type{
  margin-left: 24px;
}
.number:nth-of-type(2){
  margin-left: 12px;
}
.number:nth-of-type(3){
  margin-left: 41px;
}
.number:nth-of-type(4){
  margin-left:15px;
}
.number:nth-of-type(5){
  margin-left: 15px;
}
.number:nth-of-type(6){
  margin-left: 41px;
}
.number:nth-of-type(7){
  margin-left: 15px;
}
.number:nth-of-type(8){
  margin-left: 15px;
}
.number:nth-of-type(9){
  margin-left: 41px;
}
.number:nth-of-type(10){
  margin-left: 15px;
}
#ratio {
  height: 40%;
  width: 100%
}
#statistics {
  height: 60%;
  width: 100%
}
#statistics1 {
  height: 60%;
  width: 100%
}
</style>
