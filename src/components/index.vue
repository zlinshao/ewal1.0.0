<template>
  <div id="index">
    <div class="justify-around">
      <div class="main center-column" v-for="item in myData">
        <p>{{item.title}}</p>
        <div class="contents">
          <div class="space-column">
            <p></p>
            <h1 class="writingMode">
              模块简介模块简介模块简介模块简介 模块简介模块简介模块简介
            </h1>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
    <footer>工作虽忙，也要注意休息~</footer>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        myData: [
          {
            title: '企业头条',
          },
          {
            title: '俱乐部',
          },
          {
            title: '公司资料',
          },
          {
            title: '员工关怀',
          },
        ],
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/index/index.scss";

  #theme_name.theme1 {
    #index {

    }
  }

  #theme_name.theme2 {
    #index {
      @mixin indexImg($m) {
        $url: '../assets/image/index/' + $m;
        @include bgImage($url);
      }
      .main {
        p {
          @include indexImg('theme2/toubujuxing.png');
        }
        .contents {
          @include indexImg('theme2/waibiankuang.png');
          div {
            &:hover {
              @include indexImg('theme2/xuanzhongmokuai.png');
            }
            p {
              @include indexImg('theme2/yuanquan.png');
            }
            h2 {
              @include indexImg('theme2/gengduo.png');
            }
          }
        }
      }
    }
  }

  #theme_name.theme3 {
    #index {

    }
  }
</style>
