<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建工单</h3>
        </div>
        <div class="dialog_main" id='addOrder_dialog'>
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='createOrder_span'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder.house_name'></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon type'></i><span>工单类型</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.type" placeholder="请选择">
                    <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon comtype'></i><span>投诉类型</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.complain_type" placeholder="请选择">
                    <el-option v-for="item in complaintsType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon tsqd'></i><span>投诉渠道</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.complain_channel" placeholder="请选择">
                    <el-option v-for="item in complaintsChannels" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon handler'></i><span>被投诉人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('complained_user')" readonly v-model="createOrder.complained_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 1'>
                <p class='el-col-p'><i class='icon handler'></i><span>报销人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('reimburse_user')" readonly v-model="createOrder.reimburse_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('operate_user')" readonly v-model="createOrder.operate_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerDepart('operate_org')" readonly v-model="createOrder.operate_org.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model.tel='createOrder.replay_phone'></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon status'></i><span>紧急程度</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type != 1'>
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder.next_follow_time" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择跟进时间"></el-date-picker>
                </div>
              </el-col>

              <el-col :span='createOrder_span'>
                <p class='el-col-p'><i class='icon content'></i>工单内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="createOrder.content"></el-input>
                </div>
              </el-col>

              <el-col :span='12' v-for='(item,index) in createOrder.reimburse' :key='"feiyong" + index' v-if='createOrder.type == 1'>
                <el-row :gutter="8" class='feiyong'>
                  <el-col :span="12">
                    <p class='el-col-p'><i class='icon comtype'></i><span>报销类型</span></p>
                    <div class='input_box'>
                      <el-select v-model="item.type" placeholder="请选择" @change="chosenComplaintsType">
                        <el-option v-for="(exp,idex) in expenseType" :key="exp.value" :label="exp.label" :value="exp.value"
                          :disabled="expenseTypeDisable.indexOf(exp.value) > -1">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <p class='el-col-p'><i class='icon commoney'></i><span>报销金额</span></p>
                    <div class='input_box'>
                      <el-input v-model="item.money" placeholder="请输入"></el-input>
                      <i class='icons icon_add' v-if='index== 0' @click='addComplaintsType'></i>
                      <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
                    </div>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 1'>
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder.next_follow_time" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择跟进时间">
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span='createOrder_span'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='createOrder.album'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div :class='{"el-box":true,"el-box-active":addOrderChosen == option.id}' v-for='option in addOrderChosen_options'
                  @click='chosenOptions(option.id)' :key='option.id'>
                  <p>{{option.title}}</p>
                </div>
              </el-col>
              <el-col :span='22' class='el-col-content'>
                <div class='content-top' v-if='addOrderChosen == 1'>
                  <div class='info_search'>
                    <i class='icon'></i>
                    <div class='el-input'>
                      <input type="text" placeholder="地址/合同编号/手机号/客户姓名" class="el-input__inner" v-model="customer_search"
                        v-on:keyup.enter='addOrder_search'>
                    </div>

                  </div>
                  <ul v-if='show_Contract_Detail'>
                    <li v-for='item in seeRecord' :key='item.label' :class="[seeRecord_status == item.value ?'active_record':'']"
                      @click='chosenActiveRecord(item.value)'>{{item.label}}</li>
                  </ul>
                </div>
                <!-- 客户信息 -->
                <div class='custmer_info' v-if='addOrderChosen == 1 && !customer_info.contract_Detail'>
                  <div class='nothing' v-if='customer_info.count == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='custmer_content' v-for='info in customer_info.data' :key='info.id'>
                      <el-radio v-model="chosenCustomer" :label="info" @change="changeCustmInfo">
                        <el-row width='100%'>
                          <el-col :span='index<2? 6:(index<4?3:6)' v-for='(item,index) in custmer_showInfo' :key='item.value'>
                            <span class='tit'>{{item.title}}</span>
                            <span class='content_tit'>{{info[item.value] || '--'}}</span>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCustomerChange" :current-page="customer_info.page" layout="total,  prev, pager, next, jumper"
                    :total="customer_info.count" v-if='customer_info.count > 0'>
                  </el-pagination>
                </div>

                <!-- 合同信息 -->
                <el-row :gutter="10" class='detail_contract' v-if='addOrderChosen == 1 && show_Contract_Detail'>
                  <el-col :span="6" class='detail_col el-border'>
                    <h5>客户信息</h5>
                    <div class='detail_col_box detail_col_box2' width='100%' v-for='info in customer_info.contract_Detail.customer_info'
                      :key='info.phone'>
                      <div v-for='item in Object.keys(contract_showInfo[0])' :key='item'>
                        <span class='tit'>{{contract_showInfo[0][item]}}</span>
                        <span class="content_tit">{{info[item]|| '--'}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span='12' class='detail_col el-border'>
                    <h5>合同信息</h5>
                    <el-row :gutter="10" class='detail_col_box'>
                      <el-col :span='12'>
                        <div v-for='item in Object.keys(contract_showInfo[1])' :key='item'>
                          <span class='tit'>{{contract_showInfo[1][item]}}</span>
                          <span class="content_tit" v-if='item == "sign_month"'>{{customer_info.contract_Detail[item].moth_to_year
                            || '--'}}</span>
                          <span class="content_tit" v-else>{{customer_info.contract_Detail[item]|| '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>合同照片</span>
                          <p class='content_tit'>
                            <img :src="img.uri" alt="" v-for='img in customer_info.contract_Detail.album.photo' :key='img.id'
                              data-magnify="" data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span='12'>
                        <div v-for='item in Object.keys(contract_showInfo[2])' :key='item'>
                          <span class='tit'>{{contract_showInfo[2][item]}}</span>
                          <span class="content_tit">{{customer_info.contract_Detail[item] || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>收费价格</span>
                          <span class="content_tit">{{customer_info.contract_Detail.month_price[0].price || '--' +
                            "元"}}</span>
                        </div>
                        <div>
                          <span class='tit'>合同状态</span>
                          <span class="content_tit">{{customer_info.contract_Detail | contractStatusFormate}}</span>
                        </div>
                        <div>
                          <span class='tit'>回访状态</span>
                          <span class="content_tit">{{customer_info.contract_Detail.is_connect ?'已回访':'未回访'}}</span>
                        </div>
                        <div>
                          <span class='tit'>其他附件</span>
                          <div class='content_tit content_album'>
                            <div v-for='(item,key) in customer_info.contract_Detail.album' class='imgs_box' v-if='key !="photo"'>
                              <p>{{dataAblum[key]}}</p>
                              <div v-if='item'>
                                <img :src="img.uri" alt="" v-for='img in item' :key='img.id' data-magnify=""
                                  data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span='6' class='detail_col'>
                    <h5>房屋信息</h5>
                    <div>
                      <span class='tit'>房屋地址</span>
                      <span class="content_tit" v-if='customer_info.contract_Detail.house_extension'>{{customer_info.contract_Detail.house_extension.address
                        || '--'}}</span>
                      <span class="content_tit" v-else>--</span>
                    </div>
                  </el-col>
                  <el-col :span='6' class='detail_col' v-if='customer_info.contract_Detail.is_agency == 1'>
                    <h5>中介信息</h5>
                    <div class='detail_col_box  detail_col_box2'>
                      <div>
                        <span class='tit'>中介名称</span>
                        <span class="content_tit" v-if='customer_info.contract_Detail.agency_info'>{{customer_info.contract_Detail.agency_info.agency_name
                          || '--' }}</span>
                        <span class="content_tit" v-else>--</span>
                      </div>
                      <div>
                        <span class='tit'>中介价格</span>
                        <span class="content_tit" v-if='customer_info.contract_Detail.agency_info'>{{customer_info.contract_Detail.agency_info.agency_price_now
                          || '--' +
                          "元"}}</span>
                        <span class="content_tit" v-else>--</span>
                      </div>
                      <div>
                        <span class='tit'>中介姓名</span>
                        <span class="content_tit" v-if='customer_info.contract_Detail.agency_info'>{{customer_info.contract_Detail.agency_info.agency_user_name
                          || '--'}}</span>
                        <span class="content_tit" v-else>--</span>
                      </div>
                      <div>
                        <span class='tit'>中介电话</span>
                        <span class="content_tit" v-if='customer_info.contract_Detail.agency_info'>{{customer_info.contract_Detail.agency_info.agency_phone
                          || '--'}}</span>
                        <span class="content_tit" v-else>--</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <!--  历史工单 -->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 2'>
                  <div class='nothing' v-if='history_info.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content' v-for='history in history_info.data' :key='history.id'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          {{history.content}}
                        </p>
                        <span class='status1'>{{history.follow_name}}</span>
                      </div>
                      <div class='order_content_box'>
                        <p class='order_title2'>
                          <span>{{history.type_name}}工单</span>
                          {{history.next_follow_time}}
                        </p>
                        <span v-if='history.type == 697 && history.follow_status == 338'>报销金额 {{'￥'+
                          history.reimburse_money}}</span>
                        <span v-else-if='history.type == 697 && history.follow_status == 338'>已结束维修</span>
                        <span v-else-if='history.follow_status != 338'>处理中</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleHistoryChange" :current-page="history_info.page" layout="total,  prev, pager, next, jumper"
                    :total="history_info.dataCount" v-if='history_info.dataCount > 0'>
                  </el-pagination>
                </div>
                <!-- 来电记录 -->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 3'>
                  <div class='nothing' v-if='temporaryRecord.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content  order_content2' v-for='temp in temporaryRecord.data' :key='temp.id'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          {{temp.content}}
                        </p>
                        <span class='status1'>{{temp.follow_time}}</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleTemporayChange" :current-page="temporaryRecord.page" layout="total,  prev, pager, next, jumper"
                    :total="temporaryRecord.dataCount" v-if='temporaryRecord.dataCount > 0'>
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>

    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan" />
    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart" />

    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd' />
    <!-- 财务记录 -->
    <FinancialDialog :visible='financial_visible' :moduleData='record_data' @close='handkeCloseFinancial' />
    <!-- 报销记录 -->
    <ExpenseDialog :visible='expense_visible' :moduleData='record_data' @close='handkeCloseExpense' />
    <!-- 回访记录 -->
    <RecordeDialog :visible="record_visible" :moduleData='record_data' @close="handleCloserecord" />
    <!-- 退租记录 -->
    <WithoutDialog :visible="without_visible" :moduleData='record_data' @close="handkeCloseWithout" />
  </div>
</template>

<script>
import LjDialog from '../../../common/lj-dialog.vue';
import StaffOrgan from '../../../common/staffOrgan.vue'
import DepartOrgan from '../../../common/departOrgan';
import Ljupload from '../../../common/lightweightComponents/lj-upload'
import AddDialog from '../../components/add-dialog';
import RecordeDialog from '../../components/recorde-dialog';
import WithoutDialog from '../../components/without-dialog';
import ExpenseDialog from '../../components/expense-dialog';
import FinancialDialog from '../../components/financial-dialog';
export default {
  props: ['visible'],
  components: {
    LjDialog,
    StaffOrgan,
    DepartOrgan,
    Ljupload,
    AddDialog,
    RecordeDialog,
    WithoutDialog,
    ExpenseDialog,
    FinancialDialog,
  },
  data () {
    return {
      add_visible: false,
      departModule: false, //部门选择
      departData: {
        dataType: '',
        num: 1,
      },
      staffModule: false, // 选择人员
      organData: {
        num: 1
      },
      createOrder_span: 8,
      createOrder: {
        house_id: '',
        house_name: '', //房屋名称
        type: '',  // 工单类型
        operate_user: { // 处理人
          id: '',
          name: '',
        },
        operate_org: { // 处理部门 
          id: '',
          name: ''
        },
        replay_phone: '', // 回复电话
        emergency: '', // 紧急程度
        next_follow_time: '', //跟进时间
        content: '', // 工单内容
        album: [], //上传图片
        complain_type: '', // 投诉类型
        complain_channel: '', //投诉渠道
        complained_user: { // 被投诉人
          id: '',
          name: ''
        },
        reimburse_user: { //报销人
          id: '',
          name: ''
        },
        reimburse: [ //报销明细
          {
            type: '',
            money: ''
          }
        ]
      },
      orderType: [
        {
          label: '报销',
          value: 1
        },
        {
          label: '核实信息',
          value: 2
        },
        {
          label: '催缴',
          value: 3
        },
        {
          label: '续租',
          value: 4
        },
        {
          label: '调房',
          value: 5
        },
        {
          label: '退租',
          value: 6
        },
        {
          label: '报修',
          value: 697
        },
        {
          label: '转租',
          value: 698
        },
        {
          label: '投诉',
          value: 699
        },
        {
          label: '其他',
          value: 700
        }
      ],
      expenseType: [
        {
          label: '水费',
          value: 1,
        },
        {
          label: '电费',
          value: 2
        },
        {
          label: '燃气',
          value: 3
        },
        {
          label: '物业费',
          value: 4
        },
        {
          label: '维修费',
          value: 5
        },
        {
          label: '其他',
          value: 6
        }
      ],
      expenseTypeDisable: [],
      addOrderChosen: 1,  // 新建工单 客户信息 历史工单 来电记录
      addOrderChosen_options: [
        {
          title: '客户信息',
          id: 1
        }, {
          title: '历史工单',
          id: 2
        }, {
          title: '来电记录',
          id: 3
        }
      ],
      customer_search: '', // 新建工单模糊搜索
      customer_info: {
        page: 1,
        limit: 5,
        count: 0,
        data: [],
        contract_Detail: null
      },
      custmer_showInfo: [ // 模糊搜 客户信息
        {
          title: '房屋地址',
          value: 'house_name'
        },
        {
          title: '合同编号',
          value: 'contract_id'
        },
        {
          title: '姓名',
          value: 'name'
        }, {
          title: '性质',
          value: 'customer_type'
        }, {
          title: '电话',
          value: 'phone'
        }
      ],
      history_info: { //历史工单
        page: 1,
        dataCount: 0,
        data: []
      },
      temporaryRecord: {  // 来电记录
        page: 1,
        dataCount: 0,
        data: []
      },
      contract_showInfo: [
        {
          name: '姓名',
          sex: '性别',
          type: '性质',
          phone: '手机号',
          idcard: '身份证号'

        },
        {
          sign_user: '签约人',
          org_leader: '负责人',
          contract_number: '合同编号',
          sign_at: '签约时间',
          sign_month: '合约时长'
        },
        {
          sign_org: '部门',
          pay_way: '付款方式',
        }
      ],
      seeRecord: [
        {
          label: '回访记录',
          value: 1,
        },
        {
          label: '财务记录',
          value: 2,
        }, {
          label: '退租记录',
          value: 3,
        }, {
          label: '报销记录',
          value: 4,
        }
      ],
      dataAblum: {
        identity_photo: '证件照片',
        bank_photo: '银行卡照片',
        photo: '合同照片',
        water_photo: '水表照片',
        electricity_photo: '电表',
        gas_photo: '气表照片',
        checkin_photo: '交接单照片',
        auth_photo: '委托书照片',
        deposit_photo: '押金照片',
        promise: '承诺书照片',
        property_photo: '房产证',
        water_card_photo: '水卡',
        electricity_card_photo: '电卡',
        gas_card_photo: '气卡'
      },
      complaintsType: [ //投诉类型
        {
          label: 'A类原则性投诉',
          value: 1
        },
        {
          label: 'B类重大投诉',
          value: 2
        },
        {
          label: 'C类一般性投诉(被动)',
          value: 3
        },
        {
          label: 'D类一般性投诉(主动)',
          value: 4
        },
      ],
      complaintsChannels: [
        {
          label: '400客服',
          value: 1
        },
        {
          label: '回访',
          value: 2
        },
        {
          label: '微信',
          value: 3
        },
        {
          label: '微博',
          value: 4
        },
        {
          label: '贴吧',
          value: 5
        }
      ],
      chosenCustomer: null, // 当前选中的
      show_Contract_Detail: false, // 合同详情
      seeRecord_status: 0, // 当前记录查看type
      currentStaff: null,// 当前人员类型
      currentIndex: null, // 当前认责index
      currentOrgL: null, // 当前部门
      financial_visible: false, // 财务记录
      expense_visible: false,  //报销记录
      record_visible: false, // 回访记录
      record_data: {},   // 参数
      without_visible: false, // 退租记录
      market_server: globalConfig.market_server,
    }
  },
  filters: {
    contractStatusFormate (item) {
      const { start_at, end_at, end_real_at, end_type } = item
      let startAt = new Date(start_at).getTime(),
        endAt = new Date(end_at).getTime(),
        nowAt = new Date().getTime();
      if (startAt > nowAt) {
        return '未生效'
      }
      if (startAt <= nowAt && endAt > nowAt && !end_real_at) {
        return '生效中'
      }
      if (endAt >= nowAt && !end_real_at) {
        return '已过期'
      }
      if (end_real_at || end_type) {
        return '已终止'
      }
      // 未生效：  start_at 大于当前日期
      // 生效中： start_at 小于当前日期 并且 end_at 大于当前日期，并且 end_real_at 为null
      // 过期：    end_at 小于当前日期，并且 end_real_at 为null
      // 结束：    end_real_at  不为null 或者 end_type 不为 null
    }
  },
  watch: {
    createOrder: {
      handler (newVal) {
        if (newVal.type == 699 || newVal.type == 1) {
          this.createOrder_span = 6
        } else {
          this.createOrder_span = 8
        }
      },
      deep: true
    },
  },
  methods: {
    handleCloseOrder () {
      this.$emit('close', {
        visible: false,
        method: 'cancle'
      })
      this.clearInfo()
    },
    // 选择报销类型
    chosenComplaintsType (val) {
      this.expenseTypeDisable = []
      this.createOrder.reimburse.forEach(el => {
        this.expenseTypeDisable.push(el.type)
      })
    },
    // 选择人员
    handlerOrgan (params, index) {
      this.staffModule = true
      this.currentStaff = params
      this.currentIndex = index || 0
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentStaff == 'add_record_renze') {
          this.followRecord.pay_method[this.currentIndex].name = names
          this.followRecord.pay_method[this.currentIndex].id = ids
        } else {
          this.createOrder[this.currentStaff] = {
            name: names,
            id: ids
          }
        }
        this.currentIndex = 0
        this.currentStaff = ''
      }
    },
    // 选择部门
    handlerDepart (params) {
      this.departModule = true
      this.currentOrg = params
    },
    // 关闭 选择部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        this.createOrder[this.currentOrg] = {
          name: str,
          id: ids
        }
        this.currentOrg = ''
      }
    },
    // 增加报销
    addComplaintsType () {
      this.createOrder.reimburse.push({
        type: '',
        money: ''
      })
    },
    // 删除报销
    delComplaintsType (index) {
      this.createOrder.reimburse.splice(index, 1)
    },
    // 新建工单 客户信息 历史工单 来电记录
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
        id == 2 && this.history_search() // 历史工单
        id == 3 && this.temporary_search() // 来电
      }
    },
    // 模糊搜索
    addOrder_search () {
      this.customer_info.chosenCustomer = null
      this.customer_info.contract_Detail = null
      this.show_Contract_Detail = false
      let params = {
        type: 3,
        search: this.customer_search,
        limit: 5,
        page: this.customer_info.page
      }
      this.$http.get(this.market_server + `v1.0/market/customer/orderCustomer`, params).then(res => {
        if (res.code === 200) {
          this.customer_info.data = res.data.data
          this.customer_info.count = res.data.count
        }
      })
    },
    // 选择当前客户
    changeCustmInfo (val) {
      this.createOrder.house_id = val.house_id
      this.createOrder.house_name = val.house_name
      this.createOrder.chooseTab = val.contract_type
      this.$http.get(this.market_server + `v1.0/market/contract/${val.contract_type}/${val.contract_id}`).then(res => {
        if (res.code === 200) {
          this.customer_info.contract_Detail = res.data
          this.show_Contract_Detail = true
        }
      })

    },
    // 历史工单搜索
    history_search () {
      if (this.chosenCustomer) {
        let history = {
          type: 0,
          page: this.history_info.page,
          limit: 5,
          search: this.chosenCustomer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/history`, history).then(res => {
          if (res.code === 200) {
            this.history_info.data = res.data.data
            this.history_info.dataCount = res.data.all_count
          }
        })
      }

    },
    // 来电记录
    temporary_search () {
      if (this.chosenCustomer) {
        this.$http.get(`${this.market_server}v1.0/csd/revisit/${this.chosenCustomer.contract_type}/${this.chosenCustomer.contract_id}`).then(res => {
          if (res.code === 200) {
            this.temporaryRecord.data = res.data.data
            this.temporaryRecord.dataCount = res.data.all_count || 0
          }
        })
      }
    },
    // 查看记录
    chosenActiveRecord (val) {
      this.seeRecord_status = val
      this.record_data = {
        contract_id: this.chosenCustomer.contract_id,
        contract_type: this.chosenCustomer.contract_type
      }
      switch (val) {
        case 1: this.record_visible = true; break;  //回访
        case 2: this.financial_visible = true; break; // 财务
        case 3: this.financial_visible = true; break; // 退租
        case 4: this.expense_visible = true; break; // 报销
        default: break;
      }
    },
    // 用户信息分页
    handleCustomerChange (val) {
      this.customer_info.page = val
      this.addOrder_search()
    },
    // 历史工单分页
    handleHistoryChange (val) {
      this.history_info.page = val
      this.history_search()
    },
    // 来电记录 分页
    handleTemporayChange (val) {
      this.temporaryRecord.page = val
      this.temporary_search()
    },
    handleCloseAddOrder () {
      if (!this.chosenCustomer) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '数据未填写'
        });
        return
      }
      this.add_visible = true
    },
    clearInfo () {
      this.show_Contract_Detail = false
      // 将用户列表清空
      this.customer_info = {
        page: 1,
        dataCount: 0,
        data: [],
        contract_Detail: null
      }
      this.history_info = {
        page: 1,
        dataCount: 0,
        data: []
      }
      this.temporaryRecord = {
        page: 1,
        dataCount: 0,
        data: []
      }
      this.createOrder = {
        house_id: '',
        house_name: '', //房屋名称
        type: '',  // 工单类型
        operate_user: { // 处理人
          id: '',
          name: '',
        },
        operate_org: { // 处理部门 
          id: '',
          name: ''
        },
        replay_phone: '', // 回复电话
        emergency: '', // 紧急程度
        next_follow_time: '', //跟进时间
        content: '', // 工单内容
        album: [], //上传图片
        complain_type: '', // 投诉类型
        complain_channel: '', //投诉渠道
        complained_user: { // 被投诉人
          id: '',
          name: ''
        },
        reimburse_user: { //报销人
          id: '',
          name: ''
        },
        reimburse: [ //报销明细
          {
            type: '',
            money: ''
          }
        ]
      }
      this.chosenCustomer = null
      this.customer_search = ''
    },
    handleCloseAdd (params) {
      this.add_visible = false
      if (params) {
        this.createOrderFun()
      }
    },
    createOrderFun () {
      let order = {
        house_id: this.chosenCustomer.house_id,
        house_name: this.chosenCustomer.house_name,
        contract_id: this.chosenCustomer.contract_id,
        contract_num: this.chosenCustomer.contract_num,
        contract_type: this.chosenCustomer.contract_type,
        type: this.createOrder.type,
        album: this.createOrder.album,
        content: this.createOrder.content,
        operate_user_id: this.createOrder.operate_user.id,
        operate_user_name: this.createOrder.operate_user.name,
        operate_org_id: this.createOrder.operate_org.id,
        replay_phone: this.createOrder.replay_phone,
        emergency: this.createOrder.emergency,
        complained_user_name: this.createOrder.complained_user.name,
        complained_user_id: this.createOrder.complained_user.id,
        complain_type: this.createOrder.complain_type,
        type_of_complaint: this.createOrder.complain_channel,
        next_follow_time: this.createOrder.next_follow_time,
      }
      console.log(this.createOrder.reimburse)
      this.createOrder.reimburse.forEach(item => {
        if (item.type) {
          let money_type = null, type_name = null, type = null;
          switch (item.type) {
            case 1:
              type = '水费'
              type_name = 'reimburse_water'
              money_type = 'reimburse_water_money'
              break;
            case 2:
              type = '电费'
              type_name = 'reimburse_electricity'
              money_type = 'reimburse_electricity_money'
              break;
            case 3:
              type = '燃气费'
              type_name = 'reimburse_gas'
              money_type = 'reimburse_gas_money'
              break;
            case 4:
              type = '物业费'
              type_name = 'reimburse_property'
              money_type = 'reimburse_property_money'
              break;
            case 5:
              type = '维修费'
              type_name = 'reimburse_service'
              money_type = 'reimburse_service_money'
              break;
            default:
              type = '其他'
              type_name = 'reimburse_other'
              money_type = 'reimburse_other_money'
              break;
          }
          order[type_name] = type
          order[money_type] = item.money
        }
      })
      console.log(order)
      this.$http.post(`${this.market_server}v1.0/csd/work_order`, order).then(res => {
        this.$LjNotify('warning', {
          title: '提示',
          message: res.message
        });
        if (res.code === 200) {
          this.$emit('close', {
            visible: false,
            method: 'created'
          })
          this.clearInfo()
        }
      })

    },
    // 财务记录 关闭
    handkeCloseFinancial () {
      this.financial_visible = false
    },

    // 报销记录 关闭
    handkeCloseExpense () {
      this.expense_visible = false
    },
    //  回访记录 关闭
    handleCloserecord () {
      this.record_visible = false
    },
    //  退租记录 关闭
    handkeCloseWithout () {
      this.without_visible = false
    },
  }
}
</script>


<style lang="scss">
@import "../../../../assets/scss/common.scss";

@mixin confirmImg($m, $n) {
  $url: "../../../../assets/image/customService/workOrder/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  .el-row {
    margin-right: 0 !important;
  }
  .el-form-item__label {
    white-space: nowrap;
  }
  #addOrder_dialog {
    .el-col {
      height: 40px;
      margin-bottom: 30px;
      @include flex("items-center");
      @include flex("justify-start");
      .el-col-p {
        width: 33%;
        font-size: 14px;
        text-align: left;
        @include flex("items-center");
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .el-col-p1 {
        width: 92px;
      }
      .input_box {
        width: 65%;
        @include flex("items-center");
        position: relative;
        .icons {
          width: 16px;
          height: 16px;
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
        input {
          border-color: #fff;
        }
      }
    }

    .feiyong {
      .el-col {
        margin-bottom: 0;
      }
    }
    .el-col-box {
      cursor: pointer;
      height: 410px;
      @include flex("space-column");
      @include flex("justify-start");
      @include flex("items-start");
      .el-box {
        width: 67px;
        height: 67px;
        font-size: 18px;
        padding: 10px 12px;
        margin-bottom: 48px;
      }
    }
    .el-col-content {
      height: 410px;
      display: block;
      padding: 30px 65px;
      .content-top {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        height: 32px;
        margin-left: 60px;
        margin-bottom: 20px;
        ul {
          display: flex;
          margin-left: 30px;
          li {
            margin-right: 18px;
          }
        }
      }

      .info_search {
        width: 280px;
        border-radius: 16px;
        padding: 0 10px;
        box-sizing: border-box;
        @include flex("flex-center");
        .icon {
          display: inline-block;
          width: 14px;
          height: 16px;
        }
        input {
          border: none;
          height: 30px;
        }
      }
      .custmer_info {
        .order_content_boxes {
          height: 275px;
        }
        .custmer_content {
          padding-left: 32px;
          font-size: 14px;
          margin-bottom: 15px;
          height: 40px;
          .el-radio__label {
            flex: 1;
          }
          .el-col {
            margin-bottom: 0;
          }
          .tit {
            width: 30%;
            text-align: right;
          }
          .content_tit {
            width: 70%;
            text-align: left;
            padding-left: 12px;
          }
        }
      }
      .custmer_info1 {
        padding: 0 97px 0 107px;
        .order_content_boxes {
          height: 275px;
          .order_content {
            padding: 5px 0;
            border-bottom: 1px solid #f3f3f3;
            @include flex("space-column");
            .order_content_box {
              @include flex("items-bet");
              font-size: 14px;
              color: #686874;
              .order_title1 {
                width: 400px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                span {
                  padding-right: 10px;
                }
              }
              .order_title2 {
                color: #c4c4c4;
                span {
                  padding-right: 40px;
                }
              }
              .status1 {
                font-weight: 600;
                color: #0bb07b;
              }
              .status2 {
                color: #ffad0d;
              }
            }
          }
          .order_content2 {
            height: 57px;
            .order_content_box {
              margin-bottom: 0;
            }
          }
        }

        .el-pagination {
        }
      }

      .nothing {
        width: 100%;
        height: 300px;
        @include flex("space-column");
        @include flex("items-center");
        .nothing_img {
          width: 70px;
          height: 180px;
          margin-bottom: 30px;
        }
        .nothing_words {
          font-size: 14px;
        }
      }
      .ending {
        @include flex("flex-center");
        color: #dfdfdf;
        font-size: 14px;
        .ending_img {
          width: 100px;
          height: 18px;
        }
      }
    }
  }
}

#theme_name.theme1 {
  #addOrder_dialog {
    .el-col {
      p {
        color: #686874;
        .house_name {
          @include confirmImg("dizhi_hui.png", "theme1");
        }
        .type {
          @include confirmImg("leixing_copy.png", "theme1");
        }
        .post {
          @include confirmImg("paidan.png", "theme1");
        }
        .handler {
          @include confirmImg("ren.png", "theme1");
        }
        .org {
          @include confirmImg("bumen_hui.png", "theme1");
        }
        .phone {
          @include confirmImg("dianhua_.png", "theme1");
        }
        .endTime {
          @include confirmImg("shijian_hui.png", "theme1");
        }
        .status {
          @include confirmImg("koukuanmingxi_hui.png", "theme1");
        }
        .content {
          @include confirmImg("gognzuoneirong.png", "theme1");
        }
        .upload {
          @include confirmImg("shangchuantupian.png", "theme1");
        }
        .comtype {
          @include confirmImg("leixing2.png", "theme1");
        }
        .commoney {
          @include confirmImg("jine_hui.png", "theme1");
        }
        .tsqd {
          @include confirmImg("tousuqudao.png", "theme1");
        }
      }
      &:hover {
        input {
          border-color: #cf2e33;
        }
        .tsqd {
          @include confirmImg("tousuqudao_copy.png", "theme1");
        }
        .comtype {
          @include confirmImg("leixing2_copy.png", "theme1");
        }
        .commoney {
          @include confirmImg("jine.png", "theme1");
        }
        .house_name {
          @include confirmImg("dizhi.png", "theme1");
        }
        .type {
          @include confirmImg("leixing.png", "theme1");
        }
        .post {
          @include confirmImg("paidan_hong.png", "theme1");
        }
        .handler {
          @include confirmImg("ren_hong.png", "theme1");
        }
        .org {
          @include confirmImg("bumen.png", "theme1");
        }
        .phone {
          @include confirmImg("dianhua_hong.png", "theme1");
        }
        .endTime {
          @include confirmImg("shijian.png", "theme1");
        }
        .status {
          @include confirmImg("jinji_hong.png", "theme1");
        }
        .content {
          @include confirmImg("neirong.png", "theme1");
        }
        .upload {
          @include confirmImg("tupian_hong.png", "theme1");
        }
      }

      .el-select .el-input.is-focus .el-input__inner {
        border-color: #cf2e33;
      }
    }
    .el-col-box {
      .el-box {
        @include confirmImg("xinxi_hui.png", "theme1");
        color: #686874;
      }
      .el-box-active {
        @include confirmImg("xinxi.png", "theme1");
        p {
          color: #ffffff;
        }
      }
    }
    .el-col-content {
      background: #ffffff;
      .content-top {
        color: #d5d5d5;
        li:hover {
          color: #ffad0d;
          font-weight: 700;
        }
      }
      .active_record {
        color: #ffad0d;
        font-weight: 700;
      }
      .info_search {
        border: 1px solid #dfdfdf;
        .icon {
          @include confirmImg("sousuo_xiao.png", "theme1");
        }
      }
      .custmer_info {
      }
      .custmer_content {
        .tit {
          color: #d5d5d5;
        }
        .content_tit {
          color: #686874;
        }
      }
      .nothing {
        .nothing_img {
          @include confirmImg("shenmeyemeiyou.png", "theme1");
        }
        .nothing_words {
          color: #dfdfdf;
        }
      }
      .ending {
        .ending_img {
          @include confirmImg("dixian.png", "theme1");
        }
      }
    }
  }
}

#theme_name.theme2 {
}

#theme_name.theme3 {
}

#theme_name.theme4 {
}
</style>