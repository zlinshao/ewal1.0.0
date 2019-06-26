<template>
  <div id="transfer-dialog">
    <lj-dialog :visible.sync="transfer_dialog_visible" :size="{width: 580 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>个人异动/调岗审批</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form ref="transferForm" :rules="transfer_form_rule" :model="transfer_form"
                   style="text-align: left" size="small" label-width="100px">
            <el-form-item required prop="name" label="申请人">
              <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 418px"></el-input>
            </el-form-item>

            <el-form-item required prop="enroll" label="入职时间">
              <div class="items-center iconInput">
                <el-date-picker disabled v-model="user_info.enroll" type="date" placeholder="自动获取"></el-date-picker>
              </div>
            </el-form-item>


            <el-form-item required prop="org" label="原部门">
              <!--              <org-choose width="418" num="1" :disabled="false" title="自动获取" :show-icon="false"-->
              <!--                          v-model="user_info.org">-->
              <!--              </org-choose>-->
              <el-input disabled v-model="user_info.org" placeholder="自动获取" style="width: 418px"></el-input>
            </el-form-item>


            <el-form-item required prop="now_org" label="转入部门">
              <org-choose width="418" num="1" :disabled="false" title="必填" :show-icon="false"
                          v-model="transfer_form.now_org">
              </org-choose>
            </el-form-item>

            <el-form-item required prop="now_position" label="转入岗位">
              <post-choose width="418" num="1" :disabled="false" title="必填" :show-icon="false"
                           v-model="transfer_form.now_position">
              </post-choose>
            </el-form-item>

            <el-form-item required prop="change_reason" label="调岗原因">
              <el-input type="textarea"
                        v-model="transfer_form.change_reason"
                        :autosize="{ minRows: 2, maxRows: 14}"
                        placeholder="必填">
              </el-input>
            </el-form-item>

            <el-form-item required prop="change_receipt" label="异动申请单以及异动交接单">
              <el-input type="textarea"
                        v-model="transfer_form.change_receipt"
                        :autosize="{ minRows: 2, maxRows: 14}"
                        placeholder="必填">
              </el-input>
            </el-form-item>


            <el-form-item align="center" label="附件">
              <lj-upload v-model="transfer_form.attachment" size="40"
                         style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>

            <!--            时间线-->
            <!--            <div class="timeline-container">-->
            <!--              <el-timeline>-->
            <!--                <el-timeline-item color="#CF2E33" v-for="(item,index) in growthDetailList" :key="index"-->
            <!--                                  :timestamp="item.timestamp" placement="top">-->
            <!--                  <p>由{{item.operatorName}}为您办理了{{item.growthContent}}{{item.detail}}</p>-->
            <!--                </el-timeline-item>-->
            <!--              </el-timeline>-->
            <!--            </div>-->

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitTransfer">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelTransfer">取消
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
    name: "TransferPosition",
    components: {
      LjDialog,
      LjUpload
    },
    props: ['user_info_all'],
    data() {
      return {
        // 校验规则
        transfer_form_rule: {
          now_org: [
            {required: true, message: '请选择转入部门', trigger: ['blur', 'change']}
          ],
          now_position: [
            {required: true, message: '请选择转入岗位', trigger: ['blur', 'change']}
          ],
          change_reason: [
            {required: true, message: '请输入调岗原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          change_receipt: [
            {required: true, message: '请输入异动申请单以及异动交接单', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },

        transfer_dialog_visible: false,
        transfer_form: {
          type: "personal_change",
          // 入职时间
          enroll: null,
          // 转入部门
          now_org: null,
          // 转入岗位
          now_position: null,
          // 调岗原因
          change_reason: null,
          // 异动申请单以及异动交接单附件
          change_receipt: null,
          // 附件
          attachment: []
        },
        user_info: null
      }
    },
    methods: {
      open() {
        this.transfer_dialog_visible = true
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          enroll: this.user_info_all.staff.enroll,
          org: this.user_info_all.org[0].name
        }
      },
      /**提交 */
      submitTransfer() {
      },
      /**取消 */
      cancelTransfer() {
      },
    },
    created() {
      this.getUserInfo()

    }
  }
</script>

<style lang="scss" scoped>
  #theme_name.theme1 {
    #approval {
      /*.timeline-container {*/
      /*  width: 100%;*/
      /*  height: 100%;*/
      /*  overflow: auto;*/

      /*  .el-timeline-item__wrapper {*/
      /*    text-align: left;*/

      /*    .el-timeline-item__timestamp {*/
      /*      display: flex;*/
      /*      justify-content: flex-start;*/
      /*      align-items: flex-start;*/
      /*      height: 35px;*/
      /*      //line-height: 35px;*/
      /*      font-size: 16px;*/
      /*      //color: #CF2E33;*/
      /*      color: #686874;*/
      /*      font-family: MicrosoftYaHei-Bold;*/
      /*      font-weight: 700;*/
      /*    }*/

      /*    p {*/

      /*    }*/
      /*  }*/
      /*}*/
    }
  }
</style>







