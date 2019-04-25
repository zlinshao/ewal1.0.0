<template>
  <div id="app" class="scroll_bar" :class="'app' + theme_name">
    <header class="items-bet">
      <div class="headLeft items-center">
        <span class="items-center">
          <span>南京</span>
          <b>❄</b>
          <span>小雪</span>
          <label>-1～1.5°C</label>
        </span>
        <span @click="showModules()" class="showButton">
          EWAL
        </span>
      </div>
      <div class="items-center">
        <div class="items-center funTop ">
          <span @click="todoListHandler">待办</span>
          <div class='shenpi'>
            <span @click.stop='openMessage'>审批</span>
            <ul>
              <li>
                <span>web前端-面试任务</span>
                <span>2019/1/20 21:00</span>
              </li>
              <li class='seeMore' @click.stop='openMessage'>更多</li>
            </ul>
          </div>
          <span @click="openNotify">更多</span>
        </div>
        <div>
          <select v-model="theme_name" @change="changeLoading">
            <option value="1">简约中国风</option>
            <option value="2">科技风</option>
            <option value="3">孟菲斯风</option>
            <option value="4">文艺森系</option>
          </select>
        </div>
        <div class="items-center personal">
          <span>冯宝宝</span>
          <!--@click="routerLink('login')"-->
          <p @click="routerLink('/personalCenter')">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
          </p>

<<<<<<< HEAD
            <!--&lt;!&ndash;<span class="icon3024 icon-personal-center"   @click="routerLink('/messageCenter')"></span>&ndash;&gt;-->
          <!--<span class="icon3024 icon-personal-center" @click="routerLink('/messageCenter')"></span>-->
=======
          <span class="icon3024 icon-personal-center" @click="routerLink('/messageCenter')"></span>

>>>>>>> 185f7a9b815e30c3644a514fe10e777153c69d51
          <!--<span title="个人中心" @click="routerLink('/personalCenter')" class="icon3024 icon-personal-center"></span>-->
        </div>
      </div>
    </header>
    <div id="moduleList" :class="{'moduleList':moduleList}" style="z-index: 1000">
      <div class="justify-around">
        <div class="list items-column" :class="'list-' + (index + 1)" v-for="(item,index) in modules" @click="routerLink(item.url);moduleList = false"
          :key='index'>
          <p></p>
          <div class="justify-center">
            <h1 class="writingMode items-center">
              <span>{{item.title}}</span>
              <i></i>
              <span>{{item.English}}</span>
            </h1>
            <b></b>
          </div>
        </div>
      </div>
    </div>
    <div id="theme_name" :class="'theme' + theme_name">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div class="flex-center changeLoad" v-if="changeLoad">
      正在切换
    </div>

    <!--加载-->
    <div class="loading" v-show="all_loading">
      <div class="content">
        <div class="lang">
          <span>
            正在加载中...
          </span>
        </div>
      </div>
    </div>

    <!--请求回调-->
    <div class="global_notify" :class="{'notify_show': global_notify.visible}">
      <div class="notify_icon" :class="['notify_icon__' + global_notify.type]"></div>
      <div class="notify_title" :class="['notify_title__' + global_notify.type]">{{ global_notify.title }}</div>
      <div class="message">{{ global_notify.message }}</div>
      <div class="subMessage">{{ global_notify.subMessage }}</div>
      <div class="close_btn" v-show="global_notify.showBtn" @click="handleCloseNotify">×</div>
    </div>

    <!--消息提示-->
    <div class="global_message" v-show="global_message.visible">
      <div class="notify_icon" :class="['notify_icon__' + global_message.type]"></div>
      <div class="notify_title" :class="['notify_title__' + global_message.type]">{{ global_message.title }}</div>
      <div class="message">{{ global_message.msg }}</div>
    </div>

    <todo-list></todo-list>
    <Approval></Approval>
  </div>
</template>

<script>
import TodoList from './components/todoList/index';
import Approval from './components/approval/index';

export default {
  name: 'App',
  components: {
    TodoList,
    Approval
  },
  data () {
    return {
      theme_name: '1',
      moduleList: false,
      changeLoad: false,
      modules: [
        {
          url: '/president',
          title: '总裁办',
          English: 'Presidents',
        },
        {
          url: '/finance',
          title: '财务中心',
          English: 'Finacial Center',
        },
        {
          url: '/humanResource',
          title: '人力资源中心',
          English: 'Personal Adminstration',
        },
        {
          url: '/mediaCenter',
          title: '新媒体运营中心',
          English: 'Social Media Center',
        },
        {
          url: '/marketCentre',
          title: '营销中心',
          English: 'Marketing Center',
        },
        {
          url: '/customService',
          title: '客服中心',
          English: 'Customer Service',
        },
        {
          url: '/leJiaCollege',
          title: '乐伽大学',
          English: 'Lejia College',
        },
        {
          url: '/riskManagement',
          title: '风险控制',
          English: 'Risk Management',
        },
        {
          url: '/intellectualPropertyProtection',
          title: '知识产权保护',
          English: 'Intellectual Property Protection',
        },
      ],
    }
  },
  mounted () { },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.moduleList = false;
        this.showLoading(false);
        this.$store.dispatch('route_animation');
      },
      deep: true// 深度观察监听
    }
  },
  computed: {
    routeAnimation () {
      return this.$store.state.app.routeAnimation;
    },
    all_loading () {
      return this.$store.state.app.loading;
    },
    global_notify () {
      return this.$store.state.app.globalNotify;
    },
    global_message () {
      return this.$store.state.app.globalMessage;
    },
    showMessage_visible () {
      return this.$store.state.approval.approval_message_visible
    }
  },
  methods: {
    todoListHandler () {
      //this.routerLink('/todoList');
      this.$store.dispatch('change_todo_list_visible');
    },

    openMessage () {

      this.$store.dispatch('change_message_visible');

      if (this.$store.state.todo.todo_list_visible) {
        this.$store.dispatch('change_todo_list_visible');
      }
      // this.$LjMessage('warning', {
      //   title: '警告',
      //   msg: '审批失败！'
      // });
    },
    openNotify () {
      this.$LjNotify('success', {
        title: '成功',
        message: '请求成功了~',
        subMessage: '这是一个子标题',
      });
    },
    //关闭提示
    handleCloseNotify () {
      this.$store.dispatch('close_notify', false);
    },
    changeLoading () {
      this.$store.dispatch('theme_name', this.theme_name);
      this.changeLoad = true;
      let that = this;
      setTimeout(function () {
        that.changeLoad = false;
      }, 2000);
    },
    showModules () {
      this.moduleList = !this.moduleList;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./assets/scss/app/index.scss";

@mixin notifyImg($m, $n) {
  $url: "./assets/image/common/" + $n + "/" + $m;
  @include bgImage($url);
}

#app {
  .global_notify {
    @include notifyImg("bg.png", "theme1/notify");
  }
  .notify_icon__success {
    @include notifyImg("success.png", "theme1/notify");
  }
  .notify_icon__error {
    @include notifyImg("error.png", "theme1/notify");
  }
  .notify_icon__info {
    @include notifyImg("info.png", "theme1/notify");
  }
  .notify_icon__warning {
    @include notifyImg("warning.png", "theme1/notify");
  }
  .global_message {
    @include notifyImg("message_bg.png", "theme1/notify");
  }

  .icon-personal-center {
    @include notifyImg("personal_center.png", "theme1");
  }
}
</style>
