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
          <div :class='["methods_box",item.value == current_status_type ?"methods_box_active":""]' v-for='item in methods_type'
            :key='item.value' @click='change_status_type(item.value)'>{{item.tit}}</div>
        </div>

        <div class='header_right'>
          <p class='ele_p gua' @click='change_revice_type'>
            <i :class='["icons",isRevice ? "revice_icons":"gua_icons"]'></i>
            {{isRevice ? "接收":"挂起"}}
          </p>
          <div class="margin">
            <p :class='["ele_p",revice_check_type.length >0?"revice_span":""]'>{{revice_check_type.length == 0 ?
              "接收类型" :
              revice_check_type.join('-')}}</p>
            <div class='revice_box'>
              <el-checkbox-group v-model="revice_check_type">
                <el-checkbox v-for='type in revice_type' :key='type.tit' :label="type.tit"></el-checkbox>
              </el-checkbox-group>

              <div class="dialog_footer">
                <el-button type="danger" size="small">确定</el-button>
                <el-button type="info" size="small">取消</el-button>
              </div>
            </div>
          </div>
          <i class='icons icons_main' v-if='current_type == 1'></i>
          <i class='icons icons_search' @click='highSearch'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': this.mainListHeight(30) + 'px'}">
        <el-table :data="tableData" :height="this.mainListHeight(180) + 'px'" highlight-current-row @row-dblclick=""
          header-row-class-name="tableHeader" style="width: 100%">

          <el-table-column align="center" v-for='item in Object.keys(tableShow)' :key='item' :prop='item' :label="tableShow[item]"></el-table-column>

          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span :class='["status","status"+ scope.row.status]'>{{scope.row.status == 1 ? "产品管控审核中" :
                ( scope.row.status == 2 ? "已撤销":"已通过" ) }}</span>
            </template>
          </el-table-column>
        </el-table>

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

      <!-- 搜索 -->
      <SearchHigh :module="showSearch" :showData="searchHigh" @close="hiddenModule"></SearchHigh>

    </div>
  </div>
</template>

<script>
import SearchHigh from '../common/searchHigh.vue'
export default {
  components: {
    SearchHigh, //高级搜索
  },
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
      current_status_type: 1,
      current_type: 1, // 组员 或者 组长
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
      //高级搜索
      searchHigh: {
        status: 'approval_leader',
        placeholder: '',
        keywords: 'sarch',
        data: [
          {
            keyType: 'dateRange',
            title: '开始时间',
            placeholder: '请选择日期',
            keyName: 'start_time',
            dataType: []
          },
          {
            keyType: 'dateRange',
            title: '结束时间',
            placeholder: '请选择日期',
            keyName: 'finish_time',
            dataType: []
          },
          {
            keyType: 'radio',
            title: '工单类型',
            keyName: 'type',
            dataType: '',
            value: [
              {
                id: 1,
                title: '收房'
              },
              {
                id: 2,
                title: '租房'
              },
              {
                id: 3,
                title: '续收'
              },
              {
                id: 4,
                title: '续租'
              },
              {
                id: 5,
                title: '收房补充协议'
              },
              {
                id: 6,
                title: '转租'
              },
              {
                id: 9,
                title: '调房'
              },
              {
                id: 10,
                title: '退租'
              },
              {
                id: 11,
                title: '拓展新盘'
              },
              {
                id: 12,
                title: '租房补充协议'
              },
              {
                id: 13,
                title: '取消预订'
              },
              {
                id: 14,
                title: '家具补齐'
              },

            ]
          },
          {
            keyType: 'depart',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'department',
            dataType: [],
            value: {
              num: 1,
              arr: ''
            }
          },
        ]
      },
      searchData: {},
      showSearch: false,
      isRevice: false, //是否接收
      // 接收类型
      revice_type: [
        {
          tit: '取消预定',
          value: 1
        },
        {
          tit: '家居补齐',
          value: 2
        },
        {
          tit: '收房报备',
          value: 3
        },
        {
          tit: '租房报备',
          value: 4
        },
        {
          tit: '续收报备',
          value: 5
        },
        {
          tit: '续租报备',
          value: 6
        }, {
          tit: '转租报备',
          value: 7
        },
        {
          tit: '调房报备',
          value: 8
        },
        {
          tit: '退租报备',
          value: 9
        },
        {
          tit: '拓展新盘',
          value: 10
        },
        {
          tit: '收房补充协议',
          value: 11
        },
        {
          tit: '租房补充协议',
          value: 12
        }
      ],
      revice_check_type: [],
      revice_check_type_name: '接收类型'
    }
  },
  computed: {
    message_visible () {
      return this.$store.state.approval.approval_message_visible
    },
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      for (let index = 0; index < 10; index++) {
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
    change_status_type (val) {
      if (this.current_status_type !== val) {
        this.current_status_type = val
      }
    },
    // 高级搜索
    highSearch () {

      this.showSearch = true
      // this.searchData = this.searchHigh[this.current_type - 1]

    },
    hiddenModule (val) {
      this.showSearch = false
      if (val != 'close') {
        console.log(val)
      }
    },
    // 接收 挂起
    change_revice_type () {
      this.isRevice = !this.isRevice
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

