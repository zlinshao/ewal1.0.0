<template>
  <div id="humanResource">
    <div>
      <MenuList :list="humanResource" :module="true"></MenuList>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import MenuList from '../common/menuList.vue'
  import {humanResource} from '../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList},
    data() {
      return {
        humanResource,
      }
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
  @import "../../assets/scss/humanResource/index.scss";

  @mixin humanImg($m, $n) {
    $url: '../../assets/image/humanResource/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #humanResource {

    }
  }

  #theme_name.theme2 {
    #humanResource {

    }
  }

  #theme_name.theme3 {
    #humanResource {

    }
  }

  #theme_name.theme4 {
    #humanResource {

    }
  }
</style>
