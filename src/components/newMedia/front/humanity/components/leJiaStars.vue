<template>
  <div id="star">
    <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
      <div class="star_info">
        <div class="star_info_left">
          <div class="star_info_title writingMode flex-center"><span>乐伽之星</span></div>
          <div class="star_info_avatar"><img :src="userInfo.avatar"
                                             alt=""></div>
          <div class="star_info_name writingMode flex-center"><span>{{userInfo.name}}</span></div>
          <div class="star_info_department writingMode flex-center"><span>{{userInfo.department}}</span></div>
        </div>

        <div class="star_info_right flex-center">
          <div class="main_info scroll_bar">
            <div class="detail-content-middle">
              <div class="middle-info">
                <h1>{{detailData.title}}</h1>
                <!-- <p class="desc">{{detailData.desc}}</p> -->
                <!-- <div class="middle-img justify-bet">
                    <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                    <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                </div> -->
                <div class="content" v-html="detailData.content"></div>
              </div>
              <div class="detail-content-right flex-center">
                <div class="right-info-icons">
                  <div class="icon-list"  @click="clickCollect">
                    <i class="icon-bg collect-icon"></i>
                    <!-- <i class="person-number">{{detailData.collect_number}}</i> -->

                  </div>
                  <div class="icon-list"  @click="clickGood">
                    <i class="icon-bg point-icon" ></i>
                    <!-- <i class="person-number">{{detailData.thumbs_up_number}}</i> -->
                  </div>
                  <div class="icon-list">
                    <i class="icon-bg commit-icon" @click="showCommentList"></i>
                    <!-- <i class="person-number">{{detailData.comment_number}}</i> -->
                  </div>
                  <!-- <div class="icon-list share-navbar">
                  <span class="share-navbar-box flex-center justify-around"
                        v-if="share_navbar_visible"
                        id="div1">
                      <i class="sina-icon"></i>
                      <i class="wechat-icon"></i>
                      <i class="link-icon"></i>
                  </span>
                      <i class="icon-bg share-icon" @mouseenter="share_navbar_visible = true"
                      ></i>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--祝福-->
    <lj-dialog :visible="wishes_visible" :size="{width: 900 + 'px',height: 600 + 'px'}"
               @close="wishes_visible = false">
      <div class="dialog_container">
        <div class="dialog_header justify-bet">
          <h3>祝福</h3>
          <p class="flex-center" @click="edit_wishes_visible = true">
            <i class="write_wishes"></i>
            <span>写祝福</span>
          </p>
        </div>
        <div class="dialog_main">
          <div class="wishes-lists" v-for="(item,index) in wishesData" >
            <img src="../../../../../assets/image/newMedia/theme1/avatar.png" alt="">
            <div>
              <h3>{{item.name}}</h3>
              <p class="desc">{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--写祝福-->
    <lj-dialog
      :visible="edit_wishes_visible"
      :size="{width: 800 + 'px' ,height: 460 + 'px'}"
      @close="edit_wishes_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>写祝福</h3>
        </div>
        <div class="dialog_main">
          <el-form  size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>祝福内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea"  :rows="8"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
        </div>
      </div>
    </lj-dialog>

    <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
    <!--删除-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
               @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该文件吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--编辑-->
    <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
               @close="edit_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑视频</h3>
        </div>
        <div class="dialog_main">
          <el-form size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>资料类型</span>
                </div>
                <div class="item_content">
                  <!--<el-input ></el-input>-->
                  <el-select placeholder="请选择">
                    <el-option label="视频"></el-option>
                    <el-option label="文档"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>资料名称</span>
                </div>
                <div class="item_content">
                  <el-input></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>查看权限</span>
                </div>
                <div class="item_content">
                  <el-input></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>添加附件</span>
                </div>
                <div class="item_content">
                  <span class="uploadFile">+</span>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small" @click="edit_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--评论-->
    <lj-dialog :visible="comment_visible" :size="{width: 900 + 'px',height: 600 + 'px'}"
               @close="comment_visible = false;commentData=[];commenttotal=0;currentCommentPage=1">
      <div class="dialog_container">
        <div class="dialog_header justify-bet">
          <h3>评论<span>共 <i>{{this.commenttotal}}</i> 条评论</span></h3>
          <p class="flex-center" @click="edit_comment_visible = true;parent_id=0;newcomment=''">
            <i class="write_comment"></i>
            <span>写评论</span>
          </p>
        </div>
        <div class="dialog_main">
          <div class="comment-lists" v-for="(item,index) in commentData" >
            <div class="comment-left">
              <img :src="item.user_id?item.user_idavatar: ''" alt="">
            </div>
            <div class="comment-right">
              <h3>{{item.user_id?item.user_id.name:''}}</h3>
              <p class="desc">{{item.content}}</p>
              <div class="bottom-operate">
                <p class="check-info"  @click="show_reply(item)">查看{{item.sons_count}}条回复</p>
                <p class="operate-btn">
                  <span class="btn-icon" @click="delete_visible = true;currentComment=item;"><i></i><span>删除</span></span>
                  <span class="btn-icon" @click="reply_visible = true;currentComment=item;replyComment=''"><i></i><span>回复</span></span>
                  <span class="btn-icon" @click="report_visible = true;currentComment=item;comment_type=[];reportcomment=''"><i></i><span>举报</span></span>
                </p>
              </div>
              <!-- 回复显隐-->
              <div class="is_show_comment" v-if="item.is_show_reply">
                <el-table
                  :data="item.sons"
                  style="width:700px">
                  <el-table-column width="700px">
                    <template slot-scope="scope">
                      <div class="comment_left" style="float:left">
                        <img :src="scope.row.user_id?scope.row.user_idavatar: ''" alt="">
                      </div>
                      <div class="comment_right">
                        <h3>{{scope.row.user_id?scope.row.user_id.name:''}}</h3>
                        <p class="desc">{{scope.row.content}}</p>
                        <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentCommentPage"
            :page-size="commentlimit"
            layout="total, prev, pager, next"
            :total="commenttotal">
          </el-pagination>
        </div>
      </div>
    </lj-dialog>

    <!--写评论-->
    <lj-dialog
      :visible="edit_comment_visible"
      :size="{width: 800 + 'px' ,height: 460 + 'px'}"
      @close="edit_comment_visible = false;newcomment=''">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>写评论</h3>
        </div>
        <div class="dialog_main">
          <el-form  size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>评论内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea" v-model="newcomment" :rows="8"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="postcomment_tag">发布</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--举报-->
    <lj-dialog
      :visible="report_visible"
      :size="{width: 800 + 'px' ,height: 460 + 'px'}"
      @close="report_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>举报</h3>
        </div>
        <div class="dialog_main">
          <el-form  size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>类型</span>
                </div>
                <div class="item_content changeChoose">
                  <el-checkbox-group v-model="comment_type" class="flex-center justify-start">
                    <el-checkbox label="低俗色情"></el-checkbox>
                    <el-checkbox label="辱骂攻击"></el-checkbox>
                    <el-checkbox label="违法信息"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>举报内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea" v-model="reportcomment" :rows="8"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="reportOk()">举报</el-button>
          <el-button size="small" type="info" @click="report_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--回复-->
    <lj-dialog
      :visible="reply_visible"
      :size="{width: 800 + 'px' ,height: 460 + 'px'}"
      @close="reply_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>回复评论</h3>
        </div>
        <div class="dialog_main">
          <el-form  size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>评论内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea" v-model="replyComment" :rows="8"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="replyOk()">发布</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--删除评论-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
               @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该评论吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
          <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>

  </div>

</template>

<script>
  import mediaList from '../../../components/mediaList.vue';
  import LjDialog from '../../../../common/lj-dialog.vue';

  export default {
    name: "lejiaStars",
    components: {
      mediaList,
      LjDialog,
    },
    data() {
      return {
        showFinMenuList: false,
        delete_visible: false,
        edit_visible: false,
        showModal: false,
        wishes_visible:false,
        edit_wishes_visible:false,
        share_navbar_visible:false,
        edit_comment_visible: false,
        comment_visible: false,
        reply_visible:false,
        delete_visible: false,
        report_visible: false,
        newcomment: '',
        currentComment:'',
        is_show_reply: false,
        replyComment: '',
        chooseTab: 1,
        commenttotal:0,
        commentData:'',
        currentCommentPage:1,
        commentlimit:15,
        detailData: {},
        comment_type:[],
        reportcomment: '',
        selects: [
          {id: 1, title: "乐伽之星"}, {id: 2, title: "优秀员工"}, {id: 3, title: "寿星墙"}
        ],
        wishesData:[
          {
            avatar:'',
            name:'赵晓刀',
            content:'评论列表评论列列表评论列表评论表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
            reply:'2'
          },
          {
            avatar:'',
            name:'赵晓刀',
            content:'评论列表评论列列表评论列表评论表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
            reply:'2'
          },
        ],
        todayBirthday:[
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},

        ],
        monthBirthday:[
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
          {name:'齐达内',depart:'南京二区一组',avatar:""},
        ],

        userInfo:{
          avatar:'',
          name:'',
          department:'',
        },
      }
    },
    created() {
      // 获取第一页数据
      this.getData();
    },
    //  watch:{
    //     '$route':'getPath'
    // },
    mounted(){
      this.getData();
    },
    methods: {
      changeTabs(id) {
        this.chooseTab = id;
      },
      handleSizeChange(val){
        this.commentlimit=15;
      },
      handleCurrentChange(val){
        this.currentCommentPage=val;
        this.showCommentList();
      },
      //举报
      reportOk(){
        this.$http.post(globalConfig.newMedia_sever + '/api/article/report',{content:this.reportcomment,comment_id:this.currentComment.id, type_id:this.comment_type}).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.showCommentList();
            // this.getPath();
            this.report_visible=false;
            this.newcomment='';
          }else {
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            });
          }
        });
      },
      show_reply(val){
        this.commentData.forEach((item)=>{
          if(val.id===item.id){
            this.$http.get(globalConfig.newMedia_sever + '/api/article/comment',{article_id: this.detailData.id,layer_id:val.id}).then(res => {
              if(res.status===200){
                item.sons=res.data.data;
                this.$forceUpdate();
              }else {
              }
            });
            if(val.is_show_reply===false){
              item.is_show_reply = true;
            }else {
              item.is_show_reply = false;
            }
          }
        });
        // if(val===false){
        //     this.is_show_reply = true;
        // }else {
        //     this.is_show_reply = false;
        // }
      },
      //删除评论
      handleOkDel(){
        this.$http.delete(globalConfig.newMedia_sever + '/api/article/comment/'+this.currentComment.id).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.delete_visible=false;
            this.showCommentList();
          }else {
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            });
          }
        });
      },
      getData(){
        this.$http.get(globalConfig.newMedia_sever+'/api/humanity/star',).then(res=>{
          if(res.status===200){
            this.detailData = res.data;
            if(res.data.star_id){
              this.userInfo.avatar = res.data.star_id.avatar;
              this.userInfo.name = res.data.star_id.name;
              this.userInfo.department = res.data.star_id.org[0].name;

            }

          }
        })
      },
      //点赞
      clickGood(){
        let params={
          article_id: this.detailData.id,
        };
        this.$http.post(globalConfig.newMedia_sever + '/api/article/thumbs_up',params).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '点赞成功',
              type: 'success'
            });
          }else {
            this.$notify({
              title: '失败',
              message: '点赞失败',
              type: 'error'
            });
          }
        });
      },
      //收藏
      clickCollect(){
        let params={
          article_id: this.detailData.id,
        };
        this.$http.post(globalConfig.newMedia_sever + '/api/article/collect',params).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '收藏成功',
              type: 'success'
            });
          }else {
            this.$notify({
              title: '失败',
              message: '收藏失败',
              type: 'error'
            });
          }
        });
      },
      //展示评论
      showCommentList(){
        this.comment_visible = true;
        let params={
          article_id:this.detailData.id,
          limit: this.commentlimit,
          offset: this.currentCommentPage,
        };
        this.$http.get(globalConfig.newMedia_sever + '/api/article/comment',params).then(res => {
          if(res.status===200){
            this.commentData=res.data.data;
            this.commenttotal=res.data.total;
            if( this.commentData && this.commentData.length>0){
              this.commentData.forEach((item) => {
                item.is_show_reply=false;
                item.sons=[];
              });
            }
          }else {

          }
        });
      },
      //评论
      postcomment_tag(){
        this.$http.post(globalConfig.newMedia_sever + '/api/article/comment',{content:this.newcomment,article_id:this.detailData.id}).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.showCommentList();
            this.edit_comment_visible=false;
            this.commentData=[];
            this.newcomment='';
          }else {
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            });
          }
        });
      },
      //回复评论
      replyOk(){
        this.$http.post(globalConfig.newMedia_sever + '/api/article/comment',{content:this.replyComment, parent_id: this.currentComment.id,article_id:this.detailData.id}).then(res => {
          if(res.status===200){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.showCommentList();
            this.reply_visible=false;
          }else {
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            });
          }
        });
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../../assets/scss/newMedia/components/lejiaStas.scss";

  @mixin avatarImg($m) {
    background: url($m) 50% 50% no-repeat;
    background-size: auto 220px;
  }
  @mixin starImg($n, $m) {
    $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #star {
      .mainList {
        .star_info{
          @include starImg('theme1','lejiazhixingdi.png');
          .star_info_left{
            @include starImg('theme1','biaoqian.png');
            .star_info_avatar{
              @include starImg('theme1','avatar.png');
            }
            .star_info_title{
              @include starImg('theme1','yin.png');
            }
          }
          .star_info_middle{
            .main_info{
              >div{
                span{
                  @include starImg('theme1','active.png');
                }
              }
            }
          }
          .star_info_right{
            >div{
              i{

              }
              .collect-icon{
                @include starImg('theme1','shoucang.png');
              }
              .commit-icon{
                @include starImg('theme1','pinglun.png');
              }
              .point-icon{
                @include starImg('theme1','dianzan.png');
              }
              .share-icon{
                @include starImg('theme1','zhuanfa.png');
              }
            }
          }

        }
        .staff_info{
          @include starImg('theme1','background_2.png');
          .staff_list_top{
            @include starImg('theme1','yxyg_dashang.png');
          }
          .staff_list_info{
            div{
              @include starImg('theme1','youxiu_grey.png');
              &:hover{
                @include starImg('theme1','youxiu_red.png');
              }
              span{
                @include starImg('theme1','staff.png');
              }
            }
          }

        }
        .birthday_info{
          .today_birthday{
            .today_birthday_title{
              @include starImg('theme1','jinrishouxing.png');
            }
            .today_birthday_list{
              .birthday_list_info{
                .birthday_avatar{
                  @include starImg('theme1','staff.png');
                  .common:before{
                    @include starImg('theme1','staff.png');
                  }
                }
              }
            }
          };
          .months_birthday{};
          .switch_icon_box{
            span{
              @include starImg('theme1','more.png');
            }
          }
        }

      }
      .dialog_header{
        .write_wishes{
          @include starImg('theme1','bianji_comment.png');
        }
        span{

        }
      }
      .comment-lists {
        width: 800px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 20px;

        .comment-left {
          width: 50px;
          height: 50px;

        }
      }

      .comment-right {
        width: 730px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        > h3 {
          text-align: left;
          font-size: 18px;
          color: #202020;
          margin-bottom: 10px;
        }

        .desc {
          text-align: left;
          margin-bottom: 10px;
          line-height: 26px;

        }

        .bottom-operate {

          text-align: left;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .check-info {
            flex: 1;
            cursor: pointer;
          }

          .operate-btn {
            flex: 1;
            text-align: right;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            .btn-icon {
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-left: 30px;
              cursor: pointer;

              i {
                display: inline-block;
                width: 24px;
                height: 22px;
                margin-right: 4px;
              }
            }
          }

        }
      }

      .is_show_comment {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        // margin-top: 50px;

        .comment_left {
          img {
            width: 50px;
            height: 50px;
          }
        }

        .comment_right {
          margin-left: 20px;

          > h3 {
            text-align: left;
          }

          .bottom_operate {
            .operate_btn {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;

              .btn_icon {
                margin-left: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;

                i {
                  display: inline-block;
                  width: 24px;
                  height: 22px;
                  margin-right: 4px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
