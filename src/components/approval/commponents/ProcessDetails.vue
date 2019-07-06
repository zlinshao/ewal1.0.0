<template>
  <div id="process_details">
    <lj-dialog :visible.sync="process_details_dialog_visible"
               :size="size"
               @close="close">
      <!--      拼命加载中-->
      <div v-if="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-if="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>{{base_info.title}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="process-details scroll_bar">

            <div class="process-top-box" v-if="assigneeArr.length === 0">
              <div class="process-top-left">
                <span class="process-left-label">处理人</span>
                <span>暂无</span>
              </div>
              <div class="process-top-right">
                <span class="process-right-label">部门</span>
                <span>暂无</span>
              </div>
            </div>

            <div v-else class="process-top-box" v-for="(assignee,index) in assigneeArr" :key="index">
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
              <div class="right-process">
                <el-timeline>
                  <!--                  基础信息-->
                  <el-timeline-item placement="top"
                                    size="normal"
                                    color="#686874"
                                    :hide-timestamp="true">
                    <!--                    发起人信息-->
                    <div class="approval-timeline">
                      <div class="avatar-img">
                        <img v-if="base_info.user && base_info.user.avatar"
                             :src="base_info.user?base_info.user.avatar:''">
                        <img v-else
                             src="../../../assets/image/no_avatar.png">
                      </div>
                      <div class="timeline-info">
                        <div class="timeline-top">
                          <p class="avatar-name">
                            {{base_info.user?base_info.user.name?base_info.user.name:'':''}}
                          </p>
                          <!--                          审核中-->
                          <!--                          <p :class="['timeline-result',activity.result?'result-agree':'result-check']">-->
                          <!--                            {{activity.result?activity.result:'审核中'}}-->
                          <!--                          </p>-->
                        </div>
                      </div>
                    </div>

                    <div class="approval-base-info">
                      <p class="base-info-text">
                        <span class="base-info-text-left">审批编号</span>：
                        <span>{{row.code}}</span>
                      </p>
                      <!--                      信息详情-->
                      <p class="base-info-text"
                         v-for="(item_data,index) in base_info.data?base_info.data.more_data:[]" :key="index">
                        <span class="base-info-text-left">{{item_data.key}}</span>：
                        <span>{{item_data.value}}</span>
                      </p>
                      <div
                        v-if="base_info.data && base_info.data.sanction_info && base_info.data.sanction_info.length > 0">
                        <p class="base-info-list"
                           v-for="(item_data,index) in base_info.data.sanction_info" :key="index">
                        <span v-for="(item,index) in item_data" :key="index">
                          <span v-if="item && item!=undefined">
                            <span class="base-info-text-list">{{item.key}}</span>
                            <span class="base-info-text-content">{{item.value}}</span>
                          </span>
                        </span>
                        </p>
                      </div>
                      <!--                      附件-->
                      <p class="base-info-attachment" v-if="base_info.attachment && base_info.attachment.length > 0">
                        <span class="base-info-text-left">附件</span>：
                        <!--                        附件 下载                     -->
                        <lj-upload :view-file="base_info.attachment" size="40" :disabled="true"></lj-upload>
                      </p>
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
                        <img v-if="activity.user && activity.user.avatar"
                             :src="activity.user && activity.user.avatar">
                        <img v-else
                             src="../../../assets/image/no_avatar.png">
                      </div>


                      <div class="timeline-info">
                        <div class="timeline-top" v-if="activity.user">
                          <p class="avatar-name">
                            {{(activity.user && activity.user.name)?activity.user.name:''}}
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
          <!--          动态按钮-->
          <el-button size="small"
                     v-if="!row.endTime"
                     v-for="(outcome_btn,index) in row.outcome_options" :key="index"
                     type="info"
                     @click="movePopoverClick(outcome_btn)">
            {{outcome_btn.title}}
          </el-button>
          <!--          静态按钮-->
          <el-button
            size="small"
            v-for="(btn,index) in operateBtnData" :key="btn.btn_key"
            :type="btn.btn_key === 'urgent' || btn.btn_key === 'read' || btn.btn_key === 'activate'?'danger':'info'"
            @click="operateBtnClick(btn)">
            {{btn.btn_text}}
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <TransferDialog ref="transferDialog"
                    :row="row"
                    @close-parent-dialog="closeDialog">
    </TransferDialog>
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
    props: ['detailUrl', 'processUrl', 'row', 'popoverBtnData'],
    watch: {
      detailUrl(newValue, oldValue) {
        this.getProcessDetails(newValue)
      },
      processUrl(newValue, oldValue) {
        this.getApprovalRecord(newValue)
      },
      row(newValue, oldValue) {
        this.getHandleUser(newValue)
      },
      popoverBtnData(newValue, oldValue) {
        this.operateBtnData = newValue
      }
    },
    data() {
      const url = globalConfig.humanResource_server
      return {
        size: {
          width: '1000px',
          height: '800px'
        },
        loading: true,
        process_details_dialog_visible: false,
        activities: [
          {
            user: {
              avatar: '',
              name: '',
            }
          }
        ],
        base_info: {
          attachment: [],
          data: {
            more_data: [],
            sanction_info: []
          },
          user: {
            avatar: "",
            name: "",
            result: "",
            time: "",
          }
        },
        /**处理人 */
        assigneeArr: [
          {
            name: '',
            org_name: ''
          }
        ],
        url,
        /**拼命加载中 */
        load_user: true,
        load_info: true,
        load_record: true,
        operateBtnData: []
      }
    },
    computed: {
      isLoading() {
        return this.load_user || this.load_info || this.load_record
      }
    },
    methods: {
      open() {
        this.process_details_dialog_visible = true
      },
      close() {
        /**清空表单数据 */
        this.process_details_dialog_visible = false
        this.activities = [
          {
            user: {
              avatar: '',
              name: '',
            }
          }
        ]
        this.base_info = {
          attachment: [],
          data: {
            more_data: [],
            sanction_info: []
          },
          user: {
            avatar: "",
            name: "",
            result: "",
            time: "",
          }
        }
        this.assigneeArr = [
          {
            name: '',
            org_name: ''
          }
        ]
        this.load_user = true
        this.load_info = true
        this.load_record = true
      },
      closeDialog() {
        this.close()
      },
      /**获取流程详情 */
      getProcessDetails(url) {
        this.base_info = {
          attachment: [],
          data: {
            more_data: [],
            sanction_info: []
          },
          user: {
            avatar: "",
            name: "",
            result: "",
            time: "",
          }
        }
        this.load_info = true
        this.$http.get(url)
          .then(res => {
            this.load_info = false
            if (res.code === '20020') {
              this.base_info = res.data
            }
          })
      },
      /**获取审批记录 */
      getApprovalRecord(url) {
        this.activities = [
          {
            user: {
              avatar: '',
              name: '',
            }
          }
        ]
        this.load_record = true
        this.$http.get(url)
          .then(res => {
            this.load_record = false
            if (res.httpCode === 200) {
              delete res.httpCode
              this.activities = res
            }
          })
      },
      /**获取个人信息 */
      getLoginUser(assignee_id) {
        this.load_user = true
        this.$http.get(`${this.url}staff/user/${assignee_id}?staff=0`)
          .then(res => {
            this.load_user = false
            if (res.code == 20020) {
              let {name, org} = res.data
              let assigneeObj = {
                name: name,
                org_name: org[0].name
              }
              this.assigneeArr.push(assigneeObj)
            } else {
              this.assigneeArr = [
                {
                  name: '',
                  org_name: ''
                }
              ]
            }
          })
      },
      /**获取处理人信息*/
      getHandleUser(row) {
        this.assigneeArr = []
        /**任务*/
        if (row.assignee) {
          this.getLoginUser(row.assignee)
          return
        }
        /**流程 */
        if (row.taskInfo) {
          let assignee_ids = _.map(row.taskInfo, 'assignee')
          assignee_ids.forEach((item_id) => {
            this.getLoginUser(item_id)
          })
          return
        }
        /**暂无处理人信息 */
        this.load_user = false
      },
      /**点击操作按钮 */
      operateBtnClick(btn) {
        let operate_info = {
          click_type: 'operate',
          row: this.row,
          btn
        }
        this.$emit('operatePopoverClick', operate_info)
      },
      movePopoverClick(btn) {
        let move_info = {
          click_type: 'move',
          row: this.row,
          btn
        }
        this.$emit('operatePopoverClick', move_info)
      },
      /**初始化数据你*/
      init() {
        this.operateBtnData = this.popoverBtnData
      }
    },
    created() {
      this.init()
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

