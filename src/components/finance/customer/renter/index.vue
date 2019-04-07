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
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    class="changeChoose"
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column label="前缀" align="center" width="90">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="renterStatus[scope.$index]['suppress_dup']===1">
                        <i class="el-icon-view"></i>忽略重复
                    </div>
                    <div class="statusBar flex-center" v-if="renterStatus[scope.$index]['suppress_dup']===0">
                        <span style="background-color: #14e731;" v-if="renterStatus[scope.$index]['is_contact']===0"></span>
                        <span style="background-color: #e6a23c;" v-if="renterStatus[scope.$index]['is_name']===1"></span>
                        <span style="background-color: #f56c6c;" v-if="renterStatus[scope.$index]['is_address']===2"></span>
                        <span v-if="freeze[scope.$index]===1" style="background-color: #409eff;"></span>
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
            <el-table-column label="付款方式/月单价" prop="prices" align="center" width="180"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="状态" prop="" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="" align="center" width="500">
                <template slot-scope="scope">
                    <el-button type="success" size="small" @click="handleDetailsRenter(scope.row,scope.$index)">查看</el-button>
                    <el-button type="primary" size="small" @click="handleEditRenter(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="warning" size="small" @click="handleReturnRemark(scope.row,scope.$index)">恢复重复标记</el-button>
                    <el-button type="info" size="small" @click="scope.row.freeze===0 ? handleProcessRenter(scope.row,scope.$index):handleCancelProcessRenter(scope.row,scope.$index)">{{scope.row.freeze === 0 ? '生成待处理项':'取消待处理项'}}</el-button>
                    <el-button type="danger" size="small" @click="handleDeleteRenter(scope.row,scope.$index)">删除</el-button>
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
                :size="{width: 1200 + 'px',height: 820 + 'px' }"
                @close="edit_visible = false">
            <renter-form :form="renter_form" :current_row="current_row" @updateList="updateRenterList" :address="set_price_form.bottom_name" :addressIds="set_price_form.bottom_id"></renter-form>
        </lj-dialog>

        <!--搜索房源-->
        <HouseFilter :visible="house_filter_visible" @close="handleGetHouseResource"></HouseFilter>

    </div>
</template>
<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import RenterForm from "./renterForm";
    import HouseFilter from '../../../marketCentre/components/house-filter.vue';

    export default {
        name: "index",
        components: {RenterForm, LjDialog,HouseFilter},
        props:['searchParams'],
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
                house_filter_visible:false,
                set_price_form: {
                    bottom_price: '',
                    bottom_id: [],
                    suggest_price: '',
                    suggest_id: [],
                    bottom_name: '',
                    suggest_name: '',
                    bottom_type: '',
                    suggest_type: ''
                },
                freeze:[],//待处理
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
                    {label:'付款方式/月单价:',prop:'prices'},
                    {label: "租房状态:", prop: "rent_status"},
                    {label: "租房类型:", prop: "rent_types"},
                    {label: "第一次打房租日期:", prop: "first_pay_date"},
                    {label: "第二次打房租日期:", prop: "second_pay_date"},
                    {label: "负责人:", prop: "leaderName"},
                    {label: "所属部门:", prop: "departmentName"},
                    {label: "操作人:", prop: "operatorName"},
                    {label: "签约人:", prop: "staffName"},
                    {label: "备注:", prop: "remark"},
                    // {label: "汇款方式:", prop: "account_type"},
                    {label: "汇款人姓名:", prop: "account_owner"},
                    {label: "开户行:", prop: "account_bank"},
                    {label: "支行:", prop: "account_subbank"},
                    {label: "账号:", prop: "account_num"},
                ],
                renterDetail: {},
                renterDetailData: {},
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
                ra_ids:[],
                multipleSelection: [],//多选


            }
        },
        mounted() {
            this.getRenterList();
        },
        activated() {

        },
        watch: {

        },
        created(){
            this.$bus.on('cancelRemarkFun',this.handleRemarkRenter);
            this.$bus.on('getParams',this.handleParamsRenter);
            this.$bus.on('chooseHouse', this.handleChooseHouse);//搜索房屋
        },
        beforeDestroy(){
            this.$bus.off('cancelRemarkFun',this.handleRemarkRenter);
            this.$bus.off('getParams',this.handleParamsRenter);
            this.$bus.off('chooseHouse', this.handleChooseHouse);//搜索房屋
        },
        computed: {},
        methods: {
            handleChooseHouse(val){
                this.house_filter_visible = val
            },
            //确定选择房源
            handleGetHouseResource(house,type) {
                console.log(house);
                console.log(type);
                if (house) {
                    this.set_price_form.bottom_name = '';
                    this.set_price_form.bottom_id = [];
                    house.map(item => {
                        this.set_price_form.bottom_name += item.house_name + ',';
                        if (type === 'house') {
                            this.set_price_form.bottom_type = 1;
                            this.set_price_form.bottom_id.push(item.house_id);
                        } else {
                            this.set_price_form.bottom_type = 2;
                            this.set_price_form.bottom_id.push(item.village_id);
                        }
                    });
                    this.set_price_form.bottom_name = this.set_price_form.bottom_name.substring(0,this.set_price_form.bottom_name.length - 1);

                }
                this.house_filter_visible = false;

                console.log(this.addressInfo)

            },
            // 搜索参数
            handleParamsRenter(val){
                // alert(val.undefined);
                if(val.undefined){
                    this.params.search = val.undefined;
                } else {
                    this.params.search = ''
                }
                if(val.date1){
                    this.params.startRange = val.date1[0];
                    this.params.endRange = val.date1[1];
                }
                this.getRenterList();


            },
            updateRenterList(val){
                this.edit_visible = val;
                this.getRenterList();
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
                        // this.renterLists = res.data.data;
                        this.renterLists = res.data.data.sort(
                            function (a,b) {
                                return a.id-b.id
                            }
                        );
                        console.log(this.renterLists);
                        this.renterCount = res.data.count;
                        this.freeze= [];
                        for (let item of this.renterLists) {

                            this.freeze.push(item.freeze);

                        }
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
                            // this.renterStatus = res.data.data;
                            this.renterStatus = res.data.data.sort(
                                function (a,b) {
                                    return a.id-b.id
                                }
                            );
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
                // this.renterDetailList.pay_types_val = this.renterLists[index].pay[0];
                // this.renterDetailList.prices_val = this.renterLists[index].prices[0];
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

            //生成待处理项
            handleProcessRenter(row, index) {
                this.$http.post(globalConfig.temporary_server + 'customer_renter/pending/' + row.id, {}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //取消待处理项
            handleCancelProcessRenter(row, index) {
                this.$http.put(globalConfig.temporary_server + 'account_pending/recover' , {customer_id:row.id,identity:2}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //忽略重复标记
            handleRemarkRenter(val){
                this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {ids:this.ra_ids,operate:1}).then(res => {
                    this.callbackSuccess(res);
                    if(res.code===200){

                    }
                })
            },
            //恢复重复标记
            handleReturnRemark(row,index){
                this.ra_ids=[];
                this.ra_ids.push(row.id);
                this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {ids:this.ra_ids,operate:2}).then(res => {
                    this.callbackSuccess(res);

                })
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
