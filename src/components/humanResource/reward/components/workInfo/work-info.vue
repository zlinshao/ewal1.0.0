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
          <div v-for="(item,index) in eventDataList">
          <span>{{item.title}}</span>
          <div  :id="'events_charts'+index" style="width: 300px;height: 300px;"></div>
          </div>

        </div>

        <div class="work_info">
          <p v-for="todo in workInfo">{{ todo.work }} : <span style="color: red;">{{ todo.val }}</span> 人</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "work-info",
    props: ['workInfo', 'eventDataList'],
    data() {
      return {
        date_change_list: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
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
        for (let i = 0; i < this.eventDataList.length; i++) {

          let event_chart = this.$echarts.init(document.getElementById('events_charts' + i));

          event_chart.setOption({
            color: ['#DFDFDF', '#9E9E9E', '#B9292D'],
            // legend: {
            //   orient: 'vertical',
            //   x: 'left',
            //   y: 'middle',
            //   data: ['一般', '特殊', '紧急']
            // },
            series: [
              {
                name: this.eventDataList[i].title,
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
                data: this.eventDataList[i].value
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
  @import "../../../../../assets/scss/humanResource/reward/components/workInfo/index";


  @mixin workInfoImg($m, $n) {
    $url: '../../../../../assets/image/humanResource/reward/' + $n + '/' + $m;
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
