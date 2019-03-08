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
        <div class="icons add" @click="new_subject_visible = true"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="subjectData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column label="编码" prop="subject_code" align="center">
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
        <el-table-column
          align="center"
          label="操作"
          min-width="140px"
        >
          <template slot-scope="scope">
            <div class="operate">
              <el-button size="mini" type="primary" plain @click="handleOpenEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="warning" plain @click="handleMoveSubject(scope.row)">迁移</el-button>
              <el-button size="mini" :type="scope.row.is_enable === 2 ? 'danger' : 'success'" plain @click="handleUnUseSubject(scope.row)">
                {{ scope.row.is_enable === 2 ? '禁用' : '启用'}}
              </el-button>
              <el-button size="mini" type="danger" plain @click="handleDeleteSubject(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
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
      :size="{width: 500 + 'px',height: 380 + 'px'}"
      @close="edit_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="edit_subject" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>科目名称</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="edit_subject.title"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_come"></i>
                  </b>
                  <span>科目编号</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="edit_subject.subject_code"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_type"></i>
                  </b>
                  <span>类别</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" placeholder="请选择" v-model="edit_subject.er_type">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                    <el-option label="混合" :value="3"></el-option>
                  </el-select>
                </div>
              </div>
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
      :size="{width: 500 + 'px',height: 320 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="move_subject" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_type"></i>
                  </b>
                  <span>原科目</span>
                </div>
                <div class="item_content">
                  <el-input disabled v-model="move_subject.initial"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_type"></i>
                  </b>
                  <span>现科目</span>
                </div>
                <div class="item_content">
                  <el-input @focus="handleOpenSubject('move_subject')" v-model="move_subject.title"></el-input>
                </div>
              </div>
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
      :size="{width: 400 + 'px',height: 250 + 'px'}"
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
      :size="{width: 500 + 'px', height: 510 + 'px'}"
      @close="new_subject_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增科目</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="new_subject" size="mini" :rules="add_subject_rules" ref="addSubject">
            <el-form-item prop="parent_id">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>上级科目</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" @focus="handleOpenSubject('new_subject')" v-model="new_subject.parent_name"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="title">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_case"></i>
                  </b>
                  <span>科目名称</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="new_subject.title"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="subject_code">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>科目编码</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="new_subject.subject_code"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="er_type">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_type"></i>
                  </b>
                  <span>科目类型</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="new_subject.er_type" placeholder="请选择">
                    <el-option :value="1" label="收入"></el-option>
                    <el-option :value="2" label="支出"></el-option>
                    <el-option :value="3" label="混合"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="remark">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注</span>
                </div>
                <div class="item_content">
                  <el-input v-model="new_subject.remark" placeholder="请输入" type="textarea"></el-input>
                </div>
              </div>
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
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="del_subject_visible = false"
    >
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
    <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"></lj-subject>

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
    components: {SearchHigh, FinMenuList, LjDialog,LjSubject},
    data() {
      return {
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
        add_subject_rules: {
          parent_id: [{ required: true,message: '请选择上级科目',trigger: 'blur'}],
          title: [{ required: true,message: '请输入科目名称',trigger: 'blur'}],
          subject_code: [{ required: true,message: '请输入科目编码',trigger: 'blur'}],
          er_type: [{ required: true,message: '请选择科目类型',trigger: 'change'}],
          remark: [{ required: true,message: '请输入备注',trigger: 'blur'}],
        },
        params: {
          er_type: '',
          parent_id: '',
          search: '',
          page: 1,
          limit: 12
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
      }
    },
    mounted() {
      this.getSubjectList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleOkDelSubject() {
        this.$http.delete(globalConfig.temporary_server + `subject/delete/${this.currentRow.id}`).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$notify.success({
              title: '成功',
              message: res.msg
            });
            this.getSubjectList();
          }else {
            this.$notify.warning({
              title: '失败',
              message: res.msg
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
            this.$http.post(this.url + 'subject',this.new_subject).then(res => {
              if (res.code === 200) {
                this.$notify.success({
                  title: '成功',
                  message: res.msg
                });
                this.handleCancelAdd();
                this.getSubjectList();
              }else {
                this.$notify.warning({
                  title: '失败',
                  message: res.msg
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
          this.$notify.warning({
            title: '警告',
            message: '请选择父级科目'
          });
          return false;
        }
        this.$http.put(this.url + `subject/migrate/${this.currentRow.id}`,{parent_id: this.move_subject.parent_id}).then(res => {
          if (res.code === 200) {
            this.$notify.success({
              title: '成功',
              message: res.msg
            });
            this.handleCancelMove();
            this.getSubjectList();
          }else {
            this.$notify.warning({
              title: '失败',
              message: res.msg
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
        this.$http.get(globalConfig.temporary_server + 'subject',this.params).then(res => {
          if (res.code === 200) {
            this.showLoading(false);
            this.subjectData = res.data.data;
            this.subjectCount = res.data.count;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleEditSubjectInfo() {
        this.$http.put(this.url + `subject/${this.currentRow.id}`,this.edit_subject).then(res => {
          if (res.code === 200) {
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            });
          } else {
            this.$notify.warning({
              title: '失败',
              message: '修改失败'
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
        this.$http.put(this.url + `subject/isEnable/${this.currentRow.id}`,{is_enable}).then(res => {
          if (res.code === 200) {
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            });
          } else {
            this.$notify.warning({
              title: '失败',
              message: '修改失败'
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
          this.getSubjectList();
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
