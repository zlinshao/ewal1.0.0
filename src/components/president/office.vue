<template>
  <div id="department" :class="['departmentBg'+pageId,{departmentOffice:pageId!== '4'}]">
    <!-- 头部-->
    <div class="department_header">
      <div class="header_left">
        <ClockTime></ClockTime>
        <TabsRouter  :isShow="2" @choosePage="choosePage"></TabsRouter>
      </div>
    </div>
    <!-- 页面组件-->
      <keep-alive>
          <MarketingPage v-if="pageId === '1'"></MarketingPage>
          <HumanPage v-if="pageId === '2'"></HumanPage>
          <FinancePage v-if="pageId === '3'"></FinancePage>
          <NetworkPage v-if="pageId === '4'"></NetworkPage>
          <OperationPage v-if="pageId === '5'"></OperationPage>
      </keep-alive>
  </div>
</template>

<script>
  import ClockTime from '../common/president-component/clock.vue';          //左边的时钟和时间
  import TabsRouter from '../common/president-component/tabsRouter.vue';   //路由跳转
  //引入页面组件
  import MarketingPage from  './officeComponent/marketing.vue';          //市场
  import HumanPage from './officeComponent/human.vue';                  //人事
  import FinancePage from './officeComponent/finance.vue';              //财务
  import NetworkPage from './officeComponent/network.vue';               //网络
  import OperationPage from './officeComponent/operation.vue';           //运维


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
      this.pageId=sessionStorage.presidentPageID;
    },
    watch: {
    },
    computed: {},
    methods: {
      //路由组件的回调函数
      choosePage(val){
        this.pageId = val;
      },
    },
  };
</script>

<style lang="scss">
  #department{
    #clockTime{
      .clock{
        width: 80px;
        height: 80px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../assets/scss/president/common.scss";
  @import "../../assets/scss/president/index.scss";
  #department{
    padding-top: 80px;
    color: #00FFFF;
    .department_header{
      border-top:0.5px solid #00FFFF;
      padding: 0px 50px ;
      .header_left{
        display: flex;
        justify-content: space-between;
        height: 100px;
        margin: auto;
      }
    }
  }
  /*除网络外,其他的高度占据整个屏幕,不上下滑动*/
  .departmentOffice{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  //切换背景图片
  .departmentBg1{
    @include bgImage("../../assets/image/president/marketing/di.png");
  }
  .departmentBg2{
    @include bgImage("../../assets/image/president/hr/di.png");
  }
  .departmentBg3{
    @include bgImage("../../assets/image/president/finance/di.png");
  }
  .departmentBg4{
    @include bgImage("../../assets/image/president/network/network_bg.png");
  }
  .departmentBg5{
    @include bgImage("../../assets/image/president/operation/di.png");
  }
</style>
