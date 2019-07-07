<template>
    <div id="hotNews">

        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>企业头条</h1>
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
                <component :is="tabView" :chooseTabType="chooseTab"></component>
            </keep-alive>
        </div>
    </div>

</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import hotNews from '../news.vue';
    import leJiaNews from '../leJiaNews.vue';
    import noticeNews from '../noticeNews.vue';

    export default {
        name: "index",
        components: {
            mediaList,
            hotNews,
            noticeNews,
            leJiaNews,

        },
        data(){
            return{
                chooseTab:1,
                showFinMenuList:false,
                selects:[
                    {id:1,title:"热门导读",url:'hotNews'},
                    {id:2,title:"乐伽新闻",url:'leJiaNews'},
                    {id:3,title:"公告",url:'noticeNews'}
                ],
                tabView:'hotNews',
            }
        },
        watch:{
            '$route':'getPath'
        },
        mounted(){

        },
        methods:{
            getPath(){
                this.chooseTab = this.$route.query.type;
            },
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView  = url;
            },
        }
    }
</script>

<style scoped lang="scss">

</style>