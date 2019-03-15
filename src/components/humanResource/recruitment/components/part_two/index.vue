<template>
  <div id="part_two">
    <div>
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="tableList"
          :height="this.mainListHeight(30) + 'px'"
          highlight-current-row
          :row-class-name="tableChooseRow"
          @cell-click="tableClickRow"
          header-row-class-name="tableHeader"
          style="width: 100%"
        >
          <el-table-column label="岗位名称" prop="position" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="来源" prop="come" align="center"></el-table-column>
          <el-table-column label="预约面试时间" prop="time" align="center"></el-table-column>
          <el-table-column label="已通知面试官" prop="offer" align="center"></el-table-column>
          <el-table-column label="简历" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" plain>查看简历</el-button>
            </template>
          </el-table-column>
          <el-table-column label="取消面试" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger">取消面试</el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" plain>修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="1000"
              :current-page="params.page"
              :page-size="params.limit"
              layout="total,jumper,prev,pager,next"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>
      <lj-dialog
        :visible="add_interviewer_visible"
        :size="{width: 500 + 'px',height: 500 + 'px'}"
        @close="handleCloseAddInterviewer"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加面试人</h3>
          </div>
          <div class="dialog_main">

          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small">发送面试任务</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';
  export default {
    name: "index",
    components: { LjDialog },
    props: [ 'addInterviewerVisible' ],
    data() {
      return {
        tableList: [
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'},
          {position: 'web前端工程师', name: '冯宝宝', come: 'boss直聘', time: '2019-05-20', offer: '张琳琳'}
        ],
        params: {
          page: 1,
          limit: 12
        },
        chooseRowIds: [],

        //添加面试人
        add_interviewer_visible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      addInterviewerVisible(val) {
        this.add_interviewer_visible = val;
      },
    },
    computed: {},
    methods: {
      //关闭添加面试人
      handleCloseAddInterviewer() {
        this.add_interviewer_visible = false;
        this.$emit('closeMs');
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_two.scss";

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_two {
      height: 100%;
      > div {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
