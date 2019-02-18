<template>
  <div id="customService">
    <div>
      工单
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
  @import "../../assets/scss/customService/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customService {

    }
  }

  #theme_name.theme2 {
    #customService {

    }
  }

  #theme_name.theme3 {
    #customService {

    }
  }

  #theme_name.theme4 {
    #customService {

    }
  }
</style>
