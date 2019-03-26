<template>
  <div id="staffRoster">
    <div class="mainListTable"  :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="部门" prop="org[0].name"></el-table-column>
        <el-table-column label="面貌" prop=""></el-table-column>
        <el-table-column label="出生年月" prop=""></el-table-column>
        <el-table-column label="身份证号" prop=""></el-table-column>
        <el-table-column label="城市" prop=""></el-table-column>
        <el-table-column label="婚育情况" prop=""></el-table-column>
        <el-table-column label="家庭住址" prop=""></el-table-column>
        <el-table-column label="联系方式" prop=""></el-table-column>
        <el-table-column label="紧急联系人" prop=""></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">

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

    <StaffFiles :module="filesVisible" @close="filesVisible = false"></StaffFiles>
  </div>
</template>

<script>
  import StaffFiles from '../components/staffFiles.vue'

  export default {
    name: "index",
    props: ['searchVal'],
    components: {StaffFiles},
    data() {
      return {
        url: globalConfig.organ_server,
        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
        },
        filesVisible: false,
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getStaffList();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      getStaffList() {
        this.$http.get(this.url + 'staff/user', this.params).then(res => {
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
        this.filesVisible = true;
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
  @import "../../../../assets/scss/humanResource/staffRoster/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/staffRoster/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffRoster {

    }
  }

  #theme_name.theme2 {
    #staffRoster {

    }
  }

  #theme_name.theme3 {
    #staffRoster {

    }
  }

  #theme_name.theme4 {
    #staffRoster {

    }
  }
</style>
