<template>
  <div id="departOrgan">
    部门
  </div>
</template>

<script>
  export default {
    name: "depart-organ",
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
  @import "../../assets/scss/common/departOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../assets/image/departOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departOrgan {

    }
  }

  #theme_name.theme2 {
    #departOrgan {

    }
  }

  #theme_name.theme3 {
    #departOrgan {

    }
  }

  #theme_name.theme4 {
    #departOrgan {

    }
  }
</style>
