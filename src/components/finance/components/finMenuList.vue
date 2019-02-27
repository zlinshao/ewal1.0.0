<template>
  <div id="finMenuList">
    <div :class="{'dialogVisible': dialogVisible}" @click="dialogVisible = false"></div>
    <div class="list flex-center" :class="{'backdrop': dialogVisible}">
      <div class="justify-around">
        <div v-for="item in finance.data" @click="routerLink(item.url)">
          <p>
            <span class="writingMode">{{item.title}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {finance} from '../../../assets/js/allModuleList.js'

  export default {
    name: "fin-menu-list",
    props: ['module'],
    data() {
      return {
        finance,
        dialogVisible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {},
    methods: {
      moduleRouter(val) {

      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/components/finMenuList.scss";

  @mixin finMenuImg($m, $n) {
    $url: '../../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .list {
      height: 500px;
      position: fixed;
      top: 80px;
      left: -100%;
      width: 100%;
      z-index: 12;
      background-color: $colorFFF;
      border-color: transparent;
      @include transition(all .5s);
      > div {
        width: 70%;
        padding: 0 5%;
        height: 360px;
        @include finMenuImg('beijingtu2.png', 'theme1');
        div {
          @include flex('flex-center');
          width: 100%;
          p {
            cursor: pointer;
            @include flex('flex-center');
            width: 60px;
            height: 160px;
            @include finMenuImg('xiazhuhui.png', 'theme1');
            &:hover {
              @include finMenuImg('xiazhu.png', 'theme1');
              color: $colorFFF;
            }
            span {
              @include flex('flex-center');
              font-size: 30px;
              font-family: 'jingDianXingShu';
            }
          }
        }
        div:nth-child(1), div:nth-child(2), div:nth-child(3) {
          p {
            margin-right: 10px;
          }
        }
      }
    }
    .backdrop {
      left: 0;
    }
  }

  #theme_name.theme1 {
    #finMenuList {

    }
  }

  #theme_name.theme2 {
    #finMenuList {

    }
  }

  #theme_name.theme3 {
    #finMenuList {

    }
  }

  #theme_name.theme4 {
    #finMenuList {

    }
  }
</style>
