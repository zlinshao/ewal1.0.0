<!--员工名册-->
<template>
  <div id="staffRoster">
    <div class="mainListTable"  :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-dblclick="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <div v-for="(item,index) in table_column" :key="index">
          <el-table-column :width="item.width" show-overflow-tooltip  :label="item.val" :prop="item.key" :align="item.position=='left'?'left':'center'" v-if="item.info">
            <template slot-scope="scope">
              <span v-if="item.key.indexOf('staff') === -1">
                {{ item.info[scope.row[item.key]] ? item.info[scope.row[item.key]] : '/' }}
              </span>
              <span v-else>
                {{ scope.row.staff && item.info[scope.row.staff[item.key.split('.')[1]]] ? item.info[scope.row.staff[item.key.split('.')[1]]] : '/' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :min-width="item.width" show-overflow-tooltip :label="item.val" :align="item.position=='left'?'left':'center'" v-else-if="item.isArray" :fixed="item.key === 'position'">
            <template slot-scope="scope">
              <span v-if="item.key.indexOf('staff') === -1">
                <span v-if="scope.row[item.key] && scope.row[item.key].length > 0">
                  <span v-for="(tmp,idx) in scope.row[item.key]" :key="idx">{{ tmp[item.showKey ]}} <a v-if="idx !== scope.row[item.key].length - 1">;</a></span>
                </span>
                <span v-else>/</span>
              </span>
              <span v-else>
                <span v-if="scope.row.staff && scope.row.staff[item.key.split('.')[1]] && scope.row.staff[item.key.split('.')].length > 0">
                  <span v-for="(tmp,idx) in scope.row.staff[item.key.split(',')[1]]" :key="idx">{{ tmp[item.showKey] }} <a v-if="idx !== scope.row.staff[item.key.split('.')[1]] - 1">;</a></span>
                </span>
                <span v-else>/</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column :min-width="item.width" show-overflow-tooltip :label="item.val" :align="item.position=='left'?'left':'center'" v-else-if="item.isBtn">
            <template slot-scope="scope"><el-button type="text" v-if="scope.row.staff && scope.row.staff[item.key.split('.')[1]]" size="small" @click.stop="handleLookInfo(scope.row,item.key)">查看</el-button>
              <el-button type="text" v-else-if="! scope.row.staff[item.key.split('.')[1]] && item.isGenerate" size="small" @click.stop="generateContract(scope.row,item.key)">生成</el-button>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column :min-width="item.width" :label="item.val"  :align="item.position=='left'?'left':'center'" v-else-if="item.key=='is_enable'">
            <template slot-scope="scope"><span>{{scope.row.is_enable ? '禁用' : '启用'}}</span></template>
          </el-table-column>
          <el-table-column :min-width="item.width" show-overflow-tooltip :label="item.val" :prop="item.key" :align="item.position=='left'?'left':'center'" v-else-if="item.key === 'name'" fixed="left" style="background-color: white"></el-table-column>
          <el-table-column :min-width="item.width" show-overflow-tooltip :label="item.val" :prop="item.key" :align="item.position=='left'?'left':'center'" v-else></el-table-column>
        </div>
        <el-table-column label="操作" align="center" width="260">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="operateModule('power',scope.row)">权限</el-button>
                  <el-button type="text" size="mini" :disabled="scope.row.is_on_job===null? false:true" @click="operateModule('leave',scope.row)">离职</el-button>
                  <el-button type="text" size="mini" @click="operateModule('disabled',scope.row)">{{scope.row.is_enable ? '启用' : '禁用'}}</el-button>
                </template>
              </el-table-column>
      </el-table>
      <lj-dialog
      :visible="disable_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="disable_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{currentStaff.is_enable ? '启用' : '禁用'}}</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定{{ currentStaff.is_enable ? '启用' : '禁用'}}该员工吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkDisable">确定</el-button>
          <el-button type="info" size="small" @click="disable_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--离职==================================================================================================-->
    <lj-dialog :visible="leaveVisible" :size="leave_size" @close="leaveVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>离职</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="outForm" ref="leaveForm" :rules="rules"  label-width="120px" class="depart_visible">
            <el-form-item label="离职日期" prop="dismiss_time" required>
              <el-date-picker type="date" value-format="yyyy-MM-dd"  v-model="outForm.dismiss_time"></el-date-picker>
            </el-form-item>
            <el-form-item label="离职原因" prop="dismiss_reason.dismiss_type" required>
              <el-select v-model="outForm.dismiss_reason.dismiss_type">
                <el-option :value="1" label="主动离职"></el-option>
                <el-option :value="2" label="旷工离职"></el-option>
                <el-option :value="3" label="劝退"></el-option>
                <el-option :value="4" label="开除"></el-option>
                <el-option :value="5" label="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="具体描述" required>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="outForm.dismiss_reason.dismiss_mess">
              </el-input>
            </el-form-item>
            <div>
              <el-checkbox-group v-model="checkLists" style="display: flex;justify-content: center;color: #D2D2D2;">
                <el-checkbox :label="1">发送离职群消息</el-checkbox>
                <el-checkbox :label="2">发送离职短信</el-checkbox>
                <el-checkbox :label="3">发送离职证明</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitOut">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelOut">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--权限管理===============================================================================================-->
    <lj-dialog :visible="powerVisible" :size="power_size" @close="handleCancelSetPower">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>权限</h3>
        </div>
        <div class="dialog_main powerContent space-column">
          <div class="powerHead items-bet">
            <div class="inputLabel borderNone">
              <h4>权限类型</h4> 
              <!-- disabled :popper-class="'appTheme' + themeName" -->
              <el-select  placeholder="请选择" v-model="self_power_params.type" size="small" @change="handleChangePowerType">
                <el-option value="position" label="岗位"></el-option>
                <el-option value="user" label="用户"></el-option>
                <el-option value="ban" label="黑名单"></el-option>
                <!-- <el-option value="all" label="全部"></el-option> -->
              </el-select>
            </div>
             <div class="inputLabel borderNone" v-show="self_power_params.type=='position'">
                <h4>岗位</h4> 
                <post-choose size="mini" :num="1" v-model="self_power_params.position_id"></post-choose>
            </div>
            <div class="inputLabel borderNone" v-show="self_power_params.type=='position'">
                <h4></h4> 
                <!-- <post-choose  v-model="self_power_params.position"></post-choose> -->
            </div>
          </div>
          <div class="powerTabs">
            <el-tabs v-model="powerName" @tab-click="handleClick">
              <el-tab-pane :label="item.name" :name="item.id.toString()" v-for="(item,index) in powerNames" :key="index">
                <p class="childPower" v-if="module_list.length > 0">
                  <span :class="{'hover':powerChildName === tmp.id}" v-for="tmp in module_list"
                        @click="handleName(tmp)">{{tmp.name}}</span>
                </p>
                <p class="childPower" v-else>
                  <span>暂无数据</span>
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-if="module_list.length > 0">
            <div class="flex powerMain scroll_bar changeChoose" v-for="item in module_list" v-if="item.id === powerChildName">
              <div v-if="power_list">
                <el-checkbox :disabled="!$storage.get('VALIDATE_PERMISSION')['Permission-Update']" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
              </div>
              <div v-else>暂无权限</div>
              <div v-for="(item,key) in power_list">
                <el-checkbox-group :disabled="!$storage.get('VALIDATE_PERMISSION')['Permission-Update']" v-model="checkList" @change="handleCheck">
                  <el-row v-for="(tmp,idx) in power_list[key]" :key="idx">
                    <el-col :span="6">
                      <el-button type="text" size="large" @click="handleSearchField(tmp)" style="color: #CF2E33;font-size: 18px"></el-button>
                    </el-col>
                    <el-col :span="18">
                      <el-checkbox :label="tmp.id" :key="tmp.id" style="margin-top: 13px">
                        {{tmp.name}}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
            <div style="border-top: 1px solid #e6f1fe;background-color: white;">
             <div v-if="show_field_list.length > 0" class="changeChoose">
               <el-checkbox-group v-model="field_list" @change="handleCheckField">
                 <div class="flex" style="height: 40px;line-height: 40px;padding-left: 10px">
                   <el-checkbox v-for="(tmp,idx) in show_field_list" :key="idx" :label="tmp.id">{{ tmp.name }}</el-checkbox>
                 </div>
               </el-checkbox-group>
             </div>
              <div v-else style="height: 40px;line-height: 40px;font-size: 14px;padding-left: 10px">
                暂无字段权限
              </div>
            </div>
          </div>
          <div v-else>
            <div class="powerMain" style="padding-left: 30px">暂无权限</div>
            <div style="height: 40px;line-height: 40px;font-size: 14px;padding-left: 10px">
              暂无字段权限
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitSetPower">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelSetPower">取消</el-button>
        </div>
      </div>
    </lj-dialog>
      <!--劳务合同-->
      <div class="labour_contract scroll_bar" :class="{'hide_labour_contract': labour_contract_visible}">
        <div>
          <h1>南京市劳务合同书</h1>
          <h4>（2015修订版）</h4>
          <el-form size="small" style="text-align: left">
            <el-form-item class="item_margin">
              <div class="flex" style="margin-top: 50px">
                <div style="width: 150px">甲方（单位全称）</div>
                <el-input v-model="labour_form.company_name"></el-input>
              </div>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 80px">单位类型</div>
                    <el-input value="有限责任公司"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 280px">法定代表人（或负责人）</div>
                    <el-input v-model="labour_form.leader_name"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">登记注册地</div>
                    <el-input v-model="labour_form.register_place"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 50px">邮编</div>
                    <el-input v-model="labour_form.postal_code"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">实际经营地</div>
                    <el-input v-model="labour_form.real_place"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 50px">邮编</div>
                    <el-input v-model="labour_form.postal_code"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">联系部门</div>
                    <el-input value="人力资源部"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 80px">联系电话</div>
                    <el-input v-model="labour_form.telephone"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin" style="margin-top: 50px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 180px">乙方（职工）姓名</div>
                    <el-input v-model="labour_form.name"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">性别</div>
                    <el-input v-model="labour_form.gender"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">出生年月</div>
                    <el-date-picker v-model="labour_form.birthday" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">工作地点</div>
                    <el-input v-model="labour_form.work_space"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <div class="flex">
                <div style="width: 250px">在本单位工作起始时间</div>
                <el-date-picker v-model="labour_form.begin_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">合同履行地</div>
                    <el-input v-model="labour_form.work_address"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">岗位</div>
                    <el-input v-model="labour_form.position"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="item_margin">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="flex">
                    <div style="width: 150px">合同编号前缀</div>
                    <el-input v-model="labour_form.number_prefix"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="flex-center">
            <el-button size="small" type="danger" @click="ok_send_contract = true">发送</el-button>
            <el-button size="small" type="info" @click="labour_contract_visible = true">取消</el-button>
          </div>
        </div>
      </div>

      <!--确定发送劳务合同-->
      <lj-dialog
              :visible="ok_send_contract"
              :size="{width: 400 + 'px',height: 250 + 'px'}"
              @close="ok_send_contract = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定发送该劳务合同吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmContract">确定</el-button>
            <el-button type="info" size="small" @click="ok_send_contract = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
      <!--在职证明-->
      <lj-dialog
              :visible="ok_send_employ_proof"
              :size="{width: 600 + 'px',height: 450 + 'px'}"
              @close="ok_send_employ_proof = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>在职证明</h3>
          </div>
          <div class="dialog_main">
            <el-form size="small" style="text-align: left">
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">姓名</div>
                  <el-input v-model="employ_proof_form.name"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">身份证号</div>
                  <el-input v-model="employ_proof_form.ID_number"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">入职日期</div>
                   <el-date-picker
                    v-model="employ_proof_form.start_date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                  <!-- <el-input v-model="employ_proof_form.start_date"></el-input> -->
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">岗位</div>
                  <el-input v-model="employ_proof_form.position"></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirEmemployProof">确定</el-button>
            <el-button type="info" size="small" @click="ok_send_employ_proof = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
<!--确定发送离职信息-->
    <lj-dialog
      :visible="confirm_send_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="confirm_send_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定发送离职短信吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmSendMsg">确定</el-button>
          <el-button type="info" size="small" @click="confirm_send_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

      <!--收入证明-->
      <lj-dialog
              :visible="ok_send_income_proof"
              :size="{width: 600 + 'px',height: 450 + 'px'}"
              @close="ok_send_income_proof = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>收入证明</h3>
          </div>
          <div class="dialog_main">
            <el-form size="small" style="text-align: left">
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">姓名</div>
                  <el-input v-model="income_proof_form.name"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">身份证号</div>
                  <el-input v-model="income_proof_form.ID_number"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">岗位</div>
                  <el-input v-model="income_proof_form.position"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">月收入</div>
                  <el-input v-model="income_proof_form.salary_month"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex">
                  <div style="width: 70px">年收入</div>
                  <el-input v-model="income_proof_form.salary_year"></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirIncomeProof">确定</el-button>
            <el-button type="info" size="small" @click="ok_send_income_proof = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <StaffFiles :module="filesVisible" @close="filesVisible = false" :detail-info="staff_detail_info"></StaffFiles>
  </div>
</template>

<script>
  import StaffFiles from '../components/staffFiles.vue'
  import LjDialog from '../../../common/lj-dialog';
  export default {
    name: "index",
    props: ['searchVal','searchParams','exportInfo','exportData'],
    components: {StaffFiles,LjDialog},
    data() {
      return {
        url:globalConfig.humanResource_server,
        disable_visible: false,
rules: {
          dismiss_time: [
              {required:true,message:'请选择离职日期',trigger:['change','blur']}
          ],
          'dismiss_reason.dismiss_type': [
              {required:true,message:'请选择离职原因',trigger:'change'}
          ],
        },
        checkList: [],
        confirm_send_visible: false,
        checkLists: [],
        field_list: [],
         //个人权限
        self_power_params: {
          user_id: '',
          system_id: '',
          type: 'user',
          position_id: [],
        },
        power_list: [],
        power_size: {},
        leave_size: {},
        checkAll: false,
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        //离职
        outForm: {
          type: 'dimission',
          dismiss_time: new Date(),
          dismiss_reason: {
            dismiss_mess: '',
            dismiss_type: ''
          }
        },
        table_column: [
          // { key: 'staff.internship_number',val: '实习协议',isBtn: true},
          { key: 'name',val: '姓名', width: "60px"},
          { key: 'org',val: '部门',isArray: true,showKey: 'name',width: "120px",position:'left'},
          { key: 'position',val: '岗位',isArray: true,showKey: 'name',width: "120px",position:'left'},
          { key: 'phone',val: '联系方式',width: "150px"},
          { key: 'on_job_status',val: '在职状态',width: "80px",info: {1: '在职', 2: '离职'}},
          { key: 'is_enable',val: '账号状态',width: "80px"},
          // { key: 'gender',val: '性别',info:{0: '女',1: '男'}},
          // { key: 'staff.origin_addr',val: '籍贯',width: "180px",position:'left'},
          // { key: 'staff.political_status',val: '政治面貌',info: {1: '群众',2: '团员',3: '党员',4: '其他'}},
          // { key: 'staff.birthday',val: '出生年月',width: "150px"},
          { key: 'staff.enroll',val: '入职时间',width: "150px"},
          // { key: 'staff.city',val: '城市'},
          // { key: 'staff.origin_addr',val: '家庭住址',width: "180px",position:'left'},

          // { key: 'staff.id_num',val: '身份证',width: "180px"},
          // { key: 'staff.emergency_call',val: '紧急联系人',width: "150px"},
          // { key: 'staff.household_register',val: '户口性质',info: {0: '农村',1: '城市'}},
          // { key: 'staff.national',val: '民族'},
          // { key: 'staff.marital_fertility_status',val: '婚育情况',info: {1: '未婚', 2: '已婚未育',3: '已婚已育'}},
          // { key: 'staff.education',val: '学历',info: {1: '高中及以下',2: '大专',3: '本科', 4: '本科及以上', 5: '其他'},width: "120px"},
          // { key: 'staff.school',val: '毕业院校'},
          // { key: 'staff.graduation_time',val: '毕业时间',width: "150px"},
          // { key: 'staff.major',val: '专业'},
          // { key: 'staff.position_level',val: '职级',info: {1: 'P1',2: ' P2',3: 'P3',4: 'P4',5: 'P5',6: 'P6', 7: 'P7'}},
          // { key: 'staff.dismiss_time',val: '离职时间',width: "150px"},
          // { key: 'staff.dismiss_reason.dismiss_type',val: '离职类型',info: {1: '主动离职',2: '旷工离职',3: '劝退',4: '开除',5: '其他'}},
          // { key: 'staff.dismiss_reason.dismiss_mess',val: '离职原因'},
          // { key: 'staff.bank_num',val: '银行卡号',width: "180px",position:'left'},
          // { key: 'staff.account_name',val: '户主',width: "120px"},
          // { key: 'staff.account_bank',val: '开户行',width: "120px"},
          { key: 'staff.ca',val: 'ca认证',isBtn: true,isGenerate:true, width: '60px'},
          { key: 'staff.contract_number',val: '劳务合同',isBtn: true,isGenerate:true},
          { key: 'staff.leaveproof_image_url',val: '上家单位离职证明',isBtn: true,width: '150px'},
          { key: 'staff.commitment_number',val: '入职承诺书',isBtn: true,isGenerate:true},
          { key: 'staff.employ_proof_number',val: '在职证明',isBtn: true,isGenerate:true},
          { key: 'staff.income_proof_number',val: '收入证明',isBtn: true,isGenerate:true},
          { key: 'staff.notice_number',val: '入职须知',isBtn: true,isGenerate:true},
          { key: 'staff.secret_number',val: '保密协议',isBtn: true,isGenerate:true,width:'150px'},
          { key: 'staff.insurance_prohibit_number',val: '大学生无法缴纳社保知晓书',isBtn: true,isGenerate:true,width: '230px'},
        ],
        export_params: {
          field: [],
          export: 0,
        },
        params: {
          search: '',
          page: 1,
          limit: 12,
          org_id: '',
          position_id: '',
        },
        show_field_list: [],
        currentStaff: '',
        module_list: [],
        powerName: '1',//部门
        powerChildName: '',//部门模块
        powerNames: [],
        //获取系统列表
        system_params: {
          limit: 999,
          parent_id: '',
          is_permissions: ''
        },
         power_params: {
          limit: 999,
          system_id: '',
          type: 1
        },
        //劳务合同
        labour_contract_visible: true,
        leaveVisible: false,
        labour_form: {
            company_name: '',
            birthday: '',
            contact_address: '',
            phone: '',
            register_place: '', //注册地
            real_place: '', //经营地
            telephone: '',//公司电话
            name: '',
            gender: '',
            begin_date: '',
            position: '',
            ID_number: '',
            work_address: '',
            work_space: '',
            number_prefix: '',
            postal_code: '',
            leader_name: '',
        },
        powerVisible: false,
        ok_send_contract: false,
        ok_send_employ_proof: false,
        employ_proof_form: {
            name: '',
            position:'',
            start_date:'',
            ID_number:'',
            pdf_scene:'',
            type: '',
            user_id: ''
        },
        ok_send_income_proof: false,
        income_proof_form: {
            name: '',
            position:'',
            ID_number:'',
            pdf_scene:'',
            type: '',
            user_id: '',
            salary_month: '',
            salary_year: ''
        },
        module_params: {
          limit: 999,
          parent_id: '',
          is_permissions: ''
        },
        filesVisible: false,

        //员工详情
        staff_detail_info: '',
         current_field: '', //点击查看当前权限
 //设置权限
        set_power: {
          system_id: '',
          type_id: '',
          permission_type: 'user',
          permission_id: '',
          permission_field_id: '',
          position_id: '',
        },

        random_key: '',
      }
    },
    mounted() {
      this.getStaffList();
      this.handleSetData();
    },
    activated() {
    },
    watch: {
      exportData: {
        handler(val) {
          this.export_params.field = [];
          this.export_params.field = ['id'];
          this.table_column = val;
          this.random_key = 'staffTable';
          var random = Math.random();
          this.random_key = this.random_key + random.toString().substring(3,10);
          val.map(item => {
            this.export_params.field.push(item.key);
          });
        },
        deep: true
      },
      exportInfo(val) {
        this.export_params.export = 1;
        this.export_params = Object.assign({},this.export_params,this.params);
        this.exportStaffList();
      },
      searchParams: {
        handler(val) {
          this.params = Object.assign({},this.params,val);
          this.getStaffList();
        },
        deep: true
      },
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getStaffList();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      // 权限、离职、禁用
       operateModule(val,item) {
         if (val === 'disabled') {
          this.currentStaff = item;
        }
        switch (val) {
          case 'power'://权限
           this.currentStaff = item;
            this.getSystemList();
            this.powerVisible = true;
            this.set_power.type_id = item.id;
            this.self_power_params.type = 'user';
            this.self_power_params.user_id = item.id;
            this.set_power.permission_type = 'user';
            this.getSelfPower(this.powerChildName);
            break;
          case 'leave'://离职
            this.currentStaff = item;
            this.leaveVisible = true;
            break;
          case 'disabled': // 禁用
            this.disable_visible = true;
            break;
        }
        switch (val) {
          case 'power'://权限
            this.power_size = {
              width: '1600px',
              height: '840px',
            };
            break;
          case 'leave'://新增 岗位
            this.leave_size = {
              width: '510px',
              height: '480px',
            };
            break;
        }
       },
       //禁用
       handleOkDisable() {
        this.$http.put(`${this.url}staff/user/${this.currentStaff.id}`,{
          type: 'enable'
        }).then(res => {
          if (res.code === '20030') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.disable_visible = false;
            this.getStaffList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleConfirmSendMsg() {
        let type = [];
        if (this.checkLists.includes(1)) {
          type.push('dimission');
        }
        if (this.checkLists.includes(2)) {
          type.push('dimission_sms');
        }
        if (this.checkLists.includes(3)) {
          type.push('leave_proof_send');
        }
        this.$http.get(`${this.url}staff/user/${this.currentStaff.id}/sendinfo`,{type}).then(res => {
          if (res.code === '20000') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.confirm_send_visible = false;
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleCheckField(val) {
        if (val.length > 0) {
          if (this.checkList.indexOf(this.current_field.id) === -1) {
            this.checkList.push(this.current_field.id);
          }
        } else {
          let idx = this.checkList.indexOf(this.current_field.id);
          this.checkList.splice(idx,1);
        }
        let count = this.handleGetPowerLen();
        this.checkAll = count === this.checkList.length;
      },
       // 权限子集切换
      handleName(val) {
        this.checkAll = false;
        this.show_field_list = [];
        this.powerChildName = val.id;
        this.set_power.system_id = val.id;
        this.getPowerList(val.id);
        this.getSelfPower(val.id);
      },
       handleSubmitOut() {
        this.$refs['leaveForm'].validate(valid=>{
          if (valid){
              this.outForm.dismiss_time = this.myUtils.formatDate(this.outForm.dismiss_time);
            this.$http.put(`${this.url}staff/user/${this.currentStaff.id}`,this.outForm).then(res => {
              if (res.code === '20030') {
                this.$LjNotify('success',{
                  title: '成功',
                  message: res.msg
                });
                this.handleCancelOut();
                this.getStaffList();
                if (this.checkLists.length > 0) {
                  this.confirm_send_visible = true;
                }
              } else {
                this.$LjNotify('warning',{
                  title: '失败',
                  message: res.msg
                })
              }
            })
          }
        });

      },
      handleCancelOut() {
        this.outForm = {
          type: 'dimission',
          dismiss_time: new Date(),
          dismiss_reason: {
            dismiss_mess: '',
            dismiss_type: ''
          }
        };
        this.leaveVisible = false;
      },
       // 权限复选
      handleCheck(value) {
        let checkCount = value.length;
        let list = this.power_list;
        let count = 0;
        for (let item of  Object.keys(list)) {
          count = count + list[item].length;
          for (let tmp of list[item]) {
            if (!value.includes(tmp.id)) {
              for (let field of tmp.fields) {
                this.field_list = this.field_list.filter(item => item !== field.id);
              }
            }
            if (tmp.id === value[value.length - 1]) {
              if (tmp.fields) {
                for (let tmp2 of tmp.fields) {
                  this.field_list = this.field_list.filter(item => item !== tmp2.id);
                  this.field_list.push(tmp2.id);
                }
              }
            }
          }
        }
        this.checkAll = checkCount === count;
      },
      handleSubmitSetPower() {
        if(this.set_power.permission_type == 'position' && this.self_power_params.position_id.length<1){
          this.$LjNotify('warning',{
              title: '提醒',
              message: '岗位必填'
            });
        } else {
          this.set_power.permission_id = this.checkList;
          this.set_power.permission_field_id = this.field_list;
          this.set_power.system_id = this.set_power.permission_type == 'position' ? this.self_power_params.position_id[0] : this.powerChildName;
          this.$http.post(this.url+'organization/permission/set',this.set_power).then(res => {
          if (res.code === '20000') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            // this.powerVisible = false;
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
          })
        }
      },
      //查看该权限下的字段
      handleSearchField(tmp) {
        this.current_field = tmp;
        this.show_field_list = tmp.fields || [];
      },
      // 全选
      handleCheckAll(val) {
        if (val) {
          this.checkList = [];
          this.field_list = [];
          let list = this.power_list;
          let keys = Object.keys(list);
          for (let key of keys) {
            for (let i =0;i<list[key].length;i++) {
              this.checkList.push(list[key][i].id);
              if (list[key][i].fields && list[key][i].fields.length > 0) {
                for (let tmp of list[key][i].fields) {
                  this.field_list.push(tmp.id);
                }
              }
            }
          }
        } else {
          this.checkList = [];
          this.field_list = [];
          // this.show_field_list = [];
        }
      },
      // 关闭权限按钮
      handleCancelSetPower() {
        this.checkList = [];
        this.field_list = [];
        this.checkAll = false;
        this.powerVisible = false;
      },
      // 权限切换
      handleClick(val) {
        this.show_field_list = [];
        let id = parseInt(val.name);
        this.getModuleList(id);
      },
      getModuleList(id) {
        this.module_params.parent_id = id;
        this.$http.get(this.url+'organization/system',this.module_params).then(res => {
          if (res.code === '20000') {
            this.module_list = res.data.data;
            this.getPowerList(res.data.data[0].id);
            this.getSelfPower(res.data.data[0].id);
            this.powerChildName = res.data.data[0].id;
          } else {
            this.module_list = [];
          }
        })
      },
      getPowerList(id) {
        this.power_params.system_id = id;
        this.$http.get(this.url+'organization/permission',this.power_params).then(res => {
          if (res.code === '20000') {
            this.power_list = res.data.data;
            let count = 0;
            for (let key in this.power_list) {
              count = count + this.power_list[key].length;
            }
            this.checkAll = this.checkList.length === count;
          } else {
            this.power_list = '';
          }
        })
      },
      getSelfPower(id) {
        this.self_power_params.system_id = id;
        this.self_power_params.user_id = this.currentStaff.id;
        this.$http.get(this.url+'organization/permission/all',this.self_power_params).then(res => {
          if (res.code === '20000') {
            let field = [];
            let permission = [];
            if (res.data.field && res.data.field.length > 0) {
              for (let item of res.data.field) {
                field.push(item.id);
              }
            }
            if (res.data.permission && res.data.permission.length > 0) {
              for (let tmp of res.data.permission) {
                permission.push(tmp.id);
              }
            }
            let count = 0;
            for (let key in this.power_list) {
              count += this.power_list[key].length;
            }
            this.$nextTick(() => {
              if (permission.length >= count) {
                this.checkAll = true;
              }
              this.checkList = permission;
              this.field_list = field;
            });
          }
        })
      },
      handleChangePowerType(type) {
        this.set_power.permission_type = type;
        this.self_power_params.type = type;
      },
      //设置导出数据
      handleSetData() {
        this.export_params.field = ['id'];
        this.table_column.map(item => {
          this.export_params.field.push(item.key);
        });
      },
      getSystemList() {
        this.$http.get(this.url+'organization/system',this.system_params).then(res => {
          if (res.code === '20000') {
            this.powerNames = res.data.data;
            this.getModuleList(res.data.data[0].id);
            this.powerName = res.data.data[0].id.toString();
          } else {
            this.powerNames = [];
          }
        })
      },
        getLabourInfo(id) {
            this.$http.get(`${this.url}staff/e_contract/get_contract_info/${id}`).then(res => {
                // console.log(res);
                if (res.code === '20010') {
                    this.labour_form = res.data;
                    // setTimeout(() => {
                    //     this.handleCancelEdit();
                    // },1000);
                    setTimeout(() => {
                        this.labour_contract_visible = false;
                    },2000)
                } else {
                    this.$LjNotify('warning',{
                        title: res.msg
                    });
                    return false;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        handleConfirmContract() {
            this.labour_form.send = 1;
            this.labour_form.type = 1;
            this.$http.post(`${this.url}staff/e_contract/view_contract`,this.labour_form).then(res => {
                if (res.code === '20000') {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                    setTimeout(() => {
                        this.labour_contract_visible = true;
                    },1000)
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
                setTimeout(() => {
                    this.ok_send_contract = false;
                },1000)
            }).catch(err => {
                console.log(err);
            })
        },
        handleConfirEmemployProof(){
          if(this.employ_proof_form.start_date){
            this.$http.post(`${this.url}staff/e_contract/view_contract`,this.employ_proof_form).then(res => {
                if (res.code === '20000') {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                    this.getStaffList();
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
                setTimeout(() => {
                    this.ok_send_employ_proof = false;
                },1000)
            }).catch(err => {
                console.log(err);
            })
          }else {
             this.$LjNotify('warning',{
                        title: '警告',
                        message: '入职日期必填'
                    });
          }
        },
        handleConfirIncomeProof(){
            this.$http.post(`${this.url}staff/e_contract/view_contract`,this.income_proof_form).then(res => {
                if (res.code === '20000') {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                    this.getStaffList();
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
                setTimeout(() => {
                    this.ok_send_income_proof = false;
                },1000)
            }).catch(err => {
                console.log(err);
            })
        },
        alertWarnings(){
            this.$LjNotify('warning',{
                title: '失败',
                message: '用户未完成ca认证'
            });
        },
        generateContract(row,key){
            switch (key) {
                case 'staff.contract_number':
                    if (!row.fdd_ca) {
                        this.alertWarnings();
                        return false;
                    }
                    this.getLabourInfo(row.id);
                    break;
                case 'staff.ca':
                    this.staffCertific(row.id);
                    break;
                case 'staff.commitment_number':
                    if (!row.fdd_ca) {
                        this.alertWarnings();
                        return false;
                    }
                    let params={user_id:row.id,pdf_scene:6,type:1,send:1};
                    this.commitmentGenerate(params);
                    break;
                case 'staff.employ_proof_number':
                    this.ok_send_employ_proof=true;
                    this.getIncomeInfo(row.id,11);
                    break;
                case 'staff.income_proof_number':
                    this.ok_send_income_proof=true;
                    this.getIncomeInfo(row.id,10);
                    break;
                case 'staff.notice_number':
                    if (!row.fdd_ca) {
                        this.alertWarnings();
                        return false;
                    }
                    let param={user_id:row.id,pdf_scene:7,type:1,send:1};
                    this.commitmentGenerate(param);
                    break;
                case 'staff.secret_number':
                    if (!row.fdd_ca) {
                        this.alertWarnings();
                        return false;
                    }
                    this.commitmentGenerate({user_id:row.id,pdf_scene:5,type:1,send:1});
                    break;
                case 'staff.insurance_prohibit_number':
                    if (!row.fdd_ca) {
                        this.alertWarnings();
                        return false;
                    }
                    this.commitmentGenerate({user_id:row.id,pdf_scene:8,type:1,send:1});
                    break;
                default:
                    return;
            }
        },
        getIncomeInfo(id,scene){
            this.$http.get(`${this.url}staff/e_contract/get_income_info/`+id+'?pdf_scene='+scene).then(res => {
                if (Number(res.code) %10 ===0){
                    switch (scene) {
                        case 11:
                            this.employ_proof_form=res.data;
                            break;
                        case 10:
                            this.income_proof_form=res.data;
                            break;
                    }
                } else{
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: ''
                    });
                }
            });
        },
        commitmentGenerate(params){
            this.$http.post(`${this.url}staff/e_contract/view_contract`,params).then(res => {
                if (res.code === '20000') {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                    this.getStaffList();
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        staffCertific(id){
            this.$http.get(`${this.url}staff/e_contract/ca/`+id).then(res => {
                if (Number(res.code) % 10 === 0) {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
            });
        },
      //列表按钮
      handleLookInfo(row,key) {
        if (!row.staff || !row.staff[key.split('.')[1]]) {
            this.$LjNotify('warning', {
                title: '提示',
                message: '暂无该信息'
            });
            return false;
        }
          let picture=false,pdf=false,text=false,msg='';
          switch (key) {
              case 'staff.contract_number':
                  pdf=true;
                  break;
              case 'staff.ca':
                  text=true;
                  msg=row.staff[key.split('.')[1]];
                  break;
              case 'staff.leaveproof_image_url':
                  picture=true;
                  msg=row.staff[key.split('.')[1]]
                  break;
              case 'staff.commitment_number':
                  pdf=true;
                  break;
              case 'staff.employ_proof_number':
                  pdf=true;
                  break;
              case 'staff.income_proof_number':
                  pdf=true;
                  break;
              case 'staff.notice_number':
                  pdf=true;
                  break;
              case 'staff.secret_number':
                  pdf=true;
                  break;
              case 'staff.insurance_prohibit_number':
                  pdf=true;
                  break;
              default:
                  return;
          }
          if (pdf ) {
              this.$http.get(`${this.url}staff/e_contract/show/${row.staff[key.split('.')[1]]}`).then(res => {
                  if (res.code === '20010') {
                      window.open(res.data);
                  } else {
                      this.$LjNotify('warning', {
                          title: '失败',
                          message: res.msg
                      })
                  }
              });
          }else if(picture){
              window.open(msg)
          }else if (text){
              this.$LjNotify('success',{
                  title: '',
                  message: msg
              });
          }

      },
      exportStaffList() {
        this.$http.get(this.url+'staff/user/record',this.export_params,'arraybuffer').then(res => {
          if (!res) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res],{type: 'application/vnd.ms-excel'}));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'export.xls');
          document.body.appendChild(link);
          link.click();
          link.remove();
          this.export_params.field = [];
          this.export_params.export = 0;
        });
      },
      //获取员工名册列表
      getStaffList() {
        if(!this.validatePermission('Staff-Roster-Read')) return;
        this.showLoading(true);
        this.$http.get(this.url+'staff/user', this.params).then(res => {
          this.showLoading(false)
          if(res.code.endsWith('0')) {
            res.data.data.forEach((item,index)=> {
              if(!item.is_on_job&&!item.is_enable) {
                item.on_job_status = 1;
              }else {
                item.on_job_status = 2;
              }
            });
            this.tableData = res.data.data;
            this.counts = res.data.count;
          }else{
              this.tableData=[];
              this.counts=0;
          }

        })
      },
      //获取当前员工详情
      async getStaffDetail(id) {
        if(!this.validatePermission('Employee-File-Select')) return;
        this.$http.get(`${this.url}staff/user/${id}`).then(res => {
          if (res.code === '20020') {
            this.staff_detail_info = res.data;
            if(res.data && res.data.role){
               let roles = [];
              _.forEach(res.data.role,(o,index)=> {
                 this.staff_detail_info.role_id=[];
                roles.push(o.id);
              });
              this.staff_detail_info.role_id=roles;
            }
            this.filesVisible = true;
          } else {
            this.staff_detail_info = '';
            this.$LjNotify('warning',{
              title: '警告',
              message: '获取员工详情失败'
            });
            return false;
          }
        })
      },
      // 当前点击
      tableClickRow(row) {
        //let ids = this.chooseRowIds;
        //ids.push(row.id);
        //this.chooseRowIds = this.myUtils.arrayWeight(ids);

        this.getStaffDetail(row.id);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getStaffList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/staffRoster/index.scss";
   @import "../../../../assets/scss/humanResource/departments/components/departManage.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/staffRoster/' + $n + '/' + $m;
    @include bgImage($url);
  }
   @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/departManage/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin commonImg($m, $n) {
    $url: '../../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffRoster {
      .labour_contract {
        width: 38%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 30px;
        text-align: center;
        border: 5px solid #444444;
        border-radius: 8px;
        background-color: white;
        .item_margin {
          margin-bottom: 55px;
        }
        > div {
          padding: 20px;
          height: 1200px;
        }
      }
      .hide_labour_contract {
        top: -1920px;
        right: -1920px;
      }
    }
    #departManage {
      .mainTop {
        span {
          @include organImg('huidi.png', 'theme1');
        }
        .hover {
          @include organImg('hongdi.png', 'theme1');
        }
      }
      .iconInput {
        .organization {
          @include commonImg('zuzhijiagou.png', 'theme1');
        }
        .position {
          @include commonImg('zhiwei.png', 'theme1');
        }
        .user {
          @include commonImg('yonghu.png', 'theme1');
        }
      }
      .powerContent {
        .powerHead {
          i {
            @include commonImg('xiugai.png', 'theme1');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #staffRoster {

    }
  }

  #theme_name.theme3 {
    #staffRoster {

    }
  }

  #theme_name.theme4 {
    #staffRoster {

    }
  }
</style>
