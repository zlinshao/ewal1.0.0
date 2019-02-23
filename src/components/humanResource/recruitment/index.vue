<template>
  <div id="recruitment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>研发中心</h1>
      </div>
      <div class="items-center listTopRight">
        <p class="flex-center"><b>+</b></p>
        <p @click="highSearch"></p>
      </div>
    </div>
    <div class="departList">
      <div class="flex-center borderLine lineTop">
        <b></b>
      </div>
      <div class="flex-center mainList">
        <p v-for="item in 15">
          <span class="writingMode">
            南京乐伽商业管理有限公司
          </span>
        </p>
      </div>
      <div class="flex-center borderLine lineBottom">
        <b></b>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      highSearch() {

      },
      moduleList() {

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
