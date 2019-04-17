<template>
    <div id="videoLearning">
        <div class="video-lists">
            <div class="video-list-info" v-for="(item,index) in dataLists">
                <div class="video-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)"
                     @click.stop="detail(item)">
                    <div class="video-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i @click.stop="edit(item)">编辑</i><i
                                @click.stop="del(item)">删除</i></span>
                    </div>
                    <div class="video-box-middle">
                        <div class="video-border" style="pointer-events: none">
                            <div></div>
                        </div>
                        <div class="video-inner">
                            <div>
                                <img-slider :arr="item.file_id" :single="true"
                                            :size="{width:'100%',height:'100%'}"></img-slider>
                            </div>
                        </div>
                    </div>
                    <div class="video-box-bottom justify-bet">
                        <span>{{item.name}}</span>
                        <span>{{item.created_at}}</span>
                        <span><i class="view"></i><i>{{item.click}}</i></span>
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
                    <el-button type="info" size="small" @click="delete_visible = false;current_item = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--编辑视频or新增视频-->
        <lj-dialog :visible="visible" :size="{width: 400 + 'px',height: flag===1 ? 330:400 + 'px'}"
                   @close="visible = false">
            <div class="dialog_container borderNone">
                <div class="dialog_header">
                    <h3>{{flag===1?'编辑视频':flag===2?'新增视频':flag===3?'讲师详情':''}}</h3>
                </div>
                <div class="dialog_main">
                    <el-form ref="form" :model="form" label-width="80px" size="small">
                        <el-form-item label="视频名称">
                            <el-input v-model="form.name" size="small" :disabled="flag===3"></el-input>
                        </el-form-item>
                        <el-form-item label="可见岗位">
                            <el-input v-model="form.position_name" size="small" @focus="postModule=true"
                                      :disabled="flag===3"></el-input>
                        </el-form-item>

                        <el-form-item label="上传视频" v-if="flag===2||flag===1">
                            <lj-upload v-model="form.file_info" size="40"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                        <el-form-item label="视频附件" v-if="flag===3">
                            <lj-upload :data="form.file_info" size="40" disabled="disabled"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" v-if="flag===1||flag===2" size="small" @click="submit(flag)">确定</el-button>
                    <el-button type="info" v-if="flag===1||flag===2" size="small"
                               @click="visible = false;current_id = ''">取消
                    </el-button>
                    <el-button type="danger" v-if="flag===3" size="small" @click="visible = false;current_item = ''">关闭
                    </el-button>
                </div>
            </div>
        </lj-dialog>

        <PostOrgan :module="postModule" @close="hiddenPost"></PostOrgan>


    </div>
</template>

<script>
    import {leJiaCollegeMenu} from '../../../assets/js/allModuleList.js';
    import LjDialog from '../../common/lj-dialog.vue';
    import PostOrgan from '../../common/postOrgan.vue';
    import Upload from '../../common/upload';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
    import LjUpload from '../../common/lightweightComponents/lj-upload';

    export default {
        name: "videoLearning",
        components: {
            LjDialog,
            PostOrgan,
            Upload,
            LjUpload,
            ImgSlider
        },
        data() {
            return {
                leJiaCollegeMenu,
                count: 0,
                flag: 1,
                showFinMenuList: false,
                postModule: false,
                is_show: true,
                delete_visible: false,
                visible: false,
                chooseTab: 3,
                current: '',
                current_item: '',
                form: {
                    name: '',
                    file_info:[],//视频的七牛云文件数组
                    position: '',//岗位id数组
                    position_name:'',//岗位名称
                    file_id:'',//视频的七牛云文件id
                },
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                    all:1
                },
                dataLists: [],
            }
        },
        mounted() {
            this.getDataLists();
        },
        created() {
            this.$bus.on('add', this.getVal)
        },
        beforeDestroy() {
            this.$bus.off('add', this.getVal);
        },
        methods: {
            //详情
            detail(row) {
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
                this.current_item = row;
                this.flag = 3;
                this.visible = true;
                this.$http.get(globalConfig.leJiaCollege_server+'/api/video/study/'+this.current_item.id).then(res=>{
                    if(res.status===200){
                        let result = res.data;
                        let position_arr = result.position;
                        let file_arr = result.file_id;
                        let names = '';
                        let position_arr_ids = [];
                        let file_arr_ids=[];
                        for(let item of position_arr){//权限ids
                            names += item.name+'、';
                            position_arr_ids.push(item.id);
                        }
                        for(let item of file_arr){//文件ids
                            file_arr_ids.push(item.id)
                        }
                        this.form.position_name = names;
                        this.form.position = position_arr_ids;
                        this.form.file_id = file_arr_ids;
                        this.form.file_info = file_arr;
                        this.form.name = result.name;
                    }

                })

            },
            //获取岗位信息
            hiddenPost(ids, names, arr) {
                this.postModule = false;
                this.form.position = ids;
                this.form.position_name = names;
            },
            callbackSuccess(res) {
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
            //换页
            handleChangePage(page) {
                this.params.offset = page;
                this.getDataLists();
            },
            //新增弹窗
            getVal(val) {
                this.visible = val;
                this.current_item='';
                this.flag = 2;
                console.log(Object.keys(this.form));
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
            },
            //编辑弹出
            edit(row) {
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
                this.visible = true;
                this.flag = 1;
                this.current_item=row;
                this.$http.get(globalConfig.leJiaCollege_server+'/api/video/study/'+this.current_item.id).then(res=>{
                    if(res.status===200){
                        let result = res.data;
                        let position_arr = result.position;
                        let file_arr = result.file_id;
                        let names = '';
                        let position_arr_ids = [];
                        let file_arr_ids=[];
                        for(let item of position_arr){//权限ids
                            names += item.name+'、';
                            position_arr_ids.push(item.id);
                        }
                        for(let item of file_arr){//文件ids
                            file_arr_ids.push(item.id)
                        }
                        this.form.position_name = names;
                        this.form.position = position_arr_ids;
                        this.form.file_id = file_arr_ids;
                        this.form.file_info = file_arr;
                        this.form.name = result.name;
                    }

                })
            },
            //提交
            submit(type) {
                console.log(this.form.file_info[0]);
                let paramsForm={
                    name:this.form.name,
                    file_id:this.form.file_id[0],
                    position:this.form.position
                };
                if (type === 1) {
                    this.$http.put(globalConfig.leJiaCollege_server + '/api/video/study/' + this.current_item.id, paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';
                    })
                } else if (type === 2) {
                    this.$http.post(globalConfig.leJiaCollege_server + '/api/video/study', paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';
                    })
                }
            },

            //删除弹出
            del(row) {
                this.delete_visible = true;
                this.current_item = row;
            },
            //确认删除
            delOk() {
                this.$http.delete(globalConfig.leJiaCollege_server + '/api/video/study/' + this.current_item.id,).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_item = '';
                })
            },
            //获取列表
            getDataLists() {
                this.$http.get(globalConfig.leJiaCollege_server + '/api/video/study', this.params).then(res => {
                    if (res.status === 200) {
                        this.dataLists = res.data.data;
                        this.count = res.data.total;
                    } else {
                        this.dataLists = [];
                        this.count = 0;
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
        #videoLearning {
            .video-lists {
                .video-list-info {
                    .video-box {

                        .video-box-top {
                            span {
                                i {
                                    &:hover {
                                        @include leJiaCollegeImg('theme1', 'huidi2.png');
                                    }
                                }
                            }
                        }

                        .video-box-middle {
                            &:hover {
                                + div {
                                    span {
                                        color: #CF2E33
                                    }
                                }
                            }

                            .video-border {
                                >div{
                                    @include leJiaCollegeImg('theme1', 'video-border-grey.png');

                                    &:hover {
                                        @include leJiaCollegeImg('theme1', 'video-border-red.png');

                                        + div {
                                            div {
                                                span {
                                                    @include leJiaCollegeImg('theme1', 'hover-red.png');
                                                }
                                            }
                                        }

                                    }
                                }



                            }

                            .video-inner {
                                div {
                                    span {
                                        @include leJiaCollegeImg('theme1', 'defalut-grey.png');
                                    }


                                }
                            }


                        }

                        .video-box-bottom {
                            span:nth-child(3) {
                                .view {
                                    @include leJiaCollegeImg('theme1', 'ico_yueduliang.png');

                                }
                            }
                        }

                    }
                }
            }


        }

    }
</style>