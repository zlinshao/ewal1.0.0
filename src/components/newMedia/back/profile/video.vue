<template>
    <div id="profile_video_back">
        <div class="mainList scroll_bar">
            <div class="video-lists">
                <div class="video-list-info flex-center" v-for="(item,index) in dataLists">
                    <div class="video-box">
                        <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)" @click="openDetail(item.file_info)">
                            <img-slider :arr="item.file_info" :initialSpeed="0"></img-slider>
                            <!--<div class="video-modal"  v-if="seen&&index===current"></div>-->
                        </div>
                        <div class="video-box-bottom">
                            <div class="title">{{item.name}}</div>
                            <div class="flex-center justify-bet">
                                <span class="time">{{item.created_at}}</span>
                                <span class="btn">
                                    <i @click="edit(item.id,index)"></i>
                                    <i @click="del(item.id,index)"></i>
                                </span>
                            </div>
                        </div>
                        <!--<lj-upload size="40" disabled="disabled" :data="item.file_info" v-if="is_open_slider===true"></lj-upload>-->
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
                   @close="closeStatus">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{is_add===false?'编辑资料':'新增资料'}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form  label-width="80px" :rules="rules">

                        <el-form-item label="资料类型" prop="type_id">
                            <el-select placeholder="请选择" v-model="form.type_id">
                                <el-option  v-for="(item,index) in selects" :label="item.title" :value="item.id" :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="资料名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="查看权限" prop="permission">
                            <el-input v-model="permissionNames" @focus="organSearch"></el-input>
                        </el-form-item>
                        <el-form-item label="添加附件" prop="file_info">
                            <!--<lj-upload size="40" disabled="disabled" :data="form.file_info"></lj-upload>-->
                            <lj-upload v-model="form.file_info" size="40"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit(is_add)">确定</el-button>
                    <el-button type="info" size="small" @click="cancelStatus">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <PostOrgan :module="postModule" :organData="organData" @close="hiddenOrgan"></PostOrgan>

        <!--<img-slider :arr="file_info" :initialSpeed="0" v-if="is_open_slider===true"></img-slider>-->



    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    // import Upload from '../../../common/upload.vue';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';

    import LjUpload from '../../../common/lightweightComponents/lj-upload';
    import PostOrgan from '../../../../components/common/postOrgan.vue';



    export default {
        props:['add_status'],
        name: "backVideo",
        components: {
            mediaList,
            LjDialog,
            // Upload,
            LjUpload,
            ImgSlider,
            PostOrgan
        },
        data(){
            return{
                file_info:[],//附件信息
                is_open_slider:false,
                showFinMenuList:false,
                delete_visible:false,
                edit_visible:false,
                postModule:false,
                organData: {},// 组织架构配置 选择数量 num
                chooseTab: 1,
                is_add:false,
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
                    limit: 6,
                    department_ids: '',
                    export: '',
                    type_id:1,
                },
                dataLists:[],
                permissionNames:'',
                form:{
                    type_id:1,
                    name:'',
                    permission:[1,2],
                    file_info:[],
                    attachment:[],

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
                }


            }
        },
        watch:{
            add_status:{
                handler(val){
                    if(val===true){
                        this.edit_visible=true;
                       for(let item of Object.keys(this.form)){
                           this.form[item]= '';
                       }
                        this.is_add=true;
                       this.form.permission=[1,2];
                    }
                }
            }
        },
        mounted(){
          this.getDataLists();
        },
        methods:{
            openDetail(val){
              this.file_info = val;
              this.is_open_slider=true;
            },
            organSearch() {
                this.postModule = true;
            },
            // 关闭 选择人员
            hiddenOrgan(ids, names, arr) {
                this.postModule = false;
                if (ids !== 'close') {
                    this.form.permission = ids;
                    console.log(this.form.permission);
                    this.permissionNames = names;
                }
            },
            closeStatus(){
              this.edit_visible=false;
              this.is_add=false;
              this.$emit('getAddStatus',this.is_add);
            },
            cancelStatus(){
                this.edit_visible = false;
                this.current_id = '';
                this.is_add=false ;
                this.$emit('getAddStatus',this.is_add);
            },

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
            callbackSuccess(res){
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
            //获取列表
            getDataLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/datum/admin', this.params).then(res => {
                    if (res.status === 200) {
                        this.dataLists  = res.data.data;
                        console.log(this.dataLists);
                    }
                })

            },
            //编辑弹出
            edit(id,index){
                this.edit_visible = true;
                this.current_id = id;
                this.is_add=false;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }

            },
            //删除弹窗
            del(id,index){
                this.delete_visible = true;
                this.current_id = id;
            },
            //编辑提交
            submit(type){
                if(type===true){
                    this.$http.post(globalConfig.newMedia_sever+'/api/datum/admin',this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                }else{
                    this.$http.put(globalConfig.newMedia_sever+'/api/datum/admin/'+this.current_id,this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                }


            },
            //确认删除
            delOk(){
                alert(this.current_id);
                this.$http.delete(globalConfig.newMedia_sever+'/api/datum/admin/'+this.current_id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                })
            },


            //上传回调
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.form.file_info = item[1];
                    console.log(this.form.file_info);
                }

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
        .window{
            .video-container .play-container{
                width: 480px!important;
                height: 300px!important;
            }
        }
    }

</style>