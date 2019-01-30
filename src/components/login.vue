<template>
  <div id="login">
    <div class="login flex-center">
      <div class="flex-center" :class="{'loginRotate': loginRotate}">
        <div class="p1"></div>
        <div class="p2 flex-center">
          <div class="space-column">
            <div class="items-center formData" :class="item.icon" v-for="(item,index) in formData">
              <i></i>
              <input type="text" :placeholder="item.placeholder"/>
              <b v-show="index === 2">1234</b>
            </div>
          </div>
        </div>
        <div class="p3 flex-center">
          <span class="writingMode">登&nbsp;&nbsp;录</span>
        </div>
      </div>
      <footer class="flex-center">
        <p></p>
        <div class="items-center">
          <span>LEJIA</span>
          <span>EWAL1.0</span>
        </div>
      </footer>
    </div>
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
    watch: {},
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

    }
  }

  #theme_name.theme3 {
    #login {

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

          }
          .p3 {

          }
        }
      }
    }
  }
</style>
