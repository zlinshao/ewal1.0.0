<template>
  <div id="house-filter">
    <div>
      <lj-dialog :visible.sync="dialog_visible" :size="{width: 1200 + 'px',height: 830 + 'px'}" @close="handleCancelChoose">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>请选择房屋地址</h3>
            <!-- 搜索按钮 -->
            <div class="header_right borderNone">
              <el-input style="width: 200px;" size="small" v-if="show_search" v-model="params.search"></el-input>
              <div class="search" @click="handleGoSearch"></div>
            </div>
          </div>
          <div class="dialog_main">
            <!-- 房屋地址 -->
            <div class="flex">
                <div class="left_container changeChoose">
                <div class="header_control flex">
                    <span>{{$storage.get('user_info').company_info.name || '乐伽商业管理有限公司'}}</span>
                </div>
                <div class="house-address scroll_bar">
                    <div>
                    <el-radio-group v-model="selectedIndex" @change="handleChangeItem" >
                        <div class="checkbox_item" v-for="(item,index) in house_resource">
                            <el-radio  :label="item.house_id"  :key="item.house_id">{{ item.house_name }}</el-radio >
                        </div>
                    </el-radio-group>
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
                    <div class="clear_all" @click="handleDeleteItem()">清空</div>
                </div>
                <div class="house-address right_address scroll_bar">
                    <div>
                    <div class="checkbox_item flex" >
                        <div class="choose_txt" v-if='house_choose_items.house_name'>{{ house_choose_items.house_name }}</div>
                        <div class="delete_choose" v-if='house_choose_items.house_name' @click="handleDeleteItem()">－</div>
                    </div>
                    </div>
                </div>
                <!--底部按钮-->
                <div class="footer_btn flex-center">
                    <el-button type="danger" size="small" @click="handleSubmitChoose()">确定</el-button>
                    <el-button type="info" size="small" @click="handleCancelChoose()">取消</el-button>
                </div>
                </div>
            </div>
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
    name: "HouseAdress",
    props: {
      visible: {},
      selectHouseItem:'', //房屋id
    },
    data() {
      return {
        selectedIndex:'-1', //默认不选
        market_server: globalConfig.market_server,
        fullLoading:false,//加载
        dialog_visible: false,
        show_search: false,
        house_choose_items: {}, //被选择的数据
        house_resource: [],
        house_count: 0,
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

      }
    },
    mounted() {
        this.getHouseList();
    },
    watch: {
      visible(val) {
        this.dialog_visible = val;
        if(val){
            this.selectedIndex=this.selectHouseItem.house_id;
            this.house_choose_items=this.selectHouseItem;
        }
      },
      deep:true,
      immediate: true,
    },
    computed: {},
    methods: {
        //获取房屋
        getHouseList() {
            this.fullLoading = true;
            this.house_resource = [];
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
        },
        // 分页
        handleChangePage(page) {
            this.params.page = page;
            this.getHouseList();
        },

        //选择事件
        handleChangeItem(val) {
            this.house_choose_items = {};
            this.house_resource.forEach(element => {
                if(element.house_id==val){
                    this.house_choose_items=element;
                }
            });
        },
        //删除一个、清空
        handleDeleteItem(house,idx) {
            this.selectedIndex=-1;
            this.house_choose_items = {};
        },
        //搜索
        handleGoSearch() {
            this.show_search = true;
            this.getHouseList();
        },
        // 确定按钮
        handleSubmitChoose(type) {
            this.$emit('close',this.house_choose_items);
        },
        //取消
        handleCancelChoose(type) {
            this.$emit('close','close');
        },

    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/marketCentre/components/house-filter.scss";

</style>
