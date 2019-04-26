<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container'>
        <div class='dialog_header'>
          <h3>house_name</h3>
        </div>
        <div class="dialog_main">
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

          <div class='float-btns'>
            <div class="float_box float_box_active" @click='changeBtns_type'>
              <div class='float_box_img float_box_con'></div>
              <p>评论信息</p>
            </div>
          </div>
        </div>

        <div class="dialog_footer">
          <el-button type="info" size="small" @click='handleEditor'>修改</el-button>
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

    <NewVillage :module='newvillage_visible' :editInfo='editInfo' />
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import VillageContainer from '../../customService/village/components/village-container.vue';
import LjUpload from '../../common/lightweightComponents/lj-upload';
import NewVillage from '../../customService/village/components/new-village.vue'
export default {
  props: ['visible','village'],
  components: {
    LjDialog,
    VillageContainer,
    LjUpload,
    NewVillage
  },
  data () {
    return {
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
      comment_show_visible: false,
      comment_words: null,
      newvillage_visible: false,
      editInfo: '',
      market_server: globalConfig.market_server,
    }
  },
  watch:{
    village:{
      handler(val){
        if(val){
          this.handleGetDetail(val)
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('close', close)
    },
    changeBtns_type (val) {
      this.comment_show_visible = !this.comment_show_visible
    },
    handleEditor () {
      
      this.newvillage_visible = true
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
