<template>
    <div id="videoLearning">
        <div class="video-lists">
            <div class="video-list-info" v-for="(item,index) in dataLists">
                <div class="video-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="video-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i @click.stop="edit(item.id,index)">编辑</i><i @click.stop="del(item.id,index)">删除</i></span>
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
                        <span>{{item.title}}</span>
                        <span>{{item.time}}</span>
                        <span><i class="view"></i><i>{{item.view}}</i></span>
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
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--编辑视频or新增视频-->
        <lj-dialog :visible="visible" :size="{width: 400 + 'px',height: flag===1 ? 330:400 + 'px'}"
                   @close="visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{flag===1?'编辑视频':'新增视频'}}</h3>
                </div>
                <div class="dialog_main">
                    <el-form ref="form" :model="form" label-width="80px"  size="small">
                        <el-form-item label="视频名称">
                            <el-input v-model="form.title" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="可见岗位">
                            <el-input v-model="form.department" size="small"></el-input>
                        </el-form-item>

                        <el-form-item label="上传视频"  v-if="flag===2">
                            <el-input v-model="form.department" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="visible = false;current_id = ''">取消</el-button>
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
                count:0,
                flag:1,
                showFinMenuList:false,
                is_show:true,
                delete_visible:false,
                visible:false,
                chooseTab:3,
                current:'',
                current_id:'',
                form:{
                    title:'',
                    id:'',
                    department:''


                },
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                dataLists:[
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'

                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'

                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'

                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'
                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'
                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'
                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'
                    },
                    {
                        id:1,
                        avatar:'',
                        time:'08:08',
                        view:232,
                        title:'可见的房屋信息哈哈',
                        department:'行政岗位'
                    },

                ],
            }
        },
        mounted(){
            this.getDataLists();
        },
        created(){
            this.$bus.on('add',this.getVal)
        },
        beforeDestroy(){
            this.$bus.off('add',this.getVal);
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
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getDataLists();
            },
            //获取bus传值
            getVal(val){
                this.visible = val;//新增弹窗显示
                this.flag = 2;
                console.log(Object.keys(this.form));
                for(let item of Object.keys(this.form)){
                    this.form[item] = '';
                }
            },
            //编辑弹出
            edit(id,index){
                this.visible = true;
                this.flag = 1;
                this.current_id = id;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }

            },
            //提交
            submit(){
                this.$http.post('', this.form).then(res => {
                    this.callbackSuccess(res)
                })
            },

            //删除弹出
            del(id,index){
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk(){
                this.$http.delete('', this.current_id).then(res => {
                    this.callbackSuccess(res)
                })
            },
            //获取列表
            getDataLists(){
                this.$http.get('', this.params).then(res => {
                    if(res.code===200){
                        this.dataLists  = res.data.data;
                    }
                })
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