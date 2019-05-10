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
                    <div class="club-box"  @click="openReport(item)">
                        <div class="club-box-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt=""></div>
                        <div class="club-box-middle">
                            <div>
                                <p>{{item.name}}</p>
                                <p><span>{{item.created_at}}</span></p>
                            </div>
                            <div>
                                <span class="" :class="item.status===0?'active':item.status===1?'active':item.status===2?'end':''">{{item.status===0?'未开始':item.status===1?'进行中':item.status===2?'已结束':''}}</span>
                            </div>
                        </div>
                        <div class="club-box-bottom">
                            <span><i></i>{{item.day}}</span>
                            <span><i :class="item.status===0?'unPost':item.status===1?'unPost':item.status===2?'post':''"  @click="openReport(item)">{{item.status===0?'我要报名':item.status===1?'我要报名':item.status===2?'已结束':''}}</i><i></i>{{item.click}}</span>
                        </div>
                        <div class="club-modal" v-if="item.status===2"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--分页-->
        <footer class="flex-center bottomPage">
            <div class="develop flex-center">
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="page">
                <el-pagination
                        :total="count"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.offset"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>
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
                        <p><span>活动名称</span><span>{{showData.name}}</span></p>
                        <p><span>活动时间</span><span>{{showData.start_time}} - {{showData.over_time}}</span></p>
                        <p><span>活动地点</span><span>{{showData.address}}</span></p>
                        <p><span>活动内容</span><span>{{showData.content}}</span></p>
                    </div>
                </div>
                <div class="dialog_footer" v-if="showData.status!=2">
                    <el-button type="danger" size="small" @click="confirmReport(showData.id)">我要报名</el-button>
                    <el-button type="info" size="small" @click="look_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>

            <div class="dengLong" @click="getReportedUsers" style="cursor:pointer;">
                <p>已报名</p>
                <p>{{showData.event_user?showData.event_user.length: 0}}</p>
            </div>
        </lj-dialog>

        <lj-dialog
                :visible="person_visible"
                :size="{width: 900 + 'px' ,height: 500 + 'px'}"
                @close="person_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>报名状态</h3>
                </div>
                <div class="dialog_main all-birthday">
                    <h5>已报名人员</h5>
                    <div>
                        <div class="all-birthday-list" v-for="(item,index) in allPerson">
                            <div class="all-birthday-info">
                                <img src="../../../../assets/image/newMedia/theme1/active.png" alt="">
                                <div class="" style="text-align: left">
                                    <p style="font-weight: bold">赵丽颖</p>
                                    <p>南京二区一组</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                params: {//查询参数
                    search: '',
                    offset: 1,
                    limit: 6,
                },
                allPerson:[
                    {title:1},
                    {title:1},
                    {title:1},
                    {title:1},
                    {title:1},
                    {title:1},
                    {title:1},

                ],

                count:0,
                showFinMenuList: false,
                showModal:false,
                person_visible:false,
                showData:{},
                clubData:[],
                look_visible:false,//详情
            }
        },
        mounted(){
          this.getDataLists()
        },
        methods:{
            callbackSuccess(res) {//回调
                if (res.status === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.getDataLists();
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                }
            },
            getDataLists(){//列表
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event',this.params).then(res => {
                    if(res.status===200){
                        this.clubData = res.data.data.sort(
                                function (a, b) {
                                return Date.parse(b.created_at) - Date.parse(a.created_at) 
                                }
                            );
                        this.count = res.data.total;
                    }
                })
            },
            handleChangePage(page) {//分页
                this.params.offset = page;
                this.getDataLists();
            },
            openReport(item){//报名弹窗
                this.look_visible = true;
                this.showData=item
                this.$http.get(globalConfig.newMedia_sever + '/api/club/event/' + item.id).then(res => {
                    this.getDataLists()
                })
            },
            confirmReport(id){//报名
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event/create',{event_id:id}).then(res => {
                   this.callbackSuccess(res);
                   this.look_visible = false;
                })
            },
            getReportedUsers(){//获取参加活动的所有用户列表
                this.person_visible=true;
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event/user/'+this.showData.id,).then(res => {
                    if(res.status===200){
                        // this.allPerson = res.data.data;
                    }
                })
            },





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
        .all-birthday{
            h5{
                width: 120px;
                height: 30px;
                @include clubImg('theme1','weiyuedu.png');
                color: #ffffff;
                line-height: 30px;
                text-align: center;
                /*margin-top: 20px;*/
                margin-bottom: 20px;
            }
        }


    }


</style>
