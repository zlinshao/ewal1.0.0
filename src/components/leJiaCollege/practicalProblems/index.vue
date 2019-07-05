<template>
    <div id="practicalProblems">
        <div class="problems-lists">
            <div class="problems-list-info flex-center" v-for="(item,index) in problemsData" @click.stop="details(item.id)">
                <div class="problems-box">
                    <div class="problems-box-top flex-center">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="video-box-bottom justify-around">
                        <span @click.stop="edit(item.id,index)">编 辑</span>
                        <span @click.stop="del(item.id,index)">删 除</span>
                    </div>
                </div>
            </div>
        </div>

        <!--编辑问题-->
        <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 600 + 'px'}"
                   @close="edit_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{current_type===1?'新增实践问题':current_type===2?form.title:current_type===3?'详情':''}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form  label-width="80px" v-model="form" :rules="rules" ref="form">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="form.title" placeholder="请输入标题" :disabled="current_type===3"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <el-input v-model="form.content" type="textarea" :rows="12"
                                      placeholder="请输入内容" :disabled="current_type===3"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button v-if="current_type===1||current_type===2" type="danger" size="small" @click="submit(current_type)">确定</el-button>
                    <el-button v-if="current_type===1||current_type===2" type="info" size="small" @click="edit_visible = false;current_id = ''">取消</el-button>
                    <el-button v-if="current_type===3" type="danger" size="small" @click="edit_visible = false;current_id = ''">关闭</el-button>
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
                        :current-page="params.offset"
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
                current_type:'',
                current_id:'',//当前项id
                edit_visible:false,
                delete_visible:false,
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    offset: 1,//页数
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                problemsData:[],
                form:{//表单
                    id:'',
                    content:'',
                    title:'',
                },
                rules:{
                }
            }
        },
        created() {
            this.$bus.on('add', this.getData)
        },
        beforeDestroy() {
            this.$bus.off('add', this.getData);
        },
        mounted(){
            this.getProblemLists();
        },
        methods:{
            getData(val) {
                this.edit_visible = val;//新增弹出显示
                this.current_type = 1;
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
            },
            details(id){
                this.edit_visible=true;
                this.current_type = 3;
                this.$http.get(globalConfig.leJiaCollege_server+'/api/practice/question/'+id).then(res => {
                   if(res.status===200){

                   }
                })
            },
            callbackSuccess(res) {
                if (res.status === 200) {
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
                this.$http.delete(globalConfig.leJiaCollege_server+'/api/practice/question/'+this.current_id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible =false;
                })
            },
            //编辑弹出
            edit(id,index){
                console.log(id,index);
                this.edit_visible = true;
                this.current_type = 2;
                this.current_id = id;
                for(let item of Object.keys(this.form)){
                    this.form[item] = this.problemsData[index][item];
                }
            },
            // 换页
            handleChangePage(page){
                this.params.offset = page;
                this.problemsData=[];
                this.getProblemLists();
            },
            //提交
            submit(val){
                if(val===1){
                    this.$http.post(globalConfig.leJiaCollege_server+'/api/practice/question/', this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                }else if(val===2){
                    this.$http.put(globalConfig.leJiaCollege_server+'/api/practice/question/'+this.current_id, this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                }
            },
            //获取列表
            getProblemLists(){
                this.showLoading(true);
                this.$http.get(globalConfig.leJiaCollege_server+'/api/practice/question', this.params).then(res => {
                    this.showLoading(false);
                    if (res.status === 200) {
                        this.problemsData  = res.data.data;
                        this.count=res.data.total;
                    }else{
                        this.problemsData  = [];
                        this.count=0;
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
