<template>
    <div id="practicalProblems">
        <div class="problems-lists">
            <div class="problems-list-info flex-center" v-for="(item,index) in problemsData">
                <div class="problems-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="problems-box-top flex-center">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="video-box-bottom justify-around">
                        <span @click="edit_visible = true">编 辑</span>
                        <span @click="delete_visible = true">删 除</span>
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
                    <el-form ref="form" :model="problemsForm"   size="small">
                        <!--<el-form-item label="活动名称">-->
                            <!--<el-input v-model="problemsForm.name" size="small"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item>
                            <el-input v-model="problemsForm.content" size="small" type="textarea" :rows="16"></el-input>
                        </el-form-item>


                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="edit_visible = false">取消</el-button>
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
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false">取消</el-button>
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
                        :total="problemCount"
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
                problemCount:0,
                edit_visible:false,
                delete_visible:false,
                problemsForm:{
                  id:1,
                  content:'痴痴缠缠啛啛喳喳尺寸'
                },
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                problemsData:[
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                ]
            }
        },
        methods:{
            handleOkDel(){

            },
            handleChangePage(){
                this.params.page = page;
                // this.getLordList();
            }
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