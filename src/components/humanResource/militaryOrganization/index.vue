<template>
  <div id="militaryOrganization" class="militaryOrganization">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="moduleList">
            <b>...</b>
          </p>
          <h1>培训考核</h1>
          <h2 v-if="chooseTab" class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
          </h2>
        </div>
        <div v-if="chooseTab" class="items-center listTopRight">
          <!--<div class="icons add" @click="new_train_visible = true"><b>+</b></div>-->
          <div class="icons search" @click="highSearch(chooseTab)"></div>
        </div>
      </div>


      <div v-if="!chooseTab" class="main-container military-container">
        <div class="content flex-center" v-if="!chooseTab">
          <div class="flex-center" @click="chooseTab=1">
            <div class="bg-kaoqin bg-container"></div>
            <div class="below-container">
              <div class="container-left">考勤</div>
              <div class="container-right">
                <span class="writingMode">月度汇总</span>
                <span class="writingMode">考勤确认表</span>
              </div>
            </div>
          </div>
          <div class="flex-center" @click="chooseTab=2">
            <div class="bg-peixun bg-container"></div>
            <div class="below-container">
              <div class="container-left">培训</div>
              <div class="container-right">
                <span class="writingMode">培训课程</span>
                <span class="writingMode">考试设置</span>
              </div>
            </div>
          </div>
          <div class="flex-center" @click="chooseTab=3">
            <div class="bg-kaohe bg-container"></div>
            <div class="below-container">
              <div class="container-left">考核</div>
              <div class="container-right">
                <span class="writingMode">KPI考核</span>
              </div>
            </div>
          </div>
        </div>
        <work-info v-show="!chooseTab" :work-info="work_info" :attend-data="attend_data" :event-data="event_data"
                   @change="handleChangeDate"></work-info>
      </div>

      <!--考勤模块-->
      <attence v-if="chooseTab==1"></attence>
      <!--培训模块-->
      <train v-if="chooseTab==2"></train>
      <!--薪资模块-->
      <kpi v-if="chooseTab==3"></kpi>

      <!--模块入口-->
      <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true"
                @close="visibleStatus = false"></MenuList>
      <!--高级搜索-->
      <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    </div>
  </div>
</template>

<script>
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import SearchHigh from '../../common/searchHigh.vue';//高级搜索

  import WorkInfo from '../../common/work-info';
  import Train from './train/index';//培训模块
  import Kpi from './kpi/index';//kpi
  import Attence from './attence/index';//考勤

  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';
  import {overViewSearch, borrowReceiveSearch} from '../../../assets/js/allSearchData.js';


  export default {
    name: "index",
    components: {
      WorkInfo,
      LjDialog,
      MenuList,
      SearchHigh,
      Attence,//考勤
      Train,//培训
      Kpi,//考核
    },
    data() {
      return {
        humanResource,
        resourceDepart,
        overViewSearch,
        borrowReceiveSearch,

        //common
        visibleStatus: false,//弹出部门
        showSearch: false,//高级搜索
        searchData: {},//搜索项
        selects: [
          {id: 1, title: '考勤'},
          {id: 2, title: '培训'},
          {id: 3, title: '考核'},
        ], //模块列表
        chooseTab: 0, //当前选中模块


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
        attend_data: [10, 5, 2]
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 3:
            this.searchData = this.overViewSearch;
            console.log(this.searchData)
            break;
          case 4:
            this.searchData = this.borrowReceiveSearch;
            console.log(this.searchData)
            break;
        }
      },

      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },

      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },


      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },

    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/militaryOrganization/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .militaryOrganization {

      .military-container {

        .content {

          /*.left {
            @include repositoryImg('kfzlx.png', 'theme1')
          }

          .right {
            @include repositoryImg('lwkfw.png', 'theme1')
          }*/
          .bg-kaoqin {
            @include militaryImg('m.png', 'theme1');
            &:hover {
              @include militaryImg('j.png', 'theme1');
            }
          }

          .bg-peixun {
            @include militaryImg('k.png', 'theme1');
            &:hover {
              @include militaryImg('n.png', 'theme1');
            }
          }

          .bg-kaohe {
            @include militaryImg('l.png', 'theme1');
            &:hover {
              @include militaryImg('o.png', 'theme1');
            }
          }

        }
      }
    }
  }
</style>
