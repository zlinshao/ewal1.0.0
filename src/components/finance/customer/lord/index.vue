<!--房东-->
<template>

  <div class="mainListTable changeChoose">
    <!--列表-->
    <el-table
      :data="lordLists"
      :height="this.mainListHeight(46) + 'px'"
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

      <el-table-column label="标记" align="center" width="100">
        <template slot-scope="scope">
          <div class="statusBar">
            <div class="flex-center" v-if="LordStatus[scope.$index] && LordStatus[scope.$index].suppress_dup == 0">
              <el-tooltip content="手机号" placement="bottom" :visible-arrow="false">
                <span class="phone"
                      v-show="LordStatus[scope.$index] && LordStatus[scope.$index].is_contact == 1"></span>
              </el-tooltip>
              <el-tooltip content="姓名" placement="bottom" :visible-arrow="false">
                <span class="name" v-show="LordStatus[scope.$index] && LordStatus[scope.$index].is_name == 1"></span>
              </el-tooltip>
              <el-tooltip content="地址" placement="bottom" :visible-arrow="false">
                <span class="address"
                      v-show="LordStatus[scope.$index] && LordStatus[scope.$index].is_address == 1"></span>
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
      <el-table-column prop="address" label="房屋地址" align="center" min-width="150">
        <template slot-scope="scope">
          <div class="house-address-contain-money">
            {{scope.row.address}}
            <span v-if="scope.row.has_running==1" class="lord-money"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="customer_name" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="contact" label="客户手机号" align="center"></el-table-column>
      <el-table-column prop="months" label="收房月数" align="center"></el-table-column>
      <el-table-column prop="deal_date" label="待签约日期" align="center"></el-table-column>
      <el-table-column prop="first_pay_date" label="第一次打房租日期" align="center"></el-table-column>
      <el-table-column prop="account_type" label="客户汇款方式" align="center" show-overflow-tooltip></el-table-column>
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
          <!--<el-tooltip :content="scope.row.prices" placement="bottom-start" :visible-arrow="false">-->
          <!--<div>{{substringPlugin(scope.row.prices,18)}}</div>-->
          <!--</el-tooltip>-->
        </template>
      </el-table-column>
      <el-table-column label="账号" prop="account_num" align="center" min-width="150"></el-table-column>
      <el-table-column label="签约人" prop="operator.name" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center" width="80"></el-table-column>
    </el-table>
    <!--分页-->
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="lordCount"
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
          <div class="unUse-txt">确定删除该房东信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small" @click="action_status.delete_visible = false;current_row = ''">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>
    <!--编辑-->
    <lj-dialog
      :visible="action_status.details_visible"
      :size="{width: 1200 + 'px',height: 800 + 'px' }"
      @close="action_status.details_visible = false">
      <lord-form :initData="lordDetailData"
                 :checkOrEdit="status"
                 :del_visible="delete_visible"
                 @editSuccess="updateData"
                 @cancel="getCancelStatus">
      </lord-form>
    </lj-dialog>

  </div>
</template>
<script>
  import _ from 'lodash';
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjSubject from '../../../common/lj-subject.vue';
  import LordForm from "./lordForm";

  export default {
    name: "index",
    components: {LordForm, LjDialog, LjSubject,},
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
        action_status: '',//操作状态
        chooseRowIds: [],//列表ids

        LordStatus: [],//前缀状态

        delete_visible: false,//删除
        edit_visible: false,//编辑
        details_visible: false,//详情
        is_disabled: true,//是否禁用
        current_row: '',//当前row
        lordLists: [],//列表数据
        lordCount: 0,
        lordIds: [],
        ra_ids: [],
        lordDetailData: this.row,
        statusLists: [],
        chooseType: '',
        monthPrice: '',
      }
    },
    mounted() {
      this.getLordList();
    },
    created() {
      this.$bus.on('getParams', this.handleParams);//搜索参数
    },
    beforeDestroy() {
      this.$bus.off('getParams', this.handleParams);
    },
    watch: {
      current_row_info: {
        handler(val) {
          this.current_row = val;
          this.lordDetailData = val;
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

    computed: {},
    methods: {
      _substring(content, limit) {
        return this.$substring(content, limit);
      },

      tableCell({row}) {
        if (row.freeze === 1) {
          return 'light_cell';
        }
      },
      //回调
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getLordList();
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getLordList();
      },
      //加载初始数据
      getLordList() {
        if (!this.validatePermission('Lord-List')) return;
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            // this.lordLists = res.data.data.sort((a, b) => {
            //   return a.id - b.id;
            // });
            for (let item of res.data.data) {
              item.create_time = item.create_time.split(' ');
            }
            this.lordLists = res.data.data;
            this.lordCount = res.data.count;
            this.lordIds = [];
            for (let item of this.lordLists) {
              this.lordIds.push(item.id);
            }
            //当点击生成待处理项或取消待处理项时
            //处理成功后根据获取的列表刷新当前被点击的列表数据，从而更新待处理项的状态
            this.lordLists.forEach((item, index) => {
              if (item.id == this.is_table_choose) {
                this.$emit('getMultipleSelection', item);
              }
            });
            //前缀状态
            this.$http.get(globalConfig.temporary_server + 'customer_lord_repeat', {id: this.lordIds}).then(res => {
              if (res.code === 200) {
                this.LordStatus = res.data.data.sort((a, b) => {
                  return a.id - b.id;
                });
                _.forEach(this.lordLists, (o) => {
                  let findRst = _.find(this.LordStatus, {id: o.id});
                  o.prefix = findRst;
                  o.type = 'lord';//房东
                  o.prefix_suppress_dup = findRst?.suppress_dup || 0;
                });
              }
            });
          } else {
            this.lordLists = [];
            this.lordCount = 0;
          }
        })
      },
      //取消
      getCancelStatus(val) {
        this.action_status.details_visible = val;
      },
      //编辑成功回调
      updateData(val) {
        this.action_status.details_visible = val;
        this.getLordList();
      },
      // 搜索参数
      handleParams(val) {
        if (val.gatherDate) {  //生成时间
          this.params.startRange = val.gatherDate[0];
          this.params.endRange = val.gatherDate[1];
        }
        Object.assign(this.params, val);
        delete this.params.gatherDate;
        this.getLordList();
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
      //生成待处理项
      handleProcessLord(row) {
        this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id,).then(res => {
          this.callbackSuccess(res);
        })
      },
      //取消待处理项
      handleCancelProcessLord(row) {
        this.$http.put(globalConfig.temporary_server + 'account_pending/recover', {
          customer_id: row.id,
          identity: 1
        }).then(res => {
          this.callbackSuccess(res);
          console.log(row.id);
        })
      },
      //取消或恢复重复标记
      handleRemark(row, type) {
        let operate;
        if (!type) {//取消重复标记
          operate = 1;
        } else {//恢复重复标记
          operate = 2;
        }
        this.ra_ids = [];
        this.ra_ids.push(row.id);
        this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {
          ids: this.ra_ids,
          operate: operate
        }).then(res => {
          this.is_table_choose = null;
          this.callbackSuccess(res);
        })

      },
      //删除房东
      handleOkDel() {
        this.$http.delete(globalConfig.temporary_server + 'customer_collect/delete/' + this.current_row.id).then(res => {
          this.callbackSuccess(res);
          this.action_status.delete_visible = false;
          this.current_row = '';

        });
      },
    },
  }
</script>


<style lang="scss" scoped>

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

      #theme_name .form_item_container {
        padding: 0 0;
      }

      .light_cell {
        background-color: #D6D6D6 !important;
      }

      .lord-money {
        @include financeImg('jinrongqianbi.png', 'theme1');
      }
    }
  }
</style>
<style lang="scss">
  #theme_name {
    .mainListTable.changeChoose {
      .el-table__body {
        .el-table__row {
          .cell {
            white-space: pre-wrap;
          }
        }
      }
    }
  }
</style>
