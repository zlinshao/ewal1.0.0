<template>
  <div class="inline" :style="{width: width+'px'}">
    <span v-if="title">{{title}}</span>
    <el-time-picker

      v-if="dateType=='timerange'"
      :startTime="startTime"
      :endTime="endTime"
      format="HH:mm"
      is-range
      :clearable = 'clearable'
      v-model="timeValue"
      range-separator="到"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围">
    </el-time-picker>

    <el-date-picker
      :startTime="startTime"
      :endTime="endTime"
      v-if="dateType=='datetimerange'"
      v-model="timeValue"
      :type="dateType"
      :clearable = 'clearable'
      @change="handleChange"
      format="MM-dd hh:mm"
      :picker-options="pickerOptionsTime"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :default-time="['08:00:00','12:00:00']">
    </el-date-picker>
    <!--
    :startTime="startTime"
      :endTime="endTime"
    -->
  </div>
</template>

<script>
  Date.prototype.Format = function (fmt) {
    let o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };
  export default {
    name: "datetimepicker",
    props: {
      title: {
        type: String,
        required: false
      },
      dateType: {// date  time daterange timerange datetimerange
        type: String,
        required: true,
      },
      width: {
        type: null
      },
      clearable: {
        type:Boolean,
      },
    },
    computed: {
      startTime() {
        if (!this.timeValue) {
          return "";
        }
        let sTime = this.timeValue[0].Format("HH:mm");
        return sTime;
      },
      endTime() {
        if (!this.timeValue) {
          return "";
        }
        let eTime = this.timeValue[1].Format("HH:mm");
        return eTime;
      },
    },
    data() {
      return {
        timeValue: [new Date(new Date() - 1000 * 60 * 60), new Date()],//最近30天
        //timeValue: [],//最近30天
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近六个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
              }
            }]
        },

        pickerOptionsTime: {
          shortcuts: [
            {
              text: '最近一小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近两小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 2);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 3);
                picker.$emit('pick', [start, end]);
              }
            },
          ]
        }
      }
    },
    methods: {
      handleChange() {
        //this.$emit(input,this.timeValue);
      }
    },
  }
</script>

<style scoped lang="scss">
  .inline {
    display: inline-block;
  }
</style>
