<template>
  <div id='panel_box'>
    <div id='panel' :class="{'panel':visible}">
      <div class="header">
        <div class='header_methods'>
          <div :class='["methods_box",item.value == current_status_type ?"methods_box_active":""]' v-for='item in methods_type'
            :key='item.value' @click='change_status_type(item.value)'>{{item.tit}}</div>
        </div>

        <div class='header_right'>
          <i class='icons_panel' @click='handleClose'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': this.mainListHeight(60) + 'px'}">
        <div class='panel_list'>
          <div :class='["panel_cell",active_panel == 0?"panel_cell_active":""]' v-for='(item,index) in panelList' :key="item.id"
            @dblclick="showCards(item)">
            <div class='cell_header'>
              <div class='cell_header_left'>
                <i class='icons icons_per'></i>
                <span>{{item.name}}</span>
              </div>
              <i class='icons icons_deng'></i>
            </div>
            <div class='cell_list'>
              <span class='cell_tit'>审核中</span>
              <span class='cell_content cell_yellow'>{{item.count}}条</span>
            </div>
            <div class='cell_list'>
              <span class='cell_tit'>平均审核时长</span>
              <span class='cell_content cell_blue'>{{item.sumDuration}}min</span>
            </div>
            <div class='cell_list' v-if='current_status_type == 1'>
              <span class='cell_tit'>接收类型</span>
              <div class='cell_content cell_type'>
                <span class='cell_blue'>{{item.typeName.join(',')}}</span>
                <ul v-if='item.type.length > 1'>
                  <li v-for='(item,idx) in item.typeName' :key='idx'>{{item}}</li>
                </ul>
              </div>
            </div>
            <div class='cell_list' v-if='current_status_type == 2'>
              <span class='cell_tit'>组长</span>
              <span class='cell_content cell_blue'>{{item.assginee}}min</span>
            </div>
            <div class='cell_setting' v-if='current_status_type == 1'>
              <i class='icons_setting' @click='handleSetting(item,index)'></i>
            </div>
          </div>
        </div>

        <footer class="flex-center bottomPage" v-if="visible">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination @current-change="handleCurrentChange" :current-page="current_page" :page-size="10" :total="tableCount"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>

    <!-- 进度展示 -->
    <PanelDialog :visible='panel_info_visible' :moduleData='panel_info' @close='handleClosePanel' />

    <LjDialog :visible="show_set_visible" :size="{width: 600 + 'px',height: 400 + 'px'}" @close="handleCheckType(false)">
      <div class='dialog_container set_dialog'>
        <div class='dialog_header'>
          <h3>接收类型</h3>
          <div :class='["right",!currentInfo.suspend ? "right_active":"right_close"]' @click='closeSetting'>
            <div class='right_circle'></div>
          </div>
        </div>
        <div class='dialog_main check_type_dialog'>
          <el-checkbox-group v-model="currentInfo.type" :disabled='currentInfo.suspend'>
            <el-checkbox v-for='type in Object.keys(revice_type)' :key='type' :label="type">
              {{revice_type[type]}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='dialog_footer'>
          <el-button type="danger" size="small" @click='handleCheckType(true)'>同意</el-button>
          <el-button type="info" size="small" @click='handleCheckType(false)'>取消</el-button>
        </div>
      </div>
    </LjDialog>
  </div>
</template>

<script>
import PanelDialog from './panel-dialog';
import LjDialog from '../../common/lj-dialog.vue';
export default {
  components: {
    PanelDialog,
    LjDialog
  },
  props: ['visible', 'revice_type'],
  data () {
    return {
      current_status_type: 1,
      methods_type: [
        {
          tit: "组员进度",
          value: 1
        },
        {
          tit: "片区进度",
          value: 2
        }
      ],
      panelList: [{
        id: 69,
        shening: 32,
        preTime: 8,
        type: [],
        typeName: [],
        suspend: true
      },
      {
        id: 70,
        shening: '32条',
        preTime: '8min',
        type: [],
        typeName: [],
        suspend: false
      },
      {
        id: 71,
        shening: '32条',
        preTime: '8min',
        type: [],
        typeName: [],
        suspend: false
      }],
      active_panel: -1,
      current_page: 1,
      tableCount: 0,
      cellType: [],
      panel_info_visible: false,
      panel_info: {
        current_type: 1,
        info: null
      },
      show_set_visible: false,
      setting_info: {},
      revice_check: [],

      currentIndex: 0, //设置的是第几个的值
      currentInfo: {},  // 当前设置类型
      currentStatus: false,
      approval_sever: globalConfig.approval_sever
    }
  },
  mounted () {
    this.getApproval()
  },
  methods: {
    getApproval () {
      let key = this.current_status_type == 1 ? 'gkzx_approval' : 'pqjl_approval'
      this.$http.get(`${this.approval_sever}runtime/taskDashboard?taskDefinitionKey=${key}`).then(res => {
        this.panelList = res
      })
    },
    change_status_type (value) {
      if (this.current_status_type != value) {
        this.current_status_type = value
        this.getApproval()
      }
    },
    handleClose () {
      this.$emit('close', false)
    },
    handleCurrentChange (val) {
      this.current_page = val
    },
    showCards (row) {
      this.panel_info = {
        current_type: this.current_status_type,
        info: row
      }
      this.panel_info_visible = true
    },
    handleClosePanel () {
      this.panel_info_visible = false
    },
    handleSetting (item, index) {
      this.currentIndex = index
      this.currentInfo = item
      this.show_set_visible = true
    },
    handleCheckType (par) {
      if (par) {  //同意
        let params = {
          "receiveTypeList": this.currentInfo.type,
          "suspend": this.currentInfo.suspend
        }
        this.$http.post(`${this.approval_sever}monitor/process-instances/${this.currentInfo.id}`, params).then(res => {
          // 改变当前这个值
          this.currentInfo.typeName = [];
          this.currentInfo.type.forEach(ele => {
            this.currentInfo.typeName.push(this.revice_type[ele])
          });

          this.panelList.splice(this.currentIndex, 1, this.currentInfo)
          this.show_set_visible = false
          this.currentInfo = {}
        })
      } else {  //取消
        this.show_set_visible = false
        this.currentInfo = {}
      }
    },
    closeSetting () {
      this.currentInfo.suspend = !this.currentInfo.suspend
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/approval/commponents/controlPanel.scss";
</style>

<style lang="scss">
#panel_box {
  .lj_dialog > .flex-center {
    top: 0px !important;
  }
  .check_type_dialog {
    padding: 0 10px;
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-checkbox {
        margin-bottom: 30px;
      }
      .el-checkbox__inner {
        border-radius: 50%;
      }
      .el-checkbox__label {
        font-size: 14px;
        color: #686875;
      }
    }
  }
}
</style>





