<template>
  <div id="performance">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b @click="show_market = true">...</b>
          </p>
          <h1>业绩工资</h1>
          <h2 class="items-center">
            <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                  :class="{'chooseTab': chooseTab === item.id}">
              {{item.title}}<i></i>
            </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <el-button id="active-success" type="success" size="mini" style="width: 80px;margin-right: 20px" plain @click="handleExport">导出</el-button>
          <div class="icons search" @click="openHigh"></div>
        </div>
      </div>

      <!--业绩总览-->
      <div class="performance_all flex-center">
        <div class="per1"></div>
        <div class="per2"></div>
        <div class="content flex-center">
          <div class="contain flex-center">
            <div>
              <p><a>{{lord_count}}</a>/套</p>
              <p>收房数</p>
            </div>
            <div>
              <p><a>{{rent_count}}</a>/套</p>
              <p>租房数</p>
            </div>
            <div>
              <p><a>{{real_achievement_all}}</a></p>
              <p>实际业绩</p>
            </div>
            <div>
              <p><a>{{overflow_all}}</a></p>
              <p>溢出业绩</p>
            </div>
          </div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight(100) + 'px','marginTop': 0}">
        <el-table
          :data="performance_list"
          :height="this.mainListHeight(130) + 'px'"
        >
          <el-table-column label="业绩月份" prop="generate_date" align="center"></el-table-column>
          <el-table-column label="租房人" prop="rent_staff_name" align="center"></el-table-column>
          <el-table-column label="房屋地址" prop="rent_house_name" align="center"></el-table-column>
          <el-table-column label="收房月单价" prop="lord_month_price" align="center"></el-table-column>
          <el-table-column label="租房月单价" prop="rent_month_price" align="center"></el-table-column>
          <el-table-column label="实际业绩" prop="real_achievement_all" align="center"></el-table-column>
          <el-table-column label="溢出业绩" prop="overflow_all" align="center"></el-table-column>
          <el-table-column label="实际到手" prop="real_money_all" align="center"></el-table-column>
          <el-table-column label="负责人" prop="rent_leader_name" align="center"></el-table-column>
          <el-table-column label="所属部门" prop="rent_org_name" align="center"></el-table-column>
        </el-table>
      </div>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="performance_count"
            layout="total,jumper,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handleChangePage">
          </el-pagination>
        </div>
      </footer>

      <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
      <MarketMenuList :show-market="show_market" :show-shadow="show_market" @close="show_market = false"></MarketMenuList>
    </div>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import MarketMenuList from '../components/market-menu-list.vue';
  export default {
    name: "index",
    components: { SearchHigh ,MarketMenuList},
    data() {
      return {
        highVisible: false,
        searchData: {
          status: 'performance',
          placeholder: '请输入',
          data: []
        },

        show_market: false,
        selects: [
          {
            id: 1,
            title: '业绩'
          },
          {
            id: 2,
            title: '收益'
          },
        ],
        chooseTab: 1,
        params: {
          page: 1,
          limit: 5,
          search: '',
          start_date: '',
          end_date: '',
          achv_type: '',
          rent_staff_id: '',
          lord_ord_id: '',
          export:0
        },
        real_achievement_all:'',
        overflow_all:'',
        rent_count:'',
        lord_count:'',
        performance_list: [],
        performance_count: 0,
      }
    },
    mounted() {
      this.handleGetPerformanceList();
    },
    watch: {},
    computed: {},
    methods: {
      openHigh() {
        this.highVisible = true;
      },
      handleCloseHigh(val) {
        console.log(val);
        this.highVisible = false;
      },
      handleExport(){
        this.params.export=1;
        this.$http.get('achv/achv/index',this.params,'arraybuffer').then((res) => {
            if (!res) return;
            this.$exportData(res);
            this.params.export=0;
        });
      },
      handleGetPerformanceList() {
        this.$http.get('achv/achv/index', this.params).then(res => {
          console.log(res);
          if (res.code === "50000") {
            this.performance_list = res.data.data;
            this.performance_count = res.data.count;
            this.real_achievement_all=res.data.real_achievement_all;
            this.overflow_all=res.data.overflow_all;
            this.rent_count=res.data.rent_count;
            this.lord_count=res.data.lord_count;
          } else {
            this.performance_list = [];
            this.performance_count = 0;
          }
        })
      },
      changeTabs(id) {
        this.chooseTab = id;
      },
      handleChangePage(page) {
        this.params.page = page;
        this.handleGetPerformanceList();
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/performance/index.scss";

  @mixin perImage($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #performance {
      .per1 {
        @include perImage('per1.png', 'theme1');
      }
      .per2 {
        @include perImage('per2.png', 'theme1');
      }
    }
  }
</style>
