<template>
    <div id="birthday">
        <div class="birthday_info">
            <div class="today_birthday justify-center">
                <div class="today_birthday_list">
                    <div class="birthday_box flex-center" v-for="(item,index) in todayBirthday"
                         @click.stop="del(item.id,index)">
                        <div class="birthday_box_info">
                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="">
                                <span class="writingMode">{{item.depart}}</span>
                                <span class="writingMode">{{item.name}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!--删除寿星信息-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除这条寿星信息吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <lj-dialog :visible="visible" :size="{width: 400 + 'px',height: 340 + 'px'}"
                   @close="visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增寿星</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" v-model="form" label-width="80px">
                        <el-form-item label="寿星姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="寿星照片">
                            <Upload :file="uploadFile" @success="handleSuccessUpload"></Upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="visible = false;current_row = ''">取消
                    </el-button>
                </div>
            </div>
        </lj-dialog>
    </div>
</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    import Upload from '../../../../common/upload.vue';
    export default {
        name: "birthday",
        components:{
            LjDialog,
            Upload
        },
        props:['chooseTabType'],
        data(){
            return{
                delete_visible:false,
                visible:false,
                current_id:'',
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                todayBirthday: [
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                    {name: '齐达内', depart: '南京二区一组', avatar: "",id:1},
                ],
                form:{
                  name:'',

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
            }
        },
        mounted(){
          this.getDataLists()
        },
        watch:{
            chooseTabType:{
                handler(val){
                    if(val===3){
                        this.add_visible = true;
                    }
                },
                deep:true
            }
        },
        created(){
            this.$bus.on('add',this.getVal)
        },
        beforeDestroy(){
            this.$bus.off('add',this.getVal);
        },
        methods:{
            //获取bus传值
            getVal(val){
                this.visible = val;//新增弹窗显示
                // this.flag = 2;
                console.log(Object.keys(this.form));
                for(let item of Object.keys(this.form)){
                    this.form[item] = '';
                }
            },
            //删除弹框
            del(id,index){
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk(){

            },
            //获取列表
            getDataLists(){
                this.$http.get('', this.params).then(res => {
                    if(res.code===200){
                        this.todayBirthday  = res.data.data;
                    }
                })
            },
            //提交
            submit(){

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
    @import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/birthday.scss";
    @mixin starImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1{
        #birthday{
            .birthday_info {
                .today_birthday {
                    .today_birthday_title {
                        @include starImg('theme1', 'jinrishouxing.png');
                    }

                    .today_birthday_list {
                        .birthday_list_info {
                            .birthday_avatar {
                                @include starImg('theme1', 'staff.png');

                                .common:before {
                                    @include starImg('theme1', 'staff.png');
                                }
                            }
                        }
                    }
                }
            ;

                .months_birthday {
                }
            ;

                .switch_icon_box {
                    span {
                        @include starImg('theme1', 'more.png');
                    }
                }
            }
        }
    }
</style>