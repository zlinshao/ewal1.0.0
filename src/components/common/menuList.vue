<template>
  <div id="menuList" :class="[list.type]">
    <div :class="{'dialogVisible': backdrop && dialogVisible}" @click="dialogVisible = false"></div>
    <div class="justify-around list" :class="{'menuList':routeAnimation,'backdrop': backdrop,'hover':dialogVisible}">
      <div v-for="(item,index) in list.data" class="flex-center menu" :class="['menu-' + (index + 1)]">
        <div class="flex-center childrenMenu" @click="moduleRouter(item.url)">
          <span class="writingMode">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="title">{{ top_title }}</div>
  </div>
</template>

<script>
export default {
  name: "menu-list",
  props: ['list', 'module', 'backdrop', 'title'],
  data () {
    return {
      dialogVisible: false,
      top_title: ''
    }
  },
  mounted () {
  },
  activated () {
  },
  watch: {
    title (val) {
      this.top_title = val;
    },
    module (val) {
      this.dialogVisible = val;
    },
    dialogVisible (val) {
      if (!val) {
        this.$emit('close');
      }
    }
  },
  computed: {
    routeAnimation () {
      return this.$store.state.app.routeAnimation;
    }
  },
  methods: {
    moduleRouter (url) {
      this.routerLink(url);
      this.dialogVisible = false;
    },
    // 出自己以外的元素关闭
    hidePanel (event) {
      let sp = document.getElementById("list");
      if (sp) {
        if (!sp.contains(event.target)) {
          this.$emit('close');
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/common/menuList.scss";

@mixin menuImg($m, $n) {
  $url: "../../assets/image/common/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #menuList.humanResource {
    .list {
      .menu-1,
      .menu-5 {
        .childrenMenu {
          @include menuImg("humanresourcehuidi1.png", "theme1");
          &:hover {
            @include menuImg("humanresourcehongdi1.png", "theme1");
          }
        }
      }
      .menu-2,
      .menu-6 {
        .childrenMenu {
          @include menuImg("humanresourcehuidi2.png", "theme1");
          &:hover {
            @include menuImg("humanresourcehongdi2.png", "theme1");
          }
        }
      }
      .menu-3 {
        .childrenMenu {
          @include menuImg("humanresourcehuidi3.png", "theme1");
          &:hover {
            @include menuImg("humanresourcehongdi3.png", "theme1");
          }
        }
      }
      .menu-4 {
        .childrenMenu {
          @include menuImg("humanresourcehuidi4.png", "theme1");
          &:hover {
            @include menuImg("humanresourcehongdi4.png", "theme1");
          }
        }
      }
    }
  }
  #menuList.customService {
    .list {
      .menu {
        .childrenMenu {
          @include menuImg("customservicehuidi.png", "theme1");
          background-size: 50px 100%;
          &:hover {
            @include menuImg("customservicehongdi.png", "theme1");
            background-size: 50px 100%;
          }
        }
      }
    }
  }
  #menuList.intellectualPropertyProtection {
    .list {
      .menu {
        .childrenMenu {
          @include menuImg("intellectualpropertyprotectionkuang.png", "theme1");
          background-size: 191px 314px;
          &:hover {
            @include menuImg(
              "intellectualpropertyprotectionkuanger.png",
              "theme1"
            );
            background-size: 191px 314px;
          }
        }
      }
    }
  }
  #menuList.riskManagement {
    .list {
      .menu {
        .childrenMenu {
          @include menuImg("fxkz_0.png", "theme1");
          background-size: 191px 314px;
          &:hover {
            @include menuImg("fxkz_1.png", "theme1");
            background-size: 191px 314px;
          }
        }
      }
    }
  }
}

#theme_name.theme2 {
  #menuList {
  }
  #menuList.customService {
    .list {
      .menu {
        .childrenMenu {
          @include menuImg("kf_biank2.png", "theme2");
          background-size: 80px 240px;
          &:hover {
            @include menuImg("kf_biank1.png", "theme2");
            background-size: 80px 240px;
          }
        }
      }
    }
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
