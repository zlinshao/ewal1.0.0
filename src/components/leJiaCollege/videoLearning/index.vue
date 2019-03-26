<template>
    <div id="videoLearning">
        <div class="video-lists">
            <div class="video-list-info flex-center" v-for="(item,index) in videoData">
                <div class="video-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="video-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i>编辑</i><i>删除</i></span>
                    </div>
                    <div class="video-box-middle">
                        <div class="video-border"></div>
                        <div>
                            <video  poster="../../../assets/image/newMedia/theme1/active.png"><source src="" type="video/ogg">你的浏览器不支持video</video>
                        </div>
                    </div>
                    <div class="video-box-bottom justify-bet">
                        <span>收房时注意十件事</span>
                        <span>08:08</span>
                        <span><i class="view"></i><i>555</i></span>
                    </div>
                </div>
            </div>
        </div>
        <!--分页-->
        <footer class="flex-center bottomPage">
            <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="page">
                <el-pagination
                        :total="videoCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "videoLearning",
        data(){
            return{
                videoCount:0,
                is_show:true,
                current:'',
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                videoData:[
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },

                ],
            }
        },
        methods:{
            //换页
            handleChangePage(page) {
                this.params.page = page;
                // this.getLordList();
            },
            onMousteIn: function (index) {
                this.is_show = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.is_show = false; //鼠标移出隐藏
                this.current = null;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/videoLearning/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1 {
        #videoLearning{
            .video-lists{
                .video-list-info{
                    .video-box{

                        .video-box-top{
                            span{
                                i{
                                    &:hover{
                                        @include leJiaCollegeImg('theme1','huidi2.png');
                                    }
                                }
                            }
                        }
                        .video-box-middle{
                            .video-border{
                                @include leJiaCollegeImg('theme1','video-border-grey.png');
                                &:hover{
                                    @include leJiaCollegeImg('theme1','video-border-red.png');
                                }
                            }


                        }
                        .video-box-bottom{
                            span:nth-child(3){
                                .view{
                                    @include leJiaCollegeImg('theme1','ico_yueduliang.png');

                                }
                            }
                        }

                    }
                }
            }


        }

    }

</style>