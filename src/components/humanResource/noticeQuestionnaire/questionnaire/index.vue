<template>
  <div id="questionnaire">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <div class="icons-font"><b>发公告</b></div>
        <!--<div class="icons add" @click="publish_notice_dialog_visible = true"><b>+</b></div>-->
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
        </el-table-column>
        <template slot-scope="scope">
          <div @click="showObjectHandler" style="color: #0C66FF;cursor: pointer">{{scope.object_count}}</div>
        </template>
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
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';


  export default {
    name: "index",
    props: ['searchVal'],
    components: {
      LjDialog
    },
    data() {
      return {
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
      }
    },
    mounted() {
      //this.initData();
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
      showObjectHandler() {

      },



      getQuestionnaireList() {
        this.tableData = [];
        let params = {
          ...this.params
        };
        this.$http.get(`${this.url}questionnaire`,params).then(res=> {
          debugger
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

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/reward/rewardDown/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #questionnaire {



      footer.common-page {
        height: 100px;
        width: 100%;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 100px;
        //background-color: $color2F2;
        z-index: 6;
        .develop {
          position: absolute;
          top: -30px;
          width: 80px;
          cursor: pointer;
          height: 30px;
          opacity: 1;
          border-radius: 10px 10px 0 0;
          background-color: $color2F2;

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
