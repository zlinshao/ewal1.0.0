<template>
    <div id="part_three">
      <div>
        <div class="container flex-center">
          <div class="content">
            <div class="content_header">
              <h3>web前端工程师</h3>
            </div>
            <div>
              <el-table
                :data="tableList"
                highlight-current-row
                :row-class-name="tableChooseRow"
                @cell-click="tableClickRow"
                header-row-class-name="tableHeader"
              >
                <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                <el-table-column label="来源" prop="come" align="center"></el-table-column>
                <el-table-column label="状态" prop="status" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
              tableList: [
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
                {name: '冯宝宝',come: '智联',status: '资料审核通过，待入职'},
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
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_three.scss";

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_three {
      > div {
        .container {
          @include part_three_img('ksszbj.png','theme1');
        }
      }
    }
  }

</style>
