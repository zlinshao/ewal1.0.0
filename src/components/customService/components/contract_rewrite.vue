<template>
  <lj-dialog :visible="rewrite_visible" :size="{width: 400 + 'px',height: 300 + 'px'}" @close="handleCancelRewrite">
    <div class="dialog_container">
      <div class="dialog_header">
        <h3>作废重签</h3>
      </div>
      <div class="dialog_main">
        <el-form label-width="80px">
          <el-form-item label="备注">
            <el-input v-model="rewrite_note" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog_footer">
        <el-button type="danger" size="mini" @click="handleSubmitRewrite">确定</el-button>
        <el-button type="info" size="mini" @click="handleCancelRewrite">取消</el-button>
      </div>
    </div>
  </lj-dialog>

</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  name: 'index',
  components: { LjDialog },
  props: ['rewrite_visible', 'contractDetail'],
  data () {
    return {
      rewrite_note: ''
    }
  },
  methods: {
    handleSubmitRewrite () {
      this.$http.post(this.market_server + `v1.0/market/contract/e-contract-resign/${this.contractDetail.contract_number}`, {
        note: this.rewrite_note
      }).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelRewrite();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
    },
    handleCancelRewrite () {
      this.rewrite_note = '';
      this.$emit('closeRewrite', false)
    },
  }
}
</script>
