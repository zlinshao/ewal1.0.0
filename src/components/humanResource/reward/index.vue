<template>
  <div id="reward">
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>赏罚分明</h1>
        <h2 class="items-center" v-if="chooseTab">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons-font" @click="publish(chooseTab)" v-if="chooseTab === 1|| chooseTab===2"><b>发榜</b></div>
        <div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 1"><b>兑换</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>
      </div>
    </div>

    <div class="main-container reward-container">
      <div class="content flex-center" v-if="!chooseTab">
        <div class="left flex-center" @click="chooseTab=1"><span>扬善令</span></div>
        <div class="right flex-center" @click="chooseTab=2"><span class="gray">惩恶令</span></div>
      </div>
    </div>
    <!--扬善组件-->
    <div class="up" v-if="chooseTab==1">
      <RewardUp :searchVal="searchFruit1" :reward_order_visible="reward_order_visible"
                :exchange_rules_visible="exchange_rules_visible"></RewardUp>
    </div>

    <!--惩恶组件-->
    <div class="down" v-if="chooseTab==2">
      <RewardDown :searchVal="searchFruit2" :reward_order_visible="reward_order_visible"></RewardDown>
    </div>


    <work-info v-show="chooseTab" :work-info="work_info" :event-data-list="event_data_list"
               @change="handleChangeDate"></work-info>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
  </div>
</template>

<script>
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import RewardUp from './rewardUp/index.vue';//扬善组件
  import RewardDown from './rewardDown/index.vue';//惩恶组件
  import WorkInfo from './components/workInfo/work-info';
  import LjDialog from '../../common/lj-dialog.vue';
  import SearchHigh from '../../common/searchHigh.vue';
  import {rewardUpSearch, rewardDownSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';


  export default {
    name: "index",
    components: {
      StaffOrgan,
      MenuList,
      Upload,
      RewardUp,
      RewardDown,
      WorkInfo,
      LjDialog,
      SearchHigh,
    },
    data() {
      return {
        rewardUpSearch,
        rewardDownSearch,
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
        exchange_rules_visible: false,

        //侧滑栏数据
        show_market: false,
        work_info: [
          {work: '穿铠甲', val: '10'},
          {work: '攻下小城池', val: '6'},
          {work: '攻下大城池', val: '3'},
          {work: '攻下国家', val: '3'},
        ],

        event_data_list: [
          {
            title:'事件占有率:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'十佳萌新:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'十佳老司机:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'赏善令:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          }
        ],


        // event_data_list: [
        //   [{value: 500, name: '一般'},
        //     {value: 300, name: '特殊'},
        //     {value: 200, name: '紧急'},],
        //   [{value: 400, name: '一般'},
        //     {value: 300, name: '特殊'},
        //     {value: 300, name: '紧急'},],
        //   [{value: 200, name: '一般'},
        //     {value: 400, name: '特殊'},
        //     {value: 400, name: '紧急'},],
        // ],
        event_data: [
          {value: 500, name: '一般'},
          {value: 300, name: '特殊'},
          {value: 200, name: '紧急'}
        ],
      }
    },
    mounted() {
      this.show_market = true;
      //this.work_info[0].val = '7';
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
            this.searchData = this.rewardUpSearch;
            break;
          case 2:
            this.searchData = this.rewardDownSearch;
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
