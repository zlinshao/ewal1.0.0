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
            <p style="cursor: pointer" @click="scanLogin">钉钉扫码</p>
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
  import axios from 'axios';
  export default {
    name: "login",
    data() {
      return {
        url:globalConfig.shield_server,
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
      debugger
      console.log(Date.now());
      this.validateScanLogin();
    },
    activated() {
      let that = this;
      setTimeout(function () {
        that.loginRotate = true;
      }, 100);
    },
    watch: {
      $route: {
        handler(to, from) {
          this.loginRotate = false;
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      /*扫码登录*/
      scanLogin() {
        this.$http.get(`${this.url}api/sns/dingtalk/qrCode?client_name=ewal_web`).then(res=> {
          if(res.success==true) {
            window.location.href = res.url;
          }
        });
      },

      /*验证扫码登录*/
      validateScanLogin() {
        let code = this.$route.query?.code;
        let message = this.$route.query?.message;
        if(code) {
          //code = '2c2f9c9935acbf596b96e8794181e83e0cf5b6ea9901d58235c0c8e9dc6fcc54d338ad5e525ed1ed';
          let params = {code};
          this.$http.get(`${this.url}api/auth/fromCode`,params).then(res=> {
            debugger
            if(res.token_type=="Bearer"&&!res.access_token) {
              const token = res.access_token;
              this.$storage.set('Authorization',token);

              //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
          });
        }
        if(message) {
          this.$LjMessage('warning',{title:'警告',msg:message});
          return;
        }
      },
    },
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
      @include loginImg("qidongye.png", 'theme1');
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
        @include loginImg('footerlogo.png', 'theme1');
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
