<template>
  <div id="app" class="scroll_bar" :class="'app' + theme_name">
    <header class="items-bet">
      <div class="headLeft">
        <span class="items-center">
          南京
          <b>❄</b>
          <label>
            1.5°C
          </label>
        </span>
      </div>
      <div class="items-center">
        <div>
          <select v-model="theme_name">
            <option value="1">中国风</option>
            <option value="2">科技风</option>
            <option value="3">小清新</option>
          </select>
        </div>
        <div class="items-center personal">
          <p>
            <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
          </p>
          <span>冯宝宝</span>
        </div>
      </div>
      <!--<a @click="routerLink('/login')">登录</a>-->
    </header>
    <div id="theme_name" :class="'theme' + theme_name">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        theme_name: '2',
      }
    },
    mounted() {

    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style lang="scss">
  @import "./assets/scss/common.scss";

  #app {
    height: 100%;
    header {
      height: 80px;
      position: fixed;
      left: 0;
      right: 0;
      padding: 0 60px;
      background-color: rgba(0, 0, 0, .3);
      .headLeft {
        span {
          b {
            margin: 0 20px;
            font-size: 30px;
          }
          label {
            font-size: 16px;
          }
        }
      }
      .items-center {
        .personal {
          cursor: pointer;
          p {
            @include radius(50%);
            overflow: hidden;
            width: 50px;
            height: 50px;
            margin: 0 20px;
          }
        }
      }
    }
    select {
      padding: 6px 18px;
      background-color: rgba(0, 0, 0, .4);
      @include radius(6px);
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }
    select::-ms-expand {
      display: none;
    }
    #theme_name {
      margin-top: 80px;
      > div {
        &:before {
          content: '';
          display: table;
        }
      }
    }
  }

  #app.app1 {
    color: $colorFFF;
    @include bgImage("./assets/image/1.jpg");
    select {
      color: $colorFFF;
    }
  }

  #app.app2 {
    @include bgImage("./assets/image/2.jpg");
    header {
      color: $colorDFF;
      select {
        color: $colorDFF;
      }
    }
  }

  #app.app3 {
    @include bgImage("./assets/image/3.jpg");
    header {
      color: $colorFFF;
      select {
        color: $colorFFF;
      }
    }
  }
</style>
