<template>
    <div id="jurisdiction" class="flex-center">
      <div class="content">
        <span class="writingMode">没有权限<b>.&nbsp;.&nbsp;.&nbsp;</b></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/jurisdiction/index";

  @mixin jurisdictionImg($m, $n) {
    $url: '../assets/image/jurisdiction/' + $n + '/' + $m;
    @include bgImage($url);
  }
  #theme_name.theme1{
    #jurisdiction{
      .content{
        @include jurisdictionImg('huanghelou.png','theme1');
        background-size: 80%;
      }
    }
  }
  #theme_name.theme2{
    #jurisdiction{
      .content{

      }
    }
  }
  #theme_name.theme3{
    #jurisdiction{
      .content{

      }
    }
  }
  #theme_name.theme4{
    #jurisdiction{
      .content{

      }
    }
  }
</style>
