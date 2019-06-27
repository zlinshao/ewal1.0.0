<template>
  <div id="salary-dialog">
    <lj-dialog :visible.sync="salary_dialog_visible" :size="size">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>薪资调整申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="groupChangeForm" :rules="salary_form_rule" :model="salary_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="old_salary" label="原有薪资">
                    <el-input disabled v-model="salary_form.old_salary" placeholder="必填"
                              style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="org" label="所属部门">
                    <el-input disabled disabled v-model="user_info.org" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>

                  <el-form-item required prop="salary" label="期望调整薪资">
                    <el-input disabled v-model="salary_form.salary" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item required prop="enroll" label="入职日期">
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

              <!--              <el-row>-->
              <!--                <el-col :span="24">-->
              <!--                  <el-form-item align="center" label="附件">-->
              <!--                    <lj-upload v-model="salary_form.attachment" size="40"-->
              <!--                               style="position: absolute; top: -12px;"></lj-upload>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
            </el-form>
          </div>

          <!--          流程组件-->
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

  export default {
    name: "Salary",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['user_info_all', 'size'],
    data() {
      return {
        // 校验规则
        salary_form_rule: {
          date: [
            {required: true, message: '请选择实施日期', trigger: ['blur', 'change']}
          ],
          salary: [
            {required: true, message: '必填', trigger: ['blur', 'change']}
          ],
          old_salary: [
            {required: true, message: '必填', trigger: ['blur', 'change']}
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
        salary_form: {
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
          remark: null
        },
        user_info: null
      }
    },
    methods: {
      open() {
        this.salary_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll,
          org: this.user_info_all.org[0].name
        }
      },
      /**提交*/
      submitSalary() {
      },
      /**取消*/
      cancelSalary() {
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









