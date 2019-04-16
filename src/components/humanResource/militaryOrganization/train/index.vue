<template>
  <div id="train" class="train ">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <div class="icons add" @click="new_train_visible = true"><b>+</b></div>
      </div>

    </div>


    <div class="main-nav">
          <span
            v-for="item in active"
            :key="item.id"
            :class="{'isActive': item.id === activeName}"
            @click="activeName = item.id"
          >{{ item.val }}</span>
    </div>



    <!--课程培训-->
    <div class="main-container" :class="{'subject-train' : activeName === 2}">
      <div class="content flex">
        <div class="left-guide flex-center">
          <div
            v-for="tmp in left_guide"
            :key="tmp.id"
            class="flex-center"
            :class="{'is-choose-guide': left_guide_choose === tmp.id}"
            @click="left_guide_choose = tmp.id"
          >
            <span>{{ tmp.val }}</span>
          </div>
        </div>
        <div class="right-content flex-center">
          <div class="list"
               v-for="item in train_list"
               :key="item.id"
               :class="{'trainActive': isTrain === item.id}"
               @click="isTrain = item.id;train_detail_visible = true"
          >
            <div class="content-top">
              <span>{{ item.title }}</span>
              <div>
                <span class="writingMode">{{ item.time }}</span>
                <span class="writingMode">{{ item.name }}</span>
              </div>
            </div>
            <div class="content-bottom">
              <span class="writingMode">{{ item.lecturer }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="guidance">
        <div class="subject items-center"
             v-for="tmp in guidance" :key="tmp.id"
             @click="handleClickTrainManagement(tmp.id)"
             :class="{'isGuidance': isGuidance === tmp.id}"
        >
          <div class="title flex-center">
            <span class="writingMode">{{ tmp.val }}</span>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <!--考试设置-->
    <div class="main-container exam-container"
         :class="{'exam-setting': activeName === 2}">
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
    </div>

    <!--自己录入题库-->
    <div class="library_info" :class="{'library_info_hide': !show_edit_library}">
      <div class="library_header flex">
        <div class="left flex-center">
          <h3>新建题库</h3>
          <div>
            <span>入职考试</span>
            <span>文职入职考试 2019-01-01</span>
          </div>
        </div>
        <div class="right flex-center">
          <el-button size="mini" type="primary">预览题库</el-button>
        </div>
      </div>
      <div class="library_main">
        <div class="control flex">
          <div class="btn_square_minus" @click="handlePopExamForm">-</div>
          <div class="btn_square_add" @click="handleAddExamForm">+</div>
        </div>
        <!--题型-->
        <div class="exam_type">
          <el-row :gutter="20">
            <el-col :span="2">
              <span>题型</span>
            </el-col>
            <el-col :span="22" style="height: 50px;">
              <!--<div class="train-radio-style">
                <el-radio v-model="exam_type" label="1">单选题</el-radio>
                <el-radio v-model="exam_type" label="2">判断题</el-radio>
                <el-radio v-model="exam_type" label="3">解答题</el-radio>
              </div>-->
              <div class="train-radio-style">
                <el-radio-group v-model="exam_type">
                <el-radio :label="3">单选题</el-radio>
                <el-radio :label="6">判断题</el-radio>
                <el-radio :label="9">解答题</el-radio>
              </el-radio-group>
              </div>

            </el-col>
          </el-row>
        </div>
        <div class="paper_main borderNone scroll_bar">
          <el-form size="small">
            <div v-for="(exam,index) in exam_form" :key="index" class="form_item_border">
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="2">
                    <span>{{'题干' + (index + 1)}}</span>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="exam.exam_title" type="textarea" :rows="6" placeholder="请输入题干"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-for="(tmp,idx) in exam.exam_choose" :key="idx">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <span :class="{'hide_label': idx !== 0}">选项</span>
                  </el-col>
                  <el-col :span="22">
                    <div class="flex">
                      <el-input
                        v-model="tmp.val"
                        placeholder="请输入选项内容">
                        <template slot="prepend">{{ exam_form_choose[idx] }}</template>
                      </el-input>
                      <el-button type="text" size="mini" class="del_btn" @click="handleDeleteChoose(index,idx)">删除
                      </el-button>
                      <div class="btn_add"
                           style="margin-left: 15px"
                           :class="{'hide_label': idx !== exam.exam_choose.length - 1}"
                           @click="handleAddChooseItem(index)"
                      >+
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="2">
                    <div>默认分值</div>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="exam.exam_score" placeholder="请输入分值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="2">
                    <div>答案</div>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="exam.exam_answer" placeholder="请输入答案"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="library_footer">
          <el-button size="mini" type="danger" @click="handleSubmitExam">提交</el-button>
          <el-button size="mini" type="info" @click="show_edit_library = false">取消</el-button>
        </div>
      </div>
    </div>

    <div class="train_management">
      <!--培训管理-->
      <lj-dialog
        :visible="train_management_visible"
        :size="{width: 650 + 'px',height: 640 + 'px'}"
        @close="train_management_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header flex">
            <h3>培训管理</h3>
            <div class="icons add" @click="is_add = true"><b>+</b></div>
          </div>
          <div class="dialog_main">
            <el-table
              :data="train_management_list"
              height="400px"
            >
              <el-table-column prop="name" label="培训名称" align="center"></el-table-column>
              <el-table-column prop="lecturer" label="讲师" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="edit_btn" @click="handleOpenEditTrain(scope.row)">编辑</span>
                  <span class="delete_btn" @click="del_visible = true">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="new_train flex" v-show="is_add">
              <el-input v-model="add_params.name" placeholder="请输入培训名称" size="small" style="width: 200px"></el-input>
              <el-input v-model="add_params.lecturer" placeholder="请输入讲师名称" size="small"
                        style="width: 200px"></el-input>
              <span @click="handleCancelAddTrain">删除</span>
            </div>
          </div>
          <div class="dialog_footer">
            <el-button size="small" @click="" v-show="is_add" type="danger">确定</el-button>
            <el-button size="small" @click="train_management_visible = false" type="info">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--编辑培训管理-->
      <lj-dialog
        :visible="edit_train_visible"
        :size="{width: 400 + 'px',height: 400 + 'px'}"
        @close="edit_train_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>编辑</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="edit_train_params" size="mini" label-width="80px" class="showPadding">
              <el-form-item label="培训类型">
                <el-input v-model="edit_train_params.train_type"></el-input>
              </el-form-item>
              <el-form-item label="培训名称">
                <el-input v-model="edit_train_params.train_name"></el-input>
              </el-form-item>
              <el-form-item label="讲师">
                <el-input v-model="edit_train_params.lecturer"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="edit_train_params.train_new_lecturer"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" type="danger">提交</el-button>
            <el-button size="mini" type="info" @click="edit_train_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--删除-->
      <lj-dialog
        :visible="del_visible"
        :size="{width: 400 + 'px',height: 350 + 'px'}"
        @close="del_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="resIcon iconDelete"></div>
            <span class="unUse-txt">确定删除该培训课程吗?</span>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" @click="del_visible = false">确定</el-button>
            <el-button type="info" @click="del_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>

    <!--更多弹框-->
    <lj-dialog
      :visible="more_visible"
      :size="{width: 500 + 'px',height: 600 + 'px'}"
      @close="more_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>入职培训列表</h3>
        </div>
        <div class="dialog_main">
          <el-table
            :data="more_list"
            height="400px"
          >
            <el-table-column label="培训名称" prop="name" align="center"></el-table-column>
            <el-table-column label="时间" prop="time" align="center"></el-table-column>
            <el-table-column label="讲师" prop="lecturer" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="info" @click="more_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--培训详情-->
    <lj-dialog
      :visible="train_detail_visible"
      :size="{width: 500 + 'px',height: 580 + 'px'}"
      @close="train_detail_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>培训详情</h3>
          <div class="header_right">
            <el-button size="mini" type="primary" plain>查看考试情况</el-button>
          </div>
        </div>
        <div class="dialog_main">
          <el-form size="mini" label-width="100px" class="train_detail">
            <el-form-item label="培训类型">
              <span>入职培训</span>
            </el-form-item>
            <el-form-item label="培训名称">
              <span>业务员入职培训</span>
            </el-form-item>
            <el-form-item label="培训地点">
              <span>大会议室</span>
            </el-form-item>
            <el-form-item label="讲师">
              <span>2019.02.10 12:00-14:00</span>
            </el-form-item>
            <el-form-item label="参会人员">
              <span>林依依</span>
            </el-form-item>
            <el-form-item label="培训提醒">
              <span>培训开始前00小时05分钟提醒</span>
            </el-form-item>
            <el-form-item label="查看附件">
              <span>.</span>
            </el-form-item>
            <el-form-item label="查看试卷">
              <span>?</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="mini" @click="train_detail_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建培训-->
    <lj-dialog
      :visible="new_train_visible"
      :size="{width: 520 + 'px',height: 670 + 'px'}"
      @close="new_train_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建培训</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="new_train_params" style="text-align: left" size="small" label-width="100px">
            <el-form-item label="培训类型">
              <el-select v-model="new_train_params.train_type" placeholder="请选择培训类型" style="width: 320px">
                <el-option :value="1" label="入职培训"></el-option>
              </el-select>
              <span class="btn_add" @click="train_type_visible = true">+</span>
            </el-form-item>
            <el-form-item label="培训名称">
              <el-select v-model="new_train_params.train_name" placeholder="请选择培训名称" style="width: 320px">
                <el-option :value="1" label="入职培训"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="培训地点">
              <el-select v-model="new_train_params.train_place" placeholder="请选择培训地点" style="width: 320px">
                <el-option :value="1" label="入职培训"></el-option>
              </el-select>
              <span class="btn_add">+</span>
            </el-form-item>
            <el-form-item label="培训时间">
              <el-date-picker v-model="new_train_params.train_time" placeholder="请选择培训时间"
                              style="width: 320px"></el-date-picker>
            </el-form-item>
            <el-form-item label="讲师">
              <el-select v-model="new_train_params.train_lecturer" style="width: 320px"></el-select>
            </el-form-item>
            <el-form-item label="参会人员">
              <el-input v-model="new_train_params.train_people" placeholder="请选择参会人员" style="width: 320px"></el-input>
            </el-form-item>
            <el-form-item label="培训提醒">
              培训开始前
              <el-input style="width: 60px" v-model="new_train_params.train_notify_hour"></el-input>
              小时
              <el-input style="width: 60px" v-model="new_train_params.train_notify_minutes"></el-input>
              分钟提醒
            </el-form-item>
            <el-form-item label="上传课件"></el-form-item>
            <el-form-item label="添加试卷"></el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="new_train_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加培训类型-->
    <lj-dialog
      :visible="train_type_visible"
      :size="{width: 520 + 'px',height: 400 + 'px'}"
      @close="train_type_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加培训类型</h3>
          <div class="header_right">
            <div class="btn_add">+</div>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="train_type_params" size="small" label-width="110px" class="showPadding">
            <el-form-item label="培训类型">
              <el-input v-model="train_type_params.train_type" placeholder="请输入培训类型"></el-input>
            </el-form-item>
            <el-form-item label="培训地点">
              <el-input v-model="train_type_params.train_place" placeholder="请输入培训地点"></el-input>
            </el-form-item>
            <el-form-item label="培训名称/讲师">
              <p style="margin-bottom: 15px">
                <el-input style="width: 150px" v-model="train_type_params.train_name"
                          placeholder="请输入培训名称"></el-input>
                <el-input style="width: 150px" v-model="train_type_params.train_lecturer"
                          placeholder="讲师姓名"></el-input>
              </p>
              <p>
                <el-input style="width: 150px" v-model="train_type_params.train_name"
                          placeholder="请输入培训名称"></el-input>
                <el-input style="width: 150px" v-model="train_type_params.train_lecturer"
                          placeholder="讲师姓名"></el-input>
              </p>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="train_type_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建题库-->
    <lj-dialog
      :visible="new_exam_library"
      :size="{width: 400 + 'px',height: 320 + 'px'}"
      @close="new_exam_library = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建题库</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :rules="rules.addQuestionBank" ref="addQuestionBankRef" :model="new_question_bank" size="mini" class="showPadding" label-width="80px">
            <el-form-item required prop="paper_type"  label="试卷类型">
              <dropdown-list width="220"
                             :json-arr="DROPDOWN_CONSTANT.TRAINING.NEWQUESTION.QUESTIONTYPE"
                             v-model="new_question_bank.paper_type"></dropdown-list>
              <!--<el-select
                v-model="new_question_bank.paper_type"
                placeholder="请选择试卷类型" style="width: 220px">
                <el-option :value="1" label="入职考试"></el-option>
                <el-option :value="2" label="加薪考试"></el-option>
              </el-select>-->
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
            <el-button size="mini" type="danger" @click="show_edit_library = true">自己录入</el-button>
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
  </div>
</template>

<script>

  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjDialog from '../../../common/lj-dialog.vue';
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';


  export default {
    name: "train",
    components: {
      LjDialog,
      DropdownList,
      LjUpload,
    },
    data() {
      return {




        DROPDOWN_CONSTANT,
        //humanResource,
        //resourceDepart,


        //visibleStatus: false,//弹出部门
        url:globalConfig.humanResource_server,


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







        tableSettingData: {
          question: {//题库管理
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 1000,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            departmentId: [106],
            isShowMultiSelection: false,//是否显示多选框
            multipleSelection: [],

            table_dialog_visible: false,//form表单控制
            tableData: [],//表格数据
            /*showData: {
              name: '姓名',
              department: '部门',
              post: '岗位',
              attRest: '出勤/休息天数',
              wednesday: '出勤班次',
              thursday: '迟到缺卡次数',
              friday: '矿工天数',
              saturday: '出差天数',
              weekday: '公出时长',
              leave: '请假时长',
              workOvertime: '加班统计',
              operate: '考勤确认结果',

            },*/
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },






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

        //题库管理/考试管理
        exam_list: [
          {id: 1, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 2, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 3, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 4, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 5, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'},
          {id: 6, title: '苏州新人训', time: '2019/03/01 10:10:00', status: '未开始'}
        ],

        //新建题库
        show_edit_library: false,
        exam_type: 3,
        exam_form_choose: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
        exam_form: [
          {
            exam_title: '',
            exam_choose: [
              {val: ''},
              {val: ''},
              {val: ''},
              {val: ''}
            ],
            exam_score: '',
            exam_answer: ''
          }
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
          attachment:[],//附件
        },


        activeName: 1,
        active: [
          {id: 1, val: '课程培训'},
          {id: 2, val: '考试设置'},
        ],

        guidance: [ //右边向导
          {id: 1, val: '培训管理'},
          {id: 2, val: '更多'}
        ],
        isGuidance: 1,

        left_guide: [
          {id: 1, val: '入职培训'},
          {id: 2, val: '技能培训'},
        ],
        left_guide_choose: 1,

        train_list: [
          {
            id: 1,
            title: '一',
            name: '文职培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 2,
            title: '二',
            name: '文职培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 3,
            title: '三',
            name: '业务员培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 4,
            title: '四',
            name: '操作培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 5,
            title: '五',
            name: '入职培训',
            time: '2019/01/02',
            lecturer: '林东方'
          }
        ],
        isTrain: 1,

        train_management_visible: false,
        train_management_list: [
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
        ],

        more_list: [
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
        ],
        more_visible: false,

        is_add: false, //添加培训管理
        add_params: {
          name: '',
          lecturer: ''
        },

        //编辑培训管理
        edit_train_visible: false,
        edit_train_params: {
          train_type: '',
          train_name: '',
          lecturer: '',
          train_new_lecturer: ''
        },

        //删除培训
        del_visible: false,

        //培训详情
        train_detail_visible: false,

        //新建培训
        new_train_visible: false,
        new_train_params: {
          train_type: '',
          train_name: '',
          train_place: '',
          train_time: '',
          train_lecturer: '',
          train_people: '',
          train_notify_hour: '00',
          train_notify_minutes: '05'
        },

        //添加培训类型
        train_type_visible: false,
        train_type_params: {
          train_type: '',
          train_name: '',
          train_lecturer: '',
          train_place: ''
        },

        //考试guide
        is_exam_guide: 1,
        exam_guide: [
          {id: 1, val: '题库管理'},
          {id: 2, val: '考试管理'}
        ],

        //题库
        exam_library: [
          {id: 1, name: '文职入职测试', type: '入职考试'},
          {id: 2, name: '文职入职测试', type: '入职考试'},
          {id: 3, name: '客服话术培训测试', type: '入职考试'},
          {id: 4, name: '文职入职测试', type: '入职考试'},
          {id: 5, name: '文职入职测试', type: '入职考试'},
          {id: 6, name: '文职入职测试', type: '入职考试'},
          {id: 7, name: '文职入职测试', type: '入职考试'},
          {id: 8, name: '文职入职测试', type: '入职考试'},
        ]
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
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


      handleAddChooseItem(index,) {
        this.exam_form[index].exam_choose.push({val: ''});
      },
      handleDeleteChoose(index, idx) {
        this.exam_form[index].exam_choose.splice(idx, 1);
      },
      //提交题库
      handleSubmitExam() {
        console.log(this.exam_form);
      },
      //添加题库form
      handleAddExamForm() {
        this.exam_form.push({
          exam_title: '',
          exam_choose: '',
          exam_score: '',
          exam_answer: ''
        })
      },
      //删除题库form
      handlePopExamForm() {
        if (this.exam_form.length < 2) {
          return false;
        }
        this.exam_form.pop();
      },
      //打开编辑培训
      handleOpenEditTrain(row) {
        this.edit_train_params.lecturer = row.lecturer;
        this.edit_train_params.train_name = row.name;
        this.edit_train_visible = true;
      },
      handleCancelAddTrain() {
        this.add_params = {
          name: '',
          lecturer: ''
        };
        this.is_add = false;
      },
      //打开培训管理
      handleClickTrainManagement(id) {
        this.isGuidance = id;
        if (id === 2) {
          this.more_visible = true;
        } else {
          this.train_management_visible = true;
        }
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },

  }
</script>

<style lang="scss">
  #train {
    .library_info {
      .exam_type {
        .train-radio-style {
          .el-radio {
            display: inline-block;
          }

        }
      }
    }
  }
</style>




<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/train/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .militaryOrganization {
      .train {
        .main-nav {
          .isActive {
            @include militaryImg('teji.png', 'theme1');
            color: white;
          }
        }

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

        .time_over {
          color: $colorE33;
          font-size: 18px;
        }

        .exam_detail_control {
          width: 100%;
          padding: 15px 0;
          text-align: right;
          border-bottom: 1px solid $color874;
        }

        .text_color {
          margin-left: 15px;
          cursor: pointer;
          color: $colorE33;
        }
      }
    }
  }


</style>
