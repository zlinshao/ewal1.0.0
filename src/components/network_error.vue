<template>
    <div id="network_error" class="flex-center">
      <div class="content">
        <span class="writingMode">网络已断开 <b>.&nbsp;.&nbsp;.&nbsp;</b>  <a @click="$router.go(-1)">重新加载</a></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
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
  @import "../assets/scss/network_error/index";

  @mixin net_errorImg($m, $n) {
    $url: '../assets/image/net_error/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1{
    #network_error{
      .content{
        @include net_errorImg('yueliang.png','theme1');
        background-size: 80%;
      }
    }
  }
</style>
