<template>
  <div id="humanResource">
    <div>
      <MenuList :list="humanResource" :module="true" :title="title"></MenuList>
    </div>
    <div class="bottom_info flex-center" ref="bottom_info" :style="mainHeight">
      <div>
        <p>{{ mark_choose === 1 ? '当日': mark_choose === 2 ? '本周' : '本月'}}我的任务完成率</p>
        <div id="work_down_charts" style="width: 400px;height: 300px;"></div>
      </div>
      <div>
        <p>连续2个月业绩低于10万名单</p>
        <div class="staff_list flex">
          <div class="staff_list_item" v-for="item in achv_list">
            <div>
              <img :src="item.avatar" alt="" v-if="item.avatar">
              <img src="../../assets/image/no_avatar.png" alt="" v-else>
            </div>
            {{ item.name }}
            <div>
              {{ item.achievement2 && item.achievement2.date.split('-')[1]}}月:<a>{{(item.achievement2.value /
              10000).toFixed(1) }}</a>万
            </div>
            <div>
              {{ item.achievement1 && item.achievement1.date.split('-')[1]}}月:<a>{{(item.achievement1.value /
              10000).toFixed(1) }}</a>万
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>{{mark_content}}入职员工数：{{ staff_info.enroll }}人</span>
        <span>{{mark_content}}离职员工数：{{ staff_info.dismiss }}人</span>
        <span>{{mark_content}}待转正工数：{{ staff_info.forward }}人</span>
      </div>

      <ul class="mark_btn">
        <li v-for="tmp in mark_list" @click="clickMark(tmp)" :key="tmp.id"
            :class="{'mark_choose': tmp.id === mark_choose}">{{ tmp.val }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MenuList from '../common/menuList.vue'
  import {humanResource} from '../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList},
    data() {
      return {
        url: globalConfig.humanResource_server,
        humanResource,
        title: '',
        mainHeight: {
          height: 0
        },
        mark_content: '当日',
        mark_list: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
        ],
        mark_choose: 1,
        work_down_data: [
          {value: 30, name: '已完成'},
          {value: 20, name: '未完成'},
        ],
        staff_time: {
          start_time: this.myUtils.formatDate(new Date(), 'yyyy-MM-dd'),
          end_time: this.myUtils.formatDate(new Date(), 'yyyy-MM-dd'),
        },
        staff_info: {
          dismiss: '',
          enroll: '',
          forward: ''
        },
        achv_list: [],
      }
    },
    mounted() {
      this.title = '人力资源中心';

      let top = this.$refs['bottom_info'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';

      this.init_work_down_chart();
      this.handleGetStaffInfo();
      this.handleGetAchList();
    },
    watch: {},
    computed: {},
    methods: {
      clickMark(tmp) {
        switch (tmp.id) {
          case 1:
            this.staff_time.end_time = this.myUtils.formatDate(new Date(), 'yyyy-MM-dd');
            this.staff_time.start_time = this.myUtils.formatDate(new Date(), 'yyyy-MM-dd');
            break;
          case 2:
            let date = new Date().getDay();
            this.staff_time.start_time = new Date(new Date().setDate(new Date().getDate() - (date - 1))).toLocaleDateString().split('/').join('-');
            this.staff_time.end_time = new Date(new Date().setDate(new Date().getDate() + (7 - date))).toLocaleDateString().split('/').join('-');
            break;
          case 3:
            let fullYear = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            let endOfMonth = new Date(fullYear, month, 0).getDate();
            this.staff_time.start_time = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`;
            this.staff_time.end_time = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${endOfMonth}`;
            break;
        }
        this.mark_content = _.find(this.mark_list, {id: tmp.id}).val;
        this.mark_choose = tmp.id;
        this.handleGetStaffInfo();
      },
      handleGetAchList() {
        let params = {
          city: this.$storage.get('user_info').city,
          num: 10,
        };
        this.$http.post('http://47.101.210.105:8082/achievement', params).then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.achv_list = res.data.splice(0, 10);
            } else {
              this.achv_list = [];
            }
          } else {
            this.achv_list = [];
            this.$LjNotify('warning', {
              title: '警告',
              message: '获取业绩列表失败！'
            });
            return false;
          }
        })
      },
      handleGetStaffInfo() {
        this.$http.get(this.url + 'staff/user/statistical', this.staff_time).then(res => {
          if (res.code === '20000') {
            for (let key in this.staff_info) {
              this.staff_info[key] = res.data[key];
            }
          } else {
            for (let key in this.staff_info) {
              this.staff_info[key] = 0;
            }
          }
        })
      },
      init_work_down_chart() {
        let event_chart = this.$echarts.init(document.getElementById('work_down_charts'));
        event_chart.setOption({
          color: ['#9E9E9E', '#B9292D'],
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            data: ['已完成', '未完成']
          },
          series: [
            {
              name: '事件紧急程度',
              type: 'pie',
              radius: ['30%', '80%'],
              selectedMode: 'single',
              avoidLabelOverlap: false,
              selectedOffset: 15,
              startAngle: 45,
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}%',
                  fontFamily: 'jingDianXingShu',
                  fontSize: 18,
                  fontStyle: 'italic'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold'
                  }
                }
              },
              data: this.work_down_data
            }
          ]
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/humanResource/index.scss";

  @mixin humanImg($m, $n) {
    $url: '../../assets/image/humanResource/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #humanResource {

    }
  }

  #theme_name.theme2 {
    #humanResource {

    }
  }

  #theme_name.theme3 {
    #humanResource {

    }
  }

  #theme_name.theme4 {
    #humanResource {

    }
  }
</style>
