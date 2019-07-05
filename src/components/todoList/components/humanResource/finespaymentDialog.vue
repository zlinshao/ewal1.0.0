<template>
  <div id="finespayment_dialog" style="position: absolute">
    <lj-dialog
      :visible="humanResource_finespayment_visible"
      @close="finespaymentHandler"
      :size="{width: 656 + 'px',height: 432 + 'px'}"
    >
      <div id="finespayment" class="dialog_container">
        <div class="dialog_header">
          <h3>{{type=='payment'?'罚款缴纳':'公告人确认罚款'}}</h3>
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
                               :disabled="type!='payment'"
                               width="110" size="mini" :clearable="false"
                               :json-arr="DROPDOWN_CONSTANT.PAYMENT_WAY"></dropdown-list>
              </span>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button v-if="type=='payment'" size="small" type="danger" @click="confirm">确定</el-button>
          <el-button v-if="type=='affirm'" size="small" type="danger" @click="affirmConfirm('success')">确认</el-button>
          <el-button v-if="type=='payment'" size="small" type="info" @click="finespaymentHandler">取消</el-button>
          <el-button v-if="type=='affirm'" size="small" type="info" @click="affirmConfirm('error')">驳回</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
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
            this.task_id = this.todo_list_current_selection.id;
            this.type = this.todo_list_current_selection.taskDefinitionKey;
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
        url:globalConfig.humanResource_server,
        todo_url: globalConfig.approval_sever,//待办接口

        pay_form: {
          tip: '',
          date: '',
          money: 0,
          pay_type: 1,
        },
        task_id:null,
        type:'payment',  //当为payment时为罚款缴纳事件  当为affirm时为发布公告者确认罚款缴纳事件

      }
    },
    methods: {
      finespaymentHandler() {
        this.$store.dispatch('change_humanResource_finespayment_visible');
      },
      /*罚款状态提交*/
      confirm() {
        this.$LjConfirm({content:`确定以${this.pay_form.pay_type==1?'工资扣款':'电子支付'}方式缴纳罚款吗？`}).then(()=> {
          let params = {
            id:_.find(this.pay_form.variables,{name:'id'})?.value,
            pay_type:this.pay_form.pay_type
          };
          this.$http.post(`${this.url}announcement/announcement/sanctionPay`,params).then(res=> {
            this.$LjMessageEasy(res,()=> {
              let _this = this;
              setTimeout(function() {
                _this.$store.dispatch('change_refresh_todo_list');
                _this.finespaymentHandler();
              },2000);
            });
          });
        });



      },
      /*管理员确认罚款*/
      async affirmConfirm(rst = 'success') {
        let params = {
          id:_.find(this.todo_list_current_selection.variables,{name:'id'})?.value,
          fine:rst,
          pay_user_id:_.find(this.todo_list_current_selection.variables,{name:'pay_user_id'})?.value,
        };
        // debugger
        let contentTip = rst=='success'?'提交':'驳回';
        this.$LjConfirm({
          content:`确定${contentTip}吗？`
        }).then(async ()=> {
          await this.$http.post(`${this.url}announcement/announcement/affirmFine`,params).then(res=> {
            this.$LjMessageEasy(res,()=> {
              this.$store.dispatch('change_refresh_todo_list');
              this.finespaymentHandler();
            });
          });
        });
      },
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/finespaymentDialog/index";

</style>
