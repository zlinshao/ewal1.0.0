<template>
  <div id='dataAudit'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>资料审核</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain>收房</el-button>
        <el-button type="primary" plain>租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableSettingData.dataAudit.tableData" :height="this.mainListHeight(30) + 'px'"
        highlight-current-row @row-dblclick="handleGetDetail" header-row-class-name="tableHeader" style="width: 100%">

        <el-table-column v-for="item in Object.keys(tableSettingData.dataAudit.showData)" :key="item" align="center"
          :prop="item" :label="tableSettingData.dataAudit.showData[item]">
        </el-table-column>

      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableSettingData.dataAudit.params.page"
            :page-size="tableSettingData.dataAudit.params.limit" :total="tableSettingData.dataAudit.counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--合同详情-->
    <lj-dialog :visible="contract_detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同到期</h3>
          <div class="header_right">
            <span>{{contractDetail.contract_number}}</span>
            <el-button type='danger' size='mini' @click='' style='margin-left:10px'>作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main">
          <!---房屋信息-->
          <p class='main_tit'>房屋信息</p>
          <div class="house_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="物业地址">
                    <span>{{ contractDetail.property_address }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <span>{{ contractDetail.property_address2 }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span>{{ contractDetail.water_card }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃气卡号">
                    <span>{{ contractDetail.electric_card}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水卡卡号">
                    <span>{{ contractDetail.gas_card}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!--合同信息-->
          <p class='main_tit'>合同信息</p>
          <div class="contract_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="合同类型">
                    <span>{{ contractDetail.contract_type }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span>{{ contractDetail.createTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span>{{ contractDetail.timeDuring }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="空置期">
                    <span>{{ contractDetail.vacancy }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同开始时间">
                    <span>{{ contractDetail.startTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同结束时间">
                    <span>{{ contractDetail.endTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金">
                    <span>{{ contractDetail.deposit }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金">
                    <span>{{ contractDetail.breach }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <span>{{ contractDetail.price }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetail.payType }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第一次打房租日期">
                    <span>{{ contractDetail.firstClean }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第二次打房租日期">
                    <span>{{ contractDetail.secondClean }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房东承担费用">
                    <span>{{ contractDetail.houserPay }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="非房东承担费用">
                    <span>{{ contractDetail.noHouserPay }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否装修">
                    <span>{{ contractDetail.decorate }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否添加物品">
                    <span>{{ contractDetail.addGoods }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否渠道">
                    <span>{{ contractDetail.channel }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道名称">
                    <span>{{ contractDetail.channelName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道费">
                    <span>{{ contractDetail.channelPay }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道人">
                    <span>{{ contractDetail.channelPer }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="渠道电话">
                    <span>{{ contractDetail.channelPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资料补齐时间">
                    <span>{{ contractDetail.dataTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注">
                    <span>{{ contractDetail.note }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款">
                    <span>{{ contractDetail.noteTerms }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <span>{{ contractDetail.carry_person }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门">
                    <span>{{ contractDetail.department }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!--签约人及产权人信息-->
          <p class='main_tit'>签约人及产权人信息</p>
          <div class="person_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="1">
                  <el-form-item label="签约人" class='person_tit'>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.contractor.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.contractor.contact }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.contractor.id_card }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label="产权人" class='person_tit'></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="姓名">
                    <span>{{ contractDetail.property_person.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <span>{{ contractDetail.property_person.contact}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <span>{{ contractDetail.property_person.id_card}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p class='main_tit'>收款账号</p>
          <div class="collection_info">
            <div class="flex-center" v-for='i in 3' :key='i'>
              <div clas="flex_center_tit">银行证件</div>
              <div class='flex_center_content'>
                <img data-caption="图片查看器">
                <!-- <img v-for="tmp in item" :key="tmp.id" data-magnify="" data-caption="图片查看器" :data-src="tmp.uri" :src="tmp.uri"
                  style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri"> -->
              </div>
            </div>
            <p class='collection_info_warning'>(包括委托书/收条/授权委托书/承诺书)</p>
          </div>

          <p class='main_tit'>资料不齐记录</p>
          <div class='data_info'>
            <div class="flex-center">
              <div class="flex_center_tit">发送对象</div>
              <div class="flex_center_content flex_center_content1">
                <el-input @focus="organSearch" readonly v-model="postman" :placeholder="contractDetail.contractor.name + ',' + contractDetail.property_person.name"></el-input>

                <!-- <el-input v-model="contractDetail.postman" placeholder="默认为开单人,负责人"></el-input> -->
              </div>
            </div>

            <div class="flex-center flex-center2">
              <div class="flex_center_tit">不齐内容</div>
              <div class="flex_center_content flex_center_content2">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="postContent">
                </el-input>
                <div class='buttons'>
                  <p class='buttons_left'>
                    <i class='icon'></i>
                    <span>发送</span>
                  </p>
                  <el-button type="primary" plain @click='handleGetRecord'>不良记录</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_fo">
          <el-button type="success">通过</el-button>
          <el-button type="warning">驳回</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--资料不全 开单人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--资料不齐记录-->
    <lj-dialog :visible="dataRecord_visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseRecord">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>资料不齐记录</h3>
        </div>
        <div class="dialog_main dataRecord_dialog_main">
          <div v-for='i in  4' class='dataRecord_cell'>
            <div class='detail_dialog_left'>
              <p>黄海</p>
              <p>2019.1.16</p>
            </div>
            <div class="detail_dialog_center">
              <div class='circle'></div>
            </div>
            <div class='detail_dialog_right'>
              <p>交接单不齐</p>
              <p>发送对象:野原新之助</p>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
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
import StaffOrgan from '../../common/staffOrgan.vue'
import MenuList from '../../common/menuList.vue';
import LjDialog from '../../common/lj-dialog.vue';
import { dataAuditSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';

export default {
  name: 'index',
  components: {
    SearchHigh,
    StaffOrgan,
    MenuList,
    LjDialog
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      selects: [
        {
          id: 1,
          title: '待审核'
        },
        {
          id: 2,
          title: '跟进中'
        },
        {
          id: 3,
          title: '已完成'
        }
      ],
      chooseTab: 1,
      showSearch: false,
      searchData: {
        status: 'housingDue',
        data: [],
      },
      tableSettingData: {
        dataAudit: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            createTime: '签约时间',
            ContractNo: '合同编号',
            address: '地址',
            nature: '合同性质',
            compay: '所属公司',
            houser_name: '房东姓名',
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
      //合同详情
      contract_detail_visible: false,
      contractDetail: {
        contract_number: 'LHZF2014020312',
        property_address: '东方花园',
        property_address2: '南京路',
        water_card: 320115121561,
        electric_card: 320115121561,
        gas_card: 320115121561,
        contract_type: '电子合同',
        createTime: '2019-1-1',
        timeDuring: '3年',
        vacancy: '30天',
        startTime: '2019.02.04',
        endTime: '2019.03.23',
        deposit: '5000元',
        breach: '5000元',
        price: '4500-12个月，4600元-24个月',
        payType: '季付-12个月，月份-12个月，月付-6个月',
        firstClean: '2019.02.01',
        secondClean: '2019.03.23',
        houserPay: '物业费/水费/电费',
        noHouserPay: '燃气费/网费/管理费/公摊费',
        decorate: '允许',
        addGoods: '允许',
        channel: '是',
        channelName: '链家',
        channelPay: '500元',
        channelPer: '介价是',
        channelPhone: 13844564121,
        dataTime: '2019.02.04 12:45',
        note: '还是发顺丰舒服撒',
        noteTerms: '1.sdfsf 2.sdfdsf',
        carry_person: '收房是',
        department: '地方大师傅',
        contractor: {
          name: '东方朔',
          contact: 14738920482,
          id_card: 384903820190384934
        },
        property_person: {
          name: '乐乐了',
          contact: 14738920482,
          id_card: 384903820190384934
        },
      },
      postman: '',
      postContent: '',
      staffModule: false,//显示人员选择
      organData: {
        num: ''
      },
      postMess: {
        person: []
      },
      //资料不齐记录
      dataRecord_visible: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    //初始化数据
    initData () {
      //工单表格数据初始化
      for (let i = 0; i < 10; i++) {
        let obj = {
          id: i + 1,
          createTime: '2019-10-11',
          ContractNo: '合同编号',
          address: '地址',
          nature: '合同性质',
          compay: '所属公司',
          houser_name: '房东姓名', //收房 
          price: '收房价格',
          payType: '付款方式',
          openPer: '开单人',
          handler: '负责人',
          department: '部门',
        };
        this.tableSettingData.dataAudit.tableData.push(obj);
      }
    },
    //切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
      }
    },
    //高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = dataAuditSearch;
    },
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        console.log(val);
      }
    },
    //双击详情
    handleGetDetail (row) {
      this.contract_detail_visible = true;
    },
    // 关闭详情
    handleCloseDetail () {
      // this.contractDetail = '';
      this.contract_detail_visible = false;
    },
    //footer
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
    //资料不齐
    handleGetRecord () {
      this.dataRecord_visible = true;
    },
    handleCloseRecord () {
      this.dataRecord_visible = false;
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/dataAudit/index.scss";
</style>


