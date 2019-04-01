<template>
    <div id="industryDynamic">
        <div class="lists">
            <div class="list-info flex-center" v-for="(item,index) in dataLists">
                <div class="list-info-box">
                    <span>{{item.title}}</span>
                    <span>{{item.content}}</span>
                    <span><i @click="edit(item.id,index)">编辑</i><i @click="del(item.id,index)">删除</i></span>
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
                        :total="videoCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>

        <!--编辑行业动态-->
        <lj-dialog
                :visible="visible"
                :size="{width: 500 + 'px' ,height: 550 + 'px'}"
                @close="visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{current===1?'编辑行业动态':'新增行业动态'}}</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" label-width="80px" v-model="form" :rules="rules" ref="form">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="动态内容" prop="content">
                            <el-input v-model="form.content" type="textarea" :rows="12"
                                      placeholder="请输入动态内容"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="submit">确定</el-button>
                    <el-button size="small" type="info" @click="visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--删除行业动态-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除这条行业动态吗？</div>
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

    export default {
        name: "industryDynamic",
        components: {
            LjDialog,
        },
        data() {
            return {
                videoCount: 0,
                visible: false,
                delete_visible: false,
                current: 1,
                current_id: '',
                current_item: '',
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 6,
                    department_ids: '',
                    export: '',
                },
                dataLists: [//列表
                    {
                        id: 1,
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        id: 2,
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                    {
                        title: '公告',
                        content: '还减肥开始的阶段的就是讲方法减肥的时间佛的就发生都放假放假几个破手机高坡上的价格牌手机破公交给偶个就是破地方就是的发生打架的富婆',
                    },
                ],

                form: {
                    id: '',
                    title: '',
                    content: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题名称', trigger: 'blur'},
                        {min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入动态内容', trigger: 'blur'},
                        {min: 0, max: 300, message: '长度在 300 个字符', trigger: 'blur'}
                    ],

                }


            }
        },
        mounted() {
            this.getIndustryList();
        },
        created() {
            this.$bus.on('add', this.getData)
        },
        beforeDestroy() {
            this.$bus.off('add', this.getData);
        },
        methods: {
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.getIndustryList();
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
                this.getIndustryList();

            },
            //获取bus值
            getData(val) {
                this.visible = val;//新增弹出显示
                this.current = 2;
                console.log(Object.keys(this.form));
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
            },
            //编辑弹框
            edit(id, index) {
                this.visible = true;
                this.current = 1;
                this.current_id = id;
                for (let item of Object.keys(this.form)) {
                    this.form[item] = this.dataLists[index][item];
                }
            },
            //删除弹窗
            del(id, index) {
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk() {
                this.$http.delete('', this.current_id).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //获取列表
            getIndustryList() {
                this.$http.get('', this.params).then(res => {
                    if (res.code === 200) {
                        this.dataLists = res.data.data;
                    }
                })
            },
            //提交表单
            submit() {
                this.$http.post('', this.form).then(res => {
                    this.callbackSuccess(res);
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/industryDynamic/index.scss";

    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #industryDynamic {
            > div {
                .list-info {
                    .list-info-box {
                        @include leJiaCollegeImg('theme1', 'notice-border-grey.png');

                        &:hover {
                            @include leJiaCollegeImg('theme1', 'notice-border-red.png')
                        }

                        span {
                            i {
                                @include leJiaCollegeImg('theme1', 'btn-grey.png');

                                &:hover {
                                    @include leJiaCollegeImg('theme1', 'btn-red.png');
                                }
                            }


                        }
                    }


                }
            }

        }

    }


</style>