<template>
  <div id="notice-dialog">
    <lj-dialog :visible.sync="notice_dialog_visible"
               :size="size"
               @close="cancelNotice">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>公告审核审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <!--            <el-form ref="noticeForm" :rules="notice_form_rule" :model="notice_form"-->
            <!--                     style="text-align: left" size="small" label-width="100px">-->

            <!--              <el-row>-->
            <!--                <el-col :span="8">-->
            <!--                  <el-form-item required prop="date" label="公告日期">-->
            <!--                    <div class="items-center iconInput" style="width: 220px">-->
            <!--                      <el-date-picker v-model="notice_form.date" type="date" placeholder="选择日期"></el-date-picker>-->
            <!--                    </div>-->
            <!--                  </el-form-item>-->

            <!--                  <el-form-item required prop="announcement_sign" label="公告署名">-->
            <!--                    <el-input v-model="notice_form.announcement_sign" placeholder="必填" style="width: 220px"></el-input>-->
            <!--                  </el-form-item>-->
            <!--                </el-col>-->
            <!--                <el-col :span="8">-->
            <!--                  <el-form-item required label="公告类型" prop="announcement_type">-->
            <!--                    &lt;!&ndash;                    <el-select v-model="notice_form.announcement_type">&ndash;&gt;-->
            <!--                    &lt;!&ndash;                      <el-option v-for="(item,index) in announcement_type" :key="index" :value="index + 1"&ndash;&gt;-->
            <!--                    &lt;!&ndash;                                 :label="item"></el-option>&ndash;&gt;-->
            <!--                    &lt;!&ndash;                    </el-select>&ndash;&gt;-->
            <!--                    <dropdown-list ref="dropdown1" title="必选"-->
            <!--                                   width="220px"-->
            <!--                                   :url="`${this.url}announcement/announcement_type`"-->
            <!--                                   v-model="notice_form.announcement_type"></dropdown-list>-->
            <!--                  </el-form-item>-->
            <!--                </el-col>-->
            <!--                <el-col :span="8">-->
            <!--                  <el-form-item required prop="announcement_title" label="公告标题">-->
            <!--                    <el-input v-model="notice_form.announcement_title" placeholder="必填" style="width: 220px"></el-input>-->
            <!--                  </el-form-item>-->
            <!--                </el-col>-->
            <!--              </el-row>-->

            <!--              <el-row>-->
            <!--                <el-col :span="24">-->
            <!--                  <el-form-item required prop="announcement_content" label="公告内容">-->
            <!--                    <el-input type="textarea"-->
            <!--                              v-model="notice_form.announcement_content"-->
            <!--                              :autosize="{ minRows: 2, maxRows: 14}"-->
            <!--                              placeholder="必填">-->
            <!--                    </el-input>-->
            <!--                  </el-form-item>-->
            <!--                </el-col>-->
            <!--              </el-row>-->

            <!--              <el-row>-->
            <!--                <el-col :span="24">-->

            <!--                </el-col>-->
            <!--              </el-row>-->

            <!--              <el-row>-->
            <!--                <el-col :span="24">-->
            <!--                  <el-form-item align="center" label="附件">-->
            <!--                    <lj-upload v-model="notice_form.attachment" size="40"-->
            <!--                               style="position: absolute; top: -12px;"></lj-upload>-->
            <!--                  </el-form-item>-->
            <!--                </el-col>-->
            <!--              </el-row>-->
            <!--            </el-form>-->


            <el-form ref="noticeForm" :rules="notice_form_rule" :model="notice_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="type_id" label="公告类型">
                    <dropdown-list ref="dropdown1" title="必选" :url="`${this.url}announcement/announcement_type`"
                                   width="220px"
                                   v-model="notice_form.type_id">
                    </dropdown-list>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="title" label="标题">
                    <el-input v-model="notice_form.title" placeholder="必填" style="width: 220px"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="send_scope" label="发送范围">
                    <org-choose width="210" title="必选" v-model="notice_form.send_scope.org_id"></org-choose>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item required prop="date" label="公告日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="notice_form.date" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="notice_form.file_info" size="40"
                               style="position: absolute; top: -12px;">
                    </lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="content" label="正文">
                    <el-input type="textarea" v-model="notice_form.content" placeholder="必填"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-for="(item,index) in notice_form.sanction_info" :key="index">
                <el-col :span="8">
                  <el-form-item label="类型">
                    <dropdown-list :json-arr="DROPDOWN_CONSTANT.NOTICEQUESTIONNAIRE.PUBLISHNOTICE.TYPE"
                                   title="请选择类型"
                                   width="220px"
                                   v-model="notice_form.sanction_info[index].sanction_type">
                    </dropdown-list>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="奖罚金额">
                    <el-input v-model.number="notice_form.sanction_info[index].money" placeholder="请输入奖惩金额"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="责任人">
                    <user-choose num="1" title="请选择责任人"
                                 width="220px"
                                 v-model="notice_form.sanction_info[index].user_id">
                    </user-choose>
                    <span v-if="index==0" class="btn_add" style="position: absolute;right: -4px;top: 3px;"
                          @click="handleSanctionInfo(index)">
                    +
                  </span>
                    <span v-if="index>=1" class="btn_add"
                          style="position: absolute;right: -4px;top: 3px;background-color: #D2D2D2;"
                          @click="handleSanctionInfo(index)">
                    -
                  </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>


            <!--          流程组件-->
            <ApprovalProcess :user_info="user_info" :type="notice_form.type"></ApprovalProcess>
          </div>
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
  import ApprovalProcess from '../ApprovalProcess';

  export default {
    name: "NoticeDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['size', 'addUrl', 'user_info_all'],
    data() {
      return {
        // 校验规则
        notice_form_rule: {
          // // 日期
          // date: [
          //   {required: true, message: '请选择日期', trigger: ['blur', 'change']}
          // ],
          // // 公告类型
          // announcement_type: [
          //   {required: true, message: '请选择', trigger: ['blur', 'change']}
          // ],
          // // 公告标题
          // announcement_title: [
          //   {required: true, message: '请输入公告标题', trigger: ['blur', 'change']}
          // ],
          // // 公告内容
          // // announcement_content: [
          // //   {message: '请输入公告内容', trigger: ['blur', 'change']},
          // //   {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          // // ],
          // announcement_content: [
          //   {required: true, message: '请输入公告内容', trigger: ['blur', 'change']}
          // ],
          // // 公告署名
          // announcement_sign: [
          //   {required: true, message: '请输入公告署名', trigger: ['blur', 'change']}
          // ]
          date: [
            {required: true, message: '请选择公告日期', trigger: ['blur', 'change']}
          ],
          type_id: [
            {required: true, message: '请选择公告类型', trigger: 'blur'},
          ],

          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入正文', trigger: 'blur'},
          ],

          send_scope: [
            {required: true, message: '请选择发送范围', trigger: 'blur'},
          ],

          sanction_type: [
            {required: true, message: '请选择类型', trigger: 'blur'},
          ],

          money: [
            {required: true, message: '请输入奖罚金额', trigger: 'blur'},
          ],

          user_id: [
            {required: true, message: '请选择责任人', trigger: 'blur'},
          ]

        },
        notice_dialog_visible: false,
        notice_form: {
          type: "announcement",
          date: null,
          type_id: null,
          title: '',
          content: '',
          file_info: [],
          send_scope: {
            org_id: [],
          },
          sanction_info: [
            {
              user_id: [],
              sanction_type: null,
              money: null,
              pay_type: null,
              pay_status: 1
            }
          ]
        },
        url: globalConfig.humanResource_server,
        user_info: null
      }
    },
    methods: {
      reset() {
        this.notice_form = {
          type: "announcement",
          date: null,
          type_id: null,
          title: '',
          content: '',
          file_info: [],
          send_scope: {
            org_id: [],
          },
          sanction_info: [
            {
              user_id: [],
              sanction_type: null,
              money: null,
              pay_type: null,
              pay_status: 1
            }
          ]
        }
        this.$refs.noticeForm.clearValidate()
      },
      open() {
        this.notice_dialog_visible = true
      },
      /**添加或删除奖罚信息 */
      handleSanctionInfo(idx) {
        if (idx == 0) {
          this.notice_form.sanction_info.push(
            {
              user_id: [],
              sanction_type: null,
              money: '',
              pay_type: null,
              pay_status: 1
            }
          );
        } else {
          this.notice_form.sanction_info.splice(idx, 1);
        }
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
      },
      /**校验表单字段 */
      checkField() {
        let isReturn = false;
        let newForm = _.cloneDeep(this.notice_form);
        newForm.sanction_info = _.forEach(newForm.sanction_info, (o, index) => {
          if (o.user_id.constructor === Array) {
            o.user_id = o.user_id.join();
          }
          if (index != 0) {
            if (o.user_id && o.sanction_type && o.money) {
              o.user_id = parseInt(o.user_id.join());
            } else {
              isReturn = true;
            }
          } else {
            if (!o.user_id && !o.sanction_type && !o.money) {
              delete newForm.sanction_info;
            } else if (o.user_id && o.sanction_type && o.money) {
            } else {
              isReturn = true;
            }
          }

        });
        if (isReturn) {
          this.$LjMessage('warning', {
            title: '警告',
            msg: '奖惩信息有遗漏',
          });
          return null;
        }
        return newForm
      },
      /**提交 */
      submitNotice() {
        let newForm = this.checkField()
        if (!newForm) {
          return
        }
        this.$refs['noticeForm']
          .validate((valid) => {
            if (valid) {
              newForm.date = this.myUtils.formatDate(newForm.date, 'yyyy-MM-dd')
              this.$http.post(this.addUrl, newForm)
                .then(res => {
                  this.$LjMessageEasy(res, () => {
                    this.notice_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消 */
      cancelNotice() {
        this.notice_dialog_visible = false;
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

