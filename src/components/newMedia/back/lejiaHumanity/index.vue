<template>
    <div id="leJiaHumanity">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>乐伽人文</h1>
                <h2 class="items-center">
                  <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                        :class="{'chooseTab': chooseTab === item.id}">
                    {{item.title}}<i></i>
                  </span>
                </h2>
            </div>

            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add" @click="add(chooseTab)"><b>+</b></div>
            </div>
        </div>


        <keep-alive>
            <component :is="tabView" :chooseType="add_type"></component>
        </keep-alive>

        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>

        <!--新增-->
        <lj-dialog
                :visible="add_visible"
                :size="{width:1200 + 'px' ,height: 800 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>{{chooseTab===1?'乐伽之星':chooseTab===2?'优秀员工':chooseTab===3?'':''}}</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form  v-model="form" label-width="80px">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="文章内容">
                            <div class="item_content">
                                <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="warning" @click="getUEContent()">预览</el-button>
                    <el-button size="small" type="danger" @click="postReceivable_tag()">发布</el-button>
                    <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>
    </div>

</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import leJiaStars from './components/leJiaStars.vue';
    import birthday from './components/birthday.vue';
    import excellentStaff from './components/excellentStaff.vue';
    import UE from '../../../common/UE.vue';

    export default {
        name: "leJiaHumanity",
        components: {
            mediaList,
            LjDialog,
            leJiaStars,
            excellentStaff,
            birthday,
            UE
        },
        data() {
            return {
                showFinMenuList: false,
                add_visible:false,
                defaultMsg: '',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                chooseTab: 1,
                tabView:'leJiaStars',
                staffDetailUrl: 'staffDetail',
                selects: [
                    {id: 1, title: "乐伽之星",url:'leJiaStars'},
                    {id: 2, title: "优秀员工",url:'excellentStaff'},
                    {id: 3, title: "寿星墙",url:'birthday'}
                ],
                form:{
                    name:''
                },
                add_type:'',

            }
        },
        methods: {
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
                this.add_visible = false;
            },
            add(val) {
                if(val===1){
                    this.add_visible = true;
                    this.add_type=1;
                }else if(val===2){
                    this.add_visible = true;
                    this.add_type=2;
                }else if(val===3){
                    this.add_type=3;
                }
            },


        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/lejiaHumanity/index.scss";

    @mixin avatarImg($m) {
        background: url($m) 50% 50% no-repeat;
        background-size: auto 220px;
    }

    @mixin starImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #leJiaHumanity {
            .mainList {

            }

            .dialog_header {
                .write_wishes {
                    @include starImg('theme1', 'bianji_comment.png');
                }

                span {

                }
            }
        }
    }

</style>