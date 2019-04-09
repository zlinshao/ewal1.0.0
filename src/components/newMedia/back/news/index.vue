<template>
    <div id="headLines">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>企业头条</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons report" @click="highSearch"></div>
                <div class="icons add" @click="publish_visible = true"><b>+</b></div>
                <div class="icons search" @click="highSearch"></div>
            </div>
        </div>
        <div class="mainList">
            <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
                <el-table
                    :data="tableData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    header-row-class-name="tableHeader"
                    style="width: 100%">
                <el-table-column label="类型" prop="type" align="center" >
                    <template slot-scope="scope">
                        <span>{{scope.row.type==='hot'?'热门导读':scope.row.type==='news'?'乐伽新闻':scope.row.type==='announcement'?'公告':''}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title" align="center" >
                </el-table-column>
                <el-table-column label="发布人" prop="user_id.name" align="center" >
                </el-table-column>
                <el-table-column label="发布时间" prop="created_at" align="center" >
                </el-table-column>
                <el-table-column label="已读" prop="status.read_people" align="center" >
                </el-table-column>
                <el-table-column label="未读" prop="status.unread_people" align="center" >
                </el-table-column>

                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini"
                                   :plain="scope.row.is_open===1?false:true"
                                   @click="scope.row.is_open===1 ? report(scope.row,scope.$index):''"
                        >{{scope.row.is_open===1?'已发布':'发布'}}</el-button>
                        <el-button type="warning" size="mini" :plain="scope.row.is_top===1?false:true">{{scope.row.is_top===1?'已置顶':'置顶'}}</el-button>
                        <el-button type="success" size="mini" :plain="scope.row.is_great===1?false:true">{{scope.row.is_great===1?'已加精':'加精'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        </div>

        <!--撤下-->
        <lj-dialog
                :visible="withdraw_visible"
                :size="{width: 400 + 'px',height: 250 + 'px'}"
                @close="withdraw_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>撤下</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">将此文章下架吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="mini" @click="handleOkWithdraw">确定</el-button>
                    <el-button size="mini" @click="withdraw_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>


        <!--新增-->
        <lj-dialog
                :visible="publish_visible"
                :size="{width: 800 + 'px' ,height: 500 + 'px'}"
                @close="publish_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>写评论</h3>
                </div>
                <div class="dialog_main">
                    <el-form  size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>类型</span>
                                </div>
                                <div class="item_content">
                                    <el-input   :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>标题</span>
                                </div>
                                <div class="item_content">
                                    <el-input   :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container" style="align-items: flex-start">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>文章内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="postReceivable_tag()">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="publish_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
    </div>
</template>

<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    export default {
        name: "index",
        components:{
            LjDialog,
        },
        data(){
            return{
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                searchParams:{
                    is_open:'',//
                    is_top:'',//
                    is_great:'',//
                    org_ids:'',//
                    open_time:[],//发布时间
                },
                chooseTab: 1,
                withdraw_visible:false,//下架
                publish_visible:false,//发布
                selects:[
                    {id:1,title:"热门导读"},
                    {id:2,title:"乐伽新闻"},
                    {id:3,title:"公告"}
                ],
                tableData:[],
                type:'hot',

            }
        },
        watch:{
        },
        mounted(){
          this.getDataLists();
        },
        methods:{
            changeTabs(id) {
                this.chooseTab = id;
                switch (id) {
                    case 1:
                        this.type = 'hot';
                        break;
                    case 2:
                        this.type = 'news';
                        break;
                    case 3:
                        this.type = 'announcement';
                        break;
                }
                this.getDataLists();
            },
            handleOkWithdraw(){

            },
            //获取新闻列表
            getDataLists(){
                this.showLoading(true);
                this.$http.get(globalConfig.newMedia_sever + '/api/article/'+this.type, this.params).then(res => {
                    if(res.status===200){
                        this.showLoading(false);
                        this.tableData = res.data.data;
                        console.log(res.data.data)
                    }

                })
            },
            //发布
            report(row,index){

            },


            //加精

            //置顶

            //高级搜索
            highSearch(){

            }

        }

    }
</script>

<style scoped>

</style>