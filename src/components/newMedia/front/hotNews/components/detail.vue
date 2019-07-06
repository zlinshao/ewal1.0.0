<template>
    <div id="hotNewsDetail">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <h1>{{this.$route.query.type ===1 ? '热门导读详情':this.$route.query.type ===2 ? '乐伽新闻详情':this.$route.query.type ===3?'公告详情':''}}</h1>
            </div>
        </div>
        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight() + 'px'}">
            <div class="news-title" style="height: 80px">
                <h3 class="detail-title">
                    {{this.$route.query.type ===1 ? '热门导读推荐':this.$route.query.type ===2 ? '热门新闻推荐':this.$route.query.type ===3?'其他公告':''}}
                </h3>
            </div>
            <div class="news-title-menu" :style="{'height': this.mainListHeight() + 'px'}">
                <div class="detail-left-list">
                    <div class="outer-container">
                        <div class="inner-container">
                            <div class="element">
                                <div class="detail-box" v-for="(item,index) in detailDataList">
                                    <div class="detail-box-top">
                                        <h3>{{item.title}}</h3>
                                        <div class="top-icons justify-start">
                                            <span><i class="view"></i>{{item.collect_number}}</span>
                                            <span><i class="point"></i>{{item.thumbs_up_number}}</span>
                                            <span><i class="comment"></i>{{item.comment_number}}</span>
                                        </div>
                                    </div>
                                    <div class="detail-box-bottom">
                                        <div class="bottom-left">
                                            <img :src="item.user_id?item.user_id.avatar:''" alt=""></div>
                                        <div class="bottom-right">
                                            <p><span class="mar-right">{{item.user_id?item.user_id.name:''}}</span></p>
                                            <p><span class="mar-right">{{item.user_id?item.user_id.org[0].name:''}}</span><span>{{item.created_at}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="star_info_right flex-center" @mouseleave="share_navbar_visible = false">
                    <div class="main_info scroll_bar">
                        <div class="detail-content-middle">
                            <div class="middle-info">
                                <h1>{{detailData.title}}</h1>
                                <div class="detail-box-bottom">
                                    <div class="bottom-left"><img
                                            :src="detailData.avatar"
                                            alt=""></div>
                                    <div class="bottom-right">
                                        <p><span class="mar-right">{{detailData.name}}</span></p>
                                        <p><span
                                                class="mar-right">{{detailData.department}}</span><span>{{detailData.time}}</span>
                                        </p>
                                    </div>
                                </div>
                                <!-- <p class="desc">{{detailData.desc}}</p> -->
                                <!-- <div class="middle-img justify-bet">
                                    <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                                    <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                                </div> -->
                                <div class="content" v-html="detailData.content"></div>
                            </div>
                            <div class="detail-content-right flex-center">
                                <div class="right-info-icons">
                                    <div class="icon-list">
                                        <i class="icon-bg collect-icon" @click="clickCollect"></i>
                                        <i class="person-number">{{detailData.collect_number}}</i>
                                    </div>
                                    <div class="icon-list">
                                        <i class="icon-bg point-icon" @click="clickGood"></i>
                                        <i class="person-number">{{detailData.thumbs_up_number}}</i>
                                    </div>
                                    <div class="icon-list" @click="showCommentList">
                                        <i class="icon-bg commit-icon"></i>
                                        <i class="person-number">{{detailData.comment_number}}</i>
                                    </div>
                                    <div class="icon-list share-navbar">
                                    <span class="share-navbar-box flex-center justify-around"
                                          v-if="share_navbar_visible"
                                          id="div1">
                                        <i class="sina-icon"></i>
                                        <i class="wechat-icon"></i>
                                        <i class="link-icon"></i>
                                    </span>
                                        <i class="icon-bg share-icon" @mouseenter="share_navbar_visible = true"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--评论-->
        <lj-dialog :visible="comment_visible" :size="{width: 900 + 'px',height: 600 + 'px'}"
                   @close="comment_visible = false">
            <div class="dialog_container">
                <div class="dialog_header justify-bet">
                    <h3>评论<span>共 <i>{{this.commenttotal}}</i> 条评论</span></h3>
                    <p class="flex-center" @click="edit_comment_visible = true;parent_id=0;">
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
                                <!-- <p class="check-info"  @click="show_reply(is_show_reply)">查看{{item.sons_count}}条回复</p> -->
                                <p class="operate-btn">
                                    <span class="btn-icon" @click="delete_visible = true;currentComment=item;"><i></i><span>删除</span></span>
                                    <span class="btn-icon" @click="reply_visible = true;currentComment=item;"><i></i><span>回复</span></span>
                                    <span class="btn-icon" @click="report_visible = true;currentComment=item;"><i></i><span>举报</span></span>
                                </p>
                            </div>
                            <!-- 回复显隐-->
                             <div class="is_show_comment" v-if="is_show_reply">
                              <el-table
                                :data="item.son"
                                style="width: 100%">
                                <el-table-column width="100%">
                                    <!-- <template slot-scope="scope">
                                        <div class="comment_left">
                                        <img :src="scope.row.user_id?scope.row.user_idavatar: ''" alt="">
                                    </div>
                                    <div class="comment_right">
                                        <h3>{{scope.row.user_id?scope.row.user_id.name:''}}</h3>
                                        <p class="desc">{{scope.row.content}}</p>
                                        <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                                    <!-- </template> -->
                                </el-table-column>
                                 </el-table>
                            </div>
                        </div>
                    </div>
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
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postReceivable_tag()">举报</el-button>
                    <el-button size="small" type="info" @click="report_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>


        <!--复制链接-->
        <lj-dialog :visible="link_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="link_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>复制链接</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">
                        <el-input tppe="text"></el-input>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="link_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>






    </div>
</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    export default {
        name: "hotNewsDetail",
        components:{
            LjDialog
        },

        data(){
            return{
                comment_visible:false,
                is_show_reply:false,
                edit_comment_visible:false,
                delete_visible:false,
                currentComment: {},
                report_visible:false,
                link_visible:false,
                share_navbar_visible:false,
                reply_visible:false,
                replyComment: '',// 回复
                newcomment: '',//写评论
                comment:'',
                comment_type:[],
                activeNames: [],//查看回复
                commentData:[//评论列表
                    {
                        name:'',
                        content:'',
                    },
                ],
                commenttotal:0,
                detailData:{
                    title:'',
                    view:0,
                    point:0,
                    comment:0,
                    name:'',
                    department:'',
                    time:'',
                    avatar:'',
                    desc:'',
                    content:''
                },
                detailDataList:[
                    {
                        title:'',
                        view:0,
                        point:0,
                        comment:0,
                        department:'',
                        time:'',
                        name:'',
                        avatar:'',
                        desc:'',
                        content:''
                    },
                ],
                parent_id: '',
                chooseTabType:'',

            }
        },
        watch:{
            '$route':'getPath'
        },
         mounted() {
            //  this.getDetail();
             this.getPath();
            console.log('22222222222222',this.$route);
            // 用来监听滚轮
        },
        methods:{
            getOrder(){
                console.log('22222222222222',this.$route);
                let path = this.$route.query.type===2? 'news' : this.$route.query.type===3 ? 'announcement' : 'hot';
               this.$http.post(globalConfig.newMedia_sever + '/api/article/'+path+'/order').then(res => {
                        if(res.status===200){
                            this.detailDataList = res.data.data;
                            console.log('this.res.data',res.data.data);
                        }else{
                            // this.newsData = [];
                            // this.count = 0;
                        }
                    });
            },
            //获取路由参数
            getPath(){
                // console.log('333333333333333',this.$route.query.id);
            //    console.log('22222222222222',);
                if(this.$route.query.id !==undefined){  
                     this.getOrder();  
                    let path = this.$route.query.type===2? 'news' : this.$route.query.type===3 ? 'announcement' : 'hot';
                    this.$http.get(globalConfig.newMedia_sever + '/api/article/'+path+'/'+this.$route.query.id).then(res => {
                        if(res.status===200){
                            // this.newsData = res.data;
                            // console.log('this.res.data',res.data);
                            this.detailData={
                                title:res.data.title,
                                view:222,
                                thumbs_up_number:res.data.thumbs_up_number, // 点赞数量
                                collect_number: res.data.collect_number, //收藏数量
                                comment_number: res.data.comment_number,
                                // comment:'',
                                name:res.data.user_id?res.data.user_id.name:'',
                                department:res.data.user_id?res.data.user_id.org[0].name :"",
                                time:res.data.created_at,
                                avatar:res.data.user_id ? res.data.user_id.avatar : '',
                                desc:'描述',
                                content:res.data.content
                            };
                            console.log('this.detailData',this.detailData);
                            // this.sort(0);// 分配数据到指定管道
                        }else{
                            // this.newsData = [];
                            // this.count = 0;
                        }
                    });
                }else {
                    this.detailData={
                        title:'',
                        view:'',
                        point:'',
                        comment:'',
                        name:'',
                        department:'',
                        time:'',
                        avatar:'',
                        desc:'',
                        content:''
                    };
                }
            },
            handleChange(){

            },
            //展示评论
            showCommentList(){
                this.comment_visible = true;
                console.log('this.comment_visible', this.comment_visible);
                let params={
                    article_id:this.$route.query.id,
                };
                 this.$http.get(globalConfig.newMedia_sever + '/api/article/comment',params).then(res => {
                     if(res.status===200){
                         this.commentData=res.data.data;
                         this.commenttotal=res.data.total;
                     }else {

                     }
                 });
            },
            //点赞
            clickGood(){
                 let params={
                    article_id:this.$route.query.id,
                };
                this.$http.post(globalConfig.newMedia_sever + '/api/article/thumbs_up',params).then(res => {
                     if(res.status===200){
                         this.$notify({
                            title: '成功',
                            message: '点赞成功',
                            type: 'success'
                        });
                          this.getPath();
                        //  this.commentData=res.data.data;
                        //  this.commenttotal=res.data.total;
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
                    article_id:this.$route.query.id,
                };
                this.$http.post(globalConfig.newMedia_sever + '/api/article/collect',params).then(res => {
                     if(res.status===200){
                         this.$notify({
                            title: '成功',
                            message: '收藏成功',
                            type: 'success'
                        });
                          this.getPath();
                        //  this.commentData=res.data.data;
                        //  this.commenttotal=res.data.total;
                     }else {
                        this.$notify({
                            title: '失败',
                            message: '收藏失败',
                            type: 'error'
                        });
                     }
                 });
            },
            //评论
            postcomment_tag(){
                this.$http.post(globalConfig.newMedia_sever + '/api/article/comment',{content:this.newcomment,article_id:this.$route.query.id}).then(res => {
                    if(res.status===200){
                        // this.commentData=res.data.data;/
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.showCommentList();
                        this.getPath();
                        this.edit_comment_visible=false;
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
                // console.log('val----------', val)
                if(val===false){
                    this.is_show_reply = true;
                }else {
                    this.is_show_reply = false;
                }
            },
            //删除评论
            handleOkDel(){
                this.$http.delete(globalConfig.newMedia_sever + '/api/article/comment/'+this.currentComment.id).then(res => {
                    if(res.status===200){
                        // this.commentData=res.data.data;/
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
            //回复评论
            replyOk(){
            this.$http.post(globalConfig.newMedia_sever + '/api/article/comment',{content:this.replyComment, parent_id: this.currentComment.id,article_id:this.$route.query.id}).then(res => {
                    if(res.status===200){
                        // this.commentData=res.data.data;/
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

<style lang="scss" scoped>
    @import "../../../../../assets/scss/newMedia/front/hotNews/components/detail.scss";
    @mixin hotImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1{
        #hotNewsDetail{
           .mainList{
               .detail-left-list{
                   .element{
                       .detail-box{
                           .detail-box-top{
                               .top-icons{
                                   .view{
                                        @include hotImg('theme1','pic_shoucang.png')
                                    }
                                   .point{
                                       @include hotImg('theme1','pic_dianzan.png')
                                   }
                                   .comment{
                                       @include hotImg('theme1','pic_pinglun.png')
                                   }
                               }
                           }
                       }
                   }
               }
               .detail-content-middle{
                   .detail-content-right{
                       .right-info-icons{
                           .collect-icon{
                               @include hotImg('theme1','shoucang_1.png')
                           }
                           .point-icon{
                               @include hotImg('theme1','dianzan_1.png')
                           }
                           .commit-icon{
                               @include hotImg('theme1','pinglun.png')
                           }
                           .share-icon{
                               @include hotImg('theme1','zhuanfa.png')
                           }
                       }
                   }
               }

           }

        }
        .dialog_header{
            >h3{
                span{
                    i{
                    }
                }
            }
            .write_comment{
                @include hotImg('theme1','bianji_comment.png');
            }


        }
        .dialog_main{
            .comment-lists{
                .comment-left{
                }
                .comment-right{
                    >h3{
                    }
                    .desc{

                    }
                    .bottom-operate{
                        .check-info{

                        }
                        .operate-btn{
                            span{
                                i{
                                    @include hotImg('theme1','jubao-coment.png')
                                }
                            }
                        }

                    }
                }

                .is_show_comment{
                    .comment_left{
                        img{
                        }
                    }
                    .comment_right{
                        >h3{
                        }
                        .bottom_operate{
                            .operate_btn{
                                .btn_icon{
                                    i{
                                        @include hotImg('theme1','jubao-coment.png')
                                    }
                                }


                            }
                        }

                    }


                }
            }

        }


    }

</style>