<template>
    <div id="lj_dialog" class="lj_dialog" v-if="dialog_visible">
      <div class="flex-center" @click.self="handleCloseDialog">
        <div class="lj_container" :style="style[lj_size]">
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
        props: ['visible','size'],
        data() {
            return {
              dialog_visible: false,
              lj_size: 'small',
              style: {
                mini: {
                  width: 1200 * 0.4 + 'px',
                  height: 800 * 0.4 + 'px'
                },
                small: {
                  width: 1200 * 0.6 + 'px',
                  height: 800 * 0.6 + 'px'
                },
                large: {
                  width: 1200 + 'px',
                  height: 800 + 'px'
                }
              }
            }
        },
        mounted() { },
        activated() {
        },
        watch: {
          visible(val) {
            this.dialog_visible = val;
          },
          size(val) {
            console.log(val);
            this.lj_size = val;
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
          /*background-color: white;*/
          @include lj_dialogImg('tankuang.png','theme1');
          background-size: contain;
          .j_lt {
            @include lj_dialogImg('lt.png','theme1');
          }
          .j_rt {
            @include lj_dialogImg('rt.png','theme1');
          }
          .j_lb {
            @include lj_dialogImg('lb.png','theme1');
          }
          .j_rb {
            @include lj_dialogImg('rb.png','theme1');
          }
          .close_btn {
            @include lj_dialogImg('close.png','theme1');
            background-size: contain;
          }
          .wen_bottom ,.wen_top{
            @include lj_dialogImg('bianjiao.png','theme1');
            background-size: contain;
          }
        }
      }
    }
  }
</style>
