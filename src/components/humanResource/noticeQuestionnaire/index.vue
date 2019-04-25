<template>
  <div id="nq">
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>公告问卷</h1>
        <h2 class="items-center" v-if="chooseTab">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<div class="icons-font" @click="publish(chooseTab)" v-if="chooseTab === 1|| chooseTab===2"><b>发榜</b></div>-->
        <!--<div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 1"><b>发公告</b></div>
        <div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 2"><b>调查问卷</b></div>-->
        <div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>
      </div>
    </div>

    <div class="main-container nq-container" v-if="!chooseTab">
      <div class="content flex-center" >
        <div class="left flex-center" @click="chooseTab=1"><span>公告</span></div>
        <div class="right flex-center" @click="chooseTab=2"><span class="gray">问卷调查</span></div>
      </div>
    </div>
    <!--组件-->
    <div class="up" v-if="chooseTab==1">
      <Notice :searchVal="searchFruit1"></Notice>
    </div>

    <!--组件-->
    <div class="down" v-if="chooseTab==2">
      <Questionnaire :searchVal="searchFruit2"></Questionnaire>
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
  import MenuList from '../../common/menuList.vue';
  import Notice from './notice/index.vue';//公告
  import Questionnaire from './questionnaire/index.vue';//问卷调查
  import WorkInfo from './components/workInfo/work-info';
  import LjDialog from '../../common/lj-dialog.vue';
  import SearchHigh from '../../common/searchHigh.vue';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import {noticeSearch, questionnaireSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      Notice,
      Questionnaire,
      WorkInfo,
      LjDialog,
      SearchHigh,
      StaffOrgan,
    },
    data() {
      return {
        noticeSearch,
        questionnaireSearch,
        humanResource,
        resourceDepart,
        selects: [
          {
            id: 1,
            title: '公告',
          },
          {
            id: 2,
            title: '调查问卷',
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
            this.searchData = this.noticeSearch;
            break;
          case 2:
            this.searchData = this.questionnaireSearch;
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
  @import "../../../assets/scss/humanResource/noticeQuestionnaire/index.scss";

  @mixin nqImg($m, $n) {
    $url: '../../../assets/image/humanResource/noticeQuestionnaire/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #nq {
      .listTopRight {
        .icons-font {
          @include nqImg('fabang.png', 'theme1');
        }
      }

      .nq-container {

        .content {
          @include nqImg('sffmbj.png', 'theme1');

          .left {
            @include nqImg('yslx.png', 'theme1');
          }

          .right {
            @include nqImg('celw.png', 'theme1');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #nq {

    }
  }

  #theme_name.theme3 {
    #nq {

    }
  }

  #theme_name.theme4 {
    #nq {

    }
  }
</style>
