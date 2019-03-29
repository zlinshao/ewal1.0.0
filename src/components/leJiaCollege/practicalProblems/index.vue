<template>
    <div id="practicalProblems">
        <div class="problems-lists">
            <div class="problems-list-info flex-center" v-for="(item,index) in problemsData">
                <div class="problems-box"  @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                    <div class="problems-box-top flex-center">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="video-box-bottom justify-around">
                        <span>编 辑</span>
                        <span>删 除</span>
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
                        :total="problemCount"
                        layout="total,jumper,prev,pager,next"
                        :current-page="params.page"
                        :page-size="params.limit"
                        @current-change="handleChangePage"
                >
                </el-pagination>
            </div>
        </footer>

    </div>
</template>

<script>
    import jobTraining from '../jobTraining/index.vue';
    import faculty from '../faculty/index.vue';
    import industryDynamic from '../industryDynamic/index.vue';
    import postPlanning from '../postPlanning/index.vue';
    import practicalProblems from '../practicalProblems/index.vue';
    import videoLearning from '../videoLearning/index.vue';
    export default {
        name: "practicalProblems",
        components:{
            jobTraining,
            industryDynamic,
            postPlanning,
            practicalProblems,
            videoLearning,
            faculty,
        },
        data(){
            return{
                chooseTab:7,
                problemCount:0,
                params: {//查询参数
                    search:'',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                problemsData:[
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                    {title:'收房时应该注意 哪些问题？'},
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/practicalProblems/index.scss";
    @mixin leJiaCollegeImg($n, $m) {
        $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name {
        #practicalProblems{
            .problems-lists{
                .problems-list-info{
                    .problems-box{
                        .problems-box-top{
                            @include leJiaCollegeImg('theme1','problem-border.png')
                        }

                        .video-box-bottom{

                        }




                    }
                }
            }

        }

    }

</style>