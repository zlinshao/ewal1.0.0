<template>
  <div id="staffFiles">
    <lj-dialog :visible="files_visible" :size="files_size" @close="handleCloseStaff">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>员工档案</h3>
        </div>
        <div class="dialog_main staffFiles space-column">
          <div class="filesTop">
            <div class="items-center">
              <div>
                <h4 class="name">{{ staffDetail.name }}</h4>
                <h4>{{ staffDetail.position && staffDetail.position.name }}</h4>
              </div>
              <p>
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                <b></b>
                <i></i>
              </p>
            </div>
          </div>
          <div class="flex filesMain">
            <el-tabs v-model="activeName" @tab-click="handleClickTab" style="width: 100%;min-height: 600px">
              <el-tab-pane label="基本信息" name="first">
                <el-form label-width="140px" class="borderNone" size="small" :disabled="reviseInfo">
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="姓名">
                        <el-input v-model="staffDetail.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="岗位">
                        <el-input v-model="staffDetail.position_name" readonly @focus="post_visible = true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="部门">
                        <el-input v-model="staffDetail.org_name" readonly @focus="depart_visible = true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="职级">
                        <dropdown-list title="请选择" width="217" :json-arr="DROPDOWN_CONSTANT.POSITION_LEVEL" v-model="staffDetail.position_level"></dropdown-list>
                        <!--<el-select v-model="staffDetail.position_level">
                        <el-option :value="1" label="P1"></el-option>
                        <el-option :value="2" label="P2"></el-option>
                        <el-option :value="3" label="P3"></el-option>
                        <el-option :value="4" label="P4"></el-option>
                        <el-option :value="5" label="P5"></el-option>
                        <el-option :value="6" label="P6"></el-option>
                        <el-option :value="7" label="P7"></el-option>
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="在职状态">
                        <el-input readonly v-model="staffDetail.work_status"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职时间">
                        <el-date-picker v-model="staffDetail.enroll" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职等级">
                        <el-select v-model="staffDetail.level" placeholder="请选择">
                          <el-option label="实习" :value="0"></el-option>
                          <el-option label="正式" :value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="转正时间">
                        <el-date-picker v-model="staffDetail.forward_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="薪资">
                        <el-input v-model="staffDetail.salary"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <div class="flex changeChoose" style="margin-top: 10px">
                          <el-radio :label="1" v-model="staffDetail.gender">男</el-radio>
                          <el-radio :label="0" v-model="staffDetail.gender">女</el-radio>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="年龄">
                        <el-input v-model="staffDetail.age"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="婚育情况">
                         <el-select v-model="staffDetail.marital_fertility_status" placeholder="请选择">
                          <el-option label="未婚" :value="1"></el-option>
                          <el-option label="已婚未育" :value="2"></el-option>
                          <el-option label="正式" :value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="生日">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="staffDetail.birthday"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机">
                        <el-input v-model="staffDetail.phone"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="身份证">
                        <el-input v-model="staffDetail.id_num"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="e-mail">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="紧急联系人/电话">
                        <el-input v-model="staffDetail.emergency_call"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="籍贯">
                        <el-input v-model="staffDetail.origin_addr"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="城市">
                        <el-input v-model="staffDetail.city"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="民族">
                        <el-input v-model="staffDetail.national"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="户口属地">
                        <el-input v-model="staffDetail.city"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="户口性质">
                        <el-select v-model="staffDetail.household_register">
                          <el-option :value="0" label="农村"></el-option>
                          <el-option :value="1" label="城市"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="政治面貌">
                        <el-select v-model="staffDetail.political_status">
                          <el-option :value="1" label="群众"></el-option>
                          <el-option :value="2" label="团员"></el-option>
                          <el-option :value="3" label="党员"></el-option>
                          <el-option :value="4" label="其他"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="婚育状况">-->
                        <!--<el-select v-model="staffDetail.marital_fertility_status">-->
                          <!--<el-option :value="1" label="未婚"></el-option>-->
                          <!--<el-option :value="2" label="已婚未育"></el-option>-->
                          <!--<el-option :value="3" label="已婚已育"></el-option>-->
                        <!--</el-select>-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="英语等级">
                        <el-input v-model="staffDetail.english_level"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="犯罪史">
                        <div class="flex changeChoose" style="margin-top: 10px">
                          <el-radio :label="0" v-model="staffDetail.criminal_history">有</el-radio>
                          <el-radio :label="1" v-model="staffDetail.criminal_history">无</el-radio>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="就业证">
                        <el-select v-model="staffDetail.employment_permit">
                          <el-option :value="0" label="有"></el-option>
                          <el-option :value="1" label="无"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="家庭住址">
                        <el-input v-model="staffDetail.home_addr"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="社保卡号">
                        <el-input v-model="staffDetail.society_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职途径">
                        <el-select v-model="staffDetail.entry_way.entry_type">
                          <el-option :value="1" label="智联招聘"></el-option>
                          <el-option :value="2" label="前程无忧"></el-option>
                          <el-option :value="3" label="58同城"></el-option>
                          <el-option :value="4" label="BOSS直聘"></el-option>
                          <el-option :value="5" label="猎聘网"></el-option>
                          <el-option :value="6" label="首席信才"></el-option>
                          <el-option :value="7" label="德盛人才"></el-option>
                          <el-option :value="8" label="校园招聘会"></el-option>
                          <el-option :value="10" label="其他"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="推荐人">
                        <el-input readonly v-model="staffDetail.recommenders.name" @focus="staff_visible = true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户行">
                        <el-input v-model="staffDetail.account_bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户名">
                        <el-input v-model="staffDetail.account_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="支行">
                        <el-input v-model="staffDetail.branch_bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="支行行号">
                        <el-input v-model="staffDetail.branch_bank_code"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="银行卡号">
                        <el-input v-model="staffDetail.bank_num"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第一次合同时间">
                        <el-date-picker v-model="staffDetail.agreement_first_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第一次合同到期时间">
                        <el-date-picker v-model="staffDetail.agreement_first_end_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第二次合同时间">
                        <el-date-picker v-model="staffDetail.agreement_second_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="离职类型">
                        <el-select v-model="staffDetail.dismiss_reason.dismiss_type" clearable>
                          <el-option :value="1" label="主动离职"></el-option>
                          <el-option :value="2" label="旷工离职"></el-option>
                          <el-option :value="3" label="劝退"></el-option>
                          <el-option :value="4" label="开除"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="离职原因">
                        <el-input v-model="staffDetail.dismiss_reason.dismiss_mess"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="学历资料" name="second">
                <el-form class="borderNone" :disabled="reviseInfo" label-width="120px" size="small" style="width: 100%" v-if="staffDetail.education_history.length > 0">
                  <div v-for="(item,key) in staffDetail.education_history" :key="item.id" style="border-bottom: 1px dashed #E4E7ED;padding: 20px 10px;margin-bottom: 10px">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="起始时间">
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
                        <el-form-item label="学校名称">
                          <el-input v-model="item.school" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="专业">
                          <el-input v-model="item.major"  placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="学历">
                          <dropdown-list v-model="item.eduction" title="请选择" width="260" :json-arr="DROPDOWN_CONSTANT.EDUCATION_BACKGROUND"></dropdown-list>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="学习形式">
                          <el-select v-model="item.learn_type" placeholder="请选择">
                            <el-option :value="1" label="全日制"></el-option>
                            <el-option :value="2" label="其他"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div v-if="!reviseInfo && key==staffDetail.education_history.length-1" style="text-align: right">
                      <el-button type="danger" size="mini" style="width: 120px" @click="handleAddItem('eduction')">添加</el-button>
                      <el-button type="info" size="mini" style="width: 120px" v-if="staffDetail.education_history.length > 1" @click="handleDelItem('eduction')">删除</el-button>
                    </div>
                  </div>
                  <el-form-item label="入职材料">
                    <el-checkbox-group v-model="staffDetail.entry_materials" class="changeChoose flex-center">
                        <el-checkbox v-for="tmp in entry_materials_checkbox" :key="tmp.id" :label="tmp.id">{{ tmp.val }}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="银行卡照片:">
                        <a v-if="staffDetail.bank_card_image_url && staffDetail.bank_card_image_url.indexOf('.pdf') !== -1" :href="staffDetail.bank_card_image_url" target="_blank">点击查看</a>
                        <img style="width: 30px;height: 30px;cursor: pointer" v-else-if="staffDetail.bank_card_image_url && staffDetail.bank_card_image_url.indexOf('.pdf') === -1" :src="staffDetail.bank_card_image_url" data-magnify="" data-caption="图片查看器" :data-src="staffDetail.bank_card_image_url" alt="">
                        <a v-else>暂无</a>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="学籍验证报告:">
                        <a v-if="staffDetail.report_url && staffDetail.report_url.indexOf('.pdf') !== -1" :href="staffDetail.report_url" target="_blank">点击查看</a>
                        <img style="width: 30px;height: 30px;cursor: pointer" v-if="staffDetail.report_url" :src="staffDetail.report_url" data-magnify="" data-caption="图片查看器" :data-src="staffDetail.report_url" alt="">
                        <a v-else>暂无</a>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="离职证明:">
                        <img style="width: 30px;height: 30px;cursor: pointer" v-if="staffDetail.leaveproof_image_url" :src="staffDetail.leaveproof_image_url" data-magnify="" data-caption="图片查看器" :data-src="staffDetail.leaveproof_image_url" alt="">
                        <a v-else>暂无</a>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

              </el-tab-pane>
              <el-tab-pane label="工作履历" name="third">
                <el-form class="borderNone" :disabled="reviseInfo" label-width="120px" size="small" style="width: 100%" v-if="staffDetail.work_history.length > 0">
                  <div v-for="item in staffDetail.work_history" :key="item.id" style="border-bottom: 1px dashed #E4E7ED;padding: 20px 10px;margin-bottom: 10px">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="起始时间">
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
                        <el-form-item label="岗位">
                          <el-input v-model="item.position" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="工作单位">
                          <el-input v-model="item.work_place" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="薪资">
                          <el-input v-model="item.salary" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证明人">
                          <el-input v-model="item.witness" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证明人电话">
                          <el-input v-model="item.witness_phone" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-form>
                <div v-if="!reviseInfo" style="text-align: right">
                  <el-button type="danger" size="mini" style="width: 120px" @click="handleAddItem('work')">添加</el-button>
                  <el-button type="info" size="mini" style="width: 120px" v-if="staffDetail.work_history.length > 1" @click="handleDelItem('work')">删除</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="成长轨迹" name="fourth">
                <div  class="items-center mainRight scroll_bar">
                  <div class="grow" :style="{'backgroundPosition': num[index]}"  v-for="(item,index) in dates">
                    <div :class="[(index%2 === 0) ? 'tops' :  'bottoms']">
                      <p @click="handleOpenGrow(item)"><i></i>【{{item.created_at}} {{item.zh}}】<i></i></p>
                      <span><i></i></span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="dialog_footer" style="text-align: right">
          <el-button v-if="!reviseInfo" type="danger" size="small" @click="handleSubmitUpdate">确定</el-button>
          <el-button v-if="$storage.get('VALIDATE_PERMISSION')['Employee-File-Update']" type="info" size="small" @click="reviseInfo = !reviseInfo">编辑</el-button>
        </div>
      </div>
    </lj-dialog>

    <DepartOrgan :module="depart_visible" @close="handleGetDepart"></DepartOrgan>

    <PostOrgan :module="post_visible" @close="handleGetPost"></PostOrgan>

    <StaffOrgan :module="staff_visible" @close="handleGetStaff"></StaffOrgan>

    <!--员工轨迹详情-->
    <lj-dialog
      :visible="grow_visible"
      :size="{width: 600 + 'px',height: 750 + 'px'}"
      @close="grow_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="dialog_main" v-if="current_grow.length > 0">
          <div class="staff-line flex" v-for="(item,idx) in current_grow" :key="idx">
            <div class="left-line">
              <i></i>
              <div v-if="idx !== current_grow.length - 1"></div>
            </div>
            <div class="right-content">
              <p>{{ item.created_at }}</p>
              <p>{{ item.record_zh }}</p>
            </div>
          </div>
        </div>
        <div style="text-align: center" v-else>
          暂无数据
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue';
  import DepartOrgan from '../../../common/departOrgan.vue';
  import PostOrgan from '../../../common/postOrgan.vue';
  import StaffOrgan from '../../../common/staffOrgan.vue';

  export default {
    name: "staff-files",
    components: {ljDialog, DepartOrgan, PostOrgan, StaffOrgan},
    props: ['module', 'detailInfo'],
    data() {
      return {
        //员工档案tab
        activeName: 'first',
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
        grow_visible: false,
        current_grow: '',
        step_active: 1,


        staff_visible: false,
        depart_visible: false,
        post_visible: false,

        staffDetail: {
          id: '',
          national: '',
          name: '',
          id_num: '',
          phone: '',
          bank_card_image_url:'',
          leaveproof_image_url:'',
          report_url:'',
          position_id: [], //岗位id
          position_name: '', //岗位名称
          org_id: [], //部门id
          org_name: '', //部门名称
          enroll: '',
          email: '',
          gender: '',
          education: '',
          position_level: '',
          forward_time: '',
          society_number: '',
          english_level: '',
          work_status: '',
          birthday: '',
          age: '',
          political_status: '',
          entry_way: {
            entry_type: '',
            entry_mess: ''
          },
          dismiss_time: '',
          dismiss_reason: {
            dismiss_type: '',
            dismiss_mess: '',
          },
          agreement_first_time: '',
          agreement_first_end_time: '',
          agreement_second_time: '',
          emergency_call: '',
          account_name: '',
          branch_bank: '',
          branch_bank_code: '',
          account_bank: '',
          bank_num: '',
          origin_addr: '',
          city: '',
          criminal_history: '',
          household_register: '',
          employment_permit: '',
          recommender: '',
          recommenders: {
            name: ''
          },
          marital_fertility_status: '',
          level: '',
          home_addr: '',
          salary: '',
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
        }, //员工详情
        currentStaffInfo: '',

        reviseInfo: true,
        files_visible: false,
        files_size: {},
        filesStatus: 'info',
        dates: [],
      }
    },
    mounted() {
    },
    watch: {
      'staffDetail.city': {
        handler(val,oldVal) {
        },
        immediate: true,
        deep: true
      },

      module(val) {
        this.files_visible = val;
        this.files_size = {
          width: '1600px',
          height: '855px',
        };
      },
      files_visible(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      },
      detailInfo: {
        handler(val) {
          this.currentStaffInfo = val;
          for (let key in this.staffDetail) {
            this.staffDetail[key] = key in val ? val[key] : val.staff && key in val.staff ? val.staff[key] : '';
          }
          this.staffDetail.work_status = val.is_on_job ? '离职' : '在职';
          this.staffDetail.dismiss_reason = val.staff && val.staff.dismiss_reason || { dismiss_type: ''};
          if (val.staff && val.staff.entry_way) {
            this.staffDetail.entry_way = Object.assign({},this.staffDetail.entry_way,val.staff.entry_way);
          } else {
            this.staffDetail.entry_way = {
              entry_type: '',
              entry_mess: ''
            };
          }
          this.staffDetail.recommenders = val.staff && val.staff.recommenders || {name: ''};
          this.staffDetail.work_history = val.staff && val.staff.work_history || [];
          this.staffDetail.education_history = val.staff && val.staff.education_history || [];
          if (val.position && val.position.length > 0) {
            this.staffDetail.position_id = [];
            for (let item of val.position) {
              this.staffDetail.position_id.push(item.id);
              this.staffDetail.position_name += item.name + ',';
            }
            this.staffDetail.position_name = this.staffDetail.position_name.substring(0, this.staffDetail.position_name.length - 1);
          }
          if (val.org && val.org.length > 0) {
            this.staffDetail.org_id = [];
            for (let item of val.org) {
              this.staffDetail.org_id.push(item.id);
              this.staffDetail.org_name += item.name + ',';
            }
            this.staffDetail.org_name = this.staffDetail.org_name.substring(0, this.staffDetail.org_name.length - 1);
          }
          if (this.staffDetail.birthday) {
            this.staffDetail.age = Math.ceil((new Date() - new Date(this.staffDetail.birthday)) / 1000 / 60 / 60 / 24 / 365) || '';
          }
        },
        //deep: true
      }
    },
    computed: {
      num() {
        let bbb = ['0 0'],  ccc = 0;
        for (let i =0;i<this.dates.length ;i ++){
          let ddd = '';
          ccc += 100;
          if (ccc > 100) {
            ccc = 0;
          }
          ddd = ccc + '% 0';
          bbb.push(ddd);
        }
        return bbb;
      }
    },
    methods: {
      handleCloseStaff() {
        this.files_visible = false;
        this.reviseInfo = true;
        this.activeName = 'first';
        this.$emit('close');
      },
      handleOpenGrow(item) {
        if(!this.validatePermission('Operation-Record-Index')) return;
        this.$http.get(globalConfig.humanResource_server+`staff/user/${item.user_id}/growth_record`).then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.current_grow = res.data.data;
          } else {
            this.current_grow = [];
          }
        });
        this.grow_visible = true;
      },
      //删除item
      handleDelItem(type) {
        if (type === 'work') {
          this.staffDetail.work_history.pop()
        }
        if (type === 'eduction') {
          this.staffDetail.education_history.pop();
        }
      },
      //添加item
      handleAddItem(type) {
        console.log(this.staffDetail);
        if (type === 'work') {
          this.staffDetail.work_history.push({
            work_place: '',
            start_end_time: '',
            position: '',
            salary: '',
            witness: '',
            witness_phone: ''
          })
        }
        if (type === 'eduction') {

          this.$nextTick(()=> {
            this.staffDetail.education_history.push({
              start_end_time: '',
              school: '',
              major: '',
              eduction: '',
              learn_type: '',
            });
          });
        }
      },
      handleClickTab(tab) {
        this.activeName = tab.name;
        if (this.activeName === 'fourth') {
          this.getStaffGrowInfo(this.currentStaffInfo.id);
        }
      },
      handleSubmitUpdate() {
        if(this.staffDetail.enroll&&this.staffDetail.forward_time) {
          let enroll = new Date(this.staffDetail.enroll).getTime();
          let forward = new Date(this.staffDetail.forward_time).getTime();
          if(enroll>forward) {
            this.$LjMessage('warning',{title:'警告',msg:'转正时间不可比入职时间早'});
            return;
          }
        }
        this.$http.put(globalConfig.humanResource_server+`staff/user/${this.currentStaffInfo.id}`, {
          type: 'update',
          ...this.staffDetail
        }).then(res => {
          if (res.code === '20030') {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg
            });
            this.reviseInfo = !this.reviseInfo;
            this.files_visible = false;
            this.activeName = 'first';
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleGetStaff(id, name) {
        if (id !== 'close') {
          this.staffDetail.recommenders.name = name;
          this.staffDetail.recommender = id[0];
        }
        this.staff_visible = false;
      },
      handleGetPost(id, name) {
        if (id !== 'close') {
          this.staffDetail.position_name = name;
          this.staffDetail.position_id = id;
        }
        this.post_visible = false;
      },
      handleGetDepart(id, name) {
        if (id !== 'close') {
          this.staffDetail.org_name = name;
          this.staffDetail.org_id = id;
        }
        this.depart_visible = false;
      },
      getStaffGrowInfo(id) {
        this.$http.get(globalConfig.humanResource_server+`staff/user/${id}/growth`, {
          page: 1,
          limit: 999
        }).then(res => {
          if (res.code === '20000') {
            this.dates = res.data.data;
          } else {
            this.dates = [];
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/components/staffFiles.scss";

  @mixin filesImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/components/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #staffFiles {
      .dialog_container {
        .staffFiles {
          .filesTop {
            p {
              b {
                @include filesImg('nan.png', 'theme1');
              }
              i {
                @include filesImg('nv.png', 'theme1');
              }
            }
          }
          .filesMain {
            .mainLeft {
              p {
                @include filesImg('huidikuang.png', 'theme1');
              }
              .hover {
                @include filesImg('hongdikuang.png', 'theme1');
              }
            }
            .mainRight {
              b {
                @include bgImage("../../../../assets/image/common/theme1/xiugai.png");
              }
              .grow {
                background: url("../../../../assets/image/humanResource/departments/components/theme1/liuxian.png") no-repeat left center;
              }
            }
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #staffFiles {

    }
  }
</style>
