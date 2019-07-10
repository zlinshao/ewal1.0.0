<template>
    <div id="common">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>乐伽大学</h1>
                <h2 class="items-center">
          <span v-for="item in leJiaCollegeMenu.data" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div  @click.stop="add" v-show="chooseTab===1"><b>添加视频</b></div>
                <div  @click.stop="add" v-show="chooseTab===3"><b>添加讲师</b></div>
                <div  @click.stop="add" v-show="chooseTab===4"><b>添加行业动态</b></div>
                <div  @click.stop="add" v-show="chooseTab===5"><b>添加实践问题</b></div>
            </div>
        </div>
        <div class="mainList">
            <keep-alive>
                <component :is="tabView" :tabId = 'tabId' :getTab="tab" :switchTab="selectTab"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import faculty from '../faculty/index.vue';
    import industryDynamic from '../industryDynamic/index.vue';
    import postPlanning from '../postPlanning/menu.vue';
    import postPlanningLists from '../postPlanning/index.vue';
    import practicalProblems from '../practicalProblems/index.vue';
    import videoLearning from '../videoLearning/index.vue';
    import train from '../train/index.vue';
    import {leJiaCollegeMenu} from '../../../assets/js/allModuleList.js';
    import LjDialog from '../../common/lj-dialog.vue';
    export default {
        name: "common",
        components:{
            industryDynamic,
            postPlanning,
            practicalProblems,
            videoLearning,
            faculty,
            LjDialog,
            postPlanningLists,
            train
        },
        data() {
            return {
                leJiaCollegeMenu,
                chooseTab: 1,
                showFinMenuList:false,
                tabView:'videoLearning',//显示组件
                add_video:false,//增加视频
                add_faculty:false,//新增讲师
                add_visible:false,
                videoForm:{
                    name:''
                },
                tabId:'',
                tab:'',
                selectTab:0,

                form:{
                    title:'号外看对方的开始减肥',
                    content:'结果收到了公司的规划管理和公司工会',
                    id:1
                },
                rules:{
                    title: [
                        { required: true, message: '请输入标题名称', trigger: 'blur' },
                        { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入动态内容', trigger: 'blur' },
                        { min: 0, max: 300, message: '长度在 300 个字符', trigger: 'blur' }
                    ],

                }
            }
        },
        watch:{
            '$route' (to, from) {
                this.tabView = this.$route.query.url;
                this.chooseTab = this.$route.query.type;
                if(from.path==='/newTraining'||from.path==='/reserveTraining'){
                    this.chooseTab = 2;
                }
                this.tabId = this.$route.query.id;
                this.tab = this.$route.query.tab;
                this.selectTab = this.$route.query.switchTabs;
            }
        },
        methods:{
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
            handleOkDel(){

            },
            add(){
                this.add_visible = true;
                this.$bus.emit('add', this.add_visible);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/common/index.scss";


</style>
