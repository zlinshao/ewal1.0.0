<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container' v-if='visible && formData'>
        <div class='dialog_header'>
          <h3>{{formData.house_address}}</h3>
        </div>
        <div class="dialog_main" id='dialog_main'>
          <el-form label-width="120px" v-for='slither_index in Object.keys(defineForm)' :key='"slither" + slither_index'>
            <VillageContainer :village="titleTips[slither_index]" :hidden='slither_index==0'>

              <el-row :gutter='10' v-if='titleTips[slither_index] == "相关信息"' class='message_box'>
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

              <el-row :gutter="10" v-else <el-col :span='8' v-for='(slit_row,index) in defineForm[slither_index]' :key='index'>
                <el-form-item :label='slit_row[slither]' v-for='slither in Object.keys(slit_row)' :key='"row"+ slither'>
                  <template v-if="Array.isArray(formData[slither])">

                    <template v-if='slither == "house_video"'>
                      <ljupload size='40' v-model="formData[slither]" disabled=true></ljupload>
                    </template>

                    <template v-else>
                      <div v-for="(val,idx) in formData[slither]" :key='idx' class='slither_box'>
                        <div v-if="val.period">
                          <h4 :class="[idx !== 0?'h4':'']">
                            {{val.begin_date}}至{{val.end_date}}<br>
                            {{val.pay_way}}：{{val.month_unit_price}}元
                          </h4>
                        </div>

                        <p v-else style='wihte-space:nowrap;line-height:20px;margin-bottom:5px;'>{{val}}</p>

                      </div>

                    </template>

                  </template>

                  <span v-else>{{formData[slither]}}</span>

                </el-form-item>
                </el-col>
              </el-row>
              <div class='seeRecord' @click='handleRecord' v-if='slither_index == 0'>
                <el-button type="primary" plain>查看审核记录</el-button>
              </div>
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
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="comment_info.content">
          </el-input>
          <!-- 上传图片 -->
          <div class='img_box'>
            <p class='postTit'>发送图片</p>
            <Ljupload size='30' v-model='comment_info.album'></Ljupload>
          </div>
          <div class='post'>
            <i class='post_icons'></i>
            发送
          </div>
        </div>
      </div>
    </LjDialog>

    <!--审核-->
    <LjDialog :visible="record_show_visible" :size="{width: 720 + 'px',height: 480 + 'px'}" @close="handleCloseRecord">
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
import VillageContainer from './village-container.vue';
import Ljupload from '../../common/lightweightComponents/lj-upload.vue';
import FormDetail from './form_detail.vue'
import { defineForm, defineTitleTips } from '../../../assets/js/approval/definForm.js'
import { isNull } from 'util';
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog,
    VillageContainer,
    Ljupload,
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
      defineForms: JSON.parse(JSON.stringify(defineForm)),
      defineForm: null,
      titleTips: null,
      type: 1,
      comment_show_visible: false,
      comment_info: {
        content: '',
        album: []
      },
      record_show_visible: false,
      show_form_visible: false,
      formData: null,
      market_server: globalConfig.market_server,
      taskType: ['rtl_detail_request_url', 'ctl_detail_request_url'],
    }
  },
  watch: {
    moduleData: {
      handler (val) {
        if (val) {
          this.defineForm = this.defineForms[1]
          this.titleTips = defineTitleTips[1]
          this.getDetailForm(val)
        }
      },
      deeper: true
    }
  },

  methods: {
    getDetailForm (params) {
      let url = params.bm_detail_request_url
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.formData = res.data.content
          this.handleDetail(res.data.content)
        }
      })
    },

    // 转换文本显示
    handleDetail (res) {
      for (let item of Object.keys(res)) {
        this.formData[item] = res[item] || this.formData[item];
        switch (item) {
          case 'door_address'://门牌地址
            let door = JSON.parse(JSON.stringify(res[item]));
            door[0] = door[0] ? door[0] + '栋' : '';
            door[1] = door[1] ? door[1] + '单元' : '';
            door[2] = door[2] ? door[2] : '';
            this.formData[item] = door.join('');
            break;
          case 'community':
            this.formData[item] = res[item].village_name;
            break;
          case 'house_type'://户型
            let house = JSON.parse(JSON.stringify(res[item]));
            house[0] = house[0] ? house[0] + '室' : '';
            house[1] = house[1] ? house[1] + '厅' : '';
            house[2] = house[2] ? house[2] + '卫' : '';
            this.formData[item] = house.join('');
            break;
          case 'decorate'://装修
          case 'property_type'://房屋类型
          case 'direction'://朝向
            this.formData[item] = res[item].name;
            break;
          case 'floors':
            this.formData.floors = res.floor + ' / ' + res.floors;
            break;
          case 'holding_documents_type'://持有证件
          case 'lock_type'://门锁类型
          case 'bed'://床和床垫的情况
          case 'wardrobe'://衣柜情况
          case 'curtain'://窗帘情况
          case 'is_fill'://家电是否补齐
          case 'is_lord_fill'://房东是否补齐
          case 'has_heater'://是否有暖气
          case 'has_gas'://是否有天然气
          case 'customer_sex'://性别
          case 'card_type'://证件类型
          case 'contact_way'://联系方式
          case 'is_elevator'://是否有电梯
          case 'is_clean'://卫生情况
          case 'is_agency'://是否渠道
          case 'is_electronic_contract'://是否电子合同
          case 'can_decorate'://可否装修
          case 'can_add_goods'://可否添加物品
          case 'signatory_identity'://签约人身份
          case 'position'://所属区域
            let num = this.myUtils.isNum(res[item]) ? Number(res[item]) : (res[item] || '');
            this.formData[item] = dicties[item][num];
            break;
          case 'non_landlord_fee'://非房东费用
            let names = [];
            for (let name of this.formData[item]) {
              names.push(dicties[item][name])
            }
            this.formData[item] = names.join(',');
            break;
          case 'remark_terms'://备注条款
            let terms = [];
            for (let name of res[item]) {
              terms.push(name + '、' + dicties[item][name]);
            }
            this.formData[item] = terms;
            break;
          case 'subsidiary_customer'://附属房东
            if (res[item]) {

              //   let customer = ['customer_sex', 'card_type', 'contact_way'];
              //   this.formData = this.changeHandle(res, item, customer, this.defineForm, this.formData);
              //   for (let val of res[item]) {
              //     for (let value of Object.values(val)) {
              //       if (value) {
              //         this.showCustomer = true;
              //       }
              //     }
              //   }
            }
            break;
          case 'period_price_way_arr'://付款方式变化
            let pay_way = ['pay_way'];
            this.formData = this.changeHandle(res, item, pay_way, this.defineForm, this.formData);
            break;
        }
      }
      if (res.album) {
        for (let pic of Object.keys(res.album)) {
          this.formData[pic] = res.album[pic];
        }

        this.formData['house_video_name'] = this.formData['house_video']
        let house_video = this.formData['house_video']
        this.formData['house_video'] = []
        for (let item of house_video) {
          this.formData['house_video'].push(item.id)
        }
      }
      console.log(this.formData)
    },
    changeHandle (res, item, val, all, data) {
      let formatData = data;
      for (let slither of Object.keys(all)) {
        for (let list of Object.keys(all[slither])) {
          if (all[slither][list].keyName === item) {
            for (let i = 1; i < res[item].length; i++) {
              all[slither][list].children.push(all[slither][list].children[0]);
            }
          }
        }
      }
      formatData[item] = JSON.parse(JSON.stringify(res[item]));
      res[item].forEach((key, idx) => {
        for (let key of val) {
          formatData[item][idx][key] = dicties[key][res[item][idx][key]];
        }
      });
      return formatData;
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
        // padding: 16px 0 16px 30px;
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
          z-index: 9;
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
      z-index: 12;
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
        height: 160px;
        .img_box {
          height: 50px;
          @include scroll;
          .postTit {
            font-size: 14px;
            color: #b0b0b0;
            text-align: left;
            padding-left: 8px;
          }
        }

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
            // height: 30px;
            font-family: "Microsoft YaHei";
          }
          .el-form-item__label {
            text-align: right;
            justify-content: flex-end;
          }
          .el-form-item__content {
            text-align: left;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
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
