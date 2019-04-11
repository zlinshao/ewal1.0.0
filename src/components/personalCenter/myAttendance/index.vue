<template>
  <div id="my_attendance">
    <div class="personal-check">
      <div class="date-choose">
        <month-choose v-model="datetime"></month-choose>
      </div>
      <div class="check-record">
        <div class="check-record-container">

          <div v-for="item in attendanceList" class="check-record-item">
            <div class="check-record-item-top">
              <span>{{item.tip}}</span></div>
            <div class="check-record-item-bottom">
              <span>{{item.value}}</span></div>
          </div>
        </div>
      </div>
      <div class="check-calendar">
        <div class="calendar-container">
          <calendar week-type="en"></calendar>
        </div>
        <div class="calendar-useless"></div>

      </div>
    </div>
  </div>
</template>

<script>
  import MonthChoose from '@/components/common/lightweightComponents/Calendar/MonthChoose/index.vue';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';

  export default {
    name: "index",
    components: {
      MonthChoose,
      Calendar,
    },
    data() {
      return {
        datetime: new Date(),
        attendanceList: [
          {
            id:1,
            tip:'应出勤',
            value:'31天',
          },
          {
            id:2,
            tip:'实际出勤',
            value:'17天',
          },
          {
            id:3,
            tip:'迟到次数',
            value:'0次',
          },
          {
            id:4,
            tip:'早退次数',
            value:'0次',
          },
          {
            id:5,
            tip:'未签退',
            value:'2次',
          },
          {
            id:6,
            tip:'旷工',
            value:'2天',
          },
          {
            id:7,
            tip:'外勤',
            value:'4天',
          },
          {
            id:8,
            tip:'外出',
            value:'11天',
          },
          {
            id:9,
            tip:'请假',
            value:'0天',
          },{
            id:10,
            tip:'加班',
            value:'2天',
          },{
            id:11,
            tip:'出差',
            value:'0天',
          },


        ],
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myAttendance/index";


</style>
