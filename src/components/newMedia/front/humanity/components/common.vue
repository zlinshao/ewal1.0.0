<template>
    <div id="common">
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
        </div>

        <div class="mainList">
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>
    </div>

</template>

<script>
    import mediaList from '../../../components/mediaList.vue';
    import LjDialog from '../../../../common/lj-dialog.vue';
    import birthday from '../components/birthday.vue';
    import goodStaff from '../components/goodStaff.vue';
    import leJiaStars from '../components/leJiaStars.vue';

    export default {
        name: "common",
        components: {
            mediaList,
            LjDialog,
            goodStaff,
            birthday,
            leJiaStars
        },
        data() {
            return {
                tabView:'leJiaStars',//组件初始化
                showFinMenuList: false,
                chooseTab: 1,
                selects: [
                    {id: 1, title: "乐伽之星",url:'leJiaStars'},
                    {id: 2, title: "优秀员工",url:'goodStaff'},
                    {id: 3, title: "寿星墙",url:'birthday'}
                ],
            }
        },
        methods: {
            changeTabs(id,url) {
                this.chooseTab = id;
                this.tabView = url;
            },

        }
    }
</script>

<style scoped lang="scss">

</style>