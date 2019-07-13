<template>
  <div id="add-office-dialog">
    <lj-dialog :visible.sync="secret_roster_dialog_visible"
               :size="size"
               @close="cancelSecretRoster">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>{{getTitle}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="secretRosterForm" :rules="secret_roster_form_rule" :model="secret_roster_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="look_user" label="申请人">
                    <user-choose v-model="secret_roster_form.look_user"
                                 title="请选择人员" num="1"
                                 width="220"
                                 ref="userChoose">
                    </user-choose>
                  </el-form-item>

                  <el-form-item required prop="use_date_range" label="使用日期段">
                    <el-date-picker v-model="secret_roster_form.use_date_range"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item prop="org" label="所属部门">
                    <el-input disabled v-model="secret_roster_form.org" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="date" label="申请日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker type="date" value-format="yyyy-MM-dd"
                                      v-model="secret_roster_form.date"
                                      placeholder="请选择日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="remarks" label="所需数据">
                    <el-input type="textarea"
                              v-model="secret_roster_form.remarks"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="请输入所需数据">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="申请原因">
                    <el-input type="textarea"
                              v-model="secret_roster_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="请输入申请原因">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="secret_roster_form.attachment" size="40"
                               style="position: absolute; top: -12px;">
                    </lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="secret_roster_form.priority">
                      <el-radio :label="50">正常</el-radio>
                      <el-radio :label="60">重要</el-radio>
                      <el-radio :label="70">紧急</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!--          流程组件-->
            <ApprovalProcess :user_info="user_info"
                             :type="type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitAddOffice">提交</el-button>
          <el-button size="small" type="info" @click="cancelSecretRoster">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ApprovalProcess from '../ApprovalProcess';

  /**初始化数据 */
  function createEmpty() {
    return {
      look_user: null,
      org: null,
      use_date_range: null,
      date: null,
      // 所需数据
      remarks: null,
      reason: "",
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "SecretRoster",
    components: {
      ApprovalProcess
    },
    computed: {
      getTitle() {
        console.log(this.type)
        return this.type === 'secret_roster' ? '绝密花名册使用审批' : '花名册使用审批'
      }
    },
    watch: {
      'secret_roster_form.look_user': {
        handler(val) {
          if (!val) {
            return
          }
          this.$http.getUserInfoById(val[0])
            .then(userInfo => {
                if (userInfo) {
                  let {org} = userInfo
                  org && (this.secret_roster_form.org = org[0].name)
                }
              }
            )
        },
        deep: true
      }
    },
    props: ['user_info_all', 'size', 'addUrl', 'type'],
    data() {
      return {
        isLoading: true,
        url: globalConfig.market_server,
        // 校验规则
        secret_roster_form_rule: {
          use_date_range: [
            {required: true, message: '请选择使用日期段', trigger: ['blur', 'change']}
          ],
          date: [
            {required: true, message: '请选择申请日期', trigger: ['blur', 'change']}
          ],
          // 所需数据
          remarks: [
            {required: true, message: '请输入所需数据', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          reason: [
            {required: true, message: '请输入申请理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        secret_roster_dialog_visible: false,
        secret_roster_form: createEmpty(),
        // 用户信息
        user_info: null
      }
    },
    methods: {
      reset() {
        this.secret_roster_form = createEmpty()
        this.$refs.secretRosterForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.secret_roster_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          org: this.user_info_all.org[0].name,
          user_id: this.user_info_all.id,
          org_id: this.user_info_all.org[0].id,
        }
      },
      /**提交*/
      submitAddOffice() {
        this.$refs['secretRosterForm']
          .validate((valid) => {
            if (valid) {
              let clone_form = _.cloneDeep(this.secret_roster_form)
              let {use_date_range, date, reason, remarks, look_user, org} = clone_form
              clone_form.use_date = {
                start_time: use_date_range[0],
                end_time: use_date_range[1],
              }
              clone_form.look_id = [
                {
                  id: look_user[0],
                  name: this.$refs.userChoose.user_name[0]
                }
              ]
              clone_form.type = this.type
              let data = {
                ...clone_form,
                more_data: [
                  {key: '申请人', value: this.$refs.userChoose.user_name[0]},
                  {key: '所属部门', value: org},
                  {key: '使用日期段', value: `${use_date_range[0]} - ${use_date_range[1]}`},
                  {key: '申请日期', value: date},
                  {key: '所需数据', value: remarks},
                  {key: '申请原因', value: reason}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.secret_roster_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelSecretRoster() {
        this.secret_roster_dialog_visible = false;
        this.reset()
      }
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>










