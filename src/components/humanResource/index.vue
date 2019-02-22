<template>
  <div id="humanResource">
    <div @click="menuList = true">111111111</div>
    <div @click="menuList = false">22222222</div>
    <div>
      <div id="menuList">
        <div class="justify-around" :class="{'menuList': menuList}">
          <div v-for="item in 6" class="flex-center menu" :class="['menu' + item]">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        menuList: false,
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

  @mixin mobanImg($m, $n) {
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
