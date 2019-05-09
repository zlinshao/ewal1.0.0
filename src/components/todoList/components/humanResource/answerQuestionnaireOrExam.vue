<template>
  <div id="test_paper_answer">
    <answer-test-paper :visible.sync="test_paper_visible" :params="paper_params" :exam-id="examId"
                       :exam-list="examList"></answer-test-paper>
  </div>
</template>

<script>
  import _ from 'lodash';
  import AnswerTestPaper from '../../../common/lightweightComponents/AnswerTestPaper';

  export default {
    name: "testPaperAnswer",
    components: {
      AnswerTestPaper,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        test_paper_visible: false,
        exam_data: {},
        examList: [],
        examId: 0,
        paper_params: {
          title: '入职考试',
        }
      }
    },
    watch: {
      answer_test_paper_visible: {
        handler(val, oldVal) {
          if (val) {//先请求接口 请求完成后打开页面
            //console.log(this.todo_list_current_selection);
            let item = this.todo_list_current_selection;
            let task_id = this.todo_list_current_selection.id;
            this.paper_params.title = item.name;

            let url = _.find(item.variables, {name: 'detail_request_url'})?.value || null;
            if (!url) return;
            this.$http.get(url).then(res => {
              if (res.code.endsWith('0')) {
                if (res.data && res.data.question_set) {
                  this.examId = res.data.id;//考试id  传到AnswerTestPaper组件中 用来提交考试
                  this.examList = res.data.question_set;
                  /*this.exam_data.exam_iannouncementd = res.data.id;//考试id  传到TestPaperExam组件中 用来提交考试
                  this.exam_data.question_set = res.data.question_set;*/
                }

                this.test_paper_visible = val;

              } else {
                this.$LjMessage('warning', {
                  title: '警告',
                  msg: res.msg,
                });
                this.$store.dispatch('change_humanResource_answer_test_paper_visible');
                debugger
                let params = {
                  id: task_id,
                };
                this.$http.post(`${this.url}train/exam/task`).then(res => {
                  debugger
                  this.$store.dispatch('change_refresh_todo_list');
                });
                return;
              }

            });


          }

        },
      },
      test_paper_visible: {
        handler(val, oldVal) {

        },
      },
    },
    computed: {
      answer_test_paper_visible() {
        return this.$store.state.todo.humanResource_answer_test_paper_visible;
      },
      todo_list_current_selection() {
        return this.$store.state.todo.todo_list_current_selection;
      },
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/testPaperAnswer/index";
</style>

