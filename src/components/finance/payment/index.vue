<template>
  <div id="payment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>付款</h1>
      </div>
      <div class="items-center listTopRight" v-show="!action_visible">
        <!--<div class="icons upLoad"></div>-->
        <el-tooltip content="批量入账" placement="bottom" :visible-arrow="false">
          <div class="icons allInsert" @click="openBatchEntry"></div>
        </el-tooltip>
        <el-tooltip v-show="$storage.get('VALIDATE_PERMISSION')['Payable-Save']" content="新增应付款项" placement="bottom"
                    :visible-arrow="false">
          <div class="icons add" @click="openAdd"><b>+</b></div>
        </el-tooltip>
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch"></div>
        </el-tooltip>
      </div>
    </div>
    <div class="action-bar changeChoose">
      <div class="action-bar-left" v-show="action_visible">
        <!--<el-checkbox>全选</el-checkbox>-->
        <!--<span class="check-count">已选中 <i>{{multipleSelection.length}}</i> 项</span>-->

        <span class="action-bar-name">
                    <span v-for="(item,index) in btnData"
                          v-show="item.show"
                          :key="index"
                          :class="item.class"
                          @click="handleClickBtn(item.methods,current_row,index,item.key)">
                        {{item.content}}
                    </span>
                </span>
      </div>
      <div class="action-bar-right">
        <span style="margin-right: 20px">应付金额（元） <i class="edit">{{ payableSum }}</i></span>
        <span style="margin-right: 20px">实付金额（元） <i class="check">{{ paidSum }}</i></span>
        <span style="margin-right: 20px">剩余款项（元） <i class="delete">{{ balanceSum }}</i></span>
      </div>
    </div>
    <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableLists"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        header-row-class-name="tableHeader"
        @selection-change="selectionChange"
        @cell-click="tableClickRow"
        style="width: 100%">
        <!--<el-table-column-->
        <!--type="selection" width="40">-->
        <!--</el-table-column>-->
        <el-table-column width="40">
          <template slot-scope="scope">
            <span class="table_choose" :class="{'is_table_choose': scope.row.id === is_table_choose }"></span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          v-for="item in Object.keys(paymentLabels)"
          :label="paymentLabels[item]" :key="item"
          :prop="item"
          :width="(item=='description.description'||item=='remark')?180:null"
          :align="(item=='description.description'||item=='remark')?'left':'center'"
        >
        </el-table-column>
        <el-table-column
          key="remarks"
          show-overflow-tooltip
          align="center"
          prop="remarks"
          label="备注"
        >
          <template slot-scope="scope">
            <div style="cursor: pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
                 v-html="scope.row.remarks" @click="openRemarksList(scope.row)"></div>
          </template>
        </el-table-column>

        <el-table-column label="状态" prop="" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color: #FFAB40">待入账</span>
            <span v-if="scope.row.status === 2" style="color: #FF7131">待结算</span>
            <span v-if="scope.row.status === 3" style="color: #0C66FE">已结清</span>
            <span v-if="scope.row.status === 4" style="color: #CF2E33">已超额</span>
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
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>


    <!--修改金额-->
    <lj-dialog :visible="pay_visible" :size="{width: 440 + 'px',height:300 + 'px'}" @close="pay_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改应付金额</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="formData" label-width="80px">
            <el-form-item prop="name" label="应付金额">
              <el-input placeholder="请输入" v-model="formData.amount_payable"
                        :disabled="current_row.is_rank===1?true:false"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkPay(current_row,formData.amount_payable)">确定
          </el-button>
          <el-button type="info" size="small" @click="pay_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--修改科目-->
    <lj-dialog :visible="show_subject" :size="{width: 440 + 'px',height: 300 + 'px'}" @close="show_subject = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改科目</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="formData" ref="payForm" class="demo-ruleForm" label-width="80px">
            <el-form-item prop="name" label="科目">
              <el-input placeholder="请输入" v-model="formData.subject_name"
                        @focus="handleOpenSubject('subject')"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkSubject(current_row,formData.subject_id)">确定
          </el-button>
          <el-button type="info" size="small" @click="show_subject = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--补齐时间-->
    <lj-dialog :visible="complete_visible" :size="{width: 440 + 'px',height: 300 + 'px'}"
               @close="complete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改补齐时间</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="formData" ref="payForm" class="demo-ruleForm" label-width="80px">
            <el-form-item prop="name" label="补齐时间">
              <el-date-picker
                v-model="formData.complete_date" type="date">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small"
                     @click="handleOkCompleteData(current_row)">确定
          </el-button>
          <el-button type="info" size="small" @click="complete_visible = false;current_row = ''">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>
    <!--应付时间-->
    <lj-dialog :visible="payData_visible" :size="{width: 440 + 'px',height: 300 + 'px'}"
               @close="payData_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改应付时间</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="formData" ref="payForm" class="demo-ruleForm" label-width="80px">
            <el-form-item prop="name" label="应付时间">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formData.pay_date" type="date">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkPayDate(current_row)">确定
          </el-button>
          <el-button type="info" size="small" @click="payData_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--应付入账-->
    <lj-dialog :visible="transfer_visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
               @close="transfer_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>应付入账</h3>
        </div>
        <div class="dialog_main borderNone">

          <el-form :model="transferForm" label-width="80px">
            <el-form-item label="付款方式">
              <el-select placeholder="请选择" v-model="transferForm.pay_type" @change="getAccount">
                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款账号">
              <el-select placeholder="请选择" v-model="transferForm.account_id"
                         :disabled="is_disabled">
                <el-option v-for="(item,index) in accountLists" :label="item.name"
                           :value="item.id"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户账户">
              <el-input placeholder="请输入" v-model="transferForm.customer_account_num"
                        :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="账户类型">
              <el-select placeholder="请选择" v-model="transferForm.customer_account_type"
                         :disabled="true">
                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款金额">
              <el-input placeholder="请输入" v-model="transferForm.amount_paid"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input placeholder="请输入" v-model="transferForm.remark"
                        type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="付款时间">
              <el-date-picker
                v-model="transferForm.pay_date" type="date">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="补齐时间">
              <el-date-picker
                v-model="transferForm.complete_date" type="date">
              </el-date-picker>
            </el-form-item>
          </el-form>

        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkTransfer(current_row)">确定
          </el-button>
          <el-button type="info" size="small" @click="transfer_visible = false">取消</el-button>
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


    <!--新增应付款项-->
    <lj-dialog :visible="add_visible" :size="{width: 600 + 'px',height: 700 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
        </div>
        <div class="dialog_main borderNone">

          <el-form :model="ruleForm" label-width="80px">
            <el-form-item prop="name" label="客户名称">
              <el-input placeholder="请点击选择客户名称" v-model="ruleForm.customer_name"
                        @focus="openCustomer" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="客户身份">
              <el-input placeholder="请点击选择客户名称"
                        :disabled="true"
                        :value="ruleForm.customer_identity===1?'业主':ruleForm.customer_identity===2 ?'租客':''"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="账户类型">
              <el-select placeholder="请选择" v-model="ruleForm.customer_account_type">
                <el-option v-for="(item,index) in cate" :label="item.title" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name" label="客户账户">
              <el-input placeholder="请输入" v-model="ruleForm.customer_account_num" type="number"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="应付金额">
              <el-input placeholder="请输入" v-model="ruleForm.amount_payable"
                        type="number"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="科目">
              <el-input placeholder="请输入" v-model="ruleForm.subject_name"
                        @focus="handleOpenSubject('subject')"></el-input>
            </el-form-item>
            <el-form-item label="款项来源">
              <el-select v-model="ruleForm.identity" placeholder="请选择">
                <el-option v-for="(item,index) in identityData" :label="item.name" :value="item.id"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name" label="付款时间">
              <el-date-picker
                v-model="ruleForm.pay_date" type="date" placeholder="请输入">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="name" label="详情">
              <el-input placeholder="请输入" v-model="ruleForm.description"
                        type="textarea"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="备注">
              <el-input placeholder="请输入" v-model="ruleForm.remark" type="textarea"></el-input>
            </el-form-item>
          </el-form>

        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkAdd()">确定</el-button>
          <el-button type="info" size="small" @click="add_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--删除lord-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
               @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该付款信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkDel(current_row)">确定</el-button>
          <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--科目-->
    <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"
                style="z-index:1000"></lj-subject>

    <!--回滚-->
    <lj-dialog :visible="recall_visible" :size="{width: 900 + 'px',height: 560 + 'px'}"
               @close="recall_visible = false;current_row = ''">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>回滚</h3>
        </div>
        <div class="dialog_main changeChoose">
          <el-table
            :data="running_account_record"
            :row-class-name="tableChooseRow"
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
          <el-button type="danger" size="small" @click="handleOkRecall">确定</el-button>
          <el-button type="info" size="small" @click="recall_visible = false;current_row = '';">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <customer :module="customerModule" @close="hiddenCustomer"></customer>

    <!--批量入账-->
    <lj-dialog :visible="batchEntry_visible" :size="{width: 900 + 'px',height: 560 + 'px'}"
               @close="batchEntry_visible = false;current_row = ''">
      <div class="dialog_container">
        <div class="dialog_header justify-bet">
          <h3>批量入账</h3>
          <h3 class="batchEntry-icon">
            <i class="" v-if="$storage.get('VALIDATE_PERMISSION')['Batch-Payable-Export']"
               @click="out_account_visible = true"></i>
            <i class="" v-if="$storage.get('VALIDATE_PERMISSION')['Batch-Payable-Import']"
               @click="import_account_visible = true"></i>
          </h3>
        </div>
        <div class="dialog_main changeChoose">
          <el-table
            :data="batchEntryData"
            :row-class-name="tableChooseRow"
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

    <!--批量入账导出-->

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

    <!--<LjSubject :visible="subject_visible"></LjSubject>-->
  </div>
</template>

<script>
  import _ from 'lodash';
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';
  import CustomerLists from './components/customerLists';
  import {paySearchList} from "../../../assets/js/allSearchData.js";
  import Customer from '../../common/customer.vue';
  import Upload from './components/ButtonUpload'

  export default {
    name: "index",
    components: {SearchHigh, LjDialog, FinMenuList, LjSubject, CustomerLists, Customer, Upload},
    data() {
      return {

        url: globalConfig.temporary_server,


        is_table_choose: '',

        payableSum: '',
        paidSum: '',
        balanceSum: '',

        import_account_visible: false,
        out_account_visible: false,
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
        paySearchList,
        action_visible: false,//操作栏作态
        action_status: {//操作条状态
          delete_visible: false,
          edit_visible: false,
          details_visible: false,
          is_check: false,
        },
        identityData: [//款项来源
          {id: 1, name: '房东'},
          {id: 2, name: '租客'},
          {id: 3, name: '未知客户'},
          {id: 5, name: '结算单'},
          {id: 6, name: '片区费用'},
          {id: 7, name: '报备费用'},
          {id: 8, name: '应收款项'},
        ],
        current_row: '',
        multipleSelection: [],//多选
        params: {
          is_del: '',//是否显示删除数据
          staff_id: '',
          department_id: '',
          status: '',//入账状态
          date_min: '',//时间周期最小
          date_max: '',
          subject_id: '',
          balance_min: '',//剩余款项范围-最小
          balance_max: '',
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: '',
          export: '',
          cate: '',
        },

        delete_visible: false,//删除
        add_visible: false,//新增
        pay_visible: false,//应付金额
        recall_visible: false,//回滚
        payData_visible: false,//应付时间
        complete_visible: false,//补齐时间
        transfer_visible: false,//应付入账
        subject_visible: false,//科目
        show_subject: false,//科目
        customer_visible: false,//客户列表
        is_disabled: true,


        remarks_dialog_visible: false,//应付款项备注列表dialog
        new_remark_dialog_visible: false,//新增备注
        new_mark: {
          content: '',
          //category: 1,
        },
        multi_field_form: {
          id: '',//电子收据id
          assembly_id: '',//流水id
        },
        tableSettingData: {
          remarks: {//付款列表备注
            params: {},
            count: 0,
            tableData: [],
            current_address: '',
          },
        },

        running_account_record: [],//回滚数据
        ra_ids: [],

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

        showSearch: false,
        showFinMenuList: false,
        searchData: {//查询参数

        },

        tableLists: [],
        paymentLabels: {
          "pay_date": "付款时间",
          "customer.customer_name": "客户姓名",
          "customer.address": "地址",
          "subject.title": "支出科目",
          "amount_payable": "应付金额",
          "amount_paid": "实付金额",
          "balance": "剩余款项",
          "complete_date": "补齐时间",
          "customer.contact": "手机号",
          "description.description": "明细详情",
          // "remark": "备注",
          "leader.name": "负责人",
          "staff.name": "开单人",
          "org.name": "部门"
        },
        count: 0,
        ruleForm: {//新增应付款项
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
        subject_val: '',
        formData: {
          complete_date: '',  //补齐时间
          pay_date: '',  //应付时间
        },

        transferForm: {},//应付入账
        cate: [
          {title: "银行卡", value: 1,},
          {title: "支付宝", value: 2,},
          {title: "微信", value: 3,},
          {title: "银行卡(数据来自房管中心)", value: 4,},
        ],

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
        btnData: [
          {
            label: "",
            type: "primary",
            icon: "el-icon-edit",
            size: "small",
            methods: "handleEditPay",
            content: "金额",
            key: "pay_visible",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Amount'],
          },
          {
            label: "",
            type: "success",
            icon: "el-icon-tickets",
            size: "small",
            methods: "handleSub",
            content: "科目",
            key: "show_subject",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Edit-Subject'],
          },
          {
            label: "",
            type: "info",
            icon: "el-icon-date",
            size: "small",
            methods: "handleComplete",
            content: "补齐时间",
            key: "complete_visible",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Complete-Date'],
          },
          {
            label: "",
            type: "warning",
            icon: "el-icon-time",
            size: "small",
            methods: "handlePayTime",
            content: "应付时间",
            key: "payData_visible",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Pay-Date']
          },
          {
            label: "",
            type: "primary",
            icon: "el-icon-date",
            size: "small",
            methods: "handleComplete",
            content: "应付入账",
            key: "transfer_visible",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Transfer'],
          },
          {
            label: "",
            type: "warning",
            icon: "el-icon-edit",
            size: "small",
            methods: "handleProcess",
            content: "回滚",
            key: "recall_visible",
            class: 'edit',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Revert'],
          },
          {
            label: "",
            type: "danger",
            icon: "el-icon-delete",
            size: "small",
            methods: "handleDelete",
            content: "删除",
            key: "delete_visible",
            class: 'delete',
            show: this.$storage.get('VALIDATE_PERMISSION')['Payable-Delete'],
          },
        ],
        accountLists: [],
        chooseRowIds: [],
        customerModule: false,//

        batchEntry_visible: false,//批量入账
        batchEntryData: [],
        batchEntryCount: 0,
        batchEntryParams: {
          limit: 12,
          page: 1,

        },

        import_file: '',
        // 选中当前的列表的数据
        current_row_info: {},
      }
    },
    mounted() {
      this.getPaymentList();

    },
    activated() {
    },
    watch: {},
    created() {
    },
    computed: {},
    methods: {
      importOk() {
        this.$http.post(globalConfig.temporary_server + 'batch_payable/import', {doc_id: this.import_file}).then(res => {
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
        this.$http.get(globalConfig.temporary_server + 'batch_payable/export', this.out_form).then(res => {
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
        this.is_disabled = true;
        this.accountLists = [];
      },
      cancelImportAccount() {//取消批量导入
        this.import_file = '';
        this.import_account_visible = false;
      },
      selectionChange(val) {//首页表单多选
        this.multipleSelection = val;
        if (val.length > 0) {
          this.action_visible = true;
          this.current_row = val[0];
          this.formData = val[0];
        } else {
          this.action_visible = false;
        }
      },
      openBatchEntry() {
        this.batchEntry_visible = true;
        this.getBatchEntryList();
      },
      //获取应付批量入账列表
      getBatchEntryList() {
        if (!this.validatePermission('Batch-Payable-List')) return;
        this.$http.get(globalConfig.temporary_server + "batch_payable", this.batchEntryParams).then(res => {
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
        for (let item of Object.keys(this.ruleForm)) {
          this.ruleForm[item] = '';
        }
      },
      handleBatchEntryChangePage(page) {//批量入账分页
        this.batchEntryParams.page = page;
        this.getBatchEntryList();
      },
      openCustomer() {//客户组件
        this.customerModule = true;
      },
      hiddenCustomer(val) {//获取客户
        this.customerModule = false;
        this.ruleForm.customer_name = val.name;
        this.ruleForm.customer_identity = val.identity;
        this.ruleForm.customer_id = val.id;
      },
      // 当前点击
      tableClickRow(row) {
        this.multipleSelection = [];
        if (this.is_table_choose === row.id) {
          this.action_visible = false;
          this.is_table_choose = '';
        } else {
          this.is_table_choose = row.id;
          this.multipleSelection.push(row);
          this.action_visible = true;
        }
        this.current_row = row;
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
        this.current_row_info = row; //用于补齐和应付时间使用
      },
      tableChooseRow({row, rowIndex}) {// 点击过
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleChangePage(page) {//分页
        this.params.page = page;
        this.getPaymentList();
      },
      callbackSuccess(res, callback) {//请求回调
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getPaymentList();
          if (callback) {
            callback();
          }
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },

      handleOkPay(row, val) {//修改金额
        this.$http.put(globalConfig.temporary_server + "account_payable/edit_pay_amount/" + row.id, {amount_payable: val}).then(res => {
          this.callbackSuccess(res);
          this.pay_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },

      handleOpenSubject(which) {//显示科目组件
        this.which_subject = which;
        this.subject_visible = true;
      },

      handleConfirmSubject(val) { //科目确定
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'subject') {
          this.subject.parent_name = val.title;
          this.subject.parent_id = val.id;

          this.formData.subject_id = val.id;
          this.formData.subject_name = val.title;

          this.ruleForm.subject_id = val.id;
          this.ruleForm.subject_name = val.title;
        }
        if (this.which_subject === 'out_account') {
          this.out_form.subject_id = val.id;
          this.out_form.subject_name = val.title;
        }
      },

      handleOkSubject(row, val) { //修改科目
        this.$http.put(globalConfig.temporary_server + "account_payable/subject/" + row.id, {subject_id: val}).then(res => {
          /*this.callbackSuccess(res);
          this.show_subject = false;
          this.current_row = '';*/
          this.$LjMessageEasy(res, () => {
            this.show_subject = false;
            this.current_row = '';
          });
        });
      },

      handleOkCompleteData(row) {//修改补齐时间
        // 时间格式转化
        let date = new Date(this.formData.complete_date);
        let complete_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.$http.put(globalConfig.temporary_server + "account_payable/complete_date/" + this.current_row_info.id, {complete_date: complete_date}).then(res => {
          // this.$http.put(globalConfig.temporary_server + "account_payable/complete_date/" + row.id, {complete_date: complete_date}).then(res => {
          this.callbackSuccess(res, function () {
          });
          this.complete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      handleOkPayDate(row) {//修改付款时间
        let date = new Date(this.formData.pay_date);
        let pay_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.$http.put(globalConfig.temporary_server + "account_payable/pay_date/" + this.current_row_info.id, {pay_date: pay_date}).then(res => {
          // this.$http.put(globalConfig.temporary_server + "account_payable/pay_date/" + row.id, {pay_date: pay_date}).then(res => {
          // this.callbackSuccess(res);
          this.callbackSuccess(res, function () {
          });
          this.payData_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },

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

      handleOkTransfer(row) { //确认应付入账
        let paramsForm = {
          customer_account_num: this.transferForm.customer_account_num,
          customer_account_type: this.transferForm.customer_account_type,
          account_id: this.transferForm.account_id,
          amount_paid: this.transferForm.amount_paid,
          remark: this.transferForm.remark,
          pay_date: this.transferForm.pay_date,
          complete_date: this.transferForm.complete_date,
        };
        this.$http.put(globalConfig.temporary_server + "account_payable/transfer/" + row.id, paramsForm).then(res => {
          this.callbackSuccess(res);
          if (res.code === 200) {
            this.is_table_choose = '';
            this.action_visible = false;
            this.transfer_visible = false;
            this.current_row = '';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSelectionChange(val) {// 回滚多选
        this.ra_ids = [];
        this.multipleSelection = val;
        for (let item in val) {
          this.ra_ids.push(val[item].id);
        }
      },

      handleOkRecall() {//确认回滚
        this.$http.put(globalConfig.temporary_server + 'account_payable/revert/' + this.current_row.id, {running_account_ids: this.ra_ids}).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
            this.recall_visible = false;
            this.action_visible = false;
            this.is_table_choose = '';
            this.current_row = '';
            this.getPaymentList();
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
      handleOkAdd() {//新增
        this.$http.post(globalConfig.temporary_server + 'account_payable', this.ruleForm).then(res => {
          this.callbackSuccess(res, () => {
            this.add_visible = false;
          });
        }).catch(err => {
          console.log(err);
        })
      },
      handleOkDel(row) {//删除
        this.$http.delete(globalConfig.temporary_server + 'account_payable/delete/' + row.id).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      handleClickBtn(func, row, index, key) { // 操作栏回调
        this.current_row = row;
        if (key === "complete_visible") {
          this.complete_visible = true;
          // this.formData.complete_date = this.current_row.complete_date;
          this.formData.complete_date = this.current_row_info.complete_date;
        }
        if (key === "subject_visible") {//科目
          this.subject_visible = true;
        }
        if (key === "recall_visible") {//回滚
          this.recall_visible = true;
          this.running_account_record = [];
          this.recall_visible = true;
          for (let item in row.running_account_record) {
            this.running_account_record.push({
              id: item,
              desc: this.current_row.running_account_record[item]
            });
          }
        }
        if (key === "pay_visible") {
          this.pay_visible = true;
          console.log(row)
          this.formData.amount_payable = this.current_row.amount_payable;
        }
        if (key === "payData_visible") {
          this.payData_visible = true;
          // this.formData.pay_date = this.current_row.pay_date;
          this.formData.pay_date = this.current_row_info.pay_date;
        }
        if (key === "delete_visible") {
          this.delete_visible = true;
        }
        if (key === "show_subject") {
          this.show_subject = true;
          this.formData.subject_name = this.current_row.subject.title;
          this.formData.subject_id = this.current_row.subject_id;
        }
        if (key === "transfer_visible") {//应付入账
          this.transfer_visible = true;
          console.log(row);
          this.transferForm = row;
        }
      },
      getPaymentList() {//加载应付款项列表
        if (!this.validatePermission('Payable-List')) return;
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'account_payable', this.params).then(async res => {
          this.showLoading(false);
          if (res.code === 200) {
            res.data.data = res.data.data.sort(
              function (a, b) {
                return a.id - b.id
              }
            );

            let resultData = res.data.data;
            let fund_id = _.map(resultData, 'id');
            let params = {
              fund_id,
              fund_type: 'payable'
            };
            let tags = await this.$http.post(`${this.url}account_should_tag/tags`, params);
            let tagsResult = [];
            if (tags.code == 200) {
              tagsResult = tags.data.data;

            } else {
              _.forEach(resultData, (o) => {
                o.remarks = '暂无备注';
              });
            }
            _.forEach(tagsResult, (o) => {
              let id = Number(o.id);
              if (o.data.count == 0) {
                _.find(resultData, {id: id}).remarks = '暂无备注';
              } else {
                _.find(resultData, {id: id}).remarks = _.map(o.data.data, 'content').join(',');
              }
            });
            this.tableLists = resultData;
            this.count = res.data.count;
            this.payableSum = res.data.payableSum;
            this.paidSum = res.data.paidSum;
            this.balanceSum = res.data.balanceSum;
          } else {
            this.tableLists = [];
            this.count = 0;
            this.balanceSum = 0;
            this.paidSum = 0;
            this.balanceSum = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },


      //打开应付款项备注列表
      openRemarksList(row) {
        this.multi_field_form.assembly_id = row.id;
        this.tableSettingData.remarks.current_address = row.customer.address;
        this.getRemarkList();
        this.remarks_dialog_visible = true;
      },

      //添加新的备注
      addNewRemark(row) {
        let id = this.multi_field_form.assembly_id;//应付款项id
        let params = {
          content: this.new_mark.content,
        };
        this.$http.post(`${this.url}account_payable/tag/${id}`, params).then(res => {
          this.$LjMessageEasy(res, () => {
            this.getRemarkList();
            this.getPaymentList();
          });
        });
      },

      //获取应付款项备注列表
      getRemarkList() {
        this.tableSettingData.remarks.tableData = [];
        let id = this.multi_field_form.assembly_id;//应收款项id
        let fund_id = [id];
        let params = {
          fund_id,
          fund_type: 'payable',
        };
        this.new_remark_dialog_visible = false;
        this.$http.post(`${this.url}account_should_tag/tags`, params).then(res => {
          if (res.code == 200) {
            let list = res.data.data[0]?.data?.data || [];
            for (let item of list) {
              let obj = {
                id: item.id,
                create_time: item.create_time,
                content: item.content,
                staff_name: item.operator.name,
              };
              this.tableSettingData.remarks.tableData.push(obj);
            }
          }
        });
      },

      highSearch() {// 高级搜索
        this.showSearch = true;
        this.searchData = this.paySearchList;
      },
      hiddenModule(val) {// 确认搜索
        this.showSearch = false;
        if (val !== 'close') {
          for (let item of Object.keys(this.params)) {
            this.params[item] = val[item];
          }
          this.params.staff_id = val.staff[0];
          this.params.department_id = val.department[0];
          this.getPaymentList();
        }
      },

    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/payment/index.scss";

  @mixin paymentImg($n, $m) {
    $url: '../../../assets/image/finance/' + $m + '/' + $n;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #payment {
      .upLoad {
        @include paymentImg('upLoad.png', 'theme1')
      }

      .allInsert {
        @include paymentImg('allInsert.png', 'theme1')
      }

      .batchEntry-icon {
        i {

        }

        i:first-child {
          @include paymentImg('output.png', 'theme1')
        }

        i:last-child {
          @include paymentImg('input.png', 'theme1')
        }
      }

    }
  }
</style>
