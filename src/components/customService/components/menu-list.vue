<template>
  <div id="menu-list" v-if="navVisible">
    <div class="menu_list flex-center">
      <div class="menu_contain" v-for="(item,key) in menu_list">
        <span class="writingMode" :class="{['a_delay-' + (key + 1)] : '...' ,'trans_show' : navVisible  }" :key="key" @click="handleRouterLink(item.url)">{{ item.title }}</span>
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
            url: '/workOrder',
          },
          {
            title: '回访',
            url: '',
          },
          {
            title: '到期',
            url: '',
          },
          {
            title: '资料',
            url: '',
          },
          {
            title: '合同',
            url: '',
          },
          {
            title: '客户',
            url: '',
          },
          {
            title: '客服',
            url: '',
          },
          {
            title: '房屋',
            url: '',
          },
        ],
      }
    },
    mounted() { },
    watch: {
      menuVisible(val) {
        this.navVisible = val;
      }
    },
    computed: {},
    methods: {
      handleRouterLink(url) {
        if (url === this.$route.path) {
          this.$emit('close');
        } else {
          this.routerLink(url);
        }
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

  @mixin a_delay($s) {
    animation-delay: $s + s;
    -webkit-animation-delay: $s + s;
    transition-delay: $s + s;
    -webkit-transition-delay: $s + s;
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
          transform: translateX(-1920px);
          transition: all ease 1s;
          animation: show_trans linear .5s;
        }
        @for $i from 1 to 9 {
          .a_delay-#{$i} {
            @include a_delay((10 - $i ) / 10);
          }
        }
        .trans_show {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
</style>
