<template>
  <div id="contractManagement">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b @click="show_market = true">...</b>
          </p>
          <h1>合同管理</h1>
          <h2 class="items-center">
            <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
              {{item.title}}<i></i>
            </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="handleOpenHigh"></div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">

        <el-table header-row-class-name="tableHeader" :data="contractList" @expand-change="handleExpandRow" @row-dblclick="handleGetDetail" :height="this.mainListHeight(30) + 'px'">
          <el-table-column label="签约时间" prop="sign_at" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="地址" prop="house_name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合同性质" prop="type" align="center"></el-table-column>
          <!--<el-table-column label="所属公司" prop="" align="center"></el-table-column>-->
          <el-table-column show-overflow-tooltip label="收房价格" prop="month_price" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
                <span v-for="(item,index) in scope.row.month_price">
                  {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" prop="pay_way" align="center"></el-table-column>
          <el-table-column label="开单人" prop="sign_user" align="center"></el-table-column>
          <el-table-column label="负责人" prop="org_leader" align="center"></el-table-column>
          <el-table-column label="部门" prop="sign_org" align="center"></el-table-column>
          <el-table-column label="审核状态" prop="check_status_name" align="center"></el-table-column>
          <el-table-column v-if="$storage.get('VALIDATE_PERMISSION')['Contract-Operate']" label="操作" align="center">
            <template slot-scope="scope">
              <!--<el-button type="primary" plain size="mini">查看审核记录</el-button>-->
              <!--<el-button type="warning" plain size="mini" @click="handleLookBackInfo(scope.row)">查看回访记录</el-button>-->
              <div>
                <el-button type="success" plain size="mini" @click="handleOpenPolishing(scope.row)">补齐资料</el-button>
                <el-tooltip placement="bottom-end" :visible-arrow="false">
                  <div class="flex control-btn" slot="content">
                    <span v-for="item in choose_list" :key="item.id"
                          @click.stop="handleClickSpan(item,scope.row,scope.row.is_tag)">
                      <div v-if="item.id==3&&scope.row.is_tag">修改标记</div>
                      <div v-else>{{item.val}}</div>
                    </span>
                  </div>
                  <span class="point_btn writingMode">···</span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="expand" label="综合页展开" align="center" v-if="chooseTab === 3" width="90px">
            <template slot-scope="scope">
              <div class="expand-container">
                <div class="expand-top">
                  <el-table header-row-class-name="tableHeader" :data="expand_data" @row-click="handleClickExpandRow">
                    <el-table-column label="签约时间" prop="sign_at" align="center"></el-table-column>
                    <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
                    <el-table-column label="地址" prop="house_name" align="center"></el-table-column>
                    <el-table-column label="合同性质" prop="type" align="center"></el-table-column>
                    <el-table-column label="收房价格" prop="month_price" align="center">
                      <template slot-scope="scope">
                        <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
                          <span v-for="(item,index) in scope.row.month_price">
                            {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="付款方式" prop="pay_way" align="center"></el-table-column>
                    <el-table-column label="开单人" prop="sign_user" align="center"></el-table-column>
                    <el-table-column label="负责人" prop="org_leader" align="center"></el-table-column>
                    <el-table-column label="部门" prop="sign_org" align="center"></el-table-column>
                    <el-table-column label="审核状态" prop="check_status_name" align="center"></el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination :total="expand_count" :current-page="expand_params.page" layout="total,prev,pager,next"
                      :page-size="expand_params.limit" @current-change="handleChangeExpandPage" style="text-align: center"></el-pagination>
                  </div>
                </div>
                <div class="info_type flex-center">
                  <span @click="handleCheckModule(item)" v-for="item in house_type" :key="item.id" :class="{'current-change': item.id === current_house_type}">{{
                    item.val }}</span>
                </div>
                <div class="expand-bottom">
                  <el-table header-row-class-name="tableHeader" :data="customer_list" v-show="current_house_type === 1">
                    <el-table-column label="客户姓名" prop="name" align="center"></el-table-column>
                    <el-table-column label="性别" prop="sex" align="center"></el-table-column>
                    <el-table-column label="录入时间" prop="created_at" align="center"></el-table-column>
                    <el-table-column label="证件号码" prop="idcard" align="center"></el-table-column>
                    <el-table-column label="手机号码" prop="phone" align="center"></el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="checkout_list" v-show="current_house_type === 2">
                    <el-table-column label="退租时间" prop="end_at" align="center"></el-table-column>
                    <el-table-column label="退房时间" prop="check_time" align="center"></el-table-column>
                    <el-table-column label="退款金额" prop="should_be_returned_fees" align="center"></el-table-column>
                    <el-table-column label="退房备注" prop="checkout_goods_remark" align="center"></el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="remeber_list" v-show="current_house_type === 3">
                    <el-table-column label="创建时间" prop="" align="center"></el-table-column>
                    <el-table-column label="合同编号" prop="" align="center"></el-table-column>
                    <el-table-column label="房屋地址" prop="" align="center"></el-table-column>
                    <el-table-column label="资料补齐时间" prop="" align="center"></el-table-column>
                    <el-table-column label="备忘内容" prop="" align="center"></el-table-column>
                    <el-table-column label="发送人" prop="" align="center"></el-table-column>
                    <el-table-column label="开单人" prop="" align="center"></el-table-column>
                    <el-table-column label="开单人部门" prop="" align="center"></el-table-column>
                    <el-table-column label="负责人" prop="" align="center"></el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="revisit_list" v-show="current_house_type === 4">
                    <el-table-column label="创建时间" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="回访人" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="合同编号" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="房屋地址" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="合同性质" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="是否接通" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="开单人" prop="cus_name" align="center"></el-table-column>
                    <el-table-column label="部门" prop="start_at" align="center"></el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="work_list" v-show="current_house_type === 5">
                    <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
                    <el-table-column label="房屋地址" prop="address" align="center"></el-table-column>
                    <el-table-column label="工单类型" prop="types" align="center"></el-table-column>
                    <el-table-column label="跟进事项" prop="matters" align="center"></el-table-column>
                    <el-table-column label="预计完成时间" prop="follow_time" align="center"></el-table-column>
                    <el-table-column label="创建人" prop="creator" align="center"></el-table-column>
                    <el-table-column label="跟进人" prop="creator" align="center"></el-table-column>
                    <el-table-column align="center" label="跟进状态">
                      <template slot-scope="scope">
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '已完成'" type="primary" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '处理中'" type="warning" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '待处理'" type="info" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <span v-if="!scope.row.follow_statuss">暂无</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="fix_clear_list" v-show="current_house_type === 6">
                    <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
                    <el-table-column label="客户姓名" prop="customer_name" align="center"></el-table-column>
                    <el-table-column label="回复电话" prop="customer_mobile" align="center"></el-table-column>
                    <el-table-column label="维修内容" prop="content" align="center"></el-table-column>
                    <el-table-column label="维修时间" prop="follow[0].repair_time" align="center"></el-table-column>
                    <el-table-column label="维修师傅" prop="follow[0].repair_master" align="center"></el-table-column>
                    <el-table-column label="跟进人" prop="followor.name" align="center"></el-table-column>
                    <el-table-column label="维修状态" prop="status" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.status === 336 ? '待处理' : scope.row.status === 337 ? '处理中' : scope.row.status
                          === 338 ? '已完成' : '未知'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table header-row-class-name="tableHeader" :data="work_list" v-show="current_house_type === 7">
                    <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
                    <el-table-column label="创建人" prop="creator" align="center"></el-table-column>
                    <el-table-column label="房屋地址" prop="address" align="center"></el-table-column>
                    <el-table-column label="来源" prop="address" align="center"></el-table-column>
                    <el-table-column label="报销类型" prop="types" align="center"></el-table-column>
                    <el-table-column label="报销金额" prop="types" align="center"></el-table-column>
                    <el-table-column label="开户行" prop="types" align="center"></el-table-column>
                    <el-table-column label="支行" prop="matters" align="center"></el-table-column>
                    <el-table-column label="银行卡号" prop="contract_number" align="center"></el-table-column>
                    <el-table-column label="开户人" prop="follow_time" align="center"></el-table-column>
                    <el-table-column label="结算人" prop="follow" align="center"></el-table-column>
                    <el-table-column align="center" label="报销状态">
                      <template slot-scope="scope">
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '已完成'" type="primary" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '处理中'" type="warning" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <el-button class="btnStatus" v-if="scope.row.follow_statuss === '待处理'" type="info" size="mini">
                          {{scope.row.follow_statuss}}
                        </el-button>
                        <span v-if="!scope.row.follow_statuss">暂无</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination :total="list_count" layout="total,prev,pager,next" :current-page="list_params.page"
                      style="text-align: center" :page-size="list_params.limit" @current-change="handleChangeListPage">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination :total="contractCount" layout="total,jumper,prev,pager,next" :current-page="params.page"
              :page-size="params.limit" @current-change="handleChangePage">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>

    <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
    <MenuList :module="show_market" :list="customService" :backdrop="true" @close="handleCloseMenu"></MenuList>

    <!--查看回访记录-->
    <lj-dialog :visible.sync="backInfo_visible" :size="{width: 600 + 'px',height: 500 + 'px'}" @close="handleCloseLookBackInfo">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ currentRow.house_name }}</h3>
          <div class="header_right">
            回访记录
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
<!--              <Upload :file="upload_file[idx]" @success="handleGetFile"></Upload>-->
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmPolishing">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelPolishing">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--合同详情-->
    <lj-dialog :visible.sync="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container contract-detail">
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>
              {{ contractDetail.contract_number }}
            </span>
            <el-button type="danger" :disabled="contractDetail.is_resign===1" size="mini" @click="handleRewrite" style="margin-left: 10px">{{contractDetail.is_resign?'重签中':'作废重签'}}</el-button>
          </div>
        </div>
        <div class="dialog_main">
          <p style="text-align: left">房屋信息</p>
          <!--收房 customer_info-->
          <div class="house-info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="物业地址">
                    <span :title="contractDetail.house_extension && contractDetail.house_extension.community && contractDetail.house_extension.community.detailed_address" class="form-item-content hide-text-elli">{{ contractDetail.house_extension && contractDetail.house_extension.community && contractDetail.house_extension.community.detailed_address || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span class="form-item-content">{{ contractDetail.house_extension && contractDetail.house_extension.community && contractDetail.house_extension.community.address || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span class="form-item-content">{{ contractDetail.house_extension && contractDetail.house_extension.cards && contractDetail.house_extension.cards.water_card_number || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电卡卡号">
                    <span class="form-item-content">{{ contractDetail.house_extension && contractDetail.house_extension.cards && contractDetail.house_extension.cards.electricity_card_number || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span class="form-item-content">{{ contractDetail.house_extension && contractDetail.house_extension.cards && contractDetail.house_extension.cards.gas_card_number || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>





          <p style="text-align: left">合同信息</p>
          <div class="house-address">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span class="form-item-content">{{ contractDetail.sign_at }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <div v-if="contractDetail.month_price && contractDetail.month_price.length > 0">
                      <span class="form-item-content" v-for="(item,key) in contractDetail.month_price" :key="key">
                        {{ item.price }}元 {{ item.period }}个月
                      </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span class="form-item-content">{{ contractDetail.sign_month && contractDetail.sign_month.moth_to_year }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金(元)">
                    <span class="form-item-content">{{ contractDetail.deposit_payed || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同开始时间">
                    <span class="form-item-content">{{ contractDetail.start_at || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同结束时间">
                    <span class="form-item-content">{{ contractDetail.end_at || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <!--mortgage_price-->
                    <span class="form-item-content">{{ contractDetail.mortgage_price || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span class="form-item-content">{{ contractDetail.pay_way }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="打房租日期">
                    <!--收有 租没-->
                    <!--"first_pay_at": "2017-12-25 00:00:00",//第一次打款日期-->
                    <!--"second_pay_at": "2018-03-25 00:00:00",//第二次打款日期-->
                    <span class="form-item-content" v-if="contractDetail.first_pay_at ">第一次：{{ contractDetail.first_pay_at || '/' }}</span><br>
                    <span class="form-item-content" v-if="contractDetail.second_pay_at">第二次：{{ contractDetail.second_pay_at || '/' }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="chooseTab === 1">
                  <el-form-item label="空置期">
                    <!--收有 租没-->
                    <span class="form-item-content">{{ contractDetail.ready_days || '/'}}</span>
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
                    <span class="form-item-content">{{ contractDetail.is_agency && contractDetail.is_agency === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道名称">
                    <span class="form-item-content">{{ contractDetail.agency_info && contractDetail.agency_info.agency_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道费">
                    <span class="form-item-content">{{ contractDetail.agency_info && contractDetail.agency_info.agency_price_now || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道人">
                    <span class="form-item-content">{{ contractDetail.agency_info && contractDetail.agency_info.agency_user_name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="contractDetail.is_agency && contractDetail.is_agency === 1">
                  <el-form-item label="渠道电话">
                    <span class="form-item-content">{{ contractDetail.agency_info && contractDetail.agency_info.agency_phone || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否公司合同">
                    <!--is_agency-->
                    <span class="form-item-content">{{ contractDetail.is_corp && contractDetail.is_corp === 1 ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款">
                    <span class="form-item-content">{{ contractDetail.remark_clause || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <!--sign_user-->
                    <span class="form-item-content">{{ contractDetail.sign_user || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <!--sign_org-->
                    <span class="form-item-content">{{ contractDetail.sign_org || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <div class="type">{{ currentRow.type }}</div>
          </div>

          <p v-if="chooseTab === 1" style="text-align: left">{{ chooseTab === 1 ? '收款账户' : '汇款账户'}}</p>
          <!--收 房东收款账户 pay_account_info  租 公司汇款账户money_table-->
          <div class="account_info" v-if="chooseTab === 1">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人">
                    <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.name || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号">
                    <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.account || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行">
                    <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.subbranch || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系">
                    <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.relationship || '/'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中国银行">
                    <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.bank || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left">签约人{{chooseTab==1?'及产权人':''}}信息</p>
          <!--收房 customer_info-->
          <div class="have_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <div v-for="item in contractDetail.customer_info">
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <span class="form-item-content">{{ item.name || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系方式">
                      <span class="form-item-content">{{ item.phone || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证号">
                      <span class="form-item-content">{{ item.idcard || '/'}}</span>
                    </el-form-item>
                  </el-col>
                </div>
              </el-row>
            </el-form>
          </div>


          <p v-if="chooseTab === 2" style="text-align: left">汇款账户</p>
          <div class="account_info" v-if="chooseTab === 2">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <!--<el-col :span="8">
                  <el-form-item label="已收金额类型">
                    <span class="form-item-content">定金</span>
                  </el-form-item>
                </el-col>-->
                <el-col :span="8">
                  <el-form-item label="总金额">
                    <span class="form-item-content">{{ contractDetail.money_sum || '/'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>


              <div v-for="item in contractDetail.money_table">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="金额(元)">
                      <span class="form-item-content">{{ item.money_sep || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="汇款账户">
                      <span class="form-item-content">{{ contractDetail.pay_account_info && contractDetail.pay_account_info.account || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实际收款时间">
                      <span class="form-item-content">{{ item.real_pay_at  || '/'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </el-form>
          </div>

          <p style="text-align: left">附件信息</p>
          <!--收房 -->
          <div class="other_info">
            <div style="text-align: right">
              <el-button type="danger" size="mini" @click="handleOpenPolishing(currentRow)">补齐资料</el-button>
            </div>
            <div v-if="contractDetail.album">
              <div class="flex-center" v-for="(item,index) in contractDetail.album" style="min-height: 80px">
                <div style="width: 10%;text-align: right;padding-right: 15px">{{ other_pictures[index] }}</div>
                <div style="width: 90%;text-align: left">
                  <lj-upload v-model="contractDetail.album[index]" :download="false" :disabled="true"></lj-upload>
                </div>
              </div>
            </div>
          </div>

          <p style="text-align: left">相关合同</p>
          <div>暂无数据...</div>
          <!--<div class="have_info" v-if="contractDetail.related_contract && contractDetail.related_contract.length > 0">
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
          <div v-else>暂无</div>-->
        </div>
      </div>
    </lj-dialog>

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

    <!--添加标记-->
    <lj-dialog :visible="add_mark_visible" :size="{width: 450 + 'px',height: 500 + 'px'}" @close="handleCancelMark">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{add_or_edit_mark==1?'添加标记':'修改标记'}}</h3>
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
              <lj-upload size="50" style="position: absolute;top: -13px;" :limit-easy="['image']" v-model="mark_form.album"></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitMark">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelMark">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--审核详情-->
    <lj-dialog :visible.sync="check_visible" :size="{width: 700 + 'px',height: 500 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">审核详情</div>
        <div class="dialog_main">
          <div class="back_info scroll_bar">
            <div>
              <div class="content flex" v-for="(item,key) in check_info">
                <div>
                  <a>{{ item.create.name || '无' }}</a><br>
                  <span>{{ item.created_at }}</span>
                </div>
                <div class="flex-center">
                  <div class="circle flex-center">
                    <a></a>
                  </div>
                  <div class="line" v-if="key !== check_info.length -1"></div>
                </div>
                <div>
                  <p :title="item.remark" style="margin-bottom: 5px">{{ substringPlugin(item.remark,13) }}</p>
                  <p>发送对象:{{item.receive && item.receive.name || '--'}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="check_visible = false">确定</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue';
import MarketMenuList from '../../marketCentre/components/market-menu-list.vue';
import MenuList from '../../common/menuList.vue';
import { customService } from '../../../assets/js/allModuleList.js';
import { contractManagementSearch } from '../../../assets/js/allSearchData.js';

export default {
  name: "index",
  components: { SearchHigh, MarketMenuList, MenuList },
  data () {
    return {
      current_house_type: 1,
      contractManagementSearch,
      house_type: [
        {
          id: 1,
          val: '客户信息'
        },
        {
          id: 2,
          val: '退房记录'
        },
        {
          id: 3,
          val: '资料备忘'
        },
        {
          id: 4,
          val: '回访记录'
        },
        {
          id: 5,
          val: '工单'
        },
        {
          id: 6,
          val: '维修单'
        },
        {
          id: 7,
          val: '报销单'
        },
      ],
      activeName: 'first',

      customService,
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
      //添加标记
      add_mark_visible: false,
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

      show_control: '',
      current_choose_control: '',
      choose_list: [
        { id: 1, val: '审核记录' },
        { id: 2, val: '回访记录' },
        { id: 3, val: '添加标记' },
      ],
      add_or_edit_mark:1,//添加还是修改标记  1为添加,2为修改

      //作废重签
      rewrite_visible: false,
      rewrite_note: '',

      //合同详情
      contract_detail_visible: false,
      contractDetail: {},

      //资料补齐
      upload_file: {},
      currentRow: '',
      data_polishing_visible: false,
      polishing_params: {},

      polishing_data_form: {
        property_number:'',//房产证号
        mound_number:'',//丘号
        complete_content:{},//补齐资料
      },
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
      //查看回访记录
      backInfo_visible: false,
      backInfo: [
        {
          uid: 1111,
          star: 4,
          time: '2019-02-01',
          record: '已回访',
          add_user: '张三'
        }
      ],

      show_market: false,

      url: globalConfig.market_server,
      selects: [
        {
          id: 1,
          title: '收房'
        },
        {
          id: 2,
          title: '租房'
        },
        {
          id: 3,
          title: '综合页'
        }
      ],
      chooseTab: 1,

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
      contractList: [],
      contractCount: 0,

      highVisible: false, //高级
      searchData: {},

      //审核信息
      check_info: [],
      check_visible: false,

      expand_params: {
        page: 1,
        limit: 15,
        contract_type: 2,
        house_id: ''
      },
      expand_data: [],
      expand_count: 0,

      list_params: {
        type: 3,
        page: 1,
        limit: 15,
        address: '',
        collect_or_rent: 1,
        contract_id: '',
      },
      customer_list: [],
      list_count: 0,
      checkout_list: [],

      revisit_params: {
        page: 1,
        limit: 15,
        type: 1
      },
      revisit_list: [],
      revisit_count: 0,

      work_order: {
        type: 0,
        page: 1,
        limit: 15
      },
      work_list: [],

      fix_clear: {
        type: 7,
        page: 1,
        limit: 15
      },
      fix_clear_list: [],
      leaseNote_list: [],
      leaseNote_params: {
        page: 1,
        limit: 15,
        collect_or_rent: 1,
        contract_id: ''
      },
      remeber_list: [],
    }
  },
  mounted () {
    this.getContractList();
  },
  watch: {},
  computed: {},
  methods: {
    handleGetLeaseNote () {
      this.$http.get(this.url + 'v1.0/market/leaseNote', this.leaseNote_params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.remeber_list = res.data.data;
          this.list_count = res.data.count;
        } else {
          this.remeber_list = [];
          this.list_count = 0;
        }
      })
    },

    handleGetFixClearList () {
      this.$http.get(this.url + 'v1.0/csd/work_order', this.fix_clear).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.fix_clear_list = res.data.data;
          this.list_count = res.data.all_count;
        } else {
          this.fix_clear_list = [];
          this.list_count = 0;
        }
      })
    },
    handleGetWorkOrderList () {
      this.$http.get(this.url + 'v1.0/csd/work_order', this.work_order).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.work_list = res.data.data;
          this.list_count = res.data.all_count
        } else {
          this.work_list = [];
          this.list_count = 0;
        }
      })
    },
    handleGetRevisitList () {
      this.$http.get(this.url + 'v1.0/csd/revisit', this.revisit_params).then(res => {
        if (res.code === 200) {
          this.revisit_list = res.data.data;
          this.revisit_count = res.data.count;
        } else {
          this.revisit_list = [];
          this.revisit_count = 0;
        }
      })
    },
    handleClickExpandRow (row) {
      this.list_params.contract_id = row.contract_id;
      this.expand_params.house_id = row.house_id;
      this.leaseNote_params.contract_id = row.contract_number;
      this.revisit_params.type = row.contract_type;
      this.list_params.address = row.house_name;
      this.handleGetCustomerInfo();
    },
    handleCheckOutList () {
      this.$http.get(this.url + 'v1.0/market/checkOut', this.list_params).then(res => {
        if (res.code === 200) {
          this.checkout_list = res.data.data;
          this.list_count = res.data.all_count;
        } else {
          this.checkout_list = [];
          this.list_count = 0;
        }
      })
    },
    handleChangeListPage (page) {
      this.list_params.page = page;
      switch (this.current_house_type) {
        case 1:
          this.list_params.page = page;
          this.handleGetCustomerInfo();
          break;
        case 2:
          this.list_params.page = page;
          this.handleCheckOutList();
          break;
        case 3:
          this.leaseNote_params.page = page;
          this.handleGetLeaseNote();
          break;
        case 4:
          this.revisit_params.page = page;
          this.handleGetRevisitList();
          break;
        case 5:
        case 7:
          this.work_order.page = page;
          this.handleGetWorkOrderList();
          break;
        case 6:
          this.fix_clear.page = page;
          this.handleGetFixClearList();
          break;
      }
    },
    handleGetCustomerInfo () {
      this.$http.get(this.url + 'v1.0/market/customer', this.list_params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.customer_list = res.data.data;
          this.list_count = res.data.count;
        } else {
          this.customer_list = [];
          this.list_count = 0;
        }
      })
    },
    handleChangeExpandPage (page) {
      this.expand_params.page = page;
      this.getExpandData();
    },
    handleCheckModule (item) {
      this.current_house_type = item.id;
      switch (item.id) {
        case 1:
          this.handleGetCustomerInfo();
          break;
        case 2:
          this.handleCheckOutList();
          break;
        case 3:
          // this.leaseNote_params.contract_id = item.
          this.handleGetLeaseNote();
          break;
        case 4:
          this.handleGetRevisitList();
          break;
        case 5:
          this.work_order.type = 0;
          this.handleGetWorkOrderList();
          break;
        case 6:
          this.handleGetFixClearList();
          break;
        case 7:
          this.work_order.type = 1;
          this.handleGetWorkOrderList();
          break;
      }
    },
    //获取展开行数据
    getExpandData () {
      this.$http.get(this.url + 'v1.0/market/contract', this.expand_params).then(res => {
        if (res.code === 200) {
          this.expand_data = res.data.data;
          this.expand_count = res.data.count;
        } else {
          this.expand_data = [];
          this.expand_count = 0;
        }
      })
    },
    //展开某一行
    handleExpandRow (row) {
      this.list_params.contract_id = row.contract_id;
      this.expand_params.house_id = row.house_id;
      this.leaseNote_params.contract_id = row.contract_number;
      this.revisit_params.type = row.contract_type;
      this.list_params.address = row.house_name;
      this.getExpandData();
      this.handleGetCustomerInfo();
    },
    //相关合同label
    contractLabel (item) {
      return item.type === 1 ? `新收合同(${item.is_invalid === 0 ? '正常' : '作废'})` : `续收合同(${item.is_invalid === 0 ? '正常' : '作废'})`;
    },
    handleCloseDetail () {
      this.contractDetail = {};
      this.contract_detail_visible = false;
    },
    handleCancelMark () {
      for (let key in this.mark_form) {
        this.mark_form[key] = '';
      }
      this.mark_form.album = [];
      this.add_mark_visible = false;
    },
    handleSubmitMark () {
      if(this.add_or_edit_mark==1) {//添加标记
        this.$http.post(this.url + `v1.0/market/contract/tag/${this.chooseTab}/${this.currentRow.contract_id}`, this.mark_form).then(res => {
          //console.log(res);
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
      }else  {//修改标记
        let tag_id = this.currentRow.is_tag;
        this.$http.put(`${this.url}v1.0/market/contract/tag/${tag_id}`,this.mark_form).then(res=> {
          this.$LjMessageEasy(res,()=> {
            this.handleCancelMark();
            this.getContractList();
          });
        });
      }

    },
    chooseMarkRadio (item) {
      this.mark_form.tag_status = item.id;
    },
    handleCloseLookBackInfo () {
      this.currentRow = '';
      this.backInfo = '';
      this.backInfo_visible = false;
    },
    handleClickSpan (item, row,isEdit) {//isEdit  是否为修改标记
      this.add_or_edit_mark=!isEdit?1:2;
      this.currentRow = row;
      this.current_choose_control = item.id;
      switch (item.id) {
        case 1:
          this.$http.get(this.url + `v1.0/market/contract/${this.chooseTab}/${row.contract_id}`).then(res => {
            if (res.code === 200) {
              console.log(res);
              if (res.data.checkout_remark && res.data.checkout_remark.length > 0) {
                this.check_info = res.data.checkout_remark;
                this.check_visible = true;
              } else {
                this.check_info = [];
                this.$LjNotify('warning', {
                  title: '提示',
                  message: '暂无审核记录'
                });
                return false;
              }
            } else {
              this.check_info = [];
              this.$LjNotify('warning', {
                title: '提示',
                message: '获取审核记录失败'
              });
              return false;
            }
          });
          break;
        case 2:
          if (row.record) {
            this.backInfo = row.record;
            this.backInfo_visible = true;
          } else {
            this.$LjNotify('warning', {
              title: '警告',
              message: '暂无回访信息'
            })
          }
          break;
        case 3:

          if(isEdit) {//为修改标记
            let id  = row.is_tag;//tagid
            this.$http.get(`${this.url}v1.0/market/contract/tagdetail/${id}`).then(res=> {
              if(res.code==200) {
                this.mark_form = res.data;
                this.$nextTick(()=> {
                  this.add_mark_visible = true;
                });
              }
            });
          }else {
            this.add_mark_visible = true;
          }

          break;
      }
    },
    //重签确认
    handleSubmitRewrite () {
      let params = {
        note:this.rewrite_note,
        contract_type:this.currentRow.contract_type,
        contract_id: this.currentRow.contract_id
      };

      this.$http.post(this.url + `v1.0/market/contract/e-contract-resign/${this.contractDetail.contract_number}`, params).then(res => {
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
    handleCancelRewrite () {
      this.rewrite_note = '';
      this.rewrite_visible = false;
    },
    handleRewrite () {
      this.rewrite_visible = true;
    },
    //双击详情
    handleGetDetail (row) {
      this.currentRow = row;
      if(!this.validatePermission('Contract-Operate')) return;
      // this.$http.get(this.url + `v1.0/market/contract/${this.chooseTab}/9397`).then(res => {
      this.$http.get(this.url + `v1.0/market/contract/${row.contract_type}/${row.contract_id}`).then(res => {
        if (res.code === 200) {
          this.contractDetail = res.data;
          if(this.contractDetail.house_extension?.community) {
            this.contractDetail.house_extension.community = JSON.parse(this.contractDetail.house_extension?.community);
          }
          if(this.contractDetail.house_extension?.cards) {
            this.contractDetail.house_extension.cards = JSON.parse(this.contractDetail.house_extension?.cards);
          }
          //遍历图片生成需要的格式
          /*if(this.contractDetail.album&&Object.keys(this.contractDetail.album).length>0) {
            _(this.contractDetail.album).forEach((val,key)=>{
              album[key] = Object.keys(val);
            });
          }*/
          this.contract_detail_visible = true;
        } else {
          this.contractDetail = '';
        }
      })
    },
    handleConfirmPolishing () {
      if (!this.polishing_data_form.property_number) {
        this.$LjNotify('warning',{
          title: '警告',
          message: '请输入房产证号'
        });
        return false;
      }
      if (!this.polishing_data_form.mound_number) {
        this.$LjNotify('warning',{
          title: '警告',
          message: '请输入丘号'
        });
        return false;
      }
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

      this.$http.post(this.url + `v1.0/market/contract/${this.chooseTab}/${this.currentRow.contract_id}`, this.polishing_data_form).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelPolishing();
          //this.getContractList();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
    },
    //取消补齐
    handleCancelPolishing () {
      this.polishing_data_form= {
        property_number:null,//房产证号
          mound_number:null,//丘号
          complete_content:{},//补齐资料
      };
      // this.currentRow = '';
      this.data_polishing_visible = false;
    },
    handleGetFile (item) {
      if (item !== 'close') {
        this.polishing_params[item[0]] = item[1];
      }
    },
    selfLabel (idx) {
      return this.polishing_data[this.chooseTab - 1][idx];
    },
    /*打开补齐资料对话框*/
    handleOpenPolishing (row) {
      this.currentRow = row;
      this.$http.get(`${this.url}v1.0/market/contract/album/${this.chooseTab}/${this.currentRow.contract_id}`).then(res=> {
        if(res.code == 200) {
          //this.polishing_data_form.property_number = res.data.property_number||null;
          //this.polishing_data_form.mound_number = res.data.mound_number||null;
          //this.polishing_data_form.complete_content = res.data.mound_number||{};
          this.polishing_data_form = res.data;
          this.data_polishing_visible = true;
        }
      });


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
    },
    handleCloseMenu () {
      this.show_market = false;
    },
    //获取合同列表
    getContractList () {
      if(!this.validatePermission('Contract-Read')) return;
      this.showLoading(true);
      this.$http.get(this.url + 'v1.0/market/contract', this.params).then(res => {
        if (res.code === 200) {
          res.data.data.forEach((o)=> {
            let check_status_name = '';
            switch (o.check_status) {
              case 'waiting':
                check_status_name = '待提交';
                break;
              case 'pending':
                check_status_name = '待审核';
                break;
              case 'published':
                check_status_name = '已完成';
                break;
              default:
                check_status_name = '已完成';
                break;
            }
            o.check_status_name = check_status_name;
          });
          this.contractList = res.data.data;
          this.contractCount = res.data.count;
        } else {
          this.contractList = [];
          this.contractCount = 0;
        }
        this.showLoading(false);
      })
    },
    //打开高级
    handleOpenHigh () {
      this.searchData=this.contractManagementSearch;
      if(this.chooseTab == 1) {
        this.searchData.data[1].value=[
                { id: 1, title: '新收' },
                { id: 2, title: '续收' }
            ];
      } else {
        this.searchData.data[1].value=[
                { id: 1, title: '新租' },
                { id: 2, title: '转租' },
                { id: 3, title: '续租' },
                /*{ id: 4, title: '未收先租' },*/
                { id: 5, title: '调租' },
            ]
      }
      // this.searchData = {
      //   status: 'contractManagement',
      //   keywords: 'search',
      //   placeholder: '地址/合同编号',
      //   data: [
      //     {
      //       keyType: 'dateRange',
      //       title: '签约时间',
      //       placeholder: '请选择日期',
      //       keyName: 'date1',
      //       dataType: [],
      //     },
      //     {
      //       keyType: 'radio',
      //       title: '合同性质',
      //       keyName: 'type',
      //       dataType: '',
      //       value: this.chooseTab === 1 ? [
      //         { id: 1, title: '新收' },
      //         { id: 2, title: '续收' }
      //       ] : [
      //           { id: 1, title: '新租' },
      //           { id: 2, title: '转租' },
      //           { id: 3, title: '续租' },
      //           /*{ id: 4, title: '未收先租' },*/
      //           { id: 5, title: '调租' },
      //         ]
      //     },
      //     {
      //       keyType: 'dateRange',
      //       title: '合同开始时间周期',
      //       placeholder: '请选择日期',
      //       keyName: 'date2',
      //       dataType: [],
      //     },
      //     {
      //       keyType: 'dateRange',
      //       title: '合同结束时间周期',
      //       placeholder: '请选择日期',
      //       keyName: 'date3',
      //       dataType: [],
      //     },
      //     {
      //       keyType: 'staff',
      //       title: '开单人',
      //       placeholder: '请选择开单人',
      //       keyName: 'signer',
      //       dataType: '',
      //       value: {
      //         num: 1,
      //       }
      //     },
      //     {
      //       keyType: 'depart',
      //       title: '部门',
      //       placeholder: '请选择部门',
      //       keyName: 'org',
      //       dataType: [],
      //       value: {
      //         num: 1,
      //         arr: []
      //       }
      //     }
      //   ]
      // };
      this.highVisible = true;
    },
    changeTabs (id) {
      this.chooseTab = id;
      this.params.contract_type = id;
      this.getContractList();
    },
    handleChangePage (page) {
      this.params.page = page;
      this.getContractList();
    },

    //高级
    handleCloseHigh (val) {
      if (val !== 'close') {
        this.params.sign_date_min = val.date1 && val.date1.length > 0 ? val.date1[0] ? val.date1[0] : '' : '';
        this.params.sign_date_max = val.date1 && val.date1.length > 0 ? val.date1[1] ? val.date1[1] : '' : '';
        this.params.start_date_min = val.date2 && val.date2.length > 0 ? val.date2[0] ? val.date2[0] : '' : '';
        this.params.start_date_max = val.date2 && val.date2.length > 0 ? val.date2[1] ? val.date2[1] : '' : '';
        this.params.end_date_min = val.date3 && val.date3.length > 0 ? val.date3[0] ? val.date2[0] : '' : '';
        this.params.end_date_max = val.date3 && val.date3.length > 0 ? val.date3[1] ? val.date2[1] : '' : '';
        this.params.signer = val.signer && val.signer[0] ? val.signer[0] : '';
        this.params.type = val.type && val.type;
        this.params.org =val.org;
        this.params.search = val.search;
        this.getContractList();
      }
      // this.params=val;
      this.highVisible = false;
    },
  },
}
</script>



<style lang="scss">
  #theme_name {
    #contractManagement {
      .contract-detail {
        .house-info {
          .el-col.el-col-8 {
            height: 62px;
          }
        }

        .el-form-item__label {
          color: #B0B0B0;
        }
      }
    }

  }

</style>



<style lang="scss" scoped>
@import "../../../assets/scss/marketCentre/contractManagement/index.scss";

@mixin contractManagementImg($m, $n) {
  $url: "../../../assets/image/marketCentre/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #contractManagement {
    > div {
      .info_type {
        > span {
          color: #808080;
          @include contractManagementImg("xzgj.png", "theme1");
        }
        .current-change {
          @include contractManagementImg("hongdi.png", "theme1");
          color: white;
        }
      }
      .control_container {
        span:hover {
          color: $colorE33;
          @include bgImage("../../../assets/image/components/theme1/xzgj.png");
        }
      }
    }
  }
}
</style>
