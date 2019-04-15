<template>
  <div id="year_choose">
      <div @click="addYear(-1)" class="left-choose">
        <i></i>
      </div>
      <div class="year-content">
        {{year_content}}
      </div>
      <div @click="addYear(1)" class="right-choose">
        <i></i>
      </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      value: {
        //default:new Date(),
      },
    },
    data() {
      return {
        datetime:new Date(),
        year_content:'',
      }
    },
    watch: {
      value: {
        handler(val,oldVal) {
          this.datetime = val;

        },
        immediate: true,
      },
      datetime: {
        handler(val,oldVal) {
          this.year_content = this.getYearContent(val);
        },
        immediate: true,
      },
    },
    methods: {
      addYear(yearNum=1) {
        this.datetime = this.myUtils.formatDate(this.datetime,'yyyy-MM-dd');
        let curDate = new Date(this.datetime);
        /* 获取当前月份 */
        let curYear = curDate.getFullYear();
        curDate.setFullYear(curYear + yearNum);
        this.datetime = curDate;
        this.$emit('input',this.datetime);
      },
      getYearContent(date = new Date()) {
        return this.myUtils.formatDate(date,'yyyy');
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../../assets/scss/common";

  @mixin yearChooseImg($m, $n) {
    $url: '../../../../../assets/image/common/lightweightComponents/Calendar/YearChoose/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #year_choose {
      @include flex('flex-center');
      .year-content {
        height: 35px;
        font-size: 26px;
        line-height: 35px;
        color: $color874;
      }
      .left-choose,.right-choose {
        display: inline-block;
        width: 20px;
        height: 20px;
        //background-color: red;
        margin: 5px 15px;
        cursor: pointer;
      }
      .left-choose {
        @include flex('flex-center');
        >i {
          display: inline-block;
          width: 6px;
          height: 10px;
          @include yearChooseImg('jiantou.png','theme1');
        }
      }
      .right-choose {
        @include flex('flex-center');
        >i {
          display: inline-block;
          width: 6px;
          height: 10px;
          @include yearChooseImg('jiantou.png','theme1');
          transform:rotate(180deg);
        }
      }
    }
  }

  #theme_name.theme1 {
    #year_choose {
    }
  }

  #theme_name.theme2 {
    #year_choose {

    }
  }

  #theme_name.theme3 {
    #year_choose {

    }
  }

  #theme_name.theme4 {
    #year_choose {

    }
  }

</style>
