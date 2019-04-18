<template>
    <div id="profile_video">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
        </div>
        <!--video-->
        <div v-if="chooseTab === 1" class="menu_video justify-center">
            <div class="menu_profile_video">
                <div class="video_box">
                    <div class="video_poster" @mouseenter="showModal = true" @mouseleave="showModal = false">
                        <div class="video_start"></div>
                        <div class="video_modal"  v-if="showModal"></div>
                    </div>
                    <div class="video_bottom">
                        <div class="video_title">乐伽大学培训视频</div>
                        <div class="video_tips justify-bet">
                            <span class="video_time">41414141414141</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--file-->
        <div v-if="chooseTab === 2">
            <div class="menu_profile_file">
                999
            </div>
        </div>

        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
    </div>

</template>

<script>
    import mediaList from './mediaList.vue';
    import LjDialog from '../../common/lj-dialog.vue';

    export default {
        name: "video",
        components: {
            mediaList,
            LjDialog,
        },
        data(){
            return{
                showFinMenuList:false,
                delete_visible:false,
                edit_visible:false,
                showModal:false,
                chooseTab: 1,
                selects:[
                    {id:1,title:"视频"},{id:2,title:"文档"}
                ],
                videoData:[//视频列表

                ],
            }
        },
        methods:{
            changeTabs(id) {
                this.chooseTab = id;
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../../assets/scss/newMedia/components/video.scss";
    @mixin profile_video($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #profile_video{
            .listTopCss{
            };
            .menu_video{
                .menu_profile_video{
                    .video_box{
                        .video_poster{
                            @include profile_video('theme1','active.png');
                            .video_start{
                                @include profile_video('theme1','defalut-grey.png');
                                &:hover{
                                    @include profile_video('theme1','start.png');
                                }
                            }
                        }
                        .video_bottom{

                            .video_title{

                            }
                            .video_time{

                            }
                            .video_operate{
                                .edit{
                                    @include profile_video('theme1','bianji.png')
                                }
                                .delete{
                                    @include profile_video('theme1','shanchu.png')
                                }
                            }
                        }
                    }
                }
            }

        }
    }

</style>