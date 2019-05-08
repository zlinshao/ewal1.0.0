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
        :default-sort="{prop: 'staff.enroll',order: 'descending'}"
        style="width: 100%">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="岗位" prop="position" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.position && scope.row.position.length > 0">
              <span v-for="(item,idx) in scope.row.position">{{ item.name }}<a v-if="idx !== scope.row.position.length - 1">;</a></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入职时间" prop="staff.enroll" align="center" sortable></el-table-column>
        <el-table-column label="离职时间" prop="staff.dismiss_time" align="center"></el-table-column>
        <el-table-column label="离职操作时间" prop="staff.is_on_job" align="center"></el-table-column>
        <el-table-column label="禁用操作时间" prop="staff.is_enable" align="center"></el-table-column>
        <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
        <el-table-column label="离职类型" prop="staff.dismiss_reason.dismiss_type" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.staff && scope.row.staff.dismiss_reason && scope.row.staff.dismiss_reason.dismiss_type === 1 ? '主动离职' : scope.row.staff.dismiss_reason.dismiss_type === 2 ? '旷工离职' : scope.row.staff.dismiss_reason.dismiss_type === 3 ? '劝退' :'开除' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离职备注" prop="staff.dismiss_reason.dismiss_mess" align="center" min-width="200px"></el-table-column>
        <el-table-column label="离职交接单" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLookResignation(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职短信" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.staff && scope.row.staff.send_info && scope.row.staff.send_info.forward_group === 1">已发送</span>
            <el-button type="text" @click="handleControlMsg(scope.row,'sms')" style="color: #D33E43" v-else>发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职群消息" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.staff && scope.row.staff.send_info && scope.row.staff.send_info.forward_group === 1">已发送</span>
            <el-button type="text" @click="handleControlMsg(scope.row,'announcement')" style="color: #D33E43" v-else>发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职证明" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLeaveProof(scope.row)" v-if="scope.row.staff && scope.row.staff.leave_proof_number">查看</el-button>
            <el-button type="text" @click="handleLeaveProof(scope.row)" style="color: #D33E43" v-else>发送</el-button>
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

      <!--确定发送-->
      <lj-dialog
        :visible="confirm_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="confirm_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定发送吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmSend">确定</el-button>
            <el-button type="info" size="small" @click="confirm_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  export default {
    name: "index",
    components: { LjDialog },
    props: ['searchVal'],
    data() {
      return {
        confirm_visible: false,
        confirm_type: '',
        confirm_row: '',

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
        },

        look_info: [],
        look_info_visible: false,
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      searchVal: {
        handler(val) {
          this.params = Object.assign({},this.params,val);
          this.getStaffList();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      handleConfirmSend() {
        const row = this.confirm_row;
        const where = this.confirm_type;
        var type = where === 'sms' ? ['dimission_sms'] : ['dimission_group'];
        if (row.staff && row.staff.send_info && row.staff.send_info.forward_group === 1) {
          return false;
        } else {
          this.$http.get(`staff/user/${row.id}/sendinfo`,{
            type
          }).then(res => {
            if (res.code === '20000') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.confirm_visible = false;
              this.getStaffList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      handleLeaveProof(row) {
        if (row.staff && row.staff.leave_proof_number) {
          window.open(globalConfig.server + `staff/e_contract/show/${row.staff.leave_proof_number}`);
        } else {
          this.$http.get(`staff/user/${row.id}/sendinfo`,{
            type: ['leave_proof_send']
          }).then(res => {
            if (res.code === '20000') {
              this.$LjNotify('dimission_sms',{
                title: '成功',
                message: res.msg
              });
              this.getStaffList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      //离职短信
      handleControlMsg(row,where) {
        if (row.staff && row.staff.send_info && row.staff.send_info.forward_group === 1) {
          this.$LjMessage('success',{
            title: '提示',
            msg: '已发送'
          });
          return false;
        } else {
          this.confirm_row = row;
          this.confirm_type = where;
          this.confirm_visible = true;
        }
      },
      handleCloseLookInfo() {
        this.look_info = [];
        this.look_info_visible = false;
      },
      handleLookResignation(row) {
        console.log(row);
      },
      getStaffList() {
        this.$http.get('staff/user', this.params).then(res => {
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
