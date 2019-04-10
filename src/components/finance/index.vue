<template>
  <div id="finance" class="flex-center">
    <div class="justify-center">
      <div class="mainList" :class="['finance' + (index + 1)]"
           v-for="(item,index) in finance.data" @click="routerLink(item.url)">
        <div class="abacusUp">
          <p>
            <i class="icons"></i>
          </p>
        </div>
        <div class="abacusDown">
          <p>
            <span class="writingMode">{{item.title}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {finance} from '../../assets/js/allModuleList.js'

  export default {
    name: "index",
    data() {
      return {
        finance,
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
  @import "../../assets/scss/finance/index.scss";

  @mixin financeImg($m, $n) {
    $url: '../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin hoverImg($n) {
    @for $i from 1 through 8 {
      .mainList.finance#{$i} {
        .abacusUp {
          .icons {
            @include financeImg('finance#{$i}.png', $n);
          }
        }
        &:hover {
          .abacusUp {
            .icons {
              @include financeImg('financechoose#{$i}.png', $n);
            }
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #finance {
      @include financeImg('ditu.png', 'theme1');
      > div {
        @include financeImg('beijingtu.png', 'theme1');
      }
      .mainList {
        .abacusUp {
          p {
            @include financeImg('shangzhuhui.png', 'theme1');
          }
        }
        .abacusDown {
          p {
            @include financeImg('xiazhuhui.png', 'theme1');
          }
        }
        &:hover {
          .abacusUp {
            p {
              @include financeImg('shangzhu.png', 'theme1');
            }
          }
          .abacusDown {
            p {
              @include financeImg('xiazhu.png', 'theme1');
            }
          }
        }
      }
      @include hoverImg('theme1');
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
