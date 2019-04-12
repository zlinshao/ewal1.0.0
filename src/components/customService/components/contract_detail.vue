<template>
  <div>
    <lj-dialog :visible="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>
              {{ contractDetail.contract_number }}
            </span>
            <el-button type="danger" size="mini" @click="handleRewrite" style="margin-left: 10px">作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main">
          <p style="text-align: left">房屋地址</p>
          <div class="base_house_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span>{{ contractDetail.sign_at }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <div v-if="contractDetail.month_price && contractDetail.month_price.length > 0">
                      <p v-for="(item,key) in contractDetail.month_price" :key="key">
                        {{ item.price }}元 {{ item.period }}个月
                      </p>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span>{{ contractDetail.sign_month && contractDetail.sign_month.moth_to_year }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金(元)">
                    <span>{{ contractDetail.deposit_payed || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <span>{{ contractDetail.mortgage_price || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetail.pay_way }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="打房租日期">
                    <!--收有 租没-->
                    <span v-if="contractDetail.first_pay_at ">第一次：{{ contractDetail.first_pay_at || '/' }}</span><br>
                    <span v-if="contractDetail.second_pay_at">第二次：{{ contractDetail.second_pay_at || '/' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="空置期">
                    <!--收有 租没-->
                    <span>{{ contractDetail.ready_days || '/'}}</span>
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
                    <span>{{ contractDetail.is_agency && contractDetail.is_agency === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道名称">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道费">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_price_now || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道人">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_user_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道电话">
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_phone || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否公司合同">
                    <!--is_agency-->
                    <span>{{ contractDetail.is_corp && contractDetail.is_corp === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款">
                    <span>{{ contractDetail.remark_clause || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <!--sign_user-->
                    <span>{{ contractDetail.sign_user || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <!--sign_org-->
                    <span>{{ contractDetail.sign_org || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!-- <div class="type">{{ currentRow.type }}</div> -->
          </div>

          <p style="text-align: left">{{ chooseTab === 1 ? '收款账户' : '汇款账户'}}</p>
          <!--收 房东收款账户 pay_account_info  租 公司汇款账户money_table-->
          <div class="account_info" v-if="chooseTab === 1">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.account || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.subbranch || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.relationship || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中国银行">
                    <span>{{ contractDetail.pay_account_info && contractDetail.pay_account_info.bank || '/'}}</span>
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
                    <span>{{ contractDetail.customer_info && contractDetail.customer_info.name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.customer_info && contractDetail.customer_info.phone || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.customer_info && contractDetail.customer_info.idcard || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left" v-if="chooseTab === 1">附件信息</p>
          <!--收房 -->
          <div class="other_info" v-if="chooseTab === 1">
            <div style="text-align: right">
              <el-button type="danger" size="mini" @click="handleOpenPolishing">补齐资料</el-button>
            </div>
            <div v-if="contractDetail.album">
              <div class="flex-center" v-for="(item,index) in contractDetail.album" style="min-height: 80px">
                <div style="width: 10%;text-align: right;padding-right: 15px">{{ other_pictures[index] }}</div>
                <!-- <div style="width: 90%;text-align: left">
                <img v-for="tmp in item" :key="tmp.id" data-magnify="" data-caption="图片查看器" :data-src="tmp.uri" :src="tmp.uri"
                  style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
              </div> -->
              </div>
            </div>
          </div>

          <p style="text-align: left">相关合同</p>
          <div class="have_info" v-if="contractDetail.related_contract && contractDetail.related_contract.length > 0">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-for="(item,index) in contractDetail.related_contract" :key="index">
                  <el-form-item :label="contractLabel(item)">
                    <span>{{ item.contract_number }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div v-else>暂无</div>
        </div>
      </div>
    </lj-dialog>

    <!-- 补齐资料-->
    <FillingMaterial :data_polishing_visible='data_polishing_visible' :currentRow='currentRow' @closeFilling='data_polishing_visible=false' />

    <!--作废重签-->
    <ContractRewrite :rewrite_visible='rewrite_visible' :contractDetail='contractDetail' @closeRewrite='rewrite_visible=false' />

  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import FillingMaterial from './filling_material'
import ContractRewrite from './contract_rewrite'
export default {
  name: 'index',
  components: { LjDialog, FillingMaterial, ContractRewrite },
  props: ['contract_detail_visible', 'contractDetail', 'chooseTab', 'currentRow'],
  data () {
    return {
      data_polishing_visible: false, //补齐资料
      rewrite_visible: false // 作废
    }
  },
  methods: {
    handleCloseDetail () {
      this.$emit('closeDetail', false)
    },
    handleRewrite () { // 作废
      this.rewrite_visible = true
    },
    handleOpenPolishing () { //补齐资料
      this.data_polishing_visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  background-color: #fff;
}
</style>


