<template>
  <div id="notice-dialog">
    <lj-dialog :visible.sync="notice_dialog_visible" :size="size">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>公告审核审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="noticeForm" :rules="notice_form_rule" :model="notice_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="date" label="公告日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="notice_form.date" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item required prop="announcement_sign" label="公告署名">
                    <el-input v-model="notice_form.announcement_sign" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required label="公共类型" prop="announcement_type">
                    <el-select v-model="notice_form.announcement_type">
                      <el-option v-for="(item,index) in announcement_type" :key="index" :value="index + 1"
                                 :label="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item required prop="announcement_title" label="公告标题">
                    <el-input v-model="notice_form.announcement_title" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="announcement_content" label="公告内容">
                    <el-input type="textarea"
                              v-model="notice_form.announcement_content"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="notice_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!--          流程组件-->
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitNotice">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelNotice">取消
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
    name: "NoticeDialog",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['size'],
    data() {
      return {
        // 校验规则
        notice_form_rule: {
          // 日期
          date: [
            {required: true, message: '请选择日期', trigger: ['blur', 'change']}
          ],
          // 公告类型
          announcement_type: [
            {required: true, message: '请选择', trigger: ['blur', 'change']}
          ],
          // 公告标题
          announcement_title: [
            {required: true, message: '请输入公告标题', trigger: ['blur', 'change']}
          ],
          // 公告内容
          // announcement_content: [
          //   {message: '请输入公告内容', trigger: ['blur', 'change']},
          //   {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          // ],
          announcement_content: [
            {required: true, message: '请输入公告内容', trigger: ['blur', 'change']}
          ],
          // 公告署名
          announcement_sign: [
            {required: true, message: '请输入公告署名', trigger: ['blur', 'change']}
          ]
        },
        notice_dialog_visible: false,
        announcement_type: ['奖励', '惩罚', '通知', '会议'],
        notice_form: {
          type: "announcement",
          date: null,
          // 公告类型
          announcement_type: null,
          // 公告标题
          announcement_title: null,
          // 公告内容
          announcement_content: null,
          // 公告署名
          announcement_sign: null,
          // 附件
          attachment: []
        }
      }
    },
    methods: {
      open() {
        this.notice_dialog_visible = true
      },
      /**提交 */
      submitNotice() {
      },
      /**取消 */
      cancelNotice() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>

