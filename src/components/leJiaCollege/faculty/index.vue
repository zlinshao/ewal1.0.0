<template>
    <div id="faculty">
        <div class="faculty-lists">
            <div class="faculty-list-info flex-center" v-for="(item,index) in facultyData">
                <div class="faculty-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)" @click.stop="detail_visible = true">
                    <div class="faculty-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i @click.stop="edit_faculty = true">编辑</i><i @click.stop="delete_visible = true">删除</i></span>
                    </div>
                    <div class="faculty-box-middle">
                        <div>
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                        </div>
                    </div>
                    <div class="faculty-box-bottom">
                        <span>启发内</span>
                        <span>一句话概括讲师的优秀</span>
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
                        :total="facultyCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>


        <!--编辑导师-->
        <lj-dialog :visible="edit_faculty" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="edit_faculty = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>编辑讲师详情</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>讲师头像</span>
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
                                    <span>讲师姓名</span>
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
                                    <span>点评摘要</span>
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
                                    <span>讲师介绍</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" :rows="4"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" >确定</el-button>
                    <el-button type="info" size="small" @click="edit_faculty = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--讲师详情-->
        <lj-dialog :visible="detail_visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
                   @close="detail_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>讲师详情</h3>
                </div>
                <div class="dialog_main">
                    <div class="detail-info">
                        <div class="top">
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <span>齐达内</span>
                            <span>一句话概括讲师的优秀</span>
                        </div>
                        <div class="content scroll_bar">
                            <span>一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀</span>
                        </div>
                    </div>


                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="detail_visible = false;current_row = ''">关闭</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--删除讲师-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该讲师吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>

<script>
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "faculty",
        components:{
            LjDialog,
        },
        data(){
            return{
                facultyCount:0,
                is_show:true,
                edit_faculty:false,
                detail_visible:false,
                delete_visible:false,
                current:'',
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                facultyData:[
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
        methods:{
            //换页
            handleChangePage(page) {
                this.params.page = page;
                // this.getLordList();
            },
            handleOkDel(){

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
    @import "../../../assets/scss/leJiaCollege/faculty/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1 {
        #faculty{
            .faculty-lists{
                .faculty-list-info{
                    .faculty-box{

                        .faculty-box-top{
                            span{
                                i{
                                    &:hover{
                                        @include leJiaCollegeImg('theme1','huidi2.png');
                                    }
                                }
                            }
                        }
                        .faculty-box-middle{
                            >div{

                            };
                            @include leJiaCollegeImg('theme1','faculty-grey.png');
                            &:hover{
                                @include leJiaCollegeImg('theme1','faculty-red.png');
                            }


                        }
                        .faculty-box-bottom{
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