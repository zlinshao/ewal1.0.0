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
        <el-button type="warning" plain @click="changeAccessTab(1)" :class='[accessTab ==1 ? "active-warning":""]'>待回访</el-button>
        <el-button type="primary" plain @click="changeAccessTab(2)" :class='[accessTab ==2 ? "active-primary":""]'>二次回访</el-button>
        <el-button type="primary" plain @click="changeAccessTab(3)" :class='[accessTab ==3 ? "active-primary":""]'>多次回访</el-button>
        <el-button type="danger" plain @click="changeAccessTab(4)" :class='[accessTab ==4 ? "active-danger":""]'>已完成</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>

    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableClickRow"
        header-row-class-name="tableHeader" style="width: 100%">
        <el-table-column v-for="item in Object.keys(tableShowDate)" :key="item" align="center" :prop="item" :label="tableShowDate[item]">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click.stop="handleAddRecord(scope.row)">新增回访记录</el-button>
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
    <lj-dialog :visible="add_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseAdd">
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
            <el-col :span="6" class='origin'>
              <p><i class='icon'></i>来源</p>
              <div class='input_box'>
                <el-select v-model="recordOption.from" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.origin" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6" class='freePay'>
              <p><i class='icon'></i><span>是否收取其他费用</span></p>
              <div class='input_box'>
                <el-radio v-model="recordFree" label="1">是</el-radio>
                <el-radio v-model="recordFree" label="2">否</el-radio>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class='add_record_form'>
            <el-col :span="6" class='satisfied'>
              <p><i class='icon'></i>满意度</p>
              <div class='input_box'>
                <el-rate v-model="recordOption.star" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
            </el-col>
            <el-col :span="18" class='note'>
              <p><i class='icon'></i>备注</p>
              <div class='input_box'>
                <el-input v-model="recordOption.record" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5" class='add_record_form' v-if='recordFree == 1'>
            <el-col :span='12' v-for='(feiyong,index) in recordOption.other_free' :key='"feiyong" + index' class='add_record_form'>
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

          <el-row :gutter="10" class="detail" v-if='recordDetail'>
            <el-col :span="6" class='detail_col el-border' v-if='recordDetail.customer_info'>
              <h5>客户信息</h5>
              <div class='detail_col_box detail_col_box2' width='100%'>
                <div>
                  <span class='tit'>姓名</span>
                  <span class="content">{{recordDetail.customer_info.name}}</span>
                </div>
                <div>
                  <span class='tit'>性别</span>
                  <span class="content">{{recordDetail.customer_info.sex == 1 ? "男":"女"}}</span>
                </div>
                <div>
                  <span class='tit'>性质</span>
                  <span class="content">{{chooseTab == 1 ? "房东":"租客"}}</span>
                </div>
                <div>
                  <span class='tit'>手机号</span>
                  <span class="content">{{recordDetail.customer_info.phone || '/'}}</span>
                </div>
                <div>
                  <span class='tit'>身份证号</span>
                  <span class="content">{{recordDetail.customer_info.idcard || '/'}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span='12' class='detail_col el-border'>
              <h5>合同信息</h5>
              <el-row :gutter="10" class='detail_col_box'>
                <el-col :span='12'>
                  <div>
                    <span class='tit'>签约人</span>
                    <span class="content">{{recordDetail.sign_user}}</span>
                  </div>
                  <div>
                    <span class='tit'>负责人</span>
                    <span class="content">{{recordDetail.org_leader}}</span>
                  </div>
                  <div>
                    <span class='tit'>合同编号</span>
                    <span class="content">{{recordDetail.contract_number}}</span>
                  </div>
                  <div>
                    <span class='tit'>签约时间</span>
                    <span class="content">{{recordDetail.sign_at}}</span>
                  </div>
                  <div>
                    <span class='tit'>合约时长</span>
                    <span class="content">{{recordDetail.sign_month.moth_to_year}}</span>
                  </div>
                  <div>
                    <span class='tit'>合同照片</span>
                    <p class='content'>
                      <img :src="img.uri" alt="" v-for='img in recordDetail.album.photo' :key='img.id' data-magnify=""
                        data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
                    </p>
                  </div>
                </el-col>
                <el-col :span='12'>
                  <div>
                    <span class='tit'>部门</span>
                    <span class="content">{{recordDetail.sign_org}}</span>
                  </div>
                  <div>
                    <span class='tit'>付款方式</span>
                    <span class="content">{{recordDetail.pay_way}}</span>
                  </div>
                  <div>
                    <span class='tit'>收费价格</span>
                    <span class="content">{{recordDetail.month_price[0].price + "元"}}</span>
                  </div>
                  <div>
                    <span class='tit'>合同状态</span>
                    <span class="content">{{recordDetail | contractStatusFormate}}</span>
                  </div>
                  <div>
                    <span class='tit'>回访状态</span>
                    <span class="content">{{recordDetail.is_connect ?'已回访':'未回访'}}</span>
                  </div>
                  <div>
                    <span class='tit'>其他附件</span>
                    <div class='content content_album'>
                      <div v-for='(item,key) in recordDetail.album' class='imgs_box' v-if='key !="photo"'>
                        <p>{{dataAblum[key]}}</p>
                        <div v-if='item'>
                          <img :src="img.uri" alt="" v-for='img in item' :key='img.id' data-magnify="" data-caption="图片查看器"
                            :data-src="img.uri" v-if='img.uri'>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span='6' class='detail_col' v-if='recordDetail.house_extension'>
              <h5>房屋信息</h5>
              <div class='detail_col_box detail_col_box2'>
                <span class='tit'>房屋地址</span>
                <span class="content">{{recordDetail.house_extension && recordDetail.house_extension.address || '--'}}</span>
              </div>
            </el-col>
            <el-col :span='6' class='detail_col' v-if='recordDetail.is_agency == 1 && recordDetail.agency_info'>
              <h5>中介信息</h5>
              <div class='detail_col_box  detail_col_box2'>
                <div>
                  <span class='tit'>中介名称</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_name || ''}}</span>
                </div>
                <div>
                  <span class='tit'>中介价格</span>
                  <span class="content">{{recordDetail.agency_info && recordDetail.agency_info.agency_price_now || '--'
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
          </el-row>
        </div>

        <div class='dialog_footer'>
          <el-button type="danger" size="small" @click='addRecord'>新增</el-button>
          <el-button type="info" @click='handleCloseAdd'>取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 回访记录 -->
    <lj-dialog :visible="detail_visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{record_housename}}</h3>
          <div class="main_header">
            <p class='left_tips'>
              <i class='icon'></i>回访记录</p>
            <div class='right_tips' @click='record_addRecord'>
              <b>+</b>
            </div>
          </div>
        </div>
        <div class='dialog_main detail_dialog'>
          <ul>
            <li v-for='item in record' :key='item.uid'>
              <div class='detail_dialog_left'>
                <p>{{item.add_user || '----'}}</p>
                <p>{{item.time}}</p>
              </div>
              <div class="detail_dialog_center">

                <div class='circle'></div>
              </div>
              <div class='detail_dialog_right' v-if='item.is_connect== 0'>
                <p>未接通</p>
              </div>
              <div class='detail_dialog_right' v-else>
                <p>来源:{{item.from}}</p>
                <p v-if='item.other_fee.length == 0'>其他费用:无</p>
                <div class='other_fee' v-else>
                  其他费用：
                  <p v-for='fee in  item.other_fee' :key='fee.name'>{{fee.name + ':' + fee.money + '元'}}</p>
                </div>
                <div>
                  满意度:
                  <el-rate class='detail_dialog_rato' v-model="item.star" disabled score-template="{value}">
                  </el-rate>
                </div>
                <p class='detail_dialog_note'>备注：{{item.remark}}</p>
              </div>

            </li>
          </ul>
        </div>
        <div class='dialog_footer'>
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import LjDialog from '../../common/lj-dialog.vue';
import MenuList from '../../common/menuList.vue';
import { visitToRecordSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
export default {
  name: "index",
  components: {
    SearchHigh,
    LjDialog,
    MenuList
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
        }]
      },
      recordDetail: null,
      recordFree: 0,
      recordOption: {
        contract_id: null,
        contract_number: null,
        is_connect: '',
        from: '',
        star: 0,
        record: '',
        other_free: [{
          name: '',
          money: ''
        }]
      },
      //暂存 点击row
      currentRow: null,
      market_server: globalConfig.market_server,
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
      }
    }
  },
  created () {
    this.getRecordList()
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
  methods: {
    //初始化数据
    getRecordList () {
      this.showLoading(true);
      this.params.type = this.chooseTab
      this.params.status = this.accessTab
      this.$http.get(this.market_server + 'v1.0/csd/revisit', this.params).then(res => {
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
        this.accessTab = 1 // 改变访问状态
        this.getRecordList()
      }
    },
    // 改变访问状态
    changeAccessTab (id) {
      if (this.accessTab !== id) {
        this.accessTab = id
        this.getRecordList()
      }
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
      this.$http.get(this.market_server + `v1.0/csd/revisit/${this.chooseTab}/${row.con_id}`).then(res => {
        if (res.code === 200) {
          if (res.data.record && res.data.record.length > 0) {
            this.record = res.data.record
            this.detail_visible = true;
            this.record_housename = row.house_name || '----'
            return
          }
        }
        this.record = []
        this.$LjNotify('warning', {
          title: '警告',
          message: '暂无回访记录'
        })
      })
      this.currentRow = row
    },
    //切换分页
    handleCurrentChange (val) {
      this.params.page = val
      this.getRecordList()
    },
    //添加回访记录
    handleAddRecord (row) {
      this.recordOption.contract_id = row.con_id
      this.recordOption.contract_number = row.contract_number
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}/${row.con_id}`).then(res => {
        if (res.code === 200) {
          this.recordDetail = res.data
          this.add_visible = true
        }
      })
    },
    addFeiyong () {
      this.recordOption.other_free.push({
        name: '',
        money: ''
      })
    },
    delFeiyong (index) {
      this.recordOption.other_free.splice(index, 1)
    },
    addRecord () {
      //判断内容填写
      if (!this.recordOption.is_connect ||
        !this.recordOption.from ||
        !this.recordFree ||
        !this.recordOption.star ||
        !this.recordOption.record) {
        this.$LjNotify('warning', {
          title: '警告',
          message: '记录数据未全部填写'
        })
        return
      }

      if (this.recordFree == 1) {
        let free = this.recordOption.other_free[0]
        if (free.name == '' || (!free.money && free.money != 0)) {
          this.$LjNotify('warning', {
            title: '警告',
            message: '填写其他费用'
          })
          return
        }
      }

      let recordOption = this.recordOption
      recordOption.contract_type = this.chooseTab
      if (this.recordOption == 1) {
        recordOption.other_free = JSON.stringify(recordOption.other_free)
      } else {
        recordOption.other_free = ''
      }


      this.$http.post(this.market_server + 'v1.0/csd/revisit', recordOption).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: '记录添加成功'
          })
          this.handleCloseAdd()
        } else {
          this.$LjNotify('warning', {
            title: '警告',
            message: '记录添加失败'
          })
        }
      })
    },
    record_addRecord () {
      this.detail_visible = false
      this.handleAddRecord(this.currentRow)
    },
    handleCloseAdd () {
      this.add_visible = false;
      this.recordDetail = null
      this.recordOption = {
        contract_id: null,
        contract_number: null,
        is_connect: '',
        from: '',
        star: 0,
        record: '',
        other_free: [{
          name: '',
          money: ''
        }]
      }
      this.recordFree = 0
      this.currentRow = null
    },
    handleCloseDetail () {
      this.detail_visible = false;
      this.record = [];
      this.record_housename = '';
      this.currentRow = null
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/visitToRecord/index.scss";
</style>
