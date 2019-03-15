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
            <!--<el-button v-for="(item,index) in btnData"-->
                       <!--:key="index"-->
                       <!--:type="item.type"-->
                       <!--:size="item.size"-->
                       <!--@click="clkCall(item.methods,scope.row,scope.$index)"-->
                       <!--:icon="item.icon">-->
              <!--{{item.label}}-->
            <!--</el-button>-->
            <el-tooltip
              v-for="(item,index) in btnData" :key="index"
              effect="light" :content="item.content" placement="top">

              <el-button :size="item.size" @click="clkCall(item.methods,scope.row,scope.$index)" :icon="item.icon" :type="item.type"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <!--<footer class="flex-center bottomPage">-->
        <!--<div class="develop flex-center">-->
          <!--<i class="el-icon-d-arrow-right"></i>-->
        <!--</div>-->
        <!--<div class="page">-->
          <!--<el-pagination-->
            <!--:total="count"-->
            <!--layout="total,jumper,prev,pager,next"-->
            <!--:current-page="params.page"-->
            <!--:page-size="params.limit"-->
            <!--@current-change="handleChangePage"-->
          <!--&gt;-->
          <!--</el-pagination>-->
        <!--</div>-->
      <!--</footer>-->
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
          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>应付金额</span>
                </div>
                <div class="item_content">
                  <!--<el-input placeholder="请输入" v-model="ruleForm.amount_payable"></el-input>-->
                  <el-input placeholder="请输入" v-model="ruleForm.amount_payable" ></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit(current_row,ruleForm.amount_payable)">确定</el-button>
          <el-button type="info" size="small"  @click="pay_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--备注-->
    <lj-dialog :visible="log_visible" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="log_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加备注</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
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
          <el-button type="danger"  size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small"  @click="log_visible = false;current_row = ''">取消</el-button>
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
          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
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
                    v-model="ruleForm.complete_date" type="date">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_complete_date(current_row,ruleForm.complete_date)">确定</el-button>
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
          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
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
                    v-model="ruleForm.pay_date" type="date">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_pay_date(current_row,ruleForm.pay_date)">确定</el-button>
          <el-button type="info" size="small"  @click="paytime_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--修改科目-->
    <lj-dialog :visible="sub_visible" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="sub_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改科目</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="ruleForm" :rules="rules" ref="payForm"  class="demo-ruleForm" size="mini">
            <el-form-item prop="name">
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>科目</span>
                </div>
                <div class="item_content">
                  <el-input placeholder="请输入" v-model="ruleForm.subject_id"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger"  size="small" @click="handleSubmit_subject_id(current_row,ruleForm.subject_id)">确定</el-button>
          <el-button type="info" size="small"  @click="sub_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--详情-->
    <lj-dialog :visible="detail_visible" :size="{width: 600 + 'px',height: 400 + 'px'}" @close="detail_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="dialog_main">

        </div>
      </div>
    </lj-dialog>
    <!--新增-->
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
                  <!--<el-input placeholder="请输入" @focus="handleOpenSubject('subject_rent')" v-model="lordForm.rental_subject"></el-input>-->
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
          <el-button type="danger"  size="small" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="info" size="small"   @click="resetForm('ruleForm')">重置</el-button>
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
        detail_visible:false,//详情
        pay_visible:false,
        paytime_visible:false,
        complete_visible:false,
        log_visible:false,
        sub_visible:false,

        dialog_status:{
          pay_visible:false,
          paytime_visible:false,
          complete_visible:false,
          log_visible:false,
          sub_visible:false,
        },


        current_row:'',
        showSearch: false,
        showFinMenuList: false,
        searchData: {
          status: 'gathering',
          data: [],
        },
        count:0,
        tableLists:[
          {
            "id": 138005,
            "subject_id": 3,
            "description": {
              "customer": "张良方",
              "months": "2017-07-04~2020-07-04",
              "description": "月付2200",
              "staff": "刘育岑"
            },
            "staff_id": 249,
            "department_id": 66,
            "customer_id": 4098,
            "amount_payable": "2200.00",
            "amount_paid": "0.00",
            "balance": "2200.00",
            "pay_date": "2019-03-04",
            "complete_date": "2019-03-04",
            "status": 1,
            "create_time": "2017-09-09 17:30:56",
            "update_time": "2017-09-09 17:30:56",
            "delete_time": null,
            "running_account_record": null,
            "remark": "",
            "customer_account_num": "6236682000012399308",
            "customer_account_type": 1,
            "relative_payable": null,
            "pendable": 1,
            "mutable": 1,
            "aproach": 2,
            "tag": "",
            "identity": 1,
            "modified_field": "",
            "proof": {
              "table": "financial_customer_collect",
              "id": 4098,
              "rank": 20
            },
            "is_rank": null,
            "rank": null,
            "staff": {
              "id": 249,
              "name": "刘育岑",
              "avatar": "https://static.dingtalk.com/media/lADPBbCc1sdkMS7NA5_NBNc_1239_927.jpg",
              "phone": "18625200977",
              "email": null,
              "ding_user_id": "145110486021241399",
              "gender": 229,
              "is_on_job": null,
              "is_enable": null,
              "is_leader": 0,
              "qr_code": "",
              "created_at": "2017-07-06 11:51:08",
              "org": [],
              "position": [
                {
                  "id": 56,
                  "name": "片区经理",
                  "description": "片区经理",
                  "duty_id": 16,
                  "parent_id": 55,
                  "created_at": "2018-04-19 13:16:48",
                  "pivot": {
                    "position_id": 56,
                    "user_id": 249
                  }
                }
              ]
            },
            "customer": {
              "id": 4098,
              "customer_name": "张良方",
              "staff_id": 249,
              "department_id": 66,
              "leader_id": 19,
              "house_id": 4277,
              "address": "津西新天地1-707",
              "pay_types": [
                "1",
                "1",
                "1"
              ],
              "months": 36,
              "prices": [
                "2200",
                "2200",
                "2200"
              ],
              "deposit": "2200.00",
              "contact": "18115566969",
              "account_type": 1,
              "account_num": "6236682000012399308",
              "account_bank": 4,
              "account_subbank": "",
              "account_owner": "王子明",
              "account_history": [
                {
                  "account_type": 1,
                  "account_bank": 3,
                  "account_subbank": "",
                  "account_num": "6217906101009930038",
                  "account_owner": "王金娣",
                  "date": "2017-09-09 17:30:56"
                }
              ],
              "deal_date": "2017-07-04",
              "first_pay_date": "2017-08-04",
              "second_pay_date": "2017-09-04",
              "py_first": "jxxtd1_707zlf",
              "py_all": "jinxixintiandi1_707zhangliangfang",
              "subject_id": {
                "rental": "3",
                "deposit": "2"
              },
              "remark": "",
              "status": 2,
              "operator_id": 52,
              "freeze": 0,
              "create_time": "2017-09-04 21:13:04",
              "update_time": "2017-11-24 14:23:58",
              "delete_time": null,
              "salary_department_id": 0,
              "salary_leader_id": 0,
              "salary_candidate": 1,
              "salary_department_name": "",
              "salary_leader_name": "",
              "mark_date": "0000-00-00",
              "generate_time": null,
              "suppress_dup": 1,
              "medi_cost": "0.00",
              "warrenty": 3,
              "mark_cg": 2,
              "mark_2nd": 2,
              "mark_jt": 2,
              "fail": 2,
              "locked": "",
              "v3_contract_id": 0,
              "chc_id": 0
            },
            "subject": {
              "id": 3,
              "parent_id": 18,
              "title": "房租",
              "er_type": 2,
              "remark": "",
              "creator_id": 2639,
              "create_time": "2017-08-15 04:21:43",
              "update_time": "2019-03-01 11:53:32",
              "delete_time": null,
              "is_enable": 2,
              "subject_code": "GH03",
              "parent_subject": {
                "id": 18,
                "parent_id": 0,
                "title": "前租客代缴",
                "er_type": 3,
                "remark": "",
                "creator_id": 2639,
                "create_time": "2017-12-14 04:10:33",
                "update_time": "2018-12-26 10:42:37",
                "delete_time": null,
                "is_enable": 2,
                "subject_code": null
              }
            }
          },
          {
            "id": 138004,
            "subject_id": 3,
            "description": {
              "customer": "张良方",
              "months": "2017-07-04~2020-07-04",
              "description": "月付2200",
              "staff": "刘育岑"
            },
            "staff_id": 249,
            "department_id": 66,
            "customer_id": 4098,
            "amount_payable": "2200.00",
            "amount_paid": "0.00",
            "balance": "2200.00",
            "pay_date": "2019-03-04",
            "complete_date": "2019-03-04",
            "status": 1,
            "create_time": "2017-09-09 17:30:56",
            "update_time": "2017-09-09 17:30:56",
            "delete_time": null,
            "running_account_record": null,
            "remark": "",
            "customer_account_num": "6236682000012399308",
            "customer_account_type": 1,
            "relative_payable": null,
            "pendable": 1,
            "mutable": 1,
            "aproach": 2,
            "tag": "",
            "identity": 1,
            "modified_field": "",
            "proof": {
              "table": "financial_customer_collect",
              "id": 4098,
              "rank": 20
            },
            "is_rank": null,
            "rank": null,
            "staff": {
              "id": 249,
              "name": "刘育岑",
              "avatar": "https://static.dingtalk.com/media/lADPBbCc1sdkMS7NA5_NBNc_1239_927.jpg",
              "phone": "18625200977",
              "email": null,
              "ding_user_id": "145110486021241399",
              "gender": 229,
              "is_on_job": null,
              "is_enable": null,
              "is_leader": 0,
              "qr_code": "",
              "created_at": "2017-07-06 11:51:08",
              "org": [],
              "position": [
                {
                  "id": 56,
                  "name": "片区经理",
                  "description": "片区经理",
                  "duty_id": 16,
                  "parent_id": 55,
                  "created_at": "2018-04-19 13:16:48",
                  "pivot": {
                    "position_id": 56,
                    "user_id": 249
                  }
                }
              ]
            },
            "customer": {
              "id": 4098,
              "customer_name": "张良方",
              "staff_id": 249,
              "department_id": 66,
              "leader_id": 19,
              "house_id": 4277,
              "address": "津西新天地1-707",
              "pay_types": [
                "1",
                "1",
                "1"
              ],
              "months": 36,
              "prices": [
                "2200",
                "2200",
                "2200"
              ],
              "deposit": "2200.00",
              "contact": "18115566969",
              "account_type": 1,
              "account_num": "6236682000012399308",
              "account_bank": 4,
              "account_subbank": "",
              "account_owner": "王子明",
              "account_history": [
                {
                  "account_type": 1,
                  "account_bank": 3,
                  "account_subbank": "",
                  "account_num": "6217906101009930038",
                  "account_owner": "王金娣",
                  "date": "2017-09-09 17:30:56"
                }
              ],
              "deal_date": "2017-07-04",
              "first_pay_date": "2017-08-04",
              "second_pay_date": "2017-09-04",
              "py_first": "jxxtd1_707zlf",
              "py_all": "jinxixintiandi1_707zhangliangfang",
              "subject_id": {
                "rental": "3",
                "deposit": "2"
              },
              "remark": "",
              "status": 2,
              "operator_id": 52,
              "freeze": 0,
              "create_time": "2017-09-04 21:13:04",
              "update_time": "2017-11-24 14:23:58",
              "delete_time": null,
              "salary_department_id": 0,
              "salary_leader_id": 0,
              "salary_candidate": 1,
              "salary_department_name": "",
              "salary_leader_name": "",
              "mark_date": "0000-00-00",
              "generate_time": null,
              "suppress_dup": 1,
              "medi_cost": "0.00",
              "warrenty": 3,
              "mark_cg": 2,
              "mark_2nd": 2,
              "mark_jt": 2,
              "fail": 2,
              "locked": "",
              "v3_contract_id": 0,
              "chc_id": 0
            },
            "subject": {
              "id": 3,
              "parent_id": 18,
              "title": "房租",
              "er_type": 2,
              "remark": "",
              "creator_id": 2639,
              "create_time": "2017-08-15 04:21:43",
              "update_time": "2019-03-01 11:53:32",
              "delete_time": null,
              "is_enable": 2,
              "subject_code": "GH03",
              "parent_subject": {
                "id": 18,
                "parent_id": 0,
                "title": "前租客代缴",
                "er_type": 3,
                "remark": "",
                "creator_id": 2639,
                "create_time": "2017-12-14 04:10:33",
                "update_time": "2018-12-26 10:42:37",
                "delete_time": null,
                "is_enable": 2,
                "subject_code": null
              }
            }
          },
          {
            "id": 138004,
            "subject_id": 3,
            "description": {
              "customer": "张良方",
              "months": "2017-07-04~2020-07-04",
              "description": "月付2200",
              "staff": "刘育岑"
            },
            "staff_id": 249,
            "department_id": 66,
            "customer_id": 4098,
            "amount_payable": "2200.00",
            "amount_paid": "0.00",
            "balance": "2200.00",
            "pay_date": "2019-03-04",
            "complete_date": "2019-03-04",
            "status": 1,
            "create_time": "2017-09-09 17:30:56",
            "update_time": "2017-09-09 17:30:56",
            "delete_time": null,
            "running_account_record": null,
            "remark": "",
            "customer_account_num": "6236682000012399308",
            "customer_account_type": 1,
            "relative_payable": null,
            "pendable": 1,
            "mutable": 1,
            "aproach": 2,
            "tag": "",
            "identity": 1,
            "modified_field": "",
            "proof": {
              "table": "financial_customer_collect",
              "id": 4098,
              "rank": 20
            },
            "is_rank": null,
            "rank": null,
            "staff": {
              "id": 249,
              "name": "刘育岑",
              "avatar": "https://static.dingtalk.com/media/lADPBbCc1sdkMS7NA5_NBNc_1239_927.jpg",
              "phone": "18625200977",
              "email": null,
              "ding_user_id": "145110486021241399",
              "gender": 229,
              "is_on_job": null,
              "is_enable": null,
              "is_leader": 0,
              "qr_code": "",
              "created_at": "2017-07-06 11:51:08",
              "org": [],
              "position": [
                {
                  "id": 56,
                  "name": "片区经理",
                  "description": "片区经理",
                  "duty_id": 16,
                  "parent_id": 55,
                  "created_at": "2018-04-19 13:16:48",
                  "pivot": {
                    "position_id": 56,
                    "user_id": 249
                  }
                }
              ]
            },
            "customer": {
              "id": 4098,
              "customer_name": "张良方",
              "staff_id": 249,
              "department_id": 66,
              "leader_id": 19,
              "house_id": 4277,
              "address": "津西新天地1-707",
              "pay_types": [
                "1",
                "1",
                "1"
              ],
              "months": 36,
              "prices": [
                "2200",
                "2200",
                "2200"
              ],
              "deposit": "2200.00",
              "contact": "18115566969",
              "account_type": 1,
              "account_num": "6236682000012399308",
              "account_bank": 4,
              "account_subbank": "",
              "account_owner": "王子明",
              "account_history": [
                {
                  "account_type": 1,
                  "account_bank": 3,
                  "account_subbank": "",
                  "account_num": "6217906101009930038",
                  "account_owner": "王金娣",
                  "date": "2017-09-09 17:30:56"
                }
              ],
              "deal_date": "2017-07-04",
              "first_pay_date": "2017-08-04",
              "second_pay_date": "2017-09-04",
              "py_first": "jxxtd1_707zlf",
              "py_all": "jinxixintiandi1_707zhangliangfang",
              "subject_id": {
                "rental": "3",
                "deposit": "2"
              },
              "remark": "",
              "status": 2,
              "operator_id": 52,
              "freeze": 0,
              "create_time": "2017-09-04 21:13:04",
              "update_time": "2017-11-24 14:23:58",
              "delete_time": null,
              "salary_department_id": 0,
              "salary_leader_id": 0,
              "salary_candidate": 1,
              "salary_department_name": "",
              "salary_leader_name": "",
              "mark_date": "0000-00-00",
              "generate_time": null,
              "suppress_dup": 1,
              "medi_cost": "0.00",
              "warrenty": 3,
              "mark_cg": 2,
              "mark_2nd": 2,
              "mark_jt": 2,
              "fail": 2,
              "locked": "",
              "v3_contract_id": 0,
              "chc_id": 0
            },
            "subject": {
              "id": 3,
              "parent_id": 18,
              "title": "房租",
              "er_type": 2,
              "remark": "",
              "creator_id": 2639,
              "create_time": "2017-08-15 04:21:43",
              "update_time": "2019-03-01 11:53:32",
              "delete_time": null,
              "is_enable": 2,
              "subject_code": "GH03",
              "parent_subject": {
                "id": 18,
                "parent_id": 0,
                "title": "前租客代缴",
                "er_type": 3,
                "remark": "",
                "creator_id": 2639,
                "create_time": "2017-12-14 04:10:33",
                "update_time": "2018-12-26 10:42:37",
                "delete_time": null,
                "is_enable": 2,
                "subject_code": null
              }
            }
          },
        ],
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
        },

        rules:{
          amount_payable: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        btnData:[
          {label:"",type:"success",icon:"el-icon-view",size:"small",methods:"handleDetail",content:"查看应付款项"},
          {label:"",type:"primary",icon:"el-icon-edit",size:"small",methods:"handleEditPay",content:"修改应付金额"},
          {label:"",type:"warning",icon:"el-icon-tickets",size:"small",methods:"handleLog",content:"添加备注"},
          {label:"",type:"success",icon:"el-icon-tickets",size:"small",methods:"handleSub",content:"修改科目"},
          {label:"",type:"info",icon:"el-icon-date",size:"small",methods:"handleComplete",content:"修改补齐时间"},
          {label:"",type:"warning",icon:"el-icon-time",size:"small",methods:"handlePayTime",content:"修改应付时间"},
          {label:"",type:"danger",icon:"el-icon-delete",size:"small",methods:"handleDelete",content:"删除应付款项"},
        ],
        paymentLabels:{
          "customer.customer_name":"客户姓名",
          "customer.address":"地址",
          "subject":"支出科目",
          "amount_receivable":"应付金额",
          "amount_received":"实付金额",
          "complete_date":"补齐时间",
          "customer.contact":"手机号",
          "description":"明细详情",
          "remark":"备注",
          "org":"负责人",
          "staff":"开单人",
          "department":"部门"
        },

        subject_visible: false,
        which_subject: '',
        new_subject_visible: false,
        new_subject: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },

        api:{
          account_payable:"account_payable/edit_pay_amount/",//应付
          complete_date:"account_payable/complete_date/",//补齐
          pay_date:"account_payable/pay_date/",//应付
          subject:"account_payable/subject/",//科目
        },
        myParams:{
          payable:{
            account_payable:""
          },
          complete:{
            complete_date:""
          },
          pay:{
            pay_date:""
          },
          subject:{
            subject_id:""
          },
        }

      }
    },
    mounted() {
        // this.getPaymentList();
    },
    activated() {

    },
    watch: {



    },
    created(){

    },
    computed: {},
    methods: {
      // handleChangePage(page) {
      //   this.params.page = page;
      //   this.getPaymentList();
      // },
      // callbackSuccess(res) {
      //   if (res.code === 200) {
      //     this.$LjNotify('success',{
      //       title: '成功',
      //       message: res.msg,
      //       subMessage: '',
      //     });
      //     this.getPaymentList();
      //   } else {
      //     this.$LjNotify('error',{
      //       title: '失败',
      //       message: res.msg,
      //       subMessage: '',
      //     });
      //   }
      // },

      //确认
      handleSubmit(row,val){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSubmit_complete_date(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSubmit_pay_date(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSubmit_subject_id(){
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/"+row.id,{amount_payable:val}).then(res => {
          if(res.code===200){
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },

      clkCall(func,row,index){
        this[func](row,index);
      },
      // 新增
      addPayment(){
        this.add_visible = true;
        this.current_row = '';
      },
      //备注
      handleLog(row,index){
        this.log_visible = true;
        this.current_row = row;
      },
      //补齐时间
      handleComplete(row,index){
        this.complete_visible = true;
        this.current_row = row;
        this.getPayList(index);
      },
      //应付时间
      handlePayTime(row,index){
        this.paytime_visible = true;
        this.current_row = row;
        this.getPayList(index);
      },
      //金额
      handleEditPay(row,index){
        this.pay_visible = true;
        this.current_row = row;
        this.getPayList(index);
      },
      //科目
      handleSub(row,index){
        this.sub_visible = true;
        this.current_row = row;
        this.getPayList(index);
      },
      //详情
      handleDetail(row,index){
        this.detail_visible = true;
        this.current_row = row;
        this.getPayList(index);
      },
      getPayList(index){
        for(let item of Object.keys(this.ruleForm)){
          this.ruleForm[item] = this.tableLists[index][item];
        }
        console.log(this.ruleForm);
      },
      //删除
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
      // getPaymentList() {
      //   this.showLoading(true);
      //   this.$http.get(globalConfig.temporary_server + 'account_payable/', this.params).then(res => {
      //     if (res.code === 200) {
      //       this.showLoading(false);
      //       this.tableLists = res.data.data;
      //       this.count = res.data.count;
      //     } else {
      //       this.tableLists = [];
      //       this.count = 0;
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   })
      // },

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
      handleSubjectAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.url + 'subject',this.new_subject).then(res => {
              if (res.code === 200) {
                this.$notify.success({
                  title: '成功',
                  message: res.msg
                });
                this.handleCancelAdd();
                this.getSubjectList();
              }else {
                this.$notify.warning({
                  title: '失败',
                  message: res.msg
                });
                return false;
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            return false;
          }
        })
      },
      //科目确定
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'new_subject') {
          this.new_subject.parent_name = val.title;
          this.new_subject.parent_id = val.id;
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
