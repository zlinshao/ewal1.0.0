<template>
    <div id="faculty">
        <div class="faculty-lists">
            <div class="faculty-list-info flex-center" v-for="(item,index) in dataLists">
                <div class="faculty-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)"
                     @click.stop="detail(item.id,index)">
                    <div class="faculty-box-top justify-end items-bet" v-show="seen&&index===current">
                        <span><i @click.stop="edit(item.id,index)">编辑</i><i
                                @click.stop="del(item.id,index)">删除</i></span>
                    </div>
                    <div class="faculty-box-middle">
                        <div>
                            <img :src="item.user_id.avatar" alt="">
                        </div>
                    </div>
                    <div class="faculty-box-bottom">
                        <span>{{item.user_id.name}}</span>
                        <span>{{item.desc}}</span>
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


        <!--编辑导师-->
        <lj-dialog :visible="visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
                   @close="visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{flag===1?'编辑讲师详情':flag===2?'新增讲师详情':flag===3?'讲师详情':''}}</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" v-model="form" :rules="rules" label-width="80px" >
                        <el-form-item label="讲师头像">
                            <Upload :file="uploadFile" @success="handleSuccessUpload" :disabled="flag===3"></Upload>
                        </el-form-item>
                        <el-form-item label="讲师姓名" prop="name">
                            <el-input v-model="form.name" :disabled="flag===3" @focus="staffModule=true"></el-input>
                        </el-form-item>
                        <el-form-item label="点评摘要" prop="abstract">
                            <el-input v-model="form.comment" :disabled="flag===3"></el-input>
                        </el-form-item>
                        <el-form-item label="讲师介绍" prop="desc">
                            <el-input v-model="form.desc" type="textarea" :rows="10" :disabled="flag===3"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" v-if="flag===1||flag===2" size="small" @click="submit(flag)">确定</el-button>
                    <el-button type="info" v-if="flag===1||flag===2" size="small" @click="visible = false;current_id = ''">取消</el-button>
                    <el-button type="danger" v-if="flag===3" size="small" @click="visible = false;current_id = ''">关闭</el-button>
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
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>

    </div>
</template>

<script>
    import LjDialog from '../../common/lj-dialog.vue';
    import Upload from '../../common/upload';
    import StaffOrgan from '../../common/staffOrgan.vue';

    export default {
        name: "faculty",
        components: {
            LjDialog,
            Upload,
            StaffOrgan
        },
        data() {
            return {
                count: 0,
                seen: true,
                current: '',
                current_item:'',
                current_id:'',
                visible: false,
                staffModule:false,//员工
                flag:'',
                detail_visible: false,//讲师详情
                delete_visible: false,//删除讲师
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 10,
                    department_ids: '',
                    export: '',
                },
                dataLists: [],
                form:{
                    id:'',
                    name:'',
                    desc:'',//讲师简介
                    comment:'',//点评概要
                    user_id:'',
                },
                rules: {
                },
                uploadFile: {
                    keyName: 'album',
                    setFile: [],
                    size: {
                        width: '50px',
                        height: '60px'
                    }
                },
                upload_form: {
                    album: [],
                    album_file: [],
                },
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

        methods: {
            //获取员工信息
            hiddenStaff(ids, names, arr) {
                this.staffModule = false;
                if (ids !== 'close') {
                    this.form.name = names;
                    this.form.user_id = ids[0];
                }
            },
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.upload_form[item[0]] = item[1];
                }
                console.log(item);
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
            //获取bus传值
            getVal(val){
                this.visible = val;//新增弹窗显示
                this.flag = 2;
                console.log(Object.keys(this.form));
                // for(let item of Object.keys(this.form)){
                //     this.form[item] = '';
                // }
                this.form.comment='';
                this.form.desc='';
                this.form.id='';
                this.form.name='';

            },
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getDataLists();
            },
            //获取列表
            getDataLists(){
                this.$http.get(globalConfig.leJiaCollege_server+'/api/teachers/lecturer', this.params).then(res => {
                    if(res.status===200){
                        this.dataLists  = res.data.data;
                        console.log(this.dataLists)
                    }
                })
            },
            //详情弹窗
            detail(id,index){
                this.visible = true;
                this.flag = 3;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }
                this.form['name'] = this.dataLists[index]['user_id'].name;
                this.form['user_id'] = this.dataLists[index]['user_id'].id;
                this.current_id = id;


            },
            //删除弹窗
            del(id,index) {
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk(){
                this.$http.delete(globalConfig.leJiaCollege_server+'/api/teachers/lecturer/'+this.current_id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible=false;
                })
            },
            //编辑弹窗
            edit(id,index){
                this.visible = true;
                this.flag = 1;
                this.current_id = id;

                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }
                this.form['name'] = this.dataLists[index]['user_id'].name;
                this.form['user_id'] = this.dataLists[index]['user_id'].id;
            },
            //提交
            submit(type){
                if(type===1){
                    this.$http.put(globalConfig.leJiaCollege_server+'/api/teachers/lecturer/'+this.current_id, this.form).then(res => {
                        this.callbackSuccess(res);
                        this.visible=false;
                    })
                }else if(type===2){

                    this.$http.post(globalConfig.leJiaCollege_server+'/api/teachers/lecturer', this.form).then(res => {
                        this.callbackSuccess(res);
                        this.visible=false;
                    })
                }

            },

            //鼠标移入
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            //鼠标移出
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
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
        #faculty {
            .faculty-lists {
                .faculty-list-info {
                    .faculty-box {

                        .faculty-box-top {
                            span {
                                i {
                                    &:hover {
                                        @include leJiaCollegeImg('theme1', 'huidi2.png');
                                    }
                                }
                            }
                        }

                        .faculty-box-middle {
                            > div {

                            }
                        ;
                            @include leJiaCollegeImg('theme1', 'faculty-grey.png');

                            &:hover {
                                @include leJiaCollegeImg('theme1', 'faculty-red.png');
                            }


                        }

                        .faculty-box-bottom {
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