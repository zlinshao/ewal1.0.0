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
                    end-placeholder="结束日期" @change="chooseTime">
                    </el-date-picker>
                </div>
                <div class="location">
                    <span>{{chooseCity}}</span>
                    <img src="../../assets/image/president/didian.png" alt="">
                </div>
            </section>
            <div id="area">
                <div>
                    <section style="width: 90%;height:97%;margin:0 auto;padding-top:12px">
                        <p>今日亏损</p>
                        <p style="font-size:42px;color:#ffffff">{{lossData}}</p>
                        <section id="entryRate"></section>
                        <section id="allData">
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#BA25DC">超置空房源</section>
                                <section style="width:50%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="emptyRate"></el-progress>
                                </section>
                                <span>{{emptyNum}}</span>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#8047CC">公司违约</section>
                                <section style="width:50%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="breakPreRate" ></el-progress>
                                </section>
                                <span>{{breakPre}}</span>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#3262EC">公司任责费用</section>
                                <section style="width:50%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="resPayRate" ></el-progress>
                                </section>
                                <span>{{resPay}}</span>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#FF564F">收租差价</section>
                                <section style="width:50%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="recv_rent_gap_rate" ></el-progress>
                                </section>
                                <span>{{recv_rent_gap}}</span>
                            </section>
                            <section style="display:flex;width:100%;height:16%;">
                                <section style="width:24%;height:100%;display:inline-block;text-align:right;color:#53C13B">中介费</section>
                                <section style="width:50%;height:100%;display:inline-block;margin-left:15px">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="middleRate" ></el-progress>
                                </section>
                                <span>{{middle}}</span>
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
                    <div class="branch" v-for="(i, index) in citys" :key="index"  @click="change(i, index)">
                        <span>{{i.name}}</span>   
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
                                    <p style="color:#ffffff">盈亏比</p>
                                    <p style="color:#ffffff;font-size:45px">{{win}}</p>
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
                        <img src="../../assets/image/president/wushuju.png" alt="">
                        <!-- <div>
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
                        <div></div> -->
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
      disburse: '',
      win: '',
      lossData: '',
      recv_rent_gap: '',
      emptyRate: 0,
      recv_rent_gap_rate: 0,
      breakPreRate: 0,
      resPayRate: 0,
      middleRate: 0,
      middle: '',
      resPay: '',
      breakPre: '',
      emptyNum: '',
      startTime: '',
      endTime: '',
      chooseCity: '乐伽',
      rentArr: [],
      weekDate: [],
      weekDates: [],
      lossArr: [],
      pieArr: [],
      allUrl: globalConfig.president_sever,
      citys: [{name: '成都'}, {name: '西安'}, {name: '重庆'}, {name: '合肥'}, {name: '上海'}, {name: '杭州'}, {name: '南京'}, {name: '苏州'},{name: '乐伽'}],
      tabBar: [
        {name: '房租', color: '#F64C7E'},
        {name: '定金', color: '#FFCC4D'},
        {name: '尾款', color: '#9ECD68'},
        {name: '滞纳金', color: '#56CDFD'}
      ],
      tabBarTwo: [
        {name: '违约金', color: '#477DDB'}
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
  activated() {
    let d = new Date()
    let yes0 = new Date().getTime()
    let yes1 = new Date().getTime() - 7 * 24 * 3600 * 1000
    let yes2 = new Date().getTime() - 1 * 24 * 3600 * 1000
    let yes3 = new Date().getTime() - 2 * 24 * 3600 * 1000
    let yes4 = new Date().getTime() - 3 * 24 * 3600 * 1000
    let yes5 = new Date().getTime() - 4 * 24 * 3600 * 1000
    let yes6 = new Date().getTime() - 5 * 24 * 3600 * 1000
    let yes7 = new Date().getTime() - 6 * 24 * 3600 * 1000
    let day1 = new Date(yes1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day0 = new Date(d + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day7 = new Date(yes2 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day2 = new Date(yes3 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day3 = new Date(yes4 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day4 = new Date(yes5 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day5 = new Date(yes6 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day6 = new Date(yes7 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    this.weekDates = [day6, day5, day4, day3, day2, day7, day0]
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
    this.dateTime1 = day1
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
      this.startTime = '';
      this.endTime = '';
      this.value6 = '';
    //   this.getEmptyHome();
    //   this.getRate();
      this.getMoney(this.chooseCity);
      this.getWin(this.chooseCity);
  },
  watch: {},
  computed: {},
  methods: {
    // 切换城市 
    change(i, index) {
        console.log(i, index)
        this.chooseCity = i.name
        if (i.name !== '乐伽') {
            this.chooseCitys = i.name + '市'
        } else {
            this.chooseCitys = i.name
        }
        let temp = this.citys[this.citys.length - 1];
        this.citys[this.citys.length - 1] = i;
        this.citys[index] = temp;
        this.$forceUpdate()
        // this.getLoss()
        this.getMoney(this.chooseCitys)
        this.getWin(this.chooseCitys)
    },
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
    // 盈亏比
    getWin(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        console.log(this.weekDates)
        console.log(city)
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        let e = 0
        let f = 0
        let g = 0
        let one = 0
        let two = 0
        let three = 0
        let four = 0
        let five = 0
        let six = 0
        let seven = 0
        this.$http.post(this.allUrl + "income_and_disburse_for_ceo", params).then(res => {
         this.disburse = res.data[this.dateTime].乐伽.disburse
         one = ((res.data[this.weekDates[0]][city].disburse - res.data[this.weekDates[0]][city].income) / 10000).toFixed(2) 
         two = ((res.data[this.weekDates[1]][city].disburse - res.data[this.weekDates[1]][city].income) / 10000).toFixed(2)   
         three = ((res.data[this.weekDates[2]][city].disburse - res.data[this.weekDates[2]][city].income) / 10000).toFixed(2)  
         four = ((res.data[this.weekDates[3]][city].disburse - res.data[this.weekDates[3]][city].income) / 10000).toFixed(2)   
         five = ((res.data[this.weekDates[4]][city].disburse - res.data[this.weekDates[4]][city].income) / 10000).toFixed(2)   
         six = ((res.data[this.weekDates[5]][city].disburse - res.data[this.weekDates[5]][city].income) / 10000).toFixed(2)   
         seven = ((res.data[this.weekDates[6]][city].disburse - res.data[this.weekDates[6]][city].income) / 10000).toFixed(2)  
         this.lossData = seven + '万元'
         this.lossArr = [one,two,three,four,five,six,seven]
        if (res.data[this.weekDates[0]][city].disburse === 0) {
            a = 0
        } else {
            a =  (((res.data[this.weekDates[0]][city].income - res.data[this.weekDates[0]][city].disburse) / res.data[this.weekDates[0]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[1]][city].disburse === 0) {
            b = 0
        } else {
            b =  (((res.data[this.weekDates[1]][city].income - res.data[this.weekDates[1]][city].disburse) / res.data[this.weekDates[1]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[2]][city].disburse === 0) {
            c = 0
        } else {
            c =  (((res.data[this.weekDates[2]][city].income - res.data[this.weekDates[2]][city].disburse) / res.data[this.weekDates[2]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[3]][city].disburse === 0) {
            d = 0
        } else {
            d =  (((res.data[this.weekDates[3]][city].income - res.data[this.weekDates[3]][city].disburse) / res.data[this.weekDates[3]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[4]][city].disburse === 0) {
            e = 0
        } else {
            e =  (((res.data[this.weekDates[4]][city].income - res.data[this.weekDates[4]][city].disburse) / res.data[this.weekDates[4]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[5]][city].disburse === 0) {
            f = 0
        } else {
            f =  (((res.data[this.weekDates[5]][city].income - res.data[this.weekDates[5]][city].disburse) / res.data[this.weekDates[5]][city].disburse*10000)/100).toFixed(2)
        }
        if (res.data[this.weekDates[6]][city].disburse === 0) {
            g = 0
        } else {
            g =  (((res.data[this.weekDates[6]][city].income - res.data[this.weekDates[6]][city].disburse) / res.data[this.weekDates[6]][city].disburse*10000)/100).toFixed(2)
        }
        this.win = Math.round(g) + '%'
        this.winArr = [a,b,c,d,e,f,g]
        console.log(this.winArr)
        }).then(() => {
            this.getEmptyHome()
            this.getRate()
            this.drawLine()
        })
    },
    // 学历
    getMoney(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        console.log(city)
        this.pieArr = []
        let arr = ['房租', '定金','尾款', '滞纳金',  '违约金']
        console.log(this.weekDates)
        this.fronMoney = 0
        this.rent = 0
        this.backMoney = 0
        this.lateFee = 0
        this.breachMoney = 0
      this.$http.post(this.allUrl + "income_and_disburse_detail_for_ceo", params).then(res => {
        Object.keys(res.data.income).map(key => {
            this.fronMoney += res.data.income[key][city].定金
            this.rent += res.data.income[key][city].房租
            this.backMoney += res.data.income[key][city].尾款
            this.lateFee += res.data.income[key][city].滞纳金
            this.breachMoney += res.data.income[key][city].违约金
        })
        let arr1 = {定金: this.fronMoney,房租: this.rent,尾款: this.backMoney,滞纳金: this.lateFee,定金: this.fronMoney,违约金: this.breachMoney}
            this.rentArr = []
            arr.forEach((item) => {
                this.rentArr.push({value: arr1[item],name: item})
            })
            console.log(this.rentArr)
        }).then(() => {
            this.drawLine()
        })
        },
    chooseTime() {
        console.log(this.value6)
        let time1 = new Date(this.value6[0]).getTime() 
        let d = new Date(this.value6[1])
        let day= new Date(this.value6[1]).getDay()
        console.log(day)
        this.weekDate = []
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
        let yes0 = new Date(this.value6[1]).getTime()
        let yes1 = new Date(this.value6[1]).getTime() - 1 * 24 * 3600 * 1000
        let yes2 = new Date(this.value6[1]).getTime() - 2 * 24 * 3600 * 1000
        let yes3 = new Date(this.value6[1]).getTime() - 3 * 24 * 3600 * 1000
        let yes4 = new Date(this.value6[1]).getTime() - 4 * 24 * 3600 * 1000
        let yes5 = new Date(this.value6[1]).getTime() - 5 * 24 * 3600 * 1000
        let yes6 = new Date(this.value6[1]).getTime() - 6 * 24 * 3600 * 1000
        let yes7 = new Date(this.value6[1]).getTime() - 7 * 24 * 3600 * 1000
        let time2 = new Date(this.value6[1]).getTime() 
        let day0 = new Date(yes0 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day1 = new Date(yes1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day2 = new Date(yes2 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day3 = new Date(yes3 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day4 = new Date(yes4 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day5 = new Date(yes5 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day6 = new Date(yes6 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        let day7 = new Date(yes7 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
        this.weekDates = [day6, day5, day4, day3, day2, day1, day0]
        console.log(this.weekDate)
        let days = parseInt((time2 - time1) / (1000 * 60 * 60 * 24))
        if (days !== 7) {
            this.$message({
                type: 'warning',
                message: '请选择7天的时间范围'
            })
        }
        this.startTime = day6
        this.dateTime1 = day6
        this.endTime = day0
        this.dateTime = day0
        console.log(this.startTime, this.dateTime)
        // this.getLoss()
        this.getMoney(this.chooseCity)
        this.getWin(this.chooseCity)
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
        this.emptyNum =  Math.round(res.data.vacancy_fee)
        this.recv_rent_gap = Math.round(res.data.recv_rent_gap)
        this.emptyRate = Math.round(((this.emptyNum / this.disburse)*10000) / 100)
        this.recv_rent_gap_rate = Math.round(((this.recv_rent_gap / 10000000)*10000) / 100)
      })
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
        console.log(this.breakPre)
        console.log(this.resPay)
        console.log(this.middle)
        console.log(this.disburse)
        this.breakPreRate = Math.round(((this.breakPre / this.disburse)*10000) / 100)
        this.resPayRate = Math.round(((this.resPay / this.disburse)*10000) / 100)
        this.middleRate = Math.round(((this.middle / this.disburse)*10000) / 100)
        let year = new Date().getFullYear() + '年';
        let obj = res.data[year]
        // this.emptyHome
        // console.log(obj.房租.amount_paid)
      })
    },
    drawLine(){
        let myChart = this.$echarts.init(document.getElementById('entryRate'))
        let myChart1 = this.$echarts.init(document.getElementById('cunstomPie'))
        let myChart2 = this.$echarts.init(document.getElementById('lossRatio'))
        // 绘制图表
        myChart.setOption({
            title : {
                text: '一周亏损(单位:万元)',
                textStyle: {
                    color: '#ffffff'
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
            type: "category",
            data: this.weekDate,
            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            },
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                }
            ],
            grid: {
            // x: -10,
            // y: 10,
            // x2: 30,
            // y2: 0,
            borderWidth: 1
            },
            series: [
            {
                name: "今日亏损",
                smooth: true,
                data: this.lossArr,
                type: "line"
            }
            ]
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
                    name:'房租占比',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.rentArr
                    .sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    // color:['pink'],
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
        myChart2.setOption({
            grid: {
                top: 10,
                bottom: 20
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.weekDate,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            },
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                }
            ],
            series: [{
                data: this.winArr,
                type: 'line',
                areaStyle: {}
            }]
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
    .branch:last-child {
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
            left: 50px;
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
    img {
        width: 98%;
        height: 98%;
    }
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
    span{
        margin-left: 2rem;
    }
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
#entryRate {
    top: 25px;
}
</style>
