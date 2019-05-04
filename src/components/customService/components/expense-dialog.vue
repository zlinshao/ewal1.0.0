<template>
  <ljDialog :visible='visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseExpense'>
    <div class="dialog_container" id='record_dialog'>
      <div class="dialog_header">
        <h3>报销记录</h3>
      </div>
      <div class='dialog_main'>
        <el-table :data="table" height="480px" highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
          <el-table-column key="创建时间" align="center" prop="create_time" label="应付时间"></el-table-column>
          <el-table-column key="结算时间" align="center" prop="pay_date" label="结算时间"></el-table-column>
          <el-table-column key="报销金额" align="center" prop="amount_paid" label="	实付金额"></el-table-column>
          <el-table-column key="实付金额" align="center" prop="amount_payable" label="报销金额">
            <!-- <template slot-scope="scope">
              <span>{{scope.row.amount_payable}}</span>
              <el-tooltip class="item" effect="light" :content="scope.row.amount_payable" placement="right" popper-class='light_tooltip'>
                <i class='warn_icon'></i>
              </el-tooltip>
            </template> -->
          </el-table-column>
        </el-table>

        <!-- <el-pagination @current-change="handleExpenseCurrentPage" :current-page="page" layout="total,  prev, pager, next, jumper"
          :total="tableCount">
        </el-pagination> -->
      </div>
    </div>
  </ljDialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog
  },
  data () {
    return {
      table: [],
      tableCount: 0,
      page: 1,
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    handkeCloseExpense () {
      this.$emit('close', true)
    },
    getData () {
      let parmas = {
        contract_type: this.moduleData.contract_type,
        contract_id: this.moduleData.contract_id,
      }
      this.$http.get(`${this.market_server}v1.0/csd/work_order/reimburRecord`, parmas).then(res => {
        if (res.code === 200) {
          this.table = res.data.reimbur_data
          // this.tableCount = res.data.all_count
        }
      })
    },
    handleExpenseCurrentPage (val) {
      this.page = Val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/customService/components/record_dialog.scss";
</style>
