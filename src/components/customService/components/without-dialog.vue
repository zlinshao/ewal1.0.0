<template>
  <ljDialog :visible='visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseWithout'>
    <div class="dialog_container" id='record_dialog'>
      <div class="dialog_header">
        <h3>退租记录</h3>
      </div>
      <div class='dialog_main'>
        <el-table :data="table" height="480px" highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
          <el-table-column key="退租时间" align="center" prop="time" label="退租时间"></el-table-column>
          <el-table-column key="退房时间" align="center" prop="real_time" label="退租时间"></el-table-column>
          <el-table-column key="退款金额" align="center" label="退租时间">
            <template slot-scope="scope">
              <span>{{scope.row.real_money}}</span>
              <el-tooltip class="item" effect="light" :content="scope.row.real_money" placement="right">
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
      page: 1
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
      // this.$http.get(`${this.market_server}v1.0/csd/revisit/${this.chosenCustomer.contract_type}/${this.chosenCustomer.contract_id}`).then(res => {
      //         if (res.code === 200) {
      //           this.table = res.data.data
      //           this.dataCount = res.data.all_count
      //         }
      //       })
      //     }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/customService/components/record_dialog.scss";
</style>
