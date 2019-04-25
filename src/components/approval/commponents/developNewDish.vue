<template>
  <div id='developNew'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_header'>
        <h3>house_name</h3>
      </div>
      <div class="dialog_main"></div>
      <div class="dialog_footer">
        <el-button type="info" size="small">修改</el-button>
        <el-button type="info" size="small">拒绝</el-button>
        <el-button type="danger" size="small">同意</el-button>
      </div>
    </LjDialog>
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible'],
  components: {
    LjDialog
  },
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.$emit('close', false)
    }
  }
}
</script>

