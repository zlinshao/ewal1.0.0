<template>
  <div id="part_four" class="scroll_bar">
    <div class="flex-center">
      <div class="container flex-center">
        <div class="content">
          <el-table
            :data="tableList"
            highlight-current-row
            :row-class-name="tableChooseRow"
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
                <el-button size="mini" type="warning" plain @click="handleOpenEdit(scope.row)">{{
                  entry_feedback[scope.row.entry_feedback]}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="入职通知" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="handleSendOffer(scope.row)">发送offer</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        :size="{width: 700 + 'px',height: 600 + 'px'}"
        @close="handleCloseLookInfo"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>员工资料</h3>
          </div>
          <div class="dialog_main a_color">
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>姓名</a>
                <span>{{ interviewee_info.name }}</span>
              </el-col>
              <el-col :span="12">
                <a>性别</a>
                <span>{{ interviewee_info.gender_type }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>岗位</a>
                <span>{{ edit_result_form.position }}</span>
              </el-col>
              <el-col :span="12">
                <a>身份证</a>
                <span>{{ interviewee_info.ID_number}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>居住地址</a>
                <span>{{ interviewee_info.contact_address}}</span>
              </el-col>
              <el-col :span="12">
                <a>来源</a>
                <span>{{ edit_result_form.platform }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>入职时间</a>
                <span>{{ interviewee_info.arrive_time}}</span>
              </el-col>
              <el-col :span="12">
                <a>银行卡号</a>
                <span>{{ interviewee_info.bank_num || '无' }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>联系方式</a>
                <span>{{ interviewee_info.phone}}</span>
              </el-col>
              <el-col :span="12">
                <a>紧急联系人</a>
                <span>无</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>紧急联系人电话</a>
                <span>{{ interviewee_info.phone}}</span>
              </el-col>
              <el-col :span="12">
                <a>婚姻状态</a>
                <span>{{ interviewee_info.married_status_type }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>银行卡</a>
                <span class="pic"></span>
              </el-col>
              <el-col :span="12">
                <a>学籍验证报告</a>
                <span class="pic"></span>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <a>原单位离职证明</a>
                <span class="pic"></span>
              </el-col>
            </el-row>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger" @click="ok_interviewee_visible = true">入职</el-button>
            <el-button size="small" type="info" @click="handleCloseLookInfo">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--入职确定-->
      <lj-dialog
        :visible="ok_interviewee_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="ok_interviewee_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定入职刚员工吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkInterviewee">确定</el-button>
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
                  <el-input v-model="send_man" size="mini" style="width: 100px" @focus="modules = true;send_choose = 1"
                            clearable></el-input>
                  <p class="icons user"></p>
                </div>
              </div>
              <el-radio v-model="send_choose" :label="2" @change="send_man = '';send_id = ''">直接发送</el-radio>
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkSendOffer">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelSel">取消</el-button>
          </div>
        </div>
      </lj-dialog>

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
            <el-input v-model="offer_info_form.real_salary" style="width: 100px"></el-input>
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
            <el-input style="width: 80px" v-model="baoDao.year"></el-input>
            年
            <el-input v-model="baoDao.month" style="width: 80px"></el-input>
            月
            <el-input v-model="baoDao.day" style="width: 80px"></el-input>
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
            <el-input v-model="huiFu.year" style="width: 80px"></el-input>
            年
            <el-input v-model="huiFu.month" style="width: 80px"></el-input>
            月
            <el-input v-model="huiFu.day" style="width: 80px"></el-input>
            日
            <el-input v-model="huiFu.time" style="width: 80px"></el-input>
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

      <StaffOrgan :module="modules" @close="handleGetStaffInfo"></StaffOrgan>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';
  import StaffOrgan from '../../../../common/staffOrgan.vue';

  export default {
    name: "index",
    components: {LjDialog, StaffOrgan},
    data() {
      return {
        //表格信息
        tableList: [],
        chooseRowIds: [], //图标点击
        entry_feedback: ['未反馈', '同意入职', '拒绝入职'],

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
        send_choose: [],
        send_man: '',
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
          try_out_salary_percent: '',
          real_salary: '',
          registion_date: '',
          effect_date: '',
          contract_length: '',
          try_out_length: '',
          leader_id: '',
        }
      }
    },
    mounted() {
      this.getTableList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleCancelSel() {
        this.send_man = '';
        this.send_choose = '';
        this.offer_info_form.leader_id = '';
        this.ok_send_offer = false;
      },
      handleOpenSel() {
        var baoDao = this.baoDao;
        var huiFu = this.huiFu;
        this.offer_info_form.registion_date = `${baoDao.year}-${baoDao.month}-${baoDao.day}`;
        this.offer_info_form.effect_date = `${huiFu.year}-${huiFu.month}-${huiFu.day} ${huiFu.time}`;
        this.ok_send_offer = true;
      },
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
          try_out_salary_percent: '',
          real_salary: '',
          registion_date: '',
          effect_date: '',
          contract_length: '',
          try_out_length: '',
          leader_id: '',
        };
        this.write_offer_visible = false;
      },
      handleGetStaffInfo(id, name) {
        this.offer_info_form.leader_id = id;
        this.send_man = name;
        this.modules = false;
      },
      handleOkSendOffer() {
        this.$http.put(`recruitment/interviewer_process/send_offer/${this.currentInfo.interviewee_id}`,this.offer_info_form).then(res => {
          console.log(res);
          if (res.code === "2000") {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            })
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
          this.handleCancelSel();
          this.handleCloseOffer();
        }).catch(err => {
          console.log(err);
        })
      },
      handleSendOffer(row) {
        this.currentInfo = row;
        this.write_offer_visible = true;
      },
      handleOkInterviewee() {

      },
      handleCloseLookInfo() {
        this.interviewee_info = '';
        this.interviewee_info_visible = false;
      },
      handleOkEdit() {
        if (this.edit_result_form.entry_feedback === 1) {
          this.$http.get(`recruitment/interviewees/get_info/${this.currentRow.interviewee_id}`).then(res => {
            console.log(res);
            if (res.code === '20030') {
              this.interviewee_info = res.data;
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
        } else if (this.edit_result_form.entry_feedback === 2) {
          this.$http.put(`recruitment/interviewer_process/entry_feedback/${this.currentRow.id}`, {
            params: {
              entry_feedback: this.edit_result_form.entry_feedback,
              unentry_reason: this.edit_result_form.unentry_reason
            }
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
        }
      },
      handleOpenEdit(row) {
        this.currentRow = row;
        this.edit_result_form.position = row.position.name;
        this.edit_result_form.name = row.name;
        this.edit_result_form.platform = row.plaform_name;
        this.edit_result_form.info_status = row.info_status;
        this.edit_result_visible = true;
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
        this.$http.get('recruitment/interviewer_process/interviewedList').then(res => {
          if (res.code === '20000') {
            this.tableList = res.data.data;
          } else {
            this.tableList = [];
          }
        }).catch(err => {
          console.log(err);
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
    },
  }
</script>

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
      }
      .offer_container {
        @include part_four_img('remaituijian.jpg', 'theme1');
      }
      .logo {
        display: inline-block;
        width: 134px;
        height: 53px;
        margin-top: 10px;
        @include part_four_img('logo.png', 'theme1');
      }
    }
  }
</style>
