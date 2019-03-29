<template>
    <div id="videoLearning">
        <div class="video-lists">
            <div class="video-list-info" v-for="(item,index) in videoData">
                <div class="video-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="video-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i @click.stop="edit_visible = true">编辑</i><i @click.stop="delete_visible = true">删除</i></span>
                    </div>
                    <div class="video-box-middle">
                        <div class="video-border"></div>
                        <div class="video-inner">
                            <div>
                                <span class="video-start-btn"></span>
                                <video src="" poster="../../../assets/image/newMedia/theme1/active.png"></video>
                            </div>
                        </div>
                    </div>
                    <div class="video-box-bottom justify-bet">
                        <span>收房时注意十件事</span>
                        <span>08:08</span>
                        <span><i class="view"></i><i>555</i></span>
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
                        :total="videoCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>

        <!--删除视频-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除这条视频吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--编辑视频-->
        <lj-dialog :visible="edit_visible" :size="{width: 400 + 'px',height: 330 + 'px'}"
                   @close="edit_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>编辑视频</h3>
                </div>
                <div class="dialog_main">
                    <el-form ref="form" :model="form" label-width="80px"  size="small">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="可见岗位">
                            <el-input v-model="form.name" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="edit_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>


    </div>
</template>

<script>
    import {leJiaCollegeMenu} from '../../../assets/js/allModuleList.js';
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "videoLearning",
        components:{
            LjDialog,
        },
        data(){
            return{
                leJiaCollegeMenu,
                videoCount:0,
                showFinMenuList:false,
                is_show:true,
                delete_visible:false,
                edit_visible:false,
                chooseTab:3,
                current:'',
                form:{
                    name:''
                },
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                videoData:[
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },
                    {
                        avatar:'',
                        time:'',
                        view:232
                    },

                ],
            }
        },
        mounted(){

        },
        methods:{
            //换页
            handleOkDel(){

            },

            handleChangePage(page) {
                this.params.page = page;
                // this.getLordList();
            },
            onMousteIn: function (index) {
                this.is_show = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.is_show = false; //鼠标移出隐藏
                this.current = null;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/videoLearning/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1 {
        #videoLearning{
            .video-lists{
                .video-list-info{
                    .video-box{

                        .video-box-top{
                            span{
                                i{
                                    &:hover{
                                        @include leJiaCollegeImg('theme1','huidi2.png');
                                    }
                                }
                            }
                        }
                        .video-box-middle{
                            &:hover{
                               +div{
                                   span{
                                       color:#CF2E33
                                   }
                               }
                            }
                            .video-border{
                                @include leJiaCollegeImg('theme1','video-border-grey.png');
                                &:hover{
                                    @include leJiaCollegeImg('theme1','video-border-red.png');
                                    +div{
                                        div{
                                            span{
                                                @include leJiaCollegeImg('theme1','hover-red.png');
                                            }
                                        }
                                    }

                                }
                            }
                            .video-inner{
                                div{
                                    span{
                                        @include leJiaCollegeImg('theme1','defalut-grey.png');
                                    }


                                }
                            }


                        }
                        .video-box-bottom{
                            span:nth-child(3){
                                .view{
                                    @include leJiaCollegeImg('theme1','ico_yueduliang.png');

                                }
                            }
                        }

                    }
                }
            }


        }

    }

</style>