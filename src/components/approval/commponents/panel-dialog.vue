<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 600 + 'px',height: 600 + 'px'}" @close="handleClose" id='invalid_dailog'>
      <div class='dialog_container'>
        <div class='dialog_header'>
          <div class='cell_header_left' v-if='current_type == 1'>
            <i class='icons icons_per'></i>
            <span>哈哈哈</span>
          </div>
        </div>
        <div class="dialog_main" v-if='visible'>

        </div>
        <div class="dialog_footer">

        </div>
      </div>
    </LjDialog>
  </div>
</template>


<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible', 'moduleData'],
  data () {
    return {
      current_type: 1, //组员 片区
    }
  },
  watch: {
    moduleData: {
      handler (val) {

      },
      deeper: true
    }
  },
  methods: {
    handleClose () { }
  }
}
</script>
