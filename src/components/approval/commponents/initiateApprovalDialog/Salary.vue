<template>
  <div id="salary-dialog">
    <lj-dialog :visible.sync="salary_dialog_visible"
               :size="size"
               @close="cancelSalary">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>薪资调整申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="salaryForm" :rules="salary_form_rule" :model="salary_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="old_salary" label="原有薪资">
                    <el-input v-model.number="salary_form.old_salary" placeholder="必填"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item prop="org" label="所属部门">
                    <el-input disabled disabled v-model="user_info.org" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>

                  <el-form-item prop="salary" label="期望调整薪资">
                    <el-input v-model.number="salary_form.salary" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item prop="enroll" label="入职日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker disabled v-model="user_info.enroll" type="date" placeholder="必填"></el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="date" label="实施日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="salary_form.date" type="date" placeholder="必填"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="申请理由">
                    <el-input type="textarea"
                              v-model="salary_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="remark" label="备注">
                    <el-input type="textarea"
                              v-model="salary_form.remark"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="salary_form.priority">
                      <el-radio :label="50">正常</el-radio>
                      <el-radio :label="60">重要</el-radio>
                      <el-radio :label="70">紧急</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!--          流程组件-->
            <ApprovalProcess :user_info="user_info" :type="salary_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitSalary">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelSalary">取消
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

  /**初始化数据 */
  function createEmpty() {
    return {
      type: "salary",
      // 实施日期
      date: null,
      // 入职时间
      enroll: null,
      // 期望调整薪资
      salary: null,
      // 原有薪资
      old_salary: null,
      // 申请理由
      reason: null,
      // 备注
      remark: null,
      priority: 50
    }
  }

  export default {
    name: "Salary",
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
        salary_form_rule: {
          date: [
            {required: true, message: '请选择实施日期', trigger: ['blur', 'change']}
          ],
          salary: [
            {required: true, message: '请输入期望调整薪资', trigger: ['blur', 'change']}
          ],
          old_salary: [
            {required: true, message: '请输入原有薪资', trigger: ['blur', 'change']}
          ],
          reason: [
            {required: true, message: '请输入申请理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入备注', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
        },
        salary_dialog_visible: false,
        salary_form: createEmpty(),
        user_info: null
      }
    },
    methods: {
      reset() {
        this.salary_form = createEmpty()
        this.$refs.salaryForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.salary_dialog_visible = true
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
        this.salary_form.enroll = this.user_info_all.staff.enroll
      },
      /**提交*/
      submitSalary() {
        this.$refs['salaryForm']
          .validate((valid) => {
            if (valid) {
              this.salary_form.enroll = this.myUtils.formatDate(this.salary_form.enroll, 'yyyy-MM-dd')
              this.salary_form.date = this.myUtils.formatDate(this.salary_form.date, 'yyyy-MM-dd')
              let {name, org, enroll} = this.user_info
              let {old_salary, salary, date, reason, remark} = this.salary_form
              let data = {
                ...this.salary_form,
                more_data: [
                  {key: '申请人', value: name},
                  {key: '所属部门', value: org},
                  {key: '入职日期', value: enroll},
                  {key: '原有薪资', value: old_salary},
                  {key: '期望调整薪资', value: salary},
                  {key: '实施日期', value: date},
                  {key: '申请理由', value: reason},
                  {key: '备注', value: remark}
                ]
              }
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.$LjMessageEasy(res, () => {
                    this.salary_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelSalary() {
        this.salary_dialog_visible = false;
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









