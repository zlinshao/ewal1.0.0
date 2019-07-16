<template>
  <div id="group-change-dialog">
    <lj-dialog :visible.sync="group_change_dialog_visible"
               :size="size"
               @close="cancelGroupChange">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>整组异动/调岗审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="groupChangeForm" :rules="group_change_form_rule" :model="group_change_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="date" label="调岗日期">
                    <div class="items-center" style="width: 220px">
                      <el-date-picker v-model="group_change_form.date" type="date" placeholder="必填"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required prop="old_org" label="原部门">
                    <org-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                v-model="group_change_form.old_org"
                                ref="oldOrgChoose">
                    </org-choose>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required prop="now_org" label="转入部门">
                    <org-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                v-model="group_change_form.now_org"
                                ref="orgChoose">
                    </org-choose>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_reason" label="调岗原因">
                    <el-input type="textarea"
                              v-model="group_change_form.change_reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_receipt" label="异动申请单以及异动交接单">
                    <el-select v-model="group_change_form.change_receipt" clearable placeholder="请选择交接单">
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
                    <lj-upload v-model="group_change_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="group_change_form.priority">
                      <el-radio :label="50">正常</el-radio>
                      <el-radio :label="60">重要</el-radio>
                      <el-radio :label="70">紧急</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <ApprovalProcess :user_info="user_info" :type="group_change_form.type"
                             @is-show-loading="isLoading = $event"></ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitGroupChange">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelGroupChange">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import ApprovalProcess from '../ApprovalProcess';

  const processData = require('../../js/processKey.json')

  /**初始化数据 */
  function createEmpty() {
    return {
      type: "group_change",
      // 转入部门
      now_org: null,
      // 转入岗位
      // now_position: null,
      // 调岗原因
      change_reason: null,
      // 附件
      attachment: [],
      // 原部门
      old_org: null,
      // 交接单
      change_receipt: null,
      // 调岗日期
      date: null,
      priority: 50
    }
  }

  export default {
    name: "GroupChange",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        isLoading: true,
        // 校验规则
        group_change_form_rule: {
          now_org: [
            {required: true, message: '请选择转入部门', trigger: ['blur', 'change']}
          ],
          // now_position: [
          //   {required: true, message: '请选择转入岗位', trigger: ['blur', 'change']}
          // ],
          change_reason: [
            {required: true, message: '请输入调岗原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          change_receipt: [
            {required: true, message: '请选择异动申请单以及异动交接单', trigger: ['blur', 'change']}
          ],
          date: [
            {required: true, message: '请输入调岗日期', trigger: ['blur', 'change']}
          ],
          old_org: [
            {required: true, message: '请输入原部门', trigger: ['blur', 'change']}
          ]
        },
        group_change_dialog_visible: false,
        group_change_form: createEmpty(),
        change_receipt_options: [],
        user_info: null
      }
    },
    methods: {
      reset() {
        this.group_change_form = createEmpty()
        this.$refs.groupChangeForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.group_change_dialog_visible = true
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
      /**提交*/
      submitGroupChange() {
        this.$refs['groupChangeForm']
          .validate((valid) => {
            if (valid) {
              this.group_change_form.date = this.myUtils.formatDate(this.group_change_form.date, 'yyyy-MM-dd')
              let {name} = this.user_info
              let cloneForm = _.cloneDeep(this.group_change_form)
              let {date, now_org, old_org, change_reason} = cloneForm

              cloneForm.now_org = [
                {
                  id: now_org[0],
                  name: this.$refs.orgChoose.org_name[0]
                }
              ]

              cloneForm.old_org = [
                {
                  id: old_org[0],
                  name: this.$refs.oldOrgChoose.org_name[0]
                }
              ]

              let data = {
                ...cloneForm,
                more_data: [
                  {key: '申请人', value: name},
                  // {key: '转入岗位', value: this.$refs.applyPost.post_name.join(' ')},
                  // {key: '调岗组员', value: this.$refs.uerChoose.user_name.join(' ')},
                  {key: '原部门', value: this.$refs.oldOrgChoose.org_name.join(' ')},
                  {key: '转入部门', value: this.$refs.orgChoose.org_name.join(' ')},
                  {key: '调岗日期', value: date},
                  {key: '调岗原因', value: change_reason}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.group_change_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelGroupChange() {
        this.group_change_dialog_visible = false;
        this.reset()
      }
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








