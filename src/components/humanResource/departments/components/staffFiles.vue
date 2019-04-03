<template>
  <div id="staffFiles">
    <lj-dialog :visible="files_visible" :size="files_size" @close="files_visible = false;reviseInfo = false">
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
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                <b></b>
                <i></i>
              </p>
            </div>
          </div>
          <div class="flex filesMain">
            <div class="mainLeft">
              <p @click="filesInfo('info')" :class="{'hover': filesStatus === 'info'}">基本信息</p>
              <p @click="filesInfo('grow')" :class="{'hover': filesStatus === 'grow'}">成长轨迹</p>
            </div>
            <div class="justify-around mainRight scroll_bar" v-if="filesStatus === 'info'">
              <b @click="reviseInfo = !reviseInfo"></b>
              <el-form :model="staffDetail" ref="filesForm" :disabled="reviseInfo" label-width="120px" class="justify-around"
                       :class="[reviseInfo ? 'inputDisabled': 'focusBorder']" style="width: 100%">
                <div class="info borderNone">
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
                        <el-select v-model="staffDetail.position_level">
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
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <div class="flex changeChoose" style="margin-top: 10px">
                          <el-radio :label="0" v-model="staffDetail.gender">男</el-radio>
                          <el-radio :label="1" v-model="staffDetail.gender">女</el-radio>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="身份证">
                        <el-input v-model="staffDetail.id_num"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="年龄">
                        <el-input v-model="staffDetail.age"></el-input>
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
                    <el-col :span="6">
                      <el-form-item label="手机">
                        <el-input v-model="staffDetail.phone"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="在职状态">
                        <el-input v-model="staffDetail.work_status"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="毕业院校">
                        <el-input v-model="staffDetail.school"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="学历背景">
                        <el-select v-model="staffDetail.education">
                          <el-option :value="1" label="高中及以下"></el-option>
                          <el-option :value="2" label="大专"></el-option>
                          <el-option :value="3" label="本科"></el-option>
                          <el-option :value="4" label="本科及以上"></el-option>
                          <el-option :value="5" label="其他"></el-option>
                        </el-select>
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
                        <el-input v-if="staffDetail.household_register"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="通讯地址">-->

                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="出生日期">
                        <el-input v-model="staffDetail.birthday"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职时间">
                        <el-date-picker v-model="staffDetail.enroll" type="date" value-format="yyyy-MM-dd"></el-date-picker>
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
                      <el-form-item label="银行卡号">
                        <el-input v-model="staffDetail.bank_num"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户行">
                        <el-input v-model="staffDetail.account_bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="支行">
                        <el-input v-model="staffDetail.branch_bank"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户名">
                        <el-input v-model="staffDetail.account_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第一次签合同时间">
                        <el-date-picker v-model="staffDetail.agreement_first_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第一次合同到期时间">
                        <el-date-picker v-model="staffDetail.agreement_first_end_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="第二次签合同时间">
                        <el-date-picker v-model="staffDetail.agreement_second_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="介绍人">
                        <el-input v-model="staffDetail.recommender_name" @focus="staff_visible = true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="有无就业证">
                        <el-select v-model="staffDetail.employment_permit">
                          <el-option :value="0" label="有"></el-option>
                          <el-option :value="1" label="无"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="有无犯罪史">
                        <div class="flex changeChoose" style="margin-top: 10px">
                          <el-radio :label="0" v-model="staffDetail.criminal_history">有</el-radio>
                          <el-radio :label="1" v-model="staffDetail.criminal_history">无</el-radio>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">-->
                      <!--<el-form-item label="客户满意度">-->
                      <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="6">
                      <el-form-item label="email">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="英语等级">
                        <el-input v-model="staffDetail.english_level"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="婚育状况">
                        <div class="flex changeChoose" style="margin-top: 10px">
                          <el-radio :label="0" v-model="staffDetail.marital_status">未婚</el-radio>
                          <el-radio :label="1" v-model="staffDetail.marital_status">已婚</el-radio>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="社保卡号">
                        <el-input v-model="staffDetail.society_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职渠道">
                        <!--<el-input v-model="staffDetail.dismiss_time.entry_type"></el-input>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="紧急联系人电话">
                        <el-input v-model="staffDetail.emergency_call"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="离职时间">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="离职时原因">
                        <!--<el-input v-model="staffDetail.dismiss_time.entry_mess"></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <el-form-item label="入职材料">
                        <el-checkbox-group class="flex changeChoose" style="margin-top: 10px;" v-model="staffDetail.entry_materials">
                          <el-checkbox :label="1">意外险</el-checkbox>
                          <el-checkbox :label="2">五险</el-checkbox>
                          <el-checkbox :label="3">身份证复印件</el-checkbox>
                          <el-checkbox :label="4">银行卡照片</el-checkbox>
                          <el-checkbox :label="5">劳动合同</el-checkbox>
                          <el-checkbox :label="6">应聘表</el-checkbox>
                          <el-checkbox :label="6">学籍验证报告</el-checkbox>
                          <el-checkbox :label="7">上家单位离职证明</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
            <div class="items-center mainRight" v-if="filesStatus === 'grow'">
              <div class="grow" :style="{'backgroundPosition': num[index]}" v-for="(item,index) in dates">
                <div :class="[(index%2 === 0) ? 'tops' :  'bottoms']">
                  <p><i></i>【{{item.created_at}} {{item.zh}}】<i></i></p>
                  <span><i></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer" v-if="!reviseInfo">
          <el-button type="danger" size="small" @click="handleSubmitUpdate">确定</el-button>
        </div>
      </div>
    </lj-dialog>

    <DepartOrgan :module="depart_visible" @close="handleGetDepart"></DepartOrgan>

    <PostOrgan :module="post_visible" @close="handleGetPost"></PostOrgan>

    <StaffOrgan :module="staff_visible" @close="handleGetStaff"></StaffOrgan>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue';
  import DepartOrgan from '../../../common/departOrgan.vue';
  import PostOrgan from '../../../common/postOrgan.vue';
  import StaffOrgan from '../../../common/staffOrgan.vue';

  export default {
         name: "staff-files",
    components: {ljDialog,DepartOrgan,PostOrgan,StaffOrgan},
    props: ['module','detailInfo'],
    data() {
      return {
        staff_visible: false,
        depart_visible: false,
        post_visible: false,

        staffDetail: {
          id: '',
          national: '',
          name: '',
          id_num: '',
          phone: '',

          position_id: [], //岗位id
          position_name: '', //岗位名称
          org_id: [], //部门id
          org_name: '', //部门名称

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
          dismiss_time: {
            entry_mess: '',
            entry_type: '',
          },
          agreement_first_time: '',
          agreement_first_end_time: '',
          agreement_second_time: '',
          emergency_call: '',
          account_name: '',
          branch_bank: '',
          account_bank: '',
          city: '',
          criminal_history: '',
          household_register: '',
          employment_permit: '',
          recommender: '',
          recommender_name: '',
          marital_status: '',
          entry_materials: '',
        }, //员工详情
        currentStaffInfo: '',

        reviseInfo: true,
        files_visible: false,
        files_size: {},
        filesStatus: 'info',
        dates: [],
      }
    },
    mounted() {},
    watch: {
      module(val) {
        this.files_visible = val;
        this.files_size = {
          width: '1600px',
          height: '830px',
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
          for (var key in this.staffDetail) {
            this.staffDetail[key] = key in val ? val[key] : val.staff && key in val.staff ? val.staff[key] : '';
          }
          if (val.position && val.position.length > 0) {
            this.staffDetail.position_id = [];
            for (let item of val.position) {
              this.staffDetail.position_id.push(item.id);
              this.staffDetail.position_name += item.name + ',';
            }
            this.staffDetail.position_name = this.staffDetail.position_name.substring(0,this.staffDetail.position_name.length - 1);
          }
          if (val.org && val.org.length > 0) {
            this.staffDetail.org_id = [];
            for (let item of val.org) {
              this.staffDetail.org_id.push(item.id);
              this.staffDetail.org_name += item.name + ',';
            }
            this.staffDetail.org_name = this.staffDetail.org_name.substring(0,this.staffDetail.org_name.length - 1);
          }
          if (this.staffDetail.birthday) {
            this.staffDetail.age = Math.ceil((new Date() - new Date(this.staffDetail.birthday)) / 1000 / 60 / 60 / 24 / 365);
            console.log(this.staffDetail.age);
          }
        },
        deep: true
      }
    },
    computed: {
      num() {
        let aaa = 100 / (this.dates.length - 1), bbb = ['0 0'], ccc = 0;
        for (let i = 0, l = this.dates.length - 1; i < l; i++) {
          let ddd = '';
          ccc = ccc + aaa;
          ddd = ccc + '% 0';
          bbb.push(ddd);
        }
        return bbb
      }
    },
    methods: {
      handleSubmitUpdate() {
        this.$http.put(`staff/user/${this.currentStaffInfo.id}`,{
          type: 'update',
          ...this.staffDetail
        }).then(res => {
          console.log(res);
          if (res.code === '20030') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.reviseInfo = false;
            this.files_visible = false;
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleGetStaff(id,name) {
        if (id !== 'close') {
          this.staffDetail.recommender_name = name;
          this.staffDetail.recommender = id;
        }
        this.staff_visible = false;
      },
      handleGetPost(id,name) {
        if (id !== 'close') {
          this.staffDetail.position_name = name;
          this.staffDetail.position_id = id;
        }
        this.post_visible = false;
      },
      handleGetDepart(id,name) {
        if (id !== 'close') {
          this.staffDetail.org_name = name;
          this.staffDetail.org_id = id;
        }
        this.depart_visible = false;
      },
      filesInfo(val) {
        this.filesStatus = val;
        if (val === 'grow') {
          this.getStaffGrowInfo(this.currentStaffInfo.id);
        }
      },
      getStaffGrowInfo(id) {
        this.$http.get(`staff/user/${id}/growth`,{
          page:1,
          limit:999
        }).then(res => {
          console.log(res);
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
                background: url("../../../../assets/image/humanResource/departments/components/theme1/liuxian.png") no-repeat scroll;
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
