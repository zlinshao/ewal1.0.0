<template>
  <div id="demand-dialog">
    <lj-dialog :visible.sync="demand_dialog_visible" :size="size">
      <div class="dialog_container">
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
                                v-model="demand_form.org_id">
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
                                 v-model="demand_form.position_id">
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
                    <el-input v-model="demand_form.now_count" placeholder="必填" style="width: 220px"></el-input>
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
                  <el-form-item align="center" label="附件">
                    <lj-upload v-model="demand_form.attachment" size="40"
                               style="position: absolute; top: -12px;"></lj-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!--          流程组件-->
            <ApprovalProcess></ApprovalProcess>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitDemand">提交
          </el-button>
          <el-button size="small" type="info" @click="cancelDemand">取消
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

  import ApprovalProcess from '../ApprovalProcess';

  export default {
    name: "demandDialog",
    components: {
      LjDialog,
      LjUpload,
      ApprovalProcess
    },
    props: ['size'],
    data() {
      return {
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
          ]
        },

        demand_dialog_visible: false,
        // 性别下拉选项
        gender: ['限男', '限女', '男优先', '女优先', '不限'],
        // 工作经验下拉选项
        experience: ['1年', '1-3年', '3-5年', '5-10年', '10年以上', '不限'],
        // 学历下拉选项
        education: _.map(this.DROPDOWN_CONSTANT.EDUCATION_BACKGROUND, 'name'),
        demand_form: {
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
          // 附件
          attachment: []
        }
      }
    },
    methods: {
      open() {
        this.demand_dialog_visible = true
      },
      /**提交 */
      submitDemand() {
      },
      /**取消 */
      cancelDemand() {
      }
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/approval/commponents/dialogApproval.scss";
</style>
