<template>
  <div id="transfer-dialog">
    <lj-dialog :visible.sync="transfer_dialog_visible"
               :size="size"
               @close="cancelTransfer">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>个人异动/调岗审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="transferForm" :rules="transfer_form_rule" :model="transfer_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-row>
                <!--              第一列-->
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="now_org" label="转入部门">
                    <org-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                v-model="transfer_form.now_org"
                                ref="orgChoose">
                    </org-choose>
                  </el-form-item>


                </el-col>
                <!--              第二列-->
                <el-col :span="8">
                  <el-form-item prop="enroll" label="入职时间">
                    <div class="items-center">
                      <el-date-picker disabled v-model="user_info.enroll" type="date" style="width: 220px"
                                      placeholder="自动获取">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="now_position" label="转入岗位">
                    <post-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                 v-model="transfer_form.now_position"
                                 ref="postChoose">
                    </post-choose>
                  </el-form-item>


                </el-col>
                <!--              第三列-->
                <el-col :span="8">
                  <el-form-item prop="org" label="原部门">
                    <!--              <org-choose width="418" num="1" :disabled="false" title="自动获取" :show-icon="false"-->
                    <!--                          v-model="user_info.org">-->
                    <!--              </org-choose>-->
                    <el-input disabled v-model="user_info.org" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_reason" label="调岗原因">
                    <el-input type="textarea"
                              v-model="transfer_form.change_reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_receipt" label="异动申请单以及异动交接单">
                    <el-select v-model="transfer_form.change_receipt" clearable placeholder="请选择交接单">
                      <el-option
                        v-for="item in change_receipt_options"
                        :key="item.id"
                        :label="item.contract_number"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="transfer_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="transfer_form.priority">
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
                             :type="transfer_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitTransfer">提交</el-button>
          <el-button size="small" type="info" @click="cancelTransfer">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import ApprovalProcess from '../ApprovalProcess';

  /**初始化数据 */
  function createEmpty() {
    return {
      type: "personal_change",
      // 入职时间
      enroll: null,
      // 转入部门
      now_org: null,
      // 转入岗位
      now_position: null,
      // 调岗原因
      change_reason: null,
      // 异动申请单以及异动交接单附件
      change_receipt: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "TransferPosition",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    watch: {
      user_info_all(newValue, oldValue) {
        this.getUserInfo()
      }
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        isLoading: true,
        // 校验规则
        transfer_form_rule: {
          now_org: [
            {required: true, message: '请选择转入部门', trigger: ['blur', 'change']}
          ],
          now_position: [
            {required: true, message: '请选择转入岗位', trigger: ['blur', 'change']}
          ],
          change_reason: [
            {required: true, message: '请输入调岗原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          change_receipt: [
            {required: true, message: '请选择异动申请单以及异动交接单', trigger: ['blur', 'change']}
          ]
        },

        transfer_dialog_visible: false,

        transfer_form: createEmpty(),
        user_info: {
          name: null,
          enroll: null,
          org: null,
          user_id: null,
          org_id: null,
        },
        change_receipt_options: []
      }
    },
    methods: {
      reset() {
        this.transfer_form = createEmpty()
        this.$refs.transferForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.transfer_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll,
          org: this.user_info_all.org[0].name,
          user_id: this.user_info_all.id,
          org_id: this.user_info_all.org[0].id,
        }
        this.transfer_form.enroll = this.user_info_all.staff.enroll
      },
      /**获取交接单下来选项 */
      getChangeReceipt() {
        let url = `${globalConfig.contract_server}fdd/contract/get_info_by_staff/${this.user_info.user_id}`
        this.$http.get(url, {scene: 19})//合同场景
          .then(res => {
            if (res.code.endsWith('0')) {
              this.change_receipt_options = res.data
            } else {
              this.change_receipt_options = []
            }
          })
      },
      /**提交 */
      submitTransfer() {
        this.$refs['transferForm']
          .validate((valid) => {
            if (valid) {
              this.transfer_form.enroll = this.myUtils.formatDate(this.transfer_form.enroll, 'yyyy-MM-dd')
              let {name, enroll, org} = this.user_info

              let cloneForm = _.cloneDeep(this.transfer_form)
              let {change_reason, now_org, now_position} = cloneForm

              cloneForm.now_org = [
                {
                  id: now_org[0],
                  name: this.$refs.orgChoose.org_name[0]
                }
              ]

              cloneForm.now_position = [
                {
                  id: now_position[0],
                  name: this.$refs.postChoose.post_name[0]
                }
              ]
              let data = {
                ...cloneForm,
                more_data: [
                  {key: '申请人', value: name},
                  {key: '入职时间', value: enroll},
                  {key: '原部门', value: org},
                  {key: '转入部门', value: this.$refs.orgChoose.org_name.join(' ')},
                  {key: '转入岗位', value: this.$refs.postChoose.post_name.join(' ')},
                  {key: '调岗原因', value: change_reason}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.transfer_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消 */
      cancelTransfer() {
        this.transfer_dialog_visible = false;
        this.reset()
      },
    },
    created() {
      this.getUserInfo()
      this.getChangeReceipt()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>







