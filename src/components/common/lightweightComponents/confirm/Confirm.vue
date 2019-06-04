<template>
  <transition name="fade">
    <div id="lj_confirm" v-if="visible" class="confirm-theme" ref="demo">
      <div @click.self="visible = false" class="confirm-modal">
        <div class="confirm-modal-container">
         <!-- <div v-if="title" class="confirm-modal-container-title">
            <span>{{title}}</span>
          </div>-->
          <div class="confirm-modal-container-content">
            <span class="content-row" v-if="!icon">{{content}}</span>
            <!--            <i v-if="icon" class="content-icon" :class="{icon}">图片</i>-->
            <div v-if="icon" class="center-container">
              <i class="icon-img" :class="icon"></i>
              <i class="icon-desc" :style="{color:iconTipColor}">{{iconTip}}</i>

              <span class="icon-content">{{content}}</span>
            </div>

          </div>
          <div class="confirm-modal-container-footer">
            <el-button size="mini" type="danger" @click="handleAction('confirm')">{{confirmText}}</el-button>
            <el-button size="mini" type="info" @click="handleAction('cancel')">{{cancelText}}</el-button>
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>


  export default {
    name: "Confirm",
    components: {},
    data() {
      return {
        visible: false,
        title: "",
        content: "确定要删除吗?",
        confirmText: "确 定",
        cancelText: "取 消",
        iconTip:"成功",
        iconTipColor:"#2ECF74",
        icon: '',//图标 -后期加包含 delete success info warning error
        //type: "",
        promiseStatus: null
      };
    },
    watch: {
      visible: function (val, oldVal) {//每次隐藏移除dom元素
        if (!val) {
          let app = document.querySelector('#app');
          let confirmDom = document.querySelector('.confirm-theme');
          app.removeChild(confirmDom);
        }
      },
      icon: {
        handler(val, oldVal) {
          switch (val) {
            case "delete":
              this.iconTip = "删除";
              this.iconTipColor = "#cf2e33";
              break;
            case "success":
              this.iconTip = "成功";
              this.iconTipColor = "#2ECF74";
              break;
            case "info":
              this.iconTip = "消息";
              this.iconTipColor = "#9AE863";
              break;
            case "warning":
              this.iconTip = "警告";
              this.iconTipColor = "#FEC000";
              break;
            case "error":
              this.iconTip = "错误";
              this.iconTipColor = "#CF2E33";
              break;
          }
        },
        immediate: true
      }
    },
    methods: {
      confirm() {
        let _this = this;
        this.visible = true;
        return new Promise(function (resolve, reject) {
          _this.promiseStatus = {resolve, reject};
        });
      },
      handleAction(action) {
        this.visible = false;
        if (action == "confirm") {
          this.promiseStatus && this.promiseStatus.resolve();
        } else {
          this.promiseStatus && this.promiseStatus.reject();
        }
      }
    }
  };
</script>


<style lang="scss">
  #lj_confirm {
    .el-button--danger {
      background-color: #CF2E33;
      color: #FFFFFF;
    }
  }
</style>

<style scoped lang="scss">
  @import "../../../../assets/scss/common/lightweightComponents/confirm/index";

  @mixin confirmImg($m, $n) {
    $url: '../../../../assets/image/common/lightweightComponents/confirm/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin notifyImg($m, $n) {
    $url: '../../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  #lj_confirm {

    .confirm-modal-container {
      @include notifyImg('message_bg.png', 'theme1/notify');
    }


    .delete {
      @include notifyImg('shanchu.png', 'theme1/notify');
    }
    .success {
      @include notifyImg('success.png', 'theme1/notify');
    }
    .info {
      @include notifyImg('info.png', 'theme1/notify');
    }
    .warning {
      @include notifyImg('warning.png', 'theme1/notify');
    }
    .error {
      @include notifyImg('error.png', 'theme1/notify');
    }

  }

</style>
