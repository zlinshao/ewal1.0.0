<template>
  <ljDialog :visible='visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseFinancial'>
    <div class="dialog_container" id='record_dialog'>
      <div class="dialog_header">
        <h3>财务记录</h3>
      </div>
      <div class='dialog_main'>
        <el-table :data="table" height="480px" highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
          <el-table-column key="应付时间" align="center" prop="time" label="应付时间"></el-table-column>
          <el-table-column key="实付时间" align="center" prop="real_time" label="实付时间"></el-table-column>
          <el-table-column key="应付金额" align="center" prop="money" label="应付金额"></el-table-column>
          <el-table-column key="实付金额" align="center" label="实付金额">
            <template slot-scope="scope">
              <span>{{scope.row.real_money}}</span>
              <el-tooltip class="item" effect="light" :content="scope.row.real_money" placement="right">
                <i class='warn_icon'></i>
              </el-tooltip>
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
      // this.$http.get(`${this.market_server}v1.0/csd/revisit/${this.moduleData.contract_type}/${this.moduleData.contract_id}`).then(res => {
      //   if (res.code === 200) {
      //     this.table = res.data.data
      //     this.tableCount = res.data.all_count
      //   }
      // })
    },
    handleFinancialCurrentPage (val) {
      this.page = Val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/customService/components/record_dialog.scss";
</style>

