<template>
  <div id="questionnaire">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <div @click="showAddQuestionnaire" class="icons-font"><b>新建问卷</b></div>
      </div>

    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        @row-dblclick="tableDblClick"
        :row-style="{height:'70px'}"
        style="width: 100%">
        <el-table-column
          key="name"
          align="center"
          prop="name"
          label="问卷名称">
        </el-table-column>
        <el-table-column
          key="username"
          align="center"
          prop="username"
          label="发布人">
          <template slot-scope="scope">
            {{scope.row.user.name||'-'}}
          </template>
        </el-table-column>
        <el-table-column
          key="release_time"
          align="center"
          prop="release_time"
          label="发布时间">
        </el-table-column>
        <el-table-column
          key="start_time"
          align="center"
          prop="start_time"
          label="开始时间">
        </el-table-column>
        <el-table-column
          key="validity_time"
          align="center"
          prop="validity_time"
          label="有效期(天)">
        </el-table-column>
        <el-table-column
          key="reply_number"
          align="center"
          prop="reply_number"
          label="回复量">
        </el-table-column>
        <el-table-column
          key="object_count"
          align="center"
          prop="object_count"
          label="调查对象(人数)">
          <template slot-scope="scope">
            <div @click="showObjectHandler" style="color: #0C66FF;cursor: pointer">{{scope.row.object_count}}</div>
          </template>
        </el-table-column>

        <el-table-column
          key="status"
          align="center"
          prop="status"
          label="调查状态">
          <template slot-scope="scope">
            <div style="color: #FFAD0D;" v-if="scope.row.status==0">未开始</div>
            <div style="color: #0BB07B;" v-if="scope.row.status==1">进行中</div>
            <div style="color: #9B9B9B;" v-if="scope.row.status==2">已结束</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status!==2">-</div>
            <el-button v-if="scope.row.status==2" type="primary" size="mini" plain>查看统计结果</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>




    <!--新建问卷对话框-->
    <lj-dialog
      :visible.sync="add_questionnaire_dialog_visible"
      :size="{width:'500px',height: '500px'}">
      <div class="dialog_container add-questionnaire-dialog">
        <div class="dialog_header">
          <h3>新建问卷</h3>
        </div>
        <div class="dialog_main">
          <el-form size="small" label-width="100px" :rules="rules.addQuestionnaire" ref="addQuestionnaireFormRef" :model="add_questionnaire_form">
            <el-form-item prop="name" label="问卷名称">
              <el-input v-model="add_questionnaire_form.name" placeholder="请输入试卷名称"></el-input>
            </el-form-item>
            <el-form-item prop="start_time" label="开始时间">
              <el-date-picker v-model="add_questionnaire_form.start_time" type="datetime" placeholder="请选择开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item prop="validity_time" label="有效期">
              <el-input v-model.number="add_questionnaire_form.validity_time" placeholder="请输入有效期">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="object_ids" label="调查对象">
              <user-choose v-model="add_questionnaire_form.object_ids"></user-choose>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="add_questionnaire_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>





    <test-paper :visible.sync="paper_visible" :params="paper_params" @success="demoSuccess"></test-paper>

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
    data() {
      return {
        rules:{
          addQuestionnaire:{
            name:[
              {required:true,message: '请输入公告名称', trigger: 'blur'},
            ],
            start_time:[
              {required:true,message: '请选择开始时间', trigger: 'blur'},
            ],
            validity_time:[
              {required:true,message: '请输入有效期', trigger: 'blur'},
              { type: 'number', message: '必须为数字值',trigger: 'blur'}
            ],
            object_ids:[
              {required:true,message: '请选择调查对象', trigger: 'blur'},
            ],
          },
        },


        url: globalConfig.humanResource_server,
        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 8,
        },

        add_questionnaire_dialog_visible: false,
        add_questionnaire_form: {
          name:'',//名称
          start_time:'',//开始时间
          validity_time:null,//有效期
          object_ids:[],//人员数组
          exam_info:[],//调查问卷题库
        },



        paper_visible:false,
        paper_params:{
          paper_name:'新建问卷',
          //title:'入职考试',
          sub_title:'关于春节挂春联选一副',
          btn_name:'预览问卷',
        },

      }
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
        },
        deep: true,
      },
    },
    computed: {},
    mounted() {
      this.getQuestionnaireList();
    },
    methods: {
      //显示调查对象对话框
      showObjectHandler() {

      },

      //显示新建问卷对话框
      showAddQuestionnaire() {
        this.add_questionnaire_dialog_visible = true;
      },

      demoSuccess(examList) {
        debugger
        console.log(examList);
      },



      getQuestionnaireList() {
        //this.tableData = [];
        let params = {
          ...this.params
        };
        this.$http.get(`${this.url}questionnaire`,params).then(res=> {
          if(res.code.endsWith('0')) {
            this.tableData = res.data.data;
          }
        });
      },


      initData() {

        for (let i=0;i<9;i++) {
          let obj = {
            id: i+1,
            name: '张三',
            station:'工程师',
            department:'研发部',
            event:'攻城时因穿铠甲',
            penalty:'200金币',
            remark:'锁血打小怪掉金币',
            //address: '上海市普陀区金沙江路 1518 弄'
          }
          this.tableData.push(obj);
        }
        this.counts = 1000;
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
        this.reward_order = true;
        this.reward_order_form = {
          name: '张三',
          station:'工程师',
          department:'研发部',
          event:'攻城时因穿铠甲',
          penalty:'200金币',
          remark:'锁血打小怪掉金币',
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
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/noticeQuestionnaire/questionnaire/index.scss";

  @mixin nqImg($m, $n) {
    $url: '../../../../assets/image/humanResource/noticeQuestionnaire/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #questionnaire {
      .read-icon {
        @include nqImg('button_bg_gray.png', 'theme1');
        &.checked {
          @include nqImg('button_bg_red.png', 'theme1');
        }
      }

      .listTopRight {
        .icons-font {
          @include nqImg('fabang.png', 'theme1');
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
