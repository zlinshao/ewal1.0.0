<template>
  <!-- <loginCompanySelect v-if="!showLogin"></loginCompanySelect> -->
  <div id="login">
    <header class="flex-center">
      <span></span>
    </header>
    <div class="login flex-center" :class="{'loginRotate': loginRotate}">
      <div class="flex-center">
        <div class="p2">

          <div class="inner-top">
            <i title="手机验证码登录"></i>
          </div>
          <div class="inner-login">
            <div class="inner-item">
              <input type="text" v-model="login_form.phone" placeholder="请输入手机号"/>
              <div class="phone-tip">中国&nbsp;&nbsp;+86</div>
            </div>
            <div class="inner-item sms-verification">
              <input type="text" v-model="login_form.ver_code" placeholder="请输入短信验证码"/>
              <el-button type="danger" :disabled="!verification_show" @click="getVerificationCode">
                <span v-show="verification_show">获取验证码</span>
                <span v-show="!verification_show" class="count">{{count}} s</span>
              </el-button>
            </div>
          </div>


          <div class="inner-bottom">
            <div @click="scanLogin">钉钉扫码登录</div>
            <!--            <div>忘记密码</div>-->
          </div>
        </div>
        <div class="p3 flex-center" @click="login">
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
  // import loginCompanySelect from './login_company_select'

  const TIME_REMAIN = 60;//短信验证码时长

  export default {
    name: "login",
    // components:{
    //   loginCompanySelect
    // },
    data() {
      return {
        url: globalConfig.shield_server,
        loginRotate: false,

        verification_show: true,//验证码初始显示
        count: null,
        timer: null,

        login_form: {
          phone: null,//手机号
          ver_code: null,//验证码
        },
        showLogin:false
      }
    },
    async created() {
      await this.validateScanLogin();
      if(this.getQueryVariable("companyName")){
        this.showLogin=true;
      }
    },
    mounted() {
    },
    activated() {
      this.listenOnKeyDownEnter(true);
      let that = this;
      setTimeout(function () {
        that.loginRotate = true;
      }, 100);
    },
    deactivated() {
      this.listenOnKeyDownEnter(false);
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
      /*发送验证码倒计时*/
      sendRemain() {
        if (!this.timer) {
          this.count = TIME_REMAIN;
          this.verification_show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_REMAIN) {
              this.count--;
            } else {
              this.verification_show = true;
              clearInterval(this.timer);  // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
      },

      /*验证手机号*/
      validatePhone() {
        if (!(/^1[345789]\d{9}$/.test(this.login_form.phone))) {
          this.$LjMessage('warning', {title: '警告', msg: '请输入正确的手机号'});
          return false;
        }
        return true;
      },

      /*获取验证码*/
      getVerificationCode() {
        if (!this.validatePhone()) return;
        let params = {
          phone: this.login_form.phone
        };

        axios.post(`${this.url}api/sns/sms/send`, params).then(res => {
          if (res.status == 429) {
            this.$LjMessage('warning', {title: '警告', msg: '请求次数过多,请稍后尝试'});
          } else if (res.status == 204) {
            this.$LjNotify('success', {title: '成功', message: '验证码发送成功'});
          } else {
            this.$LjMessage('error', {title: '失败', msg: res.data.message});
          }
          this.sendRemain();
        });
      },

      /*登录*/
      login() {
        if (!this.validatePhone()) return;
        if(!this.login_form.ver_code) {
          this.$LjMessage('warning',{title:'警告',msg:'请输入验证码'});
          return;
        }
        let params = {
          phone:this.login_form.phone,
          code:this.login_form.ver_code,
        };

        this.$http.post(`${this.url}api/sns/sms/verify`,params).then(res=> {
          if (res.token_type === "Bearer" && res.access_token) {
            this.saveAuthorization(res);
            return true;
          }
          return false;
        }).then(res => {//获取用户信息
          this.getUserInfo(res);
        });
      },

      /*扫码登录*/
      scanLogin() {
        this.$http.get(`${this.url}api/sns/dingtalk/qrCode?client_name=ewal_web`).then(res => {
          if (res.success === true) {
            window.location.href = res.url;
          }
        });
      },

      /*保存Authorization*/
      saveAuthorization(res) {
        const token = res.access_token;
        this.$storage.set('Authorization', `Bearer ${token}`, res.expires_in);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },

      //获取用户信息
      getUserInfo(res) {
        if (res) {
          this.$http.get(`${this.url}api/auth/user`).then(async res2 => {
            if (res2.success === true) {
              let city = res2.data.detail?.staff?.city||'南京市';
              if(!city.endsWith('市')) {
                city = `${city}市`;
              }
              await this.$storage.set('user_info', {
                id: res2.data.id,
                name: res2.data.name,
                org:res2.data.detail?.org||[],
                position:res2.data.detail?.position||[],
                avatar: res2.data.detail?.avatar,
                position_level: res2.data.detail?.staff?.position_level||null,//职位等级
                company_info: res2.data.detail?.company_info || {},//公司信息
                city: city,//城市名
              });
              this.$bus.emit('photo-url',res2.data.detail?.avatar);
              let that = this;
              async function getPermission() {
                let params = {
                  user_id: 'self',
                  type: 'all',
                };
                let result = await that.$http.get(`${globalConfig.humanResource_server}organization/permission/all`, params);
                if (result.code.endsWith('0')) {
                  that.VALIDATE_PERMISSION = {};
                  _(result.data).forEach((o, index) => {
                    that.VALIDATE_PERMISSION[o] = true;
                    that.$storage.set('VALIDATE_PERMISSION',that.VALIDATE_PERMISSION);
                  });
                  that.$store.dispatch('change_refresh_todo_list');//刷新代办
                }
              }
              await getPermission();
              that.routerLink('/');
            }
          });
        }
      },

      /*验证扫码登录*/
      async validateScanLogin() {
        let code = this.$route.query?.code;
        let message = this.$route.query?.message;
        if (code) {
          let params = {code};
          this.$http.get(`${this.url}api/auth/fromCode`, params).then(res => {
            if (res.token_type === "Bearer" && res.access_token) {
              this.saveAuthorization(res);
              return true;
            }
            return false;
          }).then(res => {//获取用户信息
            this.getUserInfo(res);
          });
        }
        if (message) {
          this.$LjMessage('warning', {title: '警告', msg: message});
          return;
        }
      },

      //监听keydown事件
      listenOnKeyDownEnter(flag = false) {
        let _this = this;
        document.onkeydown = function(e){
          e = window.event || e;
          if(e.keyCode=='13'||e.keyCode=='108'){
            if (flag) {
              _this.login();
            } else {
              return false;
            }
          }
        }
      },
      // 获取url参数，据此判断是否显示选择公司
      getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          let pair = vars[i].split("=");
          if(pair[0] == variable){
            return pair[1];
          }
        }
        return false;
      }
    },
  }
</script>


<style lang="scss">
  #theme_name.theme1 {
    #login {
      .sms-verification {
        button {
          width: 112px;

          &.is-disabled {
            background-color: #d9d9d9;
          }
        }
      }

    }
  }
</style>

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

            .inner-top {
              i {
                @include loginImg('shoujidenglu.png', 'theme1');
              }
            }
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
