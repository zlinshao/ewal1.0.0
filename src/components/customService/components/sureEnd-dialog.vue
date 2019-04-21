<template>
  <LjDialog :visible="visible" :size="{width: 480 + 'px',height: 320 + 'px'}" @close="handleCloseSure(false)">
    <div class="dialog_container" id='end_dialog'>
      <div class="dialog_main">
        <h3>确定结束吗?</h3>
        <el-checkbox v-model='isCreated'>
          公司员工({{moduleData.payer || '/'}}-{{moduleData.payer_org_name ||'/'}})已支付维修费用,结束后系统进入报销流程
        </el-checkbox>
      </div>
      <div class="dialog_footer">
        <el-button type="danger" size="small" @click="handleCloseSure(true)">确定</el-button>
        <el-button type="info" size="small" @click="handleCloseSure(false)">取消</el-button>
      </div>
    </div>
  </LjDialog>
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
      isCreated: false
    }
  },
  methods: {
    handleCloseSure (value) {
      this.$emit('close', {
        isCreated: this.isCreated,
        isSure: value
      })
      this.isCreated = false
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";

#theme_name {
  #end_dialog {
    .dialog_main {
      @include flex("items-column");
      h3 {
        text-align: center;
        font-size: 20px;
        color: #686874;
        margin-bottom: 30px;
      }
      .el-checkbox {
        width: 280px;
        @include flex("items-start");
        .el-checkbox__label {
          white-space: normal;
        }
      }
    }
    .dialog_footer {
      margin-top: 30px;
    }
  }
}

#theme_name.theme1 {
}

#theme_name.theme2 {
}

#theme_name.theme3 {
}

#theme_name.theme4 {
}
</style>
