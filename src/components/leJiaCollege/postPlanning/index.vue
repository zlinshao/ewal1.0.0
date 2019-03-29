<template>
    <div id="postPlanning">
        <div class="mainList justify-bet" :style="{'height': this.mainListHeight(-9) + 'px'}">

            <!--<div class="tab1-info flex-center" v-if="tab===1">-->
                <!--<div class="flex-center">-->
                    <!--<span class="writingMode">共 创 未 来。</span>-->
                <!--</div>-->
                <!--<div class="flex-center">-->
                    <!--<span class="writingMode">携 手 并 进，</span>-->
                <!--</div>-->
            <!--</div>-->

            <div class="tab" v-if="tab===1">
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

    </div>
</template>

<script>
    export default {
        name: "postPlanning",
        data(){
            return{
                tab:1,
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
            }
        },
        methods:{
            selectTab(val){
                this.tab = val;
            }
        }
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
    }
}




</style>