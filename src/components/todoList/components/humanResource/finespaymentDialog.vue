<template>
  <div id="finespayment_dialog" style="position: absolute">
    <lj-dialog
      :visible="humanResource_finespayment_visible"
      @close="finespaymentHandler"
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
              <span>{{pay_form.date}}</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">惩罚事件</label>
              <span>{{pay_form.tip}}</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">罚款金额</label>
              <span>罚款{{pay_form.money}}</span>
            </div>
            <div class="finespayment_dialog_form_row">
              <label class="finespayment_dialog_form_label">缴纳方式</label>
              <span class="finespayment_dialog_form_checkbox">
                <dropdown-list v-model="pay_form.pay_type"
                               width="110" size="mini" :clearable="false"
                               :json-arr="DROPDOWN_CONSTANT.PAYMENT_WAY"></dropdown-list>
              </span>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="finespaymentHandler">确定</el-button>
          <el-button size="small" type="info" @click="finespaymentHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import {DROPDOWN_CONSTANT} from "../../../../assets/js/allConstantData";
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import ljDialog from '../../../common/lj-dialog';

  export default {
    name: "finespaymentDialog",
    components: {
      ljDialog,
      DropdownList,
    },
    computed: {
      humanResource_finespayment_visible() {
        return this.$store.state.todo.humanResource_finespayment_visible;
      },
      todo_list_current_selection() {
        return this.$store.state.todo.todo_list_current_selection;
      },
    },
    watch: {
      humanResource_finespayment_visible: {
        handler(val, oldVal) {
          if (val) {
            debugger
            this.pay_form = {
              ...this.todo_list_current_selection,
              pay_type:1
            }
          }
        }
      },
    },
    data() {
      return {
        DROPDOWN_CONSTANT,
        pay_form: {
          tip: '',
          date: '',
          money: 0,
          pay_type: 1,
        },

      }
    },
    methods: {
      finespaymentHandler() {
        this.$store.dispatch('change_humanResource_finespayment_visible');
      },
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/finespaymentDialog/index";

</style>
