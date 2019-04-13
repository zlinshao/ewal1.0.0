<template>
  <div id="village">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b>...</b>
          </p>
          <h1>小区管理</h1>
          <b class="line"></b>
          <div class="icon-address"></div>
          <div class="village-address">
            <span :class="{ 'choose-address' : tmp.val.indexOf('选') === -1 }" v-for="tmp in address_filter" :key="tmp.id" @click="handleOpenFilterAddress(tmp)">{{ tmp.val }}</span>
          </div>
          <div class="village-num">
            86个小区
          </div>
        </div>
        <div class="items-center listTopRight">
          <div class="sort-control flex-center">
            <span @click="handleChangeSort(tmp)" v-for="tmp in sort_list" :key="tmp.id + 1" :class="{'current-choose': current_sort === tmp.id }">{{ tmp.val }}</span>
          </div>
          <div class="icons all-choose"></div>
          <div class="icons add" @click="new_village_visible = !new_village_visible"><b>+</b></div>
          <div class="icons search" @click="highSearch"></div>
        </div>
      </div>

      <!--小区列表-->
      <div class="village-main">
        <div class="content flex scroll_bar" v-if="village_list.length > 0">
          <div v-for="(village) in village_list" class="flex">
            <div>
              <div class="village-header">
                <p class="name flex">
                  <span>{{ village.village_name }}</span>
                  <span>{{ village.houseNum }}套</span>
                </p>
                <p class="detail-address">
                  <a>{{ village.address }}</a>
                </p>
              </div>
              <div class="village-body">
                <p>
                  <span class="icon-label type"></span>
                  <span>{{ village.house_type }}</span>
                </p>
                <p>
                  <span class="icon-label price"></span>
                  <span>{{ village.min_price || 0 }}-{{ village.max_price || 0 }}/月</span>
                </p>
                <p>
                  <span class="icon-label number"></span>
                  <span>{{ village.rentalRatio }}%({{ village.rented }}已出租)</span>
                </p>
                <p>
                  <span class="icon-label sign_user"></span>
                  <span>{{ village.leader && village.leader.name }}</span>
                </p>
              </div>
              <div class="village-footer">
                <div class="flex-center">
                  <el-button type="info" size="small">编辑</el-button>
                  <el-button type="primary" size="small" plain @click="handleOpenMergeVillage(village)">合并</el-button>
                  <el-button type="warning" size="small" plain @click="handleAllotCommunity(village)">分配</el-button>
                </div>
                <div class="flex-center">
                  <div class="flex-center" :class="{'choose-village': check_choose.includes(village.id)}" @click="handleCheckVillage(village)">
                    <i class="el-icon-check" v-if="check_choose.includes(village.id)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-none" v-else>暂无数据</div>
      </div>

      <!--分页-->
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="village_count"
            :page-size="village_params.limit"
            :current-page="village_params.page"
            @current-change="handleChangePage"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>

      <!--筛选-->
      <div class="filter-search" :class="{'show-filter-search': show_filter_search}">
        <div class="filter-body flex-center">
          <div v-if="check_module === 'city'">
            <div @click="handleChooseItem(item,'city')" class="filter-button" :class="{'choose-filter-button': current_choose === item.code}" v-for="(item,idx) in city_list" :key="idx">{{ item.name }}</div>
          </div>
          <div v-if="check_module === 'area'">
            <div @click="handleChooseItem(area,'area')" class="filter-button" v-for="(area,idx) in area_list" :key="idx" :class="{'choose-filter-button': current_choose === area.area_id}">{{ area.area_name }}</div>
          </div>
          <div v-if="check_module === 'area'">
            <div @click="handleChooseItem(region,'region')" class="filter-button" v-for="(region,idx) in region_list" :key="idx" :class="{'choose-filter-button': current_choose_region === region.region_id }" :title="region.region_name">{{ region.region_name }}</div>
          </div>
          <div v-if="check_module === 'type'">
            <div @click="handleChooseItem(type,'type')" class="filter-button" v-for="(type,idx) in type_filter" :key="idx" :class="{'choose-filter-button': current_choose_type === type.id }">{{ type.val }}</div>
          </div>
          <div v-if="check_module === 'type'">
            <div @click="handleChooseItem(house,'house')" class="filter-button" v-for="(house,idx) in house_filter" :key="idx" :class="{'choose-filter-button': current_choose_house === house.id }">{{ house.val }}</div>
          </div>
        </div>
        <div class="filter-footer flex-center">
          <el-button type="danger" size="small" @click="handleConfirmFilter">确定</el-button>
          <el-button type="info" size="small" @click="show_filter_search = false">取消</el-button>
        </div>
      </div>

      <searchHigh :module="searchHighVisible" :showData="searchData" @close="hiddenModule"></searchHigh>

      <!--添加小区-->
      <NewVillage :module="new_village_visible"></NewVillage>

      <!--选择部门-->
      <DepartOrgan :module="depart_visible" @close="handleGetDepart"></DepartOrgan>

      <!--分配小区-->
      <lj-dialog
        :visible="allot_village_visible"
        :size="{width: 450 + 'px',height: 350 + 'px'}"
        @close="handleCancelAllotVillage"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>分配小区</h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="80px" class="borderNone">
              <el-form-item label="小区名称">
                <el-input v-model="allot_village_params.village_name" readonly></el-input>
              </el-form-item>
              <el-form-item label="分配部门">
                <el-input readonly v-model="allot_village_params.depart_name" @focus="handleOpenDepart('allot')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmCommunity">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelAllotVillage">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--选小区-->
      <HouseFilter :visible="merge_village_visible" @close="handleGetVillage"></HouseFilter>
    </div>
  </div>
</template>

<script>
  import searchHigh from '../../common/searchHigh.vue';
  import NewVillage from './components/new-village.vue';
  import DepartOrgan from '../../common/departOrgan.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import HouseFilter from '../../marketCentre/components/house-filter.vue';

  export default {
    name: "index",
    components: { searchHigh ,NewVillage ,DepartOrgan,LjDialog ,HouseFilter},
    data() {
      return {
        //部门
        depart_visible: false,
        user_type: '',

        //添加小区
        new_village_visible: false,

        http_server: globalConfig.market_server,
        sort_list: [
          { id: 3, val: '默认排序' },
          { id: 1, val: '高出租率' },
          { id: 2, val: '低出租率' },
        ],
        current_sort: 3,
        village_list: [],
        village_count: 0,
        village_params: {
          province: '',
          city: [],
          area: '',
          region: '',
          is_share: '',
          allocation: '',
          address: '',
          py_all: '',
          org_id: [],
          name: '',
          py_first: '',
          house_type: '',
          rental_ratio_order: '',
          page: 1,
          limit: 20
        },
        check_choose: [], //当前选中小区

        show_filter_search: false, //显示小区城市筛选
        city_list: [], //城市列表
        current_choose: '', //当前选中
        area_list: [], //区域列表

        region_list: [], //地址
        current_choose_region: '', //地址选中

        type_filter: [
          {id: 1,val: '已共享'},
          {id: 2,val: '未共享'},
          {id: 3,val: '已分配'},
          {id: 4,val: '未分配'},
        ],
        current_choose_type: '',
        house_filter: [
          {id: 11,val: '住宅'},
          {id: 12,val: '公寓'},
          {id: 13,val: '酒店公寓'},
          {id: 14,val: '商住两用'},
          {id: 15,val: '平房'},
          {id: 16,val: '别墅'},
        ],
        current_choose_house: '',

        check_module: '', //将要打开的搜索模块

        address_filter: [
          {key: 'city', val: '选城市'},
          {key: 'area', val: '选区域'},
          {key: 'type', val: '选类型'},
          {key: 'depart', val: '选部门'}
        ],

        searchHighVisible: false,
        searchData: {},

        //分配小区
        allot_village_params: {
          community_id: '',
          village_name: '',
          org_id: '',
          depart_name: '',
        },
        allot_village_visible: false,

        //合同小区
        merge_village_visible: false,
        current_community: '',
        merge_village_params: {
          merge_to_community_id: '',
        }
      }
    },
    mounted() {
      this.getVillageList();
    },
    watch: {},
    computed: {},
    methods: {
      //合并小区
      handleConfirmMerge() {
        this.$http.put(this.http_server + `v1.0/market/community/merge/${this.current_community.id}`,this.merge_village_params).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            })
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            })
          }
        })
      },
      handleGetVillage(val,type) {
        if (val && type) {
          if (type === 'office') {
            if (val.length > 1) {
              this.$LjNotify('warning',{
                title: '提示',
                message: '小区合并为一对一'
              });
              return false;
            } else {
              this.merge_village_params.merge_to_community_id = val[0].village_id;
              this.handleConfirmMerge();
            }
          } else {
            this.$LjNotify('warning',{
              title: '提示',
              message: '请选择小区'
            });
            return false;
          }
        }
        this.merge_village_visible = false;
      },
      handleOpenMergeVillage(village) {
        this.current_community = village;
        this.merge_village_visible = true;
      },
      //打开部门
      handleOpenDepart(type) {
        this.user_type = type;
        this.depart_visible = true;
      },
      //分配小区
      handleAllotCommunity(village) {
        this.allot_village_params.community_id = village.id;
        this.allot_village_params.village_name = village.village_name;
        this.allot_village_visible = true;
      },
      handleConfirmCommunity() {
        this.$http.post(this.http_server + 'v1.0/market/community/org',this.allot_village_params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.getVillageList();
            this.handleCancelAllotVillage();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            });
          }
        })
      },
      handleCancelAllotVillage() {
        this.allot_village_visible = false;
        for (var key in this.allot_village_params) {
          this.allot_village_params[key] = '';
        }
      },
      //部门确定
      handleGetDepart(id,name) {
        if (id !== 'close') {
          switch (this.user_type) {
            case 'filter':
              this.village_params.org_id = id;
              this.address_filter[3].val = name;
              this.getVillageList();
              break;
            case 'allot':
              this.allot_village_params.org_id = id;
              this.allot_village_params.depart_name = name;
              break;
          }
        }
        this.user_type = '';
        this.depart_visible = false;
      },
      //确定筛选
      handleConfirmFilter() {
        console.log(this.village_params);
        this.getVillageList();
        this.show_filter_search = false;
      },
      //选择城市
      handleChooseItem(item,module) {
        switch (module) {
          case 'city':
            //清空area
            this.address_filter[1].val = '选区域';
            this.village_params.area = '';
            //清空region
            this.village_params.region = '';
            this.region_list = [];

            this.village_params.city = [];
            this.village_params.province = '';
            this.village_params.province = item.province.code;
            this.village_params.city.push(item.code);
            this.address_filter[0].val = item.name;
            this.current_choose = item.code;
            break;
          case 'area':
            this.address_filter[1].val = '';
            this.current_choose_region = '';
            this.village_params.region = '';
            this.current_choose = item.area_id;
            this.village_params.area = item.area_id;
            this.address_filter[1].val += item.area_name + ',';
            this.address_filter[1].val = this.address_filter[1].val.substring(0,this.address_filter[1].val.length - 1);
            this.getAreaNextList();
            break;
          case 'region':
            this.current_choose_region = item.region_id;
            this.village_params.region = item.region_id;
            this.address_filter[1].val = this.address_filter[1].val.split('-')[0];
            this.address_filter[1].val += '-' + item.region_name;
            break;
          case 'type' :
            this.village_params.house_type = '';
            this.current_choose_house = '';

            if (item.id === 1 || item.id === 2) {
              this.village_params.is_share = item.id;
            }
            if (item.id === 3 || item.id === 4) {
              this.village_params.allocation = item.id;
            }
            this.address_filter[2].val = item.val;
            this.current_choose_type = item.id;
            break;
          case 'house' :
            this.address_filter[2].val = this.address_filter[2].val.split('-')[0];
            this.address_filter[2].val += '-' + item.val;
            this.village_params.house_type = item.id;
            this.current_choose_house = item.id;
            break;
        }
      },
      //城市列表
      getCityList() {
        this.$http.get(this.http_server + 'v1.0/city/address/city-list').then(res => {
          if (res.code === 200) {
            this.city_list = res.data;
          } else {
            this.city_list = [];
          }
        })
      },
      //区域列表
      getAreaList() {
        this.$http.get(this.http_server + '/v1.0/city/address',{
          province: this.village_params.province,
          city: this.village_params.city[0]
        }).then(res => {
          if (res.code === 200) {
            this.area_list = res.data;
          } else {
            this.area_list = [];
          }
        })
      },
      //获取区域下的街道
      getAreaNextList() {
        var params = {
          province: this.village_params.province,
          city: this.village_params.city[0],
          area: this.village_params.area,
        };
        this.$http.get(this.http_server + '/v1.0/city/address',params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.region_list = res.data;
          } else {
            this.region_list = [];
          }
        })
      },
      //点击打开地址筛选
      handleOpenFilterAddress(tmp) {
        const key = tmp.key;
        this.check_module = tmp.key; //赋值当前模块
        switch (key) {
          case 'city':
            this.getCityList();
            this.show_filter_search = true;
            this.current_choose = this.village_params.city[0];
            break;
          case 'area':
            this.current_choose = this.village_params.area;
            if (this.village_params.city.length > 0) {
              this.getAreaList();
              this.show_filter_search = true;
            } else {
              this.$LjNotify('warning',{
                title: '警告',
                message: '请选择城市'
              });
            }
            break;
          case 'type':
            this.show_filter_search = true;
            break;
          case 'depart':
            this.user_type = 'filter';
            this.depart_visible = true;
            break;
        }
      },
      //关闭高级搜索
      hiddenModule(val) {
        if (val !== 'close') {
          console.log(val);
        }
        this.searchHighVisible = false;
      },
      handleCheckVillage(village) {
        for (var i=0;i<this.check_choose.length;i++) {
          if (village.id === this.check_choose[i]) {
            this.check_choose.splice(i,1);
            return false;
          }
        }
        this.check_choose.push(village.id);
      },
      //高级
      highSearch() {
        this.searchData = {
          status: 'village',
          placeholder: '小区名称/地址/报备人',
          data: []
        };
        this.searchHighVisible = true;
      },
      //变更排序
      handleChangeSort(tmp) {
        if (this.village_params.area) {
          this.current_sort = tmp.id;
          this.village_params.rental_ratio_order = tmp.id;
          this.getVillageList();
        } else {
          this.$LjNotify('warning',{
            title: '提示',
            message: '请筛选小区到区域级别'
          });
          return false;
        }
      },
      //获取小区列表
      getVillageList() {
        this.showLoading(true);
        this.$http.get(this.http_server + 'v1.0/market/community',this.village_params).then(res => {
          if (res.code === 200) {
            this.village_list = res.data.data;
            this.village_count = res.data.count;
          } else {
            this.village_list = [];
            this.village_count = 0;
          }
          this.showLoading(false);
        })
      },
      //分页
      handleChangePage(page) {
        this.village_params.page = page;
        this.getVillageList();
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/customService/village/index.scss";

  @mixin villageImg($m,$n) {
    $url: '../../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  };

  #theme_name.theme1 {
    #village {
      > div {
        .listTopLeft {
          b.line {
            width: 1px;
            height: 25px;
            background-color: $color2F2;
            margin-right: 30px;
          }
        }
        .sort-control {
          span {
            margin: 0 20px;
          }
          .current-choose {
            color: $colorE33;
          }
        }
        .village-main {
          .content {
            > div {
              > div {
                .village-body {
                  p {
                    .type {
                      @include villageImg('fenlei-hui.png','theme1');
                    }
                    .price {
                      @include villageImg('jiagehui.png','theme1');
                    }
                    .sign_user {
                      @include villageImg('renhui.png','theme1');
                    }
                    .number {
                      @include villageImg('zhanbi-hui.png','theme1');
                    }
                    &:hover {
                      .type {
                        @include villageImg('fenleih.png','theme1');
                      }
                      .price {
                        @include villageImg('jiage.png','theme1');
                      }
                      .sign_user {
                        @include villageImg('ren.png','theme1');
                      }
                      .number {
                        @include villageImg('zhanbi.png','theme1');
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
