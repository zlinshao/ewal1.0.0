<template>
  <div id="customService">
    <div class="container">
      <menu-list :menuVisible="show_menu_list" @close="show_menu_list = false"></menu-list>
    </div>
    <work-info :work-info="work_info" :event-data="event_data" :attend-data="attend_data" @change="handleChangeDate"></work-info>
  </div>
</template>

<script>
  import MenuList from './components/menu-list.vue';
  import WorkInfo from '../common/work-info.vue';

  export default {
    name: "index",
    components: { MenuList,WorkInfo },
    data() {
      return {
        show_menu_list: false,
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
      this.show_menu_list = true;
      this.work_info[0].val = '9 h';
      this.event_data[0].value = 900;
      this.attend_data = [10,5,2]
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleChangeDate(id) {
        console.log(id);
        console.log(this.work_info);
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
