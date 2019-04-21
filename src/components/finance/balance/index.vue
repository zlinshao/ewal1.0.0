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
                <el-table-column label="创建时间" prop="creat_time" align="center"></el-table-column>
                <el-table-column label="交接单编号" prop="number" align="center"></el-table-column>
                <el-table-column label="地址" prop="address" align="center"></el-table-column>
                <el-table-column label="结算费用组成" prop="data" align="center"></el-table-column>
                <el-table-column label="账户信息" prop="account" align="center"></el-table-column>
                <el-table-column label="发起人" prop="name" align="center"></el-table-column>
                <el-table-column label="发起部门" prop="department" align="center"></el-table-column>
                <el-table-column label="状态" prop="status" align="center"></el-table-column>

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
        <!--结算单详情-->
        <lj-dialog :visible="detail_visible" :size="{width: 1200 + 'px',height: 700 + 'px'}"
                   @close="detail_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>结算单详情</h3>
                </div>
                <div class="dialog_main borderBgColor">
                    <div class="balance-detail">
                        <div class="balance-detail-title">
                            <span v-for="(item,index) in tabs"
                                  @click="selectTabs(item.id)"
                                  :class="selectTab===item.id?'activeTab':''"
                            >{{item.title}}</span>
                        </div>

                        <div class="balance-detail-info">
                            <div v-if="selectTab===1" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="收款周期">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="应收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="实收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="备注">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="结算人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="审核人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===2" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="收款周期">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="应收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="实收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="备注">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="结算人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="审核人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===3" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="收款周期">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="应收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="实收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="备注">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="结算人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="审核人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===4" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="收款周期">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="应收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="实收">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="备注">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="结算人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="审核人">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===5" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form" >
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房原因">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="报备内容">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===6" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房原因">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="报备内容">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退房性质">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退款时间">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===7" class="tab">
                                <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="退房原因">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="balance-detail-form-info">
                                        <div class="balance-detail-form-table">
                                            <el-table
                                                    size="small"
                                                    max-height="260"
                                                    :data="balanceDataDetail"
                                                    highlight-current-row
                                                    :row-class-name="tableChooseRow"
                                                    @cell-click="tableClickRow"
                                                    header-row-class-name="tableHeader"
                                                    @selection-change="handleSelectionChange"
                                            >

                                                <el-table-column  label="序号" prop="creat_time" align="center" width="60"></el-table-column>
                                                <el-table-column label="名称" prop="number" align="center" width="60"></el-table-column>
                                                <el-table-column label="金额" prop="address" align="center" width="60"></el-table-column>
                                                <el-table-column label="查看" prop="data" align="center" width="80">
                                                    <template slot-scope="scope">
                                                        <el-button type="danger" plain size="mini" @click="check_visible = true">查看</el-button>
                                                    </template>
                                                </el-table-column>

                                            </el-table>
                                        </div>
                                        <div class="balance-detail-total flex-center">
                                            <span >合计:<span>200</span></span>
                                        </div>

                                    </div>
                                    <div class="balance-detail-form-info">
                                        <el-form-item label="评论">
                                            <el-input v-model="form.name" type="textarea" :rows="10"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-form>

                            </div>
                            <div v-if="selectTab===8" class="tab8">
                                <el-table
                                        size="small"
                                        max-height="340"
                                        style="width:100%"
                                        :data="balanceDataDetail"
                                        highlight-current-row
                                        :row-class-name="tableChooseRow"
                                        @cell-click="tableClickRow"
                                        header-row-class-name="tableHeader"
                                        @selection-change="handleSelectionChange"
                                >

                                    <el-table-column  label="项目" prop="creat_time" align="center" ></el-table-column>
                                    <el-table-column label="金额" prop="number" align="center" ></el-table-column>
                                    <el-table-column label="状态" prop="address" align="center" ></el-table-column>
                                    <el-table-column label="角色" prop="data" align="center" ></el-table-column>
                                    <el-table-column label="是否平账" prop="number" align="center" ></el-table-column>
                                    <el-table-column label="时间" prop="number" align="center" ></el-table-column>
                                    <el-table-column label="备注" prop="number" align="center" ></el-table-column>
                                    <el-table-column label="修改" prop="data" align="center" ></el-table-column>

                                </el-table>
                                <div class="page">
                                    <el-pagination
                                            :total=0
                                            layout="total,jumper,prev,pager,next"
                                            :current-page="params.page"
                                            :page-size="params.limit"
                                            @current-change="handleChangePage"
                                    >
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">通过</el-button>
                    <el-button type="info" size="small" @click="detail_visible = false;current_row = ''">驳回</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--查看-->
        <div class="check-box" v-if="check_visible===true" @click="check_visible=false">
                <div class="check-box-list">
                    <div class="check-box-info">
                        <div>
                            <h3>水费明细</h3>
                            <div>
                                <p><span>上次底数：</span><span>2121.212</span></p>
                                <p><span>本次底数：</span><span>2121.212</span></p>
                                <p><span>单价：</span><span>2121.212</span></p>
                                <p><span>滞纳金：</span><span>2121.212</span></p>
                                <p><span>其他：</span><span>2121.212</span></p>
                                <p><span>合计：</span><span>808</span></p>
                            </div>

                        </div>
                    </div>
                    <div class="check-box-info">
                        <div>
                            <h3>电费明细</h3>
                            <div>
                                <p><span>上次底数：</span><span>2121.212</span></p>
                                <p><span>本次底数：</span><span>2121.212</span></p>
                                <p><span>单价：</span><span>2121.212</span></p>
                                <p><span>滞纳金：</span><span>2121.212</span></p>
                                <p><span>其他：</span><span>2121.212</span></p>
                                <p><span>合计：</span><span>808</span></p>
                            </div>

                        </div>
                    </div>
                    <div class="check-box-info">
                        <div>
                            <h3>燃气费明细</h3>
                            <div>
                                <p><span>上次底数：</span><span>2121.212</span></p>
                                <p><span>本次底数：</span><span>2121.212</span></p>
                                <p><span>单价：</span><span>2121.212</span></p>
                                <p><span>滞纳金：</span><span>2121.212</span></p>
                                <p><span>其他：</span><span>2121.212</span></p>
                                <p><span>合计：</span><span>808</span></p>
                            </div>

                        </div>
                    </div>
                    <div class="check-box-info">
                        <div>
                            <h3>物业费明细</h3>
                            <div>
                                <p><span>物业费：</span><span>2121.212</span></p>
                                <p><span>合同承担方：</span><span>2121.212</span></p>
                                <p><span>实际承担方：</span><span>2121.212</span></p>
                                <p><span>公摊费：</span><span>2121.212</span></p>
                                <p><span>其他：</span><span>2121.212</span></p>
                                <p><span>合计：</span><span>808</span></p>
                            </div>

                        </div>
                    </div>
                    <div class="check-box-info">
                        <div>
                            <h3>维修费明细</h3>
                            <div>
                                <p><span>内容：</span><span>维修维修维修伟新单位 反反复复烦烦烦烦烦烦 烦烦烦烦烦烦</span></p>
                                <p><span>金额：</span><span>2121.212</span></p>
                                <p><span>内容：</span><span>维修维修维修伟新单位 反反复复烦烦烦烦烦烦 烦烦烦烦烦烦</span></p>
                                <p><span>金额：</span><span>2121.212</span></p>
                                <p><span>合计：</span><span>808</span></p>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
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
                check_visible:false,//查看
                balanceDataDetail:[
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },

                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                    {
                        creat_time: 1,
                        number: 32,
                        address: '323',
                        data: '修改',

                    },
                ],
                form: {
                    name: ''
                },
                tabs: [
                    {id: 1, title: '财务收款'},
                    {id: 2, title: '合同收款'},
                    {id: 3, title: '退房信息'},
                    {id: 4, title: '退房原因'},
                    {id: 5, title: '报备内容'},
                    {id: 6, title: '照片'},
                    {id: 7, title: '款项明细'},
                    {id: 8, title: '收付结算'},
                    {id: 9, title: '评论'},
                ],
                selectTab: 1,
                detail_visible: false,
                count: 0,
                balanceData: [
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                    {
                        creat_time: '2019-10-11',
                        number: 2121211,
                        address: '放假就破发票佛阿婆',
                        data: 'fsdfsdfdsfd',
                        account: 4214141,
                        name: '赵丽颖',
                        department: '发阿富汗',
                        status: 1
                    },
                ],
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
                multipleSelection: [],//多选
                action_visible: false,//操作栏
                current_row: '',

            }
        },
        mounted() {
            // this.getSubjectList();
        },
        activated() {
        },
        watch: {
            multipleSelection: {
                handler(val) {

                },
                deep: true
            },
            action_visible: {
                handler(val) {

                },
                deep: true
            }
        },
        computed: {},
        methods: {
            selectTabs(id) {
                this.selectTab = id;
            },
            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (val.length > 0) {
                    this.action_visible = true;
                    this.current_row = val[0];
                } else {
                    this.action_visible = false;
                }
                console.log(val);
            },
            handleChangePage() {

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
                this.detail_visible = true;

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

    @mixin balanceImg($m, $n) {
        $url: '../../../assets/image/finance/' + $n + '/' + $m;
        @include bgImage($url);
    }

    @mixin lj_dialogImg($m, $n) {
        $url: "../../../assets/image/components/" + $n + "/" + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #balance {
            .balance-detail {
                .balance-detail-title {
                    span {
                        @include balanceImg('yiyuedu.png', 'theme1')
                    }

                    .activeTab {
                        @include balanceImg('weiyuedu.png', 'theme1');
                        color: #FFFFFF;
                    }
                }
            }
            .check-box{
                .check-box-list{
                    .check-box-info{
                        @include lj_dialogImg('shu.png', 'theme1');
                    }
                }
            }
        }
    }

    #theme_name.theme2 {
        #balance {

        }
    }

    #theme_name.theme3 {
        #balance {

        }
    }

    #theme_name.theme4 {
        #balance {

        }
    }
</style>
