<template>
  <div id="approval_process">
    <div class="approval-process-box">
      <!--      左侧标题-->
      <div class="left-title">
        <div class="top-icon">
        </div>
        <div class="main-text">
          审批流程
        </div>
      </div>
      <!--      右侧流程-->
      <div class="right-process">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ApprovalProcess",
    data() {
      return {
        activities: [
          {
            content: '直接主管',
            timestamp: '2018-04-15'
          },
          {
            content: '第2级主管',
            timestamp: '2018-04-13'
          },
          {
            content: '审批人',
            timestamp: '2018-04-11'
          },
          {
            content: '抄送人',
            timestamp: '2018-04-11'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/commponents/approvalProcess.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      .top-icon {
        @include confirmImg('mokuai.png', 'theme1')
      }
    }
  }
</style>
