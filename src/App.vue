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
          部门列表
        </span>
      </div>
      <div class="items-center">
        <div>
          <select v-model="theme_name">
            <option value="1">简约中国风</option>
            <option value="2">科技风</option>
            <option value="3">孟菲斯风</option>
            <option value="4">文艺森系</option>
          </select>
        </div>
        <div class="items-center personal" @click="routerLink('login')">
          <span>冯宝宝</span>
          <p>
            <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
          </p>
        </div>
      </div>
    </header>
    <div id="moduleList" :class="{'moduleList':moduleList}">
      <div class="justify-around">
        <div v-for="(item,index) in modules" class="list items-column" :class="'list-' + (index + 1)">
          <p></p>
          <div class="justify-center">
            <h1 class="writingMode">
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
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        theme_name: '4',
        moduleList: false,
        modules: [
          {
            title: '总裁办',
            English: 'Presidents',
          },
          {
            title: '财务中心',
            English: 'Finacial Center',
          },
          {
            title: '人力资源中心',
            English: 'Personal Adminstration',
          },
          {
            title: '新媒体运营中心',
            English: 'Social Media Center',
          },
          {
            title: '营销中心',
            English: 'Marketing Center',
          },
          {
            title: '客服中心',
            English: 'Customer Service',
          },
          {
            title: '乐伽大学',
            English: 'Lejia College',
          },
          {
            title: '风险控制',
            English: 'Risk Management',
          },
          {
            title: '知识产权保护',
            English: 'Intellectual Property Protection',
          },
        ],
      }
    },
    mounted() {

    },
    watch: {},
    computed: {},
    methods: {
      showModules() {
        this.moduleList = !this.moduleList;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./assets/scss/app/index.scss";

</style>
