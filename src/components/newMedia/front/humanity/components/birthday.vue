<template>
    <div id="birthday">
        <div class="mainList scroll_bar min-today-birthday"  :style="{'height': this.mainListHeight(-9) + 'px'}"  v-if="show">
            <div class="birthday_info">
                <div class="today_birthday">
                    <div class="today_birthday_title">
                        <div>
                            <span>今日寿星</span>
                        </div>
                    </div>
                    <div class="today_birthday_list">
                        <div class="birthday_box-left">
                            <div class="birthday_box-info flex-center"v-for="(item,index) in todayBirthday.slice(0,3)" :key="index">
                                <div class="birthday_box" style="cursor: pointer">
                                    <img :src="item.image_file_id.uri" alt="">
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
                                            <img :src="item.user_id.avatar" alt="">
                                            <div>
                                                <p>{{item.user_id.name}}</p>
                                                <p>{{item.content}}</p>
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
                            <div @click="add_wishes=true">
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
                        <div class="birthday_box" v-for="(item,index) in monthBirthday" :key="index" style="cursor: pointer">
                            <img :src="item.image_file_id.uri" alt="">
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

        <div class="mainList scroll_bar all-today-birthday"  :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="!show">
            <div class="birthday_info">
                <div class="today_birthday">
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
                                        <div class="birthday_box-info flex-center"v-for="(item,index) in todayBirthday" :key="index">
                                            <div class="birthday_box" style="cursor: pointer">
                                                <img :src="item.image_file_id.uri" alt="">
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
                                            <img :src="item.user_id.avatar" alt="">
                                            <div>
                                                <p>{{item.user_id.name}}</p>
                                                <p>{{item.content}}</p>
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
                            <div @click="add_wishes=true">
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
                <div class="months_birthday"></div>
                <div class="switch_icon_box flex-center" @click="show = true">
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
                    <p class="flex-center" @click="add_wishes = true">
                        <i class="write_wishes"></i>
                        <span>写祝福</span>
                    </p>
                </div>
                <div class="dialog_main">
                    <div class="wishes-lists" v-for="(item,index) in wishesData">
                        <img :src="item.user_id.avatar" alt="">
                        <div>
                            <p>{{item.user_id.name}}</p>
                            <p>{{item.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </lj-dialog>
        <!--写祝福-->
        <lj-dialog
                :visible="add_wishes"
                :size="{width: 900 + 'px' ,height: 600 + 'px'}"
                @close="add_wishes = false">
            <div class="dialog_container">
                <div class="dialog_header" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
                    <h3>写祝福</h3>
                    <h5 style="padding: 4px 10px;background: #cf2e33;color: #ffffff;border-radius: 5px;cursor: pointer" @click="person_visible=true">选择寿星</h5>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px">
                        <el-form-item label="祝福内容">
                            <el-input type="textarea" v-model="content" :rows="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="confirmPostWishes()">发布</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--寿星选择列表-->
        <lj-dialog
                :visible="person_visible"
                :size="{width: 900 + 'px' ,height: 500 + 'px'}"
                @close="person_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>请选择寿星</h3>
                </div>
                <div class="dialog_main all-birthday">
                    <div class="all-birthday-list" v-for="(item,index) in allBirthday">
                        <div class="all-birthday-info" @click.stop="selectPerson(item)" :class="{'selectedBirthday': selectedBirthday.includes(item.id)}">
                            <img :src="item.image_file_id.uri" alt="">
                            <div class="" style="text-align: left">
                                <p style="font-weight: bold">{{item.user_id.name}}</p>
                                <p>{{item.user_id.position[0].name.slice(0,6)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="person_visible = false">确定</el-button>
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
                current_id:'',
                showFinMenuList: false,
                showModal: false,
                wishes_visible:false,//祝福列表
                add_wishes:false,//写祝福
                chooseTab: 1,
                show:true,
                selects: [
                    {id: 1, title: "乐伽之星"}, {id: 2, title: "优秀员工"}, {id: 3, title: "寿星墙"}
                ],
                wishesData:[],//祝福语
                todayBirthday:[],//今日寿星
                monthBirthday:[],//本月寿星
                allBirthday:[],//所有寿星

                count:0,

                content:'',//祝福语
                // birthday_id:[],

                person_visible:false,
                // flag:false,
                selectedBirthday:[//选中的寿星
                ],
            }
        },
        mounted(){
          this.getDataLists();
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            },
            selectPerson(item){//选择寿星
                let selectItem = this.selectedBirthday;
                // if(selectItem.length){
                //     if(selectItem.includes(item.id)){
                //
                //     }
                // }
                if (selectItem.length) {
                    if (selectItem.includes(item.id)) {
                        let index = selectItem.indexOf(item.id);
                        this.selectedBirthday.splice(index, 1);
                        // this.chooseStaff.splice(index, 1);
                    } else {
                        this.selectedBirthday.push(item.id);
                        // this.chooseStaff.push(item);
                    }
                } else {
                    this.selectedBirthday.push(item.id);
                    // this.chooseStaff.push(item);
                }

                console.log(this.selectedBirthday);
            },

            getDataLists(){//寿星列表信息
                this.$http.get(globalConfig.newMedia_sever + '/api/humanity/birthday', this.params).then(res => {
                    if(res.status===200){
                        console.log(res.data.data);
                        this.allBirthday = res.data.data;
                        let arr = res.data.data;
                        let blessingArr  = [];
                        this.todayBirthday=[];
                        this.monthBirthday=[];
                        this.wishesData = [];
                        for(let item of arr){
                            if(item.birthday_type==='month'){
                                this.monthBirthday.push(item);
                            }else{
                                this.todayBirthday.push(item);
                            }
                            blessingArr.push(item.blessing);
                        }

                        for (var i=0;i < blessingArr.length;i++){
                            for(var j=0;j < blessingArr[i].length;j++){
                                this.wishesData.push(blessingArr[i][j]);
                            }
                        }
                        console.log(this.wishesData);
                        this.count = res.data.total;
                    }
                })
            },
            confirmPostWishes(){//提交祝福
                let selectedBirthdayIds = this.selectedBirthday;
                let paramsForm={
                    content:this.content,
                    birthday_id:this.selectedBirthday,
                };
                if(selectedBirthdayIds.length>0){
                    this.$http.post(globalConfig.newMedia_sever+'/api/humanity/birthday/blessing',paramsForm).then(res=>{
                        if (res.status===200){
                            this.$LjNotify('success', {
                                title: '成功',
                                message: res.msg,
                                subMessage: '',
                            });
                            this.add_wishes = false;
                            this.getDataLists();
                        }else {
                            this.$LjNotify('error', {
                                title: '失败',
                                message: res.msg,
                                subMessage: '',
                            });
                        }
                    })
                }else{

                }


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