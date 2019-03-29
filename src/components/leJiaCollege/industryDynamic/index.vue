<template>
    <div id="industryDynamic">
        <div class="lists">
            <div class="list-info flex-center" v-for="(item,index) in videoData">
                <div class="list-info-box">
                    <span>{{item.title}}</span>
                    <span>{{item.content}}</span>
                    <span><i>编辑</i><i>删除</i></span>
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
        name: "industryDynamic",
        data(){
            return{
                videoCount:0,
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
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title:'公告',
                        content:'还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
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
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/industryDynamic/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1 {
        #industryDynamic{
            >div{
                .list-info{
                    .list-info-box{
                       @include leJiaCollegeImg('theme1','notice-border-grey.png');
                        &:hover{
                            @include leJiaCollegeImg('theme1','notice-border-red.png')
                        }
                        span{
                            i{
                                @include leJiaCollegeImg('theme1','btn-grey.png');
                                &:hover{
                                    @include leJiaCollegeImg('theme1','btn-red.png');
                                }
                            }


                        }
                    }


                }
            }

        }

    }


</style>