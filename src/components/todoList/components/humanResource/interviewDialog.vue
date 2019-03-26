<template>
  <div id="interview_dialog_list" class="interview-dialog" style="position: absolute">
    <!--面试任务待办-->
    <lj-dialog
      :visible="interview_visible"
      :size="{width: 600 + 'px',height: 450 + 'px'}"
      @close="interviewHandler"
    >
      <div id="interview_form" class="dialog_container">
        <div class="dialog_header">
          <h3>面试任务接收</h3>
          <div class="header_right">
            <el-tag>查看简历</el-tag>
          </div>
        </div>

        <div class="dialog_main flex-center borderNone">
          <div class="interview_dialog_form">
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">岗位</label>
              <span>{{interview_form.position}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">应聘者</label>
              <span>{{interview_form.candidate}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">来源</label>
              <span>{{interview_form.resource}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">预约面试时间</label>
              <span>{{interview_form.time}}</span>
            </div>
            <div class="interview_dialog_form_row">
              <label class="interview_dialog_form_label">是否接受此次面试任务</label>
              <span class="interview_dialog_form_checkbox">
                <el-radio v-model="interview_form.radio" label="1">是</el-radio>
                <el-radio v-model="interview_form.radio" label="2">否</el-radio>
              </span>
            </div>
            <div class="interview_dialog_form_row" v-if="interview_form.radio==2">
              <label class="interview_dialog_form_label">转交面试官</label>
              <span class="interview_dialog_form_checkbox">
                <el-input v-model="interview_form.interviewer" placeholder="请选择面试官"></el-input>
              </span>

            </div>
          </div>

        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
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
  import ljDialog from '../../../common/lj-dialog';

  export default {
    name: "index",
    components: {
      ljDialog
    },
    computed: {
      interview_visible() {
        return this.$store.state.todo.humanResource_interview_visible;
      },
      interview_evaluate_visible() {
        return this.$store.state.todo.humanResource_interview_evaluate_visible;
      },
    },
    data() {
      return {
        //interview_visible: false,
        interview_form: {
          position: 'web前端工程师',//岗位
          candidate: '张三',//应聘者
          resource: 'boss直聘',//来源
          time: '2019-03-22 21：21',//预约面试时间,
          radio:'2',//是否接受此次面试任务
          interviewer:'张三',//面试官
        },
        interview_evaluate_form: {
          position: 'web前端工程师',//岗位
          candidate: '张三',//应聘者
          resource: 'boss直聘',//来源
          time: '2019-03-22 21：21',//预约面试时间,
          interviewer:'张三',//面试官
          interviewResult:'1',//面试结果
          reason:'2',//原因
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
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/interviewDialog/index";

</style>
