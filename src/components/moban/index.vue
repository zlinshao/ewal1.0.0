<template>
  <div id="moban">
    <div>
      模板
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
  @import "../../assets/scss/moban/index.scss";

  @mixin mobanImg($m, $n) {
    $url: '../../assets/image/moban/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #moban {

    }
  }

  #theme_name.theme2 {
    #moban {

    }
  }

  #theme_name.theme3 {
    #moban {

    }
  }

  #theme_name.theme4 {
    #moban {

    }
  }
</style>
