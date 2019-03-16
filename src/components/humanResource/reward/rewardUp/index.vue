<template>
  <div id="rewardUp">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        :row-style="{height:'70px'}"
        style="width: 100%">
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <!--<StaffFiles :module="filesVisible" @close="filesVisible = false"></StaffFiles>-->
    <!--<work-info :work-info="work_info" :event-data="event_data" :attend-data="attend_data" @change="handleChangeDate"></work-info>-->
  </div>
</template>

<script>
  // import StaffFiles from '../components/staffFiles.vue'
  //import WorkInfo from '../components/workInfo/work-info';//任务清单

  export default {
    name: "index",
    props: ['searchVal'],
    components: {
      //WorkInfo
    },
    data() {
      return {
        url: globalConfig.organ_server,
        checkList: [],
        showData: {
          name: '姓名',
          data1: '岗位',
          data2: '部门',
          data3: '事件',
          data4: '奖励',
          data5: '备注',
        },
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
        },
        filesVisible: false,




        // work_info: [
        //   {work: '平均在线时长', val: '8 h'},
        //   {work: '平均处理用时', val: '30 min'},
        //   {work: '当日处理事件数', val: '16 件'},
        //   {work: '本周处理事件数', val: '35 件'},
        // ],
        // event_data: [
        //   {value: 500, name: '一般'},
        //   {value: 300, name: '特殊'},
        //   {value: 200, name: '紧急'},
        // ],
        // attend_data: []
      }
    },
    mounted() {
      this.initData();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRewardUpList();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },



      initData() {
        let obj = {
          name: '张三',
          data1:'工程师',
          data2:'研发部',
          data3:'攻城时因穿铠甲',
          data4:'200金币',
          data5:'锁血打小怪掉金币',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        for (let i=0;i<9;i++) {
          this.tableData.push(obj)
        }
        this.counts = 1000;
      },

      getRewardUpList() {
        this.$http.get(this.url + 'rewardUp/xxx', this.params).then(res => {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
        this.filesVisible = true;
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getRewardUpList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/reward/rewardUp/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/reward/rewardUp/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #rewardUp {
    }
  }

  #theme_name.theme2 {
    #rewardUp {

    }
  }

  #theme_name.theme3 {
    #rewardUp {

    }
  }

  #theme_name.theme4 {
    #rewardUp {

    }
  }
</style>
