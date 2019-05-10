<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="excellentStaff">
            <div class="staff_info" ref='viewBox'>
                <div class="staff_list_info">
                    <div class="staff_box" v-for="(item,index) in staffData">
                        <div class="staff_box_info flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                            <div class="img-modal" v-if="seen&&index===current">
                                <span @click="routerLink(staffDetailUrl,item.id)"></span>
                                <span @click="withdraw_visible = true;current_id = item.id"></span>
                            </div>
                            <img :src="item.user_id.avatar" alt="" width="216px" height="309px">
                        </div>
                        <p><span>{{item.depart}}</span><span>{{item.user_id.name}}</span></p>
                    </div>

                </div>
            </div>

            <!--撤下优秀员工-->
            <lj-dialog :visible="withdraw_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                       @close="withdraw_visible = false">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <h3>撤下</h3>
                    </div>
                    <div class="dialog_main">
                        <div class="unUse-txt">确定撤下该优秀员工吗？</div>
                    </div>
                    <div class="dialog_footer">
                        <el-button type="danger" size="small" @click="withdraw">确定</el-button>
                        <el-button type="info" size="small" @click="withdraw_visible = false;current_id = ''">取消
                        </el-button>
                    </div>
                </div>
            </lj-dialog>
            <lj-dialog :visible="add_visible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="cancelAddStatus">
                <div class="dialog_container">
                    <div class="dialog_header">
                    <h3>乐伽之星</h3>
                    </div>
                    <div class="dialog_main borderNone">
                    <el-form v-model="form" label-width="80px">
                        <el-form-item label="姓名">
                        <user-choose width='700' v-model="form.name"></user-choose>
                        </el-form-item>
                        
                        <el-form-item label="文章内容">
                        <div class="item_content">
                            <lj-editor :editorContent="form.content"></lj-editor>
                        </div>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div class="dialog_footer">
                    <el-button size="small" type="warning">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="cancelAddStatus">取消</el-button>
                    </div>
                </div>
                </lj-dialog>


        </div>
    </div>

</template>

<script>
    import LjEditor from '../../../../common/lj-editor.vue';
    import UserChoose from '../../../../common/lightweightComponents/UserChoose';
    import LjDialog from '../../../../common/lj-dialog.vue';
    import UE from '../../../../../components/common/UE.vue';
    export default {
        name: "excellentStaff",
        components:{
            LjDialog,
            UE,
            LjEditor,
            UserChoose
        },
        props: ['add_status', 'choose_type'],
        data(){
            return{
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 8,
                    department_ids: '',
                    export: '',
                },
                current: '',//当前
                seen: false,//显隐
                staffDetailUrl: 'staffDetail',
                withdraw_visible:false,//撤下
                visible:false,
                current_id:'',
                staffData: [],
                form:{
                    name:'赵丽颖',
                    content:'国际上的飞机上的就发生的纠纷双方品搜东方'
                },
                add_visible:false,
            }
        },
        mounted(){
            this.getDataLists();
            // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
        },
        watch:{
            add_status: {
            handler (val) {
                this.add_visible = val;
            }, deep: true
            },
        },
        methods:{
            getDataLists(){
                this.$http.get(globalConfig.newMedia_sever+'/api/humanity/excellent',this.params).then(res=>{
                    if(res.status===200){
                        this.staffData = res.data.data;
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
            //         // this.loadingTip = true;  //loading提示语
            //         this.showLoading(true);
            //         this.params.page +=1;
            //         this.$http.get(globalConfig.newMedia_sever + '/api/humanity/excellent', this.params).then(res => {
            //                 let arr = res.data.data;
            //                 if (arr.length === 0) {
            //                     //some tips
            //                     this.loaded = false;
            //                     this.nomore = true;//没有更多
            //                     return
            //                 }
            //                 this.staffData = [...this.staffData, ...arr];
            //                 this.showLoading(false);
            //             }
            //         ).catch(err => {
            //             console.log(err)
            //         })
            //     }
            // },

            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            //撤下
            withdraw(){
                this.$http.delete(globalConfig.newMedia_sever+'/api/humanity/excellent/'+this.current_id,).then(res=>{
                    if(res.status===200){
                        this.$LjNotify('success', {
                            title: '成功',
                            message: res.msg,
                            subMessage: '',
                        });
                        this.withdraw_visible=false;
                        this.getDataLists();

                    }else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: res.msg,
                            subMessage: '',
                        });
                    }
                })
            },
            cancelAddStatus () {//取消
                this.add_visible = false;
                this.$emit('cancelAdd', this.add_visible)
            },
            postReceivable_tag(){
                this.add_visible = false
                this.$emit('cancelAdd', this.add_visible)
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/excellentStaff.scss";
    @mixin starImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #excellentStaff{
            .staff_info {
                @include starImg('theme1', 'background_2.png');

                .staff_list_top {
                    @include starImg('theme1', 'yxyg_dashang.png');
                }

                .staff_list_info {
                    .staff_box {
                        .staff_box_info {
                            .img-modal {
                                span:nth-child(1) {
                                    @include starImg('theme1', 'staff_bianji.png');
                                }

                                span:nth-child(2) {
                                    @include starImg('theme1', 'staff_shanchu.png');
                                }
                            }

                            @include starImg('theme1', 'youxiu_grey.png');

                            &:hover {
                                @include starImg('theme1', 'youxiu_red.png');
                            }

                        }
                    }

                }

            }
        }
    }
</style>