<template>
  <div id='dataAudit'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>资料审核</h1>
        <h2 class="items-center">
          <span v-for="item in selects" :key='item.id' @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button id='active-warning' @click='changeTag_Status(1)' :class="[tag_status == 1?'el-button-active':'']">收房</el-button>
        <el-button id='active-primary' @click='changeTag_Status(2)' :class="[tag_status==2?'el-button-active':'']">租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="handleGetDetail"
        header-row-class-name="tableHeader" style="width: 100%" :key="'table'+tag_status">
        <el-table-column align="center" label="签约时间">
          <template slot-scope="scope">
            <i class='table_icon' v-if='!cookieArr[scope.row.contract_id] || cookieArr[scope.row.contract_id] < scope.row.update_time'></i>
            <span>{{scope.row.sign_at}}</span>
          </template>
        </el-table-column>
        <el-table-column key="合同编号" align="center" prop="contract_number" label="合同编号"></el-table-column>
        <el-table-column show-overflow-tooltip key="地址" align="center" prop="house_name" label="地址"></el-table-column>
        <el-table-column key="合同性质" align="center" prop="type" label="合同性质"></el-table-column>
        <el-table-column show-overflow-tooltip key="收房价格" align="center" label="收房价格" v-if='tag_status == 1'>>
          <template slot-scope="scope">
            <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
              <span v-for="(item,index) in scope.row.month_price">
                {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="租房价格" align="center" label="租房价格" v-if='tag_status == 2'>
          <template slot-scope="scope">
            <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
              <span v-for="(item,index) in scope.row.month_price">
                {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="付款方式" align="center" prop="pay_way" label="付款方式"></el-table-column>
        <el-table-column key="开单人" align="center" prop="sign_user" label="开单人"></el-table-column>
        <el-table-column key="负责人" align="center" prop="org_leader" label="负责人"></el-table-column>
        <el-table-column key="部门" align="center" prop="sign_org" label="部门"></el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDataCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :show-data="searchData" @close="hiddenModule"></SearchHigh>

    <!--合同详情-->
    <contractDetail :visible="contract_detail_visible" :moduleData='currentRow' :tagStatus='tag_status' :chooseTab='chooseTab' :showFooter='true'
      :showRelated='false' :disabled='contract_disable' :showData='contract_showData' @close="handleCloseDetail"
      @setCookie='cookieChange' />

    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import StaffOrgan from '../../common/staffOrgan.vue'
import MenuList from '../../common/menuList.vue';
import { dataAuditSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import contractDetail from '../components/contract_detail';

export default {
  name: 'index',
  components: {
    SearchHigh,
    StaffOrgan,
    MenuList,
    contractDetail,
  },
  data () {
    return {
      customService,
      visibleStatus: false,
      dataAuditSearch,
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
      chooseTab: 1,  // 待审核 跟进中 已完成
      tag_status: 1, // 收房 租房
      tableData: [],  // 列表
      tableDataCount: 0,

      showSearch: false,  // 显示高级搜索
      searchData: {}, // 高级搜索 参数
      searchParams: {
        dateTime: [],
      }, // 高级搜索返回值

      //合同详情
      contract_detail_visible: false,
      contractDetail: null,
      currentPage: 1,
      cookieArr: {},
      market_server: globalConfig.market_server,
      currentRow: null
    }
  },
  created () {
    this.getDateList();
    this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {};
  },
  computed: {
    contract_disable () {
      return this.chooseTab == 3
    },
    contract_showData () {
      return this.chooseTab != 3
    }
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    getCookie (cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    cookieChange () {
      if(!this.currentRow.contract_id) return;
      this.$set(this.cookieArr, this.currentRow.contract_id, new Date().getTime())
      this.setCookie('cookieArr', JSON.stringify(this.cookieArr), 7)
      this.cookieArr = this.getCookie('cookieArr') ? JSON.parse(this.getCookie('cookieArr')) : {}
    },
    setCookie (cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //获取资料审核列表
    getDateList () {
      if(!this.validatePermission('Data-Audit-Read')) return;
      this.showLoading(true);
      let params = {
        contract_type: this.tag_status, // 收房 租房
        doc_Status: this.chooseTab == 1 ? "review" : (this.chooseTab == 2 ? "flowing" : "published"), // 待审核 跟进中 已完成
        sign_date_min: this.searchParams.dateTime[0] || '',
        sign_date_max: this.searchParams.dateTime[1] || '',
        type: this.searchParams.type || '',
        signer: this.searchParams.signer || '',
        org: this.searchParams.org || '', // 部门
        search: this.searchParams.search || '',
        limit: 10,
        page: this.currentPage
      }

      this.$http.get(this.market_server + `v1.0/market/contract`, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDataCount = res.data.count;
        } else {
          this.currentPage = 1;
          this.tableData = [];
          this.tableDataCount = 0;
        }
        this.showLoading(false);
      })
    },
    //切换 待审核 跟进中 已完成
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
        this.getDateList()
      }
    },
    // 切换 租房 收房
    changeTag_Status (id) {
      if (this.tag_status !== id) {
        this.tag_status = id
        this.getDateList()
      }
    },
    //高级搜索
    highSearch () {
      this.searchData = dataAuditSearch;
      if (this.tag_status == 2) {
        this.searchData.data[1].value = [
          //1-新租，2-转租，3-续租，4-未收先租，5-调租
          {
            id: 1,
            title: '新租'
          },
          {
            id: 2,
            title: '转租'
          },
          {
            id: 3,
            title: '续租'
          },
          /*{
            id: 4,
            title: '未收先租'
          },*/
          {
            id:5,
            title:'调租',
          }
        ]
      }
      if(this.tag_status==1) {
        this.searchData.data[1].value =  [{
                    id: 1,
                    title: '新收'
                },
                {
                    id: 2,
                    title: '续收'
                }
            ]
      }
      this.showSearch = true;
    },
    //高级搜索
   async hiddenModule (val) {
      if (val !== 'close') {
        this.searchParams = Object.assign({}, this.searchParams, val)
        this.currentPage = 1;
        await this.getDateList();
      }
      this.showSearch = false;
    },
    //双击 合同详情
    handleGetDetail (row) {
      this.currentRow = row;
      if(!this.validatePermission('Data-Audit-Operate')) return;
      this.contract_detail_visible = true;
    },
    // 关闭详情
    handleCloseDetail () {
      this.contract_detail_visible = false
      this.currentRow = null
    },
    //footer
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDateList()
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/dataAudit/index.scss";
</style>


