<template>
    <div id="headLines">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showMenuList = true">
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
                <div class="icons report" @click="report_visible = true"></div>
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
                    <el-table-column label="类型" prop="type" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.type==='hot'?'热门导读':scope.row.type==='news'?'乐伽新闻':scope.row.type==='announcement'?'公告':''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="标题" prop="title" align="center">
                    </el-table-column>
                    <el-table-column label="发布人" prop="user_id.name" align="center">
                    </el-table-column>
                    <el-table-column label="发布时间" prop="created_at" align="center">
                    </el-table-column>
                    <el-table-column label="已读" align="center">
                        <template slot-scope="scope">
                            <span style="color: #0C66FF;cursor: pointer"
                                  @click="getDetail(scope.row,scope.$index,1)">{{scope.row.status.read_people}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="未读" align="center">
                        <template slot-scope="scope">
                            <span style="color: #CF2E33;cursor: pointer"
                                  @click="getDetail(scope.row,scope.$index,2)">{{scope.row.status.unread_people}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini"
                                       :plain="scope.row.is_open===0?true:false"
                                       @click.stop="getStatus(scope.row,scope.$index,1)"
                            >{{scope.row.is_open===0?'发布':'已发布'}}
                            </el-button>
                            <el-button @click.stop="getStatus(scope.row,scope.$index,2)" type="warning" size="mini"
                                       :plain="scope.row.is_top===0?true:false">{{scope.row.is_top===0?'置顶':'已置顶'}}
                            </el-button>
                            <el-button @click.stop="getStatus(scope.row,scope.$index,3)" type="success" size="mini"
                                       :plain="scope.row.is_great===0?true:false">{{scope.row.is_great===0?'加精':'已加精'}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                    <el-button type="danger" size="mini" @click="confirmWithdraw">确定</el-button>
                    <el-button size="mini" @click="withdraw_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
        <!--删除举报-->
        <lj-dialog
                :visible="del_visible"
                :size="{width: 400 + 'px',height: 250 + 'px'}"
                @close="del_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">将此举报删除吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="mini" @click="comfirmDelReport">确定</el-button>
                    <el-button size="mini" @click="del_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--阅读状态-->
        <lj-dialog
                :visible="readStatus_visible"
                :size="{width: 900 + 'px',height: 600 + 'px'}"
                @close="readStatus_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>阅读状态</h3>
                </div>
                <div class="dialog_main">
                    <div class="read-status">
                        <span v-for="item in readSelects" @click="readTab(item.id)"
                              :class="{'readActive': read_type === item.id}">{{item.title}}
                        </span>
                    </div>
                    <div class="person-list">
                        <div class="person-list-info flex-center" v-for="(item,index) in read_info" :key="index"
                             v-if="read_type===1">
                            <div class="person-box">
                                <img :src="item.avatar" alt="">
                                <span>
                                    <i>{{item.name}}</i>
                                    <i>{{item.department_name}}</i>
                                </span>
                            </div>
                        </div>
                        <div class="person-list-info flex-center" v-for="(item,index) in unread_info" :key="index"
                             v-if="read_type===2">
                            <div class="person-box">
                                <img :src="item.avatar" alt="">
                                <span>
                                    <i>{{item.name}}</i>
                                    <i>{{item.department_name}}</i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </lj-dialog>

        <!--新增-->
        <lj-dialog
                :visible="publish_visible"
                :size="{width: 1200 + 'px' ,height:800 + 'px'}"
                @close="publish_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{chooseTab===1?'发布导读':chooseTab===2?'发布新闻':chooseTab===3?'发布公告':''}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px">
                        <el-form-item label="类型">
                            <el-input v-model="form.type_id"></el-input>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="文章内容">
                            <div class="item_content">
                                <lj-editor  :editorContent="form.content" @changeContent="getContentChange"></lj-editor>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="getUEContent()">预览</el-button>
                    <el-button size="small" type="danger" @click="confirm()">发布</el-button>
                    <el-button size="small" type="info" @click="publish_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--举报列表-->
        <lj-dialog
                :visible="report_visible"
                :size="{width: 1200 + 'px',height: 650 + 'px'}"
                @close="report_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>举报</h3>
                </div>
                <div class="dialog_main">
                    <el-table
                            :data="tableData"

                            highlight-current-row
                            header-row-class-name="tableHeader"
                            style="width: 100%">
                        <el-table-column label="举报时间" prop="" align="center">
                        </el-table-column>
                        <el-table-column label="举报人" prop="" align="center">
                        </el-table-column>
                        <el-table-column label="举报类型" prop="" align="center">
                        </el-table-column>
                        <el-table-column label="举报内容" prop="content" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <span class="delete-icon" @click="del_visible = true;"><i></i></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination
                            :total="count"
                            layout="total,jumper,prev,pager,next"
                            :current-page="params.page"
                            :page-size="params.limit"

                    >
                    </el-pagination>
                </div>
            </div>
        </lj-dialog>
        <media-list :module="showMenuList" @close="showMenuList = false"></media-list>
    </div>
</template>

<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    import LjEditor from '../../../common/lj-editor.vue';
    import mediaList from '../../components/mediaList.vue';

    export default {
        name: "index",
        components: {
            LjDialog,
            LjEditor,
            mediaList
        },
        data() {
            return {
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                form: {
                    type_id: '',
                    title: '',
                    content:'',
                    is_open:'',//是否发布

                },
                defaultMsg: '',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                count: 0,
                searchParams: {
                    is_open: '',//
                    is_top: '',//
                    is_great: '',//
                    org_ids: '',//
                    open_time: [],//发布时间
                },
                chooseTab: 1,
                showMenuList: false,
                withdraw_visible: false,//下架
                publish_visible: false,//发布
                report_visible: false,//举报
                del_visible: false,//删除
                readStatus_visible: false,
                read_type: '',//阅读状态

                selects: [
                    {id: 1, title: "热门导读"},
                    {id: 2, title: "乐伽新闻"},
                    {id: 3, title: "公告"}
                ],
                readSelects: [
                    {id: 1, title: "已读人员"},
                    {id: 2, title: "未读人员"},
                ],
                tableData: [],
                type: 'hot',
                read_info: [],
                unread_info: [],

                statusParams: {
                    is_open: '',
                    cancel_open: '',
                    is_top: '',
                    cancel_top: '',
                    is_great: '',
                    cancel_great: '',
                },

            }
        },
        watch: {},
        mounted() {
            this.getDataLists();
        },
        methods: {
            getUEContent() {
                let content = this.$refs.ue.getUEContent();
                this.$notify({
                    title: '获取成功，可在控制台查看！',
                    message: content,
                    type: 'success'
                });
                console.log(content)
            },
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
            readTab(id) {
                this.read_type = id;
            },
            handleChangePage(page) {
                this.params.page = page;
                this.getDataLists();
            },
            //删除
            comfirmDelReport() {

            },
            // 已读未读详情
            getDetail(row, index, readType) {
                this.readStatus_visible = true;
                this.read_type = readType;
                this.$http.get(globalConfig.newMedia_sever + '/api/article/' + this.type + '/' + row.id).then(res => {
                    if (res.status === 200) {
                        if (res.data.status) {
                            let read_info = res.data.status.read_info;
                            let unread_info = res.data.status.unread_info;

                            if (read_info.length > 0) {
                                this.unread_info = [];
                                for (let item of read_info) {
                                    this.read_info.push(
                                        {
                                            name: item.name,
                                            avatar: item.avatar,
                                            department_name: item.org.length > 0 ? item.org[0].name : ''
                                        }
                                    )
                                }
                            } else {

                            }

                            if (unread_info.length > 0) {
                                this.unread_info = [];
                                for (let item of unread_info) {
                                    this.unread_info.push(
                                        {
                                            name: item.name,
                                            avatar: item.avatar,
                                            department_name: item.org.length > 0 ? item.org[0].name : ''
                                        }
                                    )
                                }
                            } else {

                            }
                            console.log(this.unread_info);
                        }
                    }
                });

            },

            //获取新闻列表
            getDataLists() {
                this.showLoading(true);
                this.$http.get(globalConfig.newMedia_sever + '/api/article/' + this.type, this.params).then(res => {
                    if (res.status === 200) {
                        this.showLoading(false);
                        this.tableData = res.data.data;
                        this.count = res.data.total;
                        console.log(res.data.data)
                    }
                })
            },
            getStatus(row, index, type) {
                for (let item of Object.keys(this.statusParams)) {
                    this.statusParams[item] = '';
                }
                this.statusParams.article_id = row.id;
                if (type === 1) {
                    if (row.is_open === 0) {
                        this.statusParams.is_open = 1;
                        this.comfirmStatus();
                    } else {
                        this.withdraw_visible = true;
                        this.statusParams.cancel_open = 1;
                    }
                }
                if (type === 2) {
                    if (row.is_top === 1) {
                        this.statusParams.cancel_top = 1;
                        this.comfirmStatus();
                    } else {
                        this.statusParams.is_top = 1;
                        this.comfirmStatus();
                    }
                }
                if (type === 3) {
                    if (row.is_great === 1) {
                        this.statusParams.cancel_great = 1;
                        this.comfirmStatus();
                    } else {
                        this.statusParams.is_great = 1;
                        this.comfirmStatus();
                    }
                    console.log(this.statusParams.cancel_great);
                    console.log(this.statusParams.is_great);
                }
            },
            //操作下架
            confirmWithdraw() {
                this.$http.post(globalConfig.newMedia_sever + '/api/article/status', this.statusParams).then(res => {
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.message,
                            subMessage: '',
                        });
                        this.withdraw_visible = false;
                        this.showLoading(false);
                        this.getDataLists();
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.message,
                            subMessage: '',
                        });
                    }
                })
            },


            //高级搜索
            highSearch() {

            }

        }

    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/news/index.scss";

    @mixin commonImg($m,$n) {
        $url: '../../../../assets/image/common/' + $n + '/' + $m;
        @include bgImage($url);
    }

    @mixin delImg($m,$n) {
        $url: '../../../../assets/image/common/lightweightComponents/confirm/' + $n + '/' + $m;
        @include bgImage($url);
    }

    @mixin readImg($m,$n) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #headLines {
            > div {
                .listTopRight {
                    .report {
                        @include commonImg('jubao.png', 'theme1');
                    }
                }
            }

            .delete-icon {
                text-align: center;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                i {
                    cursor: pointer;
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    @include delImg('shanchuchenggong.png', 'theme1');
                }

            }

            .read-status {
                span {
                    @include readImg('yiyuedu.png', 'theme1');
                    color: #797982;
                    cursor: pointer;
                }

                .readActive {
                    @include readImg('weiyuedu.png', 'theme1');
                    color: #FFFFFF;
                }

            }

        }
    }


</style>
