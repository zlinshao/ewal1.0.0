<template>
  <div id="promotion-dialog">
    <lj-dialog :visible.sync="promotion_dialog_visible" :size="{width: 580 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>文职晋升申请</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form ref="groupChangeForm" :rules="promotion_form_rule" :model="promotion_form"
                   style="text-align: left" size="small" label-width="100px">

            <el-form-item required prop="name" label="申请人">
              <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 418px"></el-input>
            </el-form-item>

            <el-form-item required prop="org" label="所属部门">
              <el-input disabled disabled v-model="user_info.org" placeholder="自动获取" style="width: 418px"></el-input>
            </el-form-item>

            <el-form-item required prop="position" label="所属岗位">
              <el-input disabled disabled v-model="user_info.position" placeholder="自动获取"
                        style="width: 418px"></el-input>
            </el-form-item>

            <el-form-item required prop="enroll" label="入职时间">
              <div class="items-center iconInput">
                <el-date-picker disabled v-model="user_info.enroll" type="date" placeholder="自动获取"></el-date-picker>
              </div>
            </el-form-item>

            <el-form-item required prop="now_org" label="晋升后部门">
              <org-choose width="418" num="1" :disabled="false" title="必填" :show-icon="false"
                          v-model="promotion_form.now_org">
              </org-choose>
            </el-form-item>

            <el-form-item required prop="now_position" label="晋升后岗位">
              <post-choose width="418" num="1" :disabled="false" title="必填" :show-icon="false"
                           v-model="promotion_form.now_position">
              </post-choose>
            </el-form-item>

            <el-form-item required prop="change_reason" label="晋升原因">
              <el-input type="textarea"
                        v-model="promotion_form.change_reason"
                        :autosize="{ minRows: 2, maxRows: 14}"
                        placeholder="必填">
              </el-input>
            </el-form-item>

            <el-form-item required prop="old_salary" label="原有薪资">
              <el-input v-model="promotion_form.old_salary" placeholder="必填"
                        style="width: 418px"></el-input>
            </el-form-item>

            <el-form-item required prop="now_salary" label="晋升后薪资">
              <el-input v-model="promotion_form.now_salary" placeholder="必填"
                        style="width: 418px"></el-input>
            </el-form-item>


            <el-form-item required prop="change_receipt" label="交接单">
              <el-input type="textarea"
                        v-model="promotion_form.change_receipt"
                        :autosize="{ minRows: 2, maxRows: 14}"
                        placeholder="必填">
              </el-input>
            </el-form-item>


            <el-form-item align="center" label="附件">
              <lj-upload v-model="promotion_form.attachment" size="40"
                         style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitGroupChange">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelGroupChange">取消
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
    name: "PromotionDialog",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['user_info_all'],
    data() {
      return {
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
          change_receipt: [
            {required: true, message: '请输入交接单', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          old_salary: [
            {required: true, message: '请输入原有薪资', trigger: ['blur', 'change']}
          ],
          now_salary: [
            {required: true, message: '请输入晋升后薪资', trigger: ['blur', 'change']}
          ]
        },
        promotion_dialog_visible: false,
        promotion_form: {
          type: "civilian_promotion",
          enroll: null,
          // 晋升后部门
          now_org: null,
          // 晋升后岗位
          now_position: null,
          // 晋升原因
          change_reason: null,
          // 交接单
          change_receipt: null,
          // 原有薪资
          old_salary: null,
          // 晋升后薪资
          now_salary: null,
          // 附件
          attachment: []
        },
        user_info: null
      }
    },
    methods: {
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
        }
      },
      /**提交*/
      submitGroupChange() {
      },
      /**取消*/
      cancelGroupChange() {
      }
    },
    created() {
      this.getUserInfo()

    }
  }
</script>

<style lang="scss" scoped>

</style>









