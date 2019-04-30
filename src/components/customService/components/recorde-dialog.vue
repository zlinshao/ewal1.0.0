<template>
  <lj-dialog :visible="visible" :size="{width: 720 + 'px',height: 680 + 'px'}" @close="handleCloserecord">
    <div class="dialog_container" id='red-log'>
      <div class="dialog_header">
        <h3>{{typeName}}</h3>
        <div class="main_header" v-if='type == 1'>
          <p class='left_tips'>
            <i class='icon'></i>回访记录</p>
          <div class='right_tips' @click='addRecord'>
            <b>+</b>
          </div>
        </div>
      </div>
      <div class='dialog_main'>
        <ul v-if='tableCount> 0'>
          <li v-for='item in table'>
            <div class='detail_dialog_left'>
              <p>{{item.add_user || '----'}}</p>
              <p>{{item.time}}</p>
            </div>
            <div class="detail_dialog_center">

              <div class='circle'></div>
            </div>
            <div class='detail_dialog_right' v-if='item.is_connect== 0'>
              <p>未接通</p>
            </div>
            <div class='detail_dialog_right' v-else>
              <template v-if='type == 1'>
                <p>来源:{{item.from}}</p>
                <p v-if='item.other_fee.length == 0'>其他费用:无</p>
                <div class='other_fee' v-else>
                  其他费用：
                  <p v-for='fee in  item.other_fee' :key='fee.name'>{{fee.name + ':' + fee.money + '元'}}</p>
                </div>
              </template>
              <p class='detail_dialog_note'>{{item.remark}}</p>
              <el-rate class='detail_dialog_rato' v-model="item.star" disabled score-template="{value}">
              </el-rate>
            </div>
          </li>
        </ul>
        <p v-else>暂无记录</p>
      </div>
    </div>
  </lj-dialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog
  },
  data () {
    return {
      table: [],
      tableCount: 0,
      type: 0,
      typeName: '回访记录',
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getData()
      }
    },
    moduleData (val) {
      if (val.type) {
        this.typeName = val.house_name
        this.type = val.type
      }
    }
  },
  methods: {
    handleCloserecord () {
      this.$emit('close', true)
      this.table = []
    },
    addRecord () {
      this.$emit('close', 'add')
      this.table = []
    },
    getData () {
      this.$http.get(`${this.market_server}v1.0/csd/revisit/${this.moduleData.contract_type}/${this.moduleData.contract_id}`).then(res => {
        if (res.code === 200) {
          this.table = res.data.record || []
          this.tableCount = res.data.times || 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/common.scss";

@mixin confirmImg($m, $n) {
  $url: "../../../assets/image/customService/visitToRecord/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  // 回访记录
  #red-log {
    margin: 0 auto;
    overflow-y: scroll;
    ul {
      padding: 0 30px 50px;
      li + li {
        position: relative;
        &:before {
          content: "";
          width: 1px;
          height: 70%;
          background-color: #cf2e33;
          position: absolute;
          top: -10%;
        }
      }
      li {
        @include flex("justify-center");
        @include flex("items-center");
        font-family: "Microsoft Yahei";
        padding-top: 50px;
        .detail_dialog_left {
          flex: 1;
          font-size: 14px;
          text-align: right;
          p + p {
            margin-top: 10px;
          }
        }
        .detail_dialog_center {
          height: 100%;
          margin: 0 80px;
          .circle {
            width: 15px;
            height: 15px;
          }
        }
        .detail_dialog_right {
          flex: 1;
          text-align: left;
          font-size: 10px;
          p + p {
            margin-top: 10px;
          }
          .other_fee {
            p {
              margin-top: 5px;
              padding-left: 10px;
            }
          }
          .detail_dialog_rato {
            margin-left: 20px;
            display: inline-block;
            .el-rate__icon {
              font-size: 12px;
            }
          }
          .detail_dialog_note {
            margin-top: 0;
          }
        }
      }
    }
  }
}

#theme_name.theme1 {
  #red-log {
    color: #686874;
    .circle {
      @include confirmImg("biaoji.png", "theme1");
    }
    .dialog_main {
      background: #fff;
    }
  }
}

#theme_name.theme2 {
  #red-log {
  }
}

#theme_name.theme3 {
  #red-log {
  }
}

#theme_name.theme4 {
  #red-log {
  }
}
</style>

