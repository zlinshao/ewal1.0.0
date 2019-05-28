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
                <div class="area">
                    <ul>
                        <section v-for="(i, index) in citys" :key="index" @click="change(i, index)">
                            <li>
                                <div >
                                    <img src="../../assets/image/president/chengshi_0.png" alt="">
                                    <span>{{i}}</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="../../assets/image/president/chengshi_1.png" alt="">
                                </div>
                            </li>
                        </section>
                    </ul>
                </div>
            </section>
        </div>
        <div class="right">
            <div class="top">
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
                            <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">收房量&nbsp;<span style="font-size: 4px">(套)</span></p>
                            </div>
                            <div style="color:#ffffff;height: 60%;width: 100%;font-size: 45px;padding-left:30px;text-align:center">
                            {{num}}
                            </div>
                        </section>
                        <section></section>
                        <section>
                            <div id="statistics"></div>
                        </section>
                    </section>
                    <section class="renting">
                        <section>
                            <div style="height: 40%;width: 100%;position:relative">
                            <p style="color:#33C8FF;line-height:1rem;position:absolute;bottom:0px;left:28px">租房量&nbsp;<span style="font-size: 4px">(套)</span></p>
                            </div>
                            <div style="height: 60%;color:#ffffff;width: 100%;font-size: 45px;padding-left:30px;text-align:center">
                            {{num13}}
                            </div>
                        </section>
                        <section></section>
                        <section>
                            <div id="statistics1"></div>
                        </section>
                    </section>
                    <section class="rentingPrice1">
                        <div>
                            <p>低质量房源<span>(套)</span></p>
                            <p>{{lowHome}}</p>
                        </div>
                    </section>
                    <section class="rentingPrice2">
                        <div>
                            <p>平均差价<span>(元)</span></p>
                            <p>{{pace}}</p>
                        </div>
                    </section>
                </div>
                <div class="statistics">
                    <section class="rent">
                        <div style="width:96%;margin:0 auto;display:flex">
                            <section>
                                <!-- <el-progress type="circle" :percentage="25"></el-progress> -->
                                <div style="width:100%;height:30%">
                                    <section id="chooseYear">
                                        <div v-for="(item, index) in years" :key="index" id="cunstomList1">
                                            <span :style="{'background-color':item.color}"></span>
                                            <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                        </div>
                                    </section>
                                </div>
                                <div style="width:100%;height:70%;position:relative;top:-20px" id="quitRate"></div>
                            </section>
                            <section id="rentRate">
                                <!-- <div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div>
                                    <div></div>
                                    <div></div>
                                </div> -->
                            </section>
                        </div>
                    </section>
                    <section class="rent">
                        <section id="entryRate"></section>
                    </section>
                    <section class="total1">
                        <div>
                            <p>平均收房价(<span>(元)</span></p>
                            <p>{{Prev}}</p>
                        </div>
                    </section>
                    <section class="total2">
                        <div>
                            <p>平均租房价<span>(元)</span></p>
                            <p>{{Prent}}</p>
                        </div>
                    </section>
                </div>
                <div class="statistics">
                    <section class="empty">
                        <p>空置房源&nbsp;&nbsp;<span>(套)</span></p>
                        <p style="color:#ffffff;font-size:35px">{{lowHouse}}</p>
                        <div id="lowHouse"></div>
                    </section>
                    <section class="empty">
                        <p>实际业绩&nbsp;&nbsp;<span>(元)</span></p>
                        <p style="color:#ffffff;font-size:35px">{{totalSales}}</p>
                        <div id="totalSale"></div>
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
      dateTime: '',
      Prev: '',
      Prent: '',
      lowHome: 0,
      pace: '',
      lowHouse: 0,
      totalSales: 0,
      lowHouseArr: [],
      totalSalesArr: [],
      weekDates: [],
      rentRates: [],
      houseChangeRates: [],
      rentArr: [],
      rentArr: [],
      cityRec: [],
      cityRent: [],
      weekDate: [],
      startTime: '',
      endTime: '',
      detailData: [],
      rentDetailData: [],
      warningArr: [],
      todayHome: '',
      chooseCity: '南京',
      allUrl: globalConfig.president_sever,
      todayRentHome: '',
      value6: '',
      years: [
        {name: '1-7天', color: 'green'},
        {name: '8-14天', color: 'yellow'},
        {name: '14-21天', color: 'orange'},
        {name: '21天以上', color: 'red'}
      ],
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
      citys: ['南京','嘉兴', '西安', '苏州', '重庆',  '成都', '合肥', '无锡'],
      cityData: [{city: '南京', sale: 112, num: 'NO.1'}, {city: '西安', sale: 112, num: 'NO.2'}, {city: '杭州', sale: 112, num: 'NO.3'}]
    };
  },
  mounted() {
    let d = new Date()
    let date1 = new Date().getTime() - 7 * 24 * 3600 * 1000
    let date3 = new Date().getTime() - 1 * 24 * 3600 * 1000
    let date4 = new Date().getTime() - 2 * 24 * 3600 * 1000
    let date5 = new Date().getTime() - 3 * 24 * 3600 * 1000
    let date6 = new Date().getTime() - 4 * 24 * 3600 * 1000
    let date7 = new Date().getTime() - 5 * 24 * 3600 * 1000
    let date8 = new Date().getTime() - 6 * 24 * 3600 * 1000
    // 转标准时间
    let date2 = new Date(date1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
    let day1 = new Date(d + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
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
    this.weekDates = [this.dateTime7,this.dateTime6, this.dateTime5, this.dateTime4, this.dateTime3, this.dateTime2, day1.substr(0,10)]
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
    console.log(dateTime)
    this.dateTime = dateTime
    this.getLangDate()
    this.drawLine();
    
  },
  activated() {
      this.getTotalSale('南京市')
      this.getWarning('南京市')
      this.getDetail('南京市')
    //   this.getRentDetail()
  },
  watch: {},
  computed: {},
  methods: {
    //返回
    back() {
        this.$router.push({
            path: '/president'
        })
    },
    change(i, index) {
        console.log(i, index)
        this.chooseCity = i
        if (index !== 0) {
            let temp = this.citys[0];
            this.citys[0] = i;
            this.citys[index] = temp;
        }
        this.$forceUpdate()
        this.getDetail(this.chooseCity + '市')
        this.getWarning(this.chooseCity + '市')
    },
    // 路由跳转
    toPath(item) {
      console.log(item)
      this.$router.push({ 
        path: item.url
      })
    },
    // 收房量
    getDetail(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
      this.$http.post(this.allUrl + "recv_rent_detail_for_ceo", params).then(res => {
        this.todayHome = res.data[this.dateTime]
        console.log(this.dateTime)
        this.Prev = Math.round(res.data[this.dateTime][city].recv_price)
        this.Prent = Math.round(res.data[this.dateTime][city].rent_price)
        this.pace = Math.round(this.Prev - this.Prent)
        console.log(Object.keys(res.data))
        this.detailData = []
        this.rentDetailData = []
        console.log(this.detailData)
        Object.keys(res.data).map(key => {
          this.detailData.push(res.data[key][city].recv)
          this.rentDetailData.push(res.data[key][city].rent)
          let a = 0
          let b = 0
          this.num = 0
          this.num13 = 0
          for (let i of this.detailData) {
              a += i
          }
          for (let i of this.rentDetailData) {
              b += i
          }
          console.log(a,b)
          this.num = Math.round(a)
          this.num13 = Math.round(b)
        });
      }).then(()=> {
         this.drawLine()
      })
    },
    getTotalSale(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        this.$http.post(this.allUrl + "achievement_details_for_ceo", params).then(res => {
            this.totalSales = 0
            this.totalSalesArr = [res.data[this.weekDates[0]][city],res.data[this.weekDates[1]][city],res.data[this.weekDates[2]][city],res.data[this.weekDates[3]][city],res.data[this.weekDates[4]][city],res.data[this.weekDates[5]][city],res.data[this.weekDates[6]][city]]
            for (let i of this.totalSalesArr) {
                this.totalSales += i
            }
        }).then(() => {
            this.drawLine()
        })
    },
    // 告警
    getWarning(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        console.log(city)
        console.log(this.weekDates)
        this.$http.post(this.allUrl + "warning_detail", params).then(res => {
        // for (let i of res.data.warning_status_ratio[city]) {
        //     this.warningArr.push({value: i})
        // }
        this.lowHouseArr = [res.data.vacancy_house_nums[this.weekDates[0]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[1]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[2]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[3]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[4]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[5]][city].vacancy_nums,res.data.vacancy_house_nums[this.weekDates[6]][city].vacancy_nums]
        console.log(this.lowHouseArr)
        this.lowHouse = 0
        this.lowHouseArr.forEach(item => {
            this.lowHouse += item
        })
        let obj = {
            正常: '1-7天',
            红色预警: '8-14天',
            橙色预警: '14-21天',
            黄色预警: '21天以上',
        }
        this.warningArr = []
        this.rentArr = []
        let rent1 = 0
        let rent2 = 0
        let rent3 = 0
        let rent4 = 0
        let rent5 = 0
        let rent6 = 0
        let rent7 = 0
        let transt1 = 0
        let transt2 = 0
        let transt3 = 0
        let transt4 = 0
        let transt5 = 0
        let transt6 = 0
        let transt7 = 0
        if (res.data.vacancy_house_nums[this.weekDates[0]][city].total === 0) {
            rent1 = 0
        } else {
            rent1 = (res.data.vacancy_house_nums[this.weekDates[0]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[0]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[1]][city].total === 0) {
            rent2 = 0
        } else {
            rent2 = (res.data.vacancy_house_nums[this.weekDates[1]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[1]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[2]][city].total === 0) {
            rent3 = 0
        } else {
            rent3 = (res.data.vacancy_house_nums[this.weekDates[2]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[2]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[3]][city].total === 0) {
            rent4 = 0
        } else {
            rent4 = (res.data.vacancy_house_nums[this.weekDates[3]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[3]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[4]][city].total === 0) {
            rent5 = 0
        } else {
            rent5 = (res.data.vacancy_house_nums[this.weekDates[4]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[4]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[5]][city].total === 0) {
            rent6 = 0
        } else {
            rent6 = (res.data.vacancy_house_nums[this.weekDates[5]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[5]][city].total)* 10000/ 100
        }
        if (res.data.vacancy_house_nums[this.weekDates[6]][city].total === 0) {
            rent7 = 0
        } else {
            rent7 = (res.data.vacancy_house_nums[this.weekDates[6]][city].have_rent / res.data.vacancy_house_nums[this.weekDates[6]][city].total)* 10000/ 100
        }
        // 房屋 周转率
        if (res.data.vacancy_house_nums[this.weekDates[6]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[6]][city].vacancy_nums === 0 ) {
            transt7 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[6]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[6]][city].vacancy_nums !== 0 ) {
            transt7 = 200
        } else {
            transt7 =res.data.vacancy_house_nums[this.weekDates[6]][city].total / res.data.vacancy_house_nums[this.weekDates[6]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[5]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[5]][city].vacancy_nums === 0 ) {
            transt6 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[5]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[5]][city].vacancy_nums !== 0 ) {
            transt6 = 200
        } else {
            transt6 =res.data.vacancy_house_nums[this.weekDates[5]][city].total / res.data.vacancy_house_nums[this.weekDates[5]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[4]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[4]][city].vacancy_nums === 0 ) {
            transt5 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[4]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[4]][city].vacancy_nums !== 0 ) {
            transt5 = 200
        } else {
            transt5 =res.data.vacancy_house_nums[this.weekDates[4]][city].total / res.data.vacancy_house_nums[this.weekDates[4]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[3]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[3]][city].vacancy_nums === 0 ) {
            transt4 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[3]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[3]][city].vacancy_nums !== 0 ) {
            transt4 = 200
        } else {
            transt4 =res.data.vacancy_house_nums[this.weekDates[3]][city].total / res.data.vacancy_house_nums[this.weekDates[3]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[2]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[2]][city].vacancy_nums === 0 ) {
            transt3 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[2]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[2]][city].vacancy_nums !== 0 ) {
            transt3 = 200
        } else {
            transt3 =res.data.vacancy_house_nums[this.weekDates[2]][city].total / res.data.vacancy_house_nums[this.weekDates[2]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[1]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[1]][city].vacancy_nums === 0 ) {
            transt2 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[1]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[1]][city].vacancy_nums !== 0 ) {
            transt2 = 200
        } else {
            transt2 =res.data.vacancy_house_nums[this.weekDates[1]][city].total / res.data.vacancy_house_nums[this.weekDates[1]][city].have_rent
        }
        if (res.data.vacancy_house_nums[this.weekDates[0]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[0]][city].vacancy_nums === 0 ) {
            transt1 = 0
        } else if(res.data.vacancy_house_nums[this.weekDates[0]][city].have_rent === 0 && res.data.vacancy_house_nums[this.weekDates[0]][city].vacancy_nums !== 0 ) {
            transt1 = 200
        } else {
            transt1 =res.data.vacancy_house_nums[this.weekDates[0]][city].total / res.data.vacancy_house_nums[this.weekDates[0]][city].have_rent
        }
        this.rentRates = [rent1.toFixed(2),rent2.toFixed(2),rent3.toFixed(2),rent4.toFixed(2),rent5.toFixed(2),rent6.toFixed(2),rent7.toFixed(2)]
        this.houseChangeRates = [transt1,transt2,transt3,transt4,transt5,transt6,transt7]
        let arr = ['已出租','未出租','预定']
        for (let i of arr) {
            this.rentArr.push({value: res.data.rent_status_ratio[city][i], name: i})
        }
        Object.keys(res.data.warning_status_ratio[city]).map(key => {
            if (key === '正常') {
                this.warningArr.unshift({value:res.data.warning_status_ratio[city][key],name: obj[key]})
            } else if (key === '红色预警') {
                this.warningArr.push({value:res.data.warning_status_ratio[city][key],name: obj[key]})
            } else if (key === '橙色预警') {
                this.warningArr.push({value:res.data.warning_status_ratio[city][key],name: obj[key]})
            } else if (key === '黄色预警') {
                this.warningArr.push({value:res.data.warning_status_ratio[city][key],name: obj[key]})
            }
        })
        // this.warningArr[name] = '预警占比'
        console.log(this.warningArr)
        Object.keys(res.data).map(key => {
          this.rentDetailData.push(res.data[key]);
        });
      }).then(()=> {
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
        let day0 = new Date(yes0 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day1 = new Date(yes1 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day2 = new Date(yes2 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day3 = new Date(yes3 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day4 = new Date(yes4 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day5 = new Date(yes5 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day6 = new Date(yes6 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        let day7 = new Date(yes7 + 8 * 3600 * 1000).toJSON().substr(0, 10).replace('T', ' ').substr(0,10)
        this.weekDates = [day6, day5, day4, day3, day2, day1, day0]
        console.log(this.weekDates)
        let days = parseInt((time2 - time1) / (1000 * 60 * 60 * 24))
        if (days !== 7) {
            this.$message({
                type: 'warning',
                message: '请选择7天的时间范围'
            })
        } else {
            this.startTime = day7
            this.endTime = day0
            this.dateTime = day0
            console.log(this.startTime, this.dateTime)
            this.getDetail(this.chooseCity + '市')
            this.getWarning(this.chooseCity + '市')
            this.getTotalSale(this.chooseCity + '市')
        }
    },
    drawLine(){
        let d = new Date()
        let day= new Date().getDay()
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
        let myChart = this.$echarts.init(document.getElementById('statistics'))
        let myChart1 = this.$echarts.init(document.getElementById('statistics1'))
        let myChart2 = this.$echarts.init(document.getElementById('entryRate'))
        let myChart3 = this.$echarts.init(document.getElementById('quitRate'))
        let myChart4 = this.$echarts.init(document.getElementById('rentRate'))
        let myChart5 = this.$echarts.init(document.getElementById('lowHouse'))
        let myChart6 = this.$echarts.init(document.getElementById('totalSale'))
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
            calculable: true,
            grid: {
                top: 10,
                bottom: 10
            },
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
        myChart2.setOption( {
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                top: 0,
                bottom: 0
            },
            legend: {
                data:['出租率','房屋周转率']
            },
            color: ['red', 'green'],
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : this.weekDate
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
                    // data:[120, 132, 101, 134, 90, 230, 210]
                    data:this.rentRates
                },
                {
                    name:'房屋周转率',
                    type:'line',
                    stack: '总量',
                    // data:[220, 182, 191, 234, 290, 330, 310]
                    data:this.houseChangeRates
                }
            ]
        });
      myChart3.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:['green', 'yellow','orange','red'],
            series : [
                {
                    name: '预警占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    // data:[
                    //     {value:0.0196078431372549, name:'直接访问'},
                    //     {value:0.9803921568627451, name:'邮件营销'},
                    //     {value:0, name:'联盟广告'},
                    //     {value:0, name:'搜索引擎'}
                    // ],
                    data: this.warningArr,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
      myChart4.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // color:['green', 'yellow','orange','red'],
            series : [
                {
                    name: '出租占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    // data:[
                    //     {value:0.0196078431372549, name:'直接访问'},
                    //     {value:0.9803921568627451, name:'邮件营销'},
                    //     {value:0, name:'联盟广告'},
                    //     {value:0, name:'搜索引擎'}
                    // ],
                    data: this.rentArr,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
      myChart5.setOption({
          tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                // type: 'category',
                boundaryGap: false,
                data: this.weekDate
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                symbolSize: 20,
                data: this.lowHouseArr,
                // data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'scatter',
                areaStyle: {}
            }]
        })
      myChart6.setOption({
          tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                // type: 'category',
                boundaryGap: false,
                data: this.weekDate
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                symbolSize: 20,
                data: this.totalSalesArr,
                // data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'scatter',
                areaStyle: {}
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
    margin: 36px 0px 0px 0px;
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
#chooseYear {
    width: 100%;
    height: 100%;
    font-size: 10px;
    >div {
        display: inline-block;
        width: 50%;
        height: 50%;
    }
}
#cunstomList1>span:nth-of-type(1) {
    display: inline-block;
    width: 15px;
    height: 15px;
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
    background-size: 100% 100%;
}
.empty {
    background: url('../../assets/image/border/k_7.png') no-repeat ;
    background-size: 100% 100%
}
.renting>section:nth-of-type(1){
    width: 45%;
    height: 100%;
}
// #rentRate {
//     >div{
//         width: 100%;
//         height: 50%;
//         display: flex;
//         >div {
//             width: 50%;
//             height: 100%;
//         }
//         // display: inline-block;
//     }
// }
#statistics,#statistics1,#statistics3,#statistics4 {
  height: 100%;
  width: 100%
}
.renting>section:nth-of-type(2){
    width: 0px;
    margin-top: 16px;
    border: 1px #00fdff solid;
    height: 68%;
}
.renting>section:nth-of-type(3){
    width: 55%;
    height: 100%;
}
.rent>div>section{
    width: 50%;
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
    p {
        padding: 10px 0 0 24px;
    }
    span {
        font-size: 7px;
    }
    >div {
        width: 100%;
        height: 90%;
    }
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
    div {
        width: 90%;
        height: 90%;
        margin: 10px auto;
        span {
            font-size: 7px;
        }
        p {
            color: #ffffff;
        }
        p:nth-child(2) {
            font-size: 35px;
        }
    }
}
.rentingPrice2 {
    background: linear-gradient(to right,#FF9E1D,#FFDE80);
    div {
        width: 90%;
        height: 90%;
        margin: 10px auto;
        span {
            font-size: 7px;
        }
        p {
            color: #ffffff;
        }
        p:nth-child(2) {
            font-size: 35px;
        }
    }
}
.total1 {
    background: linear-gradient(to right,#8FBD5B,#119A8B);
    div {
        width: 85%;
        height: 90%;
        margin: 40px auto;
        span {
            font-size: 7px;
        }
        p {
            color: #ffffff;
        }
        p:nth-child(2) {
            font-size: 35px;
        }
    }
}
#lowHouse {
    bottom: 26px;
}
#totalSale {
    bottom: 26px;
}
.total2 {
    background: linear-gradient(to right,#76FFF6,#298AC1);
    div {
        width: 85%;
        height: 90%;
        margin: 40px auto;
        span {
            font-size: 7px;
        }
        p {
            color: #ffffff;
        }
        p:nth-child(2) {
            font-size: 35px;
        }
    }
}
.total {
  height: 100%;
  width: 14%;
  border-radius: 3px;
  display: inline-block;
  margin-left: 12px;
}
.area {
    position: absolute;
    top: 60px;
    width: 100%;
    height: 95%;
    ul {
        width: 100%;
        height: 100%;
        position: relative;
        // section {
        //     width: 100%;
        //     height: 100%;
        // }
        section:nth-child(1) {
            position: absolute;
            top: 30px;
            left: 160px;
            width: 140px;
            height: 140px;
            li{
                width: 140px;
                height: 140px;
            }
            div {
                // transition: all 1s linear;
                span {
                    position: absolute;
                    top:55px;
                    left: 57px;
                }
            }
            // div:hover {
            //     transform: scale(1.1)
            // }
        }
        section:nth-child(2) {
            position: absolute;
            top: 150px;
            left: 30px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 150px;
                left: 30px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(3) {
            position: absolute;
            top: 130px;
            left: 330px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 130px;
                left: 330px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(4) {
            position: absolute;
            top: 230px;
            left: 186px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 230px;
                left: 186px;
                width: 100px;
                height: 100px;
                // transition: all 1s linear;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(5) {
            position: absolute;
            top: 300px;
            left: 65px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 300px;
                left: 65px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(6) {
            position: absolute;
            top: 320px;
            left: 280px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 320px;
                left: 280px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(7) {
            position: absolute;
            top: 430px;
            left: 156px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 430px;
                left: 186px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
        section:nth-child(8) {
            position: absolute;
            top: 430px;
            left: 300px;
            width: 140px;
            height: 140px;
            li{
                width: 100px;
                height: 100px;
            }
            div {
                top: 430px;
                left: 186px;
                width: 100px;
                height: 100px;
                span {
                    position: absolute;
                    top:37px;
                    left: 35px;
                }
            }
        }
    }
    
    li {
        position: absolute;
        img {
            transform-style: preserve-3d;
        }
    }
    li:nth-child(1) {
        img {
            animation: z 5s linear 0s infinite;
        }
    }
    li:nth-child(2) {
        img {
            animation: y 5s linear 0s infinite;
        }
    }
    // div {
    //     position: absolute;
    //     top: 30px;
    //     left: 160px;
    //     width: 140px;
    //     height: 140px;
    //     transition: all 1s linear;
    // }
}
@-webkit-keyframes z {
	from { -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -ms-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); }
	to { -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg) scaleX(1) scaleY(1) scaleZ(1); -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg) scaleX(1) scaleY(1) scaleZ(1); -ms-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg) scaleX(1) scaleY(1) scaleZ(1); transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg) scaleX(1) scaleY(1) scaleZ(1); }
}
@-webkit-keyframes y {
	from { -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -ms-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); }
	to { -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(-360deg) scaleX(1) scaleY(1) scaleZ(1); -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(-360deg) scaleX(1) scaleY(1) scaleZ(1); -ms-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(-360deg) scaleX(1) scaleY(1) scaleZ(1); transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(-360deg) scaleX(1) scaleY(1) scaleZ(1); }
}
</style>
