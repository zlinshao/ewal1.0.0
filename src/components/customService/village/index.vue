<template>
  <div id="village">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b>...</b>
          </p>
          <h1>小区管理</h1>
          <b class="line"></b>
          <div class="icon-address"></div>
          <div class="village-address">
            <span v-for="tmp in address_filter" :key="tmp.id" @click="handleOpenFilterAddress(tmp)">{{ tmp.val }}</span>
          </div>
          <div class="village-num">
            86个小区
          </div>
        </div>
        <div class="items-center listTopRight">
          <div class="sort-control flex-center">
            <span @click="handleChangeSort(tmp)" v-for="tmp in sort_list" :key="tmp.id" :class="{'current-choose': current_sort === tmp.id }">{{ tmp.val }}</span>
          </div>
          <div class="icons all-choose"></div>
          <div class="icons add"><b>+</b></div>
          <div class="icons search" @click="highSearch"></div>
        </div>
      </div>

        <!--小区列表-->
        <div class="village-main">
          <div class="content flex scroll_bar">
            <div v-for="(village,index) in village_list" class="flex-center">
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
                    <el-button type="primary" size="small" plain>合并</el-button>
                    <el-button type="warning" size="small" plain>分配</el-button>
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
        </div>
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
              <div @click="handleChooseItem(item,check_module)" class="filter-button" :class="{'choose-filter-button': current_choose === item.code}" v-for="(item,idx) in city_list" :key="idx">{{ item.name }}</div>
            </div>
            <div v-if="check_module === 'area'">
              <div @click="handleChooseItem(area,check_module)" class="filter-button" v-for="(area,idx) in area_list" :key="idx" :class="{'choose-filter-button': current_choose === area.id}">{{ area.area_name }}</div>
            </div>
            <div v-if="check_module === 'area'"></div>
          </div>
          <div class="filter-footer flex-center">
            <el-button type="danger" size="small" @click="handleConfirmFilter">确定</el-button>
            <el-button type="info" size="small" @click="show_filter_search = false">取消</el-button>
          </div>
        </div>

      <searchHigh :module="searchHighVisible" :showData="searchData" @close="hiddenModule"></searchHigh>
    </div>
  </div>
</template>

<script>
  import searchHigh from '../../common/searchHigh.vue';

  export default {
    name: "index",
    components: { searchHigh },
    data() {
      return {
        http_server: globalConfig.market_server,
        sort_list: [
          { id: 1, val: '默认排序' },
          { id: 2, val: '高出租率' },
          { id: 3, val: '低出租率' },
        ],
        current_sort: 1,
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
          page: 1,
          limit: 20
        },
        check_choose: [], //当前选中小区
        show_filter_search: false, //显示小区城市筛选
        city_list: [], //城市列表
        current_choose: '', //当前选中
        current_choose_item: '',
        area_list: [], //区域列表
        check_module: '', //将要打开的搜索模块

        address_filter: [
          {key: 'city', val: '选城市'},
          {key: 'area', val: '选区域'},
          {key: 'type', val: '选类型'},
          {key: 'depart', val: '选部门'}
        ],

        searchHighVisible: false,
        searchData: {},

      }
    },
    mounted() {
      this.getVillageList();
    },
    watch: {},
    computed: {},
    methods: {
      //确定筛选
      handleConfirmFilter() {
        console.log(this.village_params);
        this.show_filter_search = false;
      },
      //选择城市
      handleChooseItem(item,module) {
        switch (module) {
          case 'city':
            this.village_params.city = [];
            this.village_params.province = '';
            this.village_params.province = item.province.code;
            this.village_params.city.push(item.code);
            this.address_filter[0].val = item.name;
            this.current_choose = item.code;
            this.current_choose_item = item;
            break;
          case 'area':
            this.address_filter[1].val = '';
            this.current_choose = item.id;
            this.village_params.area = item.id;
            this.address_filter[1].val += item.area_name + ',';
            this.address_filter[1].val = this.address_filter[1].val.substring(0,this.address_filter[1].val.length - 1);
            break;
        }
      },
      //城市列表
      getCityList() {
        this.$http.get(this.http_server + 'v1.0/city/address/city-list').then(res => {
          console.log(res);
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
          console.log(res);
          if (res.code === 200) {
            this.area_list = res.data;
          } else {
            this.area_list = [];
          }
        })
      },
      //点击打开地址筛选
      handleOpenFilterAddress(tmp) {
        console.log(tmp);
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
        this.current_sort = tmp.id;
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
