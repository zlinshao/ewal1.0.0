<template>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <!--列表-->
        <el-table
                :data="lordLists"
                :height="this.mainListHeight(30) + 'px'"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-class-name="tableChooseRow"
                @cell-click="tableClickRow"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    class="changeChoose"
                    type="selection"
                    width="50">
            </el-table-column>

            <el-table-column label="前缀" align="center" width="80">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===1">
                        <!--<span><i class="el-icon-edit"></i>忽略重复</span>--><i class="el-icon-view"></i>忽略重复
                    </div>
                    <div  class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===0">
                        <!--<span v-if="LordStatus[scope.$index]['is_contact']===1" style="background-color: #14e731;"></span>-->
                        <!--<span v-if="LordStatus[scope.$index]['is_name']===1" style="background-color: #e6a23c;"></span>-->
                        <!--<span v-if="LordStatus[scope.$index]['is_address']===2" style="background-color: #f56c6c;"></span>-->
                        <span  style="background-color: #14e731;"></span>
                        <span  style="background-color: #e6a23c;"></span>
                        <span  style="background-color: #f56c6c;"></span>

                        <span v-if="freeze[scope.$index]===1" style="background-color: #409eff;"></span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    show-overflow-tooltip
                    v-for="(item,index) in Object.keys(tableHeaderData)"
                    :label="tableHeaderData[item]" :key="item"
                    :prop="item"
                    align="center">
            </el-table-column>
            <el-table-column label="付款方式" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ parseInt(scope.row.pay_types[0]) === 1 ? '月份' : parseInt(scope.row.pay_types[0]) === 2?'双月付':parseInt(scope.row.pay_types[0]) === 3?'季付':parseInt(scope.row.pay_types[0]) === 4?'半年付':parseInt(scope.row.pay_types[0]) === 5?'年付':'/'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="月单价" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.prices[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="" align="center" width="450">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in btnData"
                               :key="index"
                               :type="item.type"
                               :size="item.size"
                               @click="clkCall(item.methods,scope.row,scope.$index)">
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
                        :total="lordCount"
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
                    <div class="unUse-txt">确定删除该房东信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--详情-->
        <lj-dialog :visible="details_visible" :size="{width: 960 + 'px',height: 560 + 'px'}"
                   @close="details_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>详情</h3>
                </div>
                <div class="dialog_main">
                    <el-row :gutter="20" style="width: 100%">
                        <el-col :span="15" :offset="1">
                            <div class="justify-bet" style="flex-wrap: wrap">
                                <div class="" style="width:45%;padding: 10px 0;text-align: left"
                                     v-for="(item,index) in tableDetailData.slice(0,17)" :key="index">
                                    <span class="tablelabel">{{item.label}}</span>
                                    <span>{{lordDetailData[item.prop]}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <div class="justify-bet" style="flex-wrap: wrap">
                                <div class="" style="width:90%;padding: 10px 0;text-align: left"
                                     v-for="(item,index) in tableDetailData.slice(17)" :key="index">
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
                :size="{width: 900 + 'px',height: 820 + 'px' }"
                @close="edit_visible = false">
            <lord-form :formData="form" :current_row="current_row" @updateList="updateLordList"></lord-form>
        </lj-dialog>


    </div>
</template>
<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import LjSubject from '../../../common/lj-subject.vue';
    import LordForm from "./lordForm";

    export default {
        name: "index",
        components: {LordForm, LjDialog, LjSubject},
        props:['searchParams'],
        data() {
            return {
                params: {//查询参数
                    search: this.searchParams.undefined,//关键字
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                chooseRowIds: [],//列表ids
                tableHeaderData: { //表头字段
                    "create_time":"生成时间",
                    "address":"房屋地址",
                    "customer_name":"客户姓名",
                    "contact":"客户手机号",
                    "months":"收房月数",
                    "deal_date":"待签约日期",
                    "first_pay_date":"第一次打房租日期",
                    "account_type":"客户汇款方式",
                    "account_num":"账号",
                    "operator.name":"签约人",
                },
                btnData: [//操作按钮
                    {label: "查看", type: "success", icon: "el-icon-view", size: "small", methods: "handleDetailsLord"},
                    {label: "编辑", type: "primary", icon: "el-icon-edit", size: "small", methods: "handleEditLord"},
                    {label: "恢复重复标记", type: "warning", icon: "el-icon-info", size: "small", methods: "handleReturnRemark"},
                    {label: "生成待处理项", type: "warning", icon: "el-icon-info", size: "small", methods: "handleProcessLord"},
                    {label: "删除", type: "danger", icon: "el-icon-delete", size: "small", methods: "handleDeleteLord"},
                ],
                tableDetailData: [//详情字段
                    {label: "客户姓名 :", prop: "customer_name"},
                    {label: "客户联系方式 :", prop: "contact"},
                    {label: "房屋地址 :", prop: "address"},
                    {label: "租房月数 :", prop: "months"},
                    {label: "付款方式 :", prop: "payType"},
                    {label: "月单价 :", prop: "prices_val"},
                    {label: "待签约日期 :", prop: "deal_date"},
                    {label: "空置期 :", prop: "freeze"},
                    {label: "第一次打房租日期 :", prop: "first_pay_date"},
                    {label: "第二次打房租日期 :", prop: "second_pay_date"},
                    {label: "负责人 :", prop: "leaderName"},
                    {label: "所属部门 :", prop: "departmentName"},
                    {label: "操作人 :", prop: "operatorName"},
                    {label: "签约人 :", prop: "staffName"},
                    {label: "房租科目 :", prop: "rental_subject"},
                    {label: "押金科目 :", prop: "deposit_subject"},
                    {label: "备注 :", prop: "remark"},
                    {label: "汇款方式 :", prop: "account_type"},
                    {label: "汇款人姓名 :", prop: "account_owner"},
                    {label: "开户行 :", prop: "account_bank"},
                    {label: "支行 :", prop: "account_subbank"},
                    {label: "账号 :", prop: "account_num"},
                ],
                LordStatus:[
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

                ],//前缀状态
                delete_visible: false,//删除
                edit_visible: false,//编辑
                details_visible: false,//详情
                is_disabled: true,//是否禁用
                current_row: '',//当前row
                lordLists: [],//列表数据
                lordCount: 0,
                lordIds: [],

                lordDetailList: {
                    departmentName: "",
                    staffName: "",
                    operatorName: "",
                    leaderName: "",
                    pay_types_val: "",
                    prices_val: "",
                },

                form: {//编辑字段
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

                ra_ids:[],
                multipleSelection: [],//多选

                freeze:[],//待处理



            }
        },
        mounted() {
            this.getLordList();
        },
        created(){
            this.$bus.on('cancelRemarkFun',this.handleRemark)
        },
        beforeDestroy(){
            this.$bus.off('cancelRemarkFun',this.handleRemark);
        },
        activated() {

        },
        watch: {
            params:{
                handler(val) {
                    if(val){
                        this.getLordList();
                    }
                },
                deep:true
            }
        },

        computed: {},
        methods: {

            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getLordList();
            },
            updateLordList(val){
                this.edit_visible = val;
                this.getLordList();
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
            //操作项动态调用
            clkCall(func, row, index) {
                this[func](row, index);
                // console.log(row);
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
            //加载列表
            getLordList() {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
                    if (res.code === 200) {
                        this.showLoading(false);
                        this.lordLists = res.data.data;
                        this.lordCount = res.data.count;
                    } else {
                        this.lordLists = [];
                        this.lordCount = 0;
                    }
                }).then(() => {
                    for (let item of this.lordLists) {
                        this.freeze= [];
                        this.lordIds.push(item.id);
                        this.freeze.push(item.freeze);
                    }
                    //前缀状态
                    this.$http.get(globalConfig.temporary_server + 'customer_lord_repeat', {id: this.lordIds}).then(res => {
                        if (res.code === 200) {
                            this.LordStatus =[];
                            let statusData = res.data.data;
                            for (let item in statusData){
                                this.LordStatus.push({
                                        is_contact:statusData[item].is_contact,
                                        is_name:statusData[item].is_name,
                                        is_address:statusData[item].is_address,
                                        suppress_dup:statusData[item].suppress_dup,//0不或略，1忽略
                                    }
                                )
                            }
                            console.log(this.LordStatus);
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
            //行信息
            getRowInfo(index) {
                this.lordDetailList.departmentName = this.lordLists[index].department.name;
                this.lordDetailList.staffName = this.lordLists[index].staff.name;
                this.lordDetailList.leaderName = this.lordLists[index].leader.name;
                this.lordDetailList.operatorName = this.lordLists[index].operator.name;
                this.lordDetailList.pay_types_val = String(this.lordLists[index].pay_types[0]);
                this.lordDetailList.prices_val = parseFloat(this.lordLists[index].prices[0]);
            },
            //获取详情
            getLordDetail(id) {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_collect/' + id,).then(res => {
                    if (res.code == 200) {
                        this.showLoading(false);
                        this.lordDetail = res.data.data;
                        this.lordDetailData = Object.assign({}, this.lordDetail, this.lordDetailList);
                        for (let item of Object.keys(this.form)) {
                            this.form[item] = this.lordDetailData[item];
                        }
                    }
                })
            },
            //打开编辑
            handleEditLord(row, index) {
                this.current_row = row;
                this.edit_visible = true;
                this.getRowInfo(index);
                this.getLordDetail(this.current_row.id);
            },


            //生成处理项
            handleProcessLord(row, index) {
                this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id, {}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //忽略重复标记
            handleRemark(val){
                this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {ids:this.ra_ids,operate:1}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //恢复重复标记
            handleReturnRemark(row,index){
                this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {ids:this.ra_ids,operate:2}).then(res => {
                    this.callbackSuccess(res);
                })
            },

            //删除房东
            handleOkDel() {
                this.$http.delete(globalConfig.temporary_server + 'customer_collect/delete/' + this.current_row.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
            },
            handleDeleteLord(row, index) {
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
                    // console.log(val);
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
