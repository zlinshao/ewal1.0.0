<template>
  <div id="lj_dialog" class="lj_dialog" v-if="dialog_visible">
    <div class="flex-center" @click.self="handleCloseDialog">
      <div class="lj_container" :style="style[lj_size]" :class="{'show_upright': is_upright}">
        <slot></slot>
        <span class="close_btn" @click="handleCloseDialog"></span>
        <span class="wen_top"></span>
        <span class="wen_bottom"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['visible', 'size'],
    data() {
      return {
        dialog_visible: false,
        lj_size: 'small',
        is_upright: false,
        style: {
          mini: {
            width: 1200 * 0.4 + 'px',
            height: 800 * 0.4 + 'px'
          },
          small: {
            width: 1200 * 0.8 + 'px',
            height: 800 * 0.8 + 'px'
          },
          large: {
            width: 1200 + 'px',
            height: 800 + 'px'
          },
          other: {
            width: 0,
            height: 0
          }
        }
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      visible(val) {
        this.dialog_visible = val;
      },
      size: {
        handler(val) {
          if (typeof val === 'string') {
            this.lj_size = val;
            this.is_upright = false;
          } else {
            this.lj_size = 'other';
            this.style.other = val;
            if (val.width.indexOf('%') !== -1) {
              if (parseInt(val.height) > parseInt(val.width)) {
                this.is_upright = true;
              }
            }
          }
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      handleCloseDialog() {
        this.dialog_visible = false;
        this.$emit('close');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/components/lj_dialog.scss";

  @mixin lj_dialogImg($m,$n) {
    $url: '../../assets/image/components/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .lj_dialog {
      > div {
        .lj_container {
          @include lj_dialogImg('tankuang.png', 'theme1');
          /*background-size: contain;*/
          .close_btn {
            @include lj_dialogImg('close.png', 'theme1');
            background-size: contain;
          }
          .wen_top {
            @include lj_dialogImg('bianjiao.png', 'theme1');
            background-size: contain;
          }
          .wen_bottom {
            @include lj_dialogImg('bianjiao1.png', 'theme1');
            background-size: contain;
          }
        }
        .show_upright {
          @include lj_dialogImg('shu.png', 'theme1');
        }
      }
    }
  }
</style>
