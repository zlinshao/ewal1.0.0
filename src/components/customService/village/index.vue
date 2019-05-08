<template>
  <div id="village">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="handleOpenMenu">
            <b>...</b>
          </p>
          <h1>小区管理</h1>
          <b class="line"></b>
          <div class="icon-address"></div>
          <div class="village-address">
            <span :class="{ 'choose-address' : tmp.val.indexOf('选') === -1 }" v-for="tmp in address_filter" :key="tmp.id" @click="handleOpenFilterAddress(tmp)">{{ tmp.val }}</span>
          </div>
          <div class="village-num">
            {{ village_count || 0 }}个小区
          </div>
        </div>
        <div class="items-center listTopRight">
          <el-button size="small" style="width: 80px" type="success" plain @click="handleAllotVillage">分配</el-button>
          <el-button size="small" style="width: 80px" type="primary" plain @click="handleMergeVillage">合并</el-button>
          <div class="sort-control flex-center">
            <span @click="handleChangeSort(tmp)" v-for="tmp in sort_list" :key="tmp.id + 1" :class="{'current-choose': current_sort === tmp.id }">{{ tmp.val }}</span>
          </div>
          <div class="icons all-choose" @click="handleChooseAll"></div>
          <div class="icons add" @click="new_village_visible = !new_village_visible"><b>+</b></div>
          <div class="icons search" @click="handleHighSearch"></div>
        </div>
      </div>

      <!--小区列表-->
      <div class="village-main">
        <div class="content flex scroll_bar">
          <div v-for="(village,index) in village_list" class="flex" @dblclick="handleGetDetail(village)">
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
                  <span v-if="village.org && village.org.length > 0">
                    <span v-for="item in village.org">
                      {{ item.leader && item.leader.name }}&nbsp;&nbsp;
                    </span>
                  </span>
                  <span v-else>-</span>
                  <el-button style="float: right;min-width: 80px" type="warning" plain size="mini" @click="handleEditVillage(village)">编辑</el-button>
                </p>
              </div>
              <div class="village-footer">
                <div class="flex-center">

                  <!--<el-button type="primary" size="small" plain @click.stop="handleOpenMergeVillage(village)">合并</el-button>-->
                </div>
                <div class="flex-center">
                  <div class="flex-center" :class="{'choose-village': check_choose.includes(index)}" @click.stop="handleCheckVillage(village,index)">
                    <i class="el-icon-check" v-if="check_choose.includes(index)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="content-none" v-else>暂无数据</div>-->
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

      <SearchHigh :module="HighVisible" :show-data="searchData" @close="handleCloseSearch"></SearchHigh>

      <!--添加小区-->
      <NewVillage :module="new_village_visible" :edit-info="edit_info" @close="handleCloseControlVillage"></NewVillage>

      <!--选择部门-->
      <DepartOrgan :module="depart_visible" :organ-data="depart_data" @close="handleGetDepart"></DepartOrgan>

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
      <HouseFilter :visible="merge_village_visible" :only-choose="merge_choose" @close="handleGetVillage"></HouseFilter>

      <!--MenuList-->
      <MenuList :module="menu_visible" :list="customService" :backdrop="true" @close="menu_visible = false"></MenuList>

      <!--小区详情-->
      <lj-dialog
        :visible="village_detail_visible"
        :size="{width: 1200 + 'px',height: 850 + 'px'}"
        @close="village_detail_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{ current_village_detail && current_village_detail.village_name }}</h3>
            <div class="header_right">
              <span>本小区已收房{{ current_village_detail && current_village_detail.houseNum }}套，已出租{{ current_village_detail && current_village_detail.rented }}套，出租率{{ current_village_detail && current_village_detail.rentalRatio * 100}}%</span>
            </div>
          </div>
          <div class="dialog_main">
            <VillageContainer village="基本信息">
              <el-form label-width="80px" class="borderNone" readonly>
                <el-row>
                  <el-col :span="6" v-for="(item,idx) in village_detail_form" :key="idx">
                    <el-form-item :label="item.label" style="text-align: left;width: 100%">
                      <div style="word-break: break-all">{{ item.val }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="小区定位" style="text-align: left">
                      <div>{{ current_village_detail && current_village_detail.position === 1 ? '郊区' : current_village_detail.position === 2 ? '城市' : current_village_detail.position === 2 ? '城中心' : '未知'}}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="小区照片">
                  <div class="flex">
                    <LjUpload v-model="village_pic" :disabled="true" :download="false"></LjUpload>
                  </div>
                </el-form-item>
                <el-form-item label="房屋照片">
                  <LjUpload v-model="house_pic" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
                <el-form-item label="调研报告">
                  <LjUpload v-model="files" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
              </el-form>
            </VillageContainer>
            <VillageContainer village="全站大数据房源匹配">
              <div id="village-detail" style="min-height: 400px"></div>
            </VillageContainer>
            <VillageContainer village="房型价格-区块链推荐">
              <el-table :data="outer_net_data" @row-click="handleClickRow">
                <el-table-column label="房型" prop="house_type" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="handleOpenOuterHouse(scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </VillageContainer>
            <VillageContainer village="自适应聚类房型图">
              <div style="text-align: left" v-if="outer_house_pic.length > 0">
                <img :src="url" alt=""
                     style="width: 60px;height: 60px;margin-right: 15px;cursor: pointer;border-radius: 4px"
                     v-for="url in outer_house_pic"
                     data-magnify="" data-caption="图片查看器" :data-src="url"
                >
              </div>
              <div style="text-align: center" v-else>暂无数据</div>
            </VillageContainer>
            <VillageContainer village="所属部门">
              <div v-if="current_village_detail.org && current_village_detail.org.length > 0" style="text-align: left" class="flex">
                <p v-for="(item,idx) in current_village_detail.org">{{ item.name }}<a v-if="idx !== current_village_detail.org.length - 1">、</a></p>
              </div>
            </VillageContainer>
          </div>
        </div>
      </lj-dialog>

      <!--合并小区-->
      <lj-dialog
        :visible="merge_visible"
        :size="{width: 500 + 'px',height: 350 + 'px'}"
        @close="handleCancelMergeVillage"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>合并小区</h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="120px" class="borderNone">
              <el-form-item label="保留小区">
                <el-input v-model="merge_form.save_village" placeholder="请选择" readonly @focus="handleOpenMergeVillage('save')"></el-input>
              </el-form-item>
              <el-form-item label="被合并小区">
                <el-input v-model="merge_form.merge_village" placeholder="请选择" readonly @focus="handleOpenMergeVillage('merge')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" @click="handleConfirmMerge">确定</el-button>
            <el-button type="info" @click="handleCancelMergeVillage">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import NewVillage from './components/new-village.vue';
  import DepartOrgan from '../../common/departOrgan.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import HouseFilter from '../../marketCentre/components/house-filter.vue';
  import MenuList from '../../common/menuList.vue';
  import {customService} from '../../../assets/js/allModuleList.js';
  import VillageContainer from './components/village-container.vue';
  import LjUpload from '../../common/lightweightComponents/lj-upload';

  export default {
    name: "index",
    components: { SearchHigh ,NewVillage ,DepartOrgan,LjDialog ,HouseFilter,MenuList,VillageContainer,LjUpload},
    data() {
      return {
        depart_data: {
          num: 0
        },
        //合并小区
        merge_visible: false,
        merge_form: {
          save_village: '',
          merge_village: '',
          id: '',
          merge_to_community_id: '',
        },
        merge_village_visible: false,
        merge_choose: '',
        is_control: '',

        //小区编辑
        edit_info: '',

        //小区详情
        village_detail_visible: false,
        current_village_detail: '',
        village_detail_form: {
          city_name: {
            label: '城市名称',
            val: ''
          },
          area_name: {
            label: '区/县名称',
            val: ''
          },
          village_alias: {
            label: '小区别名',
            val: '',
          },
          address: {
            label: '街道地址',
            val: ''
          },
          built_year: {
            label: '建筑年代',
            val: ''
          },
          house_type: {
            label: '房屋类型',
            val: ''
          },
          total_buildings: {
            label: '总栋数',
            val: ''
          },
          property_fee: {
            label: '物业费',
            val: ''
          },
          property_phone: {
            label: '物业电话',
            val: ''
          },
          property_com: {
            label: '物业公司',
            val: ''
          },
          peripheral_info: {
            label: '周边信息',
            val: ''
          },
          remark: {
            label: '备注',
            val: ''
          }
        },
        outer_net_data: [],
        outer_house_pic: [],

        menu_visible: false,
        customService,
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
        current_check_village: [],

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

        HighVisible: false,
        searchData: {
          status: 'village',
          placeholder: '小区名称',
          keywords: 'address',
          data: []
        },

        //分配小区
        allot_village_params: {
          community_id: '',
          village_name: '',
          org_id: '',
          depart_name: '',
        },
        allot_village_visible: false,

        map: null,

        village_pic: [],
        house_pic: [],
        files: [],
      }
    },
    mounted() {
      this.getVillageList();
    },
    watch: {},
    computed: {},
    methods: {
      handleGetVillage(val) {
        if (val !== 'close') {
          if (this.is_control === 'save') {
            this.merge_form.save_village = val[0].village_name;
            this.merge_form.id = val[0].village_id;
          } else {
            this.merge_form.merge_to_community_id = val[0].village_id;
            this.merge_form.merge_village = val[0].village_name;
          }
          this.merge_choose = 'all';
        }
        this.merge_village_visible = false;
      },
      //合并小区
      handleConfirmMerge() {
        this.$http.put(this.http_server + `v1.0/market/community/merge/${this.merge_form.id}`,this.merge_form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.is_control = '';
            this.getVillageList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            })
          }
        })
      },
      handleOpenMergeVillage(type) {
        this.is_control = type;
        this.merge_choose = 'village';
        this.merge_village_visible = true;
      },
      handleCancelMergeVillage() {
        for (var key in this.merge_form) {
          this.merge_form[key] = '';
        }
        this.merge_visible = false;
      },
      //合并
      handleMergeVillage() {
        this.merge_visible = true;
      },
      //关闭操作小区
      handleCloseControlVillage() {
        this.edit_info = '';
        this.new_village_visible = false;
        setTimeout(() => {
          this.getVillageList();
        },2000);
      },
      handleEditVillage(village) {
        this.edit_info = village;
        this.new_village_visible = true;
      },
      //分配小区
      handleAllotVillage() {
        if (this.current_check_village.length < 1) {
          this.$LjNotify('warning',{
            title: '提示',
            message: '请选择需要分配的小区'
          });
          return false;
        }
        this.allot_village_params.community_id = [];
        for (var item of this.current_check_village) {
          this.allot_village_params.community_id.push(item.id);
          this.allot_village_params.village_name += item.village_name + ',';
        }
        this.allot_village_params.village_name = this.allot_village_params.village_name.substring(0,this.allot_village_params.village_name.length - 1);
        this.allot_village_visible = true;
      },
      //点击获取房型图
      handleClickRow(row) {
        this.outer_house_pic = row.pic_address || [];
      },
      //查看外网房源
      handleOpenOuterHouse(row) {
        if (row.url) {
          window.open(row.url);
        } else {
          this.$LjNotify('info',{
            title: '提示',
            message: '暂无外网房源链接'
          });
          return false;
        }
      },
      handleDetailMap(position) {
        let that = this;
        this.map = new AMap.Map('village-detail', {
          resizeEnable: true,
          center: position, //初始化地图中心点
          zoom: 13
        });
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(5, -20)});
        var marker = new AMap.Marker({
          position,
          map: that.map
        });
        marker.content = this.current_village_detail && this.current_village_detail.village_name;
        marker.on('click',markerClick);
        marker.emit('click',{target: marker});
        this.map.add(marker);
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(that.map, e.target.getPosition());
        }
      },
      //小区全选
      handleChooseAll() {
        if (this.check_choose.length >= this.village_list.length) {
          this.check_choose = [];
          this.current_check_village = [];
          return false;
        }
        this.check_choose = [];
        this.current_check_village = this.village_list;
        for (var key in this.village_list) {
          this.check_choose.push(parseInt(key));
        }
      },
      //小区详情
      handleGetDetail(village) {
        this.$http.get(this.http_server + `v1.0/market/community/${village.id}`).then(res => {
          if (res.code === 200) {
            this.current_village_detail = res.data;
            this.village_detail_visible = true;
            for (var key in this.village_detail_form) {
              this.village_detail_form[key].val = res.data[key] ? res.data[key] : '';
            }
            this.village_detail_form.city_name.val = res.data.city && res.data.city.city_name;
            this.village_detail_form.area_name.val = res.data.area && res.data.area.area_name;
            this.outer_net_data = res.data.outer_net_data ? res.data.outer_net_data : [];
            var location = [res.data.longitude,res.data.latitude];
            this.village_pic = res.data && res.data.album && res.data.album.village_photo ? res.data.album.village_photo : [];
            this.house_pic = res.data && res.data.album && res.data.album.home_photo ? res.data.album.home_photo : [];
            this.files = res.data && res.data.album && res.data.album.files ? res.data.album.files : [];
            this.$nextTick(() => {
              this.handleDetailMap(location);
            })
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            });
            return false;
          }
        })
      },
      handleOpenMenu() {
        this.menu_visible = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
      //打开部门
      handleOpenDepart(type) {
        this.user_type = type;
        this.depart_data.num = 1;
        this.depart_visible = true;
      },
      handleConfirmCommunity() {
        this.$http.post(this.http_server + 'v1.0/market/community/org',this.allot_village_params).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.check_choose = [];
            this.current_check_village = [];
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
              this.allot_village_params.org_id[0] = id[0];
              this.allot_village_params.depart_name = name;
              break;
          }
        }
        this.user_type = '';
        this.depart_visible = false;
      },
      //确定筛选
      handleConfirmFilter() {
        this.getVillageList();
        this.show_filter_search = false;
      },
      //选择城市
      handleChooseItem(item,module) {
        switch (module) {
          case 'city':
            if (item.code === this.current_choose) {
              this.current_choose = '';
              this.village_params.city = [];
              this.village_params.province = '';
              this.address_filter[0].val = '选城市';
              return false;
            }
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
            if (item.area_id === this.current_choose) {
              this.address_filter[1].val = '选区域';
              this.village_params.area = '';
              this.current_choose = '';
              this.region_list = [];
              return false;
            }
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
            if (item.region_id === this.current_choose_region) {
              this.current_choose_region = '';
              this.village_params.region = '';
              this.address_filter[1].val = this.address_filter[1].val.split('-')[0];
              return false;
            }
            this.current_choose_region = item.region_id;
            this.village_params.region = item.region_id;
            this.address_filter[1].val = this.address_filter[1].val.split('-')[0];
            this.address_filter[1].val += '-' + item.region_name;
            break;
          case 'type' :
            if (item.id === this.current_choose_type) {
              this.current_choose_type = '';
              if (this.current_choose_house) {
                this.address_filter[2].val = this.address_filter[2].val.split('-')[1];
              } else {
                this.address_filter[2].val = '选类型';
              }
              if (item.id === 1 || item.id === 2) {
                this.village_params.is_share = '';
              }
              if (item.id === 3 || item.id === 4) {
                this.village_params.allocation = '';
              }
              return false;
            }
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
            if (item.id === this.current_choose_house) {
              this.current_choose_house = '';
              this.address_filter[2].val = this.address_filter[2].val.split('-')[0];
              this.village_params.house_type = '';
              return false;
            }
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
      handleCloseSearch(val) {
        if (val !== 'close') {
          this.village_params.address = val.address;
          this.getVillageList();
        }
        this.HighVisible = false;
      },
      //高级
      handleHighSearch() {
        this.HighVisible = true;
      },
      handleCheckVillage(village,index) {
        for (var i=0;i<this.check_choose.length;i++) {
          if (index === this.check_choose[i]) {
            this.check_choose.splice(i,1);
            this.current_check_village.splice(this.village_list[i],1);
            return false;
          }
        }
        this.check_choose.push(index);
        this.current_check_village.push(this.village_list[index]);
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
                  }
                }
                &:hover {
                  .village-body {
                    p {
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
