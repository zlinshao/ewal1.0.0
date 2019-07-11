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
      <!-- 银行流水时展示的图标 -->
      <div class="items-center listTopRight" v-show="bankFlowFlag">
         <el-tooltip content="导入" placement="bottom" :visible-arrow="false">
          <div class="icons bankImport" @click="openBankFlowTempalte"></div>
        </el-tooltip>
      </div>
        <!-- 非银行流水时展示的图标 -->
      <div class="items-center listTopRight" v-show="!action_visible && !bankFlowFlag">
        <el-tooltip content="批量入账" placement="bottom" :visible-arrow="false">
          <div class="icons allInsert" @click="openBatchEntry"></div>
        </el-tooltip>
        <el-tooltip v-show="$storage.get('VALIDATE_PERMISSION')['Receivable-Save']" content="新增应收款项" placement="bottom" :visible-arrow="false">
          <div class="icons add" @click="openAdd"><b>+</b></div>
        </el-tooltip>
        <el-tooltip content="收款记录" placement="bottom" :visible-arrow="false">
          <div class="icons bank" @click="openBankRunCompare"></div>
        </el-tooltip>
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch"></div>
        </el-tooltip>
      </div>
    </div>
    <div class="action-bar changeChoose" v-show="!bankFlowFlag">
      <div class="action-bar-left" v-show="action_visible">
        <!--<el-checkbox>全选</el-checkbox>-->
        <!--<span class="check-count">已选中 <i>{{multipleSelection.length}}</i> 项</span>-->
        <span class="action-bar-name">
          <span v-for="(item,index) in btn_group"
                v-show="item.show"
                :key="index"
                :class="item.class"
                @click="handleClickBtn(item.key,current_row)">
            {{item.val}}
          </span>
        </span>
      </div>
      <div class="action-bar-right">
        <span style="margin-right: 15px">应收金额（元） <i class="edit">{{ receivable_sum }}</i></span>
        <span style="margin-right: 15px">实收金额（元） <i class="check">{{ received_sum }}</i></span>
        <span style="margin-right: 15px">剩余款项（元） <i class="delete">{{ balance_sum }}</i></span>
      </div>
    </div>
    <div v-if="chooseTab!=5" class="mainListTable changeChoose" :style="{'height': mainListHeight(46) + 'px'}">
      <el-table
        :data="tableData"
        :height="mainListHeight(76) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @selection-change="handleSelectionChange($event,'index')"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          type="selection" width="40">
        </el-table-column>
        <!--<el-table-column width="40">
          <template slot-scope="scope">
            <span class="table_choose" :class="{'is_table_choose': scope.row.id === is_table_choose }"></span>
          </template>
        </el-table-column>-->
        <el-table-column
          show-overflow-tooltip
          v-for="item in Object.keys(showData)" :key="item"
          :align="(item=='customer.address'||item=='description.description')?'left':'center'"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          key="remarks"
          show-overflow-tooltip
          align="center"
          prop="remarks"
          label="备注">
          <template slot-scope="scope">
           <!-- <div style="cursor: pointer" @click="openRemarksList(scope.row)">{{scope.row.remarks}}</div>-->
            <div style="cursor: pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" v-html="scope.row.remarks" @click="openRemarksList(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="" align="center" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color: #FFAB40">待入账</span>
            <span v-if="scope.row.status === 2" style="color: #FF7131">待结算</span>
            <span v-if="scope.row.status === 3" style="color: #0C66FE">已结清</span>
            <span v-if="scope.row.status === 4" style="color: #CF2E33">已超额</span>
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
    <!-- 银行流水的列表 -->
    <div v-if="chooseTab==5">
      <div class="bankTabelList">
          <el-table :data="bankTabelList" @cell-click="tableClickBankRow"   header-row-class-name="tableHeader" style="width: 100%">
            <el-table-column label="导入时间" prop="create_time" align="center"></el-table-column>
            <el-table-column label="流水导入批次" prop="id" align="center" show-overflow-tooltip ></el-table-column>
            <el-table-column label="包含账户数量" prop="account_num" align="center" ></el-table-column>
            <el-table-column label="流水数量" prop="bank_flow_num" align="center"></el-table-column>
            <el-table-column label="操作人" prop="operator" align="center"></el-table-column>
          </el-table>
          <footer class="flex-center bottomPage">
            <div class="develop flex-center">
              <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="page">
              <el-pagination
                :total="bankListcount"
                :current-page="bankListPageParams.page"
                :page-size="bankListPageParams.limit"
                layout="total,jumper,prev,pager,next"
                @current-change="handleChangebankListPage"
              ></el-pagination>
            </div>
          </footer>
      </div>
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
                <el-option v-for="(item,index) in identityData" :label="item.name" :value="item.id"
                           :key="index"></el-option>
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
              <el-input v-model="receive_form.customer_name" disabled></el-input>
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
              <el-input v-model="receive_form.staff_name" disabled></el-input>
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
    <lj-dialog :visible="add_visible" :size="{width: 600 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main borderNone">

          <el-form :model="addForm" label-width="80px">
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

            <el-form-item label="款项来源">
              <el-select v-model="addForm.identity" placeholder="请选择">
                <el-option v-for="(item,index) in identityData" :label="item.name" :value="item.id"
                           :key="index"></el-option>
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
    <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"
                style="z-index: 1000"></lj-subject>

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
              <el-input v-model="new_record.flow_staff_name" @focus="openStaff" readonly></el-input>
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
          <span class="add_mark" @click="new_mark_visible = true;new_mark={category:1}">+</span>
        </div>
        <div class="dialog_main">
          <div class="address">{{current_address}}</div>
          <div class="record">
            <el-table
              :data="mark_data"
            >
              <el-table-column label="备注时间" prop="create_time" align="center"></el-table-column>
              <el-table-column label="备注内容" show-overflow-tooltip prop="content" align="left"
                               width="200"></el-table-column>
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

    <!--新增催缴备注-->
    <lj-dialog
      :visible="new_mark_visible"
      :size="{width: 600 + 'px' ,height: 520 + 'px'}"
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
              <div class="remark-type">
                <div class="remark-type-item"
                     :class="{checked: category_choose==item.value}"
                     v-for="(item,index) in categoryList"
                     :key="index" style="margin-bottom: 10px"
                     @click="new_mark.category = item.value;category_choose = item.value"
                >{{item.title}}
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
              header-row-class-name="tableHeader"
              @selection-change="receiptSelectionChange"
            >
              <el-table-column
                type="selection" width="40">
              </el-table-column>
              <el-table-column label="实收金额" prop="amount_received" align="center"></el-table-column>
              <el-table-column label="时间" prop="operate_time" align="center"></el-table-column>
              <el-table-column label="账户" prop="account.name" align="center"></el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.is_receipt===1?'已开':'未开'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="收据" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.is_receipt==1" @click="showReceiptDetail(scope.row)" style="margin: 0 auto"
                       class="receipt-img"></div>
                  <div v-else>-</div>
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


    <!--收据详情-->
    <lj-dialog :visible.sync="receipt_detail_dialog_visible"
               :size="{width: 1550 + 'px',height: 900 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header" style="padding-top: 30px">
          <h3>电子收据</h3>
        </div>
        <div class="dialog_main borderNone edit-name-container">
          <iframe :src="receipt_detail_dialog_data.view_uri"></iframe>
        </div>
        <div class="dialog_footer">
          <el-button v-if="$storage.get('VALIDATE_PERMISSION')['Receivable-Receipt-Name']" size="small" type="warning" @click="editUserName">修改姓名</el-button>
          <el-button size="small" type="danger" @click="beforeSend">发送</el-button>
          <el-button size="small" @click="receipt_detail_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--修改姓名-->
    <lj-dialog :visible.sync="edit_username_dialog_visible"
               :size="{width: 450 + 'px',height: 320 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改姓名</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="editUserNameFormRef" :rules="rules.editUserName" :model="edit_username_form"
                   style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="name" label="客户姓名">
              <el-input v-model="edit_username_form.name" placeholder="必填" style="width: 200px">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleEditUserNameConfirm">确定</el-button>
          <el-button size="small" @click="edit_username_dialog_visible=false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--修改手机号页面..不修改则直接发送-->
    <lj-dialog :visible.sync="edit_phone_dialog_visible"
               :size="{width: 450 + 'px',height: 320 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>提示</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="editPhoneFormRef" :rules="rules.editPhone" :model="edit_phone_form"
                   style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="phone" label="手机号">
              <el-input v-model="edit_phone_form.phone" placeholder="请输入手机号" style="width: 200px">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleSendMessage">确定</el-button>
          <el-button size="small" @click="edit_username_dialog_visible=false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--发送短信之前dialog-->
    <lj-dialog :visible.sync="pre_send_message_dialog_visible"
               :size="{width: 450 + 'px',height: 320 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>发送短信</h3>
        </div>
        <div class="dialog_main borderNone pre-send-message">
          <div class="send-type-list">
            <div @click="send_type_choose = item.id;send_message_template_dialog_visible = true;"
                 :class="{checked:send_type_choose==item.id}" v-for="item in send_type_list" class="send-item">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleMultiSendMessage">确定</el-button>
          <el-button size="small" @click="pre_send_message_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--短信模板展示dialog-->
    <lj-dialog :visible.sync="send_message_template_dialog_visible"
               :size="{width: 550 + 'px',height: 420 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{send_type_list[send_type_choose-1].name}}</h3>
        </div>
        <div class="dialog_main borderNone template-message">
          {{send_type_list[send_type_choose-1].template}}
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="send_message_template_dialog_visible=false">确定</el-button>
          <el-button size="small" @click="send_message_template_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--生成违约金日期dialog-->
    <lj-dialog :visible.sync="generate_dialog_visible"
               :size="{width: 400 + 'px',height: 320 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>生成违约金日期</h3>
        </div>
        <div class="dialog_main borderNone" style="align-items: center;display: flex">
          <el-form ref="multiFieldFormExitDateRef" :rules="rules.multiField" :model="multi_field_form"
                   style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="exit_date" label="违约金日期">
              <!--<el-input v-model="multi_field_form.exit_date" style="width: 200px">
              </el-input>-->
              <el-date-picker
                v-model="multi_field_form.exit_date"
                type="datetime"
                placeholder="请选择违约金日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="generateExitDate">确定</el-button>
          <el-button size="small" @click="generate_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--修改补齐时间dialog-->
    <lj-dialog :visible.sync="edit_time_dialog_visible"
               :size="{width: 450 + 'px',height: 320 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改补齐时间</h3>
        </div>
        <div class="dialog_main borderNone" style="display: flex;align-items: center">
          <el-form ref="multiFieldFormEditTimeRef" :rules="rules.multiField" :model="multi_field_form"
                   style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="complete_date" label="补齐时间">
              <el-date-picker
                v-model="multi_field_form.complete_date"
                type="datetime"
                placeholder="必填"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="editCompleteTime">确定</el-button>
          <el-button size="small" @click="edit_time_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--应收款项备注列表dialog-->
    <lj-dialog :visible.sync="remarks_dialog_visible"
               :size="'small'"
    >
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>备注</h3>
          <span class="add_mark" @click="new_remark_dialog_visible = true;new_mark={}">+</span>
        </div>
        <div class="dialog_main">
          <div class="address">{{tableSettingData.remarks.current_address}}</div>
          <div class="record">
            <el-table
              :data="tableSettingData.remarks.tableData"
            >
              <el-table-column label="备注时间" prop="create_time" align="center"></el-table-column>
              <el-table-column label="备注内容" show-overflow-tooltip prop="content" align="center"
                               width="200"></el-table-column>
              <el-table-column label="备注人" prop="staff_name" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <!--<div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="tableSettingData.remarks.count"
              layout="total,jumper,prev,pager,next"
              :current-page="tableSettingData.remarks.params.page"
              :page-size="tableSettingData.remarks.params.limit"
              @current-change="handleChangePage_markData"
            ></el-pagination>
          </div>
        </div>-->
      </div>
    </lj-dialog>


    <!--新增备注-->
    <lj-dialog
      :visible.sync="new_remark_dialog_visible"
      :size="{width: 600 + 'px' ,height: 420 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增备注</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="address" style="margin-bottom: 40px">{{tableSettingData.remarks.current_address}}</div>
          <el-form :mode="new_mark" label-width="80px">
            <el-form-item label="备注内容">
              <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="addNewRemark">确定</el-button>
          <el-button size="small" @click="new_remark_dialog_visible=false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--新增滞纳金dialog-->
    <lj-dialog :visible.sync="new_overdue_fine_dialog_visible"
               :size="{width: 450 + 'px',height: 550 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增滞纳金</h3>
        </div>
        <div class="dialog_main borderNone" style="display: flex;align-items: center">
          <el-form ref="newOverdueFineFormRef" :rules="rules.newOverdueFine" :model="new_overdue_fine_form"
                   style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="pay_date" label="收款时间">
              <el-date-picker
                v-model="new_overdue_fine_form.pay_date"
                type="datetime"
                placeholder="必填"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input disabled v-model="new_overdue_fine_form.customer_name"></el-input>
            </el-form-item>
            <el-form-item label="详情">
              <el-input type="textarea" autosize disabled v-model="new_overdue_fine_form.details"></el-input>
            </el-form-item>
            <el-form-item label="收入科目">
              <el-input disabled v-model="new_overdue_fine_form.subject_title"></el-input>
            </el-form-item>
            <el-form-item required prop="amount" label="应收金额">
              <el-input v-model="new_overdue_fine_form.amount"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="handleNewOverdueFine">确定</el-button>
          <el-button size="small" @click="new_overdue_fine_dialog_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--登记收款-->
    <lj-dialog
      :visible="register_visible"
      :size="{width: 500 + 'px',height: 700 + 'px'}"
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
              <el-input v-model="register_from.address" readonly></el-input>
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
              <div class="bank-left-top">
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
                <el-table-column label="截图" prop="collect_img" align="center">
                  <template slot-scope="scope">
                    <img class="collect_img" v-for="item in Object.keys(scope.row.collect_img)"
                         :src="scope.row.collect_img[item]" alt="">
                  </template>
                </el-table-column>
                <el-table-column label="操作" prop="category" align="center" width="150">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleCompareBankRun(scope.row.id)" type="danger">对比银行流水</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bank-right borderNone">
              <div class="bank-right-top">
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
              </div>

              <el-table
                :data="compareBankData"
              >
                <el-table-column label="打款时间" prop="create_time" align="center"></el-table-column>
                <el-table-column label="收入金额" prop="amount" align="center"></el-table-column>
                <el-table-column label="备注" prop="collection_time" align="center"></el-table-column>
                <el-table-column label="所属银行" prop="account.account_num" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
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

    <!--批量入账-->
    <lj-dialog :visible="batchEntry_visible" :size="{width: 900 + 'px',height: 560 + 'px'}"
               @close="batchEntry_visible = false;current_row = ''">
      <div class="dialog_container">
        <div class="dialog_header justify-bet">
          <h3>批量入账</h3>
          <h3 class="batchEntry-icon">
            <i class="" v-if="$storage.get('VALIDATE_PERMISSION')['Batch-Receivable-Export']" @click="out_account_visible = true"></i>
            <i class="" v-if="$storage.get('VALIDATE_PERMISSION')['Batch-Receivable-Import']" @click="import_account_visible = true"></i>
          </h3>
        </div>
        <div class="dialog_main changeChoose">
          <el-table
            :data="batchEntryData"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" label="操作时间" prop="create_time"></el-table-column>
            <el-table-column align="center" label="入账账户" prop="account_snapshot[0].name"></el-table-column>
            <el-table-column align="center" label="初始金额" prop="account_snapshot[0].value"></el-table-column>
            <el-table-column align="center" label="入账金额" prop="amount"></el-table-column>
            <el-table-column align="center" label="当前金额" prop="amount"></el-table-column>
            <el-table-column align="center" label="操作人" prop="staff.name"></el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="batchEntryCount"
              layout="total,jumper,prev,pager,next"
              :current-page="batchEntryParams.page"
              :page-size="batchEntryParams.limit"
              @current-change="handleBatchEntryChangePage"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <lj-dialog :visible="out_account_visible" @close="cancelOutAccount" :size="{width: 450 + 'px',height: 500 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>导出转账单</h3>
        </div>
        <div class="dialog_main">
          <el-form size="small" label-width="80px" class="borderNone">
            <el-form-item label="账户类型">
              <el-select placeholder="请选择" v-model="out_form.account_type" @change="getAccount">
                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账户">
              <el-select placeholder="请选择" v-model="out_form.account"
                         :disabled="is_disabled" multiple>
                <el-option v-for="(item,index) in accountLists" :label="item.name"
                           :value="item.id"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科目">
              <el-input v-model="out_form.subject_name"
                        @focus="subject_visible = true;which_subject = 'out_account';is_disabled = true"
                        placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker v-model="out_form.start_date" value-format="yyyy-MM-dd"
                              placeholder="请选择"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="out_form.end_date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="outAccountCtrl">导出</el-button>
          <el-button size="mini" type="info" @click="cancelOutAccount">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--批量入账导入-->
    <lj-dialog :visible="import_account_visible" @close="cancelImportAccount"
               :size="{width: 500 + 'px',height: 250 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>导入转账结果</h3>
        </div>
        <div class="dialog_main">
          <Upload @success="handleSuccessFile"></Upload>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="importOk">确定</el-button>
          <el-button size="mini" type="info" @click="cancelImportAccount">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 银行流水详情模态框-->
    <lj-dialog :visible="bankflow_detail_visible" @close="bankflow_detail_visible=false"
               :size="{width:1200+ 'px',height: 760+ 'px'}">
      <div class="bankdetail_dialog">
        <div class="header items-bet">
          <h3>流水详情</h3>
          <div class="right_info">
            <p>批次号为{{bank_list_row.id}}的流水</p>
            <p class="total">银行流水Total:{{bankDetailcount}}</p>
          </div>
        </div>
        <div>
          <el-table :data="bankDetailList"   header-row-class-name="tableHeader" style="width: 100%">
            <el-table-column label="打款时间" prop="create_time" align="center"></el-table-column>
            <el-table-column label="支出金额" prop="expend_amount" align="center" show-overflow-tooltip ></el-table-column>
            <el-table-column label="收入金额" prop="income_amount" align="center" ></el-table-column>
            <el-table-column label="备注" prop="remark" align="center"></el-table-column>
            <el-table-column label="所属银行" prop="bank.name" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            :total="bankDetailcount"
            :current-page="bankDetailPageParams.page"
            :page-size="bankDetailPageParams.limit"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangebankDetailPage"
          ></el-pagination>
        </div>
      </div>
    </lj-dialog>

    <!-- 银行流水导入模态框 -->
    <lj-dialog :visible="bankflow_upload_visible" @close="bankflow_upload_visible=false"
               :size="{width: 600 + 'px',height: 500 + 'px'}">
       <div class="dialog_container">
          <div class="dialog_header">
            <h3>导入</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :mode="import_template" label-width="80px" >
               <el-form-item label="流水模板" prop="import_template">
                  <div class="bank_template_select">
                    <el-select   placeholder="请选择流水模板" v-model="import_template.bank_template" style="width: 200px" @change="import_template.account=''">
                        <el-option  v-for="(item,index) in bankTemplateData" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                  </div>
              </el-form-item>
              <!-- 当流水模板为南京银行、农业银行(对公账户)、宁波银行、招商银行时需要选择账户类型和选择账户 -->
              <div v-if='import_template.bank_template==3 || import_template.bank_template==9||import_template.bank_template==11||import_template.bank_template==12'>
                <el-form-item label="账户类型" prop="import_template">
                    <div class="bank_template_select">
                      <el-select   placeholder="请选择账户类型" v-model="bank_account_type" style="width: 200px"  @change="getBankAccount">
                          <el-option  v-for="(item,index) in cate" :label="item.title" :value="item.value" :key="index"></el-option>
                      </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="选择账户"  prop="import_template">
                    <div class="bank_template_select">
                      <el-select   placeholder="请选择账户" v-model="import_template.account" style="width: 200px">
                          <el-option  v-for="(item,index) in BankAccountLists" :label="item.name" :value="item.id" :key="index"></el-option>
                      </el-select>
                    </div>
                </el-form-item>
              </div>
              <el-form-item align="center" label="上传附件"  prop="import_template">
                  <div class="upload_imgVideo">
                      <lj-upload
                          v-model="import_template.doc_id"
                          size="50"
                          :limit="['xls','xlsx']"
                          class="upload-offset"
                      ></lj-upload>
                  </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger" @click="uploadBankFundFlowFun">确定</el-button>
            <el-button size="small" @click="bankflow_upload_visible=false;">取消</el-button>
          </div>
        </div>
    </lj-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import SearchHigh from '../../common/searchHigh.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';
  import CustomerLists from '../components/customerLists.vue';
  import {gatheringSearchList} from "../../../assets/js/allSearchData.js";
  import StaffOrgan from '../../common/staffOrgan.vue';
  import HouseFilter from '../../marketCentre/components/house-filter.vue';

  import Customer from '../../common/customer.vue';
  import Upload from '../payment/components/ButtonUpload'


  export default {
    name: "index",
    components: {
      SearchHigh,
      FinMenuList,
      LjSubject,
      CustomerLists,
      StaffOrgan,
      HouseFilter,
      Customer,
      Upload
    },
    watch: {
      multipleSelectionIndex: {
        handler(val, oldVal) {
          if (val && val.constructor == Array) {
            if (val.length == 1) {
              this.current_row = val[0];
              this.action_visible = true;
              this.register_from.address = val[0].customer && val[0].customer.address;
              this.multi_field_form = {
                assembly_id: val[0].id,
                name: val[0].customer?.customer_name || '',
                phone: val[0].customer?.contact || '',
              };
              this.btn_group = [
                {val: '催缴备注', key: 'mark', type: 'danger', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Urgetag']},
                {val: '登记收款', key: 'register', type: 'warning', class: 'edit',show:true},
                {val: '应收入账', key: 'should_receive', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Receive']},
                {val: '开收据', key: 'receipt', type: 'edit', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Receipt']},
                {val: '回滚', key: 'handleProcess', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Revert']},
                {val: '生成违约金日期', key: 'generate', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Liquid']},
                {val: '修改补齐时间', key: 'editTime', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Complete-Date']},
                {val: '发送短信', key: 'sendMessage', type: 'danger', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Notify']},
                {val: '删除', key: 'handleDelete', type: 'success', class: 'delete',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Delete']}]

            } else if (val.length == 0) {
              this.action_visible = false;
            } else {
              this.current_row = '';
              this.action_visible = true;
              this.btn_group = [
                {val: '发送短信', key: 'sendMessage', type: 'danger', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Notify']},
                {val: '删除', key: 'handleDelete', type: 'success', class: 'delete',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Delete']},]
            }
          }
        },
        immediate: true,
      },
    },
    data() {
      return {
        rules: {
          editUserName: {
            name: [
              {required: true, message: '请输入用户姓名', trigger: ['blur', 'change']},
            ],
          },

          editPhone: {
            name: [
              {required: true, message: '请输入手机号', trigger: ['blur', 'change']},
            ],
          },

          multiField: {
            exit_date: [
              {required: true, message: '请选择违约金日期', trigger: ['change', 'blur']}
            ],
            complete_date: [
              {required: true, message: '请选择补齐时间', trigger: ['change', 'blur']}
            ],
          },

          newOverdueFine: {
            pay_date: [
              {required: true, message: '请选择收款时间', trigger: ['change', 'blur']}
            ],
            amount: [
              {required: true, message: '请输入应收金额', trigger: ['change', 'blur']}
            ],
          },


          amount_payable: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },

        url: globalConfig.temporary_server,

        is_table_choose: '',

        out_form: {
          account: [],
          account_name: '',
          start_date: '',
          end_date: '',
          subject_id: '',
          subject_name: '',
          account_type: '',
          is_url: 1
        },
        batchEntryParams: {
          page: 1,
          limit: 15
        },
        batchEntry_visible: false,
        out_account_visible: false,
        import_account_visible: false,
        batchEntryData: [],
        batchEntryCount: 0,

        receivable_sum: '',
        received_sum: '',
        balance_sum: '',

        gatheringSearchList,
        action_visible: false,//操作栏作态
        compare_visible: false,//流水对比
        checkList: [],
        customerModule: false,//客户
        identityData: [//款项
          {id: 1, name: '房东'},
          {id: 2, name: '租客'},
          {id: 3, name: '未知客户'},
          {id: 5, name: '结算单'},
          {id: 6, name: '片区费用'},
          {id: 7, name: '报备费用'},
          {id: 8, name: '应收款项'},
        ],
        mark_data_params: {
          page: 1,
          limit: 12,
        },
        params: {
          is_del: '',
          staff_ids: [],
          department_ids: [],
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
          is_deposit: '',
          is_tail_fund: '',
          is_rank_rent: '',

        },
        btnData: [],
        current_address: '',
        current_row: '',
        showFinMenuList: false,
        receipt_visible: false,//开收据
        receipt_detail_dialog_visible: false,//开收据详情dialog显示隐藏
        receipt_detail_dialog_data: {},//开收据详情dialog数据
        edit_username_dialog_visible: false,//修改姓名dialog显示隐藏
        edit_phone_dialog_visible: false,//修改手机号dialog显示隐藏
        edit_username_form: {
          name: '',
        },//修改姓名form表单
        edit_phone_form: {
          phone: '',
        },//修改手机号form表单
        multi_field_form: {//包含客户姓名和联系电话及违约金日期,补齐时间的表单 分多个接口提交
          id: '',//电子收据id
          assembly_id: '',//流水id
          name: '',
          phone: '',
          exit_date: null,//违约金日期
          complete_date: null,//补齐时间
        },
        pre_send_message_dialog_visible: false,//发送短信之前的dialog显示隐藏

        send_type_choose: 1,
        send_type_list: [
          {
            id: 1, name: '催缴短信',
            template: '【乐伽公寓】尊敬的@先生/女士：您租住的@小区，下一期房租需要缴纳，请@前及时缴纳，打款账户为收据上方的汇款账号。请您合理安排好缴款时间，及时缴款！如已缴纳，请忽略此条短信！乐伽客户服务热线4008926606。',
          },
          {
            id: 2, name: '到期短信',
            template: '【乐伽公寓】尊敬的***先生/女士：您租住的****小区，房租于***日到期，如续签/退租，请致电乐伽客户服务热线400-892-6606，谢谢。',
          },
          {
            id: 3, name: '逾期短信',
            template: '【乐伽公寓】尊敬的***先生/女士：您租住的****小区，需要在XXX前缴纳下一期房租，您已经逾期XX天，请今天及时缴纳，如不缴纳，我们将按照合同处理，收回房屋！请您合理安排好缴款时间，及时缴款！如已缴纳，请忽略此条短信，感谢您的配合！如需咨询（如有疑问），请致电乐伽客户服务热线400-892-6606，谢谢。',
          },
        ],
        send_message_template_dialog_visible: false,//短信模板展示
        generate_dialog_visible: false,//生成违约金日期页面

        edit_time_dialog_visible: false,//修改补齐时间dialog页面
        new_overdue_fine_dialog_visible: false,//新增滞纳金dialog页面
        new_overdue_fine_form: {//新增滞纳金form
          subject_id: '',//科目id
          forfeit_day: 0,//滞纳天数
          pay_date: "",//收款时间
          customer_name: "",//客户姓名
          details: "",//详情
          subject_title: "",//滞纳金
          amount: null//应收金额
        },
        remarks_dialog_visible: false,//应收款项备注列表dialog
        new_remark_dialog_visible: false,//新增备注

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
        staffModule: false,//员工组件
        running_account_record: [],//回滚数据
        running_account_count: 0,
        ra_ids: [],//回滚id
        running_account_params: {
          limit: 6,
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
          customer_identity: '',//客户身份
          identity: '',//款项
          pay_date: '',//付款时间
          subject_id: '',//科目id
          customer_name: '',
          subject_name: '',//科目名
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
          category: 1,
        },
        category_choose: 1,
        categoryList: [
          {title: "违约", value: 1},
          {title: "延期", value: 2},
          {title: "贴条", value: 3},
          {title: "换锁", value: 4},
          {title: "维修", value: 5},
          {title: "资金", value: 6},
          {title: "炸单", value: 7},
          {title: "调房", value: 8},
          {title: "特殊情况", value: 9},
        ],
        date_deviation: [//时间误差
          {title: "天", value: 5},
          {title: "分钟", value: 3},
        ],
        order: [//权重
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
          {
            id: 5,
            title: '银行流水',
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
          //"remark":'备注',
          //"remarks": "备注",
          // "receTag": "催缴备注"
        },
        btn_group: [
          // {val: '跟进列表', key: 'record', type: 'success',class:'edit'},
          {val: '催缴备注', key: 'mark', type: 'danger', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Urgetag']},
          {val: '登记收款', key: 'register', type: 'warning', class: 'edit',show:true},
          {val: '应收入账', key: 'should_receive', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Receive']},
          {val: '开收据', key: 'receipt', type: 'edit', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Receipt']},
          {val: '回滚', key: 'handleProcess', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Revert']},
          {val: '生成违约金日期', key: 'generate', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Liquid']},
          {val: '修改补齐时间', key: 'editTime', type: 'success', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Complete-Date']},
          {val: '发送短信', key: 'sendMessage', type: 'danger', class: 'edit',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Notify']},
          {val: '删除', key: 'handleDelete', type: 'success', class: 'delete',show:this.$storage.get('VALIDATE_PERMISSION')['Receivable-Delete']}

        ],
        searchData: {},

        amount_receivable: '',//应收
        chooseRowIds: [],

        receive_form: {//应收入账
        },
        receiveName: '',//收款人


        record_data: [],//跟进列表
        record_data_count: 0,
        record_data_params: {
          limit: 12,
          page: 1,
        },
        mark_data: [],
        mark_data_count: 0,

        tableSettingData: {
          remarks: {//收款列表备注
            params: {},
            count: 0,
            tableData: [],
            current_address: '',
          },
        },

        new_record: {
          flow_staff_id: '',//跟进人id
          flow_up_type: '',//跟进类型
          fund_id: '',//收款id
          remark: '',
          address: '',
          flow_staff_name: '',
        },

        registerData: [],//登记列表
        accountLists: [],
        cate: [
          {title: "银行卡", value: 1,},
          {title: "支付宝", value: 2,},
          {title: "微信", value: 3,},
          {title: "银行卡(数据来自房管中心)", value: 4,},
        ],
        multipleSelection: [],//多选 表单多选
        multipleSelectionIndex: [],//多选 主页
        receiptData: [],//电子收据
        running_ids: [],//流水ids
        compareParams: {
          limit: 12,
          page: 1,
          status: 9
        },
        compareData: [],
        compareCount: 0,

        compareBankData: [],//匹配后的数据
        compareBankParams: {},
        buttonChoose_date: '',
        buttonChoose_order: '',
        bankRun_type: [
          {title: "已匹配", value: 3},
          {title: "未匹配", value: 5},
          {title: "未找到", value: 7},
          {title: "暂未开始匹配", value: 9},
        ],
        chooseTabI: '',
        collect_img: '',
        is_disabled: true,
        //银行流水
        bankFlowFlag:false,  //当点击银行流水时，只展示导入的图标
        bankTabelList:[],    //银行流水列表
        bankDetailList:[],    //银行流水详情
        bankTemplateData:[],  //银行流水模板
        bankflow_detail_visible:false,  //银行流水详情模态框
        bankflow_upload_visible:false,  //银行流水上传模态框
        bankListcount:0,   //列表总条数
        bankDetailcount:0, //详情总条数
        bank_list_row:{}, //当前被选中的列表数据
        bank_account_type:'',  //账户类型的v-model
        BankAccountLists:[] ,//根据支付方式查询到的账户
        bankListPageParams:{   //银行流水列表的分页
          limit: 12,
          page: 1,
        },
        bankDetailPageParams:{  //银行流水详情的分页
          limit: 10,
          page: 1,
        },
        import_template:{  //导入时需要的传参
          doc_id:[],
          account:'',
          bank_template:''
        },


      }
    },
    mounted() {
      this.chooseTabI = this.compareParams.status;
      this.getReceiveList();

    },
    computed: {},
    methods: {
      getAccount() {//获取账户字典
        this.accountLists = [];
        this.out_form.account = [];
        this.out_form.account_name = '';
        this.$http.get(globalConfig.temporary_server + "account", this.params).then(res => {
          if (res.code === 200) {
            this.accountLists = res.data.data;
            this.is_disabled = false;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      importOk() {
        this.$http.post(globalConfig.temporary_server + 'batch_receivable/import', {doc_id: this.import_file}).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg
            });
            this.cancelImportAccount();
          } else {
            this.$LjNotify('success', {
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      outAccountCtrl() {
        this.$http.get(globalConfig.temporary_server + 'batch_receivable/export', this.out_form).then(res => {
          if (res.code === 200) {
            window.location.href = res.data.url;
            this.cancelOutAccount();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleSuccessFile(file, name) {
        if (file && file.length > 0) {
          this.import_file = file[0];
        }

      },
      cancelOutAccount() { //取消批量导出
        this.$resetForm(this.out_form);
        this.out_account_visible = false;
        this.accountLists = [];
      },
      cancelImportAccount() {//取消批量导入
        this.import_file = '';
        this.import_account_visible = false;
      },
      handleBatchEntryChangePage(page) {//批量入账分页
        this.batchEntryParams.page = page;
        this.getBatchEntryList();
      },
      openBatchEntry() {
        this.batchEntry_visible = true;
        this.getBatchEntryList();
      },
      //获取批量入账列表
      getBatchEntryList() {
        if(!this.validatePermission('Batch-Receivable-List')) return;
        this.$http.get(globalConfig.temporary_server + "batch_receivable", this.batchEntryParams).then(res => {
          if (res.code === 200) {
            this.batchEntryData = res.data.data;
            this.batchEntryCount = res.data.count;
          } else {
            this.batchEntryData = [];
            this.batchEntryCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      openAdd() {
        this.add_visible = true;
        for (let item of Object.keys(this.addForm)) {
          this.addForm[item] = '';
        }

      },

      chooseBankType(id) {//操作匹配未匹配tab
        this.chooseTabI = id;
        this.compareParams.status = id;
        this.getCompareDataLists();
      },

      hiddenCustomer(val) {//获取客户
        this.customerModule = false;
        this.addForm.customer_name = val.name;
        this.addForm.customer_identity = val.identity;
        this.addForm.customer_id = val.id;

      },
      get_date_deviation(val) {//获取时间误差
        this.compareBankParams.select = val;
        this.buttonChoose_date = val;
      },
      getOrder(val) {//获取权重
        this.compareBankParams.order = val;
        this.buttonChoose_order = val;
      },
      handleCompareChangePage(page) {//收款记录分页
        this.compareParams.page = page;
        this.getCompareDataLists();
      },
      getCompareDataLists() {//获取收款记录
        this.$http.get(globalConfig.temporary_server + 'registration', this.compareParams).then(res => {
          if (res.code === 200) {
            this.compareData = res.data.data;
            this.compareCount = res.data.count;
          } else {

          }
        }).catch(err => {
          console.log(err);
        })
      },
      openBankRunCompare() {//流水对比
        this.compare_visible = true;
        this.getCompareDataLists();
      },
      handleCompareBankRun(id) {//确认流水对比
        let paramsForm = {
          date_deviation: this.compareBankParams.date_deviation,
          select: this.compareBankParams.select,
          amount_deviation: this.compareBankParams.amount_deviation,
          order: this.compareBankParams.order,
        };
        this.$http.put(globalConfig.temporary_server + 'registration/match/' + id, paramsForm).then(res => {
          if (res.code === 200) {
            console.log(res)
          } else {
          }
        }).catch(err => {
          console.log(err);
        })
      },
      openCustomer() {
        this.customerModule = true;
      },
      receiptSelectionChange(val) {//电子收据
        this.multipleSelection = val;
        let ids = [];
        this.running_ids = [];
        for (let item of this.multipleSelection) {
          ids.push(item.id);
        }
        this.running_ids = ids;
      },
      handleReceiptOk() {//确认生成电子数据
        let paramsForm = {
          "ra_ids": this.running_ids,
          "fund_id": this.current_row.id,//款项id
          "fund_type": 1,
          "remark": ''
        };
        this.$http.post(globalConfig.temporary_server + 'receipt', paramsForm).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: "操作成功",
              subMessage: '',
            });
            this.getReceiptDataLists();
          } else {
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
      openStaff() {
        this.staffModule = true;
      },
      //员工
      hiddenStaff(ids, names, arr) {
        this.staffModule = false;
        if (ids !== 'close') {
          this.new_record.flow_staff_name = names;
          this.new_record.flow_staff_id = ids[0];
        }
      },

      changeTabs(id) {
        this.chooseTab = id;
        this.is_table_choose = '';
        this.action_visible = false;
        this.bankFlowFlag=false;  //银行流水
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
            this.params.is_tail_fund = 2;
            this.params.is_rank_rent = '';//房租
            this.tableData = [];
            this.getReceiveList();
            break;
          case 5:  //银行流水
            this.bankFlowFlag=true;
            this.bankTabelList = [];
            this.getBankFlowList();  //获取银行流水的列表
            this.getBankTemplateFun(); //获取银行流水的所有银行模板
            break;
        }
      },


      registrate() {// 新增登记收款
        let paramsForm = {
          fund_id: this.current_row.id,
          collect_img: this.register_from.file_info,
          account_id: this.register_from.account_id,
          amount: this.register_from.amount,
          collection_time: this.register_from.collection_time,
          address: this.register_from.address,
          remark: this.register_from.remark,
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

      /*tableClickRow(row) {
        this.multipleSelection = [];
        if (this.is_table_choose === row.id) {
          this.is_table_choose = '';
          this.action_visible = true;
          this.action_visible = false;
          this.current_row = '';
        } else {
          this.is_table_choose = row.id;
          this.multipleSelection.push(row);
          this.current_row = row;
          this.action_visible = true;
          this.register_from.address = row.customer && row.customer.address;
        }
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },*/

      tableClickRow(row) {
        this.multipleSelection = [];
        if (this.is_table_choose === row.id) {
          this.is_table_choose = '';
          this.action_visible = true;
          this.action_visible = false;
          this.current_row = '';
        } else {
          this.is_table_choose = row.id;
          this.multipleSelection.push(row);
          this.current_row = row;
          this.action_visible = true;
          this.register_from.address = row.customer && row.customer.address;
        }
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      /*tableClickRowIndex(row) { //财务 收款页面 列表多选
        this.multipleSelection = [];
        if (this.is_table_choose === row.id) {
          //this.is_table_choose = '';
          this.action_visible = true;
          this.action_visible = false;
          this.current_row = '';
        } else {
          //this.is_table_choose = row.id;
          this.multipleSelection.push(row);
          this.current_row = row;
          this.action_visible = true;
          this.register_from.address = row.customer && row.customer.address;
        }
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },*/

      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },

      //删除
      handleOkDel() {
        //this.$http.delete(globalConfig.temporary_server + 'account_receivable/delete/' + this.current_row.id).then(res => {
        this.$http.delete(globalConfig.temporary_server + 'account_receivable/delete/', {
            params: {ids: _.map(this.multipleSelectionIndex, 'id')},
          }
        ).then(res => {
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
      handleSelectionChange(val, type) {
        if (type == 'index') {//列表 主页面
          this.multipleSelectionIndex = val;
          return;
        }
        //表单页面
        this.ra_ids = [];
        this.multipleSelection = val;
        for (let item in val) {
          this.ra_ids.push(val[item].id);
        }
      },
      handleProcess(row) {//回滚表单
        this.running_account_record = [];
        for (let item in row.running_account_record) {
          this.running_account_record.push({id: item, desc: row.running_account_record[item]});
        }
        this.running_account_count = this.running_account_record.length;
      },
      handleChangePage_runningAccount(page) {
        this.running_account_params.page = page;
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
          if (res.code === 200) {
            this.record_data = res.data.data;
            this.record_data_count = res.data.count;
          } else {
            this.record_data = [];
            this.record_data_count = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleChangePage_recordData(page) {//跟进列表分页
        this.record_data_params.page = page;
        this.getReceivable_follow();
      },

      async getReceiptDataLists(isReturn) {//通过款项获取银流水
        let ids = [];
        ids.push(this.current_row.id);
        let paramsForm = {
          fund_id: ids,
          cate: 1
        };
        if (!isReturn) {
          await this.$http.put(globalConfig.temporary_server + 'fund_flow_record/fund_flow', paramsForm).then(res => {
            this.showLoading(false);
            if (res.code === 200) {
              this.receiptData = res.data.data;
              this.count = res.data.count;
            } else {
              this.receiptData = [];
              this.count = 0;
            }
          })
        } else {
          return await this.$http.put(globalConfig.temporary_server + 'fund_flow_record/fund_flow', paramsForm);
        }

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
          if (res.code === 200) {
            this.mark_data = res.data.data;
            this.mark_data_count = res.data.count;
          } else {
            this.mark_data = [];
            this.mark_data_count = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleChangePage_markData(page) {//催缴备注分页
        this.mark_data_params.page = page;
        this.getReceivable_tag(this.current_row.id);
      },
      postReceivable_tag() {//新增催缴备注
        this.$http.post(globalConfig.temporary_server + 'account_receivable/urge_tag/' + this.current_row.id, this.new_mark).then(res => {
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
      handleOkReceive() {//应收入账
        let paramsForm = {
          account_id: this.receive_form.account_id,
          amount_received: this.receive_form.amount_received,
          pay_date: this.receive_form.pay_date,
          remark: this.receive_form.remark,
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
        let paramsForm = {
          customer_id: this.addForm.customer_id,
          identity: this.addForm.identity,
          pay_date: this.addForm.pay_date,
          description: this.addForm.description,
          amount_receivable: this.addForm.amount_receivable,
          subject_id: this.addForm.subject_id,
          remark: this.addForm.remark,
        };
        this.$http.post(globalConfig.temporary_server + 'account_receivable', paramsForm).then(res => {
          if (res.code === 200) {
            this.add_visible = false;
            this.$LjNotify('success', {
              title: '成功',
              message: "操作成功",
              subMessage: '',
            });
            this.getReceiveList();

          } else {
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
      /*getReceiveList() {//加载应收款列表
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'account_receivable', this.params).then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.count = res.data.count;
            this.balance_sum = res.data.balance_sum;
            this.receivable_sum = res.data.receivable_sum;
            this.received_sum = res.data.received_sum;
          } else {
            this.tableData = [];
            this.count = 0;
            this.balance_sum = 0;
            this.receivable_sum = 0;
            this.received_sum = 0;
          }
        })
      },*/

      getReceiveList() {//加载应收款列表
        if(!this.validatePermission('Receivable-List')) return;
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'account_receivable', this.params).then(async res => {
          this.showLoading(false);
          if (res.code === 200) {
            let resultData = res.data.data;
            let fund_id = _.map(resultData, 'id');
            let params = {
              fund_id,
              fund_type: 'receivable'
            };
            let tags = await this.$http.post(`${this.url}account_should_tag/tags`, params);
            let tagsResult = [];
            if (tags.code == 200) {
              tagsResult = tags.data.data;

            }else {
              _.forEach(resultData,(o)=> {
                o.remarks = '暂无备注';
              });
            }
            _.forEach(tagsResult, (o) => {
              let id = Number(o.id);
              if(o.data.count==0) {
                _.find(resultData,{id:id}).remarks = '暂无备注';
              }else {
                _.find(resultData,{id:id}).remarks = _.map(o.data.data,'content').join(',');
              }
            });


            this.tableData = resultData;
            this.count = res.data.count;
            this.balance_sum = res.data.balance_sum;
            this.receivable_sum = res.data.receivable_sum;
            this.received_sum = res.data.received_sum;
          } else {
            this.tableData = [];
            this.count = 0;
            this.balance_sum = 0;
            this.receivable_sum = 0;
            this.received_sum = 0;
          }
        })
      },


      //打开应收款项备注列表
      openRemarksList(row) {
        this.multi_field_form.assembly_id = row.id;
        this.tableSettingData.remarks.current_address = row.customer.address;
        this.getRemarkList();
        this.remarks_dialog_visible = true;
      },

      //添加新的备注
      addNewRemark(row) {
        let id = this.multi_field_form.assembly_id;//应收款项id
        let params = {
          content: this.new_mark.content,
        };
        this.$http.post(`${this.url}account_receivable/tag/${id}`, params).then(res => {
          this.$LjMessageEasy(res, () => {
            this.getRemarkList();
            this.getReceiveList();
          });
        });
      },

      //获取应收款项备注列表
      getRemarkList() {
        this.tableSettingData.remarks.tableData = [];
        let id = this.multi_field_form.assembly_id;//应收款项id
        let fund_id = [id];
        let params = {
          fund_id,
          fund_type: 'receivable',
        };
        this.new_remark_dialog_visible = false;
        this.$http.post(`${this.url}account_should_tag/tags`, params).then(res => {
            if(res.code==200) {
              let list = res.data.data[0]?.data?.data||[];
              for (let item of list) {
                let obj = {
                  id:item.id,
                  create_time: item.create_time,
                  content:item.content,
                  staff_name:item.operator.name,
                };
                this.tableSettingData.remarks.tableData.push(obj);
              }
            }
        });
      },

      handleClickBtn(key, row) {//表单操作栏
        if (key === 'should_receive') {//应收入账
          this.receive_visible = true;
          this.receive_form = row;
          this.receive_form.customer_name = row.customer.customer_name;
          this.receive_form.staff_name = row.staff.name;
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
        if (key === 'receipt') {//开收据
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
        if (key === 'generate') {//生成违约金日期
          this.generate_dialog_visible = true;
        }
        if (key === 'editTime') {//修改补齐时间
          this.edit_time_dialog_visible = true;
        }
        if (key === 'handleDelete') {//删除
          this.delete_visible = true;
        }
        if (key === 'sendMessage') {//发送短信
          this.pre_send_message_dialog_visible = true;
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
          let startTag = '';
          let endTag = '';
          let startRange = '';
          let endRange = '';
          if (val.tagDate) {
            startTag = val.tagDate[0];
            endTag = val.tagDate[1];
          }
          if (val.gatherDate) {
            startRange = val.gatherDate[0];
            endRange = val.gatherDate[1];
          }

          let paramsData = {
            page: 1,
            limit: 12,
            staff_ids: val.staff_ids,
            department_ids: val.department_ids,
            startTag: startTag,
            endTag: endTag,
            endRange: endRange,
            startRange: startRange,
            status: val.status,
            tag_status: val.tag_status,
            search: val.search,
            subject_id: val.subject_id,

          };
          for (let item of Object.keys(this.params)) {
            this.params[item] = paramsData[item];
          }
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
        if (this.which_subject === 'out_account') {
          this.out_form.subject_id = val.id;
          this.out_form.subject_name = val.title;
        }
      },


      /*批量发送短信*/
      handleMultiSendMessage() {
        let params = {
          ids: _.map(this.multipleSelectionIndex, 'id'),
          type: this.send_type_choose,
        };

        this.$http.put(`${this.url}account_receivable/notify`, params).then(res => {
          this.$LjMessageEasy(res, () => {
            this.pre_send_message_dialog_visible = false;
          });
        });
      },

      //发送短信之前 首先打开编辑手机号码表单
      beforeSend() {
        this.edit_phone_dialog_visible = true;
        this.edit_phone_form.phone = this.multi_field_form.phone;
      },

      //发送给客户
      handleSendMessage() {
        let params = {
          receipt_id: this.multi_field_form.id,
          phone: this.edit_phone_form.phone,
        };
        this.$http.post(`${this.url}sms/receipt`, params).then(res => {
          this.$LjMessageEasy(res, () => {
            this.edit_phone_dialog_visible = false;
            //this.receipt_detail_dialog_visible = false;
          });
        });
      },

      //提交修改用户名
      handleEditUserNameConfirm() {
        this.$refs['editUserNameFormRef'].validate((valid) => {
          if (valid) {
            let params = {
              name: this.edit_username_form.name
            };
            let id = this.multi_field_form.id;
            this.$http.put(`${this.url}receipt/name/${id}`, params).then(res => {
              this.$LjMessageEasy(res, async () => {
                this.edit_username_dialog_visible = false;
                let result = await this.getReceiptDataLists(true);
                this.receipt_detail_dialog_data = _.find(result.data.data, {id: this.multi_field_form.assembly_id})?.receipts[0];
              });
            });
          }
        });


      },
      //展示修改用户名对话框
      editUserName() {
        this.edit_username_dialog_visible = true;
        this.edit_username_form.name = this.multi_field_form.name;

      },

      //显示收据详情
      showReceiptDetail(row) {
        // consoleconsole.log(row);
        this.receipt_detail_dialog_visible = true;
        this.receipt_detail_dialog_data = row?.receipts[0];
        this.multi_field_form.id = row?.receipts[0].id;//电子收据id
        this.multi_field_form.assembly_id = row?.id;//流水id
      },


      /*生成违约金日期*/
      generateExitDate() {
        this.$refs['multiFieldFormExitDateRef'].validate((valid) => {
          if (valid) {
            let id = this.multi_field_form.assembly_id;//应收款项id
            let params = {
              exit_date: this.myUtils.formatDate(this.multi_field_form.exit_date, 'yyyy-MM-dd hh:mm:ss'),
            };

            this.$http.post(`${this.url}account_receivable/liquidate/${id}`, params).then(res => {
              this.$LjMessageEasy(res, () => {
                this.generate_dialog_visible = false;
              });
            });
          }
        });
      },
      /*修改补齐时间*/
      editCompleteTime() {
        this.$refs['multiFieldFormEditTimeRef'].validate((valid) => {
          if (valid) {
            let id = this.multi_field_form.assembly_id;//应收款项id
            let params = {
              complete_date: this.myUtils.formatDate(this.multi_field_form.complete_date, 'yyyy-MM-dd hh:mm:ss'),
            };

            this.$http.put(`${this.url}account_receivable/complete_date/${id}`, params).then(res => {
              if (res.code == 201) {//201生成滞纳金
                this.new_overdue_fine_form = res.data;
                if (res.data.details && res.data.details.constructor === Array && res.data.details.length > 0) {
                  this.new_overdue_fine_form.details = res.data.details[0];
                }
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                })
                this.$LjConfirm({title: '警告', content: '是否生成滞纳金？'}).then(() => {
                  this.new_overdue_fine_dialog_visible = true;
                }).catch(() => {
                  this.edit_time_dialog_visible = false;
                  this.getReceiveList();
                });
              } else if (res.code == 200) {
                this.$LjMessageEasy(res, () => {
                  this.edit_time_dialog_visible = false;
                  this.getReceiveList();
                });
              } else {

              }
            });
          }
        });
      },

      /*提交新增滞纳金*/
      handleNewOverdueFine() {
        this.$refs['newOverdueFineFormRef'].validate((valid) => {
          if (valid) {
            let id = this.multi_field_form.assembly_id;//应收款项id
            let params = {
              forfeit_day: this.new_overdue_fine_form.forfeit_day,
              pay_date: this.new_overdue_fine_form.pay_date,
              amount: this.new_overdue_fine_form.amount,
            };
            if (isNaN(params.amount)) {
              this.$LjMessage('warning', {
                title: '警告',
                msg: '金额请输入数字',
              });
              return;
            }
            this.$http.post(`${this.url}account_receivable/forfeit/${id}`, params).then(res => {
              this.$LjMessageEasy(res, () => {
                this.new_overdue_fine_dialog_visible = false;
                this.edit_time_dialog_visible = false;
                this.getReceiveList();
              });
            });
          }
        });
      },
      /**
       * 银行流水
       */
      // 获取银行流水列表（lili）
      getBankFlowList() {
        this.$http.get(`${globalConfig.temporary_server}bank_batch_count`,this.bankListPageParams).then(res => {
          if(res.code === 200){
              this.bankTabelList=res.data.data;
              this.bankListcount= res.data.count;
          }
        });
      },
      // 银行列表分页
      handleChangebankListPage(page){
        this.bankListPageParams.page=page;
        this.getBankFlowList();
      },
      // 点击银行列表中的某一条
      tableClickBankRow(row){
        this.bank_list_row=row;
        this.bankflow_detail_visible=true;
        this.getBankFlowDetail();
      },
      // 某一批次的银行流水(详情)
      getBankFlowDetail() {
        this.bankDetailPageParams['batch_flow_code']=this.bank_list_row.id;
         this.$http.get(`${globalConfig.temporary_server}/bank_fund_flow`,this.bankDetailPageParams).then(res => {
           if(res.code === 200){
              this.bankDetailList = res.data.data;
              this.bankDetailcount = res.data.count;
           }
         });
      },
      // 银行详情分页
      handleChangebankDetailPage(page){
        this.bankDetailPageParams.page = page;
        this.getBankFlowDetail();
      },
      // 导入图标的点击事件
      openBankFlowTempalte(){
        this.import_template.doc_id=[];
        this.import_template.bank_template='';
        this.bankflow_upload_visible=true;
      },
      //获取银行模板
      getBankTemplateFun() {
         let params={
           page:1,
           limit:999  //传100,可以返回所有数据
         };
         this.$http.get(`${globalConfig.temporary_server}/bank_template`,params).then(res => {
           if(res.code === 200){
             this.bankTemplateData=res.data.data;
           }else{

           }
         });
      },
      //导入银行流水
      uploadBankFundFlowFun() {
        this.$http.post(`${globalConfig.temporary_server}/bank_fund_flow?`,this.import_template).then(res => {
          if (res.code === 200) {
            this.bankflow_upload_visible=false;
            this.getBankFlowList();
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
          } else {
             this.bankflow_upload_visible=false;
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
          }
        });
      },
      // 根据账户类型查找账户
      getBankAccount(){
          let params={
            cate:this.bank_account_type,
            limit: 999,
            page: 1,
          }
          this.$http.get(globalConfig.temporary_server + "account", params).then(res => {
          // debugger
          if (res.code === 200) {
            this.BankAccountLists = res.data.data;
          }
        }).catch(err => {
          console.log(err);
        })
      }




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
      .batchEntry-icon {
        display: flex;
        flex-direction: row;
        align-items: center;

        i {
          font-style: normal;
          display: block;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        i:first-child {
          margin-right: 20px;
          @include financeImg('output.png', 'theme1')
        }

        i:last-child {
          @include financeImg('input.png', 'theme1')
        }
      }

      .allInsert {
        @include financeImg('allInsert.png', 'theme1')
      }

      .bankImport {
        @include financeImg('bankImport.png', 'theme1')
      }

      > div {
        .listTopRight {
          .home_icon {
            @include financeImg('yinhanglius.png', 'theme1');
          }
        }
      }


      .dialog_container {
        iframe {
          width: 1500px;
          height: 650px;
        }

        .receipt-img {
          @include financeImg('tp.png', 'theme1');
        }

        .href-img {
          @include financeImg('lianjie_2.png', 'theme1');
        }
      }

    }

    .bank-compare {

      .bank-left {

        span {

          i {
            @include financeImg('yiyuedu.png', 'theme1');
          }
        }

        .activeI {
          @include financeImg('weiyuedu.png', 'theme1');
          color: #FFFFFF;
        }
      }

      .bank-right {
        width: 50%;
        height: 600px;
      }

      .active {
        background: #ff4545;
        color: #FFFFFF;
      }

    }
  }
</style>
<style lang="scss">
  #theme_name.theme1 {
    #gathering {
      .el-table__body {
        .el-table__row {
          .cell {
            white-space: pre-wrap;
          }
        }
      }
    }
  }
</style>
