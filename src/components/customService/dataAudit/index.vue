<template>
  <div id='dataAudit'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>资料审核</h1>
        <h2 class="items-center">
          <span v-for="item in selects" :key='item.id' @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button id='active-warning' @click='changeTag_Status(1)' :class="[tag_status == 1?'el-button-active':'']">收房</el-button>
        <el-button id='active-primary' @click='changeTag_Status(2)' :class="[tag_status==2?'el-button-active':'']">租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="handleGetDetail"
        header-row-class-name="tableHeader" style="width: 100%" :key="'table'+tag_status">
        <el-table-column align="center" label="签约时间">
          <template slot-scope="scope">
            <i class='table_icon' v-if='!cookieArr[scope.row.contract_id] || cookieArr[scope.row.contract_id] < scope.row.update_time'></i>
            <span>{{scope.row.sign_at}}</span>
          </template>
        </el-table-column>
        <el-table-column key="合同编号" align="center" prop="contract_number" label="合同编号"></el-table-column>
        <el-table-column key="地址" align="center" prop="address" label="地址"></el-table-column>
        <el-table-column key="合同性质" align="center" prop="type" label="合同性质"></el-table-column>
        <el-table-column key="收房价格" align="center" label="收房价格" v-if='tag_status == 1'>>
          <template slot-scope="scope">
            <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
              <span v-for="(item,index) in scope.row.month_price">
                {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="租房价格" align="center" label="租房价格" v-if='tag_status == 2'>
          <template slot-scope="scope">
            <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
              <span v-for="(item,index) in scope.row.month_price">
                {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="付款方式" align="center" prop="pay_way" label="付款方式"></el-table-column>
        <el-table-column key="开单人" align="center" prop="sign_user" label="开单人"></el-table-column>
        <el-table-column key="负责人" align="center" prop="org_leader" label="负责人"></el-table-column>
        <el-table-column key="部门" align="center" prop="sign_org" label="部门"></el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDataCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--合同详情-->
    <!-- <lj-dialog :visible="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container" v-if='contract_detail_visible && contractDetail'>
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>{{contractDetail.contract_number}}</span>
            <span style='margin-left:20px;margin-right:60px;'>{{currentRow.type}}</span>
            <el-button id='active-danger' class='el-button-active' size='mini' @click='handleRewrite' style='margin-left:10px'>作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main contract_detail" v-if='this.contractDetail'>

          <p class='main_tit noMarginTop'>房屋信息</p>
          <div class="common_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-if='tag_status == 1'>
                  <el-form-item label="物业地址">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.community'>{{contractDetail.house_extension.community.name
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.community'>{{contractDetail.house_extension.community.detailed_address
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.water_card_number
                      || '--' }}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.electricity_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.cards'>{{contractDetail.house_extension.cards.gas_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

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
                    <span v-if='contractDetail.month_price && contractDetail.month_price.length >0' class='price-box'>
                      <i v-for='(item,key) in contractDetail.month_price' :key='key'>{{ item.price
                        }}元/{{item.period
                        }}个月;</i>
                    </span>
                    <span v-else></span>
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
                    <span v-for='pay in contractDetail.houserPay' :key='pay'>{{payArr[pay-1] || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="租客承担费用" v-if='tag_status == 2'>
                    <span v-for='pay in contractDetail.non_landlord_fee' :key='pay'>{{payArr[pay-1] + '/'|| '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="tag_status === 1">
                  <el-form-item label="可否装修">
                    <span>{{ contractDetail.lease_collect && contractDetail.lease_collect.can_decorate== 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="tag_status === 1">
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

          <p class='main_tit' v-if="tag_status === 1">签约人及产权人信息</p>
          <p class='main_tit' v-if="tag_status === 2">签约人信息</p>
          <div class="common_info">
            <el-form label-width="120px" v-if=' contractDetail.customer_info'>
              <el-row :gutter="10" v-for='item in contractDetail.customer_info' :key='item.phone' v-if='item'>
                <el-col :span="1">
                  <span class='person_tit'>签约人</span>
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
                  <span class='person_tit'>产权人</span>
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
                  <span class='person_tit'>{{tag_status === 1?'产权人':'签约人'}}</span>
                </el-col>
                <el-col :span="7" style='font-size:14px;height:40px;line-height:40px;'>
                  <span>暂无资料</span>
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
              <el-checkbox name="type" v-for="(tit,key) in polishing_data[tag_status-1]" :key='tit' :label='key'
                :disabled="chooseTab == 3">
                <template>
                  <div class='el_check_box'>
                    <div class='main_tit'> {{tit}}</div>
                    <div style="width: 90%;text-align: left">
                      <Ljupload size='40' :value="contractDetail.album_temp[key]" disabled=true :download='false'></Ljupload>
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <p class='main_tit' v-if='chooseTab != 3'>资料不齐记录</p>
          <div class='data_info' v-if='chooseTab != 3'>
            <div class="flex-center">
              <div class="flex_center_tit">发送对象</div>
              <div class="flex_center_content flex_center_content1 borderNone">
                <el-input @focus="organSearch" readonly v-model="dataRecord.send_name" :placeholder="contractDetail.sign_user || contractDetail.org_leader">
                </el-input>
              </div>
            </div>

            <div class="flex-center flex-center2">
              <div class="flex_center_tit">不齐内容</div>
              <div class="flex_center_content flex_center_content2">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请选择不齐内容" v-model="dataRecord.content"
                  disabled style='background:transparent'>
                </el-input>
                <div class='buttons'>
                  <p class='buttons_left' @click='handlePostRecord'>
                    <i class='icon'></i>
                    <span>发送</span>
                  </p>
                  <el-button id='active-primary' @click='handleGetRecord'>不齐记录</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog_footer">
          <el-button id='active-success' class='el-button-active' size="small" @click="handleContract(true)" v-if='chooseTab == 1 || chooseTab == 2'>通过</el-button>
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleContract(false)" v-if='chooseTab == 3'>驳回</el-button>
        </div>
      </div>
    </lj-dialog> -->
    <contractDetail :visible="contract_detail_visible" :moduleData='currentRow' :chooseTab='tag_status' :showFooter='true'
      :showRelated='false' :disabled='contract_disable' :showData='contract_showData' @close="handleCloseDetail"
      @setCookie='cookieChange' />
    <!--资料不全 开单人选择-->
    <!-- <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan> -->

    <!--资料不齐记录-->
    <!-- <lj-dialog :visible="dataRecord_visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseRecord">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>资料不齐记录</h3>
        </div>
        <div class="dialog_main dataRecord_dialog_main" v-if='dataRecord_visible'>
          <div v-for='(remark,index) in contractDetail.checkout_remark' class='dataRecord_cell' :key='remark.create_uid + "-" + index'
            v-if='dataRecord_visible && contractDetail.checkout_remark'>
            <div class='detail_dialog_left'>
              <p>{{remark.create.name}}</p>
              <p>2019.1.16</p>
            </div>
            <div class="detail_dialog_center">
              <div class='circle'></div>
            </div>
            <div class='detail_dialog_right'>
              <p>{{remark.remark}}</p>
              <p>发送对象:{{remark.receive && remark.receive.name || '--'}}</p>
            </div>
          </div>
          <div v-else>暂无记录</div>
        </div>
      </div>
    </lj-dialog> -->

    <!-- 作废重签 -->
    <!-- <InvalidDialog :visible='rewrite_visible' :moduleData='rewrite_info' @close='handleCancelRewrite' /> -->

    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import StaffOrgan from '../../common/staffOrgan.vue'
import MenuList from '../../common/menuList.vue';
import LjDialog from '../../common/lj-dialog.vue';
import InvalidDialog from '../components/invalid-dialog';
import { dataAuditSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import Ljupload from '../../common/lightweightComponents/lj-upload';
import contractDetail from '../components/contract_detail';

export default {
  name: 'index',
  components: {
    SearchHigh,
    StaffOrgan,
    MenuList,
    LjDialog,
    Ljupload,
    contractDetail,
    InvalidDialog
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
      chooseTab: 1,  // 待审核 跟进中 已完成
      tag_status: 1, // 收房 租房
      tableData: [],  // 列表
      tableDataCount: 0,


      showSearch: false,  // 显示高级搜索
      searchData: {}, // 高级搜索 参数
      searchParams: {
        dateTime: [],
      }, // 高级搜索返回值


      //合同详情
      contract_detail_visible: false,
      contractDetail: null,
      // contract_disable: true,
      staffModule: false,//显示人员选择
      organData: {
        num: ''
      },

      //附件
      // polishing_data: [
      //   {
      //     identity_photo: '证件照片',
      //     bank_photo: '银行卡照片',
      //     photo: '合同照片',
      //     water_photo: '水表照片',
      //     electricity_photo: '电表照片',
      //     gas_photo: '气表照片',
      //     checkin_photo: '交接单照片',
      //     auth_photo: '委托书照片',
      //     deposit_photo: '押金照片',
      //     promise: '承诺书照片',
      //     property_photo: '房产证照片',
      //     water_card_photo: '水卡照片',
      //     electricity_card_photo: '电卡照片',
      //     gas_card_photo: '气卡照片',
      //   },
      //   {
      //     checkin_photo: '交接单照片',
      //     certificate_photo: '截图凭证',
      //     deposit_photo: '押金收条',
      //     identity_photo: '证件照片',
      //     photo: '合同照片',
      //     bank_photo: '银行卡照片',
      //     water_photo: '水表照片',
      //     electricity_photo: '电表照片',
      //     gas_photo: '气表照片'
      //   }
      // ],
      //资料不齐记录
      // dataRecord_visible: false,
      // dataRecord: {
      //   send_name: '',
      //   send_id: [],
      //   content: ''
      // },
      // rewrite_data: [],
      // 合同作废重签
      // rewrite_visible: false,
      // rewrite_note: '',
      // rewrite_info: {
      //   contract_id: null,
      //   contract_type: null,
      //   album: []
      // },
      // params {
      //   limit: 10,
      //   page: 1,
      // },
      // payArr: ['水费', '电费', '燃气费', '物业费', '网络费', '其他'],
      currentPage: 1,
      cookieArr: {},
      market_server: globalConfig.market_server,
      // complete: {
      //   task_id: '',
      //   key_name: ''
      // },
      currentRow: null
    }
  },
  created () {
    this.getDateList()
    this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {}
  },
  computed: {
    contract_disable () {
      return this.chooseTab == 3
    },
    contract_showData () {
      return this.chooseTab != 3
    }
  },
  // watch: {
  //   rewrite_data (newVal) {
  //     this.dataRecord.content = ''
  //     let data = this.polishing_data[this.tag_status - 1]
  //     newVal.forEach((item, index) => {
  //       if (index != 0) {
  //         this.dataRecord.content += ','
  //       }
  //       this.dataRecord.content += data[item]
  //     })
  //     this.dataRecord.content += '缺失;'
  //   }
  // },
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
    cookieChange () {
      this.$set(this.cookieArr, this.currentRow.contract_id, new Date().getTime())
      this.setCookie('cookieArr', JSON.stringify(this.cookieArr), 7)
      this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {}

    },
    setCookie (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getDateList () {
      this.showLoading(true);
      let params = {
        contract_type: this.tag_status, // 收房 租房
        doc_Status: this.chooseTab == 1 ? "review" : (this.chooseTab == 2 ? "flowing" : "published"), // 待审核 跟进中 已完成
        sign_date_min: this.searchParams.dateTime[0] || '',
        sign_date_max: this.searchParams.dateTime[1] || '',
        type: this.searchParams.type || '',
        signer: this.searchParams.signer || '',
        org: this.searchParams.handler || '', // 负责人
        search: this.searchParams.search || '',
        limit: 10,
        page: this.currentPage
      }

      this.$http.get(this.market_server + `v1.0/market/contract`, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDataCount = res.data.count;
        } else {
          this.currentPage = 1;
          this.tableData = [];
          this.tableDataCount = 0;
        }
        this.showLoading(false);
      })
    },
    //切换 待审核 跟进中 已完成
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
    //高级搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.searchParams = val
        this.currentPage = 1;
        this.getDateList()
      }
    },
    //双击 合同详情
    handleGetDetail (row) {
      // this.showLoading(true);
      this.currentRow = row
      this.contract_detail_visible = true;
      // this.$http.get(this.market_server + `v1.0/market/contract/${this.tag_status}/${row.contract_id}`).then(res => {
      //   if (res.code === 200) {
      //     this.showLoading(false);
      //     let data = res.data;
      //     if (data.house_extension) {
      //       if (data.house_extension.community && data.house_extension.community != 'null') {
      //         data.house_extension.community = JSON.parse(data.house_extension.community)
      //       } else {
      //         data.house_extension.community = null
      //       }

      //       if (data.house_extension.cards && data.house_extension.cards != 'null') {
      //         data.house_extension.cards = JSON.parse(data.house_extension.cards)
      //       } else {
      //         data.house_extension.cards = null
      //       }
      //     }
      //     this.contractDetail = data
      //     this.contract_detail_visible = true;

      //     this.getProcess_id(res.data.process_instance_id)
      //     this.$set(this.cookieArr, row.contract_id, new Date().getTime())
      //     this.setCookie('cookieArr', JSON.stringify(this.cookieArr), 7)
      //     this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {}
      //   }
      // })
    },
    // getProcess_id (PROCESS_ID) {
    //   this.$http.get(this.market_server + `v1.0/market/contract/kf-check-button?process_id=${PROCESS_ID}`).then(res => {
    //     if (res.code === 200) {
    //       let data = res.data;
    //       this.complete.task_id = data.taskId
    //       this.complete.key_name = data.buttons.variableName || 'kf_approved'
    //     }
    //   })
    // },
    // 关闭详情
    handleCloseDetail () {
      this.contract_detail_visible = false
      // this.contractDetail = null
      this.currentRow = null
    },
    // 合同通过 驳回
    // handleContract (isTrue) {
    //   let params = {
    //     process_id: this.contractDetail.process_instance_id,
    //     contract_type: this.tag_status,
    //     task_id: this.complete.task_id,
    //     data: {}
    //   }
    //   params.data[this.complete.key_name] = isTrue
    //   this.$http.post(this.market_server + `v1.0/market/contract/complete`, params).then(res => {
    //     this.$LjNotify('success', {
    //       title: '提示',
    //       message: res.message
    //     });

    //     if (res.code === 200) {
    //       this.handleCloseDetail()
    //     }
    //   })
    // },
    //footer
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDateList()
    },
    //选择人员
    // organSearch () {
    //   this.staffModule = true
    // },
    // 关闭 选择人员
    // hiddenOrgan (ids, names, arr) {
    //   this.staffModule = false;
    //   if (ids !== 'close') {
    //     this.dataRecord.send_name = names
    //     this.dataRecord.send_id = arr
    //   }
    // },
    // 发送不齐记录
    // handlePostRecord () {
    //   if (!this.dataRecord.content) {
    //     this.$LjNotify('warning', {
    //       title: '提示',
    //       message: '不齐内容未选择'
    //     });
    //     return
    //   }
    //   let current = {
    //     contract_type: this.tag_status,
    //     contract_id: this.currentRow.contract_id,
    //     house_name: this.currentRow.house_name,
    //     contract_number: this.currentRow.contract_number,
    //     remark: this.dataRecord.content,
    //     receive_ids: this.dataRecord.receive_ids || this.contractDetail.sign_user_id || contractDetail.org_leader
    //   }

    //   this.$http.post(this.market_server + `v1.0/market/contract/send-complete-data`, current).then(res => {

    //     let warning = null
    //     if (res.code == 200) {
    //       warning = '发送成功'
    //       this.rewrite_data = []
    //     } else {
    //       warning = '发送失败'
    //     }
    //     this.$LjNotify('success', {
    //       title: '提示',
    //       message: warning
    //     });

    //   })

    // },
    //资料不齐
    // handleGetRecord () {
    //   this.dataRecord_visible = true;
    // },
    // handleCloseRecord () {
    //   this.dataRecord_visible = false;
    // },
    // 合同作废
    // handleRewrite () {
    //   // this.contract_detail_visible = false
    //   this.rewrite_info = {
    //     contract_id: this.contractDetail.id,
    //     contract_type: this.contractDetail.type,
    //     album: this.contractDetail.album
    //   }
    //   this.rewrite_visible = true
    // },
    // // 取消合同作废
    // handleCancelRewrite () {
    //   this.rewrite_visible = false
    // },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/dataAudit/index.scss";
// .price-box {
//   overflow-x: scroll;
//   @include scroll;
// }
#dataAudit {
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
}
</style>


