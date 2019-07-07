<template>
    <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
        <div id="excellentStaff">
            <div class="staff_info" ref='viewBox'>
                <div class="staff_list_info">
                    <div class="staff_box" v-for="(item,index) in staffData">
                        <div class="staff_box_info flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                            <div class="img-modal" v-if="seen&&index===current">
                                <span @click="edit(item)"></span>
                                <span @click="withdraw_visible = true;current_id = item.id"></span>
                            </div>
                            <img :src="item.star_id ? item.star_id.avatar : ''" alt="" width="216px" height="309px">
                        </div>
                        <p><span>{{item.depart}}</span><span>{{item.star_id ? item.star_id.name :''}}</span></p>
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
            <lj-dialog :visible="add_exvisible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="cancelAddStatus">
                <div class="dialog_container">
                    <div class="dialog_header">
                    <h3>优秀员工</h3>
                    </div>
                    <div class="dialog_main borderNone">
                    <el-form v-model="form" label-width="80px">
                        <el-form-item label="姓名">
                        <user-choose width='1060' v-model="form.star_id"></user-choose>
                        </el-form-item>
                        <el-form-item label="文章内容">
                        <div class="item_content">
                            <lj-editor :editorContent="form.content"  @changeContent="getContentChange"></lj-editor>
                        </div>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="showDetail">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_Ex">发布</el-button>
                    <el-button size="small" type="info" @click="cancelAddStatus">取消</el-button>
                    </div>
                </div>
                </lj-dialog>
                <lj-dialog :visible="detail_visible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="detail_visible=false;currentRecord=null">
                    <div class="detail_info">
                        <div class="star_info_left" style="width:270px">
                        <div class="star_info_title writingMode flex-center"><span>优秀员工</span></div>
                        <div class="star_info_avatar"><img :src="exInfo.avatar"></div>
                        <div class="star_info_name writingMode flex-center"><span>{{exInfo.name}}</span></div>
                        <div class="star_info_department writingMode flex-center"><span>{{exInfo.org &&exInfo.org.length?exInfo.org[0].name:''}}</span></div>
                        </div>
                        <div class="star_info_right flex-center">
                        <div class="main_info scroll_bar">
                            <h5 class="edit_icon justify-end" v-if="currentRecord ? true : false" @click="add_exvisible=true;detail_visible=false;currentRecord=null"><span></span>编辑</h5>
                            <h3>{{exInfo.title}}</h3>
                            <div v-html="exInfo.content"></div>
                            <!-- <lj-dialog <p>{{}}</p> -->
                            <!-- <div class="justify-bet">
                            </div> -->
                        </div>
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
                detail_visible: false,
                staffDetailUrl: 'staffDetail',
                withdraw_visible:false,//撤下
                visible:false,
                current_id:'',
                staffData: [],
                form:{
                    star_id:'',
                    content:''
                },
                currentRecord: {},
                exInfo: {},
                add_exvisible:false,
            }
        },
        mounted(){
            this.getDataLists();
            // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
        },
        watch:{
            add_status: {
            handler (val) {
                console.log('----------------',val);
                this.add_exvisible = val;
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
             edit (item) {
                this.currentRecord=item;
                console.log('-----------------',item)
                this.exInfo.avatar = item && item.star_id ? item.star_id.avatar : '';
                this.exInfo.name = item && item.star_id ? item.star_id.name : '';
                this.exInfo.org = item && item.star_id ? item.star_id.org : '';
                this.exInfo.content =item.content;
                this.detail_visible = true;
                this.form.content=item.content;
                this.form.star_id=[item.star_id.id];
            },
            getContentChange (val) {
                console.log('val', val);
                this.form.content = val;
            },
            // 预览
            showDetail(){
                this.currentRecord=null;
            if(this.form.star_id && this.form.content){
            this.$http.get(globalConfig.humanResource_server + 'staff/user/'+this.form.star_id).then(res => {
                if (res.code === '20020') {
                    console.log('res.data', res.data);                    
                    this.exInfo = res.data;
                    this.exInfo.content =this.form.content;
                }
                });
            this.detail_visible=true;
            }else {
                this.$LjNotify('warning', {
                    title: '提示',
                    message: '有条目未填写',
                });
            }
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
             //发布
            postReceivable_Ex(){
                console.log('this.form.', this.form)
                let param = {
                    star_id: this.form.star_id[0],
                    content: this.form.content,
                }
                if(param.star_id == undefined|| this.form.star_id.length<0){
                    this.$LjNotify('error', {
                        title: '失败',
                        message: '人员不能为空且只能选一个',
                    });
                }else if(param.content == ''){
                    this.$LjNotify('error', {
                        title: '失败',
                        message: '内容不能为空',
                    });
                } else{
                    this.$http.post(globalConfig.newMedia_sever + '/api/humanity/excellent',param).then(res => {
                    if (res.status === 200) {
                        this.$LjNotify('success', {
                            title: '成功',
                            message: '操作成功',
                        });
                        this.add_exvisible = false;
                        this.$emit('cancelAdd', this.add_visible)
                        this.getDataLists();
                        this.form = {
                            star_id:'',
                            content: '',
                        }
                    }else {
                        this.$LjNotify('error', {
                            title: '失败',
                            message: '操作失败',
                        });
                    }
                    })
                }
            },
            cancelAddStatus () {//取消
                this.form={
                    star_id:'',
                    content:''
                }
                this.add_exvisible = false;
                this.$emit('cancelAdd', this.add_exvisible)
            },
            // postReceivable_tag(){
            //     this.add_visible = false
            //     this.$emit('cancelAdd', this.add_visible)
            // },
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
            .detail_info {
            @include starImg("theme1", "lejiazhixingdi.png");
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            .star_info_left {
                @include starImg("theme1", "biaoqian.png");
                width: 270px;
                height: 100%;
                margin-left: 200px;
                position: relative;
                .star_info_avatar{
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    position: absolute;
                    top: 42%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    img{
                        width: 140px;
                        height: 140px;
                        border-radius: 50%;
                    }
                }
                .star_info_title {
                    @include starImg("theme1", "yin.png");
                    width: 38px;
                    height: 110px;
                    position: absolute;
                    z-index: 10;
                    top: 27%;
                    left: 30%;
                    transform: translate(-50%, -50%);
                    span{
                        font-family: jingDianXingShu;
                        font-size: 16px;
                        color: #ffffff;
                    }
                }
                .star_info_name{
                    width: 38px;
                    height: 110px;
                    position: absolute;
                    z-index: 10;
                    top: 56%;
                    left: 54%;
                    transform: translate(-50%, -50%);
                    span{
                        font-family: jingDianXingShu;
                        font-size: 16px;
                    }
                }
                .star_info_department{
                    width: 38px;
                    height: 110px;
                    position: absolute;
                    z-index: 10;
                    top: 61%;
                    left: 73%;
                    transform: translate(-50%, -50%);
                    span{
                        font-family: jingDianXingShu;
                        font-size: 16px;
                    }
                }
            }

            .star_info_right {
                width: 1200px;
                height: 100%;
                color: #ffffff;
                margin-left: 200px;
                .main_info {
                    width: 100%;
                    height: 600px;
                    padding-right: 50px;
                h5 {
                    width: 100%;
                    text-align: right;
                    cursor: pointer;
                    span {
                        display: block;
                        width: 20px;
                        height: 20px;
                        margin-right: 4px;
                    @include starImg("theme1", "bianji_copy2.png");
                    }
                }
                h3{
                    margin-bottom: 30px;
                }
                p{
                    line-height: 27px;
                    margin-top: 30px;
                    margin-bottom: 30px;
                    text-align: justify;
                }
                > div {
                    img{
                        display: block;
                        width: 480px;
                        height: 220px;
                    }
                    span {
                    }
                }
            }
            }
            }
        }
    }
</style>