<template>
    <div id="leJiaHumanity">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>乐伽人文</h1>
                <h2 class="items-center">
                  <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                        :class="{'chooseTab': chooseTab === item.id}">
                    {{item.title}}<i></i>
                  </span>
                </h2>
            </div>

            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add" @click="handleAdd(chooseTab)"><b>+</b></div>
            </div>
        </div>
        <!--乐伽之星-->
        <div v-if="chooseTab === 1">
            <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div class="star_info">
                    <div class="star_info_left">
                        <div class="star_info_title writingMode flex-center"><span>乐伽之星</span></div>
                        <div class="star_info_avatar"><img src="../../../../assets/image/newMedia/theme1/staff.png"
                                                           alt=""></div>
                        <div class="star_info_name writingMode flex-center"><span>李妮</span></div>
                        <div class="star_info_department writingMode flex-center"><span>南京二区一组</span></div>
                    </div>

                    <div class="star_info_right flex-center">
                        <div class="main_info scroll_bar">
                            <h5 class="edit_icon justify-end" @click="add_star_visible = true"><span></span>编辑</h5>
                            <h3>的说法都是发生的快速打开</h3>
                            <p>
                                is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                            <div class="justify-bet">
                                <img src="../../../../assets/image/newMedia/theme1/active.png" alt="">
                                <img src="../../../../assets/image/newMedia/theme1/active.png" alt="">
                            </div>
                            <p>
                                is德国his的is德国hisis德国his的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--优秀员工-->
        <div v-if="chooseTab === 2">
            <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div class="staff_info">
                    <div class="staff_list_info">
                        <div class="staff_box" v-for="(item,index) in staffData">
                            <div class="flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                <div class="img-modal" v-if="seen&&index===current">
                                    <span @click="routerLink(staffDetailUrl,item.id)"></span>
                                    <span @click="withdraw_visible = true"></span>
                                </div>
                                <img src="../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            </div>
                            <p><span>{{item.depart}}</span><span>{{item.name}}</span></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!--寿星墙-->
        <div v-if="chooseTab === 3">
            <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div class="birthday_info">
                    <div class="today_birthday justify-center">
                        <div class="today_birthday_list">
                            <div class="birthday_box flex-center" v-for="(item,index) in todayBirthday"
                                 @click="delete_visible = true">
                                <div class="birthday_box_info">
                                    <img src="../../../../assets/image/newMedia/theme1/staff.png" alt="">
                                    <div class="">
                                        <span class="writingMode">{{item.depart}}</span>
                                        <span class="writingMode">{{item.name}}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--新增乐伽之星-->
        <lj-dialog
                :visible="add_star_visible"
                :size="{width: 800 + 'px' ,height: 460 + 'px'}"
                @close="add_star_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>乐伽之星</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>姓名</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="comment"></el-input>
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

        <!--新增寿星-->
        <lj-dialog :visible="add_birthday_visible" :size="{width: 500 + 'px',height: 340 + 'px'}"
                   @close="add_birthday_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增寿星</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>寿星姓名</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="comment"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>寿星照片</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="comment"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="add_birthday_visible = false;current_row = ''">取消
                    </el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增优秀员工-->
        <lj-dialog
                :visible="add_staff"
                :size="{width: 800 + 'px' ,height: 460 + 'px'}"
                @close="add_staff = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增优秀员工</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>姓名</span>
                                </div>
                                <div class="item_content">
                                    <el-input v-model="comment"></el-input>
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
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--删除寿星信息-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除这条寿星信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--撤下优秀员工-->
        <lj-dialog :visible="withdraw_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="withdraw_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>撤下</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定撤下该优秀员工吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="withdraw_visible = false;current_row = ''">取消
                    </el-button>
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
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "leJiaHumanity",
        components: {
            mediaList,
            LjDialog,
        },
        data() {
            return {
                add_star_visible: false,//新增乐伽之星
                showFinMenuList: false,
                add_birthday_visible: false,//新增寿星
                add_staff: false,//新增员工
                delete_visible: false,
                edit_visible: false,
                showModal: false,
                wishes_visible: false,
                edit_wishes_visible: false,
                chooseTab: 1,

                withdraw_visible: false,//撤下

                current: '',//当前
                seen: false,//显隐
                staffDetailUrl: 'staffDetail',//

                selects: [
                    {id: 1, title: "乐伽之星"}, {id: 2, title: "优秀员工"}, {id: 3, title: "寿星墙"}
                ],
                staffData: [
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 1
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 2,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 3
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 4
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 5,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 6,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 7,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组'
                        , id: 8,
                    },
                ],
                wishesData: [
                    {
                        avatar: '',
                        name: '赵晓刀',
                        content: '评论列表评论列列表评论列表评论表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
                        reply: '2'
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        content: '评论列表评论列列表评论列表评论表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表评论列表',
                        reply: '2'
                    },
                ],
                todayBirthday: [
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},

                ],
                monthBirthday: [
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                    {name: '齐达内', depart: '南京二区一组', avatar: ""},
                ],
            }
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            },
            handleAdd(val) {
                if (val === 1) {
                    this.add_star_visible = true;
                }
                if (val === 2) {
                    this.add_staff = true;
                }
                if (val === 3) {
                    this.add_birthday_visible = true;
                }
            },
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/lejiaHumanity/index.scss";

    @mixin avatarImg($m) {
        background: url($m) 50% 50% no-repeat;
        background-size: auto 220px;
    }

    @mixin starImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #leJiaHumanity {
            .mainList {
                .star_info {
                    @include starImg('theme1', 'lejiazhixingdi.png');

                    .star_info_left {
                        @include starImg('theme1', 'biaoqian.png');

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