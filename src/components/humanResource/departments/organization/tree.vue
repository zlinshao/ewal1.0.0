<template>
  <div class="aaaaaa">
    <div class="topLevel">
      <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg" style="width: 60px;height: 60px;border-radius: 50%;">-->
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
