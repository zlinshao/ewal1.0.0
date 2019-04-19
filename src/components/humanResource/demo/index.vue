<template>
  <div class="demo-container" style="width: 800px">
    <!--<el-button @click="paper_visible=true">测试</el-button>
    <test-paper :visible.sync="paper_visible" :params="paper_params" @success="demoSuccess"></test-paper>-->
<!--    <name-shower type="org" :ids="org_list"></name-shower>-->
    <!--<user-list :ids="user_list"></user-list>-->
    <!--<calendar week-type="en" style="width: 1366px;height: 768px">
      <div :slot="'slot'+item.id" v-for="item in daysList"
      class="days-item" :class="{rest:!item.reason,current:item.today}"
      >
        <div class="days-item-content-container">
          <span class="days-item-content-date" :class="{colorE33:item.reason}">{{item.date}}</span>
          <span v-if="item.reason" class="days-item-content-reason">{{item.reason}}</span>

        </div>
      </div>
    </calendar>-->
    <!--<img-slider :size="{width:'100%',height:'100%'}" :single="true" :arr="sliders"></img-slider>-->
    <lj-upload v-model="list"></lj-upload>
  </div>

</template>

<script>
  import _ from 'lodash';
  import TestPaper from '@/components/common/lightweightComponents/TestPaper.vue';
  import NameShower from '@/components/common/lightweightComponents/NameShower.vue';
  import UserList from '@/components/common/lightweightComponents/UserList.vue';
  import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
  import mixins from '@/assets/js/mixins/calendar.js';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import LjUpload from "../../common/lightweightComponents/lj-upload";
  export default {
    name: "index",
    mixins: [mixins],
    components: {
      LjUpload,
      Calendar,
      ImgSlider,
      UserList,
      NameShower,
      TestPaper
    },
    data() {
      return {
        daysList: [],
        sliders:[
          {
            id:10086,
            uri:'http://static.lejias.cn/lejia35b673cf3a51c850e3c0489a31a574a9.MP4',
            "info": {
              "ext": "video",
              "host": "static.lejias.cn",
              "mime": "video",
              "size": 243104,
              "bucket": "lejia-test"
            },
          }
        ],
        list:[4225067],
        user_list:[211,289,3604,3623,3590,3589],
        org_list:[395,396],
        paper_params:{
          paper_name:'新建问卷',
          title:'入职考试',
          sub_title:'关于春节挂春联选一副',
          btn_name:'预览问卷',
        },
        paper_visible:false,
      }
    },
    mounted() {
      this.initDaysList(new Date('2019-04-01'));
    },
    methods: {
      demoSuccess(exam) {
        debugger
        console.log(exam);
      },


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
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common";
  #slider {
    width: 100%;
    height: 100%;
    .window {
      width: 100%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 100%;
        }
      }
    }
  }


  .demo-container {
    width: 100%;
    height: 100%;
  }
  .colorE33 {
    color: $colorE33;
  }
  .days-item {
    width: 100%;
    height: 100%;
    user-select: none;
    //background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="100%" y1="0" x2="0" y2="100%" style="stroke:rgb(99,99,99);stroke-width:2" stroke="gray" stroke-width="1"/></svg>');
    &.rest {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="100%" y1="0" x2="0" y2="100%" style="stroke:rgb(228,228,228);stroke-width:1"/></svg>');
    }
    &.current {
      color: white;
      background-color: $colorE33;
    }
    //background-color: red;
    .days-item-content-container {
      padding: 10% 0 0 10%;
      .days-item-content-date {
        font-size: 18px;
      }
      .days-item-content-reason {
        font-size:14px;
        color: $colorE33;
      }
    }
  }
</style>
