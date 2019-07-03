<template>
  <div id="attence_dialog" class="repository-dialog" style="position: absolute">

    <lj-dialog

      :visible="humanResource_attence_visible"
      @close="attenceHandler"
      :size="{width: 1422 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <img v-if="$storage.get('user_info').avatar" :src="$storage.get('user_info').avatar"
               style="width:40px;height:40px"/>
          <img v-else src="../../../../assets/image/no_avatar.png" style="width:40px;height:40px"/>
          <div class="personMsg">
            <h3 class="name">{{$storage.get('user_info').name}}</h3>
            <h3 class="time">{{year}}年{{month}}月考勤</h3>
          </div>
          <h3>{{month}}月</h3>
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
          <div class="attence-info">
            <div class="attence-info-days">
              <div class="title">
                <h3>出勤天数</h3>
                <h3>休息天数</h3>
                <h3>迟到/早退次数</h3>
<!--                <h3>迟到/早退扣款</h3>-->
                <h3>上班/下班缺卡次数</h3>
<!--                <h3>上班/下班缺卡扣款</h3>-->
              </div>
              <div class="value">
                <h3>{{attendance_day}}</h3>
                <h3>{{rest_day}}</h3>
                <h3>{{late_count}}</h3>
<!--                <h3>200</h3>-->
                <h3>{{lack}}</h3>
<!--                <h3>400</h3>-->
              </div>
            </div>
            <div class="attence-textarea">
              <el-input type="textarea" :autosize="{minRows:4,maxRows:6}" v-model="exception_reason" placeholder="若考勤异常，请输入相应日期及原因"></el-input>
            </div>
            <div class="attence-footer">
              <el-button class="submit-button" @click="openSubmitAttence">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog
    >
    <lj-dialog
      :visible.sync="submit_attence_visible"
      :size="{width: 422 + 'px',height: 300 + 'px'}"
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
          <el-button size="mini" type="danger" @click="submitAttence">确定</el-button>
          <el-button size="mini" type="info" @click="submit_attence_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import mixins from '@/assets/js/mixins/calendar.js';

  export default {
    name: "attenceDialog",
    mixins: [mixins],
    components: {
      Calendar
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        submit_attence_visible: false,
        datetime: null,
        year: '',
        month: '',
        daysList: [],
        attendance_day: 0,
        rest_day: 0,
        late_count: 0,
        lack: 0,
        formData: [],
        exception_reason:'',//异常原因
        attence_id:null,//考勤id
      }
    },
    computed: {
      ...mapGetters([
        'todo_list_current_selection',
        'humanResource_attence_visible',
      ])
    },
    watch: {
      humanResource_attence_visible: {
        handler(val, oldVal) {
          if (val) {
            let result = this.todo_list_current_selection;
            this.datetime = _.find(this.todo_list_current_selection.variables, {name: 'month'}).value || new Date();
            this.year = this.myUtils.formatDate(this.datetime, 'yyyy');
            this.month = this.myUtils.formatDate(this.datetime, 'MM');
            this.getAttenceDetail();
          }
        }
      }
    },
    methods: {
      //提交考勤结果
      submitAttence() {
        if(!this.attence_id) return;
        let params = {
          is_confirm:1,
          remarks:this.exception_reason,
          task_id: this.todo_list_current_selection.id,
        };
        this.$http.put(`${this.url}attendance/attendance/${this.attence_id}`,params).then(res=> {
          this.$LjNotifyEasy(res,()=> {
            this.submit_attence_visible = false;
            this.attenceHandler();
            this.change_refresh_todo_list();
            this.exception_reason = null;
          });
        });
      },

      /*
       * 获取考勤详情
      **/
      getAttenceDetail() {
        let params = {
          date: new Date(this.datetime),
        };
        this.$http.get(`${this.url}attendance/attendance/${this.$storage.get('user_info').id}`, params).then(res => {
          if (res.code.toString().endsWith('0')) {
            let item = res.data;
            this.attence_id = item.attendance[0]?.id;
            this.attendance_day = item.attendance[0]?.attendance_day || '-';
            this.rest_day = item.attendance[0]?.rest_day || '-';
            this.late_count = item.attendance[0]?.late_day || 0;
            this.lack = item.attendance[0]?.not_signed_count[0] || 0 + item.attendance[0]?.not_signed_count[1] || 0;
            this.formData = item.attendance[0]?.attendance_data;
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
            newDaysList = _.sortBy(newDaysList, 'id');
            this.daysList = newDaysList;
          } else {
            this.daysList = [];
          }
        });
      },
      //打开确认提交对话框
      openSubmitAttence () {
        this.submit_attence_visible = true;
      },
      attenceHandler() {
        this.$store.dispatch('change_humanResource_attence_visible');
      },

      ...mapActions([
        'change_refresh_todo_list'
      ]),
    }
  }
</script>

<style lang="scss">
  #attence_dialog {
    #lj_dialog {
      .el-textarea__inner {
        border: 1px solid white;
        background-color: white !important;

        &:focus {
          border: 1px solid #cf2e33;
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/attenceDialog/index";

  @mixin attenceDialogImg($m, $n) {
    $url: '../../../../assets/image/todoList/components/humanResource/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #attence_dialog {
    #lj_dialog {
      .dialog_container {
        .dialog_header {
          .rili {
            @include attenceDialogImg('rili.png', 'theme1');
          }
        }
      }
    }
  }
</style>
