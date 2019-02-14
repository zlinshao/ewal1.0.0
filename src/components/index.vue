<template>
  <div id="index">
    <div class="justify-around">
      <div class="main items-column" :class="['main-' + (index + 1), {'translateDown': translateDown}]"
           v-for="(item,index) in myData" @click="moduleEntry()">
        <p class="flex-center">
          <span>{{item.title}}</span>
          <b></b>
        </p>
        <div class="contents">
          <div class="space-column">
            <p></p>
            <h1 class="writingMode">
              模块简介模块简介模块简介模块简介 模块简介模块简介模块简介
            </h1>
            <h2 @click.stop="moduleEntry('more')"></h2>
          </div>
        </div>
      </div>
    </div>
    <footer class="flex-center">
      <span>
        <i></i>
        <b>工作虽忙，也要注意休息～</b>
      </span>
    </footer>
    <div class="flex-center moduleWriting" v-if="moduleWriting">
      <div class="bet-column">
        <div class="items-bet moduleTop">
          <p>01</p>
          <p @click="moduleWriting = false">关闭</p>
        </div>
        <div class="flex moduleMain" v-for="(item,index) in moduleData" v-if="index === moduleChoose">
          <div class="mainLeft">
            <img src="http://img3.redocn.com/20100622/20100621_8c78a30dc5c10ef5552cwCXmHvkvaDCT.jpg">
          </div>
          <div class="bet-column mainRight">
            <div>
              <p>{{item.title}}</p>
              <span>{{item.content}}</span>
            </div>
            <span>更多&nbsp;></span>
          </div>
        </div>
        <div class="items-bet moduleFoot">
          <p class="items-center">
            <span v-for="(item,index) in moduleData.length" :class="{'spanHover': index === moduleChoose}"
                  @click="moduleChoose = index">
            </span>
          </p>
          <p class="items-center">
            <i @click="changingOver('remove')"></i>
            <b @click="changingOver('add')"></b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        translateDown: false,
        moduleWriting: false,
        moduleChoose: 1,
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
        moduleData: [
          {
            title: '反倒是卡',
            content: '山东黄金咖啡山东黄金咖啡士大夫回家看书犯得上发射点环境发会尽快送达方会尽快啦和艰苦奋斗和时间考虑发山东黄金咖啡山东黄金咖啡士大夫回家看了啊会尽快啦发生的符合健康是回复就开始大黄蜂就开始大幅就开始大家看附近ask地方对健康十分和加咖啡和健康撒法和开始打回复就卡萨丁回复就开始大黄蜂十大和加咖啡还是加咖啡会尽快送达很快乐',
          },
          {
            title: '反倒是卡11111',
            content: '山东黄金咖啡山东黄金咖啡士大夫回家看书犯得上发射点环境发会尽快送达方会尽快啦和艰苦奋斗和时间考虑发山东黄金咖啡山东黄金咖啡士大夫回家看了啊会尽快啦发生的符合健康是回复就开始大黄蜂就开始大幅就开始大家看附近ask地方对健康十分和加咖啡和健康撒法和开始打回复就卡萨丁回复就开始大黄蜂十大和加咖啡还是加咖啡会尽快送达很快乐',
          },
          {
            title: '反倒是卡22222',
            content: '山东黄金咖啡山东黄金咖啡士大夫回家看书犯得上发射点环境发会尽快送达方会尽快啦和艰苦奋斗和时间考虑发山东黄金咖啡山东黄金咖啡士大夫回家看了啊会尽快啦发生的符合健康是回复就开始大黄蜂就开始大幅就开始大家看附近ask地方对健康十分和加咖啡和健康撒法和开始打回复就卡萨丁回复就开始大黄蜂十大和加咖啡还是加咖啡会尽快送达很快乐',
          },
          {
            title: '反倒是卡33333',
            content: '山东黄金咖啡山东黄金咖啡士大夫回家看书犯得上发射点环境发会尽快送达方会尽快啦和艰苦奋斗和时间考虑发山东黄金咖啡山东黄金咖啡士大夫回家看了啊会尽快啦发生的符合健康是回复就开始大黄蜂就开始大幅就开始大家看附近ask地方对健康十分和加咖啡和健康撒法和开始打回复就卡萨丁回复就开始大黄蜂十大和加咖啡还是加咖啡会尽快送达很快乐',
          },
        ]
      }
    },
    mounted() {

    },
    activated() {
      let that = this;
      setTimeout(function () {
        that.translateDown = true;
      }, 10)
    },
    watch: {
      $route: {
        handler(val, oldVal) {
          this.translateDown = false;
        },
        deep: true// 深度观察监听
      }
    },
    methods: {
      changingOver(val) {
        switch (val) {
          case 'add':
            if (this.moduleChoose < this.moduleData.length - 1) {
              this.moduleChoose++;
            }
            break;
          case 'remove':
            if (this.moduleChoose > 0) {
              this.moduleChoose--;
            }
            break;
        }
      },
      moduleEntry(val = '') {
        if (val) {

        } else {
          this.moduleWriting = true;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/scss/index/index.scss";

  @mixin indexImg($m, $n) {
    $url: '../assets/image/index/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin defaultImg($n) {
    @for $i from 1 through 4 {
      .main-#{$i} {
        div {
          p {
            @include indexImg('module#{$i}.png', $n);
          }
        }
      }
    }
  }

  @mixin hoverImg($n) {
    @for $i from 1 through 4 {
      .main-#{$i}:hover {
        div {
          p {
            @include indexImg('modulechoose#{$i}.png', $n);
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #index {
      .main {
        .contents {
          div {
            h2 {
              @include indexImg('gengduodefault.png', 'theme1');
            }
            &:hover {
              h2 {
                @include indexImg('gengduo.png', 'theme1');
              }
            }
          }
        }
      }
      .main:hover {
        .contents {
          div {
            h2 {
              @include indexImg('gengduo.png', 'theme1');
            }
          }
        }
      }
      @include defaultImg('theme1');
      @include hoverImg('theme1');
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme1');
        }
      }
    }
  }

  #theme_name.theme2 {
    #index {
      .main {
        > p {
          @include indexImg('toubujuxing.png', 'theme2');
        }
        .contents {
          @include indexImg('waibiankuang.png', 'theme2');
          div {
            p {
              @include indexImg('yuanquan.png', 'theme2');
            }
            h2 {
              @include indexImg('gengduo.png', 'theme2');
            }
          }
        }
      }
      .main:hover {
        > p {
          @include indexImg('toubujuxingchoose.png', 'theme2');
        }
        .contents {
          &:hover {
            @include indexImg('xuanzhongmokuai.png', 'theme2');
          }
        }
      }
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme2');
        }
      }
    }
  }

  #theme_name.theme3 {
    #index {
      .main {
        .contents {
          @include indexImg('waibiankuang.png', 'theme3');
          div {
            h2 {
              @include indexImg('gengduo.png', 'theme3');
            }
          }
        }
      }
      .main:hover {
        .contents {
          @include indexImg('xuanzhongmokuai.png', 'theme3');
        }
      }
      @include hoverImg('theme3');
      @include defaultImg('theme3');
      footer {
        span {
          @include indexImg('tishiyu.png', 'theme3');
        }
      }
    }
  }

  #theme_name.theme4 {
    #index {
      .main {
        .contents {
          div {
            h2 {
              @include indexImg('gengduodefault.png', 'theme1');
            }
            &:hover {
              h2 {
                @include indexImg('gengduo.png', 'theme4');
              }
            }
          }
        }
      }
      .main:hover {
        .contents {
          @include indexImg('xuanzhongmokuai.png', 'theme4');
        }
      }
      @include defaultImg('theme4');
      footer {
        span {
          i {
            @include indexImg('tishiyu.png', 'theme4');
          }
        }
      }
    }
  }
</style>
