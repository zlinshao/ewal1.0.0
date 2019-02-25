<template>
  <div id="finance" class="flex-center">
    <div class="justify-around" style="padding: 95px 0;">
      <div class="mainList" v-for="item in 5" style="border:1px solid #CF2E33;width: 25%;"></div>
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
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/finance/index.scss";

  @mixin financeImg($m, $n) {
    $url: '../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #finance {
      @include financeImg('ditu.png', 'theme1');
      > div {
        @include financeImg('beijingtu.png', 'theme1');
      }
    }
  }

  #theme_name.theme2 {
    #finance {

    }
  }

  #theme_name.theme3 {
    #finance {

    }
  }

  #theme_name.theme4 {
    #finance {

    }
  }
</style>
