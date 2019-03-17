<template>
  <div id="payment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>付款</h1>
      </div>
      <div class="items-center listTopRight">
        <div class="icons home_icon"></div>
        <div class="icons add" @click="addPayment"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableLists"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        header-row-class-name="tableHeader"
        style="width: 100%">

        <el-table-column
          v-for="item in Object.keys(paymentLabels)"
          :label="paymentLabels[item]" :key="item"
          :prop="item"
          align="center"
          >
        </el-table-column>

        <el-table-column label="状态" prop="" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" width="500">
          <template slot-scope="scope">
            <el-tooltip
              v-for="(item,index) in btnData" :key="index"
              effect="light" :content="item.content" placement="top">
              <el-button
                :size="item.size"
                @click="handleClickBtn(item.methods,scope.row,scope.$index,item.key)"
                :icon="item.icon" :type="item.type">
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      分页
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="count"
            layout="total,jumper,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>

    <!--删除lord-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该付款信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small"  @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--修改金额-->
    <lj-dialog :visible="pay_visible" :size="{width: 440 + 'px',height:300 + 'px'}" @close="pay_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改应付金额</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="formData" ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>应付金额</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="formData.amount_payable" ></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit(current_row,formData.amount_payable)">确定</el-button>
          <el-button type="info" size="small"  @click="pay_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--添加备注-->
    <lj-dialog :visible="remark_visible" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="remark_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加备注</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="formData"  ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>备注</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="formData.remark" type="textarea"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small"  @click="remark_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--补齐时间-->
    <lj-dialog :visible="complete_visible" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="complete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改补齐时间</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="formData"  ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>补齐时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    v-model="formData.complete_date" type="date">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_complete_date(current_row,formData.complete_date)">确定</el-button>
          <el-button type="info" size="small"  @click="complete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--应付时间-->
    <lj-dialog :visible="paytime_visible" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="paytime_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改应付时间</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="formData"  ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>应付时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    v-model="formData.pay_date" type="date">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_pay_date(current_row,formData.pay_date)">确定</el-button>
          <el-button type="info" size="small"  @click="paytime_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--修改科目-->
    <lj-dialog :visible="view_subject" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="view_subject = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改科目</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="formData"  ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>科目</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="formData.subject_val" @focus="handleOpenSubject('subject_deposit')"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_subject_id(current_row,formData.subject_id)">确定</el-button>
          <el-button type="info" size="small"  @click="sub_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--新增应付款项-->
    <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{current_row === ''? '新增':'编辑'}}</h3>
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
                  <span>房屋地址</span>
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
                  <span>账户类型</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.customer_account_type"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>客户账户</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.customer_account_num"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>应付金额</span>
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
                  <span>详情</span>
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


  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';

  export default {
    name: "index",
    components: {SearchHigh,LjDialog,FinMenuList,LjSubject},
    data() {
      return {
        params: {
          is_del:'',//是否显示删除数据
          staff_id:'',
          department_id:'',
          status:'',//入账状态
          date_min:'',//时间周期最小
          date_max:'',
          subject_id:'',
          balance_min:'',//剩余款项范围-最小
          balance_max:'',
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: '',
          export: '',
        },

        current_row:'',
        delete_visible:false,//删除
        add_visible:false,//新增
        pay_visible:false,//应付金额
        remark_visible:false,//备注
        paytime_visible:false,//应付时间
        complete_visible:false,//补齐时间
        subject_visible:false,//科目
        view_subject:false,//科目弹窗

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

        showSearch: false,
        showFinMenuList: false,
        searchData: {
          status: 'gathering',
          data: [],
        },

        tableLists:[],
        count:0,
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
        formData:{
          amount_payable:'',//金额
          remark:'',
          pay_date:'',
          subject_val:'',
          complete_date:'',
          subject_id:'',
        },
        rules:{
          amount_payable: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },

        btnData:[
          {label:"",type:"primary",icon:"el-icon-edit",size:"small",methods:"handleEditPay",content:"修改应付金额",key:"pay_visible"},
          {label:"",type:"warning",icon:"el-icon-tickets",size:"small",methods:"handleLog",content:"添加备注",key:"remark_visible"},
          {label:"",type:"success",icon:"el-icon-tickets",size:"small",methods:"handleSub",content:"修改科目",key:"view_subject"},
          {label:"",type:"info",icon:"el-icon-date",size:"small",methods:"handleComplete",content:"修改补齐时间",key:"complete_visible"},
          {label:"",type:"warning",icon:"el-icon-time",size:"small",methods:"handlePayTime",content:"修改应付时间",key:"paytime_visible"},
          {label:"",type:"danger",icon:"el-icon-delete",size:"small",methods:"handleDelete",content:"删除应付款项",key:"delete_visible"},
        ],

        paymentLabels:{
          "customer.customer_name":"客户姓名",
          "customer.address":"地址",
          "subject.title":"支出科目",
          "amount_payable":"应付金额",
          "balance":"实付金额",
          "complete_date":"补齐时间",
          "customer.contact":"手机号",
          "description.description":"明细详情",
          "customer.remark":"备注",
          "customer.salary_leader_name":"负责人",
          "staff.name":"开单人",
          "customer.salary_department_name":"部门"
        },

        api:{
          account_payable:"account_payable/edit_pay_amount/",//应付
          complete_date:"account_payable/complete_date/",//补齐
          pay_date:"account_payable/pay_date/",//应付
          subject:"account_payable/subject/",//科目
        },

      }
    },
    mounted() {
        this.getPaymentList();
    },
    activated() {
    },
    watch: {
    },
    created(){
    },
    computed: {},
    methods: {
      //换页
      handleChangePage(page) {
        this.params.page = page;
        this.getPaymentList();
      },
      //请求回调
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$LjNotify('success',{
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getPaymentList();
        } else {
          this.$LjNotify('error',{
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },

      //提交金额
      handleSubmit(row,val){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //提交补齐时间
      handleSubmit_complete_date(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //提交付款时间
      handleSubmit_pay_date(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 提交科目
      handleSubmit_subject_id(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 操作项回调
      handleClickBtn(func,row,index,key){
        // this[func](row,index);
        if(key==="complete_visible"){
          this.complete_visible = true;
          this.current_row = row;
          this.formData.complete_date = this.current_row.complete_date;

        }
        if(key==="remark_visible"){
          this.remark_visible = true;
          this.current_row = row;
          this.formData.remark = this.current_row.remark;
        }
        if(key==="subject_visible"){
          this.subject_visible = true;
          this.current_row = row;
          this.formData.subject_id = this.current_row.subject_id;
        }
        if(key==="pay_visible"){
          this.pay_visible = true;
          this.current_row = row;
          this.formData.amount_payable = this.current_row.amount_payable;
        }
        if(key==="paytime_visible"){
          this.paytime_visible = true;
          this.current_row = row;
          this.formData.pay_date = this.current_row.pay_date;
        }
        if(key==="delete_visible"){
          this.delete_visible = true;
          this.current_row = row;
        }
        if(key==="view_subject"){
          this.view_subject = true;
          this.current_row = row;
          this.formData.subject_val = this.current_row.subject.title;
        }

      },

      // 新增应付款
      addPayment(){
        this.add_visible = true;
        this.current_row = '';
      },

      handleOkDel() {
        this.$http.delete(globalConfig.temporary_server + 'account_payable/delete/'+this.current_row.id).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      //新增提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //加载列表
      getPaymentList() {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'account_payable', this.params).then(res => {
          if (res.code === 200) {
            this.showLoading(false);
            this.tableLists = res.data.data;
            this.count = res.data.count;
            console.log(this.tableLists);
          } else {
            this.tableLists = [];
            this.count = 0;
          }
        }).catch(err => {
          console.log(err);
        })
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
      // 科目
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

  #theme_name.theme1 {
    #customer {


    }
  }
</style>
