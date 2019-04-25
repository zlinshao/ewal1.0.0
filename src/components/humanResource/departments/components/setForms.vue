<template>
  <div id="setForms">
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>设置表单</h3>
        </div>
        <div class="dialog_main">
          <div class="tHeader">
            <p v-for="(item,index) in showData" class="flex" :key="index">
              <b>{{ item.val }}</b>
              <span class="flex-center">
                <i class="el-icon-arrow-up" @click="handleClickMoveUp(item,index)" v-if="index !== 0"></i>
                <i class="el-icon-arrow-down" @click="handleClickMoveDown(item,index)" v-if="index !== showData.length - 1"></i>
                <i class="el-icon-delete" @click="handleClickRemove(item,index)"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="footerBtn">
          <el-button type="danger" size="small" @click="handleSubmitForm">确认</el-button>
          <el-button type="info" size="small" @click="handleClickCancel">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue'

  export default {
    name: "set-forms",
    props: ['module', 'data'],
    components: {ljDialog},
    data() {
      return {
        depart_visible: false,
        showData: {},
        lj_size: '',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      data(val) {
        this.showData = val;
      },
      module(val) {
        this.depart_visible = val;
        this.lj_size = {width: 600 + 'px',height: 800 + 'px'};
      },
      depart_visible(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      }
    },
    computed: {},
    methods: {
      handleClickMoveUp(item,index) {
        this.showData[index] = this.showData.splice(index - 1,1,this.showData[index])[0];
      },
      handleClickMoveDown(item,index) {
        this.showData[index] = this.showData.splice(index + 1,1,this.showData[index])[0];
      },
      handleClickRemove(item,index) {
        this.$emit('remove',item,index);
      },
      handleSubmitForm() {
        this.$emit('submit');
        this.$emit('close');
      },
      handleClickCancel() {
        this.depart_visible = false;
        this.$emit('close');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/components/setForms.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/setForms/' + $n + '/' + $m;
    @include bgImage($url);
  }
</style>
