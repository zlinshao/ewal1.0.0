<template>
  <div id="app_index_more">
    <div class="app-more">
      <slot></slot>
    </div>
    <div v-if="type=='hover'" class="module-list-container" style="width: 100px">
      <el-card>
        <div class="module-list">
          <div class="module-item" @click="routerJump(item)" v-for="item in routerList"><span>{{item.name}}</span></div>
        </div>
      </el-card>
    </div>

    <div v-else class="module-list-container-click" :class="{checked:show}" style="width: 100px">
      <el-card>
        <div class="module-list">
          <div class="module-item" @click="routerJump(item)" v-for="item in routerList"><span>{{item.name}}</span></div>
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

      }
    },
    props: {
      routerList: {
        type: Array,
        default() {
          return [];
        }
      },
      type: {
        type:String,
        default:"hover",
      },

      show: {
        type:Boolean,
      },

    },
    watch: {
      show: {
        handler(val,oldVal) {
          this.$emit('update:show',val);
        },
        immediate:true,
      },
    },

    methods: {
      routerJump(item) {
        this.$emit('update:show',false);
        if(item.name=='退出') {
          this.$LjConfirm({content:'确定退出登录吗？'}).then(()=> {
            this.$storage.remove('Authorization');
            this.$storage.remove('user_info');
            this.routerLink('/login');
          });
        }else {
          this.routerLink(item.router);
        }

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
    .module-list-container-click {
      position: absolute;
      visibility: hidden;
      opacity: 0;

      &.checked {
        visibility: visible;
        opacity: 1;
      }
    }

    .module-list {
      height: 100%;
      display: flex;
      flex-direction: column;

      .module-item {
        color: #686874;
        font-size: 12px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          cursor: pointer;
          padding: 5px 10px;
        }

        &:hover {
          background-color: #CF2E33;
          color: #ffffff;
        }
      }
    }
  }
</style>
