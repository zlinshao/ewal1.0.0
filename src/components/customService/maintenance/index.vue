<template>
  <div id="miantenance">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>维修保洁</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain @click='chosenTag_status(7)' :class="[tag_status ==7?'active-warning':'']">维修</el-button>
        <el-button type="primary" plain @click='chosenTag_status(8)' :class="[tag_status==8?'active-primary':'']">保洁</el-button>
        <div class="icons add" @click='addOrder'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableDblClick"
        header-row-class-name="tableHeader" style="width: 100%" :key='"orderTable"+chooseTab'>
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="emergency" :class="['emergency' + scope.row.emergency]">
              {{scope.row.emergency_name}}
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" v-for='item in Object.keys(showTableData)' :key='item' :prop='item' :label="showTableData[item]"></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button type="warning" plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDateCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false" />
    <!-- 催办 -->
    <UrgedDealDialog :visible='urgedDeal_visible' :moduleData='uergedDeal_info' @close="handleCloseUrgedDeal" />
    <!-- 转交 -->
    <TransferDialog :visible='transfer_visible' :data='currentRow' @close="handleCloseTranfer" />
    <!--确定结束-->
    <SureEndDialog :visible="sureEnding_visible" @close="handleCloseSure" :moduleData='sureEnd_info' />
    <!--维修详情-->
    <OrderDetail :visible="detail_visible" :moduleData='detail_info' @close="handleCloseDetail" />
    <!--新增跟进记录-->
    <AddRecord :visible='followRecord_visible' :moduleData='followRecord_info' @close='handleCloseRecord' />
    <!--新增跟进记录 认责人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--新建工单-->
    <LjDialog :visible="addOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建维修单</h3>
        </div>
        <div class="dialog_main addOrder_dialog">
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='6'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <div class='el-input'>
                    <input type="text" placeholder="地址/合同编号/手机号/客户姓名" class="el-input__inner" v-model='createOrder_form.house_name'
                      @mousedown="clearSearch" v-on:keyup.enter='addOrder_search'>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon type'></i><span>类型</span></p>
                <div class='input_box'>
                  <el-radio v-model="createOrder_form.type" label="7">维修</el-radio>
                  <el-radio v-model="createOrder_form.type" label="8">保洁</el-radio>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon post'></i><span>派单至</span></p>
                <div class='input_box'>
                  <el-select placeholder="请选择" v-model='createOrder_form.send_order_type'>
                    <el-option label="内部保修" value="1"> </el-option>
                    <el-option label="外部保修" value="2"> </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="organSearch('add')" readonly v-model="createOrder_form.operate_user_name"></el-input
                    placeholder="请选择">
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="departSearch" readonly v-model="createOrder_form.operate_org_name" placeholder="请选择"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder_form.replay_phone'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder_form.expected_finish_time" value-format="yyyy-MM-dd" align="right"
                    type="date" placeholder="填写跟进时间">
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon status'></i><span>紧急时间</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder_form.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span='6'>
                <p class='el-col-p'><i class='icon content'></i>内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="createOrder_form.content"></el-input>
                </div>
              </el-col>

              <el-col :span='18'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='createOrder_form.album'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div :class='{"el-box":true,"el-box-active":addOrderChosen == option.id}' v-for='option in addOrderChosen_options'
                  @click='chosenOptions(option.id)'>
                  <p>{{option.title}}</p>
                </div>
              </el-col>
              <el-col :span='22' class='el-col-content'>
                <!--客户信息-->
                <div class='custmer_info' v-if='addOrderChosen == 1'>
                  <div class='nothing' v-if='customer_info.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='custmer_content' v-for='info in customer_info.data' :key='info.id'>
                      <el-radio v-model="current_customer" :label="info" @change="changeCustmInfo">
                        <el-row width='100%'>
                          <el-col :span='7'>
                            <span class='tit'>房屋地址</span>
                            <span class='content_tit'>{{info.house_name || '--'}}</span>
                          </el-col>
                          <el-col :span='5'>
                            <span class='tit'>合同编号</span>
                            <span class='content_tit'>{{info.contract_id || '--'}}</span>
                          </el-col>
                          <el-col :span='3'>
                            <span class='tit'>姓名</span>
                            <span class='content_tit'>{{info.name || '--'}}</span>
                          </el-col>
                          <el-col :span='3'>
                            <span class='tit'>性质</span>
                            <span class='content_tit'>{{info.customer_type || '--'}}</span>
                          </el-col>
                          <el-col :span='5'>
                            <span class='tit'>电话</span>
                            <span class='content_tit'>{{info.phone|| '--'}}</span>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCustomerChange" :current-page="customer_info.page" layout="total,  prev, pager, next, jumper"
                    :total="customer_info.dataCount" v-if='customer_info.dataCount > 0'>
                  </el-pagination>
                </div>

                <!--历史工单-->
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
                <!--来电记录-->
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
          <el-button type="danger" size="small" @click="createOrderFun">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>

    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete'></DeleteDialog>
    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd'></AddDialog>

    <!--选择人员-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart"></DepartOrgan>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import StaffOrgan from '../../common/staffOrgan';
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'
import { maintenanceSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import LjDialog from '../../common/lj-dialog.vue';
import DeleteDialog from '../components/delete-dialog';
import SureEndDialog from '../components/sureEnd-dialog';
import AddDialog from '../components/add-dialog';
import UrgedDealDialog from '../components/urgedDeal-dialog'
import TransferDialog from '../components/transfer-dialog'
import OrderDetail from '../components/order-detail'
import AddRecord from '../workOrder/components/addRecord'
export default {
  name: "index",
  components: {
    SearchHigh,
    MenuList,
    LjDialog,
    StaffOrgan,
    DepartOrgan,
    Ljupload,
    DeleteDialog,
    AddDialog,
    UrgedDealDialog,
    TransferDialog,
    OrderDetail,
    SureEndDialog,
    AddRecord
  },
  data () {
    return {
      maintenanceSearch,
      customService,
      visibleStatus: false,
      showTableData: {
        create_time: '创建时间',
        num: '工单编号',
        type_name: '类型',
        house_name: '地址',
        content: '内容',
        finish_time: '截止时间',
        operate_user_name: '处理人',
        create_name: '创建人',
        org_name: '部门'
      },
      tableData: [], // 工单列表
      tableDateCount: 0, // 工单列表count
      currentRow: null, // 当前查看的row
      currentPage: 1, //分页
      urgedDeal_visible: false, //催办
      uergedDeal_info: {
        default_Person: null,
        id: null
      },
      transfer_visible: false, // 转交
      transfer_info: {
        id: null
      },
      transfer: {
        note: '',
        person: [],
        personName: ''
      },
      //删除row
      delete_visible: false,
      // 增加
      add_visible: false,
      showSearch: false,
      searchData: {},
      staffModule: false,//显示人员选择
      organData: { //最多选择几个人
        num: 1
      },
      departModule: false, //部门选择
      departData: {
        num: 1,
      },
      addOrderChosen: 1,
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
      addOrder_visible: false, // 新建工单
      customer_search: '', // 模糊搜索
      customer_info: {  // 用户信息
        page: 1,
        dataCount: 0,
        data: []
      },
      current_customer: null,  // 当前选择的客户
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
      createOrder_form: { //创建工单
        house_name: '',
        type: '',
        send_order_type: '',
        operate_user_id: '',
        operate_user_name: '',
        operate_org_id: '',
        operate_org_name: '',
        replay_phone: '',
        expected_finish_time: '',
        emergency: '',
        content: '',
        album: ''
      },
      currentStaff_method: '',

      detail_form: null,
      staffModule: false,//显示人员选择
      organData: {
        num: 1
      },
      // 工单详情
      detail_visible: false,
      detail_info: {
        currentId: null,
        chosenTag: null
      },
      sureEnding_visible: false,  // 确定结束
      sureEnd_info: {
        payer: '',
        payer_org_name: ''
      },
      tag_status: 7, // 7是维修 8是保洁
      chooseTab: 336, // 336待处理 337处理中 338已完成
      selects: [
        {
          id: 336,
          title: '待处理',
        },
        {
          id: 337,
          title: '跟进中',
        },
        {
          id: 338,
          title: '已完成',
        }
      ],
      // 工单列表高级搜索
      params: {
        search: '',
        create_time: [],
        finish_time: [],
        operate_user_id: '',
        operate_org_id: '',
        emergency: '',
      },
      // 跟进
      followRecord_visible: false,
      followRecord_info: {
        work_id: null,
        chooseTab: null,
        type: null
      },
      market_server: globalConfig.market_server,
    }
  },
  mounted () {
    this.getDateList();
  },
  methods: {
    addRecordFun (par) {
      let params = this.followRecord,
        pay_method = [];
      if (params.folow_status == 338) {
        params.pay_method.forEach(el => {
          pay_method.push([el.type || 0, el.name || '', el.money || ''])
        });
        params.flag = par.isCreated ? 1 : 0
      }
      params.pay_method = pay_method
      params.work_order_id = this.currentRow.id

      this.$http.post(`${this.market_server}v1.0/csd/work_order/follow`, params).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });
        this.followRecord = null
        this.currentRow = null
      })
    },
    //工单表格数据初始化
    getDateList () {
      this.showLoading(true);
      let params = {
        type: this.tag_status,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.params.search,
        create_time: this.params.create_time,
        finish_time: this.params.finish_time,
        operate_user_id: this.params.operate_user_id,
        operate_org_id: this.params.operate_org_id,
        emergency: this.params.emergency
      }
      this.$http.get(`${this.market_server}v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          let data = res.data.data
          if (data.length == 0 && this.currentPage != 1) {
            this.currentPage--
            this.getDateList()
          } else {
            this.tableData = data;
            this.tableDateCount = res.data.all_count;
            this.showLoading(false);
          }
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
          this.showLoading(false);
        }
      })
    },
    // 催办
    handleCuiBan (row) {
      this.uergedDeal_info = {
        default_Person: row.operate_user_name,
        id: row.id
      }
      this.urgedDeal_visible = true
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      this.urgedDeal_visible = false
      this.uergedDeal_info = {
        default_Person: null,
        id: null
      }
    },
    // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      if (val) { //确定删除
        this.$http.delete(`${this.market_server}v1.0/csd/work_order/delete/${this.currentRow.id}`).then(res => {
          this.currentRow = null
          this.delete_visible = true
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.delete_visible = false
            this.getDateList()
          }
        })
      }

    },
    //确定新增
    // handleAddNewRecord () {
    //   this.followRecord_visible = false
    //   this.currentMethod = 'addRecord'
    //   if (this.followRecord_info.folow_status == 337) {
    //     this.add_visible = true
    //   } else {
    //     this.sureEnding_visible = true
    //   }
    // },

    //确认添加
    handleCloseAdd (params) {
      this.add_visible = false
      // this.currentMethod == 'created' && this.createOrderFun(params)
      this.currentMethod != 'created' && this.addRecordFun(params)
      this.currentMethod = null
    },
    // tab切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id;
        this.getDateList()
      }
    },
    chosenTag_status (id) {
      if (this.tag_status != id) {
        this.tag_status = id
        this.getDateList()
      }
    },
    // add 工单
    addOrder () {
      this.addOrder_visible = true
    },
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
        id == 2 && this.history_search() // 历史工单
        id == 3 && this.temporary_search() // 来电
      }
    },
    changeCustmInfo (val) { // 选择用户
      this.createOrder_form.house_name = val.house_name || '--'
      this.createOrder_form.replay_phone = val.replay_phone || ''
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
    },

    clearSearch () {
      this.createOrder_form.house_name = ''
      this.customer_info.page = 1
      this.customer_info.dataCount = 0
      this.customer_info.chosenCustomer = null
      this.customer_info.contract_Detail = null
      this.show_Contract_Detail = false
    },
    // 模糊搜索 用户
    addOrder_search () {
      let params = {
        search: this.createOrder_form.house_name,
        limit: 5,
        page: this.customer_info.page
      }
      this.$http.get(this.market_server + `v1.0/market/customer/orderCustomer`, params).then(res => {
        if (res.code === 200) {
          this.customer_info.dataCount = res.data.count
          this.customer_info.data = res.data.data
        }
      })
    },
    // 历史工单搜索
    history_search () {
      if (this.current_customer) {
        let history = {
          type: 0,
          page: this.history_info.page,
          limit: 5,
          search: this.current_customer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/history`, history).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.history_info.data = res.data.data
            this.history_info.dataCount = res.data.all_count
          }
        })
      }

    },
    // 来电记录
    temporary_search () {
      if (this.current_customer) {
        let temporary = {
          type: -1,
          page: this.temporaryRecord.page,
          limit: 5,
          search: this.current_customer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/temporaryRecord`, temporary).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.temporaryRecord.data = res.data.data
            this.temporaryRecord.dataCount = res.data.all_count
          }
        })
      }
    },
    // 用户列表分页
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
    handleCloseOrder () {
      this.addOrder_visible = false
      // 将用户列表清空
      this.customer_info = {
        page: 1,
        dataCount: 0,
        data: []
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
      this.createOrder_form = {
        house_name: '',
        type: '',
        send_order_type: '',
        operate_user_id: '',
        operate_user_name: '',
        operate_org_id: '',
        operate_org_name: '',
        replay_phone: '',
        expected_finish_time: '',
        emergency: '',
        content: '',
        album: ''
      }
      this.customer_search = ''
      this.current_customer = null
    },
    checkOutWarn () {
      let warning = null
      if (!this.createOrder_form.house_name) {
        return '房屋地址未填写'
      }

      if (!this.createOrder_form.type) {
        return '工单类型未选择'
      }


      if (!this.createOrder_form.send_order_type) {
        return '派单至未选择'
      }


      if (!this.createOrder_form.operate_user_name) {
        return '处理人未选择'
      }

      if (!this.createOrder_form.operate_org_name) {
        return '部门未选择'
      }

      if (!this.createOrder_form.replay_phone) {
        return '回复电话未填写'
      }
      if (!/^[1][3-9][0-9]{9}$/.test(this.createOrder_form.replay_phone)) {
        return '回复电话填写有误'
      }

      if (!this.createOrder_form.emergency) {
        return '紧急程度未选择'
      }

      if (!this.createOrder_form.expected_finish_time) {
        return '截止时间未选择'
      }

      if (!this.createOrder_form.content) {
        return '工单内容未填写'
      }

      if (this.createOrder_form.album.length == 0) {
        return '图片未上传'
      }
      return warning
    },
    createOrderFun () {
      let warning = this.checkOutWarn()
      if (warning) {
        this.$LjNotify('warning', {
          title: '提示',
          message: warning
        });
        return
      }

      let order = this.createOrder_form;
      order.house_id = this.current_customer.house_id || ''
      order.house_name = this.current_customer.house_name || ''
      order.contract_id = this.current_customer.contract_id || ''
      order.contract_type = this.current_customer.contract_type || ''
      order.type_name = this.createOrder_form.type == 7 ? "维修" : "保洁"

      this.$http.post(`${this.market_server}v1.0/csd/work_order/ServiceOrder`, order).then(res => {
        let word = null
        if (res.code === 200) {
          this.createdTodo(order)
          this.handleCloseOrder()
          this.getDateList()
          word = '工单创建成功'
        } else {
          word = '工单创建失败'
        }

        this.$LjNotify('warning', {
          title: '提示',
          message: word
        });
      })
    },
    createdTodo (params) {
      if (params.type == 7) { //维修
        let order = {
          repair_time: params.expected_finish_time,
          repair_item: params.content,
          album: JSON.stringify({ before: params.album }),
          contract_id: params.contract_id,
          receive_id: params.operate_user_id,
          contract_type: params.contract_type,
          repair_type: Number(params.send_order_type),
        }
        this.$http.post(`${this.market_server}v1.0/market/task/HouseRepair`, order).then(res => {
          this.$LjNotify('warning', {
            title: '提示',
            message: res.message
          });
        })
      }
      if (params.type == 8) { //保洁
        let order = {
          cleaning_type: Number(params.send_order_type),
          cleaning_time: params.expected_finish_time,
          cleaning_reason: params.content,
          album: JSON.stringify({ before: params.album }),
          contract_id: params.contract_id,
          contract_type: params.contract_type,
          receive_id: params.operate_user_id,
        }
        this.$http.post(`${this.market_server}v1.0/market/task/HouseCleaning`, order).then(res => {
          this.$LjNotify('warning', {
            title: '提示',
            message: res.message
          });
        })
      }

    },
    //新增跟进记录
    handleAddRecord () {
      this.detail_visible = false
      this.followRecord_visible = true
    },
    //选择人员
    organSearch (par, idex) {
      this.staffModule = true
      this.currentStaff_method = par
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentStaff_method == 'add') {  // 创建工单 选择处理人
          this.createOrder_form.operate_user_name = names
          this.createOrder_form.operate_user_id = ids

        }
        this.currentStaff_method = ''
      }
    },
    //选择 部门
    departSearch () {
      this.departModule = true
    },
    // 关闭 部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        this.createOrder_form.operate_org_name = str
        this.createOrder_form.operate_org_id = ids
      }
    },

    handleCloseSure (params) {
      let { isSure, isCreated } = params
      this.sureEnding_visible = false
      if (isSure) {
        this.currentMethod == 'addRecord' && this.addRecordFun(params)
        this.currentMethod == 'ending' && this.handleSure(isCreated)
      } else {
        this.currentRow = null
        this.detail_form = null
      }
    },
    handleSure (isCreated) {
      let option = {
        work_order_id: this.currentRow.id,
        payer_all_money: this.currentRow.payer_all_money || 0,
        flag: isCreated ? 1 : 0
      }

      this.$http.post(`${this.market_server}v1.0/csd/work_order/finish`, option).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });

        if (res.code === 200) {
          this.currentRow = null
          this.detail_form = null
          this.getDataList()
        }
      })
    },
    handleCloseRecord (params) {
      let { isCreated, createdType, content } = params
      this.followRecord_visible = false
      this.followRecord = content
      if (createdType == 'doing') {
        this.add_visible = true
      }
      if (createdType == 'finish') {
        this.sureEnd_info = {
          payer: content.payer,
          payer_org_name: content.payer_org_name
        }
        this.currentMethod = 'addRecord'
        this.sureEnding_visible = true
      }
    },
    // 查看详情
    tableDblClick (row) {
      this.currentRow = row
      this.detail_info = {
        currentId: row.id,
        chosenTag: this.chooseTab, // 338 已完成
        currentRow: this.currentRow
      }
      this.detail_visible = true;
    },
    // 关闭详情
    handleCloseDetail (params) {
      let { type, close, detail } = params
      if (detail) this.detail_form = detail;
      this.detail_visible = false;
      if (type == '转交') {
        this.transfer_visible = true
      }
      if (type == '通知') {
        this.handleCuiBan(this.currentRow)
      }
      if (type == '结束') {
        this.handleEnd()
      }
      if (type == '新增跟进') {
        this.followRecord_info = {
          chooseTab: this.chooseTab,
          type_name: this.detail_form.type_name
        }
        this.followRecord_visible = true
      }
    },
    // 转交
    handleCloseTranfer () {
      this.transfer_visible = false
      this.currentRow = null
      this.detail_form = null
    },
    //结束
    handleEnd () {
      this.sureEnd_info = {
        payer: this.detail_form.payer,
        payer_org_name: this.detail_form.payer_org_name
      }
      this.currentMethod = 'ending'
      this.sureEnding_visible = true
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.getDateList()
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = maintenanceSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1
        this.params = val
        this.getDateList()
      }
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/maintenance/index.scss";
</style>
