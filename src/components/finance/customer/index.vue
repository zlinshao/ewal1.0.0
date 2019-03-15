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

      <div class="items-center listTopRight">
        <p class="status-icon" v-for="item in statusBar">
          <span style="margin-left: 16px"><i
            :style="{'background-color':item.iconColor}"></i><span>{{item.iconText}}</span></span>
        </p>
        <div class="icons home_icon"></div>
        <div class="icons add" @click="addCustomer(chooseTab)"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    <!--房东-->
    <div v-if="chooseTab === 1">
      <lord></lord>
    </div>
    <!--租客-->
    <div v-if="chooseTab === 2">
      <renter></renter>
    </div>
    <!--新增-->
    <lj-dialog :visible="add_visible" :size="{width: 960 + 'px',height: 820 + 'px'}" @close="add_visible = false">
      <lord-form v-if="chooseTab===1"  :formData="lord_form" :current_row="current_row"></lord-form>
      <renter-form v-if="chooseTab===2" :formData="renter_form" :current_row="current_row"></renter-form>
    </lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import lord from './lord/index.vue';
  import renter from './renter/index.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';
  import LordForm from "./lord/lordForm.vue";
  import renterForm from "./renter/renterForm.vue";

  export default {
    name: "index",
    components: {
      LordForm,
      renterForm,
      SearchHigh,
      LjDialog,
      FinMenuList,
      LjSubject,
      lord,
      renter,
    },
    data() {
      return {
        chooseTab: 1,
        selects: [
          {id: 1, title: '房东',},
          {id: 2, title: '租客',},
        ],
        statusBar: [
          {iconColor: "#14e731", iconText: "手机"}, {iconColor: "#e6a23c", iconText: "姓名"},
          {iconColor: "#f56c6c", iconText: "地址"}, {iconColor: "#409eff", iconText: "待处理项"},
        ],
        current_row:'',
        showSearch: false,
        showFinMenuList: false,
        add_visible:false,
        searchData: {
          status: 'gathering',
          data: [],
        },
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

      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
    },
    created(){
    },
    computed:{
    },
    methods: {
      changeTabs(id) {
        this.chooseTab = id;
      },
      addCustomer(){
          this.add_visible = true;
          this.current_row = ''
      },
      submitForm(){

      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData.data = [
          {
            keyType: 'date',
            title: '出生日期',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: '',
          },
          {
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '特级',
              },
              {
                id: 13,
                title: '紧急',
              },
              {
                id: 14,
                title: '重要',
              },
              {
                id: 15,
                title: '一般',
              }
            ],
          },
          {
            keyType: 'check',
            title: '状态',
            keyName: 'check',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
        ];
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/customer/index.scss";

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

    }
  }
</style>
