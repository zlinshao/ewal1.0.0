<template>
  <div id="houseManagement">
    <div>
      <div class="header items-bet">
        <div class="items-center">
          <span class="btn" @click="show_market = true">...</span>
          <span class="title">房源管理</span>
        </div>
        <div class="items-center">
          <span v-if="$storage.get('VALIDATE_PERMISSION')['House-Center-Operate']" class="set" @click="set_price_visible = true"></span>
          <span class="search" @click="handleOpenHighSearch"></span>
        </div>
      </div>

      <house-card :house-source="house_source" :info="house_params" @close="handleCloseOverview"
                  @open="handleOpenCardDetail"
                  @change="handleChangePage"></house-card>
      <searchHigh :module="isHigh" :show-data="searchData" @close="handleCloseSearch"></searchHigh>

      <overview-info :overview-visible="overview_visible" @open="overview_visible = true"></overview-info>

      <!--房屋详情-->
      <lj-dialog
        :visible.sync="lj_visible"
        :size="lj_size"
        @close="handleCloseLjDialog">
        <div class="house_info">
          <div class="base_info flex">
            <div class="house_photo">
              <div class="big_img">
                <div class="sijiao"></div>
                <div class="history-pic" @click="getHistoryPicList">
                  <a></a>
                </div>
                <img v-if="house_detail.house_detail && house_detail.house_detail.cover" :src="house_detail.house_detail.cover" data-magnify="" data-caption="图片查看器" :data-src="house_detail.house_detail && house_detail.house_detail.cover">
                <img v-else src="./swipe6.jpg" data-magnify="" data-caption="图片查看器" data-src="./swipe6.jgp">
              </div>
              <div class="small-img">

                <lj-upload :disabled="true" style="position: absolute" :style="{'left': img_trams + 'px'}" :size="{width:'100px',height:'50px'}" :download="false" :view-file="house_detail.album_photo"></lj-upload>

                <!--<div v-if="house_detail.album_photo" class="img-container items-center" ref="img_contain"
                     :style="{'left': img_trams + '%'}">
                  <img data-magnify="" data-caption="图片查看器" :data-src="item.uri"
                       v-for="item in house_detail.album_photo" :src="item.uri" alt="" style="min-height: 80px">
                </div>
                <div v-else style="margin-top: 30px">暂无照片信息</div>-->
                <span class="btn left-btn" @click="handleTransLeft"><i class="el-icon-arrow-left"></i></span>
                <span class="btn right-btn" @click="handleTransRight"><i class="el-icon-arrow-right"></i></span>
              </div>
            </div>
            <div class="house_detail">
              <div class="easy_info">
                <div class="title flex-center">
                  <div class="flex">
                    <span class="address">{{ current_house.name }}</span>
                    <span :class="['noticeIcon_' + current_house.warning_status]" ></span>
                     <!-- <span class="noticeIcon_2"></span>
                     <span class="mark"></span> -->
                  </div>
                  <div style="text-align: right">
                    <!-- <span class="look" @click="handleLookInfo"></span> -->
                    <span class="status">{{ house_detail.house_status_name }}</span>
                  </div>
                </div>
                <div class="h_type">
                  <div class="flex info">
                    <span>{{ house_detail.hk }}</span>
                    <span>{{ house_detail.area }}</span>
                    <span>{{ house_detail.decorate }}</span>
                    <span>{{ house_detail.house_identity }}</span>
                    <span>{{ house_detail.house_toward }}</span>
                    <span v-if="house_detail.floor">{{ house_detail.floor.this }}/{{ house_detail.floor.all }}</span>
                  </div>
                  <div class="le_text">
                    <span>空置{{ current_house.warning_current_days }}天 / 剩余 {{ current_house.month }}月 建议{{ current_house.suggest_price }}/月 {{ current_house.month }}月付</span>
                  </div>
                </div>
              </div>
              <div class="deploy">
                <h3>房屋配置</h3>
                <div class="deploy-info flex">
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
          <div class="table-info">
            <div class="info-type flex-center">
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
            <div v-show="current_house_type === 6 || current_house_type === 7">
              <el-table :data="contract_list" height="250"  @cell-click="tableClickRowContract" >
                <el-table-column label="签约时间" prop="sign_at" align="center">
                    <template slot-scope="scope">
                      <el-tooltip :content="scope.row.sign_at" placement="bottom-start" :visible-arrow="false">
                        <div>{{scope.row.sign_at}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="合同编号" prop="contract_number" align="center">
                    <template slot-scope="scope">
                      <el-tooltip :content="scope.row.contract_number" placement="bottom-start" :visible-arrow="false">
                        <div>{{scope.row.contract_number}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="地址" prop="house_name" align="center">
                  <template slot-scope="scope">
                      <el-tooltip :content="scope.row.house_name" placement="bottom-start" :visible-arrow="false">
                        <div>{{scope.row.house_name}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
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
                <el-table-column label="部门" prop="sign_org" align="center">
                  <template slot-scope="scope">
                    <el-tooltip :content="scope.row.sign_org" placement="bottom-start" :visible-arrow="false">
                      <div>{{scope.row.sign_org}}</div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="verify_status.name" align="center"></el-table-column>
              </el-table>
              <el-table :data="furniture_list" height="250" v-show="current_house_type === 8">
                <el-table-column label="房屋户型" prop="created_at" align="center"></el-table-column>
                <el-table-column label="面积" prop="follow_content" align="center"></el-table-column>
                <el-table-column label="装修" prop="warning_name" align="center"></el-table-column>
                 <el-table-column label="成交日期" prop="follow_name" align="center"></el-table-column>
                <!-- <el-table-column label="照片" prop="album_photo" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-picture" @click="handleOpenLookPic(scope.row)"></i>
                  </template>
                </el-table-column> -->
                <el-table-column label="成交价" prop="follow_name" align="center"></el-table-column>
              </el-table>
      </div>
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
        <div class="look-info">
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
      <HouseFilter :visible.sync="house_filter_visible" @close="handleGetHouseResource"></HouseFilter>

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
                  <el-input placeholder="请输入" v-model.number="set_price_form.bottom_price">
                    <template slot="append">元/月</template>
                  </el-input>
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
                <el-form-item label="建议价格">
                  <el-input placeholder="请输入" v-model.number="set_price_form.suggest_price">
                    <template slot="append">元/月</template>
                  </el-input>
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

      <!--历史相册-->
      <lj-dialog
        :visible.sync="history_pic_visible"
        :size="{width: 800 + 'px',height: 600 + 'px'}"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>历史相册</h3>
          </div>
          <div class="dialog_main" v-if="house_detail.house_album_data && house_detail.house_album_data.length > 0">
            <div v-for="item in house_detail.house_album_data">
              <p class="flex">
                <a :style="pic_style">{{ item.created_at }}</a>
                <a :style="pic_style">上传人：{{ item.user_name||'无' }}</a>
                <a :style="pic_style">部门：{{ item.department_name||'无' }}</a>
                <a>岗位：{{ item.position_name||'无' }}</a>
              </p>
              <div class="flex" v-if="item.album_photo && item.album_photo.length > 0">
                <img v-for="tmp in item.album_photo" alt="" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                     :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;border-radius: 5px;margin: 15px 15px 15px 0" v-if="tmp.uri">
              </div>
<!--              <div v-else>暂无图片</div>-->
            </div>
          </div>
          <div class="dialog_main" v-else>暂无数据</div>
        </div>
      </lj-dialog>

      <!-- 详情中的收房合同、租房合同的合同详情 -->
      <lj-dialog  :visible.sync="contract_detail_visible"   @close="contract_detail_visible = false"
        :size="{width: 1200 + 'px',height: 800 + 'px'}"> 
         <contractDetailCustom :contractDetailData='contractDetailCustomer' :currentRow='currentRow' :chooseTab='customer_contract_type'></contractDetailCustom>
      </lj-dialog>

      <MenuList :module="show_market" :list="customService" :backdrop="true" @close="handleCloseMenu"></MenuList>


    

    </div>
  </div>
</template>

<script>
  import searchHigh from '../../common/searchHigh.vue';
  import HouseCard from '../../marketCentre/components/house-card.vue';
  import OverviewInfo from '../../marketCentre/components/overview-info.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import HouseFilter from '../../marketCentre/components/house-filter.vue';
  import contractDetailCustom from '../../common/contract-detail-custom';
  import { customHouseManagementSearch } from '../../../assets/js/allSearchData.js';
  import MenuList from '../../common/menuList.vue';
  import { customService } from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList, searchHigh, HouseCard, OverviewInfo, LjDialog, HouseFilter,contractDetailCustom},
    data() {
      return {
        history_pic_visible: false,
        pic_style: {
          marginRight: 15 + 'px'
        },

        customHouseManagementSearch,
        customService,
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
          quality:[],//质量
          area: [],
          suggest_price: [],
          quality: [],
          house_identity: []
        },

        img_trans_count:0,//点击偏移次数
        img_trams: 0,//偏移
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
          {
            id: 8,
            val: '报备管理'
          },
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

        // 合同详情
        contract_detail_visible:false, 
        currentRow:{} ,  //被选中的当前条数据
        contractDetailCustomer:{} , //合同详情数据
        customer_contract_type:1,   //合同类型，1为收房，2为租房
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
      //收房合同、租房合同的列表，contract_type为1是收房，2为租房
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
         house_id: this.current_house.id, // house_id: 4,   // house_id: this.current_house.id, 
          task_type: 10, //用10，10是家居补齐类型
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
        let url = '';
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
            case 8:
           this.handlePolishFurniture(this.current_house.id);
            break;

        }
      },
      // 房源列表的分页
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

      validateForm() {
        let msg = null;
        if(isNaN(this.set_price_form.bottom_price)||!this.set_price_form.bottom_price) {
          msg = '最低价格只能为数字';
        }
        if(isNaN(this.set_price_form.suggest_price||!this.set_price_form.suggest_price)) {
          msg = '建议价格只能为数字';
        }
        if(parseInt(this.set_price_form.bottom_price)>parseInt(this.set_price_form.suggest_price)) {
          msg='最低价格需小于建议价格';
        }
        if(msg) {
          this.$LjMessage('warning',{title:'警告',msg:msg});
          return false;
        }
        return true;
      },


      handleSubmitSetPrice() {
        if(!this.validateForm()) return;
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
        this.searchData = this.customHouseManagementSearch;
        console.log('this.searchData', this.searchData);
        this.isHigh = true;
      },
      //关闭设置
      handleCloseSetHouse() {
        this.set_price_visible = false;
      },
      //获取房源列表
      async getHouseResource() {
        if(!this.validatePermission('House-Center-Read')) return;
        await this.$http.get(this.market_server + 'v1.0/market/house', this.house_params).then(res => {
          if (res.code === 200) {
            this.house_source = res.data.data;
            this.house_params.count = res.data.all_count;
          } else {
            this.house_source = [];
            this.house_params.count = 0;
          }
        })
      },
      //获取历史相册列表
      getHistoryPicList() {
        // console.log(this.current_house);
        let id = this.current_house.id;
        let params = {id};
        this.$http.get(`${this.market_server}v1.0/market/house/houseAlbum`,params).then(res=> {
          if(res.code==200) {
            this.house_detail.house_album_data = res.data;
          }
          this.$nextTick(()=> {
            this.history_pic_visible = true;
          });
        });
      },

      //双击列表打开房屋详情
      handleOpenCardDetail(item) {
        this.current_house = item;
        this.$http.get(this.market_server + `/v1.0/market/house/detail/${item.id}`).then(res => {
          if (res.code === 200) {
            this.lj_visible = true;
            this.img_trams = 0;//下方相册offset归位
            this.img_trans_count = res.data.album_photo?.length||0;
            this.house_detail = res.data;
            if (this.house_detail.house_goods) {
              for (let item of this.deploy_info) {
                item.num = this.house_detail.house_goods[item.key] ? this.house_detail.house_goods[item.key] : 0;
              }
            } else {
              for (let item of this.deploy_info) {
                item.num = 0;
              }
            }
            this.handleCheckModule(this.house_type[this.current_house_type - 1]);
            this.lj_size = {
              width: 1220 + 'px',
              height: 800 + 'px'
            };

          } else {
            this.house_detail = '';
          }
        });
      },
      handleTransLeft() {
        let keys = Object.keys(this.house_detail.album_photo);
        let len = keys.length;
        if(this.img_trans_count<len) {
          this.img_trams += 110;
          this.img_trans_count++;
        }
      },
      handleTransRight() {
        let keys = Object.keys(this.house_detail.album_photo);
        let len = keys.length;
        let cou = this.img_trans_count;
        if(cou>=len) {
          this.img_trams -= 110;
          this.img_trans_count--;
        }
      },
      handleCloseMenu() {
        this.show_market = false;
      },
      // 搜索的确定按钮
      async handleCloseSearch(search) {
        if (search !== 'close') {
          this.house_params = Object.assign({}, this.house_params, search);
          // 如果高级搜索，选择了部门，则is_org_user则为1，否则不传该字段
          if(this.house_params['org_user_id'].length>0){
             this.house_params.is_org_user = 1;  //0不限，1部门，2人员
          }
          await this.getHouseResource();
          // 清空字段
          delete this.house_params.is_org_user;
          // this.house_params.kong='';
        }
        this.isHigh = false;
      },
      handleCloseOverview() {
        this.overview_visible = false;
      },
      handleCloseLjDialog() {
        this.lj_visible = false;
      },

      // 详情页中的收房合同、租房合同的详情
      tableClickRowContract(row){
        this.customer_contract_type=row.contract_type;// 合同类型
        this.$http.get(this.market_server + `v1.0/market/contract/${row.contract_type}/${row.contract_id}`).then(res => {
          if (res.code === 200) {
            this.currentRow=row;
            this.contractDetailCustomer = res.data;
            if(this.contractDetailCustomer.house_extension?.community) {
              this.contractDetailCustomer.house_extension.community = JSON.parse(this.contractDetailCustomer.house_extension?.community);
            }
            if(this.contractDetailCustomer.house_extension?.cards) {
              this.contractDetailCustomer.house_extension.cards = JSON.parse(this.contractDetailCustomer.house_extension?.cards);
            }
            this.contract_detail_visible = true;
            //遍历图片生成需要的格式
            /*if(this.contractDetail.album&&Object.keys(this.contractDetail.album).length>0) {
              _(this.contractDetail.album).forEach((val,key)=>{
                album[key] = Object.keys(val);
              });
            }*/
            
          } else {
            this.contractDetailCustomer = {};
          }
        })
      },
    


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
          .base_info {
            border-bottom: 1px dashed #808080;
            .house_photo {
              .big_img {
                .history-pic {
                  a {
                    @include houseManagementImg('history_pic.png','theme1');
                  }
                }
                .sijiao {
                  @include houseManagementImg('sijiao.png', 'theme1');
                }
              }
              .small-img {
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
                     // 预警
                    .noticeIcon_2{    //黄色预警
                      @include houseManagementImg('hs.png','theme1');
                      background-size: contain;
                    }
                    .noticeIcon_3{  //橙色预警
                    @include houseManagementImg('cs.png','theme1');
                      background-size: contain;
                    }
                    .noticeIcon_4{  //红色预警
                      @include houseManagementImg('hhs.png','theme1');
                      background-size: contain;
                    }
                    .look {
                      @include houseManagementImg('look.png', 'theme1');
                      background-size: contain;
                    }
                  }
                }
              }
              .deploy {
                .deploy-info {
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
          .table-info {
            .info-type {
              .current-change {
                @include houseManagementImg('hongdi.png', 'theme1');
              }
            }

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
