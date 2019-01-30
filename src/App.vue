<template>
  <div id="app" class="scroll_bar" :class="'app' + theme_name">
    <header class="items-bet">
      <div class="headLeft items-center">
        <span class="items-center">
          <span>南京</span>
          <b>❄</b>
          <span>小雪</span>
          <label>-1～1.5°C</label>
        </span>
        <span @click="showModules()" class="showButton">
          部门列表
        </span>
      </div>
      <div class="items-center">
        <div>
          <select v-model="theme_name">
            <option value="1">简约中国风</option>
            <option value="2">科技风</option>
            <option value="3">小清新</option>
            <option value="4">文艺森系</option>
          </select>
        </div>
        <div class="items-center personal">
          <span>冯宝宝</span>
          <p>
            <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
          </p>
        </div>
      </div>
    </header>
    <div id="moduleList" :class="{'moduleList':moduleList}">
      <div class="justify-around">
        <div v-for="(item,index) in modules" class="list items-column" :class="'list-' + (index + 1)">
          <p></p>
          <div class="justify-center">
            <h1 class="writingMode">
              <span>{{item.title}}</span>
              <span>{{item.English}}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
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
        theme_name: '1',
        moduleList: false,
        modules: [
          {
            title: '总裁办',
            English: 'Presidents',
          },
          {
            title: '财务中心',
            English: 'Finacial Center',
          },
          {
            title: '人力资源中心',
            English: 'Personal Adminstration',
          },
          {
            title: '新媒体运营中心',
            English: 'Social Media Center',
          },
          {
            title: '营销中心',
            English: 'Marketing Center',
          },
          {
            title: '客服中心',
            English: 'Customer Service',
          },
          {
            title: '乐伽大学',
            English: 'Lejia College',
          },
          {
            title: '风险控制',
            English: 'Risk Management',
          },
          {
            title: '知识产权保护',
            English: 'Intellectual Property Protection',
          },
        ],
      }
    },
    mounted() {

    },
    watch: {},
    computed: {},
    methods: {
      showModules() {
        this.moduleList = !this.moduleList;
      }
    },
  }
</script>

<style lang="scss">
  @import "./assets/scss/common.scss";

  @mixin appImg($l) {
    $url: './assets/image/' + $l;
    @include bgImage($url);
  }

  @mixin moduleImg($n ,$m) {
    $url: './assets/image/module/' + $m + '/' + $n;
    @include bgImage($url);
  }

  @mixin defaultImg($n) {
    @for $i from 1 through 9 {
      .list-#{$i} {
        p {
          @include moduleImg('module#{$i}.png', $n);
        }
      }
    }
  }

  @mixin hoverImg($n) {
    @for $i from 1 through 9 {
      .list-#{$i}:hover {
        p {
          @include moduleImg('modulechoose#{$i}.png', $n);
        }
      }
    }
  }

  #app {
    color: $color874;
    height: 100%;
    /*头部*/
    header {
      height: 80px;
      position: fixed;
      left: 0;
      right: 0;
      padding: 0 60px;
      z-index: 30;
      .headLeft {
        > span {
          b, span {
            margin-right: 20px;
          }
          b {
            font-size: 30px;
          }
          label {
            font-size: 16px;
          }
        }
        .showButton {
          margin-left: 30px;
          cursor: pointer;
        }
      }
      .items-center {
        .personal {
          cursor: pointer;
          span {
            margin: 0 20px;
          }
          p {
            @include radius(10px);
            overflow: hidden;
            width: 45px;
            height: 45px;
          }
        }
      }
    }
    /*复选框*/
    select {
      color: $colorFFF;
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
    /*阻止外边距溢出*/
    #theme_name {
      margin-top: 80px;
      > div {
        &:before {
          content: '';
          display: table;
        }
      }
    }
    /*模态框列表*/
    #moduleList {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 80px 180px 0;
      z-index: 24;
      @include transScale(0);
      @include transOrigin();
      @include transition(all, .6s);
      > div {
        .list {
          cursor: pointer;
          p {
            width: 66px;
            height: 66px;
            margin-bottom: 20px;
          }
          div {
            padding: 40px 20px 0;
            height: 600px;
            h1 {
              span:first-of-type {
                font-size: 28px;
              }
              span:last-of-type {
                margin-top: 20px;
                font-size: 18px;
              }
            }
          }
        }
        .list:hover {
          div {
            color: $colorFFF;
          }
        }
      }
    }
    /*显示模态框*/
    #moduleList.moduleList {
      @include transScale(1);
    }
  }

  #app.app1 {
    background-color: $color2F2;
    select {
      color: $colorFFF;
    }
    #moduleList {
      background-color: $colorFFF;
      > div {
        @include moduleImg("yunhuan.png", 'theme1');
        background-size: 42% 80%;
        @include defaultImg('theme1');
        @include hoverImg('theme1');
        .list:hover {
          div {
            @include moduleImg("moduledianji.png", 'theme1');
          }
        }
      }
    }
  }

  #app.app2 {
    color: $colorDFF;
    @include appImg("2.jpg");
    header {
      select {
        color: $colorDFF;
      }
    }
  }

  #app.app3 {
    @include appImg("3.jpg");
    header {
      color: $color874;
    }
  }

  #app.app4 {
    @include appImg("4.png");
    header {
      color: $color874;
    }
  }
</style>
