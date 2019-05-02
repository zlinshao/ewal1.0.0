<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseTranfer(false)">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>转交</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal" v-if='moduleData'>
          <el-form label-width="80px">
            <el-form-item label="转交给">
              <el-input @focus="organSearch" readonly v-model="transfer.personName" placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="transfer.note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseTranfer(true)">确定</el-button>
        </div>
      </div>
    </LjDialog>
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import StaffOrgan from '../../common/staffOrgan.vue'
export default {
  components: { LjDialog, StaffOrgan },
  props: ['visible', 'moduleData'],
  data () {
    return {
      transfer: {
        personName: '',
        person: "",
        note: ""
      },
      staffModule: false, // 选择人员
      organData: {
        type: '',
        num: 1
      },
      market_server: globalConfig.market_server,
    }
  },
  methods: {
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        this.transfer.personName = names
        this.transfer.person = ids
      }
    },
    organSearch () {
      this.staffModule = true;
    },
    handleCloseTranfer (isTrue) {
      if (!this.transfer.personName) {
        this.$LjNotify('success', {
          title: '提示',
          message: '未选择转交人'
        });
        return
      }
      if (isTrue) {
        let option = {
          work_order_id: this.moduleData.id,
          operate_user_id: this.transfer.person[0],
          operate_user_name: this.transfer.personName,
          content: this.transfer.note
        }

        this.$http.post(`${this.market_server}v1.0/csd/work_order/tranfer`, option).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });

          if (res.code === 200) {
            this.$emit('close', false)
          }
        })
      } else {
        this.$emit('close', true)
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";
</style>