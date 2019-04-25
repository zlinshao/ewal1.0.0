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

      <house-card :house-source="house_source" :info="house_params" @close="handleCloseOverview"
                  @open="handleOpenCardDetail"
                  @change="handleChangePage"></house-card>
      <market-menu-list :show-market="show_market" :show-shadow="show_shadow"
                        @close="handleCloseMenu"></market-menu-list>
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
                <div class="sijiao"></div>
                <img v-if="house_detail.house_detail && house_detail.house_detail.cover" :src="house_detail.house_detail.cover" data-magnify="" data-caption="图片查看器" :data-src="house_detail.house_detail && house_detail.house_detail.cover">
                <img v-else src="./swipe6.jpg" data-magnify="" data-caption="图片查看器" data-src="./swipe6.jgp">
              </div>
              <div class="small_img">
                <div v-if="house_detail.album_photo" class="img_container items-center" ref="img_contain"
                     :style="{'left': img_trams + '%'}">
                  <img data-magnify="" data-caption="图片查看器" :data-src="item.uri"
                       v-for="item in house_detail.album_photo" :src="item.uri" alt="" style="min-height: 80px">
                </div>
                <div v-else style="margin-top: 30px">暂无照片信息</div>
                <span class="btn left_btn" @click="handleTransLeft"><i class="el-icon-arrow-left"></i></span>
                <span class="btn right_btn" @click="handleTransRight"><i class="el-icon-arrow-right"></i></span>
              </div>
            </div>
            <div class="house_detail">
              <div class="easy_info">
                <div class="title flex-center">
                  <div class="flex">
                    <span class="address">{{ current_house.name }}</span>
                    <span class="mark"></span>
                  </div>
                  <div style="text-align: right">
                    <span class="look" @click="handleLookInfo"></span>
                    <span class="status">{{ house_detail.house_status_name }}</span>
                  </div>
                </div>
                <div class="h_type">
                  <div class="flex info">
                    <span>{{ house_detail.hk }}</span>
                    <span>{{ house_detail.area }}</span>
                    <span>{{ house_detail.decorate }}</span>
                    <span>{{ house_detail.property_type && house_detail.property_type.name }}</span>
                    <span>{{ house_detail.direction && house_detail.direction.name }}</span>
                    <span v-if="house_detail.floor">{{ house_detail.floor.this }}/{{ house_detail.floor.all }}</span>
                  </div>
                  <div class="le_text">
                    <span>空置{{ current_house.warning_current_days }}天 / 剩余 {{ current_house.month }}月 建议{{ current_house.suggest_price }}/月 {{ current_house.month }}月付</span>
                  </div>
                </div>
              </div>
              <div class="deploy">
                <h3>房屋配置</h3>
                <div class="deploy_info flex">
                  <span v-for="item in deploy_info" :key="item.id" class="items-column"
                        :class="{'deploy_none': parseInt(item.num) < 1}">
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
              <span @click="handleCheckModule(item)" v-for="item in house_type" :key="item.id"
                    :class="{'current-change': item.id === current_house_type}">{{ item.val }}</span>
            </div>
            <div class="table_list scroll_bar">
              <el-table :data="house_resource" height="250" v-show="current_house_type === 1">
                <el-table-column label="房屋名称" prop="name" align="center"></el-table-column>
                <el-table-column label="房屋描述" prop="hk" align="center"></el-table-column>
                <el-table-column label="类型" prop="decorate" align="center"></el-table-column>
                <el-table-column label="成交月单价" prop="month_price" align="center"></el-table-column>
              </el-table>
              <el-table :data="price_setting" height="250" v-show="current_house_type === 2">
                <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
                <el-table-column label="调整前价格" prop="before_price" align="center"></el-table-column>
                <el-table-column label="调整后价格" prop="price" align="center"></el-table-column>
                <el-table-column label="调整人" prop="creator_name" align="center"></el-table-column>
                <el-table-column label="价格类型" prop="type_name" align="center"></el-table-column>
              </el-table>
              <el-table :data="price_setting" height="250" v-show="current_house_type === 3">
                <el-table-column label="跟进时间" prop="created_at" align="center"></el-table-column>
                <el-table-column label="备注" prop="follow_content" align="center"></el-table-column>
                <el-table-column label="预警调整" prop="warning_name" align="center"></el-table-column>
                <el-table-column label="照片" prop="album_photo" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-picture" @click="handleOpenLookPic(scope.row)"></i>
                  </template>
                </el-table-column>
                <el-table-column label="跟进人" prop="follow_name" align="center"></el-table-column>
              </el-table>
              <el-table :data="furniture_list" height="250" v-show="current_house_type === 4">
                <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
                <el-table-column label="描述" prop="description" align="center"></el-table-column>
                <el-table-column label="补齐物品" prop="follow_content" align="center"></el-table-column>
                <el-table-column label="状态" prop="status_name" align="center"></el-table-column>
                <el-table-column label="跟进人" prop="follow_user" align="center"></el-table-column>
              </el-table>
              <el-table :data="contract_list" height="250" v-show="current_house_type === 6 || current_house_type === 7">
                <el-table-column label="签约时间" prop="sign_at" align="center"></el-table-column>
                <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
                <el-table-column label="地址" prop="house_name" align="center"></el-table-column>
                <el-table-column label="合同性质" prop="type" align="center"></el-table-column>
                <!--<el-table-column label="所属公司" prop="" align="center"></el-table-column>-->
                <el-table-column label="收房价格" prop="month_price" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
                <span v-for="(item,index) in scope.row.month_price">
                  {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
                </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="付款方式" prop="pay_way" align="center"></el-table-column>
                <el-table-column label="开单人" prop="sign_user" align="center"></el-table-column>
                <el-table-column label="负责人" prop="org_leader" align="center"></el-table-column>
                <el-table-column label="部门" prop="sign_org" align="center"></el-table-column>
                <el-table-column label="审核状态" prop="verify_status.name" align="center"></el-table-column>
              </el-table>
            </div>
            <div class="page">
              <el-pagination
                :total="table_params.count"
                :current-page="table_params.page"
                :page-size="table_params.limit"
                @current-change="handleChangePageDetail"
                layout="total,prev,pager,next"
              ></el-pagination>
            </div>
          </div>
        </div>
      </lj-dialog>

      <!--带看-->
      <lj-dialog
        :visible="look_visible"
        :size="{width: 700 + 'px',height: '800' + 'px'}"
        @close="look_visible = false">
        <div class="look_info">
          <h3>查看带看记录</h3>
          <div class="flex" style="margin-bottom: 30px">
              <span class="items-column">
                <span class="all">{{ all_count }}</span>
                <span class="txt">总带看次数</span>
              </span>
            <span class="items-column">
                <span class="current">{{ current_count }}</span>
                <span class="txt">本期带看次数</span>
              </span>
          </div>
          <el-table :data="look_data" height="500px" style="width: 100%">
            <el-table-column label="带看时间" prop="created_at" align="center"></el-table-column>
            <el-table-column label="带看人" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.take_user">
                  <span v-for="(item,idx) in scope.row.take_user">{{ item }}<a v-if="idx !== scope.row.take_user.length - 1">,</a></span>
                </div>
                <div v-else>暂无</div>
              </template>
            </el-table-column>
            <el-table-column label="带看图片" align="center">
              <template slot-scope="scope">
                <div class="flex" v-if="scope.row.album_photo && scope.row.album_photo.length > 0">
                  <img :src="item.uri" data-magnify="" data-caption="图片查看器" :data-src="item.uri" style="width: 60px;height: 60px;margin-right: 5px" alt="" v-for="item in scope.row.album_photo">
                </div>
                <div v-else>暂无</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              :total="all_count"
              :current-page="look_params.page"
              :page-size="look_params.limit"
              layout="total,prev,pager,next"
              @current-change="handleChangeLookPage"
            ></el-pagination>
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
                  <el-input placeholder="请选择" v-model="set_price_form.bottom_name"
                            @focus="handleOpenChooseHouse('bottom')"></el-input>
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
                  <el-input placeholder="请选择" v-model="set_price_form.suggest_name"
                            @focus="handleOpenChooseHouse('suggest')"></el-input>
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

      <!--看图片-->
      <lj-dialog
        :visible="look_pic_visible"
        :size="{width: 400 + 'px',height: 300 + 'px'}"
        @close="look_pic_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>查看图片</h3>
          </div>
          <div class="dialog_main">
            <div class="flex" v-if="pic_row && pic_row.album_photo && pic_row.album_photo.length > 0">
              <img :src="item.uri" :data-src="item.uri" :key="item.id" data-magnify="" data-caption="图片查看器" style="width: 70px;height: 70px;margin: 0 5px" alt="" v-for="item in pic_row.album_photo">
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" @click="look_pic_visible = false">确定</el-button>
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
  import { houseManagementSearch } from '../../../assets/js/allSearchData.js';

  export default {
    name: "index",
    components: {MarketMenuList, searchHigh, HouseCard, OverviewInfo, LjDialog, HouseFilter},
    data() {
      return {
        houseManagementSearch,
        //房屋详情
        house_detail: '',
        current_house: '',

        house_resource: [],//已出租房源
        price_setting: [], //价格调整

        market_server: globalConfig.market_server,
        //设置
        set_price_visible: false,
        set_price_form: {
          bottom_price: '',
          bottom_id: [],
          suggest_price: '',
          suggest_id: [],
          bottom_name: '',
          suggest_name: '',
          bottom_type: '',
          suggest_type: ''
        },

        //搜索房源visible
        house_filter_visible: false,

        look_visible: false,
        lj_visible: false,
        lj_size: '',
        overview_visible: false,
        overview_info: {
          data1: {},
          data2: [],
          data3: []
        },
        show_market: false,
        show_shadow: false,
        isHigh: false,
        searchData: {},

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
        //房屋配置
        deploy_info: [
          {
            id: 1,
            icon: 'kongtiao',
            txt: '空调',
            num: 3,
            key: 'air_condition'
          },
          {
            id: 2,
            icon: 'bingxiang',
            txt: '冰箱',
            num: 1,
            key: 'fridge'
          },
          {
            id: 3,
            icon: 'dianshi',
            txt: '电视',
            num: 1,
            key: 'television'
          },
          {
            id: 4,
            icon: 'xiyiji',
            txt: '洗衣机',
            num: 1,
            key: 'wash_machine'
          },
          {
            id: 5,
            icon: 'reshuiqi',
            txt: '热水器',
            num: 1,
            key: 'water_heater'
          },
          {
            id: 6,
            icon: 'weibolu',
            txt: '微波炉',
            num: 1,
            key: 'microwave'
          }, {
            id: 7,
            icon: 'shafa',
            txt: '沙发',
            num: 3,
            key: 'sofa'
          }, {
            id: 8,
            icon: 'yizi',
            txt: '椅子',
            num: 4,
            key: 'chair'
          },
          {
            id: 9,
            icon: 'yijia',
            txt: '衣架',
            num: 2,
            key: 'clothe_rack'
          }, {
            id: 10,
            icon: 'ranqizao',
            txt: '燃气灶',
            num: 2,
            key: 'gas_stove'
          },
          // {
          //   id: 11,
          //   icon: 'kuandai',
          //   txt: '宽带',
          //   num: 1,
          //   key: ''
          // },
          {
            id: 12,
            icon: 'nuanqi',
            txt: '暖气',
            num: 2,
            key: 'heater'
          }, {
            id: 13,
            icon: 'canzhuo',
            txt: '餐桌',
            num: 1,
            key: 'dining_table'
          }, {
            id: 14,
            icon: 'yigui',
            txt: '衣柜',
            num: 1,
            key: 'wardrobe'
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
          // {
          //   id: 5,
          //   val: '物品搬移记录'
          // },
          {
            id: 6,
            val: '收房合同'
          },
          {
            id: 7,
            val: '租房合同'
          },
          // {
          //   id: 8,
          //   val: '报备管理'
          // },
        ],
        current_house_type: 1,
        table_params: {
          page: 1,
          limit: 15,
          count: 0,
        },
        look_params: {
          page: 1,
          limit: 15
        },
        look_data: [],
        all_count: 0,
        current_count: 0,

        currentSelType: '',
        contract_list: [],
        pic_row: '',
        look_pic_visible: '',

        furniture_list: [],

      }
    },
    mounted() {
      this.getHouseResource();
      this.house_source = [];
    },
    watch: {},
    computed: {},
    methods: {
      handleChangeLookPage(page) {
        this.look_params.page = page;
        this.handleLookInfo();
      },
      handleLookInfo() {
        console.log(this.current_house);
        this.$http.get(this.market_server + 'v1.0/market/task/houseTask',{
          house_id: 4,
          ...this.look_params
        }).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.look_data = res.data.data;
            this.all_count = res.data.all_count;
            this.current_count = res.data.current_count;
          }else {
            this.look_data = [];
            this.all_count = 0;
            this.current_count = 0;
          }
        });
        this.look_visible = true
      },
      handleOpenLookPic(row) {
        this.pic_row = row;
        this.look_pic_visible = true;
      },
      handleChangePageDetail(page) {
        this.table_params.page = page;
      },
      getDetailTableList(url) {
        this.$http.get(this.market_server + url, this.table_params).then(res => {
          if (res.code === 200) {
            this.house_resource = res.data.data;
            this.table_params.count = res.data.count;
          } else {
            this.house_resource = [];
            this.table_params.count = 0;
          }
        })
      },
      getContractList(house_id,contract_type) {
        this.$http.get(this.market_server + 'v1.0/market/contract',{
          ...this.table_params,
          contract_type,
          house_id
        }).then(res => {
          if (res.code === 200) {
            this.contract_list = res.data.data;
            this.table_params.count = res.data.count;
          } else {
            this.contract_list = [];
            this.table_params.count = 0;
          }
        })
      },
      getSettingPrice(id,url) {
        this.$http.get(this.market_server + url,{
          id,
          ...this.table_params
        }).then(res => {
          if (res.code === 200) {
            this.price_setting = res.data.data;
            this.table_params.count = res.data.all_count;
          } else {
            this.price_setting = [];
            this.table_params.count = 0;
          }
        })
      },
      //家具补齐
      handlePolishFurniture(id){
          this.$http.get(this.market_server + 'v1.0/market/task/getTask',{
            house_id: 4,
            task_type: 10,
            ...this.table_params
          }).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.furniture_list = res.data.data;
              this.table_params.count = res.data.count;
            }else {
              this.furniture_list = [];
              this.table_params.count = 0;
            }
          })
      },
      //切换列表信息
      handleCheckModule(item) {
        this.table_params.limit = 15;
        this.table_params.page = 1;
        this.current_house_type = item.id;
        var url = '';
        switch (item.id) {
          case 1:
            url = `v1.0/market/house/houseVillage/${this.current_house.id}`;
            this.getDetailTableList(url);
            break;
          case 6:
            this.getContractList(this.current_house.id,1);
            break;
          case 7:
            this.getContractList(this.current_house.id,2);
            break;
          case 2:
            url = 'v1.0/market/house/getHouseChPrice';
            this.getSettingPrice(this.current_house.id,url);
            break;
          case 3:
            url = 'v1.0/market/house/getFollowRecord';
            this.getSettingPrice(this.current_house.id,url);
            break;
          case 4:
            this.handlePolishFurniture(this.current_house.id);
            break;

        }
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
          suggest_name: '',
          bottom_type: '',
          suggest_type: ''
        };
        this.set_price_visible = false;
      },
      handleSubmitSetPrice() {
        this.$http.post(this.market_server + '/v1.0/market/house/houseBottSuggPrice', this.set_price_form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.message
            });
            this.handleCancelSetPrice();
            this.getHouseResource();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.message
            })
          }
        })
      },
      //确定选择房源
      handleGetHouseResource(house, type) {
        if (house !=='close') {
          if (house) {
            if (this.currentSelType === 'bottom') {
              this.set_price_form.bottom_name = '';
              this.set_price_form.bottom_id = [];
              house.map(item => {
                this.set_price_form.bottom_name += item.house_name + ',';
                if (type === 'house') {
                  this.set_price_form.bottom_type = 1;
                  this.set_price_form.bottom_id.push(item.house_id);
                } else {
                  this.set_price_form.bottom_type = 2;
                  this.set_price_form.bottom_id.push(item.village_id);
                }
              });
              this.set_price_form.bottom_name = this.set_price_form.bottom_name.substring(0, this.set_price_form.bottom_name.length - 1);
            } else {
              this.set_price_form.suggest_name = '';
              this.set_price_form.suggest_id = [];
              house.map(item => {
                this.set_price_form.suggest_name += item.house_name;
                if (type === 'house') {
                  this.set_price_form.suggest_type = 1;
                  this.set_price_form.suggest_id.push(item.house_id);
                } else {
                  this.set_price_form.suggest_type = 2;
                  this.set_price_form.suggest_id.push(item.village_id);
                }
              });
              this.set_price_form.suggest_name = this.set_price_form.suggest_name.substr(0, this.set_price_form.suggest_name.length - 1);
            }
          }
        }
        this.house_filter_visible = false;
      },
      //打开搜索房屋
      handleOpenChooseHouse(type) {
        this.currentSelType = type;
        this.house_filter_visible = true;
      },
      //打开高级设置
      handleOpenHighSearch() {
        this.searchData = this.houseManagementSearch;
        this.isHigh = true;
      },
      //关闭设置
      handleCloseSetHouse() {
        this.set_price_visible = false;
      },
      //获取房源列表
      getHouseResource() {
        this.$http.get(this.market_server + 'v1.0/market/house', this.house_params).then(res => {
          if (res.code === 200) {
            this.house_source = res.data.data;
            this.house_params.count = res.data.all_count;
          } else {
            this.house_source = [];
            this.house_params.count = 0;
          }
        })
      },
      handleOpenCardDetail(item) {
        this.current_house = item;
          this.$http.get(this.market_server + `/v1.0/market/house/detail/${item.id}`).then(res => {
          if (res.code === 200) {
            this.house_detail = res.data;
            console.log(this.house_detail);
            if (this.house_detail.house_goods) {
              for (var item of this.deploy_info) {
                item.num = this.house_detail.house_goods[item.key] ? this.house_detail.house_goods[item.key] : 0;
              }
            } else {
              for (var item of this.deploy_info) {
                item.num = 0;
              }
            }
            this.handleCheckModule(this.house_type[this.current_house_type - 1]);
            this.lj_size = {
              width: 1220 + 'px',
              height: 800 + 'px'
            };
            this.lj_visible = true;
          } else {
            this.house_detail = '';
          }
        });
      },
      handleTransLeft() {
        var keys = Object.keys(this.house_detail.album_photo);
        var offset = (keys.length - 4) * 120 - 80;
        if (this.$refs['img_contain'].offsetLeft > -offset) {
          this.img_trams -= 10;
        }
      },
      handleTransRight() {
        if (this.img_trams < 0) {
          this.img_trams += 10;
        }
      },
      handleCloseMenu() {
        this.show_market = false;
        this.show_shadow = false;
      },
      handleCloseSearch(search) {
        if (search !== 'close') {
          this.house_params = Object.assign({}, this.house_params, search);
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
            @include houseManagementImg('szh.png', 'theme1');
          }
          span.search {
            @include houseManagementImg('search.png', 'theme1');
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
                  @include houseManagementImg('sijiao.png', 'theme1');
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
                      @include houseManagementImg('hs.png', 'theme1');
                    }
                    .look {
                      @include houseManagementImg('look.png', 'theme1');
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
                        @include houseManagementImg('kongtiao.png', 'theme1');
                        background-size: 50%;
                      }
                      i.bingxiang {
                        @include houseManagementImg('bingxiang.png', 'theme1');
                        background-size: 40%;
                      }
                      i.dianshi {
                        @include houseManagementImg('dianshiji.png', 'theme1');
                        background-size: 40%;
                      }
                      i.xiyiji {
                        @include houseManagementImg('xiyiji.png', 'theme1');
                        background-size: 40%;
                      }
                      i.reshuiqi {
                        @include houseManagementImg('reshuiqi.png', 'theme1');
                        background-size: 60%;
                      }
                      i.youyanji {
                        @include houseManagementImg('youyanji.png', 'theme1');
                        background-size: 50%;
                      }
                      i.weibolu {
                        @include houseManagementImg('weibolu.png', 'theme1');
                        background-size: 50%;
                      }
                      i.shafa {
                        @include houseManagementImg('shafa.png', 'theme1');
                        background-size: 40%;
                      }
                      i.yizi {
                        @include houseManagementImg('yizi.png', 'theme1');
                        background-size: 40%;
                      }
                      i.yijia {
                        @include houseManagementImg('yijia.png', 'theme1');
                        background-size: 50%;
                      }
                      i.ranqizao {
                        @include houseManagementImg('ranqizao.png', 'theme1');
                        background-size: 50%;
                      }
                      i.kuandai {
                        @include houseManagementImg('kuandai.png', 'theme1');
                        background-size: 50%;
                      }
                      i.nuanqi {
                        @include houseManagementImg('nuanqi.png', 'theme1');
                        background-size: 40%;
                      }
                      i.canzhuo {
                        @include houseManagementImg('canzhuo.png', 'theme1');
                        background-size: 50%;
                      }
                      i.yigui {
                        @include houseManagementImg('yigui.png', 'theme1');
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
              }
              .current-change {
                @include houseManagementImg('hongdi.png', 'theme1');
                color: white;
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
        .price_min_container, .suggest_price_container {
          > div {
            &:first-child {
              @include houseManagementImg('hongdi.png', 'theme1');
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
