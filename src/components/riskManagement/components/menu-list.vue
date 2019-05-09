<template>
  <div id="risk-menu-list" class="menu_container mainList" :class="{'show_container' : visible}">
    <div class="menu_list flex-center">
      <div class="menu_contain" v-for="(item,index) in riskData" :key="index">
        <span class="writingMode" :key="index" @click="routerLink(item.url,{pre_id:item.id,pre_name:item.name,pre_data:riskData},item.name)">{{
          item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menulist",
  props: ['visible'],
  data () {
    return {
      riskData: [],
      navVisible: false
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
          console.log(this.riskData)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/customService/components/menu_list.scss";

@mixin riskManagementImg($m, $n) {
  $url: "../../../assets/image/riskManagement/" + $n + "/" + $m;
  @include bgImage($url);
}
#theme_name.theme1 {
  #risk-menu-list {
    > div {
      .mainList {
        @include riskManagementImg("di_1.png", "theme1");
        .menu-list {
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