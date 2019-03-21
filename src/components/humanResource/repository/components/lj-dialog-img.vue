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
    props: ['visible'],
    watch: {
      visible(val) {
        this.dialog_visible = this.visible;
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
        this.$emit('update:visible',this.dialog_visible);
      }
    },

  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/repository/components/lj-dialog-img.scss";
</style>
