<template>
  <div class="aaaaaa">
    <div class="topLevel">
      <!--<img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg" style="width: 60px;height: 60px;border-radius: 50%;">-->
      <p>{{item.name}}</p>
    </div>
    <div v-if="isFolder" class="cccccc" style="padding-left: 50px;">
      <tree-item
        class="dddddd"
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
  div {
    text-align: center;
  }
</style>
