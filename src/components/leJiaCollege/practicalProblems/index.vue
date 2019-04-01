<template>
    <div id="practicalProblems">
        <div class="problems-lists">
            <div class="problems-list-info flex-center" v-for="(item,index) in problemsData">
                <div class="problems-box">
                    <div class="problems-box-top flex-center">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="video-box-bottom justify-around">
                        <span @click="edit(item.id,index)">编 辑</span>
                        <span @click="del(item.id,index)">删 除</span>
                    </div>
                </div>
            </div>
        </div>

        <!--编辑问题-->
        <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
                   @close="edit_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>收房时应该注意哪些问题</h3>
                </div>
                <div class="dialog_main">
                    <el-form ref="form" :model="form"   size="small" :rules="rules">
                        <el-form-item>
                            <el-input v-model="form.content" size="small" type="textarea" :rows="16"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="submit">确定</el-button>
                    <el-button type="info" size="small" @click="edit_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除这条问题吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

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

    </div>
</template>

<script>
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "practicalProblems",
        components:{
            LjDialog,
        },
        data(){
            return{
                chooseTab:7,
                count:0,
                current_id:'',//当前项id
                edit_visible:false,
                delete_visible:false,
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                problemsData:[//列表
                    {id:1,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:2,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:3,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:4,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:5,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:6,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:7,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                    {id:8,title:'收房时应该注意 哪些问题？',content:'收房时应该注意收房时应该注意收房时应该注意收房时应该注意'},
                ],
                form:{//表单
                    id:'',
                    content:''
                },
                rules:{//规则验证
                    content:[
                        { required: true, message: '请输入', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted(){
            this.getProblemLists();
        },
        methods:{
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.getProblemLists();
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                }
            },
            //删除弹出
            del(id){
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk(){
                this.$http.delete('', this.current_id).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //编辑弹出
            edit(id,index){
                console.log(id,index);
                this.edit_visible = true;
                this.current_id = id;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.problemsData[index][item];
                }
            },
            // 换页
            handleChangePage(){
                this.params.page = page;
                this.getProblemLists();
            },
            //提交
            submit(){
                this.$http.post('', this.form).then(res => {
                    this.callbackSuccess(res);
                })
            },
            //获取列表
            getProblemLists(){
                this.$http.get('', this.params).then(res => {
                    if (res.code === 200) {
                        this.problemsData  = res.data.data;
                    }
                })
            },



        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/practicalProblems/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name {
        #practicalProblems{
            .problems-lists{
                .problems-list-info{
                    .problems-box{
                        .problems-box-top{
                            @include leJiaCollegeImg('theme1','problem-border.png')
                        }

                        .video-box-bottom{

                        }




                    }
                }
            }

        }

    }

</style>