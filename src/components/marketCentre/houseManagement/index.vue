<template>
    <div id="houseManagement">
      <div class="header items-bet">
        <div class="items-center">
          <span class="btn" @click="show_market = true">...</span>
          <span class="title">房源管理</span>
        </div>
        <div class="items-center">
          <span class="set"></span>
          <span class="search" @click="isHigh = true"></span>
        </div>
      </div>
      <div class="btn_show" @click="overview_visible = true"></div>
      <house-card :house-source="house_source" @close="handleCloseOverview"></house-card>
      <market-menu-list :show-market="show_market" @close="handleCloseMenu"></market-menu-list>
      <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>
      <overview-info :overview-visible="overview_visible"></overview-info>
    </div>
</template>

<script>
  import MarketMenuList from '../components/market-menu-list.vue';
  import searchHigh from '../../common/searchHigh.vue';
  import HouseCard from '../components/house-card.vue';
  import OverviewInfo from '../components/overview-info.vue';

    export default {
        name: "index",
        components: { MarketMenuList ,searchHigh, HouseCard ,OverviewInfo },
        data() {
            return {
              overview_visible:false,
              show_market: false,
              isHigh: false,
              searchData: {
                status: 'workOrder',
                keywords: 'keywords',
                data: [],
              },
              house_source: []
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
        },
        activated() {
        },
        watch: {},
        computed: {},
        methods: {
          handleCloseMenu() {
            this.show_market = false;
          },
          handleCloseSearch() {
            this.isHigh = false;
          },
          handleCloseOverview() {
            this.overview_visible = false;
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
