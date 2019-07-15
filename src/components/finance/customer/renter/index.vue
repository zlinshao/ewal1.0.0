<!--租客-->
<template>
  <div class="mainListTable changeChoose">
    <!--列表-->
    <el-table
      :data="renterLists"
      :height="mainListHeight(50) + 'px'"
      highlight-current-row
      header-row-class-name="tableHeader"
      :cell-class-name="tableCell"
      @cell-click="tableClickRow"
      style="width: 100%">
      <!--<el-table-column-->
      <!--type="selection" width="40">-->
      <!--</el-table-column>-->
      <el-table-column width="40">
        <template slot-scope="scope">
          <span class="table_choose" :class="{'is_table_choose': scope.row.id === is_table_choose }"></span>
        </template>
      </el-table-column>
      <el-table-column label="标记" align="center" width="90">
        <template slot-scope="scope">
          <div class="statusBar">
            <div class="flex-center" v-if="renterStatus[scope.$index] && renterStatus[scope.$index].suppress_dup === 0">
              <el-tooltip content="手机号" placement="bottom" :visible-arrow="false">
                <span class="phone"
                      v-if="renterStatus[scope.$index] && renterStatus[scope.$index].is_contact === 1"></span>
              </el-tooltip>
              <el-tooltip content="姓名" placement="bottom" :visible-arrow="false">
                <span class="name" v-if="renterStatus[scope.$index] && renterStatus[scope.$index].is_name === 1"></span>
              </el-tooltip>
              <el-tooltip content="地址" placement="bottom" :visible-arrow="false">
                <span class="address"
                      v-if="renterStatus[scope.$index] && renterStatus[scope.$index].is_address === 1"></span>
              </el-tooltip>
            </div>
            <div v-else class="flex-center">
              <span class="ignore"></span><a>忽略重复</a>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="生成时间" prop="create_time" align="center">
        <template slot-scope="scope">
          <div v-for="item in scope.row.create_time">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in Object.keys(renterLabel)"
        :label="renterLabel[item]" :key="item"
        :prop="item"
        align="center">
      </el-table-column>
      <el-table-column label="付款方式/月单价" prop="month_price" align="center">
        <template slot-scope="scope">
          <div class="month_price" style="cursor: pointer;">
            <div v-if="monthPrice === scope.row.id">
              <div v-for="item in scope.row.month_price" style="white-space: nowrap">{{item}}</div>
            </div>
            <span @click.prevent="monthPrice = scope.row.id" v-else style="white-space: nowrap">
              {{scope.row.month_price[0]}}<span v-if="scope.row.month_price.length > 1">...</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="renterCount"
          layout="total,jumper,prev,pager,next"
          :current-page="params.page"
          :page-size="params.limit"
          @current-change="handleChangePage">
        </el-pagination>
      </div>
    </footer>
    <!--删除-->
    <lj-dialog :visible="action_status.delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
               @close="action_status.delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该租客信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkRenter">确定</el-button>
          <el-button type="info" size="small" @click="action_status.delete_visible = false;current_row = ''">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>
    <!--编辑-->
    <lj-dialog
      :visible="action_status.details_visible"
      :size="{width: 1200 + 'px',height: 820 + 'px' }"
      @close="action_status.details_visible = false">
      <renter-form
        :initData="renterDetailList"
        :type="chooseType"
        :checkOrEdit="status"
        :current_row="current_row"
        @cancel="getCancelStatus"
        @updateList="updateRenterList"></renter-form>
    </lj-dialog>
  </div>
</template>
<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import RenterForm from "./renterForm";

  export default {
    name: "index",
    components: {RenterForm, LjDialog,},
    props: ['searchParams', 'status', 'current_row_info'],
    data() {
      return {
        is_table_choose: '',

        params: {//查询参数
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 15,
          department_ids: '',
          export: '',
        },
        set_price_form: {
          bottom_price: '',
          bottom_id: [],
          suggest_price: '',
          suggest_id: [],
          bottom_name: '',
          suggest_name: '',
          bottom_type: '',
          suggest_type: ''
        },
        chooseRowIds: [],
        renterLabel: {//列表字段
          "address": "房屋地址",
          "customer_name": "客户姓名",
          "contact": "客户手机号",
          "months": "租房月数",
          "deal_date": "待签约日期",
          "rent_status": "租房状态",
          "rent_types": "租房类型",
          "staff.name": "签约人",
        },
        delete_visible: false,//删除
        edit_visible: false,//编辑
        details_visible: false,//详情
        is_disabled: true,//是否禁用
        current_row: '',
        renterLists: [],
        renterCount: 0,
        renterIds: [],
        renterStatus: [],
        renterDetailList: {},
        ra_ids: [],
        multipleSelection: [],//多选
        chooseType: '',
        action_status: '',
        monthPrice: '',
      }
    },
    mounted() {
      this.getRenterList();
    },
    activated() {
    },
    watch: {
      current_row_info: {
        handler(val) {
          this.current_row = val;
          this.renterDetailList = val;
        },
        deep: true
      },
      status: {
        handler(val) {
          this.action_status = val;
          console.log(val)
        },
        deep: true
      }
    },
    created() {
      this.$bus.on('getParams', this.handleParamsRenter);
    },
    beforeDestroy() {
      this.$bus.off('getParams', this.handleParamsRenter);
    },
    computed: {},
    methods: {
      tableCell({row}) {
        if (row.freeze === 1) {
          return 'light_cell';
        }
      },
      getCancelStatus(val) {
        this.action_status.details_visible = val;
      },
      // 搜索参数
      handleParamsRenter(val) {
        if (val.gatherDate) {  //生成时间
          this.params.startRange = val.gatherDate[0];
          this.params.endRange = val.gatherDate[1];
        }
        Object.assign(this.params, val);
        delete this.params.gatherDate;
        this.getRenterList();
      },
      updateRenterList(val) {
        this.action_status.details_visible = val;
        this.getRenterList();
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getRenterList();
      },
      // 当前点击
      tableClickRow(row) {
        if (this.is_table_choose === row.id) {
          this.is_table_choose = '';
          this.$emit('getMultipleSelection', 0);
        } else {
          this.is_table_choose = row.id;
          this.$emit('getMultipleSelection', row);
        }
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getRenterList();
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
      //列表
      getRenterList() {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_renter', this.params).then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            // this.renterLists = res.data.data.sort(
            //   function (a, b) {
            //     return a.id - b.id
            //   }
            // );
            for (let item of res.data.data) {
              item.create_time = item.create_time.split(' ');
            }
            this.renterLists = res.data.data;
            this.renterIds = [];
            for (let item of this.renterLists) {
              this.renterIds.push(item.id)
            }
            //当点击生成待处理项或取消待处理项时
            //处理成功后根据获取的列表刷新当前被点击的列表数据，从而更新待处理项的状态
            this.renterLists.forEach((item, index) => {
              if (item.id == this.is_table_choose) {
                this.$emit('getMultipleSelection', item);
              }
            });
            //前缀状态
            this.$http.get(globalConfig.temporary_server + 'customer_renter_repeat', {id: this.renterIds}).then(res => {
              //console.log(res);
              if (res.code === 200) {
                this.renterStatus = res.data.data.sort(
                  function (a, b) {
                    return a.id - b.id
                  }
                );
                _.forEach(this.renterLists, (o) => {
                  let findRst = _.find(this.renterStatus, {id: o.id});
                  o.prefix = findRst;
                  o.type = 'renter';//租客
                  o.prefix_suppress_dup = findRst?.suppress_dup || 0;
                });
              }
            });
            this.renterCount = res.data.count;
          } else {
            this.renterLists = [];
            this.renterCount = 0;
          }
        }).then(() => {

        }).catch(err => {
          console.log(err);
        })
      },
      //生成待处理项
      handleProcessRenter(row) {
        this.$http.post(globalConfig.temporary_server + 'customer_renter/pending/' + row.id, {}).then(res => {
          this.callbackSuccess(res);
        })
      },
      //取消待处理项
      handleCancelProcessRenter(row) {
        this.$http.put(globalConfig.temporary_server + 'account_pending/recover', {
          customer_id: row.id,
          identity: 2
        }).then(res => {
          this.callbackSuccess(res);
        })
      },
      //取消或恢复重复标记
      handleRemarkRenter(row, type) {
        let operate;
        if (!type) {//取消重复标记
          operate = 1;
        } else {//恢复重复标记
          operate = 2;
        }
        this.ra_ids = [];
        this.ra_ids.push(row.id);
        console.log(this.ra_ids);
        this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {
          ids: this.ra_ids,
          operate: operate
        }).then(res => {
          this.callbackSuccess(res);
          this.is_table_choose = null;
          if (res.code === 200) {

          }
        })
      },
      //删除
      handleOkRenter() {
        this.$http.delete(globalConfig.temporary_server + 'customer_renter/delete/' + this.current_row.id).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
    },
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/finance/customer/index.scss";

  @mixin financeImg($m, $n) {
    $url: '../../../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customer {
      .statusBar {
        span {
          display: block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-left: 4px;
        }

        a {
          font-size: 12px;
          margin-left: 3px;
        }

        span.ignore {
          @include financeImg('yanjing.png', 'theme1');

        }

        span.phone {
          @include financeImg('dianhua.png', 'theme1');

        }

        span.name {
          @include financeImg('kehu.png', 'theme1');

        }

        span.address {
          @include financeImg('dizhi.png', 'theme1');
        }
      }

      .el-table .success-row {
        background: #DFDFDF;
      }

      #theme_name .form_item_container {
        padding: 0 0;
      }

    }

    .light_cell {
      background-color: #D6D6D6 !important;
    }
  }
</style>
