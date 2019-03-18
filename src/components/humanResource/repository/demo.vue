<template>
  <div>阿斯兰的看法据了解 </div>
</template>

<script>
  import {staffBookSearch, LeaveJobSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';


  export default {
    name: "index",
    components: {
    },
    data() {
      return {
        staffBookSearch,
        LeaveJobSearch,
        humanResource,
        resourceDepart,
        selects: [
          {
            id: 1,
            title: '扬善',
          },
          {
            id: 2,
            title: '惩恶',
          }
        ],//tab切换

        organModule: false,//组织架构
        chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        showSearch: false,//高级搜索
        searchData: {},//搜索项


        searchFruit1: {},//扬善搜索结果
        searchFruit2: {},//惩恶搜索结果

        //乐伽dialog
        reward_order_visible: false,
        exchange_rules_visible:false,

        //侧滑栏数据
        show_market: false,
        work_info: [
          {work: '平均在线时长', val: '8 h'},
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
          {work: '本周处理事件数', val: '35 件'},
        ],
        event_data: [
          [{value: 500, name: '一般'},
            {value: 300, name: '特殊'},
            {value: 200, name: '紧急'},],
          [{value: 400, name: '一般'},
            {value: 300, name: '特殊'},
            {value: 300, name: '紧急'},],
          [{value: 200, name: '一般'},
            {value: 400, name: '特殊'},
            {value: 400, name: '紧急'},],
        ],
      }
    },
    mounted() {
      this.show_market = true;
      this.work_info[0].val = '7 h';
      //this.event_data[0].value = 700;
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 1:
            this.searchData = this.staffBookSearch;
            break;
          case 2:
            this.searchData = this.LeaveJobSearch;
            break;
        }
      },

      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          switch (this.chooseTab) {
            case 1:
              this.searchFruit1 = val;
              break;
            case 2:
              this.searchFruit2 = val;
              break;
          }
        }
      },

      handleChangeDate(id) {

      },
      handleCloseMenu() {
        this.show_market = false;
      },

      publish() {
        this.reward_order_visible = !this.reward_order_visible;
      },
      exchange() {
        this.exchange_rules_visible = !this.exchange_rules_visible;
      },


      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 1:
              this.searchFruit1 = this.handleSearch(this.staffBookSearch);
              break;
          }
        });
        this.$store.dispatch('route_animation');
      },
      hiddenOrgan(val) {
        this.organModule = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/reward/index.scss";

  @mixin rewardImg($m, $n) {
    $url: '../../../assets/image/humanResource/reward/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #reward {
      .listTopRight {
        .icons-font {
          @include rewardImg('fabang.png', 'theme1');
        }
      }

      .reward-container {

        .content {
          @include rewardImg('sffmbj.png', 'theme1');

          .left {
            @include rewardImg('yslx.png', 'theme1')
          }

          .right {
            @include rewardImg('celw.png', 'theme1')
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #reward {

    }
  }

  #theme_name.theme3 {
    #reward {

    }
  }

  #theme_name.theme4 {
    #reward {

    }
  }
</style>
