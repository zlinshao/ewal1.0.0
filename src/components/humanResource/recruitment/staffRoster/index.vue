<template>
  <div id="staffRoster">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}" @click="tableClickRow">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
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
    components: {StaffFiles},
    data() {
      return {
        url: globalConfig.organ_server,
        checkList: [],
        showData: {
          name: '姓名',
          date1: '部门',
          date2: '面貌',
          date3: '民族',
          date4: '出生日期',
          date5: '身份证号',
          date6: '城市',
          date7: '户口性质',
          date8: '婚育情况',
          date9: '家庭住址',
          date10: '联系方式',
          date11: '紧急联系人',
          phone: '电话',
        },
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 36,
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
    watch: {},
    computed: {},
    methods: {
      getStaffList() {
        this.$http.get(this.url + 'staff/user', this.params).then(res => {
          console.log(res.data.data);
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
