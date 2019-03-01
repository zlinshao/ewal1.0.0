<template>
  <div id="recruitment">
    <!--<Upload :file="photo1"></Upload>-->
    <!--<Upload :file="photo2"></Upload>-->
    <el-radio-group v-model="radio2">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>研发中心</h1>
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
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import {recruitmentSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList, SearchHigh, Upload},
    data() {
      return {
        radio2: '',
        recruitmentSearch,
        humanResource,
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
