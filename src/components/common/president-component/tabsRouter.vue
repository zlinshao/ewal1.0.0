<template>
  <div id="tabsRouter">
   <!-- 首页路由-->
    <div class="home_router" v-if=" isShow === 1">
      <div    v-for="(tmp,index) in tabsList"
             :style="{ width:imgWidth+20+'px', height:imgWidth+20+'px',left:left*index+'px'}"
             :class="['circle_router_bg','circle_router_bg'+tmp.id]"
              @click="goDepartmentPage(tmp.id)">
        <div  :style="{width:imgWidth+'px', height:imgWidth+'px'}"
              :class="['circle_router','circle_router'+tmp.id]">
          <span class="router_name">{{tmp.name}}</span>
        </div>
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
    name: "tabsRouter",  //路由的切换
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
        //首页路由样式处理
        imgWidth:'',  //图片宽高
        left:'',     //左边距
      }
    },
    mounted() {

    },
    activated(){
      this.choosePageId=sessionStorage.presidentPageID;

      //处理首页路由样式
        let tabsRouter = document.getElementById('tabsRouter');
        let width = tabsRouter.offsetWidth;
        let margin=15;  //每个图片之间的间距
        this.imgWidth = (width-margin*(this.tabsList.length-1))/this.tabsList.length;//图片的宽高
        this.left=margin+this.imgWidth;  //距离左边的间距
    },
    watch:{

    },
    methods:{
      //路由跳转
      routerClick(item){
        this.choosePageId = item.id;
        sessionStorage.setItem('presidentPageID', item.id);
        this.$emit('choosePage',item.id);
      },

      //跳office页面
      goDepartmentPage(val){
        sessionStorage.setItem('presidentPageID', val);
        this.$router.push({path: '/president/office'});
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
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;
      .circle_router_bg{
        position: absolute;
        width: 140px;
        height: 140px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      .circle_router{
          width: 84px;
          height: 87px;
          cursor: pointer;
          transition: all 1s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      .router_name{
        color: #0C1645;
        font-size:14px;
      }

      .circle_router_bg:hover{
        animation:circleBgRoate 10s infinite linear ;
        .circle_router{
          transform: scale(1.2);
          .router_name{
            font-size:20px;
            font-weight:bold;
            animation:circleRouterName 10s infinite linear ;
          }
        }
      }

      @keyframes circleBgRoate{
        from{transform: rotate(360deg);}
        to{transform: rotate(0deg);}
      }
      @keyframes circleRouterName{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
      }

      //背景图
      .circle_router1{
        background: url("../../../assets/image/president/home/shichang_0.png") no-repeat;
        background-size: cover;
      }
      .circle_router2{
        background: url("../../../assets/image/president/home/renshi_0.png") no-repeat;
        background-size: cover;
      }
      .circle_router3{
        background: url("../../../assets/image/president/home/caiwu_0.png") no-repeat;
        background-size: cover;
      }
      .circle_router4{
        background: url("../../../assets/image/president/home/wangluo_0.png") no-repeat;
        background-size: cover;
      }
      .circle_router5{
        background: url("../../../assets/image/president/home/yunwei_0.png") no-repeat;
        background-size: cover;
      }

      //定位
      .circle_router_bg1{
         bottom:-7%;
      }
      .circle_router_bg2{
        bottom:5%;
      }
      .circle_router_bg3{
        bottom:30%;
      }
      .circle_router_bg4{
        bottom:0%;
      }
      .circle_router_bg5{
        bottom:37%;
      }
      //鼠标悬浮效果
      .circle_router_bg1:hover{
        background: url("../../../assets/image/president/home/shape_4.png") no-repeat;
        background-size: cover;
      }
      .circle_router_bg2:hover{
        background: url("../../../assets/image/president/home/shape_1.png") no-repeat;
      }
      .circle_router_bg3:hover{
        background: url("../../../assets/image/president/home/shape_2.png") no-repeat;
      }
      .circle_router_bg4:hover{
        background: url("../../../assets/image/president/home/shape_3.png") no-repeat;
      }
      .circle_router_bg5:hover{
        background: url("../../../assets/image/president/home/shape_5.png") no-repeat;
      }

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
          cursor: pointer;
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
