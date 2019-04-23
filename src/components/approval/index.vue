<template>
  <div id='theme_name' class='theme1'>
    <div id='approval' :class="{'approval':message_visible}">
      <div class="header">
        <div class="header_btns">
          <p :class='{"activeTag":chosenTag == item.value}' v-for='item in shenHe_type' :key='item.value' @click='changeShenTag(item.value)'>
            <i :class='["icons",item.icons]'></i>
            <span>{{item.tit}}</span>
          </p>
        </div>

        <div class='header_methods'>
          <div :class='["methods_box",item.value == methods_type_tag?"methods_box_active":""]' v-for='item in methods_type'
            :key='item.value'>{{item.tit}}</div>
        </div>

        <div class='header_right'>
          <p class='gua' v-if='current_type == 2'>
            <i class='gua_icon'></i>
            挂起
          </p>
          <p :class='[current_type == 2? "margin":""]'>接收类型</p>
          <i class='icons icons_main' v-if='current_type ==1'></i>
          <i class='icons icons_search'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table :data="tableData" :height="this.mainListHeight(300) + 'px'" highlight-current-row @row-dblclick=""
          header-row-class-name="tableHeader" style="width: 100%">

          <el-table-column align="center" v-for='item in Object.keys(tableShow)' :key='item' :prop='item' :label="tableShow[item]"></el-table-column>

          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span :class='["status","status"+ scope.row.status]'>{{scope.row.status == 1 ? "产品管控审核中" :
                ( scope.row.status == 2 ? "已撤销":"已通过" ) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chosenTag: 1,
      shenHe_type: [
        {
          tit: '报备审核',
          value: 1,
          icons: 'icons_app'
        },
        {
          tit: '办公审核',
          value: 2,
          icons: 'icons_ban'
        }
      ],
      methods_type: [
        {
          tit: '全部',
          value: 1
        },
        {
          tit: '我审批的',
          value: 2
        },
        {
          tit: '暂不处理',
          value: 3
        },
        {
          tit: '抄送我的',
          value: 4
        }
      ],
      methods_type_tag: 1,
      current_type: 2, // 组员 或者 组长
      tableShow: {
        start_time: '发起时间',
        type: '报备类型',
        person: '报备人',
        house_name: '房屋地址',
        finish_tinme: '完成时间',
      },
      tableData: [],
      tableCount: 8,
      currentPage: 1,
    }
  },
  computed: {
    message_visible () {
      return this.$store.state.approval.approval_message_visible
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      for (let index = 0; index < 8; index++) {
        this.tableData.push(
          {
            start_time: '发起时间',
            type: '报备类型',
            person: '报备人',
            house_name: '房屋地址',
            finish_tinme: '完成时间',
            status: index < 3 ? 1 : index < 5 ? 2 : 3
          }
        )
      }
    },
    changeShenTag (value) {
      if (this.chosenTag != value) {
        this.chosenTag = value
      }
    },
    // table 分页
    handleCurrentChange (val) {
      this.currentPage = val
      // 获取数据
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/approval/index.scss";
</style>

