<template>
  <div>
    <!--    转交-->
    <lj-dialog :visible.sync="transfer_dialog_visible"
               :size="{width:'450px',height:'280px'}"
               @close="cancelTransfer">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>转交</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form style="text-align: left" size="small" label-width="100px"
                   ref="transferForm"
                   :rules="transferRules"
                   :model="transfer_form">
            <el-form-item required prop="assignee" label="请选择转交人">
              <user-choose width="240" size="mini" num="1" v-model="transfer_form.assignee"></user-choose>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="confirmTransfer">确定</el-button>
          <el-button size="small" type="info" @click="cancelTransfer">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';

  /**初始化数据 */
  function createEmpty() {
    return {
      assignee: null
    }
  }

  export default {
    name: "transferDialog",
    components: {
      LjDialog
    },
    // inject: ['row'],
    props: ['row'],
    watch: {
      row(newValue, oldValue) {
        this.row = newValue
      }
    },
    data() {
      return {
        urlConfig: globalConfig.approval_sever,
        // 转交
        transfer_dialog_visible: false,
        transfer_form: createEmpty(),
        // 校验规则
        transferRules: {
          assignee: [
            {required: true, message: '请选择转交人', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      open() {
        this.transfer_dialog_visible = true
      },
      reset() {
        this.transfer_dialog_visible = false
        this.transfer_form = createEmpty()
        this.$refs.transferForm.clearValidate()
        this.$emit('close-parent-dialog')
      },
      /**取消 */
      cancelTransfer() {
        this.reset()
      },
      /**确定 */
      confirmTransfer() {
        this.$refs.transferForm
          .validate(valid => {
            if (valid) {
              let url = this.urlConfig + 'runtime/tasks/' + this.row.id
              let params = {
                action: "delegate",
                assignee: Number(this.transfer_form.assignee.toString())
              }
              this.showLoading2(true)
              this.$http.post(url, params)
                .then(res => {
                  this.showLoading2(false)
                  if (res.httpCode === 200) {
                    this.$LjNotify('success', {
                      title: '流程审批',
                      message: '转交成功！'
                    });
                    this.reset()
                  }
                })
            } else {
              return false
            }
          })

      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
