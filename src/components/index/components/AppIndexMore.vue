<template>
  <div style="width: 100px;height: 161px" @mouseleave="app_more_visible = false" v-if="app_more_visible" id="app_index_more">
    <el-card>
      <div class="module-list">
        <div class="module-item"><span @click="routerLink('/discussPolitics')">新建会议</span></div>
        <div class="module-item"><span @click="routerLink('/noticeQuestionnaire/notice')">新建公告</span></div>
        <div class="module-item"><span @click="routerLink('/noticeQuestionnaire/questionnaire')">新建问卷</span></div>
      </div>
    </el-card>
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
    position: absolute;
    top: 28px;
    left: -30px;
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
