<template>
    <div id="headLines">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="publish_visible = true"><b>+</b></div>
            </div>
        </div>
        <div class="mainList" v-if="chooseTab===1">
            <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
                <el-table
                    :data="hotNewsData"
                    :height="this.mainListHeight(30) + 'px'"
                    highlight-current-row
                    header-row-class-name="tableHeader"
                    style="width: 100%">
                <el-table-column label="类型" prop="type" align="center" >
                </el-table-column>
                <el-table-column label="标题" prop="title" align="center" >
                </el-table-column>
                <el-table-column label="发布人" prop="name" align="center" >
                </el-table-column>
                <el-table-column label="发布时间" prop="time" align="center" >
                </el-table-column>
                <el-table-column label="已读" prop="read" align="center" >
                </el-table-column>
                <el-table-column label="未读" prop="unRead" align="center" >
                </el-table-column>

                <el-table-column label="操作" prop="" align="center" >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini">发布</el-button>
                        <el-button type="danger" size="mini">置顶</el-button>
                        <el-button type="success" size="mini">加精</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        </div>

        <div class="mainList" v-if="chooseTab===2">
            <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
                <el-table
                        :data="newsData"
                        :height="this.mainListHeight(30) + 'px'"
                        highlight-current-row
                        header-row-class-name="tableHeader"
                        style="width: 100%">
                    <el-table-column label="类型" prop="type" align="center" >
                    </el-table-column>
                    <el-table-column label="标题" prop="title" align="center" >
                    </el-table-column>
                    <el-table-column label="发布人" prop="name" align="center" >
                    </el-table-column>
                    <el-table-column label="发布时间" prop="time" align="center" >
                    </el-table-column>
                    <el-table-column label="已读" prop="read" align="center" >
                    </el-table-column>
                    <el-table-column label="未读" prop="unRead" align="center" >
                    </el-table-column>

                    <el-table-column label="操作" prop="" align="center" >
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">发布</el-button>
                            <el-button type="danger" size="mini">置顶</el-button>
                            <el-button type="success" size="mini">加精</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="mainList" v-if="chooseTab===3">
            <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
                <el-table
                        :data="noticeData"
                        :height="this.mainListHeight(30) + 'px'"
                        highlight-current-row
                        header-row-class-name="tableHeader"
                        style="width: 100%">
                    <el-table-column label="类型" prop="type" align="center" >
                    </el-table-column>
                    <el-table-column label="标题" prop="title" align="center" >
                    </el-table-column>
                    <el-table-column label="发布人" prop="name" align="center" >
                    </el-table-column>
                    <el-table-column label="发布时间" prop="time" align="center" >
                    </el-table-column>
                    <el-table-column label="已读" prop="read" align="center" >
                    </el-table-column>
                    <el-table-column label="未读" prop="unRead" align="center" >
                    </el-table-column>

                    <el-table-column label="操作" prop="" align="center" >
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">发布</el-button>
                            <el-button type="danger" size="mini">置顶</el-button>
                            <el-button type="success" size="mini">加精</el-button>
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


        <!--发布-->
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
                                    <el-input  v-model="comment" :rows="8"></el-input>
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
                                    <el-input  v-model="comment" :rows="8"></el-input>
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
                                    <el-input type="textarea" v-model="comment" :rows="8"></el-input>
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
                chooseTab: 1,
                withdraw_visible:false,//下架
                publish_visible:false,//发布
                selects:[
                    {id:1,title:"热门导读"},
                    {id:2,title:"乐伽新闻"},
                    {id:3,title:"公告"}
                ],
                hotNewsData:[
                  {
                      type:'研发类',
                      title:'合法ifhi发货方法',
                      name:'其反复',
                      time:'2019.01.11 13:14',
                      read:99,
                      unRead:886,
                  },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    }
                ],
                noticeData:[
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    }
                ],
                newsData:[
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    },
                    {
                        type:'研发类',
                        title:'合法ifhi发货方法',
                        name:'其反复',
                        time:'2019.01.11 13:14',
                        read:99,
                        unRead:886,
                    }
                ],
            }
        },
        methods:{
            changeTabs(id) {
                this.chooseTab = id;
            },
            handleOkWithdraw(){

            }
        }

    }
</script>

<style scoped>

</style>