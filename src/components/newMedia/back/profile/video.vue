<template>
    <div id="profile_video_back">
        <div class="mainList scroll_bar">
            <div class="video-lists">
                <div class="video-list-info flex-center" v-for="(item,index) in dataLists">
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
                                <span class="btn">
                                    <i @click="edit(item.id,index)"></i>
                                    <i @click="del(item.id,index)"></i>
                                </span>
                            </div>
                        </div>
                    </div>
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
                    <div class="unUse-txt">确定删除文件吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--编辑-->
        <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="edit_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>编辑资料</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" label-width="80px" :rules="rules">

                        <el-form-item label="资料类型" prop="type">
                            <el-select placeholder="请选择" v-model="form.type">
                                <el-option label="视频" value=1></el-option>
                                <el-option label="文档" value=2></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="资料名称" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>

                        <el-form-item label="查看权限" prop="permission">
                            <el-input v-model="form.permission"></el-input>
                        </el-form-item>
                        <el-form-item label="添加附件" prop="permission">
                            <Upload :file="uploadFile" @success="handleSuccessUpload"></Upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="edit_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import Upload from '../../../common/upload.vue';

    export default {
        name: "backVideo",
        components: {
            mediaList,
            LjDialog,
            Upload
        },
        data(){
            return{
                showFinMenuList:false,
                delete_visible:false,
                edit_visible:false,
                chooseTab: 1,
                current: '',//当前
                current_id:'',
                seen: false,//显隐
                selects:[
                    {id:1,title:"视频"},{id:2,title:"文档"}
                ],
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                dataLists:[//视频列表
                    {
                        id:1,
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14',
                        type:1,
                        permission:11,
                    },
                    {
                        id:2,
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14',
                        type:1,
                        permission:11,
                    },
                    {
                        id:3,
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14',
                        type:1,
                        permission:11,
                    },
                    {
                        id:4,
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14',
                        type:1,
                        permission:11,
                    },
                    {
                        id:5,
                        video:'',
                        title:'乐伽大学培训视频',
                        time:'2019.01.12 13:14',
                        type:1,
                        permission:11,
                    },

                ],
                form:{
                    type:'',
                    title:'',
                    permission:''
                },
                //上传
                // upload_visible: false,
                uploadFile: {
                    keyName: 'album',
                    setFile: [],
                    size: {
                        width: '50px',
                        height: '50px'
                    }
                },
                upload_form: {
                    album: [],
                    album_file: [],
                }, //所有上传文件
                rules:{
                    type:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    title:[
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ],
                    permission:[
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ],
                }


            }
        },
        mounted(){
          this.getDataLists()
        },
        methods:{
            //tab切换
            changeTabs(id) {
                this.chooseTab = id;
            },
            //移入
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            //移出
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            //获取列表
            getDataLists(){
                this.$http.get('', this.params).then(res => {
                    if (res.code === 200) {
                        this.dataLists  = res.data.data;
                    }
                })
            },
            //编辑弹出
            edit(id,index){
                this.edit_visible = true;
                this.current_id = id;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }

            },
            //删除弹窗
            del(id,index){
                this.delete_visible = true;
                this.current_id = id;
            },
            //提交
            submit(){
                console.log(this.form);
                this.$http.post('',{
                    album: this.upload_form.album,
                    ...this.form
                }).then(res => {

                })
            },
            //确认删除
            delOk(){

            },


            //上传回调
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.upload_form[item[0]] = item[1];
                }
                console.log(item);
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