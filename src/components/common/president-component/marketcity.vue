<template>
  <div id="marketcity" >
    <div id="choosecity">
      <!--中间最上面的大圆      -->
      <span class="outcircle first_circle" :style="{width:selectObj.r*2+'px',height:selectObj.r*2+'px',bottom:(selectObj.y-selectObj.r)+'px',left:(selectObj.x-selectObj.r)+'px'}">
        <span class="innerCircle first_circle_inner ">
          <span class="nameCircle first_circle_info">{{selectObj.name ||'--'}}</span>
        </span>
       </span>
      <!--小圆的集合-->
      <span class="outcircle new_Circle" :style="{width:item.r*2+'px',height:item.r*2+'px',bottom:(item.y-item.r)+'px',left:(item.x-item.r)+'px'}" v-for="(item,index) in newCityList" @click="chooseCityClick(item,index)">
        <span class="innerCircle new_circle_inner">
          <span class="nameCircle new_circle_info">{{item.name || '--'}}</span>
        </span>
       </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MarketCity",   //圆形的城市选择
    props:['citylist'],
    components:{},
    data(){
      return{
         MR:80,    //设置中心圆的半径
        //产生随机圆
        height:'',             //画布的高
        dWidth:'',            //画布的宽
        dHeight:'',          //底部圆集合的高
        minMargin:20,        //圆与圆之间最短的间距
        maxRadius:60,        //设置圆的最大半径
        minRadius:40 ,       //设置圆的最小半径
        circleArray:[],      //已生成的圆的集合
        total:'',          //圆的个数
        selectObj:{},        //被选的最大的圆数据
        newCityList:[],     //除最上面剩余的圆数据
        cityName:'--',     //被选择的城市
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
        this.getBaseInfo();
      });
    },
    activated(){
      this.getBaseInfo();
    },
    watch:{
      citylist(val,oldVal) {
        if(Array.isArray(val) && val.length > 0) {
          this.getBaseInfo();
          this.cityName = this.selectObj.name;
          this.$emit('selectedCity',this.cityName);
        }
      },
    },
    methods:{
      //1.获取画布的宽高
      getBaseInfo(){
        this.c = document.getElementById('choosecity');
        this.height = this.c.offsetHeight;
        this.dWidth = this.c.offsetWidth;
        this.dHeight = this.height - this.MR;
        this.total =  this.citylist.length;
        //自定义总公司的圆，固定在顶部中间位置
        this.circleArray=[];
        this.circleArray[0] = {x:(this.dWidth/2),y:this.height-this.MR,r:this.MR,name:''};
        this.getCircle();
        //将城市名对应到每个圆的对象中
        this.circleArray.forEach((item,index)=>{
          item.name = this.citylist[index];
        });
        this.selectObj =  this.circleArray[0];  //默认选择数组的一个城市
        this.newCityList =  JSON.parse(JSON.stringify(this.circleArray)).slice(1);
      },

      //2.判断新圆是否超出画布
      check(x, y, r) {
        return !(x + r > this.dWidth || x - r < 0 || y + r > this.dHeight || y - r < 0);
      },

      // 3.根据圆心获取半径，并判断该半径是否合法
      getR(x, y) {
        if (this.circleArray.length === 0) return Math.floor(Math.random() * 20 + 80);
        let lenArr = this.circleArray.map(c => {
          let xSpan = c.x - x;
          let ySpan = c.y - y;
          return Math.floor(Math.sqrt(Math.pow(xSpan, 2) + Math.pow(ySpan, 2))) - c.r;
        })
        //找到离新圆最短的圆的距离
        let minCircleLen = Math.min(...lenArr);
        //获取离新圆最近的圆的索引，并取出该条数据
        let tempR = minCircleLen - this.minMargin;
        let bool =  (tempR >= this.minRadius && tempR <= this.maxRadius);
        return bool ? tempR : false;
      },


      // 4.生成一个圆，随机生成圆心(如果连续生成200次半径都没有合适的话，终止进程)
      createOneCircle() {
        let x, y, r;
        let createCircleTimes = 0;
        while (true) {
          createCircleTimes++;
          x = Math.floor(Math.random() * this.dWidth);
          y = Math.floor(Math.random() * this.dHeight);
          let TR = this.getR(x, y);
          if (!TR) {
            continue;
          } else {
            r = TR;
          }
          if (this.check(x, y, r) || createCircleTimes > 200) {
            break;
          }
        }
        let obj={x:x,y:y,r:r,name:''};
        this.check(x, y, r) && this.circleArray.push(obj);
      },

      // 如果生成100种方案都没有合适可用的话，终止进程。
      getCircle() {
        let n = 0
        while(this.circleArray.length < this.total) {
          this.circleArray = [];
          this.circleArray[0] = {x:(this.dWidth/2),y:this.height-this.MR,r:this.MR,name:''};
          let i = 0;
          while (this.circleArray.length < this.total) {
            this.createOneCircle();
            i ++
            if (i >= 100) {
              break;
            }
          }
          n ++
          if (n > 100) {
            break;
          }
        }
      },


      //点击城市
      chooseCityClick(item,index){
        let name1 = item.name;
        let name2 = this.selectObj.name;
        this.selectObj.name = name1;
        this.newCityList[index].name = name2;
        this.cityName = name1;
        this.$emit('selectedCity',this.cityName);
      },
    }

  }
</script>

<style scoped lang="scss">
  #marketcity{
    width: 100%;
    flex: 1;
    margin: auto;
    padding: 30px 30px 60px 0px;
    #choosecity{
      width: 100%;
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      //公共样式
      .outcircle{
        position: absolute;
        border-radius: 50%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        animation:circleBgRoate 16s infinite linear ;
        .innerCircle{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          animation:circleInnerRoate 8s infinite linear ;
          .nameCircle{
            display: block;
            animation:circleRouterName 16s infinite linear ;
          }
        }
      }
      //除最大圆以外的圆
      .new_Circle{
        background: url("../../../assets/image/president/marketing/y_other_2.png") no-repeat;
        background-size: 100% 100%;
        .new_circle_inner{
          background: url("../../../assets/image/president/marketing/y_other_1.png") no-repeat;
          background-size: 100% 100%;
          .new_circle_info{
            font-size:16px;
            color: #FFFFFF;
          }
        }
      }
      //最大圆的样式
      .first_circle{
        background: url("../../../assets/image/president/marketing/y_max_2.png") no-repeat;
        background-size: 100% 100%;
        .first_circle_inner{
          background: url("../../../assets/image/president/marketing/y_max_1.png") no-repeat;
          background-size: 100% 100%;
          .first_circle_info{
            font-size:28px ;
            font-weight: bold;
            color:#00FFFF;
          }
        }
      }

      @keyframes circleBgRoate{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
      }
      @keyframes circleInnerRoate{
        from{transform: rotate(0deg);}
        to{transform: rotate(-360deg);}
      }
      @keyframes circleRouterName{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
      }




    }
  }
</style>
