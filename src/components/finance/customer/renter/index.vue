<template>
    <div class="mainListTable changeChoose">
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

            <!--<el-table-column-->
                    <!--type="selection" width="40">-->
            <!--</el-table-column>-->
            <el-table-column label="标记" align="center" width="90">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="renterStatus[scope.$index]['suppress_dup']===1">
                        /
                    </div>
                    <div class="statusBar flex-center" v-if="renterStatus[scope.$index]['suppress_dup']===0">
                      <el-tooltip content="手机号" placement="bottom" :visible-arrow="false">
                        <span style="background-color: #e6a23c;" v-if="renterStatus[scope.$index]['is_name']===1"></span>
                      </el-tooltip>
                      <el-tooltip content="客户姓名" placement="bottom" :visible-arrow="false">
                        <span style="background-color: #14e731;" v-if="renterStatus[scope.$index]['is_contact']===0"></span>
                      </el-tooltip>
                      <el-tooltip content="地址" placement="bottom" :visible-arrow="false">
                        <span style="background-color: #f56c6c;" v-if="renterStatus[scope.$index]['is_address']===2"></span>
                      </el-tooltip>
                      <el-tooltip content="忽略重复" placement="bottom" :visible-arrow="false">
                        <span v-if="freeze[scope.$index]===1" style="background-color: #409eff;"></span>
                      </el-tooltip>
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
        <lj-dialog :visible="action_status.delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="action_status.delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该租客信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkRenter">确定</el-button>
                    <el-button type="info" size="small" @click="action_status.delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--编辑-->
        <lj-dialog
                :visible="action_status.details_visible"
                :size="{width: 1200 + 'px',height: 820 + 'px' }"
                @close="action_status.details_visible = false">
            <renter-form
                    :initData="renterDetailList"
                    :type="chooseType"
                    :checkOrEdit="status"
                    :current_row="current_row"
                    @cancel="getCancelStatus"
                    @updateList="updateRenterList"></renter-form>
        </lj-dialog>

    </div>
</template>
<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import RenterForm from "./renterForm";
    export default {
        name: "index",
        components: {RenterForm, LjDialog,},
        props:['searchParams','status','current_row_info'],
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
                action_status:'',
            }
        },
        mounted() {
            this.getRenterList();
        },
        activated() {

        },
        watch: {
            current_row_info:{
                handler(val){
                    this.current_row = val;
                    console.log(val);
                    this.renterDetailList = val;
                },
                deep:true
            },
            status:{
                handler(val){
                    this.action_status = val;
                    console.log(val)
                },
                deep:true
            }
        },
        created(){
            this.$bus.on('getParams',this.handleParamsRenter);

        },
        beforeDestroy(){
            this.$bus.off('getParams',this.handleParamsRenter);
        },
        computed: {},
        methods: {
            getCancelStatus(val) {
                this.action_status.details_visible = val;
            },
            // 搜索参数
            handleParamsRenter(val){
                if(val.search){
                    this.params.search = val.search;
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
                this.action_status.details_visible = val;
                this.getRenterList();
            },
            // 多选
            handleSelectionChange(val){
                this.multipleSelection = val;
                this.$emit('getMultipleSelection',val)
            },
            //分页
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

            //生成待处理项
            handleProcessRenter(row) {
                this.$http.post(globalConfig.temporary_server + 'customer_renter/pending/' + row.id, {}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //取消待处理项
            handleCancelProcessRenter(row) {
                this.$http.put(globalConfig.temporary_server + 'account_pending/recover' , {customer_id:row.id,identity:2}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //忽略重复标记
            handleRemarkRenter(row){
                this.ra_ids = [];
                this.ra_ids.push(row.id);
                console.log(this.ra_ids);
                this.$http.put(globalConfig.temporary_server + 'customer_renter_repeat/is_ignore', {ids:this.ra_ids,operate:1}).then(res => {
                    this.callbackSuccess(res);
                    if(res.code===200){

                    }
                })
            },
            //删除
            handleOkRenter() {
                this.$http.delete(globalConfig.temporary_server + 'customer_renter/delete/' + this.current_row.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_row = '';
                }).catch(err => {
                    console.log(err);
                })
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
                    width: 15px;
                    height: 15px;
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
