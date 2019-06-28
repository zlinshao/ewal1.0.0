<template>
  <div id="tabsRouter">
   <!-- 首页路由-->
    <div class="home_router" v-if=" isShow === 1">
      <div  v-for="tmp in tabsList"  @click="goDepartmentPage(tmp.id)">
        <span>{{tmp.name}}</span>
      </div>
    </div>
   <!-- 部门路由-->
    <div class="page_router" v-if=" isShow === 2">
      <img src="../../../assets/image/president/back.png" @click="goPresidentPage">
      <div class="tabs">
        <div class="tab" v-for="item in tabsList">
          <div  class="tab_label"  :class="{tab_label_active:choosePageId === item.id}" @click="routerClick(item)">
            <div class="Eng_Name">{{item.EngName}}</div>
            <div class="line_chinese">
              <span class="line"></span>
              <span class="chinese_name">{{item.name}}</span>
              <span class="line"></span>
            </div>
          </div>
          <div class="circle"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "tabsRouter",
    props:['isShow'],
    data(){
      return{
        tabsList:[
          {id:'1',name: '市场', EngName:'Marketing Department',url: 'markting'},
          {id:'2',name: '人事', EngName:'HR Department',url: 'humanbing'},
          {id:'3',name: '财务', EngName:'Finance Department',url: 'fincene'},
          {id:'4',name: '网络', EngName:'Network Department',url: 'network'},
          {id:'5',name: '运维', EngName:'Operation Department',url: 'fincene'},
        ],
        choosePageId:'' ,// 被选择的部门页面
      }
    },
    mounted() {

    },
    activated(){
      this.choosePageId=sessionStorage.presidentPageID;
    },
    watch:{

    },
    methods:{
      //路由跳转
      routerClick(item){
        this.choosePageId=item.id;
        sessionStorage.setItem('presidentPageID', item.id);
        this.$emit('choosePage',item.id);
      },

      //跳office页面
      goDepartmentPage(val){
        sessionStorage.setItem('presidentPageID', val);
        this.$router.push({path: '/president/office',query:{id:val}});
      },

      //跳首页
      goPresidentPage(){
        this.$router.push({path: '/president'});
      },

    },


  }
</script>


<style scoped lang="scss">
  #tabsRouter{
    //首页路由
    .home_router{

    }
    //部门路由
    .page_router{
      display: flex;
      text-align: right;
      padding-top: 10px;
      img{
        width: 43px;
        height: 43px;
      }
      .tabs{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        .tab{
          display: flex;
          justify-content: flex-start;
          .tab_label{
            padding: 0 30px;
            text-align: center;
            vertical-align: top;
            .Eng_Name{
              color: #6B7298;
              font-size: 18px;
            }
            .line_chinese{
              display: flex;
              justify-content: space-around;
              display: none;
              .chinese_name{
                display: block;
                font-size:16px;
                padding: 10px;
              }
              .line{
                display: block;
                flex: 0.5;
                height: 1px;
                border-radius: 1px;
                background-color:#00FFFF ;
                margin: auto;
              }
            }
          }
          .circle{
            width: 5px;
            height: 5px;
            background-color:#6B7298 ;
            border-radius: 5px;
            margin-top: 10px;
          }
          .tab_label_active{
            .line_chinese{
              display: block;
              display: flex;
              justify-content: space-around;
            }
            .Eng_Name{
              color:#00FFFF ;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
</style>
