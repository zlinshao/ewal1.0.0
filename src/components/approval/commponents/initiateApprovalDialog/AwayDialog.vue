<template>
  <div id="away-dialog">
    <lj-dialog :visible.sync="away_dialog_visible"
               :size="size"
               @close="cancelAway">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>离宿申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="awayForm" :rules="away_form_rule" :model="away_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="离宿申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item label="离宿地址">
                    <house-community :style="{width:220+'px'}" @getHouseIdName="getHouseInfo">
                    </house-community>
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
                  <el-form-item required prop="date" label="离宿日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="away_form.date" type="date"
                                      placeholder="请选择">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="申请原因">
                    <el-input type="textarea"
                              v-model="away_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="away_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <el-row>
              <el-col :span="24">
                <el-form-item align="center" label="紧急程度">
                  <el-radio-group v-model="away_form.priority">
                    <el-radio :label="50">正常</el-radio>
                    <el-radio :label="60">重要</el-radio>
                    <el-radio :label="70">紧急</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <!--          流程组件-->
            <ApprovalProcess :user_info="user_info" :type="away_form.type"></ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitAway">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelAway">取消
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
      type: "leave_dormitory",
      // 申请日期
      date: null,
      // 申请原因
      reason: null,
      // 附件
      attachment: [],
      priority: 50,
    }
  }

  export default {
    name: "AwayDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        // 校验规则
        away_form_rule: {
          date: [
            {required: true, message: '请选择申请离宿日期', trigger: ['blur', 'change']}
          ],
          // house_type: [
          //   {required: true, message: '请选择', trigger: ['blur', 'change']}
          // ],
          // user_list: [
          //   {required: true, message: '请输入', trigger: ['blur', 'change']}
          // ],
          reason: [
            {required: true, message: '请输入申请离宿理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        away_dialog_visible: false,
        away_form: createEmpty(),
        user_info: null,
        house_info: {}
      }
    },
    methods: {
      reset() {
        this.away_form = createEmpty()
        this.$refs.awayForm.clearValidate()
      },
      open() {
        this.away_dialog_visible = true
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
      /**获取房屋信息 */
      getHouseInfo(val) {
        let {house_id, house_name} = val
        this.house_info.house_id = house_id
        this.house_info.house_name = house_name
      },
      /**提交*/
      submitAway() {
        /**校验房屋地址 */
        if (!this.house_info.house_id) {
          this.$LjMessage('warning', {title: '警告', msg: `请选择离宿地址`});
          return
        }
        this.$refs['awayForm']
          .validate((valid) => {
            if (valid) {
              this.away_form.date = this.myUtils.formatDate(this.away_form.date, 'yyyy-MM-dd')
              let data = {
                ...this.away_form,
                house_data: {
                  house_info: this.house_info
                }
              }
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.$LjMessageEasy(res, () => {
                    this.away_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelAway() {
        this.away_dialog_visible = false;
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












