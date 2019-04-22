<template>
    <div id="accountManage">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>帐户管理</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="add_account_visible = true"><b>+</b></div>
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="action-bar changeChoose" v-show="action_visible">
            <div class="action-bar-left">
                <!--<el-checkbox>全选</el-checkbox>-->
                <span class="check-count" >已选中 <i>{{multipleSelection.length}}</i> 项</span>
                <span class="action-bar-name" >
                    <span class="edit" @click="handleOpenUpdateAccount(current_row)">更新</span>
                    <span class="edit" @click="handleOpenRecharge(current_row)">充值</span>
                    <span class="edit" @click="initial_visible = true;">归零</span>
                    <span class="edit" @click="handleOpenInfo(current_row)">记录</span>
                    <span class="delete" @click="handleOpenDel(current_row)">删除</span>
                </span>
            </div>
            <div class="action-bar-right">

            </div>
        </div>
        <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
            <el-table
                    :data="accountData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    @selection-change="handleSelectionChange"
                    header-row-class-name="tableHeader"
                    style="width: 100%">
                <el-table-column
                        type="selection" width="40">
                </el-table-column>
                <el-table-column
                        v-for="item in Object.keys(showData)" :key="item"
                        align="center"
                        :prop="item"
                        :label="showData[item]">
                </el-table-column>
            </el-table>
            <footer class="flex-center bottomPage">
                <div class="develop flex-center">
                    <i class="el-icon-d-arrow-right"></i>
                </div>
                <div class="page">
                    <el-pagination
                            :current-page="params.page"
                            :page-size="params.limit"
                            :total="account_count"
                            layout="total,jumper,prev,pager,next"
                            @current-change="handleChangePage"
                    >
                    </el-pagination>
                </div>
            </footer>
        </div>
        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
        <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

        <!--点击查看-->
        <lj-dialog
                :visible="info_visible"
                :size="info_size"
                @close="handleCloseInfo"
        >
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>
            <span style="cursor: pointer" :class="{'isCheck': info_params.operation == key }"
                  v-for="(tmp,key) in info_type" :key="key" @click="handleCheckoutType(tmp,key)">
              <span v-if="key != 1" style="margin: 0 10px">/</span>
              {{ tmp }}
            </span>
                    </h3>
                </div>
                <div class="dialog_main">
                    <el-table
                            :data="infoData"
                    >
                        <el-table-column label="户名" prop="account.name" align="center"></el-table-column>
                        <el-table-column min-width="120px" label="账户" prop="account.account_num"
                                         align="center"></el-table-column>
                        <el-table-column label="归档金额" prop="" align="center"
                                         v-if="info_params.operation == 4"></el-table-column>
                        <el-table-column label="归档前账户金额" prop="desc.old_amount" v-if="info_params.operation == 4"
                                         align="center"></el-table-column>
                        <el-table-column label="开户人" prop="account.account_owner" align="center"></el-table-column>
                        <el-table-column label="部门" prop="" align="center"
                                         v-if="info_params.operation == 4"></el-table-column>
                        <el-table-column label="新增时间" prop="create_time" align="center"
                                         v-if="info_params.operation == 1"></el-table-column>
                        <el-table-column min-width="120px" label="归档时间" prop="create_time" align="center"
                                         v-if="info_params.operation == 4"></el-table-column>
                        <el-table-column label="操作人" prop="operator.name" align="center"></el-table-column>
                        <el-table-column label="备注" prop="account.remark" align="center"></el-table-column>
                    </el-table>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="info_count"
                                :current-page="info_params.page"
                                :page-size="info_params.limit"
                                layout="total,jumper,prev,pager,next"
                                @current-change="handleChangePage_infoData"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </lj-dialog>

        <!--新增账户-->
        <lj-dialog
                :visible="add_account_visible"
                :size="{width: 500 + 'px',height: add_account.cate === 1 ? 730 + 'px' : 620 + 'px'}"
                @close="handleCancelAdd"
        >
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{ current_row ? '更新账户' : '新增账户'}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form :model="add_account" :rules="add_account_rules"  ref="addAccount" label-width="80px">
                        <el-form-item  label="账户名称">
                            <el-input v-model="add_account.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="所有人">
                            <el-input v-model="add_account.account_owner" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="账户类型">
                            <el-select class="all_width" v-model="add_account.cate" placeholder="请输入">
                                <el-option v-for="(item,key) in cate" :value="parseInt(key)" :key="key"
                                           :label="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="add_account.cate === 1" label="银行">
                            <el-select class="all_width" v-model="add_account.bank" placeholder="请选择">
                                <el-option v-for="(item,key) in banks" :value="item" :key="key"
                                           :label="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="add_account.cate === 1" label="支行">
                            <el-input v-model="add_account.sub_bank" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="账户账号">
                            <el-input v-model="add_account.account_num" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="初始金额">
                            <el-input type="number" v-model="add_account.amount_base"
                                      placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="账户范围">
                            <el-select class="all_width" v-model="add_account.scope" placeholder="请选择">
                                <el-option  v-for="(item,index) in account_types" :value="item.val" :label="item.title" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="add_account.remark" type="textarea" placeholder="请输入" :rows="8"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="submitAdd('addAccount')">{{ current_row ? '更新' :
                        '新增'}}
                    </el-button>
                    <el-button size="small" @click="handleCancelAdd">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--删除账户-->
        <lj-dialog
                :visible="del_account_visible"
                :size="{width: 400 + 'px',height: 250 + 'px'}"
                @click="del_account_visible = false"
        >
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>确定</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定要删除该账户吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleDelAccount">确定</el-button>
                    <el-button size="small" @click="del_account_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--充值-->
        <lj-dialog
                :visible="account_recharge_visible"
                :size="{width: 400 + 'px',height: 300 + 'px'}"
        >
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>充值</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form :model="recharge" label-width="80px">
                        <el-form-item label="充值金额">
                            <el-input class="all_width" v-model="recharge.amount" type="number"
                                      placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="handleOkRecharge">确定</el-button>
                    <el-button size="small"
                               @click="account_recharge_visible = false;current_row = '';recharge.amount = ''">取消
                    </el-button>
                </div>
            </div>
        </lj-dialog>

        <!--归零-->
        <lj-dialog
                :visible="initial_visible"
                :size="{width: 400 + 'px',height: 250 + 'px'}"
                @close="initial_visible = false"
        >
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>归档账户</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">您确定归零该用户吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="handleInitialAccount">确定</el-button>
                    <el-button size="small" @click="initial_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>


    </div>
</template>

<script>
    import SearchHigh from '../../common/searchHigh.vue'
    import FinMenuList from '../components/finMenuList.vue'
    import LjDialog from '../../common/lj-dialog.vue';
    import {accountSearchList} from "../../../assets/js/allSearchData.js";

    export default {
        name: "index",
        components: {SearchHigh, FinMenuList, LjDialog},
        data() {
            return {
                accountSearchList,
                //查看记录
                info_size: '',
                info_type: {
                    1: '新增',
                    2: '修改',
                    3: '删除',
                    4: '归档',
                    5: '充值'
                },
                account_types:[
                    {title:'收款',val:3},
                    {title:'付款',val:5},
                ],
                infoData: [],
                info_count: 0,
                info_params: {
                    account_id: '',
                    operation: 1,
                    limit:12,
                    page:1,
                },

                //归零
                initial_visible: false,

                //删除
                del_account_visible: false,

                //新增/更新
                add_account_visible: false,
                add_account: {
                    name: '',
                    account_owner: '',
                    sub_bank: '',
                    cate: '',
                    bank: '',
                    account_num: '',
                    amount_base: '',
                    scope: '',
                    remark: ''
                },
                add_account_rules: {
                    name: [{required: true, message: '请输入账户名称', trigger: 'blur'}],
                    account_owner: [{required: true, message: '请输入账户所有人', trigger: 'blur'}],
                    cate: [{required: true, message: '请选择账户类型', trigger: 'change'}],
                    account_num: [{required: true, message: '请输入账户账号', trigger: 'blur'}],
                    amount_base: [{required: true, message: '请输入账户初始金额', trigger: 'blur'}],
                    scope: [{required: true, message: '请选择账户范围', trigger: 'change'}],
                },

                info_visible: false,
                showFinMenuList: false,
                showData: {
                    name: '户名',
                    account_num: '卡号',
                    account_owner: '开户人',
                    amount_remain: '当前余额',
                },
                chooseRowIds: [],
                accountData: [],

                showSearch: false,
                searchData: {},

                //列表参数
                params: {
                    page: 1,
                    limit: 12,
                    search: '',
                    cate: '',
                    account_owner: '',
                    account_num: '',
                    scope:'',
                },

                //参数
                cate: {},
                banks: [],
                account_count: 0,
                current_row: '',

                //充值
                account_recharge_visible: false,
                recharge: {
                    amount: ''
                },
                multipleSelection:[],
                action_visible:false,
            }
        },
        mounted() {
            this.getAccountList();
        },
        activated() {
        },
        watch: {
            add_account: {
                handler(val, oldVal) {
                    console.log(val)
                },
                deep: true
            }
        },
        computed: {},
        methods: {
            // 多选
            handleSelectionChange(val){
                this.multipleSelection = val;
                if(val.length>0){
                    this.action_visible = true;
                    this.current_row = val[0];
                }else {
                    this.action_visible = false;
                }
                console.log(val);
            },
            handleCloseInfo() {
                this.info_params.operation = '';
                this.info_params.account_id = '';
                this.info_visible = false;
            },
            handleChangePage_infoData(page){
               this.info_params.page = page;
               this.getInfoList();
            },

            getInfoList() {
                this.infoData = [];
                this.info_count = 0;
                this.$http.get(globalConfig.temporary_server + 'account_change/log', this.info_params).then(res => {
                    if (res.code === 200) {
                        this.infoData = res.data.data;
                        this.info_count = res.data.count;
                    } else {
                        this.infoData = [];
                        this.info_count = 0;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleOpenInfo(row) {
                this.info_size = 'large';
                this.info_visible = true;
                this.info_params.account_id = row.id;
                this.getInfoList();
            },
            handleCheckoutType(tmp, key) {
                this.info_params.operation = key;
                this.getInfoList();
            },
            handleInitialAccount() {
                this.$http.put(globalConfig.temporary_server + `account/archive/${this.current_row.id}`).then(res => {
                    this.callbackSuccess(res);
                    this.current_row = '';
                    this.initial_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },
            handleOkRecharge() {
                this.recharge.amount = parseFloat(this.recharge.amount).toFixed(2);
                this.$http.put(globalConfig.temporary_server + `account/recharge/${this.current_row.id}`, this.recharge).then(res => {
                    this.callbackSuccess(res);
                    this.current_row = '';
                    this.recharge.amount = '';
                    this.account_recharge_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },
            handleOpenRecharge(row) {
                this.current_row = row;
                this.account_recharge_visible = true;
            },
            handleDelAccount() {
                this.$http.delete(globalConfig.temporary_server + `account/delete/${this.current_row.id}`).then(res => {
                    this.callbackSuccess(res);
                    this.current_row = '';
                    this.del_account_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },
            handleOpenDel(row) {
                this.current_row = row;
                this.del_account_visible = true;
            },
            //更新弹出
            handleOpenUpdateAccount(row) {
                this.current_row = row;
                for (var key in this.add_account) {
                    this.add_account[key] = row[key];
                }
                this.add_account_visible = true;
                console.log(this.add_account_visible)

            },
            handleChangePage(page) {
                this.params.page = page;
                this.getAccountList();
            },
            submitAdd(formName) {
                console.log(this.add_account);
                this.$refs[formName].validate((valid => {

                    if (valid) {
                        this.add_account.amount_base = parseFloat(this.add_account.amount_base).toFixed(2);
                        if (this.current_row) {
                            this.handleUpdateAccount();
                        } else {
                            this.handleSubmitAdd();
                        }
                    }
                }))
            },
            handleSubmitAdd() {
                this.$http.post(globalConfig.temporary_server + 'account', this.add_account).then(res => {
                    this.callbackSuccess(res);
                    this.add_account_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },

            handleUpdateAccount() {
                // console.log(this.current_row.id);
                this.$http.put(globalConfig.temporary_server + `account/${this.current_row.id}`, this.add_account).then(res => {
                    this.callbackSuccess(res);
                    this.handleCancelAdd();

                }).catch(err => {
                    console.log(err);
                })
            },
            handleCancelAdd() {
                this.$refs['addAccount'].resetFields();
                for (var key in this.add_account) {
                    this.add_account[key] = '';
                }
                this.current_row = '';
                this.add_account_visible = false;
            },
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.current_row = '';
                    this.getAccountList();
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                    return false;
                }
            },
            getAccountList() {
                this.$http.get(globalConfig.temporary_server + 'account', this.params).then(res => {
                    if (res.code === 200) {
                        this.cate = res.data.cate;
                        this.banks = res.data.banks;
                        this.account_count = res.data.count;
                        this.accountData = res.data.data;
                    } else {
                        this.cate = {};
                        this.banks = [];
                        this.account_count = 0;
                        this.accountData = [];
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            // tab切换
            changeTabs(id) {
                this.chooseTab = id;
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
            // 高级搜索
            highSearch() {
                this.showSearch = true;
                this.searchData = this.accountSearchList;
            },
            // 确认搜索
            hiddenModule(val) {
                this.showSearch = false;
                if (val !== 'close') {
                    console.log(val);
                    this.params = val;
                    for (let item of Object.keys(this.params)){
                        this.params[item] = val[item];
                    }
                    this.getAccountList();
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/finance/accountManage/index.scss";

    @mixin childrenImg($m, $n) {
        $url: '../../../assets/image/finance/accountManage/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #accountManage {
            .isCheck {
                color: $colorE33;
            }
        }
    }

    #theme_name.theme2 {
        #accountManage {

        }
    }

    #theme_name.theme3 {
        #accountManage {

        }
    }

    #theme_name.theme4 {
        #accountManage {

        }
    }
</style>
