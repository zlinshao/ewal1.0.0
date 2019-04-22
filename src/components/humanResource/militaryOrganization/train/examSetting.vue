<template>
  <div id="examSetting" class="main-container exam-container">
    <div class="content flex-center">
      <div class="guidance">
        <div class="subject items-center"
             v-for="item in exam_guide" :key="item.id"
             @click="handleLeftBarClick(item.id)"
             :class="{'isGuidance': is_exam_guide === item.id}"
        >
          <div class="title flex-center">
            <span class="writingMode">{{ item.val }}</span>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="contain flex">
        <div class="question-paper flex-center" v-show="is_exam_guide === 1">
          <div @click="getQuestionDetail(item)" v-for="item in tableSettingData.question.tableData.slice(0,12)"
               :key="item.id">
            <div class="question-paper-name">
              <span :title="item.name" class="writingMode">{{ item.name }}</span>
            </div>
            <div class="question-paper-category-name">
              <span class="writingMode">{{ item.category_name }}</span>
            </div>
          </div>
        </div>
        <div class="exam-paper flex-center" v-show="is_exam_guide!==1">
          <div class="exam-paper-container" v-for="item in tableSettingData.exam.tableData" :key="item.id" @click="exam_detail_visible = true">
            <div class="exam_span">
              <span class="writingMode">{{ item.time }}</span>
              <span class="writingMode">{{ item.name }}</span>
            </div>
            <div class="exam-paper-status">
              <span class="writingMode">{{ item.status }}</span>
            </div>
          </div>
        </div>
        <div class="exam-control flex-center">
          <div>
            <span class="writingMode" @click="new_question_bank_dialog_visible = true"
                  v-if="is_exam_guide === 1">新建题库</span>
            <span class="writingMode" @click="new_exam_visible = true" v-else>新建考试</span>
          </div>
          <div>
            <span class="writingMode" @click="showQuestionBankList" v-if="is_exam_guide === 1">更多</span>
            <span class="writingMode" @click="showExamList" v-else>更多</span>
          </div>
        </div>
      </div>
    </div>


    <!--新建题库-->
    <lj-dialog
      :visible.sync="new_question_bank_dialog_visible"
      :size="{width: 420 + 'px',height: 320 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建题库</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :rules="rules.addQuestionBank" ref="addQuestionBankRef" :model="new_question_bank_form" size="mini"
                   class="showPadding" label-width="100px">
            <el-form-item required prop="category" label="试卷类型">
              <dropdown-list width="220"
                             :json-arr="DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE"
                             v-model="new_question_bank_form.category"></dropdown-list>
            </el-form-item>
            <el-form-item required prop="name" label="试卷名称">
              <el-input v-model="new_question_bank_form.name" placeholder="请输入试卷名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="openNewQuestionBank">确定</el-button>
          <el-button size="mini" type="info" @click="new_question_bank_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建题库确定-->
    <lj-dialog
      :visible.sync="new_question_bank_confirm_dialog_visible"
      :size="{width: 420 + 'px',height: 450 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建题库</h3>
          <div class="header_right">
            <el-button v-if="new_question_bank_form.attachment.length==0" size="mini" type="danger" @click="paper_params.initial_page=1;paper_visible = true;">自己录入</el-button>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form size="small" :model="new_question_bank_form" label-width="100px" class="showPadding">
            <el-form-item label="试卷类型">
              <dropdown-list :disabled="true" width="220"
                             :json-arr="DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE"
                             v-model="new_question_bank_form.category"></dropdown-list>
              <!--<el-input v-model="new_question_bank.paper_type"></el-input>-->
            </el-form-item>
            <el-form-item label="试卷名称">
              <el-input :disabled="true" v-model="new_question_bank_form.name"></el-input>
            </el-form-item>
            <div v-if="new_question_bank_exam_list.length==0">
              <el-form-item label="批量导入试题">
                <lj-upload size="40" style="position: absolute;top:-10px" v-model="new_question_bank_form.attachment"></lj-upload>
              </el-form-item>
              <el-form-item label="下载模板">
                <lj-upload size="40" :disabled="true" style="position: absolute;top:-10px" v-model="paper_template_ids"></lj-upload>
              </el-form-item>
            </div>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleSubmitQuestionBank">确定</el-button>
          <el-button size="small" type="info" @click="new_question_bank_confirm_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--更多弹框 题库列表-->
    <lj-dialog
      :visible.sync="tableSettingData.question.table_dialog_visible"
      :size="{width: 800 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>题库列表</h3>
        </div>
        <div class="dialog_main">
          <el-table
            :data="tableSettingData.question.tableData"
            @row-dblclick="tableDblClick($event);"
            height="400px"
          >
            <el-table-column label="题库名称" prop="name" align="center"></el-table-column>
            <el-table-column label="题库类型" prop="category_name" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="flex-center">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange($event,'question')"
              :current-page="tableSettingData.question.params.page"
              :page-size="tableSettingData.question.params.limit"
              :total="tableSettingData.question.counts"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="tableSettingData.question.table_dialog_visible = false">确定
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <!--更多弹框 考试列表-->
    <lj-dialog
      :visible.sync="tableSettingData.exam.table_dialog_visible"
      :size="{width: 800 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>题库列表</h3>
        </div>
        <div class="dialog_main">
          <el-table
            :data="tableSettingData.exam.tableData"
            @row-dblclick="tableDblClick($event);"
            height="400px"
          >
            <el-table-column label="考试名称" prop="name" align="center"></el-table-column>
            <el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>
            <el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="flex-center">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange($event,'exam')"
              :current-page="tableSettingData.exam.params.page"
              :page-size="tableSettingData.exam.params.limit"
              :total="tableSettingData.exam.counts"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="tableSettingData.exam.table_dialog_visible = false">确定
          </el-button>
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





    <test-paper :visible.sync="paper_visible" :params="paper_params" :exam-list="exam_list"
                @success="handleSubmitExamList" @cancel="handlePaperCancel"></test-paper>
  </div>
</template>

<script>
  import _ from 'lodash';
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
        url: globalConfig.humanResource_server,

        DROPDOWN_CONSTANT,

        rules: {
          addQuestionBank: {
            category: [
              {required: true, message: '请选择试卷类型', trigger: 'blur'},
              // {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '请输入试卷名称', trigger: 'blur'},
              {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: ['blur', 'change']}
            ],
          },
        },

        paper_visible: false,//试卷组件显示隐藏控制
        paper_params: {//试卷组件参数配置
          paper_name: '新建试卷',
          title: '入职考试',
          //sub_title: '关于春节挂春联选一副',
          btn_name: '预览题库',
          initial_page: 1,
        },
        exam_list: [],//题库列表=> 传给test-paper的数据
        paper_current_edit_id:null,//当前编辑的题库id
        paper_template_ids:[4225740],


        tableSettingData: {
          question: {//题库管理
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 12,

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
          exam: {//考试管理
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 12,

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


        //新建题库确定
        new_question_bank_confirm_dialog_visible: false,

        //新建题库
        new_question_bank_dialog_visible: false,
        new_question_bank_form: {
          category: '',//题库类型
          name: '',//试卷名称
          attachment: [],//附件
        },
        new_question_bank_exam_list: [],//题库试题列表


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

        //考试管理列表
        my_exam_list: [
          {id: 1, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 2, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 3, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 4, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 5, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 6, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'}
        ],


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
    mounted() {
      this.getQuestionList();
    },
    methods: {
      //处理左侧栏点击事件
      handleLeftBarClick(id) {
        this.is_exam_guide = id;
        if (id == 1) {
          this.getQuestionList();//获取题库列表
        } else {
          this.getExamList();
        }
      },

      //打开新建题库确认对话框
      openNewQuestionBank() {
        this.$refs['addQuestionBankRef'].validate((valid) => {
          if (valid) {//成功
            this.new_question_bank_confirm_dialog_visible = true;
            this.new_question_bank_exam_list = [];//清空题目列表
          }
        });
      },

      //获取题库列表
      getQuestionList() {
        this.tableSettingData['question'].tableData = [];
        let params = {
          ...this.tableSettingData['question'].params
        };
        this.$http.get(`${this.url}train/exam_question_bank`, params).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let category_name = _.find(this.DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE, {id: item.category})?.name || '入职考核';
              let name = item.name || '-';
              if (name.length > 8) {
                name = name.slice(0, 8);
              }
              let obj = {
                id: item.id,
                name: name,
                category_name: category_name
              };
              this.tableSettingData['question'].tableData.push(obj);
            }
            this.tableSettingData['question'].counts = res.data.count;
          }
        });
      },

      //获取题库详细=>预览试卷
      getQuestionDetail(item) {
        let id = item.id;//题库id
        this.paper_current_edit_id = id;
        let params = {
          exam_question_bank_id: id,
        };
        this.$http.get(`${this.url}train/exam_question`, params).then(res => {
          if (res.code.endsWith('0') || res.code == '20001') {
            debugger
            this.exam_list = res.data?.data || [];
            this.paper_visible = true;
            this.paper_params.initial_page = 2;
            this.paper_params.title = item.name;
          }
        });
      },


      //提交题库
      handleSubmitQuestionBank() {
        if ((!this.new_question_bank_exam_list || this.new_question_bank_exam_list.length == 0) && this.new_question_bank_form.attachment.length==0) {
          this.$LjMessage('warning', {
            title: '警告',
            msg: '请至少录入一道题目',
          });
          return;
        }
        let params = {
          ...this.new_question_bank_form
        };
        debugger
        if(this.new_question_bank_exam_list) {
          this.$http.post(`${this.url}train/exam_question_bank`, params).then(res => {
            return res;
          }).then(res => {
            if (res.code.endsWith('0')) {
              let id = res.data.id;
              let newExamList = this.new_question_bank_exam_list.map((item, index) => {
                item.exam_question_bank_id = id;
                if (item.answer.constructor !== Array) {
                  item.answer = [item.answer];
                }
                return item;
              });
              this.$http.post(`${this.url}train/exam_question`, newExamList).then(subRes => {
                this.$LjMessageEasy(subRes, () => {
                  this.new_question_bank_confirm_dialog_visible = false;
                  this.new_question_bank_dialog_visible = false;
                  this.getQuestionList();
                });
              });
            } else {
              this.$LjMessage('error', {
                title: '失败',
                msg: res.msg,
              });
            }
          });
        }
        if(this.new_question_bank_form.attachment.length>0) {
          this.$http.post(`${this.url}train/exam_question/import`,this.new_question_bank_form).then(res=> {
            this.$LjMessageEasy(res,()=> {
              this.new_question_bank_confirm_dialog_visible = false;
              this.new_question_bank_dialog_visible = false;
              this.getQuestionList();
            });
          });
        }


      },


      //显示更多-> 题库列表
      showQuestionBankList() {
        this.getQuestionList();
        this.tableSettingData.question.table_dialog_visible = true;
      },

      //显示更多-> 考试列表
      showExamList() {
        this.getExamList();
        this.tableSettingData.exam.table_dialog_visible = true;
      },


      //题目列表提交后触发的事件=>录入题目列表
      handleSubmitExamList(examList,isEditPaper) {
        debugger
        //console.log(examList);
        this.new_question_bank_exam_list = examList;

        if(isEditPaper) {//是在修改试卷
          if(this.paper_current_edit_id) {
            let submitExamList = _.cloneDeep(this.new_question_bank_exam_list);
            _.forEach(submitExamList,(o)=> {
              o.exam_question_bank_id = this.paper_current_edit_id;
              if(o.category!==3) {
                o.answer = [o.answer];
              }
            });
            this.$http.put(`${this.url}train/exam_question/update`,submitExamList).then(res=> {
              this.$LjMessageEasy(res);
              this.exam_list = [];
            });
          }
        }
      },

      //处理试卷取消事件
      handlePaperCancel() {
        this.new_question_bank_exam_list = [];
      },

      /*考试管理模块    begin*/

      //获取考试列表
      getExamList() {
        this.tableSettingData['exam'].tableData = [];
        this.$http.get(`${this.url}train/exam`).then(res=> {
          if(res.code.endsWith('0')) {
            for(let item of res.data.data) {
              let time = `${this.myUtils.formatDate(item.start_time,'yyyy-MM-dd hh:mm')}-${this.myUtils.formatDate(item.end_time,'hh:mm')}`;
              let obj = {
                ...item,
                id:item.id,
                name:item.name||'-',
                time:time,
                status:'未开始',
              };
              this.tableSettingData['exam'].tableData.push(obj);
            }
            this.tableSettingData['exam'].counts = res.count;
          }
        });
      },





      /*考试管理模块    end*/



      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val, currentTable) {
        switch (currentTable) {
          case 'question':
            this.tableSettingData[currentTable].params.page = val;
            this.getQuestionList();
            break;
          case 'exam':
            this.tableSettingData[currentTable].params.page = val;
            this.getExamList();
            break;
          default :
            break;
        }
      },

      tableDblClick(row) {
        this.getQuestionDetail(row);
        //this.showTrainDetail(row.id);
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
