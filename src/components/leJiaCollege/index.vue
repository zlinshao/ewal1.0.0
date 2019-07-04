<template>
    <div id="leJiaCollege">
        <div class="mainList" :style="{'height': this.mainListHeight(-89) + 'px'}">
            <div class="leJiaCollege-menu">
                <div class="leJiaCollege-menu-info flex-center" v-for="(item,index) in menuType">
                    <div  @click="routerLink(item.url,{type:item.type,url:item.url})" :key="index" class="flex-center">
                        <span class="writingMode">{{item.letter}}</span>
                        <span class="writingMode">{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        name: "index",
        components: {

        },
        data() {
            return {
                menuType:[
                    {
                        url: 'videoLearning',
                        title: '视频学习',
                        letter:'Video learning',
                        type:1
                    },
                    {
                        url: 'postPlanning',
                        title: '岗位规划',
                        letter:'Post planning',
                        type:2
                    },
                    {
                        url: 'faculty',
                        title: '师资力量',
                        letter:'Faculty',
                        type:3
                    },
                    {
                        url: 'industryDynamic',
                        title: '行业动态',
                        letter:'Industry dynamic',
                        type:4
                    },
                    {
                        url: 'practicalProblems',
                        title: '实践问题',
                        letter:'Practical problems',
                        type:5
                    },
                    /*{
                        url: 'train',
                        title: '培训考试',
                        letter:'Train',
                        type:6
                    },*/
                ],
                showFinMenuList: false,
                add_visible:false,//新增
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/leJiaCollege/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1{
        #leJiaCollege{
            >div{
                @include leJiaCollegeImg('theme1','index-bg.png');
                .leJiaCollege-menu {
                    .leJiaCollege-menu-info {
                        >div{
                            @include leJiaCollegeImg('theme1','border-grey.png');
                            &:hover{
                                @include leJiaCollegeImg('theme1','boder-red.png');
                                span{
                                    color: #CF2E33;
                                }
                            }
                        }



                    }
                }
            }




        }

    }


</style>
