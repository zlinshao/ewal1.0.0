<template>
  <div id="brand">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <h2>知识产权保护</h2>
          <h2 class="items-center">
            <span v-for="(item,index) in intellectualPropertyProtection.data" @click="changeTabs(item)" class="items-column" :key="index"
                  :class="{'chooseTab': chooseTab === index}">
              {{item.title}}<i></i>
            </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons add"><b>+</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {intellectualPropertyProtection} from '../../../assets/js/allModuleList.js';
  export default {
    name: "index",
    data() {
      return {
        intellectualPropertyProtection,
        chooseTab:3
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      changeTabs: function(item) {
        this.routerLink(item.url);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/intellectualPropertyProtection/brand/index.scss";

  @mixin mobanImg($m, $n) {
    $url: '../../../assets/image/intellectualPropertyProtection/brand/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #brand {
      background-color: $colorFFF;
    }
  }

  #theme_name.theme2 {
    #brand {

    }
  }

  #theme_name.theme3 {
    #brand {

    }
  }

  #theme_name.theme4 {
    #brand {

    }
  }
</style>
