<template>
  <div class="demo-container">
    <lj-white-dialog :visible="lj_white_dialog"></lj-white-dialog>
    <!--<div id="demo_demo"  style="width: 800px;height: 400px;background-color: #ccc"></div>
    <div @click="demo">测试</div>
    <div @click="demo2">测试2</div>-->
    <!--  <app-index-more :visible.sync="more_visible"></app-index-more>-->

    <!--    <el-button @click="demo">清空</el-button>-->
    <!--    <lj-upload v-model="list" :limit="['png']"></lj-upload>-->
    <!--        <post-choose v-model="post_list" num="1"></post-choose>-->
    <!--        <user-choose ref="user" v-model="user_list"></user-choose>-->
    <!--        <org-choose v-model="org_list"></org-choose>-->
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
    <!--    <lj-upload ref="ljUpload" :limit-easy="['image']" v-model="list" :download="false" :disabled="true"></lj-upload>-->
    <!--<dropdown-list
                   :json-arr="DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RECEIVE_RETURN_STATUS"
                   v-model="demo"></dropdown-list>-->
    <!--    <coming-soon></coming-soon>-->


  </div>


  <!--<div id="org-chart-container">
    <div class="menu-container">
        <button @click="bigger()">+</button>
        <button @click="smaller()">-</button>
    </div>
  </div>-->

</template>

<script>
  import LjWhiteDialog from '@/components/common/lightweightComponents/LjWhiteDialog.vue';
  import OrgChart from './org-chart'
  import {generateOrgChartData, Data} from './base/data-generator'


  import AppIndexMore from '../../../components/index/components/AppIndexMore';
  import CountDown from '@/components/common/lightweightComponents/CountDown.vue';
  import TestPaper from '@/components/common/lightweightComponents/TestPaper.vue';
  import NameShower from '@/components/common/lightweightComponents/NameShower.vue';
  import UserList from '@/components/common/lightweightComponents/UserList.vue';
  import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
  import ComingSoon from '@/components/common/ComingSoon.vue';
  import mixins from '@/assets/js/mixins/calendar.js';
  import Calendar from '@/components/common/lightweightComponents/Calendar/index.vue';
  import ButtonUpload from '@/components/common/lightweightComponents/ButtonUpload.vue';
  import {DROPDOWN_CONSTANT} from "../../../assets/js/allConstantData";


  export default {
    name: "index",
    mixins: [mixins],
    components: {
      LjWhiteDialog,
      Calendar,
      ImgSlider,
      UserList,
      NameShower,
      TestPaper,
      CountDown,
      ButtonUpload,
      AppIndexMore,
      ComingSoon,
    },
    data() {
      return {
        lj_white_dialog: true,
        data: {
          name: '总裁办',
          title: '',
          children: []
        },
        orgChart: null,

        count: 0,

        url: globalConfig.humanResource_server,


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
        list: ["4228777", 628, 631],
        //user_list: [211, 289, 3604, 3623, 3590, 3589],
        user_list: [3604, 3335, 3338, 3337],
        org_list: [411, 418, 419],
        post_list: [139, 140, 141],
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
    async created() {
      /*console.log(new Date().getTime())
      await this.getOrgDataOnce();
      //await this.getTopPosition();
      //await this.getOrganizationData(1,this.data);
      this.orgChart = new OrgChart()
      let demo  = this.data;
      //debugger
      this.orgChart.draw(this.data);
      //debugger
      setTimeout(()=> {
        console.log(this.count);
      },1000);*/
    },
    async mounted() {
      //console.log(new Date().getTime())
    },
    methods: {

      demo() {
        this.$LjLoading({el: '#demo_demo', loading: true});
      },
      demo2() {
        this.$LjLoading({el: '#demo_demo', loading: false});
      },

      async getTopPosition() {
        await this.$http.get(this.url + 'organization/position', {
          page: 1,
          limit: 999,
          is_top: 1
        }).then(res => {
          if (res.code === '20000') {
            //this.top_position = res.data.data;
            _.forEach(res.data.data, (o, index) => {
              //this.data.children[index] = {name:o.users[0]?.name||'无名',user:o.name};
              this.data.children[index] = {name: o.name, user: o.users[0]?.name || '无名'};
            });
            /*for (let i = 0;i<this.top_position.length;i++) {
              this.handleTopGetDepart(this.top_position[i],i);
            }*/
          } else {
            //this.top_position = [];
          }
        })
      },

      //获取组织架构数据
      async getOrganizationData(parent_id = 1, currentData) {
        this.count++;
        let temp = currentData;
        let params = {
          page: 1,
          limit: 100,
          parent_id,
          is_enable: 1,
        };
        await this.$http.get(`${this.url}organization/organization`, params).then(async res => {
          if (res.code.toString().endsWith('0')) {
            _.forEach(res.data.data, async (o, index) => {
              temp.children[index] = {name: o.name, user: o.leader?.name || '无名', children: []};
              await this.getOrganizationData(o.id, temp.children[index]);
            });
          }
        });
      },

      //通过统一接口一次获取组织架构图所有数据
      async getOrgDataOnce() {
        await this.$http.get(`${this.url}organization/org`).then(res => {
          if (res.code.toString().endsWith('0')) {
            this.data = res.data;
            this.data.user = '姜千';
            this.recursionHandleData(this.data);
          }
        });
      },

      //递归处理数据
      recursionHandleData(tempdata) {
        if (tempdata.users) {
          tempdata.user = tempdata.users[0]?.name;
        }
        if (tempdata.leader) {
          tempdata.user = tempdata.leader.name;
        }
        tempdata.user = tempdata.user || '无名';
        if (tempdata.name) {
          if (tempdata.name.length >= 8) {
            tempdata.name = insertStr(tempdata.name, 8);

            function insertStr(str, start) {//往字符串指定位置增加空格
              return str.slice(0, start) + ' ' + str.slice(start);
            }
          }
        }
        tempdata.children = tempdata.child || [];
        //删除无用数据
        delete tempdata.child;
        delete tempdata.users;
        delete tempdata.leader;
        delete tempdata.id;
        delete tempdata.leader_id;
        delete tempdata.position_id;
        let temp = tempdata;
        if (!temp.children) {
          temp.children = [];
        }
        _(temp.children).forEach((o, index) => {
          this.recursionHandleData(o);
        });
      },

      bigger() {
        this.orgChart.bigger();
        /*        let result = this.data;
                let strResult = JSON.stringify(result);
                debugger
                console.log(JSON.stringify(result));*/
      },
      smaller() {
        this.orgChart.smaller()
      }

      /*demoSuccess(exam) {
        debugger
        console.log('******');
        console.log(exam);
      },

      demo() {
        this.list = [];
        this.$refs['ljUpload'].reset();
        console.log(this.list);

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
      },*/
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
