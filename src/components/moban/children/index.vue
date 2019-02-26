<template>
  <div id="children">
    <div>
      children
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
  @import "../../../assets/scss/moban/children/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/moban/children/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #children {

    }
  }

  #theme_name.theme2 {
    #children {

    }
  }

  #theme_name.theme3 {
    #children {

    }
  }

  #theme_name.theme4 {
    #children {

    }
  }
</style>
