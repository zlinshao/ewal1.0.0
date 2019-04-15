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
        :default-sort="{prop: 'staff.enroll',order: 'descending'}"
        key="staffTable"
        style="width: 100%">
        <div v-for="(item,index) in table_column" :key="index">
          <el-table-column min-width="120px"  :label="item.val" :prop="item.key" align="center" v-if="item.info">
            <template slot-scope="scope">
              <span v-if="item.key.indexOf('staff') === -1">
                {{ item.info[scope.row[item.key]] ? item.info[scope.row[item.key]] : '/' }}
              </span>
              <span v-else>
                {{ scope.row.staff && scope.row.staff[item.key.split('.')[1]] && item.info[scope.row.staff[item.key.split('.')[1]]] || '/' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" :label="item.val" align="center" v-else-if="item.isArray">
            <template slot-scope="scope">
              <span v-if="item.key.indexOf('staff') === -1">
                <span v-if="scope.row[item.key] && scope.row[item.key].length > 0">
                  <span v-for="(tmp,idx) in scope.row[item.key]" :key="idx">{{ tmp[item.showKey ]}} <a v-if="idx !== scope.row[item.key].length - 1">;</a></span>
                </span>
                <span v-else>/</span>
              </span>
              <span v-else>
                <span v-if="scope.row.staff && scope.row.staff[item.key.split('.')[1]] && scope.row.staff[item.key.split('.')].length > 0">
                  <span v-for="(tmp,idx) in scope.row.staff[item.key.split(',')[1]]" :key="idx">{{ tmp[item.showKey] }} <a v-if="idx !== scope.row.staff[item.key.split('.')[1]] - 1">;</a></span>
                </span>
                <span v-else>/</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" :label="item.val" align="center" v-else-if="item.isBtn">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.stop="handleLookInfo(scope.row,item.key)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" :label="item.val" :prop="item.key" align="center" v-else></el-table-column>
        </div>
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
        table_column: [
          { key: 'staff.internship_number',val: '实习协议',isBtn: true},
          { key: 'name',val: '姓名'},
          { key: 'position',val: '岗位',isArray: true,showKey: 'name'},
          { key: 'gender',val: '性别',info:{0: '女',1: '男'}},
          { key: 'staff.origin_addr',val: '籍贯'},
          { key: 'staff.political_status',val: '政治面貌',info: {1: '群众',2: '团员',3: '党员',4: '其他'}},
          { key: 'staff.birthday',val: '出生年月'},
          { key: 'staff.enroll',val: '入职时间'},
          { key: 'staff.city',val: '城市'},
          { key: 'staff.origin_addr',val: '家庭住址'},
          { key: 'phone',val: '联系方式'},
          { key: 'staff.id_num',val: '身份证'},
          { key: 'staff.emergency_call',val: '紧急联系人'},
          { key: 'staff.household_register',val: '户口性质',info: {0: '农村',1: '城市'}},
          { key: 'staff.national',val: '民族'},
          { key: 'staff.marital_fertility_status',val: '婚育情况',info: {1: '未婚', 2: '已婚未育',3: '已婚已育'}},
          { key: 'staff.education',val: '学历',info: {1: '高中及以下',2: '大专',3: '本科', 4: '本科及以上', 5: '其他'}},
          { key: 'staff.school',val: '毕业院校'},
          { key: 'staff.graduation_time',val: '毕业时间'},
          { key: 'staff.major',val: '专业'},
          { key: 'staff.position_level',val: '职级',info: {1: 'P1',2: ' P2',3: 'P3',4: 'P4',5: 'P5',6: 'P6', 7: 'P7'}},
          { key: 'staff.dismiss_time',val: '离职时间'},
          // { key: 'staff.dismiss_reason.dismiss_type',val: '离职类型',info: {1: '主动离职',2: '旷工离职',3: '劝退',4: '开除',5: '其他'}},
          // { key: 'staff.dismiss_reason.dismiss_mess',val: '离职原因'},
          { key: 'staff.bank_num',val: '银行卡号'},
          { key: 'staff.account_name',val: '户主'},
          { key: 'staff.account_bank',val: '开户行'},
          { key: 'staff.commitment_number',val: '入职承诺书',isBtn: true},
          { key: 'staff.employ_proof_number',val: '在职证明',isBtn: true},
          { key: 'staff.income_proof_number',val: '收入证明',isBtn: true},
          { key: 'staff.notice_number',val: '入职须知',isBtn: true},
          { key: 'staff.secret_number',val: '保密协议编号',isBtn: true},
          { key: 'staff.insurance_prohibit_number',val: '大学生无法缴纳社保知晓书',isBtn: true},
        ],
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
        },
        filesVisible: false,

        //员工详情
        staff_detail_info: '',
      }
    },
    mounted() {
      this.getStaffList();
      this.handleSetData();
    },
    activated() {
    },
    watch: {
      exportData: {
        handler(val) {
          this.export_params.field = [];
          this.export_params.field = ['id'];
          this.table_column = val;
          val.map(item => {
            this.export_params.field.push(item.key);
          });
        },
        deep: true
      },
      exportInfo(val) {
        console.log(val);
        this.export_params.export = 1;
        this.export_params = Object.assign({},this.export_params,this.params);
        this.exportStaffList();
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
      //设置导出数据
      handleSetData() {
        this.export_params.field = ['id'];
        this.table_column.map(item => {
          this.export_params.field.push(item.key);
        });
      },
      //列表按钮
      handleLookInfo(row,key) {
        console.log(row,key);
        if (!row.staff || !row.staff[key.split('.')[1]]) {
          this.$LjNotify('warning',{
            title: '提示',
            message: '暂无该信息'
          });
          return false;
        }
        window.open(globalConfig.server + `staff/e_contract/show/${row.staff[key.split('.')[1]]}`);
      },
      exportStaffList() {
        this.$http.get('staff/user/record',this.export_params,'arraybuffer').then(res => {
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
          this.export_params.field = [];
          this.export_params.export = 0;
        });
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
