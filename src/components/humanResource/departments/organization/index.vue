<template>
  <div id="organization">
    <div>
      <p>南京乐伽商业管理有限公司</p>
      <div class="organ-tree">
        <!--<div class="radius-container">总裁办</div>-->
        <div class="flex-center">
          <div class="area-container writingMode">
            <span class="line-up"></span>
            <p class="bold">研发中心</p>
            <p>张楚岚</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'tree',
    components: {},
    data() {
      return {
        url: globalConfig.server,
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/organization/index.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #organization {

    }
  }

  #theme_name.theme2 {
    #organization {

    }
  }

  #theme_name.theme3 {
    #organization {

    }
  }

  #theme_name.theme4 {
    #organization {

    }
  }
</style>
