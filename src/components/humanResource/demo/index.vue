<template>
  <div class="demo-container" style="width: 800px">

    <!--div @click="more_visible = !more_visible">测试</div>
  <app-index-more :visible.sync="more_visible"></app-index-more>-->

    <el-button @click="demo">测试</el-button>
    <!--    <lj-upload v-model="list" :limit="['png']"></lj-upload>-->
    <!--    <post-choose v-model="post_list"></post-choose>-->
        <user-choose v-model="user_list"></user-choose>
    <!--    <org-choose v-model="org_list"></org-choose>-->
    <!--<el-button>测试</el-button>
    <search-high></search-high>-->
    <!--    <button-upload></button-upload>-->
    <!--    <count-down :datetime="datetime"></count-down>-->
    <!--<el-button @click="paper_visible=true">测试</el-button>
    <el-button @click="demo2">测试222</el-button>
    <test-paper :visible.sync="paper_visible" :params="paper_params" :type="2" :statisticsResult="view_result_list"
                @success="demoSuccess"></test-paper>-->
    <!--        <name-shower type="user" :ids="org_list"></name-shower>-->
    <!--    <user-list :mini="true" :ids="user_list"></user-list>-->
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
    <!--    <img-slider :size="{width:'100%',height:'100%'}" :arr="sliders"></img-slider>-->
<!--    <lj-upload :limit-easy="['image']" v-model="list" :disabled="true" :download="false"></lj-upload>-->
    <!--<dropdown-list
                   :json-arr="DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RECEIVE_RETURN_STATUS"
                   v-model="demo"></dropdown-list>-->
  </div>

</template>

<script>
  import AppIndexMore from '../../../components/index/components/AppIndexMore';
  import CountDown from '@/components/common/lightweightComponents/CountDown.vue';
  import TestPaper from '@/components/common/lightweightComponents/TestPaper.vue';
  import NameShower from '@/components/common/lightweightComponents/NameShower.vue';
  import UserList from '@/components/common/lightweightComponents/UserList.vue';
  import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
  import mixins from '@/assets/js/mixins/calendar.js';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import ButtonUpload from '@/components/common/lightweightComponents/ButtonUpload.vue';
  import {DROPDOWN_CONSTANT} from "../../../assets/js/allConstantData";

  export default {
    name: "index",
    mixins: [mixins],
    components: {
      Calendar,
      ImgSlider,
      UserList,
      NameShower,
      TestPaper,
      CountDown,
      ButtonUpload,
      AppIndexMore,
    },
    data() {
      return {
        more_visible: false,
        DROPDOWN_CONSTANT,
        datetime: '2019-05-01',
        daysList: [],
        sliders: [
          {
            id: 10086,
            uri: 'http://static.lejias.cn/lejia35b673cf3a51c850e3c0489a31a574a9.MP4',
            "info": {
              "ext": "video",
              "host": "static.lejias.cn",
              "mime": "video",
              "size": 243104,
              "bucket": "lejia-test"
            },
          },
        ],
        //list: [4228777],
        list: ["4228777",628,631],
        //user_list: [211, 289, 3604, 3623, 3590, 3589],
        user_list: [3604, 3335, 3338, 3337],
        org_list: [411, 418, 419],
        post_list: [],
        paper_params: {
          paper_name: '新建问卷',
          title: '入职考试',
          sub_title: '关于春节挂春联选一副',
          btn_name: '预览问卷',
        },
        paper_visible: false,

        view_result_list: []
      }
    },
    mounted() {
      _.forEach(this.user_list, (o) => {
        console.log(o);
      });
      //this.initDaysList(new Date('2019-04-01'));
    },
    methods: {
      demoSuccess(exam) {
        debugger
        console.log(exam);
      },

      demo() {
        this.$LjConfirm(
          {

            icon: 'error',
            content:'员工禁用状态将会改变，是否继续？',
            title:'测试',
          }
        ).then(() => {
          console.log('删除成功');
        }).catch(() => {
          console.log('取消');
        });

      },

      demo2() {
        this.view_result_list = [
          {
            "exam_question_id": 223,
            "exam_question_info": {
              "id": "223",
              "stem": "选择题题干",
              "score": 0,
              "answer": null,
              "choice": {
                "A": "选项A",
                "B": "选项B",
                "C": "选项C",
                "D": "选项D"
              },
              "user_id": 289,
              "category": "1",
              "created_at": "2019-04-09 16:30:34",
              "order_factor": 0,
              "exam_question_bank_id": "66",
            },
            "count": {
              "A": 0,
              "B": 0,
              "C": 1,
              "D": 0,
            }
          },
          {
            "exam_question_id": 224,
            "exam_question_info": {
              "id": "224",
              "stem": "简答题题干",
              "score": 0,
              "answer": null,
              "choice": '',
              "user_id": 289,
              "category": "3",
              "created_at": "2019-04-09 16:30:34",
              "order_factor": 0,
              "exam_question_bank_id": "66"
            },
            "count": '简答题答案'
          }];
        this.paper_params.title = '关于春节挂帘选一副';
        this.paper_params.response_count = 3;//回复量
      },


      initDaysList(date) {
        if (date) {
          let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
          daysList.forEach((item, index) => {
            item.id = ++index;
          });
          //处理数据
          daysList = _.forEach(daysList, (o) => {
            if (o.id % 6 == 0) {
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
        font-size: 14px;
        color: $colorE33;
      }
    }
  }
</style>
