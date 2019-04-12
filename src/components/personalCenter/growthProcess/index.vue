<template>
  <div id="growth_process" class="scroll_bar">
    <div class="m-container">
      <div v-for="item in growthList" class="m-container-item" :style="{width:growthList.length<5?`${100/growthList.length}%`:`20%`}">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div class="m-container-item-content">
          <span class="red-circle"></span>
          【{{item.content}}】
          <span class="red-circle"></span>
        </div>
      </div>


      <!--<div class="m-container-item">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div class="m-container-item-content">
          <span class="red-circle"></span>
          【卢卡库老夫金克拉记录】
          <span class="red-circle"></span>
        </div>
      </div>
      <div class="m-container-item">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div class="m-container-item-content">
          <span class="red-circle"></span>
          【卢卡库老夫金克拉记录】
          <span class="red-circle"></span>
        </div>
      </div>
      <div class="m-container-item">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div class="m-container-item-content">
          <span class="red-circle"></span>
          【卢卡库老夫金克拉记录】
          <span class="red-circle"></span>
        </div>
      </div>
      <div class="m-container-item"></div>
      <div class="m-container-item"></div>
      <div class="m-container-item"></div>
      <div class="m-container-item"></div>
      <div class="m-container-item"></div>
      <div class="m-container-item"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "growthProcess",
    data() {
      return {
        growthList:[
          {
            content:'2019年3月11日入职',
          },
          {
            content:'2019年4月11日离职',
          },
          {
            content:'2019年5月11日入职',
          },
          {
            content:'2019年6月11日入职',
          },
          {
            content:'2019年7月11日离职',
          },
          {
            content:'2019年6月11日入职',
          },
          // {
          //   content:'2019年7月11日离职',
          // },
          // {
          //   content:'2019年6月11日入职',
          // },
          // {
          //   content:'2019年7月11日离职',
          // },
        ],
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/growthProcess/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #growth_process {
      @include personalCenterImg('beijing.png', 'theme1');
    }

    .m-container {
      @include personalCenterImg('liuxian.png', 'theme1');
    }
  }

  #theme_name.theme2 {
    #growth_process {

    }
  }

  #theme_name.theme3 {
    #growth_process {

    }
  }

  #theme_name.theme4 {
    #growth_process {

    }
  }
</style>
