<template>
  <div id='contract_detail'>
    <lj-dialog :visible="visible" :size="{width: 1250 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container" v-if='visible && contractDetail'>
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>{{contractDetail.contract_number}}</span>
            <span style='margin-left:20px;margin-right:60px;'>{{moduleData.type}}</span>
            <el-button id='active-danger' class='el-button-active' size='mini' @click='handleRewrite' style='margin-left:10px'
              v-if='showFooter'>作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main contract_detail">
          <!---房屋信息-->
          <p class='main_tit noMarginTop'>房屋信息</p>
          <div class="common_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-if='chooseTab == 1'>
                  <el-form-item label="物业地址">
                    <span v-if='contractDetail.house_extension && contractDetail.house_extension.community'>{{contractDetail.house_extension.community.name
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span v-if='contractDetail.house_extension && contractDetail.house_extension.community'>{{contractDetail.house_extension.community.detailed_address
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span v-if='contractDetail.house_extension &&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.water_card_number
                      || '--' }}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span v-if='contractDetail.house_extension &&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.electricity_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span v-if='contractDetail.house_extension &&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.gas_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!--合同信息-->
          <p class='main_tit'>合同信息</p>
          <div class="common_info">
            <el-form label-width="128px">
              <el-row :gutter="8">
                <el-col :span="8">
                  <el-form-item label="合同类型">
                    <span>{{ contractDetail.is_e_contract==1?"电子合同":"纸质合同"}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span v-if='contractDetail.sign_month'>{{ contractDetail.sign_month.moth_to_year || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span>{{ contractDetail.sign_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if='chooseTab == 1'>
                  <el-form-item label="空置期">
                    <span>{{ contractDetail.ready_days || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同开始时间">
                    <span>{{ contractDetail.start_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同结束时间">
                    <span>{{ contractDetail.end_at || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金">
                    <span>{{ contractDetail.deposit_payed || '--' + '元'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <span>{{ contractDetail.mortgage_price || '--' + '元'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <p v-if="contractDetail.month_price && contractDetail.month_price.length > 0">
                      <span v-for="(item,index) in contractDetail.month_price" :key="index"> {{ item.price }}元 {{
                        item.period }}个月</span>
                    </p>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetail.pay_way || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.first_pay_at && chooseTab === 1 ">
                  <el-form-item label="第一次打房租日期">
                    <span>{{ contractDetail.first_pay_at || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.second_pay_at && chooseTab === 1">
                  <el-form-item label="第二次打房租日期">
                    <span>{{ contractDetail.second_pay_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="房东承担费用">
                    <span v-for='pay in contractDetail.houserPay'>{{payArr[pay-1] || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="租客承担费用" v-if='chooseTab == 2'>
                    <span v-for='pay in contractDetail.non_landlord_fee'>{{payArr[pay-1] + '/'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="可否装修">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.can_decorate== 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="可否添加物品">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.can_add_goods == 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否渠道">
                    <span>{{contractDetail.is_agency && contractDetail.is_agency === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道名称">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_name || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道费">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_price_now
                      ?contractDetail.agency_info.agency_price_now + '元':'--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道人">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_user_name || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道电话">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_phone || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资料补齐时间">
                    <span>{{ contractDetail.dataTime || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注">
                    <span>{{ contractDetail.remark || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.remark_terms || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <span>{{ contractDetail.sign_user || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <span>{{ contractDetail.sign_org || '--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="chooseTab === 1">签约人及产权人信息</p>
          <p class='main_tit' v-if="chooseTab === 2">签约人信息</p>
          <div class="common_info">
            <el-form label-width="120px" v-if=' contractDetail.customer_info'>
              <el-row :gutter="10" v-for='(item,index) in  contractDetail.customer_info' :key='index'>
                <el-col :span="1">
                  <span class='person_tit'>签约人</span>
                  <!-- <el-form-item label="签约人" class='person_tit'></el-form-item> -->
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{item.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{item.phone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{item.idcard}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-if="chooseTab === 1">
                <el-col :span="1">
                  <span class='person_tit'>产权人</span>
                  <!-- <el-form-item label="产权人" class='person_tit'></el-form-item> -->
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form label-width="120px" v-else>
              <el-row :gutter="10">
                <el-col :span="1">
                  <span class='person_tit'>{{chooseTab === 1?'产权人':'签约人'}}</span>
                </el-col>
                <el-col :span="7" style='font-size:14px;'>
                  <span>暂无资料</span>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="chooseTab === 1">收款账号</p>
          <div class="common_info" v-if="chooseTab === 1">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人">
                    <span>{{contractDetail.pay_account_info && contractDetail.pay_account_info.name
                      ?contractDetail.pay_account_info.name : '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.relationship
                      ?contractDetail.pay_account_info.relationship :'--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.account
                      ?contractDetail.pay_account_info.account:'--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.bank ?
                      contractDetail.pay_account_info.bank :'--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行">
                    <span>{{contractDetail.pay_account_info && contractDetail.pay_account_info.subbranch ?
                      contractDetail.pay_account_info.subbranch :'--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit'>附件信息</p>
          <div class="common_info">
            <el-checkbox-group v-model='rewrite_data' :disabled='disabled'>
              <el-checkbox name="type" v-for="(tit,key) in polishing_data[chooseTab-1]" :key='tit' :label='key'
                :disabled="chooseTab == 3">
                <template>
                  <div class='el_check_box'>
                    <div class='main_tit'> {{tit}}</div>
                    <div style="width: 90%;text-align: left" v-if='contractDetail.album_temp && contractDetail.album_temp[key]'>
                      <lj-upload size='40' v-model="contractDetail.album_temp[key]" disabled=true :download='false'></lj-upload>
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <p class='main_tit' v-if='showRelated && contractDetail.related_contract && contractDetail.related_contract.length > 0'>相关合同</p>
          <div class="common_info" v-if="showRelated && contractDetail.related_contract && contractDetail.related_contract.length > 0">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-for="(item,index) in contractDetail.related_contract" :key="index">
                  <el-form-item :label="contractLabel(item)">
                    <span>{{ item.contract_number +'-' + (item.is_invalid == 0 ? "合同正常" : "合同作废")}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if='showData'>资料补齐记录</p>
          <div class='data_info' v-if='showData'>
            <div class="flex-center">
              <div class="flex_center_tit">发送对象</div>
              <div class="flex_center_content flex_center_content1 borderNone">
                <el-input @focus="organSearch" readonly v-model="dataRecord.send_name" :placeholder="contractDetail.sign_user || contractDetail.org_leader">
                </el-input>
              </div>
            </div>

            <div class="flex-center flex-center2">
              <div class="flex_center_tit">补齐内容</div>
              <div class="flex_center_content flex_center_content2">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请选择补齐内容" v-model="dataRecord.content"
                  disabled style='background:transparent'>
                </el-input>
                <div class='buttons'>
                  <p class='buttons-left' @click='handlePostRecord'>
                    <i class='icon'></i>
                    <span>发送</span>
                  </p>
                  <el-button id='active-primary' @click='handleGetRecord'>补齐记录</el-button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="dialog_footer" v-if='showFooter'>
          <el-button :id="item.action?'active-success':'active-danger'" class='el-button-active' size="small" :key="item.route" v-for="item in operate_list" @click="handleContract(item.action)">{{item.title}}</el-button>
          <!--<el-button id='active-success' class='el-button-active' size="small" @click="handleContract(true)" v-if='chooseTab == 1 || chooseTab == 2'>通过</el-button>
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleContract(false)" v-if='chooseTab == 3'>驳回</el-button>-->
        </div>
      </div>
    </lj-dialog>

    <!--资料不全 开单人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--资料补齐记录-->
    <lj-dialog :visible.sync="dataRecord_visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseRecord">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>资料补齐记录</h3>
        </div>
        <div class="dialog_main dataRecord_dialog_main" v-if='dataRecord_visible'>
          <div v-for='(item,index) in contractDetail.checkout_remark' class='dataRecord_cell' :key='index' v-if='dataRecord_visible && contractDetail.checkout_remark'>
            <div class='detail_dialog_left'>
              <p>{{item.create.name||'无'}}</p>
              <p>{{item.created_at}}</p>
            </div>
            <div class="detail_dialog_center">
              <div class='circle'></div>
            </div>
            <div class='detail_dialog_right'>
              <p :title="item.remark">{{item.remark}}</p>
              <p>发送对象:{{item.receive && item.receive.name || '--'}}</p>
            </div>
          </div>
          <div v-else>暂无记录</div>
        </div>
      </div>
    </lj-dialog>

    <!-- 作废重签 -->
    <InvalidDialog :visible='rewrite_visible' :moduleData='rewrite_info' @close='handleCancelRewrite' />
  </div>
</template>


<script>
import StaffOrgan from '../../common/staffOrgan.vue';
import InvalidDialog from '../components/invalid-dialog'
export default {
  props: ['visible',
    'moduleData',
    'chooseTab',  // 合同类型
    'showData',  // 补齐记录
    'showFooter',  // 底部操作
    'showRelated', // 显示合同相关信息
    'disabled'], // 是否可选
  components: {
    StaffOrgan,
    InvalidDialog,
  },
  data () {
    return {
      contractDetail: null,
      //附件
      polishing_data: [
        {
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
        {
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
      // 合同作废重签
      rewrite_visible: false,
      rewrite_data: [],
      rewrite_note: '',
      rewrite_info: {
        contract_id: null,
        contract_type: null,
        album: []
      },
      staffModule: false,//显示人员选择
      organData: {
        num: ''
      },
      //资料补齐记录
      dataRecord_visible: false,
      dataRecord: {
        send_name: '',
        send_id: [],
        content: ''
      },
      complete: {
        task_id: '',
        key_name: ''
      }, // 发送补齐信息
      operate_list:[],//底部操作按钮
      check_data:null,//资料审核data


      payArr: ['水费', '电费', '燃气费', '物业费', '网络费', '其他'],
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    rewrite_data (newVal) {
      this.dataRecord.content = ''
      let data = this.polishing_data[this.chooseTab - 1]
      newVal.forEach((item, index) => {
        if (index != 0) {
          this.dataRecord.content += ','
        }
        this.dataRecord.content += data[item]
      })
      this.dataRecord.content += '缺失;'
    },
    moduleData: {
      handler (val) {
        if (val) this.getDetailContract()
      },
      deeper: true
    }
  },
  methods: {
    getDetailContract () {
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}/${this.moduleData.contract_id}`).then(res => {
        if (res.code === 200) {
          let data = res.data
          if (data.house_extension) {
            if (data.house_extension.community && data.house_extension.community != 'null') {
              data.house_extension.community = JSON.parse(data.house_extension.community)
            } else {
              data.house_extension.community = null
            }

            if (data.house_extension.cards && data.house_extension.cards != 'null') {
              data.house_extension.cards = JSON.parse(data.house_extension.cards)
            } else {
              data.house_extension.cards = null
            }
          }

          data.album_temp = JSON.parse(data.album_temp)
          this.contractDetail = data
          if (this.showFooter) {
            this.$emit('setCookie')
            this.getProcess_id(res.data.process_instance_id)
          }
        }
      })
    },
    setProcess_id (res) {


      this.$emit('setCookie')
    },
    getProcess_id (process_id) {
      if(!process_id) return;
      this.$http.get(this.market_server + `v1.0/market/contract/kf-check-button?process_id=${process_id}`).then(res => {
        if (res.code === 200) {
          let data = res.data;
          //if(data.buttons&&data.buttons.length>0) {
          if(data.buttons) {
            this.operate_list = data.buttons?.outcomeOptions;
            this.check_data = data;
          }else {
            this.operate_list = [];
          }
          this.complete.task_id = data.taskId
          this.complete.key_name = data.buttons?.variableName || 'kf_approved'

        }
      })
    },
    getCookie (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    setCookie (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    handleCloseDetail () {
      this.$emit('close', false)
    },
    //相关合同label
    contractLabel (item) {
      return item.type === 1 ? `新收合同(${item.is_invalid === 0 ? '正常' : '作废'})` : `续收合同(${item.is_invalid === 0 ? '正常' : '作废'})`;
    },
    //选择人员
    organSearch () {
      this.staffModule = true
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        this.dataRecord.send_name = names
        this.dataRecord.send_id = arr
      }
    },
    // 发送补齐记录
    handlePostRecord () {
      if (!this.dataRecord.content) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '补齐内容未选择'
        });
        return
      }
      let current = {
        contract_type: this.chooseTab,
        contract_id: this.moduleData.contract_id,
        house_name: this.moduleData.house_name,
        contract_number: this.moduleData.contract_number,
        remark: this.dataRecord.content,
        receive_ids: this.dataRecord.receive_ids || this.contractDetail.sign_user_id || contractDetail.org_leader
      }

      this.$http.post(this.market_server + `v1.0/market/contract/send-complete-data`, current).then(res => {

        let warning = null
        if (res.code == 200) {
          warning = '发送成功'
          this.rewrite_data = []
        } else {
          warning = '发送失败'
        }
        this.$LjNotify('success', {
          title: '提示',
          message: warning
        });

      })

    },
    //资料补齐
    handleGetRecord () {
      this.dataRecord_visible = true;
    },
    // 合同通过 驳回
    handleContract (isTrue) {
     /* let params = {
        task_id: this.check_data.taskId,
        data: {
          [this.check_data.buttons.variableName]:isTrue,
        }
      }*/
      let params = {
        task_id: this.complete.task_id,
        data: {
          [this.complete.key_name]:isTrue,
        }
      };
      //params.data[this.complete.key_name] = isTrue
      this.$http.post(this.market_server + `v1.0/market/contract/complete`, params).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCloseDetail()
        }else {
          this.$LjNotify('error', {
            title: '错误',
            message: res.message
          });
        }
      })
    },
    //资料补齐
    handleGetRecord () {
      this.dataRecord_visible = true;
    },
    handleCloseRecord () {
      this.dataRecord_visible = false;
    },
    // 合同作废
    handleRewrite () {
      // this.contract_detail_visible = false
      this.rewrite_info = {
        contract_id: this.contractDetail.id,
        contract_type: this.contractDetail.type,
        album: this.contractDetail.album
      }
      this.rewrite_visible = true;
    },
    // 取消合同作废
    handleCancelRewrite () {
      this.rewrite_visible = false;
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";

@import "../../../assets/scss/customService/components/contract_detail";

@mixin confirmImg($m, $n) {
  $url: "../../../assets/image/customService/dataAudit/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  #contract_detail {
    .header_right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .dialog_footer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialog_main {
      .main_tit {
        text-align: left;
        font-size: 14px;
        margin: 20px 0 8px;
      }
      .noMarginTop {
        margin-top: 0;
      }
      .common_info {
        padding: 10px 20px;
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            font-size: 14px;
            line-height: 30px;
            white-space: nowrap;
          }
          .el-form-item__content {
            font-size: 14px;
            text-align: left;
            width: 230px;
            height: 36px;
            line-height: 30px;
            overflow-x: scroll;
            @include scroll;
            span {
              white-space: nowrap;
            }
            i {
              font-style: normal;
            }
          }
        }
        .person_tit {
          width: 100px;
          display: inline-block;
          font-size: 14px;
          line-height: 30px;
          height: 30px;
        }
        .el-col-7 {
          .el-form-item__content {
            width: 190px;
          }
        }
        .person_tit {
          .el-form-item__label {
            text-align: left;
            white-space: nowrap;
          }
        }
        .flex-center {
          margin-bottom: 20px;
          .flex_center_tit {
            width: 10%;
            text-align: right;
            padding-right: 15px;
          }
          .flex_center_content {
            width: 90%;
            height: 60px;
            text-align: left;
            img {
              width: 60px;
              height: 60px;
              margin-right: 15px;
            }
          }
        }
      }
      .collection_info {
        position: relative;
        .collection_info_warning {
          font-size: 14px;
          position: absolute;
          bottom: 10px;
          right: 30px;
        }
      }
      .data_info {
        .flex-center {
          @include flex("justify-start");
          margin-bottom: 20px;
          .flex_center_tit {
            font-size: 14px;
            margin-right: 30px;
          }
          .flex_center_content1 {
            width: 260px;
            height: 40px;
          }
          .flex_center_content2 {
            flex: 1;
            height: 135px;
          }
        }
        .flex-center2 {
          @include flex("items-start");
          position: relative;
          .flex_center_tit {
            padding-top: 10px;
          }
          .el-textarea__inner {
            border: none;
            @include scroll;
          }
          .buttons {
            width: 180px;
            position: absolute;
            bottom: 30px;
            right: 40px;
            @include flex("justify-bet");
            .buttons-left {
              @include flex("items-center");
              .icon {
                display: inline-block;
                width: 14px;
                height: 14px;
              }
              span {
                font-size: 14px;
                margin-left: 6px;
              }
            }
          }
        }
      }
    }
    .el_check_box {
      min-height: 80px;
      @include flex("justify-start");
      @include flex("items-center");
      .main_tit {
        min-width: 80px;
        margin: 0 10px 0 0;
      }
    }
  }
}
#theme_name.theme1 {
  #contract_detail {
    .dialog_main {
      .common_info {
        background-color: #fff;
        .el-form-item {
          .el-form-item__label {
            color: #b0b0b0;
          }
          .el-form-item__content {
            color: #686874;
          }
        }
        .person_tit {
          color: #b0b0b0;
        }
        .main_tit {
          color: #686874;
        }
        .collection_info_warning {
          color: #cf2e33;
        }
      }
      .data_info {
        .flex_center_tit {
          text-align: left;
        }
        .flex_center_content {
          background-color: #fff;
        }
        .flex-center2 {
          .buttons {
            .buttons-left {
              cursor: pointer;
              .icon {
                @include confirmImg("fasong.png", "theme1");
              }
              span {
                color: #cf2e33;
              }
            }
          }
        }
      }
    }
  }
}
</style>
