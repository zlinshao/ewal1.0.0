<template>
  <div ref="testPaper" id="test_paper" :class="{active:paper_visible}">
    <div v-show="paper_type==1" class="edit-paper">
      <div class="library-header flex">
        <div class="left">
          <h3>{{params.paper_name}}</h3>
          <div class="left-content">
            <span>{{params.title}}</span>
            <span>{{params.sub_title}}</span>
          </div>
        </div>
        <div class="right flex-center">
          <el-button @click="preView();paper_type=2" size="mini" type="primary">{{params.btn_name}}</el-button>
        </div>
      </div>
      <div class="library-main scroll_bar">
        <div class="control flex">
          <div class="btn_square_minus" @click="handlePopExamForm">-</div>
          <div class="btn_square_add" @click="handleAddExamForm">+</div>
        </div>
        <!--题型-->
        <div class="exam-type">
          <el-row :gutter="20">
            <el-col :span="2" class="left-tip">
              <span>题型</span>
            </el-col>
            <el-col :span="22" style="height: 50px;">
              <div class="train-radio-style">
                <el-radio-group v-model="exam_type">
                  <el-radio :label="1">单选题</el-radio>
                  <el-radio :label="2">判断题</el-radio>
                  <el-radio :label="3">解答题</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="paper-main borderNone scroll_bar">
          <el-form size="small">
            <div v-for="(item,index) in exam_form_list" :key="index" class="form_item_border">
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <span>{{'题干' + (index + 1)}}</span>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="item.stem" type="textarea" :rows="6" placeholder="请输入题干"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-if="item.category==1" v-for="(subVal,subKey,idx) in item.choice" :key="subKey">
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <span :class="{'hide_label': idx !== 0}">选项</span>
                  </el-col>
                  <el-col :span="22">
                    <div class="flex">
                      <el-input
                        v-model="item.choice[subKey]"
                        placeholder="请输入选项内容">
                        <template slot="prepend">{{ subKey }}</template>
                      </el-input>
                      <el-button type="text" size="mini" class="del_btn" @click="handleDeleteChoose(index,subKey,1)">删除
                      </el-button>
                      <div class="btn_add"
                           style="margin-left: 15px"
                           :class="{'hide_label': (idx !== Object.keys(item.choice).length - 1)||idx>8}"
                           @click="handleAddChooseItem(index)"
                      >+
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item v-if="item.category==2" v-for="(val,key,idx) in item.choice" :key="idx">
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <span :class="{'hide_label': idx !== 0}">选项</span>
                  </el-col>
                  <el-col :span="22">
                    <div class="flex">
                      <el-input
                        v-model="item.choice[key]"
                        placeholder="请输入选项内容">
                        <template slot="prepend">{{key}}</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item v-if="item.category==3" v-for="(val,idx) in item.answer" :key="idx">
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <span :class="{'hide_label': idx !== 0}">选项</span>
                  </el-col>
                  <el-col :span="22">
                    <div class="flex">
                      <el-input
                        v-model="item.answer[idx]"
                        placeholder="请输入关键字">
                        <!--<template slot="prepend">{{ exam_form_item_key[idx] }}</template>-->
                        <template slot="prepend">关键字{{ idx+1 }}</template>
                      </el-input>
                      <el-button type="text" size="mini" class="del_btn" @click="handleDeleteChoose(index,idx,3)">删除
                      </el-button>
                      <div class="btn_add"
                           style="margin-left: 15px"
                           :class="{'hide_label': (idx !== Object.keys(item.answer).length - 1)||idx>8}"
                           @click="handleAddChooseItem(index,3)"
                      >+
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item v-if="type==1">
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <div>默认分值</div>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model.number="item.score" placeholder="请输入分值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-if="item.category!==3 && type==1">
                <el-row :gutter="20">
                  <el-col :span="2" class="left-tip">
                    <div>答案</div>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="item.answer" placeholder="请输入答案"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="library-footer">
          <div>
            <el-button size="mini" type="danger" @click="handleSubmitExam">提交</el-button>
            <el-button size="mini" type="info" @click="handleCancelExam">取消</el-button>
          </div>

        </div>
      </div>
    </div>
    <div v-show="paper_type==2" class="preview-paper">
      <!--      <div @click="paper_type=1">预览试卷</div>-->
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
          <!--<div class="btn_square_minus" @click="handlePopExamForm">-</div>
          <div class="btn_square_add" @click="handleAddExamForm">+</div>-->
          <i v-if="params.edit_btn_visible" @click="paper_type=1" class="icon-edit"></i>
          <!-- <div></div>-->
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
                      {{subVal}}
                    </el-radio>
                    <!--                    <el-radio :key="subIndex" v-for="(subItem,subIndex) in item.choice" :label="exam_form_item_choose[subIndex]">{{subItem.val}}</el-radio>-->
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
                    <!--                    <el-radio :key="subIndex" v-for="(subVal,subKey,subIndex) in item.choice" :label="subKey">{{subVal}}</el-radio>-->
                    <el-radio label="A">对</el-radio>
                    <el-radio label="B">错</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <!--<div class="exam-judge-item">
                <div class="judge-item-stem">1、这是一道判断题?</div>
                <div class="judge-item-choice">
                  <el-radio-group v-model="demo">
                    <el-radio label="A">对</el-radio>
                    <el-radio label="B">错</el-radio>
                  </el-radio-group>
                </div>
              </div>-->
            </div>
          </div>

          <div class="exam-short">
            <div class="short-title">三、简答题（共{{exam_category_list.short.exam_list.length}}题）</div>
            <div class="short-container">

              <div v-for="(item,index) in exam_category_list.short.exam_list" class="exam-short-item">
                <div class="short-item-stem">{{index+1}}、{{item.stem}}<span v-if="type==1">（{{item.score}}分）</span>
                </div>
                <div class="short-item-choice">
                  <el-input type="textarea" v-model="item.user_answer"
                            :autosize="{ minRows: 8, maxRows: 10}"></el-input>
                </div>
              </div>

              <!--<div class="exam-short-item">
                <div class="short-item-stem">1、这是一个简答题，说出答案</div>
                <div class="short-item-choice">
                  <el-input type="textarea" v-model="demo2" :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </div>
              </div>-->
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
    <div v-show="paper_type==3" class="statistical-paper">
      <div class="library-header flex">
        <div class="left">
          <h3>{{params.title}}</h3>
        </div>
      </div>
      <div class="library-main scroll_bar">
        <div class="exam-list scroll_bar">
          <div class="exam-single">
            <div class="single-container">

              <div v-for="(item,index) in statisticsResult" :key="index" class="exam-single-item">
                <div class="single-item-stem">{{index+1}}、{{item.exam_question_info.stem}}
                </div>
                <div :key="subIndex" v-for="(subVal,subKey,subIndex) in item.exam_question_info.choice"
                     class="single-item-choice">
                  {{subKey}}、{{subVal}}
                  <div class="single-item-stem-process">
                    <div class="single-item-stem-process-container">
                      <el-progress :text-inside="true" :stroke-width="18"
                                   :percentage="Number(((item.count[subKey]/(params.response_count))*100).toFixed(2))"></el-progress>
                    </div>
                    <div class="single-item-stem-process-tip">{{params.response_count}}</div>
                  </div>


                </div>
                <!-- <div class="single-item-choice">
                   sdf
                 </div>-->

              </div>


            </div>
          </div>
        </div>

        <div class="library-footer">
          <div>
            <el-button size="mini" type="danger" @click="statisticsResultConfirm">确定</el-button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: "TestPaper",
    props: {
      params: {
        default() {
          return {
            paper_name: '新建题库',
            title: '入职考试',
            sub_title: '文职入职考试',
            btn_name: '预览题库',
            initial_page:1,
            edit_btn_visible: true,
            is_edit_paper:false,
          }
        }
      },
      visible: {
        default: false,
      },
      type: {// 1为考试 2为问卷调查     当type为1时  有答案和分值输入框
        default: 1,
      },
      statisticsResult: {//问卷调查统计结果页面数据
        type: Array,
        default() {
          return [];
        }
      },
      examList: {//外界传过来的题目列表
        type: Array,
        default() {
          return [];
        }
      },
    },
    watch: {
      visible: {
        handler(val, oldVal) {
          this.paper_visible = val;
          this.$store.dispatch('add_dialog_z_index');
          this.$nextTick(() => {
            if (this.$refs.testPaper) {
              this.$refs.testPaper.style.zIndex = this.dialogZIndex;
            }
          })
          //this.$emit('update:visible', this.dialog_visible);
        },
        immediate: true,
      },

      paper_visible: {
        handler(val, oldVal) {
          this.$emit('update:visible', this.paper_visible);
        },
        immediate: true,
      },

      'params.initial_page': {
        handler(val, oldVal) {
          if (val) {
            this.paper_type = val;
          }
        },
        deep: true,
        immediate: true,
      },

      statisticsResult: {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            this.paper_visible = true;
            this.paper_type = 3;
          }else {
            if(val&&oldVal) {
              this.$LjMessage('warning',{
                title:'警告',
                msg:'当前问卷无人回复',
              });
            }

          }
        },
        immediate: true,
      },
      examList: {
        handler(val, oldVal) {
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
          this.preView();
        },
        immediate: true,
      },

      //触发预览试卷事件
      paper_type: {
        handler(val,oldVal) {
          if(val==2) {
            this.preView();
          }
        },
        immediate:true
      },
    },
    computed: {
      dialogZIndex () {
        return this.$store.state.app.dialogZIndex;
      },
    },
    data() {
      return {
        url: globalConfig.humanResource_server,

        paper_visible: false,

        paper_type: 1,//1编辑试卷/问卷 2预览试卷/问卷 3查看问卷统计结果

        //is_edit_paper:false,//判断进入页面时是否为编辑试卷 当为编辑试卷时 sucees 方法传入第二个参数 is_edit ，当为true时 父组件调用test-paper的success方法中 调用试卷修改方法


        exam_type: 1,//1单选 2判断 3简答题
        exam_form_item_choose: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
        exam_form_item_judge: ['A', 'B'],
        //exam_form_item_key: ['关键字1', '关键字2', '关键字3', '关键字4', '关键字5', '关键字6'],
        exam_form_list: [//题列表
          /*{
            category: 1,//1单选 2判断 3简答题
            stem: '',
            choice: {
              A: '',
              B: '',
              C: '',
              D: '',
            },
            score: '',
            answer: '',
            user_answer: '',
          }*/
        ],
        exam_total_score: 0,
        /*exam_category_list: {
          single: {
            exam_list: [
              {
                stem: '这是一个单选题',
                choice: [
                  {val: '选项A'},
                  {val: '选项B'},
                  {val: '选项C'},
                  {val: '选项D'},
                ],
                score: 10,
                answer: '',
              },
              {
                stem: '这是一个单选题',
                choice: [
                  {val: '选项A'},
                  {val: '选项B'},
                  {val: '选项C'},
                  {val: '选项D'},
                ],
                score: 10,
                answer: '',
              }
            ],
          },//单选题
          judge: {
            exam_list: [
              {
                stem: '这是一个判断题',
                choice: [
                  {val: ''},
                  {val: ''},
                ],
                score: 10,
                answer: ''
              },
              {
                stem: '这是一个判断题',
                choice: [
                  {val: ''},
                  {val: ''},
                ],
                score: 10,
                answer: ''
              },
              {
                stem: '这是一个判断题',
                choice: [
                  {val: ''},
                  {val: ''},
                ],
                score: 10,
                answer: ''
              }

            ],
          },//判断题
          short: {
            exam_list: [
              {
                stem: '这是一个简答题',
                choice: [
                  {val: '关键词1'},
                  {val: '关键词2'},
                ],
                score: 10,
                answer: ''
              }
            ],
          },//简答题
        }*/
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
      //预览题库/问卷
      preView() {
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
          /*if(item.category==1) {
            this.exam_category_list.single.exam_list.push(item);
          }*/
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

      handleAddChooseItem(index, type = 1) {
        if (type == 1) {
          this.exam_form_list[index].choice['z'] = '';
          let newChoice = {};
          let iter = 0;
          _.forEach(this.exam_form_list[index].choice, (o, oIndex) => {
            newChoice[this.exam_form_item_choose[iter++]] = o;
          });
          this.exam_form_list[index].choice = newChoice;
          this.$forceUpdate();
        }
        if (type == 3) {
          this.exam_form_list[index].answer.push('');
        }
      },
      handleDeleteChoose(index, idx, type = 1) {
        if (type == 1) {
          console.log(this.exam_form_list[index])
          delete this.exam_form_list[index].choice[idx];
          //console.log(this.exam_form_list[index]);
          let newChoice = {};
          let iter = 0;
          _.forEach(this.exam_form_list[index].choice, (o, oIndex) => {
            newChoice[this.exam_form_item_choose[iter++]] = o;
          });
          this.exam_form_list[index].choice = newChoice;
          this.$forceUpdate();
        }
        if (type == 3) {
          this.exam_form_list[index].answer.splice(idx, 1);
          //this.$forceUpdate();
        }
      },
      //提交题库
      handleSubmitExam() {
        /*_.forEach(this.exam_form_list,(o)=> {
            switch (o.category) {
              case 1:
                let keys1 = Object.keys(o.choice);
                let result = _.find(keys1,o.answer);
                if(!result) {
                  this.$LjMessage('warning',{
                    title:'警告',
                    msg:'请选择正确的选项',
                  });
                }
                break;
              case 2:
                break;
              case 3:
                break;
            }
        });*/

        for (let item of this.exam_form_list) {
          if(isNaN(item.score)) {
            this.$LjMessage('warning',{
              title:'警告',
              msg:'请输入正确的分值',
            });
            return;
          };
          if(!item.stem) {
            this.$LjMessage('warning',{
              title:'警告',
              msg:'请输入题干',
            });
            return;
          }
          if(item.category==1 || item.category==2) {
            let keys1 = Object.keys(item.choice);
            let result = _.find(keys1,item.answer);
            if(!result) {
              this.$LjMessage('warning',{
                title:'警告',
                msg:'请输入正确的选项',
              });
              return;
            }
          }
        }
        this.$emit('success', this.exam_form_list,this.params.is_edit_paper);
        this.paper_visible = false;
        this.params.is_edit_paper = false;
      },

      //取消按钮
      handleCancelExam() {
        this.paper_visible = false;
        this.exam_form_list = [];
        this.params.is_edit_paper = false;
        this.$emit('cancel');
      },
      //添加题库form
      handleAddExamForm() {
        if (this.exam_type == 1) {
          this.exam_form_list.push({
            category: 1,//1单选 2判断 3简答题
            stem: '',
            choice: {
              A: '',
              B: '',
              C: '',
              D: '',
            },
            score: '',
            answer: '',
            user_answer: '',
          })
        } else if (this.exam_type == 2) {
          this.exam_form_list.push({
            category: 2,
            stem: '',
            choice: {
              A: '',
              B: '',
            },
            score: '',
            answer: '',
            user_answer: '',
          })
        } else if (this.exam_type == 3) {
          this.exam_form_list.push({
            category: 3,
            stem: '',
            choice: [],
            score: '',
            answer: ['', ''],
            user_answer: '',
          })
        }

      },
      //删除题库form
      handlePopExamForm() {
        if (this.exam_form_list.length < 1) {
          return false;
        }
        let item = this.exam_form_list[this.exam_form_list.length - 1];
        if (item.id) {
          this.$LjConfirm({
            icon: 'delete',
          }).then(() => {
            this.$http.delete(`${this.url}train/exam_question/${item.id}`).then(res => {
              this.$LjMessageEasy(res);
              this.exam_form_list.pop();
            });
          });
        } else {
          this.exam_form_list.pop();
        }
      },

      //查看统计结果确认事件
      statisticsResultConfirm() {
        this.paper_visible = false;
        let _this = this;
        setTimeout(() => {
          _this.paper_type = 1;
        }, 1000);
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

    .preview-paper {
      .exam-single {
        .el-radio-group {
          display: flex;
          justify-content: flex-start;

          > label {
            padding-right: 70px;
          }
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/TestPaper";

  @mixin commonImg($m,$n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #test_paper {
      .icon-edit {
        @include commonImg('bianji.png', 'theme1');
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
