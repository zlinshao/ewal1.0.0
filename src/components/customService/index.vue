<template>
  <div id="customService">
    <div style="height: 500px">
      <menu-list :menuVisible="show_menu_list" @close="show_menu_list = false" @open="show_menu_list = true"></menu-list>
    </div>
    <div class="info_container">
      <ul class="date_change">
        <li @click="isActive = tmp.id" v-for="tmp in date_change_list" :key="tmp.id" :class="{ 'mark_li' : isActive === tmp.id }">{{ tmp.val }}</li>
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
  import MenuList from './components/menu-list.vue';

  export default {
    name: "index",
    components: { MenuList },
    data() {
      return {
        show_menu_list: false,
        date_change_list: [
          {id: 1,val: '当日'},
          {id: 2,val: '本周'},
          {id: 3,val: '本月'},
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
      this.show_menu_list = true;
      this.init_event_chart();
      this.init_attend_chart();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleCloseMenu() {
        this.show_menu_list = false;
      },
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
              radius: ['30%', '80%'],
              selectedMode: 'single',
              avoidLabelOverlap: false,
              selectedOffset: 15,
              startAngle: 45,
              emphasis: {
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#909399' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'white' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
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
                alignWithLabel: true,
                length: 0
              },
              axisLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            color: '#CF2E33',
            fontFamily: 'jingDianXingShu',
            fontSize: 18,
            fontStyle: 'italic'
          },
          emphasis: {
            itemStyle: {
              color: '#DFDFDF',
              barBorderRadius: 5
            }
          },
          barMaxWidth: 25,
          markLine: false,
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
