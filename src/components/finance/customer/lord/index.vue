<template>
  <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
    <!--列表-->
    <el-table
      :data="lordLists"
      :height="this.mainListHeight(30) + 'px'"
      highlight-current-row
      header-row-class-name="tableHeader"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>

      <el-table-column label="前缀" align="center">
        <template slot-scope="scope">
          <div class="statusBar flex-center">
            <span v-if="LordStatus[scope.$index].is_contact===1" style="background-color: #14e731;"></span>
            <span v-if="LordStatus[scope.$index].is_name===1" style="background-color: #e6a23c;"></span>
            <span v-if="LordStatus[scope.$index].is_address===2" style="background-color: #f56c6c;"></span>
            <span v-if="LordStatus[scope.$index].suppress_dup===0" style="background-color: #409eff;"></span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in Object.keys(lordLabel)"
        :label="lordLabel[item]" :key="item"
        :prop="item"
        align="center">
      </el-table-column>

      <el-table-column label="状态" prop="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" prop="" align="center" width="500">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleDetailsLord(scope.row,scope.$index)"
                     icon="el-icon-view">详情
          </el-button>
          <el-button type="primary" size="small" @click="handleEditLord(scope.row,scope.$index)"
                     icon="el-icon-edit">编辑
          </el-button>
          <el-button type="warning" size="small" @click="handleProcessLord(scope.row)" icon="el-icon-info">
            生成待处理项
          </el-button>
          <el-button type="danger" size="small" @click="handleDeleteLord(scope.row)" icon="el-icon-delete">删除
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
          :total="lordCount"
          layout="total,jumper,prev,pager,next"
          :current-page="params.page"
          :page-size="params.limit"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </footer>
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
    <!--详情-->
    <lj-dialog :visible="details_visible" :size="{width: 1200 + 'px',height: 600 + 'px'}"
               @close="details_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="dialog_main">
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="15" :offset="1">
              <h3 class="justify-start" style="margin-bottom: 20px">基础信息</h3>
              <div class="justify-bet" style="flex-wrap: wrap">
                <div class="" style="width:45%;padding: 10px 0;text-align: left"
                     v-for="(item,index) in detailLabel.slice(0,17)" :key="index">
                  <span class="tablelabel">{{item.label}}</span>
                  <span>{{lordDetailData[item.prop]}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 class="justify-start" style="margin-bottom: 20px">客户账户信息</h3>
              <div class="justify-bet" style="flex-wrap: wrap">
                <div class="" style="width:90%;padding: 10px 0;text-align: left"
                     v-for="(item,index) in detailLabel.slice(17)" :key="index">
                  <span class="tablelabel">{{item.label}}</span>
                  <span>{{lordDetailData[item.prop]}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </lj-dialog>
    <!--编辑-->
    <lj-dialog
      :visible="edit_visible"
      :size="{width: 960 + 'px',height: 820 + 'px' }"
      @close="edit_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ current_row ? '编辑' : '新增'}}</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="form" size="mini" ref="formData">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="12">
                <el-form-item prop="operatorName">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>签约人</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.operatorName" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="departmentName">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>所属部门</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.departmentName" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="staffName">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>负责人</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.staffName" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="customer_name">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>客户姓名</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.customer_name" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="contact">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>手机号</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.contact" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="address">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>房屋地址</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="months">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>收房月数</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.months" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item prop="prices">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>月单价</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.prices" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="deposit">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>押金</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.deposit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="warrenty">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>保修期</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.warrenty" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="medi_cost">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>中介费</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.medi_cost" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>

              </el-col>
              <el-col :span="12">
                <el-form-item prop="account_type">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>账户类型</span>
                    </div>
                    <div class="item_content">
                      <el-select class="all_width" v-model="form.account_type" placeholder="请输入">
                        <el-option v-for="(item,key) in cate" :value="parseInt(key)" :key="key"
                                   :label="item"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="account_owner">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>收款人</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.account_owner" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="account_bank">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>开户银行</span>
                    </div>
                    <div class="item_content">
                      <el-select class="all_width" v-model="form.account_bank" placeholder="请选择">
                        <el-option v-for="(item,key) in banks" :value="item" :key="key" :label="item"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="account_subbank">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>支行</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.account_subbank" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="account_num">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>账号</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.account_num" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="pay_types_val">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>付款方式</span>
                    </div>
                    <div class="item_content">
                      <el-select class="all_width" v-model="form.pay_types_val" placeholder="请输入">
                        <el-option v-for="(item,key) in payTypes" :value="parseInt(key)" :key="key"
                                   :label="item"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="deal_date">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>待签约</span>
                    </div>
                    <div class="item_content">
                      <el-date-picker v-model="form.deal_date" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="first_pay_date">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>房租日期</span>
                    </div>
                    <div class="item_content">
                      <el-date-picker v-model="form.first_pay_date" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="second_pay_date">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>房租日期</span>
                    </div>
                    <div class="item_content">
                      <el-date-picker v-model="form.second_pay_date" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="rental_subject">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>房租科目</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.rental_subject" placeholder="请输入"
                                @focus="handleOpenSubject('subject_rent')"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="deposit_subject">
                  <div class="form_item_container">
                    <div class="item_label">
                      <b class="item_icons">
                        <i class="icon_account"></i>
                      </b>
                      <span>押金科目</span>
                    </div>
                    <div class="item_content">
                      <el-input v-model="form.deposit_subject" placeholder="请输入"
                                @focus="handleOpenSubject('subject_deposit')"></el-input>
                    </div>
                  </div>
                </el-form-item>

              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" @click="postLordEditData('formData',lord_id)">确定</el-button>
          <el-button size="small" plain @click="edit_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--科目-->
    <lj-subject :visible="subject_visible" @close="subject_visible = false"
                @confirm="handleConfirmSubject"></lj-subject>
  </div>
</template>
<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjSubject from '../../../common/lj-subject.vue';

  export default {
    name: "index",
    components: {LjDialog, LjSubject},
    props: ['lordStatus'],
    data() {
      return {
        params: {
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: '',
          export: '',
        },
        myStatus:'',
        lordLabel: {
          "create_time": "生成时间",
          "address": "房屋地址",
          "customer_name": "客户姓名",
          "contact": "客户手机号",
          "months": "收房月数",
          "pay_types": "付款方式",
          "prices": "月单价",
          "deal_date": "待签约日期",
          "first_pay_date": "第一次打房租日期",
          "account_type": "客户汇款方式",
          "account_num": "账号",
          "operator.name": "签约人",
        },

        delete_visible: false,//删除
        edit_visible: false,//编辑
        details_visible: false,//详情
        is_disabled: true,//是否禁用

        current_row: '',
        lordLists: [],
        lordCount: 0,
        lordIds: [],
        LordStatus: [
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
          {
            address: "新月饭店4-4-4",
            contact: "18949949837",
            create_time: "2019-02-21 18:05:20",
            customer_name: "嬴政",
            delete_time: null,
            id: 16314,
            is_address: 2,
            is_contact: 1,
            is_name: 2,
            suppress_dup: 0,
            update_time: "2019-02-21 18:05:20"
          },
        ],
        lordPayTypes: '',
        lordDetailList: {
          departmentName: "",
          staffName: "",
          operatorName: "",
          leaderName: "",
          pay_types_val: "",
          prices_val: "",
        },

        form: {
          "address": "",
          "rental_subject": "",
          "deposit_subject": "",
          "departmentName": "",
          "staffName": "",
          "operatorName": "",
          "leaderName": "",
          "prices_val": "",
          "pay_types_val": "",
          "staff_id": "",
          "department_id": "",
          "leader_id": "",
          "customer_name": "",
          "contact": "",
          "house_id": "",
          "months": "",
          "prices": [],
          "pay_types": [],
          "payType": '',
          "deposit": "",
          "medi_cost": "",
          "warrenty": "",
          "deal_date": "",
          "first_pay_date": "",
          "second_pay_date": "",
          "remark": "",
          "account_type": "",
          "account_owner": "",
          "account_subbank": "",
          "account_bank": "",
          "account_num": "",
          "subject_id": {
            "rental": "",
            "deposit": ""
          },
          "v3_contract_id": "",
          "cate": "",
        },
        detailLabel: [
          {label: "客户姓名:", prop: "customer_name"},
          {label: "客户联系方式:", prop: "contact"},
          {label: "房屋地址:", prop: "address"},
          {label: "租房月数:", prop: "months"},
          {label: "付款方式:", prop: "payType"},
          {label: "月单价:", prop: "pricesName"},
          {label: "待签约日期:", prop: "deal_date"},
          {label: "空置期:", prop: "freeze"},
          {label: "第一次打房租日期:", prop: "first_pay_date"},
          {label: "第二次打房租日期:", prop: "second_pay_date"},
          {label: "负责人:", prop: "leaderName"},
          {label: "所属部门:", prop: "departmentName"},
          {label: "操作人:", prop: "operatorName"},
          {label: "签约人:", prop: "staffName"},
          {label: "房租科目:", prop: "rental_subject"},
          {label: "押金科目:", prop: "deposit_subject"},
          {label: "备注:", prop: "remark"},
          {label: "汇款方式:", prop: "account_type"},
          {label: "汇款人姓名:", prop: "account_owner"},
          {label: "开户行:", prop: "account_bank"},
          {label: "支行:", prop: "account_subbank"},
          {label: "账号:", prop: "account_num"},
        ],
        lordDetail: {},
        lordDetailData: {},

        subject_visible: false,
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
        subject_rent: {
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
        cate: {
          "1": "银行卡",
          "2": "支付宝",
          "3": "微信",
          "4": "银行卡(数据来自房管中心)"
        },
        payTypes: {
          "1": "月付",
          "2": "半月份",
          "3": "季付",
          "4": "半年付",
          "5": "年付",
        },
        banks: [
          "未知银行",
          "中国工商银行",
          "中国农业银行",
          "中国银行",
          "中国建设银行",
          "交通银行",
          "中信银行",
          "中国光大银行",
          "华夏银行",
          "中国民生银行",
          "广发银行",
          "深圳发展银行",
          "招商银行",
          "兴业银行",
          "上海浦东发展银行",
          "恒丰银行",
          "浙商银行",
          "渤海银行",
          "中国邮政储蓄银行",
          "南京银行",
          "江苏省紫金农商银行",
          "农村合作信用社",
          "安徽省农村信用社联合社",
          "平安银行",
          "江苏银行",
          "苏州银行",
          "广州银行",
          "宁波银行",
          "上海银行",
          "北京银行",
          "杭州银行",
          "衢州银行",
          "农村商业银行",
          "浙江省农村信用社联合社杭州联合银行",
          "浙江稠州银行",
          "徽商银行",
          "台州银行",
          "浙江银行",
          "重庆农村商业银行",
          "浙江泰隆商业银行",
          "上海农商银行",
          "重庆银行",
          "西安银行",
          "昆山农商银行",
          "昆仑银行",
          "陕西农村信用合作社联合社",
          "成都银行",
          "江苏省信用社联合社",
          "重庆三峡银行",
          "江苏农村信用社联合社",
          "江苏东吴农村商业银行",
          "厦门银行",
          "浙江民泰商业银行",
          "江西银行",
          "中原银行"
        ]
      }
    },
    mounted() {
      this.getLordList();
    },
    activated() {

    },
    watch: {
      lordStatus(val) {
        console.log(val);
        this.myStatus = val;
      }
    },
    created() {

    },
    computed: {},
    methods: {
      handleChangePage(page) {
        this.params.page = page;
        this.getLordList();
      },

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
      //lord列表
      getLordList() {
        // this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
          if (res.code === 200) {
            // this.showLoading(false);
            this.lordLists = res.data.data;
            this.lordCount = res.data.count;
            for (let item of this.lordLists) {
              if (item.pay_types[0] === 1) {
                this.lordPayTypes = "月付"
              }
              if (item.pay_types[0] === 2) {
                this.lordPayTypes = "双月付"
              }
              if (item.pay_types[0] === 3) {
                this.lordPayTypes = "季付"
              }
              if (item.pay_types[0] === 4) {
                this.lordPayTypes = "半年付"
              }
              if (item.pay_types[0] === 5) {
                this.lordPayTypes = "年付"
              }
            }
          } else {
            this.lordLists = [];
            this.lordCount = 0;
          }
        }).then(() => {
          for (let item of this.lordLists) {
            this.lordIds.push(item.id)
          }
          this.$http.get(globalConfig.temporary_server + 'customer_lord_repeat', {id: this.lordIds}).then(res => {
            if (res.code === 200) {
              this.LordStatus = JSON.parse(JSON.stringify(res.data.data));
            }
          })
        }).catch(err => {
          console.log(err);
        })
      },
      //详情
      handleDetailsLord(row, index) {
        this.current_row = row;
        this.details_visible = true;
        this.getRowInfo(index);
        this.getLordDetail(this.current_row.id);
      },
      getRowInfo(index) {
        this.lordDetailList.departmentName = this.lordLists[index].department.name;
        this.lordDetailList.staffName = this.lordLists[index].staff.name;
        this.lordDetailList.leaderName = this.lordLists[index].leader.name;
        this.lordDetailList.operatorName = this.lordLists[index].operator.name;
        this.lordDetailList.pay_types_val = this.lordLists[index].pay_types[0];
        this.lordDetailList.prices_val = this.lordLists[index].prices[0];
      },
      //获取详情
      getLordDetail(id) {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_collect/' + id, {}).then(res => {
          if (res.code == 200) {
            this.showLoading(false);
            this.lordDetail = JSON.parse(JSON.stringify(res.data.data));
            console.log(this.lordDetail);
            this.lordDetailData = Object.assign({}, this.lordDetail, this.lordDetailList);
            for (let item of Object.keys(this.form)) {
              this.form[item] = this.lordDetailData[item];
            }
          }
        })
      },
      //编辑
      handleEditLord(row, index) {
        this.current_row = row;
        this.edit_visible = true;
        this.getRowInfo(index);
        this.getLordDetail(this.current_row.id);
      },
      //提交编辑
      postLordEditData(data, id) {
        console.log(data);
        console.log(id);
        // let form_data = this.$refs['formData'].$el;
        // this.$refs[form].validate((valid) => {
        // if(){
        this.$http.put(globalConfig.temporary_server + 'customer_collect/' + id, this.form).then(res => {
          this.callbackSuccess(res);

        })
        // }
        // })
      },
      //处理项
      handleProcessLord(row) {
        this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id, {}).then(res => {
          this.callbackSuccess(res);
        })
      },
      //科目
      handleOpenSubject(which) {
        this.which_subject = which;
        this.subject_visible = true;
      },
      //确认科目
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'subject_deposit') {
          this.subject_deposit.parent_name = val.title;
          this.subject_deposit.parent_id = val.id;
          this.form.subject_id.deposit = val.id;
          this.form.deposit_subject = val.title;

        }
        if (this.which_subject === 'subject_rent') {
          this.subject_rent.parent_name = val.title;
          this.subject_rent.parent_id = val.id;
          this.form.subject_id.rental = val.id;
          this.form.rental_subject = val.title;
        }
      },
      //删除lord
      handleOkDel() {
        this.$http.delete(globalConfig.temporary_server + 'customer_collect/delete/' + this.current_row.id).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      handleDeleteLord(row) {
        this.current_row = row;
        this.delete_visible = true;
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
  @import "../../../../assets/scss/finance/customer/index.scss";

  #theme_name.theme1 {
    #customer {
      .statusBar {
        span {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-left: 4px;
        }
      }

      #theme_name .form_item_container {
        padding: 0 0;
      }

    }
  }
</style>
