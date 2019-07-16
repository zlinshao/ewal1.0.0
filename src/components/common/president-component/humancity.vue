
<template>
  <div id="humancity" >
    <div id="choosecity">
      <!--中间最上面的大圆      -->
      <div class="first_bg_circle" :style="{bottom:(selectObj.y-selectObj.r)+'px',left:(selectObj.x-selectObj.r)+'px'}">
        <span class="first_out_circle" :style="{width:selectObj.r*2+'px',height:selectObj.r*2+'px'}">
          <span class="first_inner_circle">
            <span class="first_name_circle">{{selectObj.name ||'--'}}</span>
          </span>
        </span>
      </div>
      <!--小圆的集合-->
      <div class="new_bg_circle" v-for="(item,index) in newCityList" :style="{bottom:(item.y-item.r)+'px',left:(item.x-item.r)+'px'}" >
        <span :style="{width:item.r*2+'px',height:item.r*2+'px'}"   :class="['new_out_circle',{newCircle1:item.r >= 50,newCircle2:item.r <50 }]" @click="chooseCityClick(item,index)">
          <span class="new_inner_circle">
            <span class="new_name_circle">{{item.name||'--'}}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HumanCity",   //圆形的城市选择
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
        minRadius:40,       //设置圆的最小半径
        circleArray:[],      //已生成的圆的集合
        total:'',          //圆的个数
        selectObj:{},        //被选的最大的圆数据
        newCityList:[],     //除最上面剩余的圆数据
        cityName:'--',     //被选择的城市
      }
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
          console.log(this.citylist);
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
        if (this.circleArray.length === 0) return Math.floor(Math.random() * 10+80);
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

      // 5.如果生成100种方案都没有合适可用的话，终止进程。
      getCircle() {
        let i = 0;
        while (this.circleArray.length < this.total) {
          this.createOneCircle();
          i ++
          if (i >= 100) {
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
  #humancity{
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 0px 30px 30px 30px;
    #choosecity{
      width: 100%;
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      //公共样式
      .first_bg_circle, .new_bg_circle{
        padding: 20px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        .first_out_circle, .new_out_circle{
          animation:circleBgRoate 6s infinite linear ;
          cursor: pointer;
          padding: 5%;
          .first_inner_circle, .new_inner_circle{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 20px;
            animation:circleInnerRoate 3s infinite linear ;
            .first_name_circle, .new_name_circle{
              color: #FFFFFF;
              animation:circleRouterName 6s infinite linear ;
            }
            .new_name_circle{
              font-size:12px;
            }
            .first_name_circle{
              font-size:28px ;
              font-weight: bold;
            }
          }
        }
      }
      //小圆的图片
      .newCircle1{
        background: url("../../../assets/image/president/hr/y_1.png") no-repeat;
        background-size: 100% 100%;
        .new_inner_circle{
          background: url("../../../assets/image/president/hr/pic_1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .newCircle2{
        background: url("../../../assets/image/president/hr/y_2.png") no-repeat;
        background-size: 100% 100%;
        .new_inner_circle{
          background: url("../../../assets/image/president/hr/pic_2.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      //最大圆的图片
      .first_out_circle{
        .first_inner_circle{
          background: url("../../../assets/image/president/hr/pic_0.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      //小圆的鼠标移上去后的效果
      .new_bg_circle:hover{
        background: url("../../../assets/image/president/hr/shape.png") no-repeat;
        background-size: 100% 100%;
        animation:circleOutScale 1s 1 linear ;
      }
      //大圆的鼠标移上去效果
      .first_bg_circle:hover{
        background: url("../../../assets/image/president/hr/shape.png") no-repeat;
        background-size: 100% 100%;
        animation:circleOutScale 1s 1 linear ;
      }

      //动画
      @keyframes circleOutScale{
        from{transform: scale(0.7);}
        to{transform: scale(1.0);}
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
