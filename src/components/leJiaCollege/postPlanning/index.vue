<template>
    <div id="postPlanning">
        <div class="mainList justify-bet" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="getTab===1">
            <div class="edit_btn">
                <span @click="">编 辑</span>
            </div>
            <div class="tab" v-if="tab===1">
                <div class="slogan">
                    <span><i class="writingMode">共 创 未 来。</i></span>
                    <span><i class="writingMode">携 手 并 进，</i></span>
                </div>
            </div>
            <div class="tab" v-if="tab===2">
                <div class="main-middle flex-center">
                    <div>
                        <span class="spacial-tab">业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===3">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===4">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===5">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===6">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===7">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="tab" v-if="tab===8">
                <div class="main-left" >
                    <div class="left-top">
                        <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
                        <div>
                            <span>实际业绩大于等于100万</span>
                            <span>P3的考试资格</span>
                            <span>总部晋升面试</span>
                        </div>
                    </div>
                    <div class="left-bottom">
                        <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
                        <div>
                            <span>实际业绩低于50万</span>
                            <span>底薪+降级</span>
                        </div>
                    </div>
                </div>

                <div class="main-middle flex-center">
                    <div>
                        <span>业绩提成</span>
                        <span>实际业绩大于等于50万<br/> 底薪+总业绩1%</span>
                        <span>实际业绩大于等于100万<br/> 底薪+总业绩1</span>
                        <span>工资10000（其中无责任底薪2200）+提成 </span>
                    </div>
                </div>
            </div>
            <div class="main-right">
                <div class="right-list">
                <span
                        v-for="item in selects"
                        :class="{'active':tab === item.id,'default': tab != item.id}"
                        @click="selectTab(item.id)">{{item.title}}</span>
                </div>
            </div>
        </div>
        <!--新人训储备培训-->
        <div class="mainList justify-bet mainList-train" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="getTab===2">
            <div class="train_btn">
                <span v-for="item in tabSelects"
                      @click="changeTabs(item.id)"
                      :class="chooseTab === item.id ? 'chooseTab':'defaultTab'">
                    <i class="writingMode">{{item.title}}</i>
                </span>
            </div>
            <div class="edit_btn">
                <span @click="">编 辑</span>
            </div>
            <!--新人训-->
            <div class="train-box" v-if="chooseTab===1">
                <span @click="" v-for="item in newTrainData"><i>{{item.title}}</i></span>
            </div>
            <!--储备培训-->
            <div class="train-box" v-if="chooseTab===2">
                <span @click="" v-for="item in storeData"><i>{{item.title}}</i></span>
            </div>
        </div>

    </div>
</template>

<script>
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "postPlanningLists",
        components:{
            LjDialog
        },
        props:['tabId','getTab','switchTab'],
        data(){
            return{
                tab:this.tabId,
                chooseTab:this.switchTab,//chooseTab初始值
                tabSelects:[
                    {id:1,title:'新人训'},
                    {id:2,title:'储备培训'},
                ],
                newTrainData:[
                    {id:1,title:'企业介绍及条例宣贯'},
                    {id:2,title:'薪酬计算及晋升'},
                    {id:3,title:'跑盘技巧及实际操作'},
                    {id:4,title:'合同填写规范'},
                    {id:5,title:'租房谈判技巧及渠道维护'},
                ],
                storeData:[
                    {id:1,title:'企业文化'},
                    {id:2,title:'财务实务'},
                    {id:3,title:'储备片区经理实务'},
                    {id:4,title:'初级管理技巧'},
                    {id:5,title:'客诉处理'},
                ],
                selects:[
                    {id:1,title:'合伙人'},
                    {id:2,title:'城市总'},
                    {id:3,title:'城市副总'},
                    {id:4,title:'区域经理'},
                    {id:5,title:'储备区域经理'},
                    {id:6,title:'片区经理'},
                    {id:7,title:'储备片区经理'},
                    {id:8,title:'市场专员'},
                ],

                levelData:[],
            }
        },
        computed:{
        },
        mounted(){
            this.getDataLists();
        },

        watch:{
            switchTab:{
                handler(newVal,oldVal){
                    console.log(newVal);
                    this.chooseTab = newVal;
                },
                deep:true
            },
            "$route":"getPath",

        },

        methods:{
            selectTab(val){//切换menu
                this.tab = val;
            },
            getPath(){//获取路由参数
                this.tab = this.$route.query.id;
            },
            changeTabs(id) {//切换tab
                this.chooseTab = id;
            },
            getDataLists(){
                this.$http.get(globalConfig.leJiaCollege_server+'/api/position/level', this.params).then(res => {
                    if(res.status===200){
                        this.levelData  = res.data.data;
                        console.log(this.levelData)
                    }
                })
            }
        },


    }
</script>

<style scoped lang="scss">
@import "../../../assets/scss/leJiaCollege/postPlanning/index.scss";

@mixin leJiaCollegeImg($n, $m) {
    $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
    @include bgImage($url);
}
#theme_name.theme1 {
    #postPlanning {
        > div {

        }

        .mainList {
            @include leJiaCollegeImg('theme1', 'postPlanning-bg.png');
            .train_btn{
                span{
                    &:hover{
                        @include leJiaCollegeImg('theme1', 'new-train-red.png');
                    }

                }

                .chooseTab{
                    @include leJiaCollegeImg('theme1', 'new-train-red.png');
                    color:#FFFFFF;
                }
                .defaultTab{
                    @include leJiaCollegeImg('theme1', 'new-train-grey.png');
                }


            }

            .train-box{
                span{
                    @include leJiaCollegeImg('theme1', 'new-train-tab-grey.png');
                    &:hover{
                        @include leJiaCollegeImg('theme1', 'new-train-tab.png');
                    }
                }
            }

            .right-list {
                span {
                    &:hover {
                        @include leJiaCollegeImg('theme1', 'right-list-red.png');
                    }
                }

            }
            .active {
                @include leJiaCollegeImg('theme1', 'right-list-red.png');
                color: #FFFFFF;
                -webkit-transform: scale(1.5);
                -moz-transform: scale(1.5);
                -o-transform: scale(1.5);
                @include leJiaCollegeImg('theme1', 'right-list-red.png');

            }
            .default{
                @include leJiaCollegeImg('theme1', 'right-list-grey.png');
            }

            .main-left {
                .left-top,.left-bottom{
                    div:nth-child(1){
                        span{
                            @include leJiaCollegeImg('theme1', 'tab-red.png');
                        }

                    }
                    div:nth-child(2){

                    }
                    i{

                    }
                    p{

                    }
                }
            }

            .main-middle{
                div{
                    @include leJiaCollegeImg('theme1', 'text-border.png');
                    .spacial-tab{
                        @include leJiaCollegeImg('theme1', 'spacial-tab.png');
                    }
                }
            }



        }
        .mainList-train{
            @include leJiaCollegeImg('theme1', 'train-bg.png');
        }
    }
}




</style>