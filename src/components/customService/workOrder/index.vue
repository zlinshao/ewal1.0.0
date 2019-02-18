<template>
  <div id="workOrder">
    <div>
      工单2131
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
  @import "../../../assets/scss/customService/workOrder/index.scss";

  @mixin workOrderImg($m, $n) {
    $url: '../../../assets/image/workOrder/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #workOrder {

    }
  }

  #theme_name.theme2 {
    #workOrder {

    }
  }

  #theme_name.theme3 {
    #workOrder {

    }
  }

  #theme_name.theme4 {
    #workOrder {

    }
  }
</style>
