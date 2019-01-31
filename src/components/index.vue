<template>
  <div id="index">
    <div class="justify-around">
      <div class="main items-column" :class="['main-' + (index + 1), {'translateDown': translateDown}]"
           v-for="(item,index) in myData">
        <p class="flex-center">
          <span>{{item.title}}</span>
          <b></b>
        </p>
        <div class="contents">
          <div class="space-column">
            <p></p>
            <h1 class="writingMode">
              模块简介模块简介模块简介模块简介 模块简介模块简介模块简介
            </h1>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
    <footer class="flex-center">
      <span>
        <i></i>
        <b>工作虽忙，也要注意休息～</b>
      </span>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        translateDown: false,
        myData: [
          {
            title: '企业头条',
          },
          {
            title: '俱乐部',
          },
          {
            title: '公司资料',
          },
          {
            title: '员工关怀',
          },
        ],
      }
    },
    mounted() {

    },
    activated() {
      let that = this;
      setTimeout(function () {
        that.translateDown = true;
      }, 10)
    },
    watch: {
      $route: {
        handler(val, oldVal) {
          this.translateDown = false;
        },
        deep: true// 深度观察监听
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/index/index.scss";

  @mixin indexImg($m, $n) {
    $url: '../assets/image/index/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin defaultImg($n) {
    @for $i from 1 through 4 {
      .main-#{$i} {
        div {
          p {
            @include indexImg('module#{$i}.png', $n);
          }
        }
      }
    }
  }

  @mixin hoverImg($n) {
    @for $i from 1 through 4 {
      .main-#{$i}:hover {
        div {
          p {
            @include indexImg('modulechoose#{$i}.png', $n);
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #index {
      .main {
        .contents {
          div {
            h2 {
              @include indexImg('gengduodefault.png', 'theme1');
            }
            &:hover {
              h2 {
                @include indexImg('gengduo.png', 'theme1');
              }
            }
          }
        }
      }
      .main:hover {
        .contents {
          div {
            h2 {
              @include indexImg('gengduo.png', 'theme1');
            }
          }
        }
      }
      @include defaultImg('theme1');
      @include hoverImg('theme1');
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme1');
        }
      }
    }
  }

  #theme_name.theme2 {
    #index {
      .main {
        > p {
          @include indexImg('toubujuxing.png', 'theme2');
        }
        .contents {
          @include indexImg('waibiankuang.png', 'theme2');
          div {
            p {
              @include indexImg('yuanquan.png', 'theme2');
            }
            h2 {
              @include indexImg('gengduo.png', 'theme2');
            }
          }
        }
      }
      .main:hover {
        > p {
          @include indexImg('toubujuxingchoose.png', 'theme2');
        }
        .contents {
          &:hover {
            @include indexImg('xuanzhongmokuai.png', 'theme2');
          }
        }
      }
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme2');
        }
      }
    }
  }

  #theme_name.theme3 {
    #index {
      .main {
        .contents {
          @include indexImg('waibiankuang.png', 'theme3');
          div {
            h2 {
              @include indexImg('gengduo.png', 'theme3');
            }
          }
        }
      }
      .main:hover {
        .contents {
          @include indexImg('xuanzhongmokuai.png', 'theme3');
        }
      }
      @include hoverImg('theme3');
      @include defaultImg('theme3');
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme3');
        }
      }
    }
  }

  #theme_name.theme4 {
    #index {
      .main {
        .contents {
          div {
            h2 {
              @include indexImg('gengduodefault.png', 'theme1');
            }
            &:hover {
              h2 {
                @include indexImg('gengduo.png', 'theme4');
              }
            }
          }
        }
      }
      .main:hover {
        .contents {
          @include indexImg('xuanzhongmokuai.png', 'theme4');
        }
      }
      @include defaultImg('theme4');
      footer {
        span {
          i {
            @include indexImg('tishiyu.png', 'theme4');
          }

        }
      }
    }
  }
</style>
