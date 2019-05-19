<template>
<!--  <div style="width: 100px;height: 161px" @mouseleave="app_more_visible = false" v-if="app_more_visible" id="app_index_more">-->
  <div id="app_index_more">
    <div class="app-more">更多</div>
    <div class="module-list-container" style="width: 100px;height: 161px">
      <el-card>
        <div class="module-list">
          <div class="module-item"><span @click="routerLink('/discussPolitics')">新建会议</span></div>
          <div class="module-item"><span @click="routerLink('/noticeQuestionnaire/notice')">新建公告</span></div>
          <div class="module-item"><span @click="routerLink('/noticeQuestionnaire/questionnaire')">新建问卷</span></div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  export default {
    name: "AppIndexMore",
    data() {
      return {
        app_more_visible:false,
      }
    },
    props: {
      visible: false,
    },
    watch: {
      visible(val) {
        this.app_more_visible = val;
      },
      app_more_visible: {
        handler(val,oldVal) {
          this.$emit('update:visible', val);
        },
        //immediate: true
      },
    },
  }
</script>


<style lang="scss">
  #app_index_more {
    .el-card {
      height: 100%;

      .el-card__body {
        height: 100%;
        padding: 0;
      }
    }

  }
</style>

<style scoped lang="scss">
  #app_index_more {
    display: inline-block;
    position: relative;
    &:hover {
      .module-list-container {
        visibility: visible;
        opacity: 1;
      }
    }
    .app-more {
      width: 92px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .module-list-container {
      position: absolute;
      transition: all 0.5s ease-in-out;
      visibility: hidden;
      opacity: 0;
    }

    .module-list {
      height: 100%;
      display: flex;
      flex-direction: column;

      .module-item {

        color: #686874;
        font-size: 12px;
        width: 100%;
        height: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          cursor: pointer;
          padding: 5px 10px;
        }
      }
    }
  }
</style>
