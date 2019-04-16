<template>
    <div id="companyProfile">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
            </div>
        </div>
        <div class="mainList flex-center">
            <div class="menu_images flex-center justify-bet">
                <div v-for="(item,index) in profileType" class="menu_img_type flex-center"  @click="routerLink(item.url,{url:item.url,type:item.type})" :key="index">
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--新增-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增资料</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px" :rules="rules">

                        <el-form-item label="资料类型" prop="type_id">
                            <el-select placeholder="请选择" v-model="form.type_id">
                                <el-option label="视频" value=1></el-option>
                                <el-option label="文档" value=2></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="资料名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入"></el-input>
                        </el-form-item>

                        <el-form-item label="查看权限" prop="permissionNames">
                            <el-input @focus="organSearch"  v-model="permissionNames" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="添加附件">
                            <!--<Upload :file="uploadFile" @success="handleSuccessUpload"></Upload>-->
                            <lj-upload v-model="form.attachment" size="40"
                                       style="position: absolute; top: -12px;" :data="form.file_info"></lj-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="add_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <PostOrgan :module="postModule" :organData="organData" @close="hiddenOrgan"></PostOrgan>

    </div>


</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import Upload from '../../../common/upload.vue';
    import PostOrgan from '../../../../components/common/postOrgan.vue';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';


    export default {
        name: "index",
        components: {
            mediaList,
            LjDialog,
            Upload,
            PostOrgan,
            ImgSlider
        },
        data() {
            return {
                postModule:false,
                organData: {},// 组织架构配置 选择数量 num
                organKey: '',
                profileType:[
                    {url: 'backVideo', title: '视频',type:1},
                    {url: 'BackDocument', title: '文档',type:2},
                ],
                showFinMenuList: false,
                add_visible:false,//新增
                form:{
                    type_id:'',
                    name:'',
                    permission:[],//查看权限
                    file_info:[],
                },
                permissionNames:'',
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
            "$route.path":function (to,from) {
                console.log(to)
            },
            postModule:{
                handler(val){

                },
                deep:true
            }
        },
        mounted(){
          this.getFiletype()
        },
        methods:{

            // 组织架构筛选
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
            //上传回调
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.upload_form[item[0]] = item[1];
                    this.form.file_info = item[1];
                }
                console.log(item);
            },
            //新增资料
            submit(){
                console.log(this.form);
                this.$http.post(globalConfig.newMedia_sever+'/api/datum/admin',{
                    album: this.upload_form.album,
                    ...this.form
                }).then(res => {
                    this.postModule = false;
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        console.log(this.postModule)
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            },
            getFiletype(){
                this.$http.get(globalConfig.newMedia_sever+'/api/datum/file_type',{

                }).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/profile/index.scss";
    @mixin companyProfileImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #companyProfile{
            >div{

            }
            .menu_images{
                .menu_img_type{
                    @include companyProfileImg('theme1','zhongguojie2.png');
                    span{

                    }
                    &:hover{
                        @include companyProfileImg('theme1','zhongguoje.png');
                    }
                }
            }


        }

    }


</style>
