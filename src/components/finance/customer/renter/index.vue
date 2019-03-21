<template>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <!--列表-->
        <el-table
                :data="renterLists"
                :height="this.mainListHeight(30) + 'px'"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-class-name="tableChooseRow"
                @cell-click="tableClickRow"
                style="width: 100%">
            <el-table-column label="前缀" align="center">
                <template slot-scope="scope">
                    <div class="statusBar flex-center">
                        <span v-if="renterStatus[scope.$index].is_contact===1" style="background-color: #14e731;"></span>
                        <span v-if="renterStatus[scope.$index].is_name===1" style="background-color: #e6a23c;"></span>
                        <span v-if="renterStatus[scope.$index].is_address===2" style="background-color: #f56c6c;"></span>
                        <span v-if="renterStatus[scope.$index].suppress_dup===0" style="background-color: #409eff;"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    v-for="item in Object.keys(renterLabel)"
                    :label="renterLabel[item]" :key="item"
                    :prop="item"
                    align="center">
            </el-table-column>
            <el-table-column label="付款方式" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ parseInt(scope.row.pay[0]) === 1 ? '月份' : parseInt(scope.row.pay[0]) === 2?'双月付':parseInt(scope.row.pay[0]) === 3?'季付':parseInt(scope.row.pay[0]) === 4?'半年付':parseInt(scope.row.pay[0]) === 5?'年付':'/'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="月单价" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.prices[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="" align="center" width="400">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in btnData"
                               :key="index"
                               :type="item.type"
                               :size="item.size"
                               @click="clickCall(item.methods,scope.row,scope.$index)">
                        {{item.label}}
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
                        :total="renterCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>
        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该租客信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkRenter">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
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
                                    <span>{{renterDetailData[item.prop]}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <h3 class="justify-start" style="margin-bottom: 20px">客户账户信息</h3>
                            <div class="justify-bet" style="flex-wrap: wrap">
                                <div class="" style="width:90%;padding: 10px 0;text-align: left"
                                     v-for="(item,index) in detailLabel.slice(17)" :key="index">
                                    <span class="tablelabel">{{item.label}}</span>
                                    <span>{{renterDetailData[item.prop]}}</span>
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
                :size="{width: 900 + 'px',height: 820 + 'px' }"
                @close="edit_visible = false">
            <renter-form :formData="renter_form" :current_row="current_row" @updateList="updateRenterList"></renter-form>
        </lj-dialog>

    </div>
</template>
<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import LjSubject from '../../../common/lj-subject.vue';
    import RenterForm from "./renterForm";

    export default {
        name: "index",
        components: {RenterForm, LjDialog, LjSubject},
        data() {
            return {
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                chooseRowIds: [],
                renterLabel: {//列表字段
                    "create_time": "生成时间",
                    "address": "房屋地址",
                    "customer_name": "客户姓名",
                    "contact": "客户手机号",
                    "months": "租房月数",
                    "deal_date": "待签约日期",
                    "rent_status": "租房状态",
                    "rent_types": "租房类型",
                    "staff.name": "签约人",
                },
                btnData: [//按钮
                    {label: "查看", type: "success", icon: "el-icon-view", size: "small", methods: "handleDetailsRenter"},
                    {label: "编辑", type: "primary", icon: "el-icon-edit", size: "small", methods: "handleEditRenter"},
                    {label: "生成待处理项", type: "warning", icon: "el-icon-info", size: "small", methods: "handleProcessRenter"},
                    {label: "删除", type: "danger", icon: "el-icon-delete", size: "small", methods: "handleDeleteRenter"},
                ],

                delete_visible: false,//删除
                edit_visible: false,//编辑
                details_visible: false,//详情
                is_disabled: true,//是否禁用

                current_row: '',
                renterLists: [],
                renterCount: 0,
                renterIds: [],
                renterStatus:[
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0},
                    {is_address: 2, is_contact: 1, is_name: 1, suppress_dup: 0}
                ],

                renterDetailList: {
                    departmentName: "",
                    staffName: "",
                    operatorName: "",
                    leaderName: "",
                    pay_types_val: "",
                    prices_val: "",
                },

                renter_form: {
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
                    // {label: "付款方式:", prop: "payType"},
                    {label: "月单价:", prop: "prices_val"},
                    {label: "租房状态:", prop: "rent_status"},
                    {label: "租房类型:", prop: "rent_types"},
                    {label: "第一次打房租日期:", prop: "first_pay_date"},
                    {label: "第二次打房租日期:", prop: "second_pay_date"},
                    {label: "负责人:", prop: "leaderName"},
                    {label: "所属部门:", prop: "departmentName"},
                    {label: "操作人:", prop: "operatorName"},
                    {label: "签约人:", prop: "staffName"},
                    {label: "房租科目:", prop: "rental_subject"},
                    {label: "押金科目:", prop: "deposit_subject"},
                    {label: "备注:", prop: "remark"},
                    // {label: "汇款方式:", prop: "account_type"},
                    {label: "汇款人姓名:", prop: "account_owner"},
                    {label: "开户行:", prop: "account_bank"},
                    {label: "支行:", prop: "account_subbank"},
                    {label: "账号:", prop: "account_num"},
                ],
                renterDetail: {},
                renterDetailData: {},

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
                ],

            }
        },
        mounted() {
            this.getRenterList();
        },
        activated() {

        },
        watch: {

        },
        created() {

        },
        computed: {},
        methods: {
            updateRenterList(val){
                this.edit_visible = val;
                this.getRenterList();
            },
            handleChangePage(page) {
                this.params.page = page;
                this.getRenterList();
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
            //操作项
            clickCall(func, row, index) {
                this[func](row, index);
            },
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.getRenterList();
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                }
            },
            //列表
            getRenterList() {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_renter', this.params).then(res => {
                    if (res.code === 200) {
                        this.showLoading(false);
                        this.renterLists = res.data.data;
                        this.renterCount = res.data.count;
                    } else {
                        this.renterLists = [];
                        this.renterCount = 0;
                    }
                }).then(() => {
                    for (let item of this.renterLists) {
                        this.renterIds.push(item.id)
                    }
                    this.$http.get(globalConfig.temporary_server + 'customer_renter_repeat', {id: this.renterIds}).then(res => {
                        if (res.code === 200) {
                            this.renterStatus = res.data.data;
                            console.log(this.renterStatus);
                        }
                    })
                }).catch(err => {
                    console.log(err);
                })
            },
            //详情
            handleDetailsRenter(row, index) {
                this.current_row = row;
                this.details_visible = true;
                this.getRowInfo(index);
                this.getRenterDetail(this.current_row.id);
            },
            getRowInfo(index) {
                this.renterDetailList.departmentName = this.renterLists[index].department.name;
                this.renterDetailList.staffName = this.renterLists[index].staff.name;
                this.renterDetailList.leaderName = this.renterLists[index].leader.name;
                this.renterDetailList.operatorName = this.renterLists[index].staff.name;
                this.renterDetailList.pay_types_val = this.renterLists[index].pay[0];
                this.renterDetailList.prices_val = this.renterLists[index].prices[0];
                console.log(this.renterDetailList);
                console.log(this.renterLists[index]);
            },
            //获取详情
            getRenterDetail(id) {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_renter/' + id, {}).then(res => {
                    if (res.code == 200) {
                        this.showLoading(false);
                        this.renterDetail = res.data.data;
                        console.log(this.renterDetail);

                        this.renterDetailData = Object.assign({}, this.renterDetail, this.renterDetailList);
                        console.log(this.renterDetailData);

                        for (let item of Object.keys(this.renter_form)) {
                            if(this.renterDetailData[item]!=''&& this.renterDetailData[item] != undefined){
                                this.renter_form[item] = this.renterDetailData[item];
                            }else {
                                this.renter_form[item] = '';
                            }
                        }
                        console.log(this.renter_form)
                    }
                })
            },
            //编辑
            handleEditRenter(row, index) {
                this.current_row = row;
                this.edit_visible = true;
                this.getRowInfo(index);
                this.getRenterDetail(this.current_row.id);
            },

            //处理项
            handleProcessRenter(row, index) {
                this.$http.post(globalConfig.temporary_server + 'customer_renter/pending/' + row.id, {}).then(res => {
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
                    this.renter_form.subject_id.deposit = val.id;
                    this.renter_form.deposit_subject = val.title;

                }
                if (this.which_subject === 'subject_rent') {
                    this.subject_rent.parent_name = val.title;
                    this.subject_rent.parent_id = val.id;
                    this.renter_form.subject_id.rental = val.id;
                    this.renter_form.rental_subject = val.title;
                }
            },
            //删除renter
            handleOkRenter() {
                this.$http.delete(globalConfig.temporary_server + 'customer_renter/delete/' + this.current_row.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            handleDeleteRenter(row, index) {
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
