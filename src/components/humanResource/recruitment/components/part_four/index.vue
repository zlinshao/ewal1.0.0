<!--预约入职-->
<template>
  <div id="part_four" class="scroll_bar">
    <div class="flex-center">
      <div class="container flex-center">
        <div class="content">
          <el-table
            :data="tableList"
            highlight-current-row
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            style="width: 100%"
          >
            <el-table-column label="岗位" prop="position.name" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="来源" prop="plaform_name" align="center"></el-table-column>
            <el-table-column label="入职资料反馈" prop="info_status" align="center"></el-table-column>
            <el-table-column label="入职结果" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.entry_feedback===0" size="mini" type="warning" plain @click="handleOpenEdit(scope.row)">未反馈
                </el-button>
                <el-button v-if="scope.row.entry_feedback===1 && scope.row.offer_status===1" size="mini" type="warning" plain @click="handleEntryEdit(scope.row)">入职
                </el-button>
                <span v-if="scope.row.entry_feedback===1&& !scope.row.offer_status">入职</span>
                <span v-if="scope.row.entry_feedback===2">拒绝入职</span>
                <span v-if="scope.row.entry_feedback===3">已经入职</span>
              </template>
            </el-table-column>
            <el-table-column label="入职通知" align="center">
              <template slot-scope="scope">
                <el-button  size="mini" type="primary" plain @click="handleSendOffer(scope.row)">
                  <span v-if="!scope.row.offer_status">发送offer</span>
                  <span v-else>重新发送</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page bottom_page">
          <el-pagination
            :total="count"
            layout="total,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handleChangePage"
            style="text-align: center"
          ></el-pagination>
        </div>
      </div>

      <!--编辑入职结果-->
      <lj-dialog
        :visible="edit_result_visible"
        :size="{width: 400 + 'px',height: 520 + 'px'}"
        @close="handleCancelEdit"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>编辑入职结果</h3>
          </div>
          <div class="dialog_main">
            <el-form :model="edit_result_form" size="small" label-width="80px">
              <el-form-item label="岗位">
                <span>{{ edit_result_form.position }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ edit_result_form.name }}</span>
              </el-form-item>
              <el-form-item label="来源">
                <span>{{ edit_result_form.platform }}</span>
              </el-form-item>
              <el-form-item label="入职资料">
                <span>{{ edit_result_form.info_status }}</span>
              </el-form-item>
              <el-form-item label="入职结果">
                <div class="changeChoose flex-center" style="margin-top: 10px">
                  <el-radio v-model="edit_result_form.entry_feedback" :label="1">同意</el-radio>
                  <el-radio v-model="edit_result_form.entry_feedback" :label="2">拒绝</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="" v-if="edit_result_form.entry_feedback === 2">
                <el-select v-model="edit_result_form.unentry_reason" placeholder="请选择原因">
                  <el-option :value="1" label="上班路程远"></el-option>
                  <el-option :value="2" label="薪资低"></el-option>
                  <el-option :value="3" label="将入职其他公司"></el-option>
                  <el-option :value="4" label="暂不考虑离职"></el-option>
                  <el-option :value="5" label="过期未回复"></el-option>
                  <el-option :value="6" label="其他原因"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger" @click="handleOkEdit">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelEdit">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--员工资料-->
      <lj-dialog
        :visible="interviewee_info_visible"
        :size="{width: 1200 + 'px',height: 820 + 'px'}"
        @close="handleCloseLookInfo"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>员工资料</h3>
          </div>
          <div class="dialog_main a_color borderNone">
            <el-tabs v-model="activeName">
              <el-tab-pane label="基本信息" name="first">
                <el-form label-width="150px" size="small" style="width: 100%">
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
                            <el-radio :label="0">女</el-radio>
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
                        <el-input placeholder="请选择" readonly @focus="depart_visible = true" v-model="interview_info_detail.org_id.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="岗位">
                        <el-input readonly @focus="position_visible = true" v-model="interview_info_detail.position.name" placeholder="请选择"></el-input>
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
                        <el-date-picker placeholder="请选择" type="date" v-model="interview_info_detail.registion_date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="薪资">
                        <el-input v-model.trim="interview_info_detail.real_salary" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="推荐人">
                        <el-input readonly v-model="interview_info_detail.recommender_name" @focus="handleOpenStaff('second')"></el-input>
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
                      <el-form-item label="薪资等级">
                        <el-input v-model="interview_info_detail.salary_level" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职位等级">
                        <el-input v-model="interview_info_detail.position_level" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="支行行号">
                        <el-input v-model="interview_info_detail.branch_bank_code" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第一次合同开始时间">
                        <el-date-picker placeholder="请选择" type="datetime" v-model="interview_info_detail.agreement_first_time" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col><el-col :span="8">
                      <el-form-item label="第一次合同结束时间">
                        <el-date-picker placeholder="请选择" type="datetime" v-model="interview_info_detail.agreement_first_end_time" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第二次合同开始时间">
                        <el-date-picker placeholder="请选择" type="datetime" v-model="interview_info_detail.agreement_second_time" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="银行卡">
                        <a v-if="interviewee_info.bank_card_image_url && interviewee_info.bank_card_image_url.indexOf('.pdf') !== -1" :href="interviewee_info.bank_card_image_url" target="_blank">点击查看</a>
                        <img style="width: 30px;height: 30px;cursor: pointer" v-else-if="interviewee_info.bank_card_image_url && interviewee_info.bank_card_image_url.indexOf('.pdf') === -1" :src="interviewee_info.bank_card_image_url" data-magnify="" data-caption="图片查看器" :data-src="interviewee_info.bank_card_image_url" alt="">
                        <a v-else>暂无</a>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="学籍报告">
                        <a v-if="interviewee_info.report_url && interviewee_info.report_url.indexOf('.pdf') !== -1" :href="interviewee_info.report_url" target="_blank">点击查看</a>
                        <img style="width: 30px;height: 30px;cursor: pointer" v-if="interviewee_info.report_url" :src="interviewee_info.report_url" data-magnify="" data-caption="图片查看器" :data-src="interviewee_info.report_url" alt="">
                        <a v-else>暂无</a>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="原单位离职证明">
                        <img style="width: 30px;height: 30px;cursor: pointer" v-if="interviewee_info.leaveproof_image_url" :src="interviewee_info.leaveproof_image_url" data-magnify="" data-caption="图片查看器" :data-src="interviewee_info.leaveproof_image_url" alt="">
                        <a v-else>暂无</a>
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
                          <span>{{item.school}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="专业:">
                          <span>{{ item.major }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="学历:">
                          <span>{{ item.education }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="学习形式:">
                          <span>{{item.learning_ways }}</span>
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

            <!--入职成功-->
            <div class="success_work" :class="{'success_work_animation': work_success}"></div>
          </div>
          <div class="dialog_footer" v-if="!work_success" style="text-align: right">
            <el-button size="small" type="danger" @click="ok_interviewee_visible = true">入职</el-button>
            <el-button size="small" type="info" @click="handleCloseLookInfo">取消</el-button>
          </div>
          <div class="dialog_footer" v-if="work_success" style="text-align: right">
            <el-button size="small" type="danger" disabled>已入职</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--入职确定-->
      <lj-dialog
        :visible="ok_interviewee_visible"
        :size="{width: 450 + 'px',height: 250 + 'px'}"
        @close="ok_interviewee_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定入职该员工吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkInterviewee(false)">确定</el-button>
            <el-button type="danger" size="small" @click="handleOkInterviewee(true)">确定并发送入职消息</el-button>
            <el-button type="info" size="small" @click="ok_interviewee_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--确定发送offer-->
      <lj-dialog
        :visible="ok_send_offer"
        :size="{width: 400 + 'px',height: 350 + 'px'}"
        @close="handleCancelSel"
      >
        <div class="dialog_container">
          <div class="dialog_header"></div>
          <div class="dialog_main borderNone">
            <div class="changeChoose showPadding">
              <div class="flex" style="margin-bottom: 20px">
                <el-radio v-model="send_choose" :label="1">同时抄送密件给</el-radio>
                <div class="items-center iconInput">
                  <user-choose title="发送人" width="100" v-model="offer_info_form.leader_id"></user-choose>
                </div>
              </div>
              <el-radio v-model="send_choose" :label="2">直接发送</el-radio>
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkSendOffer">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelSel">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--发送offer-->
      <div class="offer_container" :class="{'hide_offer_container': !write_offer_visible}">
        <h1>录用通知书</h1>
        <h4>南京乐伽商业管理有限公司</h4>
        <div class="content">
          <p>
            <a class="name">{{ currentInfo && currentInfo.name }}</a><strong>先生/小姐</strong> <br>
          </p>
          <p>
            <strong>祝贺您被我公司录用</strong>
          </p>
          <p>
            一、职位 <a class="name">{{ currentInfo && currentInfo.position && currentInfo.position.name }}</a>
          </p>
          <p>
            二、劳动合同期为
            <el-input style="width: 50px" v-model="offer_info_form.contract_length"></el-input>
            年，试用期为
            <el-input style="width: 50px" v-model="offer_info_form.try_out_length"></el-input>
            个月，试用期工资是
            <el-input v-model="offer_info_form.try_out_salary_percent" style="width: 100px" type="text"></el-input>%
          </p>
          <p>
            三、工作报酬
          </p>
          <p>
            <span class="kong"></span> 月工资(转正薪资)：税前RMB
            <el-input v-model.number.trim="offer_info_form.real_salary" style="width: 100px"></el-input>
            元
          </p>
          <p>
            <span class="kong"></span> 其中需要扣除个人应缴纳的养老保险、医疗保险、失业保险等。
          </p>
          <p>
            四、福利待遇
          </p>
          <p>
            <span class="kong"></span> (1)国家规定的五险一金加商业意外险；
          </p>
          <p>
            <span class="kong"></span> (2)每年带薪休假按国家规定。
          </p>
          <p>
            五、报道事宜
          </p>
          <p>
            <span class="kong"></span> 请您和原单位终止雇佣关系后于
            <el-input-number :max="3000" :min="2000" style="width: 80px" v-model.number="baoDao.year"></el-input-number>
            年
            <el-input-number :max="12" :min="1" v-model="baoDao.month" style="width: 80px"></el-input-number>
            月
            <el-input-number :max="31" :min="1" v-model="baoDao.day" style="width: 80px"></el-input-number>
            日上午10:00前上传证件资料并携带身份证至我公司人事部报道，报道地址：南京建邺区艺术家工场19层
          </p>
          <p>
            <span class="btn">单击此处上传对应证件资料</span>
          </p>
          <p>
            六、特别声明
          </p>
          <p>
            <span class="kong"></span> (1)您有义务对您的薪资内容保密，不将其告知第三方。
          </p>
          <p>
            <span class="kong"></span> (2)此通知在
            <el-input-number :max="3000" :min="2000" v-model="huiFu.year" style="width: 80px"></el-input-number>
            年
            <el-input-number :max="12" :min="1" v-model.number="huiFu.month" style="width: 80px"></el-input-number>
            月
            <el-input-number :max="31" :min="1" v-model="huiFu.day" style="width: 80px"></el-input-number>
            日
            <el-input-number  :max="23" :min="0" v-model="huiFu.time" style="width: 80px"></el-input-number>
            点前回复邮件有效，否则将视为自动放弃该职位。
          </p>
          <div class="footer flex">
            <div>
              <div class="logo"></div>
            </div>
            <div>
              <el-button size="small" type="danger" @click="handleOpenSel">确定</el-button>
              <el-button size="small" type="info" @click="handleCloseOffer">取消</el-button>
            </div>
          </div>
        </div>
      </div>

      <!--劳务合同-->
      <div class="labour_contract" :class="{'hide_labour_contract': labour_contract_visible}">
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
                  <el-input v-model="labour_form.birthday"></el-input>
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
              <el-input v-model="labour_form.begin_date"></el-input>
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

      <StaffOrgan :module="modules" @close="handleGetStaffInfo"></StaffOrgan>

      <!--部门-->
      <DepartOrgan :module="depart_visible" @close="handleGetDepart"></DepartOrgan>

      <!--岗位-->
      <PostOrgan :module="position_visible" @close="handleGetPosition"></PostOrgan>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';
  import StaffOrgan from '../../../../common/staffOrgan.vue';
  import DepartOrgan from '../../../../common/departOrgan.vue';
  import PostOrgan from '../../../../common/postOrgan.vue';
  import UserChoose from "../../../../common/lightweightComponents/UserChoose";

  export default {
    name: "index",
    props:['searchData'],
    components: {UserChoose, LjDialog, StaffOrgan,DepartOrgan,PostOrgan},
    data() {
      return {
        //表格信息
        tableList: [],
        chooseRowIds: [], //图标点击
        entry_feedback: ['未反馈', '同意入职', '拒绝入职'],
        params: {
          page: 1,
          limit: 6
        },
        count:0,

        // 编辑入职结果
        edit_result_visible: false,
        edit_result_form: {
          position: '',
          name: '',
          platform: '',
          info_status: '',
          entry_feedback: '',
          unentry_reason: ''
        },
        currentRow: '',

        //员工资料
        interviewee_info: '',
        interviewee_info_visible: false,
        ok_interviewee_visible: false,

        //确定发送offer
        ok_send_offer: false,
        currentInfo: '',
        send_choose: 2,
        modules: false,

        //录入offer信息
        write_offer_visible: false,
        baoDao: {
          year: '',
          month: '',
          day: '',
        },
        huiFu: {
          year: '',
          month: '',
          day: '',
          time: ''
        },
        offer_info_form: {
          try_out_salary_percent: '80',
          real_salary: '',
          registion_date: '',
          effect_date: '',
          contract_length: '3',
          try_out_length: '3',
          leader_id: [],
        },

        //员工资料
        interview_info_detail: {
          name: '',
          gender: '',
          phone: '',
          ID_number: '',
          birthday: '',
          married_status: '',
          birthplace: '',
          org_id: {
            id: '',
            name: ''
          },
          position: {
            id: '',
            name: ''
          },
          position_id: '',
          bank_num: '',
          account_bank: '',
          branch_bank: '',
          registion_date: '',
          real_salary: '',
          society_number: '',
          education_history: [],
          work_history: [],
          recommender: '',
          recommender_name: '',
          entry_way: '',
          level: '',
          account_name: '',
          platform: '',
          entry_materials: [],
          emergency_call: '',
          branch_bank_code: '',
        },
        activeName: 'first',

        //部门
        depart_visible: false,
        position_visible: false,

        staff_type: '',

        //入职成功
        work_success: false,

        //劳务合同
        labour_contract_visible: true,
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
        ok_send_contract: false
      }
    },
    mounted() {
      this.getTableList();
    },
    activated() {
    },
    watch: {
      searchData: {
        handler(val) {
          this.params = Object.assign(this.params,{},val);
          this.getTableList();
        },
        deep: true
      },
      baoDao: {
        handler(val) {
          this.$nextTick(()=> {
            if (!val.year) {
              this.baoDao.year = 2019;
            }
            if (!val.month) {
              this.baoDao.month = 1;
            }
            if (!val.day) {
              this.baoDao.day = 1;
            }
          });

        },
        deep: true,
        immediate: true
      },
      huiFu: {
        handler(val) {
          this.$nextTick(()=> {
            if (!val.year) {
              this.huiFu.year = 2019;
            }
            if (!val.month) {
              this.huiFu.month = 1;
            }
            if (!val.day) {
              this.huiFu.day = 1;
            }
            if (!val.time) {
              this.huiFu.time = 1;
            }
          });

        },
        deep: true,
        immediate: true
      },
    },
    computed: {},
    methods: {
      handleConfirmContract() {
        this.labour_form.send = 1;
        this.labour_form.type = 1;
        this.$http.post('recruitment/interviewer_process/view_contract',this.labour_form).then(res => {
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
      handleGetPosition(id,name) {
        this.interview_info_detail.position_id = id;
        this.interview_info_detail.position.name = name;
        this.interview_info_detail.position.id = id;
        this.position_visible = false;
      },
      handleOpenStaff(type) {
        this.staff_type = type;
        if (type === 'first') {
          this.modules = true;
          this.send_choose = 1
        }
        if (type === 'second') {
          this.modules = true;
        }
      },
      handleGetDepart(id,name) {
        if (id !== 'close') {
          this.interview_info_detail.org_id.id = id;
          this.interview_info_detail.org_id.name = name;
        }
        this.depart_visible = false;
      },
      handleCancelSel() {
        this.send_choose = 2;
        this.offer_info_form.leader_id = [];
        this.ok_send_offer = false;
      },
      handleOpenSel() {
        var baoDao = this.baoDao;
        var huiFu = this.huiFu;
        this.offer_info_form.registion_date = `${baoDao.year}-${baoDao.month}-${baoDao.day}`;
        this.offer_info_form.effect_date = `${huiFu.year}-${huiFu.month}-${huiFu.day} ${huiFu.time}`;
        this.ok_send_offer = true;
      },
      //关掉offer
      handleCloseOffer() {
        this.baoDao = {
          year: '',
          month: '',
          day: '',
        };
        this.huiFu = {
          year: '',
          month: '',
          day: '',
          time: ''
        };
        this.offer_info_form = {
          try_out_salary_percent: '80',
          real_salary: '',//税前工资
          registion_date: '',
          effect_date: '',
          contract_length: '3',
          try_out_length: '3',
          leader_id: [],
        };
        this.write_offer_visible = false;
      },
      handleGetStaffInfo(id, name) {
        if (this.staff_type === 'first') {
          this.offer_info_form.leader_id = id;
        } else {
          this.interview_info_detail.recommender = id;
          this.interview_info_detail.recommender_name = name;
        }
        this.staff_type = '';
        this.modules = false;
      },
      handleOkSendOffer() {
        /*验证offer_info_form*/
        if(isNaN(this.offer_info_form.real_salary)||!this.offer_info_form.real_salary) {
          this.$LjMessage('warning',{title:'警告',msg:'税前薪资请填入数字'});
          return;
        }
        if(this.send_choose==1&&this.offer_info_form.leader_id.length==0) {
          this.$LjMessage('warning',{title:'警告',msg:'请选择发送人'});
          return;
        }


        this.$http.put(`recruitment/interviewer_process/send_offer/${this.currentInfo.interviewee_id}`,this.offer_info_form).then(res => {
          if (res.code === "20000") {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelSel();
            this.handleCloseOffer();
            this.getTableList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }

        }).catch(err => {
          console.log(err);
        })
      },
      handleSendOffer(row) {
        this.formatTime();
        this.currentInfo = row;
        this.write_offer_visible = true;
      },

      formatTime() {
        let date = new Date();
        date.setDate(date.getDate() + 7);
        let year = this.myUtils.formatDate(date,'yyyy');
        let month = this.myUtils.formatDate(date,'MM');
        let day = this.myUtils.formatDate(date,'dd');
        let time = this.myUtils.formatDate(date,'hh');
        this.baoDao = {
          year,
          month,
          day,
        };
        this.huiFu = {
          year,
          month,
          day,
          time
        };
      },

      getLabourInfo(id) {
        this.$http.get(`recruitment/interviewer_process/get_contract_info/${id}`).then(res => {
          console.log(res);
          if (res.code === '20010') {
            this.labour_form = res.data;
            this.ok_interviewee_visible = false;
            setTimeout(() => {
              this.handleCancelEdit();
              this.interviewee_info_visible = false;
            },1000);
            setTimeout(() => {
              this.labour_contract_visible = false;
            },2000)
          } else {
            this.$LjNotify('warning',{
              title: '获取劳务合同失败，请重试'
            });
            return false;
          }
        });
      },
      handleOkInterviewee(isSendMessage) {
        let params = {
          ...this.interview_info_detail
        };
        params.send_info = isSendMessage?1:0;
        this.$http.put(`recruitment/interviewer_process/update_info/${this.currentRow.interviewee_id}`,params).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
              this.ok_interviewee_visible = false;
              setTimeout(() => {
                  this.handleCancelEdit();
                  this.interviewee_info_visible = false;
              },1000);
              this.getTableList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleCloseLookInfo() {
        this.work_success = false;
        this.interviewee_info = '';
        this.interviewee_info_visible = false;
      },
      handleOkEdit() {
          this.$http.put(`recruitment/interviewer_process/entry_feedback/${this.currentRow.id}`, {
              entry_feedback: this.edit_result_form.entry_feedback,
              unentry_reason: this.edit_result_form.unentry_reason
          }).then(res => {
              if (res.code === '20000') {
                  this.$LjNotify('success', {
                      title: '成功',
                      message: '编辑成功'
                  })
              } else {
                  this.$LjNotify('warning', {
                      title: '失败',
                      message: '编辑失败'
                  })
              }
              this.handleCancelEdit();
              this.getTableList();
          }).catch(err => {
              console.log(err);
          })
      },
      //   if (this.edit_result_form.entry_feedback === 1) {
      //     this.$http.get(`recruitment/interviewees/get_info/${this.currentRow.interviewee_id}`).then(res => {
      //       if (res.code === '20030') {
      //         this.interviewee_info = res.data;
      //         console.log(this.interviewee_info);
      //         for (var key in this.interview_info_detail) {
      //           this.interview_info_detail[key] = res.data[key] ? res.data[key] : null;
      //         }
      //         this.interviewee_info_visible = true;
      //       } else {
      //         this.interviewee_info = '';
      //         this.$LjNotify('warning', {
      //           title: '警告',
      //           message: '未获取到信息'
      //         });
      //       }
      //     }).catch(err => {
      //       console.log(err);
      //     })
      //   } else if (this.edit_result_form.entry_feedback === 2) {
      //     this.$http.put(`recruitment/interviewer_process/entry_feedback/${this.currentRow.id}`, {
      //       entry_feedback: this.edit_result_form.entry_feedback,
      //       unentry_reason: this.edit_result_form.unentry_reason
      //     }).then(res => {
      //       if (res.code === '20000') {
      //         this.$LjNotify('success', {
      //           title: '成功',
      //           message: '编辑成功'
      //         })
      //       } else {
      //         this.$LjNotify('warning', {
      //           title: '失败',
      //           message: '编辑失败'
      //         })
      //       }
      //       this.handleCancelEdit();
      //       this.getTableList();
      //     }).catch(err => {
      //       console.log(err);
      //     })
      //   }
      // },
      handleOpenEdit(row) {
        this.currentRow = row;
        this.edit_result_form.position = row.position.name;
        this.edit_result_form.name = row.name;
        this.edit_result_form.platform = row.plaform_name;
        this.edit_result_form.info_status = row.info_status;
        this.edit_result_visible = true;
      },
      handleEntryEdit(row) {
        this.currentRow = row;
        this.$http.get(`recruitment/interviewees/get_info/${this.currentRow.interviewee_id}`).then(res => {
          if (res.code === '20030') {
            this.interviewee_info = res.data;
            console.log(this.interviewee_info);
            for (var key in this.interview_info_detail) {
              this.interview_info_detail[key] = res.data[key] ? res.data[key] : null;
            }
            this.interviewee_info_visible = true;
          } else {
            this.interviewee_info = '';
            this.$LjNotify('warning', {
              title: '警告',
              message: '未获取到信息'
            });
          }
        }).catch(err => {
          console.log(err);
        })
    },
      handleCancelEdit() {
        this.edit_result_form = {
          position: '',
          name: '',
          platform: '',
          info_status: '',
          entry_feedback: '',
          unentry_reason: ''
        };
        this.edit_result_visible = false;
      },
      //获取表格数据
      getTableList() {
        this.$http.get('recruitment/interviewer_process/interviewedList',this.params).then(res => {
          if (res.code === '20000') {
            this.tableList = res.data.data;
            this.count = res.data.count;
          } else {
            this.tableList = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },

      handleChangePage(page) {
        this.params.page = page;
        this.getTableList();
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
    },
  }
</script>


<style lang="scss">
  #part_four {
    span.el-input-number__decrease,span.el-input-number__increase {
      display: none;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_four.scss";

  @mixin part_four_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_four {
      > div {
        .container {
          @include part_four_img('ksszbj.png', 'theme1');
        }
        .success_work {
          position: absolute;
          right: 80px;
          bottom: 100px;
          width: 200px;
          height: 100px;
          @include part_four_img('tongguo.png','theme1');
          background-size: contain;
          opacity: 0;
        }
        .success_work_animation {
          opacity: 1;
          animation: go_big 1s;
          -webkit-animation: go_big 1s;
          -moz-animation: go_big 1s;
        }
      }
      .offer_container {
        @include part_four_img('remaituijian.jpg', 'theme1');
      }
      .labour_contract {
        @include part_four_img('hetongshu_di.png','theme1');
      }
      .logo {
        display: inline-block;
        width: 134px;
        height: 53px;
        margin-top: 10px;
        @include part_four_img('logo.png', 'theme1');
      }
      .bottom_page {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  @keyframes go_big {
    0% {
      transform: scale(5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
