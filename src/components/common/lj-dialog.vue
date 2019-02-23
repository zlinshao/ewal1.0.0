<template>
    <div id="lj_dialog" class="lj_dialog" v-if="dialog_visible">
      <div class="flex-center" @click.self="handleCloseDialog">
        <div class="lj_container" :style="style[lj_size]">
          <slot></slot>
          <span class="close_btn" @click="handleCloseDialog"></span>
        </div>
        <span class="wen_top"></span>
        <span class="wen_bottom"></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: ['visible','size'],
        data() {
            return {
              dialog_visible: true,
              lj_size: 'small',
              style: {
                mini: {
                  width: 50 + '%',
                  height: 60 + '%'
                },
                small: {
                  width: 30 + '%',
                  height: 40 + '%'
                },
                large: {
                  width: 50 + '%',
                  height: 65 + '%'
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
          @include lj_dialogImg('tankuang.png','theme1');
          .close_btn {
            @include lj_dialogImg('close.png','theme1');
            background-size: contain;
          }
          .wen_top {
            @include lj_dialogImg('bianjiao.png','theme1');
            background-size: cover;
          }
        }
      }
    }
  }
</style>
