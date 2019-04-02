<template>
  <div id="leaveJob">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="岗位" prop="position" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.position && scope.row.position.length > 0">
              <span v-for="item in scope.row.position">{{ item.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入职时间" prop="staff.enroll" align="center"></el-table-column>
        <el-table-column label="离职时间" prop="staff.enroll" align="center"></el-table-column>
        <el-table-column label="离职操作时间" prop="staff.enroll" align="center"></el-table-column>
        <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
        <el-table-column label="离职类型" prop="dismiss_time.entry_type" align="center"></el-table-column>
        <el-table-column label="离职备注" prop="dismiss_time.entry_mess" align="center"></el-table-column>
        <el-table-column label="离职交接单" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLooResignation(scope.row,'resignation_form')">查看</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column label="合同" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="离职短信" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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

      <LjDialog
        :visible="look_info_visible"
        :size="{width: 700 + 'px',height: 400 + 'px'}"
        @close="handleCloseLookInfo"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>查看信息</h3>
          </div>
          <div class="dialog_main">

          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleCloseLookInfo">确定</el-button>
          </div>
        </div>
      </LjDialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  export default {
    name: "index",
    components: { LjDialog },
    props: ['exportInfo'],
    data() {
      return {
        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 36,
          org_id: '',
          position_id: '',
          is_on_job: 1,
          export: 0
        },

        look_info: [],
        look_info_visible: false
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      exportInfo(val) {
        console.log(val);
        if (val === 4) {
          this.params.export = 1;
          this.getStaffList();
        }
      },
    },
    computed: {},
    methods: {
      handleCloseLookInfo() {
        this.look_info = [];
        this.look_info_visible = false;
      },
      handleLooResignation(row,type) {
        if (row.staff && row.staff[type]) {
          this.look_info = row.staff[type] || [];
          this.look_info_visible = true;
        } else {
          this.$LjNotify('warning',{
            title: '提示',
            message: '暂无该信息'
          })
        }
      },
      getStaffList() {
        this.$http.get('staff/user', this.params).then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getStaffList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/leaveJob/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/scss/humanResource/leaveJob/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #leaveJob {

    }
  }

  #theme_name.theme2 {
    #leaveJob {

    }
  }

  #theme_name.theme3 {
    #leaveJob {

    }
  }

  #theme_name.theme4 {
    #leaveJob {

    }
  }
</style>
