<template>
    <div id="birthday">
        <div class="mainList scroll_bar"  :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="birthday_info">

                <div class="today_birthday">
                    <div class="today_birthday_title">
                        <div>
                            <span>今日寿星</span>
                        </div>
                    </div>
                    <div class="today_birthday_list">
                        <div class="birthday_box" v-for="(item,index) in todayBirthday.slice(0,3)">
                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="">
                                <span class="writingMode">{{item.depart}}</span>
                                <span class="writingMode">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="today_birthday_btn" @click="wishes_visible = true"><span>送上祝福</span></div>
                </div>

                <div class="months_birthday">
                    <div class="months_birthday_title"><span>本月寿星</span></div>
                    <div class="months_birthday_list">
                        <div class="birthday_box" v-for="(item,index) in monthBirthday">
                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="">
                                <span class="writingMode">{{item.depart}}</span>
                                <span class="writingMode">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="switch_icon_box flex-center">
                    <span></span>
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
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
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
    @import "../../../../../assets/scss/newMedia/front/humanity/components/birthday.scss";

    @mixin avatarImg($m) {
        background: url($m) 50% 50% no-repeat;
        background-size: auto 220px;
    }
    @mixin starImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #birthday {
            .mainList {
                .birthday_info{
                    .today_birthday{
                        .today_birthday_title{
                            >div{
                                @include starImg('theme1','jinrishouxing.png');
                            }
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