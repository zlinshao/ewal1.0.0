<template>
  <div id="recruitment">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b>...</b>
          </p>
          <h1>招兵买马</h1>
          <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <el-button size="mini" type="warning" plain v-if="chooseTab === 2" @click="ms_add_visible = true">添加面试人</el-button>
          <el-button size="mini" type="success" plain v-if="chooseTab === 2" style="margin-right: 10px" @click="msg_add_visible = true">添加面试官</el-button>
          <div class="icons add" v-if="chooseTab === 1" @click="mb_add_visible = true"><b>+</b></div>
          <div class="icons search" @click="showSearch = true"></div>
        </div>
      </div>
      <div class="recruitment_main">
        <part-one
          v-if="chooseTab === 1"
          :add-modules="mb_add_visible"
          @close="mb_add_visible = false"
        ></part-one>
        <part-two
          v-if="chooseTab === 2"
          :add-interviewer-visible="ms_add_visible"
          @closeMs="ms_add_visible = false"
          :add-offer-visible="msg_add_visible"
          @closeMsg="msg_add_visible = false"
        ></part-two>
        <part-three v-if="chooseTab === 3"></part-three>
        <part-four v-if="chooseTab === 4"></part-four>
      </div>
      <!--高级搜索-->
      <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    </div>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import PartOne from './components/part_one/index.vue'; //募兵行列
  import PartTwo from './components/part_two/index.vue'; //分取科士
  import PartThree from './components/part_three/index.vue'; //殿试会师
  import PartFour from './components/part_four/index.vue'; //榜上有名

  export default {
    name: "index",
    components: { SearchHigh,PartOne,PartTwo,PartThree,PartFour },
    data() {
      return {
        //导航
        selects: [
          {id: 1, title: '募兵行列'},
          {id: 2, title: '分取科士'},
          {id: 3, title: '殿试会师'},
          {id: 4, title: '榜上有名'}
        ], //模块列表
        chooseTab: 2, //当前选中模块

        //搜索
        showSearch: false,
        searchData: [],

        //募兵行列
        mb_add_visible: false,

        //添加面试人
        ms_add_visible: false,

        //添加面试官
        msg_add_visible: false
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },
      //关闭搜索
      hiddenModule() {
        this.showSearch = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/recruitment/index.scss";

  @mixin recruitmentImg($m, $n) {
    $url: '../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #recruitment {
      height: 100%;
      > div {
        height: 100%;
        .recruitment_main {
          width: 100%;
          height: calc(100% - 90px);
        }
      }
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
