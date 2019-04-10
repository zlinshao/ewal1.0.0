<template>
  <div class="demo-container">
    <!--<lj-comment width="900"></lj-comment>-->
    <div class="demo">
      <div class="icon40 icon-demo"></div>
    </div>
  </div>

</template>

<script>
  import LjComment from '@/components/common/lightweightComponents/LjComment.vue';
  export default {
    name: "index",
    components: {
      LjComment,
    },
  }
</script>

<style scoped lang="scss">
  //@import "";

  .demo {
    width: 400px;
    height: 400px;
  }
</style>
