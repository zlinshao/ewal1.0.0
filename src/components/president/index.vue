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
        <img :src="item.imgUrl">
        <span>{{item.name}}</span>
      </section>
    </section>
    <div class="main">
      <div class="start">
        <div class="ranking">
          <section class="top">
            <span>业绩排名</span>
            <span id="more" @click="showMore">更多></span>
          </section>
          <!-- <section style="clear: both"></section> -->
          <div class="box" style="display:flex">
            <section class="bottom" v-for="(item, index) in cityData" :key="index">
              <p
                style="height: 19px;text-align: right;position:relative;right:10px;top:5px"
                v-show="index === 0"
              >
                <img src="../../assets/image/crown.png" alt style="width:17px;height:17px">
              </p>
              <p
                style="height: 19px;text-align: right;position:relative;right:10px;top:5px"
                v-show="index !== 0"
              ></p>
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
              <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">
                今日收房量&nbsp;
                <span style="font-size: 4px">(套)</span>
              </p>
            </div>
            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
              <h1>{{num}}</h1>
            </div>
          </section>
          <section>
            <!-- <div id="ratio" style="display:flex;padding-top:10px">
              <div style="width:50%;">
                <p>
                  日环比
                  <img
                    src="../../assets/image/down.png"
                    alt
                    style="width:21px;height:21px;position:relative;top:5px"
                  >
                </p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
              <div style="width:50%;">
                <p>
                  周环比
                  <img
                    src="../../assets/image/up.png"
                    alt
                    style="width:21px;height:21px;position:relative;top:5px"
                  >
                </p>
                <p style="color:#FFE46E">9.00%</p>
              </div>
            </div> -->
            <div id="statistics"></div>
          </section>
        </div>
        <div class="ranking">
          <section>
            <div style="height: 40%;width: 100%;position:relative">
              <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">
                今日租房量&nbsp;
                <span style="font-size: 4px">(套)</span>
              </p>
            </div>
            <div style="height: 60%;width: 100%;font-size: 25px;padding-left:30px">
              <h1>{{num13}}</h1>
            </div>
          </section>
          <section>
            <div id="statistics1"></div>
          </section>
        </div>
        <div class="ranking">
          <section style="color:#33C8FF;padding:14px 0 0 38px;height:15%">网络监控</section>
          <section style="height:85%;width:100%;justify-content: flex-start;overflow:scroll;overflow-x:hidden">
            <!-- <div style="width:50%;height:100%">
              <p style="text-align:center">实例ID</p>
            </div>
            <div style="width:50%;height:100%">
              <p style="text-align:center">状态</p>
            </div> -->
            <div style="height:15%;width:100%;display:flex">
              <div style="height:100%;width:40%;text-align:center">实例ID</div>
              <div style="height:100%;width:40%;text-align:center">状态</div>
            </div>
            <div style="height:80%;width:100%">
              <div style="height:22%;width:100%;display:flex" v-for="(item,index) in hosts">
                <div style="height:100%;width:45%;overflow:hidden;text-overflow:ellipsis;">{{item.InstanceId}}</div>
                <div style="height:100%;width:45%;"></div>
              </div>
            </div>
          </section>
        </div>
        <div class="more" v-if="flag">
          <div class="citySale" v-for="(item, index) in cityDataAll" :key="index" :class="color + index">
            <div>
              <section>
                <span>{{item.num}}</span>
                <span>{{item.city}}</span>
              </section>
              <section>
                <span>{{item.sale}}</span>
              </section>
            </div>
            <div>
              <el-progress :percentage="70"></el-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div id="topSale">
          <div class="number" v-for="(n, index) in total" :key="index">{{n}}</div>
        </div>
        <div id="earth" style="width:500px;height:500px"></div>
      </div>
      <div class="end">
        <div id="entry" style="display:flex">
          <section style="width:70%;height:100%;display:flex">
            <div style="width:50%;height:100%" id="entryRate">
              <el-progress type="circle" :percentage=this.entryRate :stroke-width="12">
              </el-progress>
              <span>入职占比</span>
            </div>
            <div style="width:50%;height:100%">
              <div style="width:100%;height:40%;position:relative">
                <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">
                  今日入职&nbsp;
                  <span style="font-size: 4px">(人)</span>
                </p>
              </div>
              <div style="width:100%;height:60%;padding:15px 0 0 30px">
                <span style="font-size: 35px;color: #FFFFFF">{{entryPerson}}</span>
                <span>/{{activePerson}}</span>
              </div>
            </div>
          </section>
          <section style="width:0px;height:80%;border:1px #00fdff solid;margin-top:10px;"></section>
          <section style="width:30%;height:100%">
            <ul>
              <li v-for="item in newPerson"><span>{{item.name}}-{{item.department}}</span></li>
            </ul>
          </section>
        </div>
        <div id="quit" style="display:flex">
          <section style="width:70%;height:100%;display:flex">
            <div style="width:50%;height:100%" id="quitRate">
              <el-progress type="circle" :percentage=this.quitRate :stroke-width="12"></el-progress>
              <span>离职占比</span>
            </div>
            <div style="width:50%;height:100%">
              <div style="width:100%;height:40%;position:relative">
                <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">
                  今日离职&nbsp;
                  <span style="font-size: 4px">(人)</span>
                </p>
              </div>
              <div style="width:100%;height:60%;padding:15px 0 0 30px">
                <span style="font-size: 35px;color: #FFFFFF">{{quitPerson}}</span>
                <span>/{{activePerson}}</span>
              </div>
            </div>
          </section>
          <section style="width:0px;height:80%;border:1px #00fdff solid;margin-top:10px;">
          </section>
          <section style="width:30%;height:100%">
            <ul>
              <li v-for="item in leavePerson"><span>{{item.name}}-{{item.department}}</span></li>
            </ul>
          </section>
        </div>
        <!-- <div id="quit"></div> -->
        <div id="loss">
          <div style="width:100%;">
            <div style="padding: 20px 20px;">
              <h4>今日盈亏</h4>
              <p style="font-size: 3rem;color:#FFFFFF">{{lossData}}</p>
            </div>
          </div>
          <div style="width:100%;height:30%" id="lossRate"></div>
          <div style="width:100%;height:30%;">
            <div style="width:52%;height:95%;display:inline-block">
              <ul style="width:100%;height:100%;" class="progress">
                <li>
                  <div>超置空房源</div>
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :percentage="50"
                    status="exception"
                  ></el-progress>
                  <span>{{emptyNum}}</span>
                </li>
                <li>
                  <div>公司违约</div>
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :percentage="50"
                    status="exception"
                  ></el-progress>
                  <span>{{breakPre}}</span>
                </li>
                <li>
                  <div>公司任责费用</div>
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :percentage="50"
                    status="exception"
                  ></el-progress>
                  <span>{{resPay}}</span>
                </li>
              </ul>
            </div>
            <div style="width:46%;height:95%;display:inline-block;position:relative;bottom:20px;left:-35px;">
              <ul style="width:100%;height:100%;" class="progress">
                <li>
                  <div>收租差价</div>
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :percentage="50"
                    status="exception"
                  ></el-progress>
                  <span>{{recv_rent_gap}}</span>
                </li>
                <li>
                  <div>中介费</div>
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :percentage="50"
                    status="exception"
                  ></el-progress>
                  <span>{{middle}}</span>
                </li>
              </ul>
            </div>
            <div style="width:48%;height:95%;"></div>
            <!-- <div style="width:30%;height:30%">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from "vue-clock2";
import earthData  from '../../../static//earth/earthData';  //地球的echarts数据
export default {
  components: { Clock },
  name: "index",
  data() {
    return {
      num: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      num6: 0,
      num7: 0,
      num8: 0,
      num9: 0,
      num10: 0,
      num11: 0,
      num12: 0,
      num13: 0,
      color: 'color',
      recv_rent_gap: '',
      totalSale: '',
      total: [],
      middle: '',
      resPay: '',
      breakPre: '',
      lossData: '',
      quitRate: 0,
      entryRate: 0,
      emptyHome: '',
      emptyNum: '',
      default: '',
      responsibe: '',
      PriceDifference: '',
      intermediary: '',
      detailData: [],
      cityDataAll: [],
      newPerson: [],
      leavePerson: [],
      lossArr: [],
      weekDate: [],
      dateTime: '',
      dateTime1: '',
      entryPerson: '',
      activePerson: '',
      quitPerson: '',
      todayHome: {},
      todayRentHome: '',
      todayRentHome: '',
      rentDetailData: [],
      hosts: [],
      allUrl: globalConfig.president_sever,
      netUrl: globalConfig.network_sever,
      flag: false,
      tabPages: [
        {
          name: "市场",
          url: "markting",
          imgUrl: require("../../assets/image/president/shichang_0.png")
        },
        {
          name: "人事",
          url: "humanbing",
          imgUrl: require("../../assets/image/president/renshi_1.png")
        },
        {
          name: "财务",
          url: "fincene",
          imgUrl: require("../../assets/image/president/caiwu_0.png")
        },
        {
          name: "网络",
          url: "network",
          imgUrl: require("../../assets/image/president/wangluo_0.png")
        }
      ],
      url: "../../assets/image/president/renshi_0.png",
      time: "",
      time1: "",
      date: "",
      cityData: [
      ]
    };
  },
  mounted() {
    this.getLangDate()
    this.drawLine();
    this.drawEarth();
    let d = new Date()
    // 七天前时间
    let date1 = new Date().getTime() - 7 * 24 * 3600 * 1000
    let date3 = new Date().getTime() - 1 * 24 * 3600 * 1000
    let date4 = new Date().getTime() - 2 * 24 * 3600 * 1000
    let date5 = new Date().getTime() - 3 * 24 * 3600 * 1000
    let date6 = new Date().getTime() - 4 * 24 * 3600 * 1000
    let date7 = new Date().getTime() - 5 * 24 * 3600 * 1000
    let date8 = new Date().getTime() - 6 * 24 * 3600 * 1000
    // 转标准时间
    let date2 = new Date(date1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day2 = new Date(date3 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day3 = new Date(date4 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day4 = new Date(date5 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day5 = new Date(date6 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day6 = new Date(date7 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day7 = new Date(date8 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    this.dateTime1 = date2.substr(0,10)
    this.dateTime2 = day2.substr(0,10)
    this.dateTime3 = day3.substr(0,10)
    this.dateTime4 = day4.substr(0,10)
    this.dateTime5 = day5.substr(0,10)
    this.dateTime6 = day6.substr(0,10)
    this.dateTime7 = day7.substr(0,10)
    console.log(this.dateTime2,this.dateTime3)
    let day= new Date().getDay()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    if (month < 10) {
      month = '0' + month.toString()
    }
    if (date < 10) {
      date = '0' + date.toString()
    }
    let dateTime = d.getFullYear() + '-' + month + '-' + date; 
    this.dateTime = dateTime
    this.getLangDate();
  },
  activated() {
    console.log(this.$route)
    console.log(this.$router)
    this.getDetail();
    // this.getRentDetail();
    this.getEntryData();
    this.getRate();
    this.getEmptyHome();
    this.getLoss();
    this.getHost();
    this.getAchieve();
  },
  watch: {},
  computed: {},
  methods: {
    getHost() {
        this.$http.post(this.netUrl + "instance-list").then(res => {
          this.hosts = res.data.InstanceStatuses.InstanceStatus
      })
    },
    // 业绩
    getAchieve() {
        this.$http.post(this.allUrl + "achievement_detail_for_ceo").then(res => {
          this.totalSale = res.data[res.data.length - 1][1]
          this.totalSale = this.payZero(this.totalSale, 8) + '00'
          this.total = this.totalSale.split('')
          console.log(this.totalSale)
          // console.log(this.total)
          this.cityData = []
          for(let i of res.data.reverse().slice(1,4)) {
            this.cityData.push({city: i[0], sale: i[1],num: i[2]})
          }
          for(let i of res.data.reverse().slice(1,res.data.reverse().length - 1)) {
            this.cityDataAll.push({city: i[0], sale: i[1],num: i[2]})
          }
          console.log(this.cityData)
      })
    },
    // 更多
    showMore() {
      this.flag = !this.flag;
    },
    // 补0
    payZero(num, length) {
      for(let len = (num + "").length; len < length; len = num.length) {
            num = " " + num;            
        }
        return num;
    },
    // 获取违约金..
    getRate() {
      let params = {
        level: '1',
        mode: 'day',
        start: this.dateTime1,
        end: this.dateTime
      }
      this.$http.post(this.allUrl + "disburse", params).then(res => {
        console.log(res)
        this.breakPre = res.data[this.dateTime].break_pay.amount_paid
        this.resPay = res.data[this.dateTime].mediation_pay.amount_paid
        this.middle = res.data[this.dateTime].responsibility_pay.amount_paid
        let year = new Date().getFullYear() + '年';
        let obj = res.data[year]
        // this.emptyHome
        // console.log(obj.房租.amount_paid)
      })
    },
    // 收房量
    getDetail() {
      this.$http.post(this.allUrl + "recv_rent_detail_for_ceo").then(res => {
        
        this.todayHome = res.data[this.dateTime]
        console.log(Object.keys(res.data))
        Object.keys(this.todayHome).map(key => {
          this.num += this.todayHome[key].recv
        });
        Object.keys(res.data[this.dateTime7]).map(key => {
          this.num6 += res.data[this.dateTime7][key].recv
        });
        Object.keys(res.data[this.dateTime6]).map(key => {
          this.num5 += res.data[this.dateTime6][key].recv
        });
        Object.keys(res.data[this.dateTime5]).map(key => {
          this.num4 += res.data[this.dateTime5][key].recv
        });
        Object.keys(res.data[this.dateTime4]).map(key => {
          this.num3 += res.data[this.dateTime4][key].recv
        });
        Object.keys(res.data[this.dateTime3]).map(key => {
          this.num2 += res.data[this.dateTime3][key].recv
        });
        Object.keys(res.data[this.dateTime2]).map(key => {
          this.num1 += res.data[this.dateTime2][key].recv
        });
        Object.keys(this.todayHome).map(key => {
          this.num13 += this.todayHome[key].rent
        });
        Object.keys(res.data[this.dateTime7]).map(key => {
          this.num7 += res.data[this.dateTime7][key].rent
        });
        Object.keys(res.data[this.dateTime6]).map(key => {
          this.num8 += res.data[this.dateTime6][key].rent
        });
        Object.keys(res.data[this.dateTime5]).map(key => {
          this.num9 += res.data[this.dateTime5][key].rent
        });
        Object.keys(res.data[this.dateTime4]).map(key => {
          this.num10 += res.data[this.dateTime4][key].rent
        });
        Object.keys(res.data[this.dateTime3]).map(key => {
          this.num11 += res.data[this.dateTime3][key].rent
        });
        Object.keys(res.data[this.dateTime2]).map(key => {
          this.num12 += res.data[this.dateTime2][key].rent
        });
        this.detailData = [this.num6,this.num5,this.num4,this.num3,this.num2,this.num1,this.num]
        this.rentDetailData = [this.num7,this.num8,this.num9,this.num10,this.num11,this.num12,this.num13]
      }).then(()=> {
         this.drawLine()
      })
    },
    // 租房量
    // getRentDetail() {
    //   this.$http.post(this.allUrl + "rent_detail_by_time").then(res => {
    //     this.todayRentHome = res.data[this.dateTime]
    //     Object.keys(res.data).map(key => {
    //       this.rentDetailData.push(res.data[key]);
    //     });
    //   }).then(()=> {
    //      this.drawLine()
    //   })
    // },
    // 亏损
    getLoss() {
      this.$http.post(this.allUrl + "loss_detail").then(res => {
        let d = new Date()
        console.log(res)
        this.lossData = res.data[res.data.length - 1].income_and_disburse
        res.data.forEach((item) => {
          this.lossArr.push(item.income_and_disburse)
        })
        console.log(this.lossArr)
        
      }).then(()=> {
         this.drawLine()
      })
    },
    // 空房源
    getEmptyHome () {
      let params = {
        level: '1',
        mode: 'day',
        start: this.dateTime1,
        end: this.dateTime
      }
      this.$http.post(this.allUrl + "rent_detail", params).then(res => {
        console.log(res)
        this.emptyNum = res.data.vacancy_fee
        this.recv_rent_gap = res.data.recv_rent_gap
      })
    },
    // 今日入职
    getEntryData() {
      let params = {
        // start: this.dateTime,
        start: '2019-05-01',
        end: '2019-05-08'
        // end: this.dateTime
      }
      this.$http.post(this.allUrl + "dimission_rate", params).then(res => {
        this.activePerson = res.data.active_staff_num
        this.entryPerson = res.data.entry_staff_num
        this.quitPerson = res.data.quit_staff_detail.length
        this.newPerson = res.data.entry_staff_detail
        this.leavePerson = res.data.quit_staff_detail
        this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
        this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
        console.log(this.entryRate)
      }).then(() => {
        this.drawLine()
      })
    },
    toPath(item) {
      console.log(item);
      this.$router.push({
        path: item.url
      });
    },
    drawLine() {
        let d = new Date()
        let day= new Date().getDay()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        if (month < 10) {
          month = '0' + month.toString()
        }
        if (date < 10) {
          date = '0' + date.toString()
        }
        let dateTime = d.getFullYear() + '-' + month + '-' + date; 
        console.log(dateTime)
        this.dateTime = dateTime
        let week = new Array(7)
        let arr = [day+1,day+2,day+3,day+4,day+5,day+6,day] 
        week[0] = '周日'
        week[1] = '周一'
        week[2] = '周二'
        week[3] = '周三'
        week[4] = '周四'
        week[5] = '周五'
        week[6] = '周六'
        week[7] = '周日'
        week[8] = '周一'
        week[9] = '周二'
        week[10] = '周三'
        week[11] = '周四'
        week[12] = '周五'
        week[13] = '周六'
        for (let i of arr) {
          this.weekDate.push(week[i])
        }
        this.weekDate = this.weekDate.slice(0, 7)
      let myChart = this.$echarts.init(document.getElementById("statistics"));
      let myChart1 = this.$echarts.init(document.getElementById("statistics1"));
      // let myChart2 = this.$echarts.init(document.getElementById("entryRate"));
      // let myChart3 = this.$echarts.init(document.getElementById("quitRate"));
      let myChart4 = this.$echarts.init(document.getElementById("lossRate"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
            top: 10,
            bottom: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.weekDate
            // data: ['05-15','05-16','05-17','05-18','05-19','05-20']
          }
        ],
        yAxis: [
          {
            show: false
          },
          {
            splitLine: {
              show: false
            }
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "收房量",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            // data:[30, 40, 430, 401, 390, 30, 10]
            data: this.detailData
          }
        ]
      });
      myChart1.setOption({
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            top: 10,
            bottom: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data : this.weekDate
          }
        ],
        yAxis: [
          {
            show: false
          },
          {
            splitLine: {
              show: false
            }
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "租房量",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: this.rentDetailData
          }
        ]
      });
      myChart4.setOption({
        tooltip : {
            trigger: 'axis'
        },
        xAxis: {
          type: "category",
          data: this.weekDate
        },
        grid: {
          x: 10,
          y: 0,
          x2: 10,
          y2: 0,
          borderWidth: 1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "今日盈亏",
            smooth: true,
            data: this.lossArr,
            type: "line"
          }
        ]
      });
    },
    getLangDate() {
      function dateFilter(date) {
        //值小于10时，在前面补0
        if (date < 10) {
          return "0" + date;
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
      this.time =
        dateFilter(year) +
        "年" +
        dateFilter(month) +
        "月" +
        dateFilter(date) +
        "日";
      this.time1 =
        dateFilter(hour) +
        ":" +
        dateFilter(minute) +
        ":" +
        dateFilter(second);
        setTimeout(() => {
          this.getLangDate()
        }, 1000)
    },
    // 地球绘制3d效果
    drawEarth (){
      let myChartEarth = this.$echarts.init(document.getElementById('earth'));

      function getAirportCoord(idx) {
        return [earthData.airports[idx][3], earthData.airports[idx][4]];
      }
      var routes = earthData.routes.map(function(airline) {
          return [
              getAirportCoord(airline[1]),
              getAirportCoord(airline[2])
          ];
      });

      myChartEarth.setOption({
        // backgroundColor: '#000',
        globe: {
            // baseTexture: 'https://echarts.baidu.com/examples/data-gl/asset/world.topo.bathy.200401.jpg',
            // heightTexture: 'https://echarts.baidu.com/examples/data-gl/asset/bathymetry_bw_composite_4k.jpg',
            baseTexture: require('../../assets/image/earthImage/world.jpg'),
            heightTexture: require('../../assets/image/earthImage/bathymetry.jpg'),
            shading: 'lambert',
            light: {
                ambient: {
                    intensity: 0.4
                },
                main: {
                    intensity: 0.4
                }
            },
            viewControl: {
                autoRotate: true
            }
        },
        series: {
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            lineStyle: {
                width: 1,
                color: 'rgb(50, 50, 150)',
                opacity: 0.1
            },
            data: routes
        }
      });
    }
  }
};
</script>

<style lang="">
.el-progress__text{
  color: #00fdff;
  top: 40%!important;
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/index/index.scss";
#entryRate {
  top:16px;
  left: 16px;
  position: relative;
  span {
    position: absolute;
    left: 28px;
    top: 64px;
  }
}
#quitRate {
  top:16px;
  left: 16px;
  position: relative;
  span {
    position: absolute;
    left: 28px;
    top: 64px;
  }
}
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
}

.el-progress /deep/ path:first-child {
    // stroke: #17cb7e;
    // stroke: linear-gradient();
}
.el-progress /deep/ path:nth-child(2) {
    stroke: #76FFF6;
}
#logo {
  height: 115px;
  background: url("../../assets/image/president/lejia_data.png") no-repeat;
}
#president {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    cursor: pointer;
    img {
      width: 75px;
      height: 75px;
    }
  }
  section:nth-of-type(1) {
    position: relative;
    span {
      position: absolute;
      z-index: 2;
      top: 24px;
      left: 20px;
    }
  }
  section:nth-of-type(2) {
    position: relative;
    top: -45px;
    left: 18px;
    span {
      position: absolute;
      z-index: 2;
      top: 25px;
      left: 20px;
    }
  }
  section:nth-of-type(3) {
    position: relative;
    left: 27px;
    span {
      position: absolute;
      z-index: 2;
      top: 24px;
      left: 20px;
    }
  }
  section:nth-of-type(4) {
    position: relative;
    top: -38px;
    left: 36px;
    span {
      position: absolute;
      z-index: 2;
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
.main > div:nth-of-type(1) {
  // width: 30%;
  height: 100%;
}
.main > div:nth-of-type(2) {
  width: 46%;
  height: 100%;
  margin-left: 36px;
}
.main > div:nth-of-type(3) {
  width: 30%;
  height: 100%;
  padding-top: 3%;
  position: relative;
  right: 35px;
}
.ranking :first-of-type {
  // width: 100%;
  // height: 23%
}
.start > div:nth-of-type(2) {
  width: 100%;
  height: 17%;
  margin-top: 3px;
}
.start > div:nth-of-type(3) {
  width: 100%;
  height: 17%;
  margin-top: 3px;
}
.start > div:nth-of-type(4) {
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
  position: relative;
}
.more {
  padding-top: 20px;
  position: absolute;
  width: 258px;
  height: 530px;
  top: 60px;
  right: -270px;
  background: #060738;
  // opacity: 0.5;
}
.citySale {
  width: 100%;
  height: 63px;
  >div:nth-child(1) {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    >section:nth-child(1){
      width: 36%;
      height: 100%;
    }
    >section:nth-child(2){
      width: 28%;
      height: 100%;
    }
  }
  >div:nth-child(2) {
    width: 100%;
    height: 40%;
  }
}
// .middle {
//   width: 46%;
// }
// .end {
//   width: 30%;
// }
.ranking:nth-of-type(2) {
  display: flex;
  background: url("../../assets/image/border/k_1.png") no-repeat;
  background-size: 100% 100%;
}
.ranking:nth-of-type(2) > section:nth-of-type(1) {
  display: inline-block;
  width: 40%;
  height: 100%;
}
.ranking:nth-of-type(2) > section:nth-of-type(2) {
  display: inline-block;
  width: 60%;
  height: 100%;
}
.ranking:nth-of-type(3) {
  display: flex;
  background: url("../../assets/image/border/k_1.png") no-repeat;
  background-size: 100% 100%;
}
.ranking:nth-of-type(3) > section:nth-of-type(1) {
  display: inline-block;
  width: 40%;
  height: 100%;
}
.ranking:nth-of-type(3) > section:nth-of-type(2) {
  display: inline-block;
  width: 60%;
  height: 100%;
}
.start > div:nth-of-type(3) {
  background: url("../../assets/image/border/k_1.png") no-repeat;
  background-size: 100% 100%;
}
.start > div:nth-of-type(4) {
  background: url("../../assets/image/border/k_2.png") no-repeat;
  background-size: 100% 100%;
}
.bottom {
  height: 120px;
  width: 156px !important;
  border-radius: 3px;
  display: inline-block;
}
.box {
  width: 100%;
  justify-content: space-around;
}
.box > section:nth-of-type(1) {
  background: linear-gradient(to right, #fd6f58, #fe5785);
  margin-right: 11px;
}
.box > section:nth-of-type(2) {
  background: linear-gradient(to right, #ff9e1d, #ffde80);
  margin-right: 11px;
}
.box > section:nth-of-type(3) {
  background: linear-gradient(to left, #65e6dd, #298ac1);
}
.top {
  color: #00fdff !important;
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
  background: url("../../assets/image/president/yeji.png") no-repeat;
}
#entry {
  width: 100%;
  height: 23%;
  margin-top: 14px;
  background: url("../../assets/image/border/k_3.png") no-repeat;
  background-size: 100% 100%;
}
#quit {
  width: 100%;
  height: 23%;
  margin-top: 14px;
  background: url("../../assets/image/border/k_3.png") no-repeat;
  background-size: 100% 100%;
}
#loss {
  width: 100%;
  height: 47%;
  margin-top: 14px;
  background: url("../../assets/image/border/k_4.png") no-repeat;
  background-size: 100% 100%;
}
.number {
  display: inline-block;
  padding-left: 7px;
  font-size: 70px;
  width: 52px;
  height: 91px;
}
.number:first-of-type {
  margin-left: 24px;
}
.number:nth-of-type(2) {
  margin-left: 12px;
}
.number:nth-of-type(3) {
  margin-left: 41px;
}
.number:nth-of-type(4) {
  margin-left: 15px;
}
.number:nth-of-type(5) {
  margin-left: 15px;
}
.number:nth-of-type(6) {
  margin-left: 41px;
}
.number:nth-of-type(7) {
  margin-left: 15px;
}
.number:nth-of-type(8) {
  margin-left: 15px;
}
.number:nth-of-type(9) {
  margin-left: 41px;
}
.number:nth-of-type(10) {
  margin-left: 15px;
}
#ratio {
  height: 40%;
  width: 100%;
}
#statistics {
  height: 100%;
  width: 100%;
}
#statistics1 {
  height: 100%;
  width: 100%;
}
.progress li {
  width: 100%;
  height: 30%;
  display: flex;
  div:nth-child(1) {
    width: 35%;
    height: 100%;
    font-size: 5px;
    text-align: right;
    margin-right: 6px;
  }
  div:nth-child(2) {
    width: 40%;
    height: 100%;
  }
  span {
    display: inline-block;
    width: 25%;
    margin-left: 10px;
    height: 100%;
  }
}
.color0 {
  color: red;
}
.color1 {
  color: #FF9E1D;
}
.color2 {
  color: #76FFF6;
}
</style>
