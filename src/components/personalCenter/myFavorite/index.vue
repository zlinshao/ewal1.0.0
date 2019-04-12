<template>
  <div id="my_favorite">
    <div class="favorite-container">
      <div class="favorite-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-left-static">我的收藏</span>
          <span class="toolbar-left-dynamic">共7个内容</span>
        </div>
        <div class="toolbar-right"></div>
      </div>
      <div class="favorite-table"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "myFavorite",
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
    #my_favorite {

    }
  }

  #theme_name.theme2 {
    #my_favorite {

    }
  }

  #theme_name.theme3 {
    #my_favorite {

    }
  }

  #theme_name.theme4 {
    #my_favorite {

    }
  }


</style>
