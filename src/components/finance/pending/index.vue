<template>
    <div id="pending">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>待处理项</h1>
                <h2 class="items-center">
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="action-bar changeChoose">
            <div class="action-bar-left">
                <el-checkbox>全选</el-checkbox>
                <span class="check-count" v-show="action_visible">已选中 <i>{{multipleSelection.length}}</i> 项</span>

                <span class="action-bar-name" v-show="action_visible">
                    <span class="edit" @click="recover_visible=true">恢复</span>
                    <span style="color: #CF2E33" @click="delete_visible=true">删除</span>
                </span>
            </div>

        </div>
        <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
            <!--列表-->
            <el-table
                    :data="tableData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    header-row-class-name="tableHeader"
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">

                <el-table-column
                        type="selection" width="40">
                </el-table-column>

                <el-table-column label="事项类型" show-overflow-tooltip align="center" prop="event_type">
                    <template slot-scope="scope">
                        <span>{{scope.row.item_type===0?'暂未处理': scope.row.item_type===1?'违约': scope.row.item_type===2?'转租': scope.row.item_type===3?'调租': scope.row.item_type===4?'退租': scope.row.item_type===5?'收房炸单': scope.row.item_type===6?'租房炸单':''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="staff.name" label="开单人" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="customer.address" label="房屋地址" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="customer.customer_name" label="客户姓名" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="refund_should" label="应退" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="refund_diff" label="实际扣款" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="refund_real" label="实际退款" show-overflow-tooltip align="center"
                                 width="150"></el-table-column>
                <el-table-column prop="account_num" label="结算账户" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="结算人" prop="operator.name" align="center" show-overflow-tooltip
                                 width="150"></el-table-column>

                <el-table-column label="状态" prop="" align="center" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status === 1 ? '待结算' : '已结算'}}</span>
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

        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该条信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--恢复-->
        <lj-dialog :visible="recover_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="recover_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>恢复</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定恢复该条信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="recover">确定</el-button>
                    <el-button type="info" size="small" @click="recover_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <lj-dialog :visible="detail_visible" :size="{width: 1200 + 'px',height: 600 + 'px'}"
                   @close="detail_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>详情</h3>
                </div>
                <div class="dialog_main">
                    <div class="pending_detail flex">
                        <div>
                            <p v-for="item in formData.slice(0,7)">
                                <span>{{item.keyText}}</span>
                                <span>{{detailData[item.keyName]}}</span>
                            </p>
                        </div>
                        <div>
                            <p v-for="item in formData.slice(7,16)">
                                <span>{{item.keyText}}</span>
                                <span>{{detailData[item.keyName]}}</span>
                            </p>
                        </div>
                        <div>
                            <p v-for="item in formData.slice(16,25)">
                                <span>{{item.keyText}}</span>
                                <span>{{detailData[item.keyName]}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </lj-dialog>

        <!--<SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>-->
        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
    </div>

</template>

<script>
    import FinMenuList from '../components/finMenuList.vue';
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "pending",
        components:{
            FinMenuList,
            LjDialog
        },
        data() {
            return {
                params: {//查询参数
                    search: '',
                    start_time: '',
                    end_time: '',
                    page: 1,
                    limit: 12,
                    event_type: '',
                    collect_rent: '',
                },
                action_visible:false,//操作栏作态
                recover_visible:false,//恢复
                delete_visible:false,//删除
                detail_visible:false,
                count: 0,
                chooseRowIds: [],
                showFinMenuList: false,
                multipleSelection:[],//选中项
                current_row:'',
                tableData: [
                    {
                        "id": 311, //待处理项id
                        "collect_rent": 1, //1 收 2 租
                        "item_type": 0, //1 违约 2 转租 3 调租 4 退租  5收房炸单 6租房炸单 0 暂未处理
                        "staff_id": 2639, //开单人id
                        "department_id": 211, //部门id
                        "house_id": 119, //房屋id
                        "customer_id": 16426, //客户id
                        "start_date": '2019-11-11', //签约开始时间
                        "end_date": '2019-12-11', //签约结束时间
                        "operator_id": 0, //操作id,为0表示暂无操作人
                        "account_should_id": 190, //应收或应付款项id
                        "refund_should": "0.00", //应退
                        "refund_diff": "0.00", //扣款
                        "refund_real": "0.00", //实际退款
                        "status": 1, //状态 1待结算 2已结算
                        "account_type": 0, //账户类型 1银行卡 2支付宝 3微信 0表示暂无
                        "account_num": "31231231312", //账户账号
                        "settle_date": null, //结算日期
                        "remark": "0000", //备注
                        "manage_fee": "0.00", //管理费
                        "sublet_fee": "0.00", //转租费
                        "check_fee": "0.00", //物业校检费
                        "penalty_fee": "0.00", //违约金
                        "property_fee": "0.00", //物业费
                        "gas_fee": "0.00", //燃气费
                        "elec_fee": "0.00", //电费
                        "water_fee": "0.00", //水费
                        "net_fee": "0.00", //网络费
                        "diff_fee": "0.00", //差额
                        "create_time": "2019-04-07 09:03:55",
                        "update_time": "2019-04-07 09:03:55",
                        "delete_time": null,
                        "receive_pay": 0, //1收入 /2支出
                        "identity": 1, //1 房东 2 租客
                        "proof": {
                            "receivables": [
                                190
                            ],
                            "customer": 16426
                        },
                        "recorder_id": 2639,
                        "staff": {
                            "name": "方园", //签约人姓名
                            "position": [ //签约人职位
                                {
                                    "id": 136,
                                    "name": "PHP工程师专员",
                                    "description": "PHP工程师专员",
                                    "duty_id": 37,
                                    "parent_id": null,
                                    "sign": "Settlement personnel",
                                    "created_at": "2018-04-29 15:37:47",
                                    "pivot": {
                                        "position_id": 136,
                                        "user_id": 2639
                                    }
                                }
                            ],
                            "org": { //签约人部门
                                "name": "南京双龙大道组", //签约人部门名称
                                "leader": {
                                    "id": 99,
                                    "name": "闵建国", //签约人部门领导
                                    "avatar": "https://static.dingtalk.com/media/lADPBbCc1jVrw-fNAkDNAkA_576_576.jpg"
                                }
                            }
                        },
                        "operator": { //结算人
                            "name": "赵丽颖", //结算人姓名
                            "position": [], //结算人职位
                            "org": {
                                "name": "暂无", //结算人部门名称
                                "leader": [] //结算人部门领导
                            }
                        },
                        "customer": { //客户
                            "id": 16426,
                            "address": "大师傅士大夫山豆根刚刚", //房屋地址
                            "customer_name": "解兆飞" //客户姓名
                        }
                    },
                ],
                formData:[
                    {keyName:'customer_name',keyText:'客户姓名'},
                    {keyName:'address',keyText:'房屋地址'},
                    {keyName:'item_type',keyText:'事项类型'},
                    {keyName:'collect_rent',keyText:'收退款类型'},
                    {keyName:'start_date',keyText:'合同开始时间'},
                    {keyName:'end_date',keyText:'合同结束时间'},
                    {keyName:'remark',keyText:'备注'},

                    {keyName:'water_fee',keyText:'水费'},
                    {keyName:'elec_fee',keyText:'电费'},
                    {keyName:'gas_fee',keyText:'燃气费'},
                    {keyName:'property_fee',keyText:'物业费'},
                    {keyName:'net_fee',keyText:'网络费'},
                    {keyName:'sublet_fee',keyText:'转租费用'},
                    {keyName:'manage_fee',keyText:'管理费'},
                    {keyName:'check_fee',keyText:'物业校验'},
                    {keyName:'penalty_fee',keyText:'违约费'},

                    {keyName:'refund_should',keyText:'应退'},
                    {keyName:'refund_diff',keyText:'实际扣款'},
                    {keyName:'refund_real',keyText:'实际退款'},
                    {keyName:'account_type',keyText:'结算方式'},
                    {keyName:'account_num',keyText:'结算账户'},
                    {keyName:'staff_name',keyText:'签约人'},
                    {keyName:'org_name',keyText:'所属部门'},
                    {keyName:'operator_name',keyText:'收款人'},
                    {keyName:'create_time',keyText:'结算日期'},
                ],
                detailData: {
                    'customer_name':'',
                    'address':'',
                    'item_type':'',
                    'collect_rent':'',
                    'start_date':'',
                    'end_date':'',
                    'remark':'',
                    'water_fee':'',
                    'elec_fee':'',
                    'gas_fee':'',
                    'property_fee':'',
                    'net_fee':'',
                    'sublet_fee':'',
                    'manage_fee':'',
                    'check_fee':'',
                    'penalty_fee':'',
                    'refund_should':'',
                    'refund_diff':'',
                    'refund_real':'',
                    'account_type':'',
                    'account_num':'',
                    'staff_name':'',
                    'org_name':'',
                    'operator_name':'',
                    'create_time':'',
                }

            }
        },

        mounted() {
            // this.getData();
            let dataInfo = this.tableData[0];
            for(let item of Object.keys(this.detailData)){
                this.detailData[item] = dataInfo[item];
            }
            this.detailData.customer_name = dataInfo.customer.customer_name;
            this.detailData.address = dataInfo.customer.address;
            this.detailData.operator_name = dataInfo.operator.name;
            this.detailData.staff_name = dataInfo.staff.name;
            this.detailData.org_name = dataInfo.staff.org.name;
            this.detailData.collect_rent = dataInfo.collect_rent===1?'收款':dataInfo.collect_rent===2?'租款':'';
            this.detailData.item_type = dataInfo.item_type===0?'暂未处理':dataInfo.item_type===1?'违约':dataInfo.item_type===2?'转租':dataInfo.item_type===3?'调租':dataInfo.item_type===4?'退租':dataInfo.item_type===5?'收房炸单':dataInfo.item_type===6?'租房炸单':'';
            this.detailData.account_type = dataInfo.account_type===0?'暂无':dataInfo.account_type===1?'银行卡':dataInfo.account_type===2?'支付宝':dataInfo.account_type===3?'微信':'';
            },
        methods: {
            handleSelectionChange(val){//获取选项
                this.multipleSelection = val;
                if(val.length>0){
                    this.action_visible = true;
                    this.current_row = val[0];
                    console.log(val);
                }else {
                    this.action_visible = false;
                }
            },
            highSearch(){//高级搜索

            },
            recover(){//恢复
                let params={
                    customer_id:this.current_row.id,
                    identity:this.current_row.identity,
                };
                this.$http.get(globalConfig.temporary_server + 'account_pending/recover', params).then(res => {
                    if (res.code === 200) {
                        this.recover_visible = false;
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.getData();
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            },
            handleOkDel() {//删除
                this.$http.delete(globalConfig.temporary_server + 'customer_collect/delete/' + this.current_row.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_row = '';

                }).catch(err => {
                })
            },

            //加载列表
            // getData() {
            //     this.showLoading(true);
            //     this.$http.get(globalConfig.temporary_server + 'account_pending', this.params).then(res => {
            //         if (res.code === 200) {
            //             this.showLoading(false);
            //             this.tableData = res.data.data;
            //             this.count = res.data.count;
            //         }
            //     })
            // },
            //换页
            handleChangePage(page) {
                this.params.page = page;
                // this.getData();
            },
            // 当前点击
            tableClickRow(row) {
                let ids = this.chooseRowIds;
                ids.push(row.id);
                this.chooseRowIds = this.myUtils.arrayWeight(ids);

                this.detail_visible=true;

            },
            // 点击过
            tableChooseRow({row, rowIndex}) {
                return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/finance/pending/index.scss";

</style>