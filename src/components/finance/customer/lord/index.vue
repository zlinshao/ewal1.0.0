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
            <el-table-column label="前缀" align="center" width="90">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===1">
                        <i class="el-icon-view"></i>忽略重复
                    </div>
                    <div  class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===0">
                        <span  style="background-color: #14e731;"></span>
                        <span  style="background-color: #e6a23c;"></span>
                        <span  style="background-color: #f56c6c;"></span>
                        <span v-if="freeze[scope.$index]===1" style="background-color: #409eff;"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="生成时间" show-overflow-tooltip  align="center"></el-table-column>
            <el-table-column prop="address" label="房屋地址" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="customer_name" label="客户姓名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="contact" label="客户手机号" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="months" label="收房月数" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="deal_date" label="待签约日期" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="first_pay_date" label="第一次打房租日期" show-overflow-tooltip align="center"  width="150"></el-table-column>
            <el-table-column prop="account_type" label="客户汇款方式" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="付款方式/月单价" prop="prices" align="center"  show-overflow-tooltip  width="150"></el-table-column>
            <el-table-column label="账号" prop="account_num" align="center"  show-overflow-tooltip ></el-table-column>
            <el-table-column label="签约人" prop="operator.name" align="center"  show-overflow-tooltip ></el-table-column>

            <el-table-column label="状态" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="" align="center" width="500">
                <template slot-scope="scope">
                    <el-button type="success" size="small" @click="handleDetailsLord(scope.row,scope.$index)">查看</el-button>
                    <el-button type="primary" size="small" @click="handleEditLord(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="warning" size="small" @click="handleReturnRemark(scope.row,scope.$index)">恢复重复标记</el-button>
                    <el-button type="info" size="small" @click="scope.row.freeze===0 ? handleProcessLord(scope.row,scope.$index):handleCancelProcessLord(scope.row,scope.$index)">{{scope.row.freeze === 0 ? '生成待处理项':'取消待处理项'}}</el-button>
                    <el-button type="danger" size="small" @click="handleDeleteLord(scope.row,scope.$index)">删除</el-button>
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
                :size="{width: 1200 + 'px',height: 800 + 'px' }"
                @close="edit_visible = false">
            <lord-form :formData="lordDetailData" :current_row="current_row" @updateList="updateLordList"></lord-form>
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
                    search: this.searchParams.undefined,
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                chooseRowIds: [],//列表ids
                tableDetailData: [//详情
                    {label: "客户姓名 :", prop: "customer_name"},
                    {label: "客户联系方式 :", prop: "contact"},
                    {label: "房屋地址 :", prop: "address"},
                    {label: "租房月数 :", prop: "months"},
                    {label: "付款方式/月单价 :", prop: "prices"},
                    {label: "待签约日期 :", prop: "deal_date"},
                    {label: "空置期 :", prop: "freeze"},
                    {label: "第一次打房租日期 :", prop: "first_pay_date"},
                    {label: "第二次打房租日期 :", prop: "second_pay_date"},
                    {label: "负责人 :", prop: "leader"},
                    {label: "所属部门 :", prop: "department"},
                    {label: "操作人 :", prop: "operator"},
                    {label: "签约人 :", prop: "staff"},
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
                ra_ids:[],
                multipleSelection: [],//多选
                freeze:[],//待处理

                lordDetailData:{
                    leader:'',
                    department:'',
                    operator:'',
                    staff:'',
                },



            }
        },
        mounted() {
            this.getLordList();
        },
        created(){
            this.$bus.on('cancelRemarkFun',this.handleRemark);//取消重复标记
            this.$bus.on('getParams',this.handleParams);//搜索参数
        },
        beforeDestroy(){
            this.$bus.off('cancelRemarkFun',this.handleRemark);
            this.$bus.on('getParams',this.handleParams);
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
            // 搜索参数
            handleParams(val){
                if(val.undefined){
                    this.params.search = val.undefined;
                } else {
                    this.params.search = ''
                }
                if(val.data1){
                    this.params.startRange = val.data1[0];
                    this.params.endRange = val.data1[1];
                }

            },

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
                        this.freeze= [];
                        for (let item of this.lordLists) {
                            this.freeze.push(item.freeze);
                        }
                    } else {
                        this.lordLists = [];
                        this.lordCount = 0;
                    }
                }).then(() => {
                    for (let item of this.lordLists) {
                        this.lordIds.push(item.id);
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
            },
            //行信息
            getRowInfo(index) {
                console.log(this.lordLists[index]);
                this.lordDetailData = this.lordLists[index];
                this.lordDetailData.leader = this.lordLists[index].leader.name;
                this.lordDetailData.staff = this.lordLists[index].staff.name;
                this.lordDetailData.operator = this.lordLists[index].operator.name;
                this.lordDetailData.department = this.lordLists[index].department.name;

            },

            //打开编辑
            handleEditLord(row, index) {
                this.current_row = row;
                this.edit_visible = true;
                this.getRowInfo(index);
                this.getLordDetail(this.current_row.id);
            },
            //获取详情
            getLordDetail(id) {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_collect/' + id, {}).then(res => {
                    if (res.code == 200) {
                        this.showLoading(false);
                        console.log(res.data.data);//详情

                        // this.renterDetailData = Object.assign({}, this.renterDetail, this.renterDetailList);

                        // for (let item of Object.keys(this.renter_form)) {
                        //     if(this.renterDetailData[item]!=''&& this.renterDetailData[item] != undefined){
                        //         this.renter_form[item] = this.renterDetailData[item];
                        //     }else {
                        //         this.renter_form[item] = '';
                        //     }
                        // }
                    }
                })
            },

            //生成处理项
            handleProcessLord(row, index) {
                this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id, {}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //取消待处理项
            handleCancelProcessLord(row, index) {
                this.$http.put(globalConfig.temporary_server + 'account_pending/recover' , {customer_id:row.id,identity:1}).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //忽略重复标记
            handleRemark(val){
                // alert(this.ra_ids);
                this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {ids:this.ra_ids,operate:1}).then(res => {
                    this.callbackSuccess(res);
                    if(res.code===200){

                    }
                })
            },
            //恢复重复标记
            handleReturnRemark(row,index){
                this.ra_ids=[];
                this.ra_ids.push(row.id);
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
