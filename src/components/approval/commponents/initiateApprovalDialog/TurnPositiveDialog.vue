<template>
  <div id="turn-positive-dialog">
    <lj-dialog :visible.sync="turn_positive_dialog_visible" :size="size">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>转正申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="turnPositiveForm" :rules="turn_positive_form_rule" :model="turn_positive_form"
                     style="text-align: left" size="small" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="forward_time" label="实际转正日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="user_info.forward_time" type="date" placeholder="必填"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required prop="enroll" label="入职时间">
                    <div class="items-center iconInput">
                      <el-date-picker disabled v-model="user_info.enroll" type="date"
                                      placeholder="自动获取"></el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="trial_salary" label="试用期薪资">
                    <el-input v-model="turn_positive_form.trial_salary" placeholder="必填"
                              style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required prop="expect_forward_time" label="预期转正日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="turn_positive_form.expect_forward_time" type="date"
                                      placeholder="必填">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="positive_salary" label="转正后薪资">
                    <el-input v-model="turn_positive_form.positive_salary" placeholder="必填"
                              style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="自我评价">
                    <el-input type="textarea"
                              v-model="turn_positive_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="turn_positive_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!--          流程组件-->
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitTurnPositive">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelTurnPositive">取消
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
    name: "TurnPositiveDialog",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['user_info_all', 'size'],
    data() {
      return {
        // 校验规则
        turn_positive_form_rule: {
          // 预期转正日期
          expect_forward_time: [
            {required: true, message: '请选择预期转正日期', trigger: ['blur', 'change']}
          ],
          // 实际转正日期
          forward_time: [
            {required: true, message: '请选择实际转正日期', trigger: ['blur', 'change']}
          ],
          // 试用期薪资
          trial_salary: [
            {required: true, message: '请输入试用期薪资', trigger: ['blur', 'change']}
          ],
          // 转正后薪资
          positive_salary: [
            {required: true, message: '请输入转正后薪资', trigger: ['blur', 'change']}
          ],
          // 自我评价
          reason: [
            {required: true, message: '请输入自我评价', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        turn_positive_dialog_visible: false,
        turn_positive_form: {
          type: "positive",
          // 入职时间
          enroll: null,
          // 预期转正日期
          expect_forward_time: null,
          // 实际转正日期
          forward_time: null,
          // 试用期薪资
          trial_salary: null,
          // 转正后薪资
          positive_salary: null,
          // 自我评价
          reason: null,
          // 附件
          attachment: [],
        },
        user_info: null,
      }
    },
    methods: {
      open() {
        this.turn_positive_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll
        }
      },
      /**提交 */
      submitTurnPositive() {
      },
      /**取消 */
      cancelTurnPositive() {
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


