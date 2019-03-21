<template>
  <div id="rewardUp">
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

    <!--兑换规则-->
    <lj-dialog
    :visible="exchange_rules"
    :size="{width: 900 + 'px',height: 700 + 'px'}"
    @close="exchange_rules = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>兑换规则</h3>
          <div class="header_right" @click="exchangeRulesFormHandler">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <div class="icon-add"><b>+</b></div>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="exchangeRulesData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            @row-dblclick="exchangeTableDblClick"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(exchangeRulesShowData)" :key="item"
              align="center"
              :prop="item"
              :label="exchangeRulesShowData[item]">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">

              </template>
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
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

        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="reward_order = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--兑换规则form-->
    <lj-dialog
      :visible="exchange_rules_form_visible"
      :size="{width: 400 + 'px',height: 450 + 'px'}"
      @close="exchange_rules_form_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{exchange_rules_form_title}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="exchange_rules_form" label-width="80px" style="width: 80%">



            <el-form-item label="兑换类型">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeType" placeholder="请选择兑换类型">
                  <el-option value="1" label="兑换类型1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="兑换额">
              <el-input v-model="exchange_rules_form.exchangeBonus" placeholder="请输入兑换额度">
              </el-input>
            </el-form-item>
            <el-form-item label="兑换物品">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeObject" placeholder="请选择兑换物品">
                  <el-option value="1" label="兑换物品1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="状态">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeStatus" placeholder="请选择状态">
                  <el-option value="1" label="状态1"></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="exchange_rules_form_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>



    <!--赏善令-->
    <lj-dialog
      :visible="reward_order"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="reward_order = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>赏善令</h3>
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
            <el-form-item label="奖励类型">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.reward_type" placeholder="请选择奖励类型">
                  <el-option :value="1" label="奖励1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="奖额">
              <el-input v-model="reward_order_form.bonus" placeholder="请填写奖励金额">
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="reward_order_form.remark" placeholder="请填写备注">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
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
    props: ['searchVal','reward_order_visible','exchange_rules_visible'],
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
          bonus: '奖励',
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
        //赏善令
        reward_order: false,
        reward_order_form: {
          name: '',//姓名
          department: '',//部门,
          station: '',//岗位
          event: '',//事件
          reward_type: '',//奖励类型
          bonus: '',//奖额
          remark: '',//备注
        },

        //兑换规则
        exchange_rules:false,
        exchange_rules_form_title:'新增兑换规则',
        exchangeRulesData: [],
        exchangeRulesShowData: {
          exchangeType: '兑换类型',
          exchangeBonus: '兑换额',
          exchangeObject: '兑换物品',
          exchangeStatus: '状态',
        },

        exchange_rules_form_visible: false,//兑换规则form表单显示隐藏控制
        exchange_rules_form: {
          exchangeType: '',//兑换类型
          exchangeBonus: '',//兑换额
          exchangeObject: '',//兑换物品
          exchangeStatus: '',//状态
        }


        // work_info: [
        //   {work: '平均在线时长', val: '8 h'},
        //   {work: '平均处理用时', val: '30 min'},
        //   {work: '当日处理事件数', val: '16 件'},
        //   {work: '本周处理事件数', val: '35 件'},
        // ],
        // event_data: [
        //   {value: 500, name: '一般'},
        //   {value: 300, name: '特殊'},
        //   {value: 200, name: '紧急'},
        // ],
        // attend_data: []
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
          this.getRewardUpList();
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
      exchangeRulesFormHandler() {
        this.exchange_rules_form_visible = true;
        this.exchange_rules_form = {};
        this.exchange_rules_form_title = "新增兑换规则";
      },


      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },



      initData() {
        //扬善表格
        for (let i=0;i<9;i++) {
          let obj = {
            id: i+1,
            name: '张三',
            station:'工程师',
            department:'研发部',
            event:'攻城时因穿铠甲',
            bonus:'200金币',
            remark:'锁血打小怪掉金币',
          }
          this.tableData.push(obj)
        }
        //console.log(this.tableData);
        this.counts = 1000;


        //兑换规则表格
        //exchangeRulesData
        for (let i=0;i<9;i++) {
          let obj = {
            id: i+1,
            exchangeType: '兑换类型1',//兑换类型
            exchangeBonus: '300',//兑换额
            exchangeObject: '物品1',//兑换物品
            exchangeStatus: '状态1',//状态
          }
          this.exchangeRulesData.push(obj)
        }
      },

      getRewardUpList() {
        this.$http.get(this.url + 'rewardUp/xxx', this.params).then(res => {
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
          bonus:'200金币',
          remark:'锁血打小怪掉金币',
        };
      },
      //兑换规则表格某一行双击
      exchangeTableDblClick(row) {
        this.exchange_rules_form_visible = true;
        this.exchange_rules_form_title = "编辑兑换规则";
        this.exchange_rules_form= {
          name: '张三',
          exchangeType: '1',//兑换类型
          exchangeBonus: '300',//兑换额
          exchangeObject: '1',//兑换物品
          exchangeStatus: '1',//状态
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
        this.getRewardUpList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/reward/rewardUp/index.scss";
  /*@import "../../../../assets/scss/currency";*/

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/reward/rewardUp/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #rewardUp {




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
    #rewardUp {

    }
  }

  #theme_name.theme3 {
    #rewardUp {

    }
  }

  #theme_name.theme4 {
    #rewardUp {

    }
  }
</style>
