<template>
  <div id="meeting_question_dialog" style="position: absolute">
    <lj-dialog
      :visible="humanResource_meeting_question_visible"
      @close="meetingQuestionHandler"
      :size="{width: 550 + 'px',height: 450 + 'px'}"
    >
      <div id="meeting_question" class="dialog_container">
        <div class="dialog_header">
          <h3>遗留问题跟进</h3>
        </div>
        <div class="dialog_main flex-center borderNone">

          <el-form :model="form" label-width="80px">
            <el-form-item label="遗留问题">
             {{form.question}}
            </el-form-item>
            <el-form-item label="跟进情况">
              <el-input v-model="form.result" type="textarea" ></el-input>
            </el-form-item>
            <el-form-item label="上传附件">
              <lj-upload class="upload-offset" size="50" v-model="form.attachment"></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submit">提交</el-button>
          <el-button size="small" type="info" @click="meetingQuestionHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: "meetingQuestionDialog",
    computed: {
      ...mapGetters([
        'todo_list_current_selection',
        'humanResource_meeting_question_visible',
      ])
    },
    watch: {
      humanResource_meeting_question_visible: {
        handler(val, oldVal) {
          if (val) {
            this.form.question = _.find(this.todo_list_current_selection.variables,{name:'title'})?.value || '-';
            this.form.meeting_id = _.find(this.todo_list_current_selection.variables,{name:'meeting_id'})?.value;
            this.form.follow_id = parseInt(this.todo_list_current_selection.assignee);
          }
        }
      },
    },
    data() {
      return {
        url:globalConfig.humanResource_server,
        form: {
          meeting_id:null,
          question:'',
          result:'',
          follow_id:null,
          attachment:[],
        },
      }
    },
    methods: {
      //提交
      submit() {
        if(!this.form.result) {
          this.$LjMessage('warning',{title:'警告',msg:'跟进情况必填'});
          return;
        }
        let url = _.find(this.todo_list_current_selection.variables, {name:'detail_request_url'})?.value;
        this.$http.put(url, this.form).then(res=> {
          this.$LjNotifyEasy(res,() => {
            this.meetingQuestionHandler();
          });
          return !!res.code.endsWith('0');
        }).then(res=> {
          if(res) {
            let task_id = this.todo_list_current_selection.id;
            let params = {
              action:'complete'
            };
            this.$http.post(`${globalConfig.approval_sever}runtime/tasks/${task_id}`,params).then(res=> {
              if(res.httpCode==200) {
                this.change_refresh_todo_list();
                this.resetForm();
              }
            });
          }
        }) ;
      },

      //重置表单
      resetForm() {
        this.form = {
          meeting_id:null,
            question:'',
            result:'',
            follow_id:null,
            attachment:[],
        };
      },


      meetingQuestionHandler() {
        this.change_humanResource_meeting_question_visible();
      },

      ...mapActions([
        'change_refresh_todo_list',
        'change_humanResource_meeting_question_visible'
      ]),
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/meetingQuestionDialog/index";

</style>
