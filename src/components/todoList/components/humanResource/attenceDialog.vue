<template>
  <div id="attence_dialog" class="repository-dialog" style="position: absolute">
    <lj-dialog
      :visible="humanResource_attence_visible"
      :size="{width: 1422 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <img :src="imgUrl" style="width:25px;height:25px"/>
          <div class="personMsg">
            <h3 class="name">张无忌</h3>
            <h3 class="time">2019年三月考核</h3>
          </div>
          <h3>三月</h3>
          <div class="rili"></div>
        </div>
        <div class="dialog_main borderNone">
          <div class="calendar_container">
            <calendar :datetime="datetime">
              <div :slot="'slot'+item.id" v-for="item in daysList"
                class="days-item" :class="{rest:!item.reason,current:item.today}"
                >
                  <div class="days-item-content-container">
                    <span class="days-item-content-date" :class="{colorE33:item.reason}">{{item.date}}</span>
                    <span v-if="item.reason" class="days-item-content-reason">{{item.reason}}</span>

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
                <h3>上班/下班次数</h3>
                <h3>上班/下班扣款</h3>
              </div>
              <div class="value">
                <h3>31</h3>
                <h3>31</h3>
                <h3>2</h3>
                <h3>200</h3>
                <h3>4</h3>
                <h3>400</h3>
              </div>
            </div>
            <el-button class="submitButton">提交</el-button>
          </div>
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
    computed: {
      humanResource_attence_visible() {
        return this.$store.state.todo.humanResource_attence_visible;
      }
    },
    mounted(){
      this.initDaysList(new Date('2019-04-01'));
    },
    watch: {
     
    },
    data() {
      return {
          datetime: new Date(),
          imgUrl: require('../../../../assets/image/todoList/components/humanResource/theme1/rili.png'),
          daysList: [],
      }
    },
    methods: {
      initDaysList(date) {
        if (date) {
          let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
          daysList.forEach((item, index) => {
            item.id = ++index;
          });
          //处理数据
          daysList = _.forEach(daysList, (o) => {
            if(o.id%6==0) {
              o.reason = '迟到';
            }
          });
          this.daysList = daysList;
        } else {
          this.daysList = [];
        }
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
