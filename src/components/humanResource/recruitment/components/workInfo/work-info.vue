<template>
  <div id="workInfo">
    <div class="tip-icon"></div>
    <div class="info_container">
      <ul class="date_change">
        <li v-for="tmp in date_change_list" :key="tmp.id" @click="handleChangeDate(tmp.id)"
            :class="{'mark_li': isActive === tmp.id}">{{ tmp.val }}
        </li>
      </ul>
      <div class="day_info flex-center">
        <div class="event_info">
          <div v-for="(item,index) in event_data_list">
          <span>{{item.title}}</span>
          <div  :id="'events_charts'+index" style="width: 380px;height: 300px;"></div>
          </div>
        </div>

        <div class="work_info">
          <p v-for="todo in work_info">{{ todo.work }} : <span style="color: red;">{{ todo.val }}</span> 人</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "work-info",
    //props: ['workInfo', 'eventDataList'],
    data() {
      return {
        date_change_list: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
        ],
        work_info: [
          {work: '电话邀约数', val: '10'},
          {work: '面试预计/已到人数', val: '30/8'},
          {work: '预计入职数', val: '3'},
          {work: '实际入职数', val: '3'},
        ],

        event_data_list: [
          {
            title:'面试通过率:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'面试未通过原因分析:',
            value:[
              {value: 500, name: '薪资'},
              {value: 300, name: '休息时长'},
              {value: 200, name: '能力'}
            ],
            showLegend:true,
          },
          {
            title:'入职成功率:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'未入职原因分析:',
            value:[
              {value: 500, name: '薪资'},
              {value: 300, name: '休息时长'},
              {value: 200, name: '能力'}
            ],
            showLegend:true,
          },
        ],
        isActive: 1,
      }
    },
    mounted() {
      this.init_event_chart_list();
    },
    activated() {
    },
    watch: {
    },
    computed: {},
    methods: {
      init_event_chart_list() {
        for (let i = 0; i < this.event_data_list.length; i++) {

          let event_chart = this.$echarts.init(document.getElementById('events_charts' + i));

          event_chart.setOption({
            color: ['#DFDFDF', '#9E9E9E', '#B9292D'],
            legend: {
              orient: 'vertical',
              x: 'left',
              y: 'middle',
              //data: ['一般', '特殊', '紧急']
              data: this.event_data_list[i].showLegend?_.map(this.event_data_list[i].value,'name'):[],
            },
            series: [
              {
                name: this.event_data_list[i].title,
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
                data: this.event_data_list[i].value
              }
            ]
          });
        }
      },

      handleChangeDate(id) {
        this.$emit('change', id);
        this.isActive = id;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/workInfo/index";

  @mixin workInfoImg($m, $n) {
    $url: '../../../../../assets/image/workInfo/' + $n + '/' + $m;
    @include bgImage($url);

  }

  #theme_name.theme1 {
    #workInfo {
      .tip-icon {
        @include workInfoImg('ch.png', 'theme1');
      }
    }
  }

  #theme_name.theme2 {
    #workInfo {

    }
  }

  #theme_name.theme3 {
    #workInfo {

    }
  }

  #theme_name.theme4 {
    #workInfo {

    }
  }

</style>
