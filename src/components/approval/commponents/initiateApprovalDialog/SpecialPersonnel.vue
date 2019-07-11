<template>
  <div id="special-personnel-dialog">
    <lj-dialog :visible.sync="special_personnel_visible"
               :size="size"
               @close="cancelSpecialPersonnel">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>人事专用</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="specialPersonnelForm" :rules="special_personnel_form_rule" :model="special_personnel_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="cost_name" label="费用名称">
                    <el-input v-model="special_personnel_form.cost_name" placeholder="请输入"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item prop="cost_count" label="金额">
                    <el-input v-model="special_personnel_form.cost_count" placeholder="请输入"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="date" label="申请日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="special_personnel_form.date" type="date" value-format="yyyy-MM-dd"
                                      placeholder="请选择">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="remarks" label="备注">
                    <el-input type="textarea"
                              v-model="special_personnel_form.remarks"
                              :autosize="{ minRows: 2, maxRows: 14}">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="special_personnel_form.attachment" size="40"
                               style="position: absolute; top: -12px;">
                    </lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="special_personnel_form.priority">
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
                             :type="special_personnel_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitSpecialPersonnel">提交</el-button>
          <el-button size="small" type="info" @click="cancelSpecialPersonnel">取消</el-button>
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
      type: "special_personnel",
      cost_name: null,
      cost_count: null,
      date: null,
      // 备注
      remarks: null,
      reason: null,
      attachment: [],
      priority: 50
    }
  }

  var validatorPass1 = (rule, value, callback) => {
    let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请保留两位小数'))
    }
  }
  export default {
    name: "SpecialPersonnel",
    components: {
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        isLoading: true,
        url: globalConfig.market_server,
        // 校验规则
        special_personnel_form_rule: {
          cost_name: [
            {required: true, message: '请输入名称', trigger: ['blur', 'change']}
          ],
          cost_count: [
            {required: true, message: '请输入金额', trigger: ['blur', 'change']},
            {validator: validatorPass1, trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择日期', trigger: ['blur', 'change']}
          ]
        },
        special_personnel_visible: false,
        special_personnel_form: createEmpty(),
        // 用户信息
        user_info: null
      }
    },
    methods: {
      reset() {
        this.special_personnel_form = createEmpty()
        this.$refs.specialPersonnelForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.special_personnel_visible = true
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
      submitSpecialPersonnel() {
        this.$refs['specialPersonnelForm']
          .validate((valid) => {
            if (valid) {
              let clone_form = _.cloneDeep(this.special_personnel_form)
              let {cost_name, cost_count, date, remarks} = clone_form
              clone_form.cost_count = parseFloat(cost_count)
              let data = {
                ...clone_form,
                more_data: [
                  {key: '费用名称', value: cost_name},
                  {key: '金额', value: cost_count},
                  {key: '申请日期', value: date},
                  {key: '备注', value: remarks}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.special_personnel_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelSpecialPersonnel() {
        this.special_personnel_visible = false;
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











