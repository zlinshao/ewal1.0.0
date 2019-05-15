<template>
  <div id="subject">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>科目</h1>
      </div>
      <div class="items-center listTopRight">
        <el-tooltip content="新增" placement="bottom" :visible-arrow="false">
          <div class="icons add" @click="new_subject_visible = true"><b>+</b></div>
        </el-tooltip>
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch"></div>
        </el-tooltip>
      </div>
    </div>
    <div class="action-bar changeChoose" v-show="action_visible">
      <div class="action-bar-left">
        <!--<el-checkbox>全选</el-checkbox>-->
        <span class="check-count">已选中 <i>{{multipleSelection.length}}</i> 项</span>
        <span class="action-bar-name">
                    <span class="edit" @click="handleOpenEdit(current_row)">编辑</span>
                    <span class="edit" @click="handleMoveSubject(current_row)">迁移</span>
                    <span class="edit" @click="handleUnUseSubject(current_row)">{{current_row.is_enable===2 ? '禁用' : '启用'}}</span>
                    <span class="delete" @click="handleDeleteSubject(current_row)">删除</span>
                </span>
      </div>
      <div class="action-bar-right">

      </div>

    </div>
    <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="subjectData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">

        <!--<el-table-column-->
          <!--type="selection" width="40">-->
        <!--</el-table-column>-->
        <el-table-column width="40">
          <template slot-scope="scope">
            <span class="table_choose" :class="{'is_table_choose': scope.row.id === is_table_choose }"></span>
          </template>
        </el-table-column>
        <el-table-column label="编码" prop="subject_code" align="center" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.subject_code">{{ scope.row.subject_code }}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="title" align="center"></el-table-column>
        <el-table-column label="类别" prop="er_type" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.er_type === 1">收入</span>
            <span v-if="scope.row.er_type === 2">支出</span>
            <span v-if="scope.row.er_type === 3">混合</span>
          </template>
        </el-table-column>
        <el-table-column label="款项数量" prop="fund_amounts" align="center"></el-table-column>
        <el-table-column label="款项总金额" prop="fund_total" align="center"></el-table-column>
        <el-table-column label="创建人" prop="creator.name" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>

      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="subjectCount"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>

    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--编辑科目-->
    <lj-dialog
      :visible="edit_visible"
      :size="{width: 500 + 'px',height: 450 + 'px'}"
      @close="edit_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="edit_subject" label-width="100px">
            <el-form-item label="科目名称">
              <el-input placeholder="请输入" v-model="edit_subject.title"></el-input>
            </el-form-item>
            <el-form-item label="科目编号">
              <el-input placeholder="请输入" v-model="edit_subject.subject_code"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select class="all_width" placeholder="请选择" v-model="edit_subject.er_type">
                <el-option label="收入" :value="1"></el-option>
                <el-option label="支出" :value="2"></el-option>
                <el-option label="混合" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="handleEditSubjectInfo">修改</el-button>
          <el-button size="mini" @click="edit_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--迁移-->
    <lj-dialog
      :visible="move_visible"
      @close="handleCancelMove"
      :size="{width: 500 + 'px',height: 400 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>迁移</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="move_subject" label-width="100px">
            <el-form-item label="原科目">
              <el-input disabled v-model="move_subject.initial"></el-input>
            </el-form-item>
            <el-form-item label="现科目">
              <el-input @focus="handleOpenSubject('move_subject')"
                        v-model="move_subject.title"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="handleOkMove">修改</el-button>
          <el-button size="mini" @click="handleCancelMove">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--禁用/启用-->
    <lj-dialog
      :visible="open_close_visible"
      :size="{width: 500 + 'px',height: 300 + 'px'}"
      @close="open_close_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确认</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">
            {{ currentRow.is_enable === 2 ? '确认要禁用该科目吗？' : '确认要启用该科目吗？'}}
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleOkUnuse">确定</el-button>
          <el-button size="mini" @click="open_close_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增科目-->
    <lj-dialog
      :visible="new_subject_visible"
      :size="{width: 500 + 'px', height: 500 + 'px'}"
      @close="new_subject_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="new_subject" ref="addSubject" label-width="100px">
            <el-form-item prop="parent_id" label="上级科目" align="center">
              <el-input placeholder="必选项" @focus="handleOpenSubject('new_subject')"
                        v-model="new_subject.parent_name"></el-input>
            </el-form-item>
            <el-form-item prop="title" label="科目名称" align="center">
              <el-input placeholder="必填" v-model="new_subject.title"></el-input>
            </el-form-item>
            <el-form-item prop="subject_code" label="科目编码" align="center">
              <el-input placeholder="必填" v-model="new_subject.subject_code"></el-input>
            </el-form-item>
            <el-form-item prop="er_type" label="科目类型" align="center">
              <el-select class="all_width" v-model="new_subject.er_type" placeholder="必选项">
                <el-option :value="1" label="收入"></el-option>
                <el-option :value="2" label="支出"></el-option>
                <el-option :value="3" label="混合"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleSubjectAdd('addSubject')">新增</el-button>
          <el-button size="small" @click="handleCancelAdd">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--删除-->
    <lj-dialog
      :visible="del_subject_visible"
      :size="{width: 500 + 'px',height: 300 + 'px'}"
      @close="del_subject_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确认</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定要删除该科目吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleOkDelSubject">确定</el-button>
          <el-button size="mini" @click="del_subject_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--科目-->
    <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"
                style="z-index: 1000"></lj-subject>

  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue'
  import LjSubject from '../../common/lj-subject.vue';
  import {subjectSearch} from '../../../assets/js/allSearchData';

  export default {
    name: "index",
    components: {SearchHigh, FinMenuList, LjDialog, LjSubject},
    data() {
      return {
        is_table_choose: '',

        del_subject_visible: false,
        subjectSearch,
        url: globalConfig.temporary_server,
        subject_visible: false,
        which_subject: '',
        new_subject_visible: false,
        new_subject: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },
        params: {
          er_type: '',
          parent_id: '',
          search: '',
          page: 1,
          limit: 15
        },
        open_close_visible: false,
        open_close_size: '',
        edit_visible: false, //编辑科目
        showFinMenuList: false,
        edit_subject: {
          title: '',
          subject_code: '',
          er_type: ''
        },
        move_visible: false,
        move_subject: {
          initial: '',
          parent_id: '',
          title: ''
        },
        chooseRowIds: [],
        subjectData: [],
        subjectCount: 0,
        showSearch: false,
        searchData: {},

        currentRow: {},
        multipleSelection: [],//多选
        action_visible: false,//操作栏
        current_row: '',
      }
    },
    mounted() {
      this.getSubjectList();
    },
    activated() {
    },
    watch: {
      multipleSelection: {
        handler(val) {

        },
        deep: true
      },
      action_visible: {
        handler(val) {

        },
        deep: true
      }
    },
    computed: {},
    methods: {
      handleOkDelSubject() {
        this.$http.delete(globalConfig.temporary_server + `subject/delete/${this.currentRow.id}`).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
            this.getSubjectList();
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
            return false;
          }
          this.del_subject_visible = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleDeleteSubject(row) {
        this.currentRow = row;
        this.del_subject_visible = true;
      },
      handleOpenSubject(which) {
        this.which_subject = which;
        this.subject_visible = true;
      },
      handleSubjectAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.url + 'subject', this.new_subject).then(res => {
              if (res.code === 200) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                  subMessage: '',
                });
                this.handleCancelAdd();
                this.getSubjectList();
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                  subMessage: '',
                });
                return false;
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            return false;
          }
        })
      },
      handleCancelAdd() {
        this.$refs['addSubject'].resetFields();
        this.new_subject.parent_name = '';
        this.new_subject_visible = false;
      },
      handleOkMove() {
        if (!this.move_subject.parent_id) {
          // this.$notify.warning({
          //     title: '警告',
          //     message: '请选择父级科目'
          // });
          this.$LjNotify('error', {
            title: '警告',
            message: '请选择父级科目',
            subMessage: '',
          });
          return false;
        }
        this.$http.put(this.url + `subject/migrate/${this.currentRow.id}`, {parent_id: this.move_subject.parent_id}).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
            this.handleCancelMove();
            this.getSubjectList();
          } else {
            this.$LjNotify('success', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleCancelMove() {
        this.move_subject.title = '';
        this.move_subject.parent_id = '';
        this.move_visible = false;
      },
      handleMoveSubject(row) {
        this.currentRow = row;
        this.move_subject.initial = row.title;
        this.move_visible = true;
      },
      //科目确定
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'new_subject') {
          this.new_subject.parent_name = val.title;
          this.new_subject.parent_id = val.id;
        }
        console.log(val)
      },
      //编辑
      handleOpenEdit(row) {
        this.currentRow = row;
        this.edit_subject.title = row.title;
        this.edit_subject.er_type = row.er_type;
        this.edit_subject.subject_code = row.subject_code;
        this.edit_visible = true;
      },
      getSubjectList() {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'subject', this.params).then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.subjectData = res.data.data;
            this.subjectCount = res.data.count;
          } else {
            this.subjectData = [];
            this.subjectCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleEditSubjectInfo() {
        this.$http.put(this.url + `subject/${this.currentRow.id}`, this.edit_subject).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
          } else {
            this.$LjNotify('success', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
          }
          this.edit_visible = false;
          this.getSubjectList();
        }).catch(err => {
          console.log(err);
        });
      },

      handleChangePage(page) {
        this.params.page = page;
        this.getSubjectList();
      },
      handleUnUseSubject(row) {
        this.currentRow = row;
        this.open_close_visible = true;
        this.open_close_size = 'mini';
      },
      handleOkUnuse() {
        var is_enable = this.currentRow.is_enable === 1 ? 2 : 1;
        this.$http.put(this.url + `subject/isEnable/${this.currentRow.id}`, {is_enable}).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
          }
          this.open_close_visible = false;
          this.getSubjectList();
        }).catch(err => {
          console.log(err);
        })
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
      },
      // 当前点击
      tableClickRow(row) {
        if (this.is_table_choose === row.id) {
          this.is_table_choose = '';
          this.multipleSelection = '';
          this.current_row = '';
          this.action_visible = false;
        } else {
          this.is_table_choose = row.id;
          this.multipleSelection = row;
          this.current_row = row;
          this.action_visible = true;
        }
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData = subjectSearch;
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          this.params.er_type = val.er_type;
          this.params.search = val.search;
          this.getSubjectList();
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dialog_main {
    padding: 20px 30px;
  }

  @import "../../../assets/scss/finance/subject/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/finance/subject/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #subject {
      height: 100%;
    }
  }

  #theme_name.theme2 {
    #subject {

    }
  }

  #theme_name.theme3 {
    #subject {

    }
  }

  #theme_name.theme4 {
    #subject {

    }
  }
</style>
