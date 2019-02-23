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
        <p class="flex-center"><b>+</b></p>
        <p @click="highSearch"></p>
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
      moduleList() {

      },
      highSearch() {

      }
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
