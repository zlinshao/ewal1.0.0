<template>
  <div id="car-loan-dialog">
    <lj-dialog :visible.sync="car_loan_visible"
               :size="size"
               @close="cancelCarLoan">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>还车贷专用申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="carLoanForm" :rules="car_loan_form_rule" :model="car_loan_form"
                     style="text-align: left;" size="small" label-width="120px">
              <el-row>
                <el-col :span="12" :pull="8">
                  <el-form-item prop="user_car_id" label="还车贷人员名单">
                    <user-choose v-model="car_loan_form.user_car_id" title="请选择人员"
                                 width="220"
                                 @user-choose-name="userCarList">
                    </user-choose>
                  </el-form-item>
                </el-col>

                <el-col :span="12" :pull="8">
                  <el-form-item required prop="date" label="日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="car_loan_form.date" type="date" value-format="yyyy-MM-dd"
                                      placeholder="请选择">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" :pull="8">
                  <el-form-item prop="remarks" label="备注">
                    <el-input type="textarea"
                              v-model="car_loan_form.remarks"
                              :autosize="{ minRows: 2, maxRows: 14}">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" :pull="8">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="car_loan_form.attachment" size="40"
                               style="position: absolute; top: -12px;">
                    </lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" :pull="8">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="car_loan_form.priority">
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
                             :type="car_loan_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitCarLoan">提交</el-button>
          <el-button size="small" type="info" @click="cancelCarLoan">取消</el-button>
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
      type: "car_loan",
      date: null,
      user_car_id: [],
      user_list_name: [],
      user_list: null,
      remarks: null,
      reason: null,
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "CarLoan",
    components: {
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        isLoading: true,
        url: globalConfig.market_server,
        // 校验规则
        car_loan_form_rule: {
          user_car_id: [
            {required: true, message: '请输入人员', trigger: ['blur', 'change']}
          ],
          date: [
            {required: true, message: '请选择日期', trigger: ['blur', 'change']},
          ],
          remarks: [
            {required: true, message: '请输入备注', trigger: ['blur', 'change']}
          ]
        },
        car_loan_visible: false,
        car_loan_form: createEmpty(),
        // 用户信息
        user_info: null
      }
    },
    methods: {
      userCarList(val) {
        this.car_loan_form.user_list_name = val
        this.car_loan_form.user_list = this.car_loan_form.user_car_id
          .map((item, index) => {
            return {
              id: item,
              name: val[index]
            }
          })
      },
      reset() {
        this.car_loan_form = createEmpty()
        this.$refs.carLoanForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.car_loan_visible = true
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
      submitCarLoan() {
        this.$refs['carLoanForm']
          .validate((valid) => {
            if (valid) {
              let clone_form = _.cloneDeep(this.car_loan_form)
              let {user_list_name, date, remarks} = clone_form
              let data = {
                ...clone_form,
                more_data: [
                  {key: '还车贷人名单', value: user_list_name.join(' ')},
                  {key: '申请日期', value: date},
                  {key: '备注', value: remarks}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.car_loan_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelCarLoan() {
        this.car_loan_visible = false;
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












