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
                <div class="icons add" @click.stop="is_add = true;" v-if="tabView==='BackVideo'"><b>+</b></div>
            </div>
        </div>

        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <keep-alive>
                <component :is="tabView" :add_status="is_add" @getAddStatus="addStatus"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';
    import Upload from '../../../common/upload.vue';
    import BackVideo from './video.vue';
    import BackDocument from './file.vue';
    export default {
        name: "common",
        components:{
            mediaList,
            LjDialog,
            Upload,
            BackDocument,
            BackVideo,
        },
        data(){
            return{
                chooseTab:1,
                showFinMenuList:false,
                is_add:'',
                selects:[
                    {id:1,title:"视频",url:'BackVideo'},{id:2,title:"文档",url:'BackDocument'}
                ],
                tabView:'BackVideo',
                //上传
                uploadFile: {
                    keyName: 'album',
                    setFile: [],
                    size: {
                        width: '50px',
                        height: '50px'
                    }
                },
                upload_form: {
                    album: [],
                    album_file: [],
                }, //所有上传文件
                rules:{
                }
            }
        },
        watch:{
            '$route':'getPath',
        },

        methods:{
            getPath(){
                console.log(this.$route.query.url);
                this.tabView = this.$route.query.url;
                this.chooseTab = this.$route.query.type;
            },
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },
            addStatus(val){
              this.is_add = val;
            },
        }
    }
</script>

<style scoped>

</style>