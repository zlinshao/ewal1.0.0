<template>
  <div id="choosecityComponent">
    <div id="choosecity">
      <div class="outCircle" :style="outCircleStyle">
       <!--中间的大圆-->
        <div class="centerCircle" :style="centerCircleStyle" >
          <div class="centerCircle2">
            <span class="nameCircle">{{cityName}}</span>
          </div>
        </div>
        <!--外面的一圈小圆 -->
        <div class="innerCircle"
             v-for="(item,index) in outerCityList"
             :style="[{ top: (Math.sin(angle*(index+1)) * r +x0)+'px',left:(Math.cos(angle*(index+1)) * r +x0)+'px'},innerCircleStyle]"
             @click="chooseCityClick(item,index)"
        >
          <div class="innerCircle2">
            <span class="nameCircle">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChooseCity",   //圆形的城市选择
    props:['citylist'],
    components:{},
    data(){
      return{
        cityName:'--',
        outerCityList:[],
        outCircleStyle:{},   //外圆样式
        centerCircleStyle:{},   //中心圆样式
        innerCircleStyle:{},   //外围小圆样式
        angle:'',
        r:'',
        x0:'',
      }
    },
    beforecreated(){

    },
    created(){

    },
    beforeMount(){

    },
    mounted() {
    },
    activated(){
      window.addEventListener("resize", () => {
        this.dealWithStyle();
      });
    },
    watch:{
      citylist(val,oldVal) {
        if(Array.isArray(val) && val.length > 0) {
          this.cityName = this.citylist[0];
          this.outerCityList =  this.citylist.slice(1);
          this.$emit('selectedCity',this.cityName);
          this.dealWithStyle();
        }
      },
    },
    methods:{
      //点击城市
      chooseCityClick(item,index){
        this.outerCityList[index]=this.cityName;
        this.cityName = item;
        this.$emit('selectedCity',this.cityName);
      },

      //计算外圆的宽高,小圆的所在位置
      dealWithStyle(){
        //获取最外层容器的高度,作为外圆的宽高
        let choosecity = document.getElementById('choosecity');
        let height = choosecity.offsetWidth ;
        this.r = height/2;
        //根据列表的个数,计算每个小圆平均占有的弧度
        let length = this.outerCityList.length;
        this.angle = 2*Math.PI / 360 * 360/length;
        // 计算每个小圆在外圆上的坐标点(x,y)
        let x = Math.sin(this.angle) * this.r ;
        let y = Math.cos(this.angle) * this.r ;
        //根据外圆的周长,计算每个小圆的宽高(这里是每个小圆的弧度的2倍作为小圆的周长)
        // this.imgWidth =(2*Math.PI*r *2)/(2*Math.PI)*2;
        let imgWidth = 4*this.r/length;
        //计算外圆的坐标圆点(需要考虑小圆自身的宽高)
        this.x0= this.r -imgWidth/2;

        //设置样式
        this.outCircleStyle = {   //外圆样式
          width:height+ 'px',
          height:height+ 'px'
        };
        this.centerCircleStyle = {  //中心圆样式
          width:this.r + 'px',
          height:this.r + 'px',
          top:this.r/2 + 'px',
          left:this.r/2 + 'px',
        };
        this.innerCircleStyle = {  //外围小圆样式
          width:imgWidth+'px',
          height:imgWidth+'px',
        }
      },
    }

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/president/common.scss";
  #choosecityComponent{
    width: 60%;
    height: 100%;
    margin: auto;
    #choosecity{
      width: 100%;
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .outCircle{
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        .centerCircle, .innerCircle{
          position: absolute;
          border-radius: 50%;
          color: #20296A;
          display: flex;
          justify-content: center;
          align-items: center;
          animation:circleOutRoate 8s infinite 2.5s linear;
          .centerCircle2, .innerCircle2{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            animation:circleInnerRoate 4s infinite 2.5s linear;
           .nameCircle{
             display: block;
             animation:circleNameRoate 8s infinite 2.5s linear ;
           }
          }
        }
      }
     //外面一圈小圆样式
      .innerCircle{
        background: url('../../../assets/image/president/finance/y_out_2.png') no-repeat;
        background-size: cover;
        padding: 10px;
        .innerCircle2{
          background: url('../../../assets/image/president/finance/y_out_1.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      //中心圆样式
      .centerCircle{
        background: url('../../../assets/image/president/finance/y_center_2.png') no-repeat;
        background-size: cover;
        font-size: 28px;
        font-weight: bold;
        padding: 20px;
        .centerCircle2{
          background: url('../../../assets/image/president/finance/y_center_1.png') no-repeat;
          background-size: cover;
        }
      }
      //页面进入时整个的动画，只执行一次
      .outCircle{
        transform-origin:50% 50%;
        animation:circleOutScale 2.5s 1 linear ;
        animation-fill-mode: none;
      }
      //鼠标移上去时的动画
      .centerCircle:hover, .innerCircle:hover{
        animation:circleOutScale 1s 1 ease-in-out ;
        animation-fill-mode: none;
        .centerCircle2, .innerCircle2{
          animation:circleOutScale 0.5s 1 ease-in-out ;
          animation-fill-mode: none;
          .nameCircle{
            animation:circleOutScale 1s 1 ease-in-out ;
            animation-fill-mode: none;
          }
        }
      }

      @keyframes circleOutScale{
        0% {
          transform: scale(0.5);
          opacity: 0.2;
        }
        25% {
          transform: scale(0.6);
          opacity: 0.4;
        }
        50% {
          transform: scale(0.8);
          opacity: 0.6;
        }
        75% {
          transform: scale(0.9);
          opacity: 0.8;
        }
        100% {
          transform: scale(1.0);
          opacity: 1.0;
        }
      }

      @keyframes circleOutRoate{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg); }
      }
      @keyframes circleInnerRoate{
        from{transform: rotate(0deg);}
        to{transform: rotate(-360deg); }
      }
      @keyframes circleNameRoate{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
      }
    }
  }
</style>
