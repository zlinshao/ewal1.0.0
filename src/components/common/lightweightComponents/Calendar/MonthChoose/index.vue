<template>
  <div id="month_choose">
      <div @click="addMonth(-1)" class="left-choose">
        <i></i>
      </div>
      <div class="month-content">
        {{month_content}}
      </div>
      <div @click="addMonth(1)" class="right-choose">
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
        month_content:'',
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
          this.month_content = this.getMonthContent(val);
        },
        immediate: true,
      },
    },
    methods: {
      addMonth(monthNum=1) {
        this.datetime = this.myUtils.formatDate(this.datetime,'yyyy-MM-dd');
        let curDate = new Date(this.datetime);
        /* 获取当前月份 */
        let curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + monthNum);
        this.datetime = curDate;
        this.$emit('input',this.datetime);
        //this.month_content = this.getMonthContent(this.datetime);
      },
      getMonthContent(date = new Date()) {
        return this.myUtils.formatDate(date,'yyyy-MM');
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../../assets/scss/common";

  @mixin monthChooseImg($m, $n) {
    $url: '../../../../../assets/image/common/lightweightComponents/Calendar/MonthChoose/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #month_choose {
      @include flex('flex-center');
      .month-content {
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
          @include monthChooseImg('jiantou.png','theme1');
        }
      }
      .right-choose {
        @include flex('flex-center');
        >i {
          display: inline-block;
          width: 6px;
          height: 10px;
          @include monthChooseImg('jiantou.png','theme1');
          transform:rotate(180deg);
        }
      }
    }
  }

  #theme_name.theme1 {
    #month_choose {
    }
  }

  #theme_name.theme2 {
    #month_choose {

    }
  }

  #theme_name.theme3 {
    #month_choose {

    }
  }

  #theme_name.theme4 {
    #month_choose {

    }
  }

</style>
