<template>
  <div id="contractManagement">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b>...</b>
          </p>
          <h1>合同管理</h1>
          <h2 class="items-center">
              <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                    :class="{'chooseTab': chooseTab === item.id}">
                {{item.title}}<i></i>
              </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="handleOpenHigh"></div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">

        <el-table :data="contractList" v-if="chooseTab === 1">
          <el-table-column label="签约时间" prop="sign_at" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
          <el-table-column label="地址" prop="house_name" align="center"></el-table-column>
          <el-table-column label="合同性质" prop="type" align="center"></el-table-column>
          <el-table-column label="所属公司" prop="" align="center"></el-table-column>
          <el-table-column label="收房价格" prop="" align="center"></el-table-column>
          <el-table-column label="付款方式" prop="pay_way" align="center"></el-table-column>
          <el-table-column label="开单人" prop="" align="center"></el-table-column>
          <el-table-column label="负责人" prop="" align="center"></el-table-column>
          <el-table-column label="部门" prop="" align="center"></el-table-column>
          <el-table-column label="操作" prop="" align="center"></el-table-column>
        </el-table>

        <el-table v-if="chooseTab === 2">

        </el-table>

        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>

    <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';

  export default {
    name: "index",
    components: { SearchHigh },
    data() {
      return {
        market_server: globalConfig.market_server,
        selects: [
          {
            id: 1,
            title: '收房'
          },
          {
            id: 2,
            title: '租房'
          }
        ],
        chooseTab: 1,

        params: {
          page: 1,
          limit: 12,
          contract_type: 1,
          sign_date_min: '',
          sign_date_max: '',
          type: '',
          start_date_min: '',
          start_date_max: '',
          end_date_min: '',
          end_date_max: '',
          signer: '',
          org: '',
        },
        contractList: [],
        contractCount: 0,

        highVisible: false, //高级
        searchData: {
          status: 'contractManagement',
          keywords: 'search',
          data: []
        },
      }
    },
    mounted() {
      this.getContractList();
    },
    watch: {},
    computed: {},
    methods: {
      //获取合同列表
      getContractList() {
        this.params.contract_type = this.chooseTab;
        this.$http.get(this.market_server + 'v1.0/market/contract',this.params).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.contractList = res.data.data;
            this.contractCount = res.data.count;
          } else {
            this.contractList = [];
            this.contractCount = 0;
          }
        })
      },
      //打开高级
      handleOpenHigh() {
        this.searchData.data = [
          {
            keyType: 'dateRange',
            title: '签约时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          }
        ]
      },
      changeTabs(id) {
        this.chooseTab = id;
        this.getContractList();
      },
      handleChangePage(page) {
        this.params.page = page;
      },

      //高级
      handleCloseHigh(val) {
        if (val !== 'close') {
          console.log(val);
          this.highVisible = false;
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/contractManagement/index.scss";

  @mixin contractManagementImg($m, $n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #contractManagement {
      > div {

      }
    }
  }
</style>
