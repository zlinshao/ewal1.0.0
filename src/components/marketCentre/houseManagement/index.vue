<template>
    <div id="houseManagement">
      <div>
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
        <house-card :house-source="house_source" @close="handleCloseOverview" @open="handleOpenCard"></house-card>
        <market-menu-list :show-market="show_market" @close="handleCloseMenu"></market-menu-list>
        <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>
        <overview-info :overview-visible="overview_visible" @open="overview_visible = true"></overview-info>
        <lj-dialog
          :visible="lj_visible"
          :size="lj_size"
          @close="handleCloseLjDialog">
          <div class="house_info">
            <div class="base_info flex">
              <div class="house_photo">
                <div class="big_img">
                  <img src="./swipe6.jpg" alt="">
                  <div class="sijiao"></div>
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
                <div class="easy_info">
                  <div class="title flex-center">
                    <div class="flex">
                      <span class="address">江南雅苑1-2-3</span>
                      <span class="mark"></span>
                    </div>
                    <div style="text-align: right">
                      <span class="look"></span>
                      <span class="status">未出租</span>
                    </div>
                  </div>
                  <div class="h_type">
                    <div class="flex info">
                      <span v-for="item in h_info">{{ item }}</span>
                    </div>
                    <div class="le_text">
                      <span>剩余时长：1年5月12天 当前空置12天 收房：2000/月</span>
                    </div>
                  </div>
                </div>
                <div class="deploy">
                  <h3>房屋配置</h3>
                  <div class="deploy_info flex">
                  <span v-for="item in deploy_info" :key="item.id" class="items-column">
                    <span class="flex-center">
                      <i :class="[item.icon]"></i>
                    </span>
                    <b>{{ item.txt }}{{ item.num }}</b>
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="table_info">
              <div class="info_type flex-center">
                <span v-for="item in house_type" :key="item.id">{{ item.val }}</span>
              </div>
              <div class="table_list scroll_bar">
                <el-table :data="table_data" height="250">
                  <el-table-column label="签约时间" prop="time"></el-table-column>
                  <el-table-column label="合同编号" prop="num"></el-table-column>
                  <el-table-column label="收放价格" prop="price"></el-table-column>
                  <el-table-column label="付款方式" prop="way"></el-table-column>
                  <el-table-column label="空置期" prop="kong"></el-table-column>
                  <el-table-column label="签约时长" prop="long"></el-table-column>
                  <el-table-column label="合同开始时间" prop="start_time"></el-table-column>
                  <el-table-column label="合同结束时间" prop="end_time"></el-table-column>
                  <el-table-column label="签约人" prop="people"></el-table-column>
                </el-table>
              </div>
              <div class="page">
                <el-pagination :total="1000" layout="total,prev,pager,next"></el-pagination>
              </div>
            </div>
          </div>
        </lj-dialog>
      </div>
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
              h_info: {
                a: '2室1厅1卫',
                b: '85㎡',
                c: '精装',
                d: '住宅',
                e: '朝南',
                f: '15/30'
              },
              deploy_info:  [
                {
                  id: 1,
                  icon: 'kongtiao',
                  txt: '空调',
                  num: 3
                },
                {
                  id: 2,
                  icon: 'bingxiang',
                  txt: '冰箱',
                  num: 1
                },
                {
                  id: 3,
                  icon: 'dianshi',
                  txt: '电视',
                  num: 1
                },
                {
                  id: 4,
                  icon: 'xiyiji',
                  txt: '洗衣机',
                  num: 1
                },
                {
                  id: 5,
                  icon: 'reshuiqi',
                  txt: '热水器',
                  num: 1
                },
                {
                  id: 6,
                  icon: 'weibolu',
                  txt: '微波炉',
                  num: 1
                },{
                  id: 7,
                  icon: 'shafa',
                  txt: '沙发',
                  num: 3
                },{
                  id: 8,
                  icon: 'yizi',
                  txt: '椅子',
                  num: 4
                },
                {
                  id: 9,
                  icon: 'yijia',
                  txt: '衣架',
                  num: 2
                },{
                  id: 10,
                  icon: 'ranqizao',
                  txt: '燃气灶',
                  num: 2
                },{
                  id: 11,
                  icon: 'kuandai',
                  txt: '宽带',
                  num: 1
                },{
                  id: 12,
                  icon: 'nuanqi',
                  txt: '暖气',
                  num: 2
                },{
                  id: 13,
                  icon: 'canzhuo',
                  txt: '餐桌',
                  num: 1
                },{
                  id: 14,
                  icon: 'yigui',
                  txt: '衣柜',
                  num: 1
                }
              ],
              house_type: [
                {
                  id: 1,
                  val: '小区已租房源'
                },
                {
                  id: 2,
                  val: '价格调整'
                },
                {
                  id: 3,
                  val: '跟进记录'
                },
                {
                  id: 4,
                  val: '家具补齐'
                },
                {
                  id: 5,
                  val: '物品搬移记录'
                },
                {
                  id: 6,
                  val: '收房合同'
                },
                {
                  id: 7,
                  val: '租房合同'
                },
                {
                  id: 8,
                  val: '报备管理'
                },
              ],
              table_data: [
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
                {id: 1,time: '2019-01-02',num: '12312412',price: '2000',way: '月付',kong: '22天',long: '3年',start_time: '2019-03-01',end_time: '2019-11-11',people: '冯宝宝'},
              ]
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
          this.lj_visible = false;
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
      > div {
        .header {
          span.set {
            @include houseManagementImg('szh.png','theme1');
          }
          span.search {
            @include houseManagementImg('search.png','theme1');
          }
        }
        .house_info {
          > div {

          }
          .base_info {
            border-bottom: 1px dashed #808080;
            > div {

            }
            .house_photo {
              .big_img {
                .sijiao {
                  @include houseManagementImg('sijiao.png','theme1');
                }
              }
              .small_img {
                .btn {
                  background-color: $color874;
                }
              }
            }
            .house_detail {
              .easy_info {
                .title {
                  > div {
                    .address {
                      font-family: 'jingDianXingShu';
                    }
                    .mark {
                      @include houseManagementImg('hs.png','theme1');
                    }
                    .look {
                      @include houseManagementImg('look.png','theme1');
                      background-size: contain;
                    }
                  }
                }
              }
              .deploy {
                .deploy_info {
                  > span {
                    > span {
                      @include radius(50%);
                      background-color: $color0F0;
                      i.kongtiao {
                        @include houseManagementImg('kongtiao.png','theme1');
                        background-size: 50%;
                      }
                      i.bingxiang {
                        @include houseManagementImg('bingxiang.png','theme1');
                        background-size: 40%;
                      }
                      i.dianshi {
                        @include houseManagementImg('dianshiji.png','theme1');
                        background-size: 40%;
                      }
                      i.xiyiji {
                        @include houseManagementImg('xiyiji.png','theme1');
                        background-size: 40%;
                      }
                      i.reshuiqi {
                        @include houseManagementImg('reshuiqi.png','theme1');
                        background-size: 60%;
                      }
                      i.youyanji {
                        @include houseManagementImg('youyanji.png','theme1');
                        background-size: 50%;
                      }
                      i.weibolu {
                        @include houseManagementImg('weibolu.png','theme1');
                        background-size: 50%;
                      }
                      i.shafa {
                        @include houseManagementImg('shafa.png','theme1');
                        background-size: 40%;
                      }
                      i.yizi {
                        @include houseManagementImg('yizi.png','theme1');
                        background-size: 40%;
                      }
                      i.yijia {
                        @include houseManagementImg('yijia.png','theme1');
                        background-size: 50%;
                      }
                      i.ranqizao {
                        @include houseManagementImg('ranqizao.png','theme1');
                        background-size: 50%;
                      }
                      i.kuandai {
                        @include houseManagementImg('kuandai.png','theme1');
                        background-size: 50%;
                      }
                      i.nuanqi {
                        @include houseManagementImg('nuanqi.png','theme1');
                        background-size: 40%;
                      }
                      i.canzhuo {
                        @include houseManagementImg('canzhuo.png','theme1');
                        background-size: 50%;
                      }
                      i.yigui {
                        @include houseManagementImg('yigui.png','theme1');
                        background-size: 40%;
                      }
                    }
                  }
                }
              }
            }
          }
          .table_info {
            > div {

            }
            .info_type {
              > span {
                color: $colorFDF;
                &:hover {
                  @include houseManagementImg('hongdi.png','theme1');
                  color: white;
                }
              }
            }
            .page {
              margin-top: 20px;
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
