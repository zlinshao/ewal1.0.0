<template>
  <div id="subject">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>科目</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}
            <i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add"><b>+</b></div>
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
        <el-table-column label="款项数量" prop="" align="center"></el-table-column>
        <el-table-column label="款项总金额" prop="" align="center"></el-table-column>
        <el-table-column label="创建人" prop="creator_id" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="100px"
        >
          <template slot-scope="scope">
            <div class="operate">
              <el-button size="mini" type="primary" plain @click="handleOpenEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="warning" plain @click="move_visible = true">迁移</el-button>
              <el-button size="mini" :type="scope.row.is_enable === 2 ? 'danger' : 'success'" plain @click="handleUnUseSubject(scope.row)">
                {{ scope.row.is_enable === 2 ? '禁用' : '启用'}}
              </el-button>
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
      :size="{width: 500 + 'px',height: 330 + 'px'}"
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
      @close="move_visible = false"
      :size="{width: 500 + 'px',height: 300 + 'px'}"
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
                  <el-input v-model="move_subject.initial"></el-input>
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
                  <el-input v-model="move_subject.now"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger">修改</el-button>
          <el-button size="mini" @click="move_visible = false">取消</el-button>
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
          <el-button type="danger" size="mini">确定</el-button>
          <el-button size="mini" @click="open_close_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue'

  export default {
    name: "index",
    components: {SearchHigh, FinMenuList, LjDialog},
    data() {
      return {
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
          now: ''
        },
        selects: [
          {
            id: 1,
            title: '科目管理',
          },
        ],
        chooseTab: 1,
        chooseRowIds: [],
        subjectData: [],
        subjectCount: 0,
        showSearch: false,
        searchData: {
          status: 'workOrder',
          data: [],
        },

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
      //编辑
      handleOpenEdit(row) {
        this.currentRow = row;
        this.edit_subject.title = row.title;
        this.edit_subject.er_type = row.er_type;
        this.edit_subject.subject_code = row.subject_code;
        this.edit_visible = true;
      },
      getSubjectList() {
        this.$http.get(globalConfig.temporary_server + 'subject',this.params).then(res => {
          if (res.code === 200) {
            this.subjectData = res.data.data;
            this.subjectCount = res.data.count;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleEditSubjectInfo() {
        this.$http.put(globalConfig.temporary_server + `subject/${this.currentRow.id}`,this.edit_subject).then(res => {
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
        this.searchData.data = [
          {
            keyType: 'date',
            title: '出生日期',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: '',
          },
          {
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '特级',
              },
              {
                id: 13,
                title: '紧急',
              },
              {
                id: 14,
                title: '重要',
              },
              {
                id: 15,
                title: '一般',
              }
            ],
          },
          {
            keyType: 'check',
            title: '状态',
            keyName: 'check',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
        ];
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

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/subject/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/finance/subject/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #subject {

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
