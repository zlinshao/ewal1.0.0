<template>
  <div id="examSetting" class="main-container exam-container">
    <div class="content flex-center">
      <div class="guidance">
        <div class="subject items-center"
             v-for="tmp in exam_guide" :key="tmp.id"
             @click="is_exam_guide = tmp.id"
             :class="{'isGuidance': is_exam_guide === tmp.id}"
        >
          <div class="title flex-center">
            <span class="writingMode">{{ tmp.val }}</span>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="contain flex">
        <div class="question-paper flex-center" v-if="is_exam_guide === 1">
          <div v-for="item in exam_library" :key="item.id">
            <div>
              <span :title="item.name" class="writingMode">{{ item.name }}</span>
            </div>
            <div>
              <span class="writingMode">{{ item.type }}</span>
            </div>
          </div>
        </div>
        <div class="exam-paper flex-center" v-else>
          <div v-for="item in exam_list" :key="item.id" @click="exam_detail_visible = true">
            <div class="exam_span">
              <span class="writingMode">{{ item.time }}</span>
              <span class="writingMode">{{ item.title }}</span>
            </div>
            <div class="writingMode">
              {{ item.status }}
            </div>
          </div>
        </div>
        <div class="exam-control flex-center">
          <div>
            <span class="writingMode" @click="new_exam_library = true" v-if="is_exam_guide === 1">新建题库</span>
            <span class="writingMode" @click="new_exam_visible = true" v-else>新建考试</span>
          </div>
          <div>
            <span class="writingMode" v-if="is_exam_guide === 1">更多</span>
            <span class="writingMode" v-else>更多</span>
          </div>
        </div>
      </div>
    </div>


    <!--新建题库-->
    <lj-dialog
      :visible="new_exam_library"
      :size="{width: 420 + 'px',height: 320 + 'px'}"
      @close="new_exam_library = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建题库</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :rules="rules.addQuestionBank" ref="addQuestionBankRef" :model="new_question_bank" size="mini" class="showPadding" label-width="100px">
            <el-form-item required prop="paper_type"  label="试卷类型">
              <dropdown-list width="220"
                             :json-arr="DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE"
                             v-model="new_question_bank.paper_type"></dropdown-list>
            </el-form-item>
            <el-form-item required prop="paper_name" label="试卷名称">
              <el-input v-model="new_question_bank.paper_name" placeholder="请输入试卷名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="openNewQuestionBank">确定</el-button>
          <el-button size="mini" type="info" @click="new_exam_library = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建题库确定-->
    <lj-dialog
      :visible="new_exam_library_ok_visible"
      :size="{width: 420 + 'px',height: 450 + 'px'}"
      @close="new_exam_library_ok_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建题库</h3>
          <div class="header_right">
            <el-button size="mini" type="danger" @click="paper_visible = true">自己录入</el-button>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form size="small" :model="new_question_bank" label-width="100px" class="showPadding">
            <el-form-item label="试卷类型">
              <dropdown-list :disabled="true" width="220"
                             :json-arr="DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE"
                             v-model="new_question_bank.paper_type"></dropdown-list>
              <!--<el-input v-model="new_question_bank.paper_type"></el-input>-->
            </el-form-item>
            <el-form-item label="试卷名称">
              <el-input :disabled="true" v-model="new_question_bank.paper_name"></el-input>
            </el-form-item>
            <el-form-item label="批量导入试题">
              <lj-upload v-model="new_question_bank.attachment"></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="info" @click="new_exam_library_ok_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建考试-->
    <lj-dialog
      :visible="new_exam_visible"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="new_exam_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建考试</h3>
          <div class="header_right">
            <el-button size="mini" type="primary" plain>预览试卷</el-button>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="new_exam_form_params" label-width="80px" style="width: 80%">
            <el-form-item label="考试场次">
              <el-input v-model="new_exam_form_params.exam_ci" placeholder="请输入场次"></el-input>
            </el-form-item>
            <el-form-item label="考试类型">
              <el-select v-model="new_exam_form_params.exam_type" placeholder="请选择考试类型">
                <el-option :value="1" label="入职考试"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试题类型">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-select v-model="new_exam_form_params.paper_type" placeholder="请选择题型">
                    <el-option :value="1" label="入职考试"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="new_exam_form_params.paper_num" placeholder="请输入题数"></el-input>
                </el-col>
                <el-col :span="2">
                  <div class="btn_add">+</div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="参加人员">
              <div class="items-center iconInput">
                <el-input v-model="new_exam_form_params.exam_people" placeholder="请选择参考人员"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
            <el-form-item label="开考时间">
              <el-date-picker v-model="new_exam_form_params.exam_start_time"
                              placeholder="请选择"></el-date-picker>
            </el-form-item>
            <el-form-item label="试卷时长">
              <el-input v-model="new_exam_form_params.exam_during_time" placeholder="请输入分钟"></el-input>
            </el-form-item>
            <el-form-item label="开考后">
              <el-input v-model="new_exam_form_params.exam_start_end" placeholder="请输入分钟"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="new_exam_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--考试详情-->
    <lj-dialog
      :visible="exam_detail_visible"
      :size="{width: 650 + 'px',height: 760 + 'px'}"
      @close="exam_detail_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>南京新人训</h3>
          <div class="header_right">
            距离开考还有 <span class="time_over">01:15:21</span>
          </div>
          <div class="exam_detail_control">
            <el-button size="mini" type="danger" @click="is_delete_exam = !is_delete_exam">删除本场考试</el-button>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px" style="margin-top: 50px;width: 80%;text-align: left">
            <el-form-item label="考试场次">
              <div>南京新人训</div>
            </el-form-item>
            <el-form-item label="试卷类型">
              <div>入职考试</div>
            </el-form-item>
            <el-form-item label="试题设置">
              <div>单选20 简答20 判断5 <span class="text_color">修改</span></div>
            </el-form-item>
            <el-form-item label="参加人员">
              <div>...</div>
            </el-form-item>
            <el-form-item label="开考时间">
              <div>2019-02-20 10:00:00 <span class="text_color">修改</span></div>
            </el-form-item>
            <el-form-item label="试卷时长">
              <div>60分钟<span class="text_color">修改</span></div>
            </el-form-item>
            <el-form-item label="开考后">
              <div>5分钟不能再登录考试系统<span class="text_color">修改</span></div>
            </el-form-item>
            <el-form-item label="删除本场考试" v-show="is_delete_exam">
              <el-input v-model="delete_info" placeholder="请输入删除本场考试理由"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="exam_score_visible = true">确定</el-button>
          <el-button type="info" size="small" @click="exam_detail_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--考试得分-->
    <lj-dialog
      :visible="exam_score_visible"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="exam_detail_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>文职入职测试</h3>
          <div class="header_right">已结束</div>
        </div>
        <div class="dialog_main">
          <el-table
            :data="exam_score_list"
            height="400px"
          >
            <el-table-column label="考试姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="单选题" prop="radio" align="center"></el-table-column>
            <el-table-column label="判断题" prop="decide" align="center"></el-table-column>
            <el-table-column label="简答题" prop="choose" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click="exam_score_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>



    <test-paper :visible.sync="paper_visible" :params="paper_params" @success="demoSuccess"></test-paper>
  </div>
</template>

<script>
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjDialog from '../../../common/lj-dialog.vue';
  import TestPaper from '../../../common/lightweightComponents/TestPaper';
  export default {
    name: "examSetting",
    components: {
      LjDialog,
      DropdownList,
      LjUpload,
      TestPaper,
    },
    data() {
      return {
        url:globalConfig.humanResource_server,

        DROPDOWN_CONSTANT,

        rules: {
          addQuestionBank: {
            paper_type: [
              {required: true, message: '请选择试卷类型', trigger: 'blur'},
              // {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            paper_name: [
              {required: true, message: '请输入试卷名称', trigger: 'blur'},
              {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
            ],
            /*            meeting_type: [
                          {required: true, message: '请选择会议类型', trigger: 'blur'},
                          //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                        ],
                        presenter_id: [
                          {required: true, message: '请选择主持人', trigger: 'blur'},
                          //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                        ],
                        participants: [
                          {required: true, message: '请选择参会人员', trigger: 'blur'},
                          //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                        ],*/

          },
        },

        paper_visible: false,//试卷组件显示隐藏控制
        paper_params: {//试卷组件参数配置
          paper_name: '新建问卷',
          title: '入职考试',
          sub_title: '关于春节挂春联选一副',
          btn_name: '预览题库',
        },


        tableSettingData: {
          question: {//题库管理
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            tableData: [],//表格数据
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },




        is_exam_guide: 1,
        exam_guide: [
          {id: 1, val: '题库管理'},
          {id: 2, val: '考试管理'}
        ],

        //考试得分
        exam_score_visible: false,
        exam_score_list: [
          {id: 1, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 2, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 3, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 4, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 5, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 6, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
          {id: 7, name: '冯宝宝', radio: 20, decide: 15, choose: 30},
        ],

        //考试详情
        exam_detail_visible: false,
        delete_info: '',
        is_delete_exam: false,

        //题库管理/考试管理
        exam_list: [
          {id: 1, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 2, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 3, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 4, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 5, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 6, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'}
        ],



        //题库
        exam_library: [
          {id: 1, name: '文职入职测试', type: '入职考试'},
          {id: 2, name: '文职入职测试', type: '入职考试'},
          {id: 3, name: '客服培训', type: '入职考试'},
          {id: 4, name: '文职入职测试', type: '入职考试'},
          {id: 5, name: '文职入职测试', type: '入职考试'},
          {id: 6, name: '文职入职测试', type: '入职考试'},
          {id: 7, name: '文职入职测试', type: '入职考试'},
          {id: 8, name: '文职入职测试', type: '入职考试'},
        ],

        //新建题库确定
        new_exam_library_ok_visible: false,
        new_exam_library_ok_form: {
          paper_type: '',
          paper_name: ''
        },


        //新建题库
        new_exam_library: false,
        new_question_bank: {
          paper_type: '',//题库类型
          paper_name: '',//试卷名称
          attachment: [],//附件
        },


        //新建考试
        new_exam_visible: false,
        new_exam_form_params: {
          exam_ci: '',
          exam_type: '',
          paper_type: '',
          paper_num: '',
          exam_people: '',
          exam_start_time: '',
          exam_during_time: '',
          exam_start_end: '',
        },
      }
    },
    methods: {
      //打开新建题库确认对话框
      openNewQuestionBank() {
        this.$refs['addQuestionBankRef'].validate((valid) => {
          if (valid) {//成功
            this.new_exam_library_ok_visible = true;
          }
        });
      },

      //获取题库列表
      getQuestionList() {
        this.$http.get(`${this.url}`);
      },


      //题目列表提交后触发的事件
      demoSuccess(examList) {
        console.log(examList);
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/train/examSetting.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {

    .main-container {
      .guidance {
        .isGuidance {
          .title {
            border: 1px solid $colorE33;

            > span {
              border: 1px solid $colorE33;
              color: $colorE33;
            }
          }

          .line {
            background-color: $colorE33;
          }
        }
      }

      .content {
        .left-guide {
          > div {
            @include militaryImg('rzpxw.png', 'theme1');
          }

          .is-choose-guide {
            @include militaryImg('rzpxx(1).png', 'theme1');
            color: white;
          }
        }

        .right-content {
          .trainActive, .list:hover {
            .content-top {
              > span {
                color: white;

                &:before {
                  background-color: $colorE33;
                }
              }

              > div {
                > span {
                  color: $colorE33;
                }
              }
            }

            .content-bottom {
              > span {
                color: $colorE33;
              }
            }
          }
        }
      }
    }

    .exam-container {
      .content {
        @include militaryImg('ksszbj.png', 'theme1');

        .exam-control {
          > div {
            @include militaryImg('btn_hui.png', 'theme1');

            &:hover {
              @include militaryImg('btn_hong.png', 'theme1');
            }
          }
        }
      }
    }

  }
</style>
