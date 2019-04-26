<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container'>
        <div class='dialog_header'>
          <h3>house_name</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='120px' v-for='(title,index) in showTitle' :key='index' v-if='type == 1'>
            <div class='dialog_tit' v-if='index != 0'>
              <div class='dialog_tit_img'></div>
              <p>{{title}}</p>
            </div>

            <div class='seeRecord' v-if='index== 0'>
              <el-button type="primary" plain @click='handleRecord'>查看审核记录</el-button>
            </div>

            <el-row :gutter='10' v-if='title == "相关信息"' class='message_box'>
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

            <el-row :gutter="10" v-else-if='title == "收款信息"'>
              <el-col :span='8'>
                <el-form-item v-for='(cell,idx) in Object.keys(collection_show)' :key='cell' :label="collection_show[cell]">
                  <span>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" v-else-if='title == "客户信息"'>
              <el-col :span='8'>
                <el-form-item v-for='(cell,idx) in Object.keys(customer_show)' :key='cell' :label="customer_show[cell]">
                  <span>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter='10' v-else>
              <el-col :span='8' v-for='(row,idex) in showDetail[index]' :key='"row"+idex'>
                <el-form-item v-for='(cell,idx) in Object.keys(row)' :key='cell' :label="row[cell]" :class='[cell== 55 ? "house_video":""]'>
                  <!-- 房屋影像 -->
                  <img v-if='cell == 55'></img>
                  <span v-else>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

          <template v-if='type == 2'>
            <el-form label-width="80px" readonly style='marginBottom:20px'>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="处理人" style="text-align: left;width: 100%">
                    <div style="word-break: break-all">第三方</div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" style="text-align: left;width: 100%">
                    <div style="word-break: break-all">第三方</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <VillageContainer village="基本信息">
              <el-form label-width="80px" class="borderNone" readonly>
                <el-row>
                  <el-col :span="8" v-for="(item,idx) in village_detail_form" :key="idx">
                    <el-form-item :label="item.label" style="text-align: left;width: 100%">
                      <div style="word-break: break-all">{{ item.val }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="小区照片">
                  <div class="flex">
                    <LjUpload v-model="village_pic" :disabled="true" :download="false"></LjUpload>
                  </div>
                </el-form-item>
                <el-form-item label="房屋照片">
                  <LjUpload v-model="house_pic" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
                <el-form-item label="调研报告">
                  <LjUpload v-model="files" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
              </el-form>
            </VillageContainer>
            <VillageContainer village="全站大数据房源匹配">
              <div id="village-detail" style="min-height: 400px"></div>
            </VillageContainer>
            <VillageContainer village="房型价格-区块链推荐">
              <el-table :data="outer_net_data" @row-click="handleClickRow">
                <el-table-column label="房型" prop="house_type" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="handleOpenOuterHouse(scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </VillageContainer>
            <VillageContainer village="自适应聚类房型图">
              <div style="text-align: left" v-if="outer_house_pic.length > 0">
                <img :src="url" alt="" style="width: 60px;height: 60px;margin-right: 15px;cursor: pointer;border-radius: 4px"
                  v-for="url in outer_house_pic" data-magnify="" data-caption="图片查看器" :data-src="url">
              </div>
              <div style="text-align: center" v-else>暂无数据</div>
            </VillageContainer>
            <VillageContainer village="所属部门">
              <div v-if="current_village_detail.org && current_village_detail.org.length > 0" style="text-align: left"
                class="flex">
                <p v-for="(item,idx) in current_village_detail.org">{{ item.name }}<a v-if="idx !== current_village_detail.org.length - 1">、</a></p>
              </div>
            </VillageContainer>
          </template>

          <div class='float-btns'>
            <div class="float_box float_box_active" @click='changeBtns_type'>
              <div class='float_box_img float_box_con'></div>
              <p>评论信息</p>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click='handleBuff' v-if='type == 1'>暂缓</el-button>
          <el-button type="info" size="small" @click='handleRecord'>修改</el-button>
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
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import VillageContainer from '../../customService/village/components/village-container.vue';
import LjUpload from '../../common/lightweightComponents/lj-upload';
export default {
  props: ['visible'],
  components: {
    LjDialog,
    VillageContainer,
    LjUpload
  },
  data () {
    return {
      showDetail: [
        [
          {
            type: '收房报备',
            department: '部门'
          }, {
            status: "状态",
            org_name: '处理人'
          }
        ],
        [
          {
            20: '产权地产',
            23: '持有证件',
            26: '户型',
            29: '面积',
            32: '装修',
            35: '房屋类型',
            38: '朝向',
            41: '楼层',
            44: '物业电话',
            47: '物业费单价',
            50: '暖气',
            53: '门锁类型',
            55: '房屋影像'
          }, {
            21: '产权证号',
            24: '燃气灶',
            27: '洗衣机',
            30: '晾衣架',
            33: '冰箱',
            36: '油烟机',
            39: '热水器',
            42: '餐桌',
            45: '天然气',
            48: '窗帘',
            51: '衣柜',
            54: '其他问题',
          }, {
            22: '丘权号',
            25: '空调',
            28: '电视',
            31: '微波炉',
            34: '沙发',
            37: '椅子',
            40: '床+床垫',
            43: '卫生状况',
            46: '家电',
            49: '备注',
            52: '补齐时间',
          }
        ],
        [
          {
            60: '签约时间',
            61: '合同开始时间',
            62: '合同结束时间',
            63: '签约时长',
            64: '空置期天数',
            65: '是否渠道',
            66: '渠道费',
            67: '保修期',
            68: '月单价',
            68: '付款方式',
          }, {
            70: '第一次付款时间',
            71: '第二次付款时间',
            72: '公司合同',
            73: '备注条款',
          }, {
            81: '合同编号',
          }
        ],
      ],
      collection_show: {
        91: '开户名',
        92: '卡号',
        93: '开户行',
        94: '支行',
        95: '与房东关系'
      },
      customer_show: {
        11: '姓名',
        12: '手机号',
        13: '证件类型',
        14: '证件号',
      },
      showTitle: ['', '房屋信息', '合同信息', '相关信息', '收款信息', '客户信息'],
      village_detail_form: {
        city_name: {
          label: '城市名称',
          val: ''
        },
        area_name: {
          label: '区/县名称',
          val: ''
        },
        village_alias: {
          label: '小区别名',
          val: '',
        },
        address: {
          label: '街道地址',
          val: ''
        },
        built_year: {
          label: '建筑年代',
          val: ''
        },
        house_type: {
          label: '房屋类型',
          val: ''
        },
        total_buildings: {
          label: '总栋数',
          val: ''
        },
        property_fee: {
          label: '物业费',
          val: ''
        },
        property_phone: {
          label: '物业电话',
          val: ''
        },
        property_com: {
          label: '物业公司',
          val: ''
        },
        peripheral_info: {
          label: '周边信息',
          val: ''
        },
        remark: {
          label: '备注',
          val: ''
        }
      },
      village_pic: [],
      house_pic: [],
      files: [],
      outer_house_pic: [],
      outer_net_data: [],
      current_village_detail: '',
      type: 1,
      comment_show_visible: false,
      comment_words: null,
      record_show_visible: false,
      market_server: globalConfig.market_server,
    }
  },
  methods: {
    handleClose () {
      this.$emit('close', close)
    },
    changeBtns_type (val) {
      this.comment_show_visible = !this.comment_show_visible
    },
    handleRecord () {
      console.log(22)
      this.record_show_visible = true
    },
    handleCloseRecord () {
      this.record_show_visible = false
    },
    handleBuff () {
      console.log('暂缓')
    },
    handleGetDetail (village) {
      this.$http.get(this.market_server + `v1.0/market/community/${village.id}`).then(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.current_village_detail = res.data;
          this.village_detail_visible = true;
          for (var key in this.village_detail_form) {
            this.village_detail_form[key].val = res.data[key] ? res.data[key] : '';
          }
          this.village_detail_form.city_name.val = res.data.city && res.data.city.city_name;
          this.village_detail_form.area_name.val = res.data.area && res.data.area.area_name;
          this.outer_net_data = res.data.outer_net_data ? res.data.outer_net_data : [];
          var location = [res.data.longitude, res.data.latitude];
          this.village_pic = res.data && res.data.album && res.data.album.village_photo ? res.data.album.village_photo : [];
          this.house_pic = res.data && res.data.album && res.data.album.home_photo ? res.data.album.home_photo : [];
          this.files = res.data && res.data.album && res.data.album.files ? res.data.album.files : [];
          this.$nextTick(() => {
            this.handleDetailMap(location);
          })
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          });
          return false;
        }
      })
    },
    handleDetailMap (position) {
      let that = this;
      this.map = new AMap.Map('village-detail', {
        resizeEnable: true,
        center: position, //初始化地图中心点
        zoom: 13
      });
      let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(5, -20) });
      var marker = new AMap.Marker({
        position,
        map: that.map
      });
      marker.content = this.current_village_detail && this.current_village_detail.village_name;
      marker.on('click', markerClick);
      marker.emit('click', { target: marker });
      this.map.add(marker);
      function markerClick (e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(that.map, e.target.getPosition());
      }
    },
    //点击获取房型图
    handleClickRow (row) {
      console.log(row);
      this.outer_house_pic = row.pic_address || [];
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
          img + img {
            margin-left: 15px;
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
            line-height: 30px;
            font-family: "Microsoft YaHei";
          }
          .el-form-item__label {
            text-align: right;
          }
          .el-form-item__content {
            text-align: left;
          }
        }
        .house_video {
          .el-form-item__label,
          .el-form-item__content {
            line-height: 50px;
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
