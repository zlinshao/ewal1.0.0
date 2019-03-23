<template>
  <div id="discussPolitics" class="discuss-politics">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>奏事议政</h1>
        <h2 class="items-center" v-if="chooseTab">
          <!--<span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>-->
          <!--<div class="block">
            <span class="demonstration">月</span>
            <el-date-picker
              v-model="dateValue"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>-->
        </h2>
      </div>
      <!--<div class="items-center listTopRight">-->
        <!--<div class="icons-font" @click="publish(chooseTab)" v-if="chooseTab === 1|| chooseTab===2"><b>发榜</b></div>-->
        <!--<div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 1"><b>兑换</b></div>-->
        <!--<div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>-->
      <!--</div>-->
    </div>

    <div class="main-container reward-container">
      <!--<div class="content flex-center" v-if="!chooseTab">-->
        <!--<div class="left flex-center" @click="chooseTab=1"><span>扬善令</span></div>-->
        <!--<div class="right flex-center" @click="chooseTab=2"><span class="gray">惩恶令</span></div>-->
      <!--</div>-->
    </div>


    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

  </div>
</template>

<script>
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      LjDialog,
    },
    data() {
      return {
        humanResource,
        resourceDepart,

        organModule: false,//组织架构
        chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        dateValue:'2019-02'

      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/humanResource/discussPolitics/index";
</style>
