<template>
  <div id="discussPolitics" class="discuss-politics">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>奏事议政</h1>
        <div class="date-value-container">
          <el-date-picker
            v-model="dateValue"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <!--<h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>-->
      </div>
      <!--<div class="items-center listTopRight">-->
      <!--<div class="icons-font" @click="publish(chooseTab)" v-if="chooseTab === 1|| chooseTab===2"><b>发榜</b></div>-->
      <!--<div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 1"><b>兑换</b></div>-->
      <!--<div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>-->
      <!--</div>-->
    </div>

    <div class="main-container discuss-politics-container">
      <div class="calendar-container">
        <div class="container-left scroll_bar">
          <div class="calendar-week">
            <div class="ui-container">
              <div v-for="(item,index) in weekList" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="calendar-day">
            <div class="ui-container">
              <div v-for="item in daysList" class="calendar-day-item">
                <div class="calendar-day-item-container">
                  <span :class="{'gray':item.type=='prev'||item.type=='next','current':item.today}"
                        class="calendar-day-item-container-date">
                    {{item.date}}
                    <i v-if="item.tips">{{item.tips}}</i>
                  </span>
                  <div class="calendar-day-item-container-content"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="container-right">

        </div>
      </div>
    </div>


    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

  </div>
</template>

<script>
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      LjDialog,
    },
    data() {
      return {
        humanResource,
        resourceDepart,

        organModule: false,//组织架构
        //chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        dateValue: new Date(),
        weekList: ['一', '二', '三', '四', '五', '六', '日'],
        /*daysList: [
          {
            id: '1',
            today: false,
            date: '30',
            type: 'prev',
          },
          {
            id: '2',
            today: false,
            date: '1',
            type: 'cur',
          },
          {
            id: '3',
            today: false,
            date: '2',
            type: 'cur',
          },
          {
            id: '4',
            today: false,
            date: '3',
            type: 'cur',
          },
          {
            id: '5',
            today: false,
            date: '4',
            type: 'cur',
          },
          {
            id: '6',
            today: false,
            date: '5',
            type: 'cur',
          },
          {
            id: '7',
            today: false,
            date: '6',
            type: 'cur',
          }, {
            id: '8',
            today: false,
            date: '7',
            type: 'cur',
          },
          {
            id: '9',
            today: true,
            date: '8',
            type: 'cur',
          },
          {
            id: '10',
            today: false,
            date: '9',
            type: 'cur',
          },
          {
            id: '11',
            today: false,
            date: '10',
            type: 'cur',
          },
          {
            id: '12',
            today: false,
            date: '11',
            type: 'cur',
          }, {
            id: '13',
            today: false,
            date: '12',
            type: 'cur',
          }, {
            id: '14',
            today: false,
            date: '13',
            type: 'cur',
          }, {
            id: '15',
            today: false,
            date: '14',
            type: 'cur',
          }, {
            id: '16',
            today: false,
            date: '15',
            type: 'cur',
          }, {
            id: '17',
            today: false,
            date: '16',
            type: 'cur',
          }, {
            id: '18',
            today: false,
            date: '17',
            type: 'cur',
          }, {
            id: '19',
            today: false,
            date: '18',
            type: 'cur',
          }, {
            id: '20',
            today: false,
            date: '19',
            type: 'cur',
          }, {
            id: '21',
            today: false,
            date: '20',
            type: 'cur',
          }, {
            id: '22',
            today: false,
            date: '21',
            type: 'cur',
          }, {
            id: '23',
            today: false,
            date: '22',
            type: 'cur',
          }, {
            id: '24',
            today: false,
            date: '23',
            type: 'cur',
          }, {
            id: '25',
            today: false,
            date: '24',
            type: 'cur',
          }, {
            id: '26',
            today: false,
            date: '25',
            type: 'cur',
          }, {
            id: '27',
            today: false,
            date: '26',
            type: 'cur',
          }, {
            id: '28',
            today: false,
            date: '27',
            type: 'cur',
          }, {
            id: '29',
            today: false,
            date: '28',
            type: 'cur',
          }, {
            id: '30',
            today: false,
            date: '29',
            type: 'cur',
          }, {
            id: '31',
            today: false,
            date: '30',
            type: 'cur',
          }, {
            id: '32',
            today: false,
            date: '31',
            type: 'cur',
          }, {
            id: '33',
            today: false,
            date: '1',
            type: 'next',
          }, {
            id: '34',
            today: false,
            date: '2',
            type: 'next',
          }, {
            id: '35',
            today: false,
            date: '3',
            type: 'next',
          },


        ]*/
        daysList: []

      }
    },
    mounted() {
      //this.initDaysList(this.dateValue);
    },
    activated() {
    },
    watch: {
      dateValue: {
        handler() {
          this.initDaysList(this.dateValue);
        },
        immediate:true
      },
    },
    computed: {},
    methods: {
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },

      initDaysList(date) {
        let daysList = [...this.getPrevMonthRestList(date),...this.getCurrentMonthList(date),...this.getNextMonthRestList(date)];
        daysList.forEach((item,index) => {item.id = ++index;})
        this.daysList = daysList;
      },
      //获取date月当月天总数,参数二可获取其他月天总数(需传特定值)
      getDaysCount(date, setmonth = 0) {
        let curDate = new Date(date);
        /* 获取当前月份 */
        let curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1 + setmonth);
        /* 将日期设置为0 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
      },
      //获取某月第一天是周几
      getCurrMonthFirstWeek(date) {
        let curDate = new Date(date);
        curDate.setDate(1);
        return curDate.getDay()||7;
      },
      //获取某月最后一天是周几
      getCurrMonthLastWeek(date) {
        let curDate = new Date(date);
        curDate.setDate(this.getDaysCount(date));
        return curDate.getDay()||7;
      },
      //获取上月存留日历几天-->日历页面前部灰色日期
      getPrevMonthRestList(date) {
        let arr = [];
        let lastMonthRest = this.getCurrMonthFirstWeek(date) - 1;//获取上月余几天
        let lastMonthCounts = this.getDaysCount(date, -1);
        for (let i = lastMonthCounts - lastMonthRest + 1; i <= lastMonthCounts; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, -1),
            today: false,
            type: 'prev',
            tips:'3',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },

      getCurrentMonthList(date) {
        let days = this.getDaysCount(date);
        let arr = [];
        let curDay = this.getCurrentDay();
        for (let i = 1; i <= days; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, 1),
            today: curDay==i&&this.getCurrentMonth()==this.getCurrentMonth(date),
            type: 'cur',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },
      //获取当前时间下 今日几号
      getCurrentDay() {
        let date = new Date();
        let day = date.getDate();
        return day;
      },
      //获取当前时间下 几月  不传参默认当月
      getCurrentMonth(date=new Date()) {
        let curDate = new Date(date);
        let curMonth = curDate.getMonth()+1;
        return curMonth;
      },

      //获取下月存留日历几天-->日历页面前部灰色日期
      getNextMonthRestList(date) {
        let arr = [];
        let nextMonthRest = 7 - this.getCurrMonthLastWeek(date);//获取下月余几天
        let nextMonthCounts = this.getDaysCount(date, 1);
        for (let i = 1; i <= nextMonthRest; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, 1),
            today: false,
            type: 'next',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },


      //通过当日几号和月份传入获取日期格式
      getDateTimeByDay(date, dayIndex, setMonth = 0) {
        let cDate = new Date(date);
        let curMonth = cDate.getMonth();
        cDate.setMonth(curMonth + setMonth);
        cDate.setDate(dayIndex);
        return this.formatDate(cDate, 'yyyy-MM-dd');
      },

      /**
       格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
       */
      formatDate(v, format) {
        if (!v) return "";
        let d = v;
        if (typeof v === 'string') {
          if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
          else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
        let o = {
          "M+": d.getMonth() + 1,  //month
          "d+": d.getDate(),       //day
          "h+": d.getHours(),      //hour
          "m+": d.getMinutes(),    //minute
          "s+": d.getSeconds(),    //second
          "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
          "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      }

    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/humanResource/discussPolitics/index";
</style>
