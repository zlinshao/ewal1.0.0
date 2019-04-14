<template>
  <div id="finespayment_dialog" style="position: absolute">
    <lj-dialog
      :visible="humanResource_finespayment_visible"
      :size="{width: 656 + 'px',height: 432 + 'px'}"
    >
      <div id="finespayment" class="dialog_container">
        <div class="dialog_header">
          <h3>罚款缴纳</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <div class="finespayment_dialog_form">
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">任务时间</label>
              <span>2019-02-23</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">惩罚事件</label>
              <span>攻城时未穿工作服，丢失大城池</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">罚款金额</label>
              <span>罚款500元</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">缴纳方式</label>
              <span class="finespayment_dialog_form_checkbox">
                <el-select value="现金缴纳">
                  <el-option value='1' label="现金缴纳"></el-option>
                </el-select>
              </span>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog';

  export default {
    name: "finespaymentDialog",
    components: {
      ljDialog,
    },
    computed: {
      humanResource_finespayment_visible() {
        return this.$store.state.todo.humanResource_finespayment_visible;
      }
    },
    watch: {
     
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/finespaymentDialog/index";

</style>
