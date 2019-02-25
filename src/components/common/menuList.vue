<template>
  <div id="menuList">
    <div class="justify-around list" :class="{'menuList': routeAnimation}">
      <div v-for="item in 6" class="flex-center menu" :class="['menu-' + item]">
        <div class="childrenMenu flex-center" @click="routerLink('recruitment')">
          <span class="writingMode">招兵买马</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu-list",
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      routeAnimation() {
        return this.$store.state.app.routeAnimation;
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/menuList.scss";

  @mixin menuImg($m, $n) {
    $url: '../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #menuList {
      .list {
        .menu-1, .menu-5 {
          .childrenMenu {
            @include menuImg('humanresourcehuidi1.png', 'theme1');
            &:hover {
              @include menuImg('humanresourcehongdi1.png', 'theme1');
            }
          }
        }
        .menu-2, .menu-6 {
          .childrenMenu {
            @include menuImg('humanresourcehuidi2.png', 'theme1');
            &:hover {
              @include menuImg('humanresourcehongdi2.png', 'theme1');
            }
          }
        }
        .menu-3 {
          .childrenMenu {
            @include menuImg('humanresourcehuidi3.png', 'theme1');
            &:hover {
              @include menuImg('humanresourcehongdi3.png', 'theme1');
            }
          }
        }
        .menu-4 {
          .childrenMenu {
            @include menuImg('humanresourcehuidi4.png', 'theme1');
            &:hover {
              @include menuImg('humanresourcehongdi4.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #menuList {

    }
  }

  #theme_name.theme3 {
    #menuList {

    }
  }

  #theme_name.theme4 {
    #menuList {

    }
  }
</style>
