<template>
  <div id="serviceOnline">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="handleOpenMenu">
            <b>...</b>
          </p>
          <h1>客服接线</h1>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="highSearch"></div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="online_list"
          @row-click="handleClickRow"
        >
          <el-table-column label="接听时间" prop="call_log.start_time" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="b" align="center"></el-table-column>
          <el-table-column label="地址" prop="customer.name" align="center"></el-table-column>
          <el-table-column label="来电类型" prop="d" align="center"></el-table-column>
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
          <h3>乔虹苑12-102</h3>
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
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import {customService} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {MenuList,searchHigh,LjDialog},
    data() {
      return {
        server: globalConfig.market_server,
        //接线详情
        online_detail_visible: false,
        online_detail: {
          contract_number: 'LJSF0129321',
          call_during: '00:22:00',
          call_time: '2019-01-01 18:00:00',
          call_type: '房屋查询',
          call_reason: '询问租金情况，已解决...',
          call_man: '小马哥'
        },
        customService,
        menu_visible: false, //菜单栏
        searchHighVisible: false,//高级
        searchData: {},
        params: {
          page: 1,
          limit: 20,
          date_min: '',
          date_max: ''
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
      getServiceOnlineList() {
        this.$http.get(this.server + 'v1.0/csd/udesk/calllog',this.params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.online_list = res.data.data;
            this.online_count = res.data.total;
          } else {
            this.online_list = [];
            this.online_count = 0;
          }
        })
      },
      handleClickRow() {
        this.online_detail_visible = true;
      },
      //分页
      handleChangePage (page) {
        this.params.page = page;
      },
      handleOpenMenu() {
        this.menu_visible = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
      //高级
      highSearch() {
        this.searchData = {
          status: 'village',
          placeholder: '请输入搜索内容',
          data: [
            {
              keyType: 'dateRange',
              title: '来电时间',
              placeholder: '请选择日期',
              keyName: 'date',
              dataType: []
            },
            {
              keyType: 'check',
              title: '类型',
              keyName: 'check',
              dataType: [],
              value: [
                {
                  id: 1,
                  title: '房屋查询'
                },
                {
                  id: 2,
                  title: '维修'
                }
              ]
            },
          ]
        };
        this.searchHighVisible = true;
      },
      //关闭高级搜索
      hiddenModule(val) {
        if (val !== 'close') {
          console.log(val);
        }
        this.searchHighVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
