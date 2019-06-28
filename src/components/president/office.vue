<template>
  <div id="department">
    <!-- 头部-->
    <div class="department_header">
      <div class="header_left">
        <ClockTime></ClockTime>
        <TabsRouter  :isShow="2" @choosePage="choosePage"></TabsRouter>
      </div>
    </div>
    <!-- 页面组件-->
    <MarketingPage v-if="pageId === '1'"></MarketingPage>
    <HumanPage v-if="pageId === '2'"></HumanPage>
    <FinancePage v-if="pageId === '3'"></FinancePage>
    <NetworkPage v-if="pageId === '4'"></NetworkPage>
    <OperationPage v-if="pageId === '5'"></OperationPage>
  </div>
</template>

<script>
  import ClockTime from '../common/president-component/clock.vue';   //左边的时钟和时间
  import TabsRouter from '../common/president-component/tabsRouter.vue';   //路由跳转
  //引入页面组件
  import MarketingPage from  './officeComponent/marketing.vue';       //市场
  import HumanPage from './officeComponent/human.vue';                  //人事
  import FinancePage from './officeComponent/finance.vue';              //财务
  import NetworkPage from './officeComponent/network.vue';                  //人事
  import OperationPage from './officeComponent/operation.vue';                  //人事

  export default {
    components: { ClockTime,TabsRouter,MarketingPage,HumanPage,FinancePage,NetworkPage,OperationPage},
    name: "index",
    data() {
      return {
        pageId:'',  //部门页面的id

      };
    },
    mounted() {

    },
    activated() {
      //防止在当前页面刷新没有路由传参
      if(this.$route.query.id){
        this.pageId = this.$route.query.id;
      }else{
        this.pageId=sessionStorage.presidentPageID;
      }
    },
    watch: {
    },
    computed: {},
    methods: {
      choosePage(val){
        this.pageId = val;
      }
    },

  };
</script>


<style lang="scss" scoped>
  #department{
    padding: 30px 50px ;
    border-top:0.5px solid #00FFFF;
    .department_header{
      .header_left{
        display: flex;
        justify-content: space-between;
        height: 100px;
        margin: auto;
      }
    }
  }
</style>
