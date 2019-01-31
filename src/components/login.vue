<template>
  <div id="login">
    <header class="flex-center">
      <span></span>
    </header>
    <div class="login flex-center" :class="{'loginRotate': loginRotate}">
      <div class="flex-center">
        <div class="p1"></div>
        <div class="p2 flex-center">
          <div class="space-column">
            <div class="items-center formData" :class="item.icon" v-for="(item,index) in formData">
              <i></i>
              <input type="text" :placeholder="item.placeholder"/>
              <b v-show="index === 2">1234</b>
            </div>
            <p class="forgetPassword">忘记密码？</p>
            <p class="loginBtn" @click="routerLink('/')">
              <span class="writingMode">登&nbsp;&nbsp;录</span>
            </p>
          </div>
        </div>
        <div class="p3 flex-center" @click="routerLink('/')">
          <span class="writingMode">登&nbsp;&nbsp;录</span>
        </div>
      </div>
      <footer class="flex-center"></footer>
    </div>
    <h1>ENJOY&nbsp;&nbsp;WORKING&nbsp;&nbsp;AT&nbsp;&nbsp;LEJIA</h1>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginRotate: false,
        formData: [
          {
            icon: 'yonghu',
            placeholder: '用户',
          },
          {
            icon: 'mima',
            placeholder: '密码',
          },
          {
            icon: 'yanzhengma',
            placeholder: '验证码',
          },
        ]
      }
    },
    mounted() {
    },
    activated() {
      let that = this;
      setTimeout(function () {
        that.loginRotate = true;
      }, 100);
    },
    watch: {
      $route: {
        handler(val, oldVal) {
          this.loginRotate = false;
        },
        deep: true// 深度观察监听
      }
    },
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/login/index.scss";

  @mixin loginImg($m, $n) {
    $url: '../assets/image/login/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin formIcon($n) {
    @each $animal in yonghu, mima, yanzhengma {
      .#{$animal} {
        i {
          @include loginImg('#{$animal}.png', $n);
        }
      }
    }
  }

  #theme_name.theme1 {
    #login {
      .login {
        > div {
          .p1 {
            @include loginImg('moduleleft.png', 'theme1');
          }
          .p2 {
            @include formIcon('theme1');
          }
          .p3 {
            @include loginImg('denglu.png', 'theme1');
          }
        }
      }
      footer {
        p {
          @include loginImg('logo.png', 'theme1');
        }
      }
    }
  }

  #theme_name.theme2 {
    #login {
      @include loginImg('loginbg.png', 'theme2');
      header {
        span {
          @include loginImg('denglutop.png', 'theme2');
        }
      }
      .login {
        > div {
          .p2 {
            @include formIcon('theme2');
            @include loginImg('denglukuang.png', 'theme2');
          }
          .p3 {
            @include loginImg('denglu.png', 'theme2');
          }
        }
      }
      footer {
        @include loginImg('footerlogo.png', 'theme2');
      }
    }
  }

  #theme_name.theme3 {
    #login {
      @include loginImg('loginbg.png', 'theme3');
      .login {
        > div {
          .p2 {
            @include formIcon('theme1');
            @include loginImg('denglukuang.png', 'theme3');
          }
        }
      }
    }
  }

  #theme_name.theme4 {
    #login {
      .login {
        @include loginImg('loginbg.png', 'theme4');
        background-size: 50% 100%;
        background-position: top left;
        > div {
          .p2 {
            @include boxShaw(0px 10px 20px 0px rgba(0, 138, 123, 0.1));
            @include formIcon('theme1');
          }
          .p3 {

          }
        }
      }
      footer {
        @include loginImg('footerlogo.png', 'theme4');
      }
    }
  }
</style>
