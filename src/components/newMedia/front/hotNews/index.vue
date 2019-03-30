<template>
    <div id="humanity">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>企业头条</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add"><b>+</b></div>
            </div>
        </div>
        <div class="mainList justify-center">
            <div class="menu_images justify-bet">
                <div v-for="(item,index) in humanity" class="menu_img_type" @click="routerLink(item.url,{type:item.chooseTab})"
                     :key="index">
                    <span class="writingMode">
                        <span class="title">{{item.title}}</span>&nbsp;
                        <span class="letter">{{item.letter}}</span>
                    </span>
                </div>
            </div>
        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    export default {
        name: "index",
        components: {
            mediaList,
        },
        data() {
            return {
                humanity: [
                    {
                        url: 'hot',
                        title: '热门导读',
                        letter: "Hot News",
                        chooseTab:1,
                    },
                    {
                        url: 'lejiaNews',
                        title: '乐伽新闻',
                        letter: "Lejia News",
                        chooseTab:2,
                    },
                    {
                        url: 'notice',
                        title: '公告  ',
                        letter: "Notice",
                        chooseTab:3,
                    },
                ],
                showFinMenuList: false,

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/front/hotNews/index.scss";

    @mixin humanityImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #humanity {
            .mainList {
                @include humanityImg('theme1', 'background_3.png');

                .menu_images {
                    .menu_img_type {
                        @include humanityImg('theme1', 'lejiaxinwen.png');

                        &:hover {
                            @include humanityImg('theme1', 'remendaodu.png');
                        }
                    }
                }
            }
        }
    }
</style>
