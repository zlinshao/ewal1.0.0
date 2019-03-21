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
            <div class="items-center listTopRight">
                <!--<div class="icons home_icon"></div>-->
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
            <el-table
                    :data="tableData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    :row-class-name="tableChooseRow"
                    @cell-click="tableClickRow"
                    header-row-class-name="tableHeader"
                    style="width: 100%">
                <el-table-column
                        show-overflow-tooltip
                        v-for="item in Object.keys(showData)" :key="item"
                        align="center"
                        :prop="item"
                        :label="showData[item]">
                </el-table-column>
                <el-table-column label="状态" prop="" align="center" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status === 1 ? '待入账' : '已结清'}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        width="100"
                        v-for="(item,key) in btn_group"
                        :key="key"
                        :label="item.val"
                        align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" :type="item.type" @click="handleClickBtn(item.key,scope.row)">
                            {{ item.val }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="" align="center">
                    <template slot-scope="scope">
                        <el-button v-for="(item,index) in btnData"
                                   :key="index"
                                   :type="item.type"
                                   size="mini"
                                   @click="clkCall(item.methods,scope.row,scope.$index)">
                            {{item.label}}
                        </el-button>
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
        <lj-dialog :visible="recall_visible" :size="{width: 600 + 'px',height: 500 + 'px'}"
                   @close="recall_visible = false;current_row = ''">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>回滚</h3>
                </div>
                <div class="dialog_main">
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

                        <el-table-column  align="center" label="ID" prop="id">
                        </el-table-column>
                        <el-table-column  align="center" label="明细" prop="desc">
                        </el-table-column>


                    </el-table>
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
                :size="{width: 500 + 'px',height: 600 + 'px'}"
                @close="receive_visible = false">
            <div class="dialog_container">
                <div class="dialog_header flex">
                    <h3>应收入账</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="receive_form" size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_come"></i>
                                    </b>
                                    <span>款项来源</span>
                                </div>
                                <div class="item_content">
                                    <span>{{current_address}}</span>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款方式</span>
                                </div>
                                <div class="item_content">
                                    <el-select placeholder="请选择" v-model="params.cate" @change="getAccount">
                                        <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                                                   :key="index"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>账户</span>
                                </div>
                                <div class="item_content">
                                    <el-select class="all_width" v-model="receive_form.account_id">
                                        <el-option v-for="(item,index) in accountLists" :label="item.name" :value="item.id"
                                                   :key="index"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <!--<el-form-item>-->
                            <!--<div class="form_item_container">-->
                                <!--<div class="item_label">-->
                                    <!--<b class="item_icons">-->
                                        <!--<i class="icon_subject"></i>-->
                                    <!--</b>-->
                                    <!--<span>款项科目</span>-->
                                <!--</div>-->
                                <!--<div class="item_content">-->
                                    <!--<el-select class="all_width" v-model="receive_form.subject_name">-->
                                        <!--<el-option label="中介费" value="1"></el-option>-->
                                        <!--<el-option label="租房房租" value="2"></el-option>-->
                                    <!--</el-select>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</el-form-item>-->
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_money"></i>
                                    </b>
                                    <span>应收金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="amount_receivable" type="number"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_case"></i>
                                    </b>
                                    <span>收款金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="receive_form.amount_received" type="number"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_payTime"></i>
                                    </b>
                                    <span>付款时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            class="all_width"
                                            v-model="receive_form.pay_date"
                                            placeholder="请选择付款时间"
                                            type="datetime"
                                    ></el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>备注</span>
                                </div>
                                <div class="item_content">
                                    <el-input
                                            v-model="receive_form.remark"
                                            type="textarea"
                                            placeholder="请输入"
                                    ></el-input>
                                </div>
                            </div>
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
                <div class="dialog_main">

                    <el-form :model="ruleForm" :rules="rules" ref="payForm" class="demo-ruleForm" size="mini">
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>客户名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请点击选择客户名称" v-model="ruleForm.customer_name"
                                              @focus="handleOpenCustomer" readonly="readonly"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>客户身份</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请点击选择客户名称"
                                              :disabled="true" :value="ruleForm.identity===1?'业主':ruleForm.identity===2?'租客':''"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>付款时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            v-model="ruleForm.pay_date" type="date" placeholder="请输入">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>收款金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="ruleForm.amount_payable"
                                              type="number"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>科目</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="subject.parent_name"
                                              @focus="handleOpenSubject('subject')"></el-input>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>详情</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="ruleForm.description"
                                              type="textarea"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="name">
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_subject"></i>
                                    </b>
                                    <span>备注</span>
                                </div>
                                <div class="item_content">
                                    <el-input placeholder="请输入" v-model="ruleForm.remark" type="textarea"></el-input>
                                </div>
                            </div>
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
        <lj-subject :visible="subject_visible" @close="subject_visible = false"
                    @confirm="handleConfirmSubject"></lj-subject>

        <!--跟进记录列表-->
        <lj-dialog
                :visible="record_visible"
                :size="'small'"
                @close="record_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>跟进记录</h3>
                    <span class="add_mark" @click="new_record_visible = true">+</span>
                </div>
                <div class="dialog_main">
                    <div class="address">{{current_address}}</div>
                    <div class="record">
                        <el-table
                                :data="record_data"
                        >
                            <el-table-column label="跟进时间" prop="create_time" show-overflow-tooltip align="center"></el-table-column>
                            <el-table-column label="跟进发起人" prop="creator.name" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column label="当前跟进人" prop="flow_staff.name" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column label="跟进类型" prop="" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.flow_up_type===3 ? '贴条': scope.row.flow_up_type===5 ?'换锁':'/'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="跟进状态" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.flow_up_status===3 ? '已响应' :scope.row.flow_up_status ===5 ? '未响应':'/'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="款项名目" prop="address" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dialog_footer">
                    <div class="page">
                        <el-pagination
                                :total="record_data_count"
                                layout="total,prev,pager,next"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </lj-dialog>

        <!--新增跟进任务-->
        <lj-dialog
                :visible="new_record_visible"
                :size="{width: 500 + 'px' ,height: 520 + 'px'}"
                @close="new_record_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增跟进</h3>
                </div>
                <div class="dialog_main">
                    <el-form :mode="new_record" size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>跟进人</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="new_record.flow_staff_id"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>跟进类型</span>
                                </div>
                                <div class="item_content">
                                    <!--<el-input  v-model="new_record.content"></el-input>-->
                                    <el-select v-model="new_record.flow_up_type">
                                        <el-option v-for="(item,index) in categoryList" :key="index" :label="item.title" :value="item.value"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>应收款项</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="new_record.content" type="number"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>备注内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" v-model="new_record.remark"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>地址</span>
                                </div>
                                <div class="item_content justify-start">
                                    <el-input  v-model="new_record.address"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postNewRecord()">确定</el-button>
                    <el-button size="small" @click="new_record_visible=false;">取消</el-button>
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
                    <span class="add_mark" @click="new_mark_visible = true">+</span>
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
                                layout="total,prev,pager,next"
                        ></el-pagination>
                    </div>
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
                <div class="dialog_main">
                    <el-form :mode="new_mark" size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>备注内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>备注类型</span>
                                </div>
                                <div class="item_content justify-start" style="flex-wrap: wrap;text-align: left">

                                    <el-button
                                            v-for="(index,item) in categoryList"
                                            :key="item" style="margin-bottom: 10px"
                                            @click="getCategory(index.value)"
                                    >{{index.title}}</el-button>

                                </div>
                            </div>
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
                :size="{width: 500 + 'px',height: 500 + 'px'}"
                @close="register_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>登记记录</h3>
                </div>
                <div class="dialog_main">
                    <el-form :model="register_from" size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_come"></i>
                                    </b>
                                    <span>选择图片</span>
                                </div>
                                <div class="item_content">
                                    <!--<span class="el-icon-plus" style="padding: 6px;background:rgba(255,255,255,1);border-radius:4px;"></span>-->
                                    <Upload :file="photo1" @success="getImgIds"></Upload>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>选择账户</span>
                                </div>
                                <div class="item_content">
                                    <el-select class="all_width" v-model="register_from.account_id">
                                        <el-option value="1" label="2104023483209"></el-option>
                                        <el-option value="1" label="2104023483209"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>收款金额</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="register_from.amount"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>收款时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            class="all_width"
                                            v-model="register_from.collection_time"
                                    ></el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="mini" type="danger" @click="registrate">迁移</el-button>
                    <el-button size="mini" @click="register_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
        <!--客户列表-->
        <lj-dialog :visible="customer_visible" :size="{width: 900 + 'px',height: 720 + 'px'}"
                   @close="customer_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>请选择客户</h3>
                </div>
                <div class="dialog_main">
                    <customer-lists  @getCustomer="getCurrentCustomer"></customer-lists>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleChooseCustomer"  >确定</el-button>
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
    import Upload from '../../common/upload.vue';


    export default {
        name: "",
        components: {
            SearchHigh,
            LjDialog,
            FinMenuList,
            LjSubject,
            CustomerLists,
            Upload
        },
        data() {
            return {
                photo1: {
                    keyName: 'photo1',
                    setFile: [
                        {
                            id: 55,
                            url: 'http://static.lejias.cn/lejia8e9013abd8af58047660bc8616f775a8.jpg',
                        },
                        {
                            id: 44,
                            url: 'http://static.lejias.cn/lejia20c807d28018c05cb2950017673d93f2.jpg',
                        },
                    ],
                    size: {},
                },
                photo2: {
                    keyName: 'photo2',
                    setFile: {},
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
                    cate:'',

                },
                btnData: [
                    {label: "回滚", type: "warning", icon: "el-icon-info", size: "small", methods: "handleProcess"},
                    {label: "删除", type: "danger", icon: "el-icon-delete", size: "small", methods: "handleDelete"},
                ],
                current_address:'',
                current_row:'',
                showFinMenuList: false,
                delete_visible:false,//删除
                add_visible: false,//新增
                recall_visible:false,//回滚
                receive_visible: false, //应收入账
                record_visible: false, //跟进记录
                new_record_visible:false,//新增跟进
                mark_visible: false, //备注列表
                new_mark_visible: false, //新增备注
                register_visible: false, //登记收款
                register_size: '',
                customer_visible:false,
                running_account_record:[],//回滚数据
                ra_ids:[],//回滚id

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

                ruleForm: {
                    customer_id: '',//客户id
                    amount_receivable: '',//金额
                    description: '',//描述
                    remark: '',
                    identity: '',//款项
                    pay_date: '',//付款时间
                    subject_id: '',
                    customer_name:'',
                },
                rules: {
                    amount_payable: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                },
                types:[
                    {title:"业主",value:1},
                    {title:"租客",value:2}
                ],

                register_from: {
                    fund_id:'',
                    collect_img:[],
                    account_id: '',
                    amount: '2000.00',
                    collection_time: '',
                    address:'',
                    remark:'',
                },
                new_mark: {
                    content: '',
                    category: '',
                },
                categoryList:[
                    {title:"违约",value:1} ,
                    {title:"延期",value:2} ,
                    {title:"贴条",value:3} ,
                    {title:"换锁",value:4} ,
                    {title:"维修",value:5} ,
                    {title:"资金",value:6} ,
                    {title:"炸单",value:7} ,
                    {title:"调房",value:8} ,
                    {title:"特殊情况",value:9} ,
                ],
                showSearch: false,
                chooseTab: 1,
                selects: [
                    {
                        id: 1,
                        title: '定金',
                    },
                    // {
                    //     id: 2,
                    //     title: '尾款',
                    // },
                    // {
                    //     id: 3,
                    //     title: '房款',
                    // },
                    // {
                    //     id: 4,
                    //     title: '其他收款'
                    // }
                ],
                tableData: [],
                count:0,

                showData: {
                    "pay_date": '收款时间',
                    "subject.title": '应收科目',
                    "customer.address": "地址",
                    "amount_receivable": '应收余额',
                    "amount_received": '实收金额',
                    "balance": '剩余金额',
                    "complete_date": '补齐时间',
                    "description.description": '明细详情',
                    // "remark": "备注",
                    // "receTag": "催缴备注"
                },
                btn_group: [
                    {val: '跟进列表', key: 'record', type: 'success',},
                    {val: '催缴备注', key: 'mark', type: 'danger',},
                    // {val: '详情', key: 'detail', type: 'primary',},
                    {val: '登记收款', key: 'register', type: 'warning',},
                    {val: '应收入账', key: 'should_receive', type: 'success',}
                ],
                searchData: {
                    status: 'gathering',
                    data: [],
                },

                amount_receivable:'',//应收
                chooseRowIds: [],
                receive_form: {
                    // subject_name: '1',//科目
                    account_id: '',//账户id
                    amount_received: '',//收款金额
                    pay_date: '',//付款时间
                    remark: '',
                    // amount_receivable:'',//应收

                },

                record_data: [],//跟进列表
                record_data_count:0,
                mark_data:[],
                mark_data_count:0,
                new_record:{
                    flow_staff_id:'',//跟进人id
                    flow_up_type:'',//跟进类型
                    fund_id:'',//收款id
                    remark:'',
                    address:'',

                },
                registerData:[],//登记列表
                accountLists:[],
                cate: [
                    {title: "银行卡", value: 1,},
                    {title: "支付宝", value: 2,},
                    {title: "微信", value: 3,},
                    {title: "银行卡(数据来自房管中心)", value: 4,},
                ],
                multipleSelection: [],//多选
            }
        },
        mounted() {
            this.getReceiveList();
        },
        activated() {
        },
        watch: {
            new_mark:{
                handler(val){
                    console.log(val)
                }
            }
        },
        computed: {},
        methods: {
            getImgIds(val) {
                console.log(val);
            },
            // 迁移
            registrate(){
                this.$http.put(globalConfig.temporary_server + 'registration/2',this.register_from).then(res=>{
                    if(res.code===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.register_visible = false;
                    }
                    else{
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
            //操作项动态调用
            clkCall(func, row, index) {
                this[func](row, index);
            },
            //删除
            handleOkDel() {
                this.$http.delete(globalConfig.temporary_server + 'account_receivable/delete/' + this.current_row.id).then(res => {
                    if(res.code===200){
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
            handleDelete(row, index) {
                this.current_row = row;
                this.delete_visible = true;
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
            //显示回滚
            handleProcess(row, index){
                this.running_account_record=[];
                this.current_row = row;
                this.recall_visible = true;
                for( let item in this.current_row.running_account_record){
                  this.running_account_record.push({id:item,desc:this.current_row.running_account_record[item]});
                }
                console.log(this.running_account_record);
            },

            //确认回滚
            handleOkRecall(){
                this.$http.put(globalConfig.temporary_server + 'account_receivable/revert/'+this.current_row.id,{ra_id:this.ra_ids}).then(res => {

                    if(res.code===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.recall_visible = false;

                    }else {
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
            getCategory(val){
                this.new_mark.category = val;
            },
            //跟进列表
            getReceivable_follow(){
                this.$http.get(globalConfig.temporary_server + 'receivable_follow',).then(res => {
                    console.log(res);
                    if(res.code===200){
                        this.record_data = res.data.data;
                        this.record_data_count = res.data.count;
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //新增跟进
            postNewRecord(){
                this.$http.get(globalConfig.temporary_server + 'receivable_follow',this.new_record).then(res => {
                    console.log(res);
                    if(res.code===200){
                        this.record_data = res.data.data;
                        this.record_data_count = res.data.count;
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //催缴备注列表
            getReceivable_tag(id){
                this.$http.get(globalConfig.temporary_server + 'receivable_tag',{fund_id:id}).then(res => {
                    console.log(res);
                    if(res.code===200){
                        this.mark_data = res.data.data;
                        this.mark_data_count = res.data.count;
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //新增催缴备注
            postReceivable_tag(){
                this.$http.post(globalConfig.temporary_server + 'account_receivable/urge_tag/'+this.current_row.id,this.new_mark).then(res => {
                    console.log(res);
                    if(res.code===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.new_mark_visible = false;
                        this.getReceivable_tag(this.current_row.id);
                    }else{
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
            getAccount(){
                this.$http.get(globalConfig.temporary_server + "account",this.params).then(res => {
                    if(res.code===200){
                        this.accountLists = res.data.data;

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //应收入账
            handleOkReceive() {
                console.log(this.current_row);
                console.log(this.receive_form);
                this.$http.put(globalConfig.temporary_server + 'account_receivable/receive/' + this.current_row.id, this.receive_form).then(res => {
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

            //显示客户列表
            handleOpenCustomer() {
                this.customer_visible = true;
            },
            //返回数据
            getCurrentCustomer(data){
                console.log(JSON.stringify(data));
                for(let item of Object.keys(this.ruleForm)){
                    this.ruleForm[item] = data[item];
                }
            },
            //确认选择
            handleChooseCustomer(){
                if(this.ruleForm.customer_id != ''){
                    this.$LjNotify('success', {
                        title: '成功',
                        message: "操作成功",
                        subMessage: '',
                    });
                    this.customer_visible = false;
                }else{
                    this.$LjNotify('success', {
                        title: '提示',
                        message: "请选择客户",
                        subMessage: '',
                    });
                }

            },
            //新增收款项
            handleOkAdd() {
                console.log(this.ruleForm);

                this.$http.post(globalConfig.temporary_server + 'account_receivable', this.ruleForm).then(res => {
                    this.callbackSuccess(res);
                    this.add_visible = false;
                }).catch(err => {
                    console.log(err);
                })
            },
            //加载收款列表
            getReceiveList() {
                this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + 'account_receivable', this.params).then(res => {
                    this.showLoading(false);
                    if (res.code === 200) {
                        this.tableData = res.data.data;
                        this.count = res.data.count;
                    }
                })
            },
            handleClickBtn(key,row) {
                this.current_row = row;
                this.current_address = row.customer.address;
                if (key === 'should_receive') {
                    this.receive_visible = true;
                }
                if (key === 'record') {
                    this.record_visible = true;
                    this.getReceivable_follow();
                    this.new_record.fund_id = this.current_row.id;
                    this.new_record.address = this.current_row.address;
                }
                if (key === 'mark') {
                    this.mark_visible = true;
                    this.getReceivable_tag(row.id);

                }
                if (key === 'register') {
                    this.register_size = 'mini';
                    this.register_visible = true;
                }
            },
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
                this.searchData.data = [

                    {
                        keyType: 'dateRange',
                        title: '应收日期',
                        placeholder: '请选择日期',
                        keyName: 'date1',
                        dataType: [],
                    },
                    {
                        keyType: 'dateRange',
                        title: '催缴日期',
                        placeholder: '请选择日期',
                        keyName: 'date2',
                        dataType: [],
                    },
                    {
                        keyType: 'radio',
                        title: '入账状态',
                        keyName: 'radio',
                        dataType: '',
                        value: [
                            {
                                id: 12,
                                title: '待入账',
                            },
                            {
                                id: 13,
                                title: '带结清',
                            },
                            {
                                id: 14,
                                title: '已结清',
                            },
                            {
                                id: 15,
                                title: '已超额',
                            }
                        ],
                    },

                    {
                        keyType: 'organ',
                        title: '部门',
                        placeholder: '请选择部门',
                        keyName: 'organ',
                        dataType: '',
                    },
                ];
            },
            // 确认搜索
            hiddenModule(val) {
                this.showSearch = false;
                if (val !== 'close') {
                    console.log(val);
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
                if (this.which_subject === 'subject_deposit') {
                    this.subject.parent_name = val.title;
                    this.subject.parent_id = val.id;
                    this.ruleForm.subject_id = val.id;
                    this.ruleForm.subject_val = val.title;

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
    }
</style>
