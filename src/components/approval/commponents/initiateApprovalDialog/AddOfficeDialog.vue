<template>
  <div id="add-office-dialog">
    <lj-dialog :visible.sync="add_office_dialog_visible"
               :size="size"
               @close="cancelAddOffice">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>增加办公室/宿舍审批</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">
            <el-form ref="addOfficeForm" :rules="add_office_form_rule" :model="add_office_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="name" label="申请人">
                    <el-input disabled v-model="user_info.name" placeholder="自动获取" style="width: 220px"></el-input>
                  </el-form-item>


                  <el-form-item label="办公室/宿舍" prop="house_type" required>
                    <el-select v-model="add_office_form.house_type">
                      <el-option v-for="(item,index) in house_type" :value="index + 1" :label="item"
                                 :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>


                  <el-form-item label="租金">
                    <el-input disabled disabled v-model="rent" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
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


                  <el-form-item label="片区经理">
                    <el-input disabled v-model="org_leader.name" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item required prop="date" label="申请日期">
                    <div class="items-center iconInput" style="width: 220px">
                      <el-date-picker v-model="add_office_form.date" type="date"
                                      placeholder="请选择">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item label="房型">
                    <el-input disabled v-model="roomType" placeholder="自动获取"
                              style="width: 220px">
                    </el-input>
                  </el-form-item>

                  <el-form-item required prop="user_list" label="入住人员名单">
                    <user-choose width="220" :disabled="false" title="必填" :show-icon="false"
                                 v-model="add_office_form.user_list">
                    </user-choose>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item required prop="reason" label="申请原因">
                    <el-input type="textarea"
                              v-model="add_office_form.reason"
                              :autosize="{ minRows: 2, maxRows: 14}"
                              placeholder="必填">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="add_office_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!--          流程组件-->
            <ApprovalProcess :user_info="user_info" :type="add_office_form.type"></ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitAddOffice">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelAddOffice">取消
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
      type: "add_office_dormitory",
      // 申请日期
      date: '',
      // 申请原因
      reason: null,
      // 房屋用途
      house_type: null,
      // 申请地址
      // house_id: null,
      // 入住人员名单
      user_list: null,
      // 附件
      attachment: []
    }
  }

  export default {
    name: "AddOfficeDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        url: globalConfig.market_server,
        // 校验规则
        add_office_form_rule: {
          date: [
            {required: true, message: '请选择申请日期', trigger: ['blur', 'change']}
          ],
          house_type: [
            {required: true, message: '请选择房屋用途', trigger: ['blur', 'change']}
          ],
          user_list: [
            {required: true, message: '请输入入住人员名单', trigger: ['blur', 'change']}
          ],
          // house_id: [
          //   {required: true, message: '请输入申请地址', trigger: ['blur', 'change']}
          // ],
          reason: [
            {required: true, message: '请输入申请理由', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        add_office_dialog_visible: false,
        house_type: ['办公室', '宿舍'],
        add_office_form: createEmpty(),
        // 房屋信息
        house_info: {},
        // 房型
        roomType: null,
        // 租金
        rent: null,
        org_leader: {
          name: '',
        },
        // 用户信息
        user_info: null
      }
    },
    methods: {
      reset() {
        this.add_office_form = createEmpty()
        this.$refs.addOfficeForm.clearValidate()
      },
      open() {
        this.add_office_dialog_visible = true
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
        this.house_info.name = house_name

        this.getHouseDetail(house_id)
      },
      /**获取房屋详情 */
      getHouseDetail(house_id) {
        this.$http.get(`${this.url}/v1.0/market/house/detail/${house_id}?from=hr`)
          .then(res => {
            if (res.code === 200) {
              this.roomType = res.data.hk
              this.rent = res.data.price
              this.org_leader = res.data.org_leader
            }
          })
      },
      /**提交*/
      submitAddOffice() {
        /**校验房屋地址 */
        if (!this.house_info.house_id) {
          this.$LjMessage('warning', {title: '警告', msg: `请选择申请地址`});
          return
        }
        this.$refs['addOfficeForm']
          .validate((valid) => {
            if (valid) {
              this.add_office_form.date = this.myUtils.formatDate(this.add_office_form.date, 'yyyy-MM-dd');
              let {house_type} = this.add_office_form
              let data = {
                ...this.add_office_form,
                // user_id: this.user_info.user_id,
                // org_id: this.user_info.org_id,
                house_data: [{
                  house_type: house_type,
                  house_info: this.house_info,
                  leader_org: this.org_leader,
                }]
              }
              this.$http.post(this.addUrl, data)
                .then(res => {
                  this.$LjMessageEasy(res, () => {
                    this.add_office_dialog_visible = false;
                    this.reset()
                  })
                })
            } else {
              return false
            }
          })
      },
      /**取消*/
      cancelAddOffice() {
        this.add_office_dialog_visible = false;
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










