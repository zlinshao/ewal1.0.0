<!--租房预定-->
<template>

  <div class="mainListTable changeChoose">
    <!--列表-->
    <el-table
      :data="rentOrderLists"
      :height="this.mainListHeight() + 'px'"
      highlight-current-row
      header-row-class-name="tableHeader"
      :cell-class-name="tableCell"
      @cell-click="tableClickRow"
      style="width: 100%">
      <el-table-column width="40">
        <template slot-scope="scope">
          <span class="table_choose" :class="{'is_table_choose': scope.row.id === is_table_choose }"></span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="生成时间" align="center" min-width="120"></el-table-column>
      <el-table-column prop="address" label="房屋地址" align="center" min-width="150">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.address" placement="bottom-start" :visible-arrow="false">
            <div class="house-address-contain-money">
              {{scope.row.address}}
              <!-- has_running是否有流水，1有，2没有 -->
              <span v-if="scope.row.has_running==1" class="lord-money"></span>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="customer_name" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="contact" label="客户手机号" align="center"></el-table-column>
      <el-table-column prop="months" label="租房月数" align="center"></el-table-column>
      <el-table-column prop="deal_date" label="待签约日期" align="center"></el-table-column>
      <el-table-column label="签约人" prop="operator.name" align="center"></el-table-column>
      <el-table-column label="付款方式/月单价" prop="prices" align="center" min-width="200">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.prices" placement="bottom-start" :visible-arrow="false">
            <div>{{scope.row.prices}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" width="80"></el-table-column>
    </el-table>
    <!--分页-->
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="rentOrderCount"
          layout="total,jumper,prev,pager,next"
          :current-page="params.page"
          :page-size="params.limit"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </footer>



    <!--编辑-->
    <lj-dialog
      :visible="action_status.details_visible"
      :size="{width: 1200 + 'px',height: 800 + 'px' }"
      @close="action_status.details_visible = false">
      <rent-order-form :initData="rentOrderDetailData"
                 :checkOrEdit="status"
                 :del_visible="delete_visible"
                 @editSuccess="updateData"
                 @cancel="getCancelStatus">
      </rent-order-form >
    </lj-dialog>

  </div>
</template>
<script>
  import _ from 'lodash';
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjSubject from '../../../common/lj-subject.vue';
  import RentOrderForm from "./rentOrderForm";

  export default {
    name: "index",
    components: {RentOrderForm, LjDialog, LjSubject,},
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


        delete_visible: false,//删除
        // edit_visible: false,//编辑
        details_visible: false,//详情
        is_disabled: true,//是否禁用
        current_row: '',//当前row
        rentOrderLists: [],//列表数据
        rentOrderCount: 0,  //总条数
        rentOrderIds: [],
        ra_ids: [],
        rentOrderDetailData: this.row,
        statusLists: [],
        chooseType: '',
      }
    },
    mounted() {
      this.getRentOrderList();
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
          this.rentOrderDetailData = val;
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
      _substring(content,limit) {
        return this.$substring(content,limit);
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
          this.getRentOrderList();
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
    
      //加载初始数据
      getRentOrderList() {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_bulletin', this.params).then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            // this.rentOrderLists = res.data.data.sort((a, b) => {
            //   return a.id - b.id;
            // });
            this.rentOrderLists = res.data.data;
            this.rentOrderCount = res.data.count;
            this.rentOrderIds = [];
            for (let item of this.rentOrderLists) {
              this.rentOrderIds.push(item.id);
            }

            //当点击生成待处理项或取消待处理项时
            //处理成功后根据获取的列表刷新当前被点击的列表数据，从而更新待处理项的状态
             this.rentOrderLists.forEach((item,index)=>{
               if(item.id ==  this.is_table_choose){
                   this.$emit('getMultipleSelection', item);
               }
             })
           
          } else {
            this.rentOrderLists = [];
            this.rentOrderCount = 0;
          }
        })
      },
        //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getRentOrderList();
      },
      //取消
      getCancelStatus(val) {
        this.action_status.details_visible = val;

      },
      //编辑成功回调
      updateData(val) {
        this.action_status.details_visible = val;
        this.getRentOrderList();
      },
      // 搜索参数
      handleParams(val) {
        if (val.gatherDate) {  //生成时间
          this.params.startRange = val.gatherDate[0];
          this.params.endRange = val.gatherDate[1];
        }
        Object.assign(this.params,val);
        delete this.params.gatherDate;
        this.getRentOrderList();
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
