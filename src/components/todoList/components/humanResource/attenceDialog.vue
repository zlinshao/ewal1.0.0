<template>
  <div id="attence_dialog" class="repository-dialog" style="position: absolute">
    
    <lj-dialog
      :visible="humanResource_attence_visible"
      @close="attenceHandler"
      :size="{width: 1422 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <img :src="imgUrl" style="width:40px;height:40px"/>
          <div class="personMsg">
            <h3 class="name">{{name}}</h3>
            <h3 class="time">{{this.datetime.getFullYear()}}年{{this.datetime.getMonth()+1}}月考核</h3>
          </div>
          <h3>{{this.datetime.getMonth()+1}}月</h3>
          <div class="rili"></div>
        </div>
        <div class="dialog_main">
          <div class="calendar_container">
            <calendar>
              <div :slot="'slot'+item.id" v-for="item in daysList"
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
          <div class="attenceInfo">
            <div>
              <div class="title">
                <h3>出勤天数</h3>
                <h3>休息天数</h3>
                <h3>迟到/早退次数</h3>
                <h3>迟到/早退扣款</h3>
                <h3>上班/下班缺卡次数</h3>
                <h3>上班/下班缺卡扣款</h3>
              </div>
              <div class="value">
                <h3>{{attendance_day}}</h3>
                <h3>{{rest_day}}</h3>
                <h3>{{late_count}}</h3>
                <h3>200</h3>
                <h3>{{lack}}</h3>
                <h3>400</h3>
              </div>
            </div>
            <el-button class="submitButton" @click="submitAttence">提交</el-button>
          </div>
        </div>
      </div>
    </lj-dialog>
    <lj-dialog
      :visible="submit_attence_visible"
      :size="{width: 422 + 'px',height: 300 + 'px'}"
      @close="submit_attence_visible = false"
    >
      <div class="dialog_container warining_container">
        <div class="warining_header">
          <div class="wariningIcon">!</div>
          <div class="wariningText">警告</div>
        </div>
        <div class="dialog_main borderNone warining_body">
          <h3>确认提交后将会在考勤确认表上签章</h3>
          <h3>是否继续？</h3>
        </div>
        <div class="dialog_footer">
            <el-button size="mini" type="danger" @click="submit_attence_visible = false">确定</el-button>
            <el-button size="mini" type="info" @click="submit_attence_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import _ from 'lodash';
  import mixins from '@/assets/js/mixins/calendar.js';

  export default {
    name: "attenceDialog",
    mixins: [mixins],
    components: {
      ljDialog,
      Calendar
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        submit_attence_visible: false,
        datetime: new Date("2019-03"),
        name: '',
        imgUrl: require('../../../../assets/image/todoList/components/humanResource/theme1/rili.png'),
        daysList: [],
        attendance_day: 0,
        rest_day: 0,
        late_count: 0,
        lack: 0,
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
                  tableData: [],//表格数据
        },
        formData: []
      }
    },
    computed: {
      humanResource_attence_visible() {
        return this.$store.state.todo.humanResource_attence_visible;
      }
    },
    mounted(){
      this.getAttenceList();
    },
    methods: {
      getAttenceList: function () {
        this.attence.tableData = [];
        let params = {
          is_on_job: this.attence.isLeave ? 1 : 0,
          date: new Date(this.datetime),
          ...this.attence.params,
          org_id: this.attence.departmentId[0] || 2,
        };
        this.$http.get(`${this.url}attendance/attendance/`,params).then(res => {
          if (res.code==="20000") {
            for (let item of res.data.data) {
              this.name=  item.name || '-',
              this.imgUrl = item.avatar;
              this.attendance_day = item.attendance[0]?.attendance_day || '-';
              this.rest_day = item.attendance[0]?.rest_day || '-';
              this.late_count = item.attendance[0]?.late_day || 0;
              this.lack = item.attendance[0]?.not_signed_count[0] || 0 + item.attendance[0]?.not_signed_count[1] || 0;
              let obj = {
                attendance: item.attendance,
              };
              this.attence.tableData.push(obj);
              this.formData = this.attence.tableData[0].attendance[0]?.attendance_data;
            }
          }
        }).then(()=> {
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
      },
      submitAttence: function() {
        this.submit_attence_visible = true
      },
      attenceHandler() {
        this.$store.dispatch('change_humanResource_attence_visible');
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/attenceDialog/index";

  @mixin attenceDialogImg($m, $n) {
    $url: '../../../../assets/image/todoList/components/humanResource/' + $n + '/' + $m;
    @include bgImage($url);
  }
  
#attence_dialog {
  #lj_dialog{
    .dialog_container{
      .dialog_header{
        .rili{
          @include attenceDialogImg('rili.png','theme1');
        }
      }
    }
  }
}
</style>
