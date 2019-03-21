<template>
  <div id="rewardDown">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        @row-dblclick="tableDblClick"
        :row-style="{height:'70px'}"
        style="width: 100%">
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->

          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>


    <!--惩恶令-->
    <lj-dialog
      :visible="reward_order"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="reward_order = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>惩恶令</h3>
          <!--<div class="header_right">-->
          <!--<el-button size="mini" type="primary" plain>新增</el-button>-->
          <!--</div>-->
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="reward_order_form" label-width="80px" style="width: 80%">
            <el-form-item label="姓名">
              <el-input v-model="reward_order_form.name" placeholder="选择人员自动获取"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="reward_order_form.department" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="reward_order_form.station" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>

            <el-form-item label="事件">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.event" placeholder="请选择事件">
                  <el-option :value="1" label="事件1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="惩罚类型">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.reward_type" placeholder="请选择惩罚类型">
                  <el-option :value="1" label="惩罚1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="惩罚金额">
              <el-input v-model="reward_order_form.penalty" placeholder="请填写惩罚金额">
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="reward_order_form.remark" placeholder="请填写备注">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="reward_order = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>




  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';


  export default {
    name: "index",
    props: ['searchVal','reward_order_visible',],
    components: {
      LjDialog
    },
    data() {
      return {
        url: globalConfig.organ_server,
        checkList: [],
        showData: {
          name: '姓名',
          department: '岗位',
          station: '部门',
          event: '事件',
          penalty: '惩罚',
          remark: '备注',
        },
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
        },


        //乐伽dialog
        //惩恶令
        reward_order: false,
        reward_order_form: {
          name: '',//姓名
          department: '',//部门,
          station: '',//岗位
          event: '',//事件
          reward_type: '',//惩罚类型
          penalty: '',//罚款
          remark: '',//备注
        },


      }
    },
    mounted() {
      this.initData();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRewardDownList();
        },
        deep: true
      },
      reward_order_visible: {
        handler(val, oldVal) {
          console.log(val,oldVal);
          this.reward_order = !this.reward_order;
          this.reward_order_form = {};
        },
        //deep:true,
        //immediate:true//第一次绑定也执行
      },
      exchange_rules_visible: {
        handler(val, oldVal) {
          console.log(val,oldVal);
          this.exchange_rules = !this.exchange_rules;
        },
      }
    },
    computed: {},
    methods: {



      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },



      initData() {

        for (let i=0;i<9;i++) {
          let obj = {
            id: i+1,
            name: '张三',
            station:'工程师',
            department:'研发部',
            event:'攻城时因穿铠甲',
            penalty:'200金币',
            remark:'锁血打小怪掉金币',
            //address: '上海市普陀区金沙江路 1518 弄'
          }
          this.tableData.push(obj)
        }
        console.log(this.tableData);
        this.counts = 1000;
      },

      getRewardDownList() {
        this.$http.get(this.url + 'rewardDown/xxx', this.params).then(res => {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        this.reward_order = true;
        this.reward_order_form = {
          name: '张三',
          station:'工程师',
          department:'研发部',
          event:'攻城时因穿铠甲',
          penalty:'200金币',
          remark:'锁血打小怪掉金币',
        };
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getRewardDownList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/reward/rewardDown/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/reward/rewardDown/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #rewardDown {




      footer.common-page {
        height: 100px;
        width: 100%;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 100px;
        //background-color: $color2F2;
        z-index: 6;
        .develop {
          position: absolute;
          top: -30px;
          width: 80px;
          cursor: pointer;
          height: 30px;
          opacity: 1;
          border-radius: 10px 10px 0 0;
          background-color: $color2F2;

        }
      }
    }
  }

  #theme_name.theme2 {
    #rewardDown {

    }
  }

  #theme_name.theme3 {
    #rewardDown {

    }
  }

  #theme_name.theme4 {
    #rewardDown {

    }
  }
</style>
