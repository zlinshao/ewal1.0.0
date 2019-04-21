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

        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
            <div class="list">
                <div class="list-info flex-center" v-for="(item,index) in dataLists">
                    <div class="list-box" @click="detail(item)">
                        <div class="list-modal" v-if="item.status ===2"></div>
                        <div class="list-top"><img src="../../../../assets/image/newMedia/theme1/active.png" alt="">
                        </div>
                        <div class="list-middle">
                            <div class="list-middle-info">
                                <div class="list-middle-left">
                                    <span>{{item.name}}</span>
                                    <span>{{item.created_at}}</span>
                                </div>
                                <div class="list-middle-right" :class="item.status ===2 ? 'end':'process'">
                                    <span>{{item.status===2? '已结束':item.status===1?'进行中':item.status===0?'':'未开始'}}</span>
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
                        :current-page="params.offset"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>

        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--详情-->
        <lj-dialog :visible="detail_visible" :size="{width:1200 + 'px',height: '620' + 'px'}"
                   @close="detail_visible = false">
            <div class="action_info">
                <h3 class="justify-start">活动详情</h3>
                <div>
                    <div class="action_name">
                        <div class="action_left" style="width: 70px;float: left">活动名称</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">{{showData.name}}
                        </div>
                    </div>
                    <div class="action_name">
                        <div class="action_left" style="width: 70px;float: left">活动时间</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">
                            <span>{{showData.actionTime[0]}}-{{showData.actionTime[1]}}</span>
                        </div>
                    </div>
                    <div class="action_name">
                        <div class="action_left" style="width: 70px;float: left">活动地址</div>
                        <div class="action_right" style="width: 860px;text-align: left;float: left">
                            {{showData.address}}
                        </div>
                    </div>
                    <div class="action_name" style="border-bottom: 0">
                        <div class="action_left" style="width: 70px;float: left">活动内容</div>
                        <div class="action_right action_address"
                             style="width: 860px;text-align: left;float: left;height: 100px">{{showData.content}}
                        </div>
                    </div>

                </div>
            </div>
            <div style="position: absolute;bottom:50px;left:0;right:0;" v-if="showData.status===1">
                <el-button type="danger" size="" @click="end_visible = true">结束活动</el-button>
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
                :size="{width: 1200 + 'px' ,height: 800 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增活动</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="showData.name" class=""></el-input>
                        </el-form-item>

                        <el-form-item label="活动时间">
                            <el-date-picker
                                    v-model="showData.actionTime"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="活动地点">
                            <el-input v-model="showData.address"></el-input>
                        </el-form-item>

                        <el-form-item label="活动内容">
                            <div class="item_content">
                                <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
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
    import UE from '../../../common/UE.vue';

    export default {
        name: "club",
        components: {
            mediaList,
            LjDialog,
            UE
        },
        data() {
            return {
                showFinMenuList: false,
                detail_visible: false,//详情
                end_visible: false,//结束活动
                add_visible: false,//新增活动
                count:0,
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 6,
                    department_ids: '',
                    export: '',
                },
                showData: {
                    name: '',
                    address: '',
                    actionTime:[],
                    content: '',
                },
                actionTime: [],//活动时间
                dataLists: [],//列表

                endTimes: [],

                defaultMsg: '',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                // loaded: true,
                // nomore: false,


            }
        },
        mounted() {
            this.getDataLists();
            // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
        },

        methods: {
            // throttle(fn, delay, atleast) {
            //     /**函数节流方法
            //      @param Function fn 延时调用函数
            //      @param Number dalay 延迟多长时间
            //      @param Number atleast 至少多长时间触发一次
            //      @return Function 延迟执行的方法
            //      */
            //     let timer = null;
            //     let previous = null;
            //     return function () {
            //         var now = +new Date();
            //         if (!previous) previous = now;
            //         if (atleast && now - previous > atleast) {
            //             fn();
            //             // 重置上一次开始时间为本次结束时间
            //             previous = now;
            //             clearTimeout(timer);
            //         } else {
            //             clearTimeout(timer);
            //             timer = setTimeout(function () {
            //                 fn();
            //                 previous = null;
            //             }, delay);
            //         }
            //     }
            // },

            // setpage() {
            //     if (this.nomore && !this.loaded) return;//到达底部不再执行
            //     if (this.$refs.viewBox.scrollTop + this.$refs.viewBox.offsetHeight + 20 >= this.$refs.viewBox.scrollHeight) {
            //         this.showLoading(true);
            //         this.params.offset += 1;
            //         this.$http.get(globalConfig.newMedia_sever + '/api/club/event', this.params).then(res => {
            //                 this.showLoading(false);
            //                 let arr = res.data.data;
            //                 if (arr.length === 0) {
            //                     this.loaded = false;
            //                     this.nomore = true;//没有更多
            //                     return
            //                 }
            //                 this.dataLists = [...this.dataLists, ...arr];
            //
            //             }
            //         ).catch(err => {
            //             console.log(err)
            //         })
            //     }
            // },

            handleChangePage(page) {//分页
                this.params.offset = page;
                this.getDataLists();
            },
            callbackSuccess(res) {//回调
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
            detail(item) {//详情
                // for (let item of Object.keys(this.showData)) {
                //     this.showData[item] = '';
                // }
                let itemInfo = item;
                this.detail_visible = true;
                this.showData = itemInfo;
                let arr =[item.start_time,item.over_time];
                this.showData.actionTime = arr;
            },

            handleOkDel() {//提前结束
                this.$http.put(globalConfig.newMedia_sever + '/api/club/event/' + this.showData.id,).then(res => {
                    if (res.status === 200) {
                        this.end_visible = false;
                        this.detail_visible =false;
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
                })
            },

            add() {//新增活动
                this.add_visible = true;
                let showData ={
                    name: '',
                    address: '',
                    actionTime:[],
                    content: '',
                };
                this.showData = showData;
            },

            submit() {//发布
               let paramsForm = {
                   name:this.showData.name,
                   start_time:this.showData.actionTime[0],
                   over_time:this.showData.actionTime[1],
                   address:this.showData.address,
                   content:this.showData.content,
               };
                console.log(this.showData);
                this.$http.post(globalConfig.newMedia_sever + '/api/club/event', paramsForm).then(res => {
                    this.add_visible = false;
                    this.callbackSuccess(res);
                })
            },

            preview() {//预览
                let content = this.$refs.ue.getUEContent();
                this.detail_visible = true;
                this.showData.start_time = this.actionTime[0];
                this.showData.over_time = this.actionTime[1];
                this.showData.content = content;
                console.log(content)
            },

            getDataLists() {//获取列表
                this.showLoading(true);
                this.$http.get(globalConfig.newMedia_sever + '/api/club/event', this.params).then(res => {
                    if (res.status === 200) {
                        this.showLoading(false);
                        this.dataLists = res.data.data.sort(
                            function (a, b) {
                                return a.id - b.id
                            }
                        );
                        this.count = res.data.total;
                        console.log(this.dataLists);

                        for (let item of res.data.data) {
                            // this.endTimes.push({over_time:item.over_time});
                            var yourtime = item.over_time.replace("-", "/");
                            var d2 = new Date();
                            var d1 = new Date(Date.parse(yourtime));
                            if (d1 > d2) {
                                this.endTimes.push(1);
                            } else {
                                this.endTimes.push(2);
                            }
                        }

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

    #theme_name.theme1 {
        #club {
            .mainList {
                .list {
                    .list-info {
                        .list-box {
                            .list-top {
                                img {
                                }
                            }

                            .list-middle {
                                .list-middle-info {
                                    .list-middle-left {
                                        span:nth-child(1) {
                                        }

                                        span:nth-child(2) {
                                        }
                                    }

                                    .list-middle-right {
                                        span {
                                        }
                                    }

                                    .end {
                                        @include clubImg('theme1', 'status_right_icon2.png')
                                    }

                                    .process {
                                        @include clubImg('theme1', 'status_right_icon1.png')
                                    }
                                }
                            }

                            .list-bottom {
                                .list-bottom-info {
                                    span {
                                        i {

                                        }
                                    }

                                    span:nth-child(1) i {
                                        @include clubImg('theme1', 'shijian.png')
                                    }

                                    span:nth-child(2) i {
                                        @include clubImg('theme1', 'ico_yueduliang.png')
                                    }
                                }
                            }
                        }
                    }
                }

            }

            .top_right_img {
                @include clubImg('theme1', 'denglong.png')
            }
        }


    }


</style>
