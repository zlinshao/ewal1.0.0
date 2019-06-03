<template>
    <div id="workInfo">
      <div class="info_container">
        <ul class="date_change">
          <li v-for="tmp in date_change_list" :key="tmp.id" @click="handleChangeDate(tmp.id)" :class="{'mark_li': isActive === tmp.id}">{{ tmp.val }}</li>
        </ul>
        <div class="day_info flex-center">
          <div>
            <slot name="left"></slot>
          </div>
          <div>
            <slot name="center"></slot>
          </div>
          <div>
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "work-info",
        data() {
            return {
              date_change_list: [
                {id: 1,val: '当日'},
                {id: 2,val: '本周'},
                {id: 3,val: '本月'},
              ],
              isActive: 1,
            }
        },
        mounted() {
          // this.init_event_chart();
          // this.init_attend_chart();
        },
        watch: {},
        methods: {
          init_event_chart() {
          var event_chart = this.$echarts.init(document.getElementById('events_charts'));
          event_chart.setOption({
            color: ['#DFDFDF','#9E9E9E','#B9292D'],
            legend: {
              orient: 'vertical',
              x: 'left',
              y: 'middle',
              // data: ['一般', '特殊', '紧急']
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
                data: this.event_data
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
                data: this.attend_data
              }
            ]
          });
        },
          handleChangeDate(id) {
            this.$emit('change',id);
            this.isActive = id;
          }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/workInfo/index.scss";
  @mixin menuImg($m, $n) {
    $url: '../../assets/image/workInfo/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #workInfo {
      .info_container {
        .date_change {
          li {
            color: #999999;
            background-color: $colorFDF;
          }
          .mark_li {
            background-color: $colorE33;
            color: white;
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #workInfo {
      .info_container {
        .date_change {
          li {
            color: #00ffff;
            @include menuImg('kf_bz.png', 'theme2');
          }
          .mark_li {
            color: #ff0089;
            @include menuImg('kf_dr.png', 'theme2');
          }
        }
      }
    }
  }

</style>
