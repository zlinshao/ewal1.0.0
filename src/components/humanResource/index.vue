<template>
  <div id="humanResource">
    <div>
      <MenuList :list="humanResource" :module="true" :title="title"></MenuList>
    </div>
    <div class="bottom_info flex-center" ref="bottom_info" :style="mainHeight">
      <div>
        <p>本周我的任务完成率</p>
        <div id="work_down_charts" style="width: 400px;height: 300px;"></div>
      </div>
      <div>
        <p>连续2个月业绩低于10万名单</p>
        <!--<div class="staff_list flex">-->
          <!--<div class="staff_list_item" v-for="item in 10">-->
            <!---->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div>
        <span>本月入职员工数：{{ staff_info.enroll }}人</span>
        <span>本月离职员工数：{{ staff_info.dismiss }}人</span>
        <span>本月待转正工数：{{ staff_info.forward }}人</span>
      </div>

      <ul class="mark_btn">
        <li v-for="tmp in mark_list" @click="clickMark(tmp)" :key="tmp.id" :class="{'mark_choose': tmp.id === mark_choose}">{{ tmp.val }}</li>
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
        humanResource,
        title: '',
        mainHeight: {
          height: 0
        },
        mark_list: [
          {id: 1,val: '当日'},
          {id: 2,val: '本周'},
          {id: 3,val: '本月'},
        ],
        mark_choose: 1,
        work_down_data: [
          {value: 50,name: '一般'},
          {value: 30,name: '特殊'},
          {value: 20,name: '紧急'},
        ],
        staff_time: {
          start_time: '',
          end_time: ''
        },
        staff_info: {
          dismiss: '',
          enroll: '',
          forward: ''
        }
      }
    },
    mounted() {
      this.title = '人力资源中心';

      var top = this.$refs['bottom_info'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';

      this.init_work_down_chart();
      this.handleGetStaffInfo();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      clickMark(tmp) {
        switch (tmp.id) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
        }
      },
      handleGetStaffInfo() {
        this.$http.get('staff/user/statistical',this.staff_time).then(res => {
          if (res.code === '20000') {
            for (var key in this.staff_info) {
              this.staff_info[key] = res.data[key];
            }
          } else  {
            for (var key in this.staff_info) {
              this.staff_info[key] = 0;
            }
          }
        })
      },
      init_work_down_chart() {
        var event_chart = this.$echarts.init(document.getElementById('work_down_charts'));
        event_chart.setOption({
          color: ['#DFDFDF','#9E9E9E','#B9292D'],
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            data: ['一般', '特殊', '紧急']
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
