<template>
  <div id="nq">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>公告问卷</h1>
        <h2 class="items-center" v-if="$route.path!=='/noticeQuestionnaire'">
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
        <div class="icons search" @click="highSearch(chooseTab)" v-if="$route.path!=='/noticeQuestionnaire'"></div>
      </div>
    </div>

    <div class="main-container nq-container" v-if="$route.path=='/noticeQuestionnaire' && !chooseTab">
      <div class="content flex-center" >
        <div class="left flex-center" @click="chooseTab=1"><span>公告</span></div>
        <div class="right flex-center" @click="chooseTab=2"><span class="gray">问卷调查</span></div>
      </div>
    </div>
    <!--组件-->
<!--    <div v-if="chooseTab==1">-->
<!--      <Notice :searchVal="searchFruit1"></Notice>-->
<!--    </div>-->

<!--    &lt;!&ndash;组件&ndash;&gt;-->
<!--    <div v-if="chooseTab==2">-->
<!--      <Questionnaire :searchVal="searchFruit2"></Questionnaire>-->
<!--    </div>-->
    <div>
      <router-view></router-view>
    </div>



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
  import SearchHigh from '../../common/searchHigh.vue';
  import {noticeSearch, questionnaireSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      Notice,
      Questionnaire,
      WorkInfo,
      SearchHigh,
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
        chooseTab: null,//tab切换
        visibleStatus: false,//弹出列表

        showSearch: false,//高级搜索
        searchData: {},//搜索项


        searchFruit1: {},//搜索结果1
        searchFruit2: {},//搜索结果2

      }
    },
    mounted() {},
    watch: {
      chooseTab: {
        handler(val,oldVal) {
          if(val==1) {
            this.routerLink('/noticeQuestionnaire/notice');
          }else if(val==2) {
            this.routerLink('/noticeQuestionnaire/questionnaire');
          }
        },
        immediate:true,
      },
      '$route.path': {
        handler(val) {
          if(val=='/noticeQuestionnaire/notice') {
            this.chooseTab = 1;
          }else if(val=='/noticeQuestionnaire/questionnaire') {
            this.chooseTab = 2;
          }
        },
        deep:true,
        immediate:true
      },
    },
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
              this.searchFruit1 = JSON.parse(JSON.stringify(val));
              this.$bus.$emit('noticeSearchVal',this.searchFruit1);
              break;
            case 2:
              this.searchFruit2 = JSON.parse(JSON.stringify(val));
              this.$bus.$emit('questionnaireSearchVal',this.searchFruit2);
              break;
          }
        }
      },

      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 1:
              this.searchFruit1 = this.handleSearch(this.noticeSearch);
              break;
          }
        });
        this.$store.dispatch('route_animation');
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
