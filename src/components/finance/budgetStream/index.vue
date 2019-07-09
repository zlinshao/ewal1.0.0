<template>
  <div id="budgetStream">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>收支流水</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<div class="icons export" @click="handleExportInfo"></div>-->
        <!-- <el-popover
          v-if="chooseTab===1"
          placement="bottom-end"
          :visible-arrow="false"
          trigger="hover"
          content="银行流水">
          <div slot="reference" class="icons bank" @click="handleOpenBankRun"></div>
        </el-popover> -->
        <el-tooltip content="银行流水" placement="bottom" :visible-arrow="false" v-if="chooseTab===1">
          <div class="icons bank" @click="handleOpenBankRun"></div>
        </el-tooltip>
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch"></div>
        </el-tooltip>
      </div>
    </div>

    <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
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
          label="收入支出">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.cate]">
              <p>{{status[scope.row.cate]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账户" prop="account_num" min-width="150px" align="center"></el-table-column>
        <el-table-column label="交易金额" prop="amount_received" min-width="150px" align="center"></el-table-column>
        <el-table-column label="交易前账户金额" prop="amount_receivable" min-width="150px"
                         align="center"></el-table-column>
        <el-table-column label="地址" prop="address" min-width="150px" align="center"></el-table-column>
        <el-table-column label="交易后账户金额" prop="balance" min-width="150px" align="center"></el-table-column>
        <el-table-column label="交易时间" prop="create_time" min-width="150px" align="center"></el-table-column>
        <el-table-column label="操作人" prop="operator.name" min-width="150px" align="center"></el-table-column>
        <el-table-column label="操作时间" prop="update_time" min-width="150px" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" min-width="150px" align="center"
                         show-overflow-tooltip></el-table-column>
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
      @close="bank_run_visible = false;"
    >
      <div class="dialog_container">
        <div class="dialog_header flex-center">
          <h3>银行流水</h3>
        </div>
        <div class="dialog_main changeChoose">
          <div class="action-bar">
            <div class="action-bar-left">
              <!--<el-checkbox>全选</el-checkbox>-->
              <span class="check-count" v-show="action_visible">已选中 <i>{{multipleSelection.length}}</i> 项</span>

              <span class="action-bar-name" v-show="action_visible">
                                <span class="delete" v-if="current_row.status===2"
                                      @click="handleOpenBankRunUpdate(current_row)">补充/移除</span>
                                <span class="edit" @click="handleOpenBankRunArchive(current_row)">归档</span>
                                <span class="edit" @click="handleOpenBankRunDetail(current_row)">详情</span>
                            </span>
            </div>

          </div>

          <el-table
            :data="bank_run_data"
            highlight-current-row
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            @selection-change="handleSelectionChange"
            style="width: 100%">

            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="create_time" label="导入时间" align="center"></el-table-column>
            <el-table-column prop="id" label="流水导入批次" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="account_num" label="包含账户数量" align="center"></el-table-column>
            <el-table-column prop="bank_flow_num" label="流水数量" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="bank_run_count"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage_bank"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--银行流水详情-->
    <lj-dialog
      :visible="bank_run_detail_visible"
      :size="{width: 1000 + 'px',height: 750 + 'px'}"
      @close="bank_run_detail_visible = false;"
    >
      <div class="dialog_container">
        <div class="dialog_header justify-bet" style="margin-bottom: 20px">
          <h3>
            银行流水详情<br>
            <span style="font-size: 14px">[ {{current_row.id}} ]</span>
          </h3>
          <h3 style="text-align: right">total: {{bank_run_detail_count}}</h3>
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
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage_bankDetail"
            >
            </el-pagination>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="bank_run_detail_visible = false;">关闭
          </el-button>
        </div>
      </div>
    </lj-dialog>
    <!--归档-->
    <lj-dialog :visible="archive_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
               @close="archive_visible = false;">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>归档</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">归档后该批次流水无法补充或移除！</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleBankRunArchive">确定</el-button>
          <el-button type="info" size="small" @click="archive_visible = false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--补充-->
    <lj-dialog :visible="update_visible"
               :size="{width: 1000 + 'px',height: 750 + 'px'}"
               @close="update_visible = false;">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>补充/移除</h3>
        </div>
        <div class="dialog_main">
          <div class="bank-run-list">
            <div v-for="item in bankRunData" class="flex-center">
              <div class="bank-run-info">
                <i></i>
                <span style="text-align: left">交通银行131233....</span>

              </div>
            </div>

          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">导入</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--账户-->
    <lj-dialog :visible="account_visible" :size="{width: 500 + 'px',height: 350 + 'px'}"
               @close="account_visible = false;current_row=''">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>请选择账户</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="params" :rules="rules_account" ref="accountForm" class="demo-ruleForm"
                   label-width="100px">
            <el-form-item label="付款方式">
              <el-select placeholder="请选择" @change="getAccount" v-model="account_type">
                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款账号">
              <el-select placeholder="请选择" v-model="params.account_id" :disabled="is_disabled">
                <el-option v-for="(item,index) in accountLists" :label="item.name" :value="item.id"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="getArchive('accountForm')">确定</el-button>
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
    components: {SearchHigh, FinMenuList, LjDialog},
    data() {
      return {
        accountRunSearch,
        current_row: '',//当前选项
        action_visible: false,//操作栏
        selects: [
          {id: 1, title: '流水',},
          {id: 2, title: '回滚',},
          {id: 3, title: '归档',},
        ],
        account_type: '',
        cate: [
          {title: "银行卡", value: 1,},
          {title: "支付宝", value: 2,},
          {title: "微信", value: 3,},
          {title: "银行卡(数据来自房管中心)", value: 4,},
        ],
        bankRunData: [
          {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'}, {title: '1'},
        ],
        is_disabled: true,
        accountLists: [],
        chooseTab: 1,
        staff_visible: false,
        bank_run_visible: false,
        account_visible: false,//账户
        bank_run_size: '',
        bank_run_data: [],
        bank_run_count: 0,

        bank_run_detail_visible: false,
        archive_visible: false,//归档
        update_visible: false,//补充
        bank_run_detail_data: [],
        bank_run_detail_count: 0,
        detail_params: {
          search: '',
          page: 1,
          limit: 8,
          export: '',
        },
        rules_account: {
          account_id: [
            {required: true, message: '请选择账户', trigger: 'change'},
          ],
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
          is_del: '',//查看回滚
          is_archive: '',//查看归档
        },
        tableData: [],
        tableCount: 0,

        status: {
          1: '收入',
          2: '支出',
        },
        chooseRowIds: [],

        showSearch: false,
        searchData: {},
        multipleSelection: [],
        //导出报表
        exportInfo: '',
        current_item: '',

      }
    },
    mounted() {
      this.getAccountRunList();
    },
    watch: {},
    computed: {},
    methods: {
      handleExportInfo() {//导出报表
        this.exportInfo += this.chooseTab;
      },
      handleSelectionChange(val) {//多选项
        this.multipleSelection = val;
        if (val.length > 0) {
          this.action_visible = true;
          this.current_row = val[0];
        } else {
          this.action_visible = false;
        }
      },
      getAccount() {//账户字典项
        this.$http.get(globalConfig.temporary_server + "account", this.params).then(res => {
          if (res.code === 200) {
            this.accountLists = res.data.data;
            this.is_disabled = false;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getArchive(formName) {// 归档
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.account_visible = false;
            this.getAccountRunList();
          }
        });

      },
      changeTabs(id) {//
        this.chooseTab = id;
        switch (id) {
          case 1:
            this.tableData = [];
            this.params.is_del = '';
            this.params.is_archive = '';
            this.params.account_id = '';
            this.getAccountRunList();
            break;
          case 2:
            this.tableData = [];
            this.params.is_del = 2;
            this.params.is_archive = '';
            this.params.account_id = '';
            this.getAccountRunList();
            break;
          case 3:
            this.params.is_del = '';
            this.params.is_archive = 2;
            this.account_visible = true;
            this.tableData = [];
            this.account_type = '';
            this.params.account_id = '';
            break;
        }


      },
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

      getAccountRunList() {//收支流水列表
        if(!this.validatePermission('Running-List')) return;
        this.$http.get(globalConfig.temporary_server + 'fund_flow_record', this.params).then(res => {
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
      handleChangePage(page) {
        this.params.page = page;
        this.getAccountRunList();
      },

      handleOpenBankRun() {//银行流水弹窗
        this.bank_run_size = 'large';
        this.bank_run_visible = true;
        this.getBankRun();
      },

      handleOpenBankRunDetail(row) {//银行流水详情弹窗
        this.bank_run_detail_visible = true;
        console.log(row);
        this.getBankRunDetail(row.id);
      },
      getBankRunDetail(code) {//银行流水详情
        this.$http.get(globalConfig.temporary_server + 'bank_fund_flow?batch_flow_code=' + code, this.detail_params).then(res => {
          if (res.code === 200) {
            this.bank_run_detail_data = res.data.data;
            this.bank_run_detail_count = res.data.count;
          }
        })
      },
      handleChangePage_bankDetail(page) {// 详情分页
        this.detail_params.page = page;
        this.getBankRunDetail(this.current_row.id);
      },
      getBankRun() { //银行流水列表
        this.$http.get(globalConfig.temporary_server + 'bank_batch_count', this.params).then(res => {
          if (res.code === 200) {
            this.bank_run_data = res.data.data;
            this.bank_run_count = res.data.count;
          } else {
            this.bank_run_data = [];
            this.bank_run_count = 0;
          }

        })
      },
      handleChangePage_bank(page) {//
        this.params.page = page;
        this.getBankRun();
      },
      handleOpenBankRunArchive(row) {
        this.archive_visible = true;
        // this.current_row = row;
      },

      handleBankRunArchive() {//确认归档
        this.$http.put(globalConfig.temporary_server + 'bank_batch_count/archive', {id: this.current_row.id}).then(res => {
          if (res.code === 200) {
            this.callbackSuccess(res);
            this.archive_visible = false;
          }
        })
      },


      handleOpenBankRunUpdate(row) {//补充/移除
        this.update_visible = true;
        // this.current_row = row;
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
          for (let item of Object.keys(this.params)) {
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

        .status1 {
          p {
            @include budgetStreamImg('shouru.png', 'theme1');
          }
        }

        .status2 {
          p {
            @include budgetStreamImg('zhichu.png', 'theme1');
          }
        }
      }

      .dialog_header {
        h3, div {
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

      //导出
      .export {
        @include budgetStreamImg('upLoad.png', 'theme1');
      }
      .bank-run-list {
        .bank-run-info {
          i {
            @include budgetStreamImg('bank-run.png', 'theme1');
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
