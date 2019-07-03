<template>
  <div id="theme_name" class='theme1'>
    <div id='approval' :class="{'approval':message_visible}">

      <div class="header_btns">
        <p :class='{"activeTag":chosenTag == item.value}'
           v-for='item in auditType'
           :key='item.value'
           @click="changeAuditType(item)">
          <i :class='["icons",item.icons]'></i>
          <span>{{item.tit}}</span>
        </p>
      </div>

      <transition appear name="approval-slide">
        <!--      报备审批-->
        <ReportApproval v-if="chosenTag==1"></ReportApproval>

        <!--      办公审批-->
        <OfficeApproval v-if="chosenTag==2"></OfficeApproval>
      </transition>
    </div>
  </div>
</template>

<script>
  import ReportApproval from './commponents/reportApproval'
  import OfficeApproval from './commponents/offigiceApproval'

  export default {
    components: {
      //报备审批
      ReportApproval,
      //办公审批
      OfficeApproval
    },
    computed: {
      message_visible() {
        return this.$store.state.approval.approval_message_visible
      },
    },
    data() {
      return {
        // 切换标签
        chosenTag: 1,
        // 审核类型
        auditType: [
          {
            tit: '报备审核',
            value: 1,
            icons: 'icons_app'
          },
          {
            tit: '办公审核',
            value: 2,
            icons: 'icons_ban'
          }
        ]
      }
    },
    methods: {
      changeAuditType(item) {
        this.chosenTag = item.value
        if (this.chosenTag == 1) {
          this.$store.dispatch('change_message_visible_value', true);
        }
      }
    },
    async mounted() {
      // await this.getApprovalTypeList();
      // await this.getChoseApprovalTypeList();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/approval/index.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      /*审核标签*/
      .header_btns {
        p {
          color: #d2d2d2;
          cursor: pointer;
          @include confirmImg('juxing_hui.png', 'theme1');

          .icons_app {
            @include confirmImg('baobeishenhe_hui.png', 'theme1');
          }

          .icons_ban {
            @include confirmImg('bangongshenpi_hui.png', 'theme1');
          }
        }

        p.activeTag {
          color: #fff;
          cursor: pointer;
          @include confirmImg('juxing_hong.png', 'theme1');

          .icons_app {
            @include confirmImg('baobeishenhe_bai.png', 'theme1');
          }

          .icons_ban {
            @include confirmImg('bangongshenpi_bai.png', 'theme1');
          }
        }
      }

      .approval-slide-enter-active {
        @include transition(all 0.6s linear);
      }

      .approval-slide-leave-active {
        @include transition(all 0.6s linear);
      }

      .approval-slide-enter, .approval-slide-leave-to {
        @include transform(scale(0));
        opacity: 0;
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




