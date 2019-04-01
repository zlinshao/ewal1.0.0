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
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                        </div>
                    </div>
                    <div class="faculty-box-bottom">
                        <span>{{item.name}}</span>
                        <span>{{item.abstract}}</span>
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
                    <h3>{{flag===1?'编辑讲师详情':'新增讲师详情'}}</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" v-model="form" :rules="rules" label-width="80px" >
                        <el-form-item label="讲师头像">
                            <!--<el-input v-model="ruleForm.photo"></el-input>-->
                            <!--<Upload :file="photo1" @success="getImgIds"></Upload>-->
                        </el-form-item>
                        <el-form-item label="讲师姓名" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="点评摘要" prop="abstract">
                            <el-input v-model="form.abstract"></el-input>
                        </el-form-item>
                        <el-form-item label="讲师介绍" prop="desc">
                            <el-input v-model="form.desc" type="textarea" :rows="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="visible = false;current_id = ''">取消</el-button>
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
                            <span>{{form.name}}</span>
                            <span>{{form.abstract}}</span>
                        </div>
                        <div class="content scroll_bar">
                            <span>{{form.desc}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="detail_visible = false;current_id = ''">关闭
                    </el-button>
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

    </div>
</template>

<script>
    import LjDialog from '../../common/lj-dialog.vue';
    import Upload from '../../common/upload';

    export default {
        name: "faculty",
        components: {
            LjDialog,
            Upload,
        },
        data() {
            return {
                count: 0,
                seen: true,
                current: '',
                current_item:'',
                current_id:'',
                visible: false,
                flag:1,
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
                dataLists: [
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },
                    {
                        id:1,
                        avatar: '',
                        time: '',
                        view: 232,
                        name:'赵丽颖',
                        abstract:'一句话概括讲师的优秀',
                        desc:'一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀一句话概括讲师的优秀'
                    },

                ],


                photo1: {
                    keyName: 'photo1',
                    setFile: [
                        {
                            id: 55,
                            url: 'http://static.lejias.cn/lejia8e9013abd8af58047660bc8616f775a8.jpg',
                        },
                        {
                            id: 44,
                            url: 'http://static.lejias.cn/lejia20c807d28018c05cb2950017673d93f2.jpg',
                        },
                    ],
                    size: {},
                },
                photo2: {
                    keyName: 'photo2',
                    setFile: {},
                },
                form:{
                    id:'',
                    name:'',
                    desc:'',
                    abstract:'',
                },
                rules: {
                    photo:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },

                    ],
                    abstract: [
                        { required: true, message: '请输入点评内容', trigger: 'blur' },

                    ],
                    desc: [
                        { required: true, message: '请输入介绍内容', trigger: 'blur' },
                        // { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
                    ],
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
            //获取bus传值
            getVal(val){
                this.visible = val;//新增弹窗显示
                this.flag = 2;
                console.log(Object.keys(this.form));
                for(let item of Object.keys(this.form)){
                    this.form[item] = '';
                }
            },
            //换页
            handleChangePage(page) {
                this.params.page = page;
                this.getDataLists();
            },
            //获取列表
            getDataLists(){
                this.$http.get('', this.params).then(res => {
                    if(res.code===200){
                        this.dataLists  = res.data.data;
                    }
                })
            },
            //详情弹窗
            detail(id,index){
                this.detail_visible = true;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.dataLists[index][item];
                }
                this.current_id = id;

            },
            //删除弹窗
            del(id,index) {
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk(){
                this.$http.delete('', this.current_id).then(res => {
                    this.callbackSuccess(res);
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
            },
            //提交
            submit(){
                this.$http.post('', this.form).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //获取上传图片信息
            // getImgIds(val) {
            //     console.log(val);
            // },

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