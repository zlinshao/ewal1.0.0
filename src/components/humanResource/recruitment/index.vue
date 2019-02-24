<template>
  <div id="recruitment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>研发中心{{visibleStatus}}</h1>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="departList">
      <div class="flex-center borderLine lineTop">
        <b></b>
      </div>
      <div class="flex-center mainList" :class="{'mainListHover': routeAnimation}">
        <p v-for="item in 16">
          <span class="writingMode">
            南京乐伽商业管理有限公司
          </span>
        </p>
      </div>
      <div class="flex-center borderLine lineBottom">
        <b></b>
      </div>
    </div>
    <MenuList></MenuList>
  </div>
</template>

<script>
  import MenuList from '../../common/menuList.vue'

  export default {
    name: "index",
    components: {MenuList},
    data() {
      return {
        mainListHover: false,
        visibleStatus: false,
      }
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
    methods: {
      hidePanel(event) {
        let sp = document.getElementById("menuList");
        if (sp) {
          if (!sp.contains(event.target)) {
            this.visibleStatus = false;
          }
        }
      },
      highSearch() {

      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/recruitment/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #recruitment {

    }
  }

  #theme_name.theme2 {
    #recruitment {

    }
  }

  #theme_name.theme3 {
    #recruitment {

    }
  }

  #theme_name.theme4 {
    #recruitment {

    }
  }
</style>
