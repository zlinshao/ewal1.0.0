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
        <el-button type="warning" plain @click="changeAccessTab(1)" :autofocus='accessTab===1'>待回访</el-button>
        <el-button type="primary" plain @click="changeAccessTab(2)" :autofocus='accessTab===2'>二次回访</el-button>
        <el-button type="primary" plain @click="changeAccessTab(3)" :autofocus='accessTab===3'>多次回访</el-button>
        <el-button type="danger" plain @click="changeAccessTab(4)" :autofocus='accessTab===4'>已完成</el-button>
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
                <el-select v-model="recordOption.option" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6" class='origin'>
              <p><i class='icon'></i>来源</p>
              <div class='input_box'>
                <el-select v-model="recordOption.origin" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.origin" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6" class='freePay'>
              <p><i class='icon'></i><span>是否收取其他费用</span></p>
              <div class='input_box'>
                <el-radio v-model="addRecordOption.free" label="1">是</el-radio>
                <el-radio v-model="addRecordOption.free" label="2">否</el-radio>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class='add_record_form'>
            <el-col :span="6" class='satisfied'>
              <p><i class='icon'></i>满意度</p>
              <div class='input_box'>
                <el-rate v-model="recordOption.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
            </el-col>
            <el-col :span="18" class='note'>
              <p><i class='icon'></i>备注</p>
              <div class='input_box'>
                <el-input v-model="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class='add_record_form'>
            <el-col :span="6" class='feiyong'>
              <p><i class='icon'></i>费用名称</p>
              <div class='input_box'>
                <el-input v-model="recordOption.note" placeholder="请输入"></el-input>
                <i class='icons icon_add'></i>
              </div>
            </el-col>
            <el-col :span="6" class='feiyong'>
              <p><i class='icon'></i>费用金额</p>
              <div class='input_box'>
                <el-input v-model.number="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col :span="6" class='feiyong'>
              <p><i class='icon'></i>费用名称</p>
              <div class='input_box'>
                <el-input v-model="recordOption.note" placeholder="请输入"></el-input>
                <i class='icons icon_del'></i>
              </div>
            </el-col>
            <el-col :span="6" class='feiyong'>
              <p><i class='icon'></i>费用金额</p>
              <div class='input_box'>
                <el-input v-model.number="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="detail">
            <el-col :span="6" class=' el-border'>
              <h5>客户信息</h5>
              <div>
                <span class='tit'>姓名</span>
                <span class="content">东皇</span>
              </div>
              <div>
                <span class='tit'>性别</span>
                <span class="content">男</span>
              </div>
              <div>
                <span class='tit'>性质</span>
                <span class="content">房东</span>
              </div>
              <div>
                <span class='tit'>手机号</span>
                <span class="content">15854185432</span>
              </div>
              <div>
                <span class='tit'>身份证号</span>
                <span class="content">320811199205141564</span>
              </div>
            </el-col>
            <el-col :span='12' class='el-border'>
              <h5>合同信息</h5>
              <el-row :gutter="10">
                <el-col :span='12'>
                  <div>
                    <span class='tit'>签约人</span>
                    <span class="content">盖聂</span>
                  </div>
                  <div>
                    <span class='tit'>负责人</span>
                    <span class="content">位置</span>
                  </div>
                  <div>
                    <span class='tit'>合同编号</span>
                    <span class="content">LJSF010004843</span>
                  </div>
                  <div>
                    <span class='tit'>签约时间</span>
                    <span class="content">2019.1.21</span>
                  </div>
                  <div>
                    <span class='tit'>合约时长</span>
                    <span class="content">2019.1.22-2020.1.21</span>
                  </div>
                  <div>
                    <span class='tit'>合同照片</span>
                    <p class='content'>
                      <img src="" alt="">
                    </p>
                  </div>
                </el-col>
                <el-col :span='12'>
                  <div>
                    <span class='tit'>部门</span>
                    <span class="content">盖聂</span>
                  </div>
                  <div>
                    <span class='tit'>付款方式</span>
                    <span class="content">位置</span>
                  </div>
                  <div>
                    <span class='tit'>收费价格</span>
                    <span class="content">LJSF010004843</span>
                  </div>
                  <div>
                    <span class='tit'>合同状态</span>
                    <span class="content">2019.1.21</span>
                  </div>
                  <div>
                    <span class='tit'>回访状态</span>
                    <span class="content">已回访</span>
                  </div>
                  <div>
                    <span class='tit'>其他附件</span>
                    <p class='content'>
                      <img src="" alt="">
                    </p>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span='6'>
              <h5>房屋信息</h5>
              <div>
                <span class='tit'>房屋地址</span>
                <span class="content">仙居雅苑1-101</span>
              </div>
            </el-col>
            <el-col :span='6'>
              <h5>中介信息</h5>
              <div>
                <span class='tit'>中介名称</span>
                <span class="content">链家</span>
              </div>
              <div>
                <span class='tit'>中介价格</span>
                <span class="content">10000</span>
              </div>
              <div>
                <span class='tit'>中介姓名</span>
                <span class="content">哈哈</span>
              </div>
              <div>
                <span class='tit'>中介电话</span>
                <span class="content">15854185432</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class='dialog_footer'>
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info">取消</el-button>
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
            <div class='right_tips'>
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
              <div class='detail_dialog_right'>
                <p>来源:朋友</p>
                <p>其他费用:无</p>
                <p>
                  满意度:
                  <el-rate class='detail_dialog_rato' v-model="value5" disabled score-template="{value}">
                  </el-rate>
                </p>
                <p>备注：客对房客户对房屋很客户对房屋很满意客户对房屋很满意屋很满意客户对房屋很满意</p>
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
      visibleStatus: false,
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
      searchData: {
        status: 'visitToRecord',
        data: [],
      },
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
        address: '',
        contract_number: '',
        org: '',
        sign_date_min: '',
        sign_date_max: '',
        signer: ''
      },
      //回访记录
      record: [],
      record_housename: '',
      chooseRowIds: [],
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
          label: 'df'
        },
        {
          value: '2',
          label: 'afasdf'
        }]
      },
      recordOption: {
        option: '',
        origin: '',
        free: '',
        rate: 0,
        note: ''
      },
      detail_visible: false,
      recordDetail: {

      },
      value5: 3,

      market_server: globalConfig.market_server,
    }
  },
  created () {
    this.getRecordList()
  },
  methods: {
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
        //正则匹配汉字
        if (/[\u4E00-\u9FA5]+/.test(val.search)) {
          this.params.address = val.search //地址
        } else {
          this.params.contract_number = '' //合同编号
        }

        if (val.date1.length > 0) {
          this.params.sign_date_min = val.date1[0] //签约最小值
          this.params.sign_date_max = val.date1[1] //签约最大值
        }
        this.params.signer = val.staff[0] || ''//签约人
        this.params.org = val.department[0] || ''//部门

        this.getRecordList()
      }
    },
    //初始化数据
    getRecordList () {
      this.showLoading(true);
      this.params.type = this.chooseTab
      this.params.status = this.accessTab
      this.$http.get(this.market_server + 'v1.0/csd/revisit', this.params).then(res => {
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
    // 双击查看回访记录
    tableClickRow (row) {
      //  this.$http.get(this.market_server + `v1.0/csd/revist/${this.chooseTab}/${row.contract_id}`).then(res => {
      this.$http.get(this.market_server + `v1.0/csd/revisit/2/1`).then(res => {
        if (res.code === 200) {
          if (res.data.record && res.data.record.length > 0) {
            this.record = res.data.record
            this.detail_visible = true;
            console.log(row)
            this.record_housename = row.house_name
            return
          }
        }
        this.record = []
        this.$LjNotify('warning', {
          title: '警告',
          message: '暂无回访记录'
        })

      })
    },
    //切换分页
    handleCurrentChange (val) {
      this.params.page = val
      this.getRecordList()
    },
    handleAddRecord (row) {
      this.add_visible = true
    },
    handleCloseAdd () {
      this.add_visible = false;
    },
    handleCloseDetail () {
      this.detail_visible = false;
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/visitToRecord/index.scss";
</style>
