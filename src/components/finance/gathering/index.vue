<template>
    <div id="gathering">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>收款</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight" v-show="!action_visible">
                <div class="icons add" @click="openAdd"><b>+</b></div>
                <div class="icons bank" @click="openBankRunCompare"></div>
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="action-bar changeChoose">
            <div class="action-bar-left" v-show="action_visible">
                <!--<el-checkbox>全选</el-checkbox>-->
                <span class="check-count" >已选中 <i>{{multipleSelection.length}}</i> 项</span>
                <span class="action-bar-name">
                    <span v-for="(item,index) in btn_group"
                          :key="index"
                          :class="item.class"
                          @click="handleClickBtn(item.key,current_row)">
                        {{item.val}}
                    </span>
                </span>
            </div>
            <div class="action-bar-right">
                <span>应收金额（元） <i class="edit">234525</i></span>
                <span>实收金额（元） <i class="check">54554</i></span>
                <span>剩余款项（元） <i class="delete">324324</i></span>
            </div>
        </div>
        <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
            <el-table
                    :data="tableData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    header-row-class-name="tableHeader"
                    @selection-change="tableDataSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection" width="40">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        v-for="item in Object.keys(showData)" :key="item"
                        align="center"
                        :prop="item"
                        :label="showData[item]">
                </el-table-column>
                <el-table-column label="状态" prop="" align="center" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status === 1?'待入账':scope.row.status === 2?'待结清':scope.row.status === 3?'已结清':scope.row.status===4?'已超额':''}}</span>
                    </template>
                </el-table-column>

            </el-table>
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
        <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该应收款项信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--回滚-->
        <lj-dialog :visible="recall_visible" :size="{width: 900 + 'px',height: 600 + 'px'}"
                   @close="recall_visible = false;current_row = ''">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>回滚</h3>
                </div>
                <div class="dialog_main changeChoose">
                    <el-table
                            :data="running_account_record"
                            :row-class-name="tableChooseRow"
                            @cell-click="tableClickRow"
                            header-row-class-name="tableHeader"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>

                        <el-table-column align="center" label="ID" prop="id">
                        </el-table-column>
                        <el-table-column align="center" label="明细" prop="desc">
                        </el-table-column>


                    </el-table>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="running_account_count"
                                layout="total,jumper,prev,pager,next"
                                :current-page="running_account_params.page"
                                :page-size="running_account_params.limit"
                                @current-change="handleChangePage_runningAccount"
                        >
                        </el-pagination>
                    </div>
                </div>

                <div class="dialog_footer">

                    <el-button type="danger" size="small" @click="handleOkRecall">确定</el-button>
                    <el-button type="info" size="small" @click="recall_visible = false;current_row = '';">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--应收入账-->
        <lj-dialog
                :visible="receive_visible"
                :size="{width: 600 + 'px',height: 800 + 'px'}"
                @close="receive_visible = false">
            <div class="dialog_container">
                <div class="dialog_header flex">
                    <h3>应收入账</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form :model="receive_form" label-width="80px">
                        <!--<el-form-item label="款项来源">-->
                            <!--<span>{{receive_form.current_address}}</span>-->
                        <!--</el-form-item>-->
                        <el-form-item label="款项来源">
                            <el-select v-model="receive_form.identity" placeholder="请选择" disabled>
                                <el-option v-for="item in identityData" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款时间">
                            <el-date-picker
                                    class="all_width"
                                    disabled
                                    v-model="receive_form.pay_date"
                                    placeholder="请选择付款时间"
                                    type="datetime"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="客户姓名">
                            <el-input v-model="receive_form.customer_name"  disabled></el-input>
                        </el-form-item>
                        <el-form-item label="付款方式">
                            <el-select placeholder="请选择" v-model="receive_form.pay_type" @change="getAccount">
                                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="账户">
                            <el-select class="all_width" v-model="receive_form.account_id">
                                <el-option v-for="(item,index) in accountLists" :label="item.name"
                                           :value="item.id"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="应收金额">
                            <el-input v-model="receive_form.amount_receivable" type="number" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="收款金额">
                            <el-input v-model="receive_form.amount_received" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="剩余款项">
                            <el-input v-model="receive_form.balance" type="number" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="补齐时间">
                            <el-date-picker
                                    class="all_width"
                                    disabled
                                    v-model="receive_form.complete_date"
                                    placeholder="请选择付款时间"
                                    type="datetime"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="付款时间">
                            <el-date-picker
                                    class="all_width"
                                    v-model="receive_form.pay_date"
                                    placeholder="请选择付款时间"
                                    type="datetime"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="收款人员">
                            <el-input  v-model="receive_form.staff_name" disabled></el-input>
                        </el-form-item>

                        <el-form-item label="备注">
                            <el-input
                                    v-model="receive_form.remark"
                                    type="textarea"
                                    placeholder="请输入"
                                    :rows="4"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer flex-center">
                    <el-button size="small" type="danger" @click="handleOkReceive">确定</el-button>
                    <el-button size="small" type="normal" @click="receive_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增应收款项-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增</h3>
                </div>
                <div class="dialog_main borderNone">

                    <el-form :model="addForm"  label-width="80px">
                        <el-form-item label="客户名称">
                            <el-input placeholder="请点击选择客户名称" v-model="addForm.customer_name"
                                      @focus="openCustomer" readonly="readonly"></el-input>
                        </el-form-item>
                        <el-form-item label="客户身份">
                            <el-input placeholder="请点击选择客户名称"
                                      :disabled="true"
                                      :value="addForm.customer_identity===1?'业主':addForm.customer_identity===2?'租客':''"></el-input>
                        </el-form-item>
                        <el-form-item label="付款时间">
                            <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="addForm.pay_date" type="date" placeholder="请输入">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="款项">
                            <el-select v-model="addForm.identity" placeholder="请选择">
                                <el-option v-for="item in identityData" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款金额">
                            <el-input placeholder="请输入" v-model="addForm.amount_receivable"
                                      type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="科目">
                            <el-input placeholder="请输入" v-model="addForm.subject_name"
                                      @focus="handleOpenSubject('subject')"></el-input>
                        </el-form-item>

                        <el-form-item label="详情">
                            <el-input placeholder="请输入" v-model="addForm.description"
                                      type="textarea" :rows="4"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input placeholder="请输入" v-model="addForm.remark" type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-form>

                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkAdd()">确定</el-button>
                    <el-button type="info" size="small" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--科目-->
        <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject" style="z-index: 1000"></lj-subject>

        <!--跟进记录列表-->
        <lj-dialog
                :visible="record_visible"
                :size="'small'"
                @close="record_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>跟进记录</h3>
                    <span class="add_mark"
                          @click="add_record_visible = true;new_record.flow_staff_id='';new_record.flow_up_type='';new_record.remark='';new_record.address='';new_record.flow_staff_name=''">+</span>
                </div>
                <div class="dialog_main">
                    <div class="address">{{current_address}}</div>
                    <div class="record">
                        <el-table
                                :data="record_data"
                        >
                            <el-table-column label="跟进时间" prop="create_time" show-overflow-tooltip
                                             align="center"></el-table-column>
                            <el-table-column label="跟进发起人" prop="creator.name" align="center"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column label="当前跟进人" prop="flow_staff.name" align="center"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column label="跟进类型" prop="" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.flow_up_type===3 ? '贴条': scope.row.flow_up_type===5 ?'换锁':''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="跟进状态" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.flow_up_status===3 ? '已响应' :scope.row.flow_up_status ===5 ? '未响应':''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="款项名目" prop="address" align="center"
                                             show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="record_data_count"
                                layout="total,jumper,prev,pager,next"
                                :current-page="record_data_params.page"
                                :page-size="record_data_params.limit"
                                @current-change="handleChangePage_recordData"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </lj-dialog>

        <!--新增跟进任务-->
        <lj-dialog
                :visible="add_record_visible"
                :size="{width: 500 + 'px' ,height: 520 + 'px'}"
                @close="add_record_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增跟进</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form :mode="new_record" label-width="80px">
                        <el-form-item label="跟进人">
                            <el-input v-model="new_record.flow_staff_name" @focus="openStaff" readonly  ></el-input>
                        </el-form-item>
                        <el-form-item label="跟进类型">
                            <el-select v-model="new_record.flow_up_type">
                                <el-option v-for="(item,index) in categoryList" :key="index" :label="item.title"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注内容">
                            <el-input type="textarea" v-model="new_record.remark"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="new_record.address"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postNewRecord()">确定</el-button>
                    <el-button size="small" @click="add_record_visible=false;">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--催缴备注列表-->
        <lj-dialog
                :visible="mark_visible"
                :size="'small'"
                @close="mark_visible = false">
            <div class="dialog_container">
                <div class="dialog_header flex">
                    <h3>催缴备注列表</h3>
                    <span class="add_mark" @click="new_mark_visible = true;new_mark={}">+</span>
                </div>
                <div class="dialog_main">
                    <div class="address">{{current_address}}</div>
                    <div class="record">
                        <el-table
                                :data="mark_data"
                        >
                            <el-table-column label="备注时间" prop="create_time" align="center"></el-table-column>
                            <el-table-column label="备注内容" prop="content" align="center"></el-table-column>
                            <el-table-column label="备注人" prop="staff_name" align="center"></el-table-column>
                            <el-table-column label="备注类型" prop="category" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="mark_data_count"
                                layout="total,jumper,prev,pager,next"
                                :current-page="mark_data_params.page"
                                :page-size="mark_data_params.limit"
                                @current-change="handleChangePage_markData"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </lj-dialog>
        <!--开收据列表-->
        <lj-dialog
                :visible="receipt_visible"
                :size="'small'"
                @close="receipt_visible = false">
            <div class="dialog_container">
                <div class="dialog_header flex">
                    <h3>开收据</h3>
                </div>
                <div class="dialog_main changeChoose">
                    <div class="record">
                        <el-table
                                :data="receiptData"
                                highlight-current-row
                                :row-class-name="tableChooseRow"
                                @cell-click="tableClickRow"
                                header-row-class-name="tableHeader"
                                @selection-change="receiptSelectionChange"
                        >
                            <el-table-column
                                    type="selection" width="40">
                            </el-table-column>
                            <el-table-column label="实收金额" prop="amount_received" align="center"></el-table-column>
                            <el-table-column label="时间" prop="operate_time" align="center"></el-table-column>
                            <el-table-column label="账户" prop="account_id" align="center"></el-table-column>
                            <el-table-column label="状态"  align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.is_receipt===1?'已开':'未开'}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="count"
                                layout="total,prev,pager,next"
                        ></el-pagination>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button size="mini" type="danger" @click="handleReceiptOk">确定</el-button>
                    <el-button size="mini" @click="receipt_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增催缴备注-->
        <lj-dialog
                :visible="new_mark_visible"
                :size="{width: 500 + 'px' ,height: 520 + 'px'}"
                @close="new_mark_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增备注</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form :mode="new_mark" label-width="80px">
                        <el-form-item label="备注内容">
                            <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
                        </el-form-item>
                        <el-form-item label="备注类型">
                            <el-button
                                    v-for="(index,item) in categoryList"
                                    :key="item" style="margin-bottom: 10px"
                                    @click="getCategory(index.value)"
                            >{{index.title}}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postReceivable_tag()">确定</el-button>
                    <el-button size="small" @click="new_mark_visible=false;">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--登记收款-->
        <lj-dialog
                :visible="register_visible"
                :size="{width: 500 + 'px',height: 580 + 'px'}"
                @close="register_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>登记收款</h3>
                </div>
                <div class="dialog_main borderNone" style="padding-top: 10px">
                    <el-form :model="register_from" label-width="80px">
                        <el-form-item label="选择图片">
                            <lj-upload v-model="register_from.file_info" size="40"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                        <el-form-item label="房屋地址">
                            <el-input v-model="register_from.address"></el-input>
                        </el-form-item>
                        <el-form-item label="付款方式">
                            <el-select placeholder="请选择" v-model="register_from.pay_type" @change="getAccount">
                                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="账户">
                            <el-select class="all_width" v-model="register_from.account_id">
                                <el-option v-for="(item,index) in accountLists" :label="item.name"
                                           :value="item.id"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款金额">
                            <el-input v-model="register_from.amount" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="收款时间">
                            <el-date-picker
                                    class="all_width"
                                    value-format="yyyy-MM-dd"
                                    v-model="register_from.collection_time"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="收款金额">
                            <el-input v-model="register_from.remark" type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="mini" type="danger" @click="registrate()">迁移</el-button>
                    <el-button size="mini" @click="register_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
        <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>
        <customer :module="customerModule" @close="hiddenCustomer"></customer>

        <!--对比银行流水-->
        <lj-dialog
                :visible="compare_visible"
                :size="{width: 1500 + 'px' ,height: 800 + 'px'}"
                @close="compare_visible = false">
            <div class="dialog_container">
                <div class="dialog_header justify-bet">
                    <h3><span>收款记录</span></h3>
                    <h3><span>银行流水</span></h3>
                </div>
                <div class="dialog_main">
                    <div class="bank-compare">
                        <div class="bank-left">
                            <div class="">
                                <span>
                                    <i v-for="item in bankRun_type"
                                       @click="chooseBankType(item.value)"
                                       :class="chooseTabI===item.value?'activeI':''">{{item.title}}</i>
                                </span>
                            </div>
                            <el-table
                                    :data="compareData"
                            >
                                <el-table-column label="款项名目" prop="create_time" align="center"></el-table-column>
                                <el-table-column label="收款金额" prop="amount" align="center"></el-table-column>
                                <el-table-column label="收款时间" prop="collection_time" align="center"></el-table-column>
                                <el-table-column label="账户" prop="account.account_num" align="center"></el-table-column>
                                <el-table-column label="截图" prop="category" align="center"></el-table-column>
                                <el-table-column label="操作" prop="category" align="center">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="handleCompareBankRun(scope.row.id)" type="danger">对比银行流水</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="bank-right borderNone">
                            <el-form label-width="120px" :inline="true">
                                <el-form-item label="时间误差数">
                                    <el-input type="number" size="small" v-model="compareBankParams.date_deviation"></el-input>
                                </el-form-item>
                                <el-form-item label="金额误差数">
                                    <el-input type="number" size="small" v-model="compareBankParams.amount_deviation"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-form label-width="120px" :inline="true">
                                <el-form-item label="时间误差类型">
                                    <el-button
                                            size="mini"
                                            v-for="(index,item) in date_deviation"
                                            :key="item" style="margin-bottom: 10px"
                                            :class="buttonChoose_date===index.value?'active':''"
                                            @click.stop="get_date_deviation(index.value)"
                                    >{{index.title}}
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="权重">
                                    <el-button
                                            size="mini"
                                            v-for="(index,item) in order"
                                            :class="buttonChoose_order===index.value?'active':''"
                                            :key="item" style="margin-bottom: 10px"
                                            @click.stop="getOrder(index.value)"
                                    >{{index.title}}
                                    </el-button>
                                </el-form-item>
                            </el-form>

                            <el-table
                                    :data="compareBankData"
                            >
                                <el-table-column label="打款时间" prop="create_time" align="center"></el-table-column>
                                <el-table-column label="收入金额" prop="amount" align="center"></el-table-column>
                                <el-table-column label="备注" prop="collection_time" align="center"></el-table-column>
                                <el-table-column label="所属银行" prop="account.account_num" align="center"></el-table-column>
                                <el-table-column label="操作"  align="center">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="" type="danger">入账</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="compareCount"
                                layout="total,jumper,prev,pager,next"
                                :current-page="compareParams.page"
                                :page-size="compareParams.limit"
                                @current-change="handleCompareChangePage"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>

<script>
    import SearchHigh from '../../common/searchHigh.vue';
    import LjDialog from '../../common/lj-dialog.vue';
    import FinMenuList from '../components/finMenuList.vue';
    import LjSubject from '../../common/lj-subject.vue';
    import CustomerLists from '../components/customerLists.vue';
    import {gatheringSearchList} from "../../../assets/js/allSearchData.js";
    import StaffOrgan from '../../common/staffOrgan.vue';
    import LjUpload from '../../common/lightweightComponents/lj-upload';
    import HouseFilter from '../../marketCentre/components/house-filter.vue';

    import Customer from '../../common/customer.vue';


    export default {
        name: "",
        components: {
            SearchHigh,
            LjDialog,
            FinMenuList,
            LjSubject,
            CustomerLists,
            LjUpload,
            StaffOrgan,
            HouseFilter,
            Customer,

        },
        data() {
            return {
                gatheringSearchList,
                action_visible:false,//操作栏作态
                compare_visible:false,//流水对比
                checkList:[],
                customerModule:false,//客户
                identityData:[//款项
                    {id:1,name:'房东'},
                    {id:2,name:'租客'},
                    {id:3,name:'未知客户'},
                    {id:5,name:'结算单'},
                    {id:6,name:'片区费用'},
                    {id:7,name:'报备费用'},
                    {id:8,name:'应收款项'},
                ],
                mark_data_params:{
                  page:1,
                  limit:12,
                },
                params: {
                    is_del: '',
                    staff_ids: '',
                    department_ids: '',
                    status: '',
                    startRange: '',
                    endRange: '',
                    tag_status: '',
                    startTag: '',
                    endTag: '',
                    subject_id: '',
                    search: '',
                    minPrice: '',
                    maxPrice: '',
                    page: 1,
                    limit: 12,
                    export: '',
                    cate: '',
                    is_deposit:'',
                    is_tail_fund:'',
                    is_rank_rent:'',

                },
                btnData: [],
                current_address: '',
                current_row: '',
                showFinMenuList: false,
                receipt_visible:false,//开收据
                delete_visible: false,//删除
                add_visible: false,//新增
                recall_visible: false,//回滚
                receive_visible: false, //应收入账
                record_visible: false, //跟进记录
                add_record_visible: false,//新增跟进
                mark_visible: false, //备注列表
                new_mark_visible: false, //新增备注
                register_visible: false, //登记收款
                register_size: '',
                staffModule:false,//员工组件
                running_account_record: [],//回滚数据
                running_account_count:0,
                ra_ids: [],//回滚id
                running_account_params:{
                  limit:6,
                  page: 1,
                },

                subject_visible: false,//科目
                which_subject: '',
                new_subject_visible: false,
                subject: {
                    parent_id: '',
                    title: '',
                    er_type: '',
                    remark: '',
                    parent_name: '',
                    subject_code: ''
                },
                move_visible: false,
                move_subject: {
                    initial: '',
                    parent_id: '',
                    title: ''
                },

                addForm: {
                    customer_id: '',//客户id
                    amount_receivable: '',//金额
                    description: '',//描述
                    remark: '',
                    customer_identity:'',//客户身份
                    identity: '',//款项
                    pay_date: '',//付款时间
                    subject_id: '',//科目id
                    customer_name: '',
                    subject_name:'',//科目名
                },
                rules: {
                    amount_payable: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                },
                types: [
                    {title: "业主", value: 1},
                    {title: "租客", value: 2}
                ],

                register_from: {//登记收款
                    // fund_id: '',
                    // collect_img: [],
                    // account_id: '',
                    // amount: '',
                    // collection_time: '',
                    // address: '',
                    // remark: '',
                    // file_info:[],
                },
                new_mark: {
                    content: '',
                    category: '',
                },
                categoryList: [
                    // {title: "违约", value: 1},
                    // {title: "延期", value: 2},
                    {title: "贴条", value: 3},
                    // {title: "维修", value: 4},
                    {title: "换锁", value: 5},
                    // {title: "资金", value: 6},
                    // {title: "炸单", value: 7},
                    // {title: "调房", value: 8},
                    // {title: "特殊情况", value: 9},
                ],
                date_deviation:[//时间误差
                    {title: "天", value: 5},
                    {title: "分钟", value: 3},
                ],
                order:[//权重
                    {title: "时间", value: 6},
                    {title: "金额", value: 4},
                ],
                showSearch: false,
                chooseTab: 1,
                selects: [
                    {
                        id: 1,
                        title: '全部',
                    },
                    {
                        id: 2,
                        title: '定金',
                    },

                    {
                        id: 3,
                        title: '尾款',
                    },
                    {
                        id: 4,
                        title: '房租',
                    },

                ],
                tableData: [],
                count: 0,

                showData: {
                    "pay_date": '收款时间',
                    "subject.title": '应收科目',
                    "customer.address": "地址",
                    "amount_receivable": '应收金额',
                    "amount_received": '实收金额',
                    "balance": '剩余金额',
                    "complete_date": '补齐时间',
                    "description.description": '明细详情',
                    // "remark": "备注",
                    // "receTag": "催缴备注"
                },
                btn_group: [
                    {val: '跟进列表', key: 'record', type: 'success',class:'edit'},
                    {val: '催缴备注', key: 'mark', type: 'danger',class:'edit'},
                    {val: '登记收款', key: 'register', type: 'warning',class:'edit'},
                    {val: '应收入账', key: 'should_receive', type: 'success',class:'edit'},
                    {val: '开收据', key: 'receipt', type: 'edit',class:'edit'},
                    {val: '回滚', key: 'handleProcess', type: 'success',class:'edit'},
                    {val: '删除', key: 'handleDelete', type: 'success',class:'delete'},

                ],
                searchData: {},

                amount_receivable: '',//应收
                chooseRowIds: [],

                receive_form: {//应收入账
                },
                receiveName:'',//收款人


                record_data: [],//跟进列表
                record_data_count: 0,
                record_data_params:{
                  limit:12,
                  page:1,
                },
                mark_data: [],
                mark_data_count: 0,
                new_record: {
                    flow_staff_id: '',//跟进人id
                    flow_up_type: '',//跟进类型
                    fund_id: '',//收款id
                    remark: '',
                    address: '',
                    flow_staff_name:'',
                },

                registerData: [],//登记列表
                accountLists: [],
                cate: [
                    {title: "银行卡", value: 1,},
                    {title: "支付宝", value: 2,},
                    {title: "微信", value: 3,},
                    {title: "银行卡(数据来自房管中心)", value: 4,},
                ],
                multipleSelection: [],//多选
                receiptData:[],//电子收据
                running_ids:[],//流水ids
                compareParams:{
                    limit:12,
                    page:1,
                    status:''
                },
                compareData:[],
                compareCount:0,

                compareBankData:[],//匹配后的数据
                compareBankParams:{},
                buttonChoose_date:'',
                buttonChoose_order:'',
                bankRun_type: [
                    {title: "已匹配", value: 3},
                    {title: "未匹配", value: 5},
                    {title: "未找到", value: 7},
                    {title: "未开始", value: 9},
                ],
                chooseTabI:'',

            }
        },
        mounted() {
            this.getReceiveList();
        },
        activated() {
        },
        watch: {
            new_mark: {
                handler(val) {
                    console.log(val)
                },
                deep:true
            },

        },
        computed: {},
        methods: {
            openAdd(){
                this.add_visible = true;
                for(let item of Object.keys(this.addForm)){
                    this.addForm[item] = '';
                }

            },
            chooseBankType(id){
                this.chooseTabI=id;
            },

            hiddenCustomer(val){//获取客户
                this.customerModule=false;
                console.log(val);
                this.addForm.customer_name = val.name;
                this.addForm.customer_identity = val.identity;
                this.addForm.customer_id = val.id;

            },
            get_date_deviation(val) {
                this.compareBankParams.select=val;
                this.buttonChoose_date=val;
            },
            getOrder(val){
                this.compareBankParams.order=val;
                this.buttonChoose_order=val;
            },
            handleCompareChangePage(page){
              this.compareParams.page=page;
              this.getCompareDataLists();
            },
            getCompareDataLists(){//获取登记记录
                this.$http.get(globalConfig.temporary_server + 'registration',this.compareParams).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.compareData = res.data.data;
                        this.compareCount = res.data.count;
                    }else{

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            openBankRunCompare(){//流水对比
                this.compare_visible=true;
                this.getCompareDataLists();
            },
            handleCompareBankRun(id){//确认流水对比
              let paramsForm={
                  date_deviation:this.compareBankParams.date_deviation,
                  select:this.compareBankParams.select,
                  amount_deviation:this.compareBankParams.amount_deviation,
                  order:this.compareBankParams.order,
              };

                this.$http.put(globalConfig.temporary_server + 'registration/match/'+id,paramsForm).then(res => {
                    if (res.code === 200) {
                        console.log(res)
                    }else{
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            openCustomer(){
              this.customerModule=true;
            },
            tableDataSelectionChange(val) {//首页多选
                this.multipleSelection = val;
                if(val.length>0){
                    this.action_visible = true;
                    this.current_row = val[0];//当前选择赋值
                }else {
                    this.action_visible = false;
                }

            },
            receiptSelectionChange(val){//电子收据
                this.multipleSelection = val;
                let ids = [];
                this.running_ids=[];
                for (let item of this.multipleSelection){
                    ids.push(item.id)
                }
                this.running_ids = ids;
                console.log(this.running_ids)

            },
            handleReceiptOk(){//确认生成电子数据
                console.log(this.running_ids);
                let paramsForm={
                    "ra_ids":this.running_ids,
                    "fund_id":this.current_row.id,//款项id
                    "fund_type":1,
                    "remark":''
                };
                this.$http.post(globalConfig.temporary_server + 'receipt',paramsForm).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: "操作成功",
                            subMessage: '',
                        });
                        this.getReceiptDataLists();
                    }else{
                        this.$LjNotify('error', {
                            title: '失败',
                            message: "操作失败",
                            subMessage: '',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            openStaff(){
               this.staffModule = true;
            },
            //员工
            hiddenStaff(ids, names, arr) {
                this.staffModule = false;
                // console.log(ids, names, arr);
                if (ids !== 'close') {
                    this.new_record.flow_staff_name = names;
                    this.new_record.flow_staff_id = ids[0];
                }
            },

            changeTabs(id) {
                this.chooseTab = id;
                switch (id) {
                    case 1:
                        this.params.is_deposit = '';//定金
                        this.params.is_tail_fund = '';//尾款
                        this.params.is_rank_rent = '';//房租
                        this.tableData = [];
                        this.getReceiveList();
                        break;
                    case 2:
                        this.params.is_deposit = 2;
                        this.params.is_tail_fund = '';
                        this.params.is_rank_rent = '';//房租
                        this.tableData = [];
                        this.getReceiveList();
                        break;
                    case 3:
                        this.params.is_deposit = '';
                        this.params.is_tail_fund = 2;
                        this.params.is_rank_rent = '';//房租
                        this.tableData = [];
                        this.getReceiveList();
                        break;
                    case 4:
                        this.params.is_deposit = '';
                        this.params.is_tail_fund = '';
                        this.params.is_rank_rent = 2;//房租
                        this.tableData = [];
                        this.getReceiveList();
                        break;
                }
            },


            registrate() {// 新增登记收款
                let paramsForm={
                    fund_id:this.current_row.id,
                    collect_img:this.register_from.file_info,
                    account_id:this.register_from.account_id,
                    amount:this.register_from.amount,
                    collection_time:this.register_from.collection_time,
                    address:this.register_from.address,
                    remark:this.register_from.remark,
                };
                this.$http.post(globalConfig.temporary_server + 'registration', paramsForm).then(res => {
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.getReceiveList();
                        this.register_visible = false;
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
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

            //删除
            handleOkDel() {
                this.$http.delete(globalConfig.temporary_server + 'account_receivable/delete/' + this.current_row.id).then(res => {
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.delete_visible = false;
                        this.current_row = '';
                        this.getReceiveList();
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            handleDelete(row) {
                this.current_row = row;
                this.delete_visible = true;
            },
            // 多选
            handleSelectionChange(val) {
                this.ra_ids = [];
                this.multipleSelection = val;
                console.log(val);
                for (let item in val) {
                    this.ra_ids.push(val[item].id);
                }
                console.log(this.ra_ids);
            },

            handleProcess(row) {//回滚表单
                this.running_account_record = [];
                for (let item in row.running_account_record) {
                    this.running_account_record.push({id: item, desc: row.running_account_record[item]});
                }
                this.running_account_count = this.running_account_record.length;
            },
            handleChangePage_runningAccount(page){
                this.running_account_params.page=page;
            },

            //确认回滚
            handleOkRecall() {
                this.$http.put(globalConfig.temporary_server + 'account_receivable/revert/' + this.current_row.id, {ra_id: this.ra_ids}).then(res => {

                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.recall_visible = false;

                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getReceiveList();
            },


            getReceivable_follow() {//加载跟进列表
                this.$http.get(globalConfig.temporary_server + 'receivable_follow',).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.record_data = res.data.data;
                        this.record_data_count = res.data.count;
                    }else{
                        this.record_data = [];
                        this.record_data_count = 0;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleChangePage_recordData(page){//跟进列表分页
                this.record_data_params.page=page;
                this.getReceivable_follow();
            },

            getReceiptDataLists(){//通过款项获取银流水
                // this.showLoading(true);
                let ids = [];
                ids.push(this.current_row.id);
                console.log(ids);
                let paramsForm = {
                    fund_id:ids,
                    cate:1
                };
                this.$http.put(globalConfig.temporary_server + 'fund_flow_record/fund_flow', paramsForm).then(res => {
                    this.showLoading(false);
                    if (res.code === 200) {
                        this.receiptData = res.data.data;
                        this.count = res.data.count;
                        console.log(this.receiptData)
                    }else{
                        this.tableData = [];
                        this.count = 0;
                    }
                })
            },

            //新增跟进
            postNewRecord() {
                this.$http.post(globalConfig.temporary_server + 'receivable_follow', this.new_record).then(res => {
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.add_record_visible = false;
                        this.getReceivable_follow();
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            getReceivable_tag(id) {//加载催缴备注列表
                this.$http.get(globalConfig.temporary_server + 'receivable_tag', {fund_id: id}).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.mark_data = res.data.data;
                        this.mark_data_count = res.data.count;
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleChangePage_markData(page){//催缴备注分页
              this.mark_data_params.page=page;
              this.getReceivable_tag(this.current_row.id);
            },
            postReceivable_tag() {//新增催缴备注
                this.$http.post(globalConfig.temporary_server + 'account_receivable/urge_tag/' + this.current_row.id, this.new_mark).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.new_mark_visible = false;

                        this.getReceivable_tag(this.current_row.id);
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getAccount() {
                this.$http.get(globalConfig.temporary_server + "account", this.params).then(res => {
                    if (res.code === 200) {
                        this.accountLists = res.data.data;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            handleOkReceive() {//应收入账
                let paramsForm={
                    account_id:this.receive_form.account_id,
                    amount_received:this.receive_form.amount_received,
                    pay_date:this.receive_form.pay_date,
                    remark:this.receive_form.remark,
                };
                this.$http.put(globalConfig.temporary_server + 'account_receivable/receive/' + this.current_row.id, paramsForm).then(res => {
                    if (res.code === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.receive_visible = false;
                        this.getReceiveList();
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })

            },


            handleOkAdd() {//新增应收款项
                let paramsForm={
                    customer_id:this.addForm.customer_id,
                    identity:this.addForm.identity,
                    pay_date:this.addForm.pay_date,
                    description:this.addForm.description,
                    amount_receivable:this.addForm.amount_receivable,
                    subject_id:this.addForm.subject_id,
                    remark:this.addForm.remark,
                };
                this.$http.post(globalConfig.temporary_server + 'account_receivable', paramsForm).then(res => {
                    if(res.code===200){
                        this.add_visible = false;
                        this.$LjNotify('success', {
                            title: '成功',
                            message: "操作成功",
                            subMessage: '',
                        });
                        this.getReceiveList();

                    }else{
                        this.$LjNotify('error', {
                            title: '失败',
                            message: "操作失败",
                            subMessage: '',
                        });
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            getReceiveList() {//加载应收款列表
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'account_receivable', this.params).then(res => {
                    this.showLoading(false);
                    if (res.code === 200) {
                        this.tableData = res.data.data;
                        this.count = res.data.count;
                    }else{
                        this.tableData = [];
                        this.count = 0;
                    }
                })
            },
            handleClickBtn(key, row) {//表单操作栏

                if (key === 'should_receive') {//应收入账
                    this.receive_visible = true;
                    this.receive_form = row;
                    this.receive_form.customer_name = row.customer.customer_name;
                    this.receive_form.staff_name = row.staff.name;
                    console.log(row)
                }
                if (key === 'record') {
                    this.record_visible = true;
                    this.getReceivable_follow();
                    this.new_record.fund_id = row.id;
                    this.new_record.address = row.address;
                }
                if (key === 'mark') {
                    this.mark_visible = true;
                    this.getReceivable_tag(row.id);

                }
                if(key === 'receipt'){//开收据
                    this.receipt_visible = true;
                    this.getReceiptDataLists();

                }
                if (key === 'register') {//登记收款
                    this.register_size = 'mini';
                    this.register_visible = true;
                }
                if (key === 'handleProcess') {//回滚
                    this.recall_visible = true;
                    this.handleProcess(row);
                }
                if (key === 'handleDelete') {
                    this.delete_visible = true;
                }
            },

            // 高级搜索
            highSearch() {
                this.showSearch = true;
                this.searchData = this.gatheringSearchList;
            },
            // 确认搜索
            hiddenModule(val) {
                this.showSearch = false;
                if (val !== 'close') {
                    console.log(val);
                    for (let item of Object.keys(this.params)) {
                        this.params[item] = val[item];
                    }
                    if (val.gatherDate) {
                        this.params.startRange = val.gatherDate[0];
                        this.params.endRange = val.gatherDate[1];
                    }
                    if (val.tagDate) {
                        this.params.startTag = val.tagDate[0];
                        this.params.endTag = val.tagDate[1];
                    }
                    this.params.staff_ids = val.staff;
                    this.params.department_ids = val.department;
                    console.log(this.params);
                    this.getReceiveList();
                }

            },
            handleOpenSubject(which) {
                this.which_subject = which;
                this.subject_visible = true;
            },
            //科目确定
            handleConfirmSubject(val) {
                if (this.which_subject === 'move_subject') {
                    this.move_subject.parent_id = val.id;
                    this.move_subject.title = val.title;
                }
                if (this.which_subject === 'subject') {
                    this.subject.parent_name = val.title;
                    this.subject.parent_id = val.id;
                    this.addForm.subject_id = val.id;
                    this.addForm.subject_name = val.title;

                    this.formData.subject_id = val.id;
                    this.formData.subject_val = val.title;

                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/finance/gatherring/index.scss";

    @mixin financeImg($m,$n) {
        $url: '../../../assets/image/finance/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name {
        #gathering {
            > div {
                .listTopRight {
                    .home_icon {
                        @include financeImg('yinhanglius.png', 'theme1');
                    }
                }
            }
        }
        .bank-compare{

            .bank-left{

                span{

                    i{
                        @include financeImg('yiyuedu.png', 'theme1');
                    }
                }
                .activeI{
                    @include financeImg('weiyuedu.png', 'theme1');
                    color:#FFFFFF;
                }
            }
            .bank-right{
                width: 50%;
                height: 600px;
            }
            .active{
                background: #ff4545;
                color:#FFFFFF;
            }

        }
    }
</style>
