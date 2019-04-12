<template>
  <div id="my_KPI">
    <div class="my-kpi-container">
      <div class="my-kpi-toolbar">
        <div v-for="item in toolbarList" @click="switchToolbar(item.id)" :class="{checked:toolbarChoosed==item.id}"
             class="my-kpi-toolbar-item">{{item.name}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "myKPI",
    data() {
      return {
        url: globalConfig.humanResource_server,

        toolbarChoosed: 1,
        toolbarList: [
          {
            id: 1,
            name: '周度考核'
          },
          {
            id: 2,
            name: '月度考核'
          },
          {
            id: 3,
            name: '季度考核'
          },
          {
            id: 4,
            name: '半年度考核'
          },
          {
            id: 5,
            name: '年度考核'
          },
        ],
      }
    },
    methods: {
      switchToolbar(index) {
        this.toolbarChoosed = index;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myKPI/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #my_KPI {
      .my-kpi-container {
        .my-kpi-toolbar {
          .my-kpi-toolbar-item {
            @include personalCenterImg('toolbar_gray.png', 'theme1');
            &.checked {
              @include personalCenterImg('toolbar_red.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #my_KPI {

    }
  }

  #theme_name.theme3 {
    #my_KPI {

    }
  }

  #theme_name.theme4 {
    #my_KPI {

    }
  }
</style>
