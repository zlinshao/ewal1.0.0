<template>
    <div id="pending">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>待处理项</h1>
                <h2 class="items-center">
          <!--<span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"-->
                <!--:class="{'chooseTab': chooseTab === item.id}">-->
            <!--{{item.title}}<i></i>-->
          <!--</span>-->
                </h2>
            </div>
        </div>
        <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
            <!--列表-->
            <el-table
                    :data="tableData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    header-row-class-name="tableHeader"
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    style="width: 100%">

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
                <!--<el-table-column label="操作" prop="" align="center" >-->
                <!--<template slot-scope="scope">-->
                <!--<el-button type="danger" size="mini">删除</el-button>-->
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

        <!--<SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>-->
        <!--<FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>-->
    </div>

</template>

<script>
    export default {
        name: "pending",
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
                tableData: [],
                count: 0,
                chooseRowIds: [],

            }
        },
        created() {
            // this.$bus.on('getParams', this.handleParams);//搜索参数
        },
        beforeDestroy() {
            // this.$bus.off('getParams', this.handleParams);
        },
        mounted() {
            this.getData();
        },
        methods: {
            // handleParams(val) {
            //     for (let item of Object.keys(this.params)) {
            //         this.params[item] = val[item];
            //         this.params['start_time'] = val['createTime'][0];
            //         this.params['end_time'] = val['createTime'][1];
            //         this.params['limit'] = 12;
            //     }
            //     this.getData();
            // },
            //加载列表
            getData() {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'account_pending', this.params).then(res => {
                    if (res.code === 200) {
                        this.showLoading(false);
                        this.tableData = res.data.data;
                        this.count = res.data.count;
                    }
                })
            },
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getData();
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
        }
    }
</script>

<style scoped>

</style>