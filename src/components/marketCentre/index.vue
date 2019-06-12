<template>
  <div id="marketCentre" ref="marketCentre" :style="mainHeight">
    <coming-soon></coming-soon>
    <div class="container">
      <market-menu-list :show-market="show_market" :show-shadow="false" @close="handleCloseMenu" :title="top_title"></market-menu-list>
    </div>
    <work-info @change="handleChangeDate">
      <template v-slot:left>
        <div>
          <p>待办任务</p>
          <div id="task_rate" style="width: 500px;height: 300px"></div>
        </div>
      </template>
      <template v-slot:center>
        <div>
          <p>考勤</p>
          <div id="attend_data" style="width: 400px;height: 300px;"></div>
        </div>
      </template>
      <template v-slot:right>
          <div class="more_task">
            <p>业绩：{{ performance_info.all }}</p>
            <p>空置房源：{{ performance_info.vacant }}</p>
            <p>当日处理事件数：{{ performance_info.task }}</p>
            <p>平均处理用时：{{ performance_info.time }}</p>
          </div>
      </template>
    </work-info>
  </div>
</template>

<script>
  import WorkInfo from '../common/work-info.vue';
  import MarketMenuList from './components/market-menu-list.vue';

  export default {
    name: "index",
    components: { WorkInfo,MarketMenuList },
    data() {
      return {
        top_title: '',
        show_market: false,
        work_info: [
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
        ],
        taskData: [
          {name: '待办1',value: 100},
          {name: '待办2',value: 100},
        ],
        performance_info: {
          all: 0,
          task: 0,
          time: 0,
          vacant: 0
        },
        attend_data: [1,2,3],
        mainHeight: {
          height: 0
        },

        //统计参数
        params: {
          uid: 289,
          date: '',
          diff: 1
        }
      }
    },
    mounted() {
      this.show_market = true;
      this.top_title = '营销中心';

      var top = this.$refs['marketCentre'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';

      this.handleGetWorkInfo();
      this.init_task_chart();
      this.init_attend_chart();
    },
    watch: {},
    computed: {},
    methods: {
      init_attend_chart() {
        var attend_chart = this.$echarts.init(document.getElementById('attend_data'));
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
      init_task_chart() {
        var event_chart = this.$echarts.init(document.getElementById('task_rate'));
        event_chart.setOption({
          color: ['#DFDFDF','#B9292D'],
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            // data: ['一般', '特殊', '紧急']
          },
          series: [
            {
              name: '待办',
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
              data: this.taskData
            }
          ]
        });
      },
      handleGetWorkInfo() {
        this.$http.get(globalConfig.market_server + 'v1.0/csd/home/dashboard',this.params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.taskData = res.data.taskRate;
            this.performance_info.vacant = res.data.houseVacantCount || 0;
            this.performance_info.task = res.data.taskData && res.data.taskData.taskCount || 0;
            var arr = [];
            arr[0] = res.data && res.data.attendance.late_day;
            arr[1] = res.data && res.data.attendance.rest_day;
            arr[2] = new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate() - res.data.attendance.attendance_day;
            this.attend_data = arr;

            console.log(this.attend_data);

            if (res.data.eventRate && res.data.eventRate.length > 0) {
              var arr2 = [];
              for (var item of res.data.eventRate) {
                arr2.push({value: item.num,name: item.emergency_name});
              }
              this.event_data = arr2;

              console.log(this.event_data);
            }

            this.init_task_chart();
            this.init_task_chart();
          }
        })
      },
      handleChangeDate(id) {
        console.log(id);
        switch (id) {
          case 1:
            this.params.diff = 1;
            break;
          case 2:
            this.params.diff = 7;
            break;
          case 3:
            this.params.diff = 30;
            break;
        }
        this.handleGetWorkInfo();
      },
      handleCloseMenu() {
        this.show_market = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/marketCentre/index.scss";

  @mixin marketCentreImg($m, $n) {
    $url: '../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #marketCentre {
      background-color: white;
      .more_task {
        p {
          &:not(:last-child) {
            margin-bottom: 30px;
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #marketCentre {

    }
  }

  #theme_name.theme3 {
    #marketCentre {

    }
  }

  #theme_name.theme4 {
    #marketCentre {

    }
  }
</style>
