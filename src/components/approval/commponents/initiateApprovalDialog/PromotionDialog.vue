<template>
  <div id="promotion-dialog">
    <lj-dialog :visible.sync="promotion_dialog_visible"
               :size="size"
               @close="cancelPromotion">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>文职晋升申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="promotionForm" :rules="promotion_form_rule" :model="promotion_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-row>
                <!--              第一列-->
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item prop="enroll" label="入职时间">
                    <div class="items-center iconInput">
                      <el-date-picker disabled v-model="user_info.enroll" type="date"
                                      placeholder="自动获取">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="old_salary" label="原有薪资">
                    <el-input v-model.number="promotion_form.old_salary" placeholder="必填"
                              style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
                <!--              第二列-->
                <el-col :span="8">
                  <el-form-item prop="org" label="所属部门">
                    <el-input disabled disabled v-model="user_info.org" placeholder="自动获取"
                              style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="now_org" label="晋升后部门">
                    <org-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                v-model="promotion_form.now_org"
                                ref="orgChoose">
                    </org-choose>
                  </el-form-item>

                  <el-form-item required prop="now_salary" label="晋升后薪资">
                    <el-input v-model.number="promotion_form.now_salary" placeholder="必填"
                              style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
                <!--              第三列-->
                <el-col :span="8">
                  <el-form-item prop="position" label="所属岗位">
                    <el-input disabled disabled v-model="user_info.position" placeholder="自动获取"
                              style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="now_position" label="晋升后岗位">
                    <post-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                 ref="postChoose"
                                 v-model="promotion_form.now_position">
                    </post-choose>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_reason" label="晋升原因">
                    <el-input type="textarea"
                              v-model="promotion_form.change_reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--              <el-row>-->
              <!--                <el-col :span="24">-->
              <!--                  <el-form-item required prop="change_receipt" label="交接单">-->
              <!--                    <el-input type="textarea"-->
              <!--                              v-model="promotion_form.change_receipt"-->
              <!--                              :autosize="{ minRows: 2, maxRows: 14}"-->
              <!--                              placeholder="必填">-->
              <!--                    </el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->


              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="promotion_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="promotion_form.priority">
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
                             :type="promotion_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>

          <!--          流程组件-->
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitPromotion">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelPromotion">取消
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
      type: "civilian_promotion",
      enroll: null,
      // 晋升后部门
      now_org: null,
      // 晋升后岗位
      now_position: null,
      // 晋升原因
      change_reason: null,
      // 交接单
      // change_receipt: null,
      // 原有薪资
      old_salary: null,
      // 晋升后薪资
      now_salary: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "PromotionDialog",
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
        promotion_form_rule: {
          now_org: [
            {required: true, message: '请选择晋升后部门', trigger: ['blur', 'change']}
          ],
          now_position: [
            {required: true, message: '请选择晋升后岗位', trigger: ['blur', 'change']}
          ],
          change_reason: [
            {required: true, message: '请输入晋升原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          // change_receipt: [
          //   {required: true, message: '请输入交接单', trigger: ['blur', 'change']},
          //   {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          // ],
          old_salary: [
            {required: true, message: '请输入原有薪资', trigger: ['blur', 'change']}
          ],
          now_salary: [
            {required: true, message: '请输入晋升后薪资', trigger: ['blur', 'change']}
          ]
        },
        promotion_dialog_visible: false,
        promotion_form: createEmpty(),
        user_info: null
      }
    },
    methods: {
      reset() {
        this.promotion_form = createEmpty()
        this.$refs.promotionForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.promotion_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll,
          org: this.user_info_all.org[0].name,
          position: this.user_info_all.position[0].name,
          user_id: this.user_info_all.id,
          org_id: this.user_info_all.org[0].id,
        }
        this.promotion_form.enroll = this.user_info_all.staff.enroll
      },
      /**提交*/
      submitPromotion() {
        this.$refs['promotionForm']
          .validate((valid) => {
            if (valid) {
              this.promotion_form.enroll = this.myUtils.formatDate(this.promotion_form.enroll, 'yyyy-MM-dd')
              let {name, enroll, org, position} = this.user_info
              let {old_salary, now_salary, change_reason} = this.promotion_form
              let data = {
                ...this.promotion_form,
                enroll,
                more_data: [
                  {key: '申请人', value: name},
                  {key: '入职时间', value: enroll},
                  {key: '所属部门', value: org},
                  {key: '所属岗位', value: position},
                  {key: '晋升后部门', value: this.$refs.orgChoose.org_name.join(' ')},
                  {key: '晋升后岗位', value: this.$refs.postChoose.post_name.join(' ')},
                  {key: '原有薪资', value: old_salary},
                  {key: '晋升后薪资', value: now_salary},
                  {key: '晋升原因', value: change_reason},
                  // {key: '交接单', value: change_receipt}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.promotion_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelPromotion() {
        this.promotion_dialog_visible = false;
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









