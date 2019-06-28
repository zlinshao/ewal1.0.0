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
      <div class="right-process"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            placement="top"
            size="normal"
            color="#686874"
            :hide-timestamp="true">
            <div class="approval-timeline">
              <p class="timeline-text">
                {{activity.name}}
              </p>
              <div v-if="activity.assginees">
                <div class="timeline-avatar"
                     v-for="(item_act, item_index) in activity.assginees"
                     :key="item_index">
                  <div class="avatar-img">
                    <img :src="item_act.avatar?item_act.avatar:''" alt="">
                  </div>
                  <p class="avatar-name">
                    {{item_act.name?item_act.name:''}}
                  </p>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
  const processConfig = require('../js/processKey.json')
  export default {
    name: "ApprovalProcess",
    inject: [],
    props: ['user_info', 'type'],
    data() {
      const url = globalConfig.approval_sever
      return {
        url,
        loading: false,
        processData: {
          processDefinitionKey: '',
          tenantId: 'hr',
          userId: '',
          orgId: ''
        },
        activities: []
      }
    },
    methods: {
      /**根据流程获取审批人 */
      getProcessApprover() {
        this.loading = true
        let data = {
          processDefinitionKey: processConfig[this.type],
          tenantId: 'hr',
          userId: this.user_info.user_id,
          orgId: this.user_info.org_id
        }
        this.$http.get(`${this.url}/assignment/process-definition-key`, data)
          .then(res => {
            this.loading = false
            if (res.httpCode === 200) {
              delete res.httpCode
              this.activities = res
            }
          })
      }
    },
    created() {
      this.getProcessApprover()
    }
  }
</script>

<style lang="scss">
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
