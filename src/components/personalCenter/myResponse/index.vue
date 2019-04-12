<template>
  <div id="my_response">
    我的回复
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
    #my_response {

    }
  }

  #theme_name.theme2 {
    #my_response {

    }
  }

  #theme_name.theme3 {
    #my_response {

    }
  }

  #theme_name.theme4 {
    #my_response {

    }
  }


</style>
