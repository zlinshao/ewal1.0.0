<template>
  <div id="overview_info" class="overview_info" :class="{'overview_show': overview_visible}">
    <div>
      <div class="container">
        <div class="btn_show" @click="handleOpenInfo"></div>
        <!--<ul class="date_change">
          <li @click="handleChangeDate(tmp.id)" v-for="tmp in date_change_list" :key="tmp.id"
              :class="{ 'mark_li' : isActive === tmp.id }">{{ tmp.val }}
          </li>
        </ul>-->
        <div class="details flex-center">
          <div class="items-column">
            <p>共计房源：{{ left_info.houseNum && left_info.houseNum.value }}套</p>
            <p>低质量数量：{{ left_info.quality && left_info.quality.value }}套</p>
            <p>平均租房价：{{ left_info.rentAvg && left_info.rentAvg.value.toFixed(2) }}元/套</p>
            <p>平均收房价：{{ left_info.lordAvg && left_info.lordAvg.value.toFixed(2) }}元/套</p>
          </div>
          <div>
            <span>房源预警占比：</span>
            <div id="notice_chart"></div>
          </div>
          <div>
            <span>房源出租占比：</span>
            <div id="renter_chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['overviewVisible'],
    name: "index",
    data() {
      return {
        market_server: globalConfig.market_server,
        isActive: 1,
        overview_visible: false,
        left_info: {},
        date_change_list: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
        ],
        notice_info: [],
        renter_info: []
      }
    },
    mounted() {},
    activated() {
    },
    watch: {
      overviewVisible(val) {
        this.overview_visible = val;
        if (val) {
          this.getHouseInfo();
        }
      },
    },
    computed: {},
    methods: {
      //获取房屋信息
      getHouseInfo() {
        this.$http.get(this.market_server + 'v1.0/market/house/houseAnalysis').then(res => {
          if (res.code === 200) {
            this.left_info = res.data.num;
            this.notice_info = res.data.warning;
            this.renter_info = res.data.rent;
            this.init_notice_chart();
            this.init_renter_chart();
          } else {
            this.left_info = {};
            this.notice_info = [];
            this.renter_info = [];
          }
        })
      },
      handleOpenInfo() {
        this.init_renter_chart();
        this.init_notice_chart();
        this.overview_visible = true;
        this.$emit('open');
      },
      handleChangeDate(id) {
        this.isActive = id;
      },
      init_notice_chart() {
        let notice = this.$echarts.init(document.getElementById('notice_chart'));
        notice.setOption({
          color: ['#CF2E33', '#FFAD0D', '#FFEB00', '#D8D8D8','#808080'],
          legend: {
            show: true,
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            data: [
              {
                name: '正常',
                icon: 'circle'
              },
              {
                name: '橙色预警',
                icon: 'circle'
              },
              {
                name: '黄色预警',
                icon: 'circle'
              },
              {
                name: '红色预警',
                icon: 'circle'
              },
              {
                name: '未知',
                icon: 'circle'
              },
            ]
          },
          series: [
            {
              name: '房源预警占比',
              type: 'pie',
              radius: ['30%', '80%'],
              selectedMode: 'single',
              avoidLabelOverlap: false,
              selectedOffset: 15,
              startAngle: 45,
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}%',
                  fontFamily: 'jingDianXingShu',
                  fontSize: 16,
                  fontStyle: 'italic'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                  }
                }
              },
              data: this.notice_info
            }
          ]
        })
      },
      init_renter_chart() {
        let renter = this.$echarts.init(document.getElementById('renter_chart'));
        renter.setOption({
          color: ['#CF2E33', '#0BB07B', '#0C66FF', '#FFAD0D'],
          legend: {
            show: true,
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            data: [
              {
                name: '未出租',
                icon: 'rect'
              },
              {
                name: '已出租',
                icon: 'rect'
               },
              {
                name: '待入住',
                icon: 'rect'
              },
              {
                name: '已预订',
                icon: 'rect'
              },
              {
                name: '未知',
                icon: 'rect'
              },
            ]
          },
          series: [
            {
              name: '房源预警占比',
              type: 'pie',
              radius: ['30%', '80%'],
              selectedMode: 'single',
              avoidLabelOverlap: false,
              selectedOffset: 15,
              startAngle: 45,
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}%',
                  fontFamily: 'jingDianXingShu',
                  fontSize: 16,
                  fontStyle: 'italic'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                  }
                }
              },
              data: this.renter_info
            }
          ]
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/components/overview-info.scss";

  @mixin marketImage($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  .overview_info {
    .container {
      background-color: $colorFFF;
      .btn_show {
        @include marketImage('shouqi.png', 'theme1');
        background-size: cover;
        background-color: $colorE33;
        border-radius: 8px 0 0 8px;
      }
    }
  }
</style>
