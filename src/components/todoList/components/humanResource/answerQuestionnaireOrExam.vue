<template>
    <div id="test_paper_answer">
      <answer-test-paper :visible="test_paper_visible" :params="paper_params" :exam-list="examList"></answer-test-paper>
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
        test_paper_visible:false,
        examList:[],
        paper_params: {
          title:'入职考试',
        }
      }
    },
    watch: {
      answer_test_paper_visible: {
        handler(val,oldVal) {
          this.test_paper_visible = val;
        },
      },
      test_paper_visible:{
        handler(val,oldVal) {
          if(val) {

          }
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
    methods: {

    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/testPaperAnswer/index";
</style>

