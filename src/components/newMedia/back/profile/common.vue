<template>
    <div id="common">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click.stop="openAdd"><b>+</b></div>
            </div>
        </div>

        <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'
             v-if="chooseTab===1">
            <div id="profile_video_back">
                <div class="mainList scroll_bar">
                    <div class="video-lists">
                        <div class="video-list-info flex-center" v-for="(item,index) in videoData">
                            <div class="video-box">
                                <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                    <img-slider :arr="item.file_id" :single="true"
                                                :size="{width:'100%',height:'100%'}"></img-slider>
                                </div>
                                <div class="video-box-bottom">
                                    <div class="title">{{item.name}}</div>
                                    <div class="flex-center justify-bet">
                                        <span class="time">{{item.created_at}}</span>
                                        <span class="btn">
                                    <i @click.stop="openEdit(item)"></i>
                                    <i @click.stop="delete_visible=true;current_item=item"></i>
                                </span>
                                    </div>
                                </div>
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

        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="chooseTab===2">
            <div id="profile_file_back">
                <div class="right-info flex-center">
                    <div class="scroll_bar">
                        <div v-for="(item,index) in fileData" class="right-info-list flex-center">
                            <div class="right-info-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                <p class="flex-center">
                                        <span v-show="seen&&index===current">
                                            <i @click.stop="openEdit(item)">编辑</i>
                                            <i @click.stop="delete_visible=true;current_item=item">删除</i>
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
            </div>
        </div>

        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--删除-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除文件吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消
                    </el-button>
                </div>
            </div>
        </lj-dialog>
        <lj-dialog :visible="visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="visible=false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{flag===1?'编辑文件':flag===2?'新增文件':flag===3?'文件详情':''}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form label-width="80px">

                        <el-form-item label="资料类型" prop="type_id">
                            <el-select placeholder="请选择" v-model="form.type_id">
                                <el-option v-for="(item,index) in selects" :label="item.title" :value="item.id"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="资料名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入"></el-input>
                        </el-form-item>

                        <el-form-item label="查看权限" prop="permission_names">
                            <div class="justify-bet">
                                <el-input @focus="organSearch('department')" v-model="form.permission_org_name"
                                          placeholder="请选择部门" style="margin-right: 10px"></el-input>
                                <el-input @focus="organSearch('staff')" v-model="form.permission_user_name"
                                          placeholder="请选择用户"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="添加附件">
                            <lj-upload v-model="form.file_info" size="40"
                                       style="position: absolute; top: -12px;"></lj-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" v-if="flag===1||flag===2" size="small" @click="submit(flag)">确定</el-button>
                    <el-button type="info" v-if="flag===1||flag===2" size="small"
                               @click="visible=false">取消
                    </el-button>
                    <el-button type="danger" v-if="flag===3" size="small" @click="visible=false">关闭
                    </el-button>
                </div>
            </div>
        </lj-dialog>
        <PostOrgan :module="postModule" :organData="organData" @close="hiddenOrgan"></PostOrgan>
        <DepartOrgan :module="departModule" :organData="organData" @close="hiddenOrgan"></DepartOrgan>
        <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import BackVideo from './video.vue';
    import BackDocument from './file.vue';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
    import PostOrgan from '../../../../components/common/postOrgan.vue';
    import LjUpload from '../../../common/lightweightComponents/lj-upload';
    import DepartOrgan from '../../../common/departOrgan.vue';
    import StaffOrgan from '../../../common/staffOrgan.vue';

    export default {
        name: "common",
        components: {
            mediaList,
            LjDialog,
            BackDocument,
            BackVideo,
            ImgSlider,
            PostOrgan,
            LjUpload,
            DepartOrgan,
            StaffOrgan


        },
        data() {
            return {
                chooseTab: 1,//tab切换
                showFinMenuList: false,
                selects: [{id: 1, title: "视频", url: 'BackVideo'}, {id: 2, title: "文档", url: 'BackDocument'}],
                delete_visible: false,//删除
                visible: false,//弹窗状态
                postModule: false,//岗位
                departModule: false,//部门
                staffModule: false,//员工
                module_type: '',


                organData: {},// 组织架构配置 选择数量 num

                flag: 1,
                current: '',//当前
                current_item: '',
                seen: false,//显隐
                count: 0,
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                    type_id: 1,
                    all: 1
                },
                videoData: [],
                fileData: [],
                form: {
                    name: '',//文件名
                    type_id: '',//文件类型
                    permission: {
                        org_id: [],
                        user_id: [],
                    },
                    file_info: [],
                    permission_org: [],
                    permission_user: [],
                    permission_org_name: '',//部门名称
                    permission_user_name: '',//用户名称
                },

            }
        },
        watch: {
            '$route': 'getPath',
        },
        mounted() {
            this.getDataLists();
            // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);//滚动加载
        },

        methods: {
            //换页
            handleChangePage(page) {
                this.params.offset = page;
                this.getDataLists();
            },
            getPath() {
                this.chooseTab = this.$route.query.type;
            },
            openFile(val) {
                console.log(val);
                window.open(val);
            },
            changeTabs(id, url) {
                this.chooseTab = id;
            },
            openAdd() {
                this.visible = true;
                this.flag = 2;

                this.form.permission.org_id= [];
                this.form.permission.user_id= [];
                this.form.file_info= [];
                this.form.permission_org= [];
                this.form.permission_user= [];
                this.form.permission_org_name='';
                this.form.permission_user_name='';
                this.form.type_id= '';
                this.form.file_info = [];
                this.form.name='';

            },
            //编辑弹出
            openEdit(row) {
                // for (let item of Object.keys(this.form)) {
                //     this.form[item] = '';
                // }
                // this.form.permission.org_id= [];
                // this.form.permission.user_id= [];
                // this.form.file_info = [];
                this.form.permission.org_id= [];
                this.form.permission.user_id= [];
                this.form.file_info= [];
                this.form.permission_org= [];
                this.form.permission_user= [];
                this.form.permission_org_name='';
                this.form.permission_user_name='';
                this.form.type_id= '';
                this.form.file_info = [];
                this.form.name='';

                this.visible = true;
                this.current_item = row;
                this.flag = 1;
                this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin/' + row.id).then(res => {
                    if (res.status === 200) {
                        for (let item of Object.keys(this.form)) {
                            this.form[item] = res.data[item];
                        }
                        this.form.permission_org_name = res.data.permission_org[0]?.name;
                        this.form.permission_user_name = '';
                        this.form.file_info = [];
                        for (let item of res.data.permission_user) {
                            this.form.permission_user_name += item.name + '、';
                        }
                        for (let item of res.data.file_id) {
                            this.form.file_info.push(item.id);
                        }
                    }
                })
            },

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
            //         this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
            //                 this.showLoading(false);
            //                 let arr = res.data.data;
            //                 if (arr.length === 0) {
            //                     this.loaded = false;
            //                     this.nomore = true;//没有更多
            //                     return
            //                 }
            //                 for (let item of arr){
            //                     this.dataLists.push(item);
            //                 }
            //                 // this.dataLists = [...this.dataLists, ...arr];
            //
            //             }
            //         ).catch(err => {
            //             console.log(err)
            //         })
            //     }
            // },
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
            // cancelAdd(){
            //     this.visible = false;
            //     this.current_item = '';
            //     this.$emit('callbackCancel',this.visible)
            // },
            // 查看详情
            // openDetail(row) {
            //     for (let item of Object.keys(this.form)) {
            //         this.form[item] = '';
            //     }
            //     this.visible = true;
            //     this.current_item = row;
            //     this.flag = 3;
            //     this.$http.get(globalConfig.newMedia_sever+'/api/datum/admin/'+row.id).then(res=>{
            //         if(res.status===200){
            //             let result = res.data;
            //             let position_arr = result.position;
            //             let file_arr = result.file_id;
            //             let names = '';
            //             let position_arr_ids = [];
            //             let file_arr_ids=[];
            //             for(let item of position_arr){//权限ids
            //                 names += item.name+'、';
            //                 position_arr_ids.push(item.id);
            //             }
            //             for(let item of file_arr){//文件ids
            //                 file_arr_ids.push(item.id)
            //             }
            //             this.form.position_name = names;
            //             this.form.position = position_arr_ids;
            //             this.form.file_id = file_arr_ids;
            //             this.form.file_info = file_arr;
            //             this.form.name = result.name;
            //         }
            //     })
            // },
            organSearch(type) {
                if (type === 'department') {
                    this.departModule = true;
                    this.module_type = type;
                } else if (type === 'staff') {
                    this.staffModule = true;
                    this.module_type = type;
                }
            },
            // 关闭 选择人员
            hiddenOrgan(ids, names, arr) {
                this.postModule = false;
                this.staffModule = false;
                this.departModule = false;
                if (ids !== 'close') {
                    if (this.module_type === 'department') {
                        this.form.permission.org_id = ids;
                        this.form.permission_org_name = names;
                    } else if (this.module_type === 'staff') {
                        this.form.permission.user_id = ids;
                        this.form.permission_user_name = names;
                    }
                }
            },

            //移入
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            //移出
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            //获取列表
            getDataLists() {
                this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
                    if (res.status === 200) {
                        // this.dataLists = res.data.data;
                        this.fileData = [];
                        this.videoData = [];
                        for (let item of res.data.data) {
                            if (item.type_id === 2) {
                                this.fileData.push(item)
                            } else if (item.type_id === 1) {
                                this.videoData.push(item)
                            }
                        }
                        this.count = res.data.total;
                    } else {
                        this.fileData = [];
                        this.videoData = [];
                        this.count = 0
                    }
                })
                // if(this.chooseTab===1){
                //
                // }else if(this.chooseTab===2){
                //     this.params.limit = 15;
                //     this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
                //         if (res.status === 200) {
                //             this.fileData = [];
                //             for(let item of res.data.data){
                //                 if(item.type_id===2){
                //                     this.fileData.push(item)
                //                 }
                //             }
                //             this.count = res.data.total;
                //         }else{
                //             this.dataLists = [];
                //             this.count = 0
                //         }
                //     })
                // }
            },

            //编辑提交
            //新增资料
            submit(type) {
                let paramsForm = {
                    type_id: this.form.type_id,//string
                    name: this.form.name,//string
                    permission: this.form.permission,//{}
                    file_id: this.form.file_info[0],//int
                };
                if (type === 1) {//编辑
                    this.$http.put(globalConfig.newMedia_sever + '/api/datum/admin/' + this.current_item.id, paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';

                    })
                } else if (type === 2) {//新增
                    this.$http.post(globalConfig.newMedia_sever + '/api/datum/admin', paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';
                    })
                }
            },
            //确认删除
            delOk() {
                this.$http.delete(globalConfig.newMedia_sever + '/api/datum/admin/' + this.current_item.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                    this.current_item = '';
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/profile/common.scss";

    @mixin profile_common($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #profile_video_back {
            .video-lists {
                .video-list-info {
                    .video-box {
                        .video-box-top {
                            video {
                            }

                            .video-start-icon {
                                @include profile_common('theme1', 'start.png')
                            }

                            .video-modal {
                            }
                        }


                        .video-box-bottom {
                            .title {
                            }

                            .time {

                            }

                            .btn {
                                i {
                                }

                                i:nth-child(1) {
                                    @include profile_common('theme1', 'bianji.png')
                                }

                                i:nth-child(2) {
                                    @include profile_common('theme1', 'shanchu.png')
                                }
                            }

                        }
                    }
                }
            }
        }

        #profile_file_back {

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

            .right-info {

                > div {

                    .right-info-list {

                        .right-info-box {
                            .word_icon {
                                @include profile_common('theme1', 'word_icon.png');
                            }

                            p {

                            }

                            p:first-child {

                                &:hover {

                                }

                                span {
                                    i {
                                        &:hover {

                                        }
                                    }

                                }
                            }

                            p:last-child {

                            }
                        }
                    }
                }

                .bg-img {

                }
            }
        }

        .window {
            .video-container .play-container {
                width: 480px !important;
                height: 300px !important;
            }
        }
    }


</style>