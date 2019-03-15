<template>
    <div id="part_four">
      <div class="flex-center">
        <div class="container flex-center">
          <div class="content">
            <el-table
              :data="tableList"
              highlight-current-row
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              header-row-class-name="tableHeader"
              style="width: 100%"
            >
              <el-table-column label="岗位" prop="position" align="center"></el-table-column>
              <el-table-column label="姓名" prop="name" align="center"></el-table-column>
              <el-table-column label="来源" prop="come" align="center"></el-table-column>
              <el-table-column label="入职资料反馈">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" plain>资料未补齐</el-button>
                </template>
              </el-table-column>
              <el-table-column label="入职结果">
                <template slot-scope="scope">
                  <el-button size="mini" type="warning" plain>待确定</el-button>
                </template>
              </el-table-column>
              <el-table-column label="入职通知">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" plain>发送offer</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              tableList: [
                {name: '冯宝宝',come: '智联',position: 'web前端工程师'},
                {name: '冯宝宝',come: '智联',position: '客服专员'},
                {name: '冯宝宝',come: '智联',position: 'PHP工程师'},
                {name: '冯宝宝',come: '智联',position: '客服专员'},
                {name: '冯宝宝',come: '智联',position: '客服专员'},
                {name: '冯宝宝',come: '智联',position: '客服专员'},
              ],
              chooseRowIds: [], //图标点击
            }
        },
        mounted() {
        },
        activated() {
        },
        watch: {},
        computed: {},
        methods: {
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
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_four.scss";
  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_four {
      > div {
        .container {
          @include part_three_img('ksszbj.png','theme1');
        }
      }
    }
  }
</style>
