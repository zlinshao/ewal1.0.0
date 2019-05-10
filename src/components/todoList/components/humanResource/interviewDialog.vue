<template>
  <div id="interview_dialog_list" class="interview-dialog" style="position: absolute">
    <!--面试任务待办-->
    <lj-dialog
      :visible="interview_visible"
      :size="{width: 600 + 'px',height: 500 + 'px'}"
      @close="interviewHandler"
    >
      <div id="interview_form" class="dialog_container">
        <div class="dialog_header">
          <h3>面试任务接收</h3>
          <div class="header_right">
<!--            <a target="_blank" :href="interview_form.resume"><el-button type="primary" size="mini" plain>查看简历</el-button></a>-->
            <el-button type="primary" size="mini" plain @click="showResume">查看简历</el-button>
          </div>
        </div>

        <div class="dialog_main flex-center borderNone">
          <div class="interview_dialog_form">
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">岗位</label>
              <span>{{interview_form.project}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">应聘者</label>
              <span>{{interview_form.user}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">来源</label>
              <span>{{interview_form.platform}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">预约面试时间</label>
              <span>{{interview_form.date}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">面试官</label>
              <span>{{interview_form.current_interviewer}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">是否接受此次面试任务</label>
              <span class="interview_dialog_form_checkbox">
                <el-radio-group v-model="interview_form.radio">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </span>
            </div>
            <div class="interview_dialog_form_row" v-if="interview_form.radio==1">
              <label class="interview_dialog_form_label">面试结果</label>
              <span><dropdown-list v-model="interview_form.result"
                                   width="180" size="mini" :clearable="false"
                                   :json-arr="DROPDOWN_CONSTANT.INTERVIEW_RESULT"></dropdown-list></span>
            </div>
            <div class="interview_dialog_form_row" v-if="interview_form.result==0 && interview_form.radio==1">
              <label class="interview_dialog_form_label">未通过原因</label>
              <span><el-input type="textarea" placeholder="请输入未通过原因" :row="1" autosize size="mini" style="width: 180px;"
                              v-model="interview_form.reason"></el-input></span>
            </div>
            <div class="interview_dialog_form_row" v-if="interview_form.radio==2">
              <label class="interview_dialog_form_label">转交面试官</label>
              <span><user-choose :num="1" size="mini" width="180" title="请选择面试官"
                                 v-model="interview_form.interviewer"></user-choose></span>
            </div>
          </div>

        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="confirm">确定</el-button>
          <el-button size="small" type="info" @click="interviewHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--面试任务评价-->
    <lj-dialog
      :visible="interview_evaluate_visible"
      :size="{width: 600 + 'px',height: 500 + 'px'}"
      @close="interviewEvaluateHandler"
    >
      <div id="interview_form_result" class="dialog_container">
        <div class="dialog_header">
          <h3>面试评价</h3>
          <div class="header_right">
            <el-tag>查看简历</el-tag>
          </div>
        </div>

        <div class="dialog_main flex-center borderNone">
          <div class="interview_dialog_form">
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">岗位</label>
              <span>{{interview_evaluate_form.position}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">应聘者</label>
              <span>{{interview_evaluate_form.candidate}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">来源</label>
              <span>{{interview_evaluate_form.resource}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">预约面试时间</label>
              <span>{{interview_evaluate_form.time}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">面试官</label>
              <span>{{interview_evaluate_form.interviewer}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">面试结果</label>
              <span class="interview_dialog_form_checkbox">
                <el-select v-model="interview_evaluate_form.interviewResult" placeholder="请选择面试结果">
                  <el-option value="1" label="通过"></el-option>
                  <el-option value="2" label="未通过"></el-option>
                </el-select>
              </span>
            </div>
            <div class="interview_dialog_form_row" v-if="interview_evaluate_form.interviewResult==2">
              <label class="interview_dialog_form_label">原因</label>
              <span class="interview_dialog_form_checkbox">
                <el-select v-model="interview_evaluate_form.reason" placeholder="请选择不通过原因">
                  <el-option value="1" label="原因1"></el-option>
                  <el-option value="2" label="原因2"></el-option>
                </el-select>
              </span>
            </div>
          </div>

        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="interviewEvaluateHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  import _ from 'lodash';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import {DROPDOWN_CONSTANT} from "../../../../assets/js/allConstantData";
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import ljDialog from '../../../common/lj-dialog';

  export default {
    name: "index",
    components: {
      UserChoose,
      ljDialog,
      DropdownList,
    },
    computed: {
      interview_visible() {
        return this.$store.state.todo.humanResource_interview_visible;
      },
      interview_evaluate_visible() {
        return this.$store.state.todo.humanResource_interview_evaluate_visible;
      },
    },
    watch: {
      interview_visible: {
        handler(val,oldVal) {
          if(val) {
            this.interview_form.project = this.$todo_list_current_selection.project;
            this.interview_form.user = this.$todo_list_current_selection.user;
            this.interview_form.platform = this.$todo_list_current_selection.platform;
            this.interview_form.date = this.$todo_list_current_selection.date;
            this.interview_form.interviewer = '张三';


            this.interview_form.resume = _.find(this.$todo_list_current_selection.variables,{name:'resume_url'})?.value;
          }
        },

      }
    },
    data() {
      return {
        url:globalConfig.humanResource_server,
        DROPDOWN_CONSTANT,
        //interview_visible: false,
        interview_form: {
          project:'',//应聘岗位
          user:'',//应聘者
          platform:'',//来源
          date:'',//预约面试时间
          current_interviewer:'张三',//面试官



          radio: 1,//是否接受此次面试任务 不接收转移面试官
          interviewer: '',//面试官
          result: 1,//面试结果
          reason: '',//未通过原因

          resume:'',//简历url
        },
        interview_evaluate_form: {
          position: 'web前端工程师',//岗位
          candidate: '张三',//应聘者
          resource: 'boss直聘',//来源
          time: '2019-03-22 21：21',//预约面试时间,
          interviewer: '张三',//面试官
          interviewResult: '1',//面试结果
          reason: '2',//原因
        }
      }
    },
    methods: {
      interviewHandler() {
        this.$store.dispatch('change_humanResource_interview_visible');
      },
      interviewEvaluateHandler() {
        this.$store.dispatch('change_humanResource_interview_evaluate_visible');
      },
      confirm() {
        debugger
        let type = this.interview_form.radio;//radio为1 当前用户提交面试结果 radio为2 转移面试官
        let process_id = _.find(this.$todo_list_current_selection.variables,{name:'interview_process_id'})?.value;//面试流程id
        if(type==2) {//转移面试官
          let interviewer_id = this.interview_form.interviewer[0];//转交面试官id
          let params = {
            interviewer_id
          };
          this.$http.put(`${this.url}recruitment/interviewers/transfer/${process_id}`,params).then(res=> {
            debugger
          });
        }else if(type==1) {//本人提交面试结果
          let params = {
            interview_result:this.interview_form.result,//面试结果
            interview_comment:this.interview_form.reason,//面试评价
            task_id:this.$todo_list_current_selection.id,
          };
          console.log(params);
          this.$http.put(`${this.url}recruitment/interviewers/add_result/${process_id}`,params).then(res=> {
            debugger
          });
        }
      },

      //显示简历
      showResume() {
        if(!this.interview_form.resume) {
          this.$LjMessage('warning',{
            title:'警告',
            msg:'面试人未上传简历',
          });
          return;
        }

        window.open(this.interview_form.resume,'_blank');
      },
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/interviewDialog/index";

</style>
