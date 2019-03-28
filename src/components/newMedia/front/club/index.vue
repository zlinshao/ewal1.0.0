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
        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="club-lists">
                <div class="club-lists-info" v-for="(item,index) in clubData">
                    <div class="club-box">
                        <div class="club-box-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt=""></div>
                        <div class="club-box-middle">
                            <div>
                                <p>{{item.title}}</p>
                                <p><span>{{item.startTime}}</span><span>-</span><span>{{item.endTime}}</span></p>
                            </div>
                            <div>
                                <span class="" :class="item.status===1?'end':'active'">{{item.status===1?'已结束':'进行中'}}</span>
                            </div>
                        </div>
                        <div class="club-box-bottom">
                            <span><i></i>{{item.day}}</span>
                            <span><i :class="item.status===1?'post':'unPost'"  @click.stop="look_visible = true">{{item.status===1?'已报名':'我要报名'}}</i><i></i>{{item.viewCount}}</span>
                        </div>
                        <div class="club-modal" v-if="item.status===1"></div>

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
                <el-button type="danger" size="" @click="end_action_visible = true">结束活动</el-button>
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
                clubData:[
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:2,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:1,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:2,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:1,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:2,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',

                    },
                ],
                look_visible:false,//详情
                end_visible:false,//结束
                add_visible:false,//新增

            }
        },
        methods:{

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
                .club-lists{
                    .club-lists-info{
                        .club-box{
                            .club-box-top{
                                img{
                                }
                            }
                            .club-box-middle{
                                div:first-child{
                                    p:first-child{
                                    }
                                    p:last-child{

                                        span{

                                        }
                                    }
                                }

                                div:last-child{
                                    span{
                                    }
                                    .end{
                                        @include clubImg('theme1','status_right_icon2.png');
                                        color:#686874
                                    }
                                    .active{
                                        @include clubImg('theme1','status_right_icon1.png');
                                        color:#f4f4f4;
                                    }
                                }

                            }
                            .club-box-bottom{

                                .unPost{
                                    background: #CF2E33;
                                    color:#FFFFFF;
                                    border-radius: 5px;
                                }
                                .post{
                                    color:#686874;
                                    background: #DFDFDF;
                                    border-radius: 5px;
                                }

                                span{

                                    i{

                                    }
                                }
                                span:first-child{
                                    i{
                                        @include clubImg('theme1','shijian.png')
                                    }
                                }
                                span:last-child{
                                    i:first-child{

                                    }
                                    i:last-child{
                                        @include clubImg('theme1','ico_yueduliang.png')
                                    }
                                }
                            }
                        }
                    }

                }

            }
        }


    }


</style>
