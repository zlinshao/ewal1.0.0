<!--客户管理-->
<template>
  <div id="customerManagement">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b @click="show_market = true">...</b>
            <!--<b>...</b>-->
          </p>
          <h1>客户管理</h1>
          <h2 class="items-center">
              <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                    :class="{'chooseTab': chooseTab === item.id}">
                {{item.title}}<i></i>
              </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="handleOpenHigh"></div>
        </div>
      </div>

      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="customerList"
          height="700px"
          @row-dblclick="handleOpenDetail"
        >
          <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="house_name" label="地址" align="center"></el-table-column>
          <el-table-column prop="idtype" label="身份" align="center"></el-table-column>
          <el-table-column prop="sign_user" label="开单人" align="center"></el-table-column>
          <el-table-column prop="org_leader" label="负责人" align="center"></el-table-column>
          <el-table-column prop="sign_org" label="所属部门" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="warning" id="active-warning" size="mini" @click="handleGoMoveOutBlack(scope.row)" v-if="chooseTab === 4">移出黑名单</el-button>
              <el-button id="active-danger" type="danger" size="mini" @click="handleGoMoveBlack(scope.row)" v-else>移至黑名单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="customerCount"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>

      <!--添加黑名单-->
      <lj-dialog
        :visible="black_mark_visible"
        :size="{width: 450 + 'px',height: 300 + 'px'}"
        @close="handleCancelMoveBlack"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加黑名单</h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="80px">
              <el-form-item label="添加备注">
                <el-input v-model="remark" placeholder="请输入" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleSubmitMoveBlack">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelMoveBlack">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--客户详情-->
      <lj-dialog
        :visible="detail_visible"
        :size="{width: 1200 + 'px',height: 800 + 'px'}"
        @close="handleCloseDetail"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>详情</h3>
          </div>
          <div class="dialog_main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="客户信息" name="first">
                <el-form label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="客户姓名">
                        <span>{{ current_detail.name }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="性别">
                        <span>{{ current_detail.sex || '/'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="手机号码">
                        <span>{{ current_detail.phone }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证件类型">
                        <span>{{current_detail.idtype || '/'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证件号码">
                        <span>{{ current_detail.idcard || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房屋地址">
                        <div v-if="current_detail.address_info">
                          <span v-for="(item,idx) in current_detail.address_info">{{ item.house_name || '/'}}<a v-if="idx !== current_detail.address_info.length">;</a></span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="小区地址">
                        <div v-if="current_detail.address_info">
                          <span v-for="(item,idx) in current_detail.address_info">{{ item.community_address }}<a v-if="idx !== current_detail.address_info.length">;</a></span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="customer_type !== '租客'">
                      <el-form-item label="开户行">
                        <span>{{ current_detail.account_info && current_detail.account_info.bank }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="customer_type !== '租客'">
                      <el-form-item label="支行">
                        <span>{{ current_detail.account_info && current_detail.account_info.subranch || '/' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="customer_type !== '租客'">
                      <el-form-item label="银行账号">
                        <span>{{ current_detail.account_info && current_detail.account_info.account }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="负责人">
                        <span>{{ current_detail.sign_user || '/'}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="负责部门">
                        <span>{{ current_detail.sign_org || '/'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="合同信息" name="second">
                <el-form label-width="120px" v-if="current_detail && current_detail.contract_info && current_detail.contract_info.length > 0">
                  <el-row :gutter="10" v-for="(item,index) in current_detail.contract_info" :key="index" style="border-bottom: 1px solid #E4E7ED;margin: 0 15px">
                    <el-col :span="8">
                      <el-form-item label="创建时间">
                        <span>{{ item.contract_created_at || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="合同编号">
                        <span>{{ item.contract_number || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房屋地址">
                        <div v-if="current_detail.address_info">
                          <span v-for="(item,idx) in current_detail.address_info">{{ item.house_name }}<a v-if="idx !== current_detail.address_info.length">;</a></span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="月单价">
                        <div v-if="item.month_price && item.month_price.length > 0">
                          <span v-for="(tmp,idx) in item.month_price" :key="idx">{{ tmp.price }}/月 {{ tmp.period }}月</span>
                        </div>
                        <div v-else>暂无</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="付款方式" v-if="customer_type === '房东'">
                        <div v-if="item.pay_way && item.pay_way.length > 0">
                          <span v-for="tmp in item.pay_way">{{ pay_type[tmp.pay_way ]}} {{ tmp.period }}月</span>
                        </div>
                        <div v-else>/</div>
                      </el-form-item>
                      <el-form-item label="付款方式" v-if="customer_type === '租客'">
                        <div v-if="item.pay_way && item.pay_way.length > 0">
                          <span v-for="(tmp,idx) in item.pay_way">{{ tmp.pay_way }}月 <a v-if="idx !== item.pay_way.length - 1">/</a></span>
                        </div>
                        <div v-else>/</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="合同时间">
                        <span>{{ item.start_at || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="负责人">
                        <span>{{ item.sign_user || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="负责部门">
                        <span>{{ item.sign_org || ''}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="是否中介">
                        <span>{{ item.is_agency === 1 ? '是' : '否'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="汇款记录" name="third">
                <el-tabs v-model="account_activeName">
                  <el-tab-pane label="应收" name="receive">
                    <el-table :data="current_detail && current_detail.account_running && current_detail.account_running.receive">
                      <el-table-column label="汇款时间" prop="create_time" align="center" min-width="120px"></el-table-column>
                      <el-table-column label="账户账号" prop="" align="center" min-width="120px">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.account }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="账户银行" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.bank }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="账户支行" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.subbranch || '/' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="本次汇款金额" prop="amount_payable" align="center"></el-table-column>
                      <el-table-column label="开户人" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.account_name }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="关系" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.relationship }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作人" prop="sign_user" align="center"></el-table-column>
                      <el-table-column label="操作部门" prop="sign_org" align="center"></el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="应付" name="payable">
                    <el-table :data="current_detail && current_detail.account_running && current_detail.account_running.payable">
                      <el-table-column label="汇款时间" prop="create_time" align="center" min-width="120px"></el-table-column>
                      <el-table-column label="账户账号" prop="" align="center" min-width="120px">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.account }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="账户银行" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.bank }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="账户支行" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.subbranch || '/' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="本次汇款金额" prop="amount_payable" align="center"></el-table-column>
                      <el-table-column label="开户人" prop="" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.account_name }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="关系" align="center">
                        <template>
                          <span>{{ current_detail && current_detail.account_info && current_detail.account_info.relationship }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作人" prop="sign_user" align="center"></el-table-column>
                      <el-table-column label="操作部门" prop="sign_org" align="center"></el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleCloseDetail">确定</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--确定移出黑名单-->
      <lj-dialog
        :visible="move_out_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="move_out_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定将此客户移出黑名单吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleSubmitMoveOut">确定</el-button>
            <el-button type="info" size="small" @click="move_out_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
      <MenuList :module="show_market" :list="customService" :backdrop="true" @close="handleCloseMenu"></MenuList>
    </div>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import MenuList from '../../common/menuList.vue';
  import { customService } from '../../../assets/js/allModuleList.js';
  import LjDialog from '../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: { LjDialog , SearchHigh,MenuList},
    data() {
      return {
        customService,
        pay_type: {
          444 : '月付',
          445 :  '双月付',
          446 :  '季付',
          447 :  '半年付',
          448 :  '年付'
        },
        account_activeName: 'receive',
        move_out_visible: false,
        move_row: '',

        highVisible: false,
        show_market: false,
        searchData: {},

        market_server: globalConfig.market_server,
        selects: [
          {id: 3,title: '综合'},
          {id: 1,title: '房东'},
          {id: 2,title: '租客'},
          {id: 4,title: '黑名单'},
        ],
        chooseTab: 3,
        params: {
          page: 1,
          limit: 20,
          type: 1,
          address: '',
          contract_number: '',
          phone: '',
          is_black: 0
        },
        customerList: [],
        customerCount: 0,

        //添加黑名单
        black_mark_visible: false,
        remark: '',
        currentRow: '',

        //详情
        detail_visible: false,
        current_detail: '',
        activeName: 'first',
        customer_type: '',
      }
    },
    mounted() {
      this.params = Object.assign({},this.params,{
        type: this.chooseTab
      });
      this.getCustomerList();
    },
    watch: {},
    computed: {},
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
      },
      handleCloseDetail() {
        this.current_detail = '';
        this.detail_visible = false;
      },
      handleSubmitMoveOut() {
        this.$http.delete(this.market_server + `v1.0/market/customer/remove-black/${this.move_row.id}`).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.move_out_visible = false;
            this.getCustomerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            })
          }
        })
      },
      handleGoMoveOutBlack(row) {
        this.move_row = row;
        this.move_out_visible = true;
      },
      handleCloseMenu() {
        this.show_market = false;
      },
      handleCloseHigh(val) {
        if (val !== 'close') {
          val.search = val.search.trim();
          this.params = Object.assign({},this.params,val);
          console.log(this.params);
          this.getCustomerList();
        }
        this.highVisible = false;
      },
      //打开详情
      handleOpenDetail(row) {
        if (this.params.is_black === 1) {
          return false;
        }
        this.customer_type = row.customer_type;
        if (row.customer_type === '房东') {
          console.log(row.customer_type);
          // this.$http.get(this.market_server + `v1.0/market/customer/lord/${row.id}`).then(res => {
          this.$http.get(this.market_server + `v1.0/market/customer/lord/${row.id}`).then(res => {
            console.log(res,'房东');
            if (res.code === 200) {
              this.current_detail = res.data;
              this.detail_visible = true;
            } else {
              this.current_detail = '';
            }
          })
        }
        if (row.customer_type === '租客') {
          console.log(row.customer_type);
          this.$http.get(this.market_server + `v1.0/market/customer/renter/1310`).then(res => {
            // this.$http.get(this.market_server + `v1.0/market/customer/renter/${row.id}`).then(res => {
            console.log(res,'租客');
            if (res.code === 200) {
              this.current_detail = res.data;
              this.detail_visible = true;
            } else {
              this.current_detail = '';
            }
          })
        }
      },
      handleGoMoveBlack(row) {
        this.currentRow = row;
        this.black_mark_visible = true;
      },
      //取消添加黑名单
      handleCancelMoveBlack() {
        this.remark = '';
        this.currentRow = '';
        this.black_mark_visible = false;
      },
      //确定添加黑名单
      handleSubmitMoveBlack() {
        this.$http.post(this.market_server + 'v1.0/market/customer/black',{
          customer_id: this.currentRow.id,
          remark: this.remark
        }).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.handleCancelMoveBlack();
            this.getCustomerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            })
          }
        })
      },
      //列表
      getCustomerList() {
        this.showLoading(true);
        this.$http.get(this.market_server + 'v1.0/market/customer',this.params).then(res => {
          console.log(res);
          this.showLoading(false);
          if (res.code === 200) {
            this.customerList = res.data.data;
            this.customerCount = res.data.count;
          } else {
            this.customerList = [];
            this.customerCount = 0;
          }
        })
      },
      //高级
      handleOpenHigh() {
        this.highVisible = true;
        this.searchData = {
          status: 'customerManagement',
          keywords: 'search',
          placeholder: '地址/合同编号/手机号/客户姓名',
          data: []
        }
      },
      //tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.params.search = '';
        var obj = {};
        if (id === 4) {
          obj.is_black = 1;
        } else {
          obj.is_black = 0;
          obj.type = id;
        }
        this.params = Object.assign({},this.params,obj);
        this.getCustomerList();
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getCustomerList();
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
