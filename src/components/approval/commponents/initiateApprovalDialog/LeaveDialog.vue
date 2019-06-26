<template>
  <div id="leave-dialog">
    <lj-dialog :visible.sync="leave_dialog_visible" :size="size">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>离职审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="groupChangeForm" :rules="leave_form_rule" :model="leave_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="enroll" label="入职时间">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker disabled v-model="user_info.enroll" type="date"
                                      placeholder="自动获取"></el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="handover_id" label="工作交接人">
                    <div class="items-center iconInput">
                      <user-choose width="220" num="1" :disabled="false" title="必填" :show-icon="false"
                                   v-model="leave_form.handover_id">
                      </user-choose>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="org" label="所属部门">
                    <el-input disabled disabled v-model="user_info.org" placeholder="自动获取"
                              style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item required prop="seniority" label="工龄">
                    <el-input v-model="leave_form.seniority" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="position" label="所属岗位">
                    <el-input disabled disabled v-model="user_info.position" placeholder="自动获取"
                              style="width: 220px"></el-input>
                  </el-form-item>

                  <el-form-item prop="change_date" label="离职日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="leave_form.change_date" type="date" placeholder="必填"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_reason" label="离职原因">
                    <el-input type="textarea"
                              v-model="leave_form.change_reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="change_receipt" label="交接单">
                    <el-input type="textarea"
                              v-model="leave_form.change_receipt"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="leave_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!--          流程组件-->
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitLeave">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelLeave">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import _ from 'lodash';

  export default {
    name: "LeaveDialog",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['user_info_all', 'size'],
    data() {
      return {
        // 校验规则
        leave_form_rule: {
          seniority: [
            {required: true, message: '请输入工龄', trigger: ['blur', 'change']}
          ],
          change_date: [
            {required: true, message: '请选择离职日期', trigger: ['blur', 'change']}
          ],
          change_reason: [
            {required: true, message: '请输入离职原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          change_receipt: [
            {required: true, message: '请输入交接单', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          handover_id: [
            {required: true, message: '请选择工作交接人', trigger: ['blur', 'change']}
          ]
        },
        leave_dialog_visible: false,
        leave_form: {
          type: "dimission",
          enroll: null,
          // now_org: null,
          // now_position: null,
          // 离职原因
          change_reason: null,
          // 交接单
          change_receipt: null,
          // 离职日期
          change_date: null,
          // 工龄
          seniority: null,
          // 工作交接人
          handover_id: null,
          attachment: []
        },
        user_info: null
      }
    },
    methods: {
      open() {
        this.leave_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll,
          org: this.user_info_all.org[0].name,
          position: this.user_info_all.position[0].name,
        }
      },
      /**提交*/
      submitLeave() {
      },
      /**取消*/
      cancelLeave() {
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










