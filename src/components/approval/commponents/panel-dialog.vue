<template>
  <div id='showTag'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container'>
        <div class='dialog_header'>
          <div class='cell_header' v-if='current_type == 1'>
            <i class='icons icons_per'></i>
            <span>哈哈哈</span>
          </div>
          <div class='cell_header2' v-if='current_type == 2'>
            <span>哈哈哈</span>
            <p>组长：涨涨涨</p>
          </div>
        </div>
        <div class="dialog_main">
          <el-table :data="tableData" height="580px" highlight-current-row @row-dblclick="" header-row-class-name="tableHeader"
            style="width: 100%">

            <el-table-column align="center" v-for='item in Object.keys(tableShow)' :key='item' :prop='item' :label="tableShow[item]"></el-table-column>

            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span :class='["status","status" + scope.row.status]'>
                  {{scope.row.status == 1 ?"正常":"超时"}}
                </span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="管控">
              <template slot-scope="scope">
                <el-button type="primary" plain @click='handleTansfer(scope.row)'>转交</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <el-pagination @current-change="handleCurrentChange" :current-page="current_page" :page-size="10" :total="tableCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </LjDialog>

    <TransferDialog :visible='transfer_visible' :moduleData='handleCloseTransfer' @close='handleCloseTransfer' />
  </div>
</template>


<script>
import LjDialog from '../../common/lj-dialog.vue';
import TransferDialog from './transfer-dialog'
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog,
    TransferDialog
  },
  data () {
    return {
      current_type: null, //组员 片区
      tableShow: {
        type: '审核类型',
        time: '提交时间',
        wait_time: '等待时长',
      },
      tableData: [
        {
          type: '审核类型',
          time: '提交时间',
          wait_time: '等待时长',
          status: 1
        },
        {
          type: '审核类型',
          time: '提交时间',
          wait_time: '等待时长',
          status: 2
        }
      ],
      tableCount: 0,
      current_page: 1,
      transfer_visible: false,
      transfer_info: {
        id: null,
        type: ''
      }
    }
  },
  watch: {
    moduleData: {
      handler (val) {
        this.current_type = this.moduleData.current_type
      },
      deeper: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('close', false)
    },
    handleCurrentChange (val) {
      this.current_page = val
    },
    handleTansfer () {
      this.transfer_visible = true
    },
    handleCloseTransfer () {
      this.transfer_visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/common.scss";
@mixin confirmImg($m, $n) {
  $url: "../../../assets/image/approval/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  #showTag {
    z-index: 100;
    .lj_dialog,
    .flex-center {
      top: 0px !important;
    }
  }

  .dialog_header {
    .cell_header {
      display: flex;
      align-items: center;
      font-size: 20px;
      span {
        margin-left: 10px;
        font-family: "jingdianxingshu";
      }
      .icons {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }
    .cell_header2 {
      display: flex;
      align-items: center;
      font-size: 20px;
      p {
        font-size: 12px;
        line-height: 30px;
        border-radius: 4px;
        padding: 0 12px;
        margin-left: 30px;
      }
    }
  }
  .dialog_main {
    font-size: 14px;
    .status {
      font-weight: 700;
    }
  }
}

#theme_name.theme1 {
  .cell_header {
    color: #686874;
    .icons_per {
      @include confirmImg("ren_hui.png", "theme1");
    }
  }
  .cell_header2 {
    p {
      background: #ffad0d;
      color: #fff;
    }
  }
  .dialog_main {
    .status1 {
      //正常
      color: #cf2e33;
    }
    .status2 {
      //正常
      color: #0bb07b;
    }
  }
}
</style>

<style lang="scss">
#showTag {
  z-index: 100;
  .lj_dialog > .flex-center {
    top: 0px !important;
  }
}
</style>

