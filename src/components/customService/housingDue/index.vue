<template>
  <div id='HousingDue'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>房屋到期</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="chosenType(item.id)" class="items-column" :class="{'chooseTab': tabType === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain @click='changeTab(1)'>收房</el-button>
        <el-button type="primary" plain @click='changeTab(2)'>租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableClickRow"
        header-row-class-name="tableHeader" style="width: 100%">

        <el-table-column align="center" label="标记" v-if='tabType == 2'>
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.tag_status]">
              <p v-if='scope.row.tag_status'>{{scope.row.tag_status == 1 ? "续租":"退租"}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="end_at" label="创建时间" align="center" width='180px'></el-table-column>
        <el-table-column prop="contract_number" label="合同编号" align="center"></el-table-column>
        <el-table-column prop="house_name" label="地址" align="center"></el-table-column>
        <el-table-column prop="customer_info[0].name" :label="chooseTab == 1 ?'房东姓名':'租客姓名'" align="center" v-if=''></el-table-column>
        <el-table-column prop="customer_info[0].phone" label="联系方式" align="center"></el-table-column>
        <el-table-column :label="chooseTab == 1 ? '收房价格':'出租价格'" align="center" v-if=''>
          <template slot-scope="scope">
            <span>{{scope.row.month_price[0].price + '元'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" align="center">
          <template slot-scope="scope">
            <span>{{'押'+ scope.row.pay_way[0].pay_way_bet + '付'+ scope.row.pay_way[0].pay_way}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sign_user.name" label="开单人" align="center"></el-table-column>
        <el-table-column prop="org_leader.name" label="负责人" align="center"></el-table-column>
        <el-table-column prop="sign_org.name" label="所属部门" align="center"></el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType == 1 || tabType ==2 || tabType == 4' width='300'>
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click.stop="addHousuingTag(scope.row,1)" v-if='tabType == 1 || tabType == 4'>添加标记</el-button>
            <el-button type="warning" plain size="mini" @click.stop="readHousuingTag(scope.row)" v-if='tabType == 2'>查看标记</el-button>
            <el-button type="primary" plain size="mini" @click.stop="addHousuingTag(scope.row,2)" v-if='tabType == 2'>修改标记</el-button>
            <el-button type="success" plain size="mini" @click.stop="postHelp(scope.row)" v-if='tabType == 2&& scope.row.status'>发送代办</el-button>

            <el-button type="success" plain size="mini" @click.stop="urgedDealWith(scope.row)" v-if='tabType == 4'>催办</el-button>
          </template>
        </el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="tableSettingData.housingDue.params.page"
            :page-size="tableSettingData.housingDue.params.limit" :total="tableSettingData.housingDue.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--合同详情-->
    <lj-dialog :visible="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container" v-if='contract_detail_visible'>
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>
              {{ contractDetail.contract_number }}
            </span>
            <el-button type="danger" size="mini" @click="handleRewrite" style="margin-left: 10px">作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main contract_detail">
          <!---房屋信息-->
          <p class='main_tit noMarginTop'>房屋信息</p>
          <div class="common_info">
            <el-form label-width="160px" v-if='contractDetail.house_extension'>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="物业地址">
                    <span>{{ contractDetail.house_extension.name || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span>{{ contractDetail.lease_collect.property_address || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span>{{ contractDetail.house_extension.water_card_number || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span>{{contractDetail.house_extension.electricity_card_number || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span>{{contractDetail.house_extension.gas_card_number || '--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!--合同信息-->
          <p class='main_tit'>合同信息</p>
          <div class="common_info">
            <el-form label-width="160px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="合同类型">
                    <span>{{ contractDetail.contract_type || '--'}}</span>
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
                <el-col :span="8">
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
                <el-col :span="8">
                  <el-form-item v-if="contractDetail.first_pay_at && chooseTab === 1 " label="第一次打房租日期">
                    <span>{{ contractDetail.first_pay_at || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第二次打房租日期" v-if="contractDetail.second_pay_at && chooseTab === 1">
                    <span>{{ contractDetail.second_pay_at || '--' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="房东承担费用">
                    <span>{{ contractDetail.houserPay || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="非房东承担费用">
                    <span>{{ contractDetail.non_landlord_fee || '--'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否装修" v-if="chooseTab === 1">
                    <span>{{ contractDetail.lease_collect.can_decorate== 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
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
                    <span>{{ contractDetail.agency_info && contractDetail.agency_info.agency_price_now + '元'|| '--'}}</span>
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
                    <span>{{ contractDetail.sign_user }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <span>{{ contractDetail.sign_org}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="chooseTab === 1">签约人及产权人信息</p>
          <div class="common_info">
            <el-form label-width="160px" v-if=' contractDetail.customer_info'>
              <el-row :gutter="10">
                <el-col :span="1">
                  <el-form-item label="签约人" class='person_tit'>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.customer_info[0].name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.customer_info[0].phone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.customer_info[0].idcard }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label="产权人" class='person_tit'></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.lease_collect.proerty_owner || '--'}}</span>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.property_person.contact}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.property_person.id_card}}</span>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="chooseTab === 1">收款账号</p>
          <div class="common_info" v-if="chooseTab === 1">
            <el-form label-width="160px" v-if='contractDetail.contractor'>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人">
                    <span>{{ contractDetail.contractor.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系">
                    <span>{{ contractDetail.contractor.contact }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号">
                    <span>{{ contractDetail.contractor.id_card }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行">
                    <span>{{ contractDetail.property_person.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行">
                    <span>{{ contractDetail.property_person.contact}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit' v-if="chooseTab === 1">附件信息</p>
          <!--收房 -->
          <div class="common_info" v-if="chooseTab === 1">
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
            <div v-else>暂无资料</div>
          </div>

          <p class='main_tit'>相关合同</p>
          <div class="common_info" v-if="contractDetail.related_contract && contractDetail.related_contract.length > 0">
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
          <div class="common_info" v-else>暂无资料</div>
        </div>
        <div class="dialog_footer">
          <el-button type="success" size="small" @click="handleContractPass">通过</el-button>
          <el-button type="warning" size="small" @click="handleContractRejected">驳回</el-button>
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
    <!-- 合同资料补齐 -->
    <lj-dialog :visible="data_polishing_visible" :size="{width: 550 + 'px',height: 600 + 'px'}" @close="handleCancelPolishing">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>补齐资料</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="80px" class="showPadding">
            <el-form-item label="房产证号">
              <el-input v-model="property_number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="丘号">
              <el-input v-model="mound_number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="selfLabel(idx)" v-for="(tmp,idx) in polishing_params" :key="idx">
              <Upload :file="upload_file[idx]" @success="handleGetFile"></Upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmPolishing">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelPolishing">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 添加 修改标记 -->
    <lj-dialog :visible="mark_visible" :size="{width: 450 + 'px',height: 500 + 'px'}" @close="handleCancelMark">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tagType == 1 ? "添加标记":"修改标记"}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="mark_form" label-width="80px">
            <el-form-item label="标记类型">
              <div class="items-center">
                <p class="radioSelection" @click="chooseMarkRadio(item)" :class="{'highChoose': mark_form.tag_status === item.id}"
                  v-for="item in mark_status">
                  {{ item.val }}
                </p>
              </div>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="mark_form.appointment_time" type="datetime"
                placeholder="请选择"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="mark_form.remark" type="textarea" placeholder="请输入" :row="6"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
              <Upload :file="mark_upload" @success="handleGetMarkUpload"></Upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitMark">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelMark">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 查看标记 -->
    <LjDialog :visible="backInfo_visible" :size="{width: 600 + 'px',height: 500 + 'px'}" @close="handleCloseLookBackInfo">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>标记记录</h3>
          <div class="header_right" @click='backInfo_addHousuingTag'>
            修改标记
          </div>
        </div>
        <div class="dialog_main">
          <div class="back_info scroll_bar">
            <div>
              <div class="content flex" v-for="(item,key) in backInfo">
                <div>
                  <a>{{ item.add_user }}</a><br>
                  <span>{{ item.time }}</span>
                </div>
                <div class="flex-center">
                  <div class="circle flex-center">
                    <a></a>
                  </div>
                  <div class="line" v-if="key !== backInfo.length -1"></div>
                </div>
                <div>
                  <a>{{ item.record }}</a><br>
                  <p v-if="item.star">
                    <el-rate v-model="item.star" disabled></el-rate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseLookBackInfo">确定</el-button>
        </div>
      </div>
    </LjDialog>

    <!-- 催办 -->
    <LjDialog :visible="urgedDeal_visible" :size="{width: 480 + 'px',height: 310 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal">
          <el-form :model="mark_form" label-width="80px">
            <el-form-item label="备注信息">
              <el-input v-model="mark_form.remark" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleUrgedDeal">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseUrgedDeal">取消</el-button>
        </div>
      </div>
    </LjDialog>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue';
import MenuList from '../../common/menuList.vue';
import { housingDueSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import LjDialog from '../../common/lj-dialog.vue';
import Upload from '../../common/upload.vue';
export default {
  name: 'index',
  components: {
    SearchHigh,
    MenuList,
    LjDialog,
    Upload
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      selects: [
        {
          id: 1,
          title: '待标记'
        },
        {
          id: 2,
          title: '已标记'
        },
        {
          id: 3,
          title: '已完成'
        },
        {
          id: 4,
          title: '超期'
        }
      ],
      chooseTab: 1,
      tabType: 1,
      showSearch: false,
      searchData: {
        status: 'housingDue',
        data: [],
      },
      tableSettingData: {
        housingDue: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            end_at: '到期时间',
            contract_number: '合同编号',
            house_name: '地址',
            name: '房东姓名',
            contact: '联系方式',
            price: '收房价格',
            payType: '付款方式',
            openPer: '开单人',
            handler: '负责人',
            department: '部门',
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
      tableData: [],
      //合同详情
      contract_detail_visible: false,
      contractDetail: {},
      // contractDetail: {
      //   contract_number: 'LHZF2014020312',
      //   property_address: '东方花园',
      //   property_address2: '南京路',
      //   water_card: 320115121561,
      //   electric_card: 320115121561,
      //   gas_card: 320115121561,
      //   contract_type: '电子合同',
      //   createTime: '2019-1-1',
      //   timeDuring: '3年',
      //   vacancy: '30天',
      //   startTime: '2019.02.04',
      //   endTime: '2019.03.23',
      //   deposit: '5000元',
      //   breach: '5000元',
      //   price: '4500-12个月，4600元-24个月',
      //   payType: '季付-12个月，月份-12个月，月付-6个月',
      //   firstClean: '2019.02.01',
      //   secondClean: '2019.03.23',
      //   houserPay: '物业费/水费/电费',
      //   noHouserPay: '燃气费/网费/管理费/公摊费',
      //   decorate: '允许',
      //   addGoods: '允许',
      //   channel: '是',
      //   channelName: '链家',
      //   channelPay: '500元',
      //   channelPer: '介价是',
      //   channelPhone: 13844564121,
      //   dataTime: '2019.02.04 12:45',
      //   note: '还是发顺丰舒服撒',
      //   noteTerms: '1.sdfsf 2.sdfdsf',
      //   carry_person: '收房是',
      //   department: '地方大师傅',
      //   contractor: {
      //     name: '东方朔',
      //     contact: 14738920482,
      //     id_card: 384903820190384934
      //   },
      //   property_person: {
      //     name: '乐乐了',
      //     contact: 14738920482,
      //     id_card: 384903820190384934
      //   },
      // },
      // getList 参数
      params: {
        is_mark: 2,
        is_overdue: 0,
        is_complete: 0,
        page: 1,
        limit: 10,
        search: '',
        tag_status: '',
        sign_user_id: '',
        sign_org_id: '',
        end_at_min: '',
        end_at_max: '',
      },
      // 合同作废重签
      rewrite_visible: false,
      rewrite_note: '',
      // 合同补齐资料
      data_polishing_visible: false,
      // 房产证号
      property_number: '',
      // 丘号
      mound_number: '',
      //附件
      polishing_params: {},
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
      upload_file: {},
      // 添加 1 修改 2标记
      tagType: 1,
      // 添加标记
      mark_visible: false,
      mark_form: {
        tag_status: '',
        appointment_time: '',
        remark: '',
        album: [],
      },
      mark_status: [
        { id: 1, val: '续租' },
        { id: 2, val: '退租' },
      ],
      mark_upload: {
        keyName: 'album',
        setFile: [],
        size: {
          width: '50px',
          height: '50px'
        }
      },
      // 回访记录
      backInfo_visible: false,
      backInfo: [],
      // 催办
      urgedDeal_visible: false,
      // 当前点击的row
      currentRow: null,
      market_server: globalConfig.market_server,
    }
  },
  created () {
    this.formateParams()
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    formateParams () {
      this.params.is_mark = 0
      this.params.is_overdue = 0
      this.params.is_complete = 0
      if (this.tabType == 1) {
        this.params.is_mark = 2
      } else {
        this.params.is_mark = 1
        if (this.tabType == 3) {
          this.params.is_complete = 1
        } else {
          this.params.is_overdue = 1
        }
      }
      console.log(this.params)
      this.getDateList()
    },
    getDateList () {
      this.showLoading(true);
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}`, this.params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          console.log(this.tableData)
          this.tableDateCount = res.data.count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    //切换
    chosenType (id) {
      if (this.tabType !== id) {
        this.tabType = id
        this.formateParams()
      }
    },
    // 收房 租房
    changeTab (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
        this.formateParams()
      }
    },
    //高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = housingDueSearch;
    },
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    //合同详情
    tableClickRow (row) {
      this.currentRow = row

      // 合同详情
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}/${row.contract_id}`).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.contractDetail = res.data
          this.contract_detail_visible = true
        } else {

        }
      })
    },
    // 关闭合同详情
    handleCloseDetail () {
      this.contract_detail_visible = false
      this.currentRow = null
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
    // 补齐资料
    handleOpenPolishing () {
      this.data_polishing_visible = true
    },
    handleCancelPolishing () {
      this.data_polishing_visible = false
      this.polishing_params = {};
      this.mound_number = '';
      this.property_number = '';
      this.upload_file = {};
    },
    handleConfirmPolishing () {
      var form = new FormData();
      form.append('complete_content', this.polishing_params);
      form.append('property_number', this.property_number);
      form.append('mound_number', this.mound_number);
      this.$http.post(this.market_server + `v1.0/market/contract/${this.chooseTab}/${this.currentRow.contract_id}`, form).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelPolishing();
          this.getContractList();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
      this.handleCancelPolishing()
    },
    selfLabel (idx) {
      return this.polishing_data[this.chooseTab - 1][idx];
    },
    handleGetFile () {
      if (item !== 'close') {
        this.polishing_params[item[0]] = item[1];
      }
    },
    // 合同通过
    handleContractPass () { },
    // 合同驳回
    handleContractRejected () { },
    // 添加标记
    addHousuingTag (row, type) {
      this.tagType = type
      this.currentRow = row
      this.mark_visible = true;
    },
    // close 添加标记
    handleCancelMark () {
      for (var key in this.mark_form) {
        this.mark_form[key] = '';
      }
      this.mark_form.album = [];
      this.currentRow = null
      this.mark_visible = false;
    },
    // 标记类型
    chooseMarkRadio (item) {
      this.mark_form.tag_status = item.id;
    },
    // 标记图片上传
    handleGetMarkUpload (file) {
      if (file !== 'close') {
        this.mark_form[file[0]] = file[1];
      }
    },
    // 标记上传
    handleSubmitMark () {
      this.$http.post(this.market_server + `v1.0/market/contract/tag/${this.chooseTab}/${this.currentRow.contract_id}`, this.mark_form).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelMark();
          this.getContractList();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
    },
    // 查看标记
    readHousuingTag (row) {
      if (row.record) {
        this.backInfo = row.record;
        this.backInfo_visible = true;
      } else {
        this.$LjNotify('warning', {
          title: '警告',
          message: '暂无标记信息'
        })
      }
    },
    // 关闭 标记查看
    handleCloseLookBackInfo () {
      this.currentRow = '';
      this.backInfo = '';
      this.backInfo_visible = false;
    },
    // 查看标记中修改标记
    backInfo_addHousuingTag () {
      this.addHousuingTag(this.currentRow, 2)
      this.backInfo = '';
      this.backInfo_visible = false;
    },
    // 发送代办
    postHelp (row) {
      console.log(`代办${row}`)
    },
    // 催办
    urgedDealWith (row) {
      this.currentRow = row
      this.urgedDeal_visible = true
    },
    // 确定催办
    handleUrgedDeal () {
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}`, this.params).then(res => {
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
          this.$LjNotify('success', {
            title: '提示',
            message: '建立催办成功'
          });
        } else {
          this.$LjNotify('warning', {
            title: '提示',
            message: '建立催办失败'
          });
        }

      })

    },
    // 取消催办
    handleCloseUrgedDeal () {
      this.currentRow = null
      this.urgedDeal_visible = false
    },
    //footer
    handleCurrentChange (val) {
      this.tableSettingData.visitToRecord.params.page = val;
      switch (this.currentTable) {
        case 'workOrder':
          this.getRepositoryList();
          break;
        case 'goods':
          this.getGoodsList();
          break;
        default:
          break;
      }
      //this.getRepositoryList();
      //console.log(`当前页: ${val}`);
    },

  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/housingDue/index.scss";
</style>


