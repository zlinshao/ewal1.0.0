<template>
  <div id="calendar-tpl" class="discuss-politics">
    <div class="main-container discuss-politics-container">
      <div class="calendar-container">
        <div class="container-left scroll_bar">
          <div v-if="lang=='ch'" class="calendar-week">
            <div class="ui-container">
              <div v-for="(item,index) in weekListCh" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div v-if="lang=='en'" class="calendar-week-en">
            <div class="ui-container">
              <div v-for="(item,index) in weekListEn" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="calendar-day">
            <div class="ui-container">
              <div :class="{'gray':item.type=='prev'||item.type=='next','current':item.today}" v-for="item in daysList" class="calendar-day-item" :style="{height:`${100/(daysList.length/7)}%`}">
                <slot :name="'slot'+item.id">
                  {{item.date}}
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Calendar",
    props:{
      datetime: {
        //default:new Date(),
        default: () => {
          return new Date()
        }
      },
      lang:{
        default:'ch',//ch或者en
      },
    },
    data() {
      return {
        dateValue: new Date(),
        weekList:null,
        weekListCh: ['一', '二', '三', '四', '五', '六', '日'],
        weekListEn: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        daysList: [],
        monthContent: '',
      }
    },
    watch: {
      lang: {
        handler(val,oldVal) {
          /*if(val=='en') {
            this.weekList = this.weekListEn;
          } else {
            this.weekList = this.weekListCh;
          }*/
        },
        immediate: true
      },
      datetime: {
        handler(val,oldVal) {
          if(val) {
            this.initDaysList(val);
            //this.dateValue = val;
          }
        },
        immediate: true
      },
    },
    mounted() {
      this.initDaysList(this.datetime);
      // this.initDaysList(new Date('2019-03-01'));
    },


    methods: {
      initDaysList(date) {
        if (date) {
          let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
          daysList.forEach((item, index) => {
            item.id = ++index;
          });
          this.daysList = daysList;

        } else {
          this.monthContent = '';
          this.daysList = [];
        }

      },


      /*下面为不需要业务的代码*/

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
        return curDate.getDay() || 7;
      },
      //获取某月最后一天是周几
      getCurrMonthLastWeek(date) {
        let curDate = new Date(date);
        curDate.setDate(this.getDaysCount(date));
        return curDate.getDay() || 7;
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
            type: 'prev',//用来区分 上月本月下月字体颜色 本月黑 上下月灰
            //todoList.length>0?: '3',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },

      getCurrentMonthList(date) {
        let days = this.getDaysCount(date);
        let months = this.getCurrentMonth(date);
        this.monthContent = this.monthList[months - 1];
        let arr = [];
        let curDay = this.getCurrentDay();
        for (let i = 1; i <= days; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, 0),
            today: curDay == i && this.getCurrentMonth() == this.getCurrentMonth(date),
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
      getCurrentMonth(date = new Date()) {
        let curDate = new Date(date);
        let curMonth = curDate.getMonth() + 1;
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
      },


      //某月最后一天时间
      lastTimeOfMonth(datetime) {
        let startDate = new Date(datetime);
        startDate.setDate(1); //第一天

        let endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1)
        endDate.setDate(0);

        let date = endDate;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = '23';
        let minute = '59';
        let second = '59';
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":" + second;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/common/lightweightComponents/Calendar/index";
</style>
