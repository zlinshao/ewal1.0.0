<template>
  <div id="visitToRecord">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>回访记录</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button :id="'active-'+item.type" plain @click="changeAccessTab(item.id)" :class='[accessTab ==item.id ? "el-button-active":""]'
          v-for='item in method_btns' :key='item.id'>{{item.title}}</el-button>
        <div class="icons search" @click="highSearch" style='margin-left:46px;'></div>
      </div>
    </div>

    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableClickRow"
        header-row-class-name="tableHeader" style="width: 100%">
        <el-table-column v-for="item in Object.keys(tableShowDate)" :key="item" align="center" :prop="item" :label="tableShowDate[item]">
        </el-table-column>
        <el-table-column width="200" v-if="$storage.get('VALIDATE_PERMISSION')['Revisit-Operate']" label="操作" align="center">
          <template slot-scope="scope">
            <div class="flex-center">
              <el-button id='active-success' size="mini" @click.stop="handleAddRecord(scope.row)">新增回访记录</el-button>
              <el-button id='active-danger' v-if="scope.row.revist_id&&accessTab!==4" size="mini" @click.stop="completeRecord(scope.row)">完成</el-button>
            </div>
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

    <!-- 新增回访 -->
    <lj-dialog :visible="add_visible" :size="{width: 1300 + 'px',height: 800 + 'px'}" @close="handleCloseAdd">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增回访记录</h3>
        </div>
        <div class='dialog_main'>
          <el-row :gutter="20" class='add_record_form'>
            <el-col :span="6" class='contact'>
              <p><i class='icon'></i>是否接通</p>
              <div class='input_box'>
                <el-select v-model="recordOption.is_connect" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col v-if="recordOption.is_connect==1" :span="6" class='origin'>
              <p><i class='icon'></i>来源</p>
              <div class='input_box'>
                <el-select v-model="recordOption.from" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.origin" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col v-if="recordOption.is_connect==1" :span="6" class='freePay'>
              <p><i class='icon'></i><span>是否收取其他费用</span></p>
              <div class='input_box'>
                <el-radio v-model="recordFree" label="1">是</el-radio>
                <el-radio v-model="recordFree" label="2">否</el-radio>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5" class='add_record_form' v-if='recordFree == 1'>
            <el-col v-if="recordOption.is_connect==1" :span='12' v-for='(feiyong,index) in other_fee' :key='"feiyong" + index'>
              <el-row :gutter="15">
                <el-col :span="12" class='feiyong'>
                  <p><i class='icon'></i>费用名称</p>
                  <div class='input_box'>
                    <el-input v-model="feiyong.name" placeholder="请输入"></el-input>
                    <i class='icons icon_add' v-if='index== 0' @click='addFeiyong'></i>
                    <i class='icons icon_del' v-else @click="delFeiyong(index)"></i>
                  </div>
                </el-col>
                <el-col :span="12" class='feiyong'>
                  <p><i class='icon'></i>费用金额</p>
                  <div class='input_box'>
                    <el-input v-model.number="feiyong.money" placeholder="请输入"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" class='add_record_form'>
            <el-col v-if="recordOption.from=='中介' && recordOption.is_connect =='1' " :span="6" class='record-name'>
              <p><i class='icon'></i>中介名称</p>
              <div class='input_box'>
                <el-input v-model="recordOption.agent_name" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col v-if="recordOption.from=='中介' && recordOption.is_connect =='1' " :span="6" class='freePay'>
              <p><i class='icon'></i>中介价格</p>
              <div class='input_box'>
                <el-input v-model="recordOption.agent_price" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col v-if="recordOption.from=='中介' && recordOption.is_connect =='1' " :span="6" class='record-username'>
              <p><i class='icon'></i>中介人</p>
              <div class='input_box'>
                <el-input v-model="recordOption.agent_user" placeholder="请输入"></el-input>
              </div>
            </el-col>
             <el-col v-if="recordOption.from=='中介' && recordOption.is_connect =='1' " :span="6" class='contact'>
              <p><i class='icon'></i>中介电话</p>
              <div class='input_box'>
                <el-input v-model="recordOption.agent_phone" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class='add_record_form'>
            <el-col v-if="recordOption.is_connect==1" :span="6" class='satisfied'>
              <p><i class='icon'></i>满意度</p>
              <div class='input_box'>
                <el-rate v-model="recordOption.star" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
            </el-col>
            <el-col :span="18" class='note'>
              <p id="notep"><i class='icon'></i>备注</p>
              <div class='input_box'>
                <el-input v-model="recordOption.record" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class='add_record_form'>
            <el-col :span="6" class='record-user'>
              <p><i class='icon'></i><span>是否中介单</span></p>
              <div class='input_box'>
                <el-select v-model="recordOption.is_agency_order"  disabled clearable>
                  <el-option value="1" label="是"></el-option>
                  <el-option value="0" label="否"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class='add_record_form' v-if="recordOption.is_agency_order=='1'">
            <el-col :span="6" class='freePay'>
              <p><i class='icon'></i><span>信息审核</span></p>
              <div class='input_box'>
                <el-radio v-model="recordOption.data_check_result" label="doubt">存疑</el-radio>
                <el-radio v-model="recordOption.data_check_result" label="normal">正常</el-radio>
              </div>
            </el-col>
            <el-col v-if="recordOption.data_check_result=='doubt'" :span="12" class='record-reason'>
              <p style="width: 120px"><i class='icon'></i><span>存疑原因</span></p>
              <div class='input_box'>
                <el-input placeholder="请输入" v-model="recordOption.doubt_reason"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="detail" v-if='recordDetail'>
            <el-col :span="6" class='detail_col el-border'>
              <h5>客户信息</h5>
              <div class='detail_col_box detail_col_box2' width='100%'>
                <div>
                  <span class='tit'>姓名</span>
                  <span class="content">{{recordDetail.customer_info && recordDetail.customer_info[0].name || '--'}}</span>
                </div>
                <div>
                  <span class='tit'>性别</span>
                  <span class="content">{{recordDetail.customer_info && recordDetail.customer_info[0].sex == 2 ? "男":"女"}}</span>
                </div>
                <div>
                  <span class='tit'>性质</span>
                  <span class="content">{{chooseTab == 1 ? "房东":"租客"}}</span>
                </div>
                <div>
                  <span class='tit'>手机号</span>
                  <span class="content">{{recordDetail.customer_info && recordDetail.customer_info[0].phone || '--'}}</span>
                </div>
                <div>
                  <span class='tit'>身份证号</span>
                  <span class="content">{{recordDetail.customer_info && recordDetail.customer_info[0].idcard || '--'}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span='12' class="detail_col el-border scroll_bar">
              <h5>合同信息</h5>
              <el-row :gutter="6" class='detail_col_box'>
                <el-col :span='12'>
                  <div>
                    <span class='tit'>签约人</span>
                    <span class="content">{{recordDetail.sign_user || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>负责人</span>
                    <span class="content">{{recordDetail.org_leader || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>合同编号</span>
                    <span class="content">{{recordDetail.contract_number || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>签约时间</span>
                    <span class="content">{{recordDetail.sign_at || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>合约时长</span>
                    <span class="content">{{recordDetail.sign_month && recordDetail.sign_month.moth_to_year || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>合同照片</span>
                    <p class='content' v-if='recordDetail.album'>
                      <lj-upload size='40' :value="recordDetail.album.photo" disabled=true :download='false'></lj-upload>
                      <!-- <img :src="img.uri" alt="" v-for='img in recordDetail.album.photo' :key='img.id' data-magnify=""
                        data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'> -->
                    </p>
                  </div>
                </el-col>
                <el-col :span='12'>
                  <div>
                    <span class='tit'>部门</span>
                    <span class="content">{{recordDetail.sign_org || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>付款方式</span>
                    <span class="content">{{recordDetail.pay_way || '--'}}</span>
                  </div>
                  <div>
                    <span class='tit'>收费价格</span>
                    <p class="content" v-if="recordDetail.month_price && recordDetail.month_price.length > 0">
                      <span v-for="(item,key) in recordDetail.month_price" :key="key"> {{ item.price }}元 {{
                        item.period }}个月</span>
                    </p>
                  </div>
                  <div>
                    <span class='tit'>合同状态</span>
                    <span class="content">{{recordDetail | contractStatusFormat}}</span>
                  </div>
                  <div>
                    <span class='tit'>回访状态</span>
                    <span class="content">{{recordDetail.is_connect ?'已回访':'未回访'}}</span>
                  </div>
                    <div>
                    <span class='tit'>合同链接</span>
                    <span class="content">
                      <a :href="recordDetail.e_contract" target='_blank'>{{recordDetail.e_contract}}</a>
                    </span>
                  </div>
                  <!-- <div>
                    <span class='tit'>其他附件</span>
                    <div class='content content_album'>
                      <div v-for='(item,key) in recordDetail.album' :key="key" class='imgs_box' v-if='key !="photo"'>
                        <p>{{dataAlbum[key]}}</p>
                        <lj-upload size="40" v-model="recordDetail.album[key]" disabled=true :download='false'></lj-upload>
                      </div>
                    </div>
                  </div> -->
                </el-col>
              </el-row>
            </el-col>
            <el-col :span='6' class='detail_col' v-if='recordDetail.is_agency == 1'>
              <h5>中介信息</h5>
              <div class='detail_col_box  detail_col_box2'>
                <div>
                  <span class='tit'>中介名称</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_name || ''}}</span>
                </div>
                <div>
                  <span class='tit'>中介价格</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_price || '--'
                    + "元"}}</span>
                </div>
                <div>
                  <span class='tit'>中介姓名</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_user_name ||
                    '--'}}</span>
                </div>
                <div>
                  <span class='tit'>中介电话</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_phone || '--'}}</span>
                </div>
              </div>
            </el-col>
             <el-col :span='6' class='detail_col'>
              <h5>房屋信息</h5>
              <div class='detail_col_box'>
                <span class='tit'>房屋地址</span>
                <span class="content">{{recordDetail.house && recordDetail.house.name || '--'}}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class='dialog_footer'>
          <el-button id='active-danger' class='el-button-active' size="small" @click='addRecord(1)'>新增并完成</el-button>
          <el-button id='active-danger' class='el-button-active' size="small" @click='addRecord(0)'>新增</el-button>
          <el-button id='active-info' size="small" @click='handleCloseAdd'>取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 回访记录 -->
    <RecordeDialog :moduleData='record_info' :visible='detail_visible' @close='handleCloseDetail' />
    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import LjDialog from '../../common/lj-dialog.vue';
import MenuList from '../../common/menuList.vue';
import RecordeDialog from '../components/recorde-dialog';
import { visitToRecordSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
export default {
  name: "index",
  components: {
    SearchHigh,
    LjDialog,
    MenuList,
    RecordeDialog
  },
  data () {
    return {
      customService,
      visibleStatus: false, //客服
      chooseTab: 1,
      accessTab: 1,
      selects: [
        {
          id: 1,
          title: '收房',
        },
        {
          id: 2,
          title: '租房',
        }
      ],
      method_btns: [
        {
          id: 1,
          title: '待回访',
          type: 'warning'
        },
        {
          id: 2,
          title: '二次回访',
          type: 'primary'
        }, {
          id: 3,
          title: '多次回访',
          type: 'primary'
        }, {
          id: 4,
          title: '已完成',
          type: 'danger'
        }
      ],
      showSearch: false,
      searchData: {},
      // table 数据
      tableShowDate: {
        sign_at: '签约时间',
        contract_number: '合同编号',
        house_name: '地址',
        sign_month: '合约时长',
        sign_user: '开单人',
        org_leader: '负责人',
        sign_org: '部门',
      },
      tableData: [],
      tableDateCount: 0,
      //获取数据通用格式
      params: {
        type: '',
        page: 1,
        limit: 10,
        status: 1,
        search: '',
        org: '',
        sign_date_min: '',
        sign_date_max: '',
        signer: ''
      },
      //回访记录
      detail_visible: false,
      record: [],
      record_housename: '',
      //添加回访记录
      add_visible: false,
      addRecordOption: {
        options: [{
          value: '1',
          label: '接通'
        },
        {
          value: '0',
          label: '未接通'
        }],
        origin: [{
          value: '1',
          label: '朋友'
        },
        {
          value: '2',
          label: '中介'
        },
        {
          value: '3',
          label: '老房东'
        },
        {
          value: '4',
          label: '广告'
        }, {
          value: '5',
          label: '网络'
        },
        {
          value: '6',
          label: '其他'
        }
        ]
      },
      recordDetail: null,
      recordFree: null,
      recordOption: {
        contract_id: null,
        contract_number: null,
        is_connect: null,
        from: '',
        star: null,
        record: '',
        is_agency_order:null,//是否中介单
        agent_name:null,//中介名称
        agent_price:null,//中介价格
        agent_user:null,//中介人
        agent_phone:null,//中介电话
        data_check_result:null,//信息审核
        doubt_reason:'',//存疑原因
      },
      other_fee: [{
        name: null,
        money: null
      }],
      //暂存 点击row
      currentRow: null,
      url: globalConfig.market_server,
      dataAlbum: {
        identity_photo: '证件照片',
        bank_photo: '银行卡照片',
        photo: '合同照片',
        water_photo: '水表照片',
        electricity_photo: '电表',
        gas_photo: '气表照片',
        checkin_photo: '交接单照片',
        checkout_photo:'退租交接单照片',
        checkout_settle_photo:'退租结算照片',
        auth_photo: '委托书照片',
        deposit_photo: '押金照片',
        promise: '承诺书照片',
        property_photo: '房产证',
        water_card_photo: '水卡',
        electricity_card_photo: '电卡',
        gas_card_photo: '气卡',
        other_photo:'其他照片',
        house_video:'房屋照片',
      },
      record_info: {},
      currentMethod: '',
      isAddRecord: false
    }
  },
  created () {
    this.getRecordList()
  },
  filters: {
    contractStatusFormat (item) {
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
  methods: {

    //完成回访
    completeRecord(row) {
      let revist_id = row.revist_id||null;//回访id
      if(!revist_id) return;
      this.$http.put(`${this.url}/v1.0/csd/revisit/${revist_id}`).then(res=> {
        this.$LjNotifyEasy(res,()=> {
          this.getRecordList();
        });
      });
    },

    //初始化数据
    getRecordList () {
      if(!this.validatePermission('Revisit-Read')) return;
      this.showLoading(true);
      this.params.type = this.chooseTab
      this.params.status = this.accessTab
      this.$http.get(this.url + 'v1.0/csd/revisit', this.params).then(res => {
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
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    // 切换收房 租房
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
        this.clearTable()
      }
    },
    // 改变访问状态
    changeAccessTab (id) {
      if (this.accessTab !== id) {
        this.accessTab = id
        this.clearTable()
      }
    },
    clearTable () {
      this.tableData = []
      this.params.page = 1
      this.getRecordList()
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = visitToRecordSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.params.page = 1
        this.params.search = val.search
        this.params.sign_date_min = val.date1[0] || '' //签约最小值
        this.params.sign_date_max = val.date1[1] || ''//签约最大值
        this.params.signer = val.staff[0] || ''//签约人
        this.params.org = val.department[0] || ''//部门
        this.getRecordList()
      }
    },
    // 双击查看回访记录
    tableClickRow (row) {
      console.log(row)
      this.record_info = {
        type: 1,
        house_name: row.house_name || '----',
        contract_type: this.chooseTab,
        contract_id: row.con_id
      }
      this.currentRow = row
      this.detail_visible = true
    },
    //切换分页
    handleCurrentChange (val) {
      this.params.page = val
      this.getRecordList()
    },
    //添加回访记录
    handleAddRecord (row) {
      this.recordOption.contract_id = row.con_id;
      this.recordOption.contract_number = row.contract_number;
      this.$http.get(this.url + `v1.0/market/contract/${this.chooseTab}/${row.con_id}`).then(res => {
        if (res.code === 200) {
          this.recordDetail = res.data;
          this.recordOption.is_agency_order = this.recordDetail.is_agency.toString();
          this.add_visible = true;
        }
      })
    },
    addFeiyong () {
      this.other_fee.push({
        name: '',
        money: ''
      })
    },
    delFeiyong (index) {
      this.other_fee.splice(index, 1)
    },
    vailRecord () {
      let { is_connect, from, star, record, is_agency_order } = this.recordOption
      if (!is_connect && is_connect != 0) return '是否接通未选择'
       if(is_agency_order == '1' ) {
          if(!this.recordOption.data_check_result){
             return '信息审核必填'
          }
        }
      if (is_connect == 1) {
        if (!from) return '来源未选择'
        if (!this.recordFree) return '是否收取其他费用未选择'
        if (star == 0) return '满意度未选择,满意度至少一分'
        if (this.recordFree == 1) {
          for (let i = 0; i < this.other_fee.length; i++) {
            let el = this.other_fee[i]
            if (!el.name) return '费用名称未填写'
            if (!el.money) return '费用金额未填写'
            if(isNaN(el.money)) return "请输入正确的金额";
          }
        }
      }

      return null
    },
    addRecord (status) {
      let warn = this.vailRecord();
      if (warn) {
        this.$LjNotify('warning', {
          title: '提示',
          message: warn,
        })
        return;
      }
      if(this.recordOption.data_check_result) {
        if(this.recordOption.data_check_result=='doubt') {
          this.$LjConfirm({content:'中介费是否确定存疑？</br> （确定后将向管控发送核实任务）'}).then(()=> {
            this.addRecordApi(status);
          })
        }
        if(this.recordOption.data_check_result=='normal') {
          this.$LjConfirm({content:'中介费是否确定正常？</br> （确定后将向业务员派发中介费报备任务）'}).then(()=> {
            this.addRecordApi(status);
          });
        }
      }else {
        this.addRecordApi(status);
      }
    },
    //添加记录接口调用
    addRecordApi(status) {
      let recordOption = this.recordOption;
      recordOption.contract_type = this.chooseTab;
      if (this.recordFree == 1) {
        recordOption.other_fee = this.other_fee;
      } else {
        recordOption.other_fee = '';
      }
      recordOption.status=status;
      this.$http.post(this.url + 'v1.0/csd/revisit', recordOption).then(res => {
        this.$LjNotifyEasy(res,()=> {
          this.isAddRecord = true;
          this.handleCloseAdd();
        });
      })
    },

    record_addRecord () {
      this.handleAddRecord(this.currentRow)
      this.detail_visible = false
    },
    handleCloseAdd () {
      this.add_visible = false;
      if (this.currentMethod == 'addRecord') {
        this.tableClickRow(this.currentRow)
      } else {
        this.recordDetail = null
        this.currentRow = null

        if (this.isAddRecord) {
          this.getRecordList()
        }
        this.isAddRecord = false
      }
      this.recordOption = {
        contract_id: null,
        contract_number: null,
        is_connect: null,
        from: '',
        star: null,
        record: '',
      }
      this.other_fee = [{
        name: null,
        money: null
      }]
      this.recordFree = null
    },
    handleCloseDetail (param) {
      if (param == 'add') {
        this.currentMethod = 'addRecord'
        this.add_visible = true
        this.record_addRecord()
      } else {
        this.currentRow = null
        this.detail_visible = false
        this.recordDetail = null
        this.currentMethod = ''
        if (this.isAddRecord) {
          this.getRecordList()
        }
        this.isAddRecord = false
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/visitToRecord/index.scss";
#visitToRecord {
  .dialog_footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
//  .notep{
//     margin-right: 30px;
//   }
</style>
