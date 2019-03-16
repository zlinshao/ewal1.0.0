<template>
    <div id="workInfo">
      <div class="tip-icon"></div>
      <div class="info_container">
        <ul class="date_change">
          <li v-for="tmp in date_change_list" :key="tmp.id" @click="handleChangeDate(tmp.id)" :class="{'mark_li': isActive === tmp.id}">{{ tmp.val }}</li>
        </ul>
        <div class="day_info flex-center">
          <div class="event_info">
            <!--<p>事件程度比重：</p>-->
            <div v-for="(item,index) in eventData" :id="'events_charts'+(index+1)" style="float:left; display: inline-block;width: 300px;height: 300px;border: 1px solid red;">3333</div>
            <div id="events_charts" style="width: 400px;height: 300px;"></div>
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
        props: ['workInfo','eventData'],
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
            }
        },
        mounted() {
          this.init_event_chart();
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
          // eventData: {
          //   handler(val) {
          //     this.event_data = val;
          //     //this.init_event_chart();
          //   },
          //   deep: true
          // }
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

          handleChangeDate(id) {
            this.$emit('change',id);
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
        @include workInfoImg('ch.png','theme1');
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
