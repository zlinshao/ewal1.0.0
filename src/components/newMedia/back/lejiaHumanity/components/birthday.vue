<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="birthday">
            <div class="birthday_info">
                <div class="today_birthday justify-center">
                    <div class="today_birthday_list">
                        <div class="birthday_box flex-center" v-for="(item,index) in todayBirthday">
                            <div class="birthday_box_info" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                <div class="">
                                    <img :src="item.avatar" alt="">
                                    <div class="delete-icon" v-if="seen&&index===current"
                                         @click="delete_visible=true;current_id=item.id"></div>
                                </div>
                                <div class="user-info">
                                    <span class="writingMode">{{item.department_name}}</span>
                                    <span class="writingMode">{{item.name}}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <!--删除寿星信息-->
            <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                       @close="delete_visible = false">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>删除</h3>
                    </div>
                    <div class="dialog_main">
                        <div class="unUse-txt">确定删除这条寿星信息吗？</div>
                    </div>
                    <div class="dialog_footer">
                        <el-button type="danger" size="small" @click="delOk">确定</el-button>
                        <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                    </div>
                </div>
            </lj-dialog>

            <lj-dialog :visible="visible" :size="{width: 400 + 'px',height: 400 + 'px'}"
                       @close="visible = false">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>新增寿星</h3>
                    </div>
                    <div class="dialog_main borderNone">
                        <el-form v-model="form" label-width="80px">
                            <el-form-item label="寿星姓名">
                                <el-input v-model="form.name" @focus="staffModule=true"></el-input>
                            </el-form-item>
                            <el-form-item label="寿星类型" prop="birthday_type">
                                <el-select placeholder="请选择" v-model="form.birthday_type">
                                    <el-option label="今日寿星" value='day'></el-option>
                                    <el-option label="本月寿星" value='month'></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="寿星照片">
                                <lj-upload v-model="file_info" size="40"
                                           style="position: absolute; top: -12px;"></lj-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog_footer">
                        <el-button type="danger" size="small" @click="submit">确定</el-button>
                        <el-button type="info" size="small" @click="visible = false;current_row = ''">取消
                        </el-button>
                    </div>
                </div>
            </lj-dialog>
            <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>
        </div>
    </div>

</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    import LjUpload from '../../../../common/lightweightComponents/lj-upload';
    import StaffOrgan from '../../../../common/staffOrgan.vue';

    export default {
        name: "birthday",
        components: {
            LjDialog,
            LjUpload,
            StaffOrgan
        },
        props: ['chooseTabType','chooseType'],
        data() {
            return {
                delete_visible: false,
                visible: false,
                staffModule: false,
                current: '',//当前
                seen: false,//显隐
                current_id: '',
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                todayBirthday: [],
                file_info: [],
                form: {
                    name: '',
                    user_id: '',
                    birthday_type: '',
                    image_file_id: '',
                },

            }
        },
        mounted() {
            this.getDataLists();
            this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
        },
        watch: {
            chooseType: {
                handler(val) {
                    if (val === 3) {
                        this.visible = true;
                    }
                },
                deep: true
            }
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
                    // this.loadingTip = true;  //loading提示语
                    this.showLoading(true);
                    this.params.page += 1;
                    this.$http.get(globalConfig.newMedia_sever + '/api/humanity/birthday', this.params).then(res => {
                            let arr =[] ;
                            for (let item of res.data.data) {
                                arr.push({
                                    name: item.user_id.name,
                                    avatar: item.image_file_id.uri,
                                    department_name: item.user_id.org.length > 0 ? item.user_id.org[0].name : '',
                                    id: item.id
                                })
                            }
                            if (arr.length === 0) {
                                //some tips
                                this.loaded = false;
                                this.nomore = true;//没有更多
                                return
                            }
                            this.todayBirthday = [...this.todayBirthday, ...arr];
                            this.showLoading(false);
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }
            },
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            //获取bus传值
            getVal(val) {
                this.visible = val;//新增弹窗显示
                console.log(Object.keys(this.form));
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
            },
            //获取员工信息
            hiddenStaff(ids, names, arr) {
                this.staffModule = false;
                if (ids !== 'close') {
                    this.form.name = names;
                    this.form.user_id = ids[0];
                }
            },
            //删除弹框
            del(id, index) {
                this.delete_visible = true;
                this.current_id = id;
            },
            //确认删除
            delOk() {
                this.$http.delete(globalConfig.newMedia_sever + '/api/humanity/birthday/' + this.current_id,).then(res => {
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.getDataLists();
                        this.delete_visible = false;
                        this.current_id = ''
                    } else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            },
            //获取列表
            getDataLists() {
                this.$http.get(globalConfig.newMedia_sever + '/api/humanity/birthday', this.params).then(res => {
                    if (res.status === 200) {
                        // this.todayBirthday = res.data.data;
                        let birthdayData = res.data.data;
                        let list = [];
                        for (let item of birthdayData) {
                            list.push({
                                name: item.user_id.name,
                                avatar: item.image_file_id.uri,
                                department_name: item.user_id.org.length > 0 ? item.user_id.org[0].name : '',
                                id: item.id
                            })
                        }
                        this.todayBirthday = list;
                    }
                })
            },
            //提交
            submit() {
                this.form.image_file_id = this.file_info[0];
                this.$http.post(globalConfig.newMedia_sever + '/api/humanity/birthday', this.form).then(res => {
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.visible = false;
                        this.current_id = '';
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

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/birthday.scss";

    @mixin starImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $m + '/' + $n;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #birthday {

            .birthday_info {

                .today_birthday {

                    .today_birthday_list {

                        .birthday_box {

                            .birthday_box_info {

                                > div {

                                    > img {

                                    }

                                    .delete-icon {
                                        @include starImg('staff_shanchu.png', 'theme1')
                                    }

                                }

                                .user-info {

                                    span {

                                    }
                                }
                            }


                        }
                    }

                }

            }
        }
    }
</style>