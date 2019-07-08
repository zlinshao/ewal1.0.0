<template>
  <div id="my_attendance">
    <div class="personal-check">
      <div class="date-choose">
        <month-choose v-model="datetime"></month-choose>
      </div>
      <div class="check-record">
        <div class="check-record-container">

          <div v-for="(item,index) in attendanceList" :key="index" class="check-record-item">
            <div class="check-record-item-top">
              <span>{{item.tip}}</span></div>
            <div class="check-record-item-bottom">
              <span>{{item.value}}</span></div>
          </div>
        </div>
      </div>
      <div class="check-calendar">
        <div class="calendar-container">
          <calendar :datetime="datetime" lang="en">
            <div :slot="'slot'+item.id" v-for="(item, index) in daysList" :key="index"
                 class="calendar-days-item" :class="{rest:item.week==0||item.week==6,current:item.today}"
            >
              <div class="days-item-content-container"
                   :class="{colorE33:item.attendance_data&&item.attendance_data!=='正常'}">
                <span class="days-item-content-date">{{item.date}}</span>
                <span style="font-size: 13px" v-if="item.attendance_data">{{item.attendance_data}}</span>

              </div>
            </div>
          </calendar>
        </div>
        <div class="calendar-useless"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import LjDialog from '@/components/common/lj-dialog.vue';
  import MonthChoose from '@/components/common/lightweightComponents/Calendar/MonthChoose/index.vue';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import _ from 'lodash';
  import mixins from '@/assets/js/mixins/calendar.js';

  export default {
    name: "index",
    mixins: [mixins],
    components: {
      MonthChoose,
      Calendar,
      LjDialog,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        datetime: new Date(),
        attendanceList: [
          {
            id: 1,
            tip: '应出勤',
            value: '0天',
          },
          {
            id: 2,
            tip: '实际出勤',
            value: '0天',
          },
          {
            id: 3,
            tip: '迟到次数',
            value: '0次',
          },
          {
            id: 4,
            tip: '早退次数',
            value: '0次',
          },
          {
            id: 5,
            tip: '未签退',
            value: '0次',
          },
          {
            id: 6,
            tip: '旷工',
            value: '2天',
          },
          {
            id: 7,
            tip: '外勤',
            value: '0天',
          },
          {
            id: 8,
            tip: '外出',
            value: '0天',
          },
          {
            id: 9,
            tip: '请假',
            value: '0天',
          }, {
            id: 10,
            tip: '加班',
            value: '0天',
          }, {
            id: 11,
            tip: '出差',
            value: '0天',
          }
        ],
        attence: {
          counts: 0,
          params: {
            page: 1,
            limit: 1000,
          },
          init() {
            this.params.page = 1;
            this.params.limit = 5;
          },
          departmentId: [106],
          tableData: [],
        },
        formData: [],
        daysList: [],
      }
    },
    mounted() {
      this.getAttenceList();
    },
    watch: {
      datetime() {
        this.getAttenceList()
      }
    },
    methods: {
      getAttenceList: function () {
        this.attence.tableData = [];
        let params = {
          date: this.myUtils.formatDate(new Date(this.datetime), 'yyyy-MM'),
        };
        let user_id = this.$storage.get('user_info').id;
        this.$http.get(`${this.url}attendance/attendance/${user_id}`, params).then(res => {
          if (res.code.toString().endsWith('0')) {
            let item = res.data;
            //所有假
            let shijia = item.attendance[0]?.vacate_data[0] || 0;
            let bingjia = item.attendance[0]?.vacate_data[1] || 0;
            let nianjia = item.attendance[0]?.vacate_data[2] || 0;
            let tiaoxiu = item.attendance[0]?.vacate_data[3] || 0;
            let hunjia = item.attendance[0]?.vacate_data[4] || 0;
            let chanjia = item.attendance[0]?.vacate_data[5] || 0;
            let peichanjia = item.attendance[0]?.vacate_data[6] || 0;
            let sangjia = item.attendance[0]?.vacate_data[7] || 0;
            let vacate_count = shijia + bingjia + nianjia + tiaoxiu + hunjia + chanjia + peichanjia + sangjia; //假的总和
            let attendanceDay = item.attendance[0]?.attendance_day || 0;
            let jiaban = item.attendance[0]?.overtime_day || 0;
            this.attendanceList[0].value = `${attendanceDay - jiaban + vacate_count}天`; //应出勤
            this.attendanceList[1].value = `${attendanceDay}天`;//实际出勤
            this.attendanceList[2].value = `${item.attendance[0]?.late_day || 0}次`; //迟到
            // this.attendanceList[3].value = `${}次` //早退
            this.attendanceList[4].value = `${item.attendance[0]?.not_signed_count[1] || 0}次`; //未签退
            this.attendanceList[5].value = `${item.attendance[0]?.absenteeism_day || 0}天`;//旷工
            // this.attendanceList[6].value = `${}天` //外勤
            this.attendanceList[7].value = `${item.attendance[0]?.out_time || 0}小时`; //外出
            this.attendanceList[8].value = `${vacate_count}天`; //请假
            this.attendanceList[9].value = `${item.attendance[0]?.overtime_day || 0}天`; //加班
            this.attendanceList[10].value = `${item.attendance[0]?.business_day || 0}天`; //出差
            let obj = {
              attendance: item.attendance,
            };
            this.attence.tableData.push(obj);
            this.formData = this.attence.tableData[0].attendance[0]?.attendance_data;
          }
        }).then(() => {
          if (new Date(this.datetime)) {
            let daysList = [...this.getPrevMonthRestList(new Date(this.datetime)), ...this.getCurrentMonthList(new Date(this.datetime)), ...this.getNextMonthRestList(new Date(this.datetime))];
            daysList.forEach((item, index) => {
              item.id = ++index;
            });
            //处理数据
            let curMonthDaysList = _.filter(daysList, (o) => {
              return o.type == 'cur';
            });
            if (this.formData && this.formData.length > 0) {
              _.forEach(this.formData, (o, index) => {
                curMonthDaysList[index].attendance_data = o;
              });
            }
            let preNextMonthDaysList = _.remove(daysList, (o) => {
              return o.type !== 'cur';
            });
            let newDaysList = _.concat(preNextMonthDaysList, curMonthDaysList);
            newDaysList = _.sortBy(newDaysList, ['id']);
            this.daysList = newDaysList;
          } else {
            this.daysList = [];
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myAttendance/index";

</style>
