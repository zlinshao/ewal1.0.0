<template>
    <div id="houseManagement">
      <div class="header items-bet">
        <div class="items-center">
          <span class="btn" @click="show_market = true">...</span>
          <span class="title">房源管理</span>
        </div>
        <div class="items-center">
          <span class="set" @click="lj_visible = true"></span>
          <span class="search" @click="isHigh = true"></span>
        </div>
      </div>
      <div class="btn_show" @click="overview_visible = true"></div>
      <house-card :house-source="house_source" @close="handleCloseOverview" @open="handleOpenCard"></house-card>
      <market-menu-list :show-market="show_market" @close="handleCloseMenu"></market-menu-list>
      <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>
      <overview-info :overview-visible="overview_visible"></overview-info>
      <lj-dialog
        :visible="lj_visible"
        :size="lj_size"
        @close="handleCloseLjDialog">
        <div class="house_info">
          <div class="base_info flex">
            <div class="house_photo">
              <div class="big_img">
                <img src="./swipe6.jpg" alt="">
              </div>
              <div class="small_img">
                <div class="img_container items-center" ref="img_contain" :style="{'left': img_trams + '%'}">
                  <img src="./swipe6.jpg" alt="">
                  <img src="./swipe6.jpg" alt="">
                  <img src="./swipe6.jpg" alt="">
                  <img src="./swipe6.jpg" alt="">
                  <img src="./swipe6.jpg" alt="">
                  <img src="./swipe6.jpg" alt="">
                </div>
                <span class="btn left_btn" @click="handleTransLeft"><i class="el-icon-arrow-left"></i></span>
                <span class="btn right_btn" @click="handleTransRight"><i class="el-icon-arrow-right"></i></span>
              </div>
            </div>
            <div class="house_detail">
              1111
            </div>
          </div>
          <div>22222222222222</div>
        </div>
      </lj-dialog>
    </div>
</template>

<script>
  import MarketMenuList from '../components/market-menu-list.vue';
  import searchHigh from '../../common/searchHigh.vue';
  import HouseCard from '../components/house-card.vue';
  import OverviewInfo from '../components/overview-info.vue';
  import LjDialog from '../../common/lj-dialog.vue';

    export default {
        name: "index",
        components: { MarketMenuList ,searchHigh, HouseCard ,OverviewInfo,LjDialog },
        data() {
            return {
              lj_visible: false,
              lj_size: '',
              overview_visible:false,
              show_market: false,
              isHigh: false,
              searchData: {
                status: 'workOrder',
                keywords: 'keywords',
                data: [],
              },
              house_source: [],
              img_trams: 0,
            }
        },
        mounted() {
          this.house_source = [
            {
              id: 1,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '已出租',
              notice: 1,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe6.jpg')
            },
            {
              id: 2,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe5.jpg')
            },
            {
              id: 3,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe4.jpg')
            },{
              id: 4,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe4.jpg')
            },{
              id: 5,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe3.jpg')
            },{
              id: 6,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 3,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe2.jpg')
            },{
              id: 7,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe1.jpg')
            },{
              id: 8,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 3,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe2.jpg')
            },{
              id: 9,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe3.jpg')
            },{
              id: 10,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe3.jpg')
            }
            ,{
              id: 11,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 3,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe5.jpg')
            }
            ,{
              id: 12,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe6.jpg')
            },{
              id: 13,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe5.jpg')
            },{
              id: 14,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 3,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe4.jpg')
            },{
              id: 15,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe3.jpg')
            },{
              id: 16,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe2.jpg')
            },{
              id: 17,
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false,
              url: require('../../../assets/image/marketCentre/theme1/test/swipe1.jpg')
            }
          ];
          this.overview_visible = true;
          this.lj_visible = true;
          this.lj_size = 'large'
        },
        activated() {
        },
        watch: {},
        computed: {},
        methods: {
          handleOpenCard(item) {
            this.lj_visible = true;
            console.log(item);
          },
          handleTransLeft() {
            this.img_trams -= 20;
          },
          handleTransRight() {
            if (this.img_trams < 0) {
              this.img_trams += 20;
            }
          },
          handleCloseMenu() {
            this.show_market = false;
          },
          handleCloseSearch() {
            this.isHigh = false;
          },
          handleCloseOverview() {
            this.overview_visible = false;
          },
          handleCloseLjDialog() {
            this.lj_visible = false;
          }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/houseManagement/index.scss";

  @mixin houseManagementImg($m, $n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #houseManagement {
      .header {
        span.set {
          @include houseManagementImg('szh.png','theme1');
        }
        span.search {
          @include houseManagementImg('search.png','theme1');
        }
      }
      .btn_show {
        @include houseManagementImg('shouqi.png','theme1');
        background-size: cover;
        background-color: $colorE33;
        border-radius: 8px 0 0 8px;
      }
      .house_info {
        > div {

        }
        .base_info {
          border-bottom: 1px dashed #808080;
          > div {

          }
          .house_photo {
            .small_img {
              .btn {
                background-color: $color874;
              }
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #houseManagement {

    }
  }

  #theme_name.theme3 {
    #houseManagement {

    }
  }

  #theme_name.theme4 {
    #houseManagement {

    }
  }
</style>
