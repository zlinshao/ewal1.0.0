<template>
    <div id="club">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>俱乐部</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add" @click="addCustomer(chooseTab)"><b>+</b></div>
            </div>
        </div>
        <div class="mainList flex-center">
            <div class="lists flex-center justify-bet">
                <div class="list">
                    <div class="list_img"></div>

                    <div class="list_status flex-center justify-bet">
                        <div class="list_status_left">
                            <p class="list_status_title">一期一会的创意畅谈</p>
                            <p>2011.11.22-2019.12.11</p>
                        </div>
                        <div class="list_status_right">

                        </div>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <span><span>8天</span></span>
                        <span><span>222</span></span>
                    </div>
                </div>

                <div class="list">
                    <div class="list_img"></div>
                    <div class="list_status">
                        <span class="list_status_title">一期一会的创意畅谈</span>
                        <span class="list_status_img">2011.11.22-2019.12.11</span>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <p class="flex-center"><i class="list_date_icon"></i><span>8天</span></p>
                        <p class="flex-center"><i class="list_view_icon"></i><span>222</span></p>
                    </div>
                </div>
            </div>

        </div>

        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
    </div>


</template>

<script>
    import mediaList from '../components/mediaList.vue'

    export default {
        name: "index",
        components: {
            mediaList,
        },
        data() {
            return {
                showFinMenuList: false,
                showData:{
                    imgUrl:"",
                    title:"给你看个isis的故事",
                    start_time:"12-22-11",
                    end_time:"11-22-3",
                    status:1,
                    statusImg:"",


                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/newMedia/club/index.scss";
    @mixin clubImg($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #club{
            .mainList{
                >div{
                }
                .list{
                    .list_img{
                    }
                    .list_status{
                        .list_status_left{
                            .list_status_title{

                            }
                        }
                        .list_status_right{

                        }
                    }
                    .list_view{
                        .list_date_icon{
                            @include clubImg('theme1','shijian.png')
                        }
                        .list_view_icon{
                            @include clubImg('theme1','ico_yueduliang.png')
                        }

                    }

                }
            }
        }

    }


</style>
