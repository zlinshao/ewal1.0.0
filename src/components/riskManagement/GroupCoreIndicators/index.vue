<template>
  <div id="GroupCoreIndicators">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click='moduleList'>
            <b>...</b>
          </p>
          <!-- <h1>{{this.$route.query.pre_name}}</h1> -->
          <h1>{{this.$route.query.classify_first_name}}</h1>
        </div>
      </div>
      <div class="mainList" :style="{'height': this.mainListHeight() + 'px'}">
        <div class="menu-list">
          <!-- <div v-for="(item,index) in childrenRiskData" @click="routerLink('riskManagementMenu',{pre_id:item.id,pre_name:item.name,pre_data:childrenRiskData,pre_index:index+1})" class="flex-center childrenMenu" :key="item.id"> -->
          <div v-for="(item,index) in childrenRiskData" @click="routerLink('riskManagementMenu',{classify_first_id:$route.query.classify_first_id,classify_first_name:$route.query.classify_first_name,classify_second_id:item.id,classify_second_name:item.name,classify_second_index:index})" class="flex-center childrenMenu" :key="item.id">
            <span class="writingMode">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <MenuList :visible='navVisible' @close='handleClose' />
  </div>
</template>

<script>
import MenuList from '../common/menu'
export default {
  name: "index",
  components: {
    MenuList
  },
  data () {
    return {
      childrenRiskData: [],
      navVisible: false,
    }
  },
  mounted () {
    this.getDataList();
  },
  methods: {
    // 入口
    moduleList () {
      this.navVisible = !this.navVisible;
      this.$store.dispatch('route_animation');
    },
    handleClose () {
      this.navVisible = false
    },
    getDataList () {
      // 获取二级目录
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: this.$route.query.classify_first_id }).then(res => {
        if (res.status === 200) {
          console.log("二级目录:",res.data)
          this.childrenRiskData = res.data.data;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

@mixin riskManagementImg($m, $n) {
  $url: "../../../assets/image/riskManagement/" + $n + "/" + $m;
  @include bgImage($url);
}
#theme_name.theme1 {
  #GroupCoreIndicators {
    > div {
      .mainList {
        @include riskManagementImg("di_2.png", "theme1");
        .menu-list {
          .flex-center {
            flex-direction: column;
          }
          div {
            @include riskManagementImg("hgfx_0.png", "theme1");
            &:hover {
              @include riskManagementImg("hgfx_1.png", "theme1");
              span {
                color: #b9292d;
              }
            }
          }
        }
      }
    }
  }
}
</style>