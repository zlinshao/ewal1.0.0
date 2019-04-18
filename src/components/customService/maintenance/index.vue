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
        <el-button type="warning" plain @click='chosenTag_status(7)' :class="[tag_status==7?'active-warning':'']">维修</el-button>
        <el-button type="primary" plain @click='chosenTag_status(8)' :class="[tag_status==8?'active-primary':'']">保洁</el-button>
        <div class="icons add" @click='addOrder'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData['workOrder'].tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @row-dblclick="tableDblClick" header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p>{{tableSettingData.workOrder.status[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="item in Object.keys(tableSettingData.workOrder.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.workOrder.showData[item]">
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.workOrder.params.page"
            :page-size="tableSettingData.workOrder.params.limit" :total="tableSettingData.workOrder.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--新增跟进记录-->
    <LjDialog :visible="followRecord_visible" :size="{width: 960 + 'px',height: 640 + 'px'}" @close="handleCloseAddNewRecord">
      <div class="dialog_container followRecord">
        <div class="dialog_header">
          <h3>新增跟进记录</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='100px'>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="工单状态">
                  <el-radio label="1">跟进中</el-radio>
                  <el-radio label="2">已完成</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select placeholder="请选择">
                    <el-option label="22" value="业务员"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="维修金额">
                  <el-input placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="认责人">
                  <el-select placeholder="请选择">
                    <el-option label="22" value="业务员"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="organSearch" readonly placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="认责金额">
                  <el-input placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="实际支付人">
                  <el-select placeholder="请选择">
                    <el-option label="22" value="业务员"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="organSearch" readonly placeholder="业务员"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="跟进记录">
                  <el-input placeholder="请填写" type='textarea'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="上传图片">
                  <Ljupload size='40'></Ljupload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleAddNewRecord">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseAddNewRecord">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--新增跟进记录 认责人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
    <!--确定结束-->
    <LjDialog :visible="sureEnding_visible" :size="{width: 480 + 'px',height: 320 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container end_dialog">
        <div class="dialog_main">
          <h3>确定结束吗?</h3>
          <el-checkbox>
            公司员工(员工姓名-部门)已支付维修费用,结束后系统进入报销流程
          </el-checkbox>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseAddOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--维修详情-->
    <LjDialog :visible="detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container dialog_detail">
        <div class="dialog_header">
          <h3>维修工单</h3>
        </div>
        <div class="dialog_main">
          <div class="back_info scroll_bar">
            <el-row :gutter="20">
              <el-col :span='14'>
                <p class='detail_tit'>工单详情</p>
                <el-form label-width='80px'>
                  <el-form-item label='创建时间'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='房屋地址'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='维修方'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='处理人'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='部门'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='回复电话'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='紧急程度'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='截止时间'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='工单内容' style='width:100%;'>
                    <el-input v-model="detail_form.creatTime" type="text"> </el-input>
                  </el-form-item>
                  <el-form-item label='照片' style='width:100%;'>
                    <!-- <div style="width: 90%;text-align: left">
                      <img v-for="tmp in contractDetail.album[key]" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div> -->
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span='10'>
                <div class='detail_tit'>
                  <span>工单详情</span>
                  <b @click='handleAddRecord'>+</b>
                </div>
                <div class='detail_box scroll_bar'>
                  <div class="content flex" v-for='i in 5'>
                    <div class='detail_dialog_left'>
                      <p>黄海</p>
                      <p>2019.1.16</p>
                    </div>
                    <div class="detail_dialog_center">
                      <div class="circle"></div>
                    </div>
                    <div class='detail_dialog_right'>
                      <p>跟进中</p>
                      <p>准备下片区调查</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click="handleTransfer">转交</el-button>
          <el-button type="info" size="small" @click="handleNotice">通知</el-button>
          <el-button type="danger" size="small" @click="handleEnd">结束</el-button>
        </div>
      </div>
    </LjDialog>
    <!--新建工单-->
    <LjDialog :visible="addOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseAddOrder">
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
                  <el-input placeholder="请填写" v-model='addOrder_options.house_name'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon type'></i><span>类型</span></p>
                <div class='input_box'>
                  <el-radio v-model="addOrder_options.type" label="1">维修</el-radio>
                  <el-radio v-model="addOrder_options.type" label="2">保洁</el-radio>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon post'></i><span>派单至</span></p>
                <div class='input_box'>
                  <el-input @focus="this.staffModule = true" readonly v-model="addOrder_options.post"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="this.staffModule = true" readonly v-model="addOrder_options.handler"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="this.departModule = true" readonly v-model="addOrder_options.org"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='addOrder_options.mobile'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="addOrder_options.endTime" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择日期">
                    <!-- :picker-options="addOrder_options.pickerOptions" -->
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon status'></i><span>紧急时间</span></p>
                <div class='input_box'>
                  <el-select v-model="addOrder_options.status" placeholder="请选择">
                    <el-option label="特急" value="特急"></el-option>
                    <el-option label="紧急" value="紧急"></el-option>
                    <el-option label="重要" value="重要"></el-option>
                    <el-option label="一般" value="一般"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span='6'>
                <p class='el-col-p'><i class='icon content'></i>内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="addOrder_options.content"></el-input>
                </div>
              </el-col>

              <el-col :span='18'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='addOrder_options.imgList'></Ljupload>
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
                <div class='info_search'>
                  <i class='icon'></i>
                  <el-input placeholder="地址/合同编号/手机号/客户姓名" v-model="custm_info_search"></el-input>
                </div>
                <!--客户信息-->
                <div class='custmer_info' v-if='addOrderChosen == 1'>
                  <div class='nothing' v-if='custm_info.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='custmer_content' v-if='custm_info.length >= 0' v-for='info in custm_info' :key='info.id'>
                    <el-radio v-model="current_cust" :label="info" @change="changeCustmInfo">
                      <el-row width='100%'>
                        <el-col :span='7'>
                          <span class='tit'>房屋地址</span>
                          <span class='content_tit'>{{info.house_name}}</span>
                        </el-col>
                        <el-col :span='5'>
                          <span class='tit'>合同编号</span>
                          <span class='content_tit'>{{info.contract_num}}</span>
                        </el-col>
                        <el-col :span='3'>
                          <span class='tit'>姓名</span>
                          <span class='content_tit'>{{info.username}}</span>
                        </el-col>
                        <el-col :span='3'>
                          <span class='tit'>性质</span>
                          <span class='content_tit'>{{info.type}}</span>
                        </el-col>
                        <el-col :span='5'>
                          <span class='tit'>电话</span>
                          <span class='content_tit'>{{info.phone}}</span>
                        </el-col>
                      </el-row>
                    </el-radio>
                  </div>
                  <div class='ending' v-if='custm_info.length >= 0'>
                    <div class='ending_img'></div>
                    我也是有底线的~
                  </div>
                </div>

                <!--历史工单-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 2'>
                  <div class='nothing' v-if='historyOrder.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content' v-for='i in 3'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          洗衣机坏了
                        </p>
                        <span class='status1'>已完成</span>
                      </div>
                      <div class='order_content_box'>
                        <p class='order_title2'>
                          <span>维修工单</span>
                          2019.1.22
                        </p>
                        <span>报销金额</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCurrentChange" :current-page="historyOrder_current" layout="total,  prev, pager, next, jumper"
                    :total="historyOrder.length" v-if='historyOrder.length > 0'>
                  </el-pagination>
                </div>
                <!--来电记录-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 3'>
                  <div class='nothing' v-if='historyPhone.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content  order_content2' v-for='i in 3'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          洗衣机坏了
                        </p>
                        <span class='status1'>已完成</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCurrentChange" :current-page="historyOrder_current" layout="total,  prev, pager, next, jumper"
                    :total="historyOrder.length" v-if='historyPhone.length > 0'>
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseAddOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>

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
export default {
  name: "index",
  components: { SearchHigh, MenuList, LjDialog, StaffOrgan, DepartOrgan, Ljupload },
  data () {
    return {
      maintenanceSearch,
      customService,
      visibleStatus: false,

      currentTable: 'workOrder',
      tableSettingData: {
        workOrder: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            createTime: '创建时间',
            workOrderId: '工单编号',
            type: '类型',
            address: '地址',
            content: '内容',
            endTime: '截至时间',
            handler: '处理人',
            createUser: '创建人',
            department: '部门',
          },
          tableData: [],
          status: {
            1: '特急',
            2: '紧急',
            3: '重要',
            4: '一般',
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

      showSearch: false,
      searchData: {},
      market_server: globalConfig.market_server,
      addOrder_visible: false,
      addOrder_options: {
        house_name: '',
        type: '',
        post: '',
        handler: '',
        org: '',
        mobile: '',
        endTime: '',
        status: '',
        content: '',
        imgList: [],
      },
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
      custm_info_search: '',
      custm_info: [
        {
          id: '451',
          house_name: '东南花园1-2-102',
          contract_num: 'LJGDS2545222',
          username: '沙发上',
          type: '租客',
          phone: 15203224511
        }, {
          id: '453',
          house_name: '东南花园1-2-104',
          contract_num: 'LJGDS2545224',
          username: '沙发上',
          type: '租客',
          phone: 15203224511
        }
      ],
      current_cust: '',
      historyOrder: [
        {
          content: '洗衣机换了，需要维修',
        }
      ],
      historyOrder_current: 1,
      historyPhone: [{}, {}],
      historyOrder_current: 1,
      // 详情
      detail_visible: false,
      detail_form: {
        creatTime: '2019.1.16'
      },
      followRecord_visible: false,
      staffModule: false,//显示人员选择
      organData: {
        num: 1
      },
      currentRow: null, // 当前查看的row
      sureEnding_visible: false,

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
      currentPage: 1,
    }
  },
  mounted () {
    this.getDateList();
  },
  activated () {
  },
  computed: {},
  methods: {
    //工单表格数据初始化
    getDateList () {
      this.showLoading(true);
      let params = {
        type: this.tag_status,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab
      }
      this.$http.get(`${this.market_server}v1.0/market/work_order`, params).then(res => {
        console.log(res)
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
    // tab切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id;
        // this.getDateList()
      }
    },
    chosenTag_status (id) {
      if (this.tag_status != id) {
        this.tag_status = id
      }
    },
    // add 工单
    addOrder () {
      this.addOrder_visible = true
    },
    hiddenOrgan (ids, names, arr) { // 关闭 选择人员
      this.staffModule = false;
      if (ids !== 'close') {
        // this.postman = names
        // this.postMess.person = arr
        console.log(ids, names, arr)
      }
    },
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (dis != 'close') {
        console.log(ids, names, arr)
      }
    },
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
      }
    },
    changeCustmInfo (val) {
      this.addOrder_options.house_name = val.house_name
    },
    handleCurrentChange () { },
    handleCloseAddOrder () {
      this.addOrder_visible = false
    },
    handleCloseDetail () { },
    // 转交
    handleTransfer () {

    },
    //通知
    handleNotice () { },
    //结束
    handleEnd () { },
    //新增跟进记录
    handleAddRecord () {
      this.detail_visible = false
      // this.detail_form = null
      this.followRecord_visible = true
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
    //确定新增
    handleAddNewRecord () {
      this.followRecord_visible = false
      this.sureEnding_visible = true
    },
    handleCloseAddNewRecord () {
      this.followRecord_visible = false
    },
    /*  // 当前点击
     tableClickRow(row) {
       let ids = this.chooseRowIds;
       ids.push(row.id);
       this.chooseRowIds = this.myUtils.arrayWeight(ids);
     },
     // 点击过
     tableChooseRow({row, rowIndex}) {
       return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
     },*/
    // 当前点击
    tableClickRow (row) {
      // this.tableSettingData[this.currentTable].currentSelection = row;
      // let ids = this.tableSettingData[this.currentTable].chooseRowIds;
      // ids.push(row.id);
      // this.ids = this.myUtils.arrayWeight(ids);
    },


    //表格某一行双击
    tableDblClick (row) {
      console.log(row);
      this.detail_visible = true
      //this.in_workOrder_table_visible = true;
    },
    //table多选时触发的事件
    handleSelectionChange (val) {
      switch (this.currentTable) {
        case 'workOrder':
          console.log('re' + val);
          break;
        case 'goods':
          this.tableSettingData[this.currentTable].multiSelection = val;
          break;
        default:
          break;
      }
      console.log(val);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
    handleSizeChange (val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {

      this.tableSettingData[this.currentTable].params.page = val;
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







    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = maintenanceSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    }
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/maintenance/index.scss";
</style>
