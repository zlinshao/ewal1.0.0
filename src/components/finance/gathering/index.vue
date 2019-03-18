<template>
  <div id="gathering">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>收款</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<div class="icons home_icon"></div>-->
        <div class="icons add" @click="add_visible = true"><b>+</b></div>
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
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          v-for="(item,key) in btn_group"
          :key="key"
          :label="item.val"
          align="center">
          <template slot-scope="scope">
            <el-button style="width: 80px" size="mini" :type="item.type"  @click="handleClickBtn(item.key)">{{ item.val }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="100"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--应收入账-->
    <lj-dialog
      :visible="receive_visible"
      :size="{width: 500 + 'px',height: 600 + 'px'}"
      @close="receive_visible = false">
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>应收入账</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="receive_form" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_come"></i>
                  </b>
                  <span>款项来源</span>
                </div>
                <div class="item_content">
                  <span>情缘雅居10-102</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>账户</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="receive_form.subject_name">
                    <el-option label="中介费" value="1"></el-option>
                    <el-option label="租房房租" value="2"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>款项科目</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="receive_form.subject_name">
                    <el-option label="中介费" value="1"></el-option>
                    <el-option label="租房房租" value="2"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_money"></i>
                  </b>
                  <span>应收金额</span>
                </div>
                <div class="item_content">
                  <span>2500.00</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item >
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_case"></i>
                  </b>
                  <span>实收金额</span>
                </div>
                <div class="item_content">
                  <el-input v-model="receive_form.money"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_payTime"></i>
                  </b>
                  <span>付款时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    class="all_width"
                    v-model="receive_form.pay_time"
                    placeholder="请选择付款时间"
                    type="datetime"
                  ></el-date-picker>
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
                  <el-input
                    v-model="receive_form.mark"
                    type="textarea"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer flex-center">
          <el-button size="small" type="danger" @click="handleOkReceive">确定</el-button>
          <el-button size="small" type="normal" @click="receive_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增应收款项-->
    <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main">

          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>客户名称</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.customer_id"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>客户身份</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.name"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>收款金额</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.amount_payable"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>科目</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.subject_val" @focus="handleOpenSubject('subject_deposit')"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>付款时间</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.pay_date"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>应收款详情</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.description" type="textarea"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>备注</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.remark" type="textarea"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>

        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="info" size="small"   @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--科目-->
    <lj-subject :visible="subject_visible" @close="subject_visible = false"
                @confirm="handleConfirmSubject"></lj-subject>

    <!--跟进记录-->
    <lj-dialog
      :visible="record_visible"
      :size="'small'"
      @close="record_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>跟进记录</h3>
        </div>
        <div class="dialog_main">
          <div class="address">情缘雅居10-102</div>
          <div class="record">
            <el-table
              :data="record_data"
            >
              <el-table-column label="跟进时间" prop=""></el-table-column>
              <el-table-column label="跟进发起人" prop=""></el-table-column>
              <el-table-column label="当前跟进人" prop=""></el-table-column>
              <el-table-column label="跟进类型" prop=""></el-table-column>
              <el-table-column label="跟进状态" prop=""></el-table-column>
              <el-table-column label="款项名目" prop=""></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--备注列表-->
    <lj-dialog
      :visible="mark_visible"
      :size="'small'"
      @close="mark_visible = false">
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>备注列表</h3>
          <span class="add_mark" @click="new_mark_visible = true">+</span>
        </div>
        <div class="dialog_main">
          <div class="address">情缘雅居10-102</div>
          <div class="record">
            <el-table
              :data="mark_data"
            >
              <el-table-column label="备注时间" prop=""></el-table-column>
              <el-table-column label="备注内容" prop=""></el-table-column>
              <el-table-column label="备注人" prop=""></el-table-column>
              <el-table-column label="备注类型" prop=""></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--新增备注-->
    <lj-dialog
      :visible="new_mark_visible"
      :size="{width: 500 + 'px' ,height: 400 + 'px'}"
      @close="new_mark_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增备注</h3>
        </div>
        <div class="dialog_main">
          <el-form :mode="new_mark" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注类型</span>
                </div>
                <div class="item_content items-start">
                  <el-button>工单</el-button>
                  <el-button>维修单</el-button>
                  <el-button>贴条</el-button>
                  <el-button>贴条</el-button>
                  <el-button>贴条</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--登记收款-->
    <lj-dialog
      :visible="register_visible"
      :size="{width: 500 + 'px',height: 400 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>登记记录</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="register_from" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_come"></i>
                  </b>
                  <span>选择图片</span>
                </div>
                <div class="item_content">
                  <span>...</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>选择账户</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="register_from.account">
                    <el-option value="1" label="2104023483209"></el-option>
                    <el-option value="1" label="2104023483209"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>收款金额</span>
                </div>
                <div class="item_content">
                  <el-input v-model="register_from.money"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>收款时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    class="all_width"
                    v-model="register_from.time"
                    typ="timetype"
                  ></el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger">迁移</el-button>
          <el-button size="mini" @click="register_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';

  export default {
    name: "",
    components: {
      SearchHigh,
      LjDialog,
      FinMenuList,
      LjSubject
    },
    data() {
      return {
        params:{
          is_del:'',
          staff_ids:'',
          department_ids:'',
          status:'',
          startRange:'',
          endRange:'',
          tag_status:'',
          startTag:'',
          endTag:'',
          subject_id:'',
          search:'',
          minPrice:'',
          maxPrice:'',
          page:1,
          limit:12,
          export:'',

        },
        showFinMenuList: false,
        add_visible:false,
        receive_visible: false, //应收入账
        record_visible: false, //跟进记录
        mark_visible: false, //备注列表
        new_mark_visible: false, //新增备注
        register_visible: false, //登记收款
        register_size: '',

        subject_visible:false,//科目
        which_subject: '',
        new_subject_visible: false,
        subject_deposit: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },
        move_visible: false,
        move_subject: {
          initial: '',
          parent_id: '',
          title: ''
        },

        ruleForm:{
          customer_id:'',//客户id
          customer_account_type:'',//账号类型
          customer_account_num:'',//账户号码
          amount_payable:'',//金额
          description:'',//描述
          remark:'',
          identity:'',//款项
          pay_date:'',
          subject_id:'',
          subject_val:'',
          complete_date:'',
        },
        rules:{
          amount_payable: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },

        register_from: {
          img: '',
          account: '',
          money: '2000.00',
          time: ''
        },
        new_mark: {
          content: '',
          type: ''
        },
        showSearch: false,
        chooseTab: 1,
        selects: [
          {
            id: 1,
            title: '定金',
          },
          {
            id: 2,
            title: '尾款',
          },
          {
            id: 3,
            title: '房款',
          },
          {
            id: 4,
            title: '其他收款'
          }
        ],
        tableData:[],
        showData: {
          "pay_date": '收款时间',
          "subject.title": '应收科目',
          "customer.address":"地址",
          "amount_receivable": '应收余额',
          "amount_received": '实收金额',
          "balance": '剩余金额',
          "complete_date": '补齐时间',
          "description.description": '明细详情',
          "remark":"备注",
          "receTag":"催缴备注"
        },
        btn_group: [
          {val: '跟进列表',key: 'record',type: 'success'},
          {val: '备注列表',key: 'mark',type: 'danger'},
          {val: '登记收款',key: 'register',type: 'warning'},
          {val: '应收入账',key: 'should_receive',type: 'success'}
        ],
        searchData: {
          status: 'gathering',
          data: [],
        },
        chooseRowIds: [],
        receive_form: {
          account_num: '1',
          subject_name: '1',
          money: '',
          pay_time: '',
          mark: '',
          account_id:'',//账户id
          amount_received:'',//收款金额
          pay_date:'',
          remark:'',
        },
        record_data: [],
        mark_data: []
      }
    },
    mounted() {
      this.getReceiveList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      //应收入账
      handleOkReceive(){
        this.$http.put(globalConfig.temporary_server + 'account_receivable/receive/' + this.row.id, this.form).then(res => {
          this.callbackSuccess(res);
        })

      },
      //收款列表
      getReceiveList(){
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'account_receivable', this.params).then(res => {
          this.showLoading(false);
          this.callbackSuccess(res);
          if(res.code===200){
            console.log(res.data.data);
            this.tableData = res.data.data;
          }
        })
      },
      handleClickBtn(key) {
        console.log(key);
        if (key === 'should_receive') {
          this.receive_visible = true;
        }
        if (key === 'record') {
          this.record_visible = true;
        }
        if (key === 'mark') {
          this.mark_visible = true;
        }
        if (key === 'register') {
          this.register_size = 'mini';
          this.register_visible = true;
        }
      },
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
            keyType: 'dateRange',
            title: '应收日期',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '催缴日期',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '入账状态',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '待入账',
              },
              {
                id: 13,
                title: '带结清',
              },
              {
                id: 14,
                title: '已结清',
              },
              {
                id: 15,
                title: '已超额',
              }
            ],
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
      handleOpenSubject(which) {
        this.which_subject = which;
        this.subject_visible = true;
      },
      //科目确定
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'subject_deposit') {
          this.subject_deposit.parent_name = val.title;
          this.subject_deposit.parent_id = val.id;
          this.ruleForm.subject_id = val.id;
          this.ruleForm.subject_val = val.title;

          this.formData.subject_id = val.id;
          this.formData.subject_val = val.title;

        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/gatherring/index.scss";

  @mixin financeImg($m,$n) {
    $url: '../../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #gathering {
      > div {
        .listTopRight {
          .home_icon {
            @include financeImg('yinhanglius.png', 'theme1');
          }
        }
      }
    }
  }
</style>
