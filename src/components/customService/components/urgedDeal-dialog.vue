<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal">
          <el-form label-width="80px">
            <el-form-item label="发送对象">
              <el-input @focus="handlerOrgan" readonly v-model="post_name" :placeholder="moduleData.default_Person"></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="post_note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleUrgedDeal">确定</el-button>
          <el-button id='active-info' size="small" @click="handleCloseUrgedDeal">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hidden" />
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import StaffOrgan from '../../common/staffOrgan.vue'
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog,
    StaffOrgan
  },
  data () {
    return {
      post_name: '',
      post_id: '',
      post_note: '',
      staffModule: false, // 选择人员
      organData: {
        num: 1
      },
      market_server: globalConfig.market_server,
    }
  },
  created () {
    this.post_name = this.moduleData.default_Person
  },
  methods: {
    handlerOrgan () {
      this.staffModule = true
    },
    hidden (ids, names, arr) {
      this.post_name = names
      this.post_id = ids
      this.staffModule = false
    },
    handleUrgedDeal () {
      let option = {
        work_order_id: this.moduleData.id,
        user: this.post_name,
        content: this.post_note
      }
      this.$http.post(`${this.market_server}v1.0/csd/work_order/notice`, option).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
        }
      })
    },
    handleCloseUrgedDeal () {
      this.$emit('close', false)
      this.post_name = ''
      this.post_id = ''
      this.post_note = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/customService/components/record_dialog.scss";
</style>
