<template>
  <div id='dataAudit'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>资料审核</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain @click='changeTag_Status(1)' :class="[tag_status==1?'active-warning':'']">收房</el-button>
        <el-button type="primary" plain @click='changeTag_Status(2)' :class="[tag_status==2?'active-primary':'']">租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="handleGetDetail"
        header-row-class-name="tableHeader" style="width: 100%">
        <el-table-column align="center" label="签约时间">
          <template slot-scope="scope">
            <i class='table_icon' v-if='!cookieArr[scope.row.contract_id] || cookieArr[scope.row.contract_id] < scope.row.end_at'></i>
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column key="合同编号" align="center" prop="ContractNo" label="合同编号"></el-table-column>
        <el-table-column key="地址" align="center" prop="address" label="地址"></el-table-column>
        <el-table-column key="合同性质" align="center" prop="nature" label="合同性质"></el-table-column>
        <el-table-column key="所属公司" align="center" prop="compay" label="所属公司"></el-table-column>
        <el-table-column key="房东姓名" align="center" prop="houser_name" label="房东姓名"></el-table-column>
        <el-table-column key="收房价格" align="center" prop="price" label="收房价格"></el-table-column>
        <el-table-column key="付款方式" align="center" prop="payType" label="付款方式"></el-table-column>
        <el-table-column key="开单人" align="center" prop="openPer" label="开单人"></el-table-column>
        <el-table-column key="负责人" align="center" prop="handler" label="负责人"></el-table-column>
        <el-table-column key="部门" align="center" prop="department" label="部门"></el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="params.page" :page-size="params.limit"
            :total="tableDataCount" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--合同详情-->
    <lj-dialog :visible="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container" v-if='contract_detail_visible'>
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>{{contractDetail.contract_number}}</span>
            <el-button type='danger' size='mini' @click='handleRewrite' style='margin-left:10px'>作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main contract_detail">
          <!---房屋信息-->
          <p class='main_tit noMarginTop'>房屋信息</p>
          <div class="common_info">
            <el-form label-width="120px" v-if='contractDetail.house_extension'>
              <el-row :gutter="10">
                <el-col :span="8" v-if='tag_status == 1'>
                  <el-form-item label="物业地址">
                    <span v-if='contractDetail.house_extension.community'>{{JSON.parse(contractDetail.house_extension.community).name
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span v-if='contractDetail.house_extension.community'>{{JSON.parse(contractDetail.house_extension.community).detailed_address
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span v-if='contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).water_card_number
                      || '--' }}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span v-if='contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).electricity_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span v-if='contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).gas_card_number
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
            <el-form label-width="120px">
              <el-row :gutter="8">
                <el-col :span="8">
                  <el-form-item label="合同类型">
                    <span>{{ contractDetail.is_e_contract==1?"电子合同":"纸质合同"}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span v-if='contractDetail.sign_month'>{{ contractDetail.sign_month.moth_to_year || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span>{{ contractDetail.sign_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if='tag_status == 1'>
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
                    <span>{{ contractDetail.deposit_payed + '元'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <span>{{ contractDetail.mortgage_price + '元'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <span>{{ contractDetail.month_price[0].price + '元'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetail.pay_way || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.first_pay_at && tag_status === 1 ">
                  <el-form-item label="第一次打房租日期">
                    <span>{{ contractDetail.first_pay_at || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.second_pay_at && tag_status === 1">
                  <el-form-item label="第二次打房租日期">
                    <span>{{ contractDetail.second_pay_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="tag_status === 1">
                  <el-form-item label="房东承担费用">
                    <span v-for='pay in contractDetail.houserPay'>{{payArr[pay-1] || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="租客承担费用" v-if='tag_status == 2'>
                    <span v-for='pay in contractDetail.non_landlord_fee'>{{payArr[pay-1] + '/'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="tag_status === 1">
                  <el-form-item label="可否装修">
                    <span>{{ contractDetail.lease_collect.can_decorate== 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="tag_status === 1">
                  <el-form-item label="可否添加物品">
                    <span>{{ contractDetail.lease_collect.can_add_goods == 1?'是':'否' }}</span>
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
                    <span>{{ contractDetail.lease_collect.remark_terms || '--'}}</span>
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

          <p class='main_tit' v-if="tag_status === 1">签约人及产权人信息</p>
          <p class='main_tit' v-if="tag_status === 2">签约人信息</p>
          <div class="common_info">
            <el-form label-width="120px" v-if=' contractDetail.customer_info'>
              <el-row :gutter="10" v-for='item in contractDetail.customer_info' :key='item.phone' v-if='item'>
                <el-col :span="1">
                  <el-form-item label="签约人" class='person_tit'>
                  </el-form-item>
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
              <el-row :gutter="10" v-if="tag_status === 1">
                <el-col :span="1">
                  <el-form-item label="产权人" class='person_tit'></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="tag_status === 1">收款账号</p>
          <div class="common_info" v-if="tag_status === 1">
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
            <el-checkbox-group v-model='rewrite_data'>
              <el-checkbox name="type" v-for="(tit,key) in polishing_data[tag_status-1]" :key='key' :label='tit'>
                <template>
                  <div class='el_check_box'>
                    <div class='main_tit'> {{tit}}</div>
                    <div style="width: 90%;text-align: left">
                      <img v-for="tmp in contractDetail.album[key]" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <p class='main_tit'>资料不齐记录</p>
          <div class='data_info'>
            <div class="flex-center">
              <div class="flex_center_tit">发送对象</div>
              <div class="flex_center_content flex_center_content1 borderNone">
                <el-input @focus="organSearch" readonly v-model="postman" :placeholder="contractDetail.org_leader + ',' + contractDetail.sign_user"></el-input>
              </div>
            </div>

            <div class="flex-center flex-center2">
              <div class="flex_center_tit">不齐内容</div>
              <div class="flex_center_content flex_center_content2">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="postContent">
                </el-input>
                <div class='buttons'>
                  <p class='buttons_left'>
                    <i class='icon'></i>
                    <span>发送</span>
                  </p>
                  <el-button type="primary" plain @click='handleGetRecord'>不良记录</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog_footer">
          <el-button type="success" size="small" @click="handleContractPass" v-if='tag_status == 1 || tag_status == 2'>通过</el-button>
          <el-button type="warning" size="small" @click="handleContractRejected" v-if='tag_status == 3'>驳回</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--资料不全 开单人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--资料不齐记录-->
    <lj-dialog :visible="dataRecord_visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseRecord">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>资料不齐记录</h3>
        </div>
        <div class="dialog_main dataRecord_dialog_main">
          <div v-for='i in  4' class='dataRecord_cell'>
            <div class='detail_dialog_left'>
              <p>黄海</p>
              <p>2019.1.16</p>
            </div>
            <div class="detail_dialog_center">
              <div class='circle'></div>
            </div>
            <div class='detail_dialog_right'>
              <p>交接单不齐</p>
              <p>发送对象:野原新之助</p>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 作废重签 -->
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

    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import StaffOrgan from '../../common/staffOrgan.vue'
import MenuList from '../../common/menuList.vue';
import LjDialog from '../../common/lj-dialog.vue';
import { dataAuditSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';

export default {
  name: 'index',
  components: {
    SearchHigh,
    StaffOrgan,
    MenuList,
    LjDialog
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      selects: [
        {
          id: 1,
          title: '待审核'
        },
        {
          id: 2,
          title: '跟进中'
        },
        {
          id: 3,
          title: '已完成'
        }
      ],
      chooseTab: 1,
      tag_status: 1,
      showSearch: false,
      searchData: {},
      showData: {
        createTime: '签约时间',
        ContractNo: '合同编号',
        address: '地址',
        nature: '合同性质',
        compay: '所属公司',
        houser_name: '房东姓名',
        price: '收房价格',
        payType: '付款方式',
        openPer: '开单人',
        handler: '负责人',
        department: '部门',
      },
      tableData: [],
      tableDataCount: 0,
      tableSettingData: {
        dataAudit: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },

          tableData: [],
          status: {
            1: '退租',
            2: '续租',
          },
          chooseRowIds: [],
          currentSelection: {}//当前选择行
        },
        goods: {
          counts: 0,
          params: {
            search: '',
            page: 1,
            limit: 8,
          },
          chooseRowIds: [],
          currentSelection: {},//当前选择行,
          multiSelection: [],//多选行
          isShowMulti: false,//是否显示多选
        },
      },
      chooseRowIds: [],
      //合同详情
      contract_detail_visible: false,
      contractDetail: {
        contract_number: 'LHZF2014020312',
        property_address: '东方花园',
        property_address2: '南京路',
        water_card: 320115121561,
        electric_card: 320115121561,
        gas_card: 320115121561,
        contract_type: '电子合同',
        createTime: '2019-1-1',
        timeDuring: '3年',
        vacancy: '30天',
        startTime: '2019.02.04',
        endTime: '2019.03.23',
        deposit: '5000元',
        breach: '5000元',
        price: '4500-12个月，4600元-24个月',
        payType: '季付-12个月，月份-12个月，月付-6个月',
        firstClean: '2019.02.01',
        secondClean: '2019.03.23',
        houserPay: '物业费/水费/电费',
        noHouserPay: '燃气费/网费/管理费/公摊费',
        decorate: '允许',
        addGoods: '允许',
        channel: '是',
        channelName: '链家',
        channelPay: '500元',
        channelPer: '介价是',
        channelPhone: 13844564121,
        dataTime: '2019.02.04 12:45',
        note: '还是发顺丰舒服撒',
        noteTerms: '1.sdfsf 2.sdfdsf',
        carry_person: '收房是',
        department: '地方大师傅',
        contractor: {
          name: '东方朔',
          contact: 14738920482,
          id_card: 384903820190384934
        },
        property_person: {
          name: '乐乐了',
          contact: 14738920482,
          id_card: 384903820190384934
        },
      },
      postman: '',
      postContent: '',
      staffModule: false,//显示人员选择
      organData: {
        num: ''
      },
      postMess: {
        person: []
      },
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
      //资料不齐记录
      dataRecord_visible: false,
      rewrite_data: [],
      // 合同作废重签
      rewrite_visible: false,
      rewrite_note: '',
      params: {
        limit: 10,
        page: 1,
      },
      cookieArr: {},
      market_server: globalConfig.market_server,
    }
  },
  created () {
    this.initData()
    this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {}
  },
  watch: {
    rewrite_data (newVal) {
      this.postContent = ''
      this.postContent = newVal.join(',') + '缺失;'
    }
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
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
    getDateList () {
      this.showLoading(true);
      this.$http.get(this.market_server + `v1.0/market/contract/${this.tag_status}`, this.params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDataCount = res.data.count;
        } else {
          this.tableData = [];
          this.tableDataCount = 0;
        }
        this.showLoading(false);
      })
    },
    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          createTime: '2019-10-11',
          ContractNo: '合同编号',
          address: '地址',
          nature: '合同性质',
          compay: '所属公司',
          houser_name: '房东姓名', //收房 
          price: '收房价格',
          payType: '付款方式',
          openPer: '开单人',
          handler: '负责人',
          department: '部门',
        };
        this.tableData.push(obj);
      }
    },
    //切换 
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
        this.getDateList()
      }
    },
    // 切换 租房 收房
    changeTag_Status (id) {
      if (this.tag_status !== id) {
        this.tag_status = id
        this.getDateList()
      }
    },
    //高级搜索
    highSearch () {
      this.showSearch = true;
      if (this.tag_status == 2) {
        dataAuditSearch.data[1].value = [
          {
            id: 1,
            title: '租房'
          },
          {
            id: 2,
            title: '续租'
          },
          {
            id: 3,
            title: '调房'
          },
          {
            id: 4,
            title: '转租'
          }
        ]

      }
      this.searchData = dataAuditSearch;
    },
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    //双击 合同详情
    handleGetDetail (row) {
      this.currentRow = row
      //  this.$http.get(this.market_server + `v1.0/market/contract/${this.tag_stauts}/${row.contract_id}`).then(res => {
      this.tag_status = 2
      this.$http.get(this.market_server + `v1.0/market/contract/2/1`).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.contractDetail = res.data
          this.contract_detail_visible = true;
          this.$set(this.cookieArr, row.contract_id, new Date().getTime())
          this.setCookie('cookieArr', JSON.stringify(this.cookieArr), 7)
        }
      })
    },
    // 关闭详情
    handleCloseDetail () {
      this.contractDetail = '';
      this.contract_detail_visible = false;
      this.currentRow = null
    },
    handleContractPass () { },
    handleContractRejected () { },
    //footer
    handleCurrentChange (val) {
      this.params.page = val
      this.getDateList()
    },
    //选择人员
    organSearch () {
      this.staffModule = true
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        this.postman = names
        this.postMess.person = arr
        console.log(ids, names, arr)
      }
    },
    //资料不齐
    handleGetRecord () {
      this.dataRecord_visible = true;
    },
    handleCloseRecord () {
      this.dataRecord_visible = false;
    },
    // 合同作废
    handleRewrite () {
      this.rewrite_visible = true
    },
    // 合同作废
    handleSubmitRewrite () {
      this.$http.post(this.market_server + `v1.0/market/contract/e-contract-resign/${this.contractDetail.contract_number}`, {
        note: this.rewrite_note
      }).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelRewrite();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
    },
    // 取消合同作废
    handleCancelRewrite () {
      this.rewrite_note = '';
      this.rewrite_visible = false
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/dataAudit/index.scss";
</style>


