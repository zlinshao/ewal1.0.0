<template>
  <div class="second-entry-dialog">
    <lj-dialog :visible.sync="second_entry_dialog_visible"
               :size="size"
               @close="cancelDialog">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>二次入职审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="secondEntryForm" style="text-align: left" size="small" label-width="120px"
                     :rules="second_entry_form_rule"
                     :model="second_entry_form">
              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="entry_id" label="申请人">
                    <user-choose ref="userChooseEntry" v-model="second_entry_form.entry_id" num="1"
                                 width="220">
                    </user-choose>
                  </el-form-item>

                  <el-form-item required prop="enroll" label="之前入职日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="second_entry_form.enroll" type="date"
                                      placeholder="请选择日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="change_date" label="二次入职日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="second_entry_form.change_date" type="date"
                                      placeholder="请选择日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item required prop="old_org" label="之前入职部门">
                    <org-choose width="220" num="1" :disabled="false" title="请选择部门" :show-icon="false"
                                v-model="second_entry_form.old_org"
                                ref="oldOrg">
                    </org-choose>
                  </el-form-item>

                  <el-form-item required prop="now_org" label="期望入职部门">
                    <org-choose width="220" num="1" :disabled="false" title="请选择部门" :show-icon="false"
                                v-model="second_entry_form.now_org"
                                ref="nowOrg">
                    </org-choose>
                  </el-form-item>

                  <el-form-item required prop="guarantor_id" label="担保人">
                    <user-choose ref="userChooseGuarantor" v-model="second_entry_form.guarantor_id" num="1"
                                 width="220">
                    </user-choose>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item required prop="old_position" label="之前担任岗位">
                    <post-choose title="请选择岗位" width="220" num="1"
                                 v-model="second_entry_form.old_position"
                                 ref="oldPost">
                    </post-choose>
                  </el-form-item>

                  <el-form-item required prop="now_position" label="期望入职岗位">
                    <post-choose title="请选择岗位" width="220" num="1"
                                 v-model="second_entry_form.now_position"
                                 ref="nowPost">
                    </post-choose>
                  </el-form-item>

                  <el-form-item required prop="phone" label="手机号">
                    <el-input v-model="second_entry_form.phone" placeholder="请输入手机号"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="second_entry_reason" label="二次入职原因">
                    <el-input type="textarea" placeholder="请输入二次入职原因"
                              v-model="second_entry_form.second_entry_reason"
                              :autosize="{ minRows: 2, maxRows: 14}">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_receipt" label="交接单">
                    <el-input type="textarea"
                              v-model="second_entry_form.change_receipt"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="请输入交接单">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload size="40" style="position: absolute; top: -12px;"
                               v-model="second_entry_form.attachment">
                    </lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item class="purchase-priority" align="center" label="紧急程度">
                    <el-radio-group v-model="second_entry_form.priority">
                      <el-radio :label="50">正常</el-radio>
                      <el-radio :label="60">重要</el-radio>
                      <el-radio :label="70">紧急</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <!--            流程组件-->
            <ApprovalProcess :user_info="user_info"
                             :type="second_entry_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitDialog">提交</el-button>
          <el-button size="small" type="info" @click="cancelDialog">取消</el-button>
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
      type: "second_entry",
      entry_id: null,
      old_org: null,
      old_position: null,
      enroll: null,
      now_org: null,
      now_position: null,
      change_date: null,
      second_entry_reason: null,
      guarantor_id: null,
      phone: null,
      change_receipt: null,
      attachment: [],
      priority: 50
    }
  }

  var validatorPass1 = (rule, value, callback) => {
    let reg = /^1[3456789]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('手机号码有误，请重填'))
    }
  }

  export default {
    name: "SecondEntry",
    props: ['user_info_all', 'size', 'addUrl'],
    components: {
      ApprovalProcess
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        second_entry_dialog_visible: false,
        // TODO
        isLoading: false,
        second_entry_form: createEmpty(),
        second_entry_form_rule: {
          entry_id: [
            {required: true, message: '请选择申请人', trigger: ['blur', 'change']}
          ],
          old_org: [
            {required: true, message: '请选择部门', trigger: ['blur', 'change']}
          ],
          old_position: [
            {required: true, message: '请选择岗位', trigger: ['blur', 'change']}
          ],
          enroll: [
            {required: true, message: '请选择日期', trigger: ['blur', 'change']}
          ],
          now_org: [
            {required: true, message: '请选择部门', trigger: ['blur', 'change']}
          ],
          now_position: [
            {required: true, message: '请选择岗位', trigger: ['blur', 'change']}
          ],
          change_date: [
            {required: true, message: '请选择日期', trigger: ['blur', 'change']}
          ],
          second_entry_reason: [
            {required: true, message: '请输入二次入职原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          guarantor_id: [
            {required: true, message: '请选择担保人', trigger: ['blur', 'change']}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: ['blur', 'change']},
            {validator: validatorPass1, trigger: 'blur'}
          ],
          change_receipt: [
            {required: true, message: '请输入交接单', trigger: ['blur', 'change']}
          ]
        },
        // 用户信息
        user_info: null
      }
    },
    computed: {},
    watch: {},
    methods: {
      open() {
        this.second_entry_dialog_visible = true
      },
      reset() {
        this.second_entry_form = createEmpty()
      },
      submitDialog() {
        let clone_form = _.cloneDeep(this.second_entry_form)
        /**校验 */
        this.$refs.secondEntryForm
          .validate(valid => {
            if (valid) {
              Object.keys(clone_form).map((item, index) => {
                switch (item) {
                  case 'enroll':
                  case 'change_date':
                    clone_form[item] = this.myUtils.formatDate(clone_form[item], 'yyyy-MM-dd');
                    break;
                  case 'entry_id':
                    clone_form['entry_id'] = {
                      id: clone_form['entry_id'][0],
                      name: this.$refs.userChooseEntry.user_name[0]
                    }
                    break;
                  case 'guarantor_id':
                    clone_form['guarantor_id'] = {
                      id: clone_form['guarantor_id'][0],
                      name: this.$refs.userChooseGuarantor.user_name[0]
                    }
                    break;
                  case 'old_org':
                    clone_form['old_org'] = [{
                      id: clone_form['old_org'][0],
                      name: this.$refs.oldOrg.org_name[0]
                    }]
                    break;
                  case 'now_org':
                    clone_form['now_org'] = [{
                      id: clone_form['now_org'][0],
                      name: this.$refs.nowOrg.org_name[0]
                    }]
                    break;
                  case 'old_position':
                    clone_form['old_position'] = [{
                      id: clone_form['old_position'][0],
                      name: this.$refs.oldPost.post_name[0]
                    }]
                    break;
                  case 'now_position':
                    clone_form['now_position'] = [{
                      id: clone_form['now_position'][0],
                      name: this.$refs.nowPost.post_name[0]
                    }]
                    break;
                }
              })
              let {
                entry_id,
                old_org,
                enroll,
                old_position,
                now_org,
                now_position,
                guarantor_id,
                phone,
                second_entry_reason,
                change_receipt,
                change_date
              } = clone_form
              let data = {
                ...clone_form,
                more_data: [
                  {key: '申请人', value: entry_id.name},
                  {key: '之前入职部门', value: old_org[0].name},
                  {key: '之前担任岗位', value: old_position[0].name},
                  {key: '之前入职日期', value: enroll},
                  {key: '期望入职部门', value: now_org[0].name},
                  {key: '期望入职岗位', value: now_position[0].name},
                  {key: '二次入职日期', value: change_date},
                  {key: '二次入职原因', value: second_entry_reason},
                  {key: '担保人', value: guarantor_id.name},
                  {key: '手机号', value: phone},
                  {key: '交接单', value: change_receipt},
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.second_entry_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      cancelDialog() {
        this.second_entry_dialog_visible = false
        this.reset()
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          org: this.user_info_all.org[0].name,
          user_id: this.user_info_all.id,
          org_id: this.user_info_all.org[0].id,
        }
      }
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style lang="scss">
  #theme_name.theme1 {
    #approval {

    }
  }
</style>

<style scoped lang="scss">
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>
