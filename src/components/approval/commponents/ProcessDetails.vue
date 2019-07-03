<template>
  <div id="process_details">
    <lj-dialog :visible.sync="process_details_dialog_visible"
               :size="size"
               @close="cancelProcess">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{base_info.title}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="process-details">
            <div class="process-top-box" v-for="(assignee,index) in assigneeArr" :key="index">
              <div class="process-top-left">
                <span class="process-left-label">处理人</span>
                <span>{{assignee.name}}</span>
              </div>
              <div class="process-top-right">
                <span class="process-right-label">部门</span>
                <span>{{assignee.org_name}}</span>
              </div>
            </div>
            <div class="process-details-box">
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
                  <!--                  基础信息-->
                  <el-timeline-item placement="top"
                                    size="normal"
                                    color="#686874"
                                    :hide-timestamp="true">
                    <div class="approval-timeline">
                      <p class="timeline-text">

                      </p>
                      <div>

                      </div>
                    </div>
                  </el-timeline-item>
                  <!--                  审批信息-->
                  <el-timeline-item v-for="(activity, index) in activities"
                                    :key="index"
                                    placement="top"
                                    size="normal"
                                    color="#686874"
                                    :hide-timestamp="true">
                    <div class="approval-timeline">
                      <div class="avatar-img">
                        <img :src="activity.user.avatar?activity.user.avatar:'../../assets/image/no_avatar.png'">
                      </div>


                      <div class="timeline-info">
                        <div class="timeline-top">
                          <p class="avatar-name">
                            {{activity.user.name?activity.user.name:''}}
                          </p>
                          <p :class="['timeline-result',activity.result?'result-agree':'result-check']">
                            {{activity.result?activity.result:'审核中'}}
                          </p>
                        </div>

                        <p class="timeline-text">
                          {{activity.name}}
                        </p>
                      </div>

                      <div class="timeline-time">
                        {{activity.time}}
                      </div>

                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" v-for="(btn,index) in operateBtn" :key="index"
                     :type="btn.btn_key === 'agree'?'danger':'info'"
                     @click="operateBtnClick(btn)">
            {{btn.btn_tetx}}
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <TransferDialog ref="transferDialog" :row="row"></TransferDialog>
  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  import TransferDialog from './transferDialog';

  export default {
    name: "ProcessDetails",
    components: {
      LjDialog,
      TransferDialog
    },
    props: ['detailUrl', 'processUrl', 'row'],
    watch: {
      detailUrl(newValue, oldValue) {
        this.getProcessDetails(newValue)
      },
      processUrl(newValue, oldValue) {
        this.getApprovalRecord(newValue)
      },
      row(newValue, oldValue) {
        this.getHandleUser(newValue)
      }
    },
    data() {
      const url = globalConfig.humanResource_server
      return {
        size: {
          width: '1000px',
          height: '800px'
        },
        loading: false,
        process_details_dialog_visible: false,
        operateBtn: [
          {
            btn_tetx: "暂缓",
            btn_key: "suspend",
          },
          {
            btn_tetx: "转交",
            btn_key: "transfer",
          },
          {
            btn_tetx: "拒绝",
            btn_key: "refuse",
          },
          {
            btn_tetx: "同意",
            btn_key: "agree",
          },
        ],
        activities: [],
        base_info: {},
        base_info_arr: [],
        /**处理人 */
        assigneeArr: [],
        url
      }
    },
    methods: {
      open() {
        this.process_details_dialog_visible = true
      },
      /**取消 */
      cancelProcess() {

      },
      /**获取流程详情 */
      getProcessDetails(url) {
        this.showLoading(true)
        this.$http.get(url)
          .then(res => {
            this.showLoading(false)
            if (res.code === '20020') {
              this.base_info = res.data
            }
          })
      },
      /**获取审批记录 */
      getApprovalRecord(url) {
        this.showLoading(true)
        this.$http.get(url)
          .then(res => {
            this.showLoading(false)
            if (res.httpCode === 200) {
              delete res.httpCode
              this.activities = res
            }
          })
      },
      /**获取个人信息 */
      getLoginUser(assignee_id) {
        this.$http.get(`${this.url}staff/user/${assignee_id}?staff=0`)
          .then(res => {
            if (res.code == 20020) {
              let {name, org} = res.data
              let assigneeObj = {
                name: name,
                org_name: org[0].name
              }
              this.assigneeArr.push(assigneeObj)
            }
          })
      },
      /**获取处理人信息*/
      getHandleUser(row) {

        this.assigneeArr = []
        /**任务*/
        if (row.assignee) {
          this.getLoginUser(row.assignee)
        }
        /**流程 */
        if (row.taskInfo) {
          let assignee_ids = _.map(row.taskInfo, 'assignee')
          assignee_ids.forEach((item_id) => {
            this.getLoginUser(item_id)
          })
        }
      },
      /**点击操作按钮 */
      operateBtnClick(btn) {
        // 点击了转交
        if (btn.btn_key === "transfer") {
          this.$nextTick(() => {
            this.$refs.transferDialog.open()
          })
        }
      }
    },
    created() {
      this.getProcessDetails(this.detailUrl)
      this.getApprovalRecord(this.processUrl)
      this.getHandleUser(this.row)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/commponents/processDetails.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      .top-icon {
        @include confirmImg('mokuai.png', 'theme1')
      }

      .result-agree {
        color: rgba(9, 154, 113, 1);
        @include confirmImg('yty.png', 'theme1')
      }

      .result-check {
        color: rgba(255, 173, 13, 1);
        @include confirmImg('shz.png', 'theme1')
      }
    }
  }
</style>

