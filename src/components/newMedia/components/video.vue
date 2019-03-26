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

            <div class="items-center listTopRight">
                <p class="status-icon" v-for="item in statusBar">
          <span style="margin-left: 16px"><i
                  :style="{'background-color':item.iconColor}"></i><span>{{item.iconText}}</span></span>
                </p>

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
                <div class="video_box">
                    <div class="video_poster"></div>
                    <div class="video_bottom">
                        <div class="video_title">乐伽大学培训视频</div>
                        <div class="video_tips justify-bet">
                            <span class="video_time">41414141414141</span>
                        </div>
                    </div>
                </div>
                <div class="video_box">
                    <div class="video_poster"></div>
                    <div class="video_bottom">
                        <div class="video_title">乐伽大学培训视频</div>
                        <div class="video_tips justify-bet">
                            <span class="video_time">41414141414141</span>
                        </div>
                    </div>
                </div>
                <div class="video_box">
                    <div class="video_poster"></div>
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
                gsgsdgdsgds
            </div>
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
                    <div class="unUse-txt">确定删除该文件吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--编辑-->
        <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="edit_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>编辑视频</h3>
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
                    <el-button type="info" size="small" @click="edit_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>
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
    @import "../../../assets/scss/newMedia/components/video.scss";
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
                                @include profile_video('theme1','start.png')
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