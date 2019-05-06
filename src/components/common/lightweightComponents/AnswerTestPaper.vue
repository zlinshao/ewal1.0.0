<!--回答 问卷或者考试-->
<template>
  <div ref="answerTestPaper" id="answer_test_paper" :class="{active:paper_visible}">
    <div class="answer-paper">
      <div class="library-header flex">
        <div class="left">
          <h3>{{params.title}}</h3>
        </div>
        <div class="right">
          <h4>总分数：{{exam_total_score}}分</h4>
        </div>
      </div>
      <div class="library-main scroll_bar">
        <div class="control flex">
          <i v-if="params.edit_btn_visible" @click="paper_type=1" class="icon-edit"></i>
        </div>
        <!--题型-->
        <div class="exam-list scroll_bar">
          <div class="exam-single">
            <div class="single-title">一、单选题（共{{exam_category_list.single.exam_list.length}}题）</div>
            <div class="single-container">

              <div v-for="(item,index) in exam_category_list.single.exam_list" class="exam-single-item">
                <div class="single-item-stem">{{index+1}}、{{item.stem}}<span v-if="type==1">（{{item.score}}分）</span>
                </div>
                <div class="single-item-choice">
                  <el-radio-group v-model="item.user_answer">
                    <el-radio :key="subIndex" v-for="(subVal,subKey,subIndex) in item.choice" :label="subKey">
                      {{subKey}}、{{subVal}}
                    </el-radio>
                  </el-radio-group>
                </div>
              </div>

            </div>
          </div>

          <div class="exam-judge">
            <div class="judge-title">二、判断题（共{{exam_category_list.judge.exam_list.length}}题）</div>
            <div class="judge-container">

              <div v-for="(item,index) in exam_category_list.judge.exam_list" class="exam-judge-item">
                <div class="judge-item-stem">{{index+1}}、{{item.stem}}<span v-if="type==1">（{{item.score}}分）</span>
                </div>
                <div class="judge-item-choice">
                  <el-radio-group v-model="item.user_answer">
                    <el-radio label="A">对</el-radio>
                    <el-radio label="B">错</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>

          <div class="exam-short">
            <div class="short-title">三、简答题（共{{exam_category_list.short.exam_list.length}}题）</div>
            <div class="short-container">

              <div v-for="(item,index) in exam_category_list.short.exam_list" class="exam-short-item">
                <div class="short-item-stem">{{index+1}}、{{item.stem}}<span v-if="type==1">（{{item.score}}分）</span>
                </div>
                <div class="short-item-choice">
                  <el-input type="textarea" v-model="item.user_answer" :autosize="{ minRows: 8, maxRows: 10}"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="library-footer">
          <div>
            <el-button size="mini" type="danger" @click="handleSubmitExam">提交</el-button>
            <el-button size="mini" type="info" @click="handleCancelExam">取消</el-button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: "AnswerTestPaper",
  props: {
    params: {
      default () {
        return {
          title: '入职考试',
          initial_page: 1,
          edit_btn_visible: true,
        }
      }
    },
    visible: {
      default: false,
    },
    type: {// 1为考试 2为问卷调查     当type为1时  有答案和分值输入框
      default: 1,
    },
    examList: {//外界传过来的题目列表
      type: Array,
      default () {
        return [];
      }
    },
  },
  watch: {
    visible: {
      handler (val, oldVal) {
        this.paper_visible = val;
        this.$store.dispatch('add_dialog_z_index');
        this.$nextTick(() => {
          if (this.$refs.answerTestPaper) {
            this.$refs.answerTestPaper.style.zIndex = this.dialogZIndex;
          }
        })
      },
      immediate: true,
    },

    paper_visible: {
      handler (val, oldVal) {
        this.$emit('update:visible', this.paper_visible);
      },
      immediate: true,
    },

    examList: {
      handler (val, oldVal) {
        if (val && val.length > 0) {
          val.forEach((item, index) => {
            if (item.category != 3) {
              item.answer = item.answer.join();
            }
          });
          val = _.sortBy(val, ['category']);
          this.exam_form_list = val;
        } else {
          this.exam_form_list = [];
        }
        this.renderData();
      },
      immediate: true,
    },

  },
  computed: {
    dialogZIndex () {
      return this.$store.state.app.dialogZIndex;
    },
  },
  data () {
    return {
      url: globalConfig.humanResource_server,

      paper_visible: false,

      paper_type: 1,//1编辑试卷/问卷 2预览试卷/问卷 3查看问卷统计结果

      exam_type: 1,//1单选 2判断 3简答题
      exam_form_item_choose: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      exam_form_item_judge: ['A', 'B'],
      exam_form_list: [],
      exam_total_score: 0,
      exam_category_list: {
        single: {
          exam_list: [],
        },//单选题
        judge: {
          exam_list: [],
        },//判断题
        short: {
          exam_list: [],
        },//简答题
      }
    }
  },
  methods: {
    //渲染考试/问卷
    renderData () {
      this.exam_total_score = 0;
      this.exam_category_list = {
        single: {
          exam_list: [],
        },//单选题
        judge: {
          exam_list: [],
        },//判断题
        short: {
          exam_list: [],
        },//简答题
      };
      _.forEach(this.exam_form_list, (item, index) => {
        this.exam_total_score += item.score || 0;
        switch (item.category) {
          case 1:
            this.exam_category_list.single.exam_list.push(item);
            break;
          case 2:
            this.exam_category_list.judge.exam_list.push(item);
            break;
          case 3:
            this.exam_category_list.short.exam_list.push(item);
        }
      });
    },

    //提交题库
    handleSubmitExam () {
      if (this.type == 1&&this.paper_type==1) {
        for (let item of this.exam_form_list) {
          if (isNaN(item.score)) {
            this.$LjMessage('warning', {
              title: '警告',
              msg: '请输入正确的分值',
            });
            return;
          };
          if (!item.stem) {
            this.$LjMessage('warning', {
              title: '警告',
              msg: '请输入题干',
            });
            return;
          }
          if (item.category == 1 || item.category == 2) {
            let keys1 = Object.keys(item.choice);
            let result = _.find(keys1, item.answer);
            if (!result) {
              this.$LjMessage('warning', {
                title: '警告',
                msg: '请输入正确的选项',
              });
              return;
            }
          }
        }
      }

      this.$emit('success', this.exam_form_list);
      this.paper_visible = false;
      this.$store.dispatch('change_humanResource_answer_test_paper_visible');
    },

    //取消按钮
    handleCancelExam () {
      this.paper_visible = false;
      this.exam_form_list = [];
      this.$emit('cancel');
    },
  },
}
</script>

<style lang="scss">
#test_paper {
  /*.train-radio-style {
      .el-radio {
        display: inline-block;
      }
    }*/
  .el-radio {
    display: inline-block;
  }

  .answer-paper {
    .exam-single {
      .el-radio-group {
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        justify-content: flex-start;
        .el-radio {
          padding: 5px;
        };
        > label {
          padding-right: 70px;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../../assets/scss/common/lightweightComponents/AnswerTestPaper";

@mixin commonImg($m, $n) {
  $url: "../../../assets/image/common/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #test_paper {
    .icon-edit {
      @include commonImg("bianji.png", "theme1");
    }
  }
}

#theme_name.theme2 {
  #test_paper {
  }
}

#theme_name.theme3 {
  #test_paper {
  }
}

#theme_name.theme4 {
  #test_paper {
  }
}
</style>
