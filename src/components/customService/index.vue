<template>
  <div id="customService" ref="customService" :style="mainHeight">
    <MenuList :list="customService" :module="true" :title="top_title"></MenuList>
    <work-info :work-info="work_info" :event-data="event_data" :attend-data="attend_data" @change="handleChangeDate"></work-info>
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
        attend_data: [],
        mainHeight: {
          height: 0
        }
      }
    },
    mounted() {
      this.show_menu_list = true;
      this.work_info[0].val = '9 h';
      this.event_data[0].value = 900;
      // this.attend_data = [10,5,2];
      this.top_title = '客服中心';

      var top = this.$refs['customService'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';

      this.handleGetWorkInfo();
    },
    activated() {
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
