<template>
  <div id="choosecityComponent">
    <div id="choosecity">
      <div class="outCircle" :style="outCircleStyle">
        <div class="centerCircle" :style="centerCircleStyle" >{{cityName}}</div>
        <div class="innerCircle"
             v-for="(item,index) in outerCityList"
             :style="[{ top: (Math.sin(angle*(index+1)) * r +x0)+'px',left:(Math.cos(angle*(index+1)) * r +x0)+'px'},innerCircleStyle]"
             @click="chooseCityClick(item,index)"
        >
          {{item}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChooseCity",
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
      window.addEventListener("resize", () => {
        this.dealWithStyle();
      });
    },
    activated(){
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
          lineHeight:this.r+ 'px'
        };
        this.innerCircleStyle = {  //外围小圆样式
          width:imgWidth+'px',
          height:imgWidth+'px',
          lineHeight:imgWidth+ 'px',
        }
      },


    }

  }
</script>

<style scoped lang="scss">
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
      }
      .centerCircle, .innerCircle{
        position: absolute;
        border-radius: 50%;
        color: #20296A;
        text-align: center;
      }
      .innerCircle{
        background: url('../../../assets/image/president/finance/chengshi_0.png') no-repeat;
        background-size: cover;
      }
      .centerCircle{
        background: url('../../../assets/image/president/finance/chengshi_1.png') no-repeat;
        background-size: cover;
        font-size: 28px;
      }
  }



  }
</style>
