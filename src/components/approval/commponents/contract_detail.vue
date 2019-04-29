<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container' v-if='visible && formData'>
        <div class='dialog_header'>
          <h3>{{formData.house_address}}</h3>
        </div>
        <div class="dialog_main" id='dialog_main'>
          <el-form label-width='120px'>
            <el-row :gutter='10'>
              <el-col :span='cell.formspan' v-for='(cell,cellIndex) in firstDefine' :key='cell.keyName'>
                <el-form-item :label='cell.label'>
                  <span>{{formData[cell.keyName]}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class='seeRecord' @click='handleRecord'>
              <el-button type="primary" plain>查看审核记录</el-button>
            </div>
          </el-form>

          <el-form label-width='120px' v-for='(form,slither,index) in defineReport' :key='slither'>

            <VillageContainer :village="titleTips[index]">
              <!-- 付款信息 循环 row -->
              <el-row :gutter='10' v-if='titleTips[index]=="付款信息"'>
                <el-col :span='8' v-for='(cell,cellIndex) in form' :key='cell.keyName'>
                  <el-form-item :label='cell.label'>
                    <span>{{formData[cell.keyName]}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter='10' v-else-if='titleTips[index] == "相关信息"' class='message_box'>
                <el-col :span='8'>
                  <el-form-item v-for='i in 5' :key='i' label=" " class='message_form'>
                    <span>同类型房源市场均价2500-3000元同类型房源市场均价2500-3000元同类型房源市场均价2500-3000元</span>
                  </el-form-item>
                </el-col>
                <el-col :span='7' :offset="3" class='message_con'>
                  <p>其中:</p>
                  <div v-for='i in 3' :key='i'>{{i+1}}.公司</div>
                </el-col>
                <el-col :span='3' class='message_price'>
                  <p>收房价:</p>
                  <div v-for='i in 3' :key='i'>{{i+1}}.公司</div>
                </el-col>
              </el-row>

              <template v-else>
                <el-row :gutter='10' v-for='(cell,cellIndex) in form' :key='cell.keyName' v-if='cell.type == "change"'>
                  <el-col :span='cell.formSpan || formSpan' v-for='(child,child_index) in cell.children' :key='child_index'>
                    <el-form-item :label='col.label' v-for='(col,col_index) in child' :key='col_index'>
                      <span v-if='col.type=="input"'>{{formData[cell.keyName][child_index][col.keyName]}}</span>
                      <span v-if='col.type=="picker"'>
                        {{dicties[col.keyName][formData[cell.keyName][child_index][col.keyName]]}}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 正常表单 -->
                <el-row :gutter='10' v-if='form.type != "change"'>
                  <el-col :span='cell.formSpan || formSpan' v-for='(cell,cellIndex) in form' :key='cell.keyName'>
                    <el-form-item :label='cell.label' :class='cell.type == "upload"?"house_video":""'>

                      <template v-if='cell.type== "radio"'>
                        <span>{{dicties[cell.keyName][formData[cell.keyName]]}}</span>
                      </template>

                      <!-- 多个选择checkbox -->
                      <template v-if='cell.type== "picker"'>
                        <div v-if='cell.children' class='more_checkbox'>
                          <span v-for='(child,child_index) in cell.children'>{{dicties[cell.keyName]["value_"+child_index][formData[cell.keyName][child_index]]}}</span>
                        </div>
                        <span v-else>{{formData[cell.keyName] && formData[cell.keyName].name}}</span>
                      </template>

                      <template v-if='cell.type== "picktimer"'>
                        <el-date-picker v-model="formData[cell.keyName]" type="date" :placeholder="cell.placeholder"
                          :format="cell.format" class='picktimer' />
                      </template>

                      <template v-if='cell.type == "input"'>
                        <div class='
              ' v-for='(child,child_index) in cell.children' :key='child_index'
                          v-if='cell.children'>
                          <span>{{formData[cell.keyName][child_index][child.keyName]}}</span>
                          <span>{{child.spanLabel}}</span>
                        </div>

                        <span v-if='!cell.children'>{{formData[cell.keyName]}}</span>
                      </template>

                      <template v-if='cell.type == "upload"'>
                        <img v-for="tmp in formData.album.photo" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                          :data-src="tmp.uri" :src="tmp.uri" style="width: 50px;height: 50px;margin-right: 5px" v-if="tmp.uri">
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </VillageContainer>
          </el-form>

          <div class='float-btns'>
            <div class="float_box float_box_active" @click='changeBtns_type'>
              <div class='float_box_img float_box_con'></div>
              <p>评论信息</p>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click='handleBuff' v-if='type == 1'>暂缓</el-button>
          <el-button type="info" size="small" @click='handleRewrite'>修改</el-button>
          <el-button type="info" size="small">拒绝</el-button>
          <el-button type="danger" size="small">同意</el-button>
        </div>
      </div>

      <!-- 评论 -->
      <div :class='["comments_box",comment_show_visible?"comments_box_active":""]'>
        <div class='comments_list'>
          <div class='comment_cell'>
            <div class='comment_cell_header'>
              <span class='span1'>撒旦飞洒地方</span>
              <span class='span2'>2019-01-22 10:00:00</span>
            </div>
            <div class='comment_cell_words'>sdfasfasfdsdfasfdd</div>
            <div class='comment_border'></div>
          </div>
        </div>
        <div class='comments_footer'>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="comment_words">
          </el-input>
          <div class='post'>
            <i class='post_icons'></i>
            发送
          </div>
        </div>
      </div>
    </LjDialog>

    <!--审核-->
    <LjDialog :visible="record_show_visible" :size="{width: 720 + 'px',height: 850 + 'px'}" @close="handleCloseRecord">
      <div class='dialog_container'>
        <div class='dialog_header'>
          <h3>审核记录</h3>
        </div>
        <div class='dialog_main record_dialog'>
          <div class='record_cell' v-for='i in 6' :key='i'>
            <div class='record_cell_left'>
              <div class='record_status'>
                <div class='circle circle1' v-if='i== 4'></div>
                <div class='circle circle2' v-else-if='i== 5'></div>
                <img v-else></img>
              </div>

              <div class='record_cell_mess'>
                <p class='record_person'>
                  菜刀
                  <span class='agree' v-if='i == 2'>已同意</span>
                  <span class='agree transfer' v-if='i == 3'>已转交</span>
                  <span v-if='i == 4'>做了评论</span>
                  <span v-if='i == 5'>修改了报备</span>
                </p>
                <p class='record_message'>了哈哈哈</p>
              </div>
            </div>
            <div class='record_time'>
              <p class='record_uptime'>03.07 18:23:00</p>
              <p class='fre_time'>耗时20min</p>
            </div>
          </div>
        </div>
      </div>
    </LjDialog>

    <FormDetail :visible='show_form_visible' :moduleData='formData' />
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import VillageContainer from '../../customService/village/components/village-container.vue';
import LjUpload from '../../common/lightweightComponents/lj-upload.vue';
import FormDetail from './form_detail.vue'
export default {
  props: ['visible'],
  components: {
    LjDialog,
    VillageContainer,
    LjUpload,
    FormDetail
  },
  data () {
    return {
      formSpan: 8,
      firstDefine: [
        {
          keyName: 'bulletin_name',
          label: '收房报备',
          formspan: 8,
        },
        {
          keyName: 'department_name',
          label: '部门',
          formspan: 16,
        },
        {
          keyName: 'status',
          label: '状态',
          formspan: 8,
        },
        {
          keyName: 'org_name',
          label: '处理人',
          formspan: 16,
        },
      ],
      dicties,
      defineReports: JSON.parse(JSON.stringify(defineReport)),
      type: 1,
      titleTip: {
        1: ['房屋信息', '合同信息', '付款信息', '相关信息', '客户信息'],
      },

      type: 1,
      comment_show_visible: false,
      comment_words: null,
      record_show_visible: false,
      show_form_visible: false,
      formData: null,
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    visible (val) {
      if (val) this.getDetailForm()
    }
  },
  computed: {
    defineReport () {
      let deport = JSON.parse(JSON.stringify(this.defineReports[this.type]))
      deport.slither4 = deport.slither3
      deport.slither3 = []
      return deport
    },
    titleTips () {
      return this.titleTip[this.type]
    }
  },
  methods: {
    getDetailForm () {
      this.$http.get(this.market_server + `v1.0/market/process/edit/197`).then(res => {
        if (res.code === 200) {
          this.formData = res.data.content
          console.log(this.formData)
        }
      })
    },
    handleClose () {
      this.$emit('close', close)
    },
    changeBtns_type (val) {
      this.comment_show_visible = !this.comment_show_visible
    },

    handleRecord () {
      this.record_show_visible = true
    },
    handleCloseRecord () {
      this.record_show_visible = false
    },
    handleBuff () {
      console.log('暂缓')
    },
    handleRewrite () { // 修改
      this.show_form_visible = true
      this.$emit('close', false)
    },
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
  #contract_detail_approval {
    // 表格设置
    .dialog_main {
      @include scroll;
      overflow-x: hidden;
      .el-form {
        border-radius: 4px;
        padding: 16px 0 16px 30px;
        position: relative;
        .seeRecord {
          width: 110px;
          height: 30px;
          position: absolute;
          right: 140px;
          top: 20px;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          z-index: 999;
        }
        .dialog_tit {
          position: absolute;
          top: 0;
          left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .dialog_tit_img {
            width: 20px;
            height: 60px;
          }
          p {
            padding-top: 10px;
            writing-mode: vertical-rl;
            font-size: 14px;
            font-family: "jingdianxingshu";
          }
        }
        .house_video {
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
      .el-form + .el-form {
        margin-top: 20px;
      }
      .float-btns {
        position: fixed;
        top: 180px;
        right: 60px;
        .float_box {
          margin-top: 20px;
          .float_box_img {
            width: 60px;
            height: 60px;
          }
          p {
            font-size: 10px;
            text-align: center;
          }
        }
      }
    }
    .record_dialog {
      padding: 30px;
      .record_cell {
        display: flex;
        align-items: flex-start;
        height: 130px;
        position: relative;
        .record_cell_left {
          flex: 1;
          display: flex;
          .record_status {
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .circle {
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
          }
          .record_cell_mess {
            margin-left: 20px;
            .record_person {
              font-size: 12px;
              .agree {
                display: inline-block;
                width: 50px;
                height: 24px;
                text-align: center;
                line-height: 24px;
              }
              span {
                font-size: 12px;
              }
            }
            .record_message {
              margin-top: 10px;
              font-size: 12px;
              font-family: "jingdianxingshu";
            }
          }
        }
        .record_time {
          width: 100px;
          .record_uptime {
            font-size: 12px;
          }
          .fre_time {
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }
      .record_cell + .record_cell {
        &::before {
          content: "";
          position: absolute;
          left: 20px;
          top: -80px;
          width: 1px;
          height: 60px;
          border-left: 1px dashed #dfdfdf;
        }
      }
    }
    .dialog_footer {
      display: flex;
      justify-content: flex-end;
    }

    // 评论
    .comments_box {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 160px;
      width: 350px;
      background: #fff;
      padding: 30px;
      display: flex;
      flex-direction: column;
      @include transform(scale(0));
      @include transOrigin(50%);
      @include transition(all 0.4s linear);
      opacity: 0;
      &.comments_box_active {
        @include transOrigin(50%);
        @include transition(all 0.4s linear);
        @include transform(scale(1));
        opacity: 1;
      }
      .comments_list {
        flex: 1;
        @include scroll;
        overflow-x: hidden;
        .comment_cell {
          .comment_cell_header {
            display: flex;
            justify-content: space-between;
            align-content: center;
            height: 40px;
            span {
              line-height: 40px;
              font-size: 14px;
            }
          }
          .comment_cell_words {
            font-size: 10px;
            font-weight: 700;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .comment_border {
            margin-top: 15px;
          }
        }
      }
      .comments_footer {
        height: 140px;
        .post {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 14px;
          padding-right: 10px;
          margin-top: 10px;
          .post_icons {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 12px;
          }
        }
      }
    }
  }
}

#theme_name.theme1 {
  #contract_detail_approval {
    .dialog_main {
      .el-form {
        .dialog_tit {
          .dialog_tit_img {
            @include confirmImg("mokuai.png", "theme1");
          }
          p {
            color: #cf2e33;
          }
        }
      }
      .float-btns {
        .float_box {
          .float_box_con {
            @include confirmImg("pinglun.png", "theme1");
          }
          .float_box_rew {
            @include confirmImg("baobei.png", "theme1");
          }
          p {
            color: #dddddd;
          }
        }
        .float_box_active {
          .float_box_con {
            @include confirmImg("pinglun_dianji.png", "theme1");
          }
          .float_box_rew {
            @include confirmImg("baobei_dianji.png", "theme1");
          }
          p {
            color: #cf2e33;
          }
        }
      }
    }
    .comments_box {
      .comment_cell {
        .comment_cel_header {
          .span1 {
            color: #686874;
          }
          .span2 {
            color: #b0b0b0;
          }
        }
        .comment_cell_words {
          color: #000;
        }
        .comment_border {
          border: 1px solid #f9f9f9;
          height: 2px;
        }
      }
      .comments_footer {
        border: 1px solid #f2f2f2;
        border-radius: 8px;
        .post_icons {
          @include confirmImg("fasong.png", "theme1");
        }
        .post {
          color: #cf2e33;
        }
      }
    }
    .record_dialog {
      background: #fff;
      .record_status {
        .circle1 {
          background: #cf2e33;
        }
        .circle2 {
          background: #ffad0d;
        }
      }
      .record_cell_mess {
        .record_person {
          color: #b0b0b0;
          .agree {
            background: #eafcf7;
            color: #099a71;
          }
          .transfer {
            background: #f5faff;
            color: #0a59ec;
          }
        }
        .record_message {
          color: #333;
        }
      }
      .record_time {
        p {
          color: #b0b0b0;
        }
        .fre_time {
          color: #686874;
        }
      }
    }
  }
}
</style>

<style lang="scss">
#contract_detail_approval {
  z-index: 100;
  .lj_dialog > .flex-center {
    top: 0px !important;
  }
}

#theme_name {
  #contract_detail_approval {
    // 表格设置
    .dialog_main {
      .el-form {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label,
          .el-form-item__content {
            display: flex;
            align-items: center;
            height: 30px;
            font-family: "Microsoft YaHei";
          }
          .el-form-item__label {
            text-align: right;
            justify-content: flex-end;
          }
          .el-form-item__content {
            text-align: left;
            display: flex;
            align-items: center;
            .more_checkbox {
              display: flex;
              .el-select {
                flex: 1;
              }
              .el-input__inner {
                padding: 0 5px;
              }
            }
          }
          .el-date-editor--date {
            input {
              border: none;
            }
          }
        }
        .house_video {
          height: 50px;
          .el-form-item__label,
          .el-form-item__content {
            line-height: 50px;
            height: 50px;
          }
        }
        .message_box {
          .message_form {
            .el-form-item__label {
              height: 20px;
              position: relative;
              &:after {
                content: "";
                width: 6px;
                height: 6px;
                background: #b0b0b0;
                border-radius: 50%;
                position: absolute;
                top: 7px;
                right: 15px;
              }
            }
            .el-form-item__content {
              line-height: 20px;
              max-height: 40px;
              overflow: hidden;
            }
          }
          .message_form + .message_form {
            margin-top: 10px;
          }
          .message_con {
            text-align: left;
            div {
              color: #e79699;
            }
          }
          .message_price {
            text-align: left;
            div {
              font-weight: 700;
              color: #333;
            }
          }
        }
      }
    }
    .comments_box {
      .el-textarea__inner {
        border: none;
        height: 100px;
      }
    }
  }
}

#theme_name.theme1 {
  #contract_detail_approval {
    // 表格设置
    .dialog_main {
      .el-form {
        background: #fff;
        .el-form-item {
          .el-form-item__label {
            color: #b0b0b0;
          }
          .el-form-item__content {
            color: #686874;
          }
        }
        .el-button--primary.is-plain {
          background: #fff;
          border-color: #0c66ff;
          color: #0c66ff;
        }
      }
    }
  }
}
</style>
