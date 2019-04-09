<template>
    <div class="mainListTable">
        <!--列表-->
        <el-table
                :data="renterLists"
                :height="this.mainListHeight() + 'px'"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-class-name="tableChooseRow"
                @cell-click="tableClickRow"
                @selection-change="handleSelectionChange"
                style="width: 100%">

            <el-table-column label="前缀" align="center" width="90">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="renterStatus[scope.$index]['suppress_dup']===1">
                        /
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
                    <el-button type="success" size="small" @click="handleEditRenter(scope.row,scope.$index,'check')">查看</el-button>
                    <el-button type="primary" size="small" @click="handleEditRenter(scope.row,scope.$index,'edit')">编辑</el-button>
                    <el-button type="warning" size="small" @click="handleRemarkRenter(scope.row,scope.$index)">取消重复标记</el-button>
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
        <!--编辑-->
        <lj-dialog
                :visible="edit_visible"
                :size="{width: 1200 + 'px',height: 820 + 'px' }"
                @close="edit_visible = false">
            <renter-form :form="renterDetailList" :type="chooseType" :current_row="current_row" @updateList="updateRenterList" :address="set_price_form.bottom_name" :addressIds="set_price_form.bottom_id"></renter-form>
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
                renterDetailList: {},

                ra_ids:[],
                multipleSelection: [],//多选
                chooseType:'',


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
            // this.$bus.on('cancelRemarkFun',this.handleRemarkRenter);
            this.$bus.on('getParams',this.handleParamsRenter);
            this.$bus.on('chooseHouse', this.handleChooseHouse);//搜索房屋
            this.$bus.on('cancelEdit_visible', this.getEditStatus);//取消
        },
        beforeDestroy(){
            // this.$bus.off('cancelRemarkFun',this.handleRemarkRenter);
            this.$bus.off('getParams',this.handleParamsRenter);
            this.$bus.off('chooseHouse', this.handleChooseHouse);//搜索房屋
            this.$bus.off('cancelEdit_visible', this.getEditStatus);//取消
        },
        computed: {},
        methods: {
            getEditStatus(val){
                this.edit_visible = val;
            },
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

                // console.log(this.addressInfo)

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
                // return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
                return row.freeze===1 ? 'success-row' : '';
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
            // handleDetailsRenter(row, index) {
            //     this.current_row = row;
            //     this.details_visible = true;
            //     this.getRowInfo(index);
            //     this.getRenterDetail(this.current_row.id);
            // },
            getRowInfo(index) {
                this.renterDetailList = this.renterLists[index];
                // console.log(this.renterDetailList)
            },
            //获取详情
            getRenterDetail(id) {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_renter/' + id, {}).then(res => {
                    if (res.code == 200) {
                        this.showLoading(false);
                        let renterDetail = res.data.data;
                        console.log(renterDetail);

                    }
                })
            },
            //编辑
            handleEditRenter(row, index,type) {
                this.chooseType = type;
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
            handleRemarkRenter(row,index){
                this.ra_ids = [];
                this.ra_ids.push(row.id);
                console.log(this.ra_ids);
                this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {ids:this.ra_ids,operate:1}).then(res => {
                    this.callbackSuccess(res);
                    if(res.code===200){

                    }
                })
            },
            //恢复重复标记
            // handleReturnRemark(row,index){
            //     this.ra_ids=[];
            //     this.ra_ids.push(row.id);
            //     this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {ids:this.ra_ids,operate:2}).then(res => {
            //         this.callbackSuccess(res);
            //
            //     })
            // },

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

<style lang="scss">
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
            .el-table .success-row{
                background: #DFDFDF;
            }

            #theme_name .form_item_container {
                padding: 0 0;
            }

        }
    }
</style>
