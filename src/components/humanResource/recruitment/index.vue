<template>
  <div id="recruitment">
    <!--<Upload :file="photo1"></Upload>-->
    <!--<Upload :file="photo2"></Upload>-->
    <StaffOrgan :module="organModule"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1 @click="organModule = true">研发中心</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="departList">
      <div class="flex-center borderLine lineTop">
        <b></b>
      </div>
      <div class="flex-center mainList" :class="{'mainListHover': routeAnimation}">
        <p v-for="item in 16">
          <span class="writingMode">
            南京乐伽商业管理有限公司
          </span>
        </p>
      </div>
      <div class="flex-center borderLine lineBottom">
        <b></b>
      </div>
    </div>
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import {recruitmentSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList, SearchHigh, Upload, StaffOrgan},
    data() {
      return {
        recruitmentSearch,
        humanResource,
        chooseTab: 1,
        organModule: false,
        selects: [
          {
            id: 1,
            title: '组织结构图',
          },
          {
            id: 2,
            title: '部门管理',
          },
          {
            id: 3,
            title: '员工名册',
          },
          {
            id: 4,
            title: '离职管理',
          }
        ],
        visibleStatus: false,
        showSearch: false,
        searchData: {},
        photo1: {
          keyName: 'photo1',
          setFile: [],
        },
        photo2: {
          keyName: 'photo2',
          setFile: [],
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      routeAnimation() {
        return this.$store.state.app.routeAnimation;
      }
    },
    methods: {
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData = this.recruitmentSearch;
      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/recruitment/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #recruitment {

    }
  }

  #theme_name.theme2 {
    #recruitment {

    }
  }

  #theme_name.theme3 {
    #recruitment {

    }
  }

  #theme_name.theme4 {
    #recruitment {

    }
  }
</style>
