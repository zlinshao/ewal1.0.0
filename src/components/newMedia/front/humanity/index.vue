<template>
    <div id="humanity">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>乐伽人文</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add"><b>+</b></div>
            </div>
        </div>
        <div class="mainList justify-center">
            <div class="menu_images justify-bet ">
                <div v-for="(item,index) in humanity.data" class="menu_img_type"  @click="routerLink(item.url)" :key="index">
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
    import {humanity} from '../../../../assets/js/allModuleList.js'

    export default {
        name: "humanity",
        components: {
            mediaList,
        },
        data() {
            return {
                humanity,
                showFinMenuList: false,

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/front/humanity/index.scss";
    @mixin humanityImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #humanity{
            .mainList{
                @include humanityImg('theme1','background.png');
                .menu_images{
                    .menu_img_type{
                        @include humanityImg('theme1','youxiuyuangong.png');
                        &:hover{
                            @include humanityImg('theme1','lejiazhixing.png');
                        }
                    }
                }
            }
        }
    }
</style>
