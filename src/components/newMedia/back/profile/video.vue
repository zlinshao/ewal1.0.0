<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="profile_video_back">
            <div class="mainList scroll_bar">
                <div class="video-lists">
                    <div class="video-list-info flex-center" v-for="(item,index) in dataLists">
                        <div class="video-box" @click.stop="openDetail(item,item.id,index)">
                            <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                <img-slider :arr="item.file_info" :single="true"
                                            :size="{width:'100%',height:'100%'}"></img-slider>
                            </div>
                            <div class="video-box-bottom">
                                <div class="title">{{item.name}}</div>
                                <div class="flex-center justify-bet">
                                    <span class="time">{{item.created_at}}</span>
                                    <span class="btn">
                                    <i @click.stop="edit(item.id,index)"></i>
                                    <i @click.stop="del(item.id,index)"></i>
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

            <!--编辑-->
            <lj-dialog :visible="edit_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                       @close="closeStatus">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>{{is_add===false?'编辑资料':'新增资料'}}</h3>
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
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>

                            <el-form-item label="查看权限" prop="permission">
                                <el-input v-model="form.permission_names" @focus="organSearch"></el-input>
                            </el-form-item>
                            <el-form-item label="添加附件" prop="file_info">
                                <lj-upload v-model="form.file_info" size="40"
                                           style="position: absolute; top: -12px;"></lj-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog_footer">
                        <el-button type="danger" size="small" @click="submit(is_add)">确定</el-button>
                        <el-button type="info" size="small" @click="cancelStatus">取消</el-button>
                    </div>
                </div>
            </lj-dialog>
            <!--详情-->
            <lj-dialog :visible="detail_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                       @close="detail_visible=false">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>资料详情</h3>
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
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>

                            <el-form-item label="查看权限" prop="permission">
                                <el-input v-model="form.permission_names" @focus="organSearch"></el-input>
                            </el-form-item>
                            <el-form-item label="附件详情" prop="file_info">
                                <lj-upload :data="form.file_info" size="40" style="position: absolute; top: -12px;"
                                           disabled="disabled"></lj-upload>
                            </el-form-item>
                        </el-form>
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
        props: ['add_status'],
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
                edit_visible: false,
                detail_visible: false,
                postModule: false,
                organData: {},// 组织架构配置 选择数量 num
                chooseTab: 1,
                is_add: false,
                current: '',//当前
                current_id: '',
                seen: false,//显隐
                selects: [
                    {id: 1, title: "视频"}, {id: 2, title: "文档"}
                ],
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 6,
                    department_ids: '',
                    export: '',
                    type_id: 1,
                },
                dataLists: [],
                form: {
                    type_id: 1,//文件类型
                    name: '',
                    permission: [],//查看权限
                    file_info: [],//文件id
                    permission_names: '',//
                },
                loaded: true,
                nomore: false,


            }
        },
        watch: {
            add_status: {
                handler(val) {
                    if (val === true) {
                        this.edit_visible = true;
                        for (let item of Object.keys(this.form)) {
                            this.form[item] = '';
                        }
                        this.is_add = true;
                        this.form.permission = [1, 2];
                    }
                }
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
                    this.params.page += 1;
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
            // 查看详情
            openDetail(val, id, index) {
                this.detail_visible = true;
                for (let item of Object.keys(this.form)) {
                    this.form[item] = val[item];
                }
                console.log(val)
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
            closeStatus() {
                this.edit_visible = false;
                this.is_add = false;
                this.$emit('getAddStatus', this.is_add);
            },
            cancelStatus() {
                this.edit_visible = false;
                this.current_id = '';
                this.is_add = false;
                this.$emit('getAddStatus', this.is_add);
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
            //获取列表
            getDataLists() {
                this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
                    if (res.status === 200) {
                        this.dataLists = res.data.data;
                        console.log(this.dataLists);
                    }
                })

            },
            //编辑弹出
            edit(id, index) {
                this.edit_visible = true;
                this.current_id = id;
                this.is_add = false;
                for (let item of Object.keys(this.form)) {
                    this.form[item] = this.dataLists[index][item];
                }

            },
            //删除弹窗
            del(id, index) {
                this.delete_visible = true;
                this.current_id = id;
            },
            //编辑提交
            submit(type) {
                if (type === true) {
                    this.$http.post(globalConfig.newMedia_sever + '/api/datum/admin', this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                } else {
                    this.$http.put(globalConfig.newMedia_sever + '/api/datum/admin/' + this.current_id, this.form).then(res => {
                        this.callbackSuccess(res);
                        this.edit_visible = false;
                    })
                }


            },
            //确认删除
            delOk() {
                this.$http.delete(globalConfig.newMedia_sever + '/api/datum/admin/' + this.current_id).then(res => {
                    this.callbackSuccess(res);
                    this.delete_visible = false;
                })
            },


            //上传回调
            handleSuccessUpload(item) {
                if (item !== 'close') {
                    this.form.file_info = item[1];
                    console.log(this.form.file_info);
                }

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