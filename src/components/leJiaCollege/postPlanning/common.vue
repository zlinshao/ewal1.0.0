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
                <div  @click.stop="add_video = true" v-show="chooseTab===3"><b>添加视频</b></div>
                <div  @click.stop="add_faculty = true" v-show="chooseTab===5"><b>添加讲师</b></div>
                <!--<div  @click="add_visible = true"><b>{{chooseTab===3?'添加视频':chooseTab===5?'添加讲师':''}}</b></div>-->
            </div>
        </div>
        <div class="mainList">
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>


        <!--增加视频-->
        <lj-dialog :visible="add_video" :size="{width: 400 + 'px',height: 400 + 'px'}"
                   @close="add_video = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>增加视频</h3>
                </div>
                <div class="dialog_main">
                    <el-form ref="form" :model="videoForm" label-width="80px"  size="small">
                        <el-form-item label="活动名称">
                            <el-input v-model="videoForm.name" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="可见岗位">
                            <el-input v-model="videoForm.name" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="上传视频">
                            <el-input v-model="videoForm.name" size="small"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="handleOkDel">确定</el-button>
                    <el-button type="info" size="small" @click="add_video = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--新增导师-->
        <lj-dialog :visible="add_faculty" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="add_faculty = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增讲师详情</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>讲师头像</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>

                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>讲师姓名</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>点评摘要</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>讲师介绍</span>
                                </div>
                                <div class="item_content">
                                    <el-input type="textarea" :rows="4"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" >确定</el-button>
                    <el-button type="info" size="small" @click="add_faculty = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>
</template>

<script>
    import jobTraining from '../jobTraining/index.vue';
    import examArrangement from '../examArrangement/index.vue';
    import faculty from '../faculty/index.vue';
    import industryDynamic from '../industryDynamic/index.vue';
    import postPlanning from '../postPlanning/menu.vue';
    import practicalProblems from '../practicalProblems/index.vue';
    import videoLearning from '../videoLearning/index.vue';
    import {leJiaCollegeMenu} from '../../../assets/js/allModuleList.js';
    import LjDialog from '../../common/lj-dialog.vue';
    import postPlanningIndex from '../postPlanning/index.vue';
    export default {
        name: "common",
        components:{
            jobTraining,
            industryDynamic,
            postPlanning,
            practicalProblems,
            videoLearning,
            faculty,
            examArrangement,
            LjDialog,
            postPlanningIndex,
        },

        data() {
            return {
                leJiaCollegeMenu,
                chooseTab: 1,
                showFinMenuList:false,
                tabView:'examArrangement',
                add_video:false,//增加视频
                add_faculty:false,//新增讲师
                videoForm:{
                    name:''
                }
            }
        },
        watch:{
            '$route':'getPath',
        },
        methods:{

            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
            getPath(){
                console.log(this.$route.query.url);
                this.tabView = this.$route.query.url;
                this.chooseTab = this.$route.query.type;
            },
            handleOkDel(){

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/leJiaCollege/common/index.scss";


</style>
