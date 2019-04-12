<template>
  <div id="sub_log">
    下属日志
  </div>
</template>

<script>

  export default {
    name: "workLog",
    components: {
    },
    data() {
      return {
        url: globalConfig.humanResource_server,

      }
    },
    methods: {
    },
  }
</script>



<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myFavorite/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #sub_log {

    }
  }

  #theme_name.theme2 {
    #sub_log {

    }
  }

  #theme_name.theme3 {
    #sub_log {

    }
  }

  #theme_name.theme4 {
    #sub_log {

    }
  }


</style>
