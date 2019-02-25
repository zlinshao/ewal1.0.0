<template>
  <div id="finance" class="flex-center">
    <div class="justify-center">
      <div class="mainList" v-for="item in 5">
        <div class="abacusUp">
          <p><i></i></p>
        </div>
        <div class="abacusDown">
          <p>
            <span class="writingMode">付款</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
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
  @import "../../assets/scss/finance/index.scss";

  @mixin financeImg($m, $n) {
    $url: '../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #finance {
      @include financeImg('ditu.png', 'theme1');
      > div {
        padding: 95px 0;
        @include financeImg('beijingtu.png', 'theme1');
      }
      .mainList {
        border: 1px solid #CF2E33;
        width: 100%;
        padding-right: 5px;
        &:hover {
          > div {
            p {
              background-color: green;
              color: $colorFFF;
            }
          }
        }
        > div {
          width: 100%;
          @include flex('flex-center');
          p {
            cursor: pointer;
            @include flex('flex-center');
            span {
              @include flex('flex-center');
            }
          }
        }
        .abacusUp {
          min-height: 200px;
          max-height: 200px;
          p {
            width: 60px;
            height: 40px;
            i {
              width: 24px;
              height: 24px;
              @include financeImg('fukuanicon.png', 'theme1');
            }

          }
        }
        .abacusDown {
          height: 410px;
          p {
            width: 60px;
            height: 160px;
            padding-top: 30px;
            span {
              font-family: 'jingDianXingShu';
              letter-spacing: 20px;
              font-size: 30px;
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #finance {

    }
  }

  #theme_name.theme3 {
    #finance {

    }
  }

  #theme_name.theme4 {
    #finance {

    }
  }
</style>
