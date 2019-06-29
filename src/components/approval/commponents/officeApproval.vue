<template>
  <div id="office_approval">
    <!--    头部审批按钮-->
    <div class="header">
      <!--发起审批 我审批的 我发起的 抄送我的 暂不处理-->
      <div class='header_methods'>
        <div :class='["methods_box",item.value == currentStatusType ?"methods_box_active":""]'
             v-for='item in statusTypes'
             :key='item.value'
             @click='getComponentInfo(item)'>
          {{item.title}}
        </div>
      </div>

      <!--    搜索-->
      <div v-if="hasInitiate" id="office-search">
        <i class='icons icons_search'></i>
      </div>
    </div>

    <!--      发起审批-->
    <!--    <initiate-approval></initiate-approval>-->

    <!--      审批列表-->
    <!--    <ApprovalList></ApprovalList>-->

    <!--    动态组件-->
    <transition appear name="approval-Switch">
      <component ref="approvalType"
                 v-if="approvalType.component"
                 :is="approvalType.component"/>
    </transition>


  </div>
</template>

<script>
  import InitiateApproval from './initiateApproval'
  import ApprovalList from './approvalList'

  export default {
    name: "officeApproval",
    components: {
      //发起审批
      InitiateApproval,
      // 审批列表
      ApprovalList
    },
    data() {
      return {
        approvalType: {
          component: InitiateApproval
        },
        statusTypes: [
          {
            value: 1,
            title: '发起审批',
            component: InitiateApproval
          },
          {
            value: 2,
            title: '我审批的',
            component: ApprovalList
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
        isCaputer: true,

        // 是否为发起审批
        hasInitiate: true,
      }
    },
    methods: {
      /**动态加载组件 */
      getComponentInfo(statusItem) {
        // 右侧搜索是否渲染
        this.hasInitiate = statusItem.value == 1 ? true : false
        // 切换样式
        this.currentStatusType = statusItem.value
        // 动态组件
        this.approvalType.component = statusItem.component
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

      /*.approval-Switch-enter-active {
        @include transition(all 0.6s linear);
      }

      .approval-Switch-leave-active {
        @include transition(all 0.6s linear);
      }

      .approval-Switch-enter, .approval-Switch-leave-to {
        @include transform(scale(0));
        opacity: 0;
      }*/
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
