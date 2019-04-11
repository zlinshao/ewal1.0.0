<template>
    <div id="customer">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>客户</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>

            <div class="items-center listTopRight">
                <p class="status-icon" v-for="item in statusBar"   v-if="chooseTab===1||chooseTab===2">
                    <span style="margin-left: 16px"><i :style="{'background-color':item.iconColor}"></i><span>{{item.iconText}}</span></span>
                </p>
                <div class="icons home_icon"></div>
                <div class="icons search" @click="highSearch(chooseTab)"></div>
            </div>
        </div>
        <div class="action-bar changeChoose">
            <div class="action-bar-left">
                <el-checkbox>全选</el-checkbox>
                <span class="check-count" v-show="action_visible">已选中 <i>{{multipleSelection.length}}</i> 项</span>

                <span class="action-bar-name" v-show="action_visible">
                    <span class="edit" @click="action_status.details_visible = true ">查看</span>
                    <span class="edit" @click="handleMoveSubject(current_row)">编辑</span>
                    <span class="edit" @click="handleUnUseSubject(current_row)">取消重复标记</span>
                    <span class="edit" @click="current_row.freeze===0 ? handleProcessLord(current_row):handleCancelProcessLord(current_row)">{{current_row.freeze === 0 ? '生成待处理项':'取消待处理项'}}</span>
                    <span class="delete" @click="handleDeleteSubject(current_row)">删除</span>
                </span>
            </div>
            <div class="action-bar-right">
                <span>应收金额（元） <i class="edit">234525</i></span>
                <span>实收金额（元） <i class="check">54554</i></span>
                <span>剩余款项（元） <i class="delete">324324</i></span>
            </div>
        </div>
        <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
        <!--房东-->
        <div v-if="chooseTab === 1">
            <lord :searchParams="search_params" @getMultipleSelection="getSelectionVal" :status="action_status" :current_row_info="current_row"></lord>
        </div>
        <!--租客-->
        <div v-if="chooseTab === 2">
            <renter :searchParams="search_params"></renter>
        </div>
        <!--新增-->
        <lj-dialog :visible="add_visible" :size="{width: 960 + 'px',height: 820 + 'px'}" @close="add_visible = false">
            <lord-form v-if="chooseTab===1" :formData="lord_form" :current_row="current_row"></lord-form>
            <renter-form v-if="chooseTab===2" :formData="renter_form" :current_row="current_row"></renter-form>
        </lj-dialog>

    </div>
</template>

<script>
    import SearchHigh from '../../common/searchHigh.vue';
    import lord from './lord/index.vue';
    import renter from './renter/index.vue';
    import pending from './pending/index.vue';
    import LjDialog from '../../common/lj-dialog.vue';
    import FinMenuList from '../components/finMenuList.vue';
    import LjSubject from '../../common/lj-subject.vue';
    import LordForm from "./lord/lordForm.vue";
    import renterForm from "./renter/renterForm.vue";
    import {pendingSearchList,lordRenterSearchList} from "../../../assets/js/allSearchData.js";

    export default {
        name: "index",
        components: {
            LordForm,
            renterForm,
            SearchHigh,
            LjDialog,
            FinMenuList,
            LjSubject,
            lord,
            renter,
            pending,
        },
        data() {
            return {
                pendingSearchList,
                lordRenterSearchList,
                multipleSelection:[],
                action_visible:false,
                chooseTab: 1,
                selects: [
                    {id: 1, title: '房东',},
                    {id: 2, title: '租客',},
                ],
                statusBar: [
                    {iconColor: "#14e731", iconText: "手机"},
                    {iconColor: "#e6a23c", iconText: "姓名"},
                    {iconColor: "#f56c6c", iconText: "地址"},
                ],
                search_params: {},
                current_row: '',//选中当前行
                showSearch: false,
                showFinMenuList: false,
                add_visible: false,
                searchData: {},//搜索项
                lord_form: {
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

                action_status:{
                    delete_visible:false,
                    edit_visible:false,
                    details_visible:false
                }


            }
        },
        mounted() {
        },

        created() {

        },

        watch: {
            current_row:{
                handler(val){
                    console.log(val)
                },
                deep:true
            }
        },
        created() {

        },
        computed: {},
        methods: {
            // 切换
            changeTabs(id) {
                this.chooseTab = id;
            },
            //新增客户
            addCustomer() {
                this.add_visible = true;
                this.current_row = ''
            },
            // 获取选项值
            getSelectionVal(val){
                this.multipleSelection = val;
                if(val.length>0){
                    this.action_visible = true;
                    this.current_row = val[0];
                    console.log(this.current_row);

                }else {
                    this.action_visible = false;
                }
            },
            // 高级搜索
            highSearch(val) {
                this.showSearch = true;
                switch (val) {
                    case 1:
                        this.searchData = this.lordRenterSearchList;
                        break;
                    case 2:
                        this.searchData = this.lordRenterSearchList;
                        break;
                }

            },
            // 确认搜索
            hiddenModule(val) {
                this.showSearch = false;
                if (val !== 'close') {
                    console.log(val);
                    this.search_params = val;
                    this.$bus.emit('getParams', this.search_params);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/finance/customer/index.scss";

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

        }
    }
</style>
