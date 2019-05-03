<template>
  <div id="repository">
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>资产管理</h1>
        <h2 class="items-center" v-if="chooseTab">
          <span v-for="(item,index) in selects" @click="changeTabs(item.id)" :key="index" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click="inRepositoryHandler(chooseTab)" v-if="chooseTab === 1"><b>+</b></div>
        <div class="icons add" @click="addDialog(chooseTab)" v-if="chooseTab === 3 || chooseTab===4"><b>+</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>
      </div>
    </div>

    <div v-if="!chooseTab" class="main-container repository-container">
      <div class="content flex-center" v-if="!chooseTab">
        <div class="bg-container flex-center" @click="chooseTab=1"><span>库存管理</span></div>
        <div class="bg-container flex-center" @click="chooseTab=2"><span>领用借用</span></div>
        <div class="bg-container flex-center" @click="chooseTab=3"><span>资料库</span></div>
        <div class="bg-container flex-center" @click="chooseTab=4"><span>办公住宿</span></div>
      </div>
      <work-info v-show="!chooseTab" :work-info="work_info" :attend-data="attend_data" :event-data="event_data"
                 @change="handleChangeDate"></work-info>
    </div>
    <!--库房总览-->
    <div v-if="chooseTab==1">
      <OverView :searchVal="searchFruit1" :in_repository_visible="in_repository_visible" ></OverView>
    </div>

    <!--借用领用-->
    <div v-if="chooseTab==2">
      <borrow-receive :searchVal="searchFruit2"></borrow-receive>
    </div>

    <div v-if="chooseTab==3">
      <data-base :addContract_visiable="addContract_visiable" @changeAddContrat="changeAddContrat"></data-base>
    </div>
    <div v-if="chooseTab==4">
      <office-dormitory :addOffice_visiable="addOffice_visiable" 
                        :addDormitory_visiable="addDormitory_visiable" 
                        @closeAddOffice="closeAddOffice" 
                        @closeAddDormitory="closeAddDormitory"
                        @officeDormitoryChoose="officeDormitoryChoose"
                        >
      </office-dormitory>
    </div>
    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
  </div>
</template>

<script>
  import LjUpload from '../../common/lightweightComponents/lj-upload';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import OverView from './overView/index.vue';//库房总览
  import ImgSlider from '../../common/lightweightComponents/ImgSlider';
  import BorrowReceive from './borrowReceive/index';//借用领用
  import DataBase from './dataBase/index';//资料库
  import OfficeDormitory from './officeDormitory/index';
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
      LjUpload,
      ImgSlider,
      DataBase,//资料库
      OfficeDormitory,//办公室宿舍管理
    },
    data() {
      return {
        overViewSearch,
        borrowReceiveSearch,
        humanResource,
        resourceDepart,
        url: globalConfig.humanResource_server,
        addContract_visiable: false,//是否显示添加合同弹窗传递给资料库 传给子组件
        addOffice_visiable: false,//是否添加办公室传递给子组件
        addDormitory_visiable: false,//是否添加宿舍传递给子组件
        officeDormitoryChoosed: 0,//子组件是办公室或者宿舍
        selects: [
          {
            id: 1,
            title: '库存管理',
          },
          {
            id: 2,
            title: '领用借用',
          },
          {
            id: 3,
            title: '资料库',
          },
          {
            id: 4,
            title: "办公室/宿舍管理"
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
        //show_market: false,
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
      //this.show_market = true;
      this.work_info[0].val = '7 h';
      this.event_data[0].value = 700;
      this.attend_data[0] = 9;
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
        //debugger
        if (val !== 'close') {
          switch (this.chooseTab) {
            case 1:
              this.searchFruit1 = _.cloneDeep(val);
              break;
            case 2:
              this.searchFruit2 = _.cloneDeep(val);
              break;
          }
        }
      },

      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
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
              this.searchFruit1 = this.handleSearch(this.borrowReceiveSearch);
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
      //通过字符组件传值判断是否显示添加合同,添加办公室,添加宿舍弹窗
      addDialog(chooseTab){
        if(chooseTab == 3){
          this.addContract_visiable= true
        }
        if(chooseTab == 4) {
          if(this.officeDormitoryChoosed == 0){
            this.addOffice_visiable= true
          }else{
            this.addDormitory_visiable = true
          }
        }
      },
      changeAddContrat(val){
        this.addContract_visiable= val
      },
      closeAddOffice(val){
        this.addOffice_visiable = val
      },
      closeAddDormitory(val){
        this.addDormitory_visiable = val
      },
      officeDormitoryChoose(val){
        this.officeDormitoryChoosed = val
      }
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

          .bg-container {
            @include repositoryImg('sywx.png', 'theme1');

            &:hover {
              @include repositoryImg('syxz.png', 'theme1');
            }
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
