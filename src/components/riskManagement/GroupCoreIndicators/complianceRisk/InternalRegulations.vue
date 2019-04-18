<template>
    <div id="InternalRegulations">
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <h1>公司内部规定</h1>
                </div>
            </div>
            <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div class="InternalRegulations-info">
                    <div class="left-info">
                        <div>
                            <p v-for="(item,index) in riskData" @click="selects(item.id)"  :class="chooseTab===item.id?'activeTab':''">
                                <span class="flex-center"><i>{{item.tag}}</i></span>
                                <span><i>{{item.name}}</i></span>
                            </p>
                        </div>
                    </div>
                    <div class="right-info flex-center">
                        <div class="scroll_bar"  v-if="chooseTab===1">
                            <div v-for="(item,index) in fileData1" class="right-info-list flex-center">
                                <div class="right-info-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                    <p class="flex-center">
                                        <span v-show="seen&&index===current">
                                            <i @click.stop="openEdit(item.id,index)">编辑</i>
                                            <i @click.stop="openDel(item.id,index)">删除</i>
                                        </span>
                                        <a class="word_icon" @click="openFile(item.file_id[0].uri)"></a>
                                    </p>
                                    <p><span>营销中心制度及相关操作…</span></p>
                                    <p><span>2019-04-07</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-img"></div>
                    </div>
                    <div class="add-icons" @click="add_visible = true"><span>+</span></div>
                </div>
            </div>
        </div>

        <DepartOrgan :module="departModule" :organData="organData" @close="hiddenOrgan"></DepartOrgan>

        <!--新增-->
        <lj-dialog
                :visible="add_visible"
                :size="{width: 450 + 'px' ,height:450 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增文件</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px" v-model="form">
                        <el-form-item label="所属部门">
                            <el-input placeholder="请选择" v-model="form.org_name" @focus="openDepart(1)"></el-input>
                        </el-form-item>
                        <el-form-item label="文件名称">
                            <el-input placeholder="请选择" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="添加文件">
                            <lj-upload v-model="form.file_info" size="40"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                        <el-form-item label="可见范围">
                            <el-input placeholder="请选择" v-model="form.permission_name" @focus="openDepart(2)"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="confirm">确定</el-button>
                    <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
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
    import LjDialog from '../../../common/lj-dialog.vue';
    import DepartOrgan from '../../../common/departOrgan.vue';
    import LjUpload from '../../../common/lightweightComponents/lj-upload';
    export default {
        name: "InternalRegulations",
        components:{
            LjDialog,
            DepartOrgan,
            LjUpload

        },
        data() {
            return {
                add_visible:false,
                delete_visible:false,
                seen:true,
                current: '',
                chooseTab:1,
                department: [
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},

                ],
                fileData1:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                ],
                fileData2:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                ],
                fileData3:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},

                ],
                fileData4:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},

                ],
                fileData5:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                ],
                form:{
                    classify_id:'',//上一级分类id
                    file_id:'',//七牛云文件id
                    permission_name:'',//权限名称
                    org_id:'',//所属部门
                    org_name:'',//部门名称
                    permission_org_id:[],//
                    // user_id:[],//用户
                    file_info:[],
                },
                departModule:false,
                open_type:'',
                riskData:[],

            }
        },
        mounted(){
            this.getTabList();
        },
        methods:{
            getTabList(){//一级目录
                this.$http.get(globalConfig.risk_sever+"/api/risk/classify",{parent_id:60}).then(res=>{
                    console.log(res);
                    if(res.status===200){
                        console.log(res.data.data);
                        this.riskData=res.data.data;
                    }
                })
            },

            selects(id){
                this.chooseTab=id;
            },
            openFile(val){
                console.log(val);
                window.open(val);
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
            openEdit(){
                this.add_visible = true;
            },
            openDel(){
                this.delete_visible = true;
            },
            openDepart(val){
                this.departModule = true;
                this.open_type = val;
            },
            hiddenOrgan (ids, names, arr) {//获取部门数据
                if (ids !== 'close') {
                    this.departModule = false;
                    if(this.open_type===1){
                        this.form.org_name=names;
                        this.form.org_id=ids[0];
                    }else if(this.open_type===2){
                        this.form.permission_org_id = ids;
                        this.form.permission_name = names;
                    }
                }
            },
            confirm(){
                let paramsForm = {
                    classify_id:this.$route.query.pre_id,//上级分类id
                    file_id:this.form.file_info[0],//附件id
                    permission:{
                        org_id:this.form.permission_org_id,
                        user_id:[],
                    },//权限ids
                    org_id:this.form.org_id,//部门ids
                    name:this.form.name,//文件名
                };
                this.$http.post(globalConfig.risk_sever + "/api/risk/classify_document",paramsForm).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.add_visible = false;
                        this.getDataLists();
                        this.current_item = '';
                    }else{
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

    @mixin riskManagementImg($m, $n) {
        $url: '../../../../assets/image/riskManagement/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #InternalRegulations {
            .activeTab{
                span:first-child{
                    i{
                        color:#FFFFFF;
                    }
                    background: #CF2E33;
                }
                span:last-child{
                    i{
                        color:#CF2E33;
                    }
                }
            }
            > div {
                .mainList {
                    .InternalRegulations-info {

                        .left-info {

                            div {
                                span {

                                    i {

                                    }

                                    i:first-child {

                                    }
                                }
                            }
                        }

                        .right-info{

                            >div{

                                .right-info-list{

                                    .right-info-box{
                                        .word_icon{
                                            cursor: pointer;
                                            @include riskManagementImg('word_icon.png', 'theme1');
                                        }
                                        p{

                                        }
                                        p:first-child{

                                            &:hover{

                                            }
                                            span{
                                                i{
                                                   &:hover{
                                                       @include riskManagementImg('xzgj.png','theme1');
                                                   }
                                                }

                                            }
                                        }

                                        p:last-child{

                                        }
                                    }
                                }
                            }
                            .bg-img{
                                @include riskManagementImg('diwen.png','theme1');
                            }
                        }
                    }
                }
            }

        }
    }

</style>