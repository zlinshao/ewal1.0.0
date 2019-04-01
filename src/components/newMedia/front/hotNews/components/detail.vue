<template>
    <div id="hotNewsDetail">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <h1>{{this.$route.query.type ===1 ? '热门导读详情':this.$route.query.type ===2 ? '乐伽新闻详情':this.$route.query.type ===3?'公告详情':''}}</h1>
            </div>
        </div>
        <div class="mainList" style="height: 80px">
            <h3 class="detail-title">
                {{this.$route.query.type ===1 ? '热门导读推荐':this.$route.query.type ===2 ? '热门新闻推荐':this.$route.query.type ===3?'其他公告':''}}
            </h3>
        </div>

        <div class="mainList" :style="{'height': this.mainListHeight() + 'px'}">
            <div class="detail-left-list">
                <div class="outer-container">
                    <div class="inner-container">
                        <div class="element">
                            <div class="detail-box" v-for="(item,index) in detailDataList">
                                <div class="detail-box-top">
                                    <h3>{{item.title}}</h3>
                                    <div class="top-icons justify-start">
                                        <span><i class="view"></i>{{item.view}}</span>
                                        <span><i class="point"></i>{{item.point}}</span>
                                        <span><i class="comment"></i>{{item.comment}}</span>
                                    </div>
                                </div>
                                <div class="detail-box-bottom">
                                    <div class="bottom-left">
                                        <img src="../../../../../assets/image/newMedia/theme1/avatar.png" alt=""></div>
                                    <div class="bottom-right">
                                        <p><span class="mar-right">{{item.name}}</span></p>
                                        <p><span class="mar-right">{{item.department}}</span><span>{{item.time}}</span>
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
                                        src="../../../../../assets/image/newMedia/theme1/avatar.png"
                                        alt=""></div>
                                <div class="bottom-right">
                                    <p><span class="mar-right">{{detailData.name}}</span></p>
                                    <p><span
                                            class="mar-right">{{detailData.department}}</span><span>{{detailData.time}}</span>
                                    </p>
                                </div>
                            </div>
                            <p class="desc">{{detailData.desc}}</p>
                            <div class="middle-img justify-bet">
                                <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                                <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                            </div>
                            <p class="content">{{detailData.content}}</p>
                        </div>
                        <div class="detail-content-right flex-center">
                            <div class="right-info-icons">
                                <div class="icon-list" @click="comment_visible = true">
                                    <i class="icon-bg collect-icon"></i>
                                    <i class="person-number">3213</i>
                                </div>
                                <div class="icon-list">
                                    <i class="icon-bg point-icon"></i>
                                    <i class="person-number">3213</i>
                                </div>
                                <div class="icon-list">
                                    <i class="icon-bg commit-icon"></i>
                                    <i class="person-number">312</i>
                                </div>
                                <div class="icon-list share-navbar">
                                    <span class="share-navbar-box flex-center justify-around"
                                          v-if="share_navbar_visible"
                                          id="div1"

                                    >
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


        <!--评论-->
        <lj-dialog :visible="comment_visible" :size="{width: 900 + 'px',height: 600 + 'px'}"
                   @close="comment_visible = false">
            <div class="dialog_container">
                <div class="dialog_header justify-bet">
                    <h3>评论<span>共 <i>56</i> 条评论</span></h3>
                    <p class="flex-center" @click="edit_comment_visible = true">
                        <i class="write_comment"></i>
                        <span>写评论</span>
                    </p>
                </div>
                <div class="dialog_main">
                    <div class="comment-lists" v-for="(item,index) in commentData" >
                        <div class="comment-left">
                            <img src="../../../../../assets/image/newMedia/theme1/avatar.png" alt="">
                        </div>
                        <div class="comment-right">
                            <h3>{{item.name}}</h3>
                            <p class="desc">{{item.content}}</p>
                            <div class="bottom-operate">
                                <p class="check-info"  @click="show_reply(is_show_reply)">查看2条回复</p>
                                <p class="operate-btn">
                                    <span class="btn-icon" @click="delete_visible = true"><i></i><span>删除</span></span>
                                    <span class="btn-icon" @click="reply_visible = true"><i></i><span>回复</span></span>
                                    <span class="btn-icon" @click="report_visible = true"><i></i><span>举报</span></span>
                                </p>
                            </div>
                            <!--回复显隐-->
                            <div class="is_show_comment" v-if="is_show_reply">
                                <div class="comment_left">
                                    <img src="../../../../../assets/image/newMedia/theme1/avatar.png" alt="">
                                </div>
                                <div class="comment_right">
                                    <h3>{{item.name}}</h3>
                                    <p class="desc">{{item.content}}</p>
                                    <div class="bottom_operate">
                                        <p class="operate_btn">
                                            <span class="btn_icon" @click="delete_visible = true"><i></i><span>删除</span></span>
                                            <span class="btn_icon" @click="reply_visible = true"><i></i><span>回复</span></span>
                                            <span class="btn_icon" @click="report_visible = true"><i></i><span>举报</span></span>
                                        </p>
                                    </div>
                                </div>
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
                @close="edit_comment_visible = false">
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
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
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
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
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
                report_visible:false,
                link_visible:false,
                share_navbar_visible:false,
                reply_visible:false,
                comment:'',//写评论
                comment_type:[],
                activeNames: [],//查看回复
                commentData:[//评论列表
                    {
                        avatar:'',
                        name:'赵晓刀',
                        content:'评论列表评论列列表评论列表评论表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
                        reply:'2'
                    },
                    {
                        avatar:'',
                        name:'赵晓刀',
                        content:'评论列表评论列表列表评论列表评论评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
                        reply:'2'
                    },
                    {
                        avatar:'',
                        name:'赵晓刀',
                        content:'评论列表评论列表评列表评论列表评论论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
                        reply:'2'
                    }
                ],
                detailData:{
                    title:'这是一则导读标题内标题内容标题内容标题内',
                    view:222,
                    point:333,
                    comment:444,
                    name:'来来来',
                    department:'南京二区房东租',
                    time:'2018-02-12 14:04:12',
                    avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                    desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                    content:'小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻，惩奸除恶；或幻想着自己行走于市井之间，救死扶伤。长大后，经历过现实的洗礼磨练，发现自己怎么可能成为一代大侠？这辈子看来是实现不了了...... 不！小编要告诉你！大侠不仅仅存在在武侠小说里，其实在咱们乐伽就有一位大侠！小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻想着自己行走于市井之间，救死扶伤。长大后，经历过现实的洗礼磨练，发现自己怎么可能成为一代大侠？这辈子看来是实现不了了...... 不！小编要告诉你！大侠不仅仅存在在武侠小说里，其实在咱们乐伽就有一位大侠！'
                },
                detailDataList:[
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        name:'浏览量',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        name:'浏览量',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        name:'浏览量',
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        name:'浏览量',
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        name:'浏览量',
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                    {
                        title:'这是一则导读标题内标题内容标题内容标题内',
                        view:222,
                        point:333,
                        comment:444,
                        name:'浏览量',
                        department:'南京二区房东租',
                        time:'2018-02-12 14:04:12',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        desc:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内',
                        content:'这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内'
                    },
                ],

                chooseTabType:'',

            }
        },
        watch:{
            '$route':'getPath'
        },
        methods:{
            //获取路由参数
            getPath(){
                console.log(this.$route.query.type);
            },
            handleChange(){

            },
            show_reply(val){
                if(val===false){
                    this.is_show_reply = true;
                }else {
                    this.is_show_reply = false;
                }
            },

            handleOkDel(){

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