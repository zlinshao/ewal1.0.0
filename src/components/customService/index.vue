<template>
  <div id="customService" ref="customService" :style="mainHeight">
    <MenuList :list="customService" :module="true" :title="top_title"></MenuList>
    <work-info @change="handleChangeDate">
      <template v-slot:left>
        <div>
          <p>工单</p>
          <div id="work_data"></div>
        </div>
      </template>
      <template v-slot:center>
        <div>
          <p>回访</p>
          <div id="revisit_data"></div>
        </div>
      </template>
      <template v-slot:right>
        <div>
          <p>到期</p>
          <div id="tag_data"></div>
        </div>
      </template>
    </work-info>
  </div>
</template>

<script>
  import MenuList from '../common/menuList.vue';
  import WorkInfo from '../common/work-info.vue';
  import {customService} from '../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: { MenuList,WorkInfo },
    data() {
      return {
        top_title: '',
        customService,

        mainHeight: {
          height: 0
        },

        params: {
          uid: 289,
          diff: 1
        },
        work_data: [],
        revisit_data: [],
        tag_data: []
      }
    },
    mounted() {
      this.top_title = '客服中心';
      var top = this.$refs['customService'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';
      this.handleGetInfo();
    },
    watch: {},
    computed: {},
    methods: {
      init_work_chart() {
        var event_chart = this.$echarts.init(document.getElementById('work_data'));
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
              name: '工单',
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
              data: this.work_data
            }
          ]
        });
      },
      init_tag_chart() {
        var event_chart = this.$echarts.init(document.getElementById('tag_data'));
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
              name: '到期',
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
              data: this.tag_data
            }
          ]
        });
      },
      init_revisit_chart() {
        var event_chart = this.$echarts.init(document.getElementById('revisit_data'));
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
              name: '回访',
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
              data: this.revisit_data
            }
          ]
        });
      },
      handleGetInfo() {
        this.$http.get(globalConfig.market_server + 'v1.0/csd/home/dashboard',this.params).then(res => {
          if (res.data) {
            this.work_data = [];
            this.tag_data = [];
            this.revisit_data = [];
            if (res.data.workOrderData) {
              this.work_data.push({
                name: '已完成',
                value: res.data.workOrderData.complete
              },{
                name: '未完成',
                value: eval(res.data.workOrderData.undone + res.data.workOrderData.following)
              })
            }
            if (res.data.revisitData) {
              let revisit = res.data.revisitData;
              this.revisit_data.push({
                name: '已回访',
                value: eval(revisit.lordCompleted + revisit.rentCompleted)
              },{
                name: '未回访',
                value: eval(revisit.lordUndone + revisit.rentUndone)
              })
            }
            if (res.data.tagData) {
              let tag = res.data.tagData;
              this.tag_data.push({
                name: '已标记',
                value: eval(tag.lordMarked + tag.rentMarked)
              },{
                name: '未标记',
                value: eval(tag.lordUnmarked + tag.rentUnmarked)
              })
            }
          } else {
            this.work_data = [];
            this.tag_data = [];
            this.revisit_data = [];
          }
          this.init_work_chart();
          this.init_tag_chart();
          this.init_revisit_chart();
        })
      },
      handleChangeDate(id) {
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
        this.handleGetInfo();
      }
    }
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
      background-color: white;
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
