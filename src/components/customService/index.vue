<template>
  <div id="customService">
    <div class="menu_list flex-center">
      <div class="menu_contain" v-for="(item,key) in menu_list">
        <span class="writingMode" :key="key" @click="routerLink(item.url)">{{ item.title }}</span>
      </div>
    </div>

    <div class="info_container">
      <ul class="date_change">
        <li @click="isActive = 1" :class="{ 'mark_li' : isActive === 1 }">当日</li>
        <li @click="isActive = 2" :class="{ 'mark_li' : isActive === 2 }">本周</li>
        <li @click="isActive = 3" :class="{ 'mark_li' : isActive === 3 }">本月</li>
      </ul>
      <div class="day_info flex-center">
        <div class="event_info">
          <p>事件程度比重：</p>
          <div id="events_charts" style="width: 400px;height: 300px;"></div>
        </div>
        <div class="attend_info">
          <p>考勤：</p>
          <div id="attend_charts" style="width: 400px;height: 300px;"></div>
        </div>
        <div class="work_info">
          <p v-for="todo in work_info">{{ todo.work }} : {{ todo.val }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        menu_list: [
          {
            title: '工单',
            url: '/customService/workOrder'
          },
          {
            title: '回访',
            url: ''
          },
          {
            title: '到期',
            url: ''
          },
          {
            title: '资料',
            url: ''
          },
          {
            title: '合同',
            url: ''
          },
          {
            title: '客户',
            url: ''
          },
          {
            title: '客服',
            url: ''
          },
          {
            title: '房屋',
            url: ''
          },
        ],
        isActive: 1,
        work_info: [
          {work: '平均在线时长', val: '8 h'},
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
          {work: '本周处理事件数', val: '35 件'},
        ]
      }
    },
    mounted() {
      this.init_event_chart();
      this.init_attend_chart();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      init_event_chart() {
        var event_chart = this.$echarts.init(document.getElementById('events_charts'));
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
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  pointer: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              data: [
                {value: 500, name: '一般'},
                {value: 300, name: '特殊'},
                {value: 200, name: '紧急'},
              ]
            }
          ]
        });
      },
      init_attend_chart() {
        var attend_chart = this.$echarts.init(document.getElementById('attend_charts'));
        attend_chart.setOption({
          color: ['#DFDFDF'],
          xAxis: [
            {
              type: 'category',
              data: ['迟到','请假','缺勤'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {type: 'value',show: false}
          ],
          series: [
            {
              name: '考勤',
              type: 'bar',
              data: [10,5,2]
            }
          ]
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/customService/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customService {
      .menu_list {
        .menu_contain {
          span {
            @include serviceImg('huidi.png', 'theme1');
            &:hover {
              @include serviceImg('hongdi.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #customService {

    }
  }

  #theme_name.theme3 {
    #customService {

    }
  }

  #theme_name.theme4 {
    #customService {

    }
  }
</style>
