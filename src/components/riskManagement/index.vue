<template>
  <div id="riskManagement">
    <coming-soon></coming-soon>
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <h1>风险控制</h1>
        </div>
      </div>
      <div class="mainList" :style="{'height': this.mainListHeight() + 'px'}">
        <div class="menu-list">
          <div v-for="(item,index) in riskData" @click="routerLink(item.url,{pre_id:item.id,pre_name:item.name,pre_data:riskData},item.name)"
            class="flex-center childrenMenu">
            <span class="writingMode">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      params: {//查询参数
        search: '',
        offset: 1,
        limit: 3,
      },
      riskData: [],
    }
  },
  mounted () {
    this.getDataList();
  },
  methods: {
    getDataList () {//一级目录
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: 0 }).then(res => {
        if (res.status === 200) {
          this.riskData = res.data.data;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/riskManagement/index.scss";

@mixin riskManagementImg($m, $n) {
  $url: "../../assets/image/riskManagement/" + $n + "/" + $m;
  @include bgImage($url);
}
#theme_name.theme1 {
  #riskManagement {
    > div {
      .mainList {
        @include riskManagementImg("di_1.png", "theme1");
        .menu-list {
          .flex-center {
            flex-direction: column;
          }
          div {
            @include riskManagementImg("fxkz_0.png", "theme1");
            &:hover {
              @include riskManagementImg("fxkz_1.png", "theme1");
              span {
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
