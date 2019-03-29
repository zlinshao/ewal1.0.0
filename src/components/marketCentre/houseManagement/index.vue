<template>
    <div id="houseManagement">
      <div>
        <div class="header items-bet">
          <div class="items-center">
            <span class="btn" @click="show_market = true;show_shadow = true">...</span>
            <span class="title">房源管理</span>
          </div>
          <div class="items-center">
            <span class="set" @click="set_price_visible = true"></span>
            <span class="search" @click="handleOpenHighSearch"></span>
          </div>
        </div>

        <house-card :house-source="house_source" :info="house_params" @close="handleCloseOverview" @open="handleOpenCard" @change="handleChangePage"></house-card>
        <market-menu-list :show-market="show_market" :show-shadow="show_shadow" @close="handleCloseMenu"></market-menu-list>
        <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>

        <overview-info :overview-visible="overview_visible" @open="overview_visible = true"></overview-info>

        <!--房屋详情-->
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
                      <span class="look" @click="look_visible = true"></span>
                      <span class="status">未出租</span>
                    </div>
                  </div>
                  <div class="h_type">
                    <div class="flex info">
                      <span v-for="item in h_info" :key="item.id">{{ item }}</span>
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

        <!--带看-->
        <lj-dialog
          :visible="look_visible"
          :size="{width: 600 + 'px',height: '800' + 'px'}"
          @close="look_visible = false">
          <div class="look_info">
            <h3>查看带看记录</h3>
            <div class="flex" style="margin-bottom: 30px">
              <span class="items-column">
                <span class="all">34</span>
                <span class="txt">总带看次数</span>
              </span>
              <span class="items-column">
                <span class="current">2</span>
                <span class="txt">本期带看次数</span>
              </span>
            </div>
            <el-table :data="look_data">
              <el-table-column label="带看时间" prop="look_time" align="center"></el-table-column>
              <el-table-column label="带看人" prop="look_man" align="center"></el-table-column>
            </el-table>
            <div class="page">
              <el-pagination :total="100" layout="total,prev,pager,next"></el-pagination>
            </div>
          </div>
        </lj-dialog>

        <!--搜索房源-->
        <HouseFilter :visible="house_filter_visible" @close="handleGetHouseResource"></HouseFilter>

        <!--设置-->
        <lj-dialog
          :visible="set_price_visible"
          :size="{width: 450 + 'px',height: 550 + 'px'}"
          @close="handleCloseSetHouse"
        >
          <div class="dialog_container borderNone">
            <div class="dialog_header">
              <h3>设置</h3>
            </div>
            <div class="dialog_main">
              <div class="price_min_container">
                <div>最低价格</div>
                <el-form :model="set_price_form" label-width="80px">
                  <el-form-item label="地址">
                    <el-input placeholder="请选择" v-model="set_price_form.bottom_name" @focus="handleOpenChooseHouse('bottom')"></el-input>
                  </el-form-item>
                  <el-form-item label="最低价">
                    <el-input placeholder="请输入" v-model="set_price_form.bottom_price"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="suggest_price_container">
                <div>建议价格</div>
                <el-form :model="set_price_form" label-width="80px">
                  <el-form-item label="地址">
                    <el-input placeholder="请选择" v-model="set_price_form.suggest_name" @focus="handleOpenChooseHouse('suggest')"></el-input>
                  </el-form-item>
                  <el-form-item label="最低价">
                    <el-input placeholder="请输入" v-model="set_price_form.suggest_price"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="dialog_footer">
              <el-button size="mini" type="danger" @click="handleSubmitSetPrice">确定</el-button>
              <el-button size="mini" type="info" @click="handleCancelSetPrice">取消</el-button>
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
  import HouseFilter from '../components/house-filter.vue';

    export default {
        name: "index",
        components: { MarketMenuList ,searchHigh, HouseCard ,OverviewInfo,LjDialog ,HouseFilter},
        data() {
            return {
              market_server: globalConfig.market_server,
              //设置
              set_price_visible: false,
              set_price_form: {
                bottom_price: '',
                bottom_id: [],
                suggest_price: '',
                suggest_id: [],
                bottom_name: '',
                suggest_name: ''
              },

              //搜索房源visible
              house_filter_visible: false,

              look_visible:false,
              lj_visible: false,
              lj_size: '',
              overview_visible:false,
              overview_info: {
                data1: {},
                data2: [],
                data3: []
              },
              show_market: false,
              show_shadow: false,
              isHigh: false,
              searchData: {
                status: 'houseManagement',
                keywords: 'search',
                data: [],
              },

              house_source: [], //房源列表
              house_params: {
                search: '',
                page: 1,
                limit: 20,
                count: 0,
                status: [],
                room: [],
                warningStatus: [],
                decoration: [],
                area: [],
                suggestPrice: [],
                quality: [],
                house_identity: []
              },

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
              ],
              look_data: [
                {
                  id: 1,
                  look_time: '2019-01-01',
                  look_man: '冯宝宝'
                },
                {
                  id: 2,
                  look_time: '2019-01-01',
                  look_man: '冯宝宝'
                },
                {
                  id: 3,
                  look_time: '2019-01-01',
                  look_man: '冯宝宝'
                },
                {
                  id: 4,
                  look_time: '2019-01-01',
                  look_man: '冯宝宝'
                },
                {
                  id: 5,
                  look_time: '2019-01-01',
                  look_man: '冯宝宝'
                }
              ],

              currentSelType: '',
            }
        },
        mounted() {
          this.getHouseResource();
          this.house_source = [];
          this.overview_visible = true;
        },
        watch: {},
        computed: {},
        methods: {
          getOverviewInfo() {

          },
          handleChangePage(page) {
            this.house_params.page = page;
            this.getHouseResource();
          },
          handleCancelSetPrice() {
            this.set_price_form = {
              bottom_price: '',
              bottom_id: [],
              suggest_price: '',
              suggest_id: [],
              suggest_name: ''
            };
            this.set_price_visible = false;
          },
          handleSubmitSetPrice() {
            this.$http.post(this.market_server + '/v1.0/market/house/houseBottSuggPrice',this.set_price_form).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$LjNotify('success',{
                  title: '成功',
                  message: res.message
                });
                this.handleCancelSetPrice();
                this.getHouseResource();
              } else {
                this.$LjNotify('warning',{
                  title: '失败',
                  message: res.message
                })
              }
            })
          },
          //确定选择房源
          handleGetHouseResource(house) {
            if (house) {
              if (this.currentSelType === 'bottom') {
                this.set_price_form.bottom_name = '';
                this.set_price_form.bottom_id = [];
                house.map(item => {
                  this.set_price_form.bottom_name += item.house_name + ',';
                  this.set_price_form.bottom_id.push(item.house_id);
                });
                this.set_price_form.bottom_name = this.set_price_form.bottom_name.substring(0,this.set_price_form.bottom_name.length - 1);
              } else {
                this.set_price_form.suggest_name = '';
                this.set_price_form.suggest_id = [];
                house.map(item => {
                  this.set_price_form.suggest_name += item.house_name;
                  this.set_price_form.suggest_id.push(item.house_id);
                });
                this.set_price_form.suggest_name = this.set_price_form.suggest_name.substr(0,this.set_price_form.suggest_name.length - 1);
              }
            }
            this.house_filter_visible = false;
          },
          //打开搜索房屋
          handleOpenChooseHouse(type){
            this.currentSelType = type;
            this.house_filter_visible = true;
          },
          //打开高级设置
          handleOpenHighSearch() {
            this.searchData.data = [
              {
                keyType: 'check',
                title: '房屋状态',
                keyName: 'status',
                dataType: [],
                value: [
                  {
                    id: 1,
                    title: '未出租',
                  },
                  {
                    id: 2,
                    title: '预订',
                  },
                  {
                    id: 3,
                    title: '已出租',
                  },
                  {
                    id: 4,
                    title: '已完成',
                  }
                ],
              },
              {
                keyType: 'check',
                title: '户型',
                keyName: 'room',
                dataType: [],
                value: [
                  {
                    id: 1,
                    title: '一室',
                  },
                  {
                    id: 2,
                    title: '两室',
                  },
                  {
                    id: 3,
                    title: '三室',
                  },
                  {
                    id: 4,
                    title: '四室',
                  },
                  {
                    id: 5,
                    title: '其他',
                  }
                ],
              },
              {
                keyType: 'check',
                title: '预警状态',
                keyName: 'warning_status',
                dataType: [],
                value: [
                  {
                    id: 1,
                    title: '正常',
                  },
                  {
                    id: 2,
                    title: '黄色预警',
                  },
                  {
                    id: 3,
                    title: '橙色预警',
                  },
                  {
                    id: 4,
                    title: '红色预警',
                  }
                ],
              },
              {
                keyType: 'check',
                title: '建议价格',
                keyName: 'suggest_price',
                dataType: [],
                value: [
                  {
                    id: 1,
                    title: '2000以下',
                  },
                  {
                    id: 2,
                    title: '2000~3000',
                  },
                  {
                    id: 3,
                    title: '3000~4000',
                  },
                  {
                    id: 4,
                    title: '4000以上',
                  }
                ],
              },
              {
                keyType: 'check',
                title: '装修',
                keyName: 'decoration',
                dataType: [],
                value: [
                  {
                    id: 405,
                    title: '精装',
                  },
                  {
                    id: 406,
                    title: '简装',
                  },
                  {
                    id: 407,
                    title: '豪装',
                  },
                  {
                    id: 408,
                    title: '毛坯',
                  }
                ],
              },
              {
                keyType: 'check',
                title: '面积',
                keyName: 'area',
                dataType: [],
                value: [
                  {
                    id: 1,
                    title: '100以下',
                  },
                  {
                    id: 2,
                    title: '100~150',
                  },
                  {
                    id: 3,
                    title: '150以上',
                  },
                ],
              },
              {
                keyType: 'check',
                title: '用途',
                keyName: 'house_identity',
                dataType: [],
                value: [
                  {
                    id: 419,
                    title: '住宅',
                  },
                  {
                    id: 420,
                    title: '公寓',
                  },
                  {
                    id: 421,
                    title: '商用两住',
                  },
                  {
                    id: 422,
                    title: '别墅'
                  },
                  {
                    id: 423,
                    title: '平房'
                  },
                  {
                    id: 424,
                    title: '其他'
                  }
                ],
              }
            ];
            this.isHigh = true;
          },
          //关闭设置
          handleCloseSetHouse() {
            this.set_price_visible = false;
          },
          //获取房源列表
          getHouseResource() {
            this.$http.get(this.market_server + 'v1.0/market/house',this.house_params).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.house_source = res.data.data;
                this.house_params.count = res.data.all_count;
              } else {
                this.house_source = [];
                this.house_params.count = 0;
              }
            })
          },
          handleOpenCard(item) {
            this.lj_size = {
              width: 1220 + 'px',
              height: 800 + 'px'
            };
            this.lj_visible = true;
          },
          handleTransLeft() {
            console.log(this.$refs['img_contain']);
            this.img_trams -= 20;
          },
          handleTransRight() {
            console.log(this.$refs['img_contain']);
            if (this.img_trams < 0) {
              this.img_trams += 20;
            }
          },
          handleCloseMenu() {
            this.show_market = false;
            this.show_shadow = false;
          },
          handleCloseSearch(search) {
            if (search !== 'close') {
              this.house_params = Object.assign({},this.house_params,search);
              this.getHouseResource();
            }
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
        .look_info {
          > div {
            > span {
              width: 100%;
            }
          }
          .all {
            color: $colorDFF;
            font-size: 34px;
          }
          .current {
            color: $colorC00;
            font-size: 34px;
          }
          .txt {
            font-size: 14px;
          }
        }
        .price_min_container,.suggest_price_container {
          > div {
            &:first-child {
              @include houseManagementImg('hongdi.png','theme1');
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
