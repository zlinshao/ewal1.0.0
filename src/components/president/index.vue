<template>
  <div id="aa" @click="goPath">
    <ClockTime></ClockTime>
    <TabsRouter  :isShow="1" ></TabsRouter>
    首页
  </div>
</template>

<script>
  import ClockTime from '../common/president-component/clock.vue';   //左边的时钟和时间
  import TabsRouter from '../common/president-component/tabsRouter.vue';   //路由跳转

  export default {
    components: {ClockTime,TabsRouter  },
    name: "index",
    data() {
      return {

      };
    },
    mounted() {

    },
    activated() {

    },
    watch: {},
    computed: {},
    methods: {
      //选择时间
      comfirm(val){
        console.log(val)
      },
      goPath(){
        this.$router.push({path: '/president/office'});
      },
      choosePage(val){
        // this.pageId = val;
      }
    },

  };
</script>


<style lang="scss" scoped>
  #human{

  }


</style>
