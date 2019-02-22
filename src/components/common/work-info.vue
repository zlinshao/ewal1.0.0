<template>
    <div id="workInfo">
      <div class="info_container">
        <ul class="date_change">

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
        name: "work-info",
        props: ['workInfo','eventData','attendData'],
        data() {
            return {
              date_change_list: [
                {id: 1,val: '当日'},
                {id: 2,val: '本周'},
                {id: 3,val: '本月'},
              ],
              isActive: 1,
              work_info: [],
              event_data: [],
              attend_data: [],
            }
        },
        mounted() {
          this.init_event_chart();
          this.init_attend_chart();
        },
        activated() {
        },
        watch: {
          workInfo: {
            handler(val) {
              this.work_info = val;
            },
            deep: true
          },
          eventData: {
            handler(val) {
              this.event_data = val;
              this.init_event_chart();
            },
            deep: true
          },
          attendData: {
            handler(val) {
              console.log(val);
              this.attend_data = val;
              this.init_attend_chart();
            },
            deep: true
          }
        },
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

</style>
