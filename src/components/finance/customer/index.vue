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
      <lord :lordStatus="flag"></lord>
    </div>
    <!--租客-->
    <div v-if="chooseTab === 2">
      <renter :renterStatus="flag"></renter>
    </div>
    <!--新增lord-->
    <lj-dialog :visible="add_visible" :size="{width: 900 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main">
          <lord-form></lord-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" @click="handleOkDel">确定</el-button>
          <el-button size="small" plain @click="add_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
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
  import LordForm from "./lord/lordForm";

  export default {
    name: "index",
    components: {
      LordForm,
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
