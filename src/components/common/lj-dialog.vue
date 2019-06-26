<template>
  <div id="lj_dialog" ref="dialog_ref" class="lj_dialog" v-if="dialog_visible">
    <!-- @click.self="handleCloseDialog" -->
    <div class="flex-center">
      <div class="lj_container" :style="style[lj_size]" :class="{'show_upright': is_upright}">
        <slot></slot>
        <span class="close_btn" @click="handleCloseDialog"></span>
        <!--<span class="wen_top"></span>-->
        <!--<span class="wen_bottom"></span>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ljDialog",
    props: ['visible', 'size'],
    data() {
      return {
        show_button: true,
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
        },
      }
    },
    mounted() {

    },
    activated() {
    },
    watch: {
      visible(val) {
        this.dialog_visible = val;
        this.$store.dispatch('add_dialog_z_index');
        this.$nextTick(() => {
          if (this.$refs.dialog_ref) {
            this.$refs.dialog_ref.style.zIndex = this.dialogZIndex;
          }
        })
        /*`有一点小问题 在同一个dialog点击隐藏后继续点击显示 不会浮在最上层 */
        /*if (val) {
          this.$nextTick( () => {
            this.$refs.dialog_ref.style.zIndex = this.dialogZIndex;
          })
        }*/
      },
      // size: {
      //   handler(val) {
      //     if (typeof val === 'string') {
      //       this.lj_size = val;
      //       this.is_upright = false;
      //     } else {
      //       this.lj_size = 'other';
      //       this.style.other = val;
      //       if (val.width.indexOf('%') !== -1) {
      //         if (parseInt(val.height) > parseInt(val.width)) {
      //           this.is_upright = true;
      //         }
      //       }
      //     }
      //   },
      //   deep: true,
      //   immediate: true
      // }
    },
    computed: {
      dialogZIndex() {
        return this.$store.state.app.dialogZIndex;
      },
    },
    methods: {
      handleCloseDialog() {
        this.dialog_visible = false;
        this.$emit('update:visible', this.dialog_visible);
        this.$emit('close');
      },
      handlerSize(val) {
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
      }
    },
    created() {
      this.handlerSize(this.size)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/components/lj_dialog.scss";

  @mixin lj_dialogImg($m, $n) {
    $url: "../../assets/image/components/" + $n + "/" + $m;
    @include bgImage($url);
  }

  #theme_name {
    .lj_dialog {
      > div {
        .lj_container {
          @include lj_dialogImg("tankuang.png", "theme1");
          /*background-size: contain;*/
          .close_btn {
            @include lj_dialogImg("close.png", "theme1");
            background-size: contain;
          }

          .wen_top {
            @include lj_dialogImg("bianjiao.png", "theme1");
            background-size: contain;
          }

          .wen_bottom {
            @include lj_dialogImg("bianjiao1.png", "theme1");
            background-size: contain;
          }
        }

        .show_upright {
          @include lj_dialogImg("shu.png", "theme1");
        }
      }
    }
  }
</style>
