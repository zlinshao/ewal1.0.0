<template>
  <div id="house-filter">
    <div>
      <lj-dialog :visible.sync="dialog_visible" :size="{width: 1200 + 'px',height: 830 + 'px'}" @close="handleCancelChoose">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{ activeName === 'first' ? '请选择房屋地址' : '请选择小区地址'}}</h3>
            <!-- 搜索按钮 -->
            <div class="header_right borderNone">
              <el-input style="width: 200px;" size="small" v-if="show_search" v-model="params.search"></el-input>
              <div class="search" @click="handleGoSearch"></div>
            </div>
          </div>
          <div class="dialog_main">
            <!-- 房屋地址 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-if="showHouse" label="地址" name="first">
                <div class="flex">
                  <div class="left_container changeChoose">
                    <div class="header_control flex">
                      <el-checkbox v-model="choose_all" label="1" @change="handleChooseAll" v-show="only_choose !== 'house'">全选</el-checkbox>
                    </div>
                    <div class="house-address scroll_bar">
                      <div>
                        <el-checkbox-group v-model="house_choose" @change="handleChangeItem" :max="only_choose === 'house' ? 1 : 30">
                          <div class="checkbox_item" v-for="(item,index) in house_resource">
                            <el-checkbox :label="index">{{ item.house_name }}</el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </div>

                      <div
                        class="flex-center"
                        v-loading="fullLoading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(255, 255, 255, 0)">
                        <div v-if="house_resource.length < 1 && !fullLoading">无相关数据</div>
                      </div>


                    </div>
                  </div>
                  <div class="right_container">
                    <div class="header_control flex">
                      <div>已选:</div>
                      <div class="clear_all" @click="handleChooseAll(false)">清空</div>
                    </div>
                    <div class="house-address right_address scroll_bar">
                      <div>
                        <div class="checkbox_item flex" v-for="(house,idx) in house_choose_items">
                          <div class="choose_txt">{{ house.house_name }}</div>
                          <div class="delete_choose" @click="handleDeleteItem(house,idx)">－</div>
                        </div>
                      </div>
                    </div>
                    <!--底部按钮-->
                    <div class="footer_btn flex-center">
                      <el-button type="danger" size="small" @click="handleSubmitChoose('house')">确定</el-button>
                      <el-button type="info" size="small" @click="handleCancelChoose('house')">取消</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <!-- 小区地址 v-if='showFlag || showFlag==undefined'-->
              <el-tab-pane  label="小区" name="second" >
                <div class="flex">
                  <div class="left_container transparent_bg">
                    <!--<div class="header_search">
                      <div class="control">
                        <div class="toggle_btn" @click="hide_header_search = !hide_header_search">
                          <i class="el-icon-arrow-up" v-if="hide_header_search"></i>
                          <i class="el-icon-arrow-down" v-else></i>
                        </div>
                      </div>
                      <div class="header_container borderNone changeChoose" :class="{'hide_header_container': hide_header_search}">
                        <div>
                          <p style="margin-bottom: 10px">房型</p>
                          <div class="items-center">
                            <p class="radioSelection" @click="handleChooseHouseType(tmp.id)"
                               :class="{'highChoose': house_config.type === tmp.id}"
                               v-for="tmp in house_type">
                              {{ tmp.val }}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p style="margin-bottom: 10px">厅</p>
                          <div class="items-center">
                            <p class="radioSelection" @click="handleChooseHouseOffice(tmp.id)"
                               :class="{'highChoose': house_config.office === tmp.id}"
                               v-for="tmp in house_office">
                              {{ tmp.val }}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p style="margin-bottom: 10px">面积</p>
                          <div class="flex" style="line-height: 30px">
                            <el-input style="width: 180px" size="small" v-model="params.area_min"></el-input><span style="margin-left: 5px">平米</span>
                            <a style="margin: 0 20px;color: #999999">至</a>
                            <el-input style="width: 180px" size="small" v-model="params.area_max"></el-input><span style="margin-left: 5px">平米</span>
                          </div>
                        </div>
                      </div>
                    </div>-->
                    <div class="plot_container changeChoose scroll_bar">
                      <div>
                        <el-checkbox-group v-model="office_choose" @change="handleChooseOffice" :max="only_choose === 'village' ? 1 : 30">>
                          <div class="office_content" v-for="(office,index) in office_resource" :key="index">
                            <el-checkbox :label="index">
                              <div class="checkbox_content flex">
                                <div style="width: 200px">{{ office.village_name }}</div>
                                <div style="width: 150px;text-align: center">{{ office.address }}</div>
<!--                                <div style="width: 100px;text-align: right">{{ office.num }}套</div>-->
                              </div>
                            </el-checkbox>
                          </div>
                        </el-checkbox-group>
                        <div
                          class="flex-center"
                          v-loading="fullLoading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(255, 255, 255, 0)">
                          <div v-if="office_resource.length < 1 && !fullLoading">无相关数据</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="right_container">
                    <div class="header_control flex">
                      <div>已选:</div>
                      <div class="clear_all" @click="handleClearOffice">清空</div>
                    </div>
                    <div class="office_choose scroll_bar">
                      <div>
                        <div class="flex" v-for="(office,index) in show_office" :key="index">
                          <div style="width: 40%;text-align: left">{{ office.village_name }}</div>
                          <div style="width: 35%;text-align: center">{{ office.address }}</div>
<!--                          <div style="width: 15%;text-align: left">{{ office.num }}套</div>-->
                          <div class="delete_choose" @click="handleDeleteOffice(index)">－</div>
                        </div>
                      </div>
                    </div>
                    <div class="footer_btn">
                      <el-button type="danger" size="small" @click="handleSubmitChoose('office')">确定</el-button>
                      <el-button type="info" size="small" @click="handleCancelChoose('office')">取消</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="dialog_footer">
            <div class="page">
              <el-pagination
                :total="house_count"
                :page-size="params.limit"
                :current-page="params.page"
                layout="total,prev,pager,next"
                @current-change="handleChangePage"
              ></el-pagination>
            </div>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "houseFilter",
    //props: ['visible','onlyChoose'],
    props: {
      visible: {},
      onlyChoose: {},
      showHouse: {//是否显示房屋tab
        type: Boolean,
        default: true,
      },
      // showFlag: true,//是否展示小区
      outerParams: {},//从外部传过来 province及city
    },
    data() {
      return {
        market_server: globalConfig.market_server,

        fullLoading:false,//加载

        dialog_visible: false,
        activeName: 'first',
        show_search: false,
        choose_all: '', //全选

        house_choose: [], //已选index
        house_choose_items: [],
        house_resource: [],
        house_count: 0,
        hide_header_search: true, //隐藏搜索条件

        params: {
          page: 1,
          limit: 15,
          type: 1,
          search: '',
          room: '',
          hall: '',
          area_min: '',
          area_max: ''
        },

        village_params: {//小区搜索params
          page:1,
          limit:15,
          province:null,
          city:null,
          search:'',
        },

        house_config: {
          type: 1,
          office: '',
          area: {
            min: '',
            max: ''
          }
        },
        house_type: [
          {id: 1,val: '一室'},
          {id: 2,val: '两室'},
          {id: 3,val: '三室'},
          {id: 4,val: '四室'},
          {id: 5,val: '以上'},
        ],
        house_office: [
          {id: 1,val: '一厅'},
          {id: 2,val: '两厅'},
          {id: 3,val: '三厅'},
          {id: 4,val: '以上'},
        ],

        office_resource: [],
        office_choose: [], //已选择小区
        show_office: [],

        only_choose: 'all',
      }
    },
    mounted() {
    },
    watch: {
      visible(val) {
        this.dialog_visible = val;
        if (val) {
          if(!this.showHouse) {
            this.activeName = 'second';
          }
          this.getHouseList();
        }else {
          this.house_resource = [];
          this.office_resource = [];
          this.house_count = 0;
        }
      },
      deep:true,
      onlyChoose(val) {
        this.only_choose = val;
        this.activeName = this.only_choose === 'all' || this.only_choose === 'house'  ? 'first' : 'second';
        this.params.type = this.only_choose === 'all' || this.only_choose === 'house' ? 1 : 2;
      },
      /*监听是否显示房屋*/
      showHouse: {
        handler(val) {
          if(!val) {
            this.activeName = 'second';
          }
        },
        immediate: true
      },
       /*监听是否显示小区*/
      // showFlag: {
      //   handler(val) {
      //     // debugger
      //     if(!val) {
      //       this.activeName = 'first';
      //     }
      //   },
      //   immediate: true
      // },
      outerParams: {
        handler(val) {
          if(Object.keys(val).length>0) {
            this.village_params.province = val.province;
            this.village_params.city = val.city;
          }
        },
        deep:true,
      },
    },
    computed: {},
    methods: {
      // 确定按钮
      handleSubmitChoose(type) {
        if (type === 'house') {  //房屋
          this.$emit('close',this.house_choose_items,type);
          // this.handleResetHouse();  //清空数据
        } else {             //小区
          this.$emit('close',this.show_office,type);
          // this.handleResetOffice();   //清空数据
        }
      },
      //搜索
      handleGoSearch() {
        this.show_search = true;
        this.handleResetHouse();
        this.getHouseList();
      },
      handleChangePage(page) {
        if(this.activeName=='first') {
          this.params.page = page;
          //this.getHouseList();
        }else {
          this.office_choose = [];
          this.village_params.page = page;
        }
        this.getHouseList();

      },
      /*//获取房屋
      getHouseList() {
        this.$http.get(this.market_server + '/v1.0/market/house/searchVH',this.params).then(res => {
          if (res.code === 200) {
            if (this.activeName === 'first') {
              this.house_resource = res.data.data;
            }
            if (this.activeName === 'second') {
              this.office_resource = res.data.data;
            }
            this.house_count = res.data.count;
          } else {
            if (this.activeName === 'first') {
              this.house_resource = [];
            }
            if (this.activeName === 'second') {
              this.office_resource = [];
            }
            this.house_count = 0;
          }
        })
      },*/

      //获取房屋
      getHouseList() {
        this.fullLoading = true;
        this.house_resource = [];
        this.office_resource = [];
        if(this.activeName =='first') {
          this.$http.get(this.market_server + '/v1.0/market/house/searchVH',this.params).then(res => {
            this.fullLoading = false;
            if (res.code === 200) {
              this.house_resource = res.data.data;
              this.house_count = res.data.count;
            } else {
              this.house_resource = [];
              this.house_count = 0;
            }
          })
        }else {
          this.village_params.search = this.params.search;
          this.$http.get(this.market_server + 'v1.0/market/community',this.village_params).then(res => {
            this.fullLoading = false;
            if (res.code === 200) {
              this.office_resource = res.data.data;
              this.house_count = res.data.count;
            } else {
              this.office_resource = [];
              this.house_count = 0;
            }
          })
        }
      },


      //清空小区
      handleClearOffice() {
        this.office_choose = [];
        this.show_office = [];
      },
      //删除小区
      handleDeleteOffice(index) {
        this.office_choose.splice(index,1);
        this.show_office.splice(index,1);
      },
      //选择小区
      handleChooseOffice(val) {
        this.show_office = [];
        for (var a =0;a<val.length;a ++) {
          this.show_office.push(this.office_resource[val[a]]);
        }
      },
      //切换厅
      handleChooseHouseOffice(id) {
        this.house_config.office = id;
      },
      //选择房型
      handleChooseHouseType(id) {
        this.house_config.type = id;
      },
      //取消
      handleCancelChoose(type) {
        // if (type === 'house') {
        //   this.handleResetHouse();
        // } else {
        //   this.handleResetOffice();
        // }
        // this.dialog_visible = false;
        this.$emit('close','close');
        // this.$emit('update:visible',this.dialog_visible);
      },
      //删除一个
      handleDeleteItem(house,idx) {
        this.house_choose.splice(idx,1);
        this.house_choose_items.splice(idx,1);
        var house_len = this.house_resource.length;
        var choose_len = this.house_choose.length;
        this.choose_all = house_len === choose_len;
      },
      //清空全选
      handleChooseAll(val) {
        if (val) {
          var len = this.house_resource.length;
          this.house_choose_items = [];
          for (var i=0;i< len;i++) {
            this.house_choose.push(i);
            this.house_choose_items.push(this.house_resource[i]);
          }
        } else {
          this.house_choose = [];
          this.house_choose_items = [];
          this.choose_all = false;
        }
      },
      //选择item
      handleChangeItem(val) {
        this.house_choose_items = [];
        for (var k=0;k<val.length;k ++) {
          var item = this.house_resource[val[k]];
          this.house_choose_items.push(item);
        }
        var house_len = this.house_resource.length;
        var choose_len = this.house_choose.length;
        this.choose_all = house_len === choose_len;
      },
      handleResetOffice() {
        this.office_choose = [];
        this.show_office = [];
      },
      handleResetHouse() {
        this.choose_all = false;
        this.house_choose_items.length = 0;
        this.house_choose = [];
      },
      handleClick(tab) {
        if (tab.name === 'first') {
          this.params.area_max = '';
          this.params.area_min = '';
          this.params.type = 1;
        } else {
          this.params.type = 2;
        }
        this.getHouseList();
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/components/house-filter.scss";

  #house-filter {

  }
</style>
