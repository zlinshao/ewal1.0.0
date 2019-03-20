<template>
  <div id="part_four">
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
                <el-button size="mini" type="warning" plain @click="handleOpenEdit(scope.row)">{{ entry_feedback[scope.row.entry_feedback]}}</el-button>
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
        @close="ok_send_offer = false"
      >
        <div class="dialog_container">
          <div class="dialog_header"></div>
          <div class="dialog_main borderNone">
            <div class="changeChoose showPadding">
              <div class="flex" style="margin-bottom: 20px">
                <el-radio v-model="send_choose" :label="1">同时抄送密件给</el-radio>
                <div class="items-center iconInput">
                  <el-input v-model="send_man" size="mini" style="width: 100px" @focus="modules = true;send_choose = 1" clearable></el-input>
                  <p class="icons user"></p>
                </div>
              </div>
              <el-radio v-model="send_choose" :label="2" @change="send_man = '';send_id = ''">直接发送</el-radio>
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkSendOffer">确定</el-button>
            <el-button type="info" size="small" @click="ok_send_offer = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <StaffOrgan :module="modules" @close="handleGetStaffInfo"></StaffOrgan>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';
  import StaffOrgan from '../../../../common/staffOrgan.vue';

  export default {
    name: "index",
    components: {LjDialog,StaffOrgan},
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
        send_id: '',
        send_man: '',
        modules: false,

        //录入offer信息
        write_offer_visible: false
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
      handleGetStaffInfo(id,name) {
        this.send_id = id;
        this.send_man = name;
        this.modules = false;
      },
      handleOkSendOffer() {
        this.$http.get(`recruitment/interviewer_process/send_offer/${this.currentInfo.id}`).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      },
      handleSendOffer(row) {
        this.currentInfo = row;
        // this.ok_send_offer = true;
        const href = this.$router.resolve({path: '/offerDetail', query: row});
        window.open(href, '_blank', 'width=1920,height=1080');
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
              this.$LjNotify('warning',{
                title: '警告',
                message: '未获取到信息'
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } else if (this.edit_result_form.entry_feedback === 2) {
          this.$http.put(`recruitment/interviewer_process/entry_feedback/${this.currentRow.id}`,{
            params: {
              entry_feedback: this.edit_result_form.entry_feedback,
              unentry_reason: this.edit_result_form.unentry_reason
            }
          }).then(res => {
            if (res.code === '20000') {
              this.$LjNotify('success',{
                title: '成功',
                message: '编辑成功'
              })
            }else {
              this.$LjNotify('warning',{
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

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_four {
      > div {
        .container {
          @include part_three_img('ksszbj.png', 'theme1');
        }
      }
    }
  }
</style>
