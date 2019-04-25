<template>
  <div id="departManage">
    <!--员工管理/部门管理-->
    <div class="dialog_main space-column departPosition">
      <div class="items-bet mainTop">
        <div></div>
        <el-button type="text" size="mini" @click="operateModule(tabsManage)">{{ tabsManage === 'staff' ? '新增员工' : '新建职位' }}</el-button>
      </div>
      <div class="scroll_bar" v-if="tabsManage === 'staff'" @click="checkOverflow()">
        <div id="scroll-body" class="staffManage" v-if="staffList.length > 0">
          <div v-for="item in staffList">
            <div class="items-center" :class="{'is_enable': item.is_enable}" @click="reviseStaff(item)">
              <p>
                <img :src="item.avatar" alt="" v-if="item.avatar">
                <img v-else src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
              </p>
              <div>
                <h4>{{ item.name }}</h4>
                <h5>{{ item.position[0].name }}</h5>
              </div>
            </div>
            <h5 class="operate" :class="[operatePos?'right':'left']" v-show="staffId === item">
              <span v-for="label in operateList" @click="operateModule(label.type,item,'user')">
                {{ label.label = label.type === 'disabled' ? item.is_enable ? '启用' : '禁用' : label.label }}
              </span>
              <b v-if="!operatePos"></b>
              <i v-if="operatePos"></i>
            </h5>
          </div>
        </div>
        <div class="staffManage items-center" v-else><span>暂无员工信息</span></div>
      </div>
      <div class="scroll_bar" v-if="tabsManage === 'position'">
        <div class="orgManage" v-if="dutyList.length > 0">
          <div v-for="item in dutyList">
            <p @click="operateModule('positionManagement',item)">
              <span class="writingMode">{{ item.name }}</span>
            </p>
          </div>
        </div>
        <div v-else class="orgManage items-center"><span>暂无职位信息</span></div>
      </div>
    </div>
    <!--新增员工-->
    <lj-dialog
      :visible="add_newStaff_visible"
      :size="{width: 1200 + 'px',height: 800 + 'PX'}"
      @close="handleCancelAddStaff"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ is_edit ? '修改员工' : '新增员工'}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-form label-width="120px" size="small" style="width: 100%">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input v-model="interview_info_detail.name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别">
                      <div class="changeChoose" style="margin-top: 8px">
                        <el-radio-group v-model="interview_info_detail.gender">
                          <el-radio :label="0">男</el-radio>
                          <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号">
                      <el-input v-model="interview_info_detail.phone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号">
                      <el-input v-model="interview_info_detail.id_num" placeholder="请输入" @blur="handleGetStaffInfo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生日">
                      <el-date-picker placeholder="请选择" v-model="interview_info_detail.birthday" type="date" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="部门">
                      <el-input placeholder="请选择" readonly @focus="departOrgan_visible = true" v-model="interview_info_detail.depart"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="岗位">
                      <el-input v-model="interview_info_detail.position" @focus="modules = true" placeholder="请选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="家庭住址">
                      <el-input v-model="interview_info_detail.home_addr" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="婚姻状况">
                      <div class="changeChoose" style="margin-top: 8px">
                        <el-radio-group v-model="interview_info_detail.marital_status" placeholder="请选择">
                          <el-radio label="0">已婚</el-radio>
                          <el-radio label="1">未婚</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职等级">
                      <el-select v-model="interview_info_detail.level" placeholder="请选择">
                        <el-option label="实习" :value="0"></el-option>
                        <el-option label="正式" :value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="职级">
                      <el-select v-model="interview_info_detail.position_level">
                        <el-option :value="1" label="P1"></el-option>
                        <el-option :value="2" label="P2"></el-option>
                        <el-option :value="3" label="P3"></el-option>
                        <el-option :value="4" label="P4"></el-option>
                        <el-option :value="5" label="P5"></el-option>
                        <el-option :value="6" label="P6"></el-option>
                        <el-option :value="7" label="P7"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行卡号">
                      <el-input v-model="interview_info_detail.bank_num" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户行">
                      <el-input v-model="interview_info_detail.account_bank" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input v-model="interview_info_detail.branch_bank" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开户名">
                      <el-input v-model="interview_info_detail.account_name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="薪资">
                      <el-input v-model="interview_info_detail.salary" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="推荐人">
                      <el-input readonly v-model="interview_info_detail.recommenders.name" @focus="staff_visible = true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入职时间">
                      <el-date-picker placeholder="请选择" type="date" v-model="interview_info_detail.enroll" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职途径">
                      <el-select v-model="interview_info_detail.platform">
                        <el-option :value="1" label="智联招聘"></el-option>
                        <el-option :value="2" label="前程无忧"></el-option>
                        <el-option :value="3" label="58同城"></el-option>
                        <el-option :value="4" label="BOSS直聘"></el-option>
                        <el-option :value="5" label="猎聘网"></el-option>
                        <el-option :value="6" label="首席信才"></el-option>
                        <el-option :value="7" label="德盛人才"></el-option>
                        <el-option :value="8" label="校园招聘会"></el-option>
                        <el-option :value="9" label="其他"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="社保卡号">
                      <el-input v-model="interview_info_detail.society_number" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="紧急联系人/号码">
                      <el-input v-model="interview_info_detail.emergency_call" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行行号">
                      <el-input v-model="interview_info_detail.branch_bank_code" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="籍贯">
                      <el-input v-model="interview_info_detail.origin_addr" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生育情况">
                      <el-select v-model="interview_info_detail.fertility_status" placeholder="请输入">
                        <el-option :value="0" label="已育"></el-option>
                        <el-option :value="1" label="未育"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="政治面貌">
                      <el-select v-model="interview_info_detail.political_status" placeholder="请输入">
                        <el-option :value="0" label="群众"></el-option>
                        <el-option :value="1" label="团员"></el-option>
                        <el-option :value="2" label="党员"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-select v-model="interview_info_detail.education" placeholder="请输入">
                        <el-option :value="0" label="高中及以上"></el-option>
                        <el-option :value="1" label="大专及以上"></el-option>
                        <el-option :value="2" label="本科及以上"></el-option>
                        <el-option :value="3" label="不限"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="学历信息" name="second">
              <el-form label-width="120px" size="small" style="width: 100%" v-if="interview_info_detail.education_history.length > 0">
                <div v-for="item in interview_info_detail.education_history" :key="item.id" style="border-bottom: 1px dashed #E4E7ED;padding: 20px 10px;margin-bottom: 10px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="起始时间:">
                        <el-date-picker
                          v-model="item.start_end_time"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="学校名称:">
                        <el-input v-model="item.school" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="专业:">
                        <el-input v-model="item.major"  placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="学历:">
                        <el-select v-model="item.education" placeholder="请选择">
                          <el-option :value="1" label="高中及以上"></el-option>
                          <el-option :value="2" label="大专及以上"></el-option>
                          <el-option :value="3" label="本科及以上"></el-option>
                          <el-option :value="4" label="不限"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="学习形式:">
                        <el-select v-model="item.learn_type" placeholder="请选择">
                          <el-option :value="1">全日制</el-option>
                          <el-option :value="2">其他</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-form-item label="入职材料:">
                  <el-checkbox-group v-model="interview_info_detail.entry_materials" class="changeChoose">
                    <div class="flex-center" style="margin-top: 8px">
                      <el-checkbox v-for="tmp in entry_materials_checkbox" :key="tmp.id" :label="tmp.id">{{ tmp.val }}</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <div style="text-align: right">
                <el-button type="danger" size="mini" style="width: 120px" @click="handleAddEducation">添加</el-button>
                <el-button type="info" size="mini" style="width: 120px" v-if="interview_info_detail.education_history.length > 1" @click="handleDelEducation">删除</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="工作履历" name="third">
              <el-form label-width="120px" size="small" style="width: 100%" v-if="interview_info_detail.work_history.length > 0">
                <div v-for="item in interview_info_detail.work_history" :key="item.id" style="border-bottom: 1px dashed #E4E7ED;padding: 20px 10px;margin-bottom: 10px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="起始时间:">
                        <el-date-picker
                          v-model="item.start_end_time"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="岗位:">
                        <el-input v-model="item.position" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工作单位:">
                        <el-input v-model="item.work_place" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="薪资:">
                        <el-input v-model="item.salary" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人:">
                        <el-input v-model="item.witness" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人电话:">
                        <el-input v-model="item.witness_phone" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <div style="text-align: right">
                <el-button type="danger" size="mini" style="width: 120px" @click="handleAddWork">添加</el-button>
                <el-button type="info" size="mini" style="width: 120px" v-if="interview_info_detail.work_history.length > 1" @click="handleDelWork">删除</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleSubmitAddStaff">提交</el-button>
          <el-button type="info" size="mini" @click="handleCancelAddStaff">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建职位=======================================================================================-->
    <lj-dialog :visible="addStaffVisible" :size="{width: 500 + 'px',height: 400 + 'px'}" @close="addStaffVisible = false;positionForm.name = ''">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>新建职位</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <!--职位-->
          <el-form :model="positionForm" ref="departForm" label-width="120px" class="depart_visible">
            <el-form-item label="职位名称" required>
              <el-input v-model="positionForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <el-input v-model="positionForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddDuty">确定</el-button>
          <el-button type="info" size="small" @click="addStaffVisible = false;positionForm.name = ''">取消</el-button>
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
              <el-select disabled :popper-class="'appTheme' + themeName" placeholder="请选择" v-model="self_power_params.type" size="small" @change="handleChangePowerType">
                <el-option value="position" label="岗位"></el-option>
                <el-option value="user" label="用户"></el-option>
                <el-option value="ban" label="黑名单"></el-option>
                <el-option value="all" label="全部"></el-option>
              </el-select>
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
                <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
              </div>
              <div v-else>暂无权限</div>
              <div v-for="(item,key) in power_list">
                <el-checkbox-group v-model="checkList" @change="handleCheck">
                  <el-row v-for="(tmp,idx) in power_list[key]" :key="idx">
                    <el-col :span="6">
                      <el-button type="text" size="large" @click="handleSearchField(tmp)" icon="el-icon-view" style="color: #CF2E33;font-size: 18px"></el-button>
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
    <!--岗位管理===============================================================================================-->
    <lj-dialog :visible="positionVisible" :size="position_size" @close="positionVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ currentDutyInfo && currentDutyInfo.name }}</h3>
        </div>
        <div class="dialog_main positionContent space-column">
          <div class="items-bet mainTop" style="margin-bottom: 10px">
            <div class="items-bet">
              <span class="hover">岗位</span>
            </div>
            <h2 class="add" @click="operateModule('post')">
              <b>+</b>
            </h2>
          </div>
          <!--岗位-->
          <div style="height: 100%" v-if="tabsPost === 'post'">
            <div>
              <div class="mainListTable">
                <el-table
                  :data="positionList"
                  :row-class-name="tableChooseRow"
                  @cell-click="tableClickRow"
                  header-row-class-name="tableHeader"
                  height="250px"
                  style="width: 100%">
                  <el-table-column label="名称" prop="name" align="center"></el-table-column>
                  <el-table-column label="人数" prop="users_count" align="center"></el-table-column>
                  <el-table-column label="职级" prop="level" align="center">
                    <template slot-scope="scope">
                      <span>P{{ scope.row.level }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="部门" prop="duty.org.name" align="center"></el-table-column>
                  <el-table-column label="权限" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="operateModule('power',scope.row,'position')">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div>
              <div class="mainListTable">
                <el-table
                  :data="positionStaffList"
                  :row-class-name="tableChooseRow"
                  header-row-class-name="tableHeader"
                  height="250px"
                  style="width: 100%">
                  <el-table-column label="员工姓名" prop="name" align="center"></el-table-column>
                  <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
                  <el-table-column label="入职时间" prop="created_at" align="center"></el-table-column>
                  <el-table-column label="权限" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="operateModule('power',scope.row,'user')">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!--人员-->
          <div class="scroll_bar staffManage" id="scroll-body1" @click="checkOverflow()" v-if="tabsPost === 'person'">
            <div v-for="item in staffList">
              <div class="items-center" @click="reviseStaff(item)">
                <p>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                </p>
                <div>
                  <h4>{{ item.name }}</h4>
                  <h5>{{ position[0].name }}</h5>
                </div>
              </div>
              <h5 class="operate" :class="[operatePos?'right':'left']" v-show="staffId === item">
                <span v-for="label in operateList" @click="operateModule(label.type)">{{label.label}}</span>
                <b v-if="!operatePos"></b>
                <i v-if="operatePos"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!--新增岗位===============================================================================================-->
    <lj-dialog :visible="addPostVisible" :size="{width: 550 + 'px',height:750 + 'px'}" @close="handleCancelAdd">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>新建岗位</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="add_position_form" ref="postForm" label-width="120px" class="depart_visible">
            <el-form-item label="岗位名称" required>
              <el-input v-model="add_position_form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="岗位描述" required>
              <el-input v-model="add_position_form.description" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="岗位职级" required>
              <el-select v-model="add_position_form.level">
                <el-option v-for="item in position_level" :key="item.id" :value="item.id" :label="item.val"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位标识" required>
              <el-input v-model="add_position_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="顶级岗位" required>
              <div class="changeChoose flex-center" style="margin-top: 12px">
                <el-radio v-model="add_position_form.is_top" :label="0">否</el-radio>
                <el-radio v-model="add_position_form.is_top" :label="1">是</el-radio>
              </div>
            </el-form-item>
            <el-form-item label="岗位排序" required>
              <el-input v-model="add_position_form.order" type="number" placeholder="值越小，越靠前"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <el-input v-model="add_position_form.depart" readonly></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="所属职位" required>
              <div class="items-center iconInput">
                <el-input v-model="add_position_form.duty_name" readonly></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddPosition">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAdd">取消</el-button>
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
          <el-form :model="outForm" ref="postForm" label-width="120px" class="depart_visible">
            <el-form-item label="离职日期" required>
              <el-date-picker type="date" value-format="yyyy-MM-dd"  v-model="outForm.dismiss_time"></el-date-picker>
            </el-form-item>
            <el-form-item label="离职原因" required>
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

    <PositionOrgan :module="modules" @close="handleGetPosition"></PositionOrgan>

    <!--禁用-->
    <lj-dialog
      :visible="disable_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="disable_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>禁用</h3>
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

    <!--选人-->
    <StaffOrgan :module="staff_visible" @close="handleGetStaff"></StaffOrgan>

    <!--选部门-->
    <DepartOrgan :module="departOrgan_visible" @close="handleGetDepart"></DepartOrgan>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue';
  import PositionOrgan from '../../../common/postOrgan.vue';
  import StaffOrgan from '../../../common/staffOrgan.vue';
  import DepartOrgan from '../../../common/departOrgan.vue';

  export default {
    name: "depart-manage",
    props: ['module','info','checkInfo'],
    components: {ljDialog,PositionOrgan,StaffOrgan,DepartOrgan},
    data() {
      return {
        staff_visible: false,
        departOrgan_visible: false,

        entry_materials_checkbox: [
          {id: 1,val: '意外险'},
          {id: 2,val: '五险'},
          {id: 3,val: '身份证复印件'},
          {id: 4,val: '银行卡照片'},
          {id: 5,val: '劳务合同'},
          {id: 6,val: '应聘信息登记表'},
          {id: 7,val: '学籍验证报告'},
          {id: 8,val: '离职证明'},
        ],
        confirm_send_visible: false,
        position_level: [
          {id: 1, val: 'P1'},
          {id: 2, val: 'P2'},
          {id: 3, val: 'P3'},
          {id: 4, val: 'P4'},
          {id: 5, val: 'P5'},
          {id: 6, val: 'P6'},
          {id: 7, val: 'P7'},
        ],

        show_field_list: [],
        field_list: [],
        //离职
        outForm: {
          type: 'dimission',
          dismiss_time: '',
          dismiss_reason: {
            dismiss_mess: '',
            dismiss_type: ''
          }
        },
        modules: false,
        positionStaffList: [],
        //新增员工
        add_newStaff_visible: false,
        activeName: 'first',
        interview_info_detail: {
          graduation_time: '',
          name: '',
          gender: '',
          phone: '',
          id_num: '',
          birthday: '',
          marital_status: '',
          fertility_status: '',
          home_addr: '',
          origin_addr: '',
          position_level: '',
          org_id: [],
          depart: '',
          position: '',
          position_id: [],
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          account_name: '',
          enroll: '',
          salary: '',
          recommender: '',
          recommenders: {
            name: ''
          },
          political_status: '',
          education: '',
          level: '',
          platform: '',
          society_number: '',
          emergency_call: '',
          branch_bank_code: '',
          school: '',
          major: '',
          education_history: [
            {
              start_end_time: '',
              school: '',
              major: '',
              eduction: '',
              learn_type: '',
            }
          ],
          work_history: [
            {
              work_place: '',
              start_end_time: '',
              position: '',
              salary: '',
              witness: '',
              witness_phone: ''
            }
          ],
          entry_materials: []
        },

        departInfo: '',
        staffParams: {
          search: '',
          page: 1,
          limit: 999,
          org_id: '',
          position_id: ''
        },
        staffList: [],
        dutyList: [],

        addStaffVisible: '',
        positionForm: {
          name: '',
          org_id: [],
          depart: '',
        },

        // 新建职位
        depart_visible: false,
        lj_size: '',
        staff_size: {},
        tabsManage: 'staff',
        staffId: '',

        operatePos: false,//编辑total
        operateList: [
          {
            type: 'power',
            label: '权限',
          }, {
            type: 'disabled',
            label: '禁用',
          }, {
            type: 'revise',
            label: '修改',
          }, {
            type: 'leave',
            label: '离职',
          }
        ],//人员编辑项
        // 权限管理
        powerVisible: false, //权限
        power_size: {},
        powerName: '1',//部门
        powerChildName: '',//部门模块
        powerNames: [],
        checkList: [],
        checkAll: false,
        // 岗位管理
        positionVisible: false,
        position_size: '',
        tabsPost: 'post',
        chooseRowIds: [],
        tableData: [],
        showData: {
          name: '姓名',
          date1: '部门',
          date2: '面貌',
          date3: '民族',
          phone: '电话',
        },
        addPostVisible: false, //新建岗位
        post_size: {}, //新建岗位
        postForm: {},
        // 离职
        leaveVisible: '',
        leave_size: {},
        checkLists: [],

        //岗位列表
        positionList: [],
        currentDutyInfo: '',

        //新增岗位
        add_position_form: {
          name: '',
          duty_id: [],
          duty_name: '',
          depart: '',
          org_id: [],
          description: '',
          sign: '',
          is_top: '',
          order: ''
        },

        //禁用
        disable_visible: false,
        currentStaff: '',

        //修改员工
        is_edit: false,

        //获取系统列表
        system_params: {
          limit: 999,
          parent_id: '',
          is_permissions: ''
        },
        module_params: {
          limit: 999,
          parent_id: '',
          is_permissions: ''
        },
        module_list: [],

        power_params: {
          limit: 999,
          system_id: '',
          type: 1
        },
        power_list: [],

        //个人权限
        self_power_params: {
          user_id: '',
          system_id: '',
          type: '',
          position_id: '',
        },
        //设置权限
        set_power: {
          system_id: '',
          type_id: '',
          permission_type: 'user',
          permission_id: '',
          permission_field_id: '',
        },
        current_field: '', //点击查看当前权限
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      checkInfo: {
        handler(val) {
          if (val.id === 1) {
            this.tabsManage = 'staff';
            this.getStaffList();
          }
          if (val.id === 2) {
            this.tabsManage = 'position';
            this.getDutyList();
          }
        },
        deep: true
      },
      info: {
        handler(val) {
          this.departInfo = val;
          this.interview_info_detail.depart = val.name;
          this.interview_info_detail.org_id = [];
          this.interview_info_detail.org_id.push(val.id);
          this.staffParams.org_id = val.id;
          this.getStaffList();
          // this.getDutyList();
        },
        deep: true
      },
      module(val) {
        // this.getDutyList();
        this.depart_visible = val;
        this.lj_size = 'large';
        if (!val) {
          this.tabsManage = 'staff';
          this.departInfo = '';
          this.interview_info_detail.depart = '';
          this.interview_info_detail.org_id = [];
          this.staffParams.org_id = '';
        }
      },
    },
    computed: {
      themeName() {
        return this.$store.state.app.themeName;
      }
    },
    methods: {
      //身份验证
      handleGetStaffInfo() {
        console.log(this.interview_info_detail.id_num);
        this.$http.post('staff/user/check',{
          id_num: this.interview_info_detail.id_num
        }).then(res => {
          if (res.code === "20000") {
            this.interview_info_detail.birthday = res.data.birthday;
            this.interview_info_detail.home_addr = res.data.area.result;
          } else {
            this.interview_info_detail.birthday = '';
            this.interview_info_detail.home_addr = '';
          }
        })
      },
      handleGetDepart(id,name) {
        if (id !== 'close') {
          this.interview_info_detail.depart = name;
          this.interview_info_detail.org_id = id;
        }
        this.departOrgan_visible = false;
      },
      handleGetStaff(id,name) {
        if (id !== 'close') {
          this.interview_info_detail.recommender = id[0];
          this.interview_info_detail.recommenders.name = name;
        }
        this.staff_visible = false;
      },
      handleConfirmSendMsg() {
        console.log(this.checkLists);
        var type = [];
        if (this.checkLists.includes(1)) {
          type.push('dimission');
        }
        if (this.checkLists.includes(2)) {
          type.push('dimission_sms');
        }
        if (this.checkLists.includes(3)) {
          type.push('leave_proof_send');
        }
        this.$http.get(`staff/user/${this.currentStaff.id}/sendinfo`,{type}).then(res => {
          console.log(res);
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
      handleChangePowerType(type) {
        console.log(type);
        this.set_power.permission_type = type;
        this.self_power_params.type = type;
      },
      handleGetPowerLen() {
        let count = 0;
        for (let key in this.power_list) {
          count += this.power_list[key].length;
        }
        return count;
      },
      handleCheckField(val) {
        if (val.length > 0) {
          if (this.checkList.indexOf(this.current_field.id) === -1) {
            this.checkList.push(this.current_field.id);
          }
        } else {
          var idx = this.checkList.indexOf(this.current_field.id);
          this.checkList.splice(idx,1);
        }
        let count = this.handleGetPowerLen();
        this.checkAll = count === this.checkList.length;
      },
      //查看该权限下的字段
      handleSearchField(tmp) {
        this.current_field = tmp;
        this.show_field_list = tmp.fields || [];
      },
      handleCancelSetPower() {
        this.checkList = [];
        this.field_list = [];
        this.checkAll = false;
        this.powerVisible = false;
      },
      handleSubmitSetPower() {
        this.set_power.permission_id = this.checkList;
        this.set_power.permission_field_id = this.field_list;
        this.set_power.system_id = this.powerChildName;
        this.$http.post('organization/permission/set',this.set_power).then(res => {
          if (res.code === '20000') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      getSelfPower(id) {
        this.self_power_params.system_id = id;
        this.$http.get('organization/permission/all',this.self_power_params).then(res => {
          if (res.code === '20000') {
            var field = [];
            var permission = [];
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
            var count = 0;
            for (var key in this.power_list) {
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
      // 权限切换
      handleClick(val) {
        this.show_field_list = [];
        var id = parseInt(val.name);
        this.getModuleList(id);
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
      // 权限复选
      handleCheck(value) {
        let checkCount = value.length;
        let list = this.power_list;
        let count = 0;
        for (let item of  Object.keys(list)) {
          count = count + list[item].length;
          for (let tmp of list[item]) {
            if (!value.includes(tmp.id)) {
              for (var field of tmp.fields) {
                this.field_list = this.field_list.filter(item => item !== field.id);
              }
            }
            if (tmp.id === value[value.length - 1]) {
              if (tmp.fields) {
                for (var tmp2 of tmp.fields) {
                  this.field_list = this.field_list.filter(item => item !== tmp2.id);
                  this.field_list.push(tmp2.id);
                }
              }
            }
          }
        }
        this.checkAll = checkCount === count;
      },
      // 全选
      handleCheckAll(val) {
        if (val) {
          this.checkList = [];
          this.field_list = [];
          let list = this.power_list;
          var keys = Object.keys(list);
          for (var key of keys) {
            for (var i =0;i<list[key].length;i++) {
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
      getPowerList(id) {
        this.power_params.system_id = id;
        this.$http.get('organization/permission',this.power_params).then(res => {
          if (res.code === '20000') {
            this.power_list = res.data.data;
            let count = 0;
            for (var key in this.power_list) {
              count = count + this.power_list[key].length;
            }
            this.checkAll = this.checkList.length === count;
          } else {
            this.power_list = '';
          }
        })
      },
      getModuleList(id) {
        this.module_params.parent_id = id;
        this.$http.get('organization/system',this.module_params).then(res => {
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
      getSystemList() {
        this.$http.get('organization/system',this.system_params).then(res => {
          if (res.code === '20000') {
            this.powerNames = res.data.data;
            this.getModuleList(res.data.data[0].id);
            this.powerName = res.data.data[0].id.toString();
          } else {
            this.powerNames = [];
          }
        })
      },
      handleCancelOut() {
        this.outForm = {
          type: 'dimission',
          dismiss_time: '',
          dismiss_reason: {
            dismiss_mess: '',
            dismiss_type: ''
          }
        };
        this.leaveVisible = false;
      },
      handleSubmitOut() {
        this.$http.put(`staff/user/${this.currentStaff.id}`,this.outForm).then(res => {
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
      },
      handleOkDisable() {
        this.$http.put(`staff/user/${this.currentStaff.id}`,{
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
      handleGetPosition(id,name) {
        if (id !== 'close') {
          this.interview_info_detail.position = name;
          this.interview_info_detail.position_id= id;
        }
        this.modules = false;
      },
      handleSubmitAddStaff() {
        if (this.is_edit) {
          this.interview_info_detail.type = 'update';
          this.$http.put(`staff/user/${this.currentStaff.id}`,this.interview_info_detail).then(res => {
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.handleCancelAddStaff();
              this.getStaffList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          });
          return false;
        }
        this.$http.post('staff/user',this.interview_info_detail).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddStaff();
            this.getStaffList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleSubmitAddDuty() {
        this.$http.post('organization/duty',this.positionForm).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.addStaffVisible = false;
            this.getDutyList();
            this.positionForm = {
              name: '',
              depart: '',
              org_id: []
            }
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleAddEducation() {
        this.interview_info_detail.education_history.push({
          start_end_time: '',
          school: '',
          major: '',
          eduction: '',
          learn_type: '',
        })
      },
      handleDelEducation() {
        this.interview_info_detail.education_history.pop()
      },
      handleAddWork() {
        this.interview_info_detail.work_history.push({
          work_place: '',
          start_end_time: '',
          position: '',
          salary: '',
          witness: '',
          witness_phone: ''
        })
      },
      handleDelWork() {
        this.interview_info_detail.work_history.pop()
      },
      handleCancelAdd() {
        this.add_position_form = {
          name: '',
          duty_id: [],
          duty_name: '',
          depart: '',
          org_id: [],
          description: '',
          sign: '',
          level: '',
          is_top: '',
          order: ''
        };
        this.addPostVisible = false;
      },
      handleSubmitAddPosition() {
        this.$http.post('organization/position',this.add_position_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAdd();
            this.getPositionList();
          }else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleCancelAddStaff() {
        this.is_edit = false;
        this.interview_info_detail = {
          graduation_time: '',
          name: '',
          gender: '',
          phone: '',
          id_num: '',
          birthday: '',
          marital_status: '',
          fertility_status: '',
          home_addr: '',
          origin_addr: '',
          position_level: '',
          org_id: [],
          depart: '',
          position: '',
          position_id: [],
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          account_name: '',
          enroll: '',
          real_salary: '',
          recommender: '',
          recommenders: {
            name: ''
          },
          political_status: '',
          education: '',
          level: '',
          platform: '',
          society_number: '',
          emergency_call: '',
          branch_bank_code: '',
          school: '',
          major: '',
          education_history: [
            {
              start_end_time: '',
              school: '',
              major: '',
              eduction: '',
              learn_type: '',
            }
          ],
          work_history: [
            {
              work_place: '',
              start_end_time: '',
              position: '',
              salary: '',
              witness: '',
              witness_phone: ''
            }
          ]
        };
        this.add_newStaff_visible = false;
      },
      //获取职位列表
      getDutyList() {
        this.$http.get('organization/duty',this.staffParams).then(res => {
          if (res.code === '20000') {
            this.dutyList = res.data.data;
          } else {
            this.dutyList = [];
          }
        })
      },
      //获取员工列表
      getStaffList() {
        this.$http.get('staff/user',this.staffParams).then(res => {
          if (res.code === '20000') {
            this.staffList = res.data.data;
          } else {
            this.staffList = [];
          }
        })
      },
      // 超出部分 反方向显示
      checkOverflow() {
        let obj = document.getElementById("scroll-body") || document.getElementById("scroll-body1");
        this.operatePos = false;
        this.$nextTick(function () {
          this.operatePos = obj.offsetHeight - obj.clientHeight > 0;
        })
      },
      reviseStaff(val) {
        if (this.staffId === val) {
          this.staffId = ''
        } else {
          this.staffId = val;
        }
      },
      getPositionList() {
        this.$http.get('organization/position',{
          duty_id: this.currentDutyInfo.id,
          page: 1,
          limit: 999
        }).then(res => {
          if (res.code === '20000') {
            this.positionList = res.data.data;
          } else {
            this.positionList = [];
          }
          this.positionVisible = true;
        })
      },
      // 权限/禁用/修改/离职
      operateModule(val,item,type) {
        if (val === 'revise') {
          this.currentStaff = item;
          this.is_edit = true;
          this.add_newStaff_visible = true;
          for (var key in this.interview_info_detail) {
            this.interview_info_detail[key] = item.staff && item.staff[key] || '';
          }
          this.interview_info_detail.recommenders = item.staff && item.staff.recommenders || {name: ''};
          this.interview_info_detail.name = item.name;
          this.interview_info_detail.position = item.position[0].name;
          this.interview_info_detail.position_id = [];
          this.interview_info_detail.org_id = [];
          this.interview_info_detail.position_id.push(item.position[0].id);
          this.interview_info_detail.org_id.push(item.org[0].id);
          this.interview_info_detail.depart = item.org[0].name;
          this.interview_info_detail.work_history = item.staff && item.staff.work_history || [];
          if (this.interview_info_detail.work_history === "[]") {
            this.interview_info_detail.work_history = [];
          }
          this.interview_info_detail.education_history = item.staff && item.staff.education_history || [];
          if (this.interview_info_detail.education_history === "[]") {
            this.interview_info_detail.education_history = [];
          }
          this.interview_info_detail.phone = item.phone;
          this.interview_info_detail.gender = item.gender;

          console.log(this.interview_info_detail);
        }
        if (val === 'disabled') {
          this.currentStaff = item;
        }
        if (val === 'positionManagement') {
          this.currentDutyInfo = item;
        }
        switch (val) {
          case 'power'://权限
            this.getSystemList();
            this.powerVisible = true;
            this.set_power.type_id = item.id;
            if (type === 'user') {
              this.self_power_params.user_id = item.id;
            } else if (type === 'position') {
              this.self_power_params.position_id = item.id;
            }
            this.self_power_params.type = type;
            this.set_power.permission_type = type;
            this.getSelfPower(this.powerChildName);
            break;
          case 'leave'://离职
            this.currentStaff = item;
            this.leaveVisible = true;
            break;
          case 'staff'://新增 员工
            this.add_newStaff_visible = true;
            break;
          case 'position'://岗位管理
            this.positionForm.depart = this.departInfo.name || '';
            this.positionForm.org_id.push(this.departInfo.id);
            this.addStaffVisible = true;
            break;
          case 'positionManagement'://岗位管理
            this.getPositionList();
            break;
          case 'post':
            this.add_position_form.depart = this.departInfo.name || '';
            this.add_position_form.org_id.push(this.departInfo.id);
            this.add_position_form.duty_id.push(this.currentDutyInfo.id);
            this.add_position_form.duty_name = this.currentDutyInfo.name || '';
            this.addPostVisible = true;
            break;
          case 'person'://新增 部门
            this.addPostVisible = true;
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
          case 'staff'://新增 员工
            this.staff_size = {
              width: '540px',
              height: '500px',
            };
            break;
          case 'position'://新增 职位
            this.position_size = {
              width: 800 + 'px',
              height: 700 + 'px'
            };
            break;
          case 'positionManagement'://新增 职位
            this.position_size = {
              width: 800 + 'px',
              height: 700 + 'px'
            };
            break;
          case 'post'://新增 岗位
            this.post_size = {
              width: '510px',
              height: '500px',
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
      // 岗位管理
      // 当前点击
      tableClickRow(row) {
        console.log(row);
        this.positionStaffList = row.users;
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/components/departManage.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/departManage/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin commonImg($m, $n) {
    $url: '../../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
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
    #departManage {

    }
  }

  #theme_name.theme3 {
    #departManage {

    }
  }

  #theme_name.theme4 {
    #departManage {

    }
  }
</style>
