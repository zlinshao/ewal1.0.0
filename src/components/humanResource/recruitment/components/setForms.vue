<template>
  <div id="setForms">
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>设置表单</h3>
        </div>
        <div class="dialog_main">
          <div class="tHeader">
            <p v-for="item in Object.keys(showData)">
              <i class="el-icon-remove"></i>
              <b>{{showData[item]}}</b>
            </p>
            <p><i class="el-icon-circle-plus"></i></p>
          </div>
          <div class="flex tBody">
            <div>幅度萨芬萨</div>
            <div>放大撒发生打</div>
          </div>
        </div>
        <div class="footerBtn">
          <el-button type="danger" size="small">确认</el-button>
          <el-button type="info" size="small">取消</el-button>
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
        this.lj_size = 'large';
      },
      depart_visible(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      }
    },
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/recruitment/components/setForms.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/recruitment/setForms/' + $n + '/' + $m;
    @include bgImage($url);
  }
</style>
