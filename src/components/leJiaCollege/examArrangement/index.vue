<template>
    <div id="examArrangement">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>乐伽大学</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
            </div>
        </div>
        <div class="mainList">
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>
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
        name: "index",
        components:{
            jobTraining,
            industryDynamic,
            postPlanning,
            practicalProblems,
            videoLearning,
            faculty,

        },

        data() {
            return {
                chooseTab: 1,
                tabView:'examArrangement',
                tabView: [
                    {id: 1, title: "考试安排",url:'examArrangement'},
                    {id: 2, title: "岗位培训",url:'jobTraining'},
                    {id: 3, title: "视频学习",url:'videoLearning'},
                    {id: 4, title: "岗位规划",url:'postPlanning'},
                    {id: 5, title: "师资力量",url:'faculty'},
                    {id: 6, title: "行业动态",url:'industryDynamic'},
                    {id: 7, title: "实践问题",url:'practicalProblems'},

                ],

            }
        },
        methods:{
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
        }
    }
</script>

<style scoped>

</style>