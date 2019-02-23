<template>
  <div id="staffRoster">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>员工名册</h1>
      </div>
      <div class="items-center listTopRight">
        <div class="searchTerm">
          <el-checkbox v-model="checked">离职员工</el-checkbox>
        </div>
        <div class="buttons">设置报表</div>
        <div class="buttons">导出报表</div>
        <!--<div class="icons add"><b>+</b></div>-->
        <!--<div class="icons search" @click="highSearch"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        checked: false,
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

      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/staffRoster/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/humanResource/staffRoster/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffRoster {

    }
  }

  #theme_name.theme2 {
    #staffRoster {

    }
  }

  #theme_name.theme3 {
    #staffRoster {

    }
  }

  #theme_name.theme4 {
    #staffRoster {

    }
  }
</style>
