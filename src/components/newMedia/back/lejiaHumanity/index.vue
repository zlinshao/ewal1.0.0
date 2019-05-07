<template>
  <div id="leJiaHumanity">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>乐伽人文</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>

      <div class="items-center listTopRight">
        <div class="icons home_icon"></div>
        <div class="icons add" @click="add" v-if="chooseTab !==1"><b>+</b></div>
      </div>
    </div>
    <keep-alive>
      <component :is="tabView" :add_status="add_visible" @cancelAdd="getCancelAdd" :choose_type="chooseTab"></component>
    </keep-alive>
    <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
  </div>

</template>

<script>
import mediaList from '../../components/mediaList.vue';
import LjDialog from '../../../common/lj-dialog.vue';
import leJiaStars from './components/leJiaStars.vue';
import birthday from './components/birthday.vue';
import excellentStaff from './components/excellentStaff.vue';


export default {
  name: "leJiaHumanity",
  components: {
    mediaList,
    LjDialog,
    leJiaStars,
    excellentStaff,
    birthday,
  },
  data () {
    return {
      showFinMenuList: false,
      staffModule: false,
      add_visible: false,//新增
      chooseTab: 1,
      tabView: 'leJiaStars',
      selects: [
        { id: 1, title: "乐伽之星", url: 'leJiaStars' },
        { id: 2, title: "优秀员工", url: 'excellentStaff' },
        { id: 3, title: "寿星墙", url: 'birthday' }
      ],
    }
  },
  methods: {
    changeTabs (id, url) {
      this.chooseTab = id;
      this.tabView = url;
    },
    getCancelAdd (val) {
      this.add_visible = val;
    },
    add () {
      this.add_visible = true;
      // alert(this.chooseTab)
    }
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
  $url: "../../../../assets/image/newMedia/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #leJiaHumanity {
    .mainList {
    }

    .dialog_header {
      .write_wishes {
        @include starImg("theme1", "bianji_comment.png");
      }

      span {
      }
    }
  }
}
</style>