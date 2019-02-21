<template>
  <div id="president">
    <div class="items-center" :class="{'hhhhhhhh': hhhh}">
      <p :class="['p' + item]" v-for="item in 9">帅</p>
    </div>
    <div @click="hhhh = true">发的发顺丰撒</div>
    <div @click="hhhh = false">ffffff</div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        hhhh: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/index/index.scss";

  #president {
    div {
      position: relative;
      height: 300px;
      padding: 0 100px;
      justify-content: space-around;
      p {
        background-color: #CF2E33;
        height: 100%;
        color: #FFFFFF;
        padding: 30px 20px;
        opacity: 0;
        transform: translateX(-1920px);
        transition: all .3s;
      }
    }
    .hhhhhhhh {
      p {
        opacity: 1;
        transform: translateX(0);
      }
      .p9 {
        transition-delay: .1s;
      }
      .p8 {
        transition-delay: .2s;
      }
      .p7 {
        transition-delay: .3s;
      }
      .p6 {
        transition-delay: .4s;
      }
      .p5 {
        transition-delay: .5s;
      }
      .p4 {
        transition-delay: .6s;
      }
      .p3 {
        transition-delay: .7s;
      }
      .p2 {
        transition-delay: .8s;
      }
      .p1 {
        transition-delay: .9s;
      }
    }
  }
</style>
