<template>
  <div id="earth">
    <div id="earthEcharts"></div>
  </div>
</template>

<script>
  import earthData  from '../../../../static/earth/earthData';  //地球的echarts数据
  import echarts from 'echarts';
  export default {
    name: "Earth",
    data(){
      return{

      }
    },
    mounted() {


    },
    activated(){
      this.drawEarth();
    },
    watch:{
    },
    methods:{
      // 地球绘制3d效果
      drawEarth (){
        let myChartEarth = this.$echarts.init(document.getElementById('earthEcharts'));

        function getAirportCoord(idx) {
          return [earthData.airports[idx][3], earthData.airports[idx][4]];
        }
        var routes = earthData.routes.map(function(airline) {
          return [
            getAirportCoord(airline[1]),
            getAirportCoord(airline[2])
          ];
        });
        let option={
          globe: {
            baseTexture: require('../../../assets/image/earthImage/world.jpg'),
            heightTexture: require('../../../assets/image/earthImage/bathymetry.jpg'),
            shading: 'lambert',
            light: {
              ambient: {
                intensity: 0.4
              },
              main: {
                intensity: 0.4
              }
            },
            viewControl: {
              autoRotate: true,
              distance:280  //缩放地图视角，如果感觉地球太大，可以设置该值，默认150
            },
            displacementScale: 0.1,//地球顶点位移的大小
            displacementQuality: 'high',//地球顶点位移的质量
          },
          series: {
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            lineStyle: {
              width: 1,
              color: 'rgb(50, 50, 150)',
              opacity: 0.1
            },
            data: routes
          }
        };
        // myChartEarth.setOption(option);
        window.addEventListener("resize", () => {
          myChartEarth.resize();
        });
        myChartEarth.setOption(option);
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/president/common.scss";
  #earth{
    width: 100%;
    flex: 1;
    /*margin-bottom: 70px;*/
    /*height: 100%;*/
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    #earthEcharts{
      width: 100%;
      height: 100%;
      margin: auto;
      /*padding: 20% 10%;*/
      /*div{*/
      /*  margin: auto !important;*/
      /*}*/
      /*z-index:99;*/
    }


  }
</style>
