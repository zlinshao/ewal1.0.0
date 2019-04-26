<template>
  <ljDialog :visible='visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseWithout'>
    <div class="dialog_container" id='record_dialog'>
      <div class="dialog_header">
        <h3>退租记录</h3>
      </div>
      <div class='dialog_main'>
        <el-table :data="table" height="480px" highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
          <el-table-column key="退租时间" align="center" prop="end_at" label="退租时间"></el-table-column>
          <el-table-column key="退房时间" align="center" prop="check_time" label="退房时间"></el-table-column>
          <el-table-column key="退款金额" align="center" label="退款金额">
            <template slot-scope="scope">
              <span>{{scope.row.should_be_returned_fees}}</span>
              <el-tooltip class="item" effect="light" :content="scope.row.checkout_goods_remark" placement="right"
                popper-class='light_tooltip'>
                <i class='warn_icon'></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination @current-change="handleWithoutCurrentPage" :current-page="page" layout="total,  prev, pager, next, jumper"
          :total="dataCount">
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
      dataCount: 0,
      table: [],
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
    handkeCloseWithout () {
      this.$emit('close', true)
    },
    handleWithoutCurrentPage (val) {
      this.page = val
    },
    getData () {
      this.$http.get(`${this.market_server}v1.0/market/checkOut?collect_or_rent=${this.moduleData.contract_type}&contract_id=${this.moduleData.contract_id }`).then(res => {
        if (res.code === 200) {
       
          if(res.data.length > 0) this.table = res.data
        }
      })
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
