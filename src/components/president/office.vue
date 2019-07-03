<template>
  <div id="department" :class="{department:pageId!== '4'}">
<!--    :style="{backgroundImage:'url(' + activeBgurl + ')', backgroundRepeat:'no-repeat', backgroundSize: '100% 100%'}"-->
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
  import ClockTime from '../common/president-component/clock.vue';   //左边的时钟和时间
  import TabsRouter from '../common/president-component/tabsRouter.vue';   //路由跳转
  //引入页面组件
  import MarketingPage from  './officeComponent/marketing.vue';       //市场
  import HumanPage from './officeComponent/human.vue';                  //人事
  import FinancePage from './officeComponent/finance.vue';              //财务
  import NetworkPage from './officeComponent/network.vue';                  //网络
  import OperationPage from './officeComponent/operation.vue';                  //运维


  export default {
    components: { ClockTime,TabsRouter,MarketingPage,HumanPage,FinancePage,NetworkPage,OperationPage},
    name: "index",
    data() {
      return {
        pageId:'',  //部门页面的id
        activeBgurl:'',
        bgUrlList:[
          {val:'../../assets/image/president/marketing/di.png',id:'1'},
          {val:'../../assets/image/president/hr/di.png',id:'2'},
          {val:'../../assets/image/president/finance/di.png',id:'3'},
          {val:'../../assets/image/president/network/network_bg.png',id:'4'},
          {val:'../../assets/image/president/marketing/di.png',id:'5'}
        ]

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
      // this.setBgImgage();


    },
    watch: {
    },
    computed: {},
    methods: {
      choosePage(val){
        this.pageId = val;
      },
      setBgImgage(){
        this.bgUrlList.forEach((item,index)=>{
          if(item.id === this.pageId){
            this.activeBgurl = item.val;
          }
        })
      }

    },

  };
</script>
<style lang="scss" >
  /*#app .app2{*/
  /* ackground: url('../../assets/image/president/marketing/di.png') no-repeat  !important;*/
  /* background-size: 100% 100%;*/
  /*}*/
  /*#app header{*/
  /*  background:none !important;*/
  /*}*/

  </style>


<style lang="scss" scoped>

  #department{
    padding: 30px 50px ;
    border-top:0.5px solid #00FFFF;
    background: url('../../assets/image/president/marketing/di.png') no-repeat  !important;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .department_header{
      margin-bottom: 45px;
      .header_left{
        display: flex;
        justify-content: space-between;
        height: 100px;
        margin: auto;
      }
    }

  }
  /*除网络外,高度占据整个屏幕,不上下滑动*/
  .department{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
