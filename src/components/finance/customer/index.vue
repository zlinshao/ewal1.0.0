<template>
  <div id="customer">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>客户</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>

      <div class="items-center listTopRight" v-show="!action_visible">
        <!--<p class="status-icon" v-for="item in statusBar" v-if="chooseTab===1||chooseTab===2">-->
          <!--<span style="margin-left: 16px"><i :class="item.class"></i><span>{{item.iconText}}</span></span>-->
        <!--</p>-->
        <!--<div class="icons btn_output"></div>-->
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch(chooseTab)"></div>
        </el-tooltip>
      </div>
    </div>
    <div class="action-bar changeChoose">
      <div class="action-bar-left" v-show="action_visible">
        <!--<el-checkbox>全选</el-checkbox>-->
        <!--<span class="check-count" >已选中 <i>{{multipleSelection.length}}</i> 项</span>-->
        <span class="action-bar-name">
          <span class="edit" @click="action_status.details_visible=true;action_status.is_check=true">查看</span>
          <span class="edit" @click="action_status.details_visible=true;action_status.is_check=false">编辑</span>
          <!-- 当切换为租房预定时，只展示查看和编辑按钮 -->
          <div v-show='chooseTab != 3'>
            <span class="edit" @click="cancelOrRecoverRemark(chooseTab,current_row,current_row.prefix_suppress_dup)" style="color: #FFAB40">{{current_row.prefix_suppress_dup?'恢复重复标记':'忽略重复标记'}}</span>
            <span class="edit" style="color: orangered"
                  @click="current_row.freeze===0 ? handleProcess(chooseTab,current_row):handleCancelProcess(chooseTab,current_row)">
                {{current_row.freeze === 0 ? '生成待处理项':'取消待处理项'}}
            </span>
          </div>
          <!--<span class="delete" style="color: #CF2E33" @click="action_status.delete_visible=true">删除</span>-->
        </span>
      </div>

    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    <!--房东-->
    <div v-if="chooseTab === 1">
      <lord :searchParams="search_params"
            @getMultipleSelection="getSelectionVal"
            ref="lord"
            :status="action_status"
            :current_row_info="current_row">

      </lord>
    </div>
    <!--租客-->
    <div v-if="chooseTab === 2">
      <renter @getMultipleSelection="getSelectionVal"
              ref="renter"
              :searchParams="search_params"
              :status="action_status"
              :current_row_info="current_row">
      </renter>
    </div>
    <!--租房预定-->
    <div v-if="chooseTab === 3">
      <rent-order @getMultipleSelection="getSelectionVal"
              ref="rentOrder"
              :searchParams="search_params"
              :status="action_status"
              :current_row_info="current_row">
      </rent-order>
    </div>

    <HouseFilter :visible="commonModule.house_filter_visible" @close="handleGetHouseResource"></HouseFilter>
    
    <StaffOrgan :module="commonModule.staffModule" @close="hiddenStaff"></StaffOrgan>
    <DepartOrgan :module="commonModule.departModule" @close="hiddenDepart"></DepartOrgan>
    <PostOrgan :module="commonModule.postModule" @close="hiddenPost"></PostOrgan>

  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import lord from './lord/index.vue';
  import renter from './renter/index.vue';
  import rentOrder from './rent-order/index.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';
  import LordForm from "./lord/lordForm.vue";
  import renterForm from "./renter/renterForm.vue";
  import rentOrderForm from "./rent-order/rentOrderForm.vue";
  import {pendingSearchList, lordSearchList,RenterSearchList,RenterOrderSearchList} from "../../../assets/js/allSearchData.js";

  import StaffOrgan from '../../common/staffOrgan.vue';
  import DepartOrgan from '../../common/departOrgan.vue';
  import PostOrgan from '../../common/postOrgan.vue';
  import HouseFilter from '../../marketCentre/components/house-filter.vue';

  export default {
    name: "index",
    components: {
      LordForm,
      renterForm,
      rentOrderForm,
      SearchHigh,
      LjDialog,
      FinMenuList,
      LjSubject,
      lord,
      renter,
      rentOrder,
      StaffOrgan,
      DepartOrgan,
      PostOrgan,
      HouseFilter
    },
    data() {
      return {
        pendingSearchList,
        lordSearchList,
        RenterSearchList,
        RenterOrderSearchList,
        action_visible: false,//操作栏作态
        chooseTab: 1,
        selects: [
          {id: 1, title: '房东',},
          {id: 2, title: '租客',},
          {id: 3, title: '租房预定'},
        ],
        statusBar: [
          {class: "phone", iconText: "手机"},
          {class: "name", iconText: "姓名"},
          {class: "address", iconText: "地址"},
        ],
        search_params: {},
        showSearch: false,//搜索
        showFinMenuList: false,//收起
        searchData: {},//搜索项
        lord_form: {
          "address": "",
          "rental_subject": "",
          "deposit_subject": "",
          "departmentName": "",
          "staffName": "",
          "operatorName": "",
          "leaderName": "",
          "prices_val": "",
          "pay_types_val": "",
          "staff_id": "",
          "department_id": "",
          "leader_id": "",
          "customer_name": "",
          "contact": "",
          "house_id": "",
          "months": "",
          "prices": [],
          "pay_types": [],
          "payType": '',
          "deposit": "",
          "medi_cost": "",
          "warrenty": "",
          "deal_date": "",
          "first_pay_date": "",
          "second_pay_date": "",
          "remark": "",
          "account_type": "",
          "account_owner": "",
          "account_subbank": "",
          "account_bank": "",
          "account_num": "",
          "subject_id": {
            "rental": "",
            "deposit": ""
          },
          "v3_contract_id": "",
          "cate": "",
        },
        renter_form: {
          "address": "",
          "rental_subject": "",
          "deposit_subject": "",
          "departmentName": "",
          "staffName": "",
          "operatorName": "",
          "leaderName": "",
          "prices_val": "",
          "pay_types_val": "",
          "staff_id": "",
          "department_id": "",
          "leader_id": "",
          "customer_name": "",
          "contact": "",
          "house_id": "",
          "months": "",
          "prices": [],
          "pay_types": [],
          "payType": '',
          "deposit": "",
          "medi_cost": "",
          "warrenty": "",
          "deal_date": "",
          "first_pay_date": "",
          "second_pay_date": "",
          "remark": "",
          "account_type": "",
          "account_owner": "",
          "account_subbank": "",
          "account_bank": "",
          "account_num": "",
          "subject_id": {
            "rental": "",
            "deposit": ""
          },
          "v3_contract_id": "",
          "cate": "",
        },
        action_status: {//操作条状态
          delete_visible: false, 
          edit_visible: false,    
          details_visible: false,  
          is_check: false,
        },
        current_row: '',//选中的行
        commonModule: {
          postModule: false,//岗位
          departModule: false,//部门
          staffModule: false,//员工
          house_filter_visible: false,//房屋地址
        },//共用组件状态
        commonModuleData: {
          leader_name: '',
          leader_id: '',
          department_id: '',
          department_name: '',
          staff_name: '',
          staff_id: '',

          address_name: '',
          address_id: [],
          address_type: '',
        },//共用组件数据
      }
    },
    mounted() {
    },
    created() {
      this.$bus.on('openCommonModule', this.getCommonModule);

    },
    beforeDestroy() {
      this.$bus.off('openCommonModule', this.getCommonModule);
    },
    watch: {
      current_row: {
        handler(val) {

        },
        deep: true
      },
      action_status: {
        handler(val) {

        },
        deep: true
      },
      commonModuleData: {
        handler(val) {
          this.$bus.emit('moduleData', val)
        },
        deep: true,
      },
      commonModule: {
        handler(val) {
          this.$bus.emit('moduleDataStatus', val)
        },
        deep: true,
      },
    },

    computed: {},
    methods: {
      // 切换
      changeTabs(id) {
        this.chooseTab = id;
        this.current_row = '';
        this.action_visible = false;
      },
      //取消或恢复重复标记  取消type 0 恢复type 1
      cancelOrRecoverRemark(tab, val,type) {
        if (tab === 1) {
          this.$refs.lord.handleRemark(val,type);
        } else if (tab === 2) {
          this.$refs.renter.handleRemarkRenter(val,type);
        }
      },
      //生成处理项
      handleProcess(tab, val) {
        if (tab === 1) {
          this.$refs.lord.handleProcessLord(val);
        } else if (tab === 2) {
          this.$refs.renter.handleProcessRenter(val);
        }
      },
      //取消处理项
      handleCancelProcess(tab, val) {
        if (tab === 1) {
          this.$refs.lord.handleCancelProcessLord(val);
        } else if (tab === 2) {
          this.$refs.renter.handleCancelProcessRenter(val);
        }
      },
      // 获取选项值
      getSelectionVal(val) {
        if (val) {
          this.action_visible = true;
          this.current_row = val;
        } else {
          this.action_visible = false;
          this.current_row = '';
        }
      },
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 1:
            this.searchData = this.lordSearchList;
            break;
          case 2:
            this.searchData = this.RenterSearchList;
            break;
          case 3:
            this.searchData = this.RenterOrderSearchList;
            break;
        }

      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          this.search_params = val;
          this.$bus.emit('getParams', this.search_params);
        }
      },

      //获取共用组件状态
      getCommonModule(val) {
        // debugger
        if (val) {
          for (let item of Object.keys(this.commonModule)) {
            this.commonModule[item] = val[item];
          }
        }
      },
      //获取部门信息
      hiddenDepart(ids, names, arr) {
        this.commonModule.departModule = false;
        if (ids !== 'close') {
          this.commonModuleData.department_id = ids[0];
          this.commonModuleData.leader_name = arr[0].leader.name;
          this.commonModuleData.leader_id = arr[0].leader_id;
          this.commonModuleData.department_name = names;
        }
      },
      //获取员工信息
      hiddenStaff(ids, names, arr) {
        this.commonModule.staffModule = false;
        if (ids !== 'close') {
          this.commonModuleData.staff_name = names;
          this.commonModuleData.staff_id = ids[0];
        }
      },
      //获取岗位信息
      hiddenPost(ids, names, arr) {
        this.commonModule.postModule = false;
      },
      //获取房源信息
      handleGetHouseResource(house, type) {
        // console.log(house);
        // console.log(type);
        this.commonModule.house_filter_visible = false;
        if (house!='close') {
          this.commonModuleData.address_name = '';
          this.commonModuleData.address_id = [];
          if(house.length>0){
            house.map(item => {
              this.commonModuleData.address_name += item.house_name + ',';
              if (type === 'house') {
                this.commonModuleData.address_type = 1;
                this.commonModuleData.address_id.push(item.house_id);
              } else {
                this.commonModuleData.address_type = 2;
                this.commonModuleData.address_id.push(item.village_id);
              }
            });
            this.commonModuleData.address_name = this.commonModuleData.address_name.substring(0, this.commonModuleData.address_name.length - 1);
            // this.commonModule.house_filter_visible = false;
          }
        }
        // else{
          // this.commonModule.house_filter_visible = false;
        // }

      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/customer/index.scss";

  @mixin financeImg($m, $n) {
    $url: '../../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customer {
      .statusBar {
        span {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-left: 4px;
        }
      }
      .btn_output {
        @include financeImg('upLoad.png', 'theme1')
      }
      .phone {
        @include financeImg('dianhua.png', 'theme1')
      }
      .name {
        @include financeImg('kehu.png', 'theme1')
      }
      .address {
        @include financeImg('dizhi.png', 'theme1')
      }

    }
  }
</style>
