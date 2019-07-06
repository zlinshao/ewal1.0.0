<template>
  <div id="demand-dialog">
    <lj-dialog :visible.sync="demand_dialog_visible"
               :size="size"
               @close="cancelDemand">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>人员需求审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="demandForm" :rules="demand_form_rule" :model="demand_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="org_id" label="申请部门">
                    <org-choose width="220" num="1" :disabled="false" title="请选择部门" :show-icon="false"
                                v-model="demand_form.org_id"
                                ref="applyOrg">
                    </org-choose>
                  </el-form-item>

                  <el-form-item prop="number" label="所需人数">
                    <div style="width: 220px">
                      <el-input v-model.number="demand_form.number.min"
                                style="width: 49%" placeholder="请输入最小值"></el-input>
                      <el-input v-model.number="demand_form.number.max"
                                style="width: 49%" placeholder="请输入最大值"></el-input>
                    </div>
                  </el-form-item>

                  <el-form-item label="薪资范围" prop="salary">
                    <div style="width: 220px">
                      <el-input v-model.number="demand_form.salary.min"
                                style="width: 49%" placeholder="请输入最小值"></el-input>
                      <el-input v-model.number="demand_form.salary.max"
                                style="width: 49%" placeholder="请输入最大值"></el-input>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="expect_date" label="期望到岗日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="demand_form.expect_date" type="date"
                                      placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="position_id" label="需求岗位">
                    <post-choose width="220" num="1" title="请选择岗位" :show-icon="false"
                                 v-model="demand_form.position_id"
                                 ref="applyPost">
                    </post-choose>
                  </el-form-item>

                  <el-form-item prop="year" label="年龄范围">
                    <div style="width: 220px">
                      <el-input v-model.number="demand_form.year.min"
                                style="width: 49%" placeholder="请输入最小值"></el-input>
                      <el-input v-model.number="demand_form.year.max"
                                style="width: 49%" placeholder="请输入最大值"></el-input>
                    </div>
                  </el-form-item>

                  <el-form-item required label="工作经验" prop="experience">
                    <el-select v-model="demand_form.experience" style="width: 220px">
                      <el-option v-for="(item,index) in experience" :key="index" :value="index + 1"
                                 :label="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="now_count" label="现有人数">
                    <el-input v-model.number="demand_form.now_count" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required label="性别" prop="gender">
                    <el-select v-model="demand_form.gender" style="width: 220px">
                      <el-option v-for="(item,index) in gender" :key="index" :value="index + 1"
                                 :label="item"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item required label="学历" prop="education">
                    <el-select v-model="demand_form.education" style="width: 220px">
                      <el-option v-for="(item,index) in education" :key="index" :value="index + 1"
                                 :label="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="申请原因">
                    <el-input type="textarea"
                              v-model="demand_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="content" label="招聘要求">
                    <el-input type="textarea"
                              v-model="demand_form.content"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="demand_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="demand_form.priority">
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
                             :type="demand_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitDemand">提交</el-button>
          <el-button size="small" type="info" @click="cancelDemand">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import _ from 'lodash';

  import ApprovalProcess from '../ApprovalProcess';

  const processData = require('../../js/processKey.json')

  /**初始化数据 */
  function createEmpty() {
    return {
      type: "personnel_demand",
      org_id: [],
      position_id: [],
      // 现有人数
      now_count: null,
      // 所需人数
      number: {
        max: null,
        min: null,
      },
      year: {
        max: null,
        min: null
      },
      // 薪资范围
      salary: {
        max: null,
        min: null
      },
      // 工作经验
      experience: null,
      // 学历
      education: null,
      // 性别
      gender: null,
      // 期望到岗日期
      expect_date: null,
      // 申请原因
      reason: null,
      // 招聘要求
      content: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "demandDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['size', 'user_info_all'],
    watch: {
      user_info_all(newValue, oldValue) {
        this.getUserInfo()
      }
    },
    data() {
      return {
        isLoading: true,
        url: globalConfig.humanResource_server,
        // 校验规则
        demand_form_rule: {
          org_id: [
            {required: true, message: '请选择部门', trigger: ['blur', 'change']}
          ],
          position_id: [
            {required: true, message: '请选择岗位', trigger: ['blur', 'change']}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: ['blur', 'change']}
          ],
          experience: [
            {required: true, message: '请选择工作经验', trigger: ['blur', 'change']}
          ],
          education: [
            {required: true, message: '请选择学历', trigger: ['blur', 'change']}
          ],
          // 现有人数
          now_count: [
            {required: true, message: '请输入现有人数', trigger: ['blur', 'change']}
          ],
          // 期望到岗日期
          expect_date: [
            {required: true, message: '请选择到岗日期', trigger: ['blur', 'change']}
          ],
          // 申请理由
          reason: [
            {required: true, message: '请输入申请理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          // 招聘要求
          content: [
            {required: true, message: '请输入招聘要求', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },

        demand_dialog_visible: false,
        // 性别下拉选项
        gender: ['限男', '限女', '男优先', '女优先', '不限'],
        // 工作经验下拉选项
        experience: ['1年', '1-3年', '3-5年', '5-10年', '10年以上', '不限'],
        // 学历下拉选项
        education: _.map(this.DROPDOWN_CONSTANT.EDUCATION_BACKGROUND, 'name'),
        processKey: 'HR-ApplyForPersonnelDemand',
        demand_form: createEmpty(),
        user_info: {
          name: '',
          org: '',
          user_id: 0,
          org_id: 0,
        },
      }
    },
    methods: {
      reset() {
        this.demand_form = createEmpty()
        this.$refs.demandForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.demand_dialog_visible = true
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
      /**提交 */
      submitDemand() {
        /**校验字段 */
        let nV = this.$parent.compare(this.demand_form.number, this, '所需人数')
        let yV = this.$parent.compare(this.demand_form.year, this, '年龄范围')
        let sV = this.$parent.compare(this.demand_form.salary, this, '薪资范围')
        if (!(nV && yV && sV)) {
          return
        }
        this.$refs['demandForm']
          .validate((valid) => {
            if (valid) {
              this.demand_form.expect_date = this.myUtils.formatDate(this.demand_form.expect_date, 'yyyy-MM-dd')
              let {content, reason, number, salary, year, expect_date, experience, now_count, gender, education} = this.demand_form
              let data = {
                ...this.demand_form,
                detail: [{...this.demand_form}],
                more_data: [
                  {key: '申请部门', value: this.$refs.applyOrg.org_name.join('')},
                  {key: '所需人数', value: `${number.min} — ${number.max}`},
                  {key: '薪资范围', value: `${salary.min} — ${salary.max}`},
                  {key: '期望到岗日期', value: expect_date},
                  {key: '需求岗位', value: this.$refs.applyPost.post_name.join('')},
                  {key: '年龄范围', value: `${year.min} — ${year.max}`},
                  {key: '工作经验', value: this.experience[experience - 1]},
                  {key: '现有人数', value: now_count},
                  {key: '性别', value: this.gender[gender - 1]},
                  {key: '学历', value: this.education[education - 1]},
                  {key: '申请原因', value: reason},
                  {key: '招聘要求', value: content}
                ]
              }
              this.showLoading2(true)
              this.$http.post(`${this.url}/process/process`, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.demand_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消 */
      cancelDemand() {
        this.demand_dialog_visible = false
        this.reset()
      }

    },
    mounted() {
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>
