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
                    end-placeholder="结束日期"
                    @change="chooseTime">
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
                        <p>入职/离职趋势</p>
                        <section id="allEntry">
                            <div>
                                <p><span>在职</span><span style="font-size: 4px">(人)</span></p>
                                <p style="font-size:30px;color:#ffffff">{{activePerson}}</p>
                            </div>
                            <div style="width:60%;height:100%;" id="showEntry">
                                <el-progress type="circle" :percentage=this.entryRate :stroke-width="12"></el-progress>
                                <span>入职占比</span>
                            </div>
                            <div style="width:60%;height:100%;" id="showLeave">
                                <el-progress type="circle" :percentage=this.quitRate :stroke-width="12"></el-progress>
                                <span>离职占比</span>
                            </div>
                        </section>
                        <section id="line1">..................................................................................................................</section>
                        <section id="entryRate"></section>
                        <section id="leaveRate"></section>
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
                <div id="chooseArea">
                    <div  v-for="(item, index) in citys" :key="index" :class="selected + index" @click="choose(item, index)">
                        <span>{{item.name}}</span> 
                    </div>
                </div>
                <div id="entry">
                    <section  class="pie">
                        <div>
                            <span style="width:70px;">7天留存率</span>
                            <div style="width:100%;height:100%;" id="showEntry1">
                                <el-progress type="circle" :percentage=this.rateAct :stroke-width="12"></el-progress>
                                <span>文职</span>
                            </div>
                        </div>
                        <section></section>
                        <div style="display: flex;justify-content:center;align-items:Center;">
                             <div style="width:60%;height:100%;" id="showLeave1">
                                <el-progress type="circle" :percentage=this.markRateAct :stroke-width="12"></el-progress>
                                <span>市场</span>
                            </div>
                        </div>
                    </section>
                    <section class="total">
                        <section  class="pie1">
                            <div id="cunstomPie">
                            </div>
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
                        <section id="line1">.....................................................................................................</section>
                        <section  class="pieWeek">
                                <div>
                                    <section>
                                        <p>年龄结构<span>(人)</span></p>
                                        <div>
                                            <div>
                                                <p>20岁以下</p>
                                                <p >{{twenty}}</p>
                                            </div>
                                            <div>
                                                <p>20-30岁</p>
                                                <p>{{thirty}}</p>
                                            </div>
                                            <div>
                                                <p>30-40岁</p>
                                                <p>{{forty}}</p>
                                            </div>
                                            <div>
                                                <p>40岁以上</p>
                                                <p>{{fortyMore}}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <section id="line2">.....................................................................................................</section>
                                <div>
                                    <div>
                                        <div>
                                            <section id="chooseYear">
                                                <div v-for="(item, index) in years" :key="index" id="cunstomList1">
                                                    <span :style="{'background-color':item.color}"></span>
                                                    <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                                </div>
                                            </section>
                                        </div>
                                        <div id="lessYear"></div>
                                    </div>
                                    <div>
                                        <div>
                                            <section id="chooseSex">
                                                <div v-for="(item, index) in sex" :key="index" id="cunstomList1">
                                                    <span :style="{'background-color':item.color}"></span>
                                                    <span :style="{'color':item.color}">&nbsp;&nbsp;{{item.name}}</span>
                                                </div>
                                            </section>
                                        </div>
                                        <div id="sex"></div>
                                    </div>
                                </div>
                            
                        </section>
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
      fronMoney: 0,
      rent: 0,
      backMoney: 0,
      lateFee: 0,
      breachMoney: 0,
      activePer: 0,
      leavePerson: 0,
      markActivePer: 0,
      markLeavePerson: 0,
      rateAct: 0,
      markRateAct: 0,
      num: 0,
      twenty: '',
      forty: '',
      thirty: '',
      fortyMore: '',
      startTime: '',
      endTime: '',
      entryRate: 0,
      quitRate: 0,
      tabBar: [
        {name: '大专', color: '#F64C7E'},
        {name: '本科', color: '#FFCC4D'},
        {name: '中专', color: '#9ECD68'},
        {name: '高中', color: '#56CDFD'}
      ],
      years: [
        {name: '1年以下', color: 'green'},
        {name: '1-2年', color: 'yellow'},
        {name: '2-3年', color: 'orange'},
        {name: '3年以上', color: 'red'}
      ],
      sex: [
        {name: '男', color: '#6235FF'},
        {name: '女', color: '#0091FF'}
      ],
      tabBarTwo: [
        {name: '硕士', color: '#477DDB'},
        {name: '博士', color: '#0757B6'},
        {name: '高中以下', color: '#6545AA'},
      ],
      ageArr: [],
      pieArr: [],
      lessYearArr: [],
      weekDate: [],
      weekDates: [],
      monArr: [],
      turArr: [],
      triArr: [],
      thoArr: [],
      friArr: [],
      satArr: [],
      suntArr: [],
      monQuitArr: [],
      turQuitArr: [],
      triQuitArr: [],
      thoQuitArr: [],
      friQuitArr: [],
      satQuitArr: [],
      suntQuitArr: [],
      weekDateData: [],
      weekQuitDateData: [],
      value6: '',
      emptyHome: '',
      dateTime: '',
      dateTime1: '',
      entryPerson: '',
      chooseCity: '乐伽',
      chooseCitys: '',
      weekEntryPerson: '',
      monthEntryPerson: '',
      activePerson: '',
      weekQuitPerson: '',
      quitPerson: '',
      monthQuitPerson: '',
      weekEntryPersonArr: [],
      weekQuitPersonArr: [],
      allUrl: globalConfig.president_sever,
      selected: 'city',
      citys: [{name: '乐伽'}, {name: '西安'}, {name: '杭州'},{name: '重庆'}, {name: '合肥'}, {name: '嘉兴'}, {name: '成都'}, {name: '无锡'}, {name: '乐伽大学'}, {name: '总裁办'}, {name: '运维'}, {name: '新媒体'}, {name: '财务'}, {name: '人资'}, {name: '研发'}, {name: '行政'}],
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
      day: "",
      cityData: [{city: '南京', sale: 112, num: 'NO.1'}, {city: '西安', sale: 112, num: 'NO.2'}, {city: '杭州', sale: 112, num: 'NO.3'}]
    };
  },
  mounted() {
    let d = new Date()
    // 一个月前时间
    let date1 = new Date().getTime() - 30 * 24 * 3600 * 1000
    let yes1 = new Date().getTime() - 1 * 24 * 3600 * 1000
    let yes2 = new Date().getTime() - 2 * 24 * 3600 * 1000
    let yes3 = new Date().getTime() - 3 * 24 * 3600 * 1000
    let yes4 = new Date().getTime() - 4 * 24 * 3600 * 1000
    let yes5 = new Date().getTime() - 5 * 24 * 3600 * 1000
    let yes6 = new Date().getTime() - 6 * 24 * 3600 * 1000
    // 转标准时间
    let date2 = new Date(date1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day0 = new Date(d + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day1 = new Date(yes1 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day2 = new Date(yes2 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day3 = new Date(yes3 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day4 = new Date(yes4 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day5 = new Date(yes5 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    let day6 = new Date(yes6 + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ').substr(0,10)
    this.weekDates = [day6, day5, day4, day3, day2, day1, day0]
    console.log(this.weekDates)
    this.dateTime1 = date2.substr(0,10)
    // this.startTime = day6
    let day= new Date().getDay()
    this.day = day
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
    this.getLangDate()
    this.drawLine();
  },
  activated() {
    //   this.getEntryData();
    //   this.getTodayEntryData();
    //   this.getMonthEntryData();
      this.getActive(this.chooseCity)
      this.getStaff(this.chooseCity)
  },
  watch: {},
  computed: {},
  methods: {
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
        console.log(this.weekDates)
        let days = parseInt((time2 - time1) / (1000 * 60 * 60 * 24))
        if (days !== 7) {
            this.$message({
                type: 'warning',
                message: '请选择7天的时间范围'
            })
        }
        this.startTime = day6
        this.endTime = day0
        console.log(this.startTime, this.dateTime)
        // this.getEntryData()
        this.getActive(this.chooseCity)
        this.getStaff(this.chooseCity)
    },
    choose(item, index) {
        console.log(item, index)
        this.chooseCity = item.name;
        // if (item.name === '乐伽') {
        //     this.chooseCitys = ''
        // } else {
        //     this.chooseCitys = this.chooseCity + '市'
        // }
        switch (item.name) {
            case '南京':
             this.chooseCity = '南京市';
             break;
            case '西安':
             this.chooseCity = '西安市';
             break;
            case '无锡':
             this.chooseCity = '无锡市';
             break;
            case '杭州':
             this.chooseCity = '杭州市';
             break;
            case '嘉兴':
             this.chooseCity = '嘉兴市';
             break;
            case '重庆':
             this.chooseCity = '重庆市';
             break;
            case '成都':
             this.chooseCity = '成都市';
             break;
            case '合肥':
             this.chooseCity = '合肥市';
             break;
            case '人资':
             this.chooseCity = '人力资源中心';
             break;
            case '财务':
             this.chooseCity = '财务中心';
             break;
            case '运维':
             this.chooseCity = '运维中心';
             break;
            case '研发':
             this.chooseCity = '研发中心';
             break;
            case '行政':
             this.chooseCity = '行政中心';
             break;
            case '新媒体':
             this.chooseCity = '新媒体运营中心';
             break;
        }
        if (index !== 0) {
            let temp = this.citys[0];
            this.citys[0] = item;
            this.citys[index] = temp;
        }
        this.$forceUpdate()
        // this.getEntryData();
        // this.getTodayEntryData();
        // this.getMonthEntryData();
        this.getActive(this.chooseCity)
        this.getStaff(this.chooseCity)
    },
      // 一周入职
    // getEntryData() {
    //     let params = {
    //         start: this.startTime,
    //         end: this.endTime,
    //         department: this.chooseCitys
    //     }
    //   this.$http.post(this.allUrl + "dimission_rate", params).then(res => {
    //     this.weekEntryPerson = res.data.entry_staff_num
    //     this.weekQuitPerson = res.data.quit_staff_detail.length
    //     this.weekEntryPersonArr = res.data.entry_staff_detail
    //     let arr = []
    //     this.monArr = []
    //     this.turArr = []
    //     this.triArr = []
    //     this.thoArr = []
    //     this.friArr = []
    //     this.satArr = []
    //     this.suntArr = []
    //     this.monQuitArr = []
    //     this.turQuitArr = []
    //     this.triQuitArr = []
    //     this.thoQuitArr = []
    //     this.friQuitArr = []
    //     this.satQuitArr = []
    //     this.suntQuitArr = []
    //     if (this.weekEntryPersonArr.length !== 0) {
    //         this.weekEntryPersonArr.forEach(item => {
    //             if (item.entry_date === this.weekDates[0]) {
    //                 this.monArr.push(item)
    //             } else if (item.entry_date === this.weekDates[1]) {
    //                 this.turArr.push(item)
    //             } else if (item.entry_date === this.weekDates[2]) {
    //                 this.triArr.push(item)
    //             } else if (item.entry_date === this.weekDates[3]) {
    //                 this.thoArr.push(item)
    //             } else if (item.entry_date === this.weekDates[4]) {
    //                 this.friArr.push(item)
    //             } else if (item.entry_date === this.weekDates[5]) {
    //                 this.satArr.push(item)
    //             } else if (item.entry_date === this.weekDates[6]) {
    //                 this.suntArr.push(item)
    //             }
    //         })
    //     }
    //     let arr1 = [this.monArr.length, this.turArr.length, this.triArr.length, this.thoArr.length, this.friArr.length, this.satArr.length,this.suntArr.length]
    //     this.weekDateData = arr1
    //     this.weekQuitPersonArr = res.data.quit_staff_detail
    //     console.log(this.weekQuitPersonArr)
    //     console.log(this.weekDates)
    //     if (this.weekQuitPersonArr.length !== 0) {
    //         this.weekQuitPersonArr.forEach(item => {
    //             if (item.quit_date.slice(0, 10) === this.weekDates[0]) {
    //                 this.monQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[1]) {
    //                 this.turQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[2]) {
    //                 this.triQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[3]) {
    //                 this.thoQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[4]) {
    //                 this.friQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[5]) {
    //                 this.satQuitArr.push(item)
    //             } else if (item.quit_date.slice(0, 10) === this.weekDates[6]) {
    //                 this.suntQuitArr.push(item)
    //             }
    //         })
    //     }
    //     let arr2 = [this.monQuitArr.length, this.turQuitArr.length, this.triQuitArr.length, this.thoQuitArr.length, this.friQuitArr.length, this.satQuitArr.length,this.suntQuitArr.length]
    //     console.log(arr2)
    //     this.weekQuitDateData = arr2
    //   }).then(() => {
    //       this.drawLine()
    //   })
    // },
    // 留存率
    getActive(city) {
        console.log(city)
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        console.log(this.weekDates)
        this.$http.post(this.allUrl + "entry_exit_staff_details", params).then(res => {
            let arr = res.data.entry_exit_detail
            console.log(arr[this.weekDates[this.weekDates.length - 1]])
            this.activePerson = arr[this.weekDates[this.weekDates.length - 1]][city].active_staff_num
            this.entryPerson = arr[this.weekDates[this.weekDates.length - 1]][city].entry_staff_num 
            this.quitPerson = arr[this.weekDates[this.weekDates.length - 1]][city].quit_staff_num
            if (this.activePerson === 0) {
                this.entryRate = 0
                this.quitRate = 0
            } else {
                this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
                this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
            }
            this.weekDateData = [arr[this.weekDates[0]][city].entry_staff_num, arr[this.weekDates[1]][city].entry_staff_num, arr[this.weekDates[2]][city].entry_staff_num, arr[this.weekDates[3]][city].entry_staff_num, arr[this.weekDates[4]][city].entry_staff_num, arr[this.weekDates[5]][city].entry_staff_num, arr[this.weekDates[6]][city].entry_staff_num]
            this.weekQuitDateData = [arr[this.weekDates[0]][city].quit_staff_num, arr[this.weekDates[1]][city].quit_staff_num, arr[this.weekDates[2]][city].quit_staff_num, arr[this.weekDates[3]][city].quit_staff_num, arr[this.weekDates[4]][city].quit_staff_num, arr[this.weekDates[5]][city].quit_staff_num, arr[this.weekDates[6]][city].quit_staff_num]
            console.log(this.weekDateData)
            if (city === '乐伽') {
                Object.keys(res.data.remain_detail).map(key => {
                    // let num  =  0
                    if (key.indexOf('市') === -1) {
                        this.activePer += res.data.remain_detail[key].exceed
                        this.leavePerson += res.data.remain_detail[key].lack
                    } else {
                        this.markActivePer += res.data.remain_detail[key].exceed
                        this.markLeavePerson += res.data.remain_detail[key].lack
                    }
                })
                let num = this.activePer - this.leavePerson
                let num1 = this.markActivePer - this.markLeavePerson
                console.log(this.activePer,this.leavePerson,num)
                if (this.activePer !== 0) {
                    this.rateAct = ((num / this.activePer).toFixed(2)* 10000)/ 100
                } else {
                    this.rateAct = 0;
                }
                if (this.markActivePer !== 0) {
                    this.markRateAct = ((num1 / this.markActivePer).toFixed(2)* 10000)/ 100
                } else {
                    this.markRateAct = 0;
                }
            } else {
                this.rateAct = 0;
                this.markActivePer = res.data.remain_detail[city].exceed
                this.markLeavePerson = res.data.remain_detail[city].lack
                let num1 = this.markActivePer - this.markLeavePerson
                if (this.markActivePer !== 0) {
                    this.markRateAct = ((num1 / this.markActivePer).toFixed(2)* 10000)/ 100
                } else {
                    this.markRateAct = 0;
                }
            }
            console.log(this.markRateAct)
        // this.activePerson = res.data.active_staff_num
        // this.entryPerson = res.data.entry_staff_num
        // this.quitPerson = res.data.quit_ratio
        // this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
        // this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
      }).then(() => {
          this.drawLine()
      })
    },
      // 当日入职 
    getTodayEntryData() {
        let params = {
            start: this.dateTime,
            end: this.dateTime,
            department: this.chooseCitys
        }
    //   this.$http.post(this.allUrl + "dimission_rate", params).then(res => {
    //     this.activePerson = res.data.active_staff_num
    //     this.entryPerson = res.data.entry_staff_num
    //     this.quitPerson = res.data.quit_ratio
    //     this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
    //     this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
    //   }).then(() => {
    //     this.drawLine()
    //   })
      this.$http.post(this.allUrl + "dimission_rate", params).then(res => {
        this.activePerson = res.data.active_staff_num
        this.entryPerson = res.data.entry_staff_num
        this.quitPerson = res.data.quit_ratio
        this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
        this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
      }).then(() => {
        this.drawLine()
      })
    },
      // 一月入职
    getMonthEntryData() {
        let params = {
            start: this.dateTime1,
            end: this.dateTime,
            department: this.chooseCitys
        }
      this.$http.post(this.allUrl + "dimission_rate", params).then(res => {
        this.monthEntryPerson = res.data.entry_staff_num
        this.monthQuitPerson = res.data.quit_staff_detail.length
        // this.entryRate = Math.round(this.entryPerson/this.activePerson* 10000)/ 100
        // this.quitRate = Math.round(this.quitPerson/this.activePerson* 10000)/ 100
      })
    },
      // 学历
    getStaff(city) {
        let params = {
            start: this.startTime,
            end: this.endTime
        }
        console.log(city)
        this.pieArr = []
        let arr = ['大专', '本科', '中专', '高中', '硕士', '博士', '高中以下']
        let arr1 = ['1年以下', '1-2年', '2-3年', '3年以上']
        let arr2 = ['男', '女']
        
      this.$http.post(this.allUrl + "staff_details", params).then(res => {
          this.twenty = res.data.age_level[city].less_than_20
          this.thirty = res.data.age_level[city].less_than_30
          this.forty = res.data.age_level[city].less_than_40
          this.fortyMore = res.data.age_level[city].greater_than_40
        arr.forEach(i => {
            console.log(i)
            let obj = {};
            obj.name = i;
            obj.value = res.data.education[city][i]
            this.pieArr.push(obj)
        })
        this.lessYearArr = []
        for (let i of arr1) {
            this.lessYearArr.push({value: res.data.work_year_level[city][i], name: i})
        }
        this.ageArr = []
        for (let i of arr2) {
            this.ageArr.push({value: res.data.gender_level[city][i], name: i})
        }
      }).then(() => {
          this.drawLine()
      })
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
    drawLine(){
        let myChart4 = this.$echarts.init(document.getElementById('sex'))
        let myChart1 = this.$echarts.init(document.getElementById('leaveRate'))
        let myChart = this.$echarts.init(document.getElementById('entryRate'))
        let myChart2 = this.$echarts.init(document.getElementById('cunstomPie'))
        let myChart3 = this.$echarts.init(document.getElementById('lessYear'))
        // 绘制图表
        myChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
         legend: {
            data:['入职','离职']
        },
        grid: {
            top: 10,
            bottom: 10
        },
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
                name:'入职人数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.weekDateData
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
                data: this.weekDate
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
                name:'离职人数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.weekQuitDateData
            }
        ]
      });
      myChart2.setOption({
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
            color:['red', 'green','yellow','blueviolet','blueviolet','blueviolet','blueviolet'],
            series : [
                {
                    name:'学历占比',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.pieArr.sort(function (a, b) { return a.value - b.value; }),
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
      myChart3.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:['green','yellow','orange','red'],
            series: [
                {
                    name:'工龄占比',
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
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.lessYearArr
                }
            ]
        });
      myChart4.setOption({
        // title : {
        //     text: '某站点用户访问来源',
        //     subtext: '纯属虚构',
        //     x:'center'
        // },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#6235FF','#0091FF'],
        series : [
            {
                name: '男女比例',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.ageArr,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
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


<style lang="">
.el-progress__text{
  color: #00fdff;
  top: 40%!important;
}
</style>
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
.el-progress /deep/ path:nth-child(2) {
    stroke: #76FFF6;
}
#showEntry {
  top:2px;
  left: 57px;
  position: relative;
  >span {
    position: absolute;
    left: 28px;
    top: 64px;
  }
}
#showEntry1 {
  top:-5px;
  left: 57px;
  position: relative;
  >span {
    position: absolute;
    left: 47px;
    top: 64px;
  }
}
#showLeave {
  top:3px;
  left: 16px;
  position: relative;
  span {
    position: absolute;
    left: 28px;
    top: 64px;
  }
}
#showLeave1 {
  top:16px;
  left: 16px;
  position: relative;
  span {
    position: absolute;
    left: 47px;
    top: 64px;
  }
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
    position: relative;
    .city0 {
        position: absolute;
        left: 280px;
        top: 25px;
        width:150px;
        height:150px;
        background-image: url("../../assets/image/president/pic_0.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 44px;
            top: 51px;
            font-size: 30px;
            color: #ffffff;
        }
    }
    .city1 {
        position: absolute;
        left: 45px;
        top: 145px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city2 {
        position: absolute;
        left: 190px;
        top: 228px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city3 {
        position: absolute;
        left: 390px;
        top: 228px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city4 {
        position: absolute;
        left: 550px;
        top: 145px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city5 {
        position: absolute;
        left: 280px;
        top: 360px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city6 {
        position: absolute;
        left: 500px;
        top: 330px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city7 {
        position: absolute;
        left: 30px;
        top: 330px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city8 {
        position: absolute;
        left: 134px;
        top: 438px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 28px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city9 {
        position: absolute;
        left: 64px;
        top: 537px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city10{
        position: absolute;
        left: 223px;
        top: 521px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city11{
        position: absolute;
        left: 400px;
        top: 450px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city12{
        position: absolute;
        left: 488px;
        top: 570px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city13{
        position: absolute;
        left: 588px;
        top: 510px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city14{
        position: absolute;
        left: 360px;
        top: 577px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
    .city15{
        position: absolute;
        left: 176px;
        top: 616px;
        width:100px;
        height:100px;
        background-image: url("../../assets/image/president/pic_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        span {
            position: absolute;
            left: 33px;
            top: 39px;
            color: #ffffff;
        }
    }
}
.pie {
    width:100%;
    height:22%;
    display: flex;
    margin-top: 20px;
    section {
        width: 0px;
        margin-top: 16px;
        border: 1px #00fdff solid;
        height: 68%;
    }
}
.pie1 {
    width:100%;
    height:32%;
    padding-top: 20px;
    display: flex;
    margin-top: 20px;
    >div {
        width: 48%;
        height: 100%;
    }
    >div:nth-child(2) {
        display: flex;
        padding: 20px 0 0 20px;
        ul {
            width: 50%;
            height: 100%;
        }
    }
}
#entry>.pie {
    background: url('../../assets/image/border/k_9.png') no-repeat;
    background-size: 100% 100%;
}
#cunstomList>span:nth-of-type(1) {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
#cunstomList1>span:nth-of-type(1) {
    display: inline-block;
    width: 15px;
    height: 15px;
}
.pie>div:nth-of-type(1) {
    position: relative;
    width: 48%;
    height: 100%;
}
.pie>div:nth-of-type(2) {
    display: flex;
    width: 48%;
    height: 100%;
    ul{
        padding: 40px 0 0 15px;
        width: 50%;
        height: 100%;
    }
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
.total {
    width: 100%;
    height: 72%;
    background: url('../../assets/image/border/k_22.png') no-repeat;
    background-size: 100% 100%;
}
.pieWeek {
    width:100%;
    height:61%;
    >div:nth-child(1) {
        width: 100%;
        height: 33%;
        >section:nth-child(1) {
            width: 89%;
            height: 98%;
            margin: 8px auto;
            >div {
                display: flex;
                width: 100%;
                height: 90%;
                margin-top: 15px;
                >div {
                    width: 25%;
                    height: 100%;
                    >p:nth-child(2) {
                        color: #ffffff;
                        font-size: 30px;
                        padding: 3px 0 0 10px;
                    }
                }
            }
        }
    }
    >div:nth-child(3) {
        margin-top: 10px;
        width: 100%;
        height: 58%;
        display: flex;
        >div {
            >div:nth-child(1) {
                height: 30%;
                width: 100%
            }
            >div:nth-child(2) {
                height: 70%;
                width: 100%
            }
            width: 50%;
            height: 100%;
        }
    }
}
#chooseYear {
    width: 80%;
    height: 100%;
    margin: 21px auto;
    >div {
        display: inline-block;
        width: 50%;
        height: 50%;
    }
}
#chooseSex {
    width: 60%;
    height: 100%;
    margin: 21px auto;
    >div {
        display: inline-block;
        width: 50%;
        height: 50%;
    }
}
#line1,#line2 {
    // margin-top: 10px;
    text-align: center;
     width: 95%;
    height: 2px;
}
#area {
    width: 100%;
    height: 72%;
    margin-top:35px;
    >div {
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
#allEntry {
    width: 100%;
    display: flex;
    height: 30%;
    >div{
        width: 32%;
        height: 98%;
    }
    >div:nth-child(1) {
        padding: 38px 0 0 30px
    }
}
#line1 {
    width: 90%;
    height: 1%;
    position: relative;
    top: -26px;
    color: #00fdff
    // border: 1px #00FFFF solid
}
#entryRate, #leaveRate {
    width: 100%;
    height: 32%;
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
