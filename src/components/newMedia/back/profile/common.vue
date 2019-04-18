<template>
    <div id="common">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
                <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
                </h2>
            </div>
            <div class="items-center listTopRight">
                <div class="icons add" @click.stop="add"><b>+</b></div>
            </div>
        </div>
        <keep-alive>
            <component :is="tabView" :is_add="add_visible" @callbackAdd="getCallbackAdd"></component>
        </keep-alive>

    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import BackVideo from './video.vue';
    import BackDocument from './file.vue';
    export default {
        name: "common",
        components:{
            mediaList,
            LjDialog,
            BackDocument,
            BackVideo,
        },
        data(){
            return{
                chooseTab:1,
                showFinMenuList:false,
                add_visible:false,
                selects:[
                    {id:1,title:"视频",url:'BackVideo'},{id:2,title:"文档",url:'BackDocument'}
                ],
                tabView:'BackVideo',
            }
        },
        watch:{
            '$route':'getPath',
        },

        methods:{
            getPath(){
                this.tabView = this.$route.query.url;
                this.chooseTab = this.$route.query.type;
            },
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
            add(){
                this.add_visible = true;
            },
            getCallbackAdd(val){//获取取消状态
                this.add_visible = val;
            }

        }
    }
</script>

<style scoped>

</style>