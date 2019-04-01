<template>
    <div id="star">
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="star_info">
                <div class="star_info_left">
                    <div class="star_info_title writingMode flex-center"><span>乐伽之星</span></div>
                    <div class="star_info_avatar"><img src="../../../../../assets/image/newMedia/theme1/staff.png"
                                                       alt=""></div>
                    <div class="star_info_name writingMode flex-center"><span>李妮</span></div>
                    <div class="star_info_department writingMode flex-center"><span>南京二区一组</span></div>
                </div>

                <div class="star_info_right flex-center">
                    <div class="main_info scroll_bar">
                        <div class="detail-content-middle">
                            <div class="middle-info">
                                <h1>{{detailData.title}}</h1>
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

                                    </div>
                                    <div class="icon-list">
                                        <i class="icon-bg point-icon"></i>

                                    </div>
                                    <div class="icon-list">
                                        <i class="icon-bg commit-icon"></i>

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
                chooseTab: 1,
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
                    content:'小编认为，其实我们每个人都有一个大小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻想着自己行走于市井之间，救死扶伤。长大后，经历过现实的洗礼磨练，发现自己怎么可能成为一代大侠？这辈子看来是实现不了了...... 不！小编要告诉你！大侠不仅仅存在在武侠小说里，其实在咱们乐伽就有一位大侠！小编认为，其实我们每个人都有一个大侠梦，英雄梦！自打小，或幻想着成为一代武林宗师，惩奸除恶；或幻想着自己行走于市井之间，救死扶伤。长大后，经历过现实的洗礼磨练，发现自己怎么可能成为一代大侠？这辈子看来是实现不了了...... 不！小编要告诉你！大侠不仅仅存在在武侠小说里，其实在咱们乐伽就有一位大侠！'
                },
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
            }
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            },

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
        }
    }

</style>