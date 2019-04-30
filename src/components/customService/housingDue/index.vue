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
        <el-button type="warning" plain @click='changeTab(1)' :class="[chooseTab==1?'active-warning':'']">收房</el-button>
        <el-button type="primary" plain @click='changeTab(2)' :class="[chooseTab==2?'active-primary':'']">租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">

      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableClickRow"
        header-row-class-name="tableHeader" style="width: 100%" :key='"table"+ tabType'>

        <el-table-column align="center" label="标记" v-if='tabType == 2'>
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.tag_status]">
              <p v-if='scope.row.tag_status'>{{scope.row.tag_status == 1 ? "续租":"退租"}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center" width='180px'>
          <template slot-scope="scope">
            <span>{{scope.row.end_at || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同编号" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.contract_number || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.house_name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="chooseTab == 1 ?'房东姓名':'租客姓名'" align="center">
          <template slot-scope="scope">
            <span v-if='scope.row.customer_info'>{{scope.row.customer_info[0].name || '--'}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">
            <span v-if='scope.row.customer_info'>{{scope.row.customer_info[0].phone || '--'}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column :label="chooseTab == 1 ? '收房价格':'出租价格'" align="center">
          <template slot-scope="scope">
            <p class="content" v-if="scope.row.month_price &&scope.row.month_price.length > 0">
              <span v-for="(item,key) in scope.row.month_price" :key="key"> {{ item.price }}元 {{
                item.period }}个月</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" align="center">
          <template slot-scope="scope">
            <p v-if='scope.row.pay_way&& scope.row.pay_way.length >0'>
              <span v-for='(item,key) in scope.row.pay_way'>{{item.pay_way_str? item.pay_way_str :'押'+ item.pay_way_bet
                + '付'+ item.pay_way}}</span>
            </p>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="开单人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sign_user.name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.org_leader.name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sign_org.name || '--'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType == 1' width='300'>
          <template slot-scope="scope" align='left'>
            <el-button type="success" plain size="mini" @click.stop="addHousuingTag(scope.row,1)">添加标记</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType ==2' width='300'>
          <template slot-scope="scope" align='left'>
            <div style='display:flex;justify-content:flex-start;align-items:center;'>
              <el-button type="warning" plain size="mini" @click.stop="readHousuingTag(scope.row)">查看标记</el-button>
              <el-button type="primary" plain size="mini" @click.stop="addHousuingTag(scope.row,2)">修改标记</el-button>
              <el-button type="success" plain size="mini" @click.stop="postHelp(scope.row)" v-if='scope.row.is_send == 0'>发送代办</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType == 4' width='300'>
          <template slot-scope="scope" align='left'>
            <el-button type="success" plain size="mini" @click.stop="addHousuingTag(scope.row,1)">添加标记</el-button>
            <el-button type="success" plain size="mini" @click.stop="urgedDealWith(scope.row)">催办</el-button>
          </template>
        </el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="params.page" :page-size="params.limit"
            :total="tableDateCount" layout="total,jumper,prev,pager,next">
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
          <div class="header_right" style='line-height:30px;'>{{contractDetail.contract_number}}</div>
        </div>
        <div class="dialog_main contract_detail">
          <!---房屋信息-->
          <p class='main_tit noMarginTop'>房屋信息</p>
          <div class="common_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8" v-if='chooseTab == 1'>
                  <el-form-item label="物业地址">
                    <span v-if='contractDetail.house_extension && contractDetail.house_extension.community'>{{JSON.parse(contractDetail.house_extension.community).name
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span v-if='contractDetail.house_extension && contractDetail.house_extension.community'>{{JSON.parse(contractDetail.house_extension.community).detailed_address
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).water_card_number
                      || '--' }}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span v-if='contractDetail.house_extension&& contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).electricity_card_number
                      || '--'}}</span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span v-if='contractDetail.house_extension&&contractDetail.house_extension.cards'>{{JSON.parse(contractDetail.house_extension.cards).gas_card_number
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
                      <span v-for="(item,key) in contractDetail.month_price" :key="key"> {{ item.price }}元 {{
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
                    <span>{{ contractDetail.lease_collect.can_decorate== 1?'是':'否' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
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

          <p class='main_tit' v-if="chooseTab === 1">签约人及产权人信息</p>
          <p class='main_tit' v-if="chooseTab === 2">签约人信息</p>
          <div class="common_info">
            <el-form label-width="120px" v-if=' contractDetail.customer_info'>
              <el-row :gutter="10" v-for='item in  contractDetail.customer_info' :key='item.id'>
                <el-col :span="1">
                  <el-form-item label="签约人" class='person_tit'></el-form-item>
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
            <el-form label-width="120px" v-else>
              <el-row :gutter="10" v-if="chooseTab === 1">
                <el-col :span="1">
                  <el-form-item :label="chooseTab === 1?'产权人':'签约人'" class='person_tit' />
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
            <div v-if="contractDetail.album">
              <div class='flex-center' v-for='(item,index) in Object.keys(polishing_data[chooseTab-1])' :key='index'
                style='min-height:80px;'>
                <div class='mian_tit'>{{polishing_data[chooseTab-1][item]}}</div>
                <div style="width: 90%;text-align: left">
                  <img v-for="tmp in contractDetail.album[item]" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                    :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                </div>
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
                    <span>{{ item.contract_number +'-' + (item.is_invalid == 0 ? "合同正常" : "合同作废")}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="common_info" v-else>暂无资料</div>
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
              <Ljupload size='50' v-model='mark_form.album'></Ljupload>
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
        <div class="dialog_main detail_dialog">
          <div class="back_info scroll_bar">
            <div class="content flex" v-for="(item,key) in backInfo">
              <div class='detail_dialog_left'>
                <p>{{ item.operater.name }}</p>
                <p>{{ item.created_at}}</p>
              </div>
              <div class="detail_dialog_center">
                <div class="circle"></div>
              </div>
              <div class='detail_dialog_right'>
                <p>{{ item.tag_status == 1 ? "续租" : "退租" }}</p>
                <p>{{item.remark}}</p>
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
          <el-form label-width="80px">
            <el-form-item label="备注信息">
              <el-input v-model="urgedDeal_note" type="textarea" placeholder="请输入" :row="10"></el-input>
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
import Ljupload from '../../common/lightweightComponents/lj-upload'

export default {
  name: 'index',
  components: {
    SearchHigh,
    MenuList,
    LjDialog,
    Ljupload
  },
  data () {
    return {
      customService,
      visibleStatus: false, // 客服
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
      tableData: [],
      tableDateCount: 0,
      //合同详情
      contract_detail_visible: false,
      contractDetail: {},
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
      // 添加 1 修改 2标记
      tagType: 1,
      // 添加标记
      mark_visible: false,
      mark_form: {
        tag_status: null,
        appointment_time: null,
        remark: null,
        album: [],
      },
      mark_status: [
        { id: 1, val: '续租' },
        { id: 2, val: '退租' },
      ],

      // 回访记录
      backInfo_visible: false,
      backInfo: [],
      // 催办
      urgedDeal_visible: false,
      urgedDeal_note: null,
      // 当前点击的row
      currentRow: null,
      market_server: globalConfig.market_server,
      payArr: ['水费', '电费', '燃气费', '物业费', '网络费', '其他']
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
        }
        if (this.tabType == 4) {
          this.params.is_overdue = 1
        }
      }
      this.getDateList()
    },
    getDateList () {
      this.showLoading(true);
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}`, this.params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
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
        this.params.page = 1
        this.params.search = val.search
        this.params.tag_status = val.tag_status
        this.params.sign_user_id = val.openPer[0] || ''
        this.params.sign_org_id = val.handler[0] || ''
        this.params.end_at_min = val.date1[0] || ''
        this.params.end_at_max = val.date1[1] || ''
        this.getDateList()
      }

    },
    //合同详情
    tableClickRow (row) {
      this.currentRow = row
      this.contract_detail_visible = true
      // 合同详情
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}/${row.contract_id}`).then(res => {
        if (res.code === 200) {
          this.contractDetail = res.data
        }
      })
    },
    // 关闭合同详情
    handleCloseDetail () {
      this.contract_detail_visible = false
      this.currentRow = null
    },

    // 添加标记
    addHousuingTag (row, type) {
      this.tagType = type
      this.currentRow = row
      this.mark_visible = true;
    },
    // close 添加标记
    handleCancelMark () {
      this.mark_form = {
        tag_status: null,
        appointment_time: null,
        remark: null,
        album: [],
      }
      this.currentRow = null
      this.mark_visible = false;
    },
    // 标记类型
    chooseMarkRadio (item) {
      this.mark_form.tag_status = item.id;
    },
    validation_mark_form () {
      let { tag_status, appointment_time, remark, album } = this.mark_form;
      if (!tag_status) {
        return '标记类型未选择'
      }
      if (!appointment_time) {
        return '预约时间未选择'
      }
      if (this.tagType == 1) {
        if (!remark) {
          return '备注信息未填写'
        }
        if (album.length == 0) {
          return '图片未上传'
        }
      }

      return null
    },
    // 标记上传
    handleSubmitMark () {
      let warn = this.validation_mark_form()
      if (warn) {
        this.$LjNotify('warning', {
          title: '提示',
          message: warn
        });
        return
      }

      if (this.tagType == 1) {
        this.$http.post(this.market_server + `v1.0/market/contract/tag/${this.chooseTab}/${this.currentRow.contract_id}`, this.mark_form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.message
            });
            this.handleCancelMark();
            this.getDateList();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.message
            })
          }
        })
      }
      if (this.tagType == 2) {
        this.$http.put(this.market_server + `v1.0/market/contract/tag/${this.currentRow.tag_id}`, this.mark_form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '修改成功',
              message: res.message
            });
            this.handleCancelMark();
            this.getDateList();
          } else {
            this.$LjNotify('warning', {
              title: '修改失败',
              message: res.message
            })
          }
        })
      }

    },
    // 查看标记
    readHousuingTag (row) {
      this.currentRow = row;
      this.$http.get(this.market_server + `v1.0/market/contract/tag/${row.tag_id}`).then(res => {
        if (res.code === 200) {
          this.backInfo = res.data.data
          this.backInfo_visible = true;
        } else {
          this.$LjNotify('warning', {
            title: '警告',
            message: '暂无标记信息'
          })
        }
      })
    },
    // 关闭 标记查看
    handleCloseLookBackInfo () {
      this.currentRow = '';
      this.backInfo = '';
      this.backInfo_visible = false;
    },
    // 查看标记中 修改标记
    backInfo_addHousuingTag () {
      this.addHousuingTag(this.currentRow, 2)
      this.backInfo = '';
      this.backInfo_visible = false;
    },
    // 发送代办
    postHelp (row) {
      if (row.is_send != 0) {
        return
      }
      let params = {
        house_id: row.house_id,
        contract_id: row.contract_id,
        contract_type: this.chooseTab,
        task_type: row.tag_status,
        tag_id: row.tag_id
      }

      this.$http.post(this.market_server + `v1.0/market/contract/send-task`, params).then(res => {
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
          this.$LjNotify('success', {
            title: '提示',
            message: '代办发送成功'
          });
          this.getDateList()
        } else {
          this.$LjNotify('warning', {
            title: '提示',
            message: '代办发送失败'
          });
        }
      })
    },
    // 催办
    urgedDealWith (row) {
      this.currentRow = row
      this.urgedDeal_visible = true
    },
    // 确定催办
    handleUrgedDeal () {
      if (!this.urgedDeal_note) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '备注信息未填写'
        });
        return
      }

      let params = {
        sign_user_id: '',
        content: this.urgedDeal_note
      }
      this.$http.post(this.market_server + `v1.0/message/send-urgent`, params).then(res => {
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
          this.$LjNotify('success', {
            title: '提示',
            message: '建立催办成功'
          });
          this.urgedDeal_note = null
          this.getDateList()
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
      this.params.page = val
      this.getDateList()
    },

  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/housingDue/index.scss";

.opactiy {
  opacity: 0;
}
</style>


