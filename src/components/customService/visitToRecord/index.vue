<template>
  <div id="visitToRecord">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center">
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
        <el-button type="warning" plain>待回访</el-button>
        <el-button type="primary" plain>二次回访</el-button>
        <el-button type="primary" plain>多次回访</el-button>
        <el-button type="danger" plain>已完成</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>

    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData.visitToRecord.tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row :row-class-name="tableChooseRow" @cell-click="tableClickRow" header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column v-for="item in Object.keys(tableSettingData.visitToRecord.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.visitToRecord.showData[item]">
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.visitToRecord.params.page"
            :page-size="tableSettingData.visitToRecord.params.limit" :total="tableSettingData.visitToRecord.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!-- 新增回访 -->
    <lj-dialog :visible="add_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="handleCloseAdd">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增回访记录</h3>
        </div>
        <div class='dialog_main'>
          <div class="dialog_main_box">
            <div class='box'>
              <i class='icon20 icon-cancel'></i>
              <span class='title title1'>是否接通</span>
              <div class='input_box '>
                <el-select v-model="recordOption.option" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class='box'>
              <i class='icon'></i>
              <span class='title title1'>来源</span>
              <div class="input_box">
                <el-select v-model="recordOption.origin" placeholder="请选择">
                  <el-option v-for="item in addRecordOption.origin" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <i class='icon'></i>
              <span class='title'>是否收取其他费用</span>
              <el-radio v-model="addRecordOption.free" label="1">是</el-radio>
              <el-radio v-model="addRecordOption.free" label="2">否</el-radio>
            </div>
          </div>

          <div class="dialog_main_box">
            <div class='box'>
              <i class="icon"></i>
              <span class="title title1">满意度</span>
              <div class='input_box noBackground'>
                <el-rate v-model="recordOption.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>

            </div>
            <div class="box">
              <i class="icon"></i>
              <span class="title title1">备注</span>
              <div class='input_box input_box2'>
                <el-input v-model="recordOption.note"></el-input>
              </div>
            </div>
          </div>

          <div class="dialog_main_box">
            <div class='box cost_box'>
              <i class='icon'></i>
              <span class='title title1'>费用名称</span>
              <div class='input_box input_box_border'>
                <el-input v-model="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </div>
            <div class='box cost_box'>
              <i class='icon'></i>
              <span class='title title1'>费用金额</span>
              <div class='input_box  input_box_border'>
                <el-input v-model.number="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </div>
            <div class='box cost_box'>
              <i class='icon'></i>
              <span class='title title1'>费用名称</span>
              <div class='input_box input_box_border'>
                <el-input v-model="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </div>
            <div class='box cost_box'>
              <i class='icon'></i>
              <span class='title title1'>费用金额</span>
              <div class='input_box input_box_border'>
                <el-input v-model.number="recordOption.note" placeholder="请输入"></el-input>
              </div>
            </div>
          </div>

          <div class="detail">
            <div class='detail_box user_box'>
              <h5>客户信息</h5>
              <ul>
                <li>
                  <span class='tit'>姓名</span>
                  <span class="content">东皇</span>
                </li>
                <li>
                  <span class='tit'>性别</span>
                  <span class="content">男</span>
                </li>
                <li>
                  <span class='tit'>性质</span>
                  <span class="content">房东</span>
                </li>
                <li>
                  <span class='tit'>手机号</span>
                  <span class="content">15854185432</span>
                </li>
                <li>
                  <span class='tit'>身份证号</span>
                  <span class="content">320811199205141564</span>
                </li>
              </ul>
            </div>

            <div class='detail_box contract_box'>
              <h5>合同信息</h5>
              <div>
                <ul class='ul_left'>
                  <li>
                    <span class='tit'>签约人</span>
                    <span class="content">盖聂</span>
                  </li>
                  <li>
                    <span class='tit'>负责人</span>
                    <span class="content">位置</span>
                  </li>
                  <li>
                    <span class='tit'>合同编号</span>
                    <span class="content">LJSF010004843</span>
                  </li>
                  <li>
                    <span class='tit'>签约时间</span>
                    <span class="content">2019.1.21</span>
                  </li>
                  <li>
                    <span class='tit'>合约时长</span>
                    <span class="content">2019.1.22-2020.1.21</span>
                  </li>
                  <li>
                    <span class='tit'>合同照片</span>
                    <img src="" alt="">
                  </li>
                </ul>
                <ul>
                  <li>
                    <span class='tit'>部门</span>
                    <span class="content">盖聂</span>
                  </li>
                  <li>
                    <span class='tit'>付款方式</span>
                    <span class="content">位置</span>
                  </li>
                  <li>
                    <span class='tit'>收费价格</span>
                    <span class="content">LJSF010004843</span>
                  </li>
                  <li>
                    <span class='tit'>合同状态</span>
                    <span class="content">2019.1.21</span>
                  </li>
                  <li>
                    <span class='tit'>回访状态</span>
                    <span class="content">已回访</span>
                  </li>
                  <li>
                    <span class='tit'>其他附件</span>
                    <img src="" alt="">
                  </li>
                </ul>
              </div>
            </div>

            <div class="detail_box house_box">
              <h5>房屋信息</h5>
              <ul>
                <li>
                  <span class='tit'>房屋地址</span>
                  <span class="content">仙居雅苑1-101</span>
                </li>
              </ul>
            </div>

            <div class="detail_box house_box">
              <h5>中介信息</h5>
              <ul>
                <li>
                  <span class='tit'>中介名称</span>
                  <span class="content">链家</span>
                </li>
                <li>
                  <span class='tit'>中介价格</span>
                  <span class="content">10000</span>
                </li>
                <li>
                  <span class='tit'>中介姓名</span>
                  <span class="content">哈哈</span>
                </li>
                <li>
                  <span class='tit'>中介电话</span>
                  <span class="content">15854185432</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class='dialog_footer'>
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 回访记录 -->
    <lj-dialog :visible="detail_visible" :size="{width: 910 + 'px',height: 650 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>巧红元</h3>
          <div class='header_method listTopCss'>
            <p class='listTopLeft'>回访记录</p>
            <div class='listTopRight'>
              <div class='icons add'>
                <b>+</b>
              </div>
            </div>
          </div>
        </div>
        <div class='dialog_main detail_dialog'>
          <ul>
            <li v-for='i in  4'>
              <div class='detail_dialog_left'>
                <p>黄海</p>
                <p>2019.1.16</p>
              </div>
              <div class="detail_dialog_center">

                <div class='circle'></div>
              </div>
              <div class='detail_dialog_right'>
                <p>来源:朋友</p>
                <p>其他费用:无</p>
                <p>备注：客对房客户对房屋很客户对房屋很满意客户对房屋很满意屋很满意客户对房屋很满意
                  <el-rate class='detail_dialog_rato' v-model="value5" disabled score-template="{value}">
                  </el-rate>
                </p>
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
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import LjDialog from '../../common/lj-dialog.vue';
import { visitToRecordSearch } from '../../../assets/js/allSearchData.js';
export default {
  name: "index",
  components: {
    SearchHigh,
    LjDialog
  },
  data () {
    return {
      chooseTab: 1,
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
      tableSettingData: {
        visitToRecord: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            signTime: '签约时间',
            ContractNo: '合同编号',
            address: '地址',
            contractTime: '合约时长',
            openPer: '开单人',
            handler: '负责人',
            department: '部门',
          },
          tableData: [],
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
      value5: 3
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
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
        console.log(val);
      }
    },
    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          signTime: '2019-03-28',
          ContractNo: '10086',
          address: '地址',
          contractTime: '合约时长',
          openPer: '开单人',
          handler: '负责人',
          department: '部门',
        };
        this.tableSettingData.visitToRecord.tableData.push(obj);
      }
    },
    //table
    // 当前点击
    tableClickRow (row) {
      this.detail_visible = true
      let ids = this.chooseRowIds;
      ids.push(row.id);
      this.chooseRowIds = this.myUtils.arrayWeight(ids);
    },
    // 点击过
    tableChooseRow ({ row, rowIndex }) {
      return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
    },
    handleSizeChange (val) {
      //console.log(`每页 ${val} 条`);
    },
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
@import "../../../assets/scss/icon.scss";
</style>
