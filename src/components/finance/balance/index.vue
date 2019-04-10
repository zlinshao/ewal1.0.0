<template>
    <div id="balance">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>结算</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="new_subject_visible = true"><b>+</b></div>
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="action-bar changeChoose">
            <div class="action-bar-left">
                <el-checkbox>全选</el-checkbox>
                <span class="check-count" v-show="action_visible">已选中 <i>{{multipleSelection.length}}</i> 项</span>
                <span class="action-bar-name" v-show="action_visible">
                    <span class="edit" @click="handleOpenEdit(current_row)">编辑</span>
                    <span class="edit" @click="handleMoveSubject(current_row)">迁移</span>
                    <span class="edit" @click="handleUnUseSubject(current_row)">{{current_row.is_enable===2 ? '禁用' : '启用'}}</span>
                    <span class="delete" @click="handleDeleteSubject(current_row)">删除</span>
                </span>
            </div>
            <div class="action-bar-right">

            </div>
        </div>
        <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
            <el-table
                    :data="balanceData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    header-row-class-name="tableHeader"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">

                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="创建时间" prop="title" align="center"></el-table-column>
                <el-table-column label="交接单编号" prop="fund_amounts" align="center"></el-table-column>
                <el-table-column label="地址" prop="fund_total" align="center"></el-table-column>
                <el-table-column label="结算费用组成" prop="creator.name" align="center"></el-table-column>
                <el-table-column label="账户信息" prop="create_time" align="center"></el-table-column>
                <el-table-column label="发起人" prop="create_time" align="center"></el-table-column>
                <el-table-column label="发起部门" prop="create_time" align="center"></el-table-column>
                <el-table-column label="状态" prop="create_time" align="center"></el-table-column>

            </el-table>
            <footer class="flex-center bottomPage">
                <div class="develop flex-center">
                    <i class="el-icon-d-arrow-right"></i>
                </div>
                <div class="page">
                    <el-pagination
                            :total="count"
                            :current-page="params.page"
                            :page-size="params.limit"
                            layout="total,jumper,prev,pager,next"
                            @current-change="handleChangePage"
                    >
                    </el-pagination>
                </div>
            </footer>
        </div>

        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>

        <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    </div>
</template>

<script>
    import SearchHigh from '../../common/searchHigh.vue';
    import LjDialog from '../../common/lj-dialog.vue';
    import FinMenuList from '../components/finMenuList.vue'

    export default {
        name: "index",
        components: {SearchHigh, FinMenuList, LjDialog},
        data() {
            return {
                params: {
                    er_type: '',
                    parent_id: '',
                    search: '',
                    page: 1,
                    limit: 12
                },
                count:0,
                balanceData:[],
                chooseTab: 1,
                selects: [
                    {id: 1, title: '收房',},
                    {id: 2, title: '租房退租',},
                    {id: 3, title: '收房退租',},
                    {id: 4, title: '租房入住',},
                ],
                showFinMenuList: false,
                chooseRowIds: [],
                showSearch: false,
                searchData: {},
                currentRow: {},
                multipleSelection:[],//多选
                action_visible:false,//操作栏
                current_row:'',

            }
        },
        mounted() {
            // this.getSubjectList();
        },
        activated() {
        },
        watch: {
            multipleSelection:{
                handler(val){

                },
                deep:true
            },
            action_visible:{
                handler(val){

                },
                deep:true
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
            handleChangePage(){

            },

            // getSubjectList() {
            //     this.showLoading(true);
            //     this.$http.get(globalConfig.temporary_server + 'subject', this.params).then(res => {
            //         if (res.code === 200) {
            //             this.showLoading(false);
            //             this.balanceData = res.data.data;
            //             this.count = res.data.count;
            //         }
            //     }).catch(err => {
            //         console.log(err);
            //     })
            // },
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
                // this.searchData = subjectSearch;
            },
            // 确认搜索
            hiddenModule(val) {
                this.showSearch = false;
                if (val !== 'close') {
                    // this.params.er_type = val.er_type;
                    // this.getSubjectList();
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    @import "../../../assets/scss/finance/balance/index.scss";

    @mixin childrenImg($m, $n) {
        $url: '../../../assets/image/finance/balance/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #subject {
            height: 100%;
        }
    }

    #theme_name.theme2 {
        #subject {

        }
    }

    #theme_name.theme3 {
        #subject {

        }
    }

    #theme_name.theme4 {
        #subject {

        }
    }
</style>
