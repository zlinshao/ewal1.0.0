<template>
    <div id="club">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>俱乐部</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="add"><b>+</b></div>
            </div>
        </div>

        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="list">
                <div class="list-info flex-center" v-for="(item,index) in dataLists">
                    <div class="list-box"  @click="detail(item.id,index)">
                        <div class="list-modal" v-if="item.is_enter ===1"></div>
                        <div class="list-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt=""></div>
                        <div class="list-middle">
                            <div class="list-middle-info">
                                <div class="list-middle-left">
                                    <span>{{item.name}}</span>
                                    <span>{{item.created_at}}</span>
                                </div>
                                <div class="list-middle-right" :class="item.is_enter ===1 ? 'end':'process'">
                                    <span>{{endTimes[index]===1? '已结束':'进行中'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="list-bottom">
                            <div class="list-bottom-info justify-bet">
                                <span><i></i><span>{{item.day}}</span></span>
                                <span><i></i><span>{{item.click}}</span></span>
                            </div>
                        </div>
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
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--详情-->
        <lj-dialog :visible="detail_visible" :size="{width:1200 + 'px',height: '620' + 'px'}" @close="detail_visible = false">
            <div class="action_info">
                <h3 class="justify-start">活动详情</h3>
                <div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动名称</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">{{showData.name}}</div>
                    </div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动时间</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">
                            <span>{{showData.start_time}}-{{showData.over_time}}</span>
                        </div>
                    </div>
                    <div class="action_name" >
                        <div class="action_left" style="width: 70px;float: left">活动地址</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">{{showData.address}}</div>
                    </div>
                    <div class="action_name" style="border-bottom: 0">
                        <div class="action_left" style="width: 70px;float: left">活动内容</div>
                        <div class="action_right action_address" style="width: 860px;text-align: left;float: left;height: 100px">{{showData.content}}</div>
                    </div>

                </div>
            </div>
            <div style="position: absolute;bottom:50px;left:0;right:0;" v-if="showData.is_enter===2">
                <el-button type="danger" size="" >结束活动</el-button>
            </div>
            <div class="top_right_img" style="width:60px;height:140px;position: absolute;top:0;right:90px;">
                <span>已报名</span>
                <span>{{showData.click}}</span>
            </div>
        </lj-dialog>

        <!--确认结束-->
        <lj-dialog :visible="end_visible" :size="{width: 500 + 'px',height: 250 + 'px'}"
                   @close="end_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>结束活动</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">该活动暂未到结束时间，确定提前结束吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="end_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增-->
        <lj-dialog
                :visible="add_visible"
                :size="{width: 900 + 'px' ,height: 560 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增活动</h3>
                </div>
                <div class="dialog_main">
                    <el-form  size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="showData.name"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动时间</span>
                                </div>
                                <div class="item_content">
                                    <el-date-picker
                                            v-model="actionTime"
                                            type="datetimerange"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>活动地点</span>
                                </div>
                                <div class="item_content">
                                    <el-input  v-model="showData.address"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container" style="align-items: flex-start">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_mark"></i>
                                    </b>
                                    <span>评论内容</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" v-model="showData.content" :rows="8"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="preview">预览</el-button>
                    <el-button size="small" type="danger" @click="submit">发布</el-button>
                    <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>


</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "club",
        components: {
            mediaList,
            LjDialog
        },
        data() {
            return {
                showFinMenuList: false,
                detail_visible:false,//详情
                end_visible:false,//结束活动
                add_visible:false,//新增活动
                current_id:'',
                current_time:'',
                count:0,//总条数
                params: {//查询参数
                    search: '',
                    // startRange: '',
                    // endRange: '',
                    // page: 1,
                    // limit: 10,
                    // department_ids: '',
                    // export: '',
                    total:'',//总页数
                    current_page:'',//当前页数
                    per_page:10,//一页多少条
                    last_page:'',//最后一页的条数
                    first_page_url:'',//第一页的URL
                    last_page_url:'',//最后一页的URL
                    prev_page_url:'',//上一页的URL
                    next_page_url:'',//下一页的URL
                    from:'',//当前页 数据第一项的编号
                    to:'',//当前页 数据最后一项的编号
                },
                showData:{
                    name:'',
                    start_time:'',
                    over_time:'',
                    address:'',
                    content:'',
                },
                actionTime:[],//活动时间
                dataLists:[],//列表

                endTimes:[

                ],

            }
        },
        mounted(){
          this.getDataLists();
        },

        methods:{
            handleChangePage(page) {
                this.params.current_page = page;
                this.getDataLists();
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
            //详情
            detail(id,index){
                this.detail_visible = true;
                this.current_id = id;
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event/'+id,).then(res => {
                    if(res.status===200){
                        this.showData = res.data.data[index];
                        console.log(res)
                    }

                })
            },
            handleOkDel(){

            },
            //新增活动
            add(){
                this.add_visible = true;
                this.current_id = '';
                for(let item of Object.keys(this.showData)){
                    this.showData[item] = '';
                }
            },
            //发布
            submit(){
                this.showData.start_time = this.actionTime[0];
                this.showData.over_time = this.actionTime[1];
                console.log(this.showData);
                this.$http.post(globalConfig.newMedia_sever+'/api/club/event',this.showData).then(res => {
                    this.add_visible  = false;
                    this.callbackSuccess(res);
                })
            },
            //预览
            preview(){
                this.detail_visible = true;
                this.showData.start_time = this.actionTime[0];
                this.showData.over_time = this.actionTime[1];
            },


            //获取列表
            getDataLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/club/event',this.params).then(res => {
                    if(res.status===200){
                        this.dataLists = res.data.data;
                        this.count = res.data.total;

                        for(let item of res.data.data){
                            // this.endTimes.push({over_time:item.over_time});
                            var yourtime = item.over_time.replace("-","/");
                            var d2=new Date();
                            var d1 = new Date(Date.parse(yourtime));
                            if(d1>d2){
                                this.endTimes.push(1);
                            }else {
                                this.endTimes.push(2);
                            }
                        }
                        console.log(this.endTimes);

                    }
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/club/index.scss";
    @mixin clubImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #club{
            .mainList{
                .list {
                    .list-info {
                        .list-box {
                            .list-top {
                                img {
                                }
                            }
                            .list-middle {
                                .list-middle-info{
                                    .list-middle-left {
                                        span:nth-child(1){
                                        }
                                        span:nth-child(2){
                                        }
                                    }
                                    .list-middle-right{
                                        span{
                                        }
                                    }
                                    .end{
                                        @include clubImg('theme1','status_right_icon2.png')
                                    }
                                    .process{
                                        @include clubImg('theme1','status_right_icon1.png')
                                    }
                                }
                            }
                            .list-bottom{
                                .list-bottom-info{
                                    span{
                                        i{

                                        }
                                    }
                                    span:nth-child(1) i{
                                        @include clubImg('theme1','shijian.png')
                                    }
                                    span:nth-child(2) i{
                                        @include clubImg('theme1','ico_yueduliang.png')
                                    }
                                }
                            }
                        }
                    }
                }

            }
            .top_right_img{
                @include clubImg('theme1','denglong.png')
            }
        }


    }


</style>
