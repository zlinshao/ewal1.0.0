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
                <div class="icons add" @click="add_action_visible = true"><b>+</b></div>
            </div>
        </div>


        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="list">
                <div class="list-info flex-center" v-for="(item,index) in clubData">
                    <div class="list-box"  @click="look_visible = true">
                        <div class="list-modal" v-if="item.status ===1"></div>
                        <div class="list-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt=""></div>
                        <div class="list-middle">
                            <div class="list-middle-info">
                                <div class="list-middle-left">
                                    <span>{{item.title}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                                <div class="list-middle-right" :class="item.status ===1 ? 'end':'process'">
                                    <span>{{item.status ===1 ? '已结束':'进行中'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="list-bottom">
                            <div class="list-bottom-info justify-bet">
                                <span><i></i><span>{{item.day}}</span></span>
                                <span><i></i><span>{{item.view}}</span></span>
                            </div>
                        </div>
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


        <!--确认结束-->
        <lj-dialog :visible="end_action_visible" :size="{width: 500 + 'px',height: 250 + 'px'}"
                   @close="end_action_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>结束活动</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">该活动暂未到结束时间，确定提前结束吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="end_action_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增-->
        <lj-dialog
                :visible="add_action_visible"
                :size="{width: 900 + 'px' ,height: 560 + 'px'}"
                @close="add_action_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增活动</h3>
                </div>
                <div class="dialog_main">
                    <el-form  size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="comment"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            v-model="action_time"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动地点</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="comment"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container" style="align-items: flex-start">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>评论内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
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
                action_time:'',
                showFinMenuList: false,
                end_action_visible:false,//结束活动
                add_action_visible:false,//新增活动
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
                        img:'',
                        title:'第三届乐伽羽毛球大赛火热报名中',
                        time:'2018.02.12-2018.04.12',
                        status:2,
                        day:8,
                        view:333
                    },
                    {
                        img:'',
                        title:'第三届乐伽羽毛球大赛火热报名中',
                        time:'2018.02.12-2018.04.12',
                        status:1,
                        day:8,
                        view:333
                    },
                    {
                        img:'',
                        title:'第三届乐伽羽毛球大赛火热报名中',
                        time:'2018.02.12-2018.04.12',
                        status:1,
                        day:8,
                        view:333
                    },
                    {
                        img:'',
                        title:'第三届乐伽羽毛球大赛火热报名中',
                        time:'2018.02.12-2018.04.12',
                        status:2,
                        day:8,
                        view:333
                    },
                    {
                        img:'',
                        title:'第三届乐伽羽毛球大赛火热报名中',
                        time:'2018.02.12-2018.04.12',
                        status:2,
                        day:8,
                        view:333
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
    @import "../../../../assets/scss/newMedia/back/club/index.scss";
    @mixin clubImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #club{
            .mainList{
                .list {
                    .list-info {
                        .list-box {
                            .list-top {
                                img {
                                }
                            }
                            .list-middle {
                                .list-middle-info{
                                    .list-middle-left {
                                        span:nth-child(1){
                                        }
                                        span:nth-child(2){
                                        }
                                    }
                                    .list-middle-right{
                                        span{
                                        }
                                    }
                                    .end{
                                        @include clubImg('theme1','status_right_icon2.png')
                                    }
                                    .process{
                                        @include clubImg('theme1','status_right_icon1.png')
                                    }
                                }
                            }
                            .list-bottom{
                                .list-bottom-info{
                                    span{
                                        i{

                                        }
                                    }
                                    span:nth-child(1) i{
                                        @include clubImg('theme1','shijian.png')
                                    }
                                    span:nth-child(2) i{
                                        @include clubImg('theme1','ico_yueduliang.png')
                                    }
                                }
                            }
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
