<template>
  <div id="lj_white_dialog" @click.self.stop="handleCloseDialog" ref="dialog_ref" v-if="dialog_visible">
    <div class="flex-center dialog-container" ref="dialog_container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LjWhiteDialog",
    props: {
      visible: {},
    },
    data() {
      return {
        dialog_visible: false,
      }
    },
    watch: {
      visible: {
        handler(val, oldVal) {
          this.dialog_visible = val;
          this.$store.dispatch('add_dialog_z_index');
          this.$nextTick(() => {
            if (this.$refs.dialog_ref) {
              this.$refs.dialog_ref.style.zIndex = this.dialogZIndex;
              this.$refs.dialog_container.style.zIndex = this.dialogZIndex + 1;
            }
          })
        },
        immediate: true,
      },
    },
    computed: {
      dialogZIndex() {
        return this.$store.state.app.dialogZIndex;
      },
    },
    methods: {
      handleCloseDialog() {
        this.dialog_visible = false;
        this.$emit('update:visible', this.dialog_visible);
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/LjWhiteDialog";

  #theme_name.theme1 {
    #lj_white_dialog {
      color: #000000;
    }
  }
</style>
