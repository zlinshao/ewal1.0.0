<template>
    <div class="mainListTable changeChoose">
        <!--列表-->
        <el-table
                :data="lordLists"
                :height="this.mainListHeight() + 'px'"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-class-name="tableRowClassName"
                @cell-click="tableClickRow"
                @selection-change="handleSelectionChange"
                style="width: 100%">

            <el-table-column
                    type="selection" width="40">
            </el-table-column>

            <el-table-column label="前缀" align="center" width="90">
                <template slot-scope="scope">
                    <div class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===1">
                        /
                    </div>
                    <div class="statusBar flex-center" v-if="LordStatus[scope.$index]['suppress_dup']===0">
                        <span style="background-color: #14e731;"
                              v-if="LordStatus[scope.$index]['is_contact']===0"></span>
                        <span style="background-color: #e6a23c;" v-if="LordStatus[scope.$index]['is_name']===1"></span>
                        <span style="background-color: #f56c6c;"
                              v-if="LordStatus[scope.$index]['is_address']===2"></span>
                        <span v-if="freeze[scope.$index]===1" style="background-color: #409eff;"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="生成时间" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="address" label="房屋地址" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="customer_name" label="客户姓名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="contact" label="客户手机号" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="months" label="收房月数" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="deal_date" label="待签约日期" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="first_pay_date" label="第一次打房租日期" show-overflow-tooltip align="center"
                             width="150"></el-table-column>
            <el-table-column prop="account_type" label="客户汇款方式" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="付款方式/月单价" prop="prices" align="center" show-overflow-tooltip
                             width="150"></el-table-column>
            <el-table-column label="账号" prop="account_num" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="签约人" prop="operator.name" align="center" show-overflow-tooltip></el-table-column>

            <el-table-column label="状态" prop="" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                </template>
            </el-table-column>

            <!--<el-table-column label="操作" prop="" align="center" width="500">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button type="success" size="small" @click="handleEditLord(scope.row,scope.$index,'check')">查看-->
                    <!--</el-button>-->
                    <!--<el-button type="primary" size="small" @click="handleEditLord(scope.row,scope.$index,'edit')">编辑-->
                    <!--</el-button>-->
                    <!--&lt;!&ndash;<el-button type="warning" size="small" @click="handleReturnRemark(scope.row,scope.$index)">取消重复标记</el-button>&ndash;&gt;-->
                    <!--<el-button type="warning" size="small" @click="handleRemark(scope.row,scope.$index)">取消重复标记-->
                    <!--</el-button>-->
                    <!--<el-button type="success" size="small" plain-->
                               <!--@click="scope.row.freeze===0 ? handleProcessLord(scope.row,scope.$index):handleCancelProcessLord(scope.row,scope.$index)">-->
                        <!--{{scope.row.freeze === 0 ? '生成待处理项':'取消待处理项'}}-->
                    <!--</el-button>-->
                    <!--<el-button type="danger" size="small" @click="handleDeleteLord(scope.row,scope.$index)">删除-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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

        <!--编辑-->
        <lj-dialog
                :visible="edit_visible"
                :size="{width: 1200 + 'px',height: 800 + 'px' }"
                @close="edit_visible = false">
            <lord-form :editForm="lordDetailData" :type="chooseType" :current_row="current_row"
                       @updateList="updateLordList" :address="set_price_form.bottom_name"
                       :addressIds="set_price_form.bottom_id"></lord-form>
        </lj-dialog>

        <!--搜索房源-->
        <HouseFilter :visible="house_filter_visible" @close="handleGetHouseResource"></HouseFilter>


    </div>
</template>
<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import LjSubject from '../../../common/lj-subject.vue';
    import LordForm from "./lordForm";
    import HouseFilter from '../../../marketCentre/components/house-filter.vue';

    export default {
        name: "index",
        components: {LordForm, LjDialog, LjSubject, HouseFilter},
        props: ['searchParams','status','current_row_info'],
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
                chooseRowIds: [],//列表ids

                LordStatus: [
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
                current_row: this.current_row_info,//当前row
                lordLists: [],//列表数据
                lordCount: 0,
                lordIds: [],
                ra_ids: [],
                multipleSelection: [],//多选
                freeze: [],//待处理
                lordDetailData: this.row,

                statusLists: [],
                house_filter_visible: false,
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
                chooseType: '',


            }
        },
        mounted() {
            this.getLordList();
        },
        created() {
            this.$bus.on('getParams', this.handleParams);//搜索参数
            this.$bus.on('chooseHouse', this.handleChooseHouse);//搜索房屋
            this.$bus.on('cancelEdit_visible', this.getEditStatus);//取消
        },
        beforeDestroy() {
            this.$bus.off('getParams', this.handleParams);
            this.$bus.off('chooseHouse', this.handleChooseHouse);//搜索房屋
            this.$bus.off('cancelEdit_visible', this.getEditStatus);//取消
        },
        activated() {

        },
        watch: {
            current_row:{
                handler(val){

                },
                deep:true
            }
        },

        computed: {},
        methods: {
            getEditStatus(val) {
                this.edit_visible = val;
            },

            //房屋
            handleChooseHouse(val) {
                this.house_filter_visible = val
            },
            //确定选择房源
            handleGetHouseResource(house, type) {
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
                    this.set_price_form.bottom_name = this.set_price_form.bottom_name.substring(0, this.set_price_form.bottom_name.length - 1);

                }
                this.house_filter_visible = false;

            },
            // 搜索参数
            handleParams(val) {
                if (val.search) {
                    this.params.search = val.search;
                } else {
                    this.params.search = ''
                }
                if (val.date1) {
                    this.params.startRange = val.date1[0];
                    this.params.endRange = val.date1[1];
                }
                console.log(val);
                this.getLordList();
            },

            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getLordList();
            },
            updateLordList(val) {
                this.edit_visible = val;
                this.getLordList();
            },
            // 当前点击
            tableClickRow(row) {
                let ids = this.chooseRowIds;
                ids.push(row.id);
                this.chooseRowIds = this.myUtils.arrayWeight(ids);
            },
            // 行 状态
            tableRowClassName({row, rowIndex}) {
                // return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
                return row.freeze === 1 ? 'success-row' : '';
            },

            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('getMultipleSelection',val)
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
                        this.lordLists = res.data.data.sort(
                            function (a, b) {
                                return a.id - b.id
                            }
                        );
                        this.lordCount = res.data.count;
                        this.freeze = [];
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
                            let statusData = res.data.data;
                            this.LordStatus = statusData.sort(
                                function (a, b) {
                                    return a.id - b.id
                                }
                            );
                        }
                    })
                }).catch(err => {
                    console.log(err);
                })
            },

            //打开详情
            // handleDetailsLord(row, index) {
            //     this.current_row = row;
            //     this.details_visible = true;
            //     this.getRowInfo(index);
            //     console.log(row.id);
            // },
            //行信息
            getRowInfo(index) {
                console.log(this.lordLists[index]);
                this.lordDetailData = this.lordLists[index];
                console.log(this.lordDetailData);
            },

            //打开编辑
            handleEditLord(row, index, type) {
                this.chooseType = type;
                this.current_row = row;
                this.edit_visible = true;
                this.getRowInfo(index);
                this.getLordDetail(this.current_row.id);
                this.set_price_form.bottom_name = '';
                this.set_price_form.bottom_id = '';

            },
            //获取详情
            getLordDetail(id) {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'customer_collect/' + id, {}).then(res => {
                    if (res.code == 200) {
                        this.showLoading(false);
                        console.log(res.data.data);//详情
                    }
                })
            },

            //生成待处理项
            handleProcessLord(row, index) {

                this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id,).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //取消待处理项
            handleCancelProcessLord(row, index) {
                this.$http.put(globalConfig.temporary_server + 'account_pending/recover', {
                    customer_id: row.id,
                    identity: 1
                }).then(res => {
                    this.callbackSuccess(res);
                    console.log(row.id);
                })
            },
            //忽略重复标记
            handleRemark(row, index) {

                this.ra_ids = [];
                this.ra_ids.push(row.id);
                console.log(this.ra_ids);
                this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {
                    ids: this.ra_ids,
                    operate: 1
                }).then(res => {
                    this.callbackSuccess(res);

                })
            },
            //恢复重复标记
            // handleReturnRemark(row, index) {
            //     this.ra_ids = [];
            //     this.ra_ids.push(row.id);
            //     this.$http.put(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore', {
            //         ids: this.ra_ids,
            //         operate: 2
            //     }).then(res => {
            //         this.callbackSuccess(res);
            //     })
            // },

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

            .el-table .success-row {
                background: #DFDFDF;
            }

            #theme_name .form_item_container {
                padding: 0 0;
            }

        }
    }
</style>
