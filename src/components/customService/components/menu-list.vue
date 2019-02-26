<template>
  <div id="menu-list" class="menu_container" :class="{'show_container' : navVisible}">
    <div class="menu_list flex-center">
      <div class="menu_contain" :class="{['a_delay-' + (key + 1)]:'...','menu_contain_show' : navVisible}" v-for="(item,key) in menu_list" :key="key">
        <span class="writingMode" :key="key" @click="handleRouterLink(item.url)">{{ item.title }}</span>
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
          this.navVisible = false;
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
    transition-delay: $s + s;
    -webkit-transition-delay: $s + s;
  }

  .menu_container {
    .menu_list {
      .menu_contain {
        transform: translateX(-1920px) scale(1.5);
        transition: all ease .3s;
        span {
          @include serviceImg('huidi.png', 'theme1');
          &:hover {
            @include serviceImg('hongdi.png', 'theme1');
          }
        }
      }
      @for $i from 1 to 9 {
        .a_delay-#{$i} {
          @include a_delay((10 - $i ) / 10);
        }
      }
      .menu_contain_show {
        transform: translateX(0) scale(1);
      }
    }
  }
</style>
