<template>
  <div id="visitToRecord">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center">
          <b>...</b>
        </p>
        <h1>回访记录</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="buttons button1">待回访</div>
        <div class="buttons button4">二次回访</div>
        <div class="buttons button4">多次回访</div>
        <div class="buttons button3">已完成</div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      chooseTab: 1,
      selects: [
        {
          id: 1,
          title: '收房',
        },
        {
          id: 2,
          title: '租房',
        }
      ],
      showSearch: false
    }
  },
  methods: {
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
      }
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      //this.searchData = workOrderSearch;
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/visitToRecord/index.scss";
</style>
