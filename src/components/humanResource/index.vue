<template>
  <div id="humanResource">
    <div>
      <div id="menuList">
        <div class="justify-around" :class="{'menuList': menuList}">
          <div v-for="item in 6" class="flex-center menu" :class="['menu-' + item]">
            <div class="childrenMenu flex-center" @click="routerLink('recruitment')">
              <span class="writingMode">招兵买马</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="menuList = true">111111111</div>
    <div @click="menuList = false">22222222</div>
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

  @mixin humanImg($m, $n) {
    $url: '../../assets/image/humanResource/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #humanResource {
      > div {
        #menuList {
          > div {
            .menu-1, .menu-5 {
              .childrenMenu {
                @include humanImg('huidi1.png', 'theme1');
                &:hover {
                  @include humanImg('hongdi1.png', 'theme1');
                }
              }
            }
            .menu-2, .menu-6 {
              .childrenMenu {
                @include humanImg('huidi2.png', 'theme1');
                &:hover {
                  @include humanImg('hongdi2.png', 'theme1');
                }
              }
            }
            .menu-3 {
              .childrenMenu {
                @include humanImg('huidi3.png', 'theme1');
                &:hover {
                  @include humanImg('hongdi3.png', 'theme1');
                }
              }
            }
            .menu-4 {
              .childrenMenu {
                @include humanImg('huidi4.png', 'theme1');
                &:hover {
                  @include humanImg('hongdi4.png', 'theme1');
                }
              }
            }
          }
        }
      }
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
