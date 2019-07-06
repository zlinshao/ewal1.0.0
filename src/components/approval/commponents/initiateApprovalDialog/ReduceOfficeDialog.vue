<template>
  <div id="reduce-office-dialog">
    <lj-dialog :visible.sync="reduce_office_dialog_visible"
               :size="size"
               @close="cancelReduceOffice">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>减少办公室/宿舍审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="reduceOfficeForm" :rules="reduce_office_form_rule" :model="reduce_office_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>


                  <el-form-item label="办公室/宿舍" prop="house_type" required>
                    <el-select v-model="reduce_office_form.house_type">
                      <el-option v-for="(item,index) in house_type" :value="index + 1" :label="item"
                                 :key="index">
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


                  <el-form-item label="申请地址">
                    <house-community :style="{width:220+'px'}"
                                     @getHouseIdName="getHouseInfo">
                    </house-community>
                  </el-form-item>

                </el-col>

                <el-col :span="8">
                  <el-form-item prop="date" label="申请日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="reduce_office_form.date" type="date"
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
                              v-model="reduce_office_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="reduce_office_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="紧急程度">
                    <el-radio-group v-model="reduce_office_form.priority">
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
                             :type="reduce_office_form.type"
                             @is-show-loading="isLoading = $event">
            </ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitReduceOffice">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelReduceOffice">取消
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
      type: "sub_office_dormitory",
      // 申请日期
      date: null,
      // 申请原因
      reason: null,
      // 房屋用途
      house_type: null,
      // 申请地址

      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "ReduceOfficeDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    watch: {
      user_info_all(newValue, oldValue) {
        this.getUserInfo()
      }
    },
    data() {
      return {
        isLoading: true,
        // 校验规则
        reduce_office_form_rule: {
          date: [
            {required: true, message: '请选择申请日期', trigger: ['blur', 'change']}
          ],
          house_type: [
            {required: true, message: '请选择房屋用途', trigger: ['blur', 'change']}
          ],
          user_list: [
            {required: true, message: '请输入', trigger: ['blur', 'change']}
          ],
          reason: [
            {required: true, message: '请输入申请理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        reduce_office_dialog_visible: false,
        house_type: ['办公室', '宿舍'],
        reduce_office_form: createEmpty(),
        // 房屋信息
        house_info: {},
        user_info: {
          name: null,
          org: null,
          user_id: null,
          org_id: null,
        }
      }
    },
    methods: {
      reset() {
        this.reduce_office_form = createEmpty()
        this.$refs.reduceOfficeForm.clearValidate()
        this.isLoading = true
      },
      open() {
        this.reduce_office_dialog_visible = true
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
      getHouseInfo(val) {
        let {house_id, house_name} = val
        this.house_info.house_id = house_id
        this.house_info.house_name = house_name
      },
      /**提交*/
      submitReduceOffice() {
        /**校验房屋地址 */
        if (!this.house_info.house_id) {
          this.$LjMessage('warning', {title: '警告', msg: `请选择申请地址`});
          return
        }
        this.$refs['reduceOfficeForm']
          .validate((valid) => {
            if (valid) {
              this.reduce_office_form.date = this.myUtils.formatDate(this.reduce_office_form.date, 'yyyy-MM-dd')
              let {name, org} = this.user_info
              let {house_type, date, reason, attachment} = this.reduce_office_form
              let data = {
                ...this.reduce_office_form,
                house_data: [
                  {
                    house_type: house_type,
                    house_info: this.house_info
                  }
                ],
                more_data: [
                  {key: '申请人', value: name},
                  {key: '所属部门', value: org},
                  {key: '办公室/宿舍', value: this.house_type[house_type - 1]},
                  {key: '申请地址', value: this.house_info.house_name},
                  {key: '申请日期', value: date},
                  {key: '申请原因', value: reason}
                ]
              }
              this.showLoading2(true)
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.showLoading2(false)
                  this.$LjMessageEasy(res, () => {
                    this.reduce_office_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelReduceOffice() {
        this.reduce_office_dialog_visible = false;
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











