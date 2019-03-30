<template>
  <transition name="fade">
    <div v-if="visible"  class="confirm-theme" ref="demo">
      <div @click.self="visible = false" class="confirm-modal">
        <div class="confirm-modal-container">
          <div v-if="title" class="confirm-modal-container-title">
            <span>{{title}}</span>
          </div>
          <div class="confirm-modal-container-content">
            <span class="content-row" v-if="!icon">{{content}}</span>
<!--            <i v-if="icon" class="content-icon" :class="{icon}">图片</i>-->
            <i v-if="icon" class="content-icon delete"></i>
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
  import LjDialog from '../../lj-dialog';


export default {
  name: "Confirm",
  components: {
    LjDialog
  },
  data() {
    return {
      visible: false,
      title: "",
      content: "确定要删除吗?",
      confirmText: "确定",
      cancelText: "取消",
      icon:'',//图标 -后期加
      type: "",
      promiseStatus: null
    };
  },
  watch: {
    visible: function(val,oldVal) {//每次隐藏移除dom元素
      if(!val) {
        let app = document.querySelector('#app');
        let confirmDom =  document.querySelector('.confirm-theme');
        app.removeChild(confirmDom);
      }
    },
    icon: {
      handler(val,oldVal) {
        if(val=='delete') {
          this.title = '确定要删除吗？';
        }
      },
      immediate: true
    }
  },
  methods: {
    confirm() {
      let _this = this;
      this.visible = true;
      return new Promise(function(resolve, reject) {
        _this.promiseStatus = { resolve, reject };
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

<style scoped lang="scss">
  @import "../../../../assets/scss/common/lightweightComponents/confirm/index";

  @mixin confirmImg($m, $n) {
    $url: '../../../../assets/image/common/lightweightComponents/confirm/' + $n + '/' + $m;
    @include bgImage($url);
  }

  .confirm-theme {
    .delete {
      @include confirmImg('shanchuchenggong.png','theme1');
    }
  }


</style>
