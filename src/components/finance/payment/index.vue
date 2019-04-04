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
                <div class="icons add" @click="add_visible=true;"><b>+</b></div>
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
                        show-overflow-tooltip
                        v-for="item in Object.keys(paymentLabels)"
                        :label="paymentLabels[item]" :key="item"
                        :prop="item"
                        align="center"
                >
                </el-table-column>

                <el-table-column label="状态" prop="" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status === 1 ? '待入账' : '已入账'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="" align="center" width="550">
                    <template slot-scope="scope">
                        <el-tooltip
                                v-for="(item,index) in btnData" :key="index"
                                effect="light" :content="item.content" placement="top">
                            <el-button
                                    :size="item.size"
                                    @click="handleClickBtn(item.methods,scope.row,scope.$index,item.key)"
                                    :type="item.type">{{item.content}}
                            </el-button>
                        </el-tooltip>

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


        <!--修改金额-->
        <lj-dialog :visible="pay_visible" :size="{width: 440 + 'px',height:300 + 'px'}" @close="pay_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>修改应付金额</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="formData" ref="payForm" class="demo-ruleForm" size="mini">
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>应付金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="formData.amount_payable"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkPay(current_row,formData.amount_payable)">确定
                    </el-button>
                    <el-button type="info" size="small" @click="pay_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--修改科目-->
        <lj-dialog :visible="show_subject" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="show_subject = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>修改科目</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="formData" ref="payForm" class="demo-ruleForm" size="mini">
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>科目</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="formData.subject_val"
                                              @focus="handleOpenSubject('subject_deposit')"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkSubject(current_row,formData.subject_id)">确定
                    </el-button>
                    <el-button type="info" size="small" @click="show_subject = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--补齐时间-->
        <lj-dialog :visible="complete_visible" :size="{width: 440 + 'px',height: 300 + 'px'}"
                   @close="complete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>修改补齐时间</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="formData" ref="payForm" class="demo-ruleForm" size="mini">
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
                    <el-button type="danger" size="small"
                               @click="handleOkCompleteData(current_row,formData.complete_date)">确定
                    </el-button>
                    <el-button type="info" size="small" @click="complete_visible = false;current_row = ''">取消
                    </el-button>
                </div>
            </div>
        </lj-dialog>
        <!--应付时间-->
        <lj-dialog :visible="payData_visible" :size="{width: 440 + 'px',height: 300 + 'px'}"
                   @close="payData_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>修改应付时间</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="formData" ref="payForm" class="demo-ruleForm" size="mini">
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
                    <el-button type="danger" size="small" @click="handleOkPayDate(current_row,formData.pay_date)">确定
                    </el-button>
                    <el-button type="info" size="small" @click="payData_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--应付入账-->
        <lj-dialog :visible="transfer_visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
                   @close="transfer_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>应付入账</h3>
                </div>
                <div class="dialog_main">

                    <el-form :model="transferForm" :rules="rules" ref="transferForm" class="demo-ruleForm" size="mini">
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款方式</span>
                                </div>
                                <div class="item_content">
                                    <el-select placeholder="请选择" v-model="params.cate" @change="getAccount">
                                        <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                                   :key="index"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款账号</span>
                                </div>
                                <div class="item_content">
                                    <el-select placeholder="请选择" v-model="transferForm.account_id" :disabled="is_disabled">
                                        <el-option v-for="(item,index) in accountLists" :label="item.name" :value="item.id"
                                                   :key="index"></el-option>
                                    </el-select>
                                    <!--<el-input placeholder="请输入"-->
                                              <!--v-model="transferForm.customer_account_num"-->
                                    <!--&gt;</el-input>-->
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>客户账户</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="transferForm.customer_account_num" :disabled="true"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>账户类型</span>
                                </div>
                                <div class="item_content">
                                    <el-select placeholder="请选择" v-model="transferForm.customer_account_type" :disabled="true">
                                        <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                                   :key="index"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="transferForm.amount_paid"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>备注</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="transferForm.remark"
                                              type="textarea"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            v-model="transferForm.pay_date" type="date">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>补齐时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            v-model="transferForm.complete_date" type="date">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>

                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkTransfer(current_row,transferForm)">确定
                    </el-button>
                    <el-button type="info" size="small" @click="transfer_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--新增应付款项-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增</h3>
                </div>
                <div class="dialog_main">

                    <el-form :model="ruleForm" :rules="rules" ref="payForm" class="demo-ruleForm" size="mini">
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>客户名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请点击选择客户名称" v-model="ruleForm.customer_name"
                                              @focus="handleOpenCustomer" readonly="readonly"></el-input>
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
                                    <el-input placeholder="请点击选择客户名称"
                                              :disabled="true" :value="ruleForm.identity===1?'业主':ruleForm.identity===2 ?'租客':''"></el-input>
                                    <!--<el-select placeholder="请选择" v-model="ruleForm.identity" :disabled="true">-->
                                        <!--<el-option v-for="(item,index) in types" :label="item.title" :value="item.val" :key="item.val"></el-option>-->
                                    <!--</el-select>-->
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
                                    <el-select placeholder="请选择" v-model="ruleForm.customer_account_type">
                                        <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                                   :key="index"></el-option>
                                    </el-select>
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
                                    <el-input placeholder="请输入" v-model="ruleForm.amount_payable"
                                              type="number"></el-input>
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
                                    <el-input placeholder="请输入" v-model="subject.parent_name"
                                              @focus="handleOpenSubject('subject')"></el-input>
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
                                    <el-date-picker
                                            v-model="ruleForm.pay_date" type="date" placeholder="请输入">
                                    </el-date-picker>
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
                                    <el-input placeholder="请输入" v-model="ruleForm.description"
                                              type="textarea"></el-input>
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
                    <el-button type="danger" size="small" @click="handleOkAdd()">确定</el-button>
                    <el-button type="info" size="small" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--删除lord-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该付款信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel(current_row)">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--科目-->
        <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"></lj-subject>
        <!--客户列表-->
        <lj-dialog :visible="customer_visible" :size="{width: 900 + 'px',height: 720 + 'px'}"
                   @close="customer_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>请选择客户</h3>
                </div>
                <div class="dialog_main">
                    <customer-lists  @getCustomer="getCurrentCustomer"></customer-lists>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleChooseCustomer"  >确定</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--回滚-->
        <lj-dialog :visible="recall_visible" :size="{width: 600 + 'px',height: 500 + 'px'}"
                   @close="recall_visible = false;current_row = ''">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>回滚</h3>
                </div>
                <div class="dialog_main">
                    <el-table
                            :data="running_account_record"
                            :row-class-name="tableChooseRow"
                            @cell-click="tableClickRow"
                            header-row-class-name="tableHeader"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>

                        <el-table-column  align="center" label="ID" prop="id">
                        </el-table-column>
                        <el-table-column  align="center" label="明细" prop="desc">
                        </el-table-column>


                    </el-table>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkRecall">确定</el-button>
                    <el-button type="info" size="small" @click="recall_visible = false;current_row = '';">取消</el-button>
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
    import CustomerLists from './components/customerLists';

    export default {
        name: "index",
        components: {SearchHigh, LjDialog, FinMenuList, LjSubject,CustomerLists},
        data() {
            return {
                params: {
                    is_del: '',//是否显示删除数据
                    staff_id: '',
                    department_id: '',
                    status: '',//入账状态
                    date_min: '',//时间周期最小
                    date_max: '',
                    subject_id: '',
                    balance_min: '',//剩余款项范围-最小
                    balance_max: '',
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                    cate:'',
                },
                current_row: '',
                delete_visible: false,//删除
                add_visible: false,//新增
                pay_visible: false,//应付金额
                recall_visible:false,//回滚
                payData_visible: false,//应付时间
                complete_visible: false,//补齐时间
                transfer_visible: false,//应付入账
                subject_visible: false,//科目
                show_subject: false,//科目
                customer_visible: false,//客户列表
                is_disabled:true,
                multipleSelection: [],//多选
                running_account_record:[],//回滚数据
                ra_ids:[],

                which_subject: '',
                new_subject_visible: false,
                subject: {
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

                tableLists: [],
                paymentLabels: {
                    "pay_date": "付款时间",
                    "customer.customer_name": "客户姓名",
                    "customer.address": "地址",
                    "subject.title": "支出科目",
                    "amount_payable": "应付金额",
                    "amount_paid": "实付金额",
                    "balance": "剩余款项",
                    "complete_date": "补齐时间",
                    "customer.contact": "手机号",
                    "description.description": "明细详情",
                    "remark": "备注",
                    "leader.name": "负责人",
                    "staff.name": "开单人",
                    "org.name": "部门"
                },
                count: 0,
                ruleForm: {
                    customer_id: '',//客户id
                    customer_name:'',
                    customer_account_type: '',//账号类型
                    customer_account_num: '',//账户号码
                    amount_payable: '',//金额
                    description: '',//描述
                    remark: '',
                    identity: '',//款项标志
                    pay_date: '',//付款时间
                    subject_id: '',

                },

                formData: {
                    amount_payable: '',
                    tag: '',
                    pay_date: '',
                    subject_val: '',
                    complete_date: '',
                    subject_id: '',
                },

                transferForm: {
                    customer_account_num: '',
                    customer_account_type: '',
                    account_id: '',
                    amount_paid: '',
                    remark: '',
                    pay_date: '',
                    complete_date: '',
                },
                cate: [
                    {title: "银行卡", value: 1,},
                    {title: "支付宝", value: 2,},
                    {title: "微信", value: 3,},
                    {title: "银行卡(数据来自房管中心)", value: 4,},
                ],

                rules: {
                    amount_payable: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                },
                types:[
                    {title:"业主",value:1},
                    {title:"租客",value:2}
                ],
                btnData: [
                    {
                        label: "",
                        type: "primary",
                        icon: "el-icon-edit",
                        size: "small",
                        methods: "handleEditPay",
                        content: "金额",
                        key: "pay_visible"
                    },
                    {
                        label: "",
                        type: "success",
                        icon: "el-icon-tickets",
                        size: "small",
                        methods: "handleSub",
                        content: "科目",
                        key: "show_subject"
                    },
                    {
                        label: "",
                        type: "info",
                        icon: "el-icon-date",
                        size: "small",
                        methods: "handleComplete",
                        content: "补齐时间",
                        key: "complete_visible"
                    },
                    {
                        label: "",
                        type: "warning",
                        icon: "el-icon-time",
                        size: "small",
                        methods: "handlePayTime",
                        content: "应付时间",
                        key: "payData_visible"
                    },
                    {
                        label: "",
                        type: "primary",
                        icon: "el-icon-date",
                        size: "small",
                        methods: "handleComplete",
                        content: "应付入账",
                        key: "transfer_visible"
                    },
                    {
                        label: "",
                        type: "warning",
                        icon: "el-icon-edit",
                        size: "small",
                        methods: "handleProcess",
                        content: "回滚",
                        key: "recall_visible"
                    },
                    {
                        label: "",
                        type: "danger",
                        icon: "el-icon-delete",
                        size: "small",
                        methods: "handleDelete",
                        content: "删除",
                        key: "delete_visible"
                    },
                ],
                accountLists:[],
                chooseRowIds:[],
            }
        },
        mounted() {
            this.getPaymentList();
        },
        activated() {
        },
        watch: {},
        created() {
        },
        computed: {},
        methods: {
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
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getPaymentList();
            },
            //请求回调
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.getPaymentList();
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                }
            },
            //修改金额
            handleOkPay(row, val) {
                console.log(val);
                this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/" + row.id, {amount_payable: val}).then(res => {
                    this.callbackSuccess(res);
                    this.pay_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            //显示科目组件
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
                if (this.which_subject === 'subject') {
                    this.subject.parent_name = val.title;
                    this.subject.parent_id = val.id;

                    this.formData.subject_id = val.id;
                    this.formData.subject_val = val.title;

                    this.ruleForm.subject_id = val.id;
                }
            },
            //修改科目
            handleOkSubject(row, val) {
                console.log(row, val);
                this.$http.put(globalConfig.temporary_server + "account_payable/subject/" + row.id, {subject_id: val}).then(res => {
                    this.callbackSuccess(res);
                    this.show_subject = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            //修改补齐时间
            handleOkCompleteData(row, val) {
                this.$http.put(globalConfig.temporary_server + "account_payable/complete_date/" + row.id, {complete_date: val}).then(res => {
                    this.callbackSuccess(res);
                    this.complete_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            //修改付款时间
            handleOkPayDate(row, val) {
                this.$http.put(globalConfig.temporary_server + "account_payable/pay_date/" + row.id, {pay_date: val}).then(res => {
                    this.callbackSuccess(res);
                    this.payData_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取账户list
            getAccount(){
                this.$http.get(globalConfig.temporary_server + "account",this.params).then(res => {
                    if(res.code===200){
                       this.accountLists = res.data.data;
                       this.is_disabled = false;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //应付入账
            handleOkTransfer(row,val) {
                console.log(val);
                this.$http.put(globalConfig.temporary_server + "account_payable/transfer/" + row.id, val).then(res => {
                    this.callbackSuccess(res);
                    this.transfer_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            // 多选
            handleSelectionChange(val){
                this.ra_ids=[];
                this.multipleSelection = val;
                console.log(val);
                for(let item in val){
                    this.ra_ids.push(val[item].id);
                }
                console.log(this.ra_ids);
            },

            //确认回滚
            handleOkRecall(){
                this.$http.put(globalConfig.temporary_server + 'account_payable/revert/'+this.current_row.id,{running_account_ids:this.ra_ids}).then(res => {

                    if(res.code===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.recall_visible = false;

                    }else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //显示客户列表
            handleOpenCustomer() {
                this.customer_visible = true;
            },
            //确认选择
            handleChooseCustomer(){
                if(this.ruleForm.customer_id != ''){
                    this.$LjNotify('success', {
                        title: '成功',
                        message: "操作成功",
                        subMessage: '',
                    });
                    this.customer_visible = false;
                }else{
                    this.$LjNotify('success', {
                        title: '提示',
                        message: "请选择客户",
                        subMessage: '',
                    });
                }

            },

            //返回数据
            getCurrentCustomer(data){
                this.ruleForm = JSON.parse(data);
            },

            //新增
            handleOkAdd() {
                console.log(this.ruleForm);
                this.$http.post(globalConfig.temporary_server + 'account_payable', this.ruleForm).then(res => {
                    this.callbackSuccess(res);
                    this.add_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },

            //删除
            handleOkDel(row) {
                console.log(row.id);
                this.$http.delete(globalConfig.temporary_server + 'account_payable/delete/' + row.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },

            // 操作按钮回调
            handleClickBtn(func, row, index, key) {
                this.current_row = row;
                console.log(row);
                if (key === "complete_visible") {
                    this.complete_visible = true;
                    this.formData.complete_date = this.current_row.complete_date;
                }
                if (key === "subject_visible") {
                    this.subject_visible = true;
                }
                //回滚
                if (key === "recall_visible") {
                    this.recall_visible = true;
                    this.running_account_record=[];
                    // this.current_row = row;
                    this.recall_visible = true;
                    console.log(row.running_account_record);
                    for( let item in row.running_account_record){
                        this.running_account_record.push({id:item,desc:this.current_row.running_account_record[item]});
                    }
                    console.log(this.running_account_record);


                }
                if (key === "pay_visible") {
                    this.pay_visible = true;
                    this.formData.amount_payable = this.current_row.amount_payable;
                }
                if (key === "payData_visible") {
                    this.payData_visible = true;
                    this.formData.pay_date = this.current_row.pay_date;
                }
                if (key === "delete_visible") {
                    this.delete_visible = true;
                }
                if (key === "show_subject") {
                    this.show_subject = true;
                    this.formData.subject_val = this.current_row.subject.title;
                    this.formData.subject_id = this.current_row.subject_id;
                }
                if (key === "transfer_visible") {
                    this.transfer_visible = true;
                    for (let item of Object.keys(this.transferForm)) {
                        this.transferForm[item] = this.current_row[item];
                    }
                    console.log(this.current_row);
                    console.log(this.transferForm)
                }
            },

            //加载列表
            getPaymentList() {
              this.showLoading(true);
              this.$http.get(globalConfig.temporary_server + 'account_payable', this.params).then(res => {
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
