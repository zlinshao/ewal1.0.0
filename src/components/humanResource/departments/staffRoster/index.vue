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
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="部门" prop="org[0].name" align="center"></el-table-column>
        <el-table-column label="出生年月" prop="staff.birthday" align="center"></el-table-column>
        <el-table-column label="身份证号" prop="staff.id_num" align="center"></el-table-column>
        <el-table-column label="婚育情况" prop="staff.marital_status" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.staff && scope.row.staff.marital_status === 1 ? '未婚' :  '已婚' || '未知'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="家庭住址" prop="staff.home_addr" align="center"></el-table-column>
        <el-table-column label="紧急联系方式" prop="staff.emergency_call" align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
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

    <StaffFiles :module="filesVisible" @close="filesVisible = false" :detail-info="staff_detail_info"></StaffFiles>
  </div>
</template>

<script>
  import StaffFiles from '../components/staffFiles.vue'

  export default {
    name: "index",
    props: ['searchVal','searchParams','exportInfo','exportData'],
    components: {StaffFiles},
    data() {
      return {
        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        export_params: {
          field: [],
          export: 0,
        },
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
          export: ''
        },
        filesVisible: false,

        //员工详情
        staff_detail_info: '',
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      exportData: {
        handler(val) {
          this.export_params.field = ['id'];
          val.map(item => {
            this.export_params.field.push(item.key);
          });
          console.log(this.export_params);
        },
        deep: true
      },
      exportInfo(val) {
        if (val === 3) {
          this.export_params.export = 1;
          this.exportStaffList();
        }
      },
      searchParams: {
        handler(val) {
          this.params = Object.assign({},this.params,val);
          this.getStaffList();
        },
        deep: true
      },
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
      exportStaffList() {
        this.$http.post('staff/user/record',this.export_params,{responseType: 'arraybuffer'}).then(res => {
          console.log(res);
          if (!res) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res],{type: 'application/vnd.ms-excel'}));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'export.xls');
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
      },
      getStaffList() {
        this.$http.get('staff/user', this.params).then(res => {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
      },
      //获取当前员工详情
      getStaffDetail(id) {
        this.$http.get(`staff/user/${id}`).then(res => {
          if (res.code === '20020') {
            this.staff_detail_info = res.data;
            this.filesVisible = true;
          } else {
            this.staff_detail_info = '';
            this.$LjNotify('warning',{
              title: '警告',
              message: '获取员工详情失败'
            });
            return false;
          }
        })
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);

        this.getStaffDetail(row.id);
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
