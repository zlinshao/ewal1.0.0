<template>
  <div id="miantenance">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>维修保洁</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click='addOrder'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData['workOrder'].tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @cell-click="tableClickRow" header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p>{{tableSettingData.workOrder.status[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="item in Object.keys(tableSettingData.workOrder.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.workOrder.showData[item]">
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.workOrder.params.page"
            :page-size="tableSettingData.workOrder.params.limit" :total="tableSettingData.workOrder.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <LjDialog :visible="addOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseAddOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建维修单</h3>

        </div>
        <div class="dialog_main addOrder_dialog">
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='6'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <el-input disabled placeholder="请填写" v-model='addOrder_options.house_name'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon type'></i><span>类型</span></p>
                <div class='input_box'>
                  <el-radio v-model="addOrder_options.type" label="1">维修</el-radio>
                  <el-radio v-model="addOrder_options.type" label="2">保洁</el-radio>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon post'></i><span>派单至</span></p>
                <div class='input_box'>
                  <el-input @focus="this.staffModule = true" readonly v-model="addOrder_options.post"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="this.staffModule = true" readonly v-model="addOrder_options.handler"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="this.departModule = true" readonly v-model="addOrder_options.org"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='addOrder_options.mobile'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="addOrder_options.endTime" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择日期">
                    <!-- :picker-options="addOrder_options.pickerOptions" -->
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon status'></i><span>紧急时间</span></p>
                <div class='input_box'>
                  <el-select v-model="addOrder_options.status" placeholder="请选择">
                    <el-option label="特急" value="特急"></el-option>
                    <el-option label="紧急" value="紧急"></el-option>
                    <el-option label="重要" value="重要"></el-option>
                    <el-option label="一般" value="一般"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span='6'>
                <p class='el-col-p'><i class='icon content'></i>内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="addOrder_options.content"></el-input>
                </div>
              </el-col>

              <el-col :span='18'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='addOrder_options.imgList'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div class='el-box'>

                </div>
              </el-col>
              <el-col :span='22'>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
          <el-button type="danger" size="small" @click="handleCloseAddOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>

    <!--选择人员-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart"></DepartOrgan>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import StaffOrgan from '../../common/staffOrgan';
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'
import { maintenanceSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import LjDialog from '../../common/lj-dialog.vue';
export default {
  name: "index",
  components: { SearchHigh, MenuList, LjDialog, StaffOrgan, DepartOrgan, Ljupload },
  data () {
    return {
      maintenanceSearch,
      customService,
      visibleStatus: false,
      chooseTab: 1,
      selects: [
        {
          id: 1,
          title: '待处理',
        },
        {
          id: 2,
          title: '跟进中',
        },
        {
          id: 3,
          title: '已完成',
        }
      ],


      currentTable: 'workOrder',
      tableSettingData: {
        workOrder: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            createTime: '创建时间',
            workOrderId: '工单编号',
            type: '类型',
            address: '地址',
            content: '内容',
            endTime: '截至时间',
            handler: '处理人',
            createUser: '创建人',
            department: '部门',
          },
          tableData: [],
          status: {
            1: '特急',
            2: '紧急',
            3: '重要',
            4: '一般',
          },
          chooseRowIds: [],
          currentSelection: {}//当前选择行
        },
        goods: {
          counts: 0,
          params: {
            search: '',
            page: 1,
            limit: 8,
          },
          chooseRowIds: [],
          currentSelection: {},//当前选择行,
          multiSelection: [],//多选行
          isShowMulti: false,//是否显示多选
        },
      },

      chooseRowIds: [],

      showSearch: false,
      searchData: {},
      market_server: globalConfig.market_server,
      addOrder_visible: false,
      addOrder_options: {
        house_name: '',
        type: '',
        post: '',
        handler: '',
        org: '',
        mobile: '',
        endTime: '',
        status: '',
        content: '',
        imgList: [],
      },
      staffModule: false,//显示人员选择
      organData: { //最多选择几个人
        num: 1
      },
      departModule: false, //部门选择
      departData: {
        num: 1,
      }
    }
  },
  mounted () {
    this.initData();
  },
  activated () {
  },
  watch: {},
  computed: {},
  methods: {

    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          status: '1',
          createTime: '2019-03-28',
          workOrderId: '10086',
          type: '维修',
          address: '地址',
          content: '内容',
          endTime: '2019-04-25',
          handler: '处理人',
          createUser: '创建人',
          department: '部门',
        };
        this.tableSettingData[this.currentTable].tableData.push(obj);
      }
    },
    //工单表格数据初始化
    getDateList () {
      this.showLoading(true);
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}`, this.params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          console.log(this.tableData)
          this.tableDateCount = res.data.count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    // tab切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id;
        // this.getDateList()
      }
    },
    // add 工单
    addOrder () {
      this.addOrder_visible = true
    },
    hiddenOrgan (ids, names, arr) { // 关闭 选择人员
      this.staffModule = false;
      if (ids !== 'close') {
        // this.postman = names
        // this.postMess.person = arr
        console.log(ids, names, arr)
      }
    },
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (dis != 'close') {
        console.log(ids, names, arr)
      }
    },

    handleCloseAddOrder () {
      this.addOrder_visible = false
    },
    /*  // 当前点击
     tableClickRow(row) {
       let ids = this.chooseRowIds;
       ids.push(row.id);
       this.chooseRowIds = this.myUtils.arrayWeight(ids);
     },
     // 点击过
     tableChooseRow({row, rowIndex}) {
       return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
     },*/
    // 当前点击
    tableClickRow (row) {
      this.tableSettingData[this.currentTable].currentSelection = row;
      let ids = this.tableSettingData[this.currentTable].chooseRowIds;
      ids.push(row.id);
      this.ids = this.myUtils.arrayWeight(ids);
    },

    //表格某一行双击
    tableDblClick (row) {
      console.log(row);
      //this.in_workOrder_table_visible = true;
    },
    //table多选时触发的事件
    handleSelectionChange (val) {
      switch (this.currentTable) {
        case 'workOrder':
          console.log('re' + val);
          break;
        case 'goods':
          this.tableSettingData[this.currentTable].multiSelection = val;
          break;
        default:
          break;
      }
      console.log(val);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
    handleSizeChange (val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {

      this.tableSettingData[this.currentTable].params.page = val;
      switch (this.currentTable) {
        case 'workOrder':
          this.getRepositoryList();
          break;
        case 'goods':
          this.getGoodsList();
          break;
        default:
          break;
      }
      //this.getRepositoryList();
      //console.log(`当前页: ${val}`);
    },







    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = maintenanceSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    }
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/maintenance/index.scss";
</style>
