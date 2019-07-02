<template>
  <ljDialog :visible='visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseFinancial'>
    <div class="dialog_container" id='record_dialog'>
      <div class="dialog_header">
        <h3>财务记录</h3>
      </div>
      <div class='dialog_main'>
        <el-table :data="table" height="480px" highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
          <el-table-column align="center" prop="pay_date" label="应付时间"></el-table-column>
          <el-table-column align="center" prop="complete_date" label="实付时间"></el-table-column>
          <el-table-column align="center" :label="moduleData.contract_type == 1 ?'应付金额':'应收金额'">
             <template slot-scope="scope">
              <span>{{moduleData.contract_type == 1 ? scope.row.amount_payable : scope.row.amount_receivable }}</span>
              </template>
            </el-table-column>

          <el-table-column align="center" :label="moduleData.contract_type == 1 ?'实付金额':'实收金额'">
            <template slot-scope="scope">
              <span>{{moduleData.contract_type == 1 ? scope.row.amount_paid : scope.row.amount_received }}</span>
              <!-- <el-tooltip class="item" effect="light" :content="formateContent(scope.row.remark)" placement="right" popper-class='light_tooltip'>
                <i class='warn_icon'></i>
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleFinancialCurrentPage" :current-page="page" layout="total,  prev, pager, next, jumper"
          :total="tableCount" v-if='tableCount > 0'>
        </el-pagination>
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
    handkeCloseFinancial () {
      this.$emit('close', true)
    },
    getData () {
      let param = {
        contract_id: this.moduleData.contract_id,
        contract_type: this.moduleData.contract_type,
        page: this.page,
        limit:10,
      }
      this.$http.get(`${this.market_server}/v1.0/csd/work_order/financeRunning`, param).then(res => {
        if (res.code === 200) {
          // let running = res.data.data;
          this.table = res.data.data
          this.tableCount = res.data.count

        }
      })
    },
    handleFinancialCurrentPage (val) {
      this.page = val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/customService/components/record_dialog.scss";
</style>
<style lang="scss">
div.light_tooltip.el-tooltip__popper {
  background: #fff !important;
  color: #333;
}
</style>

