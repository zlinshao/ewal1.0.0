<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="profile_video_back">
            <div class="mainList scroll_bar">
                <div class="video-lists">
                    <div class="video-list-info flex-center" v-for="(item,index) in dataLists">
                        <div class="video-box" @click.stop="openDetail(item)">
                            <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                <img-slider :arr="item.file_id" :single="true"
                                            :size="{width:'100%',height:'100%'}"></img-slider>
                            </div>
                            <div class="video-box-bottom">
                                <div class="title">{{item.name}}</div>
                                <div class="flex-center justify-bet">
                                    <span class="time">{{item.created_at}}</span>
                                    <span class="btn">
                                    <i @click.stop="edit(item)"></i>
                                    <i @click.stop="del(item)"></i>
                                </span>
                                </div>
                            </div>
                        </div>
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

            <!---->
            <lj-dialog :visible="visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                       @close="cancelAdd">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>{{flag===1?'编辑视频':flag===2?'新增视频':flag===3?'讲师详情':''}}</h3>
                    </div>
                    <div class="dialog_main borderNone">
                        <el-form label-width="80px">

                            <el-form-item label="资料类型" prop="type_id">
                                <el-select placeholder="请选择" v-model="form.type_id">
                                    <el-option v-for="(item,index) in selects" :label="item.title" :value="item.id" :key="index"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="资料名称" prop="name">
                                <el-input v-model="form.name" placeholder="请输入"></el-input>
                            </el-form-item>

                            <el-form-item label="查看权限" prop="permission_names">
                                <el-input @focus="organSearch"  v-model="form.permission_names" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="添加附件">
                                <lj-upload v-model="form.file_info" size="40" style="position: absolute; top: -12px;"></lj-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog_footer">
                        <el-button type="danger" v-if="flag===1||flag===2" size="small" @click="submit(flag)">确定</el-button>
                        <el-button type="info" v-if="flag===1||flag===2" size="small"
                                   @click="cancelAdd">取消
                        </el-button>
                        <el-button type="danger" v-if="flag===3" size="small" @click="cancelAdd">关闭
                        </el-button>
                    </div>
                </div>
            </lj-dialog>

            <PostOrgan :module="postModule" :organData="organData" @close="hiddenOrgan"></PostOrgan>

        </div>
    </div>

</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
    import LjUpload from '../../../common/lightweightComponents/lj-upload';
    import PostOrgan from '../../../../components/common/postOrgan.vue';


    export default {
        props: ['is_add'],
        name: "backVideo",
        components: {
            mediaList,
            LjDialog,
            LjUpload,
            ImgSlider,
            PostOrgan
        },
        data() {
            return {
                showFinMenuList: false,
                delete_visible: false,
                visible: false,
                postModule: false,
                organData: {},// 组织架构配置 选择数量 num
                chooseTab: 1,
                flag: 1,
                current: '',//当前
                current_item: '',
                seen: false,//显隐
                selects: [
                    {id: 1, title: "视频"}, {id: 2, title: "文档"}
                ],
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 6,
                    department_ids: '',
                    export: '',
                    type_id: 1,
                    all:1
                },
                dataLists: [],
                form: {
                    name: '',
                    file_info:[],//视频的七牛云文件数组
                    position: '',//岗位id数组
                    position_name:'',//岗位名称
                    file_id:'',//视频的七牛云文件id
                },
            }
        },
        watch: {
            is_add:{
                handler(val){
                    this.visible = val;
                    this.flag = 2;
                    for (let item of Object.keys(this.form)) {
                        this.form[item] = '';
                    }
                },
                deep:true
            }
        },
        mounted() {
            this.getDataLists();
            this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
        },
        methods: {
            throttle(fn, delay, atleast) {
                /**函数节流方法
                 @param Function fn 延时调用函数
                 @param Number dalay 延迟多长时间
                 @param Number atleast 至少多长时间触发一次
                 @return Function 延迟执行的方法
                 */
                let timer = null;
                let previous = null;
                return function () {
                    var now = +new Date();
                    if (!previous) previous = now;
                    if (atleast && now - previous > atleast) {
                        fn();
                        // 重置上一次开始时间为本次结束时间
                        previous = now;
                        clearTimeout(timer);
                    } else {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            fn();
                            previous = null;
                        }, delay);
                    }
                }
            },
            setpage() {
                if (this.nomore && !this.loaded) return;//到达底部不再执行
                if (this.$refs.viewBox.scrollTop + this.$refs.viewBox.offsetHeight + 20 >= this.$refs.viewBox.scrollHeight) {
                    this.showLoading(true);
                    this.params.offset += 1;
                    this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
                            this.showLoading(false);
                            let arr = res.data.data;
                            if (arr.length === 0) {
                                this.loaded = false;
                                this.nomore = true;//没有更多
                                return
                            }
                            for (let item of arr){
                                this.dataLists.push(item);
                            }
                            // this.dataLists = [...this.dataLists, ...arr];

                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }
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
            cancelAdd(){
                this.visible = false;
                this.current_item = '';
                this.$emit('callbackAdd',this.visible)
            },
            // 查看详情
            openDetail(row) {
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
                this.visible = true;
                this.current_item = row;
                this.flag = 3;
                this.$http.get(globalConfig.newMedia_sever+'/api/datum/admin/'+row.id).then(res=>{
                    if(res.status===200){
                        let result = res.data;
                        let position_arr = result.position;
                        let file_arr = result.file_id;
                        let names = '';
                        let position_arr_ids = [];
                        let file_arr_ids=[];
                        for(let item of position_arr){//权限ids
                            names += item.name+'、';
                            position_arr_ids.push(item.id);
                        }
                        for(let item of file_arr){//文件ids
                            file_arr_ids.push(item.id)
                        }
                        this.form.position_name = names;
                        this.form.position = position_arr_ids;
                        this.form.file_id = file_arr_ids;
                        this.form.file_info = file_arr;
                        this.form.name = result.name;
                    }
                })
            },
            organSearch() {
                this.postModule = true;
            },
            // 关闭 选择人员
            hiddenOrgan(ids, names, arr) {
                this.postModule = false;
                if (ids !== 'close') {
                    this.form.permission = ids;
                    this.form.permission_names = names;
                }
            },

            //tab切换
            changeTabs(id) {
                this.chooseTab = id;
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
                        this.dataLists = res.data.data;
                    }else{
                        this.dataLists = [];
                        this.count = 0
                    }
                })

            },
            //编辑弹出
            edit(row) {
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
                this.visible = true;
                this.current_item = row;
                this.flag = 1;
                this.$http.get(globalConfig.newMedia_sever+'/api/datum/admin/'+row.id).then(res=>{
                    if(res.status===200){
                        let result = res.data;
                        let position_arr = result.position;
                        let file_arr = result.file_id;
                        let names = '';
                        let position_arr_ids = [];
                        let file_arr_ids=[];
                        for(let item of position_arr){//权限ids
                            names += item.name+'、';
                            position_arr_ids.push(item.id);
                        }
                        for(let item of file_arr){//文件ids
                            file_arr_ids.push(item.id)
                        }
                        this.form.position_name = names;
                        this.form.position = position_arr_ids;
                        this.form.file_id = file_arr_ids;
                        this.form.file_info = file_arr;
                        this.form.name = result.name;
                    }
                })
            },
            //删除弹窗
            del(row) {
                this.delete_visible = true;
                this.current_item = row;
            },
            //编辑提交
            //新增资料
            submit(type){
                let paramsForm = {
                    type_id:this.form.type_id,
                    name:this.form.name,
                    permission:this.form.permission,
                    file_id:this.form.file_id[0],
                };
                if(type===1){
                    this.$http.put(globalConfig.newMedia_sever+'/api/datum/admin/'+this.current_item.id,paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';
                        this.$emit('callbackAdd',this.visible)
                    })
                }else if(type===2){
                    this.$http.post(globalConfig.newMedia_sever+'/api/datum/admin',paramsForm).then(res => {
                        this.callbackSuccess(res);
                        this.visible = false;
                        this.current_item = '';
                        this.$emit('callbackAdd',this.visible)
                    })
                }


            },
            //确认删除
            delOk() {
                this.$http.delete(globalConfig.newMedia_sever + '/api/datum/admin/' + this.current_item.id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/profile/video.scss";

    @mixin profile_video($n, $m) {
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
                                @include profile_video('theme1', 'start.png')
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
                                    @include profile_video('theme1', 'bianji.png')
                                }

                                i:nth-child(2) {
                                    @include profile_video('theme1', 'shanchu.png')
                                }
                            }

                        }
                    }
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