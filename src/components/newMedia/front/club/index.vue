<template>
    <div id="club">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>俱乐部</h1>
            </div>
        </div>
        <div class="mainList flex-center">
            <div class="lists flex-center justify-bet">
                <div class="list" @click="look_visible = true" @mouseenter="showModal = true" @mouseleave="showModal = false">
                    <div class="list_modal" v-if="showModal"></div>
                    <div class="list_img"></div>
                    <div class="list_status flex-center justify-bet">
                        <div class="list_status_left">
                            <p class="list_status_title">一期一会的创意畅谈</p>
                            <p>2011.11.22-2019.12.11</p>
                        </div>
                        <div class="list_status_right flex-center">
                            已结束
                        </div>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <p class="flex-center"><i class="list_date_icon"></i><span>8天</span></p>
                        <p class="flex-center"><i class="list_view_icon"></i><span>222</span></p>
                    </div>
                </div>
                <div class="list">
                    <div class="list_img"></div>
                    <div class="list_status flex-center justify-bet">
                        <div class="list_status_left">
                            <p class="list_status_title">一期一会的创意畅谈</p>
                            <p>2011.11.22-2019.12.11</p>
                        </div>
                        <div class="list_status_right flex-center status_start">
                            进行中
                        </div>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <p class="flex-center"><i class="list_date_icon"></i><span>8天</span></p>
                        <p class="flex-center"><i class="list_view_icon"></i><span>222</span></p>
                    </div>
                </div>
                <div class="list">
                    <div class="list_img"></div>
                    <div class="list_status flex-center justify-bet">
                        <div class="list_status_left">
                            <p class="list_status_title">一期一会的创意畅谈</p>
                            <p>2011.11.22-2019.12.11</p>
                        </div>
                        <div class="list_status_right flex-center status_start">
                            进行中
                        </div>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <p class="flex-center"><i class="list_date_icon"></i><span>8天</span></p>
                        <p class="flex-center"><i class="list_view_icon"></i><span>222</span></p>
                    </div>
                </div>
                <div class="list">
                    <div class="list_img"></div>
                    <div class="list_status flex-center justify-bet">
                        <div class="list_status_left">
                            <p class="list_status_title">一期一会的创意畅谈</p>
                            <p>2011.11.22-2019.12.11</p>
                        </div>
                        <div class="list_status_right flex-center status_start">
                            进行中
                        </div>
                    </div>
                    <div class="list_view flex-center justify-bet">
                        <p class="flex-center"><i class="list_date_icon"></i><span>8天</span></p>
                        <p class="flex-center"><i class="list_view_icon"></i><span>222</span></p>
                    </div>
                </div>
            </div>

        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--详情-->
        <lj-dialog :visible="look_visible" :size="{width:1200 + 'px',height: '620' + 'px'}" @close="look_visible = false">
            <div class="action_info">
                <h3 class="justify-start">活动详情</h3>
                <div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动名称</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">！sdfdsfds发个广告所发生的</div>
                    </div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动时间</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">sdfdsfds发个广告所发生的！</div>
                    </div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动地址</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">sdfdsfds发个广告所发生的！</div>
                    </div>
                    <div class="action_name" style="border-bottom: 0">
                        <div class="action_left" style="width: 70px;float: left">活动地址</div>
                        <div class="action_right action_address" style="width: 860px;text-align: left;float: left;height: 100px">第三届乐伽羽毛球大赛火热报名中！第三届乐伽羽毛球大赛火热报名中第三届乐伽第三届乐伽羽毛球大赛火热报名中羽毛球大赛火热报名中第三届乐伽羽毛球大赛火热报名中第三届乐伽羽毛球大赛火热报名中第三届乐伽第三届乐伽羽毛球大赛火热报名中羽毛球大赛火热报名中第三届乐伽羽毛球大赛火热报名中</div>
                    </div>

                </div>
            </div>
            <div style="position: absolute;bottom:50px;left:0;right:0;">
                <el-button type="danger" size="">我要报名</el-button>
                <el-button type="info" size="" @click="look_visible = false">取消</el-button>
            </div>
            <div class="top_right_img" style="width:60px;height:140px;position: absolute;top:0;right:90px;">
                <span>已报名</span>
                <span>333</span>
            </div>


        </lj-dialog>

    </div>


</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "club",
        components: {
            mediaList,
            LjDialog
        },
        data() {
            return {
                showFinMenuList: false,
                showModal:false,
                showData:{
                    imgUrl:"",
                    title:"给你看个isis的故事",
                    start_time:"12-22-11",
                    end_time:"11-22-3",
                    status:1,
                    statusImg:"",


                },
                look_visible:false,//详情
                end_visible:false,//结束
                add_visible:false,//新增
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/front/club/index.scss";
    @mixin clubImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #club{
            .mainList{
                >div{
                }
                .list{
                    .list_img{
                        @include clubImg('theme1','active.png')
                    }
                    .list_status{
                        .list_status_left{
                            .list_status_title{

                            }
                        }
                        .list_status_right{
                            @include clubImg('theme1','status_right_icon2.png');
                        }
                        .status_start{
                            @include clubImg('theme1','status_right_icon1.png');
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
            .top_right_img{
                @include clubImg('theme1','denglong.png')
            }
        }


    }


</style>
