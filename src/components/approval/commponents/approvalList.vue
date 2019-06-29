<template>
  <div id="approval_list">
    <!--    上面按钮-->
    <div class="top-btn">
      <div class="left-text">
        <el-tabs v-model="activeName" @tab-click="clickTabs">
          <el-tab-pane v-for="(item,index) in tabsData" :key="index"
                       :label="item.label" :name="item.name">
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="right-btn">

      </div>
    </div>
    <!--    下面列表-->
    <div class="main-list">
      <div class="mainListTable" :style="{'height': mainListHeight(130) + 'px'}">
        <el-table :data="online_list"
                  @row-dblclick="handleClickRow"
                  style="width: 100%"
                  header-row-class-name="tableHeader"
                  :height="mainListHeight(30) + 'px'">
          <el-table-column label="紧急程度" prop="tableA" align="center"></el-table-column>
          <el-table-column label="审批标题" prop="tableB" align="center">
            <template slot-scope="scope">
              <span></span>
            </template>
          </el-table-column>
          <el-table-column label="审批编号" prop="tableC" align="center"></el-table-column>
          <el-table-column label="申请人" align="center">
            <template slot-scope="scope">
              <span>阿斯蒂芬</span>
            </template>
          </el-table-column>
          <el-table-column label="发起时间" prop="tableD" align="center"></el-table-column>
          <el-table-column label="结束时间" prop="tableE" align="center"></el-table-column>
          <el-table-column label="状态" prop="tableF" align="center"></el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination layout="total,jumper,prev,pager,next"
                           :total="page_info.page_total"
                           :page-size="page_info.page_size"
                           :current-page="page_info.page_current"
                           @current-change="handleChangePage">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "approvalList",
    data() {
      return {
        activeName: 'pending',
        tabsData: [
          {
            label: '待审批',
            name: 'pending'
          },
          {
            label: '已审批',
            name: 'approved'
          },
          {
            label: '转交给我的',
            name: 'transfer'
          }
        ],
        online_list: [
          {
            tableA: 'tableA',
            tableB: 'tableB',
            tableC: 'tableC',
            tableD: 'tableD',
            tableE: 'tableE',
            tableF: 'tableF',
            tableG: 'tableG'
          },
          {
            tableA: 'tableA',
            tableB: 'tableB',
            tableC: 'tableC',
            tableD: 'tableD',
            tableE: 'tableE',
            tableF: 'tableF',
            tableG: 'tableG'
          }
        ],
        page_info: {
          page_total: 20,
          page_current: 1,
          page_size: 10
        }
      }
    },
    methods: {
      /**切换列表 */
      clickTabs() {

      },
      handleClickRow() {
      },
      handleChangePage() {

      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/approval/commponents/approvalList.scss";

</style>
