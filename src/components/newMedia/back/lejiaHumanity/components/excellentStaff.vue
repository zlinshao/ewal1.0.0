<template>
    <div id="excellentStaff">
        <div class="staff_info">
            <div class="staff_list_info">
                <div class="staff_box" v-for="(item,index) in staffData">
                    <div class="flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                        <div class="img-modal" v-if="seen&&index===current">
                            <span @click="routerLink(staffDetailUrl,item.id)"></span>
                            <span @click="withdraw_visible = true"></span>
                        </div>
                        <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                    </div>
                    <p><span>{{item.depart}}</span><span>{{item.name}}</span></p>
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

        <!--优秀员工-->
        <lj-dialog
                :visible="visible"
                :size="{width: 800 + 'px' ,height: 500 + 'px'}"
                @close="visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>优秀员工</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini" v-model="form" label-width="80px">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="文章内容">
                            <el-input type="textarea" v-model="form.name" :rows="12"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="postReceivable_tag()">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>

<script>
    import LjDialog from '../../../../common/lj-dialog.vue';
    export default {
        name: "excellentStaff",
        components:{
            LjDialog,
        },
        data(){
            return{
                current: '',//当前
                seen: false,//显隐
                staffDetailUrl: 'staffDetail',
                withdraw_visible:false,//撤下
                visible:false,
                current_id:'',
                staffData: [
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 1
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 2,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 3
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 4
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 5,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 6,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组',
                        id: 7,
                    },
                    {
                        avatar: '',
                        name: '赵晓刀',
                        depart: '南京一区二组'
                        , id: 8,
                    },
                ],
                form:{
                    name:'赵丽颖',
                    content:'国际上的飞机上的就发生的纠纷双方品搜东方'
                },
            }
        },
        created(){
            this.$bus.on('add',this.getVal)
        },
        beforeDestroy(){
            this.$bus.off('add',this.getVal);
        },
        methods:{
            //获取bus传值
            getVal(val){
                this.visible = val;//新增弹窗显示
                // this.flag = 2;
                console.log(Object.keys(this.form));
                for(let item of Object.keys(this.form)){
                    this.form[item] = '';
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
            //撤下
            withdraw(){

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