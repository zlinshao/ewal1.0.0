<template>
  <div id="village-container">
    <div class="flex">
      <div class="left">
        <div class="module-icon"></div>
        <div class="writingMode txt">{{ my_title }}</div>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['village'],
    data() {
      return {
        my_title: '',
      }
    },
    mounted() {},
    watch: {
      village: {
        handler(val) {
          this.my_title = val;
        },
        immediate: true,
        deep: true
      },
    },
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/common.scss";

  @mixin villageImg($m,$n) {
    $url: '../../../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #village-container {
      width: 100%;
      background-color: white;
      margin-bottom: 20px;
      > div {
        .left {
          color: $colorE33;
          flex: 0 1 50px;
          text-align: center;
          .module-icon {
            width: 50%;
            height: 50px;
            margin: 0 auto;
            @include villageImg('mokuai.png','theme1');
          }
          .txt {
            margin-top: 10px;
            font-size: 18px;
            line-height: 50px;
            font-family: 'jingDianXingShu';
          }
        }
        .right {
          flex: 1;
          width: 100%;
          padding: 20px;
        }
      }
    }
  }
</style>
