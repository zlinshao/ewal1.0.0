<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="leJiaStars">
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
                        <h5 class="edit_icon justify-end" @click.stop="edit()"><span></span>编辑</h5>
                        <h3>{{starInfo.title}}</h3>
                        <p>
                            is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                        <div class="justify-bet">
                            <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                            <img src="../../../../../assets/image/newMedia/theme1/active.png" alt="">
                        </div>
                        <p>
                            is德国his的is德国hisis德国his的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的is德国his的韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价韩国is德国his的韩国帅is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价is德国his的韩国帅哥is德国is的结果is的金佛电视剧肥婆多少佛批发价</p>
                    </div>
                </div>
            </div>

        </div>

        <!--新增-->
        <lj-dialog
                :visible="add_visible"
                :size="{width:1200 + 'px' ,height: 800 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>乐伽之星</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form  v-model="form" label-width="80px">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="文章内容">
                            <div class="item_content">
                                <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="getUEContent()">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
    </div>

</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    import UE from '../../../../common/UE.vue';
    export default {
        name: "leJiaStars",
        components:{
            LjDialog,
            UE,
        },
        data() {
            return {
                visible:false,
                form:{
                    name:'赵丽颖',
                    content:'国际上的飞机上的就发生的纠纷双方品搜东方'
                },
                starInfo:{},
                defaultMsg: '',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
            }
        },
        mounted(){
          this.getLeJiaStarInfo();
        },
        methods: {
            edit() {
                this.visible = true;
            },
            //获取乐伽之星
            getLeJiaStarInfo(){
                this.$http.get(globalConfig.newMedia_sever + '/api/humanity/star',).then(res => {
                    if(res.status===200){
                        console.log(res.data);
                        this.starInfo = res.data;
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/leJiaStars.scss";

    @mixin starImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #leJiaStars {
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
        }
    }

</style>