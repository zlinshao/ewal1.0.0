<template>
  <div id="questionnaire">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
<!--        <div @click="showAddQuestionnaire" class="icons-font"><b>新建问卷</b></div>-->
        <div @click="showAddQuestionnaire" class="icons add"><b>+</b></div>
      </div>

    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" highlight-current-row :height="this.mainListHeight(30) + 'px'" :row-class-name="tableChooseRow"
        @cell-click="tableClickRow" header-row-class-name="tableHeader" @row-dblclick="tableDblClick" :row-style="{height:'70px'}"
        style="width: 100%">
        <el-table-column key="name" align="center" prop="name" label="问卷名称">
        </el-table-column>
        <el-table-column key="username" align="center" prop="username" label="发布人">
          <template slot-scope="scope">
            {{scope.row.user.name||'-'}}
          </template>
        </el-table-column>
        <el-table-column key="release_time" align="center" prop="release_time" label="发布时间">
        </el-table-column>
        <el-table-column key="start_time" align="center" prop="start_time" label="开始时间">
        </el-table-column>
        <el-table-column key="validity_time" align="center" prop="validity_time" label="有效期(天)">
        </el-table-column>
        <el-table-column key="reply_number" align="center" prop="reply_number" label="回复量">
        </el-table-column>
        <el-table-column key="object_count" align="center" prop="object_count" label="调查对象(人数)">
          <template slot-scope="scope">
            <div @click="showObjectHandler" style="color: #0C66FF">{{scope.row.object_count}}</div>
          </template>
        </el-table-column>

        <el-table-column key="status" align="center" prop="status" label="调查状态">
          <template slot-scope="scope">
            <div style="color: #FFAD0D;" v-if="scope.row.status==0">未开始</div>
            <div style="color: #0BB07B;" v-if="scope.row.status==1">进行中</div>
            <div style="color: #9B9B9B;" v-if="scope.row.status==2">已结束</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status!==2">-</div>
            <el-button @click="viewStatisticsResult(scope.row)" v-if="scope.row.status==2" type="primary" size="mini"
              plain>查看统计结果</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
            :page-size="params.limit" :total="counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--新建问卷对话框-->
    <lj-dialog :visible.sync="add_questionnaire_dialog_visible" :size="{width:'450px',height: '600px'}">
      <div class="dialog_container add-questionnaire-dialog">
        <div class="dialog_header">
          <h3>{{add_questionnaire_form_type==1?'新建问卷':add_questionnaire_form_type==2?'问卷详情':'编辑问卷'}}</h3>
          <div v-if="add_questionnaire_form_type==2" class="header_right">
            <i @click="showEditQuestionnaire" class="icon-edit"></i>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-form :disabled="add_questionnaire_form_type==2" style="text-align: left" size="small" label-width="100px"
            :rules="rules.addQuestionnaire" ref="addQuestionnaireFormRef" :model="add_questionnaire_form">
            <el-form-item prop="name" label="问卷名称">
              <el-input v-model="add_questionnaire_form.name" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item prop="start_time" label="开始时间">
              <el-date-picker format="yyyy-MM-dd HH:mm:ss" v-model="add_questionnaire_form.start_time" type="datetime"
                placeholder="必选"></el-date-picker>
            </el-form-item>
            <el-form-item prop="validity_time" label="有效期">
              <el-input v-model.number="add_questionnaire_form.validity_time" placeholder="必填">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="object_ids" label="调查对象">
              <user-choose width="290" v-model="add_questionnaire_form.object_ids" title="必选"></user-choose>
            </el-form-item>

            <el-form-item label="问卷介绍">
              <el-input type="textarea" autosize v-model="add_questionnaire_form.desc" placeholder="请输入问卷介绍"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="add_questionnaire_form_type!==2" class="dialog_footer">
          <el-button v-if="add_questionnaire_form_type==1" @click="saveQuestionnaire" size="small" type="danger">提交</el-button>
          <el-button v-if="add_questionnaire_form_type==3" @click="editQuestionnaire" size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="add_questionnaire_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <test-paper :type="2" :visible.sync="paper_visible" :params="paper_params" :statisticsResult="statistics_result"
      @success="getExamList"></test-paper>

  </div>
</template>

<script>
import UserChoose from '../../../common/lightweightComponents/UserChoose';
import LjDialog from '../../../common/lj-dialog.vue';
import TestPaper from '../../../common/lightweightComponents/TestPaper';


export default {
  name: "index",
  props: ['searchVal'],
  components: {
    LjDialog,
    UserChoose,
    TestPaper,
  },
  data () {
    return {
      rules: {
        addQuestionnaire: {
          name: [
            { required: true, message: '请输入公告名称', trigger: 'blur' },
          ],
          start_time: [
            { required: true, message: '请选择开始时间', trigger: 'blur' },
          ],
          validity_time: [
            { required: true, message: '请输入有效期', trigger: 'blur' },
            { type: 'number', message: '必须为数字值', trigger: 'blur' }
          ],
          object_ids: [
            { required: true, message: '请选择调查对象', trigger: ['blur', 'change'] },
          ],
        },
      },


      url: globalConfig.humanResource_server,
      checkList: [],
      chooseRowIds: [],
      tableData: [],
      counts: 0,
      params: {
        page: 1,
        limit: 8,
      },


      //新建问卷
      add_questionnaire_form_type: 1,
      add_questionnaire_form_title: '新建问卷',
      add_questionnaire_dialog_visible: false,
      add_questionnaire_form: {
        name: '',//名称
        start_time: '',//开始时间
        validity_time: null,//有效期
        object_ids: [],//人员数组
        exam_info: [],//调查问卷题库
        desc: '',//问卷简介
        status:null,
      },


      paper_visible: false,
      paper_params: {
        paper_name: '新建问卷',
        title: '',
        sub_title: '',
        btn_name: '预览问卷',
        edit_btn_visible: true,
      },

      //问卷调查结果
      statistics_result: [],
    }
  },
  activated () {
  },
  watch: {
    searchVal: {//深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        //this.params = val;
        this.getQuestionnaireList(val);
      },
      deep: true,
    },
  },
  computed: {},
  mounted () {
    this.getQuestionnaireList();
    let that = this;
    this.$bus.$on('questionnaireSearchVal', function (val) {
      that.getQuestionnaireList(val);
    });
  },
  methods: {
    //显示调查对象对话框
    showObjectHandler () {

    },

    //显示新建问卷对话框
    showAddQuestionnaire () {
      this.add_questionnaire_form_type = 1;
      //this.add_questionnaire_form_title = '新建问卷';
      this.add_questionnaire_dialog_visible = true;
      this.add_questionnaire_form = {
        name: '',//名称
        start_time: '',//开始时间
        validity_time: null,//有效期
        object_ids: [],//人员数组
        exam_info: [],//调查问卷题库
        status:null,
      };
    },

    //保存问卷->显示问卷调查编辑框
    saveQuestionnaire () {
      this.$refs['addQuestionnaireFormRef'].validate(valid => {
        if (valid) {
          this.paper_visible = true;
          this.paper_params.title = this.add_questionnaire_form.name;
        }
      });
    },


    showEditQuestionnaire() {

      if(this.add_questionnaire_form.status==1) {
        this.$LjMessage('warning',{
          title:'警告',
          msg:'正在进行的问卷调查不允许修改',
        });
        return;
      }

      this.add_questionnaire_form_type=3;
    },

    //编辑调查问卷
    editQuestionnaire () {
      this.$http.post(`${this.url}questionnaire/update`, this.add_questionnaire_form).then(res => {
        this.$LjNotifyEasy(res, () => {
          this.add_questionnaire_dialog_visible = false;
          this.getQuestionnaireList();
        })
      });
    },

      //获取试题列表 并提交数据到新增公告接口
      getExamList(examList) {
        this.add_questionnaire_form.exam_info = examList;
        this.add_questionnaire_form.start_time = this.myUtils.formatDate(this.add_questionnaire_form.start_time, 'yyyy-MM-dd hh:mm:ss');
        this.$http.post(`${this.url}questionnaire`, this.add_questionnaire_form).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
            });
            this.add_questionnaire_dialog_visible = false;
            this.getQuestionnaireList();
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
            });
          }
        });
      },


    //获取问卷列表
    getQuestionnaireList (outerParams) {
      this.showLoading(true);
      //this.tableData = [];
      let params = {
        ...outerParams,
        ...this.params,
        all: 1,
      };
      if (params.search) {
        params.name
      }
      this.$http.get(`${this.url}questionnaire`, params).then(res => {
        this.showLoading(false);
        if (res.code.endsWith('0')) {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        }
      });
    },

    //查看统计结果
    viewStatisticsResult (row) {
      let params = {
        id: row.id
      };
      this.$http.post(`${this.url}questionnaire/submitCount`, params).then(res => {
        if (res.code.endsWith('0')) {
          this.statistics_result = res.data;
          this.paper_params.title = row.name;
          this.paper_params.response_count = row.reply_number;
        }
      });
    },

      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        this.add_questionnaire_form_type = 2;
        this.add_questionnaire_dialog_visible = true;
        this.add_questionnaire_form = {
          id:row.id,
          name: row.name,//名称
          start_time: row.start_time,//开始时间
          validity_time: row.validity_time,//有效期
          object_ids: row.object_ids,//人员数组
          desc:row.desc,
          status:row.status
        };
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getQuestionnaireList();
      },
    // 当前点击
    tableClickRow (row) {
      let ids = this.chooseRowIds;
      ids.push(row.id);
      this.chooseRowIds = this.myUtils.arrayWeight(ids);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/humanResource/noticeQuestionnaire/questionnaire/index.scss";

@mixin nqImg($m, $n) {
  $url: "../../../../assets/image/humanResource/noticeQuestionnaire/" + $n + "/" +
    $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #questionnaire {
    .icon-edit {
      @include nqImg("bj.png", "theme1");
    }

    .read-icon {
      @include nqImg("button_bg_gray.png", "theme1");

      &.checked {
        @include nqImg("button_bg_red.png", "theme1");
      }
    }

    .listTopRight {
      .icons-font {
        @include nqImg("fabang.png", "theme1");
      }
    }
  }
}

#theme_name.theme2 {
  #questionnaire {
  }
}

#theme_name.theme3 {
  #questionnaire {
  }
}

#theme_name.theme4 {
  #questionnaire {
  }
}
</style>
