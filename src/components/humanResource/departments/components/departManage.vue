<template>
  <div id="departManage">
    <!--员工管理/部门管理-->
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <!--<h3>{{tabsManage === 'staff' ? '新增员工' : '新建职位'}}</h3>-->
          <h3>{{ departInfo.name }}</h3>
        </div>
        <div class="dialog_main space-column departPosition">
          <div class="items-bet mainTop">
            <div class="items-bet">
              <span @click="chooseManage('staff')" :class="{'hover': tabsManage === 'staff'}">员工管理</span>
              <span @click="chooseManage('position')" :class="{'hover': tabsManage === 'position'}">职位管理</span>
            </div>
            <h2 class="add" @click="operateModule(tabsManage)">
              <b>+</b>
            </h2>
          </div>
          <div class="scroll_bar staffManage" id="scroll-body" v-if="tabsManage === 'staff'" @click="checkOverflow()">
            <div v-for="item in staffList">
              <div class="items-center" @click="reviseStaff(item)">
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
                <span v-for="label in operateList" @click="operateModule(label.type)">{{label.label}}</span>
                <b v-if="!operatePos"></b>
                <i v-if="operatePos"></i>
              </h5>
            </div>
          </div>
          <div class="scroll_bar orgManage" v-if="tabsManage === 'position'">
            <div v-for="item in positionList">
              <p @click="operateModule('position')">
                <span class="writingMode">{{ item.name }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--新增员工-->
    <lj-dialog
      :visible="add_newStaff_visible"
      :size="{width: 1200 + 'px',height: 800 + 'PX'}"
      @close="handleCancelAddStaff"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增员工</h3>
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
                          <el-radio :label="1">男</el-radio>
                          <el-radio :label="2">女</el-radio>
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
                      <el-input v-model="interview_info_detail.ID_number" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生日">
                      <el-date-picker placeholder="请选择" v-model="interview_info_detail.birthday" type="date" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="婚姻状况">
                      <div class="changeChoose" style="margin-top: 8px">
                        <el-radio-group v-model="interview_info_detail.married_status" placeholder="请选择">
                          <el-radio :label="1">已婚</el-radio>
                          <el-radio :label="2">未婚</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="家庭住址">
                      <el-input v-model="interview_info_detail.birthplace" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="部门">
                      <el-input placeholder="请选择" readonly @focus="" v-model="interview_info_detail.org.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="岗位">
                      <el-input readonly @focus="" v-model="interview_info_detail.position.name" placeholder="请选择"></el-input>
                    </el-form-item>
                  </el-col>
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
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input v-model="interview_info_detail.branch_bank" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户名">
                      <el-input v-model="interview_info_detail.account_name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职时间">
                      <el-date-picker placeholder="请选择" type="datetime" v-model="interview_info_detail.registion_date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="薪资">
                      <el-input v-model="interview_info_detail.real_salary" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="推荐人">
                      <el-input readonly v-model="interview_info_detail.recommender_name" @focus=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职 等级">
                      <el-select v-model="interview_info_detail.level" placeholder="请选择">
                        <el-option label="实习" :value="0"></el-option>
                        <el-option label="正式" :value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入职途径">
                      <el-input v-model="interview_info_detail.platform" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="社保卡号">
                      <el-input v-model="interview_info_detail.society_number" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急联系人/号码">
                      <el-input v-model="interview_info_detail.emergency_call" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="支行行号">
                      <el-input v-model="interview_info_detail.branch_bank_code" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="银行卡">

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学籍报告">

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="原单位离职证明">

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="学历信息" name="second">
              <el-form label-width="120px" size="small" style="width: 100%" v-if="interview_info_detail.education_history.length > 0">
                <div v-for="item in interview_info_detail.education_history" :key="item.id">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="起始时间:">
                        <span>{{ item.start_time }} ~ {{ item.end_time }}</span>
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
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="工作履历" name="third">
              <el-form label-width="120px" size="small" style="width: 100%" v-if="interview_info_detail.work_history.length > 0">
                <div v-for="item in interview_info_detail.work_history" :key="item.id">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="起始时间:">
                        <span>{{ item.start_time }} ~ {{ item.end_time }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="岗位:">
                        <span>{{item.position}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工作单位:">
                        <span>{{ item.work_place }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="薪资:">
                        <span>{{ item.salary }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人:">
                        <span>{{ item.witness }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人电话:">
                        <span>{{item.witness_phone }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini">提交</el-button>
          <el-button type="info" size="mini" @click="handleCancelAddStaff">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新建职位=======================================================================================-->
    <lj-dialog :visible="addStaffVisible" :size="staff_size" @close="addStaffVisible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>{{tabsManage === 'staff' ? '新增员工' : '新建职位'}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <!--员工-->
          <el-form :model="staffForm" ref="departForm" label-width="120px" class="depart_visible"
                   v-if="tabsManage === 'staff'">
            <el-form-item label="部门名称" required>
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" required>
              <div class="items-center iconInput">
                <el-input v-model="staffForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="岗位" required>
              <div class="items-center iconInput">
                <el-input v-model="staffForm.position"></el-input>
                <p class="icons position"></p>
              </div>
            </el-form-item>
          </el-form>
          <!--职位-->
          <el-form :model="positionForm" ref="departForm" label-width="120px" class="depart_visible" v-else>
            <el-form-item label="职位名称" required>
              <!--<el-input v-model="departForm.name"></el-input>-->
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <!--<el-input v-model="departForm.depart"></el-input>-->
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="关联岗位" required>
              <div class="multi-input">
                <div class="first">
                  <!--<el-input v-model="departForm.leader"></el-input>-->
                  <label @click="addStation">+</label>
                </div>
                <!--<el-input v-model="departForm.leader"></el-input>-->
              </div>
              <div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--权限管理===============================================================================================-->
    <lj-dialog :visible="powerVisible" :size="power_size" @close="powerVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>权限</h3>
        </div>
        <div class="dialog_main powerContent space-column">
          <div class="powerHead items-bet">
            <div class="inputLabel">
              <h4>权限类型</h4>
              <el-select :popper-class="'appTheme' + themeName" placeholder="请选择" v-model="power">
                <el-option label="收入" :value="1"></el-option>
                <el-option label="支出" :value="2"></el-option>
                <el-option label="混合" :value="3"></el-option>
              </el-select>
            </div>
            <i></i>
          </div>
          <div class="powerTabs">
            <el-tabs v-model="powerName" @tab-click="handleClick">
              <el-tab-pane :label="item.tabName" :name="item.status" v-for="(item,index) in powerNames" :key="index">
                <p class="childPower">
                  <span :class="{'hover':powerChildName === key.name}" v-for="key in item.value"
                        @click="handleName(key.name)">{{key.name}}</span>
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="flex powerMain scroll_bar">
            <div>
              <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
            </div>
            <div v-for="item in Object.keys(powerList)">
              <el-checkbox-group v-model="checkList" @change="handleCheck">
                <el-checkbox v-for="key in powerList[item]" :label="key.id" :key="key.id">
                  {{key.label}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--岗位管理===============================================================================================-->
    <lj-dialog :visible="positionVisible" :size="position_size" @close="positionVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>产品</h3>
        </div>
        <div class="dialog_main positionContent space-column">
          <div class="items-bet mainTop">
            <div class="items-bet">
              <span @click="chooseManage('post','post')" :class="{'hover': tabsPost === 'post'}">岗位</span>
              <span @click="chooseManage('person','post')" :class="{'hover': tabsPost === 'person'}">人员</span>
            </div>
            <h2 class="add" @click="operateModule(tabsPost)">
              <b>+</b>
            </h2>
          </div>
          <!--岗位-->
          <div style="height: 100%" v-if="tabsPost === 'post'">
            <div>
              <div class="mainListTable">
                <el-table
                  :data="tableData"
                  :row-class-name="tableChooseRow"
                  @cell-click="tableClickRow"
                  header-row-class-name="tableHeader"
                  style="width: 100%">
                  <el-table-column
                    v-for="item in Object.keys(showData)" :key="item"
                    align="center"
                    :prop="item"
                    :label="showData[item]">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">

                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div>
              <div class="mainListTable">
                <el-table
                  :data="tableData"
                  :row-class-name="tableChooseRow"
                  @cell-click="tableClickRow"
                  header-row-class-name="tableHeader"
                  style="width: 100%">
                  <el-table-column
                    v-for="item in Object.keys(showData)" :key="item"
                    align="center"
                    :prop="item"
                    :label="showData[item]">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">

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
    <lj-dialog :visible="addPostVisible" :size="post_size" @close="addPostVisible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>新建岗位</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="postForm" ref="postForm" label-width="120px" class="depart_visible">
            <el-form-item label="岗位名称" required>
              <el-input v-model="postForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <el-input v-model="postForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="所属职位" required>
              <div class="items-center iconInput">
                <el-input v-model="postForm.leader"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
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
          <el-form :model="postForm" ref="postForm" label-width="120px" class="depart_visible">
            <el-form-item label="岗位名称" required>
              <el-input v-model="postForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <el-input v-model="postForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="所属职位" required>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="postForm.leader">
              </el-input>
            </el-form-item>
            <div>
              <el-checkbox-group v-model="checkLists" style="display: flex;justify-content: center;color: #D2D2D2;">
                <el-checkbox label="发送离职群消息"></el-checkbox>
                <el-checkbox label="发送离职短信"></el-checkbox>
                <el-checkbox label="发送离职证明"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue'

  export default {
    name: "depart-manage",
    props: ['module','info'],
    components: {ljDialog},
    data() {
      return {
        //新增员工
        add_newStaff_visible: false,
        activeName: 'first',
        interview_info_detail: {
          name: '',
          gender: '',
          phone: '',
          ID_number: '',
          birthday: '',
          married_status: '',
          birthplace: '',
          org: {
            id: '',
            name: ''
          },
          position: {
            id: '',
            name: ''
          },
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          account_name: '',
          registion_date: '',
          real_salary: '',
          recommender_name: '',
          level: '',
          platform: '',
          society_number: '',
          emergency_call: '',
          branch_bank_code: '',
          education_history: [
            {
              start_time: '',
              end_time: '',
              school: '',
              major: '',
              eduction: '',
              learn_type: '',
            }
          ],
          work_history: [
            {
              work_place: '',
              start_time: '',
              end_time: '',
              position: '',
              salary: '',
              witness: '',
              witness_phone: ''
            }
          ]
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
        positionList: [],

        addStaffVisible: '',
        staffForm: {
          name: '',
          org_id: '',
          depart: '',
          position: '',
          position_id: '',
        },
        positionForm: {

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
        power: '',
        powerName: '1',//部门
        powerChildName: '三省六部',//部门模块
        powerNames: [
          {
            tabName: '人力资源',
            status: '1',
            value: [{
              name: '三省六部',
            }, {
              name: '招兵买马',
            }, {
              name: '排兵布阵',
            }, {
              name: '赏罚分明',
            }, {
              name: '奏事议政',
            }, {
              name: '内务库房',
            }]
          },
          {
            tabName: '财务中心',
            status: '2',
            value: [{
              name: '收款',
            }, {
              name: '科目',
            }, {
              name: '流水',
            }, {
              name: '入账',
            }]
          }
        ],
        powerList: {
          power1: [{
            id: 1,
            label: '查看组织架构'
          }, {
            id: 2,
            label: '查看员工档案'
          }, {
            id: 3,
            label: '查看成长轨迹'
          }, {
            id: 4,
            label: '查看离职短信'
          }, {
            id: 5,
            label: '查看离职交接单'
          }, {
            id: 6,
            label: '查看员工名册'
          }],
          power2: [{
            id: 11,
            label: '查看组织架构'
          }, {
            id: 21,
            label: '查看员工档案'
          }, {
            id: 31,
            label: '查看成长轨迹'
          }, {
            id: 41,
            label: '查看离职短信'
          }, {
            id: 51,
            label: '查看离职交接单'
          }, {
            id: 61,
            label: '查看员工名册'
          }],
          power3: [{
            id: 12,
            label: '查看组织架构'
          }, {
            id: 22,
            label: '查看员工档案'
          }, {
            id: 32,
            label: '查看成长轨迹'
          }, {
            id: 42,
            label: '查看离职短信'
          }, {
            id: 52,
            label: '查看离职交接单'
          }, {
            id: 62,
            label: '查看员工名册'
          }],
          power4: [{
            id: 13,
            label: '查看组织架构'
          }, {
            id: 23,
            label: '查看员工档案'
          }, {
            id: 33,
            label: '查看成长轨迹'
          }, {
            id: 43,
            label: '查看离职短信'
          }, {
            id: 53,
            label: '查看离职交接单'
          }, {
            id: 63,
            label: '查看员工名册'
          }],
          power5: [{
            id: 16,
            label: '查看组织架构'
          }, {
            id: 26,
            label: '查看员工档案'
          }, {
            id: 36,
            label: '查看成长轨迹'
          }, {
            id: 46,
            label: '查看离职短信'
          }, {
            id: 56,
            label: '查看离职交接单'
          }, {
            id: 66,
            label: '查看员工名册'
          }],
        },
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
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      info: {
        handler(val) {
          this.departInfo = val;
          console.log(val);
          this.staffParams.org_id = val.id;
          this.getStaffList();
          this.getPositionList();
        },
        deep: true
      },
      module(val) {
        this.depart_visible = val;
        this.lj_size = 'large'
      },
      depart_visible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {
      themeName() {
        return this.$store.state.app.themeName;
      }
    },
    methods: {
      handleCancelAddStaff() {

      },
      //获取职位礼拜
      getPositionList() {
        this.$http.get('organization/duty',this.staffParams).then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.positionList = res.data.data;
          } else {
            this.positionList = [];
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
      // 员工/部门 切换
      chooseManage(val, status = '') {
        if (status === 'post') {
          this.tabsPost = val;
        } else {
          this.tabsManage = val;
        }
      },
      reviseStaff(val) {
        if (this.staffId === val) {
          this.staffId = ''
        } else {
          this.staffId = val;
        }
      },
      // 新增关联岗位
      addStation() {

      },
      // 权限/禁用/修改/离职
      operateModule(val) {
        console.log(val);
        switch (val) {
          case 'power'://权限
            this.powerVisible = true;
            this.$http.get(globalConfig.organ_server + 'organization/permission', {
              system_id: 22,
              limit: 999,
              page: 1,
            }).then(res => {
              console.log(res)
            });
            break;
          case 'leave'://离职
            this.leaveVisible = true;
            break;
          case 'staff'://新增 员工
            this.add_newStaff_visible = true;
            break;
          case 'position'://岗位管理
            this.positionVisible = true;
            break;
          case 'post':
          case 'person'://新增 部门
            this.addPostVisible = true;
            break;
        }
        switch (val) {
          case 'power'://权限
            this.power_size = {
              width: '1600px',
              height: '800px',
            };
            break;
          case 'staff'://新增 员工
            this.staff_size = {
              width: '540px',
              height: '500px',
            };
            break;
          case 'position'://新增 职位
            this.position_size = 'small';
            break;
          case 'post'://新增 岗位
            this.post_size = {
              width: '510px',
              height: '450px',
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

      adds(val) {
        switch (val) {

        }
        switch (val) {

        }
      },
      // 权限切换
      handleClick(val) {

      },
      // 权限子集切换
      handleName(val) {
        this.powerChildName = val;
      },
      // 权限复选
      handleCheck(value) {
        let checkCount = value.length;
        let list = this.powerList;
        let count = 0;
        for (let item of  Object.keys(list)) {
          count = count + item.length;
        }
        this.checkAll = checkCount === count;
      },
      // 全选
      handleCheckAll(val) {
        if (val) {
          this.checkList = [];
          let list = this.powerList;
          for (let item of Object.keys(list)) {
            for (let key of list[item]) {
              this.checkList.push(key.id);
            }
          }
        } else {
          this.checkList = [];
        }
      },
      // 岗位管理
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
      .dialog_container {
        .dialog_main {
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
