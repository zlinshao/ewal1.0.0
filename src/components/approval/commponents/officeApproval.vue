<template>
  <div id="office_approval">
    <!--    头部审批按钮-->
    <div class="header">
      <!--发起审批 我审批的 我发起的 抄送我的 暂不处理-->
      <div class='header_methods'>
        <div :class='["methods_box",item.value == currentStatusType ?"methods_box_active":""]'
             v-for='item in statusTypes'
             :key='item.value'
             @click='currentStatusType = item.value'>
          {{item.title}}
        </div>
      </div>

      <!--    搜索-->
      <div id="office-search">
        <i class='icons icons_search'></i>
      </div>
    </div>

    <!--      发起审批-->
    <initiate-approval></initiate-approval>

  </div>
</template>

<script>
  import InitiateApproval from './initiateApproval'

  export default {
    name: "officeApproval",
    components: {
      //发起审批
      InitiateApproval
    },
    data() {
      return {
        statusTypes: [
          {
            value: 1,
            title: '发起审批'
          },
          {
            value: 2,
            title: '我审批的'
          },
          {
            value: 3,
            title: '我发起的'
          },
          {
            value: 4,
            title: '抄送我的'
          },
          {
            value: 5,
            title: '暂不处理'
          }
        ],
        currentStatusType: 1,
        isCaputer: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/index.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      .header {

        /*头部审批按钮*/
        .header_methods {
          .methods_box {
            color: #bbbbbb;
            @include confirmImg('duobiankuang_hui.png', 'theme1');
          }

          .methods_box_active {
            color: #cf2e33;
            @include confirmImg('duobiankuang_hong.png', 'theme1');
          }
        }

        /*右边搜索图标*/
        .icons_search {
          @include confirmImg('sousuo.png', 'theme1')
        }
      }
    }
  }

  #theme_name.theme2 {
    #approval {
    }
  }

  #theme_name.theme3 {
    #approval {
    }
  }

  #theme_name.theme4 {
    #approval {
    }
  }
</style>
