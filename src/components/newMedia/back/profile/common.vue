<template>
    <div id="common">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
            </div>
        </div>

        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>

        <!--新增-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增资料</h3>
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
                    <el-button type="info" size="small" @click="add_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>


    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import Upload from '../../../common/upload.vue';
    import BackVideo from './video.vue';
    import BackDocument from './file.vue';
    export default {
        name: "common",
        components:{
            mediaList,
            LjDialog,
            Upload,
            BackDocument,
            BackVideo,
        },
        data(){
            return{
                chooseTab:1,
                showFinMenuList:false,
                add_visible:false,
                selects:[
                    {id:1,title:"视频",url:'BackVideo'},{id:2,title:"文档",url:'BackDocument'}
                ],
                tabView:'BackVideo',
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
        watch:{
            '$route':'getPath',
        },

        methods:{
            getPath(){
                console.log(this.$route.query.url);
                this.tabView = this.$route.query.url;
                this.chooseTab = this.$route.query.type;
            },
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
            //上传回调
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.upload_form[item[0]] = item[1];
                }
                console.log(item);
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
        }
    }
</script>

<style scoped>

</style>