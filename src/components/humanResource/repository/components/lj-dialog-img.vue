<template>
  <div id="lj-dialog-img" class="lj-dialog-img" v-if="dialog_visible">
    <div class="flex-center" @click.self="handleCloseDialog">
      <div class="lj-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['value'],
    watch: {
      value(val) {
        this.dialog_visible = this.value;
      }
    },
    data() {
      return {
        dialog_visible: false,
      }
    },
    methods: {
      handleCloseDialog() {
        this.dialog_visible = false;
        this.$emit('input',this.dialog_visible);
      }
    },

  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/repository/components/lj-dialog-img.scss";
  /*@import "../../../../assets/scss/humanResource/repository/components/lj-dialog-img.scss";*/
</style>
