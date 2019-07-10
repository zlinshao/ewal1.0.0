<template>
    <div id="profile">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = false">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
            </div>
        </div>
        <div class="mainList flex-center">
            <div class="menu_images flex-center justify-bet">
                <div v-for="(item,index) in profileType" class="menu_img_type flex-center"  @click="routerLink(item.url,{type:item.type})" :key="index">
                    <span class="writingMode">{{item.title}}    {{item.letter}}</span>
                </div>
            </div>
        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "index",
        components: {
            mediaList,
            LjDialog
        },
        data() {
            return {
                profileType:[
                    {
                        url: 'video',
                        title: '视频',
                        letter:'Video',
                        type:1,
                    },
                    {
                        url: 'document',
                        title: '文档',
                        letter:'Document',
                        type:2,
                    },
                ],
                showFinMenuList: false,
                add_visible:false,//新增
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/front/profile/index.scss";
    @mixin profileImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }


    #theme_name.theme1{
        #profile{
            >div{
            }
            .mainList{
                @include profileImg('theme1','background_4.png');
            }
            .menu_images{
                .menu_img_type{
                    @include profileImg('theme1','wendang.png');
                    span{

                    }
                    &:hover{
                        @include profileImg('theme1','shipin.png');
                    }
                }
            }


        }

    }


</style>
