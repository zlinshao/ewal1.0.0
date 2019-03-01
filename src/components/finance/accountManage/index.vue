<template>
  <div id="accountManage">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>帐户管理</h1>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click="add_account_visible = true"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="accountData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="operate">
              <el-button size="mini" type="primary" plain @click="info_visible = true">点击查看</el-button>
              <el-button size="mini" type="success" plain>更新</el-button>
              <el-button size="mini" type="danger" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :current-page="params.page"
            :page-size="params.limit"
            :total="account_count"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--点击查看-->
    <lj-dialog
      :visible="info_visible"
      :size="'large'"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>归档/充值</h3>
        </div>
        <div class="dialog_main"></div>
        <div class="dialog_footer"></div>
      </div>
    </lj-dialog>

    <!--新增账户-->
    <lj-dialog
      :visible="add_account_visible"
      :size="{width: 500 + 'px',height: add_account.cate === 1 ? 700 + 'px' : 600 + 'px'}"
      @close="handleCancelAdd"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增账户</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="add_account" size="mini" ref="addAccount">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>账户名称</span>
                </div>
                <div class="item_content">
                  <el-input v-model="add_account.name" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>所有人</span>
                </div>
                <div class="item_content">
                  <el-input v-model="add_account.account_owner" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>账户类型</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="add_account.cate" placeholder="请输入">
                    <el-option v-for="(item,key) in cate" :value="parseInt(key)" :key="key" :label="item"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item v-if="add_account.cate === 1">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_bank"></i>
                  </b>
                  <span>银行</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="add_account.bank" placeholder="请选择">
                    <el-option v-for="(item,key) in banks" :value="item" :key="key" :label="item"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item v-if="add_account.cate === 1">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>支行</span>
                </div>
                <div class="item_content">
                  <el-input v-model="add_account.sub_bank" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>账户账号</span>
                </div>
                <div class="item_content">
                  <el-input v-model="add_account.account_num" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>初始金额</span>
                </div>
                <div class="item_content">
                  <el-input type="number" v-model="add_account.amount_base" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>账户范围</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="add_account.scope" placeholder="请选择">
                    <el-option :value="3" label="收款"></el-option>
                    <el-option :value="5" label="付款"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注</span>
                </div>
                <div class="item_content">
                  <el-input v-model="add_account.remark" type="textarea" placeholder="请输入"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleSubmitAdd('addAccount')">确定</el-button>
          <el-button size="small" @click="handleCancelAdd">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue'
  import FinMenuList from '../components/finMenuList.vue'
  import LjDialog from '../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: {SearchHigh, FinMenuList, LjDialog},
    data() {
      return {
        add_account_visible: false,
        add_account: {
          name: '',
          account_owner: '',
          sub_bank: '',
          cate: '',
          bank: '',
          account_num: '',
          amount_base: '',
          scope: '',
          remark: ''
        },
        info_visible: false,
        showFinMenuList: false,
        showData: {
          name: '户名',
          account_num: '卡号',
          account_owner: '开户人',
          amount_remain: '当前余额',
        },
        chooseRowIds: [],
        accountData: [],

        showSearch: false,
        searchData: {},

        params: {
          page: 1,
          limit: 12,
          search: '',
          cate: '',
          account_owner: '',
          account_num: '',
        },
        cate: {},
        banks: [],
        account_count: 0,
      }
    },
    mounted() {
      this.getAccountList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleChangePage(page) {
        this.params.page = page;
        this.getAccountList();
      },
      handleSubmitAdd() {
        console.log(this.add_account);
        this.add_account.amount_base = parseFloat(this.add_account.amount_base).toFixed(2);
        this.$http.post(globalConfig.temporary_server + 'account',this.add_account).then(res => {
          this.callbackSuccess(res);
          this.add_account_visible = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleCancelAdd() {
        this.add_account_visible = false;
      },
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$notify.success({
            title: '成功',
            message: res.msg
          });
          this.getAccountList();
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.msg
          });
          return false;
        }
      },
      getAccountList() {
        this.$http.get(globalConfig.temporary_server + 'account',this.params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.cate = res.data.cate;
            this.banks = res.data.banks;
            this.account_count = res.data.count;
            this.accountData = res.data.data;
          } else {
            this.cate = {};
            this.banks = [];
            this.account_count = 0;
            this.accountData = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
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
  @import "../../../assets/scss/finance/accountManage/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/finance/accountManage/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #accountManage {

    }
  }

  #theme_name.theme2 {
    #accountManage {

    }
  }

  #theme_name.theme3 {
    #accountManage {

    }
  }

  #theme_name.theme4 {
    #accountManage {

    }
  }
</style>
