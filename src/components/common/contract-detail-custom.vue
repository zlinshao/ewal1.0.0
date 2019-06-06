<template>
  <div id="contractDetailCustomer">
     <!--合同详情-->
     <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>
              {{ contractDetailData.contract_number }}
            </span>
            <!-- <el-button type="danger" size="mini" @click="handleRewrite" style="margin-left: 10px">作废重签</el-button> -->
          </div>
        </div>
        <div class="dialog_main">
          <p style="text-align: left">房屋地址</p>
          <div class="base_house_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span>{{ contractDetailData.sign_at }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <div v-if="contractDetailData.month_price && contractDetailData.month_price.length > 0">
                      <p v-for="(item,key) in contractDetailData.month_price" :key="key">
                        {{ item.price }}元 {{ item.period }}个月
                      </p>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span>{{ contractDetailData.sign_month && contractDetailData.sign_month.moth_to_year }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金(元)">
                    <span>{{ contractDetailData.deposit_payed || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同开始时间">
                    <span>{{ contractDetailData.start_at || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同结束时间">
                    <span>{{ contractDetailData.end_at || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <!--mortgage_price-->
                    <span>{{ contractDetailData.mortgage_price || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetailData.pay_way }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="打房租日期">
                    <!--收有 租没-->
                    <!--"first_pay_at": "2017-12-25 00:00:00",//第一次打款日期-->
                    <!--"second_pay_at": "2018-03-25 00:00:00",//第二次打款日期-->
                    <span v-if="contractDetailData.first_pay_at ">第一次：{{ contractDetailData.first_pay_at || '/' }}</span><br>
                    <span v-if="contractDetailData.second_pay_at">第二次：{{ contractDetailData.second_pay_at || '/' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="空置期">
                    <!--收有 租没-->
                    <span>{{ contractDetailData.ready_days || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="房东承担费用">
                    <!--收有 租没-->
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="可否装修">
                    <!--收有 租没-->
                    <!--decorate_allow-->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否添加物品">

                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否渠道">
                    <span>{{ contractDetailData.is_agency && contractDetailData.is_agency === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetailData.is_agency && contractDetailData.is_agency === 1">
                  <el-form-item label="渠道名称">
                    <span>{{ contractDetailData.agency_info && contractDetailData.agency_info.agency_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetailData.is_agency && contractDetailData.is_agency === 1">
                  <el-form-item label="渠道费">
                    <span>{{ contractDetailData.agency_info && contractDetailData.agency_info.agency_price_now || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetailData.is_agency && contractDetailData.is_agency === 1">
                  <el-form-item label="渠道人">
                    <span>{{ contractDetailData.agency_info && contractDetailData.agency_info.agency_user_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetailData.is_agency && contractDetailData.is_agency === 1">
                  <el-form-item label="渠道电话">
                    <span>{{ contractDetailData.agency_info && contractDetailData.agency_info.agency_phone || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否公司合同">
                    <!--is_agency-->
                    <span>{{ contractDetailData.is_corp && contractDetailData.is_corp === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款">
                    <span>{{ contractDetailData.remark_clause || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <!--sign_user-->
                    <span>{{ contractDetailData.sign_user || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <!--sign_org-->
                    <span>{{ contractDetailData.sign_org || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="type">{{ currentRow.type }}</div>
          </div>

          <p style="text-align: left">{{ chooseTab === 1 ? '收款账户' : '汇款账户'}}</p>
          <!--收 房东收款账户 pay_account_info  租 公司汇款账户money_table-->
          <div class="account_info" v-if="chooseTab === 1">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人">
                    <span>{{ contractDetailData.pay_account_info && contractDetailData.pay_account_info.name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号">
                    <span>{{ contractDetailData.pay_account_info && contractDetailData.pay_account_info.account || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行">
                    <span>{{ contractDetailData.pay_account_info && contractDetailData.pay_account_info.subbranch || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系">
                    <span>{{ contractDetailData.pay_account_info && contractDetailData.pay_account_info.relationship || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中国银行">
                    <span>{{ contractDetailData.pay_account_info && contractDetailData.pay_account_info.bank || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left" v-if="chooseTab === 1">签约人及产权人信息</p>
          <!--收房 customer_info-->
          <div class="have_info" v-if="chooseTab === 1">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="姓名">
                    <span>{{ contractDetailData.customer_info && contractDetailData.customer_info.name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetailData.customer_info && contractDetailData.customer_info.phone || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetailData.customer_info && contractDetailData.customer_info.idcard || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left" v-if="chooseTab === 1">附件信息</p>
          <!--收房 -->
          <div class="other_info" v-if="chooseTab === 1">
            <div style="text-align: right">
              <!-- <el-button type="danger" size="mini" @click="handleOpenPolishing(currentRow)">补齐资料</el-button> -->
            </div>
            <div v-if="contractDetailData.album">
              <div class="flex-center" v-for="(item,index) in contractDetailData.album" style="min-height: 80px">
                <div style="width: 10%;text-align: right;padding-right: 15px">{{ other_pictures[index] }}</div>
                <div style="width: 90%;text-align: left">
                  <lj-upload v-model="contractDetailData.album[index]" :download="false" :disabled="true"></lj-upload>
                </div>
              </div>
            </div>
          </div>

          <p style="text-align: left">相关合同</p>
          <div>暂无数据...</div>
          <!--<div class="have_info" v-if="contractDetailData.related_contract && contractDetailData.related_contract.length > 0">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-for="(item,index) in contractDetailData.related_contract" :key="index">
                  <el-form-item :label="contractLabel(item)">
                    <span>{{ item.contract_number }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div v-else>暂无</div>-->
        </div>
      </div>

    <!--作废重签-->
    <lj-dialog :visible="rewrite_visible" :size="{width: 400 + 'px',height: 300 + 'px'}" @close="handleCancelRewrite">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>作废重签</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width="80px">
            <el-form-item label="备注">
              <el-input v-model="rewrite_note" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleSubmitRewrite">确定</el-button>
          <el-button type="info" size="mini" @click="handleCancelRewrite">取消</el-button>
        </div>
      </div>
    </lj-dialog>

     <!--资料补齐-->
    <lj-dialog :visible.sync="data_polishing_visible" :size="{width: 550 + 'px',height: 700 + 'px'}" @close="handleCancelPolishing">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>补齐资料</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="polishing_data_form" label-width="100px" class="showPadding">
            <el-form-item label="房产证号">
              <el-input v-model="polishing_data_form.property_number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="丘号">
              <el-input v-model="polishing_data_form.mound_number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="selfLabel(key)" v-for="(val,key) in polishing_data[chooseTab-1]" :key="key">
              <lj-upload size="50" class="upload-offset" :limit-easy="['video','image']" v-model="polishing_data_form.complete_content[key]"></lj-upload>
              <!-- <Upload :file="upload_file[idx]" @success="handleGetFile"></Upload>-->
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmPolishing">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelPolishing">取消</el-button>
        </div>
      </div>
    </lj-dialog>
   
     
   
  </div>
</template>

<script>
import LjDialog from '../common//lj-dialog';
import Upload from '../common/upload';

export default {
  name: "contractDetailCoustom",
  components: { LjDialog, Upload },
  props: ['contractDetailData','currentRow','chooseTab'],
  data () {
    return {
      //附件信息
      other_pictures: {
        identity_photo: '证件照片',
        bank_photo: '银行卡照片',
        photo: '合同照片',
        water_photo: '水表照片',
        electricity_photo: '电表照片',
        electricity_card_photo: '电卡照片',
        gas_photo: '气表照片',
        gas_card_photo: '气卡照片',
        checkin_photo: '交接单照片',
        auth_photo: '委托书照片',
        deposit_photo: '押金照片',
        promise: '承诺书照片',
        other_photo: '补充照片',
        checkout_photo: '退租交接单照片',
        checkout_settle_photo: '退租结算照片',
        water_card_photo: '水卡照片',
        property_photo: '物业照片',
        house_video:'房屋影像',
      },
      //作废重签
      rewrite_visible: false,
      rewrite_note: '',
      //合同详情
      contractDetail: '',
      //资料补齐
      upload_file: {},
      data_polishing_visible: false,
      polishing_params: {},
      polishing_data_form: {
        property_number:'',//房产证号
        mound_number:'',//丘号
        complete_content:{},//补齐资料
      },
      polishing_data: [
        {  //收房
          identity_photo: '证件照片',
          bank_photo: '银行卡照片',
          photo: '合同照片',
          water_photo: '水表照片',
          electricity_photo: '电表照片',
          gas_photo: '气表照片',
          checkin_photo: '交接单照片',
          auth_photo: '委托书照片',
          deposit_photo: '押金照片',
          promise: '承诺书照片',
          property_photo: '房产证照片',
          water_card_photo: '水卡照片',
          electricity_card_photo: '电卡照片',
          gas_card_photo: '气卡照片',
        },
        {  //租房
          checkin_photo: '交接单照片',
          certificate_photo: '截图凭证',
          deposit_photo: '押金收条',
          identity_photo: '证件照片',
          photo: '合同照片',
          bank_photo: '银行卡照片',
          water_photo: '水表照片',
          electricity_photo: '电表照片',
          gas_photo: '气表照片'
        }
      ],
      url: globalConfig.market_server,
      params: {
        page: 1,
        limit: 15,
        search:'',
        contract_type: 1,
        sign_date_min: '',
        sign_date_max: '',
        type: '',
        address: '',
        start_date_min: '',
        start_date_max: '',
        end_date_min: '',
        end_date_max: '',
        signer: '',
        org: '',
      },
    }
  },
  mounted () {
  },
  watch: {},
  computed: {},
  methods: {
    //相关合同label
    contractLabel (item) {
      return item.type === 1 ? `新收合同(${item.is_invalid === 0 ? '正常' : '作废'})` : `续收合同(${item.is_invalid === 0 ? '正常' : '作废'})`;
    },
   
    selfLabel (idx) {
      return this.polishing_data[this.chooseTab - 1][idx];
    },
  
    // // 打开作废重签对话框
    // handleRewrite () {
    //   this.rewrite_visible = true;
    // },
    // /*打开补齐资料对话框*/
    // handleOpenPolishing (row) {
    //   this.currentRow = row;
    //   this.$http.get(`${this.url}v1.0/market/contract/album/${this.chooseTab}/${this.currentRow.contract_id}`).then(res=> {
    //     if(res.code == 200) {
    //       //this.polishing_data_form.property_number = res.data.property_number||null;
    //       //this.polishing_data_form.mound_number = res.data.mound_number||null;
    //       //this.polishing_data_form.complete_content = res.data.mound_number||{};
    //       this.polishing_data_form = res.data;
    //       this.data_polishing_visible = true;
    //     }
    //   });


      /*if (row.needComplete && row.needComplete.length > 0) {
        let obj = {};
        let param = {};
        row.needComplete.map(item => {
          obj[item] = '';
          param[item] = {
            keyName: item,
            setFile: [],
            size: {
              width: '50px',
              height: '50px'
            }
          }
        });
        this.polishing_params = Object.assign({}, this.polishing_params, obj);
        this.upload_file = Object.assign({}, param);
        this.data_polishing_visible = true;
      } else {
        this.$LjNotify('info', {
          title: '提示',
          message: "暂无需要补齐的资料"
        });
        return false;
      }*/
    // },
  //    // 作废重签的确定按钮
  //   handleSubmitRewrite () {
  //     this.$http.post(this.url + `v1.0/market/contract/e-contract-resign/${this.contractDetail.contract_number}`, {
  //       note: this.rewrite_note
  //     }).then(res => {
  //       if (res.code === 200) {
  //         this.$LjNotify('success', {
  //           title: '成功',
  //           message: res.message
  //         });
  //         this.handleCancelRewrite();
  //       } else {
  //         this.$LjNotify('warning', {
  //           title: '失败',
  //           message: res.message
  //         })
  //       }
  //     })
  //   },
  //    // 作废重签的取消按钮   
  //   handleCancelRewrite () {
  //     this.rewrite_note = '';
  //     this.rewrite_visible = false;
  //   },

  //  // 补齐资料确定按钮
  //   handleConfirmPolishing () {
  //     if (!this.polishing_data_form.property_number) {
  //       this.$LjNotify('warning',{
  //         title: '警告',
  //         message: '请输入房产证号'
  //       });
  //       return false;
  //     }
  //     if (!this.polishing_data_form.mound_number) {
  //       this.$LjNotify('warning',{
  //         title: '警告',
  //         message: '请输入丘号'
  //       });
  //       return false;
  //     }
      /*for (let key in this.polishing_params) {
        if (!this.polishing_params[key] || this.polishing_params[key].length < 1) {
          this.$LjNotify('warning',{
            title: '警告',
            message: '请完善上传文件'
          });
          return false;
        }
      }*/
      /*let form = new FormData();
      form.append('complete_content', JSON.stringify(this.polishing_data_form.complete_content));
      form.append('property_number', this.polishing_data_form.property_number);
      form.append('mound_number', this.polishing_data_form.mound_number);*/

    //   this.$http.post(this.url + `v1.0/market/contract/${this.chooseTab}/${this.currentRow.contract_id}`, this.polishing_data_form).then(res => {
    //     if (res.code === 200) {
    //       this.$LjNotify('success', {
    //         title: '成功',
    //         message: res.message
    //       });
    //       this.handleCancelPolishing();
    //       //this.getContractList();
    //     } else {
    //       this.$LjNotify('warning', {
    //         title: '失败',
    //         message: res.message
    //       })
    //     }
    //   })
    // },
      //补齐资料的取消按钮
    // handleCancelPolishing () {
    //   this.polishing_data_form= {
    //       property_number:null,//房产证号
    //       mound_number:null,//丘号
    //       complete_content:{},//补齐资料
    //   };
    //   // this.currentRow = '';
    //   this.data_polishing_visible = false;
    // },

  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss//common/contract-detail-custom/contract-detail-custom.scss";
</style>
