<template>
    <!--<div  class="menu_lists" :style="{'height': this.mainListHeight(-9) + 'px'}">-->
        <!--<div class="menu">-->
            <!--<div class="menu_box" v-for="(item,index) in hotNewsData" @click="routerLink(routerDetail.url)">-->
                <!--<div class="top">-->
                    <!--<img src="../../../assets/image/newMedia/theme1/active.png" alt="">-->
                <!--</div>-->
                <!--<div class="middle">-->
                    <!--<p class="title">{{item.title}}</p>-->
                    <!--<p class="operate-icons justify-start">-->
                        <!--<span class="justify-start"><i class="icon-view"></i>{{item.view}}</span>-->
                        <!--<span class="justify-start"><i class="icon-point"></i>{{item.point}}</span>-->
                        <!--<span class="justify-start"><i class="icon-comment"></i>{{item.comment}}</span>-->
                    <!--</p>-->
                    <!--<p class="desc">{{item.desc}}</p>-->
                <!--</div>-->
                <!--<div class="bottom justify-bet">-->
                    <!--<div class="bot-left">-->
                        <!--<div><img src="../../../assets/image/newMedia/theme1/avatar.png" alt=""></div>-->
                        <!--<div>-->
                            <!--<h3><span>{{item.name}}</span></h3>-->
                            <!--<p><span>{{item.department}}</span></p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="bot-right">-->
                        <!--<span>{{item.time}}</span>-->
                    <!--</div>-->
                <!--</div>-->

            <!--</div>-->
        <!--</div>-->
    <!--</div>-->

    <!--<div class="news-lists">-->
        <!--<div class="news-list-info" @click="routerLink(routerDetail.url)" v-for="(item,index) in hotNewsData">-->
            <!--<div class="news-box">-->
                <!--<div class="news-modal"></div>-->
                <!--<img src="../../../assets/image/newMedia/theme1/active.png" alt="">-->
                <!--<h3>{{item.title}}</h3>-->
                <!--<p class="news-status">-->
                    <!--<span><i></i><i>{{item.view}}</i></span>-->
                    <!--<span><i></i><i>{{item.point}}</i></span>-->
                    <!--<span><i></i><i>{{item.comment}}</i></span>-->
                <!--</p>-->
                <!--<p class="news-desc">{{item.desc}}</p>-->
                <!--<div class="news-avatar">-->
                    <!--<div>-->
                        <!--&lt;!&ndash;<img src="../../../assets/image/newMedia/theme1/avatar.png" alt="">&ndash;&gt;-->
                        <!--<p>-->
                            <!--<span>{{item.name}}</span>-->
                            <!--<span>{{item.department}}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<span>{{item.time}}</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->

    <div class="masonry">
        <div class="column">
            <div class="item">
                <div class="item__content item__content--medium">
                </div>
            </div>
            <div class="item">
                <div class="item__content">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--large">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--medium">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="item">
                <div class="item__content item__content--small">
                </div>
            </div>
            <div class="item">
                <div class="item__content">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--large">
                </div>
            </div>
            <div class="item">
                <div class="item__content">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="item">
                <div class="item__content item__content--small">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--large">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--medium">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="item">
                <div class="item__content item__content--small">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--medium">
                </div>
            </div>
            <div class="item">
                <div class="item__content">
                </div>
            </div>
            <div class="item">
                <div class="item__content item__content--small">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import mediaList from './mediaList.vue';
    import LjDialog from '../../common/lj-dialog.vue';

    export default {
        name: "hotNews",
        components: {
            mediaList,
            LjDialog,
        },
        data(){
            return{
                showFinMenuList:false,
                showModal:false,
                chooseTab: 1,
                selects:[
                    {id:1,title:"热门导读"},
                    {id:2,title:"乐伽新闻"},
                    {id:3,title:"公告"}
                ],
                routerDetail: {
                    title: '热门导读详情',
                    url:'/newsDetail'
                },

                hotNewsData:[
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是......",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！，！，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'找来了',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'发发发',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦梦，！，英雄梦！，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！，！，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！，！，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦梦，！，英雄梦！，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦其实我们每个人都有一个大侠梦梦，！，英雄梦！，英雄梦！自其实我们每个人都有一个大侠梦，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },
                    {
                        imgUrl:"../../../assets/image/newMedia/theme1/active.png",
                        title:"这是一则导读标题内标题内容标题内容标题内这是一则导读标题内标题内容标题内容标题内",
                        view:"222",
                        point:"333",
                        comment:'444',
                        desc:'其实我们每个人都有一个大侠梦，！，英雄梦！，！，英雄梦！自',
                        avatar:'../../../assets/image/newMedia/theme1/avatar.png',
                        name:'丽丽',
                        department:'南京二区一组',
                        time:'2018-02-12 14:04:12'


                    },


                ],
            }
        },
        watch:{

        },
        mounted(){

        },
        methods:{
            changeTabs(id) {
                this.chooseTab = id;
            },




        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/newMedia/components/hotNews.scss";
    @mixin hotImg($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1 {
        #hotNews {
            .listTopCss{

            };
            .menu_lists {
                .menu {
                    .menu_box {
                        .top{
                            img{
                            }
                        }
                        .middle{
                            .title{

                            }
                            .operate-icons{
                                i{
                                    @include hotImg('theme1','pic_dianzan.png')
                                }
                                .icon-view{
                                    @include hotImg('theme1','pic_dianzan.png')
                                }
                                .icon-point{
                                    @include hotImg('theme1','pic_shoucang.png')
                                }
                                .icon-comment{
                                    @include hotImg('theme1','pic_pinglun.png')
                                }
                            }
                            .desc{
                            }
                        }
                        .bottom{
                            .bot-left{

                                h3{

                                }
                                p{

                                }
                                img{

                                }
                            }
                            .bot-right{
                                span{

                                }
                            }
                        }


                    }
                }
            }


        }
    }

</style>