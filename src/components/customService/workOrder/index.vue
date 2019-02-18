<template>
  <div id="workOrder">
    <div class="items-bet">
      <div class="items-center orderTopLeft">
        <p class="flex-center" @click="customModule">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeList(item.id)" class="items-column"
                :class="{'chooseList': chooseList === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center orderTopRight">
        <p class="flex-center"><b>+</b></p>
        <p @click="highSearch"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        chooseList: 1,
        selects: [
          {
            id: 1,
            title: '待处理',
          },
          {
            id: 2,
            title: '跟进中',
          },
          {
            id: 3,
            title: '已完成',
          }
        ]
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // tab切换
      changeList(id) {
        this.chooseList = id;
      },
      // 高级搜索
      highSearch() {

      },
      // 客服入口
      customModule() {

      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/customService/workOrder/index.scss";

  @mixin workOrderImg($m, $n) {
    $url: '../../../assets/image/customService/workOrder/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #workOrder {
      > div {
        .orderTopRight {
          p:last-of-type {
            @include bgImage('../../../assets/image/customService/theme1/search.png');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #workOrder {

    }
  }

  #theme_name.theme3 {
    #workOrder {

    }
  }

  #theme_name.theme4 {
    #workOrder {

    }
  }
</style>
