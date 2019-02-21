<template>
  <div id="marketCentre">
    <div class="container">
      <market-menu-list :show-market="show_market"></market-menu-list>
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
        attend_data: []
      }
    },
    mounted() {
      this.show_market = true;
      this.work_info[0].val = '7 h';
      this.event_data[0].value = 700;
      this.attend_data = [8,3,1]
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleChangeDate(id) {

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
