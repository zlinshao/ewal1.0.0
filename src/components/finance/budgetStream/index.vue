<template>
  <div id="budgetStream">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>收支流水</h1>
      </div>
      <div class="items-center listTopRight">
        <el-popover
          placement="bottom-end"
          :visible-arrow="false"
          trigger="hover"
          content="银行流水">
          <div slot="reference" class="icons bank" @click="handleOpenBankRun"></div>
        </el-popover>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          align="center"
          label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.scope]">
              <p>{{status[scope.row.scope]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" prop="operate_time" min-width="150px" align="center"></el-table-column>
        <el-table-column label="客户姓名" prop="customer.customer_name" align="center"></el-table-column>
        <el-table-column min-width="180px" label="地址" prop="address" align="center"></el-table-column>
        <el-table-column label="科目名称" prop="subject" align="center"></el-table-column>
        <el-table-column label="类型" prop="cate" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cate === 1 ? '收入' : '支出'}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130px" label="账户名称" prop="name" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column min-width="150px" label="卡号" prop="account_num" align="center"></el-table-column>
        <el-table-column label="应收金额" prop="amount_receivable" align="center"></el-table-column>
        <el-table-column label="实收金额" prop="amount_received" align="center"></el-table-column>
        <el-table-column label="应付金额" prop="amount_payable" align="center"></el-table-column>
        <el-table-column label="实付金额" prop="amount_paid" align="center"></el-table-column>
        <el-table-column label="账户余额" prop="amount_remain" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="详细信息" prop="fund.description" min-width="300px" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="收/付款人员" prop="operator.name" align="center"></el-table-column>
      </el-table>
      <!--分页-->
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="tableCount"
            layout="total,jumper,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--银行流水-->
    <lj-dialog
      :visible="bank_run_visible"
      :size="bank_run_size"
      @close="bank_run_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header flex-center">
          <h3>银行流水</h3>
          <!--<div>-->
            <!--<span class="bank"></span>-->
            <!--<span class="search"></span>-->
          <!--</div>-->
        </div>
        <div class="dialog_main">
          <el-table
            :data="bank_run_data"
          >
            <el-table-column prop="create_time" label="导入时间" align="center"></el-table-column>
            <el-table-column prop="id" label="流水导入批次" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="account_num" label="包含账户数量" align="center"></el-table-column>
            <el-table-column prop="bank_flow_num" label="流水数量" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
            <el-table-column prop="" label="操作" align="center" min-width="120px">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" v-if="status===4" @click="handleOpenBankRunUpdate(scope.row,scope.$index)">补充</el-button>
                <el-button size="mini" type="danger" @click="handleOpenBankRunArchive(scope.row,scope.$index)">归档</el-button>
                <el-button size="mini" type="primary"  @click="handleOpenBankRunDetail(scope.row,scope.$index)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="bank_run_count"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--银行流水详情-->
    <lj-dialog
      :visible="bank_run_detail_visible"
      :size="{width: 700 + 'px',height: 640 + 'px'}"
      @close="bank_run_detail_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header flex-center">
          <h3>银行流水详情</h3>
        </div>
        <div class="dialog_main">
          <el-table
            :data="bank_run_detail_data"
          >
            <el-table-column prop="create_time" label="打款时间" align="center"></el-table-column>
            <el-table-column prop="balance" label="金额" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="bank.name" label="所属银行" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="bank_run_detail_count"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small"  @click="bank_run_detail_visible = false;current_row = ''">关闭</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--归档-->
    <lj-dialog :visible="archive_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="archive_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>归档</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">归档后该批次流水无法补充或移除！</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleBankRunArchive">确定</el-button>
          <el-button type="info" size="small"  @click="archive_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--补充-->
    <lj-dialog :visible="update_visible" :size="{width: 700 + 'px',height: 560 + 'px'}" @close="update_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>补充</h3>
        </div>
        <div class="dialog_main">

        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" >导入</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue'
  import FinMenuList from '../components/finMenuList.vue'
  import LjDialog from '../../common/lj-dialog';
  import {accountRunSearch} from '../../../assets/js/allSearchData.js';

  export default {
    name: "index",
    components: {SearchHigh, FinMenuList,LjDialog},
    data() {
      return {
        accountRunSearch,
        current_row:'',

        staff_visible: false,
        bank_run_visible: false,
        bank_run_size: '',
        bank_run_data: [],
        bank_run_count:0,

        bank_run_detail_visible:false,
        archive_visible:false,//归档
        update_visible:false,//补充
        bank_run_detail_data:[],
        bank_run_detail_count:0,
        detail_params: {
          search: '',
          page: 1,
          limit: 6,
          export: '',
        },


        showFinMenuList: false,

        params: {
          search: '',
          page: 1,
          limit: 12,
          start_date: '',
          end_date: '',
          cate: '',
          subject_id: '',
          account_id: '',
          operate_start_date: '',
          operate_end_date: '',
          export: '',
        },
        tableData: [],
        tableCount: 0,

        status: {
          3: '收入',
          5: '支出',
        },
        chooseRowIds: [],

        showSearch: false,
        searchData: {}
      }
    },
    mounted() {
      this.getAccountRunList();
    },
    watch: {},
    computed: {},
    methods: {
      //请求回调
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          // this.getAccountRunList();
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
      // 切换分页
      handleChangePage(page) {
        this.params.page = page;
        this.getAccountRunList();
      },
      //收支流水
      getAccountRunList() {
        this.$http.get(globalConfig.temporary_server + 'fund_flow_record',this.params).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.tableCount = res.data.count;
          } else {
            this.tableData = [];
            this.tableCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },

      handleOpenBankRun() {
        this.bank_run_size = 'large';
        this.bank_run_visible = true;
        this.getBankRun();
      },

      handleOpenBankRunDetail(row,index){
        this.bank_run_detail_visible = true;
        this.getBankRunDetail(row.id);
      },
      //银行流水详情
      getBankRunDetail(code){
        this.$http.get(globalConfig.temporary_server + 'bank_fund_flow?batch_flow_code='+code,this.detail_params).then(res=>{
          if(res.code===200){
            this.bank_run_detail_data = res.data.data;
            this.bank_run_detail_count = res.data.data.length;
          }

        })
      },
      //银行流水
      getBankRun(){
        this.$http.get(globalConfig.temporary_server + 'bank_batch_count',this.params).then(res=>{
          if(res.code===200){
            console.log(res.data.data);
            this.bank_run_data = res.data.data;
            this.bank_run_count = res.data.data.length;
          }

        })
      },
      handleOpenBankRunArchive(row,index){
        this.archive_visible = true;
        this.current_row = row;
      },
      //归档
      handleBankRunArchive(){
        this.$http.put(globalConfig.temporary_server + 'bank_batch_count/archive',{id:this.current_row.id}).then(res=>{
          if(res.code===200){
            this.callbackSuccess(res);
            this.archive_visible = false;
          }
        })
      },

      //补充
      handleOpenBankRunUpdate(row,index){
        this.update_visible = true;
        this.current_row = row;
      },

      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData = this.accountRunSearch;
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
          for(let item of Object.keys(this.params)){
              this.params[item] = val[item];
          }
          this.getAccountRunList();
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/budgetStream/index.scss";

  @mixin budgetStreamImg($m, $n) {
    $url: '../../../assets/image/finance/budgetStream/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #budgetStream {
      .mainListTable {
        .status {
          color: $colorFFF;
        }
        .status3 {
          p {
            @include budgetStreamImg('shouru.png', 'theme1');
          }
        }
        .status5 {
          p {
            @include budgetStreamImg('zhichu.png', 'theme1');
          }
        }
      }
      .dialog_header {
        h3,div {
          width: 100%;
        }
        > div {
          text-align: right;
          > span {
            display: inline-block;
            width: 30px;
            height: 30px;
            @include radius(50%);
            cursor: pointer;
          }
          .bank {
            background-color: #00FDFF;
          }
          .search {
            background-color: #008A7B;
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #budgetStream {

    }
  }

  #theme_name.theme3 {
    #budgetStream {

    }
  }

  #theme_name.theme4 {
    #budgetStream {

    }
  }
</style>
