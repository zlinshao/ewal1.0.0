<template>
  <div id="marketRisk">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click='moduleList'>
            <b>...</b>
          </p>
          <!-- <h1>{{this.$route.query.pre_name}}</h1> -->
          <h1>{{classify_second_data[chooseTab].name}}</h1>
          <h2 class="items-center">
            <span v-for="(item,index) in classify_second_data" @click="changeTabs(index,item.id)" class="items-column" :class="{'chooseTab': chooseTab === index}" :key="item.id">
              {{item.name}}<i></i>
            </span>
          </h2>
        </div>
      </div>
      <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
        <div>
          <div class="marketRisk-list" v-if='classify_third_data.length > 0'>
            <div class="marketRisk-list-info flex-center" v-for="(item,index) in classify_third_data" :key="index">
              <!-- <div class="marketRisk-box flex-center" @click="routerLink('riskManagementDetail',{pre_name:item.name,pre_id:item.id,pre_data:gradeChildrenData})"> -->
              <div class="marketRisk-box flex-center" @click="jumpNewWindow(item)">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <p class='nothing_mess' v-else style='width:100%;text-align:center;font-size:14px;color:#999;line-height:100px;'>暂无数据</p>
        </div>
      </div>
    </div>

    <MenuList :visible='navVisible' @close='handleClose' />
  </div>
</template>

<script>
// import { riskManagement } from '../../../assets/js/allModuleList.js';
import MenuList from '../common/menu'

export default {
  name: "index",
  components: { MenuList },
  data () {
    return {
      // riskManagement,
      navVisible: false,
      chooseTab: parseInt(this.$route.query.classify_second_index),
      // 当前的二级数据id
      classify_second_id_current:this.$route.query.classify_second_id,
      // 二级分类列表
      classify_second_data:[{}],
      // 三级数据列表
      classify_third_data:[{}]
    }
  },
  mounted () {
    // this.selects = this.$route.query.pre_data;
    // this.chooseTab = this.$route.query.pre_index;//切换tab
    // this.parent_id = this.$route.query.pre_id;
    // 获取当前的二级id
    this.getDataList_second();
    this.getDataList_third();
  },
  watch: {
    $route: function (newRoute, oldRoute) {
        // this.chooseTab = this.$route.query.pre_index;//切换tab
        // this.selects = this.$route.query.pre_data;
        // this.parent_id = this.$route.query.pre_id;
        // if (oldVal.path === '/riskManagementDetail') {
        // }
        // this.classify_second_id_current:
        // 如果是在三级页面
        if(newRoute.path==="/riskManagementMenu"){
          this.classify_second_id_current=newRoute.query.classify_second_id;
          this.chooseTab=newRoute.query.classify_second_index;
          this.getDataList_second();
          this.getDataList_third();
        }
      },
  },
  methods: {
    moduleList () {
      this.navVisible = !this.navVisible;
      this.$store.dispatch('route_animation');
    },
    handleClose () {
      this.navVisible = false
    },
    changeTabs (index,classify_second_id) {
      this.chooseTab = index;
      // 改当前激活的classify_second_id
      // 重新获取数据
      this.classify_second_id_current = classify_second_id;
      this.getDataList_third();
    },
    // 获取二级分类
    getDataList_second () {
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: this.$route.query.classify_first_id }).then(res => {
        if (res.status === 200) {
          // console.log("二级：",res.data.data);
          this.classify_second_data=res.data.data;
        }
      })
    },
    // 获取三级具体数据
    getDataList_third () {
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id:this.classify_second_id_current}).then(res => {
        if (res.status === 200) {
          // console.log("三级：",res.data.data);
          this.classify_third_data = res.data.data;
        }
      })
    },
    // compareID(classify_second_data){
    //   let num=parseInt(this.classify_second_id_current);
    //   return classify_second_data.filter(item=>{
    //     return item.id===num
    //   })
    // }
    jumpNewWindow (item) {
      const { href } = this.$router.resolve({
        path: 'riskManagementDetail',
        // query: { pre_name: item.name, pre_id: item.id, pre_data: this.gradeChildrenData }
        query: { pre_name: item.name, pre_id: item.id }
      })
      window.open(href, '_blank')
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

@mixin riskManagementImg($m, $n) {
  $url: "../../../assets/image/riskManagement/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #marketRisk {
    > div {
      .mainList {
        .marketRisk-list {
          .marketRisk-list-info {
            .marketRisk-box {
              @include riskManagementImg("gsgd_0.png", "theme1");

              &:hover {
                @include riskManagementImg("gsgd_1.png", "theme1");
              }
            }
          }
        }
      }
    }
  }
}
</style>