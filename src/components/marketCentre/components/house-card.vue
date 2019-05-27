<template>
    <div id="houseCard">
      <div :style="{'height' : content_height + 'px'}">
        <div class="content scroll_bar" @scroll="handleScroll" @click="show_control = false">
          <div class="flex cards" v-if="house_info.length > 0">
            <div v-for="item in house_info" :key="item.id" class="justify-center house-item">
              <div class="card" :class="['card_trans-' + item.id]" @dblclick.stop="handleOpenCard(item)">
                <div class="photo">
                  <div class="picture">
                    <img class="picture" :src="item.album_photo[0].uri" alt="..." v-if="item.album_photo && item.album_photo.length > 0">
                    <img class="picture" v-else src="./swipe1.jpg" alt="...">
                  </div>
                  <div class="bg">
                    <div class="btn" @click.stop="handleOpenControl(item.id)">...</div>
                    <div class="house_type">{{ item.decorate }}</div>
                  </div>
                  <span class="mark" :class="{'marked' : item.quality === 1}"></span>
                </div>
                <div class="info">
                  <span class="address">{{ item.name }}</span>
                  <div class="text">
                    <p><b class="type_icon"></b>{{ item.hk }}</p>
                    <p><b class="info_icon"></b>空置{{ item.warning_current_days }}天 / 剩余 {{ item.month }}月</p>
                    <p><b class="price_icon"></b>建议{{ item.suggest_price }}/月 {{ item.month }}月付</p>
                  </div>
                  <div class="notice_info flex-center">
                    <span class="notice-type">{{ item.house_status_name }}</span>
                    <span :class="['announcement-' + item.warning_status ]" class="notice"></span>
                  </div>
                </div>
                <div class="control flex-center">
                  <span v-for="tmp in tip_btn" :key="tmp.id" @click.stop="handleOpenModule(tmp,item)">{{ tmp.val }}</span>
                  <div class="arrows"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="none_info" v-else>
            暂无房源数据
          </div>
          <div class="page">
            <el-pagination
              :total="params.count"
              :current-page="params.page"
              :page-size="params.limit"
              layout="total,prev,pager,next"
              @current-change="handleChangePage"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!--跟进-->
      <lj-dialog
        :visible="follow_up_visible"
        :size="{width: 600 + 'px',height: 450 + 'px'}"
        @close="handleCancelFollowInfo"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>跟进记录</h3>
          </div>
          <div class="dialog_main">
            <el-form class="showPadding">
              <el-form-item label="跟进内容">
                <div class="items-center">
                  <p class="radioSelection" @click="chooseRadioContent(item)"
                     :class="{'highChoose': follow_form.follow_content === item.id}"
                     v-for="item in follow_up_content">
                    {{item.value}}
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="调整预警">
                <div class="items-center">
                  <p class="radioSelection" @click="chooseRadioNotice(item)"
                     :class="{'highChoose': follow_form.warning_status === item.id}"
                     v-for="item in follow_up_notice">
                    {{item.value}}
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="上传照片">
                <lj-upload size="50" v-model="upload_form.album"></lj-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleFollowInfo">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelFollowInfo">取消</el-button>
          </div>
        </div>
      </lj-dialog>
      <!--上传-->
      <lj-dialog
        :visible="upload_visible"
        :size="{width: 500 + 'px',height: 300 + 'px'}"
        @close="handleCancelUpload"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>上传图片</h3>
          </div>
          <div class="dialog_main">
            <el-form class="showPadding">
              <el-form-item label="上传照片">
                <lj-upload size="50" v-model="upload_form.album_file"></lj-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmUpload">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelUpload">取消</el-button>
          </div>
        </div>
      </lj-dialog>
      <!--标价-->
      <lj-dialog
        :visible="setPriceVisible"
        :size="{width: 600 + 'px',height: 350 + 'px'}"
        @close="handleCancelSetPrice"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>租房价格设置</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form label-width="80px" class="showPadding">
              <el-form-item label="建议价格">
                <el-input v-model="setPriceForm.suggest_price" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="最低价格">
                <el-input v-model="setPriceForm.bottom_price" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center;color: #CF2E33">
              建议价格供业务员租房参考
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleSubmitSetPrice">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelSetPrice">取消</el-button>
          </div>
        </div>
      </lj-dialog>
      <!--标记-->
      <lj-dialog
        :visible="mark_visible"
        :size="{width: 500 + 'px',height: 350 + 'px'}"
        @close="handleCancelMark"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>房屋标记</h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="80px">
              <el-form-item label="原因">
                <div class="items-center">
                  <p class="radioSelection" @click="chooseRadioMark(item)"
                     :class="{'highChoose': mark_form.quality_cause === item.value}"
                     v-for="item in mark_reason">
                    {{item.value}}
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="mark_form.quality_content" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmMark">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelMark">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--行政检查-->
      <lj-dialog
        :visible="check_visible"
        :size="{width: 500 + 'px',height: 600 + 'px'}"
        @close="handleCancelAddCheck"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>行政检查</h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="80px" size="small" class="borderNone">
              <el-form-item label="检查时间" placeholder="请输入">
                <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="check_form.check_datetime"></el-date-picker>
              </el-form-item>
              <el-form-item label="检查人">
                <el-input v-model="check_form.user_name" placeholder="请选择" readonly @focus="staff_visible = true"></el-input>
              </el-form-item>
              <el-form-item label="现场录像">
                <Upload :file="check_file" @success="handleGetFile"></Upload>
              </el-form-item>
              <el-form-item label="检查评级">
                <el-select v-model="check_form.check_level" placeholder="请选择">
                  <el-option :value="1" label="良好"></el-option>
                  <el-option :value="2" label="一般"></el-option>
                  <el-option :value="3" label="查"></el-option>
                  <el-option :value="4" label="特差"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行政备注">
                <el-input type="textarea" v-model="check_form.check_content" :rows="6" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" @click="handleConfirmCheck">确定</el-button>
            <el-button type="info" @click="handleCancelAddCheck">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <StaffOrgan :module="staff_visible" @close="handleGetStaff"></StaffOrgan>
    </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  import Upload from '../../common/upload.vue';
  import StaffOrgan from '../../common/staffOrgan.vue';

    export default {
        name: "index",
        props: ['houseSource','info'],
        components: { LjDialog ,Upload,StaffOrgan},
        data() {
            return {
              //行政检查
              check_visible: false,
              check_form: {
                album_file: [],
                check_content: '',
                check_datetime: '',
                check_level: '',
                user_name: '',
                check_user_id: ''
              },
              staff_visible: false,
              check_file: {
                keyName: 'check_photo',
                setFile: [],
                size: {
                  width: '50px',
                  height: '50px'
                }
              },
              market_server: globalConfig.market_server,
              show_control: false,
              content_height: window.innerHeight - 171,
              house_info: [],
              tip_btn: [
                {id: 1,val: '跟进'},
                {id: 2,val: '上传'},
                {id: 3,val: '标价'},
                {id: 4,val: '标记'},
                {id: 5,val: '检查'}
              ],
              is_tip: 0,
              params: {
                count: 0,
                page: 1,
                limit: 20
              },

              currentHouse: '',
              upload_form: {
                album: [],
                album_file: [],
              }, //所有上传文件
              //跟进
              follow_form: {
                follow_content: '',
                warning_status: '',
              },
              follow_up_visible: false,
              follow_up_content: [
                {id: 0,value:'其他'},
                {id: 1,value:'预设项'},
              ],
              follow_up_notice: [
                {id: 0,value: '不调整'},
                {id: 1,value: '正常'},
                {id: 2,value: '黄色预警'},
                {id: 3,value: '橙色预警'},
                {id: 4,value: '红色预警'},
              ],
              //上传
              upload_visible: false,
              //标价
              setPriceVisible: false,
              setPriceForm: {
                bottom_price: '',
                suggest_price: ''
              },
              //标记
              mark_visible: false,
              mark_reason: [
                {id: 0,value: '装修太差'},
                {id: 1,value: '性价比底'},
                {id: 2,value: '其他'},
              ],
              mark_form: {
                quality: 1,
                quality_cause: '',
                quality_content: '',
              }
            }
        },
        mounted() {
        },
        activated() {
        },
        watch: {
          houseSource: {
            handler(val) {
              this.house_info = val;
            },
            deep: true
          },
          info: {
            handler(val) {
              this.params = val;
            },
            deep: true
          }
        },
        computed: {},
        methods: {
          //确定检查
          handleConfirmCheck() {
            this.$http.post(this.market_server + 'v1.0/market/check',{
              house_id: this.currentHouse.id,
              ...this.check_form
            }).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$LjMessage('success',{
                  title: '成功',
                  message: res.message
                });
                this.handleCancelAddCheck();
              } else {
                this.$LjMessage('warning',{
                  title: '失败',
                  message: res.message
                })
              }
            })
          },
          //取消行政检查
          handleCancelAddCheck() {
            for (let key in this.check_form) {
              this.check_form[key] = '';
            }
            this.check_form.album_file = [];
            this.check_visible = false;
          },
          //获取文件
          handleGetFile(val) {
            if (val !== 'close') {
              this.check_form.album_file = val[1];
            }
          },
          //获取人员
          handleGetStaff(id,name) {
            if (id !== 'close') {
              this.check_form.check_user_id = id[0];
              this.check_form.user_name = name;
            }
            this.staff_visible = false;
          },
          //上传
          handleConfirmUpload() {
            this.$http.post(this.market_server + 'v1.0/market/house/album',{
              id: this.currentHouse.id,
              album_file: this.upload_form.album_file
            }).then(res => {
              this.handleSuccess(res);
              this.handleCancelUpload();
              this.$emit('change',1);
            })
          },
          handleCancelUpload() {
            this.currentHouse = '';
            this.upload_form.album_file = [];
            this.upload_visible = false;
          },
          //标记
          handleConfirmMark() {
            this.$http.post(this.market_server + 'v1.0/market/house/annotation',{
              id: this.currentHouse.id,
              ...this.mark_form
            }).then(res => {
              this.handleSuccess(res);
              this.handleCancelMark();
            })
          },
          handleCancelMark() {
            for (let key in this.mark_form) {
              this.mark_form[key] = '';
            }
            this.$emit('change',1);
            this.mark_visible = false;
          },
          chooseRadioMark(item) {
            this.mark_form.quality_cause = item.value;
          },
          //标价
          handleSubmitSetPrice() {
            this.$http.post(this.market_server + 'v1.0/market/house/setHousePrice',{
              id: this.currentHouse.id,
              ...this.setPriceForm
            }).then(res => {
              this.handleSuccess(res);
              this.handleCancelSetPrice();
            })
          },
          handleCancelSetPrice() {
            this.currentHouse = '';
            for (let key in this.setPriceForm) {
              this.setPriceForm[key] = '';
            }
            this.setPriceVisible = false;
            this.$emit('change',1);
          },
          //成功回调
          handleSuccess(res) {
            if (res.code === 200) {
              this.$LjNotify('success',{
                title: '成功',
                message: res.message
              })
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.message
              })
            }
          },
          //上传回调
          handleSuccessUpload(item) {
            debugger
            if (item !== 'close') {
              this.upload_form[item[0]] = item[1];
            }
          },
          //跟进
          chooseRadioContent(item) {
            this.follow_form.follow_content = item.id;
          },
          chooseRadioNotice(item) {
            this.follow_form.warning_status = item.id;
          },
          handleFollowInfo() {
            //提交更进记录
            this.$http.post(this.market_server + 'v1.0/market/house/followrecord',{
              id: this.currentHouse.id,
              album: this.upload_form.album,
              ...this.follow_form
            }).then(res => {
              this.handleSuccess(res);
              this.handleCancelFollowInfo();
            })
          },
          handleCancelFollowInfo() {
            this.upload_form.album = [];
            this.currentHouse = '';
            for (let key in this.follow_form) {
              this.follow_form[key] = '';
            }
            this.follow_up_visible = false;
            this.$emit('change',1);
          },
          //点击操作
          handleOpenModule(tmp,item) {
            this.is_tip = tmp.id;
            this.currentHouse = item;
            this.follow_up_visible = tmp.id === 1;
            this.upload_visible = tmp.id === 2;
            this.setPriceVisible = tmp.id === 3;
            this.mark_visible = tmp.id === 4;
            this.check_visible = tmp.id === 5;
          },
          handleOpenCard(item) {
            this.$emit('open',item);
          },
          handleScroll() {
            this.$emit('close');
          },
          handleOpenControl(id) {
            this.show_control = id;
            this.is_tip = 0;
          },
          handleChangePage(page) {
            this.params.page = page;
            this.$emit('change',page);
          },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/components/house-card.scss";
  @mixin marketCentreImg ($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #houseCard {
    > div {
      .content {
        height: 100%;
        padding-top: 50px;
        .house-item {
          &:hover {
            @include marketCentreImg('xuanzhong.png','theme1');
          }
        }
        .card {

          .photo {
            .bg {
              @include marketCentreImg('bk.png','theme1');
              .btn {
                @include radius( 0 0 50px 50px);
                background-color: $color0C0;
                &:hover {
                  background-color: $colorE33;
                  color: white;
                }
              }
              .house_type {
                color: white;
                font-family: 'jingDianXingShu';
              }
            }
            .marked {
              @include marketCentreImg('zlc.png','theme1');
              background-size: contain;
            }
          }
          .info {
            .text {
              > p {
                b{
                  @include radius(50%);
                }
                .type_icon {
                  @include marketCentreImg('hx.png','theme1');
                }
                .info_icon {
                  @include marketCentreImg('sj.png','theme1');
                }
                .price_icon {
                  @include marketCentreImg('jg.png','theme1');
                }
              }
            }
            .notice_info {
              .notice-1 {
                @include marketCentreImg('hhs.png','theme1');
                background-size: contain;
              };
              .notice-2 {
                @include marketCentreImg('cs.png','theme1');
                background-size: contain;
              };
              .notice-3 {
                @include marketCentreImg('hs.png','theme1');
                background-size: contain;
              };
            }
          }
          .control {
            background-color: $colorE33;
            @include radius(5px);
            .arrows {
              background-color: $colorE33;
            }
            span:hover {
              @include marketCentreImg('xzgj.png','theme1');
              background-size: contain;
              padding: 4px 20px;
              color: $colorE33;
            }
          }
        }
      }
    }
  }
</style>
