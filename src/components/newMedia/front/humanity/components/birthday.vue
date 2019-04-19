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
                            <div class="birthday_box-info flex-center"v-for="(item,index) in todayBirthday.slice(0,3)">
                                <div class="birthday_box">
                                    <img :src="item.user_id.avatar" alt="">
                                    <div class="">
                                        <span class="writingMode">{{item.user_id.org[0].name.slice(0,6)}}</span>
                                        <span class="writingMode">{{item.user_id.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="birthday_box-right">
                            <div class="outer-container">
                                <div class="inner-container">
                                    <div class="element">
                                        <div class="wishes-list" v-for="(item,index) in wishesData">
                                            <div v-for="(val,key) in item">
                                                <img :src="item.user_id.avatar" alt="">
                                                <div>
                                                    <p>{{item.user_id.name}}</p>
                                                    <p>{{item.user_id.content}}</p>
                                                </div>
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
                            <div @click="edit_wishes_visible=true">
                                <p>编写</p>
                                <p>祝福</p>
                            </div>
                            <div  @click="wishes_visible=true">
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
                            <img :src="item.user_id.avatar" alt="">
                            <div class="">
                                <span class="writingMode">{{item.user_id.org[0].name.slice(0,6)}}</span>
                                <span class="writingMode">{{item.user_id.name}}</span>
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
                                                <img :src="item.user_id.avatar" alt="">
                                                <div class="">
                                                    <span class="writingMode">{{item.user_id.org[0].name.slice(0,6)}}</span>
                                                    <span class="writingMode">{{item.user_id.name}}</span>
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
                                        <div class="wishes-list" v-for="(item,index) in wishesData">
                                            <!--<img :src="item.user_id.avatar" alt="">-->
                                            <!--<div>-->
                                                <!--<p>{{item.user_id.name}}</p>-->
                                                <!--<p>{{item.user_id.content}}</p>-->
                                            <!--</div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--透明图层-->
                            <div class="hide-box">
                            </div>
                        </div>
                        <div class="wishes-btn">
                            <div @click="edit_wishes_visible=true">
                                <p>编写</p>
                                <p>祝福</p>
                            </div>
                            <div  @click="wishes_visible=true">
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
        <!--所有祝福-->
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
                    <div class="wishes-lists" v-for="(item,index) in wishesData">
                        <img src="" alt="">
                        <div>
                            <h3></h3>
                            <p class="desc"></p>
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
                                    <el-input type="textarea" v-model="content" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="comfirmPostWishes()">发布</el-button>
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
                    limit:12,
                    offset:1,
                },
                content:'',//祝福语
                current_id:'',
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
                wishesData:[],
                todayBirthday:[],
                monthBirthday:[],

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
            //寿星列表信息
            getBirthdayLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/humanity/birthday',this.params).then(res => {
                    if(res.status===200){
                        // var birthdayData = res.data.data.sort(
                        //     function (a,b) {
                        //         return a.id-b.id
                        //     }
                        // );
                        this.todayBirthday=[];
                        this.monthBirthday=[];
                        for(let item of res.data.data){
                                if(item.birthday_type==='day'){
                                    this.todayBirthday.push(item);
                                }else if(item.birthday_type==='month '){
                                    this.monthBirthday.push(item);
                                }

                                // this.wishesData.push(item.blessing);
                        }
                        this.count = res.data.total;

                    }
                })
            },
            //写祝福
            comfirmPostWishes(){
                this.current_id=5;
                this.$http.post(globalConfig.newMedia_sever+'/api/humanity/birthday/blessing/'+this.current_id,{content:this.content}).then(res=>{
                    if (res.status===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.edit_wishes_visible = false;
                        this.getBirthdayLists();
                    }else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            }


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