<template>
  <div id="approval_list">
    <!--    上面按钮-->
    <div class="top-btn">
      <div class="left-text">
        <el-tabs v-model="activeName" @tab-click="clickTabs">
          <el-badge v-for="(item,index) in tabsData" :key="index" :value="item.number>=1?item.number:null">
            <el-tab-pane :label="item.label" :name="item.name">
            </el-tab-pane>
          </el-badge>
        </el-tabs>
      </div>

      <div class="right-btn">
        <div class="click-btn"
             v-for="(btn,index) in btnData" :key="index">
          <div :class="['icon','icon-'+ btn.btn_icon]">
          </div>
          <p class="text">{{btn.btn_text}}</p>
        </div>
        <div class="search-btn">
          <i class='icons icons_search'></i>
        </div>
      </div>
    </div>
    <!--    下面列表-->
    <div class="main-list">
      <div class="mainListTable changeChoose" :style="{'height': mainListHeight(130) + 'px'}">
        <el-table :data="online_list"
                  @row-dblclick="handleClickRow"
                  style="width: 100%"
                  header-row-class-name="tableHeader"
                  :height="mainListHeight(30) + 'px'">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="紧急程度" align="center">
            <template slot-scope="scope">
              <div class="degree-item urgent-item">
                {{scope.row.degree}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="title" label="审批标题" align="center"></el-table-column>

          <el-table-column prop="code" label="审批编号" align="center"></el-table-column>

          <el-table-column prop="apply" label="申请人" align="center"></el-table-column>

          <el-table-column label="发起时间" prop="date" align="center"></el-table-column>

          <el-table-column label="结束时间" prop="dateEnd" align="center"></el-table-column>

          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span class="status-item check-item">{{scope.row.status}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot-scope="{ row }">
              <el-tooltip placement="top-end" :visible-arrow="false">
                <div class="flex control-btn" slot="content">
                  <span class="option-btn" @click="submitPopover(row)">提交</span>
                  <span class="option-btn" @click="transferPopover(row)">转交</span>
                  <span class="option-btn" @click="denyPopover(row)">拒绝</span>
                </div>
                <span class="table-control writingMode">···</span>
              </el-tooltip>
            </template>
          </el-table-column>
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
        /**左侧标签 */
        activeName: 'pending',
        tabsData: [
          {
            label: '待审批',
            name: 'pending',
            number: 2
          },
          {
            label: '已审批',
            name: 'approved',
            number: 8
          },
          {
            label: '转交给我的',
            name: 'transfer',
            number: 0
          }
        ],
        /**右侧按钮 */
        btnData: [
          {
            btn_text: '批量提交',
            btn_icon: 'pltj'
          },
          {
            btn_text: '批量转交',
            btn_icon: 'plzj'
          }
        ],


        online_list: [
          {
            degree: '紧急',
            title: '审批标题1',
            code: '审批编号1',
            apply: '申请人1',
            date: '2019.01.21 12:00:00',
            dateEnd: '/',
            status: '基础人事主管审核中'
          },
          {
            degree: '重要',
            title: '审批标题2',
            code: '审批编号2',
            apply: '申请人2',
            date: '2019.01.21 12:00:00',
            dateEnd: '/',
            status: '基础人事主管审核中'
          },
          {
            degree: '正常',
            title: '审批标题3',
            code: '审批编号3',
            apply: '申请人3',
            date: '2019.01.21 12:00:00',
            dateEnd: '/',
            status: '基础人事主管审核中'
          },
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

      },
      /**列表操作 */
      // 提交
      submitPopover(row) {
      },
      // 转办
      transferPopover(row) {
      },
      // 拒绝
      denyPopover(row) {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/approval/commponents/approvalList.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      #approval_list {
        $icons: pltj, plzj;
        @each $icon in $icons {
          .icon-#{$icon} {
            @include confirmImg('#{$icon}.png', 'theme1')
          }
        }
        /*右边搜索图标*/
        .icons_search {
          @include confirmImg('sousuo.png', 'theme1')
        }

        .main-list {
          .urgent-item {
            @include confirmImg('qxbgs.png', 'theme1')
          }
        }

      }
    }
  }
</style>
