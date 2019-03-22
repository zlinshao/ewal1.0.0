<template>
  <div id="interview_dialog" class="interview-dialog" style="position: absolute">
    <!--面试-->
    <lj-dialog
      :visible="interview_visible"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
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

          <!--<el-form disabled :model="interview_form" ref="interview_form" label-width="120px" class="depart_visible">-->
            <!--<el-form-item label="岗位">-->
              <!--<el-input v-model="interview_form.position"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="应聘者">-->
              <!--<div class="items-center iconInput">-->
                <!--<el-input v-model="interview_form.candidate"></el-input>-->
              <!--</div>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="来源">-->
              <!--<div class="items-center iconInput">-->
                <!--<el-input v-model="interview_form.resource"></el-input>-->
              <!--</div>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="预约面试时间">-->
              <!--<div class="items-center iconInput">-->
                <!--<el-input v-model="interview_form.time"></el-input>-->
              <!--</div>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="interviewHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog';

  export default {
    name: "index",
    components:{
      ljDialog
    },
    computed: {
      interview_visible() {
        return this.$store.state.todo.humanResource_interview_visible;
      },
    },
    data() {
      return {
        //interview_visible: false,
        interview_form:{
          position:'web前端工程师',//岗位
          candidate:'张三',//应聘者
          resource:'boss直聘',//来源
          time:'2019-03-22 21：21',//预约面试时间
        }
      }
    },
    methods: {
      interviewHandler() {
        this.$store.dispatch('change_humanResource_interview_visible');
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/interviewDialog/index";

</style>
