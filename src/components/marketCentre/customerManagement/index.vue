<template>
    <div id="customerManagement">
      <div>
        <!--头部-->
        <div class="listTopCss items-bet">
          <div class="items-center listTopLeft">
            <p class="flex-center">
              <!--<b @click="show_market = true;show_shadow = true">...</b>-->
              <b>...</b>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" plain @click="handleGoMoveOutBlack(scope.row)" v-if="params.is_black !== 0">移出黑名单</el-button>
                <el-button type="danger" size="mini" @click="handleGoMoveBlack(scope.row)" v-else>移至黑名单</el-button>
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
              <el-button type="info" size="small" @close="handleCancelMoveBlack">取消</el-button>
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
                        <el-form-item label="客户身份">
                          <span>{{ current_detail.idtype }}</span>
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
                        <el-form-item label="小区地址">
                          <div v-if="current_detail.address_info">
                            <span v-for="(item,idx) in current_detail.address_info">{{ item.community_address }}<a v-if="idx !== current_detail.address_info.length">;</a></span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="籍贯"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="民族"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="负责人"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="国籍"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="银行账号">
                          <span>{{ current_detail.account_info && current_detail.account_info.account }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="负责部门"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件类型">
                          <span>{{current_detail.idtype || '/'}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="开户行">
                          <span>{{ current_detail.account_info && current_detail.account_info.bank }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="客户来源"></el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件号码">
                          <span>{{ current_detail.idcard || ''}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="支行">
                          <span>{{ current_detail.account_info && current_detail.account_info.subranch || '/' }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="客户意向"></el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="合同信息" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="汇款记录" name="third">角色管理</el-tab-pane>
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
              <el-button type="info" size="small" @close="move_out_visible = false">取消</el-button>
            </div>
          </div>
        </lj-dialog>

        <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
        <MarketMenuList :show-market="show_market" :show-shadow="show_shadow" @close="handleCloseMenu"></MarketMenuList>
      </div>
    </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import MarketMenuList from '../components/market-menu-list.vue';
  import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "index",
        components: { LjDialog , SearchHigh ,MarketMenuList},
        data() {
            return {
              move_out_visible: false,
              move_row: '',

              highVisible: false,
              show_market: false,
              searchData: {},
              show_shadow: true,

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
              activeName: 'first'
            }
        },
        mounted() {
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
          handleCloseHigh() {
            this.highVisible = false;
          },
          //打开详情
          handleOpenDetail(row) {
            if (this.params.is_black === 1) {
              return false;
            }
            if (row.customer_type === '房东') {
              console.log(row.customer_type);
              // this.$http.get(this.market_server + `v1.0/market/customer/lord/${row.id}`).then(res => {
              this.$http.get(this.market_server + `v1.0/market/customer/lord/1659`).then(res => {
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
          handleOpenHigh() {},
          //tab切换
          changeTabs(id) {
            this.chooseTab = id;
            if (id === 4) {
              this.params.is_black = 1;
            } else {
              this.params.is_black = 0;
              this.params.type = id;
            }
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
