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
                    <div class="club-box"  @click="handleClubDetail(item.is_enter,item.id,index)">
                        <div class="club-box-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt=""></div>
                        <div class="club-box-middle">
                            <div>
                                <p>{{item.name}}</p>
                                <p><span>{{item.created_at}}</span></p>
                            </div>
                            <div>
                                <span class="" :class="item.status===1?'end':'active'">{{item.status===1?'已结束':'进行中'}}</span>
                            </div>
                        </div>
                        <div class="club-box-bottom">
                            <span><i></i>{{item.day}}</span>
                            <span><i :class="item.status===1?'post':'unPost'"  @click="look_visible = true;clubStatus=item.status">{{item.status===1?'已报名':'我要报名'}}</i><i></i>{{item.click}}</span>
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
                        <p><span>活动名称</span><span>{{showData.name}}</span></p>
                        <p><span>活动时间</span><span>{{showData.start_time}}-{{showData.over_time}}</span></p>
                        <p><span>活动地点</span><span>{{showData.address}}</span></p>
                        <p><span>活动内容</span><span>{{showData.content}}</span></p>
                        <!--<p v-for="item in clubDetail">-->
                            <!--<span>{{item.name}}</span>-->
                            <!--<span>{{item.content}}</span>-->
                        <!--</p>-->
                    </div>
                </div>
                <div class="dialog_footer" v-show="clubStatus===2">
                    <el-button type="danger" size="small" @click="">我要报名</el-button>
                    <el-button type="info" size="small" @click="look_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>

            <div class="dengLong">
                <p>已报名</p>
                <p>{{showData.click}}</p>
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
                // clubDetail:[
                //     {title:'活动名称',content:''},
                //     {title:'活动时间',content:''},
                //     {title:'活动地点',content:''},
                //     {title:'活动内容',content:''},
                // ],
                showFinMenuList: false,
                showModal:false,
                showData:{
                    name:'',
                    start_time:'',
                    over_time:'',
                    address:'',
                    content:'',
                },
                current_id:'',
                clubData:[],
                look_visible:false,//详情
                end_visible:false,//结束
                add_visible:false,//新增
            }
        },
        mounted(){
          this.getDataLists()
        },
        methods:{
            callbackSuccess(res) {
                if (res.code === 200) {
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
            handleClubDetail(status,id,index){
                this.clubStatus = status;
                this.look_visible= true;
                this.current_id = id;
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event/'+id,).then(res => {
                    if(res.status===200){
                        this.showData = res.data.data[index];
                        console.log(res)
                    }

                })
            },
            getDataLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event',this.params).then(res => {
                    if(res.status===200){
                        this.clubData = res.data.data;
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


    }


</style>
