<template>
  <div id="selectcityComponent">
    <div id="choosecity">
<!--      <div class="circle" v-for="(item,index) in arr"  :style="{ width:imgWidth + 'px', height:imgWidth + 'px', bottom:item.y +'px', left:item.x+'px'}">-->
<!--      </div>-->

      <div class="circle" v-for="(item,index) in arr1"  :style="{ width:imgWidth1 + 'px', height:imgWidth1 + 'px', bottom:item.y +'px', left:item.x+'px'}">
      </div>
      <div class="circle" v-for="(item,index) in arr2"  :style="{ width:imgWidth2 + 'px', height:imgWidth2 + 'px', bottom:item.y +'px', left:item.x+'px'}">
      </div>
      <div class="circle" v-for="(item,index) in arr3"  :style="{ width:imgWidth + 'px', height:imgWidth + 'px', bottom:item.y +'px', left:item.x+'px'}">
     </div>

<!--      <div class="circle"  :style="{ width:imgWidth, height:imgWidth , bottom:y +'px', left:x1+'px'}">-->
<!--      </div>-->
<!--      <div class="circle"   :style="{ width:imgWidth, height:imgWidth , bottom:y +'px', left:x2+'px'}">-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectCity",
    props:['citylist'],
    components:{},
    data(){
      return{
        angle:'',
        r:'',
        x0:'',
        cityName:'总公司',
        list:['aa','bb','cc','dd','aa','bb','cc','dd','cc','dd','aa','bb','cc','dd','aa','bb'],
        list1:['aa','bb','cc','dd','aa','bb','aa','bb','cc','dd','aa','bb'],
        list2:['aa','bb','cc','dd','aa','bb','aa','bb','cc','dd','aa','bb'],
        list3:['aa','bb','cc','dd','aa','bb','aa','bb','cc','dd'],

        // y:'',
        // x:'',
        // x1:'',
        // x2:'',
        a:'',
        b:'',
        c:'',
        c1:'',
        c2:'',
        c3:'',
        imgWidth:'',
        imgWidth1:'',
        imgWidth2:'',
        imgWidth3:'',
        arr:[],
        arr1:[],
        arr2:[],
        arr3:[],
        length:'',
        length1:'',
        length2:'',
        length3:'',
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
          this.dealWithStyle();
        }
      },
    },
    methods:{
      //计算外圆的宽高,小圆的所在位置
      dealWithStyle(){
        let choosecity = document.getElementById('choosecity');
        let width = choosecity.offsetWidth;
        let height = choosecity.offsetHeight-100;
        this.a= 4*height/(3*width*width);
        this.b= -1*4*height/(3*width);
        this.c= height/3;
        this.c1= height/3;
        this.c2= height*2/3;
        this.c3= height;
        this.length=this.list.length;
        this.length1=this.list1.length;
        this.length2=this.list2.length;
        this.length3=this.list3.length;
        // this.imgWidth=width/this.length; //图片的大小

        this.imgWidth=height/this.length/2; //图片的大小
        this.imgWidth1=80;
        this.imgWidth2=60;
        this.imgWidth3=30;




        this.arr1=[];
        this.list1.forEach((item,index)=>{
          let obj={name:'',x:'',y:''};
          obj.name=item;

          let y='';

          if(index<this.length1/2){
            y=this.imgWidth*(index+1)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c1) / 4*this.a*this.a;
            obj.x=-1*Math.sqrt(y1)-this.b/this.a*2-1.5*width;
          }else{
            y=this.imgWidth*(index+1-this.length1/2)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c1) / 4*this.a*this.a;
            obj.x=Math.sqrt(y1)-this.b/this.a*2-1.5*width-this.imgWidth;;
          }

          obj.y=y-this.imgWidth*2+this.c2;

          this.arr1.push(obj);
          console.log(this.arr)
        });


        this.arr2=[];
        this.list2.forEach((item,index)=>{
          let obj={name:'',x:'',y:''};
          obj.name=item;

          let y='';

          if(index<this.length2/2){
            y=this.imgWidth*(index+1)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c2) / 4*this.a*this.a;
            obj.x=-1*Math.sqrt(y1)-this.b/this.a*2-1.5*width;
          }else{
            y=this.imgWidth*(index+1-this.length2/2)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c2) / 4*this.a*this.a;
            obj.x=Math.sqrt(y1)-this.b/this.a*2-1.5*width-this.imgWidth;;
          }

          obj.y=y-this.imgWidth*2+this.c1;

          this.arr2.push(obj);
          console.log(this.arr)
        });


        this.arr3=[];
        this.list3.forEach((item,index)=>{
          let obj={name:'',x:'',y:''};
          obj.name=item;

          let y='';

          if(index<this.length3/2){
            y=this.imgWidth*(index+1)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c3) / 4*this.a*this.a;
            obj.x=-1*Math.sqrt(y1)-this.b/this.a*2-1.5*width;
          }else{
            y=this.imgWidth*(index+1-this.length2/2)*2;
            let y1 = y/this.a + (this.b*this.b-4*this.a*this.c3) / 4*this.a*this.a;
            obj.x=Math.sqrt(y1)-this.b/this.a*2-1.5*width-this.imgWidth;
          }

          obj.y=y-this.imgWidth*2;

          this.arr3.push(obj);
          console.log(this.arr)
        });









        // let height2 = choosecity.offsetHeight-40;
        // this.c2= height2+100;
        // this.length2=this.list2.length;

        console.log(this.length2);
        console.log(width);
        console.log(height);
        // this.x=this.imgWidth;
        // this.x1=this.imgWidth;
        // this.x2=this.x1+width/2;
        // this.y=this.a*Math.pow(this.x1,2)+this.b*this.x1+this.c; //方程函数






        // this.arr2=[];
        // this.list2.forEach((item,index)=>{
        //   let obj={name:'',x:'',y:''};
        //   obj.name=item;
        //
        //   let y='';
        //   // let imgWidth=
        //
        //   if(index<this.length/2){
        //     y=this.imgWidth*(index+1)*2;
        //     let y1 = y/this.a + (this.b*this.b-4*this.a*this.c) / 4*this.a*this.a;
        //     obj.x=-1*Math.sqrt(y1)-this.b/this.a*2-1*width;
        //   }else{
        //     y=this.imgWidth*(index+1-this.length/2)*2;
        //     let y1 = y/this.a + (this.b*this.b-4*this.a*this.c) / 4*this.a*this.a;
        //     obj.x=Math.sqrt(y1)-this.b/this.a*2-1.5*width-this.imgWidth;
        //   }
        //
        //   obj.y=y-this.imgWidth*2;
        //
        //   this.arr2.push(obj);
        //   console.log(this.arr2)
        // });










        // this.arr=[];
        // this.list.forEach((item,index)=>{
        //   let obj={name:'',x:'',y:''}
        //   obj.name=item;
        //   let x=this.imgWidth*index;
        //   obj.y=this.a*Math.pow(x,2)+this.b*x+this.c;
        //
        //   if(index<=this.length/2){
        //     obj.x=this.imgWidth*index-this.imgWidth;
        //   }else{
        //     obj.x=this.imgWidth*(index-this.length/2)+width/2
        //   }
        //   this.arr.push(obj);
        // });


        // this.arr2=[];
        // this.list2.forEach((item,index)=>{
        //   let obj={name:'',x:'',y:''}
        //   obj.name=item;
        //   let x=this.imgWidth*index;
        //   // obj.y=this.a*Math.pow(x,2)+this.b*x+this.c2;
        //  let x1='';
        //   if(index<=this.length2/2){
        //     x1=this.imgWidth*index;
        //     obj.x= x1
        //     obj.y=this.a*Math.pow(x1,2)+this.b*x1+this.c2;
        //
        //   }else{
        //     x1=this.imgWidth*(index-this.length2/2)+width/2;
        //     obj.x= x1
        //     obj.y=this.a*Math.pow(x1,2)+this.b*x1+this.c2;
        //
        //   }
        //   this.arr2.push(obj);
        // });

        // list2







        // this.x=this.imgWidth;
        // this.x1=this.imgWidth;
        // this.x2=this.x1+width/2;
        // this.y=a*Math.pow(this.x,2)+b*this.x+c; //方程函数


        // console.log(this.x1);
        // console.log(this.x2);
        // console.log(this.y);

      },

      // aa(){
      //   this.list.forEach((item,index)=>{
      //     if(index<this.length/2){
      //       let x=this.imgWidth*index;
      //       item.x=x;
      //       item.y=this.a*Math.pow(x,2)+this.b*x+this.c;
      //
      //     }else{
      //       let x=this.imgWidth*index+width/2;
      //       item.x=x;
      //       item.y=this.a*Math.pow(x,2)+this.b*x+this.c;
      //     }
      //   })
      //   console.log(this.list);
      // },

      //点击城市
      chooseCityClick(item,index){
        this.citylist[index]=this.cityName;
        this.cityName = item;
        this.$emit('selectedCity',this.cityName);
      },

    }

  }
</script>

<style scoped lang="scss">
  #selectcityComponent{
    width: 70%;
    height: 80%;
    margin: auto;
  }
  #choosecity{
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border: 1px solid red;*/
    position: relative;
    .circle{
      /*width: 20px;*/
      /*height: 20px;*/
      border-radius: 20px;
      /*border: 1px solid green;*/
      position: absolute;
    }

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
    .circle{
      background: url('../../../assets/image/president/finance/chengshi_0.png') no-repeat;
      background-size: cover;
    }
    .centerCircle{
      background: url('../../../assets/image/president/finance/chengshi_1.png') no-repeat;
      background-size: cover;
      font-size: 28px;
    }


  }
</style>
