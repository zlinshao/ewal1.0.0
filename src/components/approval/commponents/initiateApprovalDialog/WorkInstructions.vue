<template>
  <div id="use-chapter-dialog">
    <lj-dialog :visible.sync="work_inst_visible"
               :size="size"
               @close="cancelUseChapter">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>工作请示</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="workInstForm" :rules="work_inst_form_rule" :model="work_inst_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="emergency" label="工作紧急程度">
                    <el-select v-model="work_inst_form.emergency" clearable placeholder="请选择" style="width: 220px">
                      <el-option
                        v-for="item in emergency_options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item prop="org" label="所属部门">
                    <el-input disabled v-model="user_info.org" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="date" label="申请日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="work_inst_form.date" type="date"
                                      value-format="yyyy-MM-dd"
                                      placeholder="请选择">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="事由">
                    <el-input type="textarea"
                              v-model="work_inst_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="content" label="具体内容">
                    <el-input type="textarea"
                              v-model="work_inst_form.content"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="work_inst_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="work_inst_form.priority">
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
                             :type="work_inst_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitAddOffice">提交</el-button>
          <el-button size="small" type="info" @click="cancelUseChapter">取消</el-button>
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
      type: "work_instructions",
      // 申请日期
      date: '',
      emergency: null,
      // 申请原因
      reason: null,
      content: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "WorkInstructions",
    components: {
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        isLoading: true,
        url: globalConfig.market_server,
        // 校验规则
        work_inst_form_rule: {
          date: [
            {required: true, message: '请选择申请日期', trigger: ['blur', 'change']}
          ],
          emergency: [
            {required: true, message: '请输入工作紧急程度', trigger: ['blur', 'change']}
          ],
          reason: [
            {required: true, message: '请输入事由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入具体内容', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        work_inst_visible: false,
        work_inst_form: createEmpty(),
        emergency_options: [
          {id: 1, name: '暂缓'},
          {id: 2, name: '普通'},
          {id: 3, name: '紧急'}
        ],
        // 用户信息
        user_info: null
      }
    },
    methods: {
      reset() {
        this.work_inst_form = createEmpty()
        this.$refs.workInstForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.work_inst_visible = true
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
        this.$refs['workInstForm']
          .validate((valid) => {
            if (valid) {
              let {name, org} = this.user_info
              let clone_form = _.cloneDeep(this.work_inst_form)
              let {date, reason, emergency, content} = clone_form
              let data = {
                ...clone_form,
                more_data: [
                  {key: '申请人', value: name},
                  {key: '所属部门', value: org},
                  {key: '申请日期', value: date},
                  {key: '工作紧急程度', value: emergency},
                  {key: '事由', value: reason},
                  {key: '具体内容', value: content}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.work_inst_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelUseChapter() {
        this.work_inst_visible = false;
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











