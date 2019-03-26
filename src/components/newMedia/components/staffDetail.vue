<template>
    <div id="staffDetail">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <h1>优秀员工详情</h1>
            </div>
        </div>
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="star_info">
                <div class="star_info_left">
                    <div class="star_info_title writingMode flex-center"><span>乐伽之星</span></div>
                    <div class="star_info_avatar"><img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                    </div>
                    <div class="star_info_name writingMode flex-center"><span>李妮</span></div>
                    <div class="star_info_department writingMode flex-center"><span>南京二区一组</span></div>
                </div>

                <div class="star_info_right flex-center">
                    <div class="main_info scroll_bar">
                        <h5 class="edit_icon justify-end" @click="edit_star_visible = true"><span></span>编辑</h5>
                        <h3>的说法都是发生的快速打开</h3>
                        <p>
                            is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                        <div class="justify-bet">
                            <img src="../../../assets/image/newMedia/theme1/active.png" alt="">
                            <img src="../../../assets/image/newMedia/theme1/active.png" alt="">
                        </div>
                        <p>
                            is德国his的is德国hisis德国his的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                    </div>
                </div>
            </div>
        </div>

        <!--编辑乐伽之星-->
        <lj-dialog
                :visible="edit_star_visible"
                :size="{width: 800 + 'px' ,height: 460 + 'px'}"
                @close="edit_star_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>乐伽之星</h3>
                </div>
                <div class="dialog_main">
                    <el-form  size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>姓名</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="comment" ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>文章内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="postReceivable_tag()">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="postReceivable_tag()">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>


<script>
    import mediaList from '../components/mediaList.vue';
    import LjDialog from '../../common/lj-dialog.vue';

    export default {
        name: "staffDetail",
        components: {
            mediaList,
            LjDialog,
        },
        data() {
            return {
                edit_star_visible: false,//编辑
                showFinMenuList: false,
                edit_visible: false,
                chooseTab: 1,
                selects: [
                    {id: 1, title: "乐伽之星"}, {id: 2, title: "优秀员工"}, {id: 3, title: "寿星墙"}
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
    @import "../../../assets/scss/newMedia/components/staffDetail.scss";

    @mixin avatarImg($m) {
        background: url($m) 50% 50% no-repeat;
        background-size: auto 220px;
    }

    @mixin starImg($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #staffDetail {
            .mainList {
                .star_info {
                    @include starImg('theme1', 'lejiazhixingdi.png');

                    .star_info_left {
                        @include starImg('theme1', 'staff_back.png');

                        .star_info_title {
                            @include starImg('theme1', 'yin.png');
                        }
                    }

                    .star_info_right {
                        .main_info {
                            h5 {
                                span {
                                    @include starImg('theme1', 'bianji_copy2.png');

                                }
                            }

                            > div {
                                span {
                                }
                            }
                        }
                    }

                }

                .staff_info {
                    @include starImg('theme1', 'background_2.png');

                    .staff_list_top {
                        @include starImg('theme1', 'yxyg_dashang.png');
                    }

                    .staff_list_info {
                        .staff_box {
                            > div {
                                .img-modal {
                                    span:nth-child(1) {
                                        @include starImg('theme1', 'staff_bianji.png');
                                    }

                                    span:nth-child(2) {
                                        @include starImg('theme1', 'staff_shanchu.png');
                                    }
                                }

                                @include starImg('theme1', 'youxiu_grey.png');

                                &:hover {
                                    @include starImg('theme1', 'youxiu_red.png');
                                }

                            }
                        }

                    }

                }

                .birthday_info {
                    .today_birthday {
                        .today_birthday_title {
                            @include starImg('theme1', 'jinrishouxing.png');
                        }

                        .today_birthday_list {
                            .birthday_list_info {
                                .birthday_avatar {
                                    @include starImg('theme1', 'staff.png');

                                    .common:before {
                                        @include starImg('theme1', 'staff.png');
                                    }
                                }
                            }
                        }
                    }
                ;

                    .months_birthday {
                    }
                ;

                    .switch_icon_box {
                        span {
                            @include starImg('theme1', 'more.png');
                        }
                    }
                }

            }

            .dialog_header {
                .write_wishes {
                    @include starImg('theme1', 'bianji_comment.png');
                }

                span {

                }
            }
        }
    }

</style>