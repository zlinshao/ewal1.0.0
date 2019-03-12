<template>
  <div>
    <div class="topLevel">
      {{item.name}}
    </div>
    <div v-if="isFolder">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child">
      </tree-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tree-item",
    props: {item: Object},
    data() {
      return {
        isOpen: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      isFolder() {
        return this.item.children && this.item.children.length;
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>

</style>
