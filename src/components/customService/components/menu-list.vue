<template>
  <div id="menu-list" v-if="navVisible">
    <div class="menu_list flex-center">
      <div class="menu_contain" v-for="(item,key) in menu_list">
        <span class="writingMode" :class="{'show_trans' : item.show}" :key="key" @click="handleRouterLink(item.url)">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu-list",
    props: ['menuVisible'],
    data() {
      return {
        navVisible: false,
        menu_list: [
          {
            title: '工单',
            url: '/customService/workOrder',
            show: false
          },
          {
            title: '回访',
            url: '',
            show: false
          },
          {
            title: '到期',
            url: '',
            show: false
          },
          {
            title: '资料',
            url: '',
            show: false
          },
          {
            title: '合同',
            url: '',
            show: false
          },
          {
            title: '客户',
            url: '',
            show: false
          },
          {
            title: '客服',
            url: '',
            show: false
          },
          {
            title: '房屋',
            url: '',
            show: false
          },
        ],
        current_show: 8,
      }
    },
    mounted() {
      this.set_show();
    },
    watch: {
      menuVisible(val) {
        this.navVisible = val;
        this.set_show();
      },
      $route(to,from) {
        if (to.path === '/customService/workOrder') {
          this.init_menu_list();
          this.$emit('open');
        }
      }
    },
    computed: {},
    methods: {
      init_menu_list() {
        for (var i =0;i<this.menu_list.length;i++) {
          this.menu_list[i].show = false;
        }
      },
      handleRouterLink(url) {
        this.navVisible = false;
        this.$emit('close');
        this.routerLink(url);
      },
      set_show() {
        var timer = null;
        timer = setInterval(() => {
          this.current_show--;
          this.menu_list[this.current_show].show = this.navVisible;
          if (this.current_show < 1) {
            clearInterval(timer);
            this.current_show = 8;
            timer = null;
          }
        }, 200);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/customService/components/menu_list.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @keyframes show_trans {
    0% {
      transform: translateX(-1920px);
    }
    100% {
      transform: translateX(0);
    }
  }

  #menu-list {
    .menu_list {
      .menu_contain {
        span {
          @include serviceImg('huidi.png', 'theme1');
          &:hover {
            @include serviceImg('hongdi.png', 'theme1');
          }
          opacity: 0;
          transition: all ease .2s;
        }
        .show_trans {
          opacity: 1;
          animation: show_trans .3s linear;
        }
      }
    }
  }
</style>
