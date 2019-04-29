<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="excellentStaff">
            <div class="staff_info" ref='viewBox'>
                <div class="staff_list_info">
                    <div class="staff_box" v-for="(item,index) in staffData">
                        <div class="flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                            <div class="img-modal" v-if="seen&&index===current">
                                <span @click="routerLink(staffDetailUrl,item.id)"></span>
                                <span @click="withdraw_visible = true;current_id = item.id"></span>
                            </div>
                            <img :src="item.user_id.avatar" alt="">
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



        </div>
    </div>

</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    import UE from '../../../../../components/common/UE.vue';
    export default {
        name: "excellentStaff",
        components:{
            LjDialog,
            UE,
        },
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
            }
        },
        mounted(){
            this.getDataLists();
            // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
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
                        > div {
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