<template>
    <div id="birthday">
        <div class="mainList scroll_bar"  :style="{'height': this.mainListHeight(-9) + 'px'}"  v-if="show">
            <div class="birthday_info">
                <div class="today_birthday">
                    <div class="today_birthday_title">
                        <div>
                            <span>今日寿星</span>
                        </div>
                    </div>
                    <div class="today_birthday_list">
                        <div class="birthday_box-left">
                            <div class="birthday_box" v-for="(item,index) in todayBirthday.slice(0,3)">
                                <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                                <div class="">
                                    <span class="writingMode">{{item.depart}}</span>
                                    <span class="writingMode">{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="birthday_box-right">
                            <div class="outer-container">
                                <div class="inner-container">
                                    <div class="element">
                                        <div class="wishes-list" v-for="(item,index) in todayBirthday">
                                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                                            <div>
                                                <p>赵小刀</p>
                                                <p>祝李莫愁生日快乐！年年有今日～岁岁有今朝～哈哈！生日快乐！ ～岁岁有今朝～～哈哈！生日快乐！</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--透明图层-->
                            <div class="hide-box">
                            </div>
                        </div>
                        <div class="wishes-btn">
                            <div>
                                <p>编写</p>
                                <p>祝福</p>
                            </div>
                            <div>
                                <p>所有</p>
                                <p>祝福</p>
                            </div>
                        </div>

                    </div>
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
                <div class="switch_icon_box flex-center"  @click="show = false">
                    <span></span>
                </div>
            </div>
        </div>

        <div class="mainList scroll_bar hide-mainList"  :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="!show">
            <div class="birthday_info">
                <div class="today_birthday hide-all-today">
                    <div class="today_birthday_title">
                        <div>
                            <span>今日寿星</span>
                        </div>
                    </div>
                    <div class="today_birthday_list">
                        <div class="birthday_box-left">
                            <div class="outer-container">
                                <div class="inner-container">
                                    <div class="element">
                                        <div class="box-info" v-for="(item,index) in todayBirthday">
                                            <div class="birthday_box" >
                                                <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
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
                        <div class="birthday_box-right">
                            <div class="outer-container">
                                <div class="inner-container">
                                    <div class="element">
                                        <div class="wishes-list" v-for="(item,index) in todayBirthday">
                                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                                            <div>
                                                <p>赵小刀</p>
                                                <p>祝李莫愁生日快乐！年年有今日～岁岁有今朝～哈哈！生日快乐！ ～岁岁有今朝～～哈哈！生日快乐！</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--透明图层-->
                            <div class="hide-box">
                            </div>
                        </div>
                        <div class="wishes-btn">
                            <div>
                                <p>编写</p>
                                <p>祝福</p>
                            </div>
                            <div>
                                <p>所有</p>
                                <p>祝福</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="months_birthday hide-all-months"></div>
                <div class="switch_icon_box flex-center  hide-switch" @click="show = true">
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
                params: {//查询参数
                    search: '',
                    total:'',//总页数
                    current_page:'',//当前页数
                    per_page:10,//一页多少条
                    last_page:'',//最后一页的条数
                    first_page_url:'',//第一页的URL
                    last_page_url:'',//最后一页的URL
                    prev_page_url:'',//上一页的URL
                    next_page_url:'',//下一页的URL
                    from:'',//当前页 数据第一项的编号
                    to:'',//当前页 数据最后一项的编号
                },
                showFinMenuList: false,
                delete_visible: false,
                edit_visible: false,
                showModal: false,
                wishes_visible:false,
                edit_wishes_visible:false,
                chooseTab: 1,
                show:true,
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
                dataLists:[],
                count:0,
            }
        },
        mounted(){
          this.getBirthdayLists();
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            },
            getBirthdayLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/humanity/birthday',this.params).then(res => {
                    if(res.status===200){
                        this.dataLists = res.data.data.sort(
                            function (a,b) {
                                return a.id-b.id
                            }
                        );
                        this.count = res.data.total;
                        console.log(this.dataLists);



                    }
                })
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