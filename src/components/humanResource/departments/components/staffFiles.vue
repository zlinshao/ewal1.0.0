<template>
  <div id="staffFiles">
    <lj-dialog :visible="files_visible" :size="files_size" @close="files_visible = false">
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
              <el-form :model="staffDetail" ref="filesForm" label-width="120px" :disabled="reviseInfo" class="justify-around"
                       :class="[reviseInfo ? 'inputDisabled': 'focusBorder']" style="width: 100%">
                <div class="info borderNone">
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="姓名">
                        <el-input v-model="staffDetail.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="身份证">
                        <el-input v-model="staffDetail.id_num"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="有无就业证">
                        <el-select>
                          <el-option :value="0" label="有"></el-option>
                          <el-option :value="1" label="无"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="在职状态">
                        <el-input v-model="staffDetail.work_status"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="手机">
                        <el-input v-model="staffDetail.phone"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="学历背景">
                        <el-select v-model="staffDetail.education">
                          <el-option :value="1" label="高中及以上"></el-option>
                          <el-option :value="2" label="大专及以上"></el-option>
                          <el-option :value="3" label="本科及以上"></el-option>
                          <el-option :value="4" label="其他"></el-option>
                        </el-select>
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
                      <el-form-item label="通讯地址">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="有无犯罪史">
                        <el-select>
                          <el-option :value="0">无</el-option>
                          <el-option :value="1">有</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="民族">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="户口属地">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="客户满意度">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="籍贯">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="email">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="出生日期">
                        <el-input v-model="staffDetail.birthday"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="英语等级">
                        <el-input v-model="staffDetail.english_level"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="政治面貌">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="婚育状况">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="社保卡号">
                        <el-input v-model="staffDetail.society_number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职时间">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="试用期时间">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="城市">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="转正时间">
                        <el-input v-model="staffDetail.forward_time"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="区域">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="实际转正">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="部门">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同开始时间">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="介绍人">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="工龄">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="年龄">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职渠道">
                        <el-input v-model="staffDetail.entry_way"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="试卷照片">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="合同照片">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="身份证照片">
                        <el-input v-model="staffDetail.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="银行卡照片">

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="毕业证照片">
                        <!--<el-input v-model="staffDetail."></el-input>-->
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <b @click="reviseInfo = !reviseInfo"></b>
            </div>
            <div class="items-center mainRight" v-if="filesStatus === 'grow'">
              <div class="grow" :style="{'backgroundPosition': num[index]}" v-for="(item,index) in dates">
                <div :class="[(index%2 === 0) ? 'tops' :  'bottoms']">
                  <p><i></i>{{item}}<i></i></p>
                  <span><i></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue';

  export default {
         name: "staff-files",
    components: {ljDialog},
    props: ['module','detailInfo'],
    data() {
      return {
        staffDetail: {
          name: '',
          id_num: '',
          phone: '',
          position: {
            id: '',
            name: ''
          },
          org: {
            id: '',
            name: ''
          },
          email: '',
          gender: '',
          education: '',
          position_level: '',
          forward_time: '',
          society_number: '',
          english_level: '',
          work_status: '',
          birthday: '',
          entry_way: ''
        }, //员工详情
        currentStaffInfo: '',

        reviseInfo: true,
        files_visible: false,
        files_size: {},
        filesStatus: 'info',
        dates: ['【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】'],
      }
    },
    mounted() {
    },
    activated() {
    },
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
            this.staffDetail[key] = val.staff[key];
          }
          this.staffDetail.name = val.name || '';
          this.staffDetail.email = val.email || '';
          this.staffDetail.gender = val.gender || '';
          this.staffDetail.phone = val.phone || '';
          console.log(val);
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
      filesInfo(val) {
        this.filesStatus = val;
        if (val === 'grow') {
          this.getStaffGrowInfo(this.currentStaffInfo.id);
        }
      },
      getStaffGrowInfo(id) {
        this.$http.get(`staff/user/growth/${id}`).then(res => {
          console.log(res);
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
