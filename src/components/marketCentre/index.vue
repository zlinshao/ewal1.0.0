<template>
  <div id="marketCentre" ref="marketCentre" :style="mainHeight">
    <div class="container">
      <market-menu-list :show-market="show_market" :show-shadow="false" @close="handleCloseMenu" :title="top_title"></market-menu-list>
    </div>
    <work-info :work-info="work_info" :event-data="event_data" :attend-data="attend_data" @change="handleChangeDate"></work-info>
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
          {work: '平均在线时长', val: '8 h'},
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
          {work: '本周处理事件数', val: '35 件'},
        ],
        event_data: [
          {value: 500, name: '一般'},
          {value: 300, name: '特殊'},
          {value: 200, name: '紧急'},
        ],
        attend_data: [],
        mainHeight: {
          height: 0
        }
      }
    },
    mounted() {
      this.show_market = true;
      this.work_info[0].val = '7 h';
      this.event_data[0].value = 700;
      // this.attend_data = [8,3,1];
      this.top_title = '营销中心';

      var top = this.$refs['marketCentre'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';

      this.handleGetWorkInfo();
    },
    watch: {},
    computed: {},
    methods: {
      handleGetWorkInfo() {
        var uid = 289;
        this.$http.get(globalConfig.market_server + 'v1.0/csd/home/dashboard',{
          uid,
          // date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
          date: '2019-03'
        }).then(res => {
          if (res.code === 200) {
            var arr = [];
            arr[0] = res.data && res.data.attendance.late_day;
            arr[1] = res.data && res.data.attendance.rest_day;
            arr[2] = new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate() - res.data.attendance.attendance_day;
            this.attend_data = arr;
          }
        })
      },
      handleChangeDate(id) {

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
