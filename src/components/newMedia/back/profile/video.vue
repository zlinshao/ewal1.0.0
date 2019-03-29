<template>
    <div id="profile_video_back">
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
            <div class="items-center listTopRight">
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
            </div>
        </div>
        <div class="mainList scroll_bar" v-if="chooseTab===1">
            <div class="video-lists">
                <div class="video-list-info flex-center" v-for="(item,index) in videoData">
                    <div class="video-box">
                        <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                            <video  poster="../../../../assets/image/newMedia/theme1/active.png">
                                    <source src="" type="video/ogg">你的浏览器不支持video
                            </video>
                            <div class="video-start-icon"></div>
                            <div class="video-modal"  v-if="seen&&index===current"></div>
                        </div>
                        <div class="video-box-bottom">
                            <div class="title">{{item.title}}</div>
                            <div class="flex-center justify-bet">
                                <span class="time">{{item.time}}</span>
                                <span class="btn"><i @click="edit_visible = true"></i><i @click="delete_visible = true"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="chooseTab===2">

        </div>


        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>

        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除文件吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增资料</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>资料类型</span>
                                </div>
                                <div class="item_content">
                                    <!--<el-input ></el-input>-->
                                    <el-select placeholder="请选择">
                                        <el-option label="视频"></el-option>
                                        <el-option label="文档"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>资料名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>查看权限</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>添加附件</span>
                                </div>
                                <div class="item_content">
                                    <span class="uploadFile">+</span>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" >确定</el-button>
                    <el-button type="info" size="small" @click="add_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>

</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "videoFile",
        components: {
            mediaList,
            LjDialog,
        },
        data(){
            return{
                showFinMenuList:false,
                delete_visible:false,
                edit_visible:false,
                add_visible:false,
                chooseTab: 1,
                current: '',//当前
                seen: false,//显隐
                selects:[
                    {id:1,title:"视频"},{id:2,title:"文档"}
                ],
                videoData:[//视频列表
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },
                    {
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14'
                    },

                ],
            }
        },
        methods:{
            changeTabs(id) {
                this.chooseTab = id;
            },
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/profile/video.scss";
    @mixin profile_video($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #profile_video_back {
            .video-lists {
                .video-list-info {
                    .video-box {
                        .video-box-top {
                            video{
                            }
                            .video-start-icon {
                                @include profile_video('theme1','start.png')
                            }
                            .video-modal {
                            }
                        }

                        .video-box-bottom {
                            .title{
                            }
                            .time{

                            }
                            .btn{
                                i{
                                }
                                i:nth-child(1){
                                    @include profile_video('theme1','bianji.png')
                                }
                                i:nth-child(2){
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