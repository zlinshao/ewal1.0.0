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
      <house-card :house-source="house_source"></house-card>
      <market-menu-list :show-market="show_market" @close="handleCloseMenu"></market-menu-list>
      <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>
    </div>
</template>

<script>
  import MarketMenuList from '../components/market-menu-list.vue';
  import searchHigh from '../../common/searchHigh.vue';
  import HouseCard from '../components/house-card.vue';

    export default {
        name: "index",
        components: { MarketMenuList ,searchHigh, HouseCard },
        data() {
            return {
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
          this.house_source.push({
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '已出租',
              notice: 0,
              mark: true
            },
            {
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 2,
              mark: false
            },
            {
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: true
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            }
            ,{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            }
            ,{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            },{
              address: '东方兰园12-304',
              type: '两室1厅1卫',
              info: '空置120天/剩余3月',
              price: '建议2600元/月 3月付',
              notice_type: '未出租',
              notice: 1,
              mark: false
            })
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
