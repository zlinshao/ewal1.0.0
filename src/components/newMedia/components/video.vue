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
                <div class="icons add" @click="add_action_visible = true"><b>+</b></div>
            </div>
        </div>
        <!--video-->
        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="chooseTab === 1">
            <div class="video-lists">
                <div class="video-lists-info flex-center" v-for="(item,index) in videoData" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="video-box">
                        <div class="video-top">
                            <div><video src="" poster="../../../assets/image/newMedia/theme1/active.png"></video></div>
                            <div></div>
                            <div v-if="seen&&index===current"></div>
                        </div>
                        <div class="video-bottom">
                            <p>{{item.title}}</p>
                            <p>{{item.time}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!--file-->
        <div v-if="chooseTab === 2" class="mainList">
            <div class="document-lists">
                <div class="document-lists-info flex-center">
                    暂无数据
                </div>
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
                                    <el-input></el-input>
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
                                    <el-input></el-input>
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
                    <el-button type="danger" size="small">确定</el-button>
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
        data() {
            return {
                showFinMenuList: false,
                delete_visible: false,
                edit_visible: false,
                chooseTab: 1,
                seen:true,//模态是否可见
                current:'',

                selects: [
                    {id: 1, title: "视频"}, {id: 2, title: "文档"}
                ],
                videoData: [//视频列表
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019.01.12 13:14',
                        id: 1
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 2
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 3
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 4
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 5
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 6
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 7
                    },
                    {
                        poster: '',
                        title: '天下掉个林妹妹',
                        time: '2019-01-10',
                        id: 8
                    },
                ],
            }
        },
        watch:{
            '$route':'getPath'
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            },
            //获取路由参数
            getPath(){
                console.log(this.$route.query.type);
                this.chooseTab = this.$route.query.type;
            },
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
                console.log(index,this.seen)
            },
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
                console.log(index,this.seen)
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

    #theme_name.theme1 {
        #profile_video {
            .mainList {
                .video-lists {
                    .video-lists-info {
                        .video-box {
                            .video-top {

                                div:nth-child(2) {
                                    @include profile_video('theme1', 'defalut-grey.png');

                                }
                                &:hover{
                                    div:nth-child(2){
                                        @include profile_video('theme1', 'start.png')
                                    }

                                }

                            }
                            .video-bottom {
                                p:first-child{
                                }
                                p:last-child{
                                }

                            }
                        }
                    }
                }


            }

        }
    }

</style>