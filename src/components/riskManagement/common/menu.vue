<template>
  <!-- <MenuList :module='visible' :list='menuParams' @close="handleClose" :backdrop="true" /> -->
  <div id="menuList" class="riskManagement">
    <div :class="{'dialogVisible': backdrop && dialogVisible}" @click="dialogVisible = false"></div>
    <div class="justify-around list" :class="{'menuList':routeAnimation,'backdrop': backdrop,'hover':dialogVisible}">
      <div v-for="(item,index) in menuParams.data" class="flex-center menu" :class="['menu-' + (index + 1)]">
        <div class="flex-center childrenMenu" @click="moduleRouter(item)">
          <span class="writingMode">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import MenuList from '../../common/menuList'
export default {
  props: ['visible'],
  components: {
    MenuList
  },
  data () {
    return {
      backdrop: true,
      dialogVisible: false,
      menuParams: {
        type: 'riskManagement',
        data: []
      },
      top_title: ''
    }
  },
  watch: {
    title (val) {
      this.top_title = val;
    },
    visible (val) {
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
  mounted () {
    this.getMenu()
  },
  methods: {
    moduleRouter (item) {
      // this.routerLink(item.url, { pre_name: item.title, pre_id: item.id });
      this.$router.push({ path: item.url, query: { pre_name: item.name, pre_id: item.id } })
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
    getMenu () {
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: 0 }).then(res => {
        if (res.status === 200) {
          // let data = []
          // res.data.data.forEach(el => {
          //   data.push({
          //     title: el.name,
          //     url: el.url,
          //     id: el.id
          //   })
          // });
          this.menuParams = {
            type: 'riskManagement',
            data: res.data.data
          }
        }
      })
    },
    handleClose () {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/common/menuList.scss";

@mixin menuImg($m, $n) {
  $url: "../../../assets/image/common/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #menuList.riskManagement {
    .list {
      .menu {
        .flex-center {
          flex-direction: column;
        }
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