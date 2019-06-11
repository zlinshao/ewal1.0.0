<!--敬请期待-->
<template>
    <div id="coming-soon"></div>
</template>

<script>
    export default {
        name: "ComingSoon"
    }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/approval/index.scss";
  @mixin comingSoonImg($m, $n) {
    $url: "../../assets/image/common/" + $n + "/" + $m;
    @include bgImage($url);
  }

  #coming-soon {
    top: 80px;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed !important;
    z-index: 900 !important;
    //@include comingSoonImg('jingqingqidai.png','theme1');
    background: url('../../assets/image/common/theme1/jingqingqidai.png') no-repeat scroll center !important;
    background-size: 100% 100% !important;
  }
</style>
