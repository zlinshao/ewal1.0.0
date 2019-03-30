<template>
  <div id="repository">
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>内务库房</h1>
        <h2 class="items-center" v-if="chooseTab">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons-font" @click="demo"><b>测试</b></div>
        <div class="icons-font" @click="inRepositoryHandler(chooseTab)" v-if="chooseTab === 1"><b>入库</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>
      </div>
    </div>

    <div class="main-container repository-container">
      <div class="content flex-center" v-if="!chooseTab">
        <div class="left flex-center" @click="chooseTab=1"><span>库房总览</span></div>
        <div class="right flex-center" @click="chooseTab=2"><span class="gray">借用领用</span></div>
      </div>
      <work-info v-show="!chooseTab" :work-info="work_info" :attend-data="attend_data" :event-data="event_data"
                 @change="handleChangeDate"></work-info>
    </div>
    <!--库房总览-->
    <div class="up" v-if="chooseTab==1">
      <OverView :searchVal="searchFruit1" :in_repository_visible="in_repository_visible" ></OverView>
    </div>

    <!--借用领用-->
    <div class="down" v-if="chooseTab==2">
      <borrow-receive :searchVal="searchFruit2"></borrow-receive>
    </div>




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
  import OverView from './overView/index.vue';//库房总览
  import BorrowReceive from './borrowReceive/index';//借用领用
  import WorkInfo from '../../common/work-info';
  import LjDialog from '../../common/lj-dialog.vue';
  import SearchHigh from '../../common/searchHigh.vue';
  import {overViewSearch, borrowReceiveSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';


  export default {
    name: "index",
    components: {
      StaffOrgan,
      MenuList,
      Upload,
      OverView,
      BorrowReceive,
      WorkInfo,
      LjDialog,
      SearchHigh,
    },
    data() {
      return {
        overViewSearch,
        borrowReceiveSearch,
        humanResource,
        resourceDepart,
        selects: [
          {
            id: 1,
            title: '库房总览',
          },
          {
            id: 2,
            title: '借用领用',
          }
        ],//tab切换

        organModule: false,//组织架构
        chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        showSearch: false,//高级搜索
        searchData: {},//搜索项


        searchFruit1: {},//库房总览搜索结果
        searchFruit2: {},//借用领用搜索结果


        //入库控制
        in_repository_visible:false,

        //侧滑栏数据
        show_market: false,
        work_info: [
          {work: '平均在线时长', val: '8 h'},
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
          {work: '本周处理事件数', val: '35 件'},
        ],
        event_data:[
          {value: 500, name: '一般'},
          {value: 300, name: '特殊'},
          {value: 200, name: '紧急'},
        ],
        attend_data:[10,5,2]
      }
    },
    mounted() {
      this.show_market = true;
      this.work_info[0].val = '7 h';
      this.event_data[0].value = 700;
      this.attend_data[0] = 9;
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      demo() {

        this.$LjConfirm({
          icon:'delete'
        }).then(()=> {
          //点确定执行的方法
        }).catch(() => {
          //点取消执行的方法
          //一般情况下可以省略catch方法
        })


        /*this.$LjConfirm(
          /!*{
          confirmText:'确定',
          cancelText:'取消',
          icon:'delete',
        }*!/
        ).then(() => {
          //点是
          alert('是');
        }).catch(() => {
          //点否
        });*/


        this.$LjConfirm(
          {
          icon:'delete',
        }
        ).then(() => {
          //点是
          alert('是');
        }).catch(() => {
          //点否
        });
      },
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 1:
            this.searchData = this.overViewSearch;
            break;
          case 2:
            this.searchData = this.borrowReceiveSearch;
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
      //入库按钮点击事件
      inRepositoryHandler() {
        this.in_repository_visible = !this.in_repository_visible;
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
  @import "../../../assets/scss/humanResource/repository/index.scss";

  @mixin repositoryImg($m, $n) {
    $url: '../../../assets/image/humanResource/repository/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #repository {
      .listTopRight {
        .icons-font {
          @include repositoryImg('fabang.png', 'theme1');
        }
      }

      .repository-container {

        .content {
          //@include repositoryImg('sffmbj.png', 'theme1');

          .left {
            @include repositoryImg('kfzlx.png', 'theme1')
          }

          .right {
            @include repositoryImg('lwkfw.png', 'theme1')
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #repository {

    }
  }

  #theme_name.theme3 {
    #repository {

    }
  }

  #theme_name.theme4 {
    #repository {

    }
  }
</style>
