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
        <div class="icons add" @click="add"><b>+</b></div>
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
        <el-table-column label="付款时间" align="center" prop="pay_date">
        </el-table-column>
        <el-table-column label="客户姓名" prop="customer.customer_name" align="center">
        </el-table-column>
        <el-table-column label="地址" prop="customer.address" align="center">
        </el-table-column>
        <el-table-column label="支出科目" prop="parent_subject.title" align="center">
        </el-table-column>
        <el-table-column label="应付金额" prop="amount_receivable" align="center">
        </el-table-column>
        <el-table-column label="实付金额" prop="amount_received" align="center">
        </el-table-column>
        <el-table-column label="补齐时间" prop="complete_date" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="customer.contact" align="center">
        </el-table-column>
        <el-table-column label="明细详情" prop="description.description" align="center">
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center">
        </el-table-column>
        <el-table-column label="负责人" prop="staff.name" align="center">
        </el-table-column>
        <el-table-column label="开单人" prop="staff.name" align="center">
        </el-table-column>
        <el-table-column label="部门" prop="org.leader" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" width="500">
          <template slot-scope="scope">
            <el-button type="success" plain size="small" @click="handleDetails(scope.row,scope.$index)"
                       icon="el-icon-view">详情
            </el-button>
            <el-button type="primary" plain size="small" @click="handleEdit(scope.row,scope.$index)"
                       icon="el-icon-edit">编辑
            </el-button>
            <el-button type="danger" plain size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除
            </el-button>
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
          <div class="unUse-txt">确定删除该房东信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" @click="handleOkDel">确定</el-button>
          <el-button size="small" plain @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--新增-->
    <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main">

              <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" size="mini">
                <el-form-item prop="name">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_subject"></i>
                      </b>
                      <span>客户名称</span>
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
                      <span>客户账户</span>
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
                      <span>应付金额</span>
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
                      <span>科目</span>
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
                      <span>付款时间</span>
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
                      <span>详情</span>
                    </div>
                    <div class="item_content">
                      <el-input placeholder="请输入" v-model="ruleForm.name" type="textarea"></el-input>
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
                      <el-input placeholder="请输入" v-model="ruleForm.name" type="textarea"></el-input>
                    </div>
                  </div>
                </el-form-item>
              </el-form>

        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" @click="submitForm('ruleForm')">确定</el-button>
          <el-button size="small" plain  @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </div>
    </lj-dialog>
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
          <el-button type="danger" plain size="small" @click="handleOkDel">确定</el-button>
          <el-button size="small" plain @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>


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
        delete_visible:false,//删除
        add_visible:false,//新增
        current_row:'',
        showSearch: false,
        showFinMenuList: false,
        searchData: {
          status: 'gathering',
          data: [],
        },
        count:0,
        tableLists:[],
        ruleForm:{
          name: '',
        },
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
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
      handleChangePage(page) {
        this.params.page = page;
        this.getPaymentList();
      },
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
      add(){
        this.add_visible = true;
      },
      handleEdit(){
        this.add_visible = true;
      },
      handleDelete(row){
        this.current_row = row;
        this.delete_visible = true;
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
      //提交
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
        this.$http.get(globalConfig.temporary_server + 'account_payable/', this.params).then(res => {
          if (res.code === 200) {
            this.showLoading(false);
            this.tableLists = res.data.data;
            this.count = res.data.count;
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
    },
  }
</script>

<style lang="scss" scoped>

  #theme_name.theme1 {
    #customer {


    }
  }
</style>
