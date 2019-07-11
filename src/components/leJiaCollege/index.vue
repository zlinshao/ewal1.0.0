<template>
  <div id="leJiaCollege">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showNavTab">
          <b>...</b>
        </p>
        <h1>乐伽大学</h1>
        <h2 v-if="chooseTab" class="items-center">
          <span v-for="item in leJiaCollegeMenu.data" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div @click.stop="add" v-show="chooseTab===1"><b>添加视频</b></div>
        <div @click.stop="add" v-show="chooseTab===3"><b>添加讲师</b></div>
        <div @click.stop="add" v-show="chooseTab===4"><b>添加行业动态</b></div>
        <div @click.stop="add" v-show="chooseTab===5"><b>添加实践问题</b></div>
      </div>
    </div>

    <div class="mainList" :class="{'index-bg':!chooseTab}" :style="{'height': this.mainListHeight(0) + 'px'}">
      <div v-if="!chooseTab" class="leJiaCollege-menu">
        <div class="leJiaCollege-menu-info flex-center" v-for="(item,index) in menuType">
          <div @click="routerRedirect(item)" :key="index" class="flex-center">
            <span class="writingMode">{{item.letter}}</span>
            <span class="writingMode">{{item.title}}</span>
          </div>
        </div>
      </div>

<!--      <keep-alive>-->
        <router-view></router-view>
<!--      </keep-alive>-->
    </div>

  </div>

</template>
<script>
  import {leJiaCollegeMenu} from '../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {},
    data() {
      return {
        leJiaCollegeMenu,
        menuType: [
          {
            id: 1,
            url: '/leJiaCollege/videoLearning',
            title: '视频学习',
            letter: 'Video learning',
          },
          {
            id: 2,
            url: '/leJiaCollege/postPlanning',
            title: '岗位规划',
            letter: 'Post planning',
          },
          {
            id: 3,
            url: '/leJiaCollege/faculty',
            title: '师资力量',
            letter: 'Faculty',
          },
          {
            id: 4,
            url: '/leJiaCollege/industryDynamic',
            title: '行业动态',
            letter: 'Industry dynamic',
          },
          {
            id: 5,
            url: '/leJiaCollege/practicalProblems',
            title: '实践问题',
            letter: 'Practical problems',
          },
          /*{
              id:6,
              url: '/leJiaCollege/train',
              title: '培训考试',
              letter:'Train',
              id:6
          },*/
        ],
        chooseTab: null,
        add_visible: false,//新增
      }
    },
    watch: {
      //防止刷新chooseTab造成的页面样式冲突
      '$route.path': {
        handler(path) {
          this.chooseTab = _.find(this.menuType, {url: path})?.id || null;
        },
        immediate: true
      },
    },
    methods: {
      add() {
        this.add_visible = true;
        this.$bus.emit('add', this.add_visible);
      },
      //显示乐伽大学入口列表页面
      showNavTab() {
        this.chooseTab = null;
        this.routerLink('/leJiaCollege');
      },
      //路由跳转
      routerRedirect(item) {
        this.chooseTab = item.id;
        this.routerLink(item.url);
      },
      changeTabs(id, url) {
        this.chooseTab = id;
        this.routerLink(url);
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/leJiaCollege/index.scss";

  @mixin leJiaCollegeImg($n, $m) {
    $url: '../../assets/image/leJiaCollege/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #leJiaCollege {
      .mainList {
        &.index-bg {
          @include leJiaCollegeImg('theme1', 'index-bg.png');
        }


        .leJiaCollege-menu {
          .leJiaCollege-menu-info {
            > div {
              @include leJiaCollegeImg('theme1', 'border-grey.png');

              &:hover {
                @include leJiaCollegeImg('theme1', 'boder-red.png');

                span {
                  color: #CF2E33;
                }
              }
            }
          }
        }
      }
    }

  }


</style>
