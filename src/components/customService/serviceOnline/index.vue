<template>
  <div id="serviceOnline">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="handleOpenMenu">
            <b>...</b>
          </p>
          <h1>接线记录</h1>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="highSearch"></div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="online_list"
          @row-dblclick="handleClickRow"
          :height="this.mainListHeight(30) + 'px'"
        >
          <el-table-column label="接听时间" prop="call_log.start_time" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.customer && scope.row.customer.custom_fields && scope.row.customer.custom_fields.TextField_18119 || '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" prop="customer.name" align="center"></el-table-column>
          <el-table-column label="来电类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.note && scope.row.note.content || '/'}} </span>
            </template>
          </el-table-column>
          <el-table-column label="接线时长/s" prop="call_log.duration" align="center"></el-table-column>
          <el-table-column label="来电内容" prop="custom_fields" align="center"></el-table-column>
          <el-table-column label="接线人" prop="customer.owner_name" align="center"></el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination :total="online_count" layout="total,jumper,prev,pager,next" :current-page="params.page"
                           :page-size="params.limit" @current-change="handleChangePage">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>
    <!--菜单栏-->
    <MenuList :module="menu_visible" :list="customService" :backdrop="true" @close="menu_visible = false"></MenuList>
    <!--高级-->
    <searchHigh :module="searchHighVisible" :showData="searchData" @close="hiddenModule"></searchHigh>
    <!--详情-->
    <LjDialog :visible="online_detail_visible" :size="{width: 700 + 'px',height: 550 + 'px'}" @close="online_detail_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ online_detail.address }}</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width="80px" class="borderNone">
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同编号">
                  <el-input v-model="online_detail.contract_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来电时长">
                  <el-input v-model="online_detail.call_during"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来电时间">
                  <el-input v-model="online_detail.call_time"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来电类型">
                  <el-input v-model="online_detail.call_type"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="来电原因">
              <el-input v-model="online_detail.call_reason" type="textarea" :rows="6"></el-input>
            </el-form-item>
            <el-form-item label="接线人">
              <el-input v-model="online_detail.call_man"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="online_detail_visible = false">确定</el-button>
        </div>
      </div>
    </LjDialog>
  </div>
</template>

<script>
  import searchHigh from '../../common/searchHigh.vue';
  import { onlineRecordSearch } from '../../../assets/js/allSearchData.js';
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import {customService} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList,searchHigh,LjDialog},
    data() {
      return {
        onlineRecordSearch,
        server: globalConfig.market_server,
        //接线详情
        online_detail_visible: false,
        online_detail: {
          contract_number: '',
          call_during: '',
          call_time: '',
          call_type: '',
          call_reason: '',
          call_man: '',
          address: ''
        },
        customService,
        menu_visible: false, //菜单栏
        searchHighVisible: false,//高级
        searchData: {},
        params: {
          page: 1,
          limit: 20,
          date_min: '',
          date_max: '',
          advisory_type: '',
          search: ''
        },
        online_list: [],
        online_count: 0,
      }
    },
    mounted() {
      this.getServiceOnlineList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      //获取接线记录列表
      getServiceOnlineList() {
        if(!this.validatePermission('Service-Online-Read')) return;
        this.showLoading(true);
        this.$http.get(this.server + 'v1.0/csd/udesk/calllog',this.params).then(res => {
          if (res.code === 200) {
            this.online_list = res.data.data;
            this.online_count = res.data.total;
          } else {
            this.online_list = [];
            this.online_count = 0;
          }
          this.showLoading(false);
        })
      },
      handleClickRow(row) {
        if(!this.validatePermission('Service-Online-Operate')) return;
        this.online_detail.address = row.customer && row.customer.name;
        this.online_detail.call_during = row.call_log && row.call_log.duration + 's' || '无';
        this.online_detail.call_time = row.call_log && row.call_log.start_time || '无';
        this.online_detail.call_type = row.note && row.note.content || '无';
        if (row.custom_fields && row.custom_fields.length > 0) {
          for (var i=0;i<row.custom_fields.length;i++) {
            this.online_detail.call_reason += row.custom_fields[i];
          }
        } else {
          this.online_detail.call_reason = '无';
        }
        this.online_detail.call_man = row.customer && row.customer.owner_name || '无';
        this.online_detail.contract_number = row.customer && row.customer.custom_fields && row.customer.custom_fields.TextField_18119 || '无';
        this.online_detail_visible = true;
      },
      //分页
      handleChangePage (page) {
        this.params.page = page;
        this.getServiceOnlineList();
      },
      handleOpenMenu() {
        this.menu_visible = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
      //高级
      highSearch() {
        this.searchData = onlineRecordSearch;
        this.searchHighVisible = true;
      },
      //关闭高级搜索
      hiddenModule(val) {
        if (val !== 'close') {
          this.params.advisory_type = val.advisory_type;
          this.params.date_min = val.date[0] ? val.date[0] : '';
          this.params.date_max = val.date[1] ? val.date[1] : '';
          this.params.search = val.search;
          this.getServiceOnlineList();
        }
        this.searchHighVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
`
