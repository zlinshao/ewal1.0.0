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
          <div :class='["panel_cell",active_panel == 0?"panel_cell_active":""]' v-for='i in 10' :key="i" @dblclick="showCards(i)">
            <div class='cell_header'>
              <div class='cell_header_left'>
                <i class='icons icons_per'></i>
                <span>哈哈哈</span>
              </div>
              <i class='icons icons_deng'></i>
            </div>
            <div class='cell_list'>
              <span class='cell_tit'>审核中</span>
              <span class='cell_content cell_yellow'>32条</span>
            </div>
            <div class='cell_list'>
              <span class='cell_tit'>平均审核时长</span>
              <span class='cell_content cell_blue'>8min</span>
            </div>
            <div class='cell_list' v-if='current_status_type == 1'>
              <span class='cell_tit'>接收类型</span>
              <div class='cell_content cell_type'>
                <span class='cell_blue'>{{cellType.join(',')}}</span>
                <ul v-if='cellType.length > 1'>
                  <li v-for='(item,idx) in cellType' :key='idx'>{{item}}</li>
                </ul>
              </div>
            </div>
            <div class='cell_list' v-if='current_status_type == 2'>
              <span class='cell_tit'>组长</span>
              <span class='cell_content cell_blue'>8min</span>
            </div>
            <div class='cell_setting'>
              <i class='icons_setting' @click='handleSetting'></i>
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
      <div class='dialog_container'>
        <div class='dialog_header'>
          <h3>接收类型</h3>
        </div>
        <div class='dialog_main check_type_dialog'>
          <el-checkbox-group v-model="revice_check">
            <el-checkbox v-for='type in revice_type' :key='type.title' :label="type.title" :value='type.id' />
          </el-checkbox-group>
        </div>
        <div class='dialog_footer'>
          <el-button type="danger" size="small" @click='handleCheckType(true)'>同意</el-button>
          <el-button type="info" size="small" @click='handleCheckType(true)'>取消</el-button>
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
      active_panel: -1,
      current_page: 1,
      tableCount: 0,
      cellType: ['收房', '收房', '收房', '收房'],
      panel_info_visible: false,
      panel_info: {
        current_type: 1
      },
      show_set_visible: false,
      revice_check: [],
    }
  },
  methods: {
    change_status_type (value) {
      if (this.current_status_type != value) {
        this.current_status_type = value
      }
    },
    handleClose () {
      this.$emit('close', false)
    },
    handleCurrentChange (val) {
      this.current_page = val
    },
    showCards (i) {
      this.panel_info = {
        current_type: this.current_status_type
      }
      this.panel_info_visible = true
    },
    handleClosePanel () {
      this.panel_info_visible = false
    },
    handleSetting () {
      this.show_set_visible = true
    },
    handleCheckType (par) {
      this.show_set_visible = false
      if (par) {

      }
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




