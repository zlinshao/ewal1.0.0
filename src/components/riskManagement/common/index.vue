<template>
  <div id="marketRisk">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click='moduleList'>
            <b>...</b>
          </p>
          <h1>{{this.$route.query.pre_name}}</h1>
          <h2 class="items-center">
            <span v-for="(item,index) in selects" @click="changeTabs(index+1,item.id)" class="items-column" :class="{'chooseTab': chooseTab === index+1}">
              {{item.name}}<i></i>
            </span>
          </h2>
        </div>
      </div>
      <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
        <div>
          <div class="marketRisk-list" v-if='gradeChildrenData.length > 0'>
            <div class="marketRisk-list-info flex-center" v-for="(item,index) in gradeChildrenData">
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
import { riskManagement } from '../../../assets/js/allModuleList.js';
import MenuList from '../common/menu'

export default {
  name: "index",
  components: { MenuList },
  data () {
    return {
      riskManagement,
      navVisible: false,
      chooseTab: 1,
      params: {//查询参数
        search: '',
        offset: 1,
        limit: '',
      },
      gradeChildrenData: [],//三级列表数据
      selects: [],
      parent_id: '',

    }
  },
  mounted () {
    this.chooseTab = this.$route.query.pre_index;//切换tab
    this.selects = this.$route.query.pre_data;
    this.parent_id = this.$route.query.pre_id;
    this.getDataList();
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.chooseTab = this.$route.query.pre_index;//切换tab
        this.selects = this.$route.query.pre_data;
        this.parent_id = this.$route.query.pre_id;
        if (oldVal.path === '/riskManagementDetail') {

        }
      },
      // 深度观察监听
      deep: true
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
    changeTabs (id, pre_id) {
      this.chooseTab = id;
      this.parent_id = pre_id;
      this.getDataList();
    },
    getDataList () {
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: this.parent_id }).then(res => {
        if (res.status === 200) {
          this.gradeChildrenData = res.data.data;
        }
      })
    },
    jumpNewWindow (item) {
      const { href } = this.$router.resolve({
        path: 'riskManagementDetail',
        query: { pre_name: item.name, pre_id: item.id, pre_data: this.gradeChildrenData }
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