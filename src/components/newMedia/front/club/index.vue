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
                    <div class="club-box"  @click="handleClubDetail(item.status,item.id)">
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
                            <span><i :class="item.status===1?'post':'unPost'"  @click="look_visible = true;clubStatus=item.status">{{item.status===1?'已报名':'我要报名'}}</i><i></i>{{item.viewCount}}</span>
                        </div>
                        <div class="club-modal" v-if="item.status===1"></div>
                    </div>
                </div>
            </div>
        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>

        <!--详情-->
        <lj-dialog :visible="look_visible" :size="{width: 1000 + 'px',height: 650 + 'px'}"
                   @close="look_visible = false" style="position: relative">
            <div class="dialog_container" style="padding-top: 20px">
                <div class="dialog_header">
                    <h3>活动详情</h3>
                </div>
                <div class="dialog_main">
                    <div class="club-detail">
                        <p v-for="item in clubDetail">
                            <span>{{item.title}}</span>
                            <span>{{item.content}}</span>
                        </p>
                    </div>
                </div>
                <div class="dialog_footer" v-show="clubStatus===2">
                    <el-button type="danger" size="small" @click="">我要报名</el-button>
                    <el-button type="info" size="small" @click="look_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>

            <div class="dengLong">
                <p>已报名</p>
                <p>666</p>
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
                clubStatus:'',
                clubDetail:[
                    {title:'活动名称',content:'第三届乐伽羽毛球大赛火热报名中！'},
                    {title:'活动时间',content:'2018.02.10-2108.02.16'},
                    {title:'活动地点',content:'大会议室'},
                    {title:'活动内容',content:'这个是内容吃吃吃吃吃答 答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的等待等待的点点滴滴答 滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的滴滴答答滴滴答答滴滴答答滴滴答答的等待滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的 滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的等待滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴 答答的的等待这个是内容吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃吃 答的滴滴答答滴滴答答滴滴答答滴滴答答的多的滴滴答答滴滴答答滴滴答答滴滴答答的滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答 的滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的等待等待的点点滴滴答 滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的滴滴答答滴滴答答滴滴答答滴滴答答的等待滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的 滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的等待滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴 答答的的等待的滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答的滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答滴滴答答答答滴滴答答滴滴答滴滴答答的 滴滴答答滴滴答答滴滴答答滴滴答滴滴'},
                ],
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
                        id:1

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:1,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',
                        id:2

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:2,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',
                        id:3

                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:1,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',
                        id:4
                    },
                    {
                        actionImg:'',
                        title:'一期一会的创意畅谈',
                        status:2,
                        startTime:'2018.02.12',
                        endTime:'2018.04.12',
                        viewCount:118,
                        day:'8天前',
                        id:5
                    },
                ],
                look_visible:false,//详情
                end_visible:false,//结束
                add_visible:false,//新增
            }
        },
        methods:{
            handleClubDetail(status,id){
                this.clubStatus = status;
                this.look_visible= true;
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

        .dengLong{
            @include clubImg('theme1','denglong.png');
        }


    }


</style>
