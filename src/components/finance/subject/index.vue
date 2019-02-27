<template>
  <div id="subject">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center">
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
        :data="tableData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="operate">
              <el-button size="mini" type="primary" plain @click="edit_visible = true">编辑</el-button>
              <el-button size="mini" type="warning" plain @click="move_visible = true">迁移</el-button>
              <el-button size="mini" type="danger" plain>禁用</el-button>
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
            :total="100"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

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
                    <i class="icon_come"></i>
                  </b>
                  <span>科目名称</span>
                </div>
                <div class="item_content">
                  <el-input v-model="edit_subject.name"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_type"></i>
                  </b>
                  <span>科目编号</span>
                </div>
                <div class="item_content">
                  <el-input v-model="edit_subject.num"></el-input>
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
                  <el-input v-model="edit_subject.num"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger">修改</el-button>
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


  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: {SearchHigh,LjDialog},
    data() {
      return {
        edit_visible: false, //编辑科目
        edit_subject: {
          name: '',
          num: '',
          type: ''
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
        showData: {
          date: '日期',
          name: '姓名',
          address: '地址',
        },
        chooseRowIds: [],
        tableData: [
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 23,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 33,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 23,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 33,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 10,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 20,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 30,
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 11,
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 12,
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 13,
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ],

        showSearch: false,
        searchData: {
          status: 'workOrder',
          data: [],
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
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
